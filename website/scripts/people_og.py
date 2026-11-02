"""Make the link-card copies of the /for portraits: public/people/<slug>-og.jpg.

app/for/[slug]/opengraph-image.tsx draws each person's portrait on their link card with Satori, which
can't read WebP. This writes a 480 x 600 JPEG beside each 800 x 1000 WebP (same crop, same greyscale).
Like the WebPs, the copies are git-ignored and deploy from the working tree. Rerun it after a portrait
changes:  python scripts\\people_og.py
"""

from pathlib import Path

from PIL import Image

PEOPLE = Path(__file__).resolve().parent.parent / "public" / "people"

for src in sorted(PEOPLE.glob("*.webp")):
    if src.stem.endswith("-400"):
        continue
    out = src.with_name(f"{src.stem}-og.jpg")
    with Image.open(src) as im:
        im.convert("RGB").resize((480, 600), Image.LANCZOS).save(out, "JPEG", quality=86, optimize=True)
    print(out.relative_to(PEOPLE.parent.parent), out.stat().st_size, "bytes")
