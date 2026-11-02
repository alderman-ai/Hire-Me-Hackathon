"""preflight.py -- alex-voice mechanical pre-flight (no model call).

Checks only what rubric.md states in countable form, each failure tagged with its criterion ID. A
failure sends the draft back to the writer WITHOUT spending a grader call: the grader's budget is for
judgment, never for countable defects. Everything that needs reading for meaning is the grader's job.

Every constant and word list here was run over Alex's 34 published posts (May-Oct 2026) on their own
surface (LinkedIn) and fires on none of them, except where a rule is his own and the post breaks it
(EMO-03: one post uses a profession emoji). See rubric.md, section E.

Usage:
  python -I preflight.py --draft FILE [--surface site|message|linkedin] [--kind page|article|clip-summary|note|post]
                         [--source FILE] [--target-words N] [--json]
Source: if the file has headings named "His words", only the text under them counts as his words
(for SRC-36); otherwise the whole file does.
Exit: 0 = all checks pass; 1 = one or more FAIL; 2 = bad input.
"""
import argparse
import json
import re
import sys
import unicodedata

APOS = "['’]"

# ---------------------------------------------------------------- word lists (all checked on his posts)
SLOP_TELLS = [  # SLOP-05: AI-tell vocabulary used straight
    r"\bdelv(e|es|ed|ing)\b", r"\btapestry\b", r"\btestament to\b", r"\bseamless(ly)?\b",
    r"\bgame[- ]chang(er|ers|ing)\b", r"\brevolutioni[sz](e|es|ed|ing)\b",
    r"\bin today" + APOS + r"s (fast-paced|digital|ever|competitive|rapidly)", r"\bever-(evolving|changing)\b",
    r"\bin the realm of\b", r"\bembark(s|ed|ing)? on\b", r"\bunleash(es|ed|ing)?\b",
    r"\bharness(es|ed|ing)? the power\b", r"\bit" + APOS + r"s (important|worth) (to note|noting)\b",
    r"\blet" + APOS + r"s dive in\b", r"\bplays? a (crucial|pivotal|vital) role\b", r"\bsynerg(y|ies)\b",
    r"\bnavigat(e|ing) the (complexities|landscape)\b", r"\belevate your\b", r"\bempower(s|ed|ing)? (you|teams|businesses)\b",
]
FORMAL = [  # REGR-31: formal register markers
    r"\bkindly\b", r"\bplease find\b", r"\bherewith\b", r"\bhereby\b", r"\bfurthermore\b", r"\bmoreover\b",
    r"\butili[sz](e|es|ed|ing|ation)\b", r"\b(we|i) am pleased\b", r"\bwe are pleased\b", r"\bi am writing to\b",
    r"\bdo not hesitate\b", r"\bat your earliest convenience\b", r"\besteemed\b", r"\bpursuant\b",
    r"\baforementioned\b", r"\bto whom it may concern\b", r"\bi would like to express\b", r"\ballow me to\b",
    r"\bi would welcome the opportunity\b",
]
COLD = [  # KNOW-40: cold-outreach formulas (notes)
    r"\bhope (this|you|the) .{0,20}finds you\b", r"\bhope you" + APOS + r"?re (doing )?well\b",
    r"\bcame across your (profile|post|work)\b", r"\bi (just )?wanted to reach out\b", r"\bi" + APOS + r"m reaching out\b",
    r"\bi" + APOS + r"d love to connect\b", r"\btouch base\b", r"\bcircle back\b", r"\bpick your brain\b",
    r"\bquick question\b",
]
BAIT = [  # SIGN-10: templated engagement bait
    r"\bsubscribe for more\b", r"\bhit (the )?follow\b", r"\bfollow (me )?for more\b", r"\blet" + APOS + r"s connect\b",
    r"\blike and (share|subscribe)\b", r"\brepost if\b", r"♻", r"(^|\n)\s*(thoughts|agree)\?\s*$",
    r"\bwhat do you think\?\s*$", r"\blet me know in the comments\b",
]
SUMMARY_CLOSE = r"^\s*(in conclusion|in summary|to sum up|ultimately|in short|all in all|at the end of the day|to wrap up)\b"
WINDUP_OPEN = r"^\s*(as part of|in this (article|post|page|piece|video)|welcome to|hi everyone|hello everyone|dear\b|i wanted to|i" + APOS + r"m (so )?excited|in today" + APOS + r"s|have you ever wondered|let me introduce)"
HOMEWORK = [  # HMWK-41
    r"\b(demos?|videos?|clips?|posts?|articles?|pages?)\s+#?\d+\s*(,\s*#?\d+\s*)*(,?\s*(and|then|&)\s*#?\d+)",
    r"\b(start|begin) with (demo|video|clip|post|article) #?\d+",
    r"\b(your|a|the) (short |personal |own )?reading list\b",
]
JARGON = [  # JARG-38: internal project vocabulary
    r"\bS-?D\d{1,2}\b", r"\bDI-\d{1,2}\b", r"\bDoD-\d{1,2}\b", r"\bOT-\d{1,2}\b", r"\bQ\d{1,2}\.\d{1,2}\b",
    r"(?i)\banswer[- ]desk\b", r"(?i)\boperator tasks?\b", r"(?i)\borchestrat(or|ion) session\b",
    r"(?i)\bpropagate check\b", r"\bBoN\b", r"(?i)\bsub-orchestrator\b", r"\b[A-Za-z]:\\",
]
SWEAR = [  # SWR-39 (site and message only)
    r"\bf+u+c+k\w*", r"\bshit\w*", r"\bbullshit\b", r"\bwtf\b", r"\bdamn\w*", r"\bcrap(py)?\b",
    r"\b\w+-ass\b", r"\basshole\w*", r"\bf[#*@$%(&]{2,}", r"[A-Za-z]['’]?[#@$%*(&]{3,}",
]
TICS = [r"\bright\?", r"\bhonestly\b", r"\bbasically\b", r"(^|[.!?]\s+)look,"]  # SPOK-35
CONTRACTION = re.compile(r"\b\w+(n" + APOS + r"t|" + APOS + r"(re|ve|ll|m|d))\b|\b(it|that|there|here|what|who|let|he|she)" + APOS + r"s\b", re.I)
STOP = set("a an the and or but so to of in on at for with from by is are was were be been it its this that these those i you we they he she me my your our their as if then than there here what which who just like um uh".split())


def is_emoji_cp(cp):
    return (0x1F000 <= cp <= 0x1FAFF or 0x2600 <= cp <= 0x27BF or cp in (0x231A, 0x231B, 0x2328, 0x23CF)
            or 0x23E9 <= cp <= 0x23F3 or 0x23F8 <= cp <= 0x23FA or cp in (0x25AA, 0x25AB, 0x25B6, 0x25C0)
            or 0x25FB <= cp <= 0x25FE or 0x2B05 <= cp <= 0x2B07 or cp in (0x2B1B, 0x2B1C, 0x2B50, 0x2B55, 0x3030, 0x303D))


def count_emoji(s):
    """Counts emoji clusters: ZWJ sequences, skin tones, variation selectors and keycaps count once."""
    n, i, cps = 0, 0, [ord(c) for c in s]
    while i < len(cps):
        cp = cps[i]
        keycap = (chr(cp) in "0123456789#*" and i + 1 < len(cps) and
                  (cps[i + 1] == 0x20E3 or (cps[i + 1] == 0xFE0F and i + 2 < len(cps) and cps[i + 2] == 0x20E3)))
        if is_emoji_cp(cp) or keycap:
            n += 1
            i += 1
            while i < len(cps) and (cps[i] in (0xFE0F, 0x20E3) or 0x1F3FB <= cps[i] <= 0x1F3FF or
                                    0x1F1E6 <= cps[i] <= 0x1F1FF or (cps[i] == 0x200D and i + 1 < len(cps))):
                if cps[i] == 0x200D:
                    i += 2
                else:
                    i += 1
            continue
        i += 1
    return n


def strip_quoted(s):
    s = re.sub(r"https?://\S+|\b[\w.-]+\.(com|io|ai|agency|app|cz|net|org)\S*", " ", s)
    s = re.sub(r'"[^"\n]*"|“[^”\n]*”', " ", s)
    s = re.sub(r"(?m)^\s*>.*$", " ", s)
    return s


def words(s):
    return [w for w in re.findall(r"[A-Za-z0-9À-ɏ'’]+", s)]


def norm_tokens(s):
    toks = [w.lower().replace("’", "'") for w in re.findall(r"[A-Za-z0-9À-ɏ'’]+", s)]
    return [t for t in toks if t not in ("um", "uh", "erm")]


def his_words(src):
    if not re.search(r"(?mi)^#+\s*his words", src):
        return src
    out, keep, level = [], False, 0
    for line in src.splitlines():
        m = re.match(r"^(#+)\s*(.*)$", line)
        if m:
            lv = len(m.group(1))
            if re.match(r"(?i)his words", m.group(2)):
                keep, level = True, lv
                continue
            if keep and lv <= level:
                keep = False
        if keep:
            out.append(line)
    return "\n".join(out)


def paragraphs(s):
    return [p for p in re.split(r"\n\s*\n", s) if p.strip()]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--draft", required=True)
    ap.add_argument("--surface", default="site", choices=["site", "message", "linkedin"])
    ap.add_argument("--kind", default="page", choices=["page", "article", "clip-summary", "note", "post"])
    ap.add_argument("--source")
    ap.add_argument("--target-words", type=int)
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()
    try:
        raw = open(a.draft, encoding="utf-8-sig").read().replace("\r\n", "\n").strip("\n")
        src = open(a.source, encoding="utf-8-sig").read().replace("\r\n", "\n") if a.source else ""
    except OSError as e:
        print(f"BAD INPUT: {e}")
        return 2
    if not raw.strip():
        print("BAD INPUT: draft is empty")
        return 2

    body = unicodedata.normalize("NFC", raw)
    low = body.lower()
    fails, notes = [], []
    wc = len(words(body))
    notes.append(f"length: {wc} words, {len(body)} characters; surface={a.surface}, kind={a.kind}")

    def fail(cid, msg):
        fails.append((cid, msg))

    def hits(patterns, text, flags=re.I | re.M):
        found, spans = [], []
        for p in patterns:
            for m in re.finditer(p, text, flags):
                if any(m.start() < e and s < m.end() for s, e in spans):
                    continue  # one report per stretch of text, however many patterns match it
                spans.append((m.start(), m.end()))
                found.append(m.group(0).strip())
        return found

    # FMT-01
    if "↳" in body:
        fail("FMT-01", "pseudo-arrow bullet (U+21B3) present")
    if a.surface == "site":
        n_math = sum(1 for c in body if 0x1D400 <= ord(c) <= 0x1D7FF)
        if n_math:
            fail("FMT-01", f"{n_math} unicode-styled letters (mathematical alphanumerics) on a site page: use real bold")
    else:
        if re.search(r"\*\*[^*\n]+\*\*", body):
            fail("FMT-01", "raw markdown bold (**...**) on a surface that does not render it")
        if re.search(r"(?m)^#{1,6}\s", body):
            fail("FMT-01", "raw markdown heading on a surface that does not render it")
        if re.search(r"\[[^\]\n]+\]\([^)\n]+\)", body):
            fail("FMT-01", "raw markdown link on a surface that does not render it")

    # DASH-02
    if "—" in body:
        fail("DASH-02", f"{body.count(chr(0x2014))} em dash(es): use ' -- '")

    # EMO-03 (mechanical subset)
    if re.search("[\U0001F1E6-\U0001F1FF]{2}", body):
        fail("EMO-03", "flag emoji (regional-indicator pair) present")
    if "‍" in body:
        fail("EMO-03", "ZWJ composite emoji present (profession / gendered-person class)")

    # SLOP-05 vocabulary
    for h in hits(SLOP_TELLS, body):
        fail("SLOP-05", f"AI-tell phrase used: '{h}'")

    # THRD-30
    if a.surface == "site":
        for m in re.finditer(r"\b(Alex|Alderman)\b", strip_quoted(body)):
            fail("THRD-30", f"'{m.group(0)}' outside a quotation on his own site: write I / me / my")

    # REGR-31
    for h in hits(FORMAL, body):
        fail("REGR-31", f"formal-register marker: '{h}'")
    if wc >= 60 and not CONTRACTION.search(body):
        fail("REGR-31", f"{wc} words with zero contractions: he always uses them")

    # JARG-38
    seen = set()
    for h in hits(JARGON, body, re.M):
        if h not in seen:
            seen.add(h)
            fail("JARG-38", f"internal term reaches the reader: '{h}'")

    # SWR-39
    if a.surface in ("site", "message"):
        for h in hits(SWEAR, body):
            fail("SWR-39", f"swearing on the {a.surface}: '{h}'")

    # KNOW-40
    if a.kind == "note":
        for h in hits(COLD, body):
            fail("KNOW-40", f"cold-outreach formula in a note: '{h}'")

    # HMWK-41
    for h in hits(HOMEWORK, body):
        fail("HMWK-41", f"homework for the reader: '{h}'")

    # SIGN-10
    for h in hits(BAIT, body):
        fail("SIGN-10", f"templated engagement bait: '{h}'")

    # LEN-27: three consecutive dense paragraphs (> 70 words) with no relief; and brief length
    paras = paragraphs(body)
    run = 0
    for p in paras:
        relief = re.search(r"\*\*[^*]+\*\*|^#{1,6}\s|^\s*[-*] |[\U0001D400-\U0001D7FF]", p, re.M)
        run = run + 1 if (len(words(p)) > 70 and not relief) else 0
        if run >= 3:
            fail("LEN-27", "three consecutive dense paragraphs (> 70 words each) with no heading, bold or list")
            break
    if a.target_words:
        if wc > round(a.target_words * 1.3):
            fail("LEN-27", f"{wc} words against a brief of {a.target_words}: more than 30% over")
        elif wc < round(a.target_words * 0.5):
            notes.append(f"length note: {wc} words is under half the brief's {a.target_words} (not a fail)")

    # OPEN-32: wind-up opener (a note may open with a greeting line; the next sentence is checked)
    first = body.lstrip()
    if a.kind == "note":
        first = re.sub(r"^(hi|hey|hello|dear|ahoj)\b[^\n,!]*[,!]?\s*", "", first, flags=re.I)
    first = re.sub(r"^#{1,6}\s.*\n+", "", first)  # skip a leading heading
    if re.match(WINDUP_OPEN, first, re.I):
        fail("OPEN-32", f"wind-up opener: '{first[:60]}...'")

    # SPOK-35: fingerprint words used sparingly: per section (split by headings), each word at most
    # max(2, words // 150) times. Calibrated: his own posts use 'basically' twice in 206 and 454 words,
    # so the first constant tried (once per 250 words) was wrong and was loosened to this.
    sections = re.split(r"(?m)^#{1,6}\s.*$", body)
    for sec in sections:
        allowed = max(2, len(words(sec)) // 150)
        for t in TICS:
            c = len(re.findall(t, sec, re.I | re.M))
            if c > allowed:
                fail("SPOK-35", f"fingerprint word /{t}/ used {c} times in one section (allowed {allowed}): caricature")

    # SRC-36: at least one 4-word run of his own words survives, when the source carries 40+ of them
    if src:
        his = his_words(src)
        ht = norm_tokens(his)
        if len(ht) >= 40:
            grams = {tuple(ht[i:i + 4]) for i in range(len(ht) - 3)}
            grams = {g for g in grams if sum(1 for w in g if w not in STOP) >= 2}
            dt = norm_tokens(body)
            kept = {tuple(dt[i:i + 4]) for i in range(len(dt) - 3)} & grams
            notes.append(f"SRC-36: {len(kept)} distinct 4-word runs of his words kept (from {len(ht)} source words)")
            if not kept:
                fail("SRC-36", "no 4-word run of his own words from the source survives: keep his phrasings")
        else:
            notes.append("SRC-36: under 40 words of his own words in the source; passes vacuously")

    # CLOS-42: summary closer
    if paras and re.match(SUMMARY_CLOSE, paras[-1], re.I):
        fail("CLOS-42", f"summary closer: '{paras[-1][:50]}...'")

    # EMOJ-43
    ne = count_emoji(body)
    notes.append(f"emojis: {ne}")
    if a.surface in ("site", "message") and ne > 2:
        fail("EMOJ-43", f"{ne} emojis on the {a.surface}: two at most")

    # encoding integrity (not a rubric criterion)
    if "�" in body or re.search("[Â-Å][\u0080-¿]", body):
        fail("ENCODING", "mojibake or U+FFFD present: the text was mis-decoded")

    if a.json:
        print(json.dumps({"pass": not fails, "fails": [{"id": i, "msg": m} for i, m in fails], "notes": notes},
                         ensure_ascii=False, indent=1))
    else:
        print(f"=== alex-voice pre-flight: {a.draft} ===")
        for n in notes:
            print(f"  . {n}")
        if fails:
            print(f"\nFAIL ({len(fails)}):")
            for i, m in fails:
                print(f"  X [{i}] {m}")
        else:
            print("\nALL MECHANICAL CHECKS PASS")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main())
