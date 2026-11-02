"""Fetch every page of a local build and save what a visitor reads, for publish-leak-scan (DoD-22).

Usage: python scripts/check/render_pages.py http://localhost:3101 <outdir>
Writes <outdir>/<route>.txt (visible text, alt text and link targets) and prints each route's status.
Then: python -I ..\\blog-pipeline\\scripts\\scan.py <outdir>
"""

import html
import json
import re
import sys
import urllib.request
from pathlib import Path

SITE = Path(__file__).resolve().parents[2]


def routes() -> list[str]:
    out = ["/", "/for", "/skills", "/videos", "/about", "/demos", "/d1", "/d2", "/log", "/privacy", "/docs/charter"]
    stake = json.loads((SITE / "content" / "stakeholders.json").read_text(encoding="utf-8"))
    out += [f"/for/{p['slug']}" for p in stake["pages"]]
    for md in sorted((SITE / "content" / "demos").glob("*.md")):
        head = md.read_text(encoding="utf-8").split("\n---", 1)[0]
        slug = re.search(r'^slug:\s*"?([^"\n]+)"?', head, re.M)
        status = re.search(r'^status:\s*"?([^"\n]+)"?', head, re.M)
        if slug and status and status.group(1) in ("published", "draft"):
            out.append(f"/demos/{slug.group(1)}")
    return out


def visible(page: str) -> str:
    page = re.sub(r"(?is)<(script|style|noscript)\b.*?</\1>", " ", page)
    alts = re.findall(r'(?i)\balt="([^"]+)"', page)
    hrefs = re.findall(r'(?i)\bhref="([^"#][^"]*)"', page)
    text = re.sub(r"(?s)<[^>]+>", "\n", page)
    text = html.unescape(re.sub(r"\n\s*\n+", "\n", text))
    return text + "\n\n[alt]\n" + "\n".join(html.unescape(a) for a in alts) + "\n\n[links]\n" + "\n".join(sorted(set(hrefs)))


def main() -> None:
    base, out = sys.argv[1].rstrip("/"), Path(sys.argv[2])
    out.mkdir(parents=True, exist_ok=True)
    for r in routes():
        try:
            with urllib.request.urlopen(base + r, timeout=120) as res:
                body = res.read().decode("utf-8", "replace")
                code = res.status
        except urllib.error.HTTPError as e:
            body, code = "", e.code
        name = (r.strip("/") or "home").replace("/", "__")
        (out / f"{name}.txt").write_text(visible(body) if body else "", encoding="utf-8")
        print(code, r)


if __name__ == "__main__":
    main()
