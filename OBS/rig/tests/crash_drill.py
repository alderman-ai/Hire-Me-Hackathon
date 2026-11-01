"""Task 7: kill OBS and each recorder mid-session and time the watchdog's recovery."""
import json
import os
import subprocess
import sys
import time
from pathlib import Path

scripts = Path(r"C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\scripts")
os.environ["RIG_TEST"] = "1"
sys.path.insert(0, str(scripts))
import obs_client as oc  # noqa: E402
import rig_state as rs  # noqa: E402

python = Path(r"C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\.venv\Scripts\python.exe")
FFPROBE = oc.FFMPEG.with_name("ffprobe.exe")


def rig(command: str) -> None:
    done = subprocess.run([str(python), str(scripts / "rig.py"), command],
                          capture_output=True, text=True, cwd=scripts)
    print(f"/{command}: {done.stdout.strip().splitlines()[-1] if done.stdout.strip() else done.stderr[-300:]}")


def session() -> dict:
    return json.loads(record.read_text(encoding="utf-8"))


def wait_for_gap(count: int, limit: float = 90) -> float | None:
    started = time.monotonic()
    while time.monotonic() - started < limit:
        if len(session()["gaps"]) >= count:
            return time.monotonic() - started
        time.sleep(0.25)
    return None


def last_pid(source: str) -> int:
    runs = [r for r in session()["recorder_runs"] if r["source"] == source]
    return runs[-1]["pid"]


def windows() -> list[str]:
    out = subprocess.run(
        ["powershell", "-NoProfile", "-Command",
         "Get-Process obs64 -ErrorAction SilentlyContinue | ForEach-Object { $_.MainWindowTitle }"],
        capture_output=True, text=True,
    ).stdout
    return [line for line in out.splitlines() if line.strip()]


def plays(path: Path) -> str:
    probe = subprocess.run(
        [str(FFPROBE), "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
         "--", str(path)], capture_output=True, text=True,
    ).stdout.strip()
    decode = subprocess.run(
        [str(oc.FFMPEG), "-v", "error", "-i", str(path), "-map", "0:v?", "-map", "0:a?",
         "-f", "null", "-"], capture_output=True, text=True, errors="replace",
    )
    messages = decode.stderr.strip().splitlines()
    first = messages[0][-70:] if messages else "clean"
    return f"{path.name}: {probe or 'no length'} s, {path.stat().st_size / 1e6:.1f} MB, " \
           f"exit {decode.returncode}, {len(messages)} messages ({first})"


rig("start")
record = rs.current_session()
folder = session()["folder"]
time.sleep(25)

print("--- killing OBS")
subprocess.run(["taskkill", "/F", "/IM", "obs64.exe"], capture_output=True)
took = wait_for_gap(1)
print(f"OBS recovered and logged after {took:.1f} s" if took else "OBS did NOT recover in 90 s")
print("OBS window title, if a dialog is up:", windows())
print("state:", session()["state"], "| OBS running:", oc.is_running())
if took is None:
    print(rs.LOG_FILE.read_text(encoding="utf-8")[-900:] if rs.LOG_FILE.exists() else "no log")
time.sleep(15)

print("--- killing the backup recorder")
subprocess.run(["taskkill", "/F", "/PID", str(last_pid("backup"))], capture_output=True)
took = wait_for_gap(2, 40)
print(f"Backup recovered after {took:.1f} s" if took else "Backup did NOT recover")
time.sleep(5)

print("--- killing the webcam recorder")
subprocess.run(["taskkill", "/F", "/PID", str(last_pid("webcam"))], capture_output=True)
took = wait_for_gap(3, 40)
print(f"Webcam recovered after {took:.1f} s" if took else "Webcam did NOT recover")
time.sleep(10)

rig("stop")
time.sleep(1)
final = session()
print("--- session record")
print("state:", final["state"], "| elapsed:", final["elapsed_seconds"])
for span in final["spans"]:
    print(f"span: {span['end'] - span['start']:.1f} s, ended by {span['ended_by']}")
for gap in final["gaps"]:
    print(f"gap: {gap['source']}, {gap['seconds']} s")
print("--- every file plays?")
for path in sorted((rs.TO_PROCESS / folder).rglob("*")):
    if path.suffix in (".mp4", ".mkv"):
        print(plays(path))
for path in sorted((rs.LIVE / folder / "audio-backup").glob("*.flac")):
    print(plays(path))
