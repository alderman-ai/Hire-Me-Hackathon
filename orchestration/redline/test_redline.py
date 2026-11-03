#!/usr/bin/env python3
"""Synthetic checks for redline_extract.py on S17 (which has no bananas or pauses).

1. Banana mode: inject banana and cucumber words (with whisper-style misspellings) into a
   copy of S17's transcript at known times, run the extractor, and check the pairing,
   the flags, the stripped text and that each anchor frame is the frame at banana + 1.0 s.
2. /pause: a copy of S17's manifest whose clock_map has a 60 s pause at 300 s; check no
   comment crosses the cut, no frame comes from the other side, and wall times shift.

Needs S17's video on D:. Writes only under orchestration\\local\\redline\\_test\\.
Run: python orchestration\\redline\\test_redline.py
"""
import copy
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "orchestration" / "redline" / "redline_extract.py"
SESSION = ROOT / "OBS" / "Processed" / "S17_2026-11-03_1007"
TEST = ROOT / "orchestration" / "local" / "redline" / "_test"
sys.path.insert(0, str(SCRIPT.parent))
import redline_extract as rx  # noqa: E402

# (time, spoken words). Times chosen around S17's real screen cuts: the usage page
# comes up at 221.87 s and goes at 233.77 s; ComfyUI scrolls around 258-264 s.
INJECT = [
    (220.90, ["banana"]),      # A: anchor 221.9 = usage page, +0.0 = ComfyUI
    (229.00, ["cucumber"]),    #    end of pair A
    (232.00, ["Bananas,"]),    # B: anchor 233.0 = usage, +2.0 = ComfyUI
    (262.50, ["Cucumber."]),   #    pre-cucumber frame 262.25, scrolled ComfyUI
    (300.00, ["banan"]),       # C: no cucumber before the next banana, 40 s long
    (340.00, ["Banana!"]),     # D: closed by a mangled cucumber
    (344.00, ["kukumber"]),
    (400.50, ["cu", "cumber"]),  # E: a cucumber with no banana (split in two by whisper)
]
failures = []
# A real word can straddle an injected marker or the synthetic cut by a fraction of a
# second ("looks" runs 400.49-400.77 across the cucumber at 400.5), so boundaries allow it.
SLACK = 0.3


def check(name, ok, detail=""):
    print(f"{'PASS' if ok else 'FAIL'}  {name}" + (f"  ({detail})" if detail else ""))
    if not ok:
        failures.append(name)


def run(*args):
    r = subprocess.run([sys.executable, str(SCRIPT), *args], capture_output=True, text=True)
    print(r.stdout.strip())
    if r.returncode:
        print(r.stderr)
        sys.exit("extractor failed")


def thumb_of(path=None, video=None, t=None):
    src = ["-ss", f"{t:.3f}", "-i", str(video)] if video else ["-i", str(path)]
    return subprocess.run(
        ["ffmpeg", "-v", "error", *src, "-frames:v", "1", "-vf",
         f"scale={rx.THUMB_W}:{rx.THUMB_H},format=gray", "-f", "rawvideo", "-"],
        capture_output=True).stdout


def banana_test():
    print("\n== banana / cucumber ==")
    manifest = json.loads((SESSION / "manifest.json").read_text(encoding="utf-8"))
    lines = json.loads((SESSION / "transcript" / "S17.json").read_text(encoding="utf-8"))
    lines = copy.deepcopy(lines)
    for t, spoken in INJECT:
        words = [{"word": w, "start": round(t + 0.2 * k, 2), "end": round(t + 0.2 * k + 0.18, 2)}
                 for k, w in enumerate(spoken)]
        lines.append({"start": words[0]["start"], "end": words[-1]["end"],
                      "text": " ".join(spoken), "words": words})
    TEST.mkdir(parents=True, exist_ok=True)
    fake = TEST / "S17_markers.json"
    fake.write_text(json.dumps(lines), encoding="utf-8")
    out = TEST / "S17_markers"
    run("--session", str(SESSION), "--transcript", str(fake), "--out", str(out))
    cs = json.loads((out / "comments.json").read_text(encoding="utf-8"))
    meta = json.loads((out / "meta.json").read_text(encoding="utf-8"))
    by_banana = {c["banana_at"]: c for c in cs if "banana_at" in c}

    check("banana mode switched on", meta["mode"] == "banana")
    check("all four bananas start a comment", sorted(by_banana) == [220.9, 232.0, 300.0, 340.0],
          sorted(by_banana))
    kinds = {b: by_banana[b]["kind"] for b in by_banana}
    check("A, B and D are pairs, C has no cucumber",
          kinds == {220.9: "pair", 232.0: "pair", 300.0: "no_cucumber", 340.0: "pair"}, kinds)
    check("pairs end at their cucumber",
          [by_banana[b].get("cucumber_at") for b in (220.9, 232.0, 340.0)] == [229.0, 262.5, 344.0])
    a = by_banana[220.9]
    check("A's text runs from the word after the banana to the cucumber",
          a["text"] == "challenge is managing usage right i've got 80 usage here and", a["text"])
    marker_left = [c["id"] for c in cs for w in c["text"].split() if rx.match(rx.norm(w))[0]]
    check("no banana or cucumber left in any text", not marker_left, marker_left)

    video = Path(manifest["video"])
    for b, c in sorted(by_banana.items()):
        anchor = c.get("anchor_frame")
        times = dict(zip(c["frames"], c["frame_times"]))
        check(f"banana {b}: anchor frame is at +1.0 s", anchor and times[anchor] == round(b + 1, 2),
              f"{times.get(anchor)}")
        d = rx.change(thumb_of(path=out / anchor), thumb_of(video=video, t=b + 1.0))
        check(f"banana {b}: anchor image matches the video at +1.0 s", d < 0.002, f"change {d:.4f}")
    a_frames = dict(zip(a["frame_times"], a["frames"]))
    check("A keeps +0.0 (ComfyUI) beside the anchor (usage page)", 220.9 in a_frames and
          rx.change(thumb_of(path=out / a_frames[220.9]), thumb_of(path=out / a["anchor_frame"])) > 0.3)
    bt = by_banana[232.0]["frame_times"]
    check("B keeps +2.0 (back on ComfyUI) and the frame just before its cucumber",
          234.0 in bt and 262.25 in bt, bt)
    c = by_banana[300.0]
    check("C (no cucumber, 40 s) stops within 20 s of its banana", c["end"] - 300.0 <= 20.5,
          f"ends {c['end']}")
    check("C's remainder becomes outside_pair comments",
          any(x.get("outside_pair") and 300 < x["start"] < 340 for x in cs))
    orphan = [x for x in cs if x["kind"] == "no_banana"]
    check("E: one no_banana comment, ending at the cucumber",
          len(orphan) == 1 and orphan[0]["cucumber_at"] == 400.5 and orphan[0]["end"] <= 400.5 + SLACK,
          orphan and orphan[0]["text"][-60:])
    check("E's comment starts after the previous cucumber", orphan and orphan[0]["start"] > 344.0)
    check("talk before the first banana (220 s) gets outside_pair comments",
          any(x.get("outside_pair") and x["end"] < 220.9 for x in cs))
    check("talk after the last cucumber gets outside_pair comments",
          any(x.get("outside_pair") and x["start"] > 400.5 for x in cs))
    check("the 3 s between A's cucumber and B's banana is listed as skipped",
          any(229 <= s["start"] and s["end"] <= 232 + SLACK for s in meta["skipped_outside"]),
          meta["skipped_outside"])


def pause_test():
    print("\n== /pause cut ==")
    manifest = json.loads((SESSION / "manifest.json").read_text(encoding="utf-8"))
    e = manifest["clock_map"][0]
    cut, pause = 300.0, 60.0
    manifest["clock_map"] = [
        {**e, "video_end": cut, "wall_end": e["wall_start"] + cut, "ended_by": "pause"},
        {**e, "video_start": cut, "wall_start": e["wall_start"] + cut + pause,
         "wall_end": e["wall_end"] + pause},
    ]
    manifest["transcript"]["json"] = str(SESSION / "transcript" / "S17.json")
    folder = TEST / "S17_paused_session"
    folder.mkdir(parents=True, exist_ok=True)
    (folder / "manifest.json").write_text(json.dumps(manifest, indent=1), encoding="utf-8")
    out = TEST / "S17_paused"
    run("--session", str(folder), "--out", str(out))
    cs = json.loads((out / "comments.json").read_text(encoding="utf-8"))
    crossing = [c["id"] for c in cs if c["start"] < cut < c["end"] - SLACK]
    check("no comment crosses the cut", not crossing, crossing)
    wrong_side = [c["id"] for c in cs for t in c["frame_times"] if (c["start"] < cut) != (t < cut)]
    check("no frame from the other side of the cut", not wrong_side, wrong_side)
    after = next(c for c in cs if c["start"] > cut)
    expect = rx.datetime.fromtimestamp(e["wall_start"] + after["start"] + pause).astimezone()
    check("wall time after the cut includes the pause",
          after["wall_start"] == expect.isoformat(timespec="seconds"), after["wall_start"])


if __name__ == "__main__":
    banana_test()
    pause_test()
    print(f"\n{'All checks passed' if not failures else f'{len(failures)} failed'}")
    sys.exit(1 if failures else 0)
