# D1 section frame: the scraping research demo

Status: **frame, revised after research L-01**, 2 Nov 15:02; the LinkedIn rule and the sources were revised at 15:45. Structure and wording only; it holds no material from `..\Addvery Research\`. Every `{slot}` is filled in the git-ignored `draft\d1.md` from Alex's summary (the request's parts N2 to N7), and nothing reaches the site before he approves that draft.

The order follows the research (L-01 R1 and the synthesis, item 1.1): the result first, then three or four steps worded as outcomes, then the technical detail behind a fold. R1 found that pages leading with the tool or the process read as toys.

## How the page is built

- **Where:** its own page, `/d1`, as the website's spec does for every demo. One feed post announces it, and demo 1 in the "What's being built today" board links to it.
- **Reading time:** the title, result and steps read in under a minute, about 150 to 200 words. Everything else sits behind the fold.
- **Brand:** the website session applies Addvery's look. This frame carries no styling.
- **Blocks:** each part names the feed block type the website already renders (`p`, `list`, `highlight`, `quote`, `doc-link`), so the build changes content, not code, where it can. The fold is the one new element: a closed "Show me how" toggle.

## The page

**Title** (one of, chosen at the gate):
- "Demo 1: what scraping public sources told me about Addvery"
- "How I researched Addvery before writing to you"

### (a) The result (`highlight`, then `list` of 3 to 5)

**Highlight** (one line): Before writing to anyone at Addvery, I researched the company from public sources: its own website, {the business register and press}, and {n} ready-made scrapers on the Apify API ({total results} results in {time}, for ${cost}). Say truthfully which source ran on Apify and which didn't.

**What it found** (`list`), at company level, each with the kind of public source in brackets:
- {finding} ({source kind, e.g. "company website"})
- {finding} ({source kind})
- {finding} ({source kind})

### (b) How it works (`list`, 3 or 4 steps, each an outcome)

1. **I decided what to find out:** {the two or three questions, in one line}. A first message only works when it's about them.
2. **Public sources were read:** Addvery's own website {"by a crawler on the Apify API" if that ran, else "by agents reading it directly"}, {the business register and press, by a search agent}, and {n} actors on the Apify API, ready-made scrapers from Apify's marketplace. {If any read LinkedIn: "The LinkedIn results went only into the outreach demo, for the people it writes to. None of them appear on this page."}
3. **The results were cleaned and merged:** {cleaning, one line: duplicates removed, fields normalised, sources merged}.
4. **The research feeds the next demo:** it's what each lead in the GetSales outbound demo is enriched with, and what the personal first line of each message is written from. (Link to demo 3.)

### (c) Show me how (folded `list` and a small table)

| What it read | Apify actor (linked to its public Store page) | Results | Time | Cost |
| --- | --- | --- | --- | --- |
| {source, in plain words} | {actor name} | {count} | {minutes} | {$} |

- **Totals:** {n} actors, {total results} results, {minutes} minutes, ${cost} of a $10 cap. The figures are as Apify reported them for a run on {date}.
- **What broke, and how it was handled:** {one or two lines, or "Nothing broke on this run."}
- *Only if the summary shows several sources merged:* "Merging several sources into one record is the pattern a Clay waterfall automates; here it ran as a script on the scraped outputs."

### (d) Two framing lines (`p`, small, after the steps)

- No personal data appears on this page, by design: it shows public, company-level facts only.
- I chose the questions and the sources; the scrapers ran under my direction, and this page shows a stored result, not a live run.

**Source line** (`p`, small): Built from my own summary of the run's outputs. Public information only.

## Screen-care rules for the draft

The fill step (SPEC.md §7, methodology step 2), the cold read (step 3) and the review against §5 all apply these:

1. **Company level only.** No person's name, photo, title or profile link. Alex can add names at the gate; the default is none.
2. **No data sourced from LinkedIn on the page.** The findings come only from the summary's N4 items tagged [site] or [register]. The run table may name cookie-free LinkedIn actors, with counts, time and cost only. Alex can change this at the plan gate ("hide" or "aggregates"; research question Q13, R3).
3. **Nothing near the Apify proposal:** no proposal, pricing from it, account details, Console screenshots or Console links. Actor names link only to their public Apify Store pages.
4. **No raw data.** Counts and findings, never scraped rows, files or exports.
5. **Nothing from Alex's own GetSales outbound.** The arrow to demo 3 names the demo, not its leads or messages.
6. **A stored result, never a live run** on the page.
7. **Plain words first.** Every tool term ("actor", "API") gets a few plain words the first time it appears.
8. **Real numbers only:** each figure is the one Apify reported, or it's left out. No invented metrics, no "TODO", no placeholder text (synthesis X.4 and 8.15).
9. **Cite the source:** his summary, by description, never by file path.
