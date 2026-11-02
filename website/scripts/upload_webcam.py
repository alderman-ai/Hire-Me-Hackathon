"""Upload a filed session's webcam recording to YouTube (unlisted) for the website.

Uses the rig's uploader and sign-in without changing them. Repackages the webcam
MKV(s) to one MP4 (stream copy, no re-encode) in a scratch folder, uploads it, waits
for YouTube to finish processing, and records the id in content/videos.json.

Run with the rig's Python, which has the Google client installed:
    ..\\OBS\\rig\\.venv\\Scripts\\python.exe scripts\\upload_webcam.py S01 [scratch_dir]
"""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
OBS = SITE.parent / "OBS"
VIDEOS = SITE / "content" / "videos.json"
sys.path.insert(0, str(OBS / "rig" / "scripts"))

import upload  # noqa: E402  (the rig's uploader)

NO_WINDOW = 0x08000000


def manifest(session: str) -> dict:
    found = sorted((OBS / "Processed").glob(f"{session}_*/manifest.json"))
    if not found:
        sys.exit(f"{session} isn't filed yet: no manifest in OBS\\Processed")
    return json.loads(found[-1].read_text(encoding="utf-8"))


def duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True, check=True, creationflags=NO_WINDOW,
    ).stdout
    return float(out.strip())


def repackage(sources: list[Path], out: Path) -> None:
    listing = out.with_suffix(".txt")
    listing.write_text("".join(f"file '{p.as_posix()}'\n" for p in sources), encoding="utf-8")
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(listing),
         "-map", "0:v:0", "-map", "0:a:0", "-c", "copy", "-movflags", "+faststart", str(out)],
        check=True, creationflags=NO_WINDOW,
    )


def main() -> int:
    session = sys.argv[1]
    scratch = Path(sys.argv[2]) if len(sys.argv) > 2 else Path(tempfile.gettempdir())
    videos = json.loads(VIDEOS.read_text(encoding="utf-8")) if VIDEOS.exists() else {}
    if videos.get(session):
        print(f"{session} is already online: {videos[session]}")
        return 0

    m = manifest(session)
    folder = Path(m["webcam_folder"])
    sources = [folder / w["name"] for w in m["webcam"]]
    out = scratch / f"{session}_webcam.mp4"
    print(f"Repackaging {len(sources)} webcam file(s) to {out}")
    repackage(sources, out)
    seconds = duration(out)
    print(f"{seconds:.1f} s, {out.stat().st_size / 1e6:.0f} MB. Uploading...")

    def show(p):
        print(f"  {p:.0%}" if isinstance(p, float) else f"  YouTube: {p}", flush=True)

    video_id = upload.upload_video(
        out,
        title=f"Hire Me Hackathon {session} (webcam)",
        description=f"Session {session} of the Hire Me Hackathon, recorded live. "
                    "A GTM engineer's skillset, built in 12 hours.",
        progress=show,
    )
    videos[session] = video_id
    VIDEOS.parent.mkdir(exist_ok=True)
    VIDEOS.write_text(json.dumps(videos, indent=2) + "\n", encoding="utf-8")
    print(f"Uploaded: {video_id}. Waiting for YouTube to finish processing...")
    online = upload.wait_until_ready(video_id, seconds, progress=show)
    print(f"Ready: YouTube has {online:.0f} s, local {seconds:.1f} s. https://youtu.be/{video_id}")
    out.unlink()
    out.with_suffix(".txt").unlink()
    return 0


if __name__ == "__main__":
    sys.exit(main())
