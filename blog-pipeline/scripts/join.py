r"""Capture a dictation: join Wispr Flow's pieces into one clean text file.

Usage:  python -I blog-pipeline\scripts\join.py "Operator tasks\Do - your test dictation for the blog.md" blog-pipeline\dictations\T-01.md --task
        python -I blog-pipeline\scripts\join.py blog-pipeline\dictations\my-note.md blog-pipeline\dictations\T-01.md

With --task, the input is the dictation task: everything after the heading
"## Dictate below this line" to the end of the file. Without it, the whole file
(a fallback note), minus any YAML front matter.

What it does, and nothing more (it never changes a word):
  - drops HTML comments, <operator_answer>-style tags, code fence markers,
    Markdown heading lines and "- [ ] Done" box lines
  - normalises whitespace; lines inside one block are joined with a space
  - a blank-line break after a piece that doesn't end in sentence punctuation
    (. ? ! : " ' ) and their curly forms) is a Wispr Flow restart: joined with a space;
    otherwise it stays a paragraph break
  - writes <output> with front matter: id (the output's file stem), source
    (wispr-flow-task or fallback-note), from (input path from the repo root),
    captured (local time), words (POST-FORMAT.md §2's rule, the same as
    counts.py: whitespace tokens holding a letter or digit; made.words_spoken)

Prints one line and exits:
  0  JOINED <output>: <n> words, <p> paragraphs
  1  EMPTY <input>      no dictation text yet; nothing written
  2  ERROR ...          input missing, or --task and no "Dictate below this line" heading
A WARN line comes first if a later "## " heading follows the dictation heading
(its section's text, if any, is then in the output too: check it).
"""
import argparse
import json
import re
import sys
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent
HEADING = re.compile(r"^#{1,6}[ \t]*Dictate below this line\b.*$", re.I | re.M)
FRONT = re.compile(r"\A---[ \t]*\r?\n.*?\r?\n---[ \t]*(\r?\n|\Z)", re.S)
COMMENT = re.compile(r"<!--.*?(-->|\Z)", re.S)
TAG = re.compile(r"`?</?[A-Za-z][\w:-]*(\s[^<>\n]*)?/?>`?")
DROP_LINE = re.compile(r"^\s*(```|~~~|#{1,6}\s|[-*] \[[ xX]\] Done\b)")
END_PUNCT = tuple(".?!:\"')”’…")
HAS_ALNUM = re.compile(r"[^\W_]")  # POST-FORMAT.md §2: a word is a whitespace token holding a letter or digit


def clean_pieces(text: str) -> list[str]:
    """Return the text as blocks (split on blank lines), each one whitespace-normalised line."""
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    text = COMMENT.sub("", text)
    text = TAG.sub("", text)
    text = text.replace(" ", " ").replace("​", "").replace("﻿", "")
    blocks, cur = [], []
    for line in text.split("\n"):
        if DROP_LINE.match(line):
            line = ""
        line = re.sub(r"[ \t\f\v]+", " ", line).strip()
        if line:
            cur.append(line)
        elif cur:
            blocks.append(" ".join(cur))
            cur = []
    if cur:
        blocks.append(" ".join(cur))
    return blocks


def join_pieces(blocks: list[str]) -> list[str]:
    paras: list[str] = []
    for b in blocks:
        if paras and not paras[-1].endswith(END_PUNCT):
            paras[-1] = paras[-1] + " " + b
        else:
            paras.append(b)
    return paras


def rel(path: Path) -> str:
    p = path.resolve()
    try:
        return p.relative_to(REPO).as_posix()
    except ValueError:
        return p.as_posix()


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description="Join Wispr Flow's dictation pieces into one clean file.")
    ap.add_argument("input", help="the dictation task (with --task) or a plain fallback note")
    ap.add_argument("output", help="the file to write, e.g. blog-pipeline\\dictations\\T-01.md")
    ap.add_argument("--task", action="store_true", help="input is the operator task file")
    try:
        args = ap.parse_args()
    except SystemExit as e:
        return 2 if e.code else 0
    src, out = Path(args.input), Path(args.output)
    if not src.is_file():
        print(f"ERROR not found: {src}")
        return 2
    try:
        text = src.read_text(encoding="utf-8-sig", errors="replace")
    except OSError as e:
        print(f"ERROR cannot read {src}: {e}")
        return 2

    if args.task:
        m = HEADING.search(text)
        if not m:
            print(f"ERROR no 'Dictate below this line' heading in {src.name}")
            return 2
        text = text[m.end():]
        if re.search(r"^## ", text, re.M):
            print(f"WARN a later '## ' heading follows the dictation heading in {src.name}: check its text isn't in the output")
        source = "wispr-flow-task"
    else:
        text = FRONT.sub("", text, count=1)
        source = "fallback-note"

    paras = join_pieces(clean_pieces(text))
    body = "\n\n".join(paras)
    n = sum(1 for t in body.split() if HAS_ALNUM.search(t))
    if n == 0:
        print(f"EMPTY {src}")
        return 1

    captured = datetime.now().astimezone().isoformat(timespec="seconds")
    ident = out.stem if re.fullmatch(r"[A-Za-z][\w.-]*", out.stem) else json.dumps(out.stem, ensure_ascii=False)
    front = (
        "---\n"
        f"id: {ident}\n"
        f"source: {source}\n"
        f"from: {json.dumps(rel(src), ensure_ascii=False)}\n"
        f"captured: {captured}\n"
        f"words: {n}\n"
        "---\n\n"
    )
    try:
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(front + body + "\n", encoding="utf-8", newline="\n")
    except OSError as e:
        print(f"ERROR cannot write {out}: {e}")
        return 2
    print(f"JOINED {out}: {n} words, {len(paras)} paragraphs")
    return 0


if __name__ == "__main__":
    sys.exit(main())
