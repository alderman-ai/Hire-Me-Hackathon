"""Build one self-contained review page per stakeholder from the real dev render of /for/<slug>.

  python build_review.py            # fetch http://localhost:3100/for/<slug> for all six and build
  python build_review.py growth     # just one

Each output (review-<slug>.html) is the page's server-rendered HTML with its real CSS inlined,
images as data URIs (the portrait is public/people/<slug>.webp, exactly as live), fonts from
Google Fonts, scripts stripped. Editable text carries data-path="<JSON path inside that page's
object in content/stakeholders.json>"; a greeting split over two elements uses "#0"/"#1" parts.
The page saves itself through the artifact capability (rv-app.js); its state, with every field's
original and current text, is the JSON in <script id="rv-state">.
"""
import base64
import json
import re
import sys
import urllib.request
from pathlib import Path

from bs4 import BeautifulSoup, Comment, NavigableString

HERE = Path(__file__).resolve().parent
SITE = Path(r"C:\Users\alder\Desktop\Hire me hackaton\website")
PUBLIC = SITE / "public"
DEV = "http://localhost:3100"
LIVE = "https://hire-me-hackathon.vercel.app"
SLUGS = ["growth", "ceo", "cofounder-1", "cofounder-2", "delivery", "bi"]
FONTS = (
    "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Inter:wght@400;500"
    "&family=Outfit:wght@100..900&family=Plus+Jakarta+Sans:wght@600&display=swap"
)
MIME = {".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".jpg": "image/jpeg"}

_uri_cache: dict[str, str] = {}


def data_uri(path: Path) -> str:
    key = str(path)
    if key not in _uri_cache:
        b = path.read_bytes()
        _uri_cache[key] = f"data:{MIME[path.suffix]};base64,{base64.b64encode(b).decode()}"
    return _uri_cache[key]


def fetch(url: str) -> str:
    with urllib.request.urlopen(url, timeout=180) as r:
        return r.read().decode("utf-8")


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s.replace("\u00a0", " ")).strip()


# ---------- CSS ----------


def site_css(soup: BeautifulSoup) -> str:
    parts = []
    for link in soup.find_all("link", rel="stylesheet"):
        parts.append(fetch(DEV + link["href"]))
    css = "\n".join(parts)
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    # next/font faces point at /_next/static/media; Google Fonts serves the same families instead.
    css = re.sub(r"@font-face\s*\{[^}]*url\([^)]*\.\./media/[^}]*\}", "", css)
    # next/font puts the --font-* variables on <html> classes; here they go on :root.
    css = re.sub(r"\.[a-z_]+_[0-9a-f]{8}-module__[A-Za-z0-9_]+__variable\s*\{", ":root {", css)

    def inline(m):
        p = m.group(1)
        f = PUBLIC / p.lstrip("/")
        if not f.exists():
            raise SystemExit(f"css asset missing: {p}")
        return f'url("{data_uri(f)}")'

    css = re.sub(r'url\("?(/[^")]+)"?\)', inline, css)
    if "/_next/" in css or "../media" in css:
        raise SystemExit("css still references next assets")
    css = re.sub(r"\n\s*\n+", "\n", css)
    return css.strip()


# ---------- Markup ----------


def mark(el, path: str, expect: str | None, slug: str):
    if el is None:
        raise SystemExit(f"{slug}: no element for {path}")
    got = norm(el.get_text())
    if expect is not None and got != norm(expect):
        raise SystemExit(f"{slug}: {path} text mismatch\n  page: {got!r}\n  json: {expect!r}")
    el["data-path"] = path
    return got


def wrap_tail(p, soup, after_el=None, prefix: str | None = None):
    """Wrap the text in <p> that follows `after_el` (or the `prefix` text) in its own <span>."""
    nodes = list(p.children)
    if after_el is not None:
        i = nodes.index(after_el)
        rest = nodes[i + 1 :]
    else:
        rest = nodes
    text = "".join(str(n) if isinstance(n, NavigableString) else n.get_text() for n in rest)
    for n in rest:
        n.extract()
    if prefix is not None:
        assert text.startswith(prefix), (text, prefix)
        p.append(NavigableString(prefix))
        text = text[len(prefix) :]
    lead_space = ""
    if after_el is not None and text.startswith(" "):
        lead_space, text = " ", text[1:]
    if lead_space:
        p.append(NavigableString(lead_space))
    span = soup.new_tag("span")
    span.string = text
    p.append(span)
    return span


def build_markup(slug: str, html: str, page: dict, notice_sources: str):
    soup = BeautifulSoup(html, "html.parser")
    body = soup.body
    for t in body.find_all(["script", "template", "next-route-announcer", "nextjs-portal"]):
        t.decompose()
    for c in body.find_all(string=lambda x: isinstance(x, Comment)):
        c.extract()
    first = body.find("div", attrs={"hidden": True})
    if first is not None and not first.get_text(strip=True):
        first.decompose()
    # Live, the landing has no draft strip (it shows only once approved).
    for d in body.select(".sh-draft-strip, .sh-draft"):
        d.decompose()

    fields: dict[str, str] = {}
    land = page["landing"]

    # Greeting: "Hi Ivana." as the headline, the rest as the lead.
    h1 = body.select_one("#for-hello")
    lead = body.select_one(".for-land-lead")
    if lead is not None:
        fields["landing.greeting#0"] = mark(h1, "landing.greeting#0", None, slug)
        fields["landing.greeting#1"] = mark(lead, "landing.greeting#1", None, slug)
        if norm(fields["landing.greeting#0"] + " " + fields["landing.greeting#1"]) != norm(land["greeting"]):
            raise SystemExit(f"{slug}: greeting parts don't rebuild the greeting")
    else:
        fields["landing.greeting"] = mark(h1, "landing.greeting", land["greeting"], slug)

    # Concerns: question, bold lead, answer.
    items = body.select(".for-qa-item")
    if len(items) != len(land["concerns"]):
        raise SystemExit(f"{slug}: concern count")
    for i, (li, c) in enumerate(zip(items, land["concerns"])):
        fields[f"landing.concerns.{i}.q"] = mark(li.select_one(".for-qa-q"), f"landing.concerns.{i}.q", c["q"], slug)
        p = li.select_one(".for-qa-a")
        strong = p.select_one(".for-qa-lead")
        fields[f"landing.concerns.{i}.lead"] = mark(strong, f"landing.concerns.{i}.lead", c["lead"], slug)
        span = wrap_tail(p, soup, after_el=strong)
        fields[f"landing.concerns.{i}.a"] = mark(span, f"landing.concerns.{i}.a", c["a"], slug)

    # Reading list titles.
    rows = body.select(".for-path-item")
    if len(rows) != len(land["reading_list"]):
        raise SystemExit(f"{slug}: reading list count")
    for i, (li, x) in enumerate(zip(rows, land["reading_list"])):
        fields[f"landing.reading_list.{i}.title"] = mark(
            li.select_one(".for-path-title"), f"landing.reading_list.{i}.title", x["title"], slug
        )

    # Opening and why now (growth only).
    if "opening" in page:
        o = page["opening"]
        texts = body.select(".sh-opening-text")
        fields["opening.before"] = mark(texts[0], "opening.before", o["before"], slug)
        fields["opening.quote"] = mark(body.select_one(".sh-quote blockquote p"), "opening.quote", o["quote"], slug)
        fields["opening.quote_source"] = mark(body.select_one(".sh-quote figcaption"), "opening.quote_source", o["quote_source"], slug)
        fields["opening.after"] = mark(body.select_one(".sh-opening-text.is-after"), "opening.after", o["after"], slug)
    if "why_now" in page:
        w = page["why_now"]
        fields["why_now.heading"] = mark(body.select_one(".sh-why-h"), "why_now.heading", w["heading"], slug)
        fields["why_now.how"] = mark(body.select_one(".org-growth-how"), "why_now.how", w["how"], slug)
        src = body.select_one(".org-growth-src")
        span = wrap_tail(src, soup, prefix="Source: ")
        fields["why_now.source"] = mark(span, "why_now.source", w["source"], slug)

    # The note, the at-a-glance card and the ask.
    fields["note"] = mark(body.select_one(".sh-note"), "note", page["note"], slug)
    for row in body.select(".art-meta-row"):
        if norm(row.dt.get_text()) == "One ask":
            fields["ask.short"] = mark(row.dd, "ask.short", page["ask"]["short"], slug)
    sources = page.get("sources", notice_sources)
    fields["sources"] = mark(body.select_one(".art-meta-note"), "sources", sources, slug)
    fields["ask.heading"] = mark(body.select_one(".art-cta-heading"), "ask.heading", page["ask"]["heading"], slug)
    fields["ask.body"] = mark(body.select_one(".art-cta-body"), "ask.body", page["ask"]["body"], slug)

    # Demos: why each one matters for this person.
    whys = body.select(".sh-demos .sh-demo-why")
    if len(whys) != len(page["demos"]):
        raise SystemExit(f"{slug}: demo count")
    for i, (el, d) in enumerate(zip(whys, page["demos"])):
        fields[f"demos.{i}.why"] = mark(el, f"demos.{i}.why", d["why"], slug)

    # The notice repeats the sources line after its own text: mirror it.
    notice_p = body.select_one(".sh-notice-box p")
    full = notice_p.get_text()
    assert full.endswith(sources), (full, sources)
    notice_p.clear()
    notice_p.append(NavigableString(full[: -len(sources)]))
    mirror = soup.new_tag("span")
    mirror.string = sources
    mirror["data-mirror"] = "sources"
    notice_p.append(mirror)

    # Links: to the live site; the review page keeps them from navigating (rv-app.js).
    for a in body.find_all("a", href=True):
        h = a["href"]
        if h.startswith("/"):
            a["href"] = LIVE + h
    # Images: the portrait exactly as live, everything else from public/.
    for img in body.find_all("img"):
        src = img["src"]
        f = PUBLIC / src.lstrip("/")
        if not f.exists():
            raise SystemExit(f"{slug}: image missing {src}")
        img["src"] = data_uri(f)
        for k in ("srcset", "sizes", "fetchpriority"):
            img.attrs.pop(k, None)
    portrait = body.select_one(".for-land-photo img")
    if portrait["src"] != data_uri(PUBLIC / "people" / f"{slug}.webp"):
        raise SystemExit(f"{slug}: portrait is not public/people/{slug}.webp")

    inner = "".join(str(c) for c in body.contents).strip()
    if "/_next/" in inner:
        raise SystemExit(f"{slug}: markup still references /_next/")
    return inner, fields


# ---------- Page ----------


def first_name(name: str) -> str:
    return name.split()[0]


def build(slug: str, data: dict, skeleton: str):
    page = next(p for p in data["pages"] if p["slug"] == slug)
    notice_sources = data["notice"]["sources"]
    html = fetch(f"{DEV}/for/{slug}")
    soup = BeautifulSoup(html, "html.parser")
    css = site_css(soup)
    markup, fields = build_markup(slug, html, page, notice_sources)
    first = first_name(page["name"])
    title = f"{first}'s page"
    state = {
        "v": 1,
        "slug": slug,
        "name": page["name"],
        "title": title,
        "live_url": f"{LIVE}/for/{slug}",
        "json": "website/content/stakeholders.json, pages[] item with this slug; keys are paths inside it, '#0'/'#1' parts join with one space",
        "saved_at": None,
        "saves": 0,
        "original": fields,
        "fields": fields,
    }
    review_css = (HERE / "rv-review.css").read_text(encoding="utf-8")
    app_js = (HERE / "rv-app.js").read_text(encoding="utf-8").replace("__SKELETON__", json.dumps(skeleton))
    state_json = json.dumps(state, ensure_ascii=False, indent=1).replace("<", "\\u003c")
    bar = (
        '<div id="rv-bar" class="rv-bar" role="region" aria-label="Review">'
        '<div class="rv-bar-in">'
        f'<p class="rv-msg"><strong>Review: {first}\'s page.</strong> '
        "<span>Click any text to edit. Your edits are the sign-off.</span></p>"
        '<div class="rv-act">'
        '<p id="rv-status" class="rv-status" aria-live="polite">Not edited yet</p>'
        '<button id="rv-save" class="rv-save" type="button" disabled>Save edits</button>'
        "</div></div></div>"
    )
    out = (
        f"<title>{title}</title>\n"
        f'<link id="rv-fonts" rel="stylesheet" href="{FONTS}">\n'
        f'<style id="rv-site-css">\n{css}\n</style>\n'
        f'<style id="rv-review-css">\n{review_css}\n</style>\n'
        f"{bar}\n"
        f'<div id="rv-page" class="rv-page">{markup}</div>\n'
        f'<script type="application/json" id="rv-state">{state_json}</script>\n'
        f'<script id="rv-app">\n{app_js}\n</script>\n'
    )
    path = HERE / f"review-{slug}.html"
    path.write_text(out, encoding="utf-8")
    print(f"{slug}: {len(out) / 1024:.0f} KB, {len(fields)} editable fields -> {path.name}")


def main():
    slugs = [a for a in sys.argv[1:] if not a.startswith("-")] or SLUGS
    data = json.loads((SITE / "content" / "stakeholders.json").read_text(encoding="utf-8"))
    skel_file = HERE / "skeleton.txt"
    skeleton = skel_file.read_text(encoding="utf-8") if skel_file.exists() else ""
    if not skeleton:
        print("warning: no skeleton.txt yet; saving will be disabled until it's filled in")
    for slug in slugs:
        build(slug, data, skeleton)


if __name__ == "__main__":
    main()
