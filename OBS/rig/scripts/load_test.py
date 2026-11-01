"""Task 4: record the screen and webcam together, measure the load, delete the footage.

Usage: python load_test.py [minutes]

The footage goes to a test folder on D: so the disk is tested too. It's deleted at
the end, because this is a measurement and nobody needs to watch it.
"""
import csv
import ctypes
import json
import shutil
import subprocess
import sys
import time
from ctypes import wintypes
from pathlib import Path

import obs_client as oc

WEBCAM = "BRIO 4K Stream Edition"
WEBCAM_MIC = "Mikrofon (BRIO 4K Stream Edition)"
TEST_DIR = Path(r"D:\OBS Outputs\To process\_load_test")
REAL_DIR = "D:/OBS Outputs/To process"
SAMPLE_EVERY = 5
FFMPEG = Path(r"C:\Users\alder\AppData\Local\Microsoft\WinGet\Links\ffmpeg.exe")
FFPROBE = FFMPEG.with_name("ffprobe.exe")


def webcam_command(folder: Path) -> list[str]:
    return [
        str(FFMPEG), "-hide_banner", "-loglevel", "warning", "-nostats",
        "-f", "dshow", "-rtbufsize", "512M", "-vcodec", "mjpeg",
        "-video_size", "1920x1080", "-framerate", "30",
        "-i", f"video={WEBCAM}:audio={WEBCAM_MIC}",
        # The BRIO's MJPEG decodes to 4:2:2, which h264_nvenc refuses, so convert it.
        "-pix_fmt", "nv12",
        "-c:v", "h264_nvenc", "-preset", "p4", "-rc", "vbr", "-cq", "28", "-b:v", "0",
        "-g", "60", "-c:a", "aac", "-b:a", "96k",
        "-f", "segment", "-segment_time", "900", "-reset_timestamps", "1",
        str(folder / "webcam_%03d.mkv"),
    ]


class CpuMeter:
    """Whole-machine CPU use since the previous reading."""

    def __init__(self):
        self.previous = self._read()

    @staticmethod
    def _read():
        idle, kernel, user = wintypes.FILETIME(), wintypes.FILETIME(), wintypes.FILETIME()
        ctypes.windll.kernel32.GetSystemTimes(
            ctypes.byref(idle), ctypes.byref(kernel), ctypes.byref(user)
        )
        to_int = lambda t: (t.dwHighDateTime << 32) | t.dwLowDateTime  # noqa: E731
        return to_int(idle), to_int(kernel) + to_int(user)

    def percent(self) -> float:
        idle, total = self._read()
        spent = total - self.previous[1]
        busy = 100 * (1 - (idle - self.previous[0]) / spent) if spent else 0.0
        self.previous = (idle, total)
        return busy


def gpu_sample() -> dict[str, int]:
    fields = "utilization.gpu,utilization.encoder,memory.used"
    out = subprocess.check_output(
        ["nvidia-smi", f"--query-gpu={fields}", "--format=csv,noheader,nounits"],
        text=True,
    )
    gpu, encoder, memory = (int(v.strip()) for v in out.split(","))
    return {"gpu": gpu, "encoder": encoder, "vram": memory}


def duration(path: Path) -> float:
    out = subprocess.check_output(
        [str(FFPROBE), "-v", "error", "-show_entries", "format=duration",
         "-of", "json", "--", str(path)],
        text=True,
    )
    return float(json.loads(out)["format"]["duration"])


def summarise(files: list[Path]) -> tuple[float, float]:
    size = sum(f.stat().st_size for f in files) / 1e9
    seconds = sum(duration(f) for f in files)
    return size, seconds


def main() -> int:
    minutes = float(sys.argv[1]) if len(sys.argv) > 1 else 10
    results = Path(__file__).resolve().parent.parent / "load_test_results.csv"
    if oc.is_running():
        print("OBS is already running. Close it first.")
        return 1
    webcam_dir = TEST_DIR / "webcam"
    webcam_dir.mkdir(parents=True, exist_ok=True)

    proc = oc.launch("--profile", oc.PROFILE, "--collection", oc.COLLECTION)
    client = None
    webcam = None
    samples = []
    log_path = TEST_DIR / "webcam_ffmpeg.log"
    try:
        client = oc.wait_for_websocket()
        client.set_record_directory(TEST_DIR.as_posix())
        with log_path.open("w", encoding="utf-8") as log:
            webcam = subprocess.Popen(
                webcam_command(webcam_dir), stdin=subprocess.PIPE, stderr=log
            )
        time.sleep(3)
        if webcam.poll() is not None:
            print(f"Webcam capture failed: {log_path.read_text(encoding='utf-8')[-600:]}")
            return 1

        start = client.get_stats()
        client.start_record()
        cpu = CpuMeter()
        end_at = time.monotonic() + minutes * 60
        while time.monotonic() < end_at:
            time.sleep(SAMPLE_EVERY)
            stats = client.get_stats()
            samples.append({
                "cpu_total": round(cpu.percent(), 1),
                "obs_cpu": round(stats.cpu_usage, 1),
                "obs_mem_mb": round(stats.memory_usage),
                "fps": round(stats.active_fps, 1),
                "frame_ms": round(stats.average_frame_render_time, 2),
                "render_skipped": stats.render_skipped_frames - start.render_skipped_frames,
                "encoder_skipped": stats.output_skipped_frames - start.output_skipped_frames,
                **gpu_sample(),
            })
            if webcam.poll() is not None:
                print("Webcam capture stopped early.")
                break

        end = client.get_stats()
        client.stop_record()
        deadline = time.monotonic() + 30
        while client.get_record_status().output_active and time.monotonic() < deadline:
            time.sleep(0.5)
        if webcam.poll() is not None:
            print(f"Webcam log: {log_path.read_text(encoding='utf-8')[-800:]}")
            return 1
        webcam.communicate(b"q", timeout=20)

        render_total = end.render_total_frames - start.render_total_frames
        output_total = end.output_total_frames - start.output_total_frames
        render_skip = end.render_skipped_frames - start.render_skipped_frames
        output_skip = end.output_skipped_frames - start.output_skipped_frames
        screen_size, screen_secs = summarise(sorted(TEST_DIR.glob("*.mp4")))
        cam_size, cam_secs = summarise(sorted(webcam_dir.glob("*.mkv")))
        peak = lambda key: max(s[key] for s in samples)  # noqa: E731
        mean = lambda key: sum(s[key] for s in samples) / len(samples)  # noqa: E731

        print(f"Ran {screen_secs / 60:.1f} minutes")
        print(f"Render skipped: {render_skip} of {render_total} "
              f"({100 * render_skip / max(render_total, 1):.2f}%)")
        print(f"Encoder skipped: {output_skip} of {output_total} "
              f"({100 * output_skip / max(output_total, 1):.2f}%)")
        print(f"Whole-machine CPU: mean {mean('cpu_total'):.0f}%, peak {peak('cpu_total'):.0f}%")
        print(f"OBS CPU: mean {mean('obs_cpu'):.1f}%")
        print(f"GPU: mean {mean('gpu'):.0f}%, peak {peak('gpu')}%")
        print(f"NVENC: mean {mean('encoder'):.0f}%, peak {peak('encoder')}%")
        print(f"VRAM: peak {peak('vram')} MiB of 12288")
        print(f"Screen: {screen_size:.2f} GB, {screen_size / (screen_secs / 3600):.2f} GB per hour")
        print(f"Webcam: {cam_size:.2f} GB, {cam_size / (cam_secs / 3600):.2f} GB per hour, "
              f"{cam_secs / 60:.1f} minutes")
        warnings = log_path.read_text(encoding="utf-8").strip()
        print(f"Webcam warnings: {warnings[-400:] if warnings else 'none'}")

        with results.open("w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=list(samples[0]))
            writer.writeheader()
            writer.writerows(samples)
        return 0
    finally:
        if webcam is not None and webcam.poll() is None:
            webcam.kill()
        if client is not None:
            try:
                if client.get_record_status().output_active:
                    client.stop_record()
                    time.sleep(3)
                client.set_record_directory(REAL_DIR)
                print(f"Record path restored: {client.get_record_directory().record_directory}")
            except Exception as error:
                print(f"Couldn't restore the record path: {error}")
        print(f"OBS closed cleanly: {oc.close(proc, client)}")
        shutil.rmtree(TEST_DIR, ignore_errors=True)
        print(f"Test footage deleted: {not TEST_DIR.exists()}")


if __name__ == "__main__":
    sys.exit(main())
