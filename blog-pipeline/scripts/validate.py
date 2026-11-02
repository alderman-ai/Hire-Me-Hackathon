r"""Validate a blog post file against POST-FORMAT.md v1.1 §6, checklist items 1 to 21.

Usage:  python -I blog-pipeline\scripts\validate.py blog-pipeline\drafts\T-01\post.md
        python -I blog-pipeline\scripts\validate.py blog-pipeline\samples\sample-post.md

Prints one line per problem, "F<n> <message>" for a failure and "W<n> <message>"
for a warning, where <n> is the checklist item, then
"VALID <file>: <f> fail, <w> warn". v1.1 adds the diagram callout
("> [!diagram] scale" or "> [!diagram] flow", §3.5: at most one, inside a ##
section after its first paragraph, not a section's or the post's last block, a
caption of at most 100 characters, then 3 to 6 items "N. Label" or
"N. Label: note" numbered from 1, label 1 to 4 words, note at most 15 words, no
links, emphasis or code; a note for Alex in any callout is an F17) and W21 (no
key-points box). Exit codes:
  0  no F lines (warnings allowed): the file renders
  1  at least one F line: fix the stage that wrote it and rerun
  2  ERROR: the file is missing or unreadable

The front matter is read with a small parser for exactly the subset §2 allows
(top-level keys and two-space-indented maps, double-quoted strings, [...] flow
lists of double-quoted strings, bare integers and null); anything else is an F1
or F2. Word counts come from counts.py's body_words(), the format's one rule.
"""
import json
import math
import re
import sys
from datetime import date, datetime
from pathlib import Path

sys.dont_write_bytecode = True  # no __pycache__ in the repo
sys.path.insert(0, str(Path(__file__).resolve().parent))
from counts import body_words  # noqa: E402

STATUSES = ("draft", "near-final", "published", "sample")
SCHEMA = [  # key, type, required ("str", "int", "int|null", "str|null", "list", map)
    ("title", "str", True), ("slug", "str", True), ("description", "str", True),
    ("author", "str", True), ("date", "str", True), ("status", "str", True),
    ("cover", [("kicker", "str", True), ("title_lines", "list", False),
               ("subtitle", "str", True), ("accent", "str", False)], True),
    ("tags", "list", True), ("reading_minutes", "int", True),
    ("made", [("minutes_talked", "int", True), ("words_spoken", "int", True),
              ("words_drafted", "int", True), ("share_changed_by_alex", "int|null", True),
              ("dictated", "str", True), ("rig_session", "str|null", True),
              ("pipeline", "str", True), ("stages", "list", True), ("checks", "list", True)], True),
]
SLUG = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
NOTE = re.compile(r"\[Alex: [^\[\]\n]+\]")
ATX = re.compile(r"^ {0,3}(#{1,6})(?:[ \t]+(.*?))?[ \t]*#*[ \t]*$")
FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,})(.*)$")
LIST_ITEM = re.compile(r"^\s*(?:[-*+]|\d+[.)])\s")
HR = re.compile(r"^ {0,3}([-*_])(?:[ \t]*\1){2,}[ \t]*$")
SETEXT = re.compile(r"^ {0,3}(=+|-+)[ \t]*$")
LINK = re.compile(r"\[((?:[^\[\]\n]|\[[^\[\]\n]*\])*)\]\(([^)\s]*)[^)]*\)")
INLINE_CODE = re.compile(r"`[^`\n]*`")
DIAGRAM = re.compile(r"> \[!diagram\] (?:scale|flow)")
DIAGRAM_ITEM = re.compile(r"^(\d+)\.\s+(\S.*)$")


class Bare(str):
    """A scalar the subset doesn't allow: unquoted text, true/false, a float."""


class FrontError(Exception):
    pass


# ---------- front matter ----------

def scalar(raw: str, no: int, problems: list):
    raw = raw.strip()
    if raw.startswith('"'):
        try:
            value, end = json.JSONDecoder().raw_decode(raw)
        except ValueError:
            raise FrontError(f"line {no}: bad double-quoted string")
        rest = raw[end:].strip()
        if rest.startswith("#"):
            problems.append(("F", 2, f"line {no}: no comments allowed in front matter"))
        elif rest:
            raise FrontError(f"line {no}: text after the closing quote")
        return value
    if raw.startswith("["):
        body, _, rest = raw.partition("]")
        if rest.strip().startswith("#"):
            problems.append(("F", 2, f"line {no}: no comments allowed in front matter"))
            raw = body + "]"
        try:
            value = json.loads(raw)
        except ValueError:
            if raw.endswith("]"):
                problems.append(("F", 2, f"line {no}: flow list items must be double-quoted strings"))
                return Bare(raw)
            raise FrontError(f"line {no}: a [...] list must close on the same line")
        return value
    if " #" in raw or raw.startswith("#"):
        problems.append(("F", 2, f"line {no}: no comments allowed in front matter"))
        raw = raw.split("#", 1)[0].strip()
    if re.fullmatch(r"-?\d+", raw):
        return int(raw)
    if raw == "null":
        return None
    if raw.startswith(("'", "|", ">", "{", "&", "*", "!")):
        raise FrontError(f"line {no}: {raw[:1]!r} values aren't in the allowed subset; use a double-quoted string")
    return Bare(raw)


def parse_front(lines: list[str], first_no: int, problems: list) -> list:
    """Return [(key, value, line)] where a map's value is itself such a list."""
    top: list = []
    current = None
    for i, line in enumerate(lines):
        no = first_no + i
        if not line.strip():
            continue
        if line.lstrip().startswith("#"):
            problems.append(("F", 2, f"line {no}: no comments allowed in front matter"))
            continue
        if "\t" in line[: len(line) - len(line.lstrip())]:
            raise FrontError(f"line {no}: tab indent; use two spaces")
        indent = len(line) - len(line.lstrip(" "))
        m = re.match(r"^([A-Za-z_][\w-]*):(?:[ \t]+(.*))?$", line.strip())
        if not m:
            if line.strip().startswith("- "):
                raise FrontError(f"line {no}: block lists aren't in the allowed subset; use [\"a\", \"b\"]")
            raise FrontError(f"line {no}: not a 'key: value' line")
        key, raw = m.group(1), m.group(2)
        if indent == 0:
            if raw is None or not raw.strip():
                current = []
                top.append((key, current, no))
            else:
                current = None
                top.append((key, scalar(raw, no, problems), no))
        elif indent == 2:
            if current is None:
                raise FrontError(f"line {no}: indented key outside a map")
            if raw is None or not raw.strip():
                raise FrontError(f"line {no}: nested maps aren't in the allowed subset")
            current.append((key, scalar(raw, no, problems), no))
        else:
            raise FrontError(f"line {no}: indent of {indent} spaces; use 0 or 2")
    return top


def type_ok(value, kind: str) -> bool:
    if isinstance(value, Bare):
        return False
    if kind == "str":
        return isinstance(value, str)
    if kind == "int":
        return isinstance(value, int) and not isinstance(value, bool)
    if kind == "int|null":
        return value is None or (isinstance(value, int) and not isinstance(value, bool))
    if kind == "str|null":
        return value is None or isinstance(value, str)
    if kind == "list":
        return isinstance(value, list) and all(isinstance(v, str) for v in value)
    return False


def check_schema(pairs: list, schema: list, where: str, problems: list) -> dict:
    out: dict = {}
    names = [k for k, _, _ in schema]
    seen = []
    for key, value, no in pairs:
        label = f"{where}{key}"
        if key not in names:
            problems.append(("F", 2, f"line {no}: unknown key {label}"))
            continue
        if key in out:
            problems.append(("F", 2, f"line {no}: duplicate key {label}"))
            continue
        kind = dict((k, t) for k, t, _ in schema)[key]
        if isinstance(kind, list):
            if not isinstance(value, list) or (value and not isinstance(value[0], tuple)):
                problems.append(("F", 2, f"line {no}: {label} must be a map of indented keys"))
                out[key] = {}
            else:
                out[key] = check_schema(value, kind, label + ".", problems)
        else:
            if not type_ok(value, kind):
                want = {"str": "a double-quoted string", "int": "a bare integer",
                        "int|null": "a bare integer or null", "str|null": "a double-quoted string or null",
                        "list": "a [...] list of double-quoted strings"}[kind]
                problems.append(("F", 2, f"line {no}: {label} must be {want}"))
            out[key] = value
        seen.append(key)
    for key, _, req in schema:
        if req and key not in out:
            problems.append(("F", 2, f"missing key {where}{key}"))
    order = [k for k in names if k in seen]
    if seen != order and len(set(seen)) == len(seen):
        problems.append(("F", 2, f"{where.rstrip('.') or 'front matter'} keys out of order: expected {', '.join(order)}"))
    return out


def has_markdown(s: str) -> bool:
    return bool(re.search(r"\*\*|`|\[[^\]]*\]\(|^#|<[A-Za-z!/]|(?<!\w)\*[^*\s][^*]*\*|(?<!\w)_[^_\s][^_]*_(?!\w)", s))


# ---------- body ----------

def blocks_of(lines: list[str], first_no: int) -> list[dict]:
    blocks, cur, fence = [], None, None

    def flush():
        nonlocal cur
        if cur:
            blocks.append(cur)
        cur = None

    for i, line in enumerate(lines):
        no = first_no + i
        if fence:
            cur["lines"].append(line)
            if re.match(r"^ {0,3}" + re.escape(fence[0]) + "{" + str(len(fence)) + r",}[ \t]*$", line):
                fence = None
                flush()
            continue
        m = FENCE.match(line)
        if m:
            flush()
            cur = {"kind": "code", "start": no, "lines": [line]}
            fence = m.group(1)
            continue
        if not line.strip():
            flush()
            continue
        h = ATX.match(line)
        if h and not (cur and cur["kind"] == "quote" and line.lstrip().startswith(">")):
            flush()
            blocks.append({"kind": "heading", "level": len(h.group(1)), "text": (h.group(2) or "").strip(),
                           "start": no, "lines": [line]})
            continue
        if cur is None:
            s = line.lstrip()
            if s.startswith(">"):
                kind = "quote"
            elif LIST_ITEM.match(line):
                kind = "list"
            elif s.startswith("|"):
                kind = "table"
            elif HR.match(line):
                kind = "hr"
            elif s.startswith("<!--"):
                kind = "comment"
            else:
                kind = "para"
            cur = {"kind": kind, "start": no, "lines": [line]}
        else:
            cur["lines"].append(line)
    flush()
    for b in blocks:
        if b["kind"] == "comment" and not re.fullmatch(r"(\s*<!--.*?-->\s*)+", "\n".join(b["lines"]), re.S):
            b["kind"] = "para"
    return blocks


def norm_quote(s: str) -> str:
    s = s.replace("*", "")
    s = s.replace("‘", "'").replace("’", "'").replace("“", '"').replace("”", '"')
    return " ".join(s.split())


def plain(s: str) -> str:
    return LINK.sub(lambda m: m.group(1), s)


def inline_markup(s: str) -> bool:
    """A link, * emphasis, _emphasis_ or inline code: not allowed in plain-text callouts."""
    return bool(LINK.search(s) or "*" in s or "`" in s or re.search(r"(?<!\w)_[^_]+_(?!\w)", s))


def sentences(s: str) -> int:
    s = NOTE.sub("note", s)
    s = re.sub(r"\b(e\.g|i\.e|etc|vs|Mr|Ms|Mrs|Dr|St|approx)\.", "abbr", s, flags=re.I)
    return len(re.findall(r"[.!?…]+[\"'”’)\]*]*(?=\s|$)", s))


def text_scan(text: str) -> str:
    """Body text for the inline checks: no code blocks, no inline code, no comments."""
    return INLINE_CODE.sub(" ", re.sub(r"<!--.*?-->", " ", text, flags=re.S))


def validate(raw: bytes):
    P: list = []  # (F|W, item, message)

    # 1. encoding and front matter
    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError as e:
        P.append(("F", 1, f"not UTF-8 (byte {e.start})"))
        text = raw.decode("utf-8", errors="replace")
    if text.startswith("﻿"):
        P.append(("F", 1, "starts with a byte-order mark; save as UTF-8 without BOM"))
        text = text[1:]
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    lines = text.split("\n")
    fm = None
    body_first = 1
    close = None
    if lines and lines[0] == "---":
        close = next((i for i in range(1, len(lines)) if lines[i].rstrip() == "---"), None)
    if close is None:
        P.append(("F", 1, "front matter must open with '---' on line 1 and close with a '---' line"))
        body_lines = lines
    else:
        body_first = close + 2
        body_lines = lines[close + 1:]
        try:
            pairs = parse_front(lines[1:close], 2, P)
            fm = check_schema(pairs, SCHEMA, "", P)
        except FrontError as e:
            P.append(("F", 1, f"front matter doesn't parse: {e}"))
        front_text = "\n".join(lines[1:close])
        if "[Alex" in front_text:
            P.append(("F", 17, "a note for Alex is in the front matter"))

    words = len(body_words(text))
    notes = NOTE.findall("\n".join(body_lines))
    status = fm.get("status") if fm else None

    if fm:
        cover, made = fm.get("cover") or {}, fm.get("made") or {}
        s = lambda v: v if isinstance(v, str) and not isinstance(v, Bare) else None  # noqa: E731
        i = lambda v: v if isinstance(v, int) and not isinstance(v, bool) else None  # noqa: E731
        # 3
        if s(fm.get("author")) is not None and fm["author"] != "Alex Alderman":
            P.append(("F", 3, f"author is {fm['author']!r}, must be 'Alex Alderman'"))
        if s(status) is not None and status not in STATUSES:
            P.append(("F", 3, f"status {status!r} isn't one of {', '.join(STATUSES)}"))
        # 4
        slug = s(fm.get("slug"))
        if slug is not None and (not SLUG.match(slug) or len(slug) > 60):
            P.append(("F", 4, f"slug {slug!r} must match ^[a-z0-9]+(-[a-z0-9]+)*$ and be at most 60 characters"))
        # 5
        for label, value, lo, hi in (("description", fm.get("description"), 140, 160),
                                     ("title", fm.get("title"), 0, 70),
                                     ("cover.kicker", cover.get("kicker"), 0, 32),
                                     ("cover.subtitle", cover.get("subtitle"), 0, 120)):
            v = s(value)
            if v is None:
                continue
            if not lo <= len(v) <= hi:
                rng = f"{lo} to {hi}" if lo else f"at most {hi}"
                P.append(("F", 5, f"{label} is {len(v)} characters ({rng})"))
            if "[Alex" in v:
                P.append(("F", 5, f"{label} holds a note for Alex"))
            elif has_markdown(v):
                P.append(("F", 5, f"{label} holds Markdown"))
        # 6
        d = s(fm.get("date"))
        if d is not None:
            try:
                ok = bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}", d)) and date.fromisoformat(d)
            except ValueError:
                ok = False
            if not ok:
                P.append(("F", 6, f"date {d!r} isn't a real YYYY-MM-DD date"))
        dic = s(made.get("dictated"))
        if dic is not None:
            try:
                ok = bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}", dic)) and datetime.strptime(dic, "%Y-%m-%dT%H:%M")
            except ValueError:
                ok = False
            if not ok:
                P.append(("F", 6, f"made.dictated {dic!r} isn't YYYY-MM-DDTHH:MM"))
        # 7
        title = s(fm.get("title"))
        tl = cover.get("title_lines")
        if isinstance(tl, list) and title is not None:
            if not 2 <= len(tl) <= 4:
                P.append(("F", 7, f"cover.title_lines has {len(tl)} lines (2 to 4)"))
            if " ".join(tl) != title:
                P.append(("F", 7, "cover.title_lines joined with single spaces isn't the title"))
        acc = s(cover.get("accent"))
        if acc is not None and title is not None:
            if title.count(acc) != 1:
                P.append(("F", 7, f"cover.accent {acc!r} occurs {title.count(acc)} times in the title (must be once)"))
            if isinstance(tl, list) and sum(1 for line in tl if acc in line) != 1:
                P.append(("F", 7, f"cover.accent {acc!r} isn't inside exactly one title line"))
        # 8
        tags = fm.get("tags")
        if isinstance(tags, list) and not isinstance(tags, Bare):
            if not 1 <= len(tags) <= 3:
                P.append(("F", 8, f"tags holds {len(tags)} tags (1 to 3)"))
            bad = [t for t in tags if not isinstance(t, str) or not SLUG.match(t)]
            if bad:
                P.append(("F", 8, f"tags must be lowercase kebab-case: {', '.join(map(str, bad))}"))
        # 9
        rm = i(fm.get("reading_minutes"))
        want = max(1, math.ceil(words / 230))
        if rm is not None and rm != want:
            P.append(("F", 9, f"reading_minutes is {rm}, the body's {words} words give {want}"))
        # 10
        for k in ("minutes_talked", "words_spoken", "words_drafted"):
            v = i(made.get(k))
            if v is not None and v < 1:
                P.append(("F", 10, f"made.{k} is {v}, must be at least 1"))
        share = made.get("share_changed_by_alex")
        if "share_changed_by_alex" in made and type_ok(share, "int|null"):
            if status in ("draft", "near-final") and share is not None:
                P.append(("F", 10, f"made.share_changed_by_alex must be null while status is {status}"))
            elif status == "published" and share is None:
                P.append(("F", 10, "made.share_changed_by_alex must be a whole number 0 to 100 once published"))
            if share is not None and not 0 <= share <= 100:
                P.append(("F", 10, f"made.share_changed_by_alex is {share} (0 to 100)"))
        rig = made.get("rig_session")
        if isinstance(rig, str) and not isinstance(rig, Bare) and not re.fullmatch(r"S\d{2}", rig):
            P.append(("F", 10, f"made.rig_session {rig!r} must be null or S and two digits"))
        stages, checks = made.get("stages"), made.get("checks")
        if isinstance(stages, list) and not stages:
            P.append(("F", 10, "made.stages is empty"))
        if isinstance(checks, list) and isinstance(stages, list):
            if not checks:
                P.append(("F", 10, "made.checks is empty"))
            else:
                it = iter(stages)
                if not all(c in it for c in checks):
                    P.append(("F", 10, "made.checks must be stages from made.stages, in the same order"))
        # 11
        wd = i(made.get("words_drafted"))
        if status in ("draft", "near-final", "sample") and wd is not None and wd != words:
            P.append(("F", 11, f"made.words_drafted is {wd}, the body counts {words} words"))
        # 18
        if status == "published" and notes:
            P.append(("F", 18, f"status is published but {len(notes)} note(s) for Alex remain"))

    # ---------- body checks ----------
    blocks = blocks_of(body_lines, body_first)
    content = [b for b in blocks if b["kind"] != "comment"]
    first_h2 = next((k for k, b in enumerate(content) if b["kind"] == "heading" and b["level"] == 2), None)
    section, para_seen, h3_count, h2s = 0, False, 0, 0
    pulls, summaries, diagrams = [], [], []
    for k, b in enumerate(content):
        b["section"] = section
        if b["kind"] == "heading":
            lvl = b["level"]
            if lvl == 1:
                P.append(("F", 12, f"line {b['start']}: '#' (H1) heading: the title comes from the front matter"))
            elif lvl >= 4:
                P.append(("F", 12, f"line {b['start']}: heading deeper than ###"))
            elif lvl == 2:
                section += 1
                h2s += 1
                b["section"] = section
                para_seen, h3_count = False, 0
            elif lvl == 3:
                h3_count += 1
                if section == 0 or not para_seen:
                    P.append(("F", 12, f"line {b['start']}: ### must sit inside a ## section, after its first paragraph"))
                if h3_count == 3:
                    P.append(("F", 12, f"line {b['start']}: more than two ### in one section"))
            if "[Alex" in b["text"]:
                P.append(("F", 17, f"line {b['start']}: a note for Alex in a heading"))
            continue
        if b["kind"] == "para":
            para_seen = True
            for j, line in enumerate(b["lines"][1:], 1):
                if SETEXT.match(line):
                    P.append(("F", 12, f"line {b['start'] + j}: setext (underlined) heading"))
        if b["kind"] == "hr":
            P.append(("F", 14, f"line {b['start']}: horizontal rule"))
        if b["kind"] == "quote":
            first = b["lines"][0].strip()
            if first == "> [!pull]":
                pulls.append(k)
            elif first == "> [!summary]":
                summaries.append(k)
            elif DIAGRAM.fullmatch(first):
                diagrams.append(k)
            elif "[!diagram]" in first:
                P.append(("F", 15, f"line {b['start']}: a diagram's first line must be exactly '> [!diagram] scale' or '> [!diagram] flow'"))
            else:
                P.append(("F", 15, f"line {b['start']}: a plain blockquote; every blockquote must open with [!pull], [!summary] or [!diagram] scale|flow"))
            if "[Alex" in "\n".join(b["lines"]):
                P.append(("F", 17, f"line {b['start']}: a note for Alex inside a callout"))

    # 13
    if not 4 <= h2s <= 6:
        P.append(("F", 13, f"{h2s} ## sections (4 to 6)"))
    lede_end = first_h2 if first_h2 is not None else len(content)
    if not any(b["kind"] == "para" for b in content[:lede_end]):
        P.append(("F", 13, "no lede paragraph before the first ##"))

    # 15 and 16
    outside = [b for k, b in enumerate(content) if k not in pulls and b["kind"] not in ("code", "heading")]
    body_plain = norm_quote(plain(" ".join(" ".join(b["lines"]) for b in outside)))
    per_section: dict = {}
    if not 1 <= len(pulls) <= 3:
        P.append(("F", 15, f"{len(pulls)} pull quotes (1 to 3)"))
    for k in pulls:
        b = content[k]
        qlines = [re.sub(r"^\s*>\s?", "", line) for line in b["lines"][1:]]
        qlines = [q for q in qlines if q.strip()]
        quote = " ".join(q.strip() for q in qlines)
        if len(qlines) != 1:
            P.append(("F", 15, f"line {b['start']}: a pull quote is one '> ' line after '> [!pull]'"))
        if b["section"] == 0:
            P.append(("F", 15, f"line {b['start']}: a pull quote in the lede"))
        per_section[b["section"]] = per_section.get(b["section"], 0) + 1
        if per_section[b["section"]] == 2:
            P.append(("F", 15, f"line {b['start']}: more than one pull quote in a section"))
        if k == len(content) - 1:
            P.append(("F", 15, f"line {b['start']}: a pull quote is the post's last block"))
        nq = norm_quote(quote)
        for nb in (content[k - 1] if k else None, content[k + 1] if k + 1 < len(content) else None):
            if nb and nb["kind"] == "para" and nq and nq in norm_quote(plain(" ".join(nb["lines"]))):
                P.append(("F", 15, f"line {b['start']}: a pull quote directly next to the paragraph it quotes"))
        if "[Alex" in quote or LINK.search(quote) or "*" in quote or re.search(r"(?<!\w)_[^_]+_(?!\w)", quote):
            P.append(("F", 16, f"line {b['start']}: a pull quote holds a note, link or emphasis"))
        if nq and nq not in body_plain:
            P.append(("F", 16, f"line {b['start']}: pull quote isn't word for word in the body: \"{quote[:60]}\""))
        n = len(quote.split())
        if not 8 <= n <= 30:
            P.append(("W", 19, f"line {b['start']}: pull quote is {n} words (8 to 30)"))
    if len(summaries) > 1:
        P.append(("F", 15, f"{len(summaries)} key-points boxes (at most one)"))
    for k in summaries:
        b = content[k]
        if first_h2 is None or k != first_h2 - 1:
            P.append(("F", 15, f"line {b['start']}: the key-points box must sit directly before the first ##"))
        inner = [re.sub(r"^\s*>\s?", "", line) for line in b["lines"][1:]]
        inner = [x for x in inner if x.strip()]
        bullets = [x for x in inner if x.startswith("- ")]
        if len(bullets) != len(inner):
            P.append(("F", 15, f"line {b['start']}: the key-points box holds something other than '- ' bullets"))
        if not 3 <= len(bullets) <= 5:
            P.append(("F", 15, f"line {b['start']}: the key-points box holds {len(bullets)} bullets (3 to 5)"))
    if not summaries:
        P.append(("W", 21, "no key-points box (it's on by default, §3.3)"))

    # 15: the diagram (§3.5)
    if len(diagrams) > 1:
        P.append(("F", 15, f"{len(diagrams)} diagrams (at most one)"))
    for k in diagrams:
        b = content[k]
        at = f"line {b['start']}"
        nxt = content[k + 1] if k + 1 < len(content) else None
        prev = content[k - 1] if k else None
        if b["section"] == 0:
            P.append(("F", 15, f"{at}: a diagram in the lede; it goes inside a ## section"))
        elif prev is not None and prev["kind"] == "heading":
            P.append(("F", 15, f"{at}: a diagram directly under a heading; it goes between two blocks, after the section's first paragraph"))
        if nxt is None:
            P.append(("F", 15, f"{at}: a diagram is the post's last block"))
        elif nxt["kind"] == "heading" and nxt["level"] <= 2 and b["section"] > 0:
            P.append(("F", 15, f"{at}: a diagram is its section's last block"))
        inner = [re.sub(r"^\s*>\s?", "", line).strip() for line in b["lines"][1:]]
        inner = [x for x in inner if x]
        caption = inner[0] if inner else ""
        items = inner[1:]
        if not caption or DIAGRAM_ITEM.match(caption):
            P.append(("F", 15, f"{at}: a diagram's second line must be its caption"))
            if caption:
                items = inner
        elif len(caption) > 100:
            P.append(("F", 15, f"{at}: the diagram caption is {len(caption)} characters (at most 100)"))
        if not 3 <= len(items) <= 6:
            P.append(("F", 15, f"{at}: the diagram holds {len(items)} items (3 to 6)"))
        for n, item in enumerate(items, 1):
            m = DIAGRAM_ITEM.match(item)
            if not m:
                P.append(("F", 15, f"{at}: diagram item {n} isn't 'N. Label' or 'N. Label: note': \"{item[:40]}\""))
                continue
            if int(m.group(1)) != n:
                P.append(("F", 15, f"{at}: diagram item {n} is numbered {m.group(1)} (number them 1, 2, 3 ...)"))
            label, colon, note = m.group(2).partition(":")
            lw, nw = len(label.split()), len(note.split())
            if not 1 <= lw <= 4:
                P.append(("F", 15, f"{at}: diagram item {n}'s label is {lw} words (1 to 4)"))
            if colon and nw == 0:
                P.append(("F", 15, f"{at}: diagram item {n} has a ':' but no note"))
            if nw > 15:
                P.append(("F", 15, f"{at}: diagram item {n}'s note is {nw} words (at most 15)"))
        if any(inline_markup(x) for x in inner):
            P.append(("F", 15, f"{at}: the diagram holds a link, emphasis or code; plain text only"))

    # 14, 17, 19 inline checks, outside code
    for b in content:
        if b["kind"] in ("code",):
            continue
        for j, line in enumerate(b["lines"]):
            no = b["start"] + j
            t = text_scan(line)
            if re.search(r"<(?!!--)/?[A-Za-z][\w-]*(\s[^<>]*)?/?>", t):
                P.append(("F", 14, f"line {no}: raw HTML"))
            if "![" in t:
                P.append(("F", 14, f"line {no}: an image"))
            no_targets = re.sub(r"\]\([^)]*\)", "]", t)
            if re.search(r"(?<![\w/(])(?:https?://|www\.)\S+", no_targets) or re.search(r"<https?://", t):
                P.append(("F", 14, f"line {no}: a bare URL"))
            if re.match(r"^\s{0,3}\[[^\]]+\]:\s*\S", t) or re.search(r"\]\[[^\]]*\]", t):
                P.append(("F", 14, f"line {no}: a reference-style link"))
            if re.search(r"\[\^[^\]]+\]", t):
                P.append(("F", 14, f"line {no}: a footnote"))
            if re.match(r"^\s*(?:>\s*)?[-*+]\s+\[[ xX]\]", t):
                P.append(("F", 14, f"line {no}: a task list item"))
            if re.search(r"~~[^~\n]+~~", t):
                P.append(("F", 14, f"line {no}: strikethrough"))
            for m in re.finditer(r"\[Alex", t):
                note = NOTE.match(t, m.start())
                if not note:
                    P.append(("F", 17, f"line {no}: a malformed note for Alex; use [Alex: ...] on one line"))
                elif t[note.end():note.end() + 1] in ("(", "["):
                    P.append(("F", 17, f"line {no}: a note for Alex followed by '(' or '[' reads as a link"))
            for m in LINK.finditer(t):
                if "[Alex" in m.group(1):
                    P.append(("F", 17, f"line {no}: a note for Alex in link text"))
                url = m.group(2)
                if not (url.startswith("https://") or (url.startswith("/") and not url.startswith("//"))):
                    P.append(("W", 19, f"line {no}: link {url[:60]!r} isn't https:// or site-relative"))
        if b["kind"] == "para":
            n = sentences(" ".join(b["lines"]))
            if n > 4:
                P.append(("W", 19, f"line {b['start']}: a paragraph of {n} sentences (1 to 4)"))

    # 19, 20
    if len(notes) > 5:
        P.append(("W", 19, f"{len(notes)} notes for Alex (usually 2 to 5)"))
    if not 900 <= words <= 1400:
        P.append(("W", 20, f"body is {words} words (the Draft stage aims at 900 to 1,400)"))
    return P


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if len(sys.argv) != 2 or sys.argv[1].startswith("-"):
        print("ERROR usage: validate.py <post.md>")
        return 2
    path = Path(sys.argv[1])
    if not path.is_file():
        print(f"ERROR not found: {path}")
        return 2
    try:
        raw = path.read_bytes()
    except OSError as e:
        print(f"ERROR cannot read {path}: {e}")
        return 2
    problems = validate(raw)
    line_of = lambda m: int(re.match(r"line (\d+)", m).group(1)) if re.match(r"line \d+", m) else 0  # noqa: E731
    problems.sort(key=lambda p: (p[0] != "F", p[1], line_of(p[2])))
    for kind, item, msg in problems:
        print(f"{kind}{item} {msg}")
    f = sum(1 for p in problems if p[0] == "F")
    w = len(problems) - f
    print(f"VALID {path}: {f} fail, {w} warn")
    return 1 if f else 0


if __name__ == "__main__":
    sys.exit(main())
