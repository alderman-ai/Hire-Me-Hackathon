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


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    copy_text()
    headshot()
    logo()
    wall()
