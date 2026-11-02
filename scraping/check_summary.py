r"""Check whether Alex's summary of his Apify scraping exists yet.

Usage (from scraping\):
    python -I check_summary.py "..\Addvery Research\Scraping summary.md"

Prints exactly one word and exits:
    FOUND    exit 0  the file exists, isn't empty, and hasn't changed for 2 minutes
    MISSING  exit 1  anything else (absent, empty, or still being written)

It never prints, copies or logs the file's contents (SPEC.md §3): the summary sits in
a git-ignored folder, and this script's output lands in transcripts. The 2-minute
settle time keeps a half-written summary from starting the draft.
A session waiting on the summary runs this with Monitor every 300 seconds until exit 0.
"""
import sys
import time
from pathlib import Path

SETTLE_SECONDS = 120


def main() -> int:
    if len(sys.argv) != 2:
        print("MISSING")
        return 1
    path = Path(sys.argv[1])
    try:
        st = path.stat()
    except OSError:
        print("MISSING")
        return 1
    if not path.is_file() or st.st_size == 0 or time.time() - st.st_mtime < SETTLE_SECONDS:
        print("MISSING")
        return 1
    print("FOUND")
    return 0


if __name__ == "__main__":
    sys.exit(main())
