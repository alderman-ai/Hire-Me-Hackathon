r"""The publish safety scan: run it on every dictation, draft or site request before it's committed.

Usage:  python -I blog-pipeline\scripts\scan.py blog-pipeline\dictations\T-01.md
        python -I blog-pipeline\scripts\scan.py "blog-pipeline\drafts\T-01\*.md" [more files, folders or globs]
        add --json for the hits as one JSON object

Nothing may be published that shows secrets, anything of the Apify proposal, or
the operator's own GetSales outbound (his sender profile, his own outreach
messages, who the live run targets). Categories:
  SECRET   fail  API keys and tokens (sk-, sk-ant-, apify_api_, ghp_/github_pat_,
                 vercel_/vc_, BLOB_READ_WRITE_TOKEN, JWTs, private keys, AKIA,
                 xoxb-/xoxp-, key=value pairs, long mixed-case-and-digit tokens).
                 Only the first 4 characters are printed.
  DENY     fail  a deny-listed term: the website's DENY list (read from
                 website\scripts\sync_docs.py with ast, never run) plus
                 scripts\deny-local.txt. "proposal" alone is on the website's
                 list, so ordinary prose hits too: the editor rewords it.
  CONTACT  fail  email addresses and phone numbers (masked like secrets)
  NAME     warn  two or three capitalised words in a row, not at a sentence
                 start, not on the allowlist below, not in a heading: a possible
                 personal name for the editor to check. Doesn't fail the scan.

Arguments may be files, folders (their .md .txt .json .jsonl .html .yml .yaml
.csv files, recursively) or glob patterns, which the script expands itself, as
PowerShell doesn't for native commands.

Prints one line per hit, "<CATEGORY> <file>:<line>: <excerpt>", then
"SCAN <files>: <f> fail, <w> warn". Exit codes:
  0  no fail hits (NAME warnings allowed): safe to commit
  1  at least one fail hit: cut or reword it, log it, rescan
  2  ERROR: a file or pattern not found, or bad arguments
"""
import argparse
import ast
import glob
import json
import os
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent
WEBSITE_SYNC = REPO / "website" / "scripts" / "sync_docs.py"
LOCAL_DENY = HERE / "deny-local.txt"
TEXT_EXT = {".md", ".txt", ".json", ".jsonl", ".html", ".htm", ".yml", ".yaml", ".csv"}
FAIL = ("SECRET", "DENY", "CONTACT")

TOKEN_EDGE = r"(?<![A-Za-z0-9_\-])"
SECRETS = [  # most specific first; a later pattern can't re-report the same characters
    ("anthropic key", re.compile(r"sk-ant-[A-Za-z0-9_\-]{8,}")),
    ("sk- key", re.compile(TOKEN_EDGE + r"sk-[A-Za-z0-9_\-]{16,}")),
    ("apify token", re.compile(r"apify_api_[A-Za-z0-9]{8,}")),
    ("github token", re.compile(r"\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})")),
    ("vercel token", re.compile(r"\b(?:vercel_[A-Za-z0-9_\-]{16,}|vc[a-z]?_[A-Za-z0-9_\-]{16,})")),
    ("blob token", re.compile(r"BLOB_READ_WRITE_TOKEN")),
    ("jwt", re.compile(r"eyJ[A-Za-z0-9_\-]{5,}\.eyJ[A-Za-z0-9_\-]{5,}\.")),
    ("private key", re.compile(r"-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----")),
    ("aws key", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
    ("slack token", re.compile(r"\bxox[abprs]-[A-Za-z0-9\-]{10,}")),
    ("key=value", re.compile(r"(?i)\b(api[_-]?key|secret|token|password)\s*[:=]\s*(\S{8,})")),
    ("long token", re.compile(TOKEN_EDGE + r"[A-Za-z0-9_\-]{32,}(?![A-Za-z0-9_\-])")),
]
EMAIL = re.compile(r"(?<![\w.+-])[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}\b")
PHONE = re.compile(r"(?<![\w+.\-/])\+?\(?\d[\d ().\-/]{6,}\d(?![\w\-])")

ALLOW_PHRASES = [
    "Alex Alderman", "Claude Code", "Claude Design", "Wispr Flow", "Sales Navigator",
    "Google Sheets", "Google Docs", "Google Drive", "Visual Studio Code", "How This Post Was Made",
]
ALLOW_WORDS = {
    "Alex", "GetSales", "Google", "LinkedIn", "Vercel", "Claude", "Anthropic", "Opus", "Sonnet",
    "Haiku", "Wispr", "OpenAI", "ChatGPT", "Gemini", "Python", "PowerShell", "Windows", "Markdown",
    "GitHub", "YouTube", "Notion", "Slack", "HubSpot", "Salesforce", "Clay", "Apollo", "Zapier",
    "Excel", "Chrome", "Prague", "Czech", "Europe", "European", "American", "English",
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
    "January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December",
}
COMMON_OPENERS = set("""
a an the and but or so then when while if after before because since until last next this that
these those there here my our your his her their its we i you he she they it most many some every
each all no not now today yesterday tomorrow tonight also still even just only once first second
third finally why what how who where which with without for from in on at by to of as like about
over under between into through during thanks dear hi hello step part note see read use try do
never always maybe yes okay ok well one two three our let lets imagine say said ask tell
""".split())
SENTENCE_END = tuple(".?!:;…")
OPENERS = "\"'“‘([*_>` \t"
LIST_MARK = re.compile(r"^\s*(?:>\s*)*(?:[-*+]|\d+[.)])?\s*")
HEADING = re.compile(r"^\s*#{1,6}\s")
TOKEN = re.compile(r"[^\W\d_][\w'’\-]*")


def mask(s: str) -> str:
    return s[:4] + "…"


def mask_secrets(s: str) -> str:
    for _, rx in SECRETS:
        s = rx.sub(lambda m: mask(m.group(0)), s)
    s = EMAIL.sub(lambda m: mask(m.group(0)), s)
    s = PHONE.sub(lambda m: mask(m.group(0)) if is_phone(m.group(0).strip()) else m.group(0), s)
    return s


def overlaps(span, taken) -> bool:
    return any(span[0] < b and a < span[1] for a, b in taken)


def is_phone(c: str) -> bool:
    digits = re.sub(r"\D", "", c)
    if not 9 <= len(digits) <= 15 or re.match(r"\d{4}-\d{2}-\d{2}", c):
        return False
    if c.startswith("+"):
        return True
    groups = [g for g in re.split(r"[ ().\-/]+", c) if g]
    return len(groups) >= 3 and all(len(g) <= 5 for g in groups)


def load_deny(notes: list[str]) -> list[str]:
    terms: list[str] = []
    site = None
    try:
        tree = ast.parse(WEBSITE_SYNC.read_text(encoding="utf-8-sig"))
        for node in tree.body:
            targets = node.targets if isinstance(node, ast.Assign) else (
                [node.target] if isinstance(node, ast.AnnAssign) and node.value else [])
            if any(isinstance(t, ast.Name) and t.id == "DENY" for t in targets):
                site = [str(v) for v in ast.literal_eval(node.value)]
    except (OSError, SyntaxError, ValueError, TypeError):
        site = None
    if site is None:
        notes.append("WARN website deny list not found")
    else:
        terms += site
    try:
        for line in LOCAL_DENY.read_text(encoding="utf-8-sig").splitlines():
            line = line.strip()
            if line and not line.startswith("#"):
                terms.append(line)
    except OSError:
        notes.append(f"WARN local deny list not found: {LOCAL_DENY}")
    seen, out = set(), []
    for t in terms:
        k = " ".join(t.lower().split())
        if k and k not in seen:
            seen.add(k)
            out.append(k)
    return sorted(out, key=len, reverse=True)  # longest first, so "apify proposal" beats "proposal"


def scan_secrets(line: str) -> list[str]:
    taken, hits = [], []
    for name, rx in SECRETS:
        for m in rx.finditer(line):
            span = m.span()
            if overlaps(span, taken):
                continue
            if name == "long token":
                t = m.group(0)
                if not (re.search(r"[a-z]", t) and re.search(r"[A-Z]", t) and re.search(r"\d", t)):
                    continue
            taken.append(span)
            if name == "key=value" and re.fullmatch(r"[a-z]+[.,;:!?)\"']*", m.group(2)):
                continue  # prose such as "the secret: honesty," not a credential
            if name == "key=value":
                hits.append(f"{name}: {m.group(1)} {mask(m.group(2))}")
            else:
                hits.append(f"{name}: {mask(m.group(0))}")
    return hits


def scan_contacts(line: str) -> list[str]:
    hits, taken = [], []
    for m in EMAIL.finditer(line):
        taken.append(m.span())
        hits.append(f"email: {mask(m.group(0))}")
    for m in PHONE.finditer(line):
        c = m.group(0).strip()
        if not overlaps(m.span(), taken) and is_phone(c):
            hits.append(f"phone: {mask(c)}")
    return hits


def scan_deny(text: str, terms: list[str]):
    taken, hits = [], []
    for term in terms:
        rx = re.compile(r"\s+".join(re.escape(w) for w in term.split()), re.I)
        for m in rx.finditer(text):
            if overlaps(m.span(), taken):
                continue
            taken.append(m.span())
            line = text.count("\n", 0, m.start()) + 1
            before = text[max(0, m.start() - 30):m.start()]
            after = text[m.end():m.end() + 30]
            ctx = " ".join((before + m.group(0) + after).split())
            hits.append((line, f"\"{term}\" in \"…{mask_secrets(ctx)}…\""))
    return sorted(hits)


def is_cap(w: str) -> bool:
    return w[0].isupper() and any(c.islower() for c in w[1:]) and not any(c.isdigit() for c in w)


def scan_names(lines: list[str]):
    hits = []
    prev = ""  # the previous line of the same block, for sentences that wrap
    in_front = bool(lines) and lines[0].strip() == "---"
    for no, line in enumerate(lines, 1):
        if in_front and no > 1 and line.strip() == "---":
            in_front, prev = False, ""
            continue
        if not line.strip() or HEADING.match(line) or line.strip().startswith(("```", "~~~")):
            prev = ""
            continue
        toks = [m for m in TOKEN.finditer(line)]
        runs, cur = [], []
        for m in toks:
            if is_cap(m.group(0)) and cur and line[cur[-1].end():m.start()] == " " and is_cap(cur[-1].group(0)):
                cur.append(m)
            else:
                if len(cur) >= 2:
                    runs.append(cur)
                cur = [m] if is_cap(m.group(0)) else []
        if len(cur) >= 2:
            runs.append(cur)
        for run in runs:
            prefix = line[:run[0].start()]
            if in_front:
                prefix = re.sub(r"^\s*[\w -]+:\s*", "", prefix)  # a front matter value starts fresh
            core = LIST_MARK.sub("", prefix.rstrip(OPENERS), count=1).rstrip(OPENERS)
            if not core:  # the run opens the line, after any list or quote marker
                prev_ends = prev.rstrip().rstrip("\"'”’)*_").endswith(SENTENCE_END)
                start = in_front or bool(prefix.strip()) or not prev or prev_ends
            else:
                start = core.endswith(SENTENCE_END + ("|", "—"))
            words = [m.group(0) for m in run]
            if start and words[0].lower() in COMMON_OPENERS:
                words = words[1:]  # "Then Mary Jane" -> "Mary Jane"; "John Smith wrote" stays
            allowed = [w in ALLOW_WORDS for w in words]
            for phrase in ALLOW_PHRASES:
                p = phrase.split()
                for i in range(len(words) - len(p) + 1):
                    if words[i:i + len(p)] == p:
                        for j in range(i, i + len(p)):
                            allowed[j] = True
            sub: list[str] = []
            for w, ok in list(zip(words, allowed)) + [("", True)]:
                if ok:
                    if 2 <= len(sub) <= 3:
                        hits.append((no, " ".join(sub)))
                    sub = []
                else:
                    sub.append(w)
        prev = "" if in_front else line
    return hits


def expand(args: list[str], errors: list[str]) -> list[Path]:
    out: list[Path] = []
    for a in args:
        if os.path.exists(a):
            p = Path(a)
            if p.is_dir():
                out += sorted(f for f in p.rglob("*") if f.is_file() and f.suffix.lower() in TEXT_EXT)
            else:
                out.append(p)
        elif any(ch in a for ch in "*?["):
            found = sorted(Path(f) for f in glob.glob(a, recursive=True) if os.path.isfile(f))
            if not found:
                errors.append(f"ERROR no files match: {a}")
            out += found
        else:
            errors.append(f"ERROR not found: {a}")
    seen, uniq = set(), []
    for p in out:
        k = os.path.normcase(str(p.resolve()))
        if k not in seen:
            seen.add(k)
            uniq.append(p)
    return uniq


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser(description="Publish safety scan: secrets, deny-listed terms, contacts, names.")
    ap.add_argument("files", nargs="+", help="files, folders or glob patterns")
    ap.add_argument("--json", action="store_true", help="print the hits as one JSON object")
    try:
        args = ap.parse_args()
    except SystemExit as e:
        return 2 if e.code else 0

    errors: list[str] = []
    notes: list[str] = []
    files = expand(args.files, errors)
    terms = load_deny(notes)
    hits = []  # (category, file, line, excerpt)
    for f in files:
        try:
            text = f.read_text(encoding="utf-8-sig", errors="replace").replace("\r\n", "\n").replace("\r", "\n")
        except OSError as e:
            errors.append(f"ERROR cannot read {f}: {e}")
            continue
        lines = text.split("\n")
        found = []
        for no, line in enumerate(lines, 1):
            found += [("SECRET", no, h) for h in scan_secrets(line)]
            found += [("CONTACT", no, h) for h in scan_contacts(line)]
        found += [("DENY", no, h) for no, h in scan_deny(text, terms)]
        found += [("NAME", no, h) for no, h in scan_names(lines)]
        order = {"SECRET": 0, "DENY": 1, "CONTACT": 2, "NAME": 3}
        found.sort(key=lambda x: (x[1], order[x[0]]))
        hits += [(cat, str(f), no, h) for cat, no, h in found]

    n_fail = sum(1 for h in hits if h[0] in FAIL)
    n_warn = len(hits) - n_fail
    names = [str(f) for f in files]
    label = ", ".join(names) if len(names) <= 3 else f"{len(names)} files"
    code = 2 if errors else (1 if n_fail else 0)

    if args.json:
        print(json.dumps({
            "files": names, "fail": n_fail, "warn": n_warn, "exit": code,
            "hits": [{"category": c, "file": f, "line": n, "excerpt": e} for c, f, n, e in hits],
            "notes": notes, "errors": errors,
        }, ensure_ascii=False, indent=1))
        return code
    for line in notes + errors:
        print(line)
    for c, f, n, e in hits:
        print(f"{c} {f}:{n}: {e}")
    print(f"SCAN {label or '(no files)'}: {n_fail} fail, {n_warn} warn")
    return code


if __name__ == "__main__":
    sys.exit(main())
