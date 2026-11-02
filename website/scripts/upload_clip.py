"""Upload one ready-made video file (a clip a BUILD names) to YouTube, unlisted, for the website.

Uses the rig's uploader and sign-in without changing them, like upload_webcam.py. Uploads the
file as it is, waits for YouTube to finish processing, and records the id in content/clips.json
under the file's stem. Rerunning it for a clip that's already online does nothing.

Run with the rig's Python, which has the Google client installed:
    ..\\OBS\\rig\\.venv\\Scripts\\python.exe scripts\\upload_clip.py <file.mp4> "<title>" ["<description>"]
"""
import json
import subprocess
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
OBS = SITE.parent / "OBS"
CLIPS = SITE / "content" / "clips.json"
sys.path.insert(0, str(OBS / "rig" / "scripts"))

import upload  # noqa: E402  (the rig's uploader)

NO_WINDOW = 0x08000000
DEFAULT_DESCRIPTION = ("A moment from the Hire Me Hackathon, recorded live on 2 Nov 2026. "
                       "A GTM engineer's skillset, built in 12 hours. https://hire-me-hackathon.vercel.app")


def duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True, check=True, creationflags=NO_WINDOW,
    ).stdout
    return float(out.strip())


def main() -> int:
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    path = Path(sys.argv[1]).resolve()
    title = sys.argv[2]
    description = sys.argv[3] if len(sys.argv) > 3 else DEFAULT_DESCRIPTION
    if not path.is_file():
        sys.exit(f"No such file: {path}")
    clips = json.loads(CLIPS.read_text(encoding="utf-8")) if CLIPS.exists() else {}
    key = path.stem
    if clips.get(key, {}).get("youtube_id"):
        print(f"{key} is already online: {clips[key]['youtube_id']}")
        return 0
    seconds = duration(path)
    print(f"{key}: {seconds:.1f} s, {path.stat().st_size / 1e6:.1f} MB. Uploading...", flush=True)

    def show(p):
        print(f"  {p:.0%}" if isinstance(p, float) else f"  YouTube: {p}", flush=True)

    video_id = upload.upload_video(path, title=title, description=description, progress=show)
    clips[key] = {"youtube_id": video_id, "title": title, "seconds": round(seconds, 1)}
    CLIPS.write_text(json.dumps(clips, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Uploaded: {video_id}. Waiting for YouTube to finish processing...", flush=True)
    online = upload.wait_until_ready(video_id, seconds, progress=show)
    print(f"Ready: {key} https://youtu.be/{video_id} (YouTube {online:.0f} s, local {seconds:.1f} s)", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
