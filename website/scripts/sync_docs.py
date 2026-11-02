"""Copy the charter and the meta specs into the site, refusing anything shaped like a secret.

    python scripts\\sync_docs.py

Reads the project's own files (never edits them) and writes content/docs/<slug>.md plus
content/docs/index.json. Each doc gets a secrets check: if anything shaped like a key or
token appears, nothing is written and the script exits 1 (it prints the file and line,
never the match). Run it, check, then deploy.
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

# Since Alex's reset rules (2 Nov, 17:00) the only hard exclusions are DoD-22's three:
# secrets, the Apify proposal, and his own GetSales outbound outside the demo folder.
# DoD-22 lets the charter and specs *name* them, and public facts (names of people at the
# company included) may be shown, so no wording is redacted any more. What the copies must
# never carry is a secret, or the text of the proposal or of his own outbound, which the
# specs don't hold. The check below stops the write if anything shaped like a secret appears.
DENY_PATTERNS = [
    re.compile(r"vercel_blob_rw_[A-Za-z0-9_]{8,}"),
    re.compile(r"\bsk-(?:ant-)?[A-Za-z0-9_-]{20,}"),
    re.compile(r"\bgh[pousr]_[A-Za-z0-9]{20,}"),
    re.compile(r"\bapify_api_[A-Za-z0-9]{10,}"),
    re.compile(r"\bAIza[0-9A-Za-z_-]{30,}"),
    re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),
    re.compile(r"(?i)\b(?:api[_-]?key|secret|token|password)\s*[=:]\s*['\"]?[A-Za-z0-9_\-]{16,}"),
]


def title_of(text: str, fallback: str) -> str:
    for line in text.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return fallback


def main() -> int:
    out, problems = {}, []
    for doc in DOCS:
        source = ROOT / doc["source"]
        text = source.read_text(encoding="utf-8")
        for i, pattern in enumerate(DENY_PATTERNS):
            for m in pattern.finditer(text):
                line = text[: m.start()].count("\n") + 1
                problems.append(f"{doc['source']}:{line}: something shaped like a secret (pattern {i})")
        out[doc["slug"]] = (doc, text)
    if problems:
        print("Not written. Remove the secret from each source, then rerun:")
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
