r"""Route the fictional sample leads into the 36 demo workflows, the way routing\README.md describes.

Run from getsales\ with:  python -I routing\route.py            (all twelve)
                          python -I routing\route.py L06 L11    (just those)

Rules decide first, in code: ICP from industry and headcount, language from country and profile, a signal
from its date. What a rule can't settle becomes a narrow typed question for Jev (TypeSafe's decision model).
Jev isn't called in this demo: the script prints the question and takes the answer a person labelled,
marked as such. Nothing is imported into GetSales and nothing is sent. All leads are fictional.
"""
import csv
import sys
from datetime import date
from pathlib import Path

HERE = Path(__file__).resolve().parent
AS_OF = date(2026, 11, 2)  # the day the sample was routed
SIGNAL_DAYS = 90

# ICP rules: LinkedIn industry label -> ICP, and the minimum headcount (routing\README.md, "1. ICP").
INDUSTRY = {
    "Retail Groceries": "Retail loyalty",
    "Online and Mail Order Retail": "Retail loyalty",
    "Retail Health and Personal Care Products": "Retail loyalty",
    "Telecommunications": "Telco CVM",
    "Cable and Satellite Programming": "Telco CVM",
    "Credit Intermediation": "Consumer lending",
    "Banking": "Consumer lending",
    "Freight and Package Transportation": "Last-mile logistics",
}
TOO_BROAD = {"Financial Services", "Entertainment Providers"}  # a rule can't tell; Jev gets the question
MIN_STAFF = {"Retail loyalty": 1000, "Telco CVM": 500, "Consumer lending": 300, "Last-mile logistics": 200}
CASE_TYPES = {
    "Retail loyalty": ["grocery chain with a loyalty card", "multi-country online grocer"],  # REWE Group; Rohlik Group
    "Telco CVM": ["streaming platform", "telco with a CVM team and online sales"],  # Oneplay; Vodafone CZ
    "Consumer lending": ["consumer lender with an online lead funnel", "multi-product consumer lender"],  # Home Credit; Security Bank
    "Last-mile logistics": ["parcel or locker network starting in a new market"],  # BOX NOW
}
TRIGGERS = ("job post", "started as", "tender", "announced", "raised", "launch")
LANG = {"CZ": "CS", "SK": "CS", "AT": "DE", "DE": "DE", "CH": "DE"}

# What a person labelled for the questions Jev would get. Jev is not run here.
LABELS = {
    "L06": {"about": "consumer loans online and in branches", "icp": "Consumer lending", "case": "none"},
    "L11": {"about": "paid streaming service selling subscriptions online", "icp": "Telco CVM",
            "case": "streaming platform"},
    "L02": {"case": "grocery chain with a loyalty card"},
    "L03": {"case": "multi-country online grocer"},
    "L05": {"case": "none"},
    "L08": {"case": "multi-product consumer lender"},
    "L09": {"case": "none"},
}

TTY = sys.stdout.isatty()


def c(code, s):
    return f"\033[{code}m{s}\033[0m" if TTY else s


DIM, BOLD, VIOLET, LAV, GREY, AMBER = "2", "1", "38;2;140;110;255", "38;2;211;195;255", "38;2;156;148;168", "38;2;240;190;90"


def decide(r):
    """Return (icp, lang, tactic, steps); each step is (decision, value, how, why)."""
    steps, label = [], LABELS.get(r["lead_id"], {})
    staff = int(r["employees"] or 0)
    ind = r["industry"]

    # 1. ICP
    if ind in INDUSTRY:
        icp = INDUSTRY[ind]
        if staff < MIN_STAFF[icp]:
            steps.append(("ICP", "no fit", "rule", f"{ind}, {staff:,} staff: under {MIN_STAFF[icp]:,} for {icp}"))
            return None, None, None, steps
        steps.append(("ICP", icp, "rule", f"{ind.lower()}, {staff:,} staff, {r['country']}"))
    elif ind in TOO_BROAD:
        icp = label["icp"]
        q = f"Which of these does {r['company']} sell? Retail loyalty / Telco CVM / Consumer lending / Last-mile logistics / none of these / can't tell"
        steps.append(("ICP", icp, "jev", f"'{ind}' is too broad for a rule. Question: {q}  Over: \"{label['about']}\""))
        if staff < MIN_STAFF[icp]:
            steps.append(("ICP", "no fit", "rule", f"{staff:,} staff: under {MIN_STAFF[icp]:,}"))
            return None, None, None, steps
    else:
        steps.append(("ICP", "no fit", "rule", f"{ind}, {staff:,} staff: no ICP covers it"))
        return None, None, None, steps

    # 2. Language: code only
    lang = LANG.get(r["country"], "EN")
    why = f"{r['country']} gives {lang}"
    if r["profile_language"] == "English" and lang != "EN":
        lang, why = "EN", why + ", but the English profile overrides to EN"
    else:
        why += f", {r['profile_language']} profile"
    steps.append(("Language", lang, "rule", why))

    # 3. Tactic: signal by date (code), else proof by case type (Jev pick-one), else problem
    sig, sd = r["recent_signal"], r["signal_date"]
    if sig and sd and any(t in sig.lower() for t in TRIGGERS):
        age = (AS_OF - date.fromisoformat(sd)).days
        if age <= SIGNAL_DAYS:
            steps.append(("Tactic", "signal", "rule", f"'{sig}', {age} days old"))
            return icp, lang, "signal", steps
        steps.append(("Signal", "too old", "rule", f"'{sig}', {age} days old, over {SIGNAL_DAYS}"))
    case = label.get("case", "none")
    q = f"Does {r['company']} look like: " + " / ".join(CASE_TYPES[icp]) + " / none?"
    tactic = "proof" if case != "none" else "problem"
    steps.append(("Tactic", tactic, "jev", f"Question: {q}  Labelled: {case}"))
    return icp, lang, tactic, steps


def main(ids):
    rows = list(csv.DictReader(open(HERE / "sample.csv", encoding="utf-8-sig", newline="")))
    if ids:
        rows = [r for r in rows if r["lead_id"] in ids]
    by_rule = by_jev = nofit = agree = 0
    print(c(LAV, f"Routing {len(rows)} fictional leads, as of {AS_OF:%d %b %Y}. Rules first; Jev only for what they can't settle.\n"))
    for r in rows:
        icp, lang, tactic, steps = decide(r)
        print(c(BOLD, f"{r['lead_id']}  {r['company']}") + c(GREY, f"  ·  {r['title']}  ·  {r['country']}"))
        for name, value, how, why in steps:
            tag = c(VIOLET, "rule") if how == "rule" else c(AMBER, "Jev ")
            print(f"    {name:<9} {value:<20} {tag}  {c(GREY, why)}")
        if icp:
            wf = f"Demo · {icp} · {lang} · {tactic}"
            print("    " + c(LAV, "→ " + wf))
        else:
            print("    " + c(GREY, "→ no fit: logged, no workflow, no message"))
        print()
        used_jev = any(s[2] == "jev" for s in steps)
        nofit += icp is None
        by_jev += bool(icp) and used_jev
        by_rule += bool(icp) and not used_jev
        agree += (r["icp"], r["language"], r["approach"]) == ((icp, lang, tactic) if icp else ("none", "none", "none"))
    print(c(LAV, f"{len(rows)} leads: {by_rule} routed by rules alone, {by_jev} needed Jev for one decision or more, {nofit} no fit."))
    print(c(GREY, f"Matches the routed sample (routing\\sample.csv): {agree}/{len(rows)}. "
                  "Jev isn't called here: its questions show the answer a person labelled. Nothing is imported or sent."))


if __name__ == "__main__":
    if TTY and sys.platform == "win32":
        import os
        os.system("")  # turn on ANSI colours in the Windows console
    sys.stdout.reconfigure(encoding="utf-8")
    main(set(sys.argv[1:]))
