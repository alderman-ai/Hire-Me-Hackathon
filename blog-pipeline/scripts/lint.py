r"""Lint a post or a stage file against the pipeline's counted style rules, so no
stage has to count by eye.

Usage:  python -I blog-pipeline\scripts\lint.py blog-pipeline\drafts\T-01\4-draft.md
        python -I blog-pipeline\scripts\lint.py blog-pipeline\drafts\T-01\post.md --max-dash-per-300 1 --max-so-openers 2
        --banned <file> uses another banned list (default: banned.txt next to this script)

What it reads: the prose only. It skips YAML front matter, HTML comments,
fenced and inline code, pull-quote blocks (they repeat body text), link URLs
(the link text stays) and notes for Alex ([Alex: ...], which are instructions,
not prose). Headings, lists, tables, the key-points box and the diagram are
linted. Curly quotes are straightened and * is dropped before matching.

One line per hit, in file order:
  BANNED <file>:<line>: "<match>" -> <what to write instead>
      every hit of a banned.txt rule (case-insensitive regex; where two rules
      hit the same words, the first rule in the file wins)
  DASH <file>:<line>: ...
      an em dash that puts more than --max-dash-per-300 (default 1) into some
      300 consecutive words; " -- " and a spaced en dash " – " count as em dashes
  SO <file>:<line>: ...
      a paragraph opening with "So" beyond --max-so-openers (default 2)
  NOTX <file>:<line>: ...
      an "It's not X, it's Y" or "not X but Y" construction after the first
      ("not only/just ... but" is a banned.txt rule instead)
  RHETORICAL <file>:<line>: ...
      a section that opens on a question: the opening paragraph, or the first
      paragraph after a heading, whose first or last sentence ends in "?"
then  LINT <file>: <n> hits

Exit codes:
  0  no hits
  1  hits: rewrite those lines and rerun
  2  ERROR: the file or banned list is missing or unreadable, or a banned.txt
     line isn't "<pattern> | <instead>" with a valid regex
"""
import argparse
import re
import sys
from pathlib import Path

sys.dont_write_bytecode = True  # no __pycache__ in the repo
HERE = Path(__file__).resolve().parent
HAS_ALNUM = re.compile(r"[^\W_]")
CURLY = str.maketrans({"‘": "'", "’": "'", "“": '"', "”": '"'})
FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,})")
NOTE = re.compile(r"\[Alex: [^\[\]\n]+\]")
LINK = re.compile(r"\[([^\]\n]*)\]\([^)\n]*\)")
HEADING = re.compile(r"^ {0,3}#{1,6}(?:\s+|$)")
ITEM = re.compile(r"^\s*(?:[-*+]|\d+[.)])\s+")
TAG = re.compile(r"^\[!(?:summary|pull)\]\s*$|^\[!diagram\](?:\s+\w+)?\s*$")
NOTX = [
    re.compile(r"\b(?:it|this|that)(?:'s| is| was) not\b[^.!?;\n]{1,80}?[,;:]\s*(?:it|this|that)(?:'s| is| was)\b", re.I),
    re.compile(r"\b(?:it|this|that) (?:isn't|wasn't)\b[^.!?;\n]{1,80}?[,;:]\s*(?:it|this|that)(?:'s| is| was)\b", re.I),
    re.compile(r"\bnot (?!only\b|just\b|merely\b)[^.!?;,\n]{1,60}?,?\s+but\b(?! also)", re.I),
]
ORDER = {"BANNED": 0, "DASH": 1, "SO": 2, "NOTX": 3, "RHETORICAL": 4}


class BannedError(Exception):
    pass


def load_banned(path: Path) -> list:
    rules = []
    for no, line in enumerate(path.read_text(encoding="utf-8-sig").splitlines(), 1):
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        pattern, sep, instead = line.partition(" | ")
        if not sep or not pattern.strip() or not instead.strip():
            raise BannedError(f"{path}:{no}: not '<pattern> | <what to write instead>'")
        try:
            rules.append((re.compile(pattern.strip(), re.I | re.M), instead.strip()))
        except re.error as e:
            raise BannedError(f"{path}:{no}: bad regex: {e}")
    return rules


def clean_line(line: str) -> tuple[str, str]:
    """(kind, prose) for one Markdown line, markers stripped."""
    quoted = line.lstrip().startswith(">")
    s = re.sub(r"^\s*(?:>\s?)+", "", line) if quoted else line
    kind = "quote" if quoted else ""
    if TAG.match(s.strip()):
        return "tag", ""
    if HEADING.match(s) and not kind:
        kind, s = "heading", HEADING.sub("", s).rstrip("# ")
    elif ITEM.match(s):
        kind, s = kind or "item", ITEM.sub("", s)
    elif s.lstrip().startswith("|"):
        kind, s = kind or "table", s.replace("|", " ")
    s = re.sub(r"`[^`\n]*`", " ", s)
    s = NOTE.sub(" ", s)
    s = LINK.sub(r"\1", s)
    s = s.replace("*", "").translate(CURLY)
    return kind or "para", s.strip()


def blocks_of(text: str) -> list[dict]:
    """Prose blocks: {"kind", "lines": [(line_no, prose)]}, in file order."""
    text = text.lstrip("﻿").replace("\r\n", "\n").replace("\r", "\n")
    lines = text.split("\n")
    if lines and lines[0].rstrip() == "---":
        close = next((i for i in range(1, len(lines)) if lines[i].rstrip() in ("---", "...")), None)
        if close is not None:
            lines[: close + 1] = [""] * (close + 1)
    text = re.sub(r"<!--.*?-->", lambda m: re.sub(r"[^\n]", " ", m.group()), "\n".join(lines), flags=re.S)
    blocks, cur, fence, skip = [], None, None, False
    for no, line in enumerate(text.split("\n"), 1):
        if fence:
            if re.match(r"^ {0,3}" + re.escape(fence[0]) + "{" + str(len(fence)) + r",}\s*$", line):
                fence = None
            continue
        m = FENCE.match(line)
        if m:
            fence, cur = m.group(1), None
            continue
        if not line.strip():
            cur, skip = None, False
            continue
        if skip:
            continue
        if cur is None and line.strip() == "> [!pull]":
            skip = True
            continue
        kind, prose = clean_line(line)
        if kind == "tag":
            continue
        starts_new = (cur is None or kind == "heading" or cur["kind"] == "heading"
                      or (kind == "item" and ITEM.match(re.sub(r"^\s*(?:>\s?)+", "", line)))
                      or (kind == "table"))
        if starts_new:
            cur = {"kind": kind, "lines": []}
            blocks.append(cur)
        cur["lines"].append((no, prose))
    return blocks


def joined(block: dict, sep: str) -> tuple[str, list]:
    """The block's text joined by sep, and the start offset of each line."""
    starts, parts, pos = [], [], 0
    for no, prose in block["lines"]:
        starts.append((pos, no))
        parts.append(prose)
        pos += len(prose) + len(sep)
    return sep.join(parts), starts


def line_at(starts: list, offset: int) -> int:
    no = starts[0][1]
    for pos, n in starts:
        if pos <= offset:
            no = n
    return no


def snippet(s: str, n: int = 60) -> str:
    s = " ".join(s.split())
    return s if len(s) <= n else s[: n - 3].rstrip() + "..."


def lint(text: str, rules: list, max_dash: int, max_so: int) -> list:
    hits = []  # (line, category, message)
    blocks = blocks_of(text)

    # BANNED
    for b in blocks:
        body, starts = joined(b, "\n")
        claimed = []
        for rx, instead in rules:
            for m in rx.finditer(body):
                if m.end() == m.start() or any(m.start() < e and s < m.end() for s, e in claimed):
                    continue
                claimed.append((m.start(), m.end()))
                hits.append((line_at(starts, m.start()), "BANNED", f"\"{snippet(m.group())}\" -> {instead}"))

    # DASH: any 300 consecutive words holding more than max_dash em dashes
    words, dashes = 0, []
    for b in blocks:
        for no, prose in b["lines"]:
            prose = re.sub(r"(?<!-)--(?!-)", "—", prose)
            prose = re.sub(r"(?<=\s)–(?=\s)", "—", prose)
            for tok in re.findall(r"—|[^\s—]+", prose):
                if tok == "—":
                    dashes.append((words, no))
                elif HAS_ALNUM.search(tok):
                    words += 1
    for j, (pos, no) in enumerate(dashes):
        if j >= max_dash and pos - dashes[j - max_dash][0] < 300:
            hits.append((no, "DASH", f"{max_dash + 1} em dashes within 300 words (at most {max_dash} per 300); use a comma, colon or full stop"))

    # SO: paragraphs opening with "So" beyond the limit
    so = 0
    for b in blocks:
        if b["kind"] == "para" and re.match(r"So(?=[\s,.!?:;]|$)", b["lines"][0][1]):
            so += 1
            if so > max_so:
                hits.append((b["lines"][0][0], "SO", f"paragraph {so} opening with \"So\" (at most {max_so}): \"{snippet(b['lines'][0][1], 40)}\""))

    # NOTX: "It's not X, it's Y" / "not X but Y" more than once
    found = []
    for b in blocks:
        body, starts = joined(b, " ")
        spans = []
        for rx in NOTX:
            for m in rx.finditer(body):
                if not any(m.start() < e and s < m.end() for s, e in spans):
                    spans.append((m.start(), m.end()))
                    found.append((line_at(starts, m.start()), m.group()))
    found.sort(key=lambda f: f[0])
    for k, (no, s) in enumerate(found[1:], 2):
        hits.append((no, "NOTX", f"\"{snippet(s)}\": construction {k} of the \"not X, it's Y\" kind (at most one; first at line {found[0][0]})"))

    # RHETORICAL: a section that opens on a question
    for k, b in enumerate(blocks):
        opener = (k == 0) or blocks[k - 1]["kind"] == "heading"
        if b["kind"] != "para" or not opener:
            continue
        body, _ = joined(b, " ")
        sents = [s for s in re.split(r"(?<=[.!?])[\"')\]]*\s+", body.strip()) if s.strip()]
        if not sents:
            continue
        q = next((s for s in (sents[0], sents[-1]) if s.rstrip("\"')] ").endswith("?")), None)
        if q:
            where = "the opening paragraph" if k == 0 else "the section's first paragraph"
            hits.append((b["lines"][0][0], "RHETORICAL", f"{where} turns on a question: \"{snippet(q)}\"; state his point instead"))

    hits.sort(key=lambda h: (h[0], ORDER[h[1]]))
    return hits


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description="Lint a post or stage file against the counted style rules.")
    ap.add_argument("file")
    ap.add_argument("--max-dash-per-300", type=int, default=1, dest="max_dash")
    ap.add_argument("--max-so-openers", type=int, default=2, dest="max_so")
    ap.add_argument("--banned", default=str(HERE / "banned.txt"))
    try:
        args = ap.parse_args()
    except SystemExit as e:
        return 2 if e.code else 0
    if args.max_dash < 0 or args.max_so < 0:
        print("ERROR the limits must be 0 or more")
        return 2
    path, banned = Path(args.file), Path(args.banned)
    for p in (path, banned):
        if not p.is_file():
            print(f"ERROR not found: {p}")
            return 2
    try:
        rules = load_banned(banned)
        text = path.read_text(encoding="utf-8-sig", errors="replace")
    except BannedError as e:
        print(f"ERROR {e}")
        return 2
    except OSError as e:
        print(f"ERROR cannot read: {e}")
        return 2
    hits = lint(text, rules, args.max_dash, args.max_so)
    for no, cat, msg in hits:
        print(f"{cat} {path}:{no}: {msg}")
    print(f"LINT {path}: {len(hits)} hits")
    return 1 if hits else 0


if __name__ == "__main__":
    sys.exit(main())
