r"""Check a decision intake for Alex's answers, fence by fence.

Usage:  python -I blog-pipeline\scripts\check_intake.py "Operator tasks\Decide - how the blog pipeline should work.md"

An intake holds one answer fence per question, e.g. ```a-8-1 ... ```. Prints one line:
  0  ANSWERED  every fence holds text
  1  PARTIAL   some fences hold text (lists which): keep waiting, apply what's there
  1  OPEN      no fence holds text yet
  2  ERROR     the file is missing or has no answer fences

With --watch <seconds>, it loops instead and prints a line only when the set of
filled fences (or their text) changes, or the file disappears; it exits 0 once
every fence is filled. Meant for the Monitor tool, so waiting costs no tokens.
"""
import hashlib
import re
import sys
import time
from pathlib import Path

FENCE = re.compile(r"```(a-\d+-\d+)[^\n]*\n(.*?)```", re.S)


def state(path: Path):
    if not path.is_file():
        return None
    text = path.read_text(encoding="utf-8")
    fences = FENCE.findall(text)
    if not fences:
        return []
    return [(fid, body.strip()) for fid, body in fences]


def line_for(path: Path, st) -> tuple[int, str]:
    if st is None:
        return 2, f"ERROR not found: {path}"
    if not st:
        return 2, f"ERROR no answer fences: {path.name}"
    filled = [fid for fid, body in st if body]
    if len(filled) == len(st):
        return 0, f"ANSWERED {path.name}: {', '.join(filled)}"
    if filled:
        return 1, f"PARTIAL {path.name}: {len(filled)} of {len(st)} filled ({', '.join(filled)})"
    return 1, f"OPEN {path.name}: 0 of {len(st)} filled"


def main() -> int:
    args = sys.argv[1:]
    watch = None
    if "--watch" in args:
        i = args.index("--watch")
        try:
            watch = int(args[i + 1])
        except (IndexError, ValueError):
            print("ERROR usage: check_intake.py <intake file> [--watch <seconds>]")
            return 2
        del args[i : i + 2]
    if len(args) != 1:
        print("ERROR usage: check_intake.py <intake file> [--watch <seconds>]")
        return 2
    path = Path(args[0])
    if watch is None:
        code, line = line_for(path, state(path))
        print(line)
        return code
    last = None
    while True:
        st = state(path)
        digest = hashlib.sha1(repr(st).encode("utf-8")).hexdigest()
        if digest != last:
            code, line = line_for(path, st)
            print(time.strftime("%H:%M ") + line, flush=True)
            last = digest
            if code == 0:
                return 0
        time.sleep(watch)


if __name__ == "__main__":
    sys.exit(main())
