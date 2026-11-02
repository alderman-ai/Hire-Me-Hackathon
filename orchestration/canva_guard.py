r"""PreToolUse guard: no session opens Canva in Chrome unless Alex has switched Canva on for it.

Alex, 2 Nov after the 19:4x crash (about 20 Canva editor tabs plus OBS maxed out the CPU and GPU):
"disable the Canva connection for all sessions ... I don't think unintended Canva sessions go very well.
We can play them one by one if we can."

Wired into every working folder's .claude\settings.json as a PreToolUse hook on the Chrome tools that open a
page (navigate, tabs_create_mcp). It reads the hook's JSON on stdin and blocks (exit 2) any URL on canva.com,
unless orchestration\CANVA-ON exists and names this session's folder on one of its lines.

Switch Canva on for one session (from the repo root):   echo canva-templates> orchestration\CANVA-ON
Switch it off again:                                     del orchestration\CANVA-ON

The Canva MCP connectors ("claude.ai Canva", "plugin:marketing:canva") are separately disabled for this
project in ~/.claude.json; re-enable them with /mcp only in the one session that needs them.
"""
import json
import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
FLAG = os.path.join(ROOT, "orchestration", "CANVA-ON")


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        return 0  # never block on a malformed payload
    tool_input = data.get("tool_input") or {}
    url = str(tool_input.get("url") or tool_input.get("href") or "")
    if "canva.com" not in url.lower() and "canva.link" not in url.lower():
        return 0
    folder = os.path.basename(os.path.abspath(data.get("cwd") or os.getcwd())).lower()
    allowed = []
    if os.path.exists(FLAG):
        with open(FLAG, encoding="utf-8", errors="replace") as f:
            allowed = [ln.strip().lower() for ln in f if ln.strip()]
    if folder in allowed:
        return 0
    sys.stderr.write(
        "Blocked: Canva is switched off for every session (Alex, 2 Nov, after the crash). "
        "Canva work happens one session at a time, with Alex attending. "
        "To switch it on for this session, Alex (or orchestration on his word) writes this folder's name "
        "into orchestration\\CANVA-ON.\n"
    )
    return 2


if __name__ == "__main__":
    sys.exit(main())
