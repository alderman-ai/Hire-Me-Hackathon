r"""Find a dictation in the rig's transcripts: the backup source when Wispr Flow drops text.

Usage:  python -I blog-pipeline\scripts\find_in_rig.py --start 15:00 --end 15:15 [--date 2026-11-02]
        python -I blog-pipeline\scripts\find_in_rig.py --start 15:00 --end 15:15 --out <file>
        python -I blog-pipeline\scripts\find_in_rig.py --start 15:00 --end 15:15 --against blog-pipeline\dictations\T-01.md
        python -I blog-pipeline\scripts\find_in_rig.py --match "front loaded"

Reads OBS\Processed\index.json and each session's Sxx_*\segments.jsonl (falling
back to the combined OBS\Processed\segments.jsonl); --processed <dir> overrides
the folder. Read only: it never runs or touches the rig. Times are local wall
clock; --date defaults to today; --end may be HH:MM or HH:MM:SS.

Window mode prints each segment that overlaps the window as "[HH:MM:SS] text",
then a summary:
  WINDOW <sessions> <first start>–<last end>: <n> segments, <w> words, <m> minutes spoken
--out <file> writes the window's plain text (one paragraph per segment) instead
of printing the segments; the summary still prints.
--against <dictation> lists the window's segments the dictation barely covers
(word 3-gram overlap below 0.3, ignoring case and punctuation): the stretches
Wispr Flow may have dropped. Prints "GAP [start–end] text" lines, the WINDOW
line, then "GAPS <k> of <n> segments".
--match "<phrase>" prints "MATCH <session> <segment id> [HH:MM:SS] <text>" for
each segment holding the phrase (ignoring case and punctuation; a phrase that
runs across two neighbouring segments shows both ids), then "MATCHES <n>".
--date, or a window, narrows the search.

A NOTE line warns when the window runs past the last filed session (the rig
may not have processed those minutes yet).

Exit codes:
  0  window found (with --against: whatever the gaps), or the phrase matched
  1  NONE ...   no filed session covers the window (not processed yet?), the
                window holds no speech, or the phrase isn't found
  2  ERROR ...  bad arguments, or index.json / a dictation file can't be read
"""
import argparse
import json
import re
import sys
import time
from datetime import date, datetime, timedelta
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent
PROCESSED = REPO / "OBS" / "Processed"
FRONT = re.compile(r"\A---[ \t]*\r?\n.*?\r?\n---[ \t]*(\r?\n|\Z)", re.S)
GAP_BELOW = 0.3


def fail(msg: str) -> int:
    print(f"ERROR {msg}")
    return 2


def norm_words(text: str) -> list[str]:
    text = text.lower().replace("'", "").replace("’", "")
    return re.sub(r"[\W_]+", " ", text).split()


def wall(s: str) -> datetime:
    return datetime.fromisoformat(s.replace("Z", "+00:00")).astimezone()


def hms(d: datetime) -> str:
    return d.astimezone().strftime("%H:%M:%S")


def clock(d: datetime) -> str:
    """HH:MM, or HH:MM:SS when the seconds matter: for echoing a window back."""
    return hms(d) if d.second else hms(d)[:5]


def load_index(processed: Path) -> list[dict]:
    path = processed / "index.json"
    last = None
    for _ in range(3):  # the rig may be rewriting it right now
        try:
            data = json.loads(path.read_text(encoding="utf-8-sig"))
            return data if isinstance(data, list) else data.get("sessions", [])
        except (OSError, ValueError) as e:
            last = e
            time.sleep(0.5)
    raise RuntimeError(f"cannot read {path}: {last}")


_combined: dict[str, list[dict]] | None = None


def read_jsonl(path: Path) -> list[dict]:
    rows, bad = [], 0
    for line in path.read_text(encoding="utf-8-sig", errors="replace").splitlines():
        if not line.strip():
            continue
        try:
            rows.append(json.loads(line))
        except ValueError:
            bad += 1
    if bad:
        print(f"WARN skipped {bad} unreadable lines in {path}")
    return rows


def load_segments(processed: Path, session: dict) -> list[dict]:
    global _combined
    own = processed / str(session.get("folder", "")) / "segments.jsonl"
    if session.get("folder") and own.is_file():
        rows = read_jsonl(own)
    else:
        if _combined is None:
            _combined = {}
            combined = processed / "segments.jsonl"
            if combined.is_file():
                for r in read_jsonl(combined):
                    _combined.setdefault(r.get("session"), []).append(r)
        rows = _combined.get(session.get("id"), [])
    good = []
    for r in rows:
        try:
            r["_start"], r["_end"] = wall(r["wall_start"]), wall(r["wall_end"])
        except (KeyError, TypeError, ValueError):
            continue
        r.setdefault("session", session.get("id"))
        good.append(r)
    good.sort(key=lambda r: r["_start"])
    return good


def seg_words(r: dict) -> int:
    w = r.get("words")
    if isinstance(w, list):
        return len(w)
    if isinstance(w, int):
        return w
    return len(str(r.get("text", "")).split())


def session_span(s: dict):
    try:
        return wall(s["start"]["wall"]), wall(s["end"]["wall"])
    except (KeyError, TypeError, ValueError):
        return None


def parse_clock(day: date, s: str) -> datetime:
    for fmt in ("%H:%M:%S", "%H:%M"):
        try:
            t = datetime.strptime(s, fmt).time()
            return datetime.combine(day, t).astimezone()  # naive -> local time zone
        except ValueError:
            pass
    raise ValueError(f"bad time {s!r}: use HH:MM or HH:MM:SS")


def trigrams(words: list[str], n: int) -> set[tuple]:
    return {tuple(words[i:i + n]) for i in range(len(words) - n + 1)}


def coverage(seg_text: str, dict_words: list[str], cache: dict) -> float | None:
    words = norm_words(seg_text)
    if not words:
        return None
    n = min(3, len(words))
    if n not in cache:
        cache[n] = trigrams(dict_words, n)
    grams = trigrams(words, n)
    return sum(1 for g in grams if g in cache[n]) / len(grams)


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description="Find a dictation in the rig's transcripts.")
    ap.add_argument("--start", help="window start, HH:MM local")
    ap.add_argument("--end", help="window end, HH:MM local")
    ap.add_argument("--date", help="YYYY-MM-DD, default today")
    ap.add_argument("--out", help="write the window's plain text here instead of printing it")
    ap.add_argument("--against", help="a dictation file: report window segments it barely covers")
    ap.add_argument("--match", help="find segments holding this phrase")
    ap.add_argument("--processed", help="the rig's Processed folder (default ..\\OBS\\Processed)")
    try:
        args = ap.parse_args()
    except SystemExit as e:
        return 2 if e.code else 0

    window = bool(args.start or args.end)
    if window and not (args.start and args.end):
        return fail("give both --start and --end")
    if not window and not args.match:
        return fail("give --start and --end, or --match \"<phrase>\"")
    if (args.out or args.against) and not window:
        return fail("--out and --against need a window (--start and --end)")
    try:
        day = date.fromisoformat(args.date) if args.date else datetime.now().astimezone().date()
    except ValueError:
        return fail(f"bad date {args.date!r}: use YYYY-MM-DD")
    win = None
    if window:
        try:
            win = (parse_clock(day, args.start), parse_clock(day, args.end))
        except ValueError as e:
            return fail(str(e))
        if win[1] <= win[0]:
            return fail("--end must be after --start")

    processed = Path(args.processed) if args.processed else PROCESSED
    if not processed.is_dir():
        return fail(f"not found: {processed}")
    try:
        index = load_index(processed)
    except RuntimeError as e:
        return fail(str(e))

    dict_words = None
    if args.against:
        p = Path(args.against)
        if not p.is_file():
            return fail(f"not found: {p}")
        try:
            dict_words = norm_words(FRONT.sub("", p.read_text(encoding="utf-8-sig", errors="replace"), count=1))
        except OSError as e:
            return fail(f"cannot read {p}: {e}")

    spans = [(s, session_span(s)) for s in index]
    spans = [(s, sp) for s, sp in spans if sp]
    if win:
        chosen = [s for s, (a, b) in spans if b > win[0] and a < win[1]]
    elif args.date:
        chosen = [s for s, (a, b) in spans if a.date() == day or b.date() == day]
    else:
        chosen = [s for s, _ in spans]

    if win and not chosen:
        last = max(spans, key=lambda x: x[1][1], default=None)
        tail = f" (latest filed: {last[0].get('id')} ending {last[1][1].strftime('%Y-%m-%d %H:%M')})" if last else ""
        print(f"NONE no filed rig session covers {day} {clock(win[0])}–{clock(win[1])}{tail}")
        return 1

    segs = []
    for s in chosen:
        segs.extend(load_segments(processed, s))
    if win:
        segs = [r for r in segs if r["_end"] > win[0] and r["_start"] < win[1]]
    segs.sort(key=lambda r: r["_start"])

    if args.match:
        return match_mode(args.match, segs)

    ids = ",".join(sorted({str(s.get("id")) for s in chosen}))
    if not segs:
        print(f"NONE {ids} cover {day} {clock(win[0])}–{clock(win[1])} but hold no speech in it")
        return 1

    latest_end = max(b for _, (a, b) in spans)
    if win[1] > latest_end:
        print(f"NOTE the rig has filed sessions only up to {hms(latest_end)}; later minutes may not be processed yet")

    n = len(segs)
    words = sum(seg_words(r) for r in segs)
    minutes = sum((r["_end"] - r["_start"]).total_seconds() for r in segs) / 60
    seg_ids = ",".join(sorted({str(r.get("session")) for r in segs}))
    summary = (f"WINDOW {seg_ids} {hms(segs[0]['_start'])}–{hms(max(r['_end'] for r in segs))}: "
               f"{n} segments, {words} words, {minutes:.1f} minutes spoken")

    if args.out:
        out = Path(args.out)
        try:
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text("\n\n".join(str(r.get("text", "")).strip() for r in segs) + "\n",
                           encoding="utf-8", newline="\n")
        except OSError as e:
            return fail(f"cannot write {out}: {e}")
    elif dict_words is None:
        for r in segs:
            print(f"[{hms(r['_start'])}] {str(r.get('text', '')).strip()}")

    if dict_words is not None:
        cache: dict = {}
        gaps = 0
        for r in segs:
            c = coverage(str(r.get("text", "")), dict_words, cache)
            if c is not None and c < GAP_BELOW:
                gaps += 1
                print(f"GAP [{hms(r['_start'])}–{hms(r['_end'])}] {str(r.get('text', '')).strip()}")
        print(summary)
        print(f"GAPS {gaps} of {n} segments")
        return 0

    print(summary)
    return 0


def match_mode(phrase: str, segs: list[dict]) -> int:
    want = " ".join(norm_words(phrase))
    if not want:
        return fail("--match needs a phrase with words in it")
    key = f" {want} "
    hits = 0
    for i, r in enumerate(segs):
        text = " ".join(norm_words(str(r.get("text", ""))))
        if key in f" {text} ":
            hits += 1
            print(f"MATCH {r.get('session')} {r.get('segment_id')} [{hms(r['_start'])}] {str(r.get('text', '')).strip()}")
            continue
        nxt = segs[i + 1] if i + 1 < len(segs) else None
        if nxt and nxt.get("session") == r.get("session") and nxt["_start"] - r["_end"] < timedelta(seconds=10):
            ntext = " ".join(norm_words(str(nxt.get("text", ""))))
            if key in f" {text} {ntext} " and key not in f" {ntext} ":
                hits += 1
                both = f"{str(r.get('text', '')).strip()} {str(nxt.get('text', '')).strip()}"
                print(f"MATCH {r.get('session')} {r.get('segment_id')}+{nxt.get('segment_id')} [{hms(r['_start'])}] {both}")
    if not hits:
        print(f"NONE no segment holds \"{phrase}\"")
        return 1
    print(f"MATCHES {hits} for \"{phrase}\"")
    return 0


if __name__ == "__main__":
    sys.exit(main())
