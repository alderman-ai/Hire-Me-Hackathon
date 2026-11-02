---
System Primitive: Intake file
Intake State: Waiting on operator
Intake id: DI-5
Created: 2026-11-02
Build goals: []
---

# Decision intake 5

This intake holds one decision: signing off the project definition of done that S2 (the orchestration session) drafted from the charter. The question carries all its own context. An empty fence means not answered. Say "DI-5 is ready" when you're done.

# Q5.1 Sign off the project definition of done

The charter leaves the project definition of done to Claude Code and gives it to S2: "S2 (Project orchestrator) owns it and gives the final sign-off on it." Its rules, quoted:

- "Every item gets an ID (DoD-1, DoD-2, and so on) and traces to at least one deliverable above."
- "Every spec's own definition of done links to items by those IDs."
- "The spec outline is complete only when every item is claimed by at least one spec."

Once you've signed it off, S2 writes it into the charter, swaps the placeholder ids S0 and S1 already use (DoD-S0-a, DoD-S1-a and so on) for the real ones, and checks that every item is claimed. Then S2 marks the spec outline signed off, and **wave 2 can start**. Ids never change or get reused: a dropped item is marked retired. Any item can still be changed later in one step.

Each item is a result someone who wasn't here could check tomorrow morning, not an instruction for how to build it. Every deliverable gets one to three items. S-D2 is yours (DI-2 Q2.2 and DI-3 Q3.3), so its items, the six stakeholders and the brand capture, are claimed by the S-D2 row you run in Addvery Research.

| Id | Item | How it's checked | Traces to | Claimed by |
| --- | --- | --- | --- | --- |
| DoD-1 | Every spec in the outline and every role session has its own working folder at the project root, with a CLAUDE.md whose reading list starts with the charter. | Every row has a folder and a CLAUDE.md; each reading list starts with the charter. | M0 | S0 |
| DoD-2 | Every session follows one set of git rules and commits its own work, and GitHub's main holds all committed work by the morning. | The git rules file exists; the log shows each folder's own commits; GitHub matches local. | M0 | S0 |
| DoD-3 | Any spec session can be launched from its own folder under its roster name, and gets a question through to the answer desk, which shows you one question at a time. | Each roster row has a launch line; a spec session's question and your answer are in its desk record. | M0 | S0 |
| DoD-4 | Every wave-2 spec has a research list you approved, merged or skipped, and no research ran without your approval. | Each list is marked by you; S1's decision log shows no research decided by default. | M1 | S1 |
| DoD-5 | Every approved research item has a stored report with an index entry, and each report is on the reading list of every spec that needs it. | Every approved item has a report and an index entry; every reader spec names it. | M1 | S1, S2 |
| DoD-6 | A new deliverable can be added to the charter in one step, and every dependent place (outline, run order, DoD, roster, folder, reading lists, the site's deliverables view) shows it. | One add-deliverable run, then the consistency check reports clean. | M2 | S2 |
| DoD-7 | The project DoD is in the charter, every item traced to a deliverable and claimed by at least one outline row, and the outline is marked signed off before wave 2 starts. | The charter holds DoD-1 onwards; no unclaimed item, no placeholder id; the outline says "Signed off by S2". | M2 | S2 |
| DoD-8 | A legible demo of scraping and research on the Apify API is on the live site, in Addvery's brand. | The site has a D1 section a visitor can follow without explanation. | D1, D8 | S-D1 |
| DoD-9 | The scraping demo's research output exists in a form other specs read, and is on their reading lists. | The output files exist; the specs that use them name them. | D1 | S-D1 |
| DoD-10 | Addvery's top six stakeholders are identified and confirmed by you. | The six are listed in Addvery Research and marked confirmed. | D2 | S-D2 (yours) |
| DoD-11 | An Addvery brand capture (voice and visual identity) exists for the LinkedIn templates and content demos to use. | The capture is in Addvery Research, and S-D6 and S-D7 name it. | D6, D7 | S-D2 (yours) |
| DoD-12 | Ten ICPs, each with a drip sequence, and a classifier that routes each lead to the right automation are set up in GetSales, with nothing sending except the live run. | GetSales shows the ten sequences and the classifier; no send outside the live run. | D3 | S-D3 |
| DoD-13 | The full pipeline (Sales Navigator, CSV export, enrichment from D2, a computed first-message variable, import into GetSales) ran live on the six stakeholders through your own sender profile, and a video clipped from the rig recordings shows it. | The clip is on the site and shows each stage. | D3, D9 | S-D3, S-D9 |
| DoD-14 | Fifteen minutes of your dictation turns into a good-looking, near-final blog post, with only the last 10% left to you. | One test dictation produced a post you accepted as near-final. | D4 | S-D4 |
| DoD-15 | Three blog posts, each from a 15-minute dictation through the blog pipeline and finished by you, are published on the site. | The three posts are live. | D5, D8 | S-D5 |
| DoD-16 | LinkedIn visual asset templates in Canva, in Addvery's brand, have your brand sign-off. | The templates exist in Canva; your sign-off is recorded. | D6 | S-D6 |
| DoD-17 | A demo of LinkedIn content in Addvery's voice, built on your brand capture repo, has your brand sign-off and is on the site. | The demo is on the site; your sign-off is recorded. | D7, D8 | S-D7 |
| DoD-18 | The live site, in Addvery's branding, has a section for each of the six stakeholders from D2. | Six stakeholder sections, matching DoD-10's list. | D8, D2 | S-D8 |
| DoD-19 | The site shows every deliverable and its status, so visitors know what to expect, and kept getting clearer through the day without you asking. | A deliverables view exists; the site's history shows additions made from build requests, not only from your instructions. | D8, D9 | S-D8, S-D9 |
| DoD-20 | Every processed rig session was reviewed, and its most valuable moments reached the site through build requests, at least every two hours while sessions were being filed. | The legibility log covers every filed session, with no gap over two hours. | D9 | S-D9 |
| DoD-21 | A recording of you designing in Canva, made near the end, is on the site. | The video is live. | D10, D8 | S-D10 |
| DoD-22 | Nothing published (the site, its videos, the public repo) shows secrets, the Apify proposal or your own GetSales outbound. | A check of the site, the videos and the repo finds none of them. | D1 to D10 | S-D8, S-D9 |

**Options.**
- **A.** Sign off as written. Recommended, unless an item is wrong: any item can still be changed later in one step, and signing off is what lets wave 2 start.
- **B.** Sign off with changes: name the ids, and what to change, add or drop.
- **C.** Something else: say what.

**If the fence stays empty:** S2 keeps waiting until 18:00 Prague and pokes you through the answer desk every 15 minutes. From 18:00, it signs off as written, logs that in its decision log, and applies any later answer as a change.

Write A, or B followed by the ids and your changes, or C and what you want instead.

## A5.1

`<operator_answer>`
```a-5-1

```
`</operator_answer>`
