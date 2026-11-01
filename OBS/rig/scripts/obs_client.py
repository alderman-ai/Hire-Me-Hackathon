"""Shared OBS helpers for the rig scripts: paths, password, launch, connect, close."""
import ctypes
import logging
import os
import re
import subprocess
import time
from ctypes import wintypes
from pathlib import Path

import obsws_python as obs

RIG = Path(__file__).resolve().parent.parent
ENV_FILE = RIG / ".env"
OBS_BIN = Path(r"C:\Program Files\obs-studio\bin\64bit")
OBS_EXE = OBS_BIN / "obs64.exe"
OBS_CONFIG = Path(os.environ["APPDATA"]) / "obs-studio"
WEBSOCKET_CONFIG = OBS_CONFIG / "plugin_config" / "obs-websocket" / "config.json"
CRASH_MARKERS = OBS_CONFIG / ".sentinel"
NO_WINDOW = 0x08000000  # The controller has no console, so children would each open one.

PROFILE = "Hackathon"
COLLECTION = "Hackathon"
SCENE = "Main"
SCREEN_INPUT = "Main monitor"
MIC_INPUT = "Wave3 mic"
DESKTOP_INPUT = "Desktop audio"
MIC_DEVICE = "Mic In (Elgato Wave:3)"
FFMPEG = Path(os.environ["LOCALAPPDATA"]) / "Microsoft" / "WinGet" / "Links" / "ffmpeg.exe"
WS_PORT = 4455

# obsws_python logs connection failures, which are expected while OBS starts.
logging.getLogger("obsws_python").setLevel(logging.CRITICAL)


def mic_dshow() -> str:
    """Return the ffmpeg input for the Wave:3, or raise if it isn't connected.

    ffmpeg's dshow input splits on colons and has no escape, so the name "Wave:3"
    can't be used. Its alternative name has no colon. That name can change with the
    USB port, so it's looked up each time.
    """
    listing = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-list_devices", "true", "-f", "dshow", "-i", "dummy"],
        capture_output=True, text=True, encoding="utf-8", errors="replace",
        creationflags=NO_WINDOW,
    ).stderr.splitlines()
    for index, line in enumerate(listing):
        if f'"{MIC_DEVICE}"' in line and index + 1 < len(listing):
            found = re.search(r'Alternative name "([^"]+)"', listing[index + 1])
            if found:
                return f"audio={found[1]}"
    raise RuntimeError(f"{MIC_DEVICE} not found by ffmpeg")


def read_env() -> dict[str, str]:
    values = {}
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
            if "=" in line and not line.lstrip().startswith("#"):
                key, _, value = line.partition("=")
                values[key.strip()] = value.strip()
    return values


def write_env_value(key: str, value: str) -> None:
    values = read_env()
    values[key] = value
    ENV_FILE.write_text(
        "".join(f"{k}={v}\n" for k, v in values.items()), encoding="utf-8"
    )


def is_running() -> bool:
    out = subprocess.run(
        ["tasklist", "/FI", "IMAGENAME eq obs64.exe", "/NH"],
        capture_output=True,
        text=True,
        creationflags=NO_WINDOW,
    ).stdout
    return "obs64.exe" in out


def kill() -> None:
    subprocess.run(
        ["taskkill", "/F", "/IM", "obs64.exe"], capture_output=True, creationflags=NO_WINDOW
    )


def clear_crash_markers() -> None:
    """Remove what makes OBS stop on its crash dialog at the next launch.

    OBS 33 has no flag to skip that dialog. Each run creates an empty run_* file here
    and deletes it on a clean exit, so a leftover one reads as a crash, and OBS then
    waits for a click that nobody is there to give.
    """
    for marker in CRASH_MARKERS.glob("run_*"):
        marker.unlink(missing_ok=True)


def launch(*extra: str) -> subprocess.Popen:
    """Start OBS in the tray. It must run from its own bin folder to find its data."""
    if not is_running():
        clear_crash_markers()
    args = [
        str(OBS_EXE),
        "--minimize-to-tray",
        "--disable-updater",
        "--disable-missing-files-check",
        *extra,
    ]
    return subprocess.Popen(args, cwd=OBS_BIN)


def connect(timeout: float = 5) -> obs.ReqClient:
    password = read_env()["OBS_WS_PASSWORD"]
    return obs.ReqClient(
        host="127.0.0.1", port=WS_PORT, password=password, timeout=timeout
    )


def wait_for_websocket(limit: float = 60) -> obs.ReqClient:
    """Connect, then wait until OBS can answer requests.

    The server accepts connections while OBS is still loading, and answers
    requests with code 207 (not ready) until the scene collection is up.
    """
    deadline = time.monotonic() + limit
    client = None
    while True:
        try:
            client = client or connect()
            client.get_scene_list()
            return client
        except Exception:
            if time.monotonic() > deadline:
                raise TimeoutError(f"OBS not ready after {limit} s") from None
            time.sleep(1)


def close(proc: subprocess.Popen, client=None, limit: float = 60) -> bool:
    """Ask OBS's hidden main window to close, so it shuts down cleanly.

    Disconnect first. OBS otherwise waits about 28 seconds on the open websocket.
    """
    if client is not None:
        client.disconnect()
    user32 = ctypes.windll.user32
    user32.PostMessageW.argtypes = [
        wintypes.HWND,
        wintypes.UINT,
        wintypes.WPARAM,
        wintypes.LPARAM,
    ]
    windows: list[int] = []
    callback_type = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)

    def collect(hwnd, _):
        pid = wintypes.DWORD()
        user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
        if pid.value == proc.pid:
            title = ctypes.create_unicode_buffer(256)
            user32.GetWindowTextW(hwnd, title, 256)
            if title.value.startswith("OBS "):
                windows.append(hwnd)
        return True

    user32.EnumWindows.argtypes = [callback_type, wintypes.LPARAM]
    user32.EnumWindows(callback_type(collect), 0)
    for hwnd in windows:
        user32.PostMessageW(hwnd, 0x0010, 0, 0)  # WM_CLOSE
    try:
        proc.wait(limit)
        return True
    except subprocess.TimeoutExpired:
        return False
