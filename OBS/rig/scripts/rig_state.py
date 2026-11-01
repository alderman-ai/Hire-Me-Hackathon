"""Paths, session numbering and the session record, shared by every rig script.

Set RIG_TEST=1 to send everything to _test folders, so trial runs can't take
the real S01 or touch real footage.
"""
import json
import os
import re
import time
from datetime import datetime
from pathlib import Path

TEST = os.environ.get("RIG_TEST") == "1"
_area = "_test" if TEST else ""

RIG = Path(__file__).resolve().parent.parent
OBS_ROOT = RIG.parent
VIDEO_ROOT = Path(r"D:\OBS Outputs") / _area
DATA_ROOT = OBS_ROOT / _area

TO_PROCESS = VIDEO_ROOT / "To process"
UPLOADED = VIDEO_ROOT / "Uploaded"
LIVE = DATA_ROOT / "Live"
PROCESSED = DATA_ROOT / "Processed"
RUN = RIG / "run" / ("test" if TEST else "live")

COMMAND_FILE = RUN / "command.json"
REPLY_FILE = RUN / "reply.json"
PID_FILE = RUN / "controller.pid"
LOG_FILE = RUN / "controller.log"
CLOCK_FILE = DATA_ROOT / "hackathon_clock.json"

_SESSION_NAME = re.compile(r"^S(\d{2})(?:_|\.mp4$)")


def stamp(epoch: float) -> str:
    """Local wall-clock time with its UTC offset (R20)."""
    return datetime.fromtimestamp(epoch).astimezone().isoformat(timespec="milliseconds")


def save_json(path: Path, data) -> None:
    """Write atomically, retrying if a reader briefly holds the file on Windows."""
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix(path.suffix + ".tmp")
    temp.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    for attempt in range(20):
        try:
            os.replace(temp, path)
            return
        except PermissionError:
            if attempt == 19:
                raise
            time.sleep(0.05)


def load_json(path: Path, default=None):
    for attempt in range(20):
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except FileNotFoundError:
            return default
        except (PermissionError, json.JSONDecodeError):
            if attempt == 19:
                raise
            time.sleep(0.05)
    return default


def next_session_number() -> int:
    used = [0]
    for root in (TO_PROCESS, UPLOADED, LIVE, PROCESSED):
        if root.exists():
            for entry in root.iterdir():
                found = _SESSION_NAME.match(entry.name)
                if found:
                    used.append(int(found[1]))
    return max(used) + 1


def new_session_folder(now: float | None = None) -> str:
    moment = datetime.fromtimestamp(now or time.time())
    return f"S{next_session_number():02d}_{moment:%Y-%m-%d_%H%M}"


def hackathon_start(epoch: float) -> float:
    """H+00:00:00 is the start of S01. Set once and never moved."""
    clock = load_json(CLOCK_FILE)
    if clock is None:
        clock = {"start_epoch": epoch, "start_local": stamp(epoch)}
        save_json(CLOCK_FILE, clock)
    return clock["start_epoch"]


def pid_alive(pid: int) -> bool:
    import subprocess

    out = subprocess.run(
        ["tasklist", "/FI", f"PID eq {pid}", "/NH", "/FO", "CSV"],
        capture_output=True, text=True, creationflags=0x08000000,
    ).stdout
    return f'"{pid}"' in out


def controller_pid() -> int | None:
    """The running controller's process id, or None."""
    try:
        pid = int(PID_FILE.read_text(encoding="utf-8").strip())
    except (FileNotFoundError, ValueError):
        return None
    return pid if pid_alive(pid) else None


def current_session() -> Path | None:
    """The session.json of the newest unfinished session."""
    if not LIVE.exists():
        return None
    records = sorted(LIVE.glob("S*/session.json"), key=lambda p: p.parent.name)
    for path in reversed(records):
        state = (load_json(path) or {}).get("state")
        if state in ("starting", "recording", "paused"):
            return path
    return None
