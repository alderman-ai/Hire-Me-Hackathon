r"""One recordable screen: the pipeline for the six, from Alex's research to each computed first message.

Run from getsales\ with:  python -I alert\view.py
Reads live\six.json, live\alert.csv and live-run.md; writes live\pipeline-view.html (git-ignored: it
holds the six's names and messages). Open that file in a browser to record it. Prints no names.

Nothing here imports or sends anything: the six never enter GetSales (Alex sends by hand, A7.1).
"""
import csv
import html
import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent.parent  # getsales\
LIVE = HERE / "live"
OUT = LIVE / "pipeline-view.html"


def esc(s):
    return html.escape(s or "", quote=True)


def stage_times():
    """Map each stage to its wall-clock time(s) from live-run.md, by the words its row uses."""
    rows = []
    for line in (HERE / "live-run.md").read_text(encoding="utf-8").splitlines():
        m = re.match(r"\|\s*(\d{1,2}:\d{2})(?::\d{2})?\s*\|\s*(.+?)\s*\|", line)
        if m:
            rows.append((m.group(1), m.group(2).lower()))

    def find(*words):
        for t, text in rows:
            if all(w in text for w in words):
                return t
        return None

    return {
        "six": find("six identified"),
        "confirmed": find("confirms the six"),
        "computed": find("computed"),
        "revised": find("revised"),
        "called_off": find("called off"),
    }


def card(p, row):
    msg = row["custom_message_1"]
    opener = p["opener"]
    i = msg.find(opener)
    if i >= 0:
        before, after = msg[:i], msg[i + len(opener):]
        body = (f'{esc(before)}<mark class="opener">{esc(opener)}</mark>'
                f'<span class="fixed">{esc(after)}</span>')
    else:  # never expected; show the message whole rather than guess
        body = esc(msg)
    name = f'{p["first_name"]} {p["last_name"]}'
    return f"""
      <article class="person">
        <header>
          <p class="role">{esc(p["role"])}</p>
          <h3>{esc(name)}</h3>
          <p class="position">{esc(p["position"])}</p>
        </header>
        <p class="msg">{body.replace(chr(10), "<br>")}</p>
        <footer>
          <span class="len">{len(msg)} characters</span>
          <details><summary>What the opener rests on</summary><p>{esc(p["opener_basis"])}</p></details>
        </footer>
      </article>"""


def csv_table(rows, fields):
    def cell(f, v):
        if f == "custom_message_1":
            v = v.replace("\n", " ")
            return f'<td class="cm1">{esc(v[:72])}…</td>'
        if f == "linkedin_id":
            return '<td class="muted">in/…</td>'
        return f"<td>{esc(v)}</td>"

    head = "".join(f"<th scope=\"col\">{esc(f)}</th>" for f in fields)
    body = "".join("<tr>" + "".join(cell(f, r[f]) for f in fields) + "</tr>" for r in rows)
    return f"<table><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table>"


def main():
    six = json.loads((LIVE / "six.json").read_text(encoding="utf-8"))
    with open(LIVE / "alert.csv", encoding="utf-8-sig", newline="") as fh:
        reader = csv.DictReader(fh)
        fields = reader.fieldnames
        rows = list(reader)
    assert len(six) == len(rows) == 6, "expected six people in six.json and alert.csv"
    for p, r in zip(six, rows):
        assert p["first_name"] == r["first_name"] and p["last_name"] == r["last_name"], "six.json and alert.csv rows differ"

    t = stage_times()

    def when(*keys):
        parts = [t[k] for k in keys if t.get(k)]
        return " · ".join(parts)

    stages = [
        ("The six", "Picked from Alex's own research on Addvery: the people who would decide on hiring him.",
         when("six") + (f" · confirmed {t['confirmed']}" if t.get("confirmed") else "")),
        ("CSV", "One row per person, in the columns GetSales imports. The first message is a column of its own.",
         when("computed")),
        ("Enrichment", "What his research already says about each person, all from public sources.",
         (f"{t['six']}, with the six" if t.get("six") else "")),
        ("First message", "A personal opener written from that research, then a part that's the same for all six.",
         when("computed") + (f" · revised {t['revised']}" if t.get("revised") else "")),
        ("Import", "Stops here on purpose. These six never enter GetSales. Alex sends each message himself.",
         (f"called off {t['called_off']}" if t.get("called_off") else "")),
    ]
    stage_html = "".join(
        f"""<li class="stage{' stop' if n == 5 else ''}"><span class="n" aria-hidden="true">{n}</span>
          <div><h2>{esc(name)}</h2><p>{esc(text)}</p>{f'<p class="time">{esc(tm)}</p>' if tm else ''}</div></li>"""
        for n, (name, text, tm) in enumerate(stages, 1))

    cards = "".join(card(p, r) for p, r in zip(six, rows))
    doc = TEMPLATE.replace("{{STAGES}}", stage_html).replace("{{CARDS}}", cards) \
                  .replace("{{CSV}}", csv_table(rows, fields))
    OUT.write_text(doc, encoding="utf-8")
    print(f"wrote {OUT.relative_to(HERE)} ({len(doc)} bytes, {len(rows)} people)")


TEMPLATE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Six First Messages</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500&family=Outfit:wght@400;500&family=JetBrains+Mono:wght@400&display=swap">
<style>
/* Layout: a left rail with the five pipeline stages in order, the six computed messages in a grid beside it,
   the CSV underneath. Single dark theme on purpose: Addvery's own black-and-ink world, recorded on screen.
   Colours from the website's Addvery kit (website/app/addvery-tokens.css). */
:root {
  color-scheme: dark;
  --bg: #000000;          /* Addvery black */
  --panel: #151515;       /* Addvery ink */
  --card: rgba(255,255,255,.06);
  --line: rgba(255,255,255,.1);
  --fg: #ffffff;
  --fg-2: #bcbcbc;        /* body copy on dark */
  --fg-3: #9c94a8;        /* rich text on dark (mauve) */
  --lavender: #d3c3ff;
  --violet: #6645eb;
  --orchid: #d445eb;
  --display: "Inter Tight", "Helvetica Neue", Arial, sans-serif;
  --body: "Outfit", system-ui, sans-serif;
  --mono: "JetBrains Mono", ui-monospace, Consolas, monospace;
}
* { box-sizing: border-box; }
html, body { margin: 0; }
body { background: var(--bg); color: var(--fg); font: 400 15px/1.5 var(--body); }
.wrap { max-width: 1840px; margin: 0 auto; padding-block: 28px 40px;
        padding-left: max(16px, 2.5vw); padding-right: max(16px, 2.5vw); }
.top { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 12px 40px;
       padding-bottom: 20px; border-bottom: 1px solid var(--line); }
.eyebrow { margin: 0 0 6px; font: 500 12px/1 var(--display); letter-spacing: .12em; text-transform: uppercase; color: var(--lavender); }
h1 { margin: 0; font: 500 clamp(26px, 2.6vw, 40px)/1.1 var(--display); letter-spacing: -.02em; text-wrap: balance; }
.sub { margin: 0; max-width: 62ch; color: var(--fg-2); }
.grid { display: grid; grid-template-columns: minmax(240px, 300px) minmax(0, 1fr); gap: 32px; margin-top: 24px; }
.stages { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; align-content: start; }
.stage { display: grid; grid-template-columns: 30px minmax(0,1fr); gap: 12px; padding: 12px 0; }
.stage + .stage { border-top: 1px solid var(--line); }
.stage .n { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center;
            font: 500 14px/1 var(--display); background: var(--violet); }  /* solid: white digit 5.8:1 (the gradient's orchid end fell to 3.6:1) */
.stage.stop .n { background: transparent; border: 1px dashed var(--fg-3); color: var(--fg-3); }
.stage h2 { margin: 3px 0 2px; font: 500 17px/1.2 var(--display); }
.stage p { margin: 0; color: var(--fg-2); font-size: 14px; }
.stage .time { margin-top: 4px; font: 400 12px/1.4 var(--mono); color: var(--fg-3); font-variant-numeric: tabular-nums; }
.legend { display: flex; flex-wrap: wrap; gap: 8px 20px; margin: 0 0 14px; font-size: 13px; color: var(--fg-2); }
.legend span::before { content: ""; display: inline-block; width: 22px; height: 10px; margin-right: 8px; vertical-align: -1px; border-radius: 2px; }
.legend .l-op::before { background: linear-gradient(90deg, rgba(102,69,235,.55), rgba(212,69,235,.4)); }
.legend .l-fx::before { background: var(--card); border: 1px solid var(--line); }
.people { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.person { display: flex; flex-direction: column; gap: 12px; padding: 18px; background: var(--card);
          border: 1px solid var(--line); border-radius: 6px; min-width: 0; }
.person header { display: grid; gap: 2px; }
.role { margin: 0; font: 500 11px/1.3 var(--display); letter-spacing: .1em; text-transform: uppercase; color: var(--lavender); }
.person h3 { margin: 0; font: 500 20px/1.2 var(--display); }
.position { margin: 0; font-size: 13px; color: var(--fg-3); }
.msg { margin: 0; font-size: 14.5px; line-height: 1.55; color: var(--fg-2); overflow-wrap: anywhere; }
mark.opener { color: var(--fg); background: linear-gradient(90deg, rgba(102,69,235,.55), rgba(212,69,235,.4));
              -webkit-box-decoration-break: clone; box-decoration-break: clone; padding: 1px 3px; border-radius: 2px; }
.fixed { color: var(--fg-3); font-size: 13.5px; }
.person footer { margin-top: auto; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 6px 12px;
                 padding-top: 10px; border-top: 1px solid var(--line); font-size: 12px; color: var(--fg-3); }
.len { font-family: var(--mono); font-variant-numeric: tabular-nums; }
details summary { cursor: pointer; color: var(--fg-2); }
details summary:focus-visible { outline: 2px solid var(--lavender); outline-offset: 2px; }
details p { margin: 6px 0 0; color: var(--fg-2); font-size: 13px; }
.csv { margin-top: 32px; }
.csv h2 { margin: 0 0 4px; font: 500 17px/1.2 var(--display); }
.csv .cap { margin: 0 0 12px; color: var(--fg-2); font-size: 14px; max-width: 90ch; }
code { font-family: var(--mono); font-size: .92em; color: var(--lavender); }
.scroll { overflow-x: auto; border: 1px solid var(--line); border-radius: 6px; background: var(--panel); }
table { border-collapse: collapse; width: 100%; font: 400 12.5px/1.45 var(--mono); }
th, td { text-align: left; padding: 8px 12px; white-space: nowrap; border-bottom: 1px solid var(--line); }
th { color: var(--lavender); font-weight: 400; }
tr:last-child td { border-bottom: 0; }
td.cm1 { color: var(--fg); }
.muted { color: var(--fg-3); }
.foot { margin: 24px 0 0; padding-top: 16px; border-top: 1px solid var(--line); color: var(--fg-2); font-size: 14px; }
@media (max-width: 1280px) { .people { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 860px) { .grid { grid-template-columns: minmax(0, 1fr); } .people { grid-template-columns: minmax(0, 1fr); } }
</style>
</head>
<body>
<main class="wrap">
  <div class="top">
    <div>
      <p class="eyebrow">GetSales outbound demo · the pipeline</p>
      <h1>Six people, six computed first messages</h1>
    </div>
    <p class="sub">Each message was computed from public research before any import. Nothing went into GetSales and nothing was sent: Alex sends these six by hand.</p>
  </div>
  <div class="grid">
    <ol class="stages" aria-label="Pipeline stages, in order">{{STAGES}}</ol>
    <section aria-label="The six first messages">
      <p class="legend"><span class="l-op">Personal opener, written from the research</span><span class="l-fx">Same for all six</span></p>
      <div class="people">{{CARDS}}</div>
    </section>
  </div>
  <section class="csv" aria-labelledby="csv-h">
    <h2 id="csv-h">The CSV, as GetSales would import it</h2>
    <p class="cap">One row per person. <code>custom_message_1</code> is a lead field, so message 1 in every workflow is just <code>{{custom_message_1}}</code>. Messages are cut short here; the full text is in the cards above.</p>
    <div class="scroll">{{CSV}}</div>
  </section>
  <p class="foot">Nothing imported, nothing sent. The 36 demo workflows sit in the GetSales folder "Hackathon demo · Addvery" with no leads.</p>
</main>
</body>
</html>
"""

if __name__ == "__main__":
    main()
