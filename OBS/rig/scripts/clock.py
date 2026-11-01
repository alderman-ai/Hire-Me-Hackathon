"""The three clocks (R20): video time, wall-clock time and hackathon time.

A session is a list of spans, each an unbroken stretch of recording. Pauses keep the
same OBS file running, while a crash starts a new one. Spans give wall-clock times,
and the real file lengths give video times, because a crash's logged end is only the
last watchdog check before it.
"""
import re
from datetime import datetime
from pathlib import Path

_STAMP = re.compile(r"(\d{4})-(\d{2})-(\d{2}) (\d{2})-(\d{2})-(\d{2})")


def file_start(path: Path) -> float:
    """OBS names each file with the local time it started."""
    y, mo, d, h, mi, s = (int(v) for v in _STAMP.search(path.name).groups())
    return datetime(y, mo, d, h, mi, s).timestamp()


def _runs(spans: list[dict]) -> list[list[dict]]:
    """Group spans by OBS output. Only a crash starts a new one."""
    runs, current = [], []
    for span in spans:
        current.append(span)
        if span["ended_by"] == "crash":
            runs.append(current)
            current = []
    if current:
        runs.append(current)
    return runs


def build_map(spans: list[dict], files: list[tuple[Path, float]]) -> list[dict]:
    """Return one entry per span: where it sits in the video and on the wall clock."""
    runs = _runs(spans)
    starts = [run[0]["start"] for run in runs]
    run_seconds = [0.0] * len(runs)
    for path, seconds in files:
        # OBS stamps a file a moment before it reports recording, hence the 3 s.
        index = max(
            (i for i, start in enumerate(starts) if start <= file_start(path) + 3),
            default=0,
        )
        run_seconds[index] += seconds

    entries, position = [], 0.0
    for run, total in zip(runs, run_seconds):
        used = 0.0
        for number, span in enumerate(run):
            if number < len(run) - 1:
                length = span["end"] - span["start"]
            else:
                length = max(total - used, 0.0)
            used += length
            entries.append({
                "video_start": round(position, 3),
                "video_end": round(position + length, 3),
                "wall_start": span["start"],
                "wall_end": span["start"] + length,
                "ended_by": span["ended_by"],
            })
            position += length
    return entries


def video_to_wall(entries: list[dict], video: float) -> float:
    for entry in entries:
        if video <= entry["video_end"]:
            return entry["wall_start"] + max(video - entry["video_start"], 0.0)
    return entries[-1]["wall_end"]


def wall_to_video(entries: list[dict], wall: float) -> float | None:
    """None if the moment falls in a pause or a crash gap."""
    for entry in entries:
        if entry["wall_start"] <= wall <= entry["wall_end"]:
            return entry["video_start"] + wall - entry["wall_start"]
    return None


def hackathon(wall: float, start: float) -> str:
    """H+hh:mm:ss from the start of S01."""
    total = max(int(wall - start), 0)
    return f"H+{total // 3600:02d}:{total % 3600 // 60:02d}:{total % 60:02d}"


def timecode(seconds: float, comma: bool = False) -> str:
    whole = int(seconds)
    text = f"{whole // 3600:02d}:{whole % 3600 // 60:02d}:{whole % 60:02d}"
    if comma:
        return f"{text},{int((seconds - whole) * 1000):03d}"
    return text
