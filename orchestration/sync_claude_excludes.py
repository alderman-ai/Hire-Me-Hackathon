"""Give every working folder its own CLAUDE.md and nobody else's.

Run from anywhere: python orchestration\\sync_claude_excludes.py [--check]

A working folder is a top-level folder of the repo that holds a CLAUDE.md.
Each one gets a `.claude\\settings.json` whose `claudeMdExcludes` lists the
root CLAUDE.md and every sister folder's CLAUDE.md and AGENTS.md. Its own
files, including any in its own subfolders, stay loaded. The root's settings
exclude every child with one pattern, so new children are covered there
automatically. Rerun this whenever a top-level folder is added or renamed.

A settings file without a `worktree` block gets the shared-tree one
(bgIsolation none, baseRef head). Other settings keys, and any exclude
pattern that isn't about this repo's folders, are kept as they are. --check reports what would change and writes
nothing.
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PREFIX = f"**/{ROOT.name}/"
ROOT_PATTERNS = [f"{PREFIX}*/**/CLAUDE.md", f"{PREFIX}*/**/AGENTS.md"]
# Every session works in the one shared tree on main (GIT.md).
WORKTREE = {"bgIsolation": "none", "baseRef": "head"}


def top_level_folders() -> list[Path]:
    return sorted(
        (p for p in ROOT.iterdir() if p.is_dir() and not p.name.startswith(".")),
        key=lambda p: p.name.lower(),
    )


def child_patterns(own: Path, folders: list[Path]) -> list[str]:
    patterns = [f"{PREFIX}CLAUDE.md"]
    for sister in folders:
        if sister != own:
            patterns.append(f"{PREFIX}{sister.name}/**/CLAUDE.md")
            patterns.append(f"{PREFIX}{sister.name}/**/AGENTS.md")
    return patterns


def update(settings_path: Path, generated: list[str], check: bool) -> str:
    data = {}
    if settings_path.exists():
        data = json.loads(settings_path.read_text(encoding="utf-8"))
    kept = [p for p in data.get("claudeMdExcludes", []) if not p.startswith(PREFIX)]
    new = generated + kept
    if data.get("claudeMdExcludes") == new and "worktree" in data:
        return "unchanged"
    data["claudeMdExcludes"] = new
    data.setdefault("worktree", dict(WORKTREE))
    if not check:
        settings_path.parent.mkdir(parents=True, exist_ok=True)
        settings_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8", newline="\n")
    return "would change" if check else "updated"


def main() -> int:
    check = "--check" in sys.argv[1:]
    folders = top_level_folders()
    working = [f for f in folders if (f / "CLAUDE.md").exists()]
    root_state = update(ROOT / ".claude" / "settings.json", ROOT_PATTERNS, check)
    print(f"{'(root)':<22} {root_state}")
    for folder in working:
        state = update(folder / ".claude" / "settings.json", child_patterns(folder, folders), check)
        print(f"{folder.name:<22} {state}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
