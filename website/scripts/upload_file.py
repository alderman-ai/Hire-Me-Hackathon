"""Upload one finished video file to YouTube (unlisted) for the website, and record its id.
For files that aren't a session's raw webcam (upload_webcam.py does those): a cut, a composite, a
time-lapse. Uses the rig's uploader and sign-in without changing them, waits for YouTube to finish
processing, and writes the id to content/videos.json under KEY. An existing KEY is kept unless --replace.
Run with the rig's Python, which has the Google client installed:
    ..\\OBS\\rig\\.venv\\Scripts\\python.exe scripts\\upload_file.py <file.mp4> <KEY> "<title>" [--replace]
"""
import json
import subprocess
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
OBS = SITE.parent / "OBS"
VIDEOS = SITE / "content" / "videos.json"
sys.path.insert(0, str(OBS / "rig" / "scripts"))

import upload  # noqa: E402  (the rig's uploader)

NO_WINDOW = 0x08000000


def duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)],
        capture_output=True, text=True, creationflags=NO_WINDOW, check=True,
    )
    return float(out.stdout.strip())


def main() -> int:
    args = [a for a in sys.argv[1:] if a != "--replace"]
    replace = "--replace" in sys.argv
    if len(args) < 3:
        print(__doc__)
        return 2
    path, key, title = Path(args[0]), args[1], args[2]
    videos = json.loads(VIDEOS.read_text(encoding="utf-8")) if VIDEOS.exists() else {}
    if videos.get(key) and not replace:
        print(f"{key} is already online: {videos[key]} (pass --replace to swap it)")
        return 0
    seconds = duration(path)
    print(f"{path.name}: {seconds:.1f} s, {path.stat().st_size / 1e6:.0f} MB. Uploading...")

    def show(p):
        print(f"  {p:.0%}" if isinstance(p, float) else f"  YouTube: {p}", flush=True)

    video_id = upload.upload_video(
        path,
        title=title,
        description="Recorded live during the Hire Me Hackathon. A GTM engineer's skillset, built in 12 hours.",
        progress=show,
    )
    old = videos.get(key)
    videos[key] = video_id
    VIDEOS.write_text(json.dumps(videos, indent=2) + "\n", encoding="utf-8")
    print(f"Uploaded: {video_id}" + (f" (replaces {old})" if old else "") + ". Waiting for YouTube to finish processing...")
    online = upload.wait_until_ready(video_id, seconds, progress=show)
    print(f"Ready: YouTube has {online:.0f} s, local {seconds:.1f} s. https://youtu.be/{video_id}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
