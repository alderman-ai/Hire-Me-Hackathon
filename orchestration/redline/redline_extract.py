#!/usr/bin/env python3
"""Turn a spoken redline recording into comments paired with screen frames.

Alex scrolls through the site while talking; the OBS rig records the screen and his
mic and transcribes the mic with word timings. This script splits the transcript into
comments and, for each one, pulls the frames of what was on screen while he said it.

Time base: the rig transcribes the session video's own mic track (OBS\\rig\\scripts\\
process.py, Job.audio), so transcript times are screen-video times, offset 0. OBS
pauses cut the video without a gap, so a /pause is a cut point in video time; the
manifest's clock_map gives those cuts. Comments never cross a cut in pause splitting,
and no frame is taken from the other side of one. Verified on S17: the screen switches
to the Claude usage page at 221.87 s, as he says "challenge is managing usage".

Banana mode (on by default when the markers are heard): "banana" when he lands on the
thing, "cucumber" when he's done with it. See README.md.

Usage:
    python orchestration\\redline\\redline_extract.py --session OBS\\Processed\\<folder>
        [--out orchestration\\local\\redline\\<id>] [--banana auto|on|off]

Standard library only; needs ffmpeg on PATH.
"""
import argparse
import html
import json
import os
import re
import shutil
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
NO_WINDOW = getattr(subprocess, "CREATE_NO_WINDOW", 0)

# Near-duplicate check: compare 96x54 grey thumbnails. Calibrated on S17: the cursor
# moving changes about 0.15% of pixels, a real screen change 2% or more.
THUMB_W, THUMB_H = 96, 54
PIXEL_DELTA = 16
DUP_FRACTION = 0.005
EDGE = 0.05  # keep frames this far inside a span, away from a /pause cut

SENTENCE_END = re.compile(r"[.?!][\"')\]]*$")
MARKERS = (("banana", 1), ("cucumber", 2))  # word, edit distance allowed


# Loading -----------------------------------------------------------------------------

def load_json(path: Path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def resolve(path: str) -> Path:
    p = Path(path)
    if p.is_absolute() or p.exists():
        return p
    return ROOT / p


class Session:
    def __init__(self, folder: Path, video_override: str | None):
        self.folder = folder
        source = folder / "manifest.json"
        if not source.exists():
            source = folder / "session.json"
        if not source.exists():
            sys.exit(f"No manifest.json or session.json in {folder}")
        m = load_json(source)
        self.id = m["id"]
        self.video = Path(video_override or m.get("video") or "")
        if not video_override and not self.video.is_file():
            sys.exit(f"Screen video not found: {self.video or '(none in manifest)'}; pass --video")
        if not self.video.is_file():
            sys.exit(f"Screen video not found: {self.video}")
        self.video_seconds = float(m.get("video_seconds") or probe_seconds(self.video))
        entries = m.get("clock_map") or [
            {"video_start": 0.0, "video_end": self.video_seconds, "wall_start": None}]
        self.spans = [(float(e["video_start"]), float(e["video_end"]), e.get("wall_start"),
                       e.get("wall_end")) for e in entries]
        listed = (m.get("transcript") or {}).get("json")
        local = folder / "transcript" / f"{self.id}.json"
        self.transcript = Path(listed) if listed and Path(listed).is_file() else local
        self.backup = folder / "transcript" / f"{self.id}_backup.json"

    def span_of(self, t: float) -> int:
        for i, (_, end, _, _) in enumerate(self.spans):
            if t <= end:
                return i
        return len(self.spans) - 1

    def clamp(self, t: float, span: int) -> float:
        start, end, _, _ = self.spans[span]
        hi = min(end, self.video_seconds) - (0.15 if span == len(self.spans) - 1 else EDGE)
        return max(start + EDGE, min(t, hi))

    def wall(self, t: float) -> str | None:
        start, _, wall, _ = self.spans[self.span_of(t)]
        if wall is None:
            return None
        return datetime.fromtimestamp(wall + t - start).astimezone().isoformat(timespec="seconds")


def probe_seconds(video: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
         str(video)], capture_output=True, text=True, creationflags=NO_WINDOW).stdout
    return float(out.strip())


def load_words(path: Path, offset: float) -> list[dict]:
    words = []
    for line in load_json(path):
        for w in line.get("words") or []:
            text = (w.get("word") or "").strip()
            if text:
                words.append({"w": text, "s": float(w["start"]) + offset,
                              "e": float(w["end"]) + offset})
    words.sort(key=lambda w: (w["s"], w["e"]))
    return words


def backup_comments(sess: Session) -> list[dict]:
    """Lines the rig recovered from the backup recorder during an OBS crash gap.

    They have words but no screen video, so they get no frames.
    """
    if not sess.backup.is_file():
        return []
    out = []
    for line in load_json(sess.backup) or []:
        wall = line["wall_offset"] + line["start"]
        at = sess.spans[-1][1]
        for (_, v_end, _, w_end), nxt in zip(sess.spans, sess.spans[1:]):
            if w_end is not None and nxt[2] is not None and w_end <= wall <= nxt[2]:
                at = v_end
                break
        out.append({"kind": "backup", "start": at, "end": at, "text": line["text"].strip(),
                    "no_video": True,
                    "wall_start": datetime.fromtimestamp(wall).astimezone()
                    .isoformat(timespec="seconds")})
    return out


# Splitting ---------------------------------------------------------------------------

def pause_split(words: list[dict], sess: Session, args) -> list[list[dict]]:
    """Break on pauses, sentence ends and /pause cuts; merge short bits; cap length."""
    chunks: list[list[dict]] = []
    for w in words:
        if chunks:
            prev = chunks[-1][-1]
            if (w["s"] - prev["e"] > args.pause or SENTENCE_END.search(prev["w"])
                    or sess.span_of(w["s"]) != sess.span_of(prev["s"])):
                chunks.append([])
        else:
            chunks.append([])
        chunks[-1].append(w)
    chunks = merge_short(chunks, sess, args.min_words)
    out = []
    for c in chunks:
        out += cap_length(c, args.max_seconds, args.min_words)
    return out


def merge_short(chunks, sess, min_words):
    same = lambda a, b: sess.span_of(a["s"]) == sess.span_of(b["s"])  # noqa: E731
    i = 0
    while i < len(chunks) and len(chunks) > 1:
        c = chunks[i]
        if len(c) >= min_words:
            i += 1
            continue
        options = []
        if i > 0 and same(chunks[i - 1][-1], c[0]):
            options.append((c[0]["s"] - chunks[i - 1][-1]["e"], i - 1))
        if i + 1 < len(chunks) and same(c[-1], chunks[i + 1][0]):
            options.append((chunks[i + 1][0]["s"] - c[-1]["e"], i + 1))
        if not options:
            i += 1
            continue
        _, j = min(options)
        if j < i:
            chunks[j] = chunks[j] + c
        else:
            chunks[j] = c + chunks[j]
        del chunks[i]
    return chunks


def cap_length(c, max_seconds, min_words):
    """Split an over-long run of speech at its longest gap, so frames stay dense."""
    if c[-1]["e"] - c[0]["s"] <= max_seconds or len(c) < 2 * min_words:
        return [c]
    mid = (c[0]["s"] + c[-1]["e"]) / 2
    best = max(range(min_words, len(c) - min_words + 1),
               key=lambda i: (round(c[i]["s"] - c[i - 1]["e"], 1), -abs(c[i]["s"] - mid)))
    return cap_length(c[:best], max_seconds, min_words) + cap_length(c[best:], max_seconds,
                                                                     min_words)


def norm(word: str) -> str:
    return re.sub(r"[^a-z]", "", word.lower())


def distance(a: str, b: str) -> int:
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
        prev = cur
    return prev[-1]


def match(n: str) -> tuple[str | None, int]:
    """(marker, edit distance) for a normalised word, or (None, 99)."""
    for target, allowed in MARKERS:
        if abs(len(n) - len(target)) <= allowed:
            d = distance(n, target)
            if d <= allowed:
                return target, d
    return None, 99


def find_markers(words: list[dict]) -> list[dict]:
    """Every banana and cucumber, fuzzy, including one whisper split in two ("cu cumber")."""
    found, i = [], 0
    while i < len(words):
        kind, _ = match(norm(words[i]["w"]))
        last = i
        if not kind and i + 1 < len(words):
            a, b = norm(words[i]["w"]), norm(words[i + 1]["w"])
            joined, jd = match(a + b)
            _, nd = match(b)
            if joined and a and len(b) >= 2 and jd < nd:
                kind, last = joined, i + 1
        if kind:
            found.append({"kind": kind, "first": i, "last": last, "t": words[i]["s"]})
            i = last + 1
        else:
            i += 1
    return found


def plan_comments(words, sess, args):
    """Return (comments without frames, skipped outside stretches, number of markers)."""
    markers = find_markers(words) if args.banana != "off" else []
    mode = "banana" if (markers or args.banana == "on") else "pause"
    comments, skipped = [], []

    def sweep(chunk, kind, **flags):
        comments.append({"kind": kind, "words": chunk, **flags})

    if mode == "pause":
        for c in pause_split(words, sess, args):
            sweep(c, "pause")
        return comments, skipped, mode, markers

    def outside(stretch, force=False):
        if not stretch:
            return
        if force or stretch[-1]["e"] - stretch[0]["s"] > args.outside_seconds:
            for c in pause_split(stretch, sess, args):
                sweep(c, "outside_pair", outside_pair=True)
        else:
            skipped.append({"start": round(stretch[0]["s"], 2), "end": round(stretch[-1]["e"], 2),
                            "text": " ".join(w["w"] for w in stretch)})

    def unclosed(banana, body):
        """A banana whose cucumber never came: it runs to the next banana or the end."""
        if not body:
            return
        if body[-1]["e"] - banana["t"] > args.outside_seconds:
            chunks = pause_split(body, sess, args)
            keep = [chunks[0]]
            for c in chunks[1:]:
                if c[-1]["e"] - banana["t"] > args.outside_seconds:
                    break
                keep.append(c)
            rest = [w for c in chunks[len(keep):] for w in c]
            body = [w for c in keep for w in c]
        else:
            rest = []
        comments.append({"kind": "no_cucumber", "words": body, "banana_at": banana["t"],
                         "end_at": body[-1]["e"], "no_cucumber": True})
        outside(rest, force=True)

    pos, open_banana = 0, None
    for m in markers:
        if m["kind"] == "banana":
            if open_banana:
                unclosed(open_banana, words[open_banana["last"] + 1:m["first"]])
            else:
                outside(words[pos:m["first"]])
            open_banana = m
        elif open_banana:
            body = words[open_banana["last"] + 1:m["first"]]
            if body:
                comments.append({"kind": "pair", "words": body, "banana_at": open_banana["t"],
                                 "cucumber_at": m["t"], "end_at": m["t"]})
            open_banana = None
        else:
            # A cucumber with no banana: start at the previous marker or the pause before.
            stretch = words[pos:m["first"]]
            if stretch:
                chunks = pause_split(stretch, sess, args)
                outside([w for c in chunks[:-1] for w in c])
                comments.append({"kind": "no_banana", "words": chunks[-1], "cucumber_at": m["t"],
                                 "end_at": m["t"], "no_banana": True})
        pos = m["last"] + 1
    if open_banana:
        unclosed(open_banana, words[open_banana["last"] + 1:])
    else:
        outside(words[pos:])
    return comments, skipped, mode, markers


# Frames ------------------------------------------------------------------------------

def frame_plan(c, sess, args) -> list[tuple[float, str]]:
    """Candidate times for one comment, each with a role: anchor, extra or sweep."""
    if "banana_at" in c:
        b = c["banana_at"]
        span = sess.span_of(b)
        plan = [(sess.clamp(b + 1.0, span), "anchor"),
                (sess.clamp(b + 0.0, span), "extra"),
                (sess.clamp(b + 2.0, span), "extra")]
        end = c["end_at"]
        plan.append((sess.clamp(end - 0.25, sess.span_of(end)), "extra"))
        return plan
    start, end = c["words"][0]["s"], c["words"][-1]["e"]
    span = sess.span_of(start)
    times, t = [], start - args.lead
    while t <= end + 1e-6:
        times.append(t)
        t += args.step
    if times[-1] < end - 0.5:
        times.append(end)
    if "cucumber_at" in c:
        times.append(c["cucumber_at"] - 0.25)
    return [(sess.clamp(t, span), "sweep") for t in times]


def extract(video: Path, t: float, jpg: Path, width: int):
    graph = (f"[0:v]split=2[a][b];[a]scale='min({width},iw)':-2[big];"
             f"[b]scale={THUMB_W}:{THUMB_H},format=gray[small]")
    r = subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.3f}", "-i", str(video),
         "-filter_complex", graph,
         "-map", "[big]", "-frames:v", "1", "-q:v", "3", str(jpg),
         "-map", "[small]", "-frames:v", "1", "-f", "rawvideo", "pipe:1"],
        capture_output=True, creationflags=NO_WINDOW)
    if r.returncode or len(r.stdout) != THUMB_W * THUMB_H or not jpg.is_file():
        return None
    return r.stdout


def change(a: bytes, b: bytes) -> float:
    """Share of thumbnail pixels that changed noticeably."""
    return sum(1 for x, y in zip(a, b) if abs(x - y) > PIXEL_DELTA) / len(a)


def choose(plan, cache, max_frames):
    """Pick the frames to keep from the candidates. Returns [(time, role)]."""
    usable = [(t, role) for t, role in plan if cache.get(round(t, 2))]
    if not usable:
        return []
    thumb = lambda t: cache[round(t, 2)][1]  # noqa: E731
    if usable[0][1] == "anchor":
        kept = [usable[0]]
        for t, role in usable[1:]:
            if all(change(thumb(t), thumb(k)) >= DUP_FRACTION for k, _ in kept):
                kept.append((t, role))
        return sorted(kept)[:max_frames]
    # Sweep: drop the frame least changed from the one before it, until every frame
    # differs from its predecessor and there are at most max_frames. A brief popup
    # goes first, so two copies of the same screen can't end up side by side.
    kept = sorted({t: (t, role) for t, role in usable}.values())
    memo = {}

    def diff(i):
        key = (kept[i - 1][0], kept[i][0])
        if key not in memo:
            memo[key] = change(thumb(key[0]), thumb(key[1]))
        return memo[key]

    while len(kept) > 1:
        d, i = min((diff(i), i) for i in range(1, len(kept)))
        if d >= DUP_FRACTION and len(kept) <= max_frames:
            break
        del kept[i]
    return kept


# Output ------------------------------------------------------------------------------

def tc(t: float) -> str:
    return f"{int(t // 60)}:{t % 60:04.1f}"


def write_html(out: Path, sess: Session, comments, skipped, mode):
    esc = html.escape
    rows = []
    for c in comments:
        flags = [c["kind"]] + [f for f in ("no_cucumber", "no_banana", "outside_pair", "no_video")
                               if c.get(f) and f != c["kind"]]
        imgs = []
        for path, t in zip(c["frames"], c["frame_times"]):
            anchor = path == c.get("anchor_frame")
            label = f"{tc(t)}" + (" · anchor" if anchor else "")
            imgs.append(f'<figure class="{"anchor" if anchor else ""}"><a href="{esc(path)}">'
                        f'<img src="{esc(path)}" loading="lazy" alt=""></a>'
                        f"<figcaption>{esc(label)}</figcaption></figure>")
        rows.append(
            f'<section id="{c["id"]}"><div class="meta"><b>{c["id"]}</b> '
            f'<span class="tc">{tc(c["start"])}–{tc(c["end"])}</span> '
            + "".join(f'<span class="tag {f}">{f}</span>' for f in flags)
            + f'<p>{esc(c["text"])}</p></div><div class="frames">{"".join(imgs)}</div></section>')
    skipped_html = ""
    if skipped:
        items = "".join(f'<li><span class="tc">{tc(s["start"])}–{tc(s["end"])}</span> '
                        f'{esc(s["text"])}</li>' for s in skipped)
        skipped_html = (f"<h2>Short talk outside any banana–cucumber pair (no frames)</h2>"
                        f"<ul class='skipped'>{items}</ul>")
    page = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Redline {esc(sess.id)}</title>
<style>
:root {{ --bg:#fafaf8; --fg:#1c1c1a; --muted:#6b6b66; --line:#e2e2dc; --accent:#e8590c; --tag:#ecece6; }}
@media (prefers-color-scheme: dark) {{ :root {{ --bg:#161614; --fg:#ecece6; --muted:#9a9a92;
  --line:#2c2c28; --accent:#ff8a3d; --tag:#2a2a26; }} }}
body {{ background:var(--bg); color:var(--fg); font:15px/1.45 system-ui, sans-serif; margin:0; padding:16px; }}
h1 {{ font-size:20px; margin:0 0 4px; }} .sub {{ color:var(--muted); margin:0 0 16px; }}
section {{ display:grid; grid-template-columns:minmax(220px, 340px) 1fr; gap:16px;
  border-top:1px solid var(--line); padding:14px 0; }}
.meta p {{ margin:6px 0 0; }} .tc {{ color:var(--muted); font-variant-numeric:tabular-nums; }}
.tag {{ background:var(--tag); border-radius:4px; padding:1px 6px; font-size:12px; margin-left:4px; }}
.tag.no_cucumber, .tag.no_banana, .tag.outside_pair {{ color:var(--accent); }}
.frames {{ display:flex; flex-wrap:wrap; gap:8px; }}
figure {{ margin:0; width:300px; max-width:100%; }} figure img {{ width:100%; display:block;
  border:2px solid var(--line); border-radius:4px; }}
figure.anchor img {{ border-color:var(--accent); }}
figcaption {{ font-size:12px; color:var(--muted); }}
@media (max-width:700px) {{ section {{ grid-template-columns:1fr; }} }}
</style></head><body>
<h1>Redline {esc(sess.id)}</h1>
<p class="sub">{len(comments)} comments · {mode} mode · {esc(str(sess.video))}</p>
{"".join(rows)}
{skipped_html}
</body></html>
"""
    (out / "index.html").write_text(page, encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--session", required=True, help=r"OBS\Processed\<folder>")
    ap.add_argument("--out", help=r"default: orchestration\local\redline\<session id>")
    ap.add_argument("--banana", choices=("auto", "on", "off"), default="auto",
                    help="banana/cucumber markers: auto = on when heard (default)")
    ap.add_argument("--video", help="screen video, if not the manifest's")
    ap.add_argument("--transcript", help="transcript JSON, if not the session's")
    ap.add_argument("--offset", type=float, default=0.0,
                    help="seconds added to transcript times to get video times (default 0)")
    ap.add_argument("--pause", type=float, default=1.2, help="silence that ends a comment")
    ap.add_argument("--min-words", type=int, default=3, help="shorter bits merge into a neighbour")
    ap.add_argument("--max-seconds", type=float, default=30.0,
                    help="split longer pause-based comments at their longest gap")
    ap.add_argument("--outside-seconds", type=float, default=20.0,
                    help="banana mode: talk outside a pair longer than this gets comments")
    ap.add_argument("--lead", type=float, default=1.5, help="first frame this long before")
    ap.add_argument("--step", type=float, default=1.5, help="seconds between frames")
    ap.add_argument("--max-frames", type=int, default=4)
    ap.add_argument("--width", type=int, default=1280)
    ap.add_argument("--jobs", type=int, default=min(6, os.cpu_count() or 2))
    args = ap.parse_args()

    if not shutil.which("ffmpeg"):
        sys.exit("ffmpeg is not on PATH")
    folder = resolve(args.session)
    sess = Session(folder, args.video)
    transcript = resolve(args.transcript) if args.transcript else sess.transcript
    words = load_words(transcript, args.offset)
    if not words:
        sys.exit(f"No words in {transcript}")
    if words[-1]["e"] > sess.video_seconds + 2:
        print(f"Warning: the transcript runs to {words[-1]['e']:.1f} s, past the "
              f"{sess.video_seconds:.1f} s video. Check --offset.")
    out = resolve(args.out) if args.out else ROOT / "orchestration" / "local" / "redline" / sess.id
    frames_dir = out / "frames"
    if frames_dir.exists():
        shutil.rmtree(frames_dir)
    cand_dir = frames_dir / "_candidates"
    cand_dir.mkdir(parents=True)

    planned, skipped, mode, markers = plan_comments(words, sess, args)
    planned.sort(key=lambda c: c["words"][0]["s"])
    for c in planned:
        c["plan"] = frame_plan(c, sess, args)

    times = sorted({round(t, 2) for c in planned for t, _ in c["plan"]})
    print(f"{sess.id}: {len(words)} words, {mode} mode"
          + (f" ({sum(m['kind'] == 'banana' for m in markers)} bananas, "
             f"{sum(m['kind'] == 'cucumber' for m in markers)} cucumbers)" if mode == "banana" else "")
          + f", {len(planned)} comments, extracting {len(times)} candidate frames...")

    def grab(t):
        jpg = cand_dir / f"t{int(round(t * 100)):07d}.jpg"
        return t, (jpg, extract(sess.video, t, jpg, args.width))

    cache = {}
    with ThreadPoolExecutor(args.jobs) as pool:
        for t, (jpg, thumb) in pool.map(grab, times):
            cache[t] = (jpg, thumb) if thumb else None

    comments = []
    for n, c in enumerate(planned, 1):
        cid = f"c{n:03d}"
        kept = choose(c["plan"], cache, args.max_frames)
        frames, frame_times, anchor = [], [], None
        for k, (t, role) in enumerate(kept, 1):
            name = f"frames/{cid}_{k}.jpg"
            shutil.copyfile(cache[round(t, 2)][0], out / name)
            frames.append(name)
            frame_times.append(round(t, 2))
            if role == "anchor":
                anchor = name
        ws = c["words"]
        item = {"id": cid, "start": round(ws[0]["s"], 2), "end": round(ws[-1]["e"], 2),
                "text": " ".join(w["w"] for w in ws), "frames": frames,
                "frame_times": frame_times, "kind": c["kind"]}
        if mode == "banana":
            item["anchor_frame"] = anchor
            for key in ("banana_at", "cucumber_at"):
                if key in c:
                    item[key] = round(c[key], 2)
            for flag in ("no_cucumber", "no_banana", "outside_pair"):
                if c.get(flag):
                    item[flag] = True
        item["wall_start"] = sess.wall(ws[0]["s"])
        comments.append(item)

    for b in backup_comments(sess):
        b.update(frames=[], frame_times=[], start=round(b["start"], 2), end=round(b["end"], 2))
        comments.append(b)
    comments.sort(key=lambda c: c["start"])
    for n, c in enumerate((c for c in comments if "id" not in c), 1):
        c["id"] = f"b{n:03d}"
    shutil.rmtree(cand_dir)

    (out / "comments.json").write_text(json.dumps(comments, indent=1, ensure_ascii=False),
                                       encoding="utf-8")
    meta = {
        "session": sess.id, "folder": str(folder), "video": str(sess.video),
        "video_seconds": sess.video_seconds, "transcript": str(transcript), "mode": mode,
        "offset": args.offset, "pauses_in_clock_map": len(sess.spans) - 1,
        "comments": len(comments), "frames": sum(len(c["frames"]) for c in comments),
        "skipped_outside": skipped,
        "params": {k: getattr(args, k) for k in ("pause", "min_words", "max_seconds",
                                                 "outside_seconds", "lead", "step",
                                                 "max_frames", "width")},
        "generated": datetime.now().astimezone().isoformat(timespec="seconds"),
    }
    (out / "meta.json").write_text(json.dumps(meta, indent=1, ensure_ascii=False),
                                   encoding="utf-8")
    write_html(out, sess, comments, skipped, mode)
    print(f"Wrote {len(comments)} comments and {meta['frames']} frames to {out}")
    print(f"Contact sheet: {out / 'index.html'}")


if __name__ == "__main__":
    main()
