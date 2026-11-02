"""The command behind each skill: rig.py start, pause, stop, status or process."""
import shutil
import subprocess
import sys
import time
import uuid
from pathlib import Path

import rig_state as rs

CONTROLLER = Path(__file__).resolve().with_name("controller.py")
DETACHED = 0x00000008 | 0x00000200  # DETACHED_PROCESS, CREATE_NEW_PROCESS_GROUP
BREAKAWAY = 0x01000000  # CREATE_BREAKAWAY_FROM_JOB
START_LIMIT = 120
COMMAND_LIMIT = 60


def launch_controller(folder: str) -> None:
    pythonw = Path(sys.executable).with_name("pythonw.exe")
    args = [str(pythonw), str(CONTROLLER), folder]
    options = {
        "stdin": subprocess.DEVNULL,
        "stdout": subprocess.DEVNULL,
        "stderr": subprocess.DEVNULL,
        "cwd": str(CONTROLLER.parent),
        "close_fds": True,
    }
    try:
        subprocess.Popen(args, creationflags=DETACHED | BREAKAWAY, **options)
    except OSError:
        subprocess.Popen(args, creationflags=DETACHED, **options)


def start() -> int:
    if rs.controller_pid():
        record = rs.current_session()
        name = rs.load_json(record)["id"] if record else "A session"
        print(f"{name} is already running. Type /stop first.")
        return 1

    folder = rs.new_session_folder()
    session_id = folder[:3]
    live = rs.LIVE / folder
    (rs.TO_PROCESS / folder).mkdir(parents=True, exist_ok=True)
    live.mkdir(parents=True, exist_ok=True)
    rs.RUN.mkdir(parents=True, exist_ok=True)
    rs.COMMAND_FILE.unlink(missing_ok=True)
    rs.REPLY_FILE.unlink(missing_ok=True)
    record = live / "session.json"
    rs.save_json(record, {
        "id": session_id, "folder": folder, "state": "starting", "spans": [], "gaps": [],
        "recorder_runs": [], "elapsed_seconds": 0, "steps": {},
    })

    print(f"Starting {session_id}...")
    launch_controller(folder)

    deadline = time.monotonic() + START_LIMIT
    while time.monotonic() < deadline:
        session = rs.load_json(record)
        state = session["state"]
        if state in ("recording", "blocked", "failed"):
            for line in session.get("preflight", []):
                print(line)
            if state == "recording":
                print(f"{session_id} is recording. Type /stop when you're done.")
                return 0
            print(f"{session_id} did not start.", session.get("error", ""))
            if state == "blocked":
                # Nothing was recorded, so don't use up the session number.
                shutil.rmtree(live, ignore_errors=True)
                shutil.rmtree(rs.TO_PROCESS / folder, ignore_errors=True)
            return 1
        time.sleep(0.25)
    print(f"{session_id} hasn't reported in after {START_LIMIT} seconds. Check OBS.")
    return 1


def send(command: str) -> int:
    if not rs.controller_pid():
        print("No session is running.")
        return 1
    request_id = uuid.uuid4().hex
    rs.REPLY_FILE.unlink(missing_ok=True)
    rs.save_json(rs.COMMAND_FILE, {"id": request_id, "command": command})
    deadline = time.monotonic() + COMMAND_LIMIT
    while time.monotonic() < deadline:
        reply = rs.load_json(rs.REPLY_FILE)
        if reply and reply["id"] == request_id:
            print(reply["message"])
            return 0 if reply["ok"] else 1
        time.sleep(0.1)
    print("The controller didn't answer. The recording may still be running.")
    return 1


def status() -> int:
    record = rs.current_session()
    if record is None:
        print("No session is running.")
        return 0
    session = rs.load_json(record)
    alive = "running" if rs.controller_pid() else "NOT RUNNING"
    print(f"{session['id']}: {session['state']}, "
          f"{session['elapsed_seconds'] / 60:.0f} minutes recorded, controller {alive}")
    return 0


def main() -> int:
    """Run one command.

    Skills pass --skill, which always exits 0. A skill whose command fails is aborted,
    and Alex would lose the message saying what went wrong.
    """
    result = run(sys.argv[1] if len(sys.argv) > 1 else "status")
    return 0 if "--skill" in sys.argv else result


def run(command: str) -> int:
    if command == "start":
        return start()
    if command in ("pause", "stop"):
        return send(command)
    if command == "status":
        return status()
    if command == "process":
        import process

        return process.main()
    print(f"Unknown command: {command}")
    return 2


if __name__ == "__main__":
    sys.exit(main())
