"""Make the /d1 carousel images from scraping's tracked board exports (BUILD S-D1-B1).

Reads ..\\scraping\\site\\carousel\\NN-*.png (2880 px wide, 2x renders of addvery-research's site-safe
boards; read-only, another session's folder) and writes public\\d1\\NN-*-{800,1280,2880}.webp:
lossy WebP at 800 and 1280 px for phones and 1x screens, and lossless WebP at 2880 px for 2x screens
and the full-size view (pixel-identical to the PNG at about 40% of its size), plus public\\d1\\og.png,
the page's 1200 x 630 link preview. Rerun after scraping re-exports a board, then redeploy.

    python scripts\\d1_images.py
"""
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent.parent
SRC = HERE.parent / "scraping" / "site" / "carousel"
OUT = HERE / "public" / "d1"


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    boards = sorted(SRC.glob("[0-9][0-9]-*.png"))
    if not boards:
        raise SystemExit(f"No boards in {SRC}")
    for png in boards:
        im = Image.open(png).convert("RGB")
        stem = png.stem
        for w, q in ((800, 82), (1280, 84)):
            small = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
            small.save(OUT / f"{stem}-{w}.webp", "WEBP", quality=q, method=6)
        im.save(OUT / f"{stem}-2880.webp", "WEBP", lossless=True, method=6)
        sizes = ", ".join(f"{p.name} {p.stat().st_size // 1024} KB" for p in sorted(OUT.glob(f"{stem}-*.webp")))
        print(f"{png.name} ({im.width} x {im.height}): {sizes}")

    # The link preview (og:image): the first board whole, on its own #151515, at 1200 x 630.
    first = Image.open(boards[0]).convert("RGB")
    h = 630
    w = round(first.width * h / first.height)
    card = Image.new("RGB", (1200, 630), first.getpixel((4, 4)))
    card.paste(first.resize((w, h), Image.LANCZOS), ((1200 - w) // 2, 0))
    card.save(OUT / "og.png", "PNG", optimize=True)
    print(f"og.png from {boards[0].name}: {(OUT / 'og.png').stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
