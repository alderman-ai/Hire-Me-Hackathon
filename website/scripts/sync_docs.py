"""Copy the charter and the meta specs into the site, with private material redacted.

    python scripts\\sync_docs.py

Reads the project's own files (never edits them) and writes content/docs/<slug>.md plus
content/docs/index.json. Each doc gets its redactions, then a deny-list check: if any
deny-listed term survives (because a source was reworded), nothing is written and the
script exits 1, so a changed source can't leak through. Run it, check, then deploy.
"""
import json
import re
import sys
from datetime import datetime
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
ROOT = SITE.parent
OUT = SITE / "content" / "docs"

DOCS = [
    {"slug": "charter", "source": "CHARTER.md", "label": "Project charter",
     "blurb": "Why the project exists, the 13 deliverables, and the rules every agent follows. Start here."},
    {"slug": "s0-bootstrap", "source": "bootstrap/SPEC.md", "label": "S0 Bootstrap spec",
     "blurb": "Sets up a working folder, instructions and a background session for every piece of work."},
    {"slug": "s1-research", "source": "research/SPEC.md", "label": "S1 Research spec",
     "blurb": "How the agents decide with Alex what gets researched, and how deep."},
    {"slug": "s2-orchestrator", "source": "orchestration/SPEC.md", "label": "S2 Project orchestrator spec",
     "blurb": "Keeps the plan consistent as deliverables are added or changed."},
]

# The charter's risk rule: keep the Apify proposal and Alex's own GetSales outbound off
# screen. Also no names of people at the company, and nothing about who the live run targets.
REDACTIONS = [
    (" (the one exception is the D3 live run on six stakeholders)", ""),
    (" Live run: the six stakeholders from D2 go through the operator's own sender profile.", ""),
    (", run live on the six stakeholders", ""),
    ("Screen care around the recent proposal", "Screen care"),
    ("keep the Apify proposal and the operator's own GetSales outbound off screen.", "keep private material off screen."),
    ("Never open the Apify proposal or Alex's own GetSales outbound.", "Never open private material."),
    # DoD-13 and DoD-22, added to the charter by S2's change C03 (2 Nov, 14:25).
    (" on the six stakeholders through the operator's own sender profile", ""),
    ("secrets, the Apify proposal or the operator's own GetSales outbound", "secrets or private material"),
]
REDACT_LINES = [
    re.compile(r"^.*\bIvana\b.*\n?", re.MULTILINE),
    # Change-log and decision table rows about the risk rule itself (S2's C04/C05, 16:3x).
    re.compile(r"^\|.*\b(?:proposal|own GetSales outbound)\b.*\n?", re.MULTILINE | re.IGNORECASE),
]
DENY = ["proposal", "ivana", "sender profile", "own getsales outbound", "live run on"]


def redact(text: str) -> str:
    for old, new in REDACTIONS:
        text = text.replace(old, new)
    for pattern in REDACT_LINES:
        text = pattern.sub("", text)
    return text


def title_of(text: str, fallback: str) -> str:
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return fallback


def main() -> int:
    out, problems = {}, []
    for doc in DOCS:
        source = ROOT / doc["source"]
        text = redact(source.read_text(encoding="utf-8"))
        lower = text.lower()
        for term in DENY:
            for m in re.finditer(re.escape(term), lower):
                line = text[: m.start()].count("\n") + 1
                problems.append(f"{doc['source']}:{line}: '{term}' survived redaction")
        out[doc["slug"]] = (doc, text)
    if problems:
        print("Not written. Add a redaction for each of these, then rerun:")
        print("\n".join(problems))
        return 1
    OUT.mkdir(parents=True, exist_ok=True)
    index = []
    for slug, (doc, text) in out.items():
        (OUT / f"{slug}.md").write_text(text, encoding="utf-8")
        index.append({"slug": slug, "label": doc["label"], "title": title_of(text, doc["label"]),
                      "blurb": doc["blurb"], "source": doc["source"]})
    synced = datetime.now().astimezone().strftime("%H:%M")
    (OUT / "index.json").write_text(json.dumps({"synced": synced, "docs": index}, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(index)} docs to {OUT} at {synced}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
