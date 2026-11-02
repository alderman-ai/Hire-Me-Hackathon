# D1 section frame: the scraping research demo

Status: **frame**, 2 Nov 14:50. Structure and wording only; it holds no material from `..\Addvery Research\`. Every `{slot}` is filled in the git-ignored `draft\d1.md` from Alex's summary, and nothing reaches the site before he approves that draft. The final layout and wording wait for research L-01: R1 (making the work legible) and R3 (personal data on a public site).

## How the page is built

- **Where:** its own page, `/d1`, as the website's spec does for every demo. One feed post announces it, and demo 1 in the "What's being built today" board links to it.
- **Reading time:** under a minute. About 200 words show before any "details" fold.
- **Shape:** three steps a visitor reads top to bottom: the question, the run, the result. Then one arrow to the next demo.
- **Brand:** the website session applies Addvery's look. This frame carries no styling.
- **Blocks:** each part below names the feed block type the website already renders (`p`, `list`, `highlight`, `quote`, `doc-link`), so the build changes content, not code, where it can.

## The page

**Title** (one of, chosen at the gate):
- "Demo 1: researching Addvery with web scraping"
- "How I researched Addvery before writing to you"

**Lede** (`p`, one sentence): Before writing to anyone at Addvery, I ran {n} ready-made scrapers on the Apify API over public sources about the company, and turned what came back into the research the other demos on this site build on.

### 1. The question (`p`, 2 to 3 lines)

What I wanted to know about Addvery, and why it matters for outreach: {the two or three company-level questions from the summary}. A first message only works when it's about them, so the research comes before any message.

### 2. The run (`list` or a small table, then a `highlight`)

One line per scraper, in plain words first and the name second:

| What it read | Apify actor (linked to its public Store page) | Results | Time | Cost |
| --- | --- | --- | --- | --- |
| {source, in plain words} | {actor name} | {count} | {minutes} | {$} |

**Highlight:** {n} scrapers, {total results} results, about {minutes} minutes, ${cost} of a $10 cap.

One plain line under it: An "actor" is a ready-made scraper from Apify's marketplace, run through Apify's API. This page shows the stored result of a run on {date}; nothing runs live here.

### 3. The result (`list`, 3 to 5 items)

What came out, at company level: {three to five findings from the summary}.

**Where it goes next** (`highlight`, links to demo 3): This research is the input to the GetSales outbound demo: it's what each lead is enriched with, and what the personal first line of each message is written from.

**Source line** (`p`, small): Built from my own summary of the run's outputs. Public information only.

## Screen-care rules for the draft

The fill step (SPEC.md §7, methodology step 2) and the review against §5 both apply these:

1. **Company level only.** No person's name, photo, title or profile link. Alex can add names at the gate; until R3 lands, the default is none.
2. **Nothing near the Apify proposal:** no proposal, pricing from it, account details, Console screenshots or Console links. Actor names link only to their public Apify Store pages.
3. **No raw data.** Counts and findings, never scraped rows, files or exports.
4. **Nothing from Alex's own GetSales outbound.** The arrow to demo 3 names the demo, not its leads or messages.
5. **A stored result, never a live run** on the page.
6. **Plain words first.** Every tool term ("actor", "API") gets a few plain words the first time it appears.
7. **Cite the source:** his summary, by description, never by file path.
