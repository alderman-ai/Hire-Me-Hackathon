"""Shared helpers for the clip-grading tools: replay grades.jsonl and load moments.json.

grades.jsonl is append-only. Each line is either
  {"action": "grade", "id", "grade": "G"|"Y"|"M"|"N", "note", "watched", "speed", "ts"}
  {"action": "undo", "ts"}
An undo removes the most recent grade still standing. A later grade of the same id
replaces an earlier one.
"""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
MOMENTS = HERE / "moments.json"
GRADES = HERE / "grades.jsonl"


def load_moments(path: Path = MOMENTS) -> list[dict]:
    return json.loads(path.read_text(encoding="utf-8"))


def effective_grades(path: Path = GRADES) -> dict[str, dict]:
    stack: list[dict] = []
    if path.exists():
        for line in path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line:
                continue
            ev = json.loads(line)
            if ev.get("action") == "undo":
                if stack:
                    stack.pop()
            elif ev.get("action", "grade") == "grade" and ev.get("grade") in ("G", "Y", "M", "N"):
                stack.append(ev)
    out: dict[str, dict] = {}
    for ev in stack:
        out[ev["id"]] = ev
    return out
