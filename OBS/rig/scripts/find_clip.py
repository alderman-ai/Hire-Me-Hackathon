"""Task 10: turn a quote into a session, a YouTube link and padded clip points.

Usage:
  find_clip.py "the quote or a phrase" [--top 3] [--pad 3] [--cut] [--json]
  find_clip.py --segments S03-0012,S03-0014 [--pad 3] [--cut] [--json]

Quotes needn't be exact, because matching works on words and survives small
transcription differences. Lines recovered from the backup audio are found too, but
they have no video to link to.
"""
import argparse
import difflib
import json
import math
import re
import subprocess
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path

import clock
import obs_client as oc
import rig_state as rs

DEFAULT_PAD = 3.0
MIN_SCORE = 0.6
CANDIDATES = 40
LAST_SECOND_IN_FILE = 0.25
_WORD = re.compile(r"[a-z0-9']+")


def tokens(text: str) -> list[str]:
    return _WORD.findall(text.lower())


class Library:
    def __init__(self):
        self.lines = []
        path = rs.PROCESSED / "segments.jsonl"
        if path.exists():
            with path.open(encoding="utf-8") as source:
                self.lines = [json.loads(line) for line in source if line.strip()]
        self.manifests = {
            m["id"]: m
            for m in (rs.load_json(p) for p in sorted(rs.PROCESSED.glob("S*/manifest.json")))
        }

    def words(self, source_filter) -> dict[str, list[dict]]:
        """Every word by session, each with its line and token."""
        out: dict[str, list[dict]] = {}
        for line in self.lines:
            if not source_filter(line):
                continue
            for word in line["words"]:
                for token in tokens(word["word"]) or [""]:
                    out.setdefault(line["session"], []).append(
                        {"token": token, "line": line, **word}
                    )
        return out


def best_windows(quote: list[str], words: list[dict], top: int) -> list[tuple[float, int, int]]:
    """Slide a quote-sized window over a session and score the likeliest spots."""
    size = len(quote)
    if not words or not size:
        return []
    size = min(size, len(words))
    wanted = Counter(quote)
    seen = Counter(w["token"] for w in words[:size])
    overlap = sum(min(seen[t], wanted[t]) for t in wanted)
    rough = [(overlap, 0)]
    for start in range(1, len(words) - size + 1):
        out, into = words[start - 1]["token"], words[start + size - 1]["token"]
        if out in wanted and seen[out] <= wanted[out]:
            overlap -= 1
        seen[out] -= 1
        if into in wanted and seen[into] < wanted[into]:
            overlap += 1
        seen[into] += 1
        rough.append((overlap, start))
    rough.sort(reverse=True)

    scored = []
    for _, start in rough[:CANDIDATES]:
        low, high = max(start - 3, 0), min(start + size + 3, len(words))
        window = [w["token"] for w in words[low:high]]
        matcher = difflib.SequenceMatcher(None, quote, window, autojunk=False)
        matched = [m for m in matcher.get_matching_blocks() if m.size]
        if not matched:
            continue
        first = low + matched[0].b
        last = low + matched[-1].b + matched[-1].size - 1
        score = sum(m.size for m in matched) / len(quote)
        scored.append((score, first, last))
    scored.sort(key=lambda s: (-s[0], s[1]))

    kept = []
    for candidate in scored:
        if all(candidate[2] < k[1] or candidate[1] > k[2] for k in kept):
            kept.append(candidate)
        if len(kept) == top:
            break
    return kept


def padded(words: list[dict], first: int, last: int, pad: float, length: float):
    """Clip points with padding, snapped so no word gets cut in half (R24, R25)."""
    start, end = words[first]["start"], words[last]["end"]
    in_point, out_point = max(start - pad, 0.0), min(end + pad, length)
    for word in words[: first + 1]:
        if word["start"] >= in_point:
            in_point = word["start"] if word["end"] > in_point and word["start"] - in_point < 1 \
                else in_point
            break
    for word in reversed(words[last:]):
        if word["end"] <= out_point:
            out_point = word["end"] if out_point - word["end"] < 1 else out_point
            break
    return round(in_point, 3), round(out_point, 3)


def result(library: Library, session: str, words: list[dict], first: int, last: int,
           score: float, pad: float) -> dict:
    line = words[first]["line"]
    text = " ".join(w["word"] for w in words[first: last + 1])
    if line["source"] == "backup":
        return {"session": session, "score": round(score, 3), "text": text,
                "hackathon": line["hackathon_start"], "wall": line["wall_start"],
                "video": False, "note": "Backup audio only, so there's no video to link to."}
    manifest = library.manifests[session]
    in_point, out_point = padded(words, first, last, pad, manifest["video_seconds"])
    start = words[first]["start"]
    youtube = manifest["youtube_id"]
    entries = manifest["clock_map"]
    return {
        "session": session, "score": round(score, 3), "text": text, "video": True,
        "hackathon": clock.hackathon(
            clock.video_to_wall(entries, start), manifest["hackathon_start"]
        ),
        "quote_start": round(start, 3), "quote_end": round(words[last]["end"], 3),
        "in": in_point, "out": out_point, "in_timecode": clock.timecode(in_point),
        "out_timecode": clock.timecode(out_point),
        "youtube": f"https://youtu.be/{youtube}?t={math.floor(start)}" if youtube else None,
    }


def by_quote(library: Library, quote: str, top: int, pad: float) -> list[dict]:
    wanted = tokens(quote)
    found = []
    for video_only in (True, False):
        check = (lambda l: l["source"] == "video") if video_only \
            else (lambda l: l["source"] == "backup")
        for session, words in library.words(check).items():
            for score, first, last in best_windows(wanted, words, top):
                if score >= MIN_SCORE:
                    found.append(result(library, session, words, first, last, score, pad))
    found.sort(key=lambda r: -r["score"])
    return found[:top]


def by_segments(library: Library, ids: list[str], pad: float) -> list[dict]:
    chosen = [line for line in library.lines if line["segment_id"] in ids]
    missing = set(ids) - {line["segment_id"] for line in chosen}
    if missing:
        raise SystemExit(f"Not found: {', '.join(sorted(missing))}")
    sessions = {line["session"] for line in chosen}
    if len(sessions) > 1:
        raise SystemExit(
            f"These lines span {' and '.join(sorted(sessions))}. A clip can't cross sessions."
        )
    session = sessions.pop()
    words = library.words(lambda l: l["source"] == "video").get(session, [])
    positions = [i for i, w in enumerate(words) if w["line"]["segment_id"] in ids]
    if not positions:
        raise SystemExit("Those lines have no video to clip.")
    return [result(library, session, words, positions[0], positions[-1], 1.0, pad)]


def slug(text: str) -> str:
    return "-".join(tokens(text)[:5]) or "clip"


def cut(library: Library, match: dict) -> dict:
    """R24: a frame-accurate clip, plus the matching webcam clip (R29)."""
    if not match.get("video"):
        return match
    manifest = library.manifests[match["session"]]
    source = Path(manifest["video"])
    if not source.exists():
        match["clip"] = None
        match["clip_note"] = f"{source} has been deleted. Use the YouTube link and times above."
        return match
    folder = rs.PROCESSED / "clips"
    folder.mkdir(parents=True, exist_ok=True)
    stamp = match["hackathon"].replace(":", "")
    name = f"{match['session']}_{stamp}_{slug(match['text'])}"
    target = folder / f"{name}.mp4"
    length = match["out"] - match["in"]
    subprocess.run(
        [str(oc.FFMPEG), "-hide_banner", "-loglevel", "error", "-y",
         "-ss", f"{match['in']:.3f}", "-i", str(source), "-t", f"{length:.3f}",
         "-map", "0:v:0", "-map", "0:a", "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
         "-c:a", "aac", "-b:a", "192k", str(target)],
        check=True, creationflags=oc.NO_WINDOW,
    )
    match["clip"] = str(target)
    match["webcam_clip"] = cut_webcam(manifest, match, folder / f"{name}_webcam.mp4")
    return match


def cut_webcam(manifest: dict, match: dict, target: Path) -> str | None:
    """Cut each webcam file the clip touches, then join the pieces.

    The webcam splits every 15 minutes and restarts after a pause or crash, so a clip
    can span files. Each piece is re-encoded so its cut is frame-accurate.
    """
    folder = Path(manifest["webcam_folder"])
    wall_in = clock.video_to_wall(manifest["clock_map"], match["in"])
    wall_out = clock.video_to_wall(manifest["clock_map"], match["out"])
    pieces = []
    for entry in manifest.get("webcam", []):
        begin = entry["wall_start"]
        start, stop = max(wall_in, begin), min(wall_out, begin + entry["seconds"])
        path = folder / entry["name"]
        if stop - start >= LAST_SECOND_IN_FILE and path.exists():
            pieces.append((path, start - begin, stop - start))
    if not pieces:
        return None

    made = []
    for number, (path, offset, length) in enumerate(pieces):
        piece = target.with_name(f"{target.stem}.part{number}.mp4")
        subprocess.run(
            [str(oc.FFMPEG), "-hide_banner", "-loglevel", "error", "-y",
             "-ss", f"{offset:.3f}", "-i", str(path), "-t", f"{length:.3f}",
             "-map", "0:v:0", "-c:v", "libx264", "-preset", "veryfast", "-crf", "20",
             "-an", str(piece)],
            check=True, creationflags=oc.NO_WINDOW,
        )
        made.append(piece)
    if len(made) == 1:
        made[0].replace(target)
        return str(target)

    listing = target.with_suffix(".txt")
    listing.write_text("".join(f"file '{p.name}'\n" for p in made), encoding="utf-8")
    subprocess.run(
        [str(oc.FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0",
         "-i", str(listing), "-c", "copy", str(target)],
        check=True, creationflags=oc.NO_WINDOW,
    )
    listing.unlink()
    for piece in made:
        piece.unlink()
    return str(target)


def show(match: dict) -> None:
    print(f"{match['session']}  {match['hackathon']}  match {match['score']:.0%}")
    if match.get("video"):
        print(f"  Link: {match['youtube'] or 'not uploaded yet'}")
        print(f"  Clip: {match['in_timecode']} to {match['out_timecode']} "
              f"({match['in']:.2f} s to {match['out']:.2f} s)")
    else:
        print(f"  {match['note']}")
    print(f"  Text: {match['text']}")
    if match.get("clip"):
        print(f"  Saved: {match['clip']}")
    if match.get("webcam_clip"):
        print(f"  Webcam: {match['webcam_clip']}")
    if match.get("clip_note"):
        print(f"  {match['clip_note']}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Find a quote in the session transcripts.")
    parser.add_argument("quote", nargs="?")
    parser.add_argument("--segments")
    parser.add_argument("--top", type=int, default=3)
    parser.add_argument("--pad", type=float, default=DEFAULT_PAD)
    parser.add_argument("--cut", action="store_true")
    parser.add_argument("--json", action="store_true")
    options = parser.parse_args()
    if not options.quote and not options.segments:
        parser.error("give a quote or --segments")

    library = Library()
    if options.segments:
        matches = by_segments(library, options.segments.split(","), options.pad)
    else:
        matches = by_quote(library, options.quote, options.top, options.pad)
    if options.cut:
        matches = [cut(library, m) for m in matches]

    if options.json:
        print(json.dumps(matches, indent=2, ensure_ascii=False))
    elif matches:
        for match in matches:
            show(match)
    else:
        print("No match found.")
    return 0 if matches else 1


if __name__ == "__main__":
    sys.exit(main())
