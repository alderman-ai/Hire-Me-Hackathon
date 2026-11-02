"""Seeded, stratified 30% hold-out of Alex's graded moments, written before any rubric exists.

Writes grading/split.json (committed), with the seed, the SHA-256 of grades.jsonl at split
time, the grade counts per side and the ids on each side. The rubric is induced from the
train side only; a judge that never saw his grades scores the hold-out.
Refuses to overwrite an existing split.json, so the split provably comes first.

Run: python -I legibility\\grading\\split.py [--seed 20261102]
"""
import argparse
import hashlib
import json
import random
import sys
from datetime import datetime

sys.path.insert(0, str(__import__('pathlib').Path(__file__).resolve().parent))
from grades_lib import GRADES, HERE, effective_grades, load_moments

HOLDOUT = 0.30


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--seed", type=int, default=20261102)
    args = ap.parse_args()
    out = HERE / "split.json"
    if out.exists():
        sys.exit(f"{out} already exists; the split is fixed. Delete it only to redo the whole demo.")
    moments = load_moments()
    grades = effective_grades()
    graded = [m["id"] for m in moments if m["id"] in grades]
    if len(graded) < len(moments):
        print(f"warning: {len(moments) - len(graded)} moments ungraded; they are left out of both sides")
    rng = random.Random(args.seed)
    train, holdout = [], []
    for g in "YMN":
        ids = [i for i in graded if grades[i]["grade"] == g]
        rng.shuffle(ids)
        k = round(len(ids) * HOLDOUT)
        holdout += sorted(ids[:k])
        train += sorted(ids[k:])
    digest = hashlib.sha256(GRADES.read_bytes()).hexdigest()
    count = lambda ids: {g: sum(1 for i in ids if grades[i]["grade"] == g) for g in "YMN"}
    doc = {
        "made": datetime.now().astimezone().isoformat(timespec="seconds"),
        "seed": args.seed,
        "holdout_share": HOLDOUT,
        "stratified_by": "Alex's grade (Y, M, N)",
        "grades_sha256": digest,
        "graded": len(graded),
        "train_counts": count(train),
        "holdout_counts": count(holdout),
        "train": train,
        "holdout": holdout,
    }
    out.write_text(json.dumps(doc, indent=2) + "\n", encoding="utf-8")
    print(f"split.json: train {len(train)} {doc['train_counts']}, hold-out {len(holdout)} {doc['holdout_counts']}")


if __name__ == "__main__":
    main()
