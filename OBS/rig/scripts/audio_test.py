"""Task 5: record Alex talking, set the mic gain, and prove the audio tracks are right.

Usage: python audio_test.py <work folder> [--dry]

Alex talks for about 45 seconds between two voice cues. The script records one pass,
sets the gain, records a second pass, and checks that second pass. OBS and the ffmpeg
backup run together throughout. --dry skips the voice cues and changes no settings.
All footage is deleted at the end.
"""
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path

import obs_client as oc
from cuda_env import add_cuda_libs

PASS_SECONDS = 20
TARGET_LOW, TARGET_HIGH = -20.0, -10.0
TARGET_PEAK = -13.0
MAX_BOOST = 20.0
BOOST_FILTER = "Mic boost"
REAL_DIR = "D:/OBS Outputs/To process"
SILENT = -91.0


def say(text: str) -> None:
    command = (
        "Add-Type -AssemblyName System.Speech; "
        "(New-Object System.Speech.Synthesis.SpeechSynthesizer)"
        f".Speak('{text}')"
    )
    subprocess.run(["powershell", "-NoProfile", "-Command", command], check=False)


def start_backup(folder: Path) -> subprocess.Popen:
    """R5 uses 300-second segments. This test uses 10 so several get written."""
    log = (folder / "backup.log").open("w", encoding="utf-8")
    return subprocess.Popen(
        [str(oc.FFMPEG), "-hide_banner", "-loglevel", "warning", "-nostats",
         "-f", "dshow", "-i", oc.mic_dshow(),
         "-c:a", "flac", "-f", "segment", "-segment_time", "10", "-strftime", "1",
         str(folder / "backup_%H%M%S.flac")],
        stdin=subprocess.PIPE, stderr=log,
    )


def record_pass(client, folder: Path, seconds: float) -> Path:
    folder.mkdir(exist_ok=True)
    client.set_record_directory(folder.as_posix())
    client.start_record()
    time.sleep(seconds)
    client.stop_record()
    deadline = time.monotonic() + 20
    while client.get_record_status().output_active and time.monotonic() < deadline:
        time.sleep(0.25)
    time.sleep(1)
    return max(folder.glob("*.mp4"), key=lambda f: f.stat().st_mtime)


def levels(path: Path, track: int) -> tuple[float, float]:
    """Peak and mean dB of an audio track. Tracks count from 1, as in OBS."""
    out = subprocess.run(
        [str(oc.FFMPEG), "-hide_banner", "-i", str(path), "-map", f"0:a:{track - 1}",
         "-af", "volumedetect", "-f", "null", "-"],
        capture_output=True, text=True, encoding="utf-8", errors="replace",
    ).stderr
    peak = re.search(r"max_volume: (-?[\d.]+|-inf) dB", out)
    mean = re.search(r"mean_volume: (-?[\d.]+|-inf) dB", out)
    read = lambda m: SILENT if not m or m[1] == "-inf" else float(m[1])  # noqa: E731
    return read(peak), read(mean)


def apply_gain(client, peak: float) -> None:
    """Bring the peak to the target. OBS's fader stops at 0 dB, so boosts use a filter."""
    change = TARGET_PEAK - peak
    filters = [f["filterName"] for f in client.get_source_filter_list(oc.MIC_INPUT).filters]
    if change <= 0:
        client.set_input_volume(oc.MIC_INPUT, vol_db=change)
        print(f"Gain: lowered {oc.MIC_INPUT} by {-change:.1f} dB")
        return
    boost = min(change, MAX_BOOST)
    settings = {"db": boost}
    if BOOST_FILTER in filters:
        client.set_source_filter_settings(oc.MIC_INPUT, BOOST_FILTER, settings, True)
    else:
        client.create_source_filter(oc.MIC_INPUT, BOOST_FILTER, "gain_filter", settings)
    client.set_input_volume(oc.MIC_INPUT, vol_db=0.0)
    print(f"Gain: boosted {oc.MIC_INPUT} by {boost:.1f} dB")
    if change > MAX_BOOST:
        print("Knob: turn the Wave:3's own gain up. OBS can't safely boost this much.")


def extract(video: Path, track: int, wav: Path) -> None:
    subprocess.run(
        [str(oc.FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(video),
         "-map", f"0:a:{track - 1}", "-ac", "1", "-ar", "16000", str(wav)],
        check=True,
    )


def transcribe(wav: Path) -> str:
    add_cuda_libs()
    from faster_whisper import WhisperModel

    model = WhisperModel(
        "small", device="cuda", compute_type="float16",
        download_root=str(oc.RIG / "models"),
    )
    segments, _ = model.transcribe(str(wav), vad_filter=True)
    return " ".join(s.text.strip() for s in segments)


def check_backup(folder: Path) -> tuple[int, float, bool]:
    files = sorted(folder.glob("backup_*.flac"))
    total, clean = 0.0, bool(files)
    for f in files:
        # ffmpeg's segment writer stores no length in FLAC headers, so decode to measure.
        decoded = subprocess.run(
            [str(oc.FFMPEG), "-v", "error", "-nostats", "-i", str(f), "-f", "null", "-",
             "-progress", "pipe:1"],
            capture_output=True, text=True,
        )
        times = re.findall(r"out_time_us=(\d+)", decoded.stdout)
        total += int(times[-1]) / 1e6 if times else 0.0
        clean &= decoded.returncode == 0 and not decoded.stderr.strip() and bool(times)
    return len(files), total, clean


def main() -> int:
    work = Path(sys.argv[1])
    dry = "--dry" in sys.argv
    seconds = 5 if dry else PASS_SECONDS
    if oc.is_running():
        print("OBS is already running. Close it first.")
        return 1
    work.mkdir(parents=True, exist_ok=True)

    proc = oc.launch("--profile", oc.PROFILE, "--collection", oc.COLLECTION)
    client = None
    backup = None
    passed = False
    try:
        client = oc.wait_for_websocket()
        backup = start_backup(work)
        time.sleep(2)
        if backup.poll() is not None:
            print("Backup recorder failed:", (work / "backup.log").read_text(encoding="utf-8")[-500:])
            return 1

        if not dry:
            say("Please start talking now.")
        first = record_pass(client, work / "pass1", seconds)
        peak1, mean1 = levels(first, 2)
        print(f"Pass 1, track 2: peak {peak1:.1f} dB, mean {mean1:.1f} dB")
        print(f"Pass 1, track 3: peak {levels(first, 3)[0]:.1f} dB")

        in_range = TARGET_LOW <= peak1 <= TARGET_HIGH
        if not dry and not in_range:
            apply_gain(client, peak1)

        second = record_pass(client, work / "pass2", seconds)
        if not dry:
            say("Thank you. You can stop now.")
        peak2, mean2 = levels(second, 2)
        print(f"Pass 2, track 2: peak {peak2:.1f} dB, mean {mean2:.1f} dB")
        print(f"Pass 2, track 3: peak {levels(second, 3)[0]:.1f} dB")
        print(f"Pass 2, track 1: peak {levels(second, 1)[0]:.1f} dB")
        print(f"OBS mic fader: {client.get_input_volume(oc.MIC_INPUT).input_volume_db:.1f} dB")

        backup.communicate(b"q", timeout=15)
        count, total, clean = check_backup(work)
        print(f"Backup: {count} FLAC files, {total:.1f} s, all decode cleanly: {clean}")
        warnings = (work / "backup.log").read_text(encoding="utf-8").strip()
        print(f"Backup warnings: {warnings[-300:] if warnings else 'none'}")

        wav = work / "track2.wav"
        extract(second, 2, wav)
        print(f"Track 2 transcript: {transcribe(wav) or '(no speech)'}")

        level_ok = TARGET_LOW <= peak2 <= TARGET_HIGH
        passed = clean and (dry or level_ok)
        print("PASS" if passed else "FAIL")
        return 0 if passed else 1
    finally:
        if backup is not None and backup.poll() is None:
            backup.kill()
        if client is not None:
            try:
                client.set_record_directory(REAL_DIR)
                print(f"Record path restored: {client.get_record_directory().record_directory}")
            except Exception as error:
                print(f"Couldn't restore the record path: {error}")
        print(f"OBS closed cleanly: {oc.close(proc, client)}")
        shutil.rmtree(work, ignore_errors=True)
        print(f"Test audio deleted: {not work.exists()}")


if __name__ == "__main__":
    sys.exit(main())
