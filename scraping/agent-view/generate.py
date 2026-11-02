"""The agent view: the Hire Me Hackathon site as pure Markdown, for LLM agents.

    python -I scraping\\agent-view\\generate.py [--out DIR]

Reads the site's own content files (website\\content\\) and a few route files (website\\app\\), and
writes llms.txt plus agent\\**\\*.md into the out dir (default: scraping\\agent-view\\out\\). The out
dir mirrors the site root: out\\llms.txt is served at /llms.txt and out\\agent\\ at /agent/.

It wipes and rewrites only its own out dir (and refuses to wipe a folder holding anything else),
it's deterministic (same content in, same bytes out), it runs from any cwd, and it uses the
standard library only. Nothing is read from website\\local\\ (the stakeholder gate needs nothing
from there) and nothing from Addvery Research\\.

Every file is built in memory and checked before anything is written: relative links resolve,
live URLs match a real route, no HTML tags, and the DoD-22 safety scan (secrets, the proposal, the
private repo's name, console.apify.com, Alex's own GetSales outbound). Any failure writes nothing
and exits 1. See README.md.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import posixpath
import re
import shutil
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

# ---------- Where things are ----------

SITE = "https://hire-me-hackathon.vercel.app"
HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent
WEB = REPO / "website"
CONTENT = WEB / "content"
APP = WEB / "app"
PUBLIC = WEB / "public"
DEFAULT_OUT = HERE / "out"
AGENT = "agent"  # the folder in the out dir, served at /agent/
WPM = 200  # reading speed for every time estimate in this view

# Content files this generator knows. Anything else in website\content\ gets a generic rendering.
KNOWN_FILES = {
    "build.json", "clips.json", "d1.json", "deliverables.json", "feed.json", "inventory.json",
    "linkedin-wall.json", "privacy.md", "stakeholders.json", "summary.json", "time-paths.json",
    "videos.json", "docs/index.json",
}
YOUR_PAGE = "/for/<your-slug>"  # time-paths.json: the visitor's own page, a chooser of the six
KNOWN_DIRS = {"docs", "demos"}  # docs/*.md (listed in docs/index.json) and demos/*.md (entries)

# A portfolio content file, "when it lands". The AI portfolio is expected as a GTM demos entry
# (content/demos/<slug>.md) named by AI_PORTFOLIO_SLUG in app/about/profile.ts; a standalone file
# with one of these names is picked up too. Until one is published, there is no output.
PORTFOLIO_FILES = ["ai-portfolio.md", "portfolio.md"]

# Feed anchors the site gives names of their own (app/feed.tsx ANCHORS, app/build-status.tsx).
FEED_ANCHORS = {"s02": "s02"}

# The time-based tracks are the site's own when content/time-paths.json defines them (the home
# page's "How much time do you have?" paths, app/welcome-data.ts): same items, same order, same
# leave-outs. Only without that file are they built here, from this priority list, most important
# first, each filled to its time at WPM (a fifth over allowed). "@entries" stands for every
# published GTM demos entry, newest first. Paths that don't exist in a build are skipped.
PRIORITY = [
    "feed/s02.md", "feed/day-so-far.md", "d1.md", "about.md", "feed/workflows-built.md", "d3.md",
    "@entries", "feed/insight-bottleneck.md", "feed/s11.md", "feed/status.md", "docs/charter.md",
    "d2.md", "feed/research-in.md", "feed/reset.md", "feed/handovers.md", "feed/insight-api-keys.md",
    "feed/s08.md", "feed/s07-control-room.md", "for/INDEX.md", "d9.md", "d8.md", "d7.md", "d6.md",
    "d5.md", "d10.md", "d11.md", "feed/site-shape.md", "feed/three-calls.md", "feed/research-lands.md",
    "feed/s05.md", "feed/s03.md", "feed/insight-spec-size.md", "feed/insight-three-tribes.md",
]
TRACKS = [5, 10, 20, 60]

# Docs redactions (DoD-22). The site's charter and specs name two things the agent view never
# carries, and the scan below fails on them, so their names are redacted here, phrase by phrase.
# Only the docs and the privacy notice pass through this; everything else is verbatim.
REDACTIONS = [
    re.compile(r"\bthe (?:Apify|recent) proposal\b", re.I),
    re.compile(r"\b(?:the operator[’']s|Alex[’']s|his) own GetSales outbound(?: outside the demo folder)?", re.I),
]
REDACTED = "[redacted]"

# ---------- The safety scan (DoD-22), run on every output file ----------

SECRET_PATTERNS = [
    ("apify token", re.compile(r"apify_api_", re.I)),
    ("bearer token", re.compile(r"\bBearer\s+[A-Za-z0-9._~+/=-]{8,}", re.I)),
    ("sk- key", re.compile(r"\bsk-(?:ant-|proj-)?[A-Za-z0-9_-]{12,}")),
    ("github token", re.compile(r"\bgh[pousr]_[A-Za-z0-9]{8,}|ghp_")),
    ("private key", re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----|PRIVATE KEY-----")),
    ("vercel blob token", re.compile(r"vercel_blob_rw_[A-Za-z0-9_]{8,}")),
    ("google api key", re.compile(r"\bAIza[0-9A-Za-z_-]{30,}")),
    ("aws key", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
    ("slack token", re.compile(r"\bxox[abprs]-[A-Za-z0-9-]{10,}")),
    ("jwt", re.compile(r"\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.")),
    ("assigned secret", re.compile(r"(?i)\b(?:api[_-]?key|secret|token|password)\s*[=:]\s*['\"]?[A-Za-z0-9_\-]{16,}")),
]
# The private repo's name, kept out of this public file: the scan hashes every hyphenated or
# underscored token (lowercase, "_" read as "-") and compares it with this SHA-256.
PRIVATE_REPO_SHA256 = {"ef9c43d04dea8bd3501d00a87c0aef62aaf76fc9b4707071ac5158a033da024e"}
BANNED_PATTERNS = [
    ("console.apify.com", re.compile(r"console\.apify\.com", re.I)),
    ("Alex's own GetSales outbound", re.compile(
        r"(?i)\b(?:alex[’']s|operator[’']s|his|my)\s+own\s+(?:getsales\b|outbound\b)"
        r"|\bown\s+getsales\s+(?:outbound|campaigns?|sequences?|account)"
        r"|\b(?:alex[’']s|operator[’']s|his|my)\s+(?:getsales\s+)?(?:outbound\s+)?campaigns?\s+in\s+getsales")),
]
PROPOSAL_NEAR_APIFY = 300  # characters either side


def scan(name: str, text: str) -> list[str]:
    """Problems in one file, as "file:line: what" (never the match itself)."""
    problems = []

    def line_of(pos: int) -> int:
        return text.count("\n", 0, pos) + 1

    for label, pat in SECRET_PATTERNS + BANNED_PATTERNS:
        for m in pat.finditer(text):
            problems.append(f"{name}:{line_of(m.start())}: {label}")
    for m in re.finditer(r"[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)+", text):
        if hashlib.sha256(m.group(0).lower().replace("_", "-").encode()).hexdigest() in PRIVATE_REPO_SHA256:
            problems.append(f"{name}:{line_of(m.start())}: the private repo's name")
    for m in re.finditer(r"proposal", text, re.I):
        window = text[max(0, m.start() - PROPOSAL_NEAR_APIFY): m.end() + PROPOSAL_NEAR_APIFY]
        if re.search(r"apify", window, re.I):
            problems.append(f"{name}:{line_of(m.start())}: 'proposal' near 'Apify'")
    return problems


# ---------- Small helpers ----------

class Fail(Exception):
    pass


def read_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def is_text(v) -> bool:
    return isinstance(v, str) and v.strip() != ""


def esc_link(text: str) -> str:
    return text.replace("\\", "\\\\").replace("[", "\\[").replace("]", "\\]")


def cell(text: str) -> str:
    return str(text).replace("|", "\\|").replace("\n", " ")


def oneline(text: str, limit: int = 240) -> str:
    t = re.sub(r"\s+", " ", str(text or "")).strip()
    t = re.sub(r"\*\*(.+?)\*\*", r"\1", t)
    t = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", t)
    if len(t) > limit:
        t = t[: limit - 1].rsplit(" ", 1)[0].rstrip(",;:") + "…"
    return t


def first_sentence(text: str) -> str:
    parts = re.split(r"(?<=[.!?])\s+", str(text).strip())
    return parts[0] if parts else ""


def count_words(md: str) -> int:
    t = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", md)
    t = re.sub(r"https?://\S+", " ", t)
    return sum(1 for tok in t.split() if re.search(r"[^\W_]", tok))


def minutes(words: int) -> int:
    return max(1, int(words / WPM + 0.5))


def rel(here: str, target: str) -> str:
    base = posixpath.dirname(here) or "."
    return posixpath.relpath(target, base)


def live(path: str) -> str:
    return SITE + (path if path.startswith("/") else "/" + path)


def url_link(path: str) -> str:
    u = live(path)
    return f"[{u}]({u})"


MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
          "October", "November", "December"]


def fmt_date(ymd: str, long: bool = False) -> str:
    y, m, d = (int(x) for x in ymd[:10].split("-"))
    name = MONTHS[m - 1] if long else MONTHS[m - 1][:3]
    return f"{d} {name} {y}"


def prague(iso_utc: str) -> datetime:
    """A UTC timestamp in Prague time (EU summer time rules), without a tz database."""
    dt = datetime.fromisoformat(iso_utc.replace("Z", "+00:00")).astimezone(timezone.utc)

    def last_sunday(month: int) -> datetime:
        d = datetime(dt.year, month + 1, 1, 1, tzinfo=timezone.utc) - timedelta(days=1)
        while d.weekday() != 6:
            d -= timedelta(days=1)
        return d

    summer = last_sunday(3) <= dt < last_sunday(10)
    return (dt + timedelta(hours=2 if summer else 1)).replace(tzinfo=None)


def tsx_text(path: Path) -> str:
    """A route file's text with JSX entities and line wrapping undone, for phrase checks."""
    t = path.read_text(encoding="utf-8")
    for a, b in (("&rsquo;", "’"), ("&lsquo;", "‘"), ("&apos;", "'"), ("&ldquo;", "“"), ("&rdquo;", "”"),
                 ("&amp;", "&"), ('{" "}', " ")):
        t = t.replace(a, b)
    return re.sub(r"\s+", " ", t)


# ---------- Site phrases quoted from route files, checked on every run ----------
# Words the site renders from code rather than content. Each is checked against its route file on
# every run; if the site's wording changes, the run fails instead of quoting words the site no
# longer says.

PHRASES = {
    "disclaimer": ("app/site-chrome.tsx", "Unofficial job application by Alex Alderman. Not affiliated with Addvery."),
    # The site's own description (every page's link preview; the old home hero's lead line too).
    "hero_lead": ("app/layout.tsx", "A GTM engineer's skillset, built live in 12 hours by Alex Alderman, steering a team of AI agents."),
    # The old home hero's "Start here" box. Optional: when the welcome replaces it, start-here.md
    # follows the welcome's own docs line instead (see site_says()).
    "start_new": ("app/page.tsx", "New here?"),
    "start_watch": ("app/page.tsx", "Watch the 13-minute explainer"),
    "start_then": ("app/page.tsx", ", then read the plan the agents work from:"),
    "footer_credit": ("app/site-footer.tsx", "Built live by Alex Alderman, steering a team of AI agents."),
    "for_title": ("app/for/page.tsx", "Six people at Addvery, one page each"),
    "for_lead": ("app/for/page.tsx", "I'm Alex Alderman, and I'm applying to Addvery as a GTM engineer. Each page is written for one person: what I'd build for their part of the business, and the one thing I'd ask them."),
    "for_note": ("app/for/page.tsx", "Every page draws only on public sources, and each one says which. If you're one of the six and want your page taken down, reply to my LinkedIn message and it's removed."),
    "for_desc": ("app/for/page.tsx", "One page for each of six people at Addvery: what Alex Alderman would build for their part of the business."),
    "demos_sub": ("app/demos/page.tsx", "What Alex built during the hackathon, one entry per demo: some written up, some on video. Newest first."),
    "demos_empty": ("app/demos/page.tsx", "Each one goes up here when Alex has finished it, as a written post or a video. Until then, the live feed shows the work as it happens."),
    "doc_lead": ("app/docs/[slug]/page.tsx", "(Prague). A few private details are redacted."),
    "video_soon": ("app/feed.tsx", "recording goes up here soon."),
    "reading_dek": ("app/for/[slug]/page.tsx", "Most important first, with the time each one takes. Stop wherever your time runs out."),
}
_phrase_cache: dict[str, str] = {}
_phrase_problems: list[str] = []


def site_says(key: str) -> bool:
    """True if the phrase's route file still says it (no problem logged either way)."""
    rel_file, text = PHRASES[key]
    path = WEB / rel_file
    return path.exists() and text in tsx_text(path)


def phrase(key: str) -> str:
    rel_file, text = PHRASES[key]
    if key not in _phrase_cache:
        if not site_says(key):
            _phrase_problems.append(f"website/{rel_file} no longer says: {text}")
        _phrase_cache[key] = text
    return _phrase_cache[key]


# ---------- Loading the site's content ----------

def scalar(v: str):
    v = v.strip()
    try:
        return json.loads(v)
    except ValueError:
        if re.fullmatch(r"'.*'", v):
            return v[1:-1].replace("''", "'")
        if re.fullmatch(r"\[.*\]", v):
            inner = v[1:-1].strip()
            return [scalar(s) for s in inner.split(",")] if inner else []
        return v


def front_matter(src: str):
    """POST-FORMAT front matter (app/demos/entries.ts parseFrontMatter): data and body."""
    text = src.lstrip("\ufeff").replace("\r\n", "\n").replace("\r", "\n")
    if not text.startswith("---\n"):
        return None, text
    end = text.find("\n---", 3)
    if end < 0:
        return None, text
    head, body = text[4:end], text[end + 4:]
    if body.startswith("\n"):
        body = body[1:]
    data: dict = {}
    current = None
    for line in head.split("\n"):
        if not line.strip():
            continue
        m = re.match(r"^( *)([a-z_]+):(?: (.*))?$", line)
        if not m:
            return None, text
        indent, key, value = m.groups()
        if indent == "":
            if value is None or not value.strip():
                current = {}
                data[key] = current
            else:
                current = None
                data[key] = scalar(value)
        elif indent == "  " and current is not None:
            current[key] = None if value is None else scalar(value)
        else:
            return None, text
    return data, body


def load_entries(demo_slugs: set[str], held: list[str]) -> list[dict]:
    """The GTM demos entries a production build shows: status "published" only (entries.ts gate)."""
    folder = CONTENT / "demos"
    entries = []
    for f in sorted(folder.glob("*.md")) if folder.exists() else []:
        data, body = front_matter(f.read_text(encoding="utf-8"))
        if not data:
            held.append(f"content/demos/{f.name}: no readable front matter, left out")
            continue
        if data.get("status") != "published":
            held.append(f"content/demos/{f.name}: status {data.get('status')!r}, not published, left out")
            continue
        if re.search(r"\[Alex", body):
            held.append(f"content/demos/{f.name}: still holds notes for Alex, left out")
            continue
        if not is_text(data.get("slug")) or not is_text(data.get("title")) or not isinstance(data.get("cover"), dict):
            held.append(f"content/demos/{f.name}: missing slug, title or cover, left out")
            continue
        if data.get("deliverable") and data["deliverable"] not in demo_slugs:
            data["deliverable"] = None
        data["body"] = body
        data["file"] = f.name
        entries.append(data)
    entries.sort(key=lambda e: e["title"])
    entries.sort(key=lambda e: str(e.get("date", "")), reverse=True)
    return entries


def stakeholder_gate(file: dict) -> dict:
    """Python twin of app/stakeholders.ts stakeholderGate(), as a production build runs it.

    `next build` and every Vercel build run with NODE_ENV "production", so: no pages unless the
    file's `approved` is exactly true; a page must pass isPage(); a page with `note_is_draft` is
    left out; a landing shows only with its own `approved` exactly true and a greeting.
    """
    held = []
    approved = file.get("approved") is True
    if not approved or not isinstance(file.get("pages"), list):
        reason = "the file's approved isn't true" if not approved else "no pages list"
        return {"pages": [], "held": [f"all stakeholder pages: {reason}"], "notice": {}, "about_me": None}

    def is_page(p) -> bool:
        if not isinstance(p, dict):
            return False
        demos = p.get("demos")
        ask = p.get("ask")
        return (
            is_text(p.get("slug")) and re.fullmatch(r"[a-z0-9-]+", p["slug"]) is not None
            and all(is_text(p.get(k)) for k in ("name", "title", "label", "framing", "note"))
            and isinstance(demos, list) and 2 <= len(demos) <= 4
            and all(isinstance(d, dict) and isinstance(d.get("n"), (int, float)) and not isinstance(d.get("n"), bool)
                    and is_text(d.get("why")) for d in demos)
            and isinstance(ask, dict) and all(is_text(ask.get(k)) for k in ("short", "heading", "body"))
        )

    def is_href(v) -> bool:
        return is_text(v) and (re.match(r"^/(?!/)", v) is not None or re.match(r"^https?://", v) is not None)

    def clean_landing(raw):
        if not isinstance(raw, dict) or raw.get("approved") is not True or not is_text(raw.get("greeting")):
            return None
        concerns = []
        for c in raw.get("concerns") or []:
            if isinstance(c, dict) and is_text(c.get("q")) and is_text(c.get("a")):
                concerns.append({"q": c["q"].strip(), "lead": c["lead"].strip() if is_text(c.get("lead")) else None,
                                 "a": c["a"].strip()})
        links = [{"title": x["title"].strip(), "href": x["href"].strip()}
                 for x in raw.get("reading_list") or []
                 if isinstance(x, dict) and is_text(x.get("title")) and is_href(x.get("href"))]
        return {"greeting": raw["greeting"].strip(), "concerns": concerns, "reading_list": links}

    pages = []
    for p in file["pages"]:
        slug = p.get("slug") if isinstance(p, dict) else None
        if not is_page(p):
            held.append(f"/for/{slug}: fails the site's page check (isPage), no file")
            continue
        if p.get("note_is_draft"):
            held.append(f"/for/{slug}: note still marked as a draft (note_is_draft), no file")
            continue
        page = dict(p)
        page["moments"] = list(p.get("moments") or [])[:3]
        page["landing"] = clean_landing(p.get("landing"))
        if p.get("landing") and not page["landing"]:
            held.append(f"/for/{slug}: page emitted; its landing (greeting, questions, reading list) isn't approved, left out")
        pages.append(page)
    default_notice = {
        "heading": "About this page",
        "why": "This page is part of a job application to Addvery, built in public.",
        "sources": "Its facts come only from Addvery's public website and your public job title.",
        "removal": "Ask and it's removed: reply to my LinkedIn message.",
        "privacy_label": "How I handle data",
    }
    notice = {**default_notice, **(file.get("notice") or {})}
    about = file.get("about_me") or {}
    about_me = {"heading": about["heading"], "text": about["text"]} if is_text(about.get("heading")) and is_text(about.get("text")) else None
    gi = file.get("grid_intro")
    grid_intro = None
    if isinstance(gi, dict) and is_text(gi.get("heading")) and isinstance(gi.get("paragraphs"), list):
        paras = [x.strip() for x in gi["paragraphs"] if is_text(x)]
        if paras:
            grid_intro = {"heading": gi["heading"].strip(), "paragraphs": paras}
    return {"pages": pages, "held": held, "notice": notice, "about_me": about_me, "grid_intro": grid_intro}


# ---------- The pages ----------

class Page:
    def __init__(self, path: str, title: str, human: str | None, desc: str, human_note: str = ""):
        self.path = path  # relative to the agent folder
        self.title = title
        self.human = human  # site path of the human counterpart, or None
        self.human_note = human_note
        self.desc = oneline(desc)
        self.body = ""
        self.footer: list[str] = []
        self.words = 0
        self.video_min: float | None = None

    def text(self) -> str:
        head = [f"# {self.title}", "", f"*{phrase('disclaimer')}*", ""]
        if self.human:
            head.append(f"- Human page: {url_link(self.human)}")
        else:
            head.append(f"- Human page: {self.human_note or 'none'} ({url_link('/')} is the site's home)")
        head.append(f"- Reading time here: about {minutes(self.words)} min ({self.words} words, at {WPM} a minute)")
        if self.video_min:
            head.append(f"- Video on the human page: about {self.video_min:g} min more")
        head.append("")
        parts = head + [self.body.strip(), ""]
        if self.footer:
            parts += ["---", "", " · ".join(self.footer), ""]
        return "\n".join(parts)


class Build:
    def __init__(self):
        self.pages: dict[str, Page] = {}
        self.held: list[str] = []
        self.notes: list[str] = []
        self.routes: dict[str, str] = {}  # site path (with #anchor) -> agent path
        self.valid_live: set[str] = set()  # site paths (with #anchor) a live URL may point to

    def add(self, page: Page) -> Page:
        self.pages[page.path] = page
        if page.human:
            self.routes.setdefault(page.human, page.path)
            self.valid_live.add(page.human)
        return page

    def link(self, here: str, target: str, text: str | None = None) -> str:
        page = self.pages[target]
        return f"[{esc_link(text or page.title)}]({rel(here, target)})"

    def site_target(self, href: str) -> str | None:
        """The agent file for a site path ("/d3", "/#post-s02", a full site URL), or None."""
        p = href[len(SITE):] or "/" if href.startswith(SITE) else href
        if not p.startswith("/") or p.startswith("//"):
            return None
        path, _, frag = p.partition("#")
        path = path.rstrip("/") or "/"
        if path == "/" and frag:
            if frag == "feed":
                return self.routes.get("/#feed")
            if frag == "status":
                return self.routes.get("/#status")
            if frag.startswith("post-"):
                return self.routes.get(f"/#{frag}")
            if frag in FEED_ANCHORS:
                return self.routes.get(f"/#post-{FEED_ANCHORS[frag]}")
            return None
        return self.routes.get(path)

    def site_link(self, here: str, href: str, text: str) -> str:
        target = self.site_target(href)
        if target:
            return f"[{esc_link(text)}]({rel(here, target)})"
        if href.startswith("/"):
            return f"[{esc_link(text)}]({live(href)})"
        return f"[{esc_link(text)}]({href})"


def video_line(b: Build, session: str, start: int, video_min: float | None) -> str:
    vid = b.videos.get(session)
    if not vid:
        return f"*The {session} recording {phrase('video_soon')}*"
    at = f", from {start // 60}:{start % 60:02d}" if start else ""
    length = f", about {video_min:g} min" if video_min else ""
    url = f"https://youtu.be/{vid}" + (f"?t={start}" if start else "")
    return f"**Video:** session {session} webcam recording{at}{length}. [Watch it on YouTube]({url})"


def quote_lines(q: dict, prefix: str = "") -> list[str]:
    tail = q.get("source", "")
    if q.get("href"):
        tail += f" · [Watch this moment]({q['href']})"
    if q.get("note"):
        tail += f". {q['note']}"
    return [f"{prefix}> “{q.get('text', '')}”", f"{prefix}>", f"{prefix}> {tail}".rstrip()]


def render_blocks(b: Build, here: str, blocks: list, video_min: float | None = None, level: int = 2) -> list[str]:
    out: list[str] = []
    for block in blocks or []:
        t = block.get("type")
        if t == "points":
            for pt in block.get("points") or []:
                line = f"- **{pt.get('lead', '')}**"
                if pt.get("text"):
                    line += f" {pt['text']}"
                out.append(line)
                if pt.get("quote"):
                    out.append("")
                    out += quote_lines(pt["quote"], prefix="  ")
                    out.append("")
            out.append("")
        elif t == "list":
            out += [f"- {item}" for item in block.get("items") or []] + [""]
        elif t == "quote":
            out += quote_lines(block) + [""]
        elif t == "highlight":
            out += [f"{'#' * (level + 1)} {block.get('title', '')}", ""]
            out += render_blocks(b, here, block.get("blocks") or [], video_min, level + 1)
        elif t == "video":
            out += [video_line(b, block.get("session") or "", int(block.get("start") or 0), video_min), ""]
        elif t == "image":
            src = block.get("src") or ""
            out.append(f"**Image:** {block.get('alt') or 'no description'}")
            if block.get("caption"):
                out += ["", f"*{block['caption']}*"]
            if src.startswith("/"):
                b.static_urls.add(src)
                out += ["", f"[The image file]({live(src)})"]
            out.append("")
        elif t == "summary":
            out += [f"{'#' * (level + 1)} {b.summary.get('headline', '')}", ""]
            for para in b.summary.get("paragraphs") or []:
                out += [para, ""]
        elif t == "status-board":
            out += status_board(b, here, level)
        elif t == "doc-link":
            href = block.get("href") or f"/docs/{block.get('slug')}"
            out += [b.site_link(here, href, block.get("text") or href), ""]
        elif t == "p" or (t is None and block.get("text")):
            out += [block.get("text") or "", ""]
        else:
            # A block type this generator doesn't know: everything it carries, so nothing disappears.
            b.notes.append(f"{here}: unknown block type {t!r}, rendered generically")
            for key in ("title", "text", "caption", "alt"):
                if is_text(block.get(key)):
                    out += [str(block[key]), ""]
            out += [f"- {item}" for item in block.get("items") or []]
            if block.get("blocks"):
                out += render_blocks(b, here, block["blocks"], video_min, level + 1)
            out.append("")
    return out


def status_board(b: Build, here: str, level: int) -> list[str]:
    build = b.build
    h = "#" * (level + 1)
    out = [build.get("as_of_line", ""), "", build.get("intro", ""), "", f"{h} How it runs", ""]
    out += [f"- **{x['lead']}** {x['text']}" for x in build.get("how_it_runs") or []] + [""]
    tooling, demos = build.get("tooling") or [], build.get("demos") or []
    out += [f"**{len(tooling) + len(demos)} pieces of work:** {len(tooling)} tooling pieces and {len(demos)} demos.", ""]
    q = (build.get("quotes") or {}).get("after_how_it_runs")
    if q:
        out += quote_lines(q) + [""]
    out += [f"{h} The tooling (first)", "", f"Status at {build.get('as_of', '')}.", ""]
    for row in tooling:
        slug = (b.deliverables.get("tooling_docs") or {}).get(row["piece"])
        name = f"**{row['piece']}**"
        if slug and f"docs/{slug}.md" in b.pages:
            name += f" ({b.link(here, f'docs/{slug}.md', 'its spec')})"
        out.append(f"- {name}: {row['what']} Status: {row['status']}")
    out += ["", f"{h} The demos (then)", "", f"Status at {build.get('as_of', '')}.", ""]
    for row in demos:
        target = f"d{row['n']}.md"
        name = b.link(here, target, f"Demo {row['n']}: {row['demo']}") if target in b.pages else f"Demo {row['n']}: {row['demo']}"
        out.append(f"- **{name}**: {row['what']} Status: {row['status']}")
    out.append("")
    q = (build.get("quotes") or {}).get("after_demos")
    if q:
        out += quote_lines(q) + [""]
    return out


def post_desc(b: Build, post: dict) -> str:
    if is_text(post.get("summary_line")):
        return post["summary_line"]
    rec = b.inv.get(f"/#post-{post['id']}")
    if rec and is_text(rec.get("one_line")):
        return rec["one_line"]
    for block in post.get("blocks") or []:
        if block.get("type") == "p" and is_text(block.get("text")):
            return first_sentence(block["text"])
    return post.get("title", "")


def post_excerpt(post: dict) -> str | None:
    """The site's one-line teaser of a post (app/for/[slug]/page.tsx excerpt())."""
    for block in post.get("blocks") or []:
        if block.get("type") == "p" and block.get("text"):
            first = first_sentence(block["text"])
            return first if len(first) <= 170 else first[:167].rstrip() + "…"
    return None


def inline_d1(b: Build, here: str, text: str, unlinked: set[str]) -> str:
    """d1.json's inline markup: **bold** stays, [text](href) maps to this view (app/d1.tsx Inline)."""

    def repl(m):
        label, href = m.group(1), m.group(2)
        if href.startswith("/"):
            return label if href in unlinked else b.site_link(here, href, label)
        return f"[{label}]({href})"

    return re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", repl, text)


def d1_body(b: Build, here: str) -> list[str]:
    d1 = b.d1
    unlinked = set(d1.get("unlinked_until_live") or [])
    out = [f"*{d1.get('eyebrow', '')}*", "", f"**{d1.get('title', '')}**", "", d1.get("intro", ""), ""]
    car = d1.get("carousel") or {}
    slides = car.get("slides") or []
    out += [f"## The research boards", "", f"{len(slides)} slides on the human page. Each board's caption, then its image described as the site's alt text gives it.", ""]
    for i, s in enumerate(slides, 1):
        out.append(f"{i}. **{s.get('title', '')}** {s.get('text', '')}")
        if s.get("image"):
            out.append(f"   Board image: {s.get('alt') or 'no description'}")
            for w in (2880,):
                b.static_urls.add(f"/d1/{s['image']}-{w}.webp")
            out.append(f"   [The board, full size]({live(f'/d1/{s['image']}-2880.webp')})")
        elif s.get("href"):
            label = s.get("link") or s["href"]
            out.append(f"   {label if s['href'] in unlinked else b.site_link(here, s['href'], label)}")
    out += ["", car.get("note", ""), ""]
    out += ["## The result", "", d1.get("highlight", ""), ""]
    learned = d1.get("learned") or {}
    out += [f"**{learned.get('lead', '')}**", ""] + [f"- {x}" for x in learned.get("items") or []] + [""]
    out += ["## How it works", ""]
    out += [f"{i}. {inline_d1(b, here, s, unlinked)}" for i, s in enumerate(d1.get("steps") or [], 1)] + [""]
    out += [inline_d1(b, here, d1.get("cta", ""), unlinked), ""]
    fold = d1.get("fold") or {}
    out += [f"## {fold.get('summary', 'Show me how')}", "", fold.get("intro", ""), ""]
    table = fold.get("table") or {}
    if table.get("head"):
        out += [f"**{table.get('label', '')}**", ""]
        out.append("| " + " | ".join(cell(h) for h in table["head"]) + " |")
        out.append("|" + "---|" * len(table["head"]))
        for row in table.get("rows") or []:
            out.append("| " + " | ".join(cell(inline_d1(b, here, c, unlinked)) for c in row) + " |")
        out.append("")
    out += [f"- {inline_d1(b, here, x, unlinked)}" for x in fold.get("items") or []] + [""]
    out += ["## Closing notes", ""]
    for line in d1.get("closing") or []:
        out += [line, ""]
    return out


def entry_callout(b: Build, group: list[str]) -> list[str]:
    head = group[0].strip()
    rest = group[1:]
    if head == "[!pull]":
        return []  # a pull quote repeats the body's own words (the site hides it from screen readers)
    if head == "[!quote]":
        lines = [x.strip() for x in rest if x.strip()]
        return ([f"> {lines[0]}", ">", f"> — {lines[1]}"] if len(lines) >= 2 else [f"> {x}" for x in lines]) + [""]
    if head == "[!summary]":
        items = [m.group(1) for x in rest if (m := re.match(r"^\s*[-*]\s+(.*)$", x))]
        return ["**Key points**", ""] + [f"- {x}" for x in items] + [""]
    m = re.match(r"^\[!diagram\] (scale|flow)$", head)
    if m:
        caption = rest[0].strip() if rest else ""
        items = [mm.group(1).strip() for x in rest[1:] if (mm := re.match(r"^\s*\d+\.\s+(.*)$", x))]
        return [f"**{caption}** ({'a scale, top first' if m.group(1) == 'scale' else 'steps, in order'})", ""] + \
            [f"{i}. {x}" for i, x in enumerate(items, 1)] + [""]
    m = re.match(r"^\[!figure\](?: (.*))?$", head)
    if m:
        src = (m.group(1) or "").strip()
        lines = [x.strip() for x in rest if x.strip()]
        out = [f"**Figure:** {lines[0] if lines else 'no description'}"]
        if len(lines) > 1:
            out += ["", f"*{lines[1]}*"]
        if src.startswith("/"):
            b.static_urls.add(src)
            out += ["", f"[The figure file]({live(src)})"]
        return out + [""]
    m = re.match(r"^\[!video\](?: (.*))?$", head)
    if m:
        args = (m.group(1) or "").split()
        caption = next((x.strip() for x in rest if x.strip()), "")
        vid = args[0] if args else ""
        start = int(args[1]) if len(args) > 1 else 0
        end = f" to {int(args[2]) // 60}:{int(args[2]) % 60:02d}" if len(args) > 2 else ""
        span = f" (from {start // 60}:{start % 60:02d}{end})" if start or end else ""
        url = f"https://youtu.be/{vid}" + (f"?t={start}" if start else "")
        return [f"**Video clip:** {caption}{span}. [Watch it on YouTube]({url})", ""]
    m = re.match(r"^\[!(post|carousel)\] (.+)$", head)
    if m:
        kind, title = m.group(1), m.group(2).strip()
        meta, i = {}, 0
        for i, line in enumerate(rest):
            mm = re.match(r"^(format|label|slides|variant):\s*(.+)$", line.strip())
            if not line.strip():
                break
            if mm:
                meta[mm.group(1)] = mm.group(2).strip()
        else:
            i = len(rest)
        text = rest[i:]
        while text and not text[0].strip():
            text = text[1:]
        out = [f"### {title}", ""]
        info = " · ".join(x for x in (meta.get("format"), meta.get("label")) if x)
        if meta.get("variant") == "contrast":
            info += " · the comparison post"
        if info:
            out += [f"*{info}*", ""]
        if kind == "carousel" and meta.get("slides"):
            alt_file = PUBLIC / meta["slides"].lstrip("/") / "alt.json"
            if alt_file.exists():
                slides = read_json(alt_file)
                out += ["Its slides, as their alt text describes them:", ""]
                out += [f"{n}. {s.get('alt', '')}" for n, s in enumerate(slides, 1) if isinstance(s, dict)] + [""]
        out += ["The post text:", ""]
        out += [f"> {x}" if x.strip() else ">" for x in text] + [""]
        return out
    return [f"> {x}" if x.strip() else ">" for x in group] + [""]


def entry_body(b: Build, body: str) -> list[str]:
    body = re.sub(r"<!--.*?-->", "", body, flags=re.S)
    lines = body.replace("\r\n", "\n").split("\n")
    out: list[str] = []
    i = 0
    while i < len(lines):
        if lines[i].startswith(">"):
            group = []
            while i < len(lines) and lines[i].startswith(">"):
                group.append(re.sub(r"^> ?", "", lines[i]))
                i += 1
            out += entry_callout(b, group)
            continue
        out.append(lines[i])
        i += 1
    return out


def tidy(lines: list[str]) -> str:
    """Join lines, with no runs of blank lines and no blank lines at the ends."""
    text = "\n".join(lines)
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


# ---------- The generator ----------

def generate() -> tuple[dict[str, str], Build]:
    b = Build()
    b.static_urls: set[str] = set()

    # The content files.
    b.build = read_json(CONTENT / "build.json")
    b.deliverables = read_json(CONTENT / "deliverables.json")
    b.feed = read_json(CONTENT / "feed.json")
    b.summary = read_json(CONTENT / "summary.json")
    b.videos = read_json(CONTENT / "videos.json") if (CONTENT / "videos.json").exists() else {}
    inventory = read_json(CONTENT / "inventory.json") if (CONTENT / "inventory.json").exists() else {"items": []}
    b.inv = {it["path"]: it for it in inventory.get("items") or [] if isinstance(it, dict) and isinstance(it.get("path"), str)}
    b.d1 = read_json(CONTENT / "d1.json") if (CONTENT / "d1.json").exists() else None
    docs_index = read_json(CONTENT / "docs" / "index.json")
    gate = stakeholder_gate(read_json(CONTENT / "stakeholders.json"))
    b.held += gate["held"]
    wall_file = CONTENT / "linkedin-wall.json"
    if not wall_file.exists():
        wall_file = REPO / "scraping" / "site" / "linkedin-wall" / "wall.json"
    wall = read_json(wall_file) if wall_file.exists() else None
    about_route = (APP / "about" / "page.tsx").exists()
    tp = read_json(CONTENT / "time-paths.json") if (CONTENT / "time-paths.json").exists() else None
    site_paths = tp.get("paths") if isinstance(tp, dict) and isinstance(tp.get("paths"), dict) and tp["paths"] else None
    home_src = tsx_text(APP / "page.tsx") if (APP / "page.tsx").exists() else ""
    welcome_wired = bool(tp) and re.search(r"""from ["']\./welcome["']""", home_src) is not None
    old_start_box = all(site_says(k) for k in ("start_new", "start_watch", "start_then"))
    track_keys = sorted({*TRACKS, *(int(k) for k in (site_paths or {}) if str(k).isdigit())})

    # The demos (app/deliverables.ts allDemos()): build.json rows joined with deliverables.json copy.
    copy = b.deliverables.get("demos") or {}
    demos = []
    for row in b.build.get("demos") or []:
        slug = f"d{row['n']}"
        page = copy.get(slug) or {}
        demos.append({"slug": slug, "n": row["n"], "name": row["demo"], "what": row["what"], "status": row["status"],
                      "what_this_is": page.get("what_this_is"),
                      "pending": page.get("pending") or b.deliverables.get("default_pending", ""),
                      "blocks": page.get("blocks") or []})
    entries = load_entries({d["slug"] for d in demos}, b.held)

    posts = sorted(b.feed.get("posts") or [], key=lambda p: p["at"], reverse=True)  # newest first, stable
    status_post = next((p for p in posts if p["id"] == "status" or any(x.get("type") == "status-board" for x in p.get("blocks") or [])), None)

    # The AI portfolio hook: an entry named by app/about/profile.ts AI_PORTFOLIO_SLUG, or a
    # standalone content file. No published portfolio, no output.
    portfolio_slug = ""
    profile = APP / "about" / "profile.ts"
    if profile.exists():
        m = re.search(r'AI_PORTFOLIO_SLUG\s*=\s*"([^"]*)"', profile.read_text(encoding="utf-8"))
        portfolio_slug = m.group(1) if m else ""
    portfolio_entry = next((e for e in entries if portfolio_slug and e["slug"] == portfolio_slug), None) if about_route else None
    portfolio_file = None
    for name in PORTFOLIO_FILES:
        f = CONTENT / name
        if f.exists():
            data, body = front_matter(f.read_text(encoding="utf-8"))
            if data and data.get("status") == "published" and not re.search(r"\[Alex", body):
                portfolio_file = {**data, "body": body, "file": name}
            else:
                b.held.append(f"content/{name}: AI portfolio not published yet, left out")

    # ----- Plan every page (paths, titles, human counterparts) before rendering any links -----
    P = b.add
    P(Page("index.md", "Hire Me Hackathon: the agent view", "/", "What the site is, the project in five lines, the tracks, and where everything is."))
    P(Page("navigate.md", "How to navigate this view", None, "How the files are laid out, how site URLs map to files, and how to answer questions about Alex.",
           human_note="none; this page exists only in the agent view"))
    P(Page("about.md", "About Alex Alderman", "/about" if about_route else None,
           "Who Alex is, quoted from the live site, with the page each line is on.",
           human_note="no single page; each quote below names the page it's on"))
    if wall and about_route:
        P(Page("about/linkedin.md", "Alex Alderman's LinkedIn posts", "/about#linkedin",
               f"{len(wall.get('posts') or [])} of his public LinkedIn posts, verbatim, with dates and links."))
    elif wall:
        b.held.append("LinkedIn wall: no /about route on the site, so no file")
    P(Page("tracks/INDEX.md", "Tracks: reading lists by time", "/" if welcome_wired and site_paths else None,
           "Reading lists of 5, 10, 20 and 60 minutes, and the plan the agents work from.",
           human_note="none; the nearest is the home page"))
    if old_start_box:
        P(Page("tracks/start-here.md", "Start here: the site's own path", "/", "The site's own start path: the explainer, then the plan the agents work from."))
    elif welcome_wired and is_text((tp.get("intro") or {}).get("docs_lead")):
        P(Page("tracks/start-here.md", "Start here: the plan the agents work from", "/", "The charter and specs the home page lists at the foot of its welcome."))
    choices = ((tp or {}).get("intro") or {}).get("choices") or {}
    for t in track_keys:
        ch = choices.get(str(t)) if site_paths and str(t) in site_paths else None
        title = f"{ch['time']}: {ch['label']}" if ch and is_text(ch.get("time")) and is_text(ch.get("label")) else f"The {t}-minute track"
        human = f"/#time-{t}" if welcome_wired and site_paths and str(t) in site_paths else None
        P(Page(f"tracks/{t}-min.md", title, human, "", human_note="none yet; the nearest is the home page"))
    for d in demos:
        P(Page(f"{d['slug']}.md", f"Demo {d['n']}: {d['name']}", f"/{d['slug']}", f"{d['what']} Status: {d['status']}"))
    P(Page("demos/INDEX.md", "GTM demos", "/demos", "The GTM demos list: entries written up or on video, newest first."))
    for e in entries:
        P(Page(f"demos/{e['slug']}.md", e["title"], f"/demos/{e['slug']}", e["cover"].get("subtitle") or e.get("description", "")))
    P(Page("feed/INDEX.md", "Live feed", "/#feed", first_sentence(b.feed.get("intro", ""))))
    b.routes["/#feed"] = "feed/INDEX.md"
    b.valid_live.add("/#feed")
    for post in posts:
        page = P(Page(f"feed/{post['id']}.md", post["title"], f"/#post-{post['id']}", post_desc(b, post)))
        rec = b.inv.get(f"/#post-{post['id']}")
        if rec and isinstance(rec.get("video_min"), (int, float)) and rec["video_min"] > 0:
            page.video_min = rec["video_min"]
    if status_post:
        b.routes["/#status"] = f"feed/{status_post['id']}.md"
        b.valid_live.add("/#status")
    for anchor, pid in FEED_ANCHORS.items():
        if f"/#post-{pid}" in b.routes:
            b.routes[f"/#{anchor}"] = b.routes[f"/#post-{pid}"]
            b.valid_live.add(f"/#{anchor}")
    if gate["pages"]:
        P(Page("for/INDEX.md", "Six pages for Addvery", "/for", phrase("for_desc")))
        for sp in gate["pages"]:
            P(Page(f"for/{sp['slug']}.md", f"For {sp['label']}", f"/for/{sp['slug']}", sp["framing"]))
    P(Page("docs/INDEX.md", "Charter and specs", None, "The plan the agents work from, and the specs for the tooling.",
           human_note="none; the docs are listed in the Start here box on the home page"))
    for doc in docs_index.get("docs") or []:
        if (CONTENT / "docs" / f"{doc['slug']}.md").exists():
            P(Page(f"docs/{doc['slug']}.md", doc.get("title") or doc["label"], f"/docs/{doc['slug']}", doc.get("blurb", "")))
    if (CONTENT / "privacy.md").exists():
        rec = b.inv.get("/privacy")
        P(Page("privacy.md", "Privacy notice", "/privacy", rec["one_line"] if rec and rec.get("one_line") else "What data Alex holds, why, and how to make him stop."))
    if portfolio_file:
        P(Page("about/ai-portfolio.md", portfolio_file.get("title", "AI portfolio"), None,
               (portfolio_file.get("cover") or {}).get("subtitle") or portfolio_file.get("description", ""),
               human_note="none yet; this content file has no page on the site"))
    # Anchors on /d2 the inventory confirms are live (the research panels).
    for path, rec in b.inv.items():
        if path.startswith("/d2#research-") and rec.get("live") is True:
            b.valid_live.add(path)

    # Content files this generator doesn't know: a generic rendering each, so nothing disappears.
    generic = []
    for f in sorted(CONTENT.rglob("*")):
        if not f.is_file():
            continue
        relname = f.relative_to(CONTENT).as_posix()
        top = relname.split("/")[0]
        if relname in KNOWN_FILES or relname in PORTFOLIO_FILES:
            continue
        if top in KNOWN_DIRS and "/" in relname:
            if top == "docs" and relname.endswith(".md") and not any(d["slug"] == f.stem for d in docs_index.get("docs") or []):
                b.held.append(f"content/{relname}: not listed in docs/index.json, so not on the site; left out")
            continue
        generic.append((relname, f))
    for relname, f in generic:
        stem = re.sub(r"[^a-z0-9]+", "-", relname.lower()).strip("-")
        P(Page(f"more/{stem}.md", f"Content file: {relname}", None, f"A generic rendering of content/{relname}, a file this generator doesn't know yet.",
               human_note="unknown; no page on the site is known to show this file"))
    if generic:
        P(Page("more/INDEX.md", "More content files", None, "Generic renderings of content files the generator doesn't know yet.",
               human_note="none"))

    # ----- Render the bodies -----
    demo_by_n = {d["n"]: d for d in demos}

    # Demo pages, /d1 to /dN.
    for i, d in enumerate(demos):
        here = f"{d['slug']}.md"
        pg = b.pages[here]
        lines = [d["what"], "", f"- **Status:** {d['status']}", f"- {b.build.get('as_of_line', '')}", ""]
        if d["slug"] == "d1" and b.d1:
            lines += d1_body(b, here)
        else:
            if d["what_this_is"]:
                lines += ["## What this is", "", d["what_this_is"], ""]
            lines += ["## The demo", ""]
            rec = b.inv.get("/d2")
            research = [(p, r) for p, r in sorted(b.inv.items()) if p.startswith("/d2#research-") and r.get("live") is True]
            if d["blocks"]:
                lines += render_blocks(b, here, d["blocks"])
            elif d["slug"] == "d2" and rec and research:
                lines += [f"The human page shows charts here. The site's inventory describes them as: “{rec.get('one_line', '')}” They're drawn from data this view doesn't carry, so open the human page to see them.", ""]
            else:
                lines += [d["pending"], ""]
            if d["slug"] == "d2" and research:
                lines += ["## The research itself", "",
                          "On the human page, Alex's research notes on Addvery follow, as he wrote them, each in a panel that opens. This view lists them; read them on the human page.", ""]
                for p, r in research:
                    lines.append(f"- [{esc_link(r.get('title', p))}]({live(p)}): {r.get('one_line', '')} About {r.get('total_min')} min on the site.")
                lines.append("")
        related = [p for p in posts if p.get("deliverable") == d["slug"]]
        if related:
            lines += ["## From the live feed", ""]
            for p in related:
                lines.append(f"- {b.link(here, f'feed/{p['id']}.md')} ({p['kind']}, {p['at'][11:16]} Prague): {post_desc(b, p)}")
            lines.append("")
        ents = [e for e in entries if e.get("deliverable") == d["slug"]]
        if ents:
            lines += ["## In the GTM demos list", ""]
            lines += [f"- {b.link(here, f'demos/{e['slug']}.md')}: {e['cover'].get('subtitle', '')}" for e in ents] + [""]
        pg.body = tidy(lines)
        foot = []
        if i + 1 < len(demos):
            nxt = demos[i + 1]
            foot.append("Next: " + b.link(here, f"{nxt['slug']}.md", f"Demo {nxt['n']}: {nxt['name']}"))
        if i > 0:
            prv = demos[i - 1]
            foot.append("Previous: " + b.link(here, f"{prv['slug']}.md", f"Demo {prv['n']}: {prv['name']}"))
        if status_post:
            foot.append(b.link(here, f"feed/{status_post['id']}.md", "All demos and their status"))
        foot.append(b.link(here, "index.md", "Agent view home"))
        pg.footer = foot

    # GTM demos entries, /demos and /demos/<slug>.
    here = "demos/INDEX.md"
    lines = [phrase("demos_sub"), ""]
    if entries:
        for e in entries:
            bits = [e["cover"].get("kicker", ""), fmt_date(str(e.get("date", "")))]
            if e.get("reading_minutes"):
                bits.append(f"{e['reading_minutes']} min read on the site")
            elif e.get("video"):
                bits.append("Video")
            if e.get("deliverable"):
                bits.append(f"Demo {e['deliverable'][1:]}")
            lines.append(f"- {b.link(here, f'demos/{e['slug']}.md')}: {e['cover'].get('subtitle', '')} ({' · '.join(x for x in bits if x)})")
        lines.append("")
    else:
        lines += ["No demos are published yet.", "", phrase("demos_empty"), ""]
    b.pages[here].body = tidy(lines)
    b.pages[here].footer = [b.link(here, "index.md", "Agent view home")]
    for e in entries:
        here = f"demos/{e['slug']}.md"
        cover = e["cover"]
        bits = [f"*{cover.get('kicker', '')}*", fmt_date(str(e.get("date", ""))), "by Alex Alderman"]
        if e.get("reading_minutes"):
            bits.append(f"{e['reading_minutes']} min read on the site")
        lines = [" · ".join(bits), "", f"**{cover.get('subtitle', '')}**", ""]
        if e.get("video"):
            v = e["video"]
            start = int(v.get("start") or 0)
            lines += [f"**Video:** [Watch it on YouTube](https://youtu.be/{v['youtube_id']}" + (f"?t={start})" if start else ")"), ""]
        lines += entry_body(b, e["body"])
        made = e.get("made")
        if isinstance(made, dict):
            what = "entry" if e.get("kind") == "video" else "post"
            mins = f"{made.get('minutes_talked')} minute{'' if made.get('minutes_talked') == 1 else 's'}"
            share = made.get("share_changed_by_alex")
            lead = (f"Alex talked this {what} through for {mins} ({made.get('words_spoken'):,} words). The blog pipeline drafted it "
                    f"from his dictation in his words, in {len(made.get('stages') or [])} checked stages ({made.get('words_drafted'):,} words)")
            lead += "." if share is None else f"; Alex edited and approved it, changing {share}% of the words."
            lines += ["", f"## How this {what} was made", "", lead, ""]
        pg = b.pages[here]
        pg.body = tidy(lines)
        foot = [b.link(here, "demos/INDEX.md", "All GTM demos")]
        if e.get("deliverable") and f"{e['deliverable']}.md" in b.pages:
            dd = next(x for x in demos if x["slug"] == e["deliverable"])
            foot.append(b.link(here, f"{dd['slug']}.md", f"Part of demo {dd['n']}: {dd['name']}"))
        foot.append(b.link(here, "index.md", "Agent view home"))
        pg.footer = foot

    # The feed.
    here = "feed/INDEX.md"
    lines = [b.feed.get("intro", ""), ""]
    carousel = (tp or {}).get("carousel") or {}
    if "SummaryCarousel" in home_src and is_text(carousel.get("heading")):
        # The summary cards the home page shows above the feed (app/welcome-data.ts summaryCards()).
        lines += [f"## {carousel['heading']}", "", carousel.get("intro", ""), ""]
        for p in posts:
            if p.get("summary") is True:
                lines.append(f"- {b.link(here, f'feed/{p['id']}.md')} ({p['at'][11:16]} Prague, {p['kind']}): {post_desc(b, p)}")
        lines += ["", "## Every post", ""]
    lines += ["Newest on top. Each post has its own file.", ""]
    for p in posts:
        lines.append(f"- {b.link(here, f'feed/{p['id']}.md')} ({p['at'][11:16]} Prague, {p['kind']}): {post_desc(b, p)}")
    b.pages[here].body = tidy(lines + [""])
    b.pages[here].footer = [b.link(here, "index.md", "Agent view home")]
    for i, p in enumerate(posts):
        here = f"feed/{p['id']}.md"
        pg = b.pages[here]
        meta = [f"**{p['kind']}**", f"{p['at'][11:16]} Prague, {fmt_date(p['at'], long=True)}"]
        if p.get("session"):
            meta.append(f"session {p['session']}")
        dd = next((x for x in demos if x["slug"] == p.get("deliverable")), None)
        if dd:
            meta.append(b.link(here, f"{dd['slug']}.md", f"Demo {dd['n']}: {dd['name']}"))
        lines = [" · ".join(meta), ""] + render_blocks(b, here, p.get("blocks") or [], pg.video_min)
        pg.body = tidy(lines)
        foot = []
        if i > 0:
            foot.append("Newer: " + b.link(here, f"feed/{posts[i - 1]['id']}.md"))
        if i + 1 < len(posts):
            foot.append("Older: " + b.link(here, f"feed/{posts[i + 1]['id']}.md"))
        foot += [b.link(here, "feed/INDEX.md", "All feed posts"), b.link(here, "index.md", "Agent view home")]
        pg.footer = foot

    # Stakeholder tracks, /for and /for/<slug>, behind the site's own gate.
    if gate["pages"]:
        here = "for/INDEX.md"
        gi = gate.get("grid_intro")
        if gi:
            lines = [f"## {gi['heading']}", ""] + [x for para in gi["paragraphs"] for x in (para, "")]
        else:
            lines = [f"## {phrase('for_title')}", "", phrase("for_lead"), ""]
        lines += ["## The pages", "", "Each page is that person's path through the demos the site picked for their role, in the site's order.", ""]
        for sp in gate["pages"]:
            titles = " and ".join(re.split(r"\s+·\s+", sp["title"]))
            lines.append(f"- {b.link(here, f'for/{sp['slug']}.md')}: {sp['name']}, {titles}. {sp['framing']}")
        lines += ["", phrase("for_note"), b.link(here, "privacy.md", gate["notice"]["privacy_label"]) + "." if "privacy.md" in b.pages else "", ""]
        b.pages[here].body = tidy(lines)
        b.pages[here].footer = [b.link(here, "index.md", "Agent view home")]
        post_by_id = {p["id"]: p for p in posts}
        for sp in gate["pages"]:
            here = f"for/{sp['slug']}.md"
            pg = b.pages[here]
            picked = [(demo_by_n[x["n"]], x["why"]) for x in sp["demos"] if x["n"] in demo_by_n]
            landing = sp.get("landing")
            lines = []
            if landing:
                lines += [landing["greeting"], "", "From Alex Alderman, applying to Addvery as a GTM engineer.", ""]
            lines += [f"**A page for {sp['name']}**, " + " and ".join(re.split(r"\s+·\s+", sp["title"])) + ".", ""]
            if not landing:
                lines += [sp["framing"], ""]
            if landing and landing["concerns"]:
                lines += ["## What I'm guessing you're concerned with", "", "Your likely questions, as I imagine you'd put them, and my answers.", ""]
                for c in landing["concerns"]:
                    lines += [f"### {c['q']}", "", (f"**{c['lead']}** " if c.get("lead") else "") + c["a"], ""]
            on_list = set()
            pg.reading, pg.reading_at = [], None
            if landing and landing["reading_list"]:
                lines += ["## Your reading list", "", phrase("reading_dek"), ""]
                pg.reading = landing["reading_list"]
                pg.reading_at = len(lines)  # filled in once every page has its word count
                lines += ["", ""]
                for link in landing["reading_list"]:
                    m = re.match(r"^(?:https://hire-me-hackathon\.vercel\.app)?/#post-(.+)$", link["href"])
                    if m:
                        on_list.add(m.group(1))
            if sp.get("opening"):
                o = sp["opening"]
                lines += ["## Where this started", "", o.get("before", ""), "", f"> “{o.get('quote', '')}”", ">"]
                lines += [f"> {o['quote_source']}" if o.get("quote_source") else ">", ""]
                if o.get("after"):
                    lines += [o["after"], ""]
            if sp.get("why_now"):
                w = sp["why_now"]
                lines += [f"## Why now: {w.get('heading') or 'The road to 1 billion CZK'}", ""]
                if w.get("how"):
                    lines += [w["how"], ""]
                if w.get("source"):
                    lines += [f"Source: {w['source']}", ""]
            lines += ["## What this means for your role", "", sp["note"], ""]
            demo_list = ", ".join(str(d["n"]) for d, _ in picked[:-1]) + (f" and {picked[-1][0]['n']}" if len(picked) > 1 else str(picked[0][0]["n"]) if picked else "")
            sources = sp.get("sources") or gate["notice"]["sources"]
            lines += ["**At a glance**", "", f"- For: {sp['label']}", f"- Demos: {demo_list}", f"- One ask: {sp['ask']['short']}", "", sources, ""]
            lines += ["## One ask", "", f"**{sp['ask']['heading']}**", "", sp["ask"]["body"], ""]
            lines += ["## The demos that matter most for you", "", "The path through the demos, in the order the page lists them.", ""]
            pg.track = [f"{d['slug']}.md" for d, _ in picked]
            pg.track_why = [why for _, why in picked]
            pg.track_at = len(lines)  # filled in once every page has its word count
            lines += ["", ""]
            moments = [post_by_id[m] for m in sp.get("moments") or [] if m in post_by_id and m not in on_list]
            if moments:
                lines += ["## Moments from the build", ""]
                for mp in moments:
                    ex = post_excerpt(mp)
                    lines.append(f"- {b.link(here, f'feed/{mp['id']}.md')} ({mp['kind']}, {mp['at'][11:16]} Prague)" + (f": {ex}" if ex else ""))
                lines.append("")
            if gate["about_me"]:
                lines += [f"## {gate['about_me']['heading']}", "", gate["about_me"]["text"], ""]
            n = gate["notice"]
            lines += [f"## {n['heading']}", "", f"{n['why']} {sources}", "",
                      f"**{n['removal']}** " + (b.link(here, "privacy.md", n["privacy_label"]) + "." if "privacy.md" in b.pages else ""), ""]
            pg.lines = lines
            pg.footer = [b.link(here, "for/INDEX.md", "All six pages"), b.link(here, "index.md", "Agent view home")]

    # Docs and privacy (verbatim, with the DoD-22 redactions).
    def redact(text: str, name: str) -> str:
        for pat in REDACTIONS:
            text, n = pat.subn(REDACTED, text)
            if n:
                b.notes.append(f"{name}: {n} phrase(s) redacted ({pat.pattern})")
        return text

    def md_doc(path: Path, name: str) -> tuple[str | None, str]:
        text = path.read_text(encoding="utf-8").replace("\r\n", "\n")
        text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
        m = re.match(r"^\s*# (.+)\n", text)
        title = m.group(1).strip() if m else None
        if m:
            text = text[m.end():]
        return title, redact(text, name)

    here = "docs/INDEX.md"
    lines = [f"The plan the agents work from, and the specs for the tooling, shared from the project's working files as of {docs_index.get('synced', '')} (Prague). The site's home page lists them too.", ""]
    for doc in docs_index.get("docs") or []:
        target = f"docs/{doc['slug']}.md"
        if target in b.pages:
            lines.append(f"- {b.link(here, target, doc['label'])}: {doc.get('blurb', '')}")
    b.pages[here].body = tidy(lines + [""])
    b.pages[here].footer = [b.link(here, "index.md", "Agent view home")]
    for doc in docs_index.get("docs") or []:
        here = f"docs/{doc['slug']}.md"
        if here not in b.pages:
            continue
        title, text = md_doc(CONTENT / "docs" / f"{doc['slug']}.md", f"content/docs/{doc['slug']}.md")
        pg = b.pages[here]
        if title:
            pg.title = title
        lead = f"*{doc['label']}, shared from the project’s working files as of {docs_index.get('synced', '')} {phrase('doc_lead')}*"
        pg.body = tidy([lead, "", text])
        pg.footer = [b.link(here, "docs/INDEX.md", "All docs"), b.link(here, "index.md", "Agent view home")]
    if "privacy.md" in b.pages:
        title, text = md_doc(CONTENT / "privacy.md", "content/privacy.md")
        pg = b.pages["privacy.md"]
        pg.title = title or pg.title
        pg.body = tidy([text])
        pg.footer = [b.link("privacy.md", "index.md", "Agent view home")]

    # About Alex, in the site's own words.
    here = "about.md"
    lines = ["Everything on this page is quoted from the live site, and each quote names the page it's on. Nothing here is added.", "",
             "## In one line", "", f"> “{phrase('hero_lead')}”", ">", f"> The site's own description, on every page's link preview, {url_link('/')}", ""]
    intro_copy = (tp or {}).get("intro") or {}
    if welcome_wired and is_text(intro_copy.get("headline")):
        lines += ["## On the home page", ""]
        for k in ("headline", "subline", "made_by"):
            if is_text(intro_copy.get(k)):
                lines += [f"> {intro_copy[k]}", ">"]
        lines += [f"> The welcome at the top of the home page, {url_link('/')}", ""]
    if gate["about_me"]:
        first = gate["pages"][0]["slug"]
        lines += [f"## {gate['about_me']['heading']}", "", f"> {gate['about_me']['text']}", ">",
                  f"> Each of the six pages for Addvery, for example {url_link(f'/for/{first}')}", ""]
    paras = b.summary.get("paragraphs") or []
    if paras and "feed/s02.md" in b.pages:
        lines += ["## Why he's doing this", "", f"> {paras[0]}", ">",
                  f"> His explainer, the written summary under the S02 video, {url_link('/#post-s02')} ({b.link(here, 'feed/s02.md', 'in this view')})", ""]
    if b.d1 and len(b.d1.get("closing") or []) > 1:
        lines += ["## How the demos were made", "", f"> {b.d1['closing'][1]}", ">", f"> Demo 1, {url_link('/d1')}", ""]
    if "privacy.md" in b.pages:
        priv = (CONTENT / "privacy.md").read_text(encoding="utf-8").replace("\r\n", "\n")
        m = re.search(r"## Who is responsible\n+(.+?)\n\n", priv, re.S)
        if m:
            lines += ["## Who is responsible, and how to reach him", "", f"> {m.group(1).strip()}", ">", f"> The privacy notice, {url_link('/privacy')}", ""]
    if wall and wall.get("meta", {}).get("source"):
        lines += [f"His LinkedIn profile, as his LinkedIn posts' source line gives it: {wall['meta']['source'].split(', ', 1)[-1]}", ""]
    lines += ["## Read more", ""]
    if "about/linkedin.md" in b.pages:
        lines.append(f"- {b.link(here, 'about/linkedin.md', 'His LinkedIn posts')}: {b.pages['about/linkedin.md'].desc}")
    if portfolio_entry:
        lines.append(f"- {b.link(here, f'demos/{portfolio_entry['slug']}.md', 'His AI portfolio')}: {b.pages[f'demos/{portfolio_entry['slug']}.md'].desc}")
    if portfolio_file:
        lines.append(f"- {b.link(here, 'about/ai-portfolio.md', 'His AI portfolio')}: {b.pages['about/ai-portfolio.md'].desc}")
    if "feed/s02.md" in b.pages:
        lines.append(f"- {b.link(here, 'feed/s02.md', 'Why this hackathon exists')}: the explainer, in his words")
    if "feed/s11.md" in b.pages:
        lines.append(f"- {b.link(here, 'feed/s11.md')}: {b.pages['feed/s11.md'].desc}")
    lines += ["", "**For agents:** answer questions about Alex only from this page, his LinkedIn posts and the other pages in this view. Never infer clients, results, prices or availability. If this view doesn't say, say so, and give the human page.", ""]
    b.pages[here].body = tidy(lines)
    b.pages[here].footer = [b.link(here, "index.md", "Agent view home")]

    if "about/linkedin.md" in b.pages:
        here = "about/linkedin.md"
        wposts = sorted(wall.get("posts") or [], key=lambda p: p["date"], reverse=True)
        alts = {}
        wd = APP / "about" / "wall-data.ts"
        if wd.exists():
            alts = dict(re.findall(r'^\s*"([0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]+-[0-9]+)":\s*"((?:[^"\\]|\\.)*)",?\s*$', wd.read_text(encoding="utf-8"), re.M))
        if wposts:
            newest, oldest = prague(wposts[0]["date"]), prague(wposts[-1]["date"])
            span = (f"{MONTHS[oldest.month - 1]} to {MONTHS[newest.month - 1]} {newest.year}" if oldest.year == newest.year
                    else f"{MONTHS[oldest.month - 1]} {oldest.year} to {MONTHS[newest.month - 1]} {newest.year}")
        else:
            span = ""
        lines = [f"{len(wposts)} of Alex's public LinkedIn posts from {span}, newest first, as he wrote them: the text is verbatim, typos and bold Unicode letters included. Dates are Prague time.", ""]
        if wall.get("meta", {}).get("source"):
            lines += [f"Source: {wall['meta']['source']}", ""]
        per_day: dict[str, int] = {}
        for p in wposts:
            k = prague(p["date"]).strftime("%Y-%m-%d")
            per_day[k] = per_day.get(k, 0) + 1
        for p in wposts:
            local = prague(p["date"])
            day = f"{local.day} {MONTHS[local.month - 1]} {local.year}"
            if per_day[local.strftime("%Y-%m-%d")] > 1:
                day += f", {local.strftime('%H:%M')}"
            lines += [f"## {day}", "", f"[The post on LinkedIn]({p['url']})"]
            counts = []
            if p.get("reactions"):
                counts.append(f"{p['reactions']} reactions")
            if p.get("comments"):
                counts.append(f"{p['comments']} comments")
            if counts:
                lines[-1] += " · " + " · ".join(counts)
            lines.append("")
            text = p.get("text") or ""
            fence = "````" if "```" in text else "```"
            lines += [fence + "text", text, fence, ""]
            imgs = p.get("images") or []
            for n, img in enumerate(imgs, 1):
                key = img.get("src", "").split("/")[-1].rsplit(".", 1)[0]
                alt = alts.get(key) or f"Image {n} of {len(imgs)} from the post."
                lines.append(f"- Image {n}: {alt}")
            if p.get("document"):
                lines.append(f"- A PDF carousel, “{p['document'].get('title', '')}”, which opens on LinkedIn.")
            if p.get("video"):
                lines.append(f"- A video{(': ' + p['video']['title']) if p['video'].get('title') else ''}, which plays on LinkedIn.")
            if imgs or p.get("document") or p.get("video"):
                lines.append("")
        b.pages[here].body = tidy(lines)
        b.pages[here].footer = [b.link(here, "about.md", "About Alex"), b.link(here, "index.md", "Agent view home")]

    if portfolio_file:
        here = "about/ai-portfolio.md"
        b.pages[here].body = tidy(entry_body(b, portfolio_file["body"]))
        b.pages[here].footer = [b.link(here, "about.md", "About Alex"), b.link(here, "index.md", "Agent view home")]

    # Generic renderings.
    for relname, f in generic:
        stem = re.sub(r"[^a-z0-9]+", "-", relname.lower()).strip("-")
        here = f"more/{stem}.md"
        pg = b.pages[here]
        lines = [f"`content/{relname}` is a content file this generator doesn't know yet, so it's shown here as it stands. It may not be on the live site.", ""]
        if f.suffix.lower() in (".md", ".txt"):
            data, body = front_matter(f.read_text(encoding="utf-8"))
            if (data and data.get("status") not in (None, "published")) or re.search(r"\[Alex", body):
                del b.pages[here]
                b.held.append(f"content/{relname}: looks like a draft, left out")
                continue
            lines += entry_body(b, body)
        elif f.suffix.lower() == ".json":
            data = read_json(f)
            if isinstance(data, dict) and (data.get("approved") is False or data.get("draft") is True
                                           or str(data.get("status", "published")).lower() in ("draft", "near-final", "sample")):
                del b.pages[here]
                b.held.append(f"content/{relname}: marked unapproved or draft, left out")
                continue
            lines += ["```json", json.dumps(data, ensure_ascii=False, indent=2), "```", ""]
        else:
            lines += [f"A {f.suffix or 'binary'} file of {f.stat().st_size} bytes; not rendered as text.", ""]
        b.notes.append(f"content/{relname}: unknown content file, rendered generically at agent/{here}")
        pg.body = tidy(lines)
        pg.footer = [b.link(here, "more/INDEX.md", "More content files"), b.link(here, "index.md", "Agent view home")]
    if "more/INDEX.md" in b.pages:
        here = "more/INDEX.md"
        items = [p for k, p in sorted(b.pages.items()) if k.startswith("more/") and k != here]
        b.pages[here].body = tidy([f"- {b.link(here, p.path)}: {p.desc}" for p in items] + [""])
        b.pages[here].footer = [b.link(here, "index.md", "Agent view home")]

    # Word counts for everything rendered so far (the stakeholder pages are finished just below).
    for pg in b.pages.values():
        if pg.body:
            pg.words = count_words(pg.body)

    def step(here: str, target: str, n: int, run_words: int, why: str | None = None) -> list[str]:
        pg = b.pages[target]
        line = f"{n}. {b.link(here, target)}: about {minutes(pg.words)} min"
        if n > 1:
            line += f" ({minutes(run_words)} so far)"
        line += "."
        out = [line, f"   {why or pg.desc}"]
        if pg.video_min:
            out.append(f"   For people: the human page adds a video of about {pg.video_min:g} min.")
        return out

    for sp in gate["pages"]:
        here = f"for/{sp['slug']}.md"
        pg = b.pages[here]
        block, run = [], 0
        for n, (target, why) in enumerate(zip(pg.track, pg.track_why), 1):
            run += b.pages[target].words
            block += step(here, target, n, run, why)
        block.append("")
        block.append(f"The {len(pg.track)} demos come to about {minutes(run)} min here.")
        pg.lines[pg.track_at:pg.track_at + 2] = block + [""]
        if pg.reading_at is not None:
            # The landing's reading list, with each link's minutes here (none for a link outside this view).
            rl, run, timed = [], 0, True
            for n, link in enumerate(pg.reading, 1):
                target = b.site_target(link["href"])
                line = f"{n}. {b.site_link(here, link['href'], link['title'])}"
                if target:
                    run += b.pages[target].words
                    line += f": about {minutes(b.pages[target].words)} min"
                    if n > 1 and timed:
                        line += f" ({minutes(run)} so far)"
                else:
                    timed = False
                rl.append(line)
            pg.lines[pg.reading_at:pg.reading_at + 2] = rl + [""]
        pg.body = tidy(pg.lines)
        pg.words = count_words(pg.body)

    # The time-based tracks: the site's own paths (content/time-paths.json) when it defines them,
    # resolved as app/welcome-data.ts resolves them; otherwise built from PRIORITY.
    post_by_id = {p["id"]: p for p in posts}

    def site_stop(path: str):
        if path == YOUR_PAGE:
            yp = (tp.get("intro") or {}).get("your_page") or {}
            choose = [p for p in yp.get("pages") or []
                      if isinstance(p, dict) and (b.inv.get(p.get("path")) or {}).get("live") and b.site_target(p["path"])]
            if not choose:
                return None
            return {"kind": "your-page", "label": yp.get("label", "Your page"), "site_min": yp.get("min"),
                    "pages": [(b.site_target(p["path"]), p.get("role", "")) for p in choose]}
        item = b.inv.get(path)
        if item:
            if not item.get("live"):
                b.notes.append(f"time-paths.json: {path} isn't live in content/inventory.json; left out (as on the site)")
                return None
            return {"kind": "link", "path": path, "title": item.get("title") or path, "line": item.get("one_line", ""),
                    "site_min": item.get("total_min"), "video": (item.get("video_min") or 0) >= 1}
        m = re.match(r"^/#post-(.+)$", path)
        post = post_by_id.get(m.group(1)) if m else None
        if post and not any(x.get("type") == "video" for x in post.get("blocks") or []):
            return {"kind": "link", "path": path, "title": post["title"], "line": post_desc(b, post), "site_min": None, "video": False}
        b.notes.append(f"time-paths.json: {path} isn't a live item in content/inventory.json; left out (as on the site)")
        return None

    def stop_words(s) -> int:
        if s["kind"] == "your-page":
            counts = [b.pages[t].words for t, _ in s["pages"]]
            return int(sum(counts) / len(counts) + 0.5)
        target = b.site_target(s["path"])
        return b.pages[target].words if target else 0

    def stop_lines(here: str, s, n: int, run: int) -> list[str]:
        own = minutes(stop_words(s))
        so_far = f" ({minutes(run)} so far)" if n > 1 else ""
        site = f" The site counts {s['site_min']} min" + (" of video" if s.get("video") else "") + "." if s.get("site_min") is not None else ""
        if s["kind"] == "your-page":
            out = [f"{n}. **{s['label']}**: about {own} min here, whichever page you pick{so_far}.{site}"]
            out += [f"   - {b.link(here, t)} ({role})" for t, role in s["pages"]]
            return out
        target = b.site_target(s["path"])
        name = f"[{esc_link(s['title'])}]({rel(here, target)})" if target else f"[{esc_link(s['title'])}]({live(s['path'])})"
        out = [f"{n}. {name}: about {own} min here{so_far}.{site}", f"   {oneline(s['line'])}"]
        pg = b.pages.get(target) if target else None
        if pg and pg.video_min and not s.get("video"):
            out.append(f"   For people: the human page adds a video of about {pg.video_min:g} min.")
        return out

    order = []
    for key in PRIORITY:
        if key == "@entries":
            order += [f"demos/{e['slug']}.md" for e in entries if f"demos/{e['slug']}.md" not in order]
        elif key in b.pages and key not in order:
            order.append(key)
    tracks = {}  # t -> list of stops
    for t in track_keys:
        if site_paths and str(t) in site_paths:
            stops = [s for s in (site_stop(p) for p in site_paths[str(t)] if isinstance(p, str)) if s]
        else:
            stops, total = [], 0
            for key in order:
                w = b.pages[key].words
                if total + w <= t * 1.2 * WPM:
                    stops.append({"kind": "page", "target": key})
                    total += w
        tracks[t] = stops

    def first_name(here: str, stops) -> str:
        if not stops:
            return ""
        s = stops[0]
        if s["kind"] == "page":
            return b.link(here, s["target"])
        if s["kind"] == "your-page":
            return s["label"]
        target = b.site_target(s["path"])
        return f"[{esc_link(s['title'])}]({rel(here, target)})" if target else s["title"]

    intros = {
        5: "The shortest useful read: why the project exists and what happened on the day.",
        10: "Why the project exists, what happened, and the first live demo.",
        20: "The story of the day, who Alex is, and the demos with the most to show.",
        60: "The full picture: the story, the demos, how the work ran, and the plan the agents work from.",
    }
    helper = ((tp or {}).get("intro") or {}).get("helper")
    for idx, t in enumerate(track_keys):
        here = f"tracks/{t}-min.md"
        stops = tracks[t]
        pg = b.pages[here]
        ch = choices.get(str(t)) if site_paths and str(t) in site_paths else None
        if ch:
            # The helper speaks to the time picker ("Pick one."); a track file keeps the rest of it.
            how = " ".join(s for s in re.split(r"(?<=[.!?])\s+", helper or "") if s and not s.startswith("Pick "))
            lines = [ch.get("promise", ""), "", "This is the site's own reading path for this time, item for item. " + how, ""]
        else:
            lines = [intros.get(t, f"About {t} minutes of reading, most important first."), "", phrase("reading_dek"), ""]
        run = 0
        site_total, site_timed = 0, True
        for n, s in enumerate(stops, 1):
            if s["kind"] == "page":
                run += b.pages[s["target"]].words
                lines += step(here, s["target"], n, run)
            else:
                run += stop_words(s)
                lines += stop_lines(here, s, n, run)
                if s.get("site_min") is None:
                    site_timed = False
                else:
                    site_total += s["site_min"]
        tail = f"All {len(stops)} come to about {minutes(run)} min of reading here, at {WPM} words a minute."
        if ch and site_timed:
            tail += f" The site counts {site_total} min, video included, at its own 230 words a minute."
        lines += ["", tail, ""]
        if "tracks/start-here.md" in b.pages:
            lines += [f"The plan the agents work from is one step away: {b.link(here, 'tracks/start-here.md', 'Start here')}.", ""]
        pg.body = tidy(lines)
        pg.words = count_words(pg.body)
        pg.desc = oneline((f"{ch.get('promise', '')} " if ch else "") + f"{len(stops)} steps, about {minutes(run)} min here.")
        pg.time_label = ch["time"] if ch and is_text(ch.get("time")) else f"{t} min"
        foot = []
        if idx + 1 < len(track_keys):
            foot.append("Longer: " + b.link(here, f"tracks/{track_keys[idx + 1]}-min.md"))
        if idx > 0:
            foot.append("Shorter: " + b.link(here, f"tracks/{track_keys[idx - 1]}-min.md"))
        foot += [b.link(here, "tracks/INDEX.md", "All tracks"), b.link(here, "index.md", "Agent view home")]
        pg.footer = foot

    if "tracks/start-here.md" in b.pages:
        here = "tracks/start-here.md"
        n = 0
        if old_start_box:
            lines = ["The home page's Start here box, as it stands:", "", f"> {phrase('start_new')} {phrase('start_watch')}{phrase('start_then')}", ""]
            if "feed/s02.md" in b.pages:
                n += 1
                lines.append(f"{n}. {b.link(here, 'feed/s02.md', 'Watch the 13-minute explainer')}: in this view, its written summary, about {minutes(b.pages['feed/s02.md'].words)} min.")
        else:
            lines = [f"The foot of the home page's welcome: “{tp['intro']['docs_lead']}”", ""]
        for doc in docs_index.get("docs") or []:
            target = f"docs/{doc['slug']}.md"
            if target in b.pages:
                n += 1
                lines.append(f"{n}. {b.link(here, target, doc['label'])}: {doc.get('blurb', '')} About {minutes(b.pages[target].words)} min.")
        lines.append("")
        b.pages[here].body = tidy(lines)
        b.pages[here].words = count_words(b.pages[here].body)
        b.pages[here].footer = [b.link(here, "tracks/INDEX.md", "All tracks"), b.link(here, "index.md", "Agent view home")]

    here = "tracks/INDEX.md"
    question = ((tp or {}).get("intro") or {}).get("question") if site_paths else None
    lines = ([f"## {question}", ""] if question else []) + [
        "Pick the one that fits your time. Each is a numbered reading list with the minutes each step takes to read here, at about 200 words a minute; video on the human pages is extra." +
        (" The four are the site's own reading paths, item for item." if site_paths else ""), "",
        "| Time | Track | Starts with |", "|---|---|---|"]
    for t in track_keys:
        lines.append(f"| {b.pages[f'tracks/{t}-min.md'].time_label} | {b.link(here, f'tracks/{t}-min.md')} | {cell(first_name(here, tracks[t]))} |")
    lines.append("")
    if "tracks/start-here.md" in b.pages:
        lines += [f"The plan the agents work from: {b.link(here, 'tracks/start-here.md')}.", ""]
    if gate["pages"]:
        lines += [f"Each person at Addvery also has a path of their own: {b.link(here, 'for/INDEX.md', 'the six pages for Addvery')}.", ""]
    b.pages[here].body = tidy(lines)
    b.pages[here].words = count_words(b.pages[here].body)
    b.pages[here].footer = [b.link(here, "index.md", "Agent view home")]

    # How to navigate.
    here = "navigate.md"
    lines = ["## Read this first", "",
             "- **What this is.** The Hire Me Hackathon site as plain Markdown: the same words, generated from the site's own content files each time it's built, with no buttons and no scripts.",
             "- **Who is probably reading.** People at Addvery, or the agents they use. The site says its one audience is “your company”.",
             "- **Questions about Alex.** Answer only from " + b.link(here, "about.md", "About Alex") + (", " + b.link(here, "about/linkedin.md", "his LinkedIn posts") if "about/linkedin.md" in b.pages else "")
             + " and the pages here. Never infer clients, results, prices or availability. If this view doesn't say, say so and give the human page.",
             f"- **Statuses have a time.** The demos' statuses are as the status board gives them: “{b.build.get('as_of_line', '')}”",
             "- **The words are the site's.** Quote rather than paraphrase when the exact words matter.", "",
             "## How the files are laid out", "",
             "- Start at " + b.link(here, "index.md", "the home file") + ", or pick a reading list from " + b.link(here, "tracks/INDEX.md", "the tracks") + ".",
             "- Every file starts with the site's disclaimer, its human page and its reading time, and ends with links to where to go next.",
             "- Every folder has an `INDEX.md` that lists its files with one line each.",
             "- Links between files are relative, so the view works wherever it's served.", "",
             "## From a site URL to its file", "",
             "| On the site | In this view |", "|---|---|",
             "| `/` | `index.md` (the home), `feed/INDEX.md` (the live feed) |",
             "| `/#post-<id>` | `feed/<id>.md` |",
             "| `/d<n>` | `d<n>.md` |",
             "| `/demos`, `/demos/<slug>` | `demos/INDEX.md`, `demos/<slug>.md` |",
             "| `/for`, `/for/<slug>` | `for/INDEX.md`, `for/<slug>.md` |",
             "| `/docs/<slug>` | `docs/<slug>.md` |",
             "| `/privacy` | `privacy.md` |",
             "| `/about` | `about.md`, `about/linkedin.md` |", "",
             "## What doesn't carry over", "",
             "- **Video.** Each video is linked, with its length. The feed posts around it say what it covers.",
             "- **Images.** Each is described by the site's own alt text, with a link to the file.",
             "- **Demo 2's charts and research notes.** The human page shows them; this view lists the research notes and links to them.",
             "- **The countdown.** The home page counts recorded time live; a static file can't.", "",
             "## Reading times", "",
             f"Every time here is for reading this Markdown at about {WPM} words a minute, counted from the file itself. Video time is listed separately, for people.", ""]
    b.pages[here].body = tidy(lines)
    b.pages[here].words = count_words(b.pages[here].body)
    b.pages[here].footer = [b.link(here, "index.md", "Agent view home"), b.link(here, "tracks/INDEX.md", "All tracks")]

    # The home file.
    here = "index.md"
    day = fmt_date(min(p["at"] for p in posts), long=True) if posts else ""
    tracks_table = ["| Time | Track | Starts with |", "|---|---|---|"]
    for t in track_keys:
        tracks_table.append(f"| {b.pages[f'tracks/{t}-min.md'].time_label} | {b.link(here, f'tracks/{t}-min.md')} | {cell(first_name(here, tracks[t]))} |")
    s0 = paras[0] if paras else ""
    background = next((s for s in re.split(r"(?<=[.!?])\s+", s0) if s.startswith("I come from")), "")
    intro = (tp or {}).get("intro") or {}
    welcome_words = [intro[k] for k in ("headline", "made_by") if welcome_wired and is_text(intro.get(k))]
    lines = [
        "A plain-Markdown copy of the Hire Me Hackathon site, for AI agents and the people who use them.", "",
        f"The site is Alex Alderman's job application to Addvery, a Czech CRM, data and AI consultancy, built live on {day}. In the site's words: “{phrase('hero_lead')}”", "",
    ]
    if welcome_words:
        lines += ["The home page opens: “" + " ".join(welcome_words) + "”", ""]
    lines += [
        "This view is generated from the site's own content files, so it says what the site says. Every file names its human page.", "",
        "## Paste this into your agent", "",
        "```text",
        f"Read {SITE}/llms.txt and follow its 10-minute track.",
        "Then tell me what Alex Alderman built, and where each demo stands.",
        "```", "",
        f"Already reading this file? Start with {b.link(here, 'tracks/5-min.md', 'the 5-minute track')}.", "",
        "## Rather just read? The project in five lines", "",
        "- Alex is applying to Addvery as a GTM engineer, and this site is the application.",
        "- Instead of a CV, he spent 12 hours of recorded time building, in public, what a GTM engineer builds.",
        "- He directs and decides; AI agents in background Claude Code sessions, each with one job, do the work and message each other.",
        f"- {len(demos)} demos, each with a page and a status that updates as the work moves.",
        f"- The live feed logs the day, newest first: {len(posts)} posts so far.", "",
        "## Pick a track", "",
    ] + tracks_table + [""]
    if site_paths:
        lines += ["These are the site's own reading paths for each time, item for item.", ""]
    lines += [(f"The plan the agents work from: {b.link(here, 'tracks/start-here.md', 'Start here')}. " if "tracks/start-here.md" in b.pages else "")
              + f"All tracks: {b.link(here, 'tracks/INDEX.md', 'tracks/INDEX.md')}.", ""]
    lines += ["## Who Alex is", ""]
    if gate["about_me"]:
        lines += [f"In his words, on the pages for Addvery: “{gate['about_me']['text']}”", ""]
    if background:
        lines += [f"From his explainer: “{background}”", ""]
    lines += [f"More, all quoted from the site: {b.link(here, 'about.md', 'About Alex')}" + (f", and {b.link(here, 'about/linkedin.md', 'his LinkedIn posts')}" if "about/linkedin.md" in b.pages else "") + ".", ""]
    lines += ["## How to navigate", "",
              "- Every file starts with the site's disclaimer, its human page and its reading time, and ends with where to go next.",
              "- File paths follow the site's URLs: `/d3` is `d3.md`, `/for/ceo` is `for/ceo.md`, a feed post `/#post-s02` is `feed/s02.md`.",
              "- Every folder has an `INDEX.md`.",
              f"- The rules for answering questions about Alex, and what doesn't carry over: {b.link(here, 'navigate.md', 'How to navigate')}.", "",
              "## The demos", "", f"{b.build.get('as_of_line', '')}", ""]
    for d in demos:
        lines.append(f"- {b.link(here, f'{d['slug']}.md')}: {d['status']}")
    lines += ["", f"Written-up entries: {b.link(here, 'demos/INDEX.md', 'the GTM demos list')}.", ""]
    if gate["pages"]:
        lines += ["## For Addvery", "", f"One page for each of {len(gate['pages'])} people at Addvery, each with its own path through the demos:", ""]
        lines += [f"- {b.link(here, f'for/{sp['slug']}.md')}" for sp in gate["pages"]] + [""]
    lines += ["## Where things are", "", "```text",
              "llms.txt                 the map, at the site root",
              "agent/",
              "  index.md               this file",
              "  navigate.md            how to move around, and how to answer questions about Alex",
              "  about.md               who Alex is, in the site's own words"]
    if "about/linkedin.md" in b.pages:
        lines.append("  about/linkedin.md      his LinkedIn posts, verbatim")
    if portfolio_file:
        lines.append("  about/ai-portfolio.md  his AI portfolio")
    demo_files = f"  d1.md ... d{demos[-1]['n']}.md" if demos else ""
    lines += ["  tracks/                reading lists by time: 5, 10, 20 and 60 minutes, and Start here",
              f"{demo_files}{' ' * max(1, 25 - len(demo_files))}one file per demo, with its status" if demos else "",
              "  demos/                 the GTM demos list, one file per published entry",
              "  feed/                  the live feed, one file per post"]
    if gate["pages"]:
        lines.append("  for/                   one page per person at Addvery")
    lines += ["  docs/                  the charter and the specs"]
    if "privacy.md" in b.pages:
        lines.append("  privacy.md             the privacy notice")
    if "more/INDEX.md" in b.pages:
        lines.append("  more/                  content files the generator doesn't know yet")
    lines += ["```", "", "## Who made this", "", f"{phrase('footer_credit')} This view is generated from the site's content files by a script, each time the site is built.", ""]
    b.pages[here].body = tidy([x for x in lines if x is not None])
    b.pages[here].words = count_words(b.pages[here].body)
    b.pages[here].footer = [b.link(here, "navigate.md", "How to navigate"), b.link(here, "tracks/INDEX.md", "All tracks"), b.link(here, "about.md", "About Alex")]

    # Every page's final text.
    files = {f"{AGENT}/{path}": pg.text() for path, pg in sorted(b.pages.items())}

    # llms.txt, at the out root.
    def L(path: str, title: str | None = None, desc: str | None = None) -> str:
        pg = b.pages[path]
        return f"- [{esc_link(title or pg.title)}]({AGENT}/{path}): {oneline(desc if desc is not None else pg.desc)}"

    llms = [
        "# Hire Me Hackathon: agent view", "",
        f"> Alex Alderman's job application to Addvery, a Czech CRM, data and AI consultancy: in the site's words, “{phrase('hero_lead')}” "
        f"This is the site at {SITE} as plain Markdown, generated from its own content files so it says what the site says. {phrase('disclaimer')}", "",
        "Start with the home file, or pick a track by the time you have. Every file names its human page. Links here are relative to this file.", "",
        "## What this is", "", L("index.md", "Agent view home"), "",
        "## Who Alex is", "", L("about.md"), "",
        "## How to navigate", "", L("navigate.md"), "",
        "## Time-based tracks", "",
    ]
    llms += [L(f"tracks/{t}-min.md") for t in track_keys]
    if "tracks/start-here.md" in b.pages:
        llms.append(L("tracks/start-here.md"))
    llms += [L("tracks/INDEX.md", "All tracks"), ""]
    llms += ["## Demos", ""] + [L(f"{d['slug']}.md") for d in demos] + [L("demos/INDEX.md", "GTM demos list")]
    llms += [L(f"demos/{e['slug']}.md") for e in entries] + [""]
    if gate["pages"]:
        llms += ["## Stakeholder tracks", "", L("for/INDEX.md")]
        llms += [L(f"for/{sp['slug']}.md") for sp in gate["pages"]] + [""]
    llms += ["## About Alex", ""]
    if "about/linkedin.md" in b.pages:
        llms.append(L("about/linkedin.md", "His LinkedIn posts"))
    if portfolio_entry:
        llms.append(L(f"demos/{portfolio_entry['slug']}.md", "His AI portfolio"))
    if portfolio_file:
        llms.append(L("about/ai-portfolio.md", "His AI portfolio"))
    llms += [L("feed/s02.md", "Why this hackathon exists", "His explainer, in his own words.") if "feed/s02.md" in b.pages else "", ""]
    llms += ["## Project docs", "", L("docs/INDEX.md")] + [L(f"docs/{d['slug']}.md") for d in docs_index.get("docs") or [] if f"docs/{d['slug']}.md" in b.pages] + [""]
    llms += ["## Optional", "", L("feed/INDEX.md", "The live feed")]
    llms += [L(f"feed/{p['id']}.md") for p in posts]
    if "privacy.md" in b.pages:
        llms.append(L("privacy.md"))
    if "more/INDEX.md" in b.pages:
        llms.append(L("more/INDEX.md"))
    files["llms.txt"] = tidy(llms) + "\n"
    files = {k: (v if v.endswith("\n") else v + "\n") for k, v in files.items()}
    return files, b


# ---------- Checks ----------

def strip_code(text: str) -> str:
    text = re.sub(r"^(`{3,})[^\n]*\n.*?^\1\s*$", "", text, flags=re.S | re.M)
    return re.sub(r"`[^`\n]*`", "", text)


def check(files: dict[str, str], b: Build) -> list[str]:
    problems: list[str] = []
    names = set(files)
    tag = re.compile(r"<[A-Za-z!/?][^>\n]*>")
    link = re.compile(r"\]\(([^)\s]+)\)")
    site_url = re.compile(re.escape(SITE) + r"([^\s)\]>\"'`]*)")
    statics_ok = {s for s in b.static_urls if (PUBLIC / s.lstrip("/")).exists()}
    for name, text in sorted(files.items()):
        prose = strip_code(text)
        for m in tag.finditer(prose):
            problems.append(f"{name}: HTML-like tag")
        for m in link.finditer(prose):
            target = m.group(1)
            if re.match(r"^[a-z][a-z0-9+.-]*:", target, re.I) or target.startswith("#"):
                continue
            resolved = posixpath.normpath(posixpath.join(posixpath.dirname(name), target))
            if resolved not in names:
                problems.append(f"{name}: relative link to a missing file: {target}")
        for m in site_url.finditer(text):
            path = m.group(1).rstrip(".,;:") or "/"
            path = path.split("?")[0]
            if path in b.valid_live or path.rstrip("/") in b.valid_live or (path == "/" and "/" in b.valid_live):
                continue
            if path in statics_ok:
                continue
            if path.endswith(".txt") and path == "/llms.txt":
                continue
            problems.append(f"{name}: live URL with no route: {SITE}{path}")
        problems += scan(name, text)
    return problems


def prepare_out(out: Path) -> None:
    if out.exists():
        if not out.is_dir():
            raise Fail(f"{out} exists and isn't a folder")
        extra = sorted(p.name for p in out.iterdir() if p.name not in ("llms.txt", AGENT))
        if extra:
            raise Fail(f"refusing to wipe {out}: it holds files this generator didn't write ({', '.join(extra[:5])})")
        if (out / "llms.txt").exists():
            (out / "llms.txt").unlink()
        if (out / AGENT).exists():
            shutil.rmtree(out / AGENT)
    out.mkdir(parents=True, exist_ok=True)


def main(argv=None) -> int:
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except (AttributeError, ValueError):
        pass
    ap = argparse.ArgumentParser(description="Write the agent view (llms.txt and agent/**/*.md) from the site's content files.")
    ap.add_argument("--out", type=Path, default=DEFAULT_OUT, help=f"output folder (default: {DEFAULT_OUT})")
    args = ap.parse_args(argv)
    out = args.out.resolve()
    try:
        files, b = generate()
    except (OSError, ValueError, KeyError, Fail) as e:
        print(f"Not written: couldn't read the site's content ({type(e).__name__}: {e})", file=sys.stderr)
        return 2
    problems = [f"drift: {p}" for p in _phrase_problems] + check(files, b)
    if problems:
        print(f"Not written: {len(problems)} problem(s). Fix them, then rerun:", file=sys.stderr)
        for p in problems:
            print(f"  {p}", file=sys.stderr)
        return 1
    try:
        prepare_out(out)
    except Fail as e:
        print(f"Not written: {e}", file=sys.stderr)
        return 1
    for name, text in sorted(files.items()):
        path = out / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding="utf-8", newline="\n")
    # The final scan, on the files as written: anything that fails it takes the whole output down.
    written = {p.relative_to(out).as_posix(): p.read_text(encoding="utf-8") for p in sorted(out.rglob("*")) if p.is_file()}
    final = [x for name, text in written.items() for x in scan(name, text)]
    if final or set(written) != set(files):
        prepare_out(out)
        print("Removed the output: the final scan failed:", file=sys.stderr)
        for p in final or ["the files on disk don't match what was generated"]:
            print(f"  {p}", file=sys.stderr)
        return 1
    words = sum(count_words(t) for t in files.values())
    print(f"Wrote {len(files)} files ({words} words) to {out}")
    for h in b.held:
        print(f"  held back: {h}")
    for n in b.notes:
        print(f"  note: {n}")
    print("  checks: links resolve, live URLs match routes, no HTML, safety scan clean")
    return 0


if __name__ == "__main__":
    sys.exit(main())
