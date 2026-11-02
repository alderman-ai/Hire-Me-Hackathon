"""Check mode for S2's `propagate` skill: report every gap between the charter
and the places built from it. Reads only; writes nothing.

    python -I orchestration\\propagate_check.py [--root <path>]
    python -I orchestration\\propagate_check.py --guard

--root   the project root to check (default: the repo root this script is in).
         Point it at a scratch copy for a dry run. The copy's folder must keep
         the name `Hire me hackaton`, because the excludes sync embeds it.
--guard  only confirm this runs in the session named `orchestration`, started
         at the repo root. Exit 0 yes, 3 no, 4 can't tell.

Checks (orchestration\\SPEC.md, section 5, plus the counts the skills rely on):
  dod          every live DoD item traces to a real deliverable and is claimed
               by a real outline row; ids are never removed or duplicated.
               Until the sign-off, orchestration\\DOD-DRAFT.md is checked as the DoD
  outline      every row has a roster row, a folder with a CLAUDE.md, and once
               written a SPEC.md whose "Routing and resources" paths exist;
               every "Depends on" id names a real row; every row is in "Run order"
  deliverables every deliverable has a row; the scope range and counts match
  excludes     sync_claude_excludes.py --check reports nothing to change
  citations    every DoD id cited in a .md file exists in the charter
  changes      open change records, and resource lines held for unwritten specs
  findings     every path on a record's `Findings:` line, or a held line,
               exists under research\\ (reports never move, S1-Q5)

Operator-owned rows and everything in `Addvery Research\\` are skipped. The
markers are the ones change-outline writes, matched exactly: a row is
operator-owned when its Spec cell ends `(operator-owned)`, and retired when its
Spec cell ends `(retired)` or its Outline cell starts `Merged into` or `Retired`.
A DoD item is retired when its Status cell says retired, and a deliverable
when its Name cell ends `(retired)`. A roster row whose Role cell says `Also runs S-D<n>`
counts for that row too (one session running two rows, as C15 does). Change records:
`Status:` other than applied or dropped is open; `- HELD <spec id> ...` is held.
Placeholders (DoD-S0-a ...) are notes until the DoD is signed off, which this
script takes to be once the charter holds an item numbered DoD-<n>. Test items
(DoD-T<n>) never count towards that, and are a gap in the real repo.

Exit: 0 clean (notes allowed), 1 gaps, 2 charter or roster unreadable.
"""
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
ADDVERY = "Addvery Research"

SPEC_ID = re.compile(r"(?<![\w-])(S-D\d+[a-z]?|S(?:0|[1-9]\d?))(?![\w-])")
DELIV_ID = re.compile(r"(?<![\w-])([MD]\d+)(?![\w-])")
DELIV_RANGE = re.compile(r"(?<![\w-])([MD])(\d+)\s+to\s+([MD])?(\d+)(?![\w-])")
DOD_ID = re.compile(r"(?<![\w-])(DoD-[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)(?![<\w-])")
PLACEHOLDER = re.compile(r"^DoD-S(?:\d+|-D\d+[a-z]?)-[a-z]$")
REAL_DOD = re.compile(r"^DoD-(\d+)$")
TEST_DOD = re.compile(r"^DoD-T\d+$")
CONDITIONAL = re.compile(
    r"if it exists|once |until|written at|creates it|after a fork|skip it|appears|not written yet",
    re.I)
WORDS = {w: i for i, w in enumerate(
    "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen "
    "fifteen sixteen seventeen eighteen nineteen twenty".split())}
# Records of what happened: they may cite old or placeholder ids for good.
SKIP_DIRS = {"node_modules", ".next", ".venv", "__pycache__", ADDVERY.lower(), "operator tasks"}
SKIP_PATHS = {"orchestration/changes", "orchestration/_templates", "answer-desk/qa",
              "obs/processed", "obs/live", "obs/_test", "obs/rig/run", "obs/rig/models",
              "briefing/data", "website/content/docs", "research/lists", "legibility/posts"}
SKIP_FILES = {"orchestration/dod-draft.md", "orchestration/handoff.md", "answer-desk/queue.md"}

gaps, notes, placeholders = [], [], {}


def gap(area, msg):
    gaps.append(f"[{area}] {msg}")


def note(area, msg):
    notes.append(f"[{area}] {msg}")


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def rel(root: Path, path: Path) -> str:
    try:
        return str(path.relative_to(root)).replace("/", "\\")
    except ValueError:
        return str(path)


def sections(text: str) -> dict:
    out, name = {}, None
    for line in text.splitlines():
        m = re.match(r"^##\s+(.*?)\s*$", line)
        if m:
            name = m.group(1).lower()
            out[name] = []
        elif name is not None:
            out[name].append(line)
    return {k: "\n".join(v) for k, v in out.items()}


def section(secs: dict, prefix: str) -> str:
    return next((v for k, v in secs.items() if k.startswith(prefix.lower())), "")


def tables(text: str) -> list:
    """Each Markdown table as (header cells, list of row cells)."""
    found, block = [], []
    for line in text.splitlines() + [""]:
        if line.strip().startswith("|"):
            block.append([c.strip() for c in line.strip().strip("|").split("|")])
        else:
            if len(block) >= 2 and all(re.fullmatch(r":?-{2,}:?", c) for c in block[1] if c):
                found.append((block[0], block[2:]))
            block = []
    return found


def col(header: list, *names) -> int:
    for i, h in enumerate(header):
        if any(n in h.lower() for n in names):
            return i
    return -1


def clean(cell: str) -> str:
    return cell.replace("`", "").replace("*", "").strip()


def deliverable_ids(cell: str) -> set:
    ids = set()
    for m in DELIV_RANGE.finditer(cell):
        kind, a, kind2, b = m.group(1), int(m.group(2)), m.group(3) or m.group(1), int(m.group(4))
        if kind2 == kind:
            ids.update(f"{kind}{n}" for n in range(a, b + 1))
    ids.update(DELIV_ID.findall(DELIV_RANGE.sub(" ", cell)))
    return ids


# ---------------------------------------------------------------- charter

def deliv_retired(delivs, dv):
    """A deliverable is retired when its name cell ends `(retired)`; its id is never reused."""
    return clean(delivs.get(dv, "")).lower().endswith("(retired)")


def parse_charter(root: Path):
    secs = sections(read(root / "CHARTER.md"))
    delivs = {}
    for header, rows in tables(section(secs, "Deliverables")):
        for r in rows:
            if r and re.fullmatch(r"[MD]\d+", clean(r[0])):
                delivs[clean(r[0])] = r[1] if len(r) > 1 else ""
    rows = {}
    for header, body in tables(section(secs, "Spec outline")):
        if not header or "spec" not in header[0].lower():
            continue
        dep, out = col(header, "depends"), col(header, "outline")
        for r in body:
            spec_cell = clean(r[0])
            m = SPEC_ID.match(spec_cell)
            if not m:
                continue
            outline = clean(r[out]) if 0 <= out < len(r) else ""
            # The exact markers change-outline writes, and nothing looser.
            rows[m.group(1)] = {
                "cell": spec_cell,
                "depends": r[dep] if 0 <= dep < len(r) else "",
                "operator": spec_cell.lower().endswith("(operator-owned)"),
                "retired": spec_cell.lower().endswith("(retired)")
                or bool(re.match(r"(merged into|retired)\b", outline, re.I)),
            }
    return secs, delivs, rows, dod_table(section(secs, "Definition of done"))


def dod_table(text: str) -> list:
    """DoD rows from the charter's section or from DOD-DRAFT.md (change-dod's format)."""
    dod = []
    for header, body in tables(text):
        if not header or clean(header[0]).lower() != "id":
            continue
        ci, ct, cc, cs = col(header, "item"), col(header, "trace"), col(header, "claim"), col(header, "status")
        for r in body:
            did = clean(r[0])
            if not did.startswith("DoD-"):
                continue
            get = lambda i: r[i] if 0 <= i < len(r) else ""
            retired = (cs >= 0 and get(cs).strip().lower().startswith("retired")) \
                or clean(get(ci)).lower().startswith("retired")
            dod.append({"id": did, "traces": deliverable_ids(get(ct)),
                        "claims": set(SPEC_ID.findall(get(cc))), "retired": retired})
    return dod


# ---------------------------------------------------------------- roster

def norm_folder(cell: str):
    c = clean(cell).rstrip("\\/").strip()
    if c.lower() in ("repo root", "root", "the repo root"):
        return ""
    if not c or c.lower() == "none":
        return None
    return c


def parse_roster(root: Path) -> dict:
    """spec id -> list of (session, folder or '' for root)."""
    by_spec = {}
    for header, body in tables(read(root / "SESSIONS.md")):
        cs, cf, cr = col(header, "session"), col(header, "folder"), col(header, "spec", "role")
        if cs < 0 or cf < 0:
            continue
        for r in body:
            session = clean(r[cs]) if cs < len(r) else ""
            folder = norm_folder(r[cf]) if cf < len(r) else None
            ids = set()
            if 0 <= cr < len(r):
                m = SPEC_ID.search(clean(r[cr]))
                if m:
                    ids.add(m.group(1))
                ids.update(re.findall(r"[Aa]lso runs (S-D\d+[a-z]?|S\d+)\b", clean(r[cr])))
            m = re.match(r"^s-d(\d+[a-z]?)-", session) or re.match(r"^s(\d+)-", session)
            if m:
                ids.add(("S-D" if session.startswith("s-d") else "S") + m.group(1))
            for i in ids:
                by_spec.setdefault(i, []).append((session, folder))
    return by_spec


def heading_folders(root: Path) -> dict:
    """Fallback: spec id -> folder, from a CLAUDE.md whose first line is '# <id> — '."""
    out = {}
    for d in root.iterdir():
        if d.is_dir() and not d.name.startswith(".") and d.name != ADDVERY and (d / "CLAUDE.md").exists():
            with open(d / "CLAUDE.md", encoding="utf-8", errors="replace") as f:
                m = re.match(r"^#\s+(S-D\d+[a-z]?|S\d+)\s+[—-]", f.readline())
            if m:
                out.setdefault(m.group(1), d.name)
    return out


def spec_folders(root: Path) -> dict:
    """spec id -> existing non-root folders, from the roster, else the CLAUDE.md heading."""
    roster, fallback, out = parse_roster(root), heading_folders(root), {}
    for sid in set(roster) | set(fallback):
        names = [f for _, f in roster.get(sid, []) if f] or ([fallback[sid]] if sid in fallback else [])
        out[sid] = [root / f for f in names if (root / f).is_dir()]
    return out


# ---------------------------------------------------------------- spec files

def resource_paths(spec_text: str) -> list:
    """(path, bullet text) for each backticked path in the "Routing and resources" list."""
    lines, out, started = spec_text.splitlines(), [], False
    start = next((i for i, l in enumerate(lines) if "routing and resources" in l.lower()
                  and (l.startswith("#") or l.lstrip().startswith("**"))), None)
    if start is None:
        return None
    for line in lines[start + 1:]:
        s = line.strip()
        bullet = re.match(r"^(?:[-*]|\d+\.)\s+", s)
        if bullet:
            started = True
            for tok in re.findall(r"`([^`]+)`", s):
                t = tok.strip()
                if re.match(r"^(?:(?:python|git|claude|cd)\s|/|https?:)", t, re.I) or "<" in t or "*" in t:
                    continue
                if "\\" in t or "/" in t or re.search(r"\.\w{1,5}$", t):
                    out.append((t, s))
        elif started and s and not line.startswith("  "):
            break
        elif s.startswith("#") and started:
            break
    return out


def resolve(root: Path, folder: Path, token: str) -> list:
    t = token.rstrip("\\/")
    if re.match(r"^[A-Za-z]:[\\/]", t):
        p = Path(t)
        try:
            return [root / p.relative_to(REPO)]
        except ValueError:
            return [p]
    t = t.replace("\\", "/")
    if t.startswith("../") or t.startswith("./"):
        return [(folder / t).resolve()]
    return [root / t, folder / t]


# ---------------------------------------------------------------- checks

def check_items(items, delivs, rows, area, where, real_repo):
    """The item rules (change-dod): ids, traces, claims, and every deliverable served."""
    seen, live = set(), [d for d in items if not d["retired"]]
    for d in items:
        if d["id"] in seen:
            gap(area, f"{d['id']} appears twice in {where}; ids are never reused")
        seen.add(d["id"])
        if not (REAL_DOD.match(d["id"]) or TEST_DOD.match(d["id"])):
            gap(area, f"{d['id']}: not a DoD-<n> id")
        if TEST_DOD.match(d["id"]):
            (gap if real_repo else note)(area, f"{d['id']} is a test item; it must never reach the real repo")
    nums = sorted(int(REAL_DOD.match(d["id"]).group(1)) for d in items if REAL_DOD.match(d["id"]))
    for n in sorted(set(range(1, (nums[-1] if nums else 0) + 1)) - set(nums)):
        gap(area, f"DoD-{n} is missing from {where}; ids are never removed (retire the item instead)")
    for d in live:
        if not d["traces"]:
            gap(area, f"{d['id']} traces to no deliverable")
        for t in sorted(d["traces"] - set(delivs), key=sort_key):
            gap(area, f"{d['id']} traces to {t}, which isn't in \"Deliverables\"")
        if not any(c in rows and not rows[c]["retired"] for c in d["claims"]):
            gap(area, f"{d['id']} is claimed by no live outline row")
        for c in sorted(d["claims"] - set(rows), key=sort_key):
            gap(area, f"{d['id']} is claimed by {c}, which isn't an outline row")
        for c in sorted((c for c in d["claims"] if c in rows and rows[c]["retired"]), key=sort_key):
            gap(area, f"{d['id']} is claimed by the retired row {c}")
    if any(REAL_DOD.match(d["id"]) for d in live):
        served = set().union(*(d["traces"] for d in live))
        for dv in sorted(set(delivs) - served, key=sort_key):
            if not deliv_retired(delivs, dv):
                gap(area, f"{dv} has no live DoD item tracing to it in {where}")
    return live


def check_dod(root, delivs, rows, dod, real_repo):
    """Returns (signed off?, live charter items, ids of the draft while unsigned)."""
    live = check_items(dod, delivs, rows, "dod", "the charter", real_repo)
    signed = any(REAL_DOD.match(d["id"]) for d in live)
    draft_ids = set()
    if not signed:
        draft = root / "orchestration" / "DOD-DRAFT.md"
        items = dod_table(read(draft)) if draft.exists() else []
        draft_ids = {d["id"] for d in items}
        check_items(items, delivs, rows, "dod draft", "DOD-DRAFT.md", real_repo)
        note("dod", "not signed off (the charter holds no DoD-<n> item): placeholders are notes, and "
             + (f"the {len(items)} items in orchestration\\DOD-DRAFT.md were checked as the DoD"
                if items else "there is no draft yet"))
    return signed, live, draft_ids


def sort_key(i):
    m = re.match(r"([A-Z-]+?)(\d+)(.*)", i.replace("S-D", "SD"))
    return (m.group(1), int(m.group(2)), m.group(3)) if m else (i, 0, "")


def check_outline(root, secs, delivs, rows, live, signed):
    roster, fallback = parse_roster(root), heading_folders(root)
    run_order = set(SPEC_ID.findall(section(secs, "Run order")))
    for rid in sorted(rows, key=sort_key):
        row = rows[rid]
        deps = SPEC_ID.findall(row["depends"])
        for dep in deps:
            if dep not in rows:
                gap("outline", f"{rid} depends on {dep}, which isn't an outline row")
            elif rows[dep]["retired"] and not row["retired"]:
                gap("outline", f"{rid} depends on the retired row {dep}")
        if not deps and not row["retired"]:
            note("outline", f"{rid} depends on no outline row: \"{clean(row['depends'])}\"")
        if row["operator"] or row["retired"]:
            note("outline", f"{rid} skipped: {'operator-owned' if row['operator'] else 'retired'}")
            continue
        if rid not in run_order:
            gap("run order", f"{rid} isn't named in \"Run order\"")
        entries = roster.get(rid, [])
        folders = [f for _, f in entries if f is not None]
        if not entries:
            hint = (f" (its folder `{fallback[rid]}\\` was found by its CLAUDE.md heading)" if rid in fallback
                    else " and no folder; if no session runs it, mark its outline row operator-owned")
            gap("roster", f"{rid} has no roster row in SESSIONS.md{hint}")
            if rid in fallback:
                folders = [fallback[rid]]
        if entries and not folders:
            gap("roster", f"{rid}'s roster row names no folder")
        existing = []
        for f in folders:
            p = root / f if f else root
            if not p.is_dir():
                gap("folder", f"{rid}: roster folder `{f}\\` doesn't exist")
            else:
                existing.append(p)
        if existing and not any((p / "CLAUDE.md").exists() for p in existing):
            gap("folder", f"{rid}: no CLAUDE.md in {', '.join(rel(root, p) or 'the root' for p in existing)}")
        if not folders and entries:
            continue
        specs = [p / "SPEC.md" for p in existing if p != root and (p / "SPEC.md").exists()]
        if not specs:
            if existing:
                note("outline", f"{rid}: SPEC.md not written yet; its resource and DoD-link checks wait for it")
            continue
        for spec in specs:
            check_spec(root, rid, spec, live, signed)


def check_spec(root, rid, spec: Path, live, signed):
    text = read(spec)
    res = resource_paths(text)
    if res is None:
        note("resources", f"{rel(root, spec)} has no \"Routing and resources\" section; nothing to check")
    for token, bullet in res or []:
        if ADDVERY.lower() in token.lower():
            continue
        if any(p.exists() for p in resolve(root, spec.parent, token)):
            continue
        if token.replace("/", "\\").lower().startswith("answer-desk\\qa\\") or "\\qa\\" in token:
            note("resources", f"{rel(root, spec)}: `{token}` not created yet (the desk creates it with the first question)")
        elif CONDITIONAL.search(bullet):
            note("resources", f"{rel(root, spec)}: `{token}` doesn't exist yet (its line says it's conditional)")
        else:
            gap("resources", f"{rel(root, spec)}: resource `{token}` doesn't exist")
    if not signed:
        return
    cited = set(DOD_ID.findall(text))
    for d in live:
        if rid in d["claims"] and d["id"] not in cited:
            gap("dod links", f"{rid} claims {d['id']} in the charter, but {rel(root, spec)} doesn't cite it")
        if d["id"] in cited and rid not in d["claims"]:
            note("dod links", f"{rel(root, spec)} cites {d['id']}, which the charter doesn't let {rid} claim")


def check_deliverables(secs, delivs, rows):
    live_rows = [r for r in rows if not rows[r]["retired"]]
    for dv in sorted(delivs, key=sort_key):
        if deliv_retired(delivs, dv):
            note("deliverables", f"{dv} skipped: retired")
            continue
        row_id = f"S{dv[1:]}" if dv.startswith("M") else f"S-{dv}"
        if not any(re.fullmatch(rf"{row_id}[a-z]?", r) for r in live_rows):
            gap("deliverables", f"{dv} has no outline row ({row_id})")
    for r in live_rows:
        dv = ("M" + r[1:]) if not r.startswith("S-D") else re.sub(r"[a-z]$", "", r[2:])
        if dv not in delivs:
            note("deliverables", f"{r} mirrors no deliverable")
    count = {k: sum(1 for d in delivs if d.startswith(k)) for k in "MD"}
    top = {k: max((int(d[1:]) for d in delivs if d.startswith(k)), default=None) for k in "MD"}
    scope = section(secs, "Scope")
    m = re.search(r"\*\*In:\*\*(.*)", scope)
    if m:
        for kind, lo, _, hi in DELIV_RANGE.findall(m.group(1)):
            if top[kind] is not None and int(hi) != top[kind]:
                gap("deliverables", f"\"Scope\" says {kind}{lo} to {kind}{hi}, but \"Deliverables\" runs to {kind}{top[kind]}")
    for where in ("Scope", "Deliverables"):
        text = section(secs, where)
        for word, kind in ((r"(\w+) client-facing deliverables", "D"), (r"(\w+) meta deliverables", "M")):
            for w in re.findall(word, text, re.I):
                n = WORDS.get(w.lower(), int(w) if w.isdigit() else None)
                if n is not None and n != count[kind]:
                    gap("deliverables", f"\"{where}\" says {w} {'client-facing' if kind == 'D' else 'meta'} deliverables; there are {count[kind]}")


def check_excludes(root):
    script = root / "orchestration" / "sync_claude_excludes.py"
    if not script.exists():
        gap("excludes", "orchestration\\sync_claude_excludes.py is missing")
        return
    out = subprocess.run([sys.executable, "-I", str(script), "--check"], cwd=root,
                         capture_output=True, text=True, encoding="utf-8", errors="replace")
    if out.returncode:
        gap("excludes", f"sync_claude_excludes.py --check failed: {(out.stderr or out.stdout).strip()[-200:]}")
    for line in out.stdout.splitlines():
        m = re.match(r"^(.*\S)\s+(unchanged|would change|updated)\s*$", line)
        if m and m.group(2) != "unchanged" and m.group(1) != ADDVERY:
            gap("excludes", f"sync_claude_excludes.py --check: {m.group(1)} would change; run the sync from the root")


def md_files(root: Path):
    for dirpath, dirnames, filenames in os.walk(root):
        d = Path(dirpath)
        r = rel(root, d).replace("\\", "/").lower()
        r = "" if r == "." else r
        dirnames[:] = [n for n in dirnames if not n.startswith(".") and n.lower() not in SKIP_DIRS
                       and f"{r}/{n}".strip("/").lower() not in SKIP_PATHS]
        for f in filenames:
            if f.lower().endswith(".md") and f"{r}/{f}".strip("/").lower() not in SKIP_FILES:
                yield d / f


def check_citations(root, dod, signed, draft_ids):
    ids = {d["id"]: d for d in dod}
    for path in md_files(root):
        for n, line in enumerate(read(path).splitlines(), 1):
            for did in DOD_ID.findall(line):
                where = f"{rel(root, path)}:{n}"
                if PLACEHOLDER.match(did):
                    if signed:
                        gap("citations", f"{where} still cites the placeholder {did}")
                    else:
                        placeholders.setdefault(rel(root, path), set()).add(did)
                elif did not in ids:
                    if signed:
                        gap("citations", f"{where} cites {did}, which isn't in the charter")
                    elif did not in draft_ids:
                        note("citations", f"{where} cites {did}, which is in neither the charter nor the draft")
                elif ids[did]["retired"] and "charter.md" not in str(path).lower():
                    note("citations", f"{where} cites the retired {did}")


def check_changes(root):
    folder = root / "orchestration" / "changes"
    if not folder.is_dir():
        return
    for rec in sorted(folder.glob("C*.md")):
        text = read(rec)
        m = re.search(r"^Status:\s*(.+)$", text, re.M | re.I)
        status = m.group(1).strip() if m else "no Status line"
        if not re.match(r"applied|dropped", status, re.I):
            note("changes", f"{rec.stem} is open: {status}")
        for line in re.findall(r"^\s*-\s*HELD\s+(.+)$", text, re.M):
            sid = SPEC_ID.match(line)
            note("changes", f"{rec.stem} holds a line: {line.strip()[:120]}")
            if sid and any((p / "SPEC.md").exists() for p in spec_folders(root).get(sid.group(1), [])):
                gap("changes", f"{rec.stem}: {sid.group(1)}'s SPEC.md exists now; deliver the held line")
            for tok in re.findall(r"`([^`]+)`", line):
                t = tok.replace("/", "\\")
                t = t[3:] if t.startswith("..\\") else t
                if t.lower().startswith("research\\") and not (root / t.rstrip("\\")).exists():
                    gap("findings", f"{rec.stem}: held line names `{tok}`, which doesn't exist")
        # FINDINGS (S1-Q5): reports stay in research\ and never move.
        for line in re.findall(r"^Findings:\s*(.+)$", text, re.M):
            for tok in re.findall(r"`([^`]+)`", line):
                t = tok.replace("/", "\\")
                if not t.lower().startswith("research\\"):
                    gap("findings", f"{rec.stem}: `{tok}` isn't in research\\ (reports stay there, S1-Q5)")
                elif not (root / t.rstrip("\\")).exists():
                    gap("findings", f"{rec.stem}: `{tok}` doesn't exist")


# ---------------------------------------------------------------- guard

def guard() -> int:
    sid = os.environ.get("CLAUDE_CODE_SESSION_ID", "")
    exe = shutil.which("claude")
    if not sid or not exe:
        print("GUARD UNKNOWN: no session id or no claude CLI; check ListAgents and the cwd by hand")
        return 4
    out = subprocess.run([exe, "agents", "--json"], capture_output=True, text=True, encoding="utf-8", errors="replace")
    try:
        agents = json.loads(out.stdout)
    except ValueError:
        print("GUARD UNKNOWN: claude agents --json gave no JSON; check ListAgents and the cwd by hand")
        return 4
    me = next((a for a in agents if a.get("sessionId") == sid), None)
    if not me:
        print("GUARD UNKNOWN: this session isn't in claude agents --json; check ListAgents and the cwd by hand")
        return 4
    here = os.path.normcase(os.path.abspath(me.get("cwd") or ""))
    if me.get("name") == "orchestration" and here == os.path.normcase(str(REPO)):
        print(f"GUARD OK: orchestration, started at {REPO}")
        return 0
    print(f"GUARD STOP: this is `{me.get('name')}` in {me.get('cwd')}. Send `S2 REQUEST <session>: <change> "
          f"(approved: A <id>: <answer>)` to `orchestration` instead.")
    return 3


# ---------------------------------------------------------------- main

def main() -> int:
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except AttributeError:
        pass
    args = sys.argv[1:]
    if "--guard" in args:
        return guard()
    root = REPO
    if "--root" in args:
        i = args.index("--root")
        if i + 1 >= len(args):
            print("--root needs a path")
            return 2
        root = Path(args[i + 1]).resolve()
    real_repo = os.path.normcase(str(root)) == os.path.normcase(str(REPO))
    for need in ("CHARTER.md", "SESSIONS.md"):
        if not (root / need).exists():
            print(f"Can't check: {root / need} is missing")
            return 2
    secs, delivs, rows, dod = parse_charter(root)
    if not delivs or not rows:
        print("Can't check: no deliverables or no spec outline rows found in CHARTER.md")
        return 2
    signed, live, draft_ids = check_dod(root, delivs, rows, dod, real_repo)
    check_outline(root, secs, delivs, rows, live, signed)
    check_deliverables(secs, delivs, rows)
    check_excludes(root)
    check_citations(root, dod, signed, draft_ids)
    check_changes(root)

    retired = sum(1 for d in dod if d["retired"])
    print(f"propagate check: {root}{'' if real_repo else '  (not the repo root: dry run)'}")
    print(f"Charter: {len(delivs)} deliverables, {len(rows)} outline rows, "
          f"{len(dod)} DoD items ({len(live)} live, {retired} retired); DoD {'signed off' if signed else 'not signed off'}")
    print(f"\nGAPS ({len(gaps)})")
    for g in gaps:
        print(f"  {g}")
    print(f"\nNOTES ({len(notes)})")
    for n in notes:
        print(f"  {n}")
    if placeholders:
        total = sum(len(v) for v in placeholders.values())
        print(f"\nPLACEHOLDERS ({total} ids in {len(placeholders)} files; fine until the DoD is signed off)")
        for f, ids in sorted(placeholders.items()):
            print(f"  {f}: {', '.join(sorted(ids))}")
    print("\nCLEAN" if not gaps else f"\n{len(gaps)} gap(s)")
    return 1 if gaps else 0


if __name__ == "__main__":
    sys.exit(main())
