r"""Context size of every live background session in this project.

Built for Alex's standing instruction to orchestration: watch every session's context and make sure nothing
rots in it (clear, compact or relaunch). This script only measures; it changes nothing and messages no one.

For each session that `claude agents --json` lists under the repo root, it reads the session's transcript
from the end and takes the newest main-thread assistant turn. input + cache read + cache creation tokens of
that turn is the context the model saw (it matches what /context prints to within about 0.5%). It also
counts the compactions in the transcript: system lines with subtype "compact_boundary", which Claude Code
writes for both /compact and auto-compact (compactMetadata.trigger says which).

Usage, from the repo root:
  python -I orchestration\context_check.py            table, then FLAGS
  python -I orchestration\context_check.py --json     the same data as JSON
Options:
  --warn P     ROT at or above P percent of the window (default 50)
  --watch P    WATCH at or above P percent (default 35)
  --window N   assume an N-token window for every row instead of the per-model one

Exit 0, except 2 when `claude agents --json` fails.
"""
import argparse
import glob
import json
import os
import re
import shutil
import subprocess
import sys
from datetime import datetime, timedelta, timezone

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
HOME_CLAUDE = os.path.join(os.path.expanduser("~"), ".claude")
PROJECTS = os.path.join(HOME_CLAUDE, "projects")
CHUNK = 1 << 20  # bytes read per step when scanning a transcript backwards

# Context windows. Evidence on this PC (2 Nov 2026, Claude Code 2.1.316): /context printed "309.3k/1m tokens"
# for claude-opus-5-5 in this project, and transcripts here reached 938,994 tokens on that model, so its
# window is 1M although the model string has no "[1m]" suffix. No transcript on this PC carries "[1m]" in
# message.model or requestedModel. The rest of the list is the API model table (claude-api skill, cached
# 2026-10-06): every current model has 1M except Haiku 4.5 and older, which fall to the 200k default.
ONE_M = 1_000_000
DEFAULT_WINDOW = 200_000
ONE_M_MODELS = {
    "claude-fable-5-1", "claude-fable-5", "claude-mythos-5-1", "claude-mythos-5",
    "claude-opus-5-5", "claude-opus-5", "claude-opus-4-8", "claude-opus-4-7", "claude-opus-4-6",
    "claude-sonnet-5-5", "claude-sonnet-5", "claude-sonnet-4-6", "claude-haiku-5-5",
}

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass


class AgentsError(Exception):
    pass


# ---------- time

def parse_ts(ts):
    if not ts:
        return None
    try:
        dt = datetime.fromisoformat(str(ts).replace("Z", "+00:00"))
    except ValueError:
        return None
    return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)


def prague(dt):
    """UTC datetime -> Prague local time: CET (UTC+1), or CEST (UTC+2) from the last Sunday of March
    to the last Sunday of October, switching at 01:00 UTC. Independent of this PC's time zone setting."""
    def last_sunday(month):  # March and October both have 31 days
        d = datetime(dt.year, month, 31, 1, tzinfo=timezone.utc)
        return d - timedelta(days=(d.weekday() + 1) % 7)
    off = 2 if last_sunday(3) <= dt < last_sunday(10) else 1
    return dt.astimezone(timezone(timedelta(hours=off), f"UTC+{off}"))


def ago(dt, now):
    s = int((now - dt).total_seconds())
    if s < 60:
        return "just now"
    m = s // 60
    if m < 60:
        return f"{m}m ago"
    return f"{m // 60}h{m % 60:02d}m ago"


# ---------- sessions and transcripts

def under_root(cwd):
    if not cwd:
        return False
    c = os.path.normcase(os.path.abspath(cwd))
    r = os.path.normcase(ROOT).rstrip("\\/")
    return c == r or c.startswith(r + os.sep)


def live_sessions():
    exe = shutil.which("claude") or "claude"
    try:
        p = subprocess.run([exe, "agents", "--json"], cwd=ROOT, capture_output=True, text=True,
                           encoding="utf-8", errors="replace", timeout=60)
    except Exception as e:
        raise AgentsError(f"could not run `claude agents --json`: {e}")
    if p.returncode != 0:
        msg = re.sub(r"\s+", " ", (p.stderr or p.stdout or "").strip())[:200]
        raise AgentsError(f"`claude agents --json` exited {p.returncode}: {msg}")
    out = (p.stdout or "").strip()
    try:
        data = json.loads(out)
    except ValueError:
        s, e = out.find("["), out.rfind("]")
        try:
            data = json.loads(out[s:e + 1]) if s != -1 and e > s else None
        except ValueError:
            data = None
    if not isinstance(data, list):
        raise AgentsError("`claude agents --json` did not print a JSON array")
    return [a for a in data if isinstance(a, dict) and under_root(a.get("cwd"))]


def encode(path):
    """Project folder name Claude Code uses for a cwd (same rule as session-recovery\\inventory.py)."""
    return re.sub(r"[^A-Za-z0-9]", "-", path)


def find_transcript(cwd, session_id):
    if not session_id:
        return None
    p = os.path.join(PROJECTS, encode(cwd or ""), session_id + ".jsonl")
    if os.path.isfile(p):
        return p
    hits = glob.glob(os.path.join(PROJECTS, "*", session_id + ".jsonl"))
    return max(hits, key=os.path.getmtime) if hits else None


def loads(raw):
    try:
        return json.loads(raw.decode("utf-8", "replace"))
    except Exception:
        return None


def reverse_lines(path):
    """Yield the file's lines newest first, reading CHUNK bytes at a time from the end."""
    with open(path, "rb") as f:
        f.seek(0, os.SEEK_END)
        pos, rest = f.tell(), b""
        while pos > 0:
            step = min(CHUNK, pos)
            pos -= step
            f.seek(pos)
            lines = (f.read(step) + rest).split(b"\n")
            rest = lines[0]
            for line in reversed(lines[1:]):
                if line.strip():
                    yield line
        if rest.strip():
            yield rest


def usage_total(u):
    return sum(int(u.get(k) or 0) for k in ("input_tokens", "cache_read_input_tokens", "cache_creation_input_tokens"))


def newest_turn(path):
    """The newest main-thread assistant turn with usage. If a compaction came after it, the context is the
    compaction's postTokens and only the model is taken from the turn before."""
    pending = None
    for raw in reverse_lines(path):
        maybe_cb = b"compact_boundary" in raw
        maybe_turn = b'"assistant"' in raw and b'"usage"' in raw
        if not (maybe_cb or maybe_turn):
            continue
        d = loads(raw)
        if not isinstance(d, dict) or d.get("isSidechain"):
            continue
        if d.get("type") == "system" and d.get("subtype") == "compact_boundary":
            if pending is None:
                meta = d.get("compactMetadata") or {}
                pending = {"tokens": meta.get("postTokens"), "timestamp": d.get("timestamp"),
                           "basis": "compaction, no turn since"}
            continue
        if d.get("type") != "assistant":
            continue
        msg = d.get("message") or {}
        u = msg.get("usage")
        model = msg.get("model")
        if not isinstance(u, dict) or not model or model == "<synthetic>":
            continue
        total = usage_total(u)
        if total <= 0:
            continue
        if pending:
            pending["model"] = model
            return pending
        return {"tokens": total, "model": model, "timestamp": d.get("timestamp"), "basis": "newest turn",
                "input": int(u.get("input_tokens") or 0),
                "cache_read": int(u.get("cache_read_input_tokens") or 0),
                "cache_creation": int(u.get("cache_creation_input_tokens") or 0)}
    if pending:
        pending["model"] = None
        return pending
    return None


def compactions(path):
    """Every compaction in the transcript: system lines with subtype compact_boundary (/compact or auto)."""
    out = []
    with open(path, "rb") as f:
        data = f.read()
    i = data.find(b"compact_boundary")
    while i != -1:
        s = data.rfind(b"\n", 0, i) + 1
        e = data.find(b"\n", i)
        e = len(data) if e == -1 else e
        d = loads(data[s:e])
        if isinstance(d, dict) and d.get("type") == "system" and d.get("subtype") == "compact_boundary" \
                and not d.get("isSidechain"):
            meta = d.get("compactMetadata") or {}
            out.append({"timestamp": d.get("timestamp"), "trigger": meta.get("trigger"),
                        "pre_tokens": meta.get("preTokens"), "post_tokens": meta.get("postTokens")})
        i = data.find(b"compact_boundary", e)
    return out


# ---------- windows

def settings_model(cwd):
    """The `model` field only (nothing else is read or printed): user settings, then the repo root's and the
    session folder's .claude\\settings.json and settings.local.json; the last one set wins."""
    places = [("user", os.path.join(HOME_CLAUDE, "settings.json"))]
    for folder in dict.fromkeys([ROOT, cwd or ROOT]):
        label = "root" if os.path.normcase(folder) == os.path.normcase(ROOT) else os.path.relpath(folder, ROOT)
        for name in ("settings.json", "settings.local.json"):
            places.append((f"{label}\\.claude\\{name}", os.path.join(folder, ".claude", name)))
    found = None
    for label, p in places:
        try:
            with open(p, encoding="utf-8-sig") as f:
                v = json.load(f).get("model")
        except Exception:
            continue
        if isinstance(v, str) and v.strip():
            found = {"model": v.strip(), "from": label}
    return found


def window_for(model, configured, tokens, override):
    if override:
        return override, "--window"
    m = (model or "").lower()
    if "[1m]" in m or "[1m]" in ((configured or {}).get("model") or "").lower():
        return ONE_M, "[1m] suffix"
    base = re.sub(r"-\d{8}$", "", re.sub(r"\[.*?\]", "", m).strip())
    if base in ONE_M_MODELS:
        return ONE_M, "1M model"
    if tokens and tokens > DEFAULT_WINDOW:
        return ONE_M, "observed > 200k"
    return DEFAULT_WINDOW, "default"


def fmt_window(n):
    if n % 1_000_000 == 0:
        return f"{n // 1_000_000}m"
    if n % 1000 == 0:
        return f"{n // 1000}k"
    return f"{n:,}"


# ---------- main

def build(args):
    now = datetime.now(timezone.utc)
    rows = []
    for a in live_sessions():
        cwd, sid = a.get("cwd"), a.get("sessionId")
        path = find_transcript(cwd, sid)
        configured = settings_model(cwd)
        started = None
        if isinstance(a.get("startedAt"), (int, float)):
            started = datetime.fromtimestamp(a["startedAt"] / 1000, timezone.utc)
        row = {"name": a.get("name") or "(unnamed)", "id": a.get("id"), "session_id": sid,
               "status": a.get("status"), "state": a.get("state"), "cwd": cwd,
               "folder": "." if os.path.normcase(cwd or "") == os.path.normcase(ROOT) else os.path.relpath(cwd, ROOT),
               "started_prague": prague(started).strftime("%d %b %H:%M") if started else None,
               "transcript": path, "context_tokens": None, "window": None, "window_source": None,
               "percent": None, "model": None, "configured_model": configured, "basis": None,
               "last_turn_utc": None, "last_turn_prague": None, "last_turn_ago": None,
               "compactions": 0, "compaction_log": [], "note": None}
        if not path:
            row["note"] = "no transcript found"
            rows.append(row)
            continue
        try:
            turn = newest_turn(path)
            row["compaction_log"] = compactions(path)
        except OSError as e:
            row["note"] = f"transcript unreadable: {e.strerror or e}"
            rows.append(row)
            continue
        row["compactions"] = len(row["compaction_log"])
        if not turn or not turn.get("tokens"):
            row["note"] = "no assistant turn with usage yet"
            rows.append(row)
            continue
        win, src = window_for(turn.get("model"), configured, turn["tokens"], args.window)
        dt = parse_ts(turn.get("timestamp"))
        row.update({"context_tokens": turn["tokens"], "window": win, "window_source": src,
                    "percent": round(100.0 * turn["tokens"] / win, 1), "model": turn.get("model"),
                    "basis": turn.get("basis"),
                    "last_turn_utc": dt.strftime("%Y-%m-%dT%H:%M:%SZ") if dt else None,
                    "last_turn_prague": prague(dt).strftime("%d %b %H:%M") if dt else None,
                    "last_turn_ago": ago(dt, now) if dt else None})
        for k in ("input", "cache_read", "cache_creation"):
            if k in turn:
                row[k + "_tokens"] = turn[k]
        rows.append(row)

    rows.sort(key=lambda r: (r["percent"] is None, -(r["percent"] or 0), r["name"]))
    flags = []
    for r in rows:
        if r["percent"] is None:
            flags.append({"level": "NODATA", "name": r["name"], "id": r["id"], "percent": None, "note": r["note"]})
        elif r["percent"] >= args.warn:
            flags.append({"level": "ROT", "name": r["name"], "id": r["id"], "percent": r["percent"]})
        elif r["percent"] >= args.watch:
            flags.append({"level": "WATCH", "name": r["name"], "id": r["id"], "percent": r["percent"]})
    names = {}
    for r in rows:
        names.setdefault(r["name"], []).append(r["id"])
    for name, ids in sorted(names.items()):
        if len(ids) > 1:  # sessions are messaged by name, so two live ones under one name is worth seeing
            flags.append({"level": "SAMENAME", "name": name, "ids": ids, "percent": None})
    nowp = prague(now)
    return {"generated_utc": now.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "generated_prague": nowp.strftime("%d %b %H:%M:%S") + f" Prague ({nowp.tzname()})",
            "root": ROOT, "warn_percent": args.warn, "watch_percent": args.watch,
            "window_override": args.window, "sessions": rows, "flags": flags}


def compaction_cell(r):
    n = r["compactions"]
    if not n:
        return "0"
    last = r["compaction_log"][-1]
    dt = parse_ts(last.get("timestamp"))
    when = prague(dt).strftime("%H:%M") if dt else "?"
    return f"{n} (last {last.get('trigger') or '?'} {when})"


def print_table(rep):
    rows = rep["sessions"]
    print(f"Context check  {rep['generated_prague']}  .  {len(rows)} live sessions under {rep['root']}")
    print("Context = input + cache read + cache creation tokens of each session's newest main-thread turn.\n")
    head = ["name", "id", "status/state", "context tokens", "% of window", "model", "last turn (Prague)",
            "compactions"]
    body = []
    for r in rows:
        if r["percent"] is None:
            body.append([r["name"], r["id"] or "?", f"{r['status']}/{r['state']}", "?", "?", "?",
                         r["note"] or "?", str(r["compactions"])])
            continue
        pct = f"{r['percent']:.1f}% of {fmt_window(r['window'])}"
        last = f"{r['last_turn_prague']} ({r['last_turn_ago']})" if r["last_turn_prague"] else "?"
        if r["basis"] != "newest turn":
            last += f" [{r['basis']}]"
        body.append([r["name"], r["id"] or "?", f"{r['status']}/{r['state']}", f"{r['context_tokens']:,}",
                     pct, r["model"] or "?", last, compaction_cell(r)])
    widths = [max(len(str(x[i])) for x in [head] + body) for i in range(len(head))]
    right = {3, 4}
    for line in [head] + body:
        print(" | ".join(str(c).rjust(widths[i]) if i in right else str(c).ljust(widths[i])
                         for i, c in enumerate(line)).rstrip())

    seen = {}
    for r in rows:
        if r["window"]:
            seen.setdefault((r["model"], r["window"], r["window_source"]), 0)
            seen[(r["model"], r["window"], r["window_source"])] += 1
    print("\nWindows assumed:")
    for (model, win, src), n in sorted(seen.items(), key=lambda kv: str(kv[0])):
        print(f"  {model}: {win:,} ({src}; {n} session{'s' if n != 1 else ''})")
    if not seen:
        print("  none")
    conf = sorted({(r['configured_model']['from'], r['configured_model']['model'])
                   for r in rows if r.get("configured_model")})
    print("Settings `model` field: " + ("; ".join(f"{m} ({f})" for f, m in conf) if conf else "not set"))

    print(f"\nFLAGS (ROT >= {rep['warn_percent']:g}%, WATCH >= {rep['watch_percent']:g}%)")
    by_id = {r["id"]: r for r in rows}
    for f in rep["flags"]:
        r = by_id.get(f.get("id"), {})
        if f["level"] == "NODATA":
            print(f"NODATA {f['name']} ({f['id']})  {f.get('note')}")
        elif f["level"] == "SAMENAME":
            print(f"SAMENAME {f['name']}  {len(f['ids'])} live sessions: {', '.join(f['ids'])}")
        else:
            print(f"{f['level']} {f['name']}  {f['percent']:.1f}% of {fmt_window(r['window'])} "
                  f"({r['context_tokens']:,} tokens), last turn {r['last_turn_prague']}, "
                  f"compactions {r['compactions']}")
    if not rep["flags"]:
        print("none")


def main():
    ap = argparse.ArgumentParser(description="Context size of every live background session in this project.")
    ap.add_argument("--warn", type=float, default=50.0, help="ROT at or above this percent (default 50)")
    ap.add_argument("--watch", type=float, default=35.0, help="WATCH at or above this percent (default 35)")
    ap.add_argument("--window", type=int, default=None, help="assume this window (tokens) for every row")
    ap.add_argument("--json", action="store_true", help="print the same data as JSON")
    args = ap.parse_args()
    if args.window is not None and args.window <= 0:
        args.window = None
    try:
        rep = build(args)
    except AgentsError as e:
        print(f"context_check: {e}", file=sys.stderr)
        return 2
    if args.json:
        print(json.dumps(rep, indent=2, ensure_ascii=False))
    else:
        print_table(rep)
    return 0


if __name__ == "__main__":
    sys.exit(main())
