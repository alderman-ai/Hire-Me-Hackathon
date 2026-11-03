"""Publish the hackathon countdown and session list for the website.

Reads the capture rig's session records and never writes to them. Publishes
status.json to the site's Blob store when the clock's state changes, and every
HEARTBEAT seconds while a session is recording so the page can tell the sync is alive.

    python clock_sync.py            loop forever (start it with pythonw to stay hidden)
    python clock_sync.py --once     publish now if anything changed, then exit
    python clock_sync.py --status   print what would be published, publish nothing
"""
import json
import os
import shutil
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

BUDGET_SECONDS = 12 * 3600
POLL = 5
HEARTBEAT = 600
BLOB_PATH = "status.json"
NO_WINDOW = 0x08000000  # Never flash a console on camera.

SITE = Path(__file__).resolve().parent.parent
OBS = SITE.parent / "OBS"
LIVE = OBS / "Live"
PROCESSED = OBS / "Processed"
CLOCK_FILE = OBS / "hackathon_clock.json"
WEBCAM_VIDEOS = SITE / "content" / "videos.json"
WORK = SITE / ".clock"
LAST = WORK / "last_published.json"
LOG = WORK / "sync.log"
PID = WORK / "sync.pid"
# Manual corrections, counted as time already used: [{"seconds": 3600, "reason": "...", "at": "..."}].
ADJUST = WORK / "adjustments.json"
# Written when Alex calls the end: {"at": <epoch seconds>}. Turns the site's bar to "Finished".
FINISHED = WORK / "finished.json"


def log(text: str) -> None:
    WORK.mkdir(exist_ok=True)
    line = f"{datetime.now().astimezone().isoformat(timespec='seconds')} {text}"
    with LOG.open("a", encoding="utf-8") as f:
        f.write(line + "\n")
    if sys.stdout:
        print(line)


def read_json(path: Path, default=None):
    for _ in range(20):
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except FileNotFoundError:
            return default
        except (PermissionError, json.JSONDecodeError):
            time.sleep(0.05)  # The rig is mid-write.
    return default


def session_records() -> dict[str, dict]:
    """Every session the rig knows, keyed by id. A live copy beats a filed one."""
    found = {}
    for root in (PROCESSED, LIVE):
        for path in sorted(root.glob("S*/session.json")) if root.exists() else []:
            record = read_json(path)
            if record and record.get("id"):
                found[record["id"]] = record
    return found


def youtube_ids() -> dict[str, str]:
    """The site shows the webcam, so only upload_webcam.py's ids count.

    The rig's own youtube_id in index.json is the screen recording. Never use it here.
    """
    return {k: v for k, v in (read_json(WEBCAM_VIDEOS, {}) or {}).items() if v}


def build_status() -> dict:
    banked = 0.0
    running_since = None
    status, current = "idle", None
    sessions = []
    last_end = None
    videos = youtube_ids()
    for sid, record in sorted(session_records().items()):
        spans = record.get("spans") or []
        closed = sum(s["end"] - s["start"] for s in spans if s.get("end"))
        ends = [s["end"] for s in spans if s.get("end")]
        if ends:
            last_end = max(ends) if last_end is None else max(last_end, max(ends))
        seconds = closed
        state = record.get("state")
        if spans and spans[-1].get("end") is None:
            if state == "recording":
                running_since = spans[-1]["start"]
                status, current = "recording", sid
            else:
                # A controller that died mid-span. Its last save is the best figure.
                seconds = max(closed, float(record.get("elapsed_seconds") or 0))
        if state == "paused":
            status, current = "paused", sid
        banked += seconds
        sessions.append({
            "id": sid,
            "seconds": round(seconds, 1),
            "state": state,
            "youtube_id": videos.get(sid),
        })
    adjust = sum(float(a.get("seconds") or 0) for a in (read_json(ADJUST, []) or []))
    banked += adjust
    clock = read_json(CLOCK_FILE, {}) or {}
    finished_at = None
    marked = read_json(FINISHED, None)
    if isinstance(marked, dict) and marked.get("at"):
        finished_at = float(marked["at"])
    elif banked >= BUDGET_SECONDS and status != "recording":
        finished_at = last_end
    if finished_at is not None and status != "recording":
        status, current = "finished", None
    return {
        "budget_seconds": BUDGET_SECONDS,
        "banked_seconds": round(banked, 1),
        "adjust_seconds": round(adjust, 1),
        "running_since": running_since,
        "status": status,
        "session": current,
        "hackathon_start": clock.get("start_epoch"),
        "finished_at": finished_at,
        "built_seconds": round(min(banked, BUDGET_SECONDS), 1),
        "sessions": sessions,
    }


def signature(status: dict) -> str:
    """What the page cares about. A change here means publish now."""
    keep = {k: v for k, v in status.items() if k != "published_at"}
    return json.dumps(keep, sort_keys=True)


def publish(status: dict) -> bool:
    status = {**status, "published_at": round(time.time(), 3)}
    WORK.mkdir(exist_ok=True)
    out = WORK / BLOB_PATH
    out.write_text(json.dumps(status, indent=2), encoding="utf-8")
    vercel = shutil.which("vercel") or shutil.which("vercel.cmd")
    result = subprocess.run(
        [vercel, "blob", "put", str(out), "--pathname", BLOB_PATH, "--access", "public",
         "--allow-overwrite", "true", "--cache-control-max-age", "60",
         "--content-type", "application/json", "--multipart", "false"],
        cwd=SITE, capture_output=True, text=True, encoding="utf-8", errors="replace",
        creationflags=NO_WINDOW, env={**os.environ, "MSYS_NO_PATHCONV": "1"},
    )
    if result.returncode != 0:
        log(f"publish failed ({result.returncode}): {(result.stderr or result.stdout).strip()[-300:]}")
        return False
    LAST.write_text(json.dumps(status, indent=2), encoding="utf-8")
    left = status["budget_seconds"] - status["banked_seconds"]
    log(f"published {status['status']} {status['session'] or '-'}, {left / 3600:.2f} h left")
    return True


def sync_once(force: bool = False) -> None:
    status = build_status()
    last = read_json(LAST)
    stale = last is None or time.time() - last.get("published_at", 0) > HEARTBEAT
    changed = last is None or signature(last) != signature(status)
    if force or changed or (status["status"] == "recording" and stale):
        publish(status)


def loop_running() -> bool:
    try:
        pid = int(PID.read_text(encoding="utf-8").strip())
    except (FileNotFoundError, ValueError):
        return False
    out = subprocess.run(
        ["tasklist", "/FI", f"PID eq {pid}", "/NH", "/FO", "CSV"],
        capture_output=True, text=True, creationflags=NO_WINDOW,
    ).stdout
    return f'"{pid}"' in out and "python" in out.lower()


def main() -> int:
    args = sys.argv[1:]
    if "--status" in args:
        print(json.dumps(build_status(), indent=2))
        return 0
    if "--once" in args:
        sync_once(force="--force" in args)
        return 0
    if loop_running():
        log("sync loop already running, not starting another")
        return 0
    WORK.mkdir(exist_ok=True)
    PID.write_text(str(os.getpid()), encoding="utf-8")
    log(f"sync loop started, pid {os.getpid()}")
    while True:
        try:
            sync_once()
        except Exception as error:  # Keep the loop alive through a bad read.
            log(f"error: {error!r}")
        time.sleep(POLL)


if __name__ == "__main__":
    sys.exit(main())
