"""Write grading/top.json for Notion: every Yes, then Maybes by the index's score, up to 30.

If Alex gave more than 30 Yes, every Yes goes (orch-alex-prep's call). Ties among Maybes
break on grading order. Run: python -I legibility\\grading\\make_top.py
"""
import json
import sys

sys.path.insert(0, str(__import__('pathlib').Path(__file__).resolve().parent))
from grades_lib import HERE, effective_grades, load_moments

TOP_N = 30


def yt_url(m: dict) -> str | None:
    vid = m.get("youtube_id")
    if not vid:
        return None
    start = m.get("yt_start", m.get("start", 0))
    return f"https://www.youtube.com/watch?v={vid}&t={int(start)}s"


def main() -> None:
    moments = load_moments()
    grades = effective_grades()
    if not grades:
        sys.exit("No grades yet in grades.jsonl")
    order = {m["id"]: i for i, m in enumerate(moments)}
    yes = [m for m in moments if grades.get(m["id"], {}).get("grade") == "Y"]
    maybe = sorted(
        (m for m in moments if grades.get(m["id"], {}).get("grade") == "M"),
        key=lambda m: (-int(m.get("score", 0)), order[m["id"]]),
    )
    picked = yes + maybe[: max(0, TOP_N - len(yes))]
    rows = []
    for m in picked:
        g = grades[m["id"]]
        rows.append({
            "clip_id": m["id"],
            "session": m["session"],
            "prague": m["prague"],
            "range": m["range"],
            "class": m["class"],
            "use": m["use"],
            "cam": m["cam"],
            "ai_score": m.get("score"),
            "grade": g["grade"],
            "note": g.get("note", ""),
            "youtube_url": yt_url(m),
        })
    out = HERE / "top.json"
    out.write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    counts = {k: sum(1 for g in grades.values() if g["grade"] == k) for k in "YMN"}
    print(f"graded {len(grades)} of {len(moments)}: {counts}; top.json has {len(rows)} rows "
          f"({len(yes)} Yes, {len(rows) - len(yes)} Maybe) -> {out}")


if __name__ == "__main__":
    main()
