"""Task 6 trial: start, pause, resume, stop in test mode, then report what was written."""
import json
import os
import subprocess
import sys
import time
from pathlib import Path

scripts = Path(r"C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\scripts")
os.environ["RIG_TEST"] = "1"
sys.path.insert(0, str(scripts))
import rig_state as rs  # noqa: E402

python = Path(r"C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\.venv\Scripts\python.exe")


def rig(command: str) -> int:
    started = time.monotonic()
    done = subprocess.run([str(python), str(scripts / "rig.py"), command],
                          capture_output=True, text=True, cwd=scripts)
    print(f"--- /{command} took {time.monotonic() - started:.1f} s, exit {done.returncode}")
    print(done.stdout.strip())
    if done.stderr.strip():
        print("stderr:", done.stderr.strip()[-600:])
    return done.returncode


if rig("start") != 0:
    log = rs.LOG_FILE
    print(log.read_text(encoding="utf-8")[-1500:] if log.exists() else "no controller log")
    sys.exit(1)
record = rs.current_session()
time.sleep(20)
rig("status")
rig("pause")
time.sleep(8)
rig("status")
rig("pause")
time.sleep(20)
rig("stop")
time.sleep(1)

session = json.loads(record.read_text(encoding="utf-8"))
print("--- session record")
print("state:", session["state"], "| elapsed:", session["elapsed_seconds"])
for span in session["spans"]:
    print(f"span: {span['end'] - span['start']:.1f} s, ended by {span['ended_by']}")
for first, second in zip(session["spans"], session["spans"][1:]):
    print(f"gap between spans: {second['start'] - first['end']:.1f} s")
print("gaps logged:", session["gaps"])
print("recorder runs:", [(r["source"]) for r in session["recorder_runs"]])
print("hackathon start:", session.get("hackathon_start"))
print("controller still running:", rs.controller_pid())
print("--- files")
folder = rs.TO_PROCESS / session["folder"]
for path in sorted(folder.rglob("*")):
    if path.is_file():
        print(f"{path.relative_to(folder)}  {path.stat().st_size / 1e6:.1f} MB")
backup = rs.LIVE / session["folder"] / "audio-backup"
for path in sorted(backup.glob("*")):
    print(f"audio-backup/{path.name}  {path.stat().st_size / 1e6:.2f} MB")
