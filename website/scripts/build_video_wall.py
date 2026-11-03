"""Builds content/video-wall.json, the /videos wall (VERDICT.md 2.3 "/videos", build request W13).

Reads, never writes, three files outside website/:
  orchestration/local/library/video.json   the content library's videos (git-ignored, this machine)
  legibility/cards/cards.json              the side cards: exact start and end for each graded moment
  legibility/grading/grades.jsonl          Alex's grades from the booth; the latest grade per moment wins

Rows are the verdict's, in its order. A tile's grade is its moment's: a cut clip takes the grade of the
moment it was cut from. A No comes off, every Great from the booth joins its row (by its card's first
theme, or by AUTO_ROW for a moment with no card yet), held pieces never show, and graded tiles lead
each row (Great, then Yes, then ungraded). Rerun it after more grading:

  python scripts/build_video_wall.py            write content/video-wall.json and any missing stills
  python scripts/build_video_wall.py --check    print the rows, write nothing

Stills: a webcam frame from each moment's 480p grading cut (legibility/grading/clips, git-ignored),
written once to public/videos/<moment>.webp. Whole sessions use YouTube's own thumbnail.
Titles are the library's working titles; content/video-words.json overrides them, with summaries,
once alex-voice has written them (RULES.md rule 2).
"""

import json
import math
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
ROOT = SITE.parent
LIBRARY = ROOT / "orchestration" / "local" / "library" / "video.json"
CARDS = ROOT / "legibility" / "cards" / "cards.json"
GRADES = ROOT / "legibility" / "grading" / "grades.jsonl"
GRADING_CLIPS = ROOT / "legibility" / "grading" / "clips"
OUT = SITE / "content" / "video-wall.json"
STILLS = SITE / "public" / "videos"

# VERDICT.md 2.3, "/videos": each row's pieces in the verdict's order. Labels are working names.
ROWS = [
    ("ideas", "Ideas", [
        "m-s02-c", "m-s02-d", "m-s02-e", "m-s02-f", "m-s02-h", "m-s02-i", "m-s02-j",
        "clip-c-s10-gtm-engineers", "clip-c-s10-managed-service", "m-s03-i", "m-s12-o", "m-s11-b",
    ]),
    ("icps", "Filtering ICPs", [
        "clip-getsales-demo-1", "clip-getsales-demo-2", "clip-c-s10-36-workflows",
        "clip-c-s09-assistant-can-do", "m-s04-b",
    ]),
    ("how-i-work", "How I work", [
        "clip-day1-1-movie-actor", "clip-day1-5-bottleneck-human-v2", "clip-c-s10-halt",
        "clip-c-s08-same-thing-tomorrow", "clip-c-s07-done-means-additions", "clip-c-s04-legibility-born",
        "clip-c-s07-making-decisions",
    ]),
    ("the-day", "The day, honestly", [
        "clip-day1-3-closed-every-session", "clip-day1-2-too-much-at-once-v2",
        "clip-c-s04-worth-starting-over", "clip-c-s03-noon-low-leverage",
    ]),
]
SESSIONS_ROW = ("sessions", "Whole sessions", [f"session-s{n:02d}" for n in range(1, 13)])

# Held until Alex says yes (VERDICT.md 2.3; M8).
HELD = {"clip-c-s05-deletion-live", "clip-c-s07-answer-desk", "m-s12-f", "m-s12-j"}

# A Great with a card joins the row of its card's first theme.
THEME_ROW = {
    "gtm-thesis": "ideas", "personalisation-at-scale": "ideas", "ai-managed-service": "ideas",
    "hiring-pitch": "ideas", "ai-craft": "ideas", "voice-and-taste": "ideas",
    "icp-filtering": "icps", "research-method": "icps",
    "orchestration": "how-i-work", "human-bottleneck": "how-i-work", "reusable-skills": "how-i-work",
    "build-in-public": "how-i-work",
    "failure-and-recovery": "the-day", "personality": "the-day",
}
# A Great graded after the cards were written has no card (and no themes) yet: placed by its title.
AUTO_ROW = {
    "S10-i": "how-i-work",  # no copywriting or design without a skill
    "S10-k": "how-i-work",  # the public-information rule, live
    "S11-a": "ideas",       # context windows "like floppy disks"
    "S12-a": "the-day",     # "75% plus done": design for a tired brain
    "S12-d": "how-i-work",  # ordering this clip job, "as a GTM engineer"
    "S12-e": "the-day",     # "I'm a bit of a rambly talker"
    "S12-i": "how-i-work",  # a reading list per stakeholder
    "S12-j": "how-i-work",  # the day-one story ask
    "S12-m": "ideas",       # GTM engineering: AI without cutting half the staff
}
GRADE_ORDER = {"G": 0, "Y": 1, None: 2}


def seconds(length: str) -> int | None:
    """'75 s' -> 75, '9:01' -> 541, '38:43' -> 2323."""
    m = re.fullmatch(r"(\d+) s", length.strip())
    if m:
        return int(m.group(1))
    m = re.fullmatch(r"(?:(\d+):)?(\d+):(\d{2})", length.strip())
    if m:
        h, mi, s = (int(x) if x else 0 for x in m.groups())
        return h * 3600 + mi * 60 + s
    return None


def clock(total: int) -> str:
    h, rest = divmod(total, 3600)
    m, s = divmod(rest, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def title_of(item: dict) -> str:
    t = item["title"]
    t = re.sub(r"\s*\(S\d+, \d{1,2}:\d{2}\)$", "", t)  # clips: "the movie-actor rule (S03, 11:36)"
    t = re.sub(r",? Prague: whole session$", "", t)    # sessions: "S01, 10:25 Prague: whole session"
    return t[:1].upper() + t[1:]


def latest_grades() -> tuple[dict, str]:
    grades, last_ts = {}, ""
    rows = [json.loads(l) for l in GRADES.read_text(encoding="utf-8").splitlines() if l.strip()]
    for r in sorted(rows, key=lambda r: r["ts"]):
        if r.get("action") == "grade":
            grades[r["id"]] = r.get("grade")
            last_ts = max(last_ts, r["ts"])
    return grades, last_ts


def make_still(moment_id: str, length_s: float) -> str | None:
    """One webcam frame, 35% into the moment's grading cut, as a 640 x 360 WebP. Kept once made."""
    out = STILLS / f"{moment_id}.webp"
    if out.exists():
        return f"/videos/{out.name}"
    src = GRADING_CLIPS / f"{moment_id}.mp4"
    if not src.exists():
        return None
    STILLS.mkdir(parents=True, exist_ok=True)
    at = max(0.5, length_s * 0.35)
    cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-ss", f"{at:.2f}", "-i", str(src),
           "-frames:v", "1", "-vf", "scale=640:360:force_original_aspect_ratio=increase,crop=640:360",
           "-c:v", "libwebp", "-quality", "74", str(out)]
    subprocess.run(cmd, check=True)
    return f"/videos/{out.name}"


def main() -> None:
    check = "--check" in sys.argv
    lib = {x["id"]: x for x in json.loads(LIBRARY.read_text(encoding="utf-8"))}
    cards = {c["id"]: c for c in json.loads(CARDS.read_text(encoding="utf-8"))["cards"]}
    grades, grades_ts = latest_grades()
    webcam_ids = json.loads((SITE / "content" / "videos.json").read_text(encoding="utf-8"))

    # Which moment each cut clip came from (a moment's "clip" field names it).
    clip_moment = {f"clip-{x['clip']}": x["moment_id"] for x in lib.values() if x.get("clip") and x.get("moment_id")}
    moment_lib = {x["moment_id"]: x for x in lib.values() if x["kind"] == "moment" and x.get("moment_id")}
    clips_of = {}
    for cid, mid in clip_moment.items():
        clips_of.setdefault(mid, []).append(cid)

    dropped, missing = [], []

    def tile(lib_id: str) -> dict | None:
        x = lib.get(lib_id)
        if not x:
            missing.append(f"{lib_id} (not in the library)")
            return None
        if lib_id in HELD:
            return None
        if x["kind"] == "session-video":
            yt = webcam_ids.get(x["session"])
            if not yt:
                missing.append(f"{lib_id} (no webcam upload)")
                return None
            total = seconds(x["length"]) or 0
            return {"id": lib_id, "kind": "session", "title": title_of(x), "youtube_id": yt, "start": 0,
                    "length": clock(total), "session": x["session"], "prague": None, "grade": None, "still": None}

        mid = x.get("moment_id") if x["kind"] == "moment" else clip_moment.get(lib_id)
        grade = grades.get(mid) if mid else None
        if grade == "N":
            dropped.append(f"{lib_id} ({mid} graded No)")
            return None
        card = cards.get(mid) if mid else None
        m = moment_lib.get(mid, {}) if mid else {}
        if (x.get("cam") or m.get("cam")) not in (None, "webcam"):
            missing.append(f"{lib_id} (not webcam)")
            return None

        if x["kind"] == "clip":
            yt = x.get("youtube_id")
            if not yt:
                missing.append(f"{lib_id} (not cut or not uploaded yet)")
                return None
            length = seconds(x["length"]) or 0
            start, end = 0, None
        else:
            if card and card["video"].get("session_video"):
                v = card["video"]
                yt, start, end = v["session_video"], math.floor(v["session_video_from_s"]), math.floor(v["session_video_to_s"])
            else:
                hit = re.search(r"whole webcam on YouTube ([A-Za-z0-9_-]{11}) from (\d+) s", x["where"])
                if not hit:
                    missing.append(f"{lib_id} (no start in the library)")
                    return None
                yt, start = hit.group(1), int(hit.group(2))
                end = start + (seconds(x["length"]) or 0)
            length = end - start

        still = None
        if mid:
            m_len = seconds((m or x).get("length", "")) or length
            still = None if check else make_still(mid, m_len)
        out = {"id": lib_id, "kind": x["kind"], "title": title_of(x), "youtube_id": yt, "start": start,
               "length": clock(length), "session": x.get("session") or m.get("session"),
               "prague": x.get("prague") or m.get("prague"), "grade": grade, "moment": mid, "still": still}
        if end is not None:
            out["end"] = end
        return out

    rows = []
    placed = set()
    for key, label, ids in ROWS:
        tiles = [t for t in (tile(i) for i in ids) if t]
        rows.append({"key": key, "label": label, "tiles": tiles})
        placed.update(i for i in ids)
        placed.update(t.get("moment") for t in tiles if t.get("moment"))

    # Every other Great joins a row: its cut clip if it has one, else the moment from the session video.
    by_key = {r["key"]: r for r in rows}
    for mid, g in sorted(grades.items()):
        if g != "G" or mid in placed:
            continue
        if any(c in HELD for c in clips_of.get(mid, [])):
            continue  # its cut is held (the two screen clips)
        clip_ids = [c for c in clips_of.get(mid, []) if lib.get(c, {}).get("youtube_id")]
        lib_id = sorted(clip_ids)[-1] if clip_ids else moment_lib.get(mid, {}).get("id")
        if not lib_id or lib_id in HELD or lib_id in placed:
            continue
        card = cards.get(mid)
        row = THEME_ROW.get(card["themes"][0]) if card and card.get("themes") else AUTO_ROW.get(mid)
        if not row:
            missing.append(f"{mid} (a Great with no row: add it to AUTO_ROW)")
            continue
        t = tile(lib_id)
        if t:
            t["auto"] = True
            by_key[row]["tiles"].append(t)
            placed.update({lib_id, mid})

    # Graded tiles lead: Great, then Yes, then ungraded; the verdict's order, then the day's, within each.
    for r in rows:
        r["tiles"] = [t for _, t in sorted(
            enumerate(r["tiles"]),
            key=lambda p: (GRADE_ORDER.get(p[1]["grade"], 2), 1 if p[1].get("auto") else 0,
                           (p[1]["session"] or "", p[1]["prague"] or "") if p[1].get("auto") else ("", ""), p[0]))]
        for t in r["tiles"]:
            t.pop("auto", None)

    key, label, ids = SESSIONS_ROW
    rows.append({"key": key, "label": label, "tiles": [t for t in (tile(i) for i in ids) if t]})

    for r in rows:
        print(f"{r['label']} ({len(r['tiles'])}): " + ", ".join(f"{t['id']}[{t['grade'] or '-'}]" for t in r["tiles"]))
    print("off (No):", ", ".join(dropped) or "none")
    print("skipped:", ", ".join(missing) or "none")
    print("held:", ", ".join(sorted(HELD)))
    if check:
        return

    data = {
        "generated": datetime.now().astimezone().isoformat(timespec="minutes"),
        "grades_as_of": grades_ts[:16],
        "note": "Built by scripts/build_video_wall.py from the content library, the side cards and the booth's grades. Titles are working titles; content/video-words.json holds the words.",
        "rows": rows,
    }
    OUT.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {OUT.relative_to(SITE)}: {sum(len(r['tiles']) for r in rows)} tiles")


if __name__ == "__main__":
    main()
