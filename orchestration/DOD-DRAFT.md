# Project definition of done: draft

Written by S2 (the `orchestration` session) from the charter alone, 2 Nov. Status: **signed off by the operator in DI-5 with one change** (2 Nov: "loosen up the harsh language. Basically take the 'research doesn't run without me' kind of language out of the DOD"), so DoD-4 no longer requires his approval for every piece of research. **Written into the charter as C03** (2 Nov), and the placeholder ids in the specs swapped for these ids in the same change. The charter's "Definition of done" is now the source of truth: later changes go there through `change-dod`, not here.

Rules it follows (charter): every item has an id and traces to at least one deliverable; every spec's own definition of done links to items by id; the outline is complete only when every item is claimed by at least one row. Ids are never renumbered or reused; a dropped item is marked retired. Each item is an outcome someone who wasn't there could check tomorrow morning, not an instruction.

S-D2 is operator-owned (DI-2 Q2.2, DI-3 Q3.3, change C01): its items are claimed by the S-D2 row, which Alex runs himself in `Addvery Research\`.

| Id | Item | How it's checked | Traces to | Claimed by |
| --- | --- | --- | --- | --- |
| DoD-1 | Every spec in the outline and every role session has its own working folder at the project root, with a CLAUDE.md whose reading list starts with the charter. | `propagate check`: every row has a folder and a CLAUDE.md; each reading list's first line is `..\CHARTER.md`. | M0 | S0 |
| DoD-2 | Every session follows one set of git rules and commits its own work, and GitHub's `main` holds all committed work by the morning. | `GIT.md` exists; `git log` shows path-limited commits per folder; `origin/main` equals local `main`. | M0 | S0 |
| DoD-3 | Any spec session can be launched from its own folder under its roster name, and gets a question through to the answer desk, which shows the operator one question at a time. | Each roster row has a launch line; at least one spec session's question appears in `answer-desk\qa\<asker>.md` with Alex's answer. | M0 | S0 |
| DoD-4 | Every wave-2 spec that needs research has a research list, shaped with the operator's input. | Each wave-2 spec that needs research has its list in `research\`, with Alex's input noted where he gave it. | M1 | S1 |
| DoD-5 | Every approved research item has a stored report with an index entry, and each report is on the reading list of every spec that needs it. | Every approved item has a report and a `DIRECTORY.md` entry; every reader spec's "Routing and resources" names it. | M1 | S1, S2 |
| DoD-6 | A new deliverable can be added to the charter in one step, and every dependent place (outline, run order, DoD, roster, folder, reading lists, the site's deliverables view) shows it. | One `add-deliverable` run, then `propagate check` reports clean. | M2 | S2 |
| DoD-7 | The project definition of done is in the charter, every item traced to a deliverable and claimed by at least one outline row, and the outline is marked signed off before wave 2 starts. | The charter's "Definition of done" holds DoD-1 onwards; `propagate check` finds no unclaimed item and no placeholder id; the outline carries "Signed off by S2". | M2 | S2 |
| DoD-8 | A legible demo of scraping and research on the Apify API is on the live site, in Addvery's brand. | The site has a D1 section that a visitor can follow without explanation. | D1, D8 | S-D1 |
| DoD-9 | The scraping demo's research output exists in a form other specs read, and is on their reading lists. | The output files exist; the specs that consume it name them in "Routing and resources". | D1 | S-D1 |
| DoD-10 | Addvery's top six stakeholders are identified and confirmed by the operator. | The six are listed in `Addvery Research\` and marked confirmed by Alex. | D2 | S-D2 (operator-owned) |
| DoD-11 | An Addvery brand capture (voice and visual identity) exists for the LinkedIn templates and content demos to use. | The capture is in `Addvery Research\`, and S-D6 and S-D7 name it as a resource. | D6, D7 | S-D2 (operator-owned) |
| DoD-12 | Ten ICPs, each with a drip sequence, and a classifier that routes each lead to the right automation are set up in GetSales, with no automation sending except the live run. | GetSales shows the ten sequences and the classifier; no send outside the live run. | D3 | S-D3 |
| DoD-13 | The full pipeline (Sales Navigator, CSV export, enrichment from D2, a computed first-message variable, import into GetSales) ran live on the six stakeholders through the operator's own sender profile, and a video clipped from the rig recordings shows it. | The clip exists and is on the site; it shows each pipeline stage. | D3, D9 | S-D3, S-D9 |
| DoD-14 | Fifteen minutes of operator dictation turns into a good-looking, near-final blog post, with only the last 10% left to him. | One test dictation produced a post Alex accepted as near-final. | D4 | S-D4 |
| DoD-15 | Three blog posts, each from a 15-minute dictation through the blog pipeline and finished by the operator, are published on the site. | The three posts are live on the site. | D5, D8 | S-D5 |
| DoD-16 | LinkedIn visual asset templates in Canva, in Addvery's brand, have the operator's brand sign-off. | The templates exist in Canva; Alex's sign-off is recorded. | D6 | S-D6 |
| DoD-17 | A demo of LinkedIn content created in Addvery's voice, built on the operator's brand capture repo, has his brand sign-off and is shown on the site. | The demo is on the site; Alex's sign-off is recorded. | D7, D8 | S-D7 |
| DoD-18 | The live site, in Addvery's branding, has a section for each of the six stakeholders from D2. | Six stakeholder sections on the live site, matching DoD-10's list. | D8, D2 | S-D8 |
| DoD-19 | The site shows every deliverable and its status, so visitors know what to expect, and kept getting clearer through the day without the operator asking. | The site has a deliverables view; the site's history shows additions made from build requests, not only from Alex's instructions. | D8, D9 | S-D8, S-D9 |
| DoD-20 | Every processed rig session was reviewed, and its most valuable moments reached the site through build requests to the website session, at least every two hours while sessions were being filed. | `legibility\posted.md` covers every filed session; the gaps between posts while filing never exceed two hours. | D9 | S-D9 |
| DoD-21 | A recording of the operator designing in Canva, made near the end, is on the site. | The video is live on the site. | D10, D8 | S-D10 |
| DoD-22 | Nothing published (the site, its videos, the public repo) shows secrets, the Apify proposal or the operator's own GetSales outbound. | A check of the site, the published videos and the repo finds none of them. | D1 to D10 | S-D8, S-D9 |

## Placeholder map

Applied at sign-off through `propagate`; kept in the change record.

| Placeholder | Becomes |
| --- | --- |
| DoD-S0-a, DoD-S0-b | DoD-1 |
| DoD-S0-c | DoD-2 |
| DoD-S0-d, DoD-S0-e | DoD-3 |
| DoD-S1-a, DoD-S1-b, DoD-S1-f | DoD-4 |
| DoD-S1-c, DoD-S1-d, DoD-S1-e | DoD-5 |
| DoD-S2-a | DoD-6 |
| DoD-S2-b, DoD-S2-c | DoD-7 |
