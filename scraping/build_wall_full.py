r"""Build the full LinkedIn wall: every post Alex wrote in the scrape, with all its media.

Run from anywhere:  python -I scraping\build_wall_full.py
Reads   scraping\draft\wall\posts-raw.json   (the Apify dataset, 94 posts, git-ignored)
        scraping\draft\wall\picks.json       (the 34 posts on the current wall, with "why" notes)
        scraping\draft\wall\meta.json
Writes  scraping\site\linkedin-wall\wall-full.json
        scraping\site\linkedin-wall\img\<post id>-<n>.<ext>

Alt text: scraping\site\linkedin-walllt.json maps each image file name to its alt text and is merged
into every image's "alt" field. Edit alt.json, not the output JSON.

Same record shape as wall.json (build_wall.py), plus:
  images         every image on the post as local files, each with a "kind":
                 image, document-page, video-cover, link-preview, or quoted
                 (images of Alex's own older post that this post quotes)
  kept           true for every post (Alex, 2 Nov 20:45: "I want everything in there. All of them.")
  dropped_reason why the 18:1x picking subagent or the S-D1 reviewer left it off wall.json, else null
  quote_of       for a quote post: what it quotes (Alex's own text and images, or only a URL)
  link           the article card on the post, if any
  poll           the poll question and options, if any (no votes)
  image_missing  a note when the text points at a visual the scrape didn't return, else null

Post text is verbatim. Media already in img\ is not downloaded again, so a rerun after
LinkedIn's links expire (about 9 to 18 Nov 2026) still works for every file already fetched.
"""
import json
import os
import sys
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
WALL = os.path.join(HERE, "draft", "wall")
OUT_DIR = os.path.join(HERE, "site", "linkedin-wall")
IMG_DIR = os.path.join(OUT_DIR, "img")
ME = "alex-the-ai-instructor"

MAX_LINES = 3
MAX_CHARS = 210

# Why each post was left off wall.json. The picking subagent saved only counts in
# picks.json; its per-post lists were recovered from its helper script in the session
# transcript (scraping session bbc4d635, subagent a7febf7c0711cf86f, 2 Nov 18:1x).
DROPPED = {}
for _reason, _ids in {
    "thin": [
        "7456983114364383232", "7457326466142265344", "7457844971912495104", "7458425504912723968",
        "7461364830793457665", "7461400059692208128", "7461786550209544192", "7461787275841110016",
        "7462048107791396864", "7463138875029409792", "7465440521860288512", "7470821173912662016",
        "7476575376857579520", "7489759333023596545", "7490687952486952960", "7492854357743300608",
        "7493545340227289089", "7494491757594906624", "7498989647151214592", "7499736569302634496",
        "7500787226344271872", "7501521837982642176", "7506308973780721664", "7507110049408901120",
        "7514431768180056064", "7515662472188665856", "7515811762538143744", "7515830862135853058",
        "7517660148203712512", "7518046492155301888", "7521304968658677760",
    ],
    "edgy": [
        "7457901045457981440", "7458779593043283968", "7459203183605657600", "7459992630316244993",
        "7460380693827567616", "7460575882106171392", "7471483407450173442", "7493930154226970625",
        "7508613444393185280", "7515826554686529536", "7516521163859345409", "7516966952024879104",
        "7517618031930462208", "7517873252996775937", "7518947815943827456", "7520752692877770752",
        "7522341978378874880",
    ],
    "duplicate": [
        "7457853341524492289", "7459177920373186560", "7459852384064688128", "7460214763776548864",
        "7462392891672309761", "7471572477475782657", "7487826656666062848", "7489340559023812609",
        "7514048297242853376", "7517649390535143424",
    ],
    "awkward": ["7517294736366538752"],
    "reviewer": ["7460673722161618945"],
}.items():
    for _id in _ids:
        DROPPED[_id] = _reason

# The subagent's "why" for the one post it picked that the S-D1 reviewer then dropped.
EXTRA_WHY = {
    "7460673722161618945": "Works mostly in Claude Code, and shares his honest routine for bouncing back from bad sessions",
}
REVIEWER_NOTE = "one uncensored f-word; the wall faces Addvery leadership (S-D1, 18:4x)"

# Posts whose text points at a visual the scrape returned nothing for: none, as of 2 Nov 20:5x.
# Three suspects were checked against LinkedIn's public post page (one guest GET each, no login):
# 24 Aug 7497553003751809024 (captcha, "this change 🔻"), 4 Sep 7501521837982642176 ("Meta: ... 1.3")
# and 25 Sep 7509209981741662209 ("/context ... 172 tools"). All three serve LinkedIn's generic
# text-only og:image, while two control posts with images serve their own feedshare image there.
IMAGE_MISSING = {}

ALT_PATH = os.path.join(OUT_DIR, "alt.json")
ALT = json.load(open(ALT_PATH, encoding="utf-8")) if os.path.exists(ALT_PATH) else {}

EXT = {"image/jpeg": ".jpg", "image/jpg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif"}


def collapse(text):
    lines = text.split("\n")
    head = "\n".join(lines[:MAX_LINES])
    cut = head if len(head) <= MAX_CHARS else head[:MAX_CHARS]
    if len(cut) < len(text):
        if len(cut) == MAX_CHARS and not text[MAX_CHARS:MAX_CHARS + 1].isspace():
            space = max(cut.rfind(" "), cut.rfind("\n"))
            if space > MAX_CHARS // 2:
                cut = cut[:space]
        return cut.rstrip() + "…", True
    return text, False


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read(), (r.headers.get("Content-Type") or "").split(";")[0].strip().lower()
        except Exception as e:  # noqa: BLE001 - retried, then reported
            err = e
    raise err


class Media:
    def __init__(self):
        self.fetched = self.reused = self.bytes = 0
        self.failed = []
        self.existing = {}
        for name in os.listdir(IMG_DIR):
            stem, _ = os.path.splitext(name)
            self.existing[stem] = name

    def save(self, url, stem):
        """Download url to img\\<stem>.<ext> unless it's already there; return the file name."""
        if stem in self.existing:
            self.reused += 1
            return self.existing[stem]
        if not url:
            self.failed.append(f"{stem}: no link left and no local copy")
            return None
        try:
            data, ctype = get(url)
        except Exception as e:  # noqa: BLE001
            self.failed.append(f"{stem}: {e}")
            return None
        ext = EXT.get(ctype)
        if not ext:
            self.failed.append(f"{stem}: not an image ({ctype})")
            return None
        name = stem + ext
        with open(os.path.join(IMG_DIR, name), "wb") as f:
            f.write(data)
        self.existing[stem] = name
        self.fetched += 1
        self.bytes += len(data)
        return name


def doc_pages(doc):
    """Every page image of a document post, at the largest width up to 1400 px."""
    res = (doc.get("manifest") or {}).get("perResolutions") or []
    pick = [r for r in res if r.get("width", 0) <= 1400] or res
    if pick:
        best = max(pick, key=lambda r: r.get("width", 0))
        try:
            data, _ = get(best["imageManifestUrl"])
            pages = json.loads(data.decode("utf-8"))["pages"]
            return pages, best.get("width"), best.get("height")
        except Exception:  # noqa: BLE001 - fall back to the cover pages in the scrape
            pass
    cover = (doc.get("coverPages") or [{}])[0]
    return cover.get("imageUrls") or [], cover.get("width"), cover.get("height")


def main():
    raw = json.load(open(os.path.join(WALL, "posts-raw.json"), encoding="utf-8"))
    picks = {p["id"]: p for p in json.load(open(os.path.join(WALL, "picks.json"), encoding="utf-8"))["picks"]}
    borderline = {}
    for line in json.load(open(os.path.join(WALL, "picks.json"), encoding="utf-8"))["borderline"]:
        pid, _, note = line.partition(": ")
        borderline[pid] = note
    meta = json.load(open(os.path.join(WALL, "meta.json"), encoding="utf-8"))
    by_id = {p["id"]: p for p in raw}
    os.makedirs(IMG_DIR, exist_ok=True)
    media = Media()
    posts = []

    for p in raw:
        pid = p["id"]
        assert (p.get("author") or {}).get("publicIdentifier") == ME, pid
        text = p.get("content") or ""
        collapsed, has_more = collapse(text)
        images, n = [], 0

        def add(url, kind, width=None, height=None):
            nonlocal n
            n += 1
            name = media.save(url, f"{pid}-{n}")
            if name:
                images.append({"src": f"img/{name}", "width": width, "height": height, "kind": kind, "alt": ALT.get(name)})
            return name

        for im in p.get("postImages") or []:
            add(im["url"], "image", im.get("width"), im.get("height"))

        document = None
        doc = p.get("document")
        if isinstance(doc, dict):
            urls, w, h = doc_pages(doc)
            total = doc.get("totalPageCount") or 0
            if len(urls) < total:  # manifest link expired: the cached page files still count
                urls = list(urls) + [None] * (total - len(urls))
            for u in urls:
                add(u, "document-page", w, h)
            document = {"title": doc.get("title"), "pages": doc.get("totalPageCount") or len(urls),
                        "note": "a PDF carousel: its pages are in images (kind document-page); open the original on LinkedIn via url"}

        video = None
        vid = p.get("postVideo")
        if isinstance(vid, dict) and vid.get("thumbnailUrl"):
            name = add(vid["thumbnailUrl"], "video-cover")
            video = {"cover": f"img/{name}" if name else None, "note": "a video post: play it on LinkedIn via url"}

        link = None
        art = p.get("article")
        if isinstance(art, dict):
            im = art.get("image") or {}
            if im.get("url"):
                add(im["url"], "link-preview", im.get("width"), im.get("height"))
            link = {"title": art.get("title"), "site": art.get("subtitle"), "url": art.get("link")}

        poll = None
        if isinstance(p.get("poll"), dict):
            poll = {"question": p["poll"].get("question"),
                    "options": [o.get("option") for o in p["poll"].get("pollOptions") or []]}

        quote_of = None
        rp = p.get("repost")
        if isinstance(rp, dict):
            a = rp.get("author") or {}
            mine = a.get("publicIdentifier") == ME
            quote_of = {
                "id": rp.get("id"),
                "url": rp.get("linkedinUrl"),
                "by_alex": mine,
                # Companies are named; other people are not (only Alex's own posts go in these files).
                "author": "Alex Alderman" if mine else (a.get("name") if a.get("type") == "company" else None),
            }
            if mine:
                quote_of["date"] = (rp.get("postedAt") or {}).get("date")
                quote_of["in_wall"] = rp.get("id") in by_id
                if not quote_of["in_wall"]:
                    quote_of["text"] = rp.get("content") or ""
                    for im in rp.get("postImages") or []:
                        add(im["url"], "quoted", im.get("width"), im.get("height"))
            else:
                kinds = [k for k, f in (("images", "postImages"), ("video", "postVideo"),
                                        ("document", "document"), ("link card", "article")) if rp.get(f)]
                quote_of["media_not_copied"] = kinds or None

        reason = DROPPED.get(pid)
        if reason == "reviewer":
            dropped = f"picked, then dropped by the S-D1 reviewer: {REVIEWER_NOTE}"
        elif reason:
            dropped = reason + (f": {borderline[pid]}" if pid in borderline else "")
        else:
            dropped = None
        assert (pid in picks) != bool(reason), pid

        e = p.get("engagement") or {}
        posts.append({
            "id": pid,
            "date": p["postedAt"]["date"],
            "url": p["linkedinUrl"],
            "text": text,
            "collapsed": collapsed,
            "has_more": has_more,
            "images": images,
            "document": document,
            "video": video,
            "reactions": e.get("likes"),
            "comments": e.get("comments"),
            "why": (picks.get(pid) or {}).get("why") or EXTRA_WHY.get(pid),
            "kept": True,
            "dropped_reason": dropped,
            "quote_of": quote_of,
            "link": link,
            "poll": poll,
            "image_missing": IMAGE_MISSING.get(pid),
        })

    posts.sort(key=lambda x: x["date"], reverse=True)
    counts = {
        "posts": len(posts),
        "kept": sum(1 for x in posts if x["kept"] is True),
        "held": sum(1 for x in posts if x["kept"] is None),
        "on_wall_json": sum(1 for x in posts if x["dropped_reason"] is None),
        "with_images": sum(1 for x in posts if x["images"]),
        "image_files": sum(len(x["images"]) for x in posts),
        "image_missing": sum(1 for x in posts if x["image_missing"]),
        "quote_posts": sum(1 for x in posts if x["quote_of"]),
    }
    meta["count"] = len(posts)
    meta["counts"] = counts
    meta["order"] = "newest first"
    meta["selected_by"] = ("Every post Alex wrote in the scrape, all kept (Alex, 2 Nov 20:45: \"I want everything "
                           "in there. All of them. Some of them are edgy, that's fine. I have personality.\"). "
                           "Quote posts are in: each carries his own text.")
    meta["rules"]["why"] = "an internal note on why the subagent picked a post: for the build, not for display; null if it wasn't picked"
    meta["rules"]["dropped_reason"] = "why the post was left off wall.json on 2 Nov 18:1x: for the build, not for display"
    meta["rules"]["images"] = ("every image on the post, downloaded into img/ as <post id>-<n>.<ext> (LinkedIn's links "
                               "expire): photos and screenshots, every page of a PDF carousel, the video cover, the link "
                               "card's preview, and the images of Alex's own older post when he quotes it")
    meta["rules"]["quote_of"] = ("a quote post's source: Alex's own text and images when he quotes himself; otherwise only "
                                 "its URL, and its author's name when that's a company")
    out = {"meta": meta, "posts": posts}
    with open(os.path.join(OUT_DIR, "wall-full.json"), "w", encoding="utf-8", newline="\n") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(json.dumps(counts))
    print(f"downloaded {media.fetched} files ({media.bytes // 1024} KB), reused {media.reused}, failed {len(media.failed)}")
    for line in media.failed:
        print("  FAILED", line)


if __name__ == "__main__":
    sys.exit(main())
