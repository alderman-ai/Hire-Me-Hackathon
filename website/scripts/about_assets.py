"""Copy in the material for /about (app/about/page.tsx) from the sessions that made it.

  python scripts\\about_assets.py

Rerun it whenever a source changes. It uses exactly the picked files (Alex's sync rule, 2 Nov) and only
resizes and re-encodes them: no crops, no edits, nothing generated. Any crop the page shows is CSS.

  local/about/about-me.md       Alex's About-me copy, verbatim, from linkedin-content/local/about/.
                                Git-ignored (local/), still deployed: it paraphrases Addvery's job ad
                                (from Addvery Research), which SPEC.md section 3 keeps out of the repo.
  content/linkedin-wall.json    scraping/site/linkedin-wall/wall.json without the internal `why` field,
                                each image's src pointed at its WebP copy below. Tracked: they're Alex's
                                own public posts. The text is never touched.
  public/about/wall/*.webp      the wall's images (scraping/site/linkedin-wall/img/), at most 1080 px wide.
  public/about/alex-headshot-{800,480}.webp   local/alex/photo/alex-headshot-full-v1.jpg, resized.
  public/about/alex-headshot-og.jpg           the same, 600 px wide, for the link card (Satori can't
                                              read WebP; app/about/opengraph-image.tsx draws it).
  public/about/alderman-ai-stacked-logo-v1.svg   local/alex/brand/, copied as is.
  content/linkedin-wall-full.json   the full wall (all 94 posts, scraping/site/linkedin-wall/wall-full.json),
                                    without its internal fields; shown only when WALL_FULL=1 (page.tsx).
  public/about/wall-full/*.webp     its images, each at 1280 px (the dialog) and 640 px (the card).

  python scripts\\about_assets.py --wall-full    makes only the full wall's two outputs.

public/about/ is git-ignored and deploys from the working tree, like public/people/.
"""

import json
import shutil
from pathlib import Path

from PIL import Image

SITE = Path(__file__).resolve().parent.parent
ROOT = SITE.parent
OUT = SITE / "public" / "about"
WALL_SRC = ROOT / "scraping" / "site" / "linkedin-wall"
COPY_SRC = ROOT / "linkedin-content" / "local" / "about" / "about-me.md"
HEADSHOT = SITE / "local" / "alex" / "photo" / "alex-headshot-full-v1.jpg"
LOGO = SITE / "local" / "alex" / "brand" / "alderman-ai-stacked-logo-v1.svg"


def report(path: Path, extra: str = "") -> None:
    print(f"{path.relative_to(SITE)}  {extra}{path.stat().st_size:,} bytes")


def resized(im: Image.Image, width: int) -> Image.Image:
    im = im.convert("RGB")
    if im.width <= width:
        return im
    return im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)


def save_webp(im: Image.Image, path: Path, quality: int = 82) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "WEBP", quality=quality, method=6)
    report(path, f"{im.width}x{im.height}  ")


def copy_text() -> None:
    dest = SITE / "local" / "about" / "about-me.md"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(COPY_SRC.read_bytes())
    report(dest)


def headshot() -> None:
    with Image.open(HEADSHOT) as im:
        save_webp(resized(im, 800), OUT / "alex-headshot-800.webp")
        save_webp(resized(im, 480), OUT / "alex-headshot-480.webp")
        og = resized(im, 600)
        og.save(OUT / "alex-headshot-og.jpg", "JPEG", quality=86, optimize=True)
        report(OUT / "alex-headshot-og.jpg", f"{og.width}x{og.height}  ")


def logo() -> None:
    dest = OUT / LOGO.name
    shutil.copyfile(LOGO, dest)
    report(dest)


def wall() -> None:
    data = json.loads((WALL_SRC / "wall.json").read_text(encoding="utf-8"))
    for post in data["posts"]:
        post.pop("why", None)
        for img in post.get("images") or []:
            src = WALL_SRC / img["src"]
            with Image.open(src) as im:
                im = resized(im, 1080)
                dest = OUT / "wall" / f"{src.stem}.webp"
                save_webp(im, dest, quality=80)
                img["src"] = f"/about/wall/{dest.name}"
                img["width"], img["height"] = im.width, im.height
    rules = data.get("meta", {}).get("rules")
    if isinstance(rules, dict):
        rules.pop("why", None)
        rules["images"] = "copied to public/about/wall/ as WebP (git-ignored, deployed); src is the site path"
    dest = SITE / "content" / "linkedin-wall.json"
    dest.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{dest.relative_to(SITE)}  {len(data['posts'])} posts")


CARD_W, FULL_W = 640, 1280  # the card's image, and the dialog's (screenshots need it to be readable)
INTERNAL = ("why", "dropped_reason", "kept", "image_missing")  # for the build, never for display


def wall_full_image(img: dict) -> dict:
    """One file from scraping/site/linkedin-wall/img/ as two WebP sizes; returns the site's record."""
    src = WALL_SRC / img["src"]
    out = OUT / "wall-full"
    with Image.open(src) as im:
        big = resized(im, FULL_W)
        save_webp(big, out / f"{src.stem}-{FULL_W}.webp", quality=80)
        rec = {
            "src": f"/about/wall-full/{src.stem}-{FULL_W}.webp",
            "width": big.width,
            "height": big.height,
            "kind": img.get("kind", "image"),
        }
        if big.width > CARD_W:
            small = resized(im, CARD_W)
            save_webp(small, out / f"{src.stem}-{CARD_W}.webp", quality=78)
            rec["card"] = f"/about/wall-full/{src.stem}-{CARD_W}.webp"
    return rec


def wall_full() -> None:
    """content/linkedin-wall-full.json from wall-full.json (94 posts, WALL-FULL.md), images split by kind.

    Each post keeps its verbatim fields. The internal fields go. `images` is split: `images` (photos and
    screenshots), `pages` (a PDF carousel's pages), `video.cover`, `link.image` and `quote_of.images`.
    """
    data = json.loads((WALL_SRC / "wall-full.json").read_text(encoding="utf-8"))
    for post in data["posts"]:
        for k in INTERNAL:
            post.pop(k, None)
        recs = [wall_full_image(i) for i in post.get("images") or []]
        post["images"] = [r for r in recs if r["kind"] == "image"]
        post["pages"] = [r for r in recs if r["kind"] == "document-page"]
        cover = next((r for r in recs if r["kind"] == "video-cover"), None)
        if post.get("video") is not None:
            post["video"] = {"cover": cover} if cover else {}
        preview = next((r for r in recs if r["kind"] == "link-preview"), None)
        if post.get("link"):
            post["link"]["image"] = preview
        quoted = [r for r in recs if r["kind"] == "quoted"]
        if post.get("quote_of"):
            q = post["quote_of"]
            q.pop("media_not_copied", None)
            q["images"] = quoted
    meta = data.get("meta", {})
    for k in ("selected_by", "run"):
        meta.pop(k, None)
    rules = meta.get("rules")
    if isinstance(rules, dict):
        for k in INTERNAL:
            rules.pop(k, None)
        rules["images"] = "copied to public/about/wall-full/ as WebP (git-ignored, deployed), split by kind"
    dest = SITE / "content" / "linkedin-wall-full.json"
    dest.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    n_files = sum(len(p["images"]) + len(p["pages"]) for p in data["posts"])
    print(f"{dest.relative_to(SITE)}  {len(data['posts'])} posts, {n_files} images and pages in the main media")


if __name__ == "__main__":
    import sys

    OUT.mkdir(parents=True, exist_ok=True)
    if sys.argv[1:] == ["--wall-full"]:
        # Only the full wall (behind WALL_FULL=1 in app/about/page.tsx): leaves /about's copy and the
        # 34-post wall exactly as they are.
        wall_full()
    else:
        copy_text()
        headshot()
        logo()
        wall()
        wall_full()
