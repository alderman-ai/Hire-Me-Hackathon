r"""Build Alex's LinkedIn wall data file from the scraped posts and the picks.

Run from scraping\:  python -I build_wall.py
Reads   draft\wall\posts-raw.json  (Apify dataset, git-ignored)
        draft\wall\picks.json      ({"picks": [{"id", "date", "why"}]})
Writes  site\linkedin-wall\wall.json and site\linkedin-wall\img\*.jpg

Post text is copied verbatim: never rewritten or trimmed. "collapsed" is
the opening LinkedIn shows before "...more": up to 3 lines and 210
characters, cut at a word boundary.
"""
import json
import os
import sys
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, "draft", "wall", "posts-raw.json")
PICKS = os.path.join(HERE, "draft", "wall", "picks.json")
OUT_DIR = os.path.join(HERE, "site", "linkedin-wall")
IMG_DIR = os.path.join(OUT_DIR, "img")

MAX_LINES = 3
MAX_CHARS = 210


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


def fetch(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
        ctype = r.headers.get("Content-Type", "")
    ext = ".png" if "png" in ctype else ".webp" if "webp" in ctype else ".jpg"
    path = path + ext
    with open(path, "wb") as f:
        f.write(data)
    return os.path.basename(path), len(data)


def main():
    raw = {p["id"]: p for p in json.load(open(RAW, encoding="utf-8"))}
    picks = json.load(open(PICKS, encoding="utf-8"))["picks"]
    os.makedirs(IMG_DIR, exist_ok=True)
    posts, total_bytes = [], 0
    for pick in picks:
        p = raw[pick["id"]]
        text = p.get("content") or ""
        collapsed, has_more = collapse(text)
        date = p["postedAt"]["date"]
        images = []
        for n, im in enumerate(p.get("postImages") or [], 1):
            stem = os.path.join(IMG_DIR, f"{date[:10]}-{p['id']}-{n}")
            name, size = fetch(im["url"], stem)
            total_bytes += size
            images.append({"src": f"img/{name}", "width": im.get("width"), "height": im.get("height")})
        doc = p.get("document")
        vid = p.get("postVideo")
        video = None
        if isinstance(vid, dict) and vid.get("thumbnailUrl"):
            name, size = fetch(vid["thumbnailUrl"], os.path.join(IMG_DIR, f"{date[:10]}-{p['id']}-video"))
            total_bytes += size
            video = {"cover": f"img/{name}", "note": "a video post: play it on LinkedIn via url"}
        e = p.get("engagement") or {}
        posts.append({
            "id": p["id"],
            "date": date,
            "url": p["linkedinUrl"],
            "text": text,
            "collapsed": collapsed,
            "has_more": has_more,
            "images": images,
            "document": ({"title": doc.get("title"), "note": "a PDF carousel: open it on LinkedIn via url"} if isinstance(doc, dict) else None),
            "video": video,
            "reactions": e.get("likes"),
            "comments": e.get("comments"),
            "why": pick["why"],
        })
    posts.sort(key=lambda x: x["date"])
    meta = json.load(open(os.path.join(HERE, "draft", "wall", "meta.json"), encoding="utf-8"))
    meta["count"] = len(posts)
    out = {"meta": meta, "posts": posts}
    with open(os.path.join(OUT_DIR, "wall.json"), "w", encoding="utf-8", newline="\n") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(f"{len(posts)} posts, {sum(len(x['images']) for x in posts)} images, {total_bytes // 1024} KB")


if __name__ == "__main__":
    sys.exit(main())
