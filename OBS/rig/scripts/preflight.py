"""Task 11: the checks that decide whether a session can start (R13).

Run it directly to see a report. The controller also runs it before each session.
"""
import shutil
import subprocess
import sys

import obs_client as oc
import recorders
import rig_state as rs

PLAN_GB_PER_HOUR = 8  # About 6 for the screen and 2 for the webcam. Task 12 measures this.
PLAN_HOURS = 16  # 12 is a rough figure, so plan past it.
MARGIN = 1.2
C_WARN_GB = 20
C_BLOCK_GB = 10


def free_gb(drive: str) -> float:
    return shutil.disk_usage(drive).free / 1e9


def memory_report() -> list[str]:
    lines = []
    try:
        out = subprocess.check_output(
            ["nvidia-smi", "--query-gpu=memory.used,memory.total", "--format=csv,noheader,nounits"],
            text=True, creationflags=recorders.NO_WINDOW,
        )
        used, total = (int(v) for v in out.split(","))
        lines.append(f"VRAM in use: {used:,} of {total:,} MiB")
    except (OSError, subprocess.SubprocessError, ValueError):
        lines.append("VRAM in use: couldn't read")
    return lines


def webcam_found() -> bool:
    listing = subprocess.run(
        [str(oc.FFMPEG), "-hide_banner", "-list_devices", "true", "-f", "dshow", "-i", "dummy"],
        capture_output=True, text=True, encoding="utf-8", errors="replace",
        creationflags=recorders.NO_WINDOW,
    ).stderr
    return f'"{recorders.WEBCAM}"' in listing


def run(client=None) -> tuple[bool, list[str]]:
    """Return whether /start may go ahead, and one line per check."""
    ok = True
    lines = []

    def block(message: str) -> None:
        nonlocal ok
        ok = False
        lines.append(f"BLOCKED: {message}")

    if client is None:
        block("OBS isn't reachable over the websocket")
    else:
        try:
            client.get_record_status()
            lines.append("OBS: reachable")
        except Exception:
            block("OBS isn't answering over the websocket")

    try:
        oc.mic_dshow()
        lines.append("Wave:3: found")
    except RuntimeError:
        block("the Wave:3 isn't connected")

    if webcam_found():
        lines.append("Webcam: found")
    else:
        block("the BRIO webcam isn't connected")

    needed = PLAN_GB_PER_HOUR * PLAN_HOURS * MARGIN
    video_drive = rs.VIDEO_ROOT.drive + "\\"
    free_d = free_gb(video_drive)
    if free_d < needed:
        block(f"D: has {free_d:.0f} GB free and needs {needed:.0f} GB")
    else:
        lines.append(f"D: {free_d:.0f} GB free, {needed:.0f} GB needed")

    free_c = free_gb("C:\\")
    if free_c < C_BLOCK_GB:
        block(f"C: has only {free_c:.0f} GB free")
    elif free_c < C_WARN_GB:
        lines.append(f"WARNING: C: has only {free_c:.0f} GB free")
    else:
        lines.append(f"C: {free_c:.0f} GB free")

    lines.extend(memory_report())
    return ok, lines


def main() -> int:
    started = None
    if not oc.is_running():
        started = oc.launch("--profile", oc.PROFILE, "--collection", oc.COLLECTION)
    client = None
    try:
        try:
            client = oc.wait_for_websocket(limit=45)
        except TimeoutError:
            client = None
        ok, lines = run(client)
    finally:
        if started is not None:
            oc.close(started, client)
        elif client is not None:
            client.disconnect()
    print("\n".join(lines))
    print("PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
