r"""Check whether Alex's summary of his Apify scraping is ready.

Usage (from scraping\):
    python -I check_summary.py "..\Addvery Research\Scraping summary.md"

Prints exactly one word and exits:
    FOUND    exit 0  the file is ready (rules below)
    MISSING  exit 1  anything else: absent, empty, still draft, or still being written

Ready means the file exists, isn't empty, and either
  - a line in its first five says "Status: ready" and the file hasn't changed for 2 minutes, or
  - it has no "Status:" line at all and hasn't changed for 15 minutes (a fallback, so a
    forgotten status line can't block the draft forever).
A "Status:" line with any other value ("draft") means not ready.
The request file, "Agent request - scraping summary for the site.md", asks for the status line.

It never prints, copies or logs the file's contents (SPEC.md section 3): the summary sits in
a git-ignored folder, and this script's output lands in transcripts.
A session waiting on the summary runs this with Monitor every 300 seconds until exit 0.
"""
import re
import sys
import time
from pathlib import Path

SETTLE_READY = 120
SETTLE_NO_STATUS = 900


def ready(path: Path) -> bool:
    try:
        st = path.stat()
        if not path.is_file() or st.st_size == 0:
            return False
        head = path.read_text(encoding="utf-8", errors="replace").splitlines()[:5]
    except OSError:
        return False
    age = time.time() - st.st_mtime
    status = next((m.group(1) for line in head
                   if (m := re.match(r"\s*Status:\s*(\w+)", line, re.I))), None)
    if status is None:
        return age >= SETTLE_NO_STATUS
    return status.lower() == "ready" and age >= SETTLE_READY


def main() -> int:
    ok = len(sys.argv) == 2 and ready(Path(sys.argv[1]))
    print("FOUND" if ok else "MISSING")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
