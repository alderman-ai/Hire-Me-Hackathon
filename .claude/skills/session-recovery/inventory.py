"""Read-only inventory for the session-recovery skill.

Prints, for every roster session in SESSIONS.md: whether it is live, its newest
transcript, when it last acted (Prague and UTC), whether it was idle or cut off
mid-turn, whether it ran a /loop or cron, and its uncommitted files. Then:
transcripts that aren't on the roster, the project's non-Claude processes with
their owners (and whether the briefing collector and the website clock_sync loop
are RUNNING or DOWN), the recording state, git health and the answer desk windows.
It changes nothing.

Usage (from anywhere):
  python -I inventory.py [hours]              hours: only transcripts written in the last N hours (default 24)
  python -I inventory.py --tail <id> [n]      the last n messages of one session (default 8), Prague times
  python -I inventory.py --wait <id> [secs]   block until the session finishes the turn its RECOVERY NOTICE
                                              started (default 600 s), then print its reply. Run it in the background.
"""
import glob
import json
import os
import re
import subprocess
import sys
import time
from datetime import datetime, timezone

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", ".."))
PROJECTS = os.path.join(os.path.expanduser("~"), ".claude", "projects")
MODE = sys.argv[1] if len(sys.argv) > 2 and sys.argv[1] in ("--tail", "--wait") else None
HOURS = float(sys.argv[1]) if len(sys.argv) > 1 and not MODE else 24.0
FIRST_ORDER = ["orchestration", "answer-desk", "rig", "website", "watcher"]
SKIP_PROCS = r"^(claude|powershell|pwsh|bash|cmd|conhost|WindowsTerminal|OpenConsole|Obsidian|explorer|Code)"
# Long-running loops a reboot or logoff kills. The recovery notices tell each owner to restart its own.
# (label, owner folder, loop script, pid file the loop writes, flags that mean a one-shot run, not the loop)
LOOPS = [
    ("briefing collector", "briefing", r"briefing\collect.py", r"briefing\data\collector.pid", ("--once", "--alive")),
    ("website clock_sync loop", "website", r"website\scripts\clock_sync.py", r"website\.clock\sync.pid",
     ("--once", "--status")),
]

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass


def when(ts):
    """ISO UTC timestamp -> 'DD Mon HH:MM:SS Prague (HH:MM:SS UTC)'. Prague = this PC's local time."""
    if not ts:
        return "never"
    dt = datetime.fromisoformat(ts.replace("Z", "+00:00"))
    return f"{dt.astimezone():%d %b %H:%M:%S} Prague ({dt.astimezone(timezone.utc):%H:%M:%S} UTC)"


def run(cmd, cwd=ROOT):
    try:
        return subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, encoding="utf-8",
                              errors="replace", timeout=90).stdout
    except Exception as e:
        return f"<failed: {e}>"


def powershell(script):
    return run(["powershell", "-NoProfile", "-NonInteractive", "-Command", script])


def short(s, n=220):
    s = re.sub(r"\s+", " ", s or "").strip()
    return s if len(s) <= n else s[: n - 1] + "…"


def norm_folder(cell):
    cell = cell.strip().strip("`").strip()
    if cell.lower() in ("repo root", "root", ".", ""):
        return "."
    return cell.rstrip("\\/").replace("/", "\\")


def read_roster():
    """Rows of the 'Running' table in SESSIONS.md: name, folder, role, temporary."""
    rows, in_running = [], False
    with open(os.path.join(ROOT, "SESSIONS.md"), encoding="utf-8") as f:
        for line in f:
            if line.startswith("## "):
                in_running = line.strip().lower() == "## running"
                continue
            if not in_running or not line.startswith("|"):
                continue
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if len(cells) < 3 or set(cells[0]) <= set("-: ") or cells[0].lower() == "session":
                continue
            name = cells[0].strip("`").strip()
            if not name or name.lower() == "none":
                continue
            role = cells[2]
            rows.append({"name": name, "folder": norm_folder(cells[1]), "role": role,
                         "temporary": role.lower().startswith("temporary")})
    return rows


def folder_of(cwd):
    if not cwd:
        return "?"
    rel = os.path.relpath(cwd, ROOT)
    return "." if rel == "." else rel.split(os.sep)[0]


def text_of(content):
    if isinstance(content, str):
        return content
    out = []
    for c in content or []:
        if isinstance(c, dict) and c.get("type") == "text":
            out.append(c.get("text", ""))
        elif isinstance(c, dict) and c.get("type") == "tool_use":
            out.append(f"[tool {c.get('name')}]")
    return " ".join(out)


def scan_transcript(path):
    info = {"path": path, "id": os.path.splitext(os.path.basename(path))[0], "title": None,
            "agent": None, "cwd": None, "last_ts": None, "last_kind": None, "stop": None,
            "last_prompt": None, "last_said": None, "cron": False}
    with open(path, encoding="utf-8", errors="replace") as f:
        for line in f:
            try:
                d = json.loads(line)
            except Exception:
                continue
            t = d.get("type")
            if t == "custom-title":
                info["title"] = d.get("customTitle")
            elif t == "agent-name":
                info["agent"] = d.get("agentName")
            elif t == "last-prompt" and d.get("lastPrompt"):
                info["last_prompt"] = d["lastPrompt"]
            if d.get("cwd") and not info["cwd"]:
                info["cwd"] = d["cwd"]
            if d.get("timestamp"):
                info["last_ts"] = d["timestamp"]
            if t not in ("user", "assistant"):
                continue
            msg = d.get("message") or {}
            content = msg.get("content")
            info["last_kind"], info["stop"] = t, msg.get("stop_reason")
            if t == "assistant":
                if isinstance(content, list) and any(
                        isinstance(c, dict) and c.get("type") == "tool_use"
                        and c.get("name") in ("CronCreate", "ScheduleWakeup") for c in content):
                    info["cron"] = True
                said = text_of(content).strip()
                if said and not said.startswith("[tool"):
                    info["last_said"] = said
            elif not d.get("isMeta") and isinstance(content, str) and content.strip() \
                    and not content.lstrip().startswith("<"):
                info["last_prompt"] = content
                if content.lstrip().startswith("/loop"):
                    info["cron"] = True
    info["name"] = info["title"] or info["agent"]
    info["folder"] = folder_of(info["cwd"])
    info["idle"] = info["last_kind"] == "assistant" and info["stop"] == "end_turn"
    return info


def transcripts():
    prefix = re.sub(r"[^A-Za-z0-9]", "-", ROOT)
    cutoff = time.time() - HOURS * 3600
    found = []
    for d in glob.glob(os.path.join(PROJECTS, prefix + "*")):
        for p in glob.glob(os.path.join(d, "*.jsonl")):
            if os.path.getmtime(p) >= cutoff:
                found.append(scan_transcript(p))
    return found


def live_sessions():
    out = run(["claude", "agents", "--json"])
    try:
        data = json.loads(out)
    except Exception:
        return [], f"claude agents --json failed: {short(out, 200)}"
    root_l = ROOT.lower()
    return [a for a in data if (a.get("cwd") or "").lower().startswith(root_l)], None


def print_loops(owners):
    """RUNNING or DOWN for each loop in LOOPS. A loop is a python process whose command line names its
    script by full path (how both CLAUDE.md files start it), or the live pid in its pid file, never a one-shot run."""
    ps = ("@(Get-CimInstance Win32_Process | Where-Object { $_.Name -match '^pythonw?' } | "
          "Select-Object ProcessId, @{n='Start';e={$_.CreationDate.ToString('HH:mm:ss')}}, CommandLine) | ConvertTo-Json -Compress")
    raw = powershell(ps).strip()
    try:
        py = json.loads(raw) if raw else []
        py = py if isinstance(py, list) else [py]
    except Exception:
        print(f"- couldn't list python processes, so the loops below are unknown: {short(raw, 200)}")
        return
    print("Loops a reboot kills (each owner restarts its own, with the command in its CLAUDE.md):")
    for label, folder, script, pidfile, one_shot in LOOPS:
        owner = owners.get(folder.lower(), f"? ({folder})")
        full = os.path.join(ROOT, script).lower()
        try:
            with open(os.path.join(ROOT, pidfile), encoding="utf-8") as f:
                pid = int(f.read().strip())
        except Exception:
            pid = None
        hits = []
        for p in py:
            cmd = (p.get("CommandLine") or "").lower().replace("/", "\\")
            if os.path.basename(script).lower() not in cmd or any(flag in cmd for flag in one_shot):
                continue
            if full in cmd or p.get("ProcessId") == pid:
                hits.append(p)
        if hits:
            pids = ", ".join(f"pid {p.get('ProcessId')} since {p.get('Start')}" for p in hits)
            extra = f"  ({len(hits)} copies)" if len(hits) > 1 else ""
            print(f"- {label:<24} RUNNING  owner {owner:<10} {pids}{extra}")
        else:
            why = "no pid file" if pid is None else f"pid file says {pid}, not a live loop"
            print(f"- {label:<24} DOWN     owner {owner:<10} {script} ({why}): its notice says restart it")


def main():
    now = datetime.now().astimezone()
    print(f"Session recovery inventory  ·  {now:%d %b %H:%M:%S} Prague (UTC{now:%z})  ·  root {ROOT}")
    print("Transcript times are UTC; everything below is shown as Prague (UTC).\n")

    roster = read_roster()
    roster_names = {r["name"] for r in roster}
    trs = transcripts()
    live, err = live_sessions()
    if err:
        print("WARNING:", err)
    live_by_name = {a.get("name"): a for a in live}
    live_ids = {a.get("sessionId") for a in live}
    status = [l for l in run(["git", "status", "--porcelain"]).splitlines() if l.strip()]
    paths = [l[3:].strip().strip('"') for l in status]

    def dirty(folder):
        if folder == ".":
            return [p for p in paths if "/" not in p or p.startswith(".claude/")]
        f = folder.replace("\\", "/") + "/"
        return [p for p in paths if p.startswith(f)]

    print("=== ROSTER (SESSIONS.md, Running table)")
    used, to_resume = set(), []
    for r in roster:
        cands = [t for t in trs if t["name"] == r["name"]]
        same_folder = [t for t in cands if t["folder"].lower() == r["folder"].lower()]
        cands = sorted(same_folder or cands, key=lambda t: t["last_ts"] or "", reverse=True)
        tr = cands[0] if cands else None
        if tr:
            used.add(tr["id"])
        lv = live_by_name.get(r["name"])
        tag = "TEMPORARY · " if r["temporary"] else ""
        if lv:
            verdict = f"LIVE ({lv.get('id')}, {lv.get('status')}) - leave it alone"
        elif r["temporary"]:
            verdict = "dead - temporary row, don't resume unless Alex asks"
        elif tr:
            verdict = "DEAD - resume"
            to_resume.append((r, tr))
        else:
            verdict = f"DEAD - no transcript in the last {HOURS:g} h: launch fresh under this name"
            to_resume.append((r, None))
        print(f"\n- {r['name']}  [{r['folder']}]  {tag}{verdict}")
        if tr:
            state = "idle" if tr["idle"] else ("working" if lv else "CUT OFF MID-TURN")
            print(f"    transcript {tr['id']}  last acted {when(tr['last_ts'])}  ·  {state}")
            print(f"    last prompt: {short(tr['last_prompt'])}")
            print(f"    last said:   {short(tr['last_said'])}")
            if tr["cron"] and not lv:
                print("    ran a /loop or cron: its notice says CronList first, re-arm only if missing")
        d = dirty(r["folder"])
        if d:
            print(f"    uncommitted in its folder: {', '.join(d[:8])}{' …' if len(d) > 8 else ''}")
        if r["folder"] != ".":
            last = run(["git", "log", "-1", "--format=%h %ad %s", "--date=format:%H:%M", "--", r["folder"]]).strip()
            print(f"    last commit there: {last or 'none'}")

    print("\n=== NOT ON THE ROSTER (transcripts written in the window; report these, don't resume)")
    extra = [t for t in trs if t["id"] not in used and t["id"] not in live_ids]
    for t in sorted(extra, key=lambda t: t["last_ts"] or "", reverse=True)[:15]:
        state = "idle" if t["idle"] else "cut off mid-turn"
        note = "  ·  older transcript of a roster name (superseded), ignore" if t["name"] in roster_names else ""
        print(f"- {t['name'] or '(unnamed)'}  [{t['folder']}]  {t['id']}  last acted {when(t['last_ts'])}  ·  {state}{note}")
        if not note:
            print(f"    last prompt: {short(t['last_prompt'], 160)}")
    if not extra:
        print("- none")

    dead_ts = [tr["last_ts"] for _, tr in to_resume if tr and tr["last_ts"]]
    if dead_ts:
        print(f"\nLatest activity among the dead roster sessions: {when(max(dead_ts))}  (a lower bound for the incident time)")

    order = sorted(to_resume, key=lambda p: (
        FIRST_ORDER.index(p[0]["name"]) if p[0]["name"] in FIRST_ORDER else len(FIRST_ORDER),
        0 if (p[1] is None or p[1]["idle"]) else 1))
    print("\n=== SUGGESTED RESUME ORDER (orchestration first to prove the method; mid-turn sessions last)")
    for i, (r, tr) in enumerate(order, 1):
        how = f"-SessionId {tr['id']}" if tr else "-Fresh"
        print(f"{i}. {r['name']}  -Folder '{r['folder']}'  {how}")
    if not order:
        print("- nothing to resume")

    print("\n=== NON-CLAUDE PROCESSES (recording, sync loops, dev servers; owner = roster session of that folder)")
    ps = (
        "$r=[regex]::Escape('" + ROOT.replace("'", "''") + "');"
        "@(Get-CimInstance Win32_Process | Where-Object { $_.Name -notmatch '" + SKIP_PROCS + "' -and "
        "($_.Name -match '^(obs64|ffmpeg)' -or ($_.CommandLine -and $_.CommandLine -match $r)) } | "
        "Select-Object ProcessId, Name, @{n='Start';e={$_.CreationDate.ToString('HH:mm:ss')}}, CommandLine) | ConvertTo-Json -Compress"
    )
    raw = powershell(ps).strip()
    try:
        procs = json.loads(raw) if raw else []
        procs = procs if isinstance(procs, list) else [procs]
    except Exception:
        procs = []
        print(f"- couldn't list processes: {short(raw, 200)}")
    owners = {}
    for r in sorted(roster, key=lambda r: r["temporary"]):  # permanent rows win a shared folder
        if r["folder"] != ".":
            owners.setdefault(r["folder"].lower(), r["name"])
    root_re = re.compile(re.escape(ROOT) + r"[\\/]([^\\/\"]+)", re.I)
    for pr in procs:
        cmd = pr.get("CommandLine") or ""
        name = pr.get("Name") or "?"
        m = root_re.search(cmd)
        if name.lower().startswith(("obs64", "ffmpeg")):
            owner = "rig"
        elif m:
            owner = owners.get(m.group(1).lower(), f"? ({m.group(1)})")
        else:
            owner = "?"
        print(f"{pr.get('ProcessId'):<6} {name:<13} since {pr.get('Start')}  owner {owner:<16} {short(cmd, 120)}")
    if not procs:
        print("- none running. After a power cut that's expected: OBS, the rig controller, the recorders and the sync loops are all down.")
    print()
    print_loops(owners)

    print("\n=== RECORDING (OBS\\Live)")
    sess = sorted(glob.glob(os.path.join(ROOT, "OBS", "Live", "*", "session.json")), key=os.path.getmtime)
    if sess:
        p = sess[-1]
        try:
            j = json.load(open(p, encoding="utf-8"))
            age = time.time() - os.path.getmtime(p)
            stale = j.get("state") == "recording" and age > 120
            print(f"- {j.get('id')} ({j.get('folder')}): state {j.get('state')}, session.json updated {age:.0f} s ago"
                  f"{'  <- STALE: the record says recording but nothing is updating it' if stale else ''}")
        except Exception as e:
            print(f"- {p}: unreadable ({e})")
    else:
        print("- no session folder in OBS\\Live")
    pidf = os.path.join(ROOT, "OBS", "rig", "run", "live", "controller.pid")
    if os.path.exists(pidf):
        pid = open(pidf).read().strip()
        if pid.isdigit():
            alive = powershell(f"if (Get-Process -Id {pid} -ErrorAction SilentlyContinue) {{ 'alive' }} else {{ 'DEAD' }}").strip()
            print(f"- rig controller pid {pid}: {alive}")

    print("\n=== GIT")
    print(f"- branch: {run(['git', 'rev-parse', '--abbrev-ref', 'HEAD']).strip()}")
    lock = os.path.join(ROOT, ".git", "index.lock")
    if os.path.exists(lock):
        git_running = powershell("@(Get-Process git -ErrorAction SilentlyContinue).Count").strip()
        print(f"- .git\\index.lock EXISTS (modified {datetime.fromtimestamp(os.path.getmtime(lock)):%H:%M:%S} Prague; "
              f"git processes running: {git_running}). If none are running it's stale: ask Alex before removing it, "
              "because GIT.md forbids deleting it.")
    print(f"- unpushed commits: {run(['git', 'rev-list', '--count', 'origin/main..main']).strip()}")
    print(f"- uncommitted paths: {len(paths)}")

    print("\n=== ANSWER DESK WINDOWS")
    ps2 = (
        "$all = Get-CimInstance Win32_Process; "
        "$all | Where-Object { $_.CommandLine -match 'open-desk\\.ps1' -and $_.Name -match '^powershell' } | ForEach-Object { "
        "$w=$_; $att = $all | Where-Object { $_.ParentProcessId -eq $w.ProcessId -and $_.CommandLine -match 'attach' }; "
        "'window pid {0} opened {1:HH:mm:ss}: {2}' -f $w.ProcessId, $w.CreationDate, "
        "$(if ($att) { 'attached (' + ($att.CommandLine -replace '.*attach\\s+','') + ')' } else { 'NOT attached: a dead window, Alex can close it' }) }"
    )
    print(powershell(ps2).rstrip() or "- no desk window open")


def find_transcript(session_id):
    prefix = re.sub(r"[^A-Za-z0-9]", "-", ROOT)
    files = [p for d in glob.glob(os.path.join(PROJECTS, prefix + "*"))
             for p in glob.glob(os.path.join(d, session_id + "*.jsonl"))]
    if not files:
        print(f"No transcript starting with {session_id} under {PROJECTS}\\{prefix}*")
    return files[0] if files else None


def wait(session_id, timeout):
    """Block until the turn started by the RECOVERY NOTICE has ended, then print the reply."""
    path = find_transcript(session_id)
    if not path:
        return
    start = time.time()
    while time.time() - start < timeout:
        notice_at, last = None, None
        with open(path, encoding="utf-8", errors="replace") as f:
            for i, line in enumerate(f):
                try:
                    d = json.loads(line)
                except Exception:
                    continue
                if d.get("type") not in ("user", "assistant"):
                    continue
                msg = d.get("message") or {}
                if d["type"] == "user" and "RECOVERY NOTICE" in text_of(msg.get("content")):
                    notice_at = i
                last = (i, d["type"], msg.get("stop_reason"))
        if notice_at is not None and last and last[0] > notice_at and last[1] == "assistant" and last[2] == "end_turn":
            print(f"Turn finished after {time.time() - start:.0f} s.\n")
            tail(session_id, 1)
            return
        time.sleep(3)
    print(f"Still working after {timeout} s, or no RECOVERY NOTICE in {os.path.basename(path)}. Check with --tail.")


def tail(session_id, n):
    """Print the last n prompts and replies of one session, with Prague times."""
    path = find_transcript(session_id)
    if not path:
        return
    files = [path]
    events = []
    with open(files[0], encoding="utf-8", errors="replace") as f:
        for line in f:
            try:
                d = json.loads(line)
            except Exception:
                continue
            if d.get("type") not in ("user", "assistant") or d.get("isMeta"):
                continue
            msg = d.get("message") or {}
            txt = text_of(msg.get("content")).strip()
            if not txt or (d["type"] == "user" and txt.lstrip().startswith("<")):
                continue
            who = "ALEX/PROMPT" if d["type"] == "user" else "SESSION"
            events.append(f"{when(d.get('timestamp'))}  {who}: {short(txt, 1200)}")
    print(f"Last {n} messages of {os.path.basename(files[0])}\n")
    print("\n\n".join(events[-n:]))


if __name__ == "__main__":
    if MODE == "--tail":
        tail(sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 8)
    elif MODE == "--wait":
        wait(sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 600)
    else:
        main()
