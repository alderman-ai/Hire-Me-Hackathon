"""Swap the alex-voice copy into the site by key (the best-of build, BUILD.md "Draft spans").

Reads orchestration/local/mockups/best/copy/*.json:
  <page>.json / shared.json   {KEY: text}   -> content/site-copy.json (only keys the site already has)
  notes.json                  {slug: note}  -> content/stakeholders.json, pages[slug].landing.note
spans.json (the drafts' own index) is skipped.

  python scripts/apply_copy.py            apply, and print what changed
  python scripts/apply_copy.py --check    print what would change, write nothing
"""

import json
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
COPY = SITE.parent / "orchestration" / "local" / "mockups" / "best" / "copy"
WORDS = SITE / "content" / "site-copy.json"
STAKE = SITE / "content" / "stakeholders.json"


def main() -> None:
    check = "--check" in sys.argv
    words = json.loads(WORDS.read_text(encoding="utf-8"))
    stake = json.loads(STAKE.read_text(encoding="utf-8"))
    changed, unknown, notes_changed = [], [], []

    for f in sorted(COPY.glob("*.json")):
        if f.name == "spans.json":
            continue
        data = json.loads(f.read_text(encoding="utf-8"))
        if f.name == "notes.json":
            pages = {p["slug"]: p for p in stake["pages"]}
            for slug, note in data.items():
                if slug not in pages:
                    unknown.append(f"notes.json: {slug}")
                    continue
                if not isinstance(note, str) or not note.strip():
                    unknown.append(f"notes.json: {slug} is empty")
                    continue
                landing = pages[slug].setdefault("landing", {})
                if landing.get("note") != note:
                    landing["note"] = note
                    notes_changed.append(slug)
            continue
        for key, text in data.items():
            if key not in words:
                unknown.append(f"{f.name}: {key}")
                continue
            if not isinstance(text, str) or not text.strip():
                unknown.append(f"{f.name}: {key} is empty")
                continue
            if words[key] != text:
                changed.append((key, words[key], text))
                words[key] = text

    for key, old, new in changed:
        print(f"{key}\n  - {old}\n  + {new}")
    print(f"{len(changed)} of {len(words)} keys changed; notes changed: {', '.join(notes_changed) or 'none'}")
    if unknown:
        print("NOT APPLIED (unknown key or empty):", *unknown, sep="\n  ")
    if check:
        return
    WORDS.write_text(json.dumps(words, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    STAKE.write_text(json.dumps(stake, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
