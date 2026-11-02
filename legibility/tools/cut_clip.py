"""Cut a webcam clip from a filed rig session, on the screen-recording timeline.

Usage (from anywhere):
    python -I legibility\\tools\\cut_clip.py S05 2640 2675 day1-03-recovery [--pad 3] [--screen]

- S05: the filed session id (OBS\\Processed\\index.json).
- 2640 2675: start and end in seconds on the screen recording's timeline
  (segments.jsonl `video_start`), before padding.
- day1-03-recovery: the clip name. Writes legibility\\clips\\<name>.mp4 (git-ignored),
  frames for the frame check in legibility\\clips\\<name>_frames\\ (one every 2 s),
  and the transcript for the clip's range in legibility\\clip-transcripts\\<name>.md.
- --pad: seconds added before and after (default 3, DI-1 Q1.10).
- --screen: cut the screen recording instead of the webcam (DoD-13 and DoD-21 clips only).

The webcam is a set of ~15-minute MKV chunks, each with a wall-clock start in the
session's manifest.json. A screen time maps to wall time through the manifest's
clock_map, then to a chunk and an offset. A clip that crosses a chunk boundary is
cut from each chunk and joined. Every clip is re-encoded (H.264 + AAC, 720p) so the
cut points are exact and the file uploads anywhere.
"""
import argparse
import json
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PROCESSED = ROOT / "OBS" / "Processed"
CLIPS = ROOT / "legibility" / "clips"
TRANSCRIPTS = ROOT / "legibility" / "clip-transcripts"


def load_session(sid: str) -> tuple[Path, dict]:
    index = json.loads((PROCESSED / "index.json").read_text(encoding="utf-8"))
    entry = next((s for s in index if s["id"] == sid), None)
    if entry is None:
        sys.exit(f"{sid} is not filed in OBS\\Processed\\index.json")
    folder = PROCESSED / entry["folder"]
    return folder, json.loads((folder / "manifest.json").read_text(encoding="utf-8"))


def screen_to_wall(manifest: dict, t: float) -> float:
    for span in manifest["clock_map"]:
        if span["video_start"] <= t <= span["video_end"]:
            return span["wall_start"] + (t - span["video_start"])
    sys.exit(f"{t:.1f} s falls in a pause or gap of {manifest['id']}; pick times inside one span")


def webcam_pieces(manifest: dict, wall_a: float, wall_b: float) -> list[tuple[Path, float, float]]:
    folder = Path(manifest["webcam_folder"])
    pieces = []
    for chunk in manifest["webcam"]:
        c0, c1 = chunk["wall_start"], chunk["wall_start"] + chunk["seconds"]
        a, b = max(wall_a, c0), min(wall_b, c1)
        if b - a > 0.05:
            pieces.append((folder / chunk["name"], a - c0, b - a))
    covered = sum(p[2] for p in pieces)
    if covered < (wall_b - wall_a) - 0.5:
        sys.exit(f"the webcam covers only {covered:.1f} of {wall_b - wall_a:.1f} s in this range")
    return pieces


def run(cmd: list[str]) -> None:
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit("ffmpeg failed:\n" + r.stderr[-2000:])


def encode(src: Path, offset: float, length: float, out: Path) -> None:
    run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{offset:.3f}", "-i", str(src),
         "-t", f"{length:.3f}", "-vf", "scale=-2:720", "-c:v", "libx264", "-preset", "veryfast",
         "-crf", "22", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-ar", "48000",
         "-movflags", "+faststart", str(out)])


def transcript(folder: Path, a: float, b: float, sid: str, name: str, start: float, end: float) -> Path:
    lines = [f"# {name}", "", f"Session {sid}, screen time {start:.0f} to {end:.0f} s "
             f"(clip {a:.0f} to {b:.0f} s with padding). Verbatim from segments.jsonl.", ""]
    for raw in (folder / "segments.jsonl").read_text(encoding="utf-8").splitlines():
        seg = json.loads(raw)
        v0 = seg.get("video_start", 0)
        v1 = seg.get("video_end", v0)
        if v1 >= a and v0 <= b:
            mm, ss = divmod(int(v0), 60)
            lines.append(f"- {mm:02d}:{ss:02d} ({seg.get('wall_start', '')[11:19]}) {seg.get('text', '').strip()}")
    TRANSCRIPTS.mkdir(parents=True, exist_ok=True)
    path = TRANSCRIPTS / f"{name}.md"
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return path


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("session")
    ap.add_argument("start", type=float)
    ap.add_argument("end", type=float)
    ap.add_argument("name")
    ap.add_argument("--pad", type=float, default=3.0)
    ap.add_argument("--screen", action="store_true")
    args = ap.parse_args()
    if args.end <= args.start:
        sys.exit("end must be after start")

    folder, manifest = load_session(args.session)
    a = max(0.0, args.start - args.pad)
    b = min(manifest["video_seconds"], args.end + args.pad)
    CLIPS.mkdir(parents=True, exist_ok=True)
    out = CLIPS / f"{args.name}.mp4"

    if args.screen:
        encode(Path(manifest["video"]), a, b - a, out)
    else:
        pieces = webcam_pieces(manifest, screen_to_wall(manifest, a), screen_to_wall(manifest, b))
        if len(pieces) == 1:
            encode(pieces[0][0], pieces[0][1], pieces[0][2], out)
        else:
            with tempfile.TemporaryDirectory() as tmp:
                parts = []
                for i, (src, off, length) in enumerate(pieces):
                    p = Path(tmp) / f"part{i}.mp4"
                    encode(src, off, length, p)
                    parts.append(p)
                listing = Path(tmp) / "list.txt"
                listing.write_text("".join(f"file '{p.as_posix()}'\n" for p in parts), encoding="utf-8")
                run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0",
                     "-i", str(listing), "-c", "copy", "-movflags", "+faststart", str(out)])

    frames = CLIPS / f"{args.name}_frames"
    frames.mkdir(exist_ok=True)
    for old in frames.glob("*.jpg"):
        old.unlink()
    run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(out), "-vf", "fps=1/2,scale=-2:360",
         str(frames / "f%03d.jpg")])
    tpath = transcript(folder, a, b, args.session, args.name, args.start, args.end)
    print(json.dumps({"clip": str(out), "seconds": round(b - a, 1), "frames": str(frames),
                      "frame_count": len(list(frames.glob('*.jpg'))), "transcript": str(tpath)}))


if __name__ == "__main__":
    main()
