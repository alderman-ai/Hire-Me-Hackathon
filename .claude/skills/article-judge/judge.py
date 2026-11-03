"""article-judge: Jev-based article check (B1-B9). See SKILL.md.
Run off camera only:  python -I -X utf8 judge.py <article.md> <source.txt> <out.json> --recorder-off-confirmed
Prints a table, verdict and cost. Never prints env or the key.
"""
import json, re, sys
if "--recorder-off-confirmed" not in sys.argv:
    sys.exit("Refusing to run: confirm the OBS recorder is off, then pass --recorder-off-confirmed.")
sys.path.insert(0, r"C:\Users\alder\Desktop\Alderman OS\System\scripts\pipelines")
from jev import ask, noul, choice, prob  # noqa: E402

args = [a for a in sys.argv[1:] if not a.startswith("--")]
art_path, src_path, out_path = args[:3]
raw = open(art_path, encoding="utf8").read()
source = open(src_path, encoding="utf8").read()

# --- parse ---
point = ""
m = re.match(r"\A---\s*\n(.*?)\n---\s*\n", raw, re.S)
body = raw[m.end():] if m else raw
if m:
    for key in ("summary", "description"):
        mm = re.search(rf'^{key}:\s*"?(.*?)"?\s*$', m.group(1), re.M)
        if mm and mm.group(1):
            point = mm.group(1); break
paras = []
for block in re.split(r"\n\s*\n", body):
    b = block.strip()
    if not b or b == "---" or b.startswith("#") or b.startswith("[media:"):
        continue
    if b.startswith("> [!figure]") or b.startswith("> [!diagram]"):
        continue
    paras.append(b)
article_text = "\n\n".join(paras)
if not point:
    point = "(not stated; infer it from the article)"

# --- paragraph questions ---
Q_PARA = {
    "B1": noul("Count the sentences the source dictation spends on this paragraph's topic and compare with the sentences this paragraph spends on it. Does the paragraph spend clearly more sentences, detail or emphasis on the topic than the source did, for example a passing mention in the source turned into a whole paragraph or a technical side-point expanded?",
               true="The paragraph spends more sentences or detail on its topic than the source dictation did; the source mentioned it briefly or in passing.",
               false="The paragraph spends about as many sentences on its topic as the source, or fewer."),
    "B2": noul("Does this paragraph contain a substantive fact, quote, citation, link, definition of a term, or clarifying aside that comes from outside the author's own words, meaning something the source dictation does not contain or imply? Rephrasing, tightening, connective sentences and the author's own opinions, jokes and personal background do not count; only imported material does. Example of imported material: a bracketed definition such as \"churn (the share of customers who leave in a year)\" when the author never defined the term, or a technical explanation the author did not give.",
               true="The paragraph imports material that did not come from the author: a quote from documentation or another source, a link or citation, an explanatory definition of a term (including a bracketed or parenthetical gloss), or a factual claim or clarification absent from the source dictation.",
               false="The paragraph consists of the author's own points (rephrased or not), opinions, jokes, connective sentences or personal background, with nothing imported from outside."),
    "B3": noul("Could this paragraph be deleted without weakening the article's main point?",
               true="Removing the paragraph leaves the main point just as clear and well supported.",
               false="Removing the paragraph would leave the main point weaker, less clear or less supported."),
    "B4": noul("Is this paragraph generic filler: made only of commonplace statements or advice that appear in countless articles on this topic, with no personal story, opinion, example, number or distinctive phrasing from this author?",
               true="It is nothing but commonplace statements any writer could make; there is no personal detail, no opinion of the author's and no distinctive phrasing.",
               false="It carries the author's own opinion, framing, example, story, number or distinctive phrasing, even if the topic is common."),
}
THR = {"B1": .6, "B2": .6, "B3": .6, "B4": .7}
cost = 0.0
rows = []
for i, p in enumerate(paras, 1):
    a, u = ask({"article_point": point, "paragraph": p, "source_dictation": source}, Q_PARA)
    cost += u.get("cost_usd", 0)
    pr = {k: prob(a[k]) for k in Q_PARA}
    flags = [k for k in Q_PARA if pr[k] >= THR[k]]
    rows.append(dict(n=i, text=p, p=pr, flags=flags))

# --- article questions ---
Q_ART = {
    "B5": noul("Can the main point of this article be stated in one sentence, using only the article text?",
               true="Yes, one clear main point can be stated in a single sentence from the text alone.",
               false="No: there is no single point, or two points compete."),
    "B6": noul("Do the sections read as separate answers to separate questions, rather than as steps in one argument that hand off to each other?",
               true="Sections are stacked answers; each could stand alone and none builds on the previous one.",
               false="Each section hands off to the next and builds one argument."),
    "B7": noul("Does the article make the same point twice in its body sections? Ignore the summary box and any pull quote, which are meant to repeat.",
               true="At least one point is repeated in a later part of the article.",
               false="Each point is made once."),
    "B8": noul("Does the article make a claim that has no example, number or story from the author's own work behind it?",
               true="At least one significant claim is asserted with no example, number or story from the author's own work to support it.",
               false="Every significant claim is backed by an example, number or story from the author's own work."),
    "verdict": choice("Overall, is this a good article for a reader who has never met the author, judged against the source dictation?", {
        "good": "One clear point, proven from the author's own work, emphasis follows the source, nothing needs cutting.",
        "fixable": "Mostly sound, but some paragraphs need cutting, shrinking or replacing.",
        "bad": "No clear point, or mostly generic or padded; it needs rewriting."}),
}
a, u = ask({"article": article_text, "source_dictation": source}, Q_ART)
cost += u.get("cost_usd", 0)
art = {k: prob(a[k]) for k in ("B5", "B6", "B7", "B8")}
art_pass = {"B5": art["B5"] >= .5, "B6": art["B6"] < .5, "B7": art["B7"] < .5, "B8": art["B8"] < .5}
verdict = dict(option=a["verdict"].get("choice"), probability=a["verdict"].get("confidence"))

# --- B9 mechanical ---
B9 = {"demo": r"\bdemo", "graded": r"\bgraded\b"}
for w in ("book a call", "reach out", "get in touch", "DM me", "let me know", "reply"):
    B9[w] = re.escape(w)
b9 = {k: len(re.findall(v, article_text, re.I)) for k, v in B9.items()}
b9 = {k: v for k, v in b9.items() if v}

flagged = [r for r in rows if r["flags"]]
passed = not flagged and all(v for k, v in art_pass.items() if k != "B7") and not b9  # B7 is advisory: a thesis restated in intro and close is deliberate

# --- output ---
print(f"{'#':>2} {'paragraph':<60} B1   B2   B3   B4   flags")
for r in rows:
    t = r["text"].replace("\n", " ")[:60]
    print(f"{r['n']:>2} {t:<60} " + " ".join(f"{r['p'][k]:.2f}" for k in Q_PARA) + "  " + ",".join(r["flags"]))
print("\nArticle:", ", ".join(f"{k}={art[k]:.2f} ({'ok' if art_pass[k] else 'FAIL'})" for k in art))
print("B9 hits:", b9 or "none")
print(f"Verdict: {verdict['option']} ({verdict['probability']})")
print(f"Flagged paragraphs: {len(flagged)}/{len(rows)}")
print("RESULT:", "PASS" if passed else "FAIL")
print(f"Cost ${cost:.5f}")
json.dump(dict(paragraphs=rows, article=art, article_pass=art_pass, b9=b9, verdict=verdict,
               passed=passed, cost_usd=cost), open(out_path, "w", encoding="utf8"), ensure_ascii=False, indent=1)
