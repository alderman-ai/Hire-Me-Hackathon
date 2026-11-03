"""Turn a folder of full-size deployment screenshots into the time-lapse.

usage: python scripts/build_timelapse.py <shots dir> <mp4 out>
The shots dir holds one PNG/JPG per deployment, named by its short host id (the `host` of a row in
content/timelapse.json `deployments`, e.g. nzit76jme.png). Writes public/timelapse/<time>-<id>.webp
(960 px wide, under 80 KB), the `frames` of content/timelapse.json, and an MP4 (3 fps) at <mp4 out>.
"""
import json, subprocess, sys, tempfile
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
shots, mp4 = Path(sys.argv[1]), Path(sys.argv[2])
jpath = root / "content" / "timelapse.json"
data = json.loads(jpath.read_text(encoding="utf-8"))
out = root / "public" / "timelapse"
out.mkdir(parents=True, exist_ok=True)
for old in out.glob("*.webp"):
    old.unlink()

frames = []
for row in data["deployments"]:
    src = next(iter(shots.glob(row["host"] + ".*")), None)
    if not src:
        continue
    im = Image.open(src).convert("RGB")
    im = im.resize((960, round(im.height * 960 / im.width)), Image.LANCZOS)
    name = f'{row["time"].replace(":", "")}-{row["id"]}.webp'
    for q in (80, 70, 60, 50, 40):
        im.save(out / name, "WEBP", quality=q, method=6)
        if (out / name).stat().st_size < 80_000:
            break
    frames.append({"file": f"/timelapse/{name}", "time": row["time"], "id": row["id"]})

data["frames"] = frames
jpath.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")

with tempfile.TemporaryDirectory() as tmp:
    for n, f in enumerate(frames):
        Image.open(root / "public" / f["file"].lstrip("/")).convert("RGB").save(Path(tmp) / f"{n:04d}.png")
    mp4.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["ffmpeg", "-y", "-framerate", "3", "-i", str(Path(tmp) / "%04d.png"),
                    "-vf", "scale=960:-2", "-c:v", "libx264", "-crf", "28", "-preset", "veryfast",
                    "-pix_fmt", "yuv420p", str(mp4)], check=True)
print(len(frames), "frames")
