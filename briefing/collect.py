"""Collect a status snapshot of the whole hackathon for the briefing session.

Plain Python, no Claude, no tokens. It only reads what already exists on disk
(plus `claude agents --json`, the read-only git commands and the site's public
clock) and never messages or edits any session.

    python collect.py            loop forever (start it with pythonw to stay hidden)
    python collect.py --once     collect one snapshot now, then exit
    python collect.py --alive    print whether the loop is running

Every 5 minutes for the first 2 hours after the loop's first start, then every
10 minutes. Each tick overwrites data\\latest.json and data\\latest.md, appends to
data\\events.md only what changed since the last tick, and keeps raw snapshots
for the last 2 hours only.
"""
import json
import os
import re
import shutil
import subprocess
import sys
import time
import urllib.request
from datetime import datetime, timedelta
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
DATA = HERE / "data"
SNAPS = DATA / "snapshots"
LATEST_JSON = DATA / "latest.json"
LATEST_MD = DATA / "latest.md"
EVENTS = DATA / "events.md"
START = DATA / "start.json"
LOG = DATA / "collector.log"
PID = DATA / "collector.pid"
JOBS = Path.home() / ".claude" / "jobs"

FAST, SLOW, FAST_FOR = 300, 600, 2 * 3600   # 5 min for the first 2 hours, then 10
KEEP_SNAPSHOTS = 2 * 3600
STUCK_MIN = 20          # working with no update for this long: maybe stuck
DESK_WAIT_MIN = 15      # desk question waiting longer than this
UNPUSHED_MIN = 60       # oldest unpushed commit older than this
WINDOW_END = (18, 0)    # end of Alex's window, Prague time (DI-3)
NO_WINDOW = 0x08000000  # never flash a console on camera
CLOCK_URL = "https://ijofoogwurqmq704.public.blob.vercel-storage.com/status.json"


# ---------------------------------------------------------------- helpers

def now() -> datetime:
    return datetime.now().astimezone()


def hm(dt: datetime | None) -> str:
    return dt.strftime("%H:%M") if dt else "?"


def mins_since(dt: datetime | None, at: datetime) -> int | None:
    return None if dt is None else max(0, int((at - dt).total_seconds() // 60))


def parse_time(value) -> datetime | None:
    if not value:
        return None
    try:
        if isinstance(value, (int, float)):
            return datetime.fromtimestamp(value / 1000 if value > 1e11 else value).astimezone()
        return datetime.fromisoformat(str(value).replace("Z", "+00:00")).astimezone()
    except (ValueError, OSError):
        return None


def log(text: str) -> None:
    DATA.mkdir(parents=True, exist_ok=True)
    with LOG.open("a", encoding="utf-8") as f:
        f.write(f"{now().isoformat(timespec='seconds')} {text}\n")


def read_json(path: Path, default=None):
    for _ in range(10):
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except FileNotFoundError:
            return default
        except (PermissionError, json.JSONDecodeError):
            time.sleep(0.05)
    return default


def write_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(data, indent=1, ensure_ascii=False, default=str), encoding="utf-8")
    os.replace(tmp, path)


def run(args: list[str], timeout: int = 60) -> str:
    try:
        return subprocess.run(args, capture_output=True, text=True, encoding="utf-8",
                              errors="replace", timeout=timeout, creationflags=NO_WINDOW,
                              cwd=ROOT).stdout
    except (OSError, subprocess.TimeoutExpired) as error:
        log(f"command failed: {args[:3]} {error!r}")
        return ""


def git(*args: str) -> str:
    # --no-optional-locks: a read must never hold index.lock while a session commits.
    return run(["git", "--no-optional-locks", "-C", str(ROOT), *args])


def top_folder(path: str) -> str:
    path = path.strip().strip('"').replace("\\", "/")
    return path.split("/", 1)[0] if "/" in path else "(root)"


def short(text, n: int = 160) -> str:
    text = " ".join(str(text or "").split())
    return text if len(text) <= n else text[: n - 1] + "…"


# ---------------------------------------------------------------- readers

def read_sessions(at: datetime) -> list[dict]:
    claude = shutil.which("claude") or str(Path.home() / ".local" / "bin" / "claude.exe")
    raw = run([claude, "agents", "--json"], timeout=90)
    try:
        rows = json.loads(raw) if raw.strip() else []
    except json.JSONDecodeError:
        log("claude agents --json did not parse")
        rows = []
    out = []
    for r in rows:
        cwd = str(r.get("cwd") or "")
        if str(ROOT).lower() not in cwd.lower():
            continue
        rel = cwd[len(str(ROOT)):].strip("\\/") or "(root)"
        job = JOBS / str(r.get("id"))
        state = read_json(job / "state.json", {}) or {}
        timeline = []
        try:
            lines = (job / "timeline.jsonl").read_text(encoding="utf-8").splitlines()[-4:]
            for line in lines:
                e = json.loads(line)
                timeline.append({"at": hm(parse_time(e.get("at"))), "state": e.get("state"),
                                 "detail": short(e.get("detail"), 140), "text": short(e.get("text"), 300)})
        except (FileNotFoundError, json.JSONDecodeError, PermissionError):
            pass
        updated = parse_time(state.get("updatedAt"))
        out.append({
            "id": r.get("id"), "name": r.get("name"), "kind": r.get("kind"),
            "status": r.get("status"), "folder": rel,
            "state": state.get("state"), "detail": short(state.get("detail"), 200),
            "needs": short(state.get("needs"), 200) if state.get("needs") else None,
            "updated": hm(updated), "updated_min_ago": mins_since(updated, at),
            "timeline": timeline,
        })
    return out


def read_roster() -> dict:
    text = (ROOT / "SESSIONS.md").read_text(encoding="utf-8") if (ROOT / "SESSIONS.md").exists() else ""
    section, running, planned = None, [], []
    for line in text.splitlines():
        if line.startswith("## "):
            section = line[3:].strip().lower()
            continue
        m = re.match(r"\|\s*`([^`]+)`\s*\|\s*([^|]*)\|", line)
        if not m:
            continue
        row = {"name": m.group(1).strip(), "folder": m.group(2).strip().strip("`")}
        if section == "running":
            running.append(row)
        elif section == "planned":
            planned.append(row)
    return {"running": running, "planned": planned}


def read_desk(at: datetime) -> dict:
    path = ROOT / "answer-desk" / "queue.md"
    text = path.read_text(encoding="utf-8") if path.exists() else ""
    entries, pokes = [], []
    current = None
    statuses = "open|checking|answered|skipped|withdrawn|replaced|returned"
    for line in text.splitlines():
        m = re.match(rf"^## (\S+) — ({statuses})\b", line)
        if m:
            current = {"id": m.group(1), "status": m.group(2), "from": None, "received": None}
            entries.append(current)
            continue
        if re.match(r"^##\s+POKE\b", line) or re.match(r"^\*{0,2}POKE\*{0,2}\s", line):
            pokes.append({"line": short(line.lstrip("#* "), 200)})
            current = None
            continue
        if current is not None:
            if line.startswith("From:"):
                current["from"] = line[5:].split("(")[0].strip()
            elif line.startswith("Received:") and current["received"] is None:
                rt = re.search(r"(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})", line)
                if rt:
                    current["received"] = f"{rt.group(1)} {rt.group(2)}"
            elif pokes and line.strip() and "POKE" in line:
                pass
    live = []
    for e in entries:
        if e["status"] not in ("open", "checking"):
            continue
        received = None
        if e["received"]:
            try:
                received = datetime.strptime(e["received"], "%Y-%m-%d %H:%M").astimezone()
            except ValueError:
                pass
        e["waiting_min"] = mins_since(received, at)
        live.append(e)
    # A poke counts as recent if it carries a time within the last hour.
    recent_pokes = []
    for p in pokes:
        t = re.search(r"(\d{2}):(\d{2})", p["line"])
        if t:
            when = at.replace(hour=int(t.group(1)), minute=int(t.group(2)), second=0, microsecond=0)
            if when > at:
                when -= timedelta(days=1)
            if (at - when) <= timedelta(hours=1):
                recent_pokes.append(p)
        else:
            recent_pokes.append(p)
    qa = sorted(p.stem for p in (ROOT / "answer-desk" / "qa").glob("*.md")) if (ROOT / "answer-desk" / "qa").exists() else []
    return {"live": live, "total": len(entries), "answered": sum(e["status"] == "answered" for e in entries),
            "pokes_last_hour": recent_pokes, "qa_files": qa}


def read_intakes() -> list[dict]:
    out = []
    folder = ROOT / "Operator tasks"
    for path in sorted(folder.glob("*.md")) if folder.exists() else []:
        text = path.read_text(encoding="utf-8", errors="replace")
        fm = re.match(r"^---\n(.*?)\n---", text.replace("\r\n", "\n"), re.S)
        if not fm:
            continue
        meta = {}
        for line in fm.group(1).splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                meta[k.strip()] = v.strip()
        state = meta.get("Intake State") or meta.get("Task State")
        waiting = meta.get("Intake State") == "Waiting on operator" or meta.get("Task State") == "Open"
        empty = len(re.findall(r"```[a-z]+-[\d-]+\n\s*```", text))
        out.append({"file": path.stem, "id": meta.get("Intake id") or meta.get("Task id"),
                    "state": state, "waiting_on_alex": waiting, "empty_answer_fences": empty})
    return out


def read_specs() -> list[dict]:
    out = []
    for spec in sorted(ROOT.glob("*/SPEC.md")):
        text = spec.read_text(encoding="utf-8", errors="replace")
        done, todo, in_fence = 0, [], False
        for line in text.splitlines():
            if line.lstrip().startswith("```"):
                in_fence = not in_fence  # checkboxes inside templates aren't steps
                continue
            if in_fence:
                continue
            m = re.match(r"^\s*(?:[-*]|\d+\.)\s+\[( |x|X)\]\s*(.*)", line)
            if m:
                if m.group(1) == " ":
                    todo.append(short(re.sub(r"\*\*", "", m.group(2)), 90))
                else:
                    done += 1
        log_lines = []
        dl = re.search(r"^##\s+(?:\d+\.\s+)?Decision log.*?$(.*?)(?=^##\s|\Z)", text, re.M | re.S)
        if dl:
            for line in dl.group(1).splitlines():
                s = line.strip()
                if (s.startswith("- ") or (s.startswith("|") and not re.match(r"^\|[\s:-]+\|", s))) and not s.lower().startswith("| decision"):
                    log_lines.append(short(s, 160))
        title = text.splitlines()[0].lstrip("# ").strip() if text else spec.parent.name
        out.append({"folder": spec.parent.name, "title": short(title, 80), "steps_done": done,
                    "steps_open": len(todo), "next_steps": todo[:3], "decisions": len(log_lines),
                    "last_decisions": log_lines[-2:]})
    return out


def read_git(at: datetime) -> dict:
    branch = git("rev-parse", "--abbrev-ref", "HEAD").strip()
    commits = []
    raw = git("log", "--since=60 minutes ago", "--name-only", "--format=@@%h|%ct|%s")
    for block in raw.split("@@")[1:]:
        lines = [l for l in block.splitlines() if l.strip()]
        h, ct, subject = (lines[0].split("|", 2) + ["", ""])[:3]
        folders = sorted({top_folder(p) for p in lines[1:]})
        commits.append({"hash": h, "time": hm(parse_time(int(ct) if ct.isdigit() else None)),
                        "subject": short(subject, 100), "folders": folders})
    per_folder: dict[str, int] = {}
    for c in commits:
        for f in c["folders"]:
            per_folder[f] = per_folder.get(f, 0) + 1
    dirty: dict[str, int] = {}
    for line in git("status", "--porcelain").splitlines():
        if len(line) > 3:
            f = top_folder(line[3:].split(" -> ")[-1])
            dirty[f] = dirty.get(f, 0) + 1
    unpushed = git("log", "origin/main..main", "--format=%ct").split()
    oldest = parse_time(int(min(unpushed))) if unpushed else None
    return {"branch": branch, "commits_last_hour": commits, "commits_per_folder": per_folder,
            "uncommitted_per_folder": dirty, "unpushed": len(unpushed),
            "oldest_unpushed_min": mins_since(oldest, at)}


def read_rig(at: datetime) -> dict:
    live = ROOT / "OBS" / "Live"
    current = None
    records = sorted(live.glob("S*/session.json")) if live.exists() else []
    if records:
        s = read_json(records[-1], {}) or {}
        total = 0.0
        for span in s.get("spans", []):
            end = span.get("end") or time.time()
            total += max(end - span.get("start", end), 0)
        current = {"id": s.get("id"), "state": s.get("state"), "recorded_min": round(total / 60)}
    processed = sorted(p.name.split("_")[0] for p in (ROOT / "OBS" / "Processed").glob("S*") if p.is_dir()) \
        if (ROOT / "OBS" / "Processed").exists() else []
    status_file = ROOT / "OBS" / "rig" / "run" / "live" / "process_status.txt"
    process_status = short(status_file.read_text(encoding="utf-8", errors="replace"), 100) if status_file.exists() else None
    return {"latest_session": current, "filed": processed, "process_status": process_status}


def read_clock(at: datetime) -> dict:
    try:
        with urllib.request.urlopen(f"{CLOCK_URL}?t={int(time.time())}", timeout=15) as r:
            d = json.loads(r.read().decode("utf-8"))
    except Exception as error:  # the site being unreachable is itself a fact worth showing
        return {"error": short(repr(error), 120)}
    used = float(d.get("banked_seconds") or 0)
    if d.get("status") == "recording" and d.get("running_since"):
        used += time.time() - float(d["running_since"])
    budget = float(d.get("budget_seconds") or 43200)
    published = parse_time(d.get("published_at"))
    return {"status": d.get("status"), "session": d.get("session"),
            "hours_used": round(used / 3600, 2), "hours_left": round((budget - used) / 3600, 2),
            "published_min_ago": mins_since(published, at)}


def read_charter() -> dict:
    path = ROOT / "CHARTER.md"
    text = path.read_text(encoding="utf-8", errors="replace") if path.exists() else ""
    deliverables = re.findall(r"^\|\s*((?:M|D)\d+)\s*\|\s*([^|]+?)\s*\|", text, re.M)
    scenes = re.search(r"\*\*Operator scenes to shoot today:\*\*\s*(.+)", text)
    return {"deliverables": [f"{i} {n}" for i, n in deliverables],
            "operator_scenes": short(scenes.group(1), 400) if scenes else None}


# ---------------------------------------------------------------- snapshot

def flags_for(snap: dict) -> list[str]:
    flags = []
    names = {s["name"] for s in snap["sessions"]}
    for s in snap["sessions"]:
        if s.get("name") == "briefing":
            continue  # briefing only relays other sessions' blockers; its own state isn't one
        if s.get("needs"):
            flags.append(f"BLOCKED {s['name']}: needs {s['needs']}")
        # Busy with no update is the stuck signal. Idle-but-working is a session
        # waiting on its own schedule (the watcher's hourly loop), not stuck.
        if s.get("status") == "busy" and s.get("state") == "working" and (s.get("updated_min_ago") or 0) >= STUCK_MIN:
            flags.append(f"MAYBE STUCK {s['name']}: busy, no update for {s['updated_min_ago']} min")
    for r in snap["roster"]["running"]:
        if r["name"] not in names and r["name"] != "orchestration-temporary":
            flags.append(f"NOT RUNNING {r['name']}: on the roster as running ({r['folder']}), not in claude agents")
    for e in snap["desk"]["live"]:
        if (e.get("waiting_min") or 0) > DESK_WAIT_MIN:
            flags.append(f"DESK {e['id']} from {e.get('from') or '?'} waiting {e['waiting_min']} min ({e['status']})")
    for p in snap["desk"]["pokes_last_hour"]:
        flags.append(f"POKE {p['line']}")
    g = snap["git"]
    if g["branch"] and g["branch"] != "main":
        flags.append(f"GIT HEAD is on {g['branch']}, not main")
    if (g.get("oldest_unpushed_min") or 0) > UNPUSHED_MIN:
        flags.append(f"GIT {g['unpushed']} unpushed commits, oldest {g['oldest_unpushed_min']} min old")
    if snap["clock"].get("error"):
        flags.append(f"CLOCK site status unreachable: {snap['clock']['error']}")
    return flags


def collect(cadence_s: int) -> dict:
    at = now()
    end = at.replace(hour=WINDOW_END[0], minute=WINDOW_END[1], second=0, microsecond=0)
    snap = {
        "collected_at": at.isoformat(timespec="seconds"),
        "prague_time": hm(at),
        "minutes_to_18": int((end - at).total_seconds() // 60),
        "cadence_min": cadence_s // 60,
        "sessions": read_sessions(at),
        "roster": read_roster(),
        "desk": read_desk(at),
        "intakes": read_intakes(),
        "specs": read_specs(),
        "git": read_git(at),
        "rig": read_rig(at),
        "clock": read_clock(at),
        "charter": read_charter(),
    }
    snap["flags"] = flags_for(snap)
    return snap


def diff(old: dict | None, new: dict) -> list[str]:
    if not old:
        return ["collector started; first snapshot"]
    ev = []
    o = {s["name"]: s for s in old.get("sessions", [])}
    n = {s["name"]: s for s in new["sessions"]}
    for name in n.keys() - o.keys():
        ev.append(f"session {name} appeared ({n[name]['folder']}, {n[name].get('state')})")
    for name in o.keys() - n.keys():
        ev.append(f"session {name} vanished")
    for name in n.keys() & o.keys():
        a, b = o[name], n[name]
        if (a.get("state"), a.get("status")) != (b.get("state"), b.get("status")):
            ev.append(f"{name}: {a.get('state')}/{a.get('status')} -> {b.get('state')}/{b.get('status')}: {short(b.get('detail'), 120)}")
        if b.get("needs") and b.get("needs") != a.get("needs"):
            ev.append(f"{name} now needs: {b['needs']}")
    od = {e["id"]: e["status"] for e in old.get("desk", {}).get("live", [])}
    nd = {e["id"]: e["status"] for e in new["desk"]["live"]}
    for i in nd.keys() - od.keys():
        ev.append(f"desk: {i} is {nd[i]}")
    for i in od.keys() - nd.keys():
        ev.append(f"desk: {i} left the open list")
    op = {p["line"] for p in old.get("desk", {}).get("pokes_last_hour", [])}
    for p in new["desk"]["pokes_last_hour"]:
        if p["line"] not in op:
            ev.append(f"POKE: {p['line']}")
    oi = {i["file"] for i in old.get("intakes", []) if i["waiting_on_alex"]}
    ni = {i["file"] for i in new["intakes"] if i["waiting_on_alex"]}
    for f in ni - oi:
        ev.append(f"intake now waiting on Alex: {f}")
    for f in oi - ni:
        ev.append(f"intake no longer waiting: {f}")
    os_ = {s["folder"]: s for s in old.get("specs", [])}
    for s in new["specs"]:
        prev = os_.get(s["folder"])
        if prev is None:
            ev.append(f"spec appeared: {s['folder']}\\SPEC.md")
        elif s["steps_done"] != prev["steps_done"]:
            ev.append(f"spec {s['folder']}: steps done {prev['steps_done']} -> {s['steps_done']}")
        elif prev and s["decisions"] > prev["decisions"]:
            ev.append(f"spec {s['folder']}: new decision logged ({s['decisions']} in all)")
    oh = {c["hash"] for c in old.get("git", {}).get("commits_last_hour", [])}
    for c in new["git"]["commits_last_hour"]:
        if c["hash"] not in oh:
            ev.append(f"commit {c['hash']} {c['time']} [{', '.join(c['folders'])}] {c['subject']}")
    if old.get("git", {}).get("unpushed", 0) > 0 and new["git"]["unpushed"] == 0:
        ev.append("git: everything pushed")
    ro = (old.get("rig") or {}).get("latest_session") or {}
    rn = new["rig"].get("latest_session") or {}
    if (ro.get("id"), ro.get("state")) != (rn.get("id"), rn.get("state")):
        ev.append(f"rig: {ro.get('id')} {ro.get('state')} -> {rn.get('id')} {rn.get('state')}")
    oc, nc = old.get("clock", {}), new["clock"]
    if (oc.get("status"), oc.get("session")) != (nc.get("status"), nc.get("session")):
        ev.append(f"site clock: {oc.get('status')} {oc.get('session')} -> {nc.get('status')} {nc.get('session')}")
    of = set(old.get("flags", []))
    for f in new["flags"]:
        if f not in of and not f.startswith("POKE"):
            ev.append(f"flag raised: {f}")
    return ev


def render(snap: dict, recent: list[str], next_at: datetime, fast_until: datetime | None) -> str:
    L = []
    cad = f"every {snap['cadence_min']} min"
    if fast_until and snap["cadence_min"] == FAST // 60:
        cad += f" until {hm(fast_until)}, then every {SLOW // 60}"
    L.append(f"# Briefing snapshot — {snap['prague_time']} Prague")
    L.append(f"Collected {snap['collected_at']}. Next about {hm(next_at)} ({cad}). "
             f"Alex's window: {snap['minutes_to_18']} min left until 18:00.")
    L.append("\n## Needs Alex")
    needs = []
    for e in snap["desk"]["live"]:
        needs.append(f"- desk {e['id']} from {e.get('from') or '?'}: {e['status']}, waiting {e.get('waiting_min')} min")
    for p in snap["desk"]["pokes_last_hour"]:
        needs.append(f"- POKE {p['line']}")
    for i in snap["intakes"]:
        if i["waiting_on_alex"]:
            needs.append(f"- intake {i['file']}: {i['state']}, {i['empty_answer_fences']} empty answer fences")
    for s in snap["sessions"]:
        if s.get("needs") and s.get("name") != "briefing":
            needs.append(f"- session {s['name']} blocked: {s['needs']}")
    L += needs or ["- Nothing waiting on Alex in the desk queue, intakes or session states."]
    L.append("\n## Health flags")
    L += [f"- {f}" for f in snap["flags"]] or ["- None."]
    L.append("\n## Sessions (claude agents + job state)")
    L.append("| session | folder | status | state | last update | doing |")
    L.append("| --- | --- | --- | --- | --- | --- |")
    for s in sorted(snap["sessions"], key=lambda x: x["name"] or ""):
        L.append(f"| {s['name']} | {s['folder']} | {s['status']} | {s['state']} | "
                 f"{s['updated']} ({s['updated_min_ago']} min ago) | {short(s['detail'], 110)} |")
    missing = [r for r in snap["roster"]["running"] if r["name"] not in {s["name"] for s in snap["sessions"]}]
    if missing:
        L.append("\nOn the roster as running but not found: " + ", ".join(f"{r['name']} ({r['folder']})" for r in missing))
    if snap["roster"]["planned"]:
        L.append("Planned (roster): " + ", ".join(f"{r['name']} ({r['folder']})" for r in snap["roster"]["planned"]))
    L.append("\n## Specs (SPEC.md checkboxes and decision logs)")
    L.append("| folder | steps done | steps open | next open step | decisions logged |")
    L.append("| --- | --- | --- | --- | --- |")
    for s in snap["specs"]:
        nxt = (s["next_steps"][0] if s["next_steps"] else "—").replace("|", "/")
        L.append(f"| {s['folder']} | {s['steps_done']} | {s['steps_open']} | {nxt} | {s['decisions']} |")
    g = snap["git"]
    L.append("\n## Git")
    L.append(f"Branch {g['branch']}. Unpushed commits: {g['unpushed']}"
             + (f" (oldest {g['oldest_unpushed_min']} min)" if g['unpushed'] else "") + ".")
    L.append("Commits in the last hour by folder: " + (", ".join(f"{k} {v}" for k, v in sorted(g["commits_per_folder"].items())) or "none"))
    L.append("Uncommitted files by folder: " + (", ".join(f"{k} {v}" for k, v in sorted(g["uncommitted_per_folder"].items())) or "none"))
    r, c = snap["rig"], snap["clock"]
    L.append("\n## Rig and site clock")
    ls = r.get("latest_session") or {}
    L.append(f"Rig: {ls.get('id')} {ls.get('state')}, {ls.get('recorded_min')} min recorded. "
             f"Filed: {', '.join(r['filed']) or 'none'}. /process status: {r.get('process_status') or '—'}.")
    if c.get("error"):
        L.append(f"Site clock: unreachable ({c['error']}).")
    else:
        L.append(f"Site clock: {c.get('status')} {c.get('session') or ''}, {c.get('hours_used')} h used, "
                 f"{c.get('hours_left')} h left of 12 (published {c.get('published_min_ago')} min ago).")
    L.append("\n## Recent changes (events.md, last 60 min)")
    L += [f"- {e}" for e in recent] or ["- None."]
    L.append("\n## Charter reference")
    L.append("Deliverables: " + "; ".join(snap["charter"]["deliverables"]))
    if snap["charter"].get("operator_scenes"):
        L.append("Operator scenes to shoot today (charter): " + snap["charter"]["operator_scenes"])
    return "\n".join(L) + "\n"


def recent_events(at: datetime, minutes: int = 60) -> list[str]:
    if not EVENTS.exists():
        return []
    out = []
    cutoff = at - timedelta(minutes=minutes)
    for line in EVENTS.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^- (\d{4}-\d{2}-\d{2} \d{2}:\d{2}) (.*)", line)
        if m:
            try:
                t = datetime.strptime(m.group(1), "%Y-%m-%d %H:%M").astimezone()
            except ValueError:
                continue
            if t >= cutoff:
                out.append(f"{m.group(1)[11:]} {m.group(2)}")
    return out[-40:]


def start_time() -> datetime:
    data = read_json(START)
    if data and data.get("first_start"):
        return datetime.fromisoformat(data["first_start"])
    first = now()
    write_json(START, {"first_start": first.isoformat(timespec="seconds")})
    return first


def tick() -> int:
    first = start_time()
    elapsed = (now() - first).total_seconds()
    cadence = FAST if elapsed < FAST_FOR else SLOW
    old = read_json(LATEST_JSON)
    snap = collect(cadence)
    at = datetime.fromisoformat(snap["collected_at"])
    events = diff(old, snap)
    if events:
        if not EVENTS.exists():
            EVENTS.write_text("# Briefing events\n\nOnly what changed between collector ticks, newest last.\n\n", encoding="utf-8")
        with EVENTS.open("a", encoding="utf-8") as f:
            for e in events:
                f.write(f"- {at.strftime('%Y-%m-%d %H:%M')} {e}\n")
    write_json(LATEST_JSON, snap)
    fast_until = first + timedelta(seconds=FAST_FOR)
    next_at = at + timedelta(seconds=cadence)
    tmp = LATEST_MD.with_suffix(".md.tmp")
    tmp.write_text(render(snap, recent_events(at), next_at, fast_until), encoding="utf-8")
    os.replace(tmp, LATEST_MD)
    SNAPS.mkdir(parents=True, exist_ok=True)
    write_json(SNAPS / f"{at.strftime('%Y%m%d-%H%M%S')}.json", snap)
    for p in SNAPS.glob("*.json"):  # no hoarding: raw snapshots for the last 2 hours only
        try:
            t = datetime.strptime(p.stem, "%Y%m%d-%H%M%S").astimezone()
            if (at - t).total_seconds() > KEEP_SNAPSHOTS:
                p.unlink()
        except (ValueError, OSError):
            pass
    log(f"tick done: {len(snap['sessions'])} sessions, {len(snap['flags'])} flags, {len(events)} events, next in {cadence // 60} min")
    return cadence


def loop_running() -> bool:
    try:
        pid = int(PID.read_text(encoding="utf-8").strip())
    except (FileNotFoundError, ValueError):
        return False
    out = subprocess.run(["tasklist", "/FI", f"PID eq {pid}", "/NH", "/FO", "CSV"],
                         capture_output=True, text=True, creationflags=NO_WINDOW).stdout
    return f'"{pid}"' in out and "python" in out.lower()


def main() -> int:
    args = sys.argv[1:]
    if "--alive" in args:
        print("collector running" if loop_running() else "collector NOT running")
        return 0
    if "--once" in args:
        tick()
        return 0
    if loop_running():
        log("collector already running, not starting another")
        return 0
    DATA.mkdir(parents=True, exist_ok=True)
    PID.write_text(str(os.getpid()), encoding="utf-8")
    log(f"collector started, pid {os.getpid()}")
    while True:
        try:
            cadence = tick()
        except Exception as error:  # keep the loop alive through a bad read
            log(f"error: {error!r}")
            cadence = FAST
        time.sleep(cadence)


if __name__ == "__main__":
    sys.exit(main())
