---
System Primitive: Operator task
Task type: Gate approval
Task id: OT-02
Task State: Open
Gate: S2 charter change preview (C01, C02)
Requested by: orchestration
Snapshot of: orchestration\changes\C01-sd2-operator-owned.md and C02-reading-list-pointer.md at the commit that adds this task
Unblocks: applying C01 and C02 to the charter, which clears the last consistency gap before the outline sign-off and wave 2
Created: 2026-11-02 14:18 Prague
---

# Approve: two updates to the project plan

## What this is

**About 3 minutes to read this section and the next one. The exact wording further down is there if you want to check it. Please answer as soon as you can, because the demos are waiting on it.**

The charter is the project's master plan: the document every session builds from. Each demo also has its own spec, the working document its session follows. I'm the session that keeps the plan, and everything built from it, consistent. Right now the plan still says two things you changed earlier today. These two updates write your answers into it.

**Update 1: the Addvery research is yours.** The research on Addvery and its six key people, plus capturing Addvery's brand voice and look, is your own work in your `Addvery Research` folder. You said so earlier today: "I'm going to be doing it in the subdirectory Addvery Research. You do not need to build a spec to handle that." It stops being a separate automated piece of the project. The demos that need it read it from that folder on your computer.

**Update 2: each demo carries its own reading list.** The plan's single central research reading list goes. Instead, each demo's spec carries its own list of the research it reads before it starts. The research reports themselves are kept in the `research` folder. That was also your call earlier today: "Reading lists go into the executable specs", and on where reports live, "Just store it locally".

**What happens when you tick the box.** I write both updates into the plan, word for word as shown below, and run the consistency check across the plan and every file that depends on it. Then I mark the plan's list of demos as signed off. That lets the nine demos start being built: the scraping demo, the GetSales outreach demo, the blog pipeline, the three blog posts, the Canva LinkedIn templates, the LinkedIn content demo, the website, the clip-to-website analyser and the Canva design video.

**What's waiting on it:** exactly that start. The list of demos can't be signed off while the plan contradicts what you've said, so none of the nine demos can begin.

**If you want changes,** leave the box empty and write them in the box at the bottom. For example: "first update only", "drop both", or your own wording for any passage below. If you haven't answered by 18:00, I apply both as written and note that I did, because both only carry out what you've already said.

## What changes, in plain words

### Update 1: the Addvery research is yours

Places in the plan it touches:
- **The list of demos, the Addvery research row.** It's marked as yours, with no spec and no session of its own. It says you research Addvery, find its six key people and capture its brand yourself, in your `Addvery Research` folder, which stays on your computer and out of the public repo. It no longer waits on the research setup. What it needs from you becomes "all of it".
- **The list of demos, the Canva LinkedIn templates row and the LinkedIn content demo row.** Their input now says where the brand capture comes from: your own work, in your `Addvery Research` folder.
- **The run order.** Three lines change:
  - the Addvery research has no session, because you run it in your folder;
  - it feeds the GetSales outreach demo and the website from that folder;
  - the brand capture, also in your folder, feeds the Canva templates and the LinkedIn content demo.
- **Your scenes to shoot today.** "Confirming the six stakeholders" becomes your own work in `Addvery Research`: Addvery, the six key people and the brand capture.
- **The open questions.** "Who owns Addvery brand capture?" is ticked as answered: you do, as part of your Addvery research.
- **Two intros.** The list of deliverables currently says every deliverable becomes its own spec. It gains "except the Addvery research, which you run yourself". The list of demos currently says every row is one spec. It gains "except a row marked as yours".
- **The research setup's priorities.** The scraping demo comes first. The research setup has no Addvery topics, because that research is yours.
- **One rule.** See "The one rule change" below.

Outside the plan, nothing is edited now:
- The folder plan from the setup and the list of running sessions already show the Addvery research as yours, with no session.
- The specs for the GetSales outreach demo, the Canva templates, the LinkedIn content demo and the website each get one line pointing at your `Addvery Research` folder. Each line says to read it from your computer, never from GitHub, and never to edit it.
- The website session is told to show the Addvery research as yours on the site, and to refresh its copy of the plan. The research session is told that its priority line in the plan now matches its spec.
- Nothing ever touches your `Addvery Research` folder.

### Update 2: each demo carries its own reading list

Places in the plan it touches:
- **The research reading list section.** It stops being one central list, which was still empty, and becomes a pointer:
  - each spec carries its own reading list;
  - the reports live in the `research` folder: `research\global` for research the whole project or several demos need, and a subfolder per demo for its own research;
  - the research setup keeps an index of all of them.
  Your note at the top of the section, about steering the research yourself, stays word for word.
- **The plan's purpose, item 1.** The reading list is now described as a pointer to where each spec's research is listed and stored.
- **The research setup's row in the list of demos, and three lines in its own section.** "Fills the research reading list" becomes "produces the findings that each spec's reading list points to". Its research counts as done once it's on the reading list of every spec that needs it.
- **My own section.** What I keep in sync now says "specs' research reading lists" instead of "the research reading list".

Outside the plan, nothing is edited. No reading list moves, because the central list was empty, and the research setup and I already work this way. The research session is told that its own description still says "fills the research reading list", so it can reword it. The website session is told to refresh its copy of the plan.

### The one rule change

The definition of done is the list of things that must be true for the project to count as finished. Each one is a done-item. The plan has a rule: the list of demos is complete only when every done-item is claimed by a demo.

Two done-items are yours: the six key people, identified and confirmed by you, and Addvery's brand capture (its voice and look). After update 1 they belong to your own work, not to a demo, so the rule would fail. It becomes: **every done-item must be claimed by a demo or by your own work.** No other rule changes.

## The exact wording

This is the plan's text before and after, exactly as it will be written. Wherever the text uses a code, its meaning follows in square brackets the first time it appears in each passage. Those brackets are only for you and won't be written into the plan. The one exception is the note at the top of the research reading list section (update 2, passage 3), which is the plan's own and is already there. "The operator" in the plan means you.

### Update 1: the Addvery research is yours

**1. The list of demos, the Addvery research row, cell by cell.**

| Cell | Before | After |
| --- | --- | --- |
| Spec | S-D2 [the Addvery company and key-people research] — Company and stakeholder research | S-D2 [the Addvery company and key-people research] — Company and stakeholder research (operator-owned) |
| Outline | Researches Addvery and finds its top six stakeholders. | Operator-owned, with no spec or session (DI-2 Q2.2 [your earlier answer in the setup intake: the Addvery research folder is yours], DI-3 Q3.3 [your earlier answer in the research intake: you do the Addvery research yourself, with no spec]): the operator researches Addvery, finds its top six stakeholders and captures its brand himself, one-on-one, in `Addvery Research\`, which is local and git-ignored. |
| Depends on | S1 [the research setup]; may use S-D1's [the scraping research demo's] scrapers | May use S-D1's [the scraping research demo's] scrapers |
| Needs the operator for | Confirming the six stakeholders | All of it: he runs it himself, one-on-one |

**2 and 3. The list of demos, the Canva LinkedIn templates row and the LinkedIn content demo row, the "Depends on" cell. The other cells don't change.**
> **Before:** Addvery brand capture
>
> **After:** Addvery brand capture, from S-D2 [the Addvery company and key-people research] (the operator's own, in `Addvery Research\`)

**4. The run order, step 3.**
> **Before:** 3. **S-D1 [the scraping research demo] Scraping and S-D2 [the Addvery company and key-people research] Addvery research**, first in wave 2 [the client-facing demos], because others consume them.
>
> **After:** 3. **S-D1 [the scraping research demo] Scraping and S-D2 [the Addvery company and key-people research] Addvery research**, first in wave 2 [the client-facing demos], because others consume them. S-D2 has no session: the operator runs it himself in `Addvery Research\`.

**5. The run order, step 4, the line on what the Addvery research feeds.**
> **Before:** S-D2 [the Addvery company and key-people research] feeds S-D3 [the GetSales outreach demo] (GetSales) and S-D8 [the website] (website).
>
> **After:** S-D2 [the Addvery company and key-people research], from `Addvery Research\`, feeds S-D3 [the GetSales outreach demo] (GetSales) and S-D8 [the website] (website).

**6. The run order, step 4, the brand-capture line.**
> **Before:** Brand capture feeds S-D6 [the Canva LinkedIn templates] (Canva templates) and S-D7 [the LinkedIn content demo] (LinkedIn content). S-D6 feeds S-D10 [the Canva design video] (Canva video).
>
> **After:** Brand capture, part of S-D2 [the Addvery company and key-people research] and also in `Addvery Research\`, feeds S-D6 [the Canva LinkedIn templates] (Canva templates) and S-D7 [the LinkedIn content demo] (LinkedIn content). S-D6 feeds S-D10 [the Canva design video] (Canva video).

**7. The run order, your scenes to shoot today.**
> **Before:** **Operator scenes to shoot today:** the S0 [the setup: folders, sessions and the answer desk] directory approval, S1 [the research setup] research details, confirming the six stakeholders, the S-D3 [the GetSales outreach demo] live run, the S-D4 [the blog pipeline] test dictation and the three S-D5 [the three blog posts] dictations, brand sign-off, and the S-D10 [the Canva design video] Canva recording.
>
> **After:** **Operator scenes to shoot today:** the S0 [the setup: folders, sessions and the answer desk] directory approval, S1 [the research setup] research details, his own S-D2 [the Addvery company and key-people research] work in `Addvery Research\` (Addvery, the six stakeholders and brand capture), the S-D3 [the GetSales outreach demo] live run, the S-D4 [the blog pipeline] test dictation and the three S-D5 [the three blog posts] dictations, brand sign-off, and the S-D10 [the Canva design video] Canva recording.

**8. The open questions, the brand-capture question, ticked.**
> **Before:** - [ ] Who owns Addvery brand capture: S1 [the research setup] as shared research, or S-D2 [the Addvery company and key-people research]?
>
> **After:** - [x] Who owns Addvery brand capture: S1 [the research setup] as shared research, or S-D2 [the Addvery company and key-people research]? Answered: the operator, as part of S-D2, which he runs himself in `Addvery Research\` with no spec (DI-2 Q2.2 [your earlier answer in the setup intake: the Addvery research folder is yours], DI-3 Q3.3 [your earlier answer in the research intake: you do the Addvery research yourself, with no spec]).

**9. The list of deliverables, its intro.**
> **Before:** The project has ten client-facing deliverables plus three meta deliverables, in two waves. Every client-facing deliverable is a demonstration in the Addvery brand: legibility matters more than function, and no real data runs through it except where noted. Each one becomes its own spec.
>
> **After:** The project has ten client-facing deliverables plus three meta deliverables, in two waves. Every client-facing deliverable is a demonstration in the Addvery brand: legibility matters more than function, and no real data runs through it except where noted. Each one becomes its own spec, except D2 [the Addvery company and key-people research], which the operator runs himself.

**10. The list of demos, its intro.**
> **Before:** This is the decomposition, not the specs themselves. Each row is one future executable spec. Once the definition of done exists, every item in it must be claimed by at least one row.
>
> **After:** This is the decomposition, not the specs themselves. Each row is one future executable spec, except a row marked operator-owned, which the operator runs himself with no spec. Once the definition of done exists, every item in it must be claimed by at least one row.

**11. The research setup's section, its priority line.**
> **Before:** - **Priority.** S-D1 [the scraping research demo] (scraping) and S-D2 [the Addvery company and key-people research] (Addvery and stakeholders) come first, because other specs consume them. Shared topics such as brand capture are researched once, never per spec.
>
> **After:** - **Priority.** S-D1 [the scraping research demo] (scraping) comes first, because other specs consume it. Addvery, its six stakeholders and brand capture are the operator's own (S-D2 [the Addvery company and key-people research]), so S1 [the research setup] has no Addvery topics. Shared topics are researched once, never per spec.

**12. The definition of done, its third rule.** This is the one rule change explained above. The done-items for the six key people and for the brand capture are claimed only by your Addvery research row, which after passage 10 isn't a spec.
> **Before:** The spec outline is complete only when every item is claimed by at least one spec.
>
> **After:** The spec outline is complete only when every item is claimed by at least one spec or operator-owned row.

### Update 2: each demo carries its own reading list

**1. The plan's purpose, item 1.**
> **Before:** 1. **A research reading list:** a place for every spec's research, with its contents decided on the Claude Code side.
>
> **After:** 1. **A research reading list:** a pointer to where every spec's research is listed (in each spec) and stored (in `research\`), with its contents decided on the Claude Code side.

**2. The list of demos, the research setup's row, the Outline cell. The other cells don't change.**
> **Before:** Owns the research subdirectory. Sets the methodology and fills the research reading list with the operator, within the usage budget.
>
> **After:** Owns the research subdirectory. Sets the methodology and, with the operator, produces the findings that each spec's reading list points to, within the usage budget.

**3. The research reading list section, its body.** The heading stays, and so does the note at the top, word for word.
> **Before:**
> [do not attempt to do this without the operator in the loop -- he will override and micromanage the research part once the meta specs/tooling is set up. ]
>
> This section is the project's research reading list: the findings each spec reads before it starts. Filling it is one of the first tasks on the Claude Code side, done with the operator. That pass decides what gets researched, how deep each topic goes, and where findings are stored.
>
> Reading list: empty until that pass fills it.

> **After:**
> [do not attempt to do this without the operator in the loop -- he will override and micromanage the research part once the meta specs/tooling is set up. ]
>
> This section is a pointer, not a list (DI-4 Q4.2 [your earlier answer in the orchestrator intake: reading lists go into the specs]). Each executable spec carries its own research reading list, the findings it reads before it starts, in its "Routing and resources" section. What gets researched, and how deep, is decided with the operator through S1 [the research setup], which indexes every finding in `research\DIRECTORY.md`. Reports stay in `research\` (S1-Q5 [your answer to the research setup's question on where reports live: "Just store it locally"]): `research\global\` for research the whole project or several specs need, `research\<spec folder>\` for one spec's own. S2 [the project orchestrator: the session that keeps the plan consistent] adds each report to the reading list of every spec that needs it.

**4. The research setup's section, its intro.**
> **Before:** S1 [the research setup] owns the research subdirectory and fills the research reading list through delegated research tasks, within a usage budget that rules out deep research on every topic.
>
> **After:** S1 [the research setup] owns the research subdirectory and produces the findings that each spec's reading list points to, through delegated research tasks, within a usage budget that rules out deep research on every topic.

**5. The research setup's section, the line on where findings are stored.**
> **Before:** Findings stored in one place with an index, so specs' CLAUDE.md reading lists can point at them.
>
> **After:** Findings stored in one place, `research\`, with an index, so each spec's own reading list (its "Routing and resources" section) can point at them.

**6. The research setup's section, its "Done when" line.**
> **Before:** **Done when** every topic agreed with the operator has findings at its chosen depth, linked from the reading list.
>
> **After:** **Done when** every topic agreed with the operator has findings at its chosen depth, linked from the reading list of every spec that needs them.

**7. My own section, the line on what I keep in sync.**
> **Before:** Propagate each change to everything that depends on it: the spec outline, the research reading list, CLAUDE.md reading lists, and specs' links to DoD [definition of done] items.
>
> **After:** Propagate each change to everything that depends on it: the spec outline, specs' research reading lists, CLAUDE.md reading lists, and specs' links to DoD [definition of done] items.

## Approval

- [ ] I approve

Tick the box to approve as it stands. If something has to change first, leave the box empty and write what to change below. Either way, the requesting session checks this file every 5 minutes while it's blocked.

`<operator_answer>`
```ot-02-changes

```
`</operator_answer>`
