"""Read Alex's edits back from a saved review artifact into website/content/stakeholders.json.

  1. Artifact tool, action "read", url=<the artifact>. It saves the full HTML locally and names the file.
  2. python apply_review_edits.py <saved.html> [<saved2.html> ...]           # dry run: prints the changes
     python apply_review_edits.py <saved.html> ... --write                   # applies them

The page's state is the JSON in <script id="rv-state">: `slug`, `saved_at`, `saves`, and per field
`original` (the text the artifact was built with) and `fields` (the text now). Keys are paths inside
that slug's object in pages[]: "note", "ask.heading", "demos.2.why", "landing.concerns.1.lead",
"landing.reading_list.0.title", ... Indexes are zero-based. "landing.greeting#0" and "#1" are the
greeting's headline and lead, joined with one space. "sources" sets the page's own sources line.

Only fields Alex changed are applied. A field whose JSON text no longer matches the artifact's
original (the data moved on since the build) is reported and skipped unless --force.
"""
import json
import re
import sys
from pathlib import Path

DATA = Path(r"C:\Users\alder\Desktop\Hire me hackaton\website\content\stakeholders.json")


def state_of(html: str) -> dict:
    m = re.search(r'<script type="application/json" id="rv-state">(.*?)</script>', html, re.S)
    if not m:
        raise SystemExit("no rv-state block: not a review artifact")
    return json.loads(m.group(1))


def get(obj, path):
    for part in path.split("."):
        obj = obj[int(part)] if isinstance(obj, list) else obj.get(part)
        if obj is None:
            return None
    return obj


def put(obj, path, value):
    parts = path.split(".")
    for part in parts[:-1]:
        obj = obj[int(part)] if isinstance(obj, list) else obj[part]
    last = parts[-1]
    if isinstance(obj, list):
        obj[int(last)] = value
    else:
        obj[last] = value


def changes(st: dict) -> dict:
    """{json path: (original, new)} for every field Alex changed, greeting parts joined."""
    out, orig, cur = {}, st["original"], st["fields"]
    parts = sorted(k for k in orig if "#" in k)
    for base in {k.split("#")[0] for k in parts}:
        keys = sorted((k for k in parts if k.startswith(base + "#")), key=lambda k: int(k.split("#")[1]))
        o = " ".join(orig[k] for k in keys)
        n = " ".join(cur[k].strip() for k in keys if cur[k].strip())
        if n != o:
            out[base] = (o, n)
    for k in orig:
        if "#" not in k and cur.get(k) != orig[k]:
            out[k] = (orig[k], cur[k])
    return out


def main():
    files = [a for a in sys.argv[1:] if not a.startswith("--")]
    write, force = "--write" in sys.argv, "--force" in sys.argv
    data = json.loads(DATA.read_text(encoding="utf-8"))
    applied = 0
    for f in files:
        st = state_of(Path(f).read_text(encoding="utf-8"))
        page = next(p for p in data["pages"] if p["slug"] == st["slug"])
        ch = changes(st)
        print(f"{st['slug']} ({st.get('title')}): saved {st.get('saved_at') or 'never'}, {len(ch)} changed field(s)")
        for path, (o, n) in ch.items():
            now = get(page, path)
            if path == "sources" and now is None:
                now = data["notice"]["sources"]
            if now != o and not force:
                print(f"  SKIP {path}: JSON moved on since the build\n    json: {now!r}\n    alex: {n!r}")
                continue
            print(f"  {path}\n    was: {o!r}\n    now: {n!r}")
            put(page, path, n)
            applied += 1
    if write and applied:
        DATA.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"written: {applied} field(s)")
    elif applied:
        print("dry run: add --write to apply")


if __name__ == "__main__":
    main()
