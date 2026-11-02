---
System Primitive: Agent request
Request State: Open
Request id: S-D1-R1
From: s-d1-scraping (the scraping demo's session, in scraping\)
To: the session working with Alex in Addvery Research\
Answers go in: Addvery Research\Scraping summary.md (git-ignored), never in this file
Approved by: Alex, desk question S-D1-Q1, 2 Nov 14:58 ("a, but have the scraping demo create a md file telling the addvery research session what it needs ... make sure it's clear that it will be completed agent-to-agent")
Created: 2026-11-02 15:00 Prague
Updated: 2026-11-02 15:02 Prague (N7, the LinkedIn column in N3, and the research's advice, after the project's research landed)
---

# Request: the scraping summary the site's scraping section is built from

## What this is

**This request is completed agent-to-agent. It is not a question for Alex.** You, the session working with Alex in `Addvery Research\`, answer it in his summary file, and the scraping demo's session (`s-d1-scraping`) picks the answers up from there. Neither of us sends Alex a desk question about it. He sees the result once, at the end, when he approves the finished section of the site.

**What this part of the project is.** The site is Alex's personalised job application to Addvery, built live during a recorded hackathon. One of its demos shows web scraping and research on the Apify API. Alex decided that the demo runs nothing itself: he scrapes Addvery with you, here in `Addvery Research\`, and writes a summary of the outputs, and the demo's session turns that summary into one short page on the site that a visitor follows in under a minute: the question, the run, the result. The page names Apify and the actors used (Alex allowed that).

**What you're asked.** Write `Addvery Research\Scraping summary.md` with the seven parts below, under the headings given in the skeleton at the end. Each part carries its own context. You can write it in any order and fill it in as the scraping finishes.

**What happens once it's ready.** Within 5 minutes the demo's session notices it, drafts the page from it into a git-ignored folder, and puts the whole draft in front of Alex for approval. Nothing reaches the site or the public repo before he ticks it. Separately, it passes the file names from part 5 to the project's orchestration session, so the demos that read your research get them on their reading lists.

**What's waiting on it.** The scraping section of the site, and the reading lists of the GetSales outreach demo, the Canva LinkedIn templates, the LinkedIn content demo and the website.

**Deadline.** Ready by 17:00 Prague at the latest, so Alex can approve the page before 18:00. After 18:00 an unapproved page waits for tomorrow morning's cleanup session. Sooner is better: an early part 5 unblocks the other demos' reading lists even before the rest is done.

**Two rules for the whole file.**
- `Addvery Research\` is git-ignored, and the summary stays there. Never write any answer into this request file: it's tracked and the repo is public.
- Nothing near the Apify proposal, and no secret: no token, no account details, no Console screenshots or Console links, nothing from Alex's private `hi-apify` repo.

# N1 Status and a rough time

The demo's session checks your summary every 5 minutes. It treats the file as ready only when its first line is `Status: ready` and the file hasn't changed for 2 minutes, so a half-written summary never starts the draft. While you're still working, keep the first line as `Status: draft`. The second line gives a rough time it will be ready, so the session knows when to start checking in.

Write, as the first two lines: `Status: draft` (or `Status: ready`), then `Ready by: <HH:MM Prague>`.

# N2 The question

The page's "how it works" steps start with what Alex wanted to know about Addvery, and why that matters before writing to anyone there. (The page itself opens with the result, part N4, because the project's research found that pages leading with the tool or the process read as toys.) Two or three company-level questions are enough, such as what the company sells and to whom, how it's organised, or what it's hiring for. One line on why: a first message only works when it's about them.

Write two or three questions and one line on why, in plain words.

# N3 The run

The middle of the page is one line per Apify actor that ran, in plain words first and the actor's name second, then the totals. Only what Apify itself reports for each run. Leave a cell as "n/a" if you don't have it.

Write one row per actor: what it read (in plain words), the actor's name and its Store id (`username/actor-name`), how many results, how long it ran, what it cost in US dollars, the date it ran, and whether its source was LinkedIn (yes or no). By default the page shows nothing sourced from LinkedIn and names no actor that logs in with LinkedIn cookies; Alex can change that when he approves the plan. Then one totals line: actors, results, minutes, dollars (Alex's cap is $10).

# N4 The result

The end of the page is what came out, at company level. These must be fit for a public page:
- public information only;
- no person named, pictured or linked (the stakeholder pages are handled separately, with Alex's own approval);
- findings and counts, never raw scraped rows or files.

Write three to five findings about Addvery, one line each. Mark any you'd rather keep off the page with `(not for the site)`.

# N5 Files the other demos read

Other demos read Alex's research straight from this folder, on this computer. They need the files named so they're on their reading lists. The demo's session only routes the names: it opens no file but this summary. As far as their specs say, each looks for:
- **The GetSales outreach demo:** the six stakeholders, each with a profile link, and the notes scraped on each one, which its first message is written from.
- **The Canva LinkedIn templates and the LinkedIn content demo:** the brand capture, both voice and visual identity.
- **The website:** the brand capture's visual identity, and the six marked as confirmed.

Write one line per file: its path relative to `Addvery Research\`, what it holds in a few words, and which demo reads it. Write "not yet" for anything that doesn't exist yet.

# N6 Anything to keep off the site

Beyond the rules above, is there anything the page must not show? A source, a finding, a number?

Write a list, or "nothing beyond the rules".

# N7 Cleaning, and what broke

The page's folded "show me how" part has one line on how the raw results became usable (duplicates removed, fields normalised, sources merged) and one line on what broke and how it was handled. The research found that hiring managers look for exactly this: a working path with its fixes shown reads as skill, while a perfect-looking run reads as a toy.

Write one to three lines on the cleaning and merging, and one to three on what broke (a failed run, a blocked site, an empty result) and what was done about it. "Nothing broke" is a fine answer.

## From the project's research: advice for the scraping itself

These come from the project's research on personal data (GDPR and LinkedIn's terms; not legal advice). The scraping is Alex's, so each one is his call, not a requirement of this request:
- Prefer company-published sources (the company site, press releases, talks, job posts) over LinkedIn for anything that could reach the public site. LinkedIn's terms ban scraping, and the risk lands on Alex's own account.
- Avoid actors that log in with LinkedIn cookies.
- Filter each actor's output down to the fields actually used, and delete the rest; off-the-shelf people actors return whole profiles.
- Keep raw outputs in this git-ignored folder, as now. Never copy them into a tracked folder.
- If the recording is running, keep the Apify Console cropped to the run being shown, and keep the proposal off screen.

## Skeleton for `Addvery Research\Scraping summary.md`

```markdown
Status: draft
Ready by: <HH:MM Prague>

# Scraping summary

## N2 The question
- <question>
- <question>
Why: <one line>

## N3 The run
| What it read | Actor | Store id | Results | Time | Cost (USD) | Date | From LinkedIn? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| <plain words> | <name> | <username/actor-name> | <n> | <min> | <$> | <date> | <yes/no> |
Totals: <actors> actors, <results> results, <minutes> minutes, $<cost> of the $10 cap.

## N4 The result
- <finding>
- <finding>
- <finding>

## N5 Files other demos read
- `<path>`: <what it holds>; read by <demo>

## N6 Keep off the site
- <item, or "nothing beyond the rules">

## N7 Cleaning, and what broke
- Cleaning: <one to three lines>
- What broke: <one to three lines, or "nothing broke">
```

## When you're done, or stuck

- **Done:** change the first line to `Status: ready`. If you can message other sessions, also send `s-d1-scraping` one line: `SUMMARY READY S-D1-R1`. The file alone is enough if you can't.
- **A question for the demo's session:** message `s-d1-scraping` directly, not the answer desk. If you can't message sessions, write it under a final heading `## Questions for the scraping demo` in the summary. The session checks for that heading every 5 minutes, even while the status is `draft`, and answers in this request file's "Answers from the scraping demo" section below, which holds no Addvery material.
- **Something only Alex can decide:** ask him in your own chat, since you're working with him one-on-one.

## Answers from the scraping demo

None yet.
