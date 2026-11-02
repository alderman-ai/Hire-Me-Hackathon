"""Build the grading set: every clip-index moment as one low-res local clip.

Usage (from anywhere):
    python -I legibility\\tools\\cut_grading.py [--moments-only] [--workers 4] [--only ID ...]

1. Parses legibility\\clip-index.md (S01 to S11) and legibility\\local\\clip-index\\S12.md
   into legibility\\grading\\moments.json, in grading order: every webcam moment in index
   order, then every screen moment in index order. Written before any video is cut.
2. Cuts every moment to legibility\\grading\\clips\\<id>.mp4 (git-ignored): exactly the
   index range, no padding, 480 px high, H.264 CRF 30 + AAC 64 kbps mono, faststart.
   Webcam moments come from the webcam chunks, screen moments from the screen recording.
   A clip whose file already exists and is non-empty is skipped, so it can be rerun.

The screen-to-wall mapping and the webcam chunk lookup are cut_clip.py's own functions.

yt_start: the site's webcam videos are the session's webcam chunks joined end to end,
starting at the first chunk (website\\scripts\\upload_webcam.py). So a screen second maps
to wall time (clock_map), then to the chunk holding it, then to that chunk's place in
the join. The first chunk starts 2.3 to 3.4 s after the screen recording.
"""
import argparse
import json
import re
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

TOOLS = Path(__file__).resolve().parent
sys.path.insert(0, str(TOOLS))
import cut_clip  # noqa: E402

LEG = TOOLS.parent
ROOT = LEG.parent
INDEX = LEG / "clip-index.md"
S12_INDEX = LEG / "local" / "clip-index" / "S12.md"
VIDEOS = ROOT / "website" / "content" / "videos.json"
OUT = LEG / "grading"
CLIPS = OUT / "clips"
MOMENTS = OUT / "moments.json"
NO_WINDOW = 0x08000000  # never flash a console window: the screen is being recorded

COLUMNS = ["id", "class", "prague", "range", "length", "why", "score", "use", "cam", "status"]


def secs(stamp: str) -> float:
    total = 0.0
    for part in stamp.strip().split(":"):
        total = total * 60 + float(part)
    return total


# Rows the index asks to cut in a special way. Times are on the screen timeline.
SPECIAL = {
    # Cam reads "screen to 21:12, then webcam": the screen until 21:12, the webcam after.
    "S05-i": {"pieces": [("screen", "21:02", "21:12"), ("webcam", "21:12", "22:02")],
              "note": "screen 21:02 to 21:12, then webcam to 22:02, as the Cam column says"},
    # S12.md section 4 keeps 42:47 to 43:03 out (a source file tied to a private
    # application); the row's 42 s length is the range minus that span.
    "S12-r": {"pieces": [("webcam", "42:19", "42:47"), ("webcam", "43:03", "43:17")],
              "note": "jump cut: 42:47 to 43:03 left out (S12.md section 4), 42 s"},
    # The row's own blur instructions (browser history, his LinkedIn feed, his saved lists).
    "S09-h2": {"blur": [("21:38", "21:48"), ("21:51", "21:55")],
               "note": "whole frame blurred 21:38 to 21:48 and 21:51 to 21:55, as the row says"},
    # "Crop the browser tabs: private details": the tab strip is blurred instead of cropped.
    # The tabs (inbox, an email address) and the bookmarks bar fill the top 14% of the frame.
    "S03-l": {"blur_top": 0.14,
              "note": "browser tabs and bookmarks bar (top 14% of the frame) blurred, as the row says"},
}


def parse_rows(text: str, default_session: str | None) -> list[dict]:
    rows, session, yt = [], default_session, None
    for line in text.splitlines():
        if line.startswith("## "):
            m = re.match(r"## (S\d\d) ·", line)
            if m:
                session = m.group(1)
                y = re.search(r"on YouTube whole \(([^)]+)\)", line)
                yt = y.group(1) if y else None
            elif default_session is None:
                session = None
            continue
        if session is None or not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if cells[0] in ("Id", "") or set(cells[0]) <= set("- "):
            continue
        if len(cells) != len(COLUMNS):
            sys.exit(f"{session}: a row has {len(cells)} cells, not {len(COLUMNS)}: {line[:80]}")
        row = dict(zip(COLUMNS, cells))
        row["session"] = session
        row["heading_yt"] = yt
        rows.append(row)
    return rows


def yt_seconds(manifest: dict, t: float) -> float:
    """A screen-timeline second, as a second into the session's joined webcam video."""
    wall = wall_of(manifest, t)
    before = 0.0
    for chunk in manifest["webcam"]:
        c0 = chunk["wall_start"]
        if wall < c0 + chunk["seconds"]:
            return round(max(0.0, before + (wall - c0)), 1)
        before += chunk["seconds"]
    return round(before, 1)


def clamp_into_spans(manifest: dict, a: float, b: float) -> list[tuple[float, float]]:
    """The parts of [a, b] that lie inside the clock_map's spans (pauses and gaps dropped)."""
    parts = []
    for span in manifest["clock_map"]:
        sa, sb = max(a, span["video_start"]), min(b, span["video_end"])
        if sb - sa > 0.05:
            parts.append((sa, sb))
    return parts


def wall_of(manifest: dict, t: float) -> float:
    spans = manifest["clock_map"]
    nearest = min(spans, key=lambda s: 0 if s["video_start"] <= t <= s["video_end"]
                  else min(abs(t - s["video_start"]), abs(t - s["video_end"])))
    t = min(max(t, nearest["video_start"]), nearest["video_end"])
    return cut_clip.screen_to_wall(manifest, t)


def lenient_webcam_pieces(manifest: dict, wall_a: float, wall_b: float) -> list:
    try:
        return cut_clip.webcam_pieces(manifest, wall_a, wall_b)
    except SystemExit:  # webcam doesn't cover all of it: keep what it covers
        folder = Path(manifest["webcam_folder"])
        out = []
        for chunk in manifest["webcam"]:
            c0, c1 = chunk["wall_start"], chunk["wall_start"] + chunk["seconds"]
            x, y = max(wall_a, c0), min(wall_b, c1)
            if y - x > 0.05:
                out.append((folder / chunk["name"], x - c0, y - x))
        return out


def build_moments() -> list[dict]:
    videos = json.loads(VIDEOS.read_text(encoding="utf-8"))
    rows = parse_rows(INDEX.read_text(encoding="utf-8"), None)
    s12 = S12_INDEX.read_text(encoding="utf-8")
    s12 = s12[s12.index("## 3. Clip index rows"):]
    s12 = s12[:s12.index("\n## 4.")] if "\n## 4." in s12 else s12
    rows += parse_rows(s12, "S12")

    manifests = {}
    moments = []
    for r in rows:
        sid = r["session"]
        if sid not in manifests:
            manifests[sid] = cut_clip.load_session(sid)[1]
        m = re.match(r"from ([\d:]+) to ([\d:]+)$", r["range"])
        if not m:
            sys.exit(f"{r['id']}: can't read the range {r['range']!r}")
        start, end = secs(m.group(1)), secs(m.group(2))
        group = "screen" if r["cam"].lower().startswith("screen") else "webcam"
        yt = r["heading_yt"] or videos.get(sid)
        spec = SPECIAL.get(r["id"], {})
        if "pieces" in spec:
            clip_seconds = sum(secs(b) - secs(a) for _, a, b in spec["pieces"])
        else:
            clip_seconds = end - start
        mo = {
            "id": r["id"], "session": sid, "prague": r["prague"], "range": r["range"],
            "start": start, "end": end, "length": r["length"], "class": r["class"],
            "why": r["why"], "score": int(r["score"]), "use": r["use"], "cam": r["cam"],
            "group": group, "status": r["status"], "youtube_id": yt,
            "clip": f"clips/{r['id']}.mp4", "clip_seconds": round(clip_seconds, 1),
        }
        if yt:
            mo["yt_start"] = yt_seconds(manifests[sid], start)
            mo["yt_end"] = yt_seconds(manifests[sid], end)
        if spec:
            mo["cut_note"] = spec["note"]
        moments.append(mo)

    ordered = [m for m in moments if m["group"] == "webcam"] + [m for m in moments if m["group"] == "screen"]
    ids = [m["id"] for m in ordered]
    if len(set(ids)) != len(ids):
        sys.exit("duplicate ids: " + ", ".join(sorted({i for i in ids if ids.count(i) > 1})))
    for n, mo in enumerate(ordered, 1):
        mo = {"order": n, **mo}
        ordered[n - 1] = mo
    return ordered


def pieces_for(mo: dict, manifest: dict) -> tuple[list[tuple[Path, float, float]], list[str]]:
    """The (source, offset, seconds) inputs for a moment, and any clamp notes."""
    spec = SPECIAL.get(mo["id"], {})
    plan = [(k, secs(a), secs(b)) for k, a, b in spec["pieces"]] if "pieces" in spec \
        else [(mo["group"], mo["start"], mo["end"])]
    pieces, notes = [], []
    for kind, a, b in plan:
        if kind == "screen":
            b2 = min(b, manifest["video_seconds"])
            if b2 < b - 0.05:
                notes.append(f"end clamped {b:.1f} to {b2:.1f} (screen recording ends)")
            pieces.append((Path(manifest["video"]), a, b2 - a))
            continue
        parts = clamp_into_spans(manifest, a, b)
        kept = sum(y - x for x, y in parts)
        if kept < (b - a) - 0.05:
            notes.append(f"{a:.1f}-{b:.1f} clamped to spans {[(round(x, 1), round(y, 1)) for x, y in parts]}")
        for x, y in parts:
            wa, wb = cut_clip.screen_to_wall(manifest, x), cut_clip.screen_to_wall(manifest, y)
            got = lenient_webcam_pieces(manifest, wa, wb)
            covered = sum(g[2] for g in got)
            if covered < (y - x) - 0.5:
                notes.append(f"webcam covers only {covered:.1f} of {y - x:.1f} s at {x:.1f}")
            pieces += got
    return pieces, notes


def ffmpeg_cmd(pieces, out: Path, mo: dict) -> list[str]:
    spec = SPECIAL.get(mo["id"], {})
    cmd = ["ffmpeg", "-y", "-loglevel", "error"]
    for src, off, length in pieces:
        cmd += ["-ss", f"{off:.3f}", "-t", f"{length:.3f}", "-i", str(src)]
    chains = []
    for i in range(len(pieces)):
        chains.append(f"[{i}:v:0]scale=-2:480,setsar=1,fps=30,format=yuv420p[v{i}]")
        chains.append(f"[{i}:a:0]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=mono[a{i}]")
    joined = "".join(f"[v{i}][a{i}]" for i in range(len(pieces)))
    chains.append(f"{joined}concat=n={len(pieces)}:v=1:a=1[vc][ac]")
    last = "vc"
    if "blur" in spec:
        a = mo["start"]
        blurs = ",".join(f"boxblur=16:4:enable='between(t,{secs(f) - a:.2f},{secs(t) - a:.2f})'"
                         for f, t in spec["blur"])
        chains.append(f"[vc]{blurs}[vb]")
        last = "vb"
    if "blur_top" in spec:
        h = spec["blur_top"]
        chains.append(f"[{last}]split[base][strip];[strip]crop=iw:trunc(ih*{h}/2)*2:0:0,"
                      f"boxblur=12:3[sb];[base][sb]overlay=0:0[vt]")
        last = "vt"
    cmd += ["-filter_complex", ";".join(chains), "-map", f"[{last}]", "-map", "[ac]",
            "-c:v", "libx264", "-preset", "veryfast", "-crf", "30", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "64k", "-ac", "1", "-ar", "48000",
            "-movflags", "+faststart", "-f", "mp4", str(out)]
    return cmd


def cut_one(mo: dict, manifest: dict) -> dict:
    out = CLIPS / f"{mo['id']}.mp4"
    if out.exists() and out.stat().st_size > 0:
        return {"id": mo["id"], "ok": True, "skipped": True, "mb": out.stat().st_size / 1e6, "notes": []}
    t0 = time.time()
    try:
        pieces, notes = pieces_for(mo, manifest)
        if not pieces:
            return {"id": mo["id"], "ok": False, "error": "nothing to cut after clamping", "notes": notes}
        tmp = out.with_name(out.stem + ".part.mp4")
        r = subprocess.run(ffmpeg_cmd(pieces, tmp, mo), capture_output=True, text=True,
                           creationflags=NO_WINDOW)
        if r.returncode != 0 or not tmp.exists() or tmp.stat().st_size == 0:
            tmp.unlink(missing_ok=True)
            return {"id": mo["id"], "ok": False, "error": r.stderr.strip()[-600:], "notes": notes}
        tmp.replace(out)
        return {"id": mo["id"], "ok": True, "skipped": False, "mb": out.stat().st_size / 1e6,
                "seconds": time.time() - t0, "pieces": len(pieces), "notes": notes}
    except SystemExit as e:  # cut_clip's helpers exit on bad input
        return {"id": mo["id"], "ok": False, "error": str(e), "notes": []}


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--moments-only", action="store_true")
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("--only", nargs="*", default=[])
    args = ap.parse_args()

    moments = build_moments()
    OUT.mkdir(parents=True, exist_ok=True)
    MOMENTS.write_text(json.dumps(moments, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    web = sum(m["group"] == "webcam" for m in moments)
    print(f"moments.json: {len(moments)} moments ({web} webcam, {len(moments) - web} screen) -> {MOMENTS}",
          flush=True)
    if args.moments_only:
        return

    CLIPS.mkdir(parents=True, exist_ok=True)
    todo = [m for m in moments if not args.only or m["id"] in args.only]
    manifests = {sid: cut_clip.load_session(sid)[1] for sid in {m["session"] for m in todo}}
    results = []
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(cut_one, m, manifests[m["session"]]): m for m in todo}
        for f in as_completed(futures):
            r = f.result()
            m = futures[f]
            results.append(r)
            if r["ok"]:
                how = "skipped (exists)" if r.get("skipped") else f"cut in {r['seconds']:.0f} s, {r['pieces']} piece(s)"
                line = f"ok   {m['order']:>3} {r['id']:<8} {m['group']:<6} {r['mb']:.1f} MB, {how}"
            else:
                line = f"FAIL {m['order']:>3} {r['id']:<8} {m['group']:<6} {r['error']}"
            if r.get("notes"):
                line += "  [" + "; ".join(r["notes"]) + "]"
            print(line, flush=True)

    ok = [r for r in results if r["ok"]]
    failed = [r for r in results if not r["ok"]]
    total = sum((CLIPS / f"{m['id']}.mp4").stat().st_size for m in moments
                if (CLIPS / f"{m['id']}.mp4").exists()) / 1e6
    print(f"done: {len(ok)} ok, {len(failed)} failed, {total:.0f} MB in {CLIPS}")
    if failed:
        print("failed: " + ", ".join(r["id"] for r in failed))


if __name__ == "__main__":
    main()
