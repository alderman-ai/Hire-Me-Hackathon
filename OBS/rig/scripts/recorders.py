"""The two ffmpeg recorders that run beside OBS: audio backup (R5) and webcam (R27)."""
import subprocess
from pathlib import Path

import obs_client as oc

NO_WINDOW = 0x08000000
WEBCAM = "BRIO 4K Stream Edition"
WEBCAM_MIC = "Mikrofon (BRIO 4K Stream Edition)"
BACKUP_SEGMENT_SECONDS = 300
WEBCAM_SEGMENT_SECONDS = 900


def _spawn(args: list[str], log_path: Path) -> subprocess.Popen:
    log_path.parent.mkdir(parents=True, exist_ok=True)
    log = log_path.open("a", encoding="utf-8")
    return subprocess.Popen(
        args,
        stdin=subprocess.PIPE,
        stdout=subprocess.DEVNULL,
        stderr=log,
        creationflags=NO_WINDOW,
    )


def start_backup(folder: Path) -> subprocess.Popen:
    """FLAC in 5-minute segments, stamped with the time so gaps are easy to see."""
    folder.mkdir(parents=True, exist_ok=True)
    return _spawn(
        [str(oc.FFMPEG), "-hide_banner", "-loglevel", "warning", "-nostats",
         "-f", "dshow", "-i", oc.mic_dshow(),
         "-c:a", "flac", "-f", "segment", "-segment_time", str(BACKUP_SEGMENT_SECONDS),
         "-strftime", "1", str(folder / "backup_%Y%m%d_%H%M%S.flac")],
        folder / "backup.log",
    )


def start_webcam(folder: Path, log_path: Path) -> subprocess.Popen:
    """H.264 in MKV segments, so a crash loses at most the tail of one file.

    The BRIO's mic is recorded too, to align this file with the Wave:3 track later.
    Its MJPEG decodes to 4:2:2, which h264_nvenc refuses, hence nv12.
    """
    folder.mkdir(parents=True, exist_ok=True)
    return _spawn(
        [str(oc.FFMPEG), "-hide_banner", "-loglevel", "warning", "-nostats",
         "-f", "dshow", "-rtbufsize", "512M", "-vcodec", "mjpeg",
         "-video_size", "1920x1080", "-framerate", "30",
         "-i", f"video={WEBCAM}:audio={WEBCAM_MIC}",
         "-pix_fmt", "nv12",
         "-c:v", "h264_nvenc", "-preset", "p4", "-rc", "vbr", "-cq", "28", "-b:v", "0",
         "-g", "60", "-c:a", "aac", "-b:a", "96k",
         "-f", "segment", "-segment_time", str(WEBCAM_SEGMENT_SECONDS),
         "-reset_timestamps", "1", "-strftime", "1",
         str(folder / "webcam_%Y%m%d_%H%M%S.mkv")],
        log_path,
    )


def stop(proc: subprocess.Popen | None, limit: float = 15) -> None:
    """Ask ffmpeg to finish its file, and force it only if it won't."""
    if proc is None or proc.poll() is not None:
        return
    try:
        proc.communicate(b"q", timeout=limit)
    except (subprocess.TimeoutExpired, ValueError, OSError):
        proc.kill()
