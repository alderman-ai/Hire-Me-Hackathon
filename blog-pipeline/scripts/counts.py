r"""Word counts, and the share of words changed between two versions of a post.

Usage:  python -I blog-pipeline\scripts\counts.py blog-pipeline\drafts\T-01\post.md
        python -I blog-pipeline\scripts\counts.py --changed blog-pipeline\drafts\T-01\post.md <Alex's finished post>
        add --json to either for one JSON object instead of the line

The word count is POST-FORMAT.md §2's one rule, used for reading_minutes,
words_spoken, words_drafted and the changed share: count the body only, after
removing YAML front matter, HTML comments, link URLs (the link text stays), the
tags [!pull] and [!summary], list numbers such as "1." and whole pull-quote
blocks (a blockquote whose first line is "> [!pull]"); then split on whitespace
and count the tokens holding at least one letter or digit. Notes such as
[Alex: ...] count. On a dictation (dictations\<id>.md) the same rule gives
words_spoken.

  WORDS <file>: <n>
  CHANGED <before> -> <after>: <pct>% of words changed (<a> words before, <b> after)

The changed share uses the same words: 1 - (words difflib.SequenceMatcher
matches, autojunk off) / max(a, b), as a whole percent. Words are compared
lowercased with their surrounding punctuation and * removed, so a changed comma,
capital or bold doesn't count as a changed word. It's made.share_changed_by_alex:
the pipeline's near-final post before, Alex's finished one after.

Exit codes: 0 ok, 2 ERROR (missing or unreadable file, bad arguments).
validate.py imports body_words() from here, so both use one rule.
"""
import argparse
import difflib
import json
import re
import sys
from pathlib import Path

FRONT = re.compile(r"\A---[ \t]*\n.*?\n---[ \t]*(\n|\Z)", re.S)
HAS_ALNUM = re.compile(r"[^\W_]")


def strip_front(text: str) -> str:
    text = text.lstrip("﻿").replace("\r\n", "\n").replace("\r", "\n")
    m = FRONT.match(text)
    return text[m.end():] if m else text


def body_words(text: str) -> list[str]:
    """The words of a post or dictation file, by POST-FORMAT.md §2's rule."""
    text = strip_front(text)
    text = re.sub(r"<!--.*?-->", " ", text, flags=re.S)
    kept, in_pull = [], False
    for line in text.split("\n"):
        if in_pull and line.lstrip().startswith(">"):
            continue
        in_pull = line.strip() == "> [!pull]"
        if not in_pull:
            kept.append(line)
    text = "\n".join(kept)
    text = re.sub(r"\[!(?:pull|summary)\]", " ", text)
    text = re.sub(r"\[([^\]\n]*)\]\([^)\n]*\)", r"\1", text)        # links: keep the text
    text = re.sub(r"(?m)^([ \t]*(?:>[ \t]*)*)\d+\.(?=\s)", r"\1", text)  # list numbers
    return [t for t in text.split() if HAS_ALNUM.search(t)]


def norm(word: str) -> str:
    return re.sub(r"^[\W_]+|[\W_]+$", "", word.replace("*", "")).lower()


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description="Word counts and the share of words changed.")
    ap.add_argument("files", nargs="+", help="<file>, or with --changed: <before> <after>")
    ap.add_argument("--changed", action="store_true", help="compare <before> and <after>")
    ap.add_argument("--json", action="store_true", help="print one JSON object")
    try:
        args = ap.parse_args()
    except SystemExit as e:
        return 2 if e.code else 0
    want = 2 if args.changed else 1
    if len(args.files) != want:
        print("ERROR usage: counts.py <file>  |  counts.py --changed <before> <after>")
        return 2
    paths = [Path(f) for f in args.files]
    lists = []
    for p in paths:
        if not p.is_file():
            print(f"ERROR not found: {p}")
            return 2
        try:
            lists.append(body_words(p.read_text(encoding="utf-8-sig", errors="replace")))
        except OSError as e:
            print(f"ERROR cannot read {p}: {e}")
            return 2

    if not args.changed:
        n = len(lists[0])
        print(json.dumps({"file": str(paths[0]), "words": n}) if args.json else f"WORDS {paths[0]}: {n}")
        return 0

    a = [norm(w) for w in lists[0]]
    b = [norm(w) for w in lists[1]]
    top = max(len(a), len(b))
    matched = sum(m.size for m in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks())
    pct = round(100 * (1 - matched / top)) if top else 0
    if args.json:
        print(json.dumps({"before": str(paths[0]), "after": str(paths[1]), "words_before": len(a),
                          "words_after": len(b), "matched": matched, "changed_pct": pct}))
    else:
        print(f"CHANGED {paths[0]} -> {paths[1]}: {pct}% of words changed ({len(a)} words before, {len(b)} after)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
