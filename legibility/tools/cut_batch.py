r"""Cut every clip in a cuts.json list with cut_clip.py, then build one contact sheet per clip.

Usage:  python -I legibility\tools\cut_batch.py legibility\local\clip-index\cuts.json

Each entry: name, session, start, end, pad, mode ("webcam" or "screen"), blur ([[from, to], ...]).
Prints one JSON line per clip, then the sheet paths for the frame check.
"""
import json
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
CLIPS = HERE.parent / "clips"


def main() -> None:
    cuts = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    for c in cuts:
        cmd = [sys.executable, "-I", str(HERE / "cut_clip.py"), c["session"], str(c["start"]), str(c["end"]),
               c["name"], "--pad", str(c.get("pad", 3))]
        if c.get("mode") == "screen":
            cmd.append("--screen")
            for f, t in c.get("blur") or []:
                cmd += ["--blur", f"{f}:{t}"]
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode != 0:
            print(json.dumps({"name": c["name"], "error": (r.stderr or r.stdout)[-400:]}))
            continue
        print(r.stdout.strip())
        frames = CLIPS / f"{c['name']}_frames"
        n = len(list(frames.glob("*.jpg")))
        cols = 6
        rows = max(1, -(-n // cols))
        sheet = CLIPS / f"{c['name']}_sheet.jpg"
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", "1", "-i", str(frames / "f%03d.jpg"),
                        "-vf", f"scale=240:-2,tile={cols}x{rows}:padding=4", "-frames:v", "1", str(sheet)])
        print(json.dumps({"sheet": str(sheet), "frames": n}))


if __name__ == "__main__":
    main()
