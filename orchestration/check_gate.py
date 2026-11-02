r"""Check one gate-approval operator task for Alex's answer.

Usage:  python -I orchestration\check_gate.py "Operator tasks\OT-07 Gate approval S-D1 research list.md"

Prints one line and exits:
  0  APPROVED   the "I approve" box is ticked
  0  CHANGES    the box is empty but the changes fence holds text: apply them
  1  OPEN       nothing yet: keep waiting
  2  ERROR      the file is missing or isn't a gate approval

A session blocked on a gate waits with the Monitor tool, re-running this every
5 minutes until it exits 0, so the waiting costs no tokens. No other output.
"""
import re
import sys
from pathlib import Path


def main() -> int:
    if len(sys.argv) != 2:
        print("ERROR usage: check_gate.py <operator task file>")
        return 2
    path = Path(sys.argv[1])
    if not path.is_file():
        print(f"ERROR not found: {path}")
        return 2
    text = path.read_text(encoding="utf-8")
    if not re.search(r"^Task type:\s*Gate approval", text, re.M):
        print(f"ERROR not a gate approval: {path.name}")
        return 2
    if re.search(r"^- \[[xX]\] I approve", text, re.M):
        print(f"APPROVED {path.name}")
        return 0
    fence = re.search(r"```ot-[^\n]*-changes\n(.*?)```", text, re.S)
    if fence and fence.group(1).strip():
        print(f"CHANGES {path.name}: {fence.group(1).strip()[:200]}")
        return 0
    print(f"OPEN {path.name}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
