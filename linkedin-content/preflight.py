"""Mechanical pre-flight for a LinkedIn post: the checks that are arithmetic, not judgment.

Usage: python -I preflight.py <post.txt> [--caption]

Prints counts the judge uses instead of eyeballing:
- hook style (classified first, then counted): style 1 = two blocks split by one empty line,
  style 2 = one opening block of 100-240 characters
- each hook line's length (85-character ceiling for style 1)
- raw markdown, pseudo-arrow bullets, unspaced em dashes, flag emoji
- emoji count (distinct), unicode-bold runs, ALL-CAPS words, hashtags
- sentence lengths (median and max, in words)

The method is from Alex's public brand capture repo (alderman-ai/brand-voice-capture-demo-linkedin,
rubric v2.1: FMT-01, DASH-02, EMO-03, HOOKF-19, WRAP-20). Brand-specific word lists are not here.
"""
import re
import statistics
import sys

LONG_FORM = 400  # posts at or under this many characters have no meaningful fold
WRAP_MAX = 85
STYLE2 = (100, 240)

EMOJI_RE = re.compile(
    "[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U0001F000-\U0001F2FF\U00002B00-\U00002BFF]"
)
FLAG_RE = re.compile("[\U0001F1E6-\U0001F1FF]{2}")
BOLD_RE = re.compile("[\U0001D400-\U0001D7FF]+(?:[  '’,.:;!?-]+[\U0001D400-\U0001D7FF]+)*")
MARKDOWN_RE = re.compile(r"(\*\*[^*]+\*\*|(?<!\w)\*[^*\s][^*]*\*(?!\w)|^#{1,6} |\[[^\]]+\]\([^)]+\)|↳)", re.M)
UNSPACED_EM = re.compile(r"\w—\w")
# Stock phrasings that read as AI on LinkedIn (L-05 R4: vendor data; LinkedIn's "Seems like AI slop" flag, 30 Jul 2026).
STOCK = [
    r"\bhere'?s (what|why|how|the thing)\b", r"\bthe (result|kicker|catch|twist)\?", r"\blet that sink in\b",
    r"\bin today'?s (fast-paced|digital|ever)", r"\bgame[- ]changer\b", r"\bhot take:", r"\bspoiler:",
    r"\b(?:it|this|these|they)(?:'s| is| are|'re)?(?: not|n't) (?:just |only )?(?:about )?[\w -]{1,30}[,;:—–.-]+ ?(?:it|this|these|they)(?:'s| is| are|'re)\b",
    r"\bunlock(?:s|ing)? the\b", r"\bnavigat(?:e|ing) the (?:complex|ever)",
]
STOCK_RE = re.compile("|".join(STOCK), re.I)


def hook_blocks(text):
    blocks = [b for b in re.split(r"\n\s*\n", text.strip()) if b.strip()]
    return blocks


def classify(text):
    blocks = hook_blocks(text)
    first = blocks[0] if blocks else ""
    first_lines = [l for l in first.splitlines() if l.strip()]
    if len(first_lines) == 1 and len(first) >= STYLE2[0] and len(blocks) >= 1:
        if len(first) <= STYLE2[1]:
            return "style 2", [first]
        return "style 2 (too long)", [first]
    if len(blocks) >= 2 and len(first_lines) == 1:
        second_lines = [l for l in blocks[1].splitlines() if l.strip()]
        return "style 1", [first_lines[0], second_lines[0] if second_lines else ""]
    return "unclassified", first_lines[:3]


def sentences(text):
    parts = []
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        for s in re.split(r"(?<=[.!?…])\s+", line):
            words = re.findall(r"[\w’'%-]+", s)
            if words:
                parts.append((len(words), s))
    return parts


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    text = open(sys.argv[1], encoding="utf-8").read().strip()
    # Carousel files label each slide "SLIDE n:"; the labels are format, not copy.
    text = re.sub(r"(?m)^SLIDE \d+:[ \t]*", "", text).strip()
    n = len(text)
    print(f"characters: {n} ({'long-form' if n > LONG_FORM else 'short: hook rules pass vacuously'})")
    style, lines = classify(text)
    print(f"hook: {style}")
    for i, l in enumerate(lines, 1):
        flag = "" if style != "style 1" or len(l) <= WRAP_MAX else f"  <-- over {WRAP_MAX}"
        print(f"  hook block {i}: {len(l)} chars{flag}")
    if style.startswith("style 2"):
        lo, hi = STYLE2
        print(f"  style-2 range {lo}-{hi}: {'ok' if lo <= len(lines[0]) <= hi else 'OUT OF RANGE'}")
    md = MARKDOWN_RE.findall(text)
    print(f"raw markdown or ↳: {len(md)} {md[:3] if md else ''}")
    em = UNSPACED_EM.findall(text)
    print(f"unspaced em dashes: {len(em)}")
    print(f"flag emoji: {len(FLAG_RE.findall(text))}")
    emo = EMOJI_RE.findall(text)
    print(f"emoji: {len(emo)} total, {len(set(emo))} distinct {''.join(sorted(set(emo)))}")
    bold = BOLD_RE.findall(text)
    print(f"unicode-bold phrases: {len(bold)}")
    caps = [w for w in re.findall(r"\b[A-Z]{4,}\b", text)]
    print(f"all-caps words (4+ letters): {len(caps)} {caps[:5] if caps else ''}")
    print(f"hashtags: {len(re.findall(r'(?<!\w)#\w+', text))}")
    stock = [m.group(0) for m in STOCK_RE.finditer(text)]
    print(f"stock AI phrasings: {len(stock)} {stock[:4] if stock else ''}")
    s = sentences(text)
    if s:
        lens = [k for k, _ in s]
        longest = max(s)
        print(f"sentences: {len(s)}, median {statistics.median(lens)} words, max {longest[0]} words")
        for k, sent in s:
            if k > 25:
                print(f"  over 25 words ({k}): {sent[:90]}")


if __name__ == "__main__":
    main()
