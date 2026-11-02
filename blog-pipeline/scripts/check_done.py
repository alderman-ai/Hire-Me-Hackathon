r"""Check whether a dictation task's Done box is ticked, or a fallback note exists.

Usage:  python -I blog-pipeline\scripts\check_done.py "Operator tasks\Do - your test dictation for the blog.md"
        python -I blog-pipeline\scripts\check_done.py "Operator tasks\Do - ....md" --also-dir blog-pipeline\dictations

Prints one line (one per fallback note) and exits:
  0  DONE <file>          a line starting "- [x] Done" (or "- [X] Done") is in the task file
  0  FALLBACK <path>      --also-dir holds a fresh note: a non-empty .md other than
                          README.md, and other than a T-*.md whose front matter has "source:"
                          (join.py writes those, so they are already captured)
  1  OPEN <file>          neither yet: keep waiting
  1  OPEN (no task file)  the task file is missing, --also-dir was given, no fallback yet
  2  ERROR ...            the task file is missing (without --also-dir) or has no Done box

A session waiting on a dictation runs this with the Monitor tool every 5 minutes
until it exits 0, so the waiting costs no tokens. A missing --also-dir folder
counts as empty, not as an error.
"""
import argparse
import re
import sys
from pathlib import Path

DONE = re.compile(r"^[-*] \[[xX]\] Done\b", re.M)
BOX = re.compile(r"^[-*] \[[ xX]\] Done\b", re.M)
FRONT = re.compile(r"\A---[ \t]*\r?\n(.*?)\r?\n---[ \t]*(\r?\n|\Z)", re.S)
COMMENT = re.compile(r"<!--.*?-->", re.S)


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8-sig", errors="replace")


def fallbacks(folder: Path) -> list[Path]:
    """Fresh notes in folder, newest first."""
    if not folder.is_dir():
        return []
    found = []
    for f in folder.glob("*.md"):
        if not f.is_file() or f.name.lower() == "readme.md" or f.name.startswith((".", "~$")):
            continue
        try:
            text = read(f)
        except OSError:
            continue
        front = FRONT.match(text)
        if f.name.upper().startswith("T-") and front and re.search(r"^source\s*:", front.group(1), re.M):
            continue
        body = text[front.end():] if front else text
        if COMMENT.sub("", body).strip():
            found.append(f)
    return sorted(found, key=lambda p: p.stat().st_mtime, reverse=True)


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description="Exit 0 once a dictation task's Done box is ticked.")
    ap.add_argument("task", help="the operator task file with a '- [ ] Done' line")
    ap.add_argument("--also-dir", help="also exit 0 if this folder holds a fresh dictation note")
    try:
        args = ap.parse_args()
    except SystemExit as e:
        return 2 if e.code else 0
    task = Path(args.task)
    also = Path(args.also_dir) if args.also_dir else None

    if task.is_file():
        try:
            text = read(task)
        except OSError as e:
            print(f"ERROR cannot read {task}: {e}")
            return 2
        if DONE.search(text):
            print(f"DONE {task.name}")
            return 0
        notes = fallbacks(also) if also else []
        for f in notes:
            print(f"FALLBACK {f}")
        if notes:
            return 0
        if not BOX.search(text):
            print(f"ERROR no '- [ ] Done' box in {task.name}")
            return 2
        print(f"OPEN {task.name}")
        return 1

    if also is None:
        print(f"ERROR not found: {task}")
        return 2
    notes = fallbacks(also)
    for f in notes:
        print(f"FALLBACK {f}")
    if notes:
        return 0
    print("OPEN (no task file)")
    return 1


if __name__ == "__main__":
    sys.exit(main())
