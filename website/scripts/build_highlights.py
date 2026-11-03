"""Compute the chart data for the Day 1 highlights section into content/highlights.json ("data" key).

Read-only on every source:
  - C:/Users/alder/Desktop/Full site outread/catalog.json   (sessions and subagents of Day 1, Prague time)
  - git log of the repo (author dates, read-only)
  - ../OBS/Processed/S*/session.json                         (recorded seconds per session)

Run:  python -X utf8 scripts/build_highlights.py
Only the "data" and "sources" keys of highlights.json are rewritten; the words, beats and clip bounds are kept.
"""

import collections
import glob
import json
import os
import re
import subprocess
from datetime import datetime, timedelta, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
REPO = os.path.dirname(SITE)
OUT = os.path.join(SITE, "content", "highlights.json")
CATALOG = r"C:\Users\alder\Desktop\Full site outread\catalog.json"

PRAGUE = timezone(timedelta(hours=1))  # CET on 2 Nov 2026 (summer time ended 25 Oct)
DAY0 = datetime(2026, 11, 2, tzinfo=PRAGUE)
DAY1 = DAY0 + timedelta(days=1)


def local(iso):
    return datetime.fromisoformat(iso).astimezone(PRAGUE)


def minute(dt):
    return max(0, min(1440, round((dt - DAY0).total_seconds() / 60)))


def merge(runs, gap=5):
    runs = sorted(runs)
    out = []
    for a, b in runs:
        if out and a - out[-1][1] <= gap:
            out[-1][1] = max(out[-1][1], b)
        else:
            out.append([a, b])
    return out


def sessions():
    cat = json.load(open(CATALOG, encoding="utf-8"))
    lanes = collections.OrderedDict()
    subs_hour = collections.Counter()
    subs_total = 0
    named_records = 0
    all_records = 0
    for s in cat["sessions"]:
        a, b = local(s["start"]), local(s["end"])
        if b < DAY0 or a >= DAY1:
            continue
        all_records += 1
        for sub in s["subagents"]:
            t = local(sub["start"])
            if DAY0 <= t < DAY1:
                subs_hour[t.hour] += 1
                subs_total += 1
        if not s["names"]:
            continue  # unnamed one-line slash-command sessions of the recording rig
        named_records += 1
        lane = s["names"][0]
        L = lanes.setdefault(lane, {"lane": lane, "runs": [], "subagents": 0})
        L["runs"].append([minute(a), max(minute(b), minute(a) + 1)])
        L["subagents"] += len(s["subagents"])
    lane_list = []
    for L in lanes.values():
        L["runs"] = merge(L["runs"])
        L["first"] = L["runs"][0][0]
        lane_list.append(L)
    lane_list.sort(key=lambda x: (x["first"], x["lane"]))
    for L in lane_list:
        del L["first"]
    return lane_list, subs_hour, subs_total, named_records, all_records


def commits():
    out = subprocess.run(
        ["git", "-C", REPO, "log", "--since=2026-11-02T00:00:00+01:00", "--until=2026-11-03T00:00:00+01:00", "--format=%aI|%s"],
        capture_output=True, text=True, encoding="utf-8", check=True,
    ).stdout.splitlines()
    per_hour = collections.Counter()
    per_folder = collections.Counter()
    for line in out:
        iso, _, subj = line.partition("|")
        per_hour[local(iso).hour] += 1
        m = re.match(r"\[([^\]]+)\]", subj)
        per_folder[m.group(1).strip().lower() if m else "(no prefix)"] += 1
    return per_hour, per_folder, len(out)


def recording():
    rows = []
    for f in sorted(glob.glob(os.path.join(REPO, "OBS", "Processed", "S*", "session.json"))):
        d = json.load(open(f, encoding="utf-8"))
        sp = d["spans"]
        start = datetime.fromisoformat(sp[0]["start_local"])
        rows.append({"id": d["id"], "start_min": minute(start), "seconds": round(d["elapsed_seconds"])})
    return rows


# ---------------------------------------------------------------- derby (the race of the day)

# Commit prefix ("[website] ...") to the roster name (SESSIONS.md) that is also the swimlane lane.
# Where the prefix is a folder rather than a session name, the session that owns that folder.
# 3 Nov: no folding. A lane counts only its own folder's prefix, exactly as the folders chart does, so the
# two never disagree on the page ([roster], [s2-orchestrator] and [s1-research] count for no racer).
PREFIX_TO_LANE = {
    "orchestration": "orchestration",
    "website": "website",
    "legibility": "s-d9-legibility",
    "getsales": "s-d3-getsales",
    "research": "s1-research",
    "answer-desk": "answer-desk",
    "scraping": "s-d1-scraping",
    "linkedin-content": "s-d7-linkedin-content",
    "canva-video": "s-d10-canva-video",
    "canva-templates": "s-d6-canva-templates",
    "blog-pipeline": "s-d4-blog-pipeline",
    "blog-articles": "s-d5-blog-articles",
    "wave2-specs": "wave2-specs",
    "bootstrap": "s0-bootstrap",
    "s0-bootstrap": "s0-bootstrap",
    "obs": "rig",                          # the capture rig lives in OBS/
    "alex-prep": "orch-alex-prep",
    "site-map": "orch-site-map",
    "briefing": "orch-briefing",
}
KILL_MIN = 13 * 60 + 20 + 55 / 60  # 13:20:55, Prague
DERBY_STEP = 5
ALWAYS_RACE = ["rig"]  # on the track at the kill and one of the sessions that handle the recording


def derby():
    cat = json.load(open(CATALOG, encoding="utf-8"))
    out = subprocess.run(
        ["git", "-C", REPO, "log", "--since=2026-11-02T00:00:00+01:00", "--until=2026-11-03T00:00:00+01:00", "--format=%aI|%s"],
        capture_output=True, text=True, encoding="utf-8", check=True,
    ).stdout.splitlines()
    events = []  # (minute float, lane or None)
    for line in out:
        iso, _, subj = line.partition("|")
        t = (local(iso) - DAY0).total_seconds() / 60
        m = re.match(r"\[([^\]]+)\]", subj)
        events.append((t, PREFIX_TO_LANE.get(m.group(1).strip().lower()) if m else None))
    events.sort(key=lambda e: e[0])  # by time only: an unmapped commit has no lane to compare
    start = int(events[0][0] // DERBY_STEP * DERBY_STEP)
    end = int(-(-events[-1][0] // DERBY_STEP) * DERBY_STEP)
    unattributed = sum(1 for _, l in events if l is None)

    totals = collections.Counter(l for _, l in events if l)
    ranked = [l for l, _ in totals.most_common() if l not in ALWAYS_RACE]
    chosen = ranked[: 12 - len(ALWAYS_RACE)] + ALWAYS_RACE

    raw = collections.defaultdict(list)  # lane -> [(start, end)] minutes float
    for s in cat["sessions"]:
        if not s["names"]:
            continue
        a, b = local(s["start"]), local(s["end"])
        if b < DAY0 or a >= DAY1:
            continue
        raw[s["names"][0]].append(((a - DAY0).total_seconds() / 60, min(1440.0, (b - DAY0).total_seconds() / 60)))

    grid = list(range(start, end + 1, DERBY_STEP))
    lanes = []
    for lane in chosen:
        times = [t for t, l in events if l == lane]
        runs = []
        for a, b in sorted(raw[lane]):
            if runs and a - runs[-1][1] <= 5:
                runs[-1][1] = max(runs[-1][1], b)
            else:
                runs.append([a, b])
        on = []
        killed = False
        for a, b in runs:
            if a < KILL_MIN < b:
                killed = True
                after = [t for t in times if t >= KILL_MIN]
                starts_after = [x for x, _ in raw[lane] if x > KILL_MIN]
                back = min(after + starts_after) if (after or starts_after) else b
                back = min(back, b)
                on += [[a, KILL_MIN], [back, b]]
            else:
                on.append([a, b])
        # a lane that is alive but has commits before its first record (rig): the first commit counts as entry
        first_seen = min([on[0][0]] + times[:1]) if on else (times[0] if times else 0)
        if on and first_seen < on[0][0]:
            on[0][0] = first_seen
        cum, k = [], 0
        for g in grid:
            while k < len(times) and times[k] <= g:
                k += 1
            cum.append(k)
        lanes.append({
            "lane": lane,
            "total": len(times),
            "enter": round(on[0][0], 2),
            "leave": round(on[-1][1], 2),
            "killed": killed,
            "back": round(on[-1][0], 2) if killed else None,
            "on": [[round(a, 2), round(b, 2)] for a, b in on],
            "cum": cum,
        })
    # lanes numbered by their first appearance, so the numbers read like starting gates
    lanes.sort(key=lambda L: (L["enter"], L["lane"]))
    for i, L in enumerate(lanes, 1):
        L["n"] = i
    # who led when (by cumulative commits, ties keep the earlier leader)
    leads = []
    cur = None
    for gi, g in enumerate(grid):
        best = max(lanes, key=lambda L: (L["cum"][gi], -L["n"]))
        if best["cum"][gi] > 0 and best["lane"] != cur:
            cur = best["lane"]
            leads.append([g, cur])
    return {
        "start": start, "end": end, "step": DERBY_STEP, "kill": round(KILL_MIN, 3),
        "lanes": lanes, "leads": leads,
        "totals": {"commits": len(events), "racing_commits": sum(L["total"] for L in lanes), "unattributed": unattributed, "lanes_all": len(raw), "lanes_racing": len(lanes)},
        "mapping": PREFIX_TO_LANE,
        "chosen_note": "top 11 attributed lanes by commits, plus rig (on the track at the kill; its commits are the [obs] prefix)",
    }


def main():
    lanes, subs_hour, subs_total, named, allrec = sessions()
    c_hour, c_folder, c_total = commits()
    rec = recording()
    data = {
        "swimlane": lanes,
        "subagents_per_hour": [[h, subs_hour.get(h, 0)] for h in range(9, 24)],
        "commits_per_hour": [[h, c_hour.get(h, 0)] for h in range(9, 24)],
        "commits_by_folder": [[k, v] for k, v in c_folder.most_common(10)]
        + ([["other", sum(v for _, v in c_folder.most_common()[10:])]] if len(c_folder) > 10 else []),
        "recording": rec,
        "derby": derby(),
        "totals": {
            "named_lanes": len(lanes),
            "named_session_records": named,
            "session_records_on_day": allrec,
            "subagents": subs_total,
            "commits": c_total,
            "recorded_seconds": sum(r["seconds"] for r in rec),
            "recorded_sessions": len(rec),
        },
    }
    sources = {
        "swimlane": "Full site outread/catalog.json: sessions with an official name, 2 Nov Prague time; a lane is one name, restarts merged when under 5 minutes apart",
        "subagents_per_hour": "Full site outread/catalog.json: each subagent's start, 2 Nov Prague time",
        "commits_per_hour": "git log of the repo, author date, 2 Nov Prague time",
        "commits_by_folder": "git log subjects: the [folder] prefix",
        "derby": "git log commits (author time, Prague) matched by [prefix] to roster names (see data.derby.mapping); presence from Full site outread/catalog.json session records, split at the 13:20:55 kill",
        "recording": "OBS/Processed/S*/session.json: start of the first span and elapsed_seconds",
    }
    j = json.load(open(OUT, encoding="utf-8")) if os.path.exists(OUT) else {}
    j["data"] = data
    j["sources"] = sources
    json.dump(j, open(OUT, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print(json.dumps(data["totals"]))


if __name__ == "__main__":
    main()
