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
        "recording": "OBS/Processed/S*/session.json: start of the first span and elapsed_seconds",
    }
    j = json.load(open(OUT, encoding="utf-8")) if os.path.exists(OUT) else {}
    j["data"] = data
    j["sources"] = sources
    json.dump(j, open(OUT, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print(json.dumps(data["totals"]))


if __name__ == "__main__":
    main()
