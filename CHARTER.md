# Hire Me Hackathon Charter

2 November 2026 · Alex Alderman

This charter is the parent context for a set of executable specs: it says why the project exists, what the deliverables are, and how they fit together, and it never says how to build any one of them. This version is a rough draft, ready to hand to Claude Code as Markdown.

## Purpose and boundary

This charter is the operator's visible outline of the whole project. The executable work runs in terminal sessions, which take their context from here.

**This phase is done when the charter holds two things:**

1. **A research reading list:** a pointer to where every spec's research is listed (in each spec) and stored (in `research\`), with its contents decided on the Claude Code side.
2. **The parameters for the three meta specs**, Bootstrap (S0), Research (S1) and Project orchestrator (S2): what each one is and what it must do. A new session must be able to write all three from this document alone. They run before any other spec, and the operator is in the loop while each one is written.

**What stays out:** the specs themselves, including S0 to S2, and any instruction for how to build a deliverable. Those belong in the executable specs.

## Core principles

Every spec inherits these and cites them by number. A new principle takes the next number, and existing numbers never change.

1. **P1 — Parallel by default.** Work is split so that as many sessions as possible run at the same time. Good Git hygiene is what makes that safe: every session commits its own work, early and often.
2. **P2 — One session, one role.** Each executable spec gets its own session. One orchestration session owns the dependency map: which specs run in parallel and which wait on others. All sessions run in the background and can message each other. Gates are designed around those messages, both to the operator and between sessions.
3. **P3 — Operator time is the main bottleneck (the movie-actor rule).** An expensive actor's scenes are shot first, out of story order, because his time costs the most. Every spec surfaces everything that needs the operator (recordings, judgment calls, lists of questions) at its start. Once those are answered, the rest of the spec runs without him. This is **async human in the loop**.
4. **P4 — Operator focus is tighter than operator time.** No question for the operator sits in one session's own chat. Every question goes to the **answer desk**, a single session with its own monitor that puts one question at a time in front of the operator. The pattern is reused from an earlier project where it worked well.
5. **P5 — Front-load, then only critical interrupts.** After a spec's opening round with the operator, its session interrupts him only for something critical. Never allow this to halt a build! If you don't get a response for 15 mins, assume the operator is afk, and then the assistant orchestrating that session gets to make the decision, but has a place in each of the executable specs that lists:
   - all the decisions made
   - the justification
   - why it is the right thing to do
   - the blast radius if needed to be changed
6. **P6 — Spend the operator window, build overnight.** Work that needs the operator is scheduled into the hours he is at the computer. Everything else is set up to run autonomously overnight, so that the morning cleanup session has little to clean. Autonomous work can also run during the day, but never at the cost of idle operator time.
7. **P7 — Semantic cohesion, heavy delegation.** A spec's boundary is drawn around one semantically cohesive cluster of work. One orchestrator session runs each spec and delegates as much as possible to subagents, so its own context stays clustered and usable. Specs are sized smaller than what one such orchestrator could handle, so that more of them can run in parallel.
8. **P8 — Forking gates prevent context rot.** Every spec defines its forking gates: when its session splits into a fresh one, and how the new active session is announced to the other sessions. Long autonomous work never runs out of context.

## Context and outcome

The outcome is one live website, in Addvery's branding, that works as a highly personalized outreach job application. It has a section for each of the company's key stakeholders.

- **Format.** A live 12-hour hackathon that demonstrates what a GTM engineer can do. As of 11:43 on 2 November 2026 (Budapest time), about 11 hours are left.
- **What gets built.** Demos and websites, brought together on that one site.
- **Schedule.** The operator is at the computer for about 10 hours today, possibly in several blocks. The build runs autonomously overnight. A cleanup session follows tomorrow morning.

The stakeholders come from D2. Still open: the exact hours of today's operator window.

## Scope

The project covers the three meta deliverables and ten client-facing deliverables listed below, and nothing else unless M2 adds it.

- **In:** M0 to M2 and D1 to D10.
- **Out:** real data running through the demos (the one exception is the D3 live run on six stakeholders), automations actually sending, and connecting anyone else's LinkedIn account.
- **Deferred to Claude Code:** the definition of done, the operator's research details, and the wave-2 specs themselves.

## Shared vocabulary

Every spec uses these terms with exactly these meanings.

| Term | Meaning |
| --- | --- |
| Operator | Alex, the one human on the project. His time and focus are the scarce resources (P3, P4). |
| Charter | This document. It is context for specs and is never executed. |
| Executable spec | A child document covering one cohesive cluster of deliverables, run by its own session. |
| Orchestration session | The one session that owns the dependency map across specs and launches the spec sessions (P2). |
| Spec orchestrator | The session that runs one spec and delegates its work to subagents (P7). |
| Answer desk | The single session where every question for the operator lands and is shown one at a time (P4). |
| Async human in the loop | Collecting all operator input at the start of a spec so the rest runs without him (P3). |
| Operator window | The hours today when the operator is at the computer (P6). |
| Forking gate | A defined point where a session hands off to a fresh one and announces the new active session (P8). |

## Deliverables

The project has ten client-facing deliverables plus three meta deliverables, in two waves. Every client-facing deliverable is a demonstration in the Addvery brand: legibility matters more than function, and no real data runs through it except where noted. Each one becomes its own spec, except D2, which the operator runs himself.

**Wave 1: meta (runs first).**

| ID | Deliverable | What it is |
| --- | --- | --- |
| M0 | Bootstrap | Scaffolding: working directories, CLAUDE.md files, sessions, and the answer desk ported from an earlier project. |
| M1 | Research | A research subdirectory that sets the methodology and delegates research tasks within a limited usage budget. |
| M2 | Project orchestrator | A subdirectory with skills to change this charter: add deliverables, add definition-of-done items, and update everything that depends on them. |

**Wave 2: client-facing.**

| ID | Deliverable | What it is |
| --- | --- | --- |
| D1 | Scraping research demo | Shows the scraping and research capability on the Apify API. It comes early because its output feeds several other specs. |
| D2 | Company and stakeholder research | Researches Addvery and identifies its top six stakeholders. It runs in parallel with the others and feeds D3 and the website. |
| D3 | GetSales outbound demo | Shows 10 ICPs with a drip sequence each, and a classifier that routes each lead to the right automation. Pipeline: Sales Navigator, then CSV export, then enrichment from D2, then a computed first-message variable, then import into GetSales. Live run: the six stakeholders from D2 go through the operator's own sender profile. The output is a video clipped from the rig recordings. |
| D4 | Blog pipeline | Turns 15 minutes of operator dictation into a good-looking blog post that he finishes off (the last 10%). Likely built in the Claude design app. |
| D5 | Three blog articles | Three posts produced through D4. |
| D6 | Canva LinkedIn templates | LinkedIn visual asset templates in Canva, in Addvery's brand. A redo of an earlier pixel-perfect branded-assets demo (reference on the operator's GitHub). |
| D7 | LinkedIn content creation demo | Shows LinkedIn content creation in Addvery's voice. References the operator's subjective brand capture repo on GitHub. |
| D8 | Website | The live site, with a section per key stakeholder. A website subdirectory already exists, and this builds it out with more functionality. Without being prompted, it keeps getting clearer about what is being built, for example by showing the deliverables so visitors know what to expect. |
| D9 | Legibility analyzer | A subdirectory that takes each processed clip from the OBS capture rig, finds and keeps the most valuable content, and sends build requests to the website session ("add this, add that"). Checks run every hour or two. |
| D10 | Canva design video | A recording of the operator designing in Canva, done near the end. |

## Definition of done

The project-level definition of done is written in Claude Code, not in this phase. S2 (Project orchestrator) owns it and gives the final sign-off on it. It follows three rules:

- Every item gets an ID (DoD-1, DoD-2, and so on) and traces to at least one deliverable above.
- Every spec's own definition of done links to items by those IDs (spec contract, item 1).
- The spec outline is complete only when every item is claimed by at least one spec or operator-owned row.

Once M2 exists, its skills add and change items here and update everything that depends on them.

Signed off by Alex in DI-5 on 2 Nov, with DoD-4 loosened at his request, and written in by S2 as change C03. Ids are never renumbered or reused: a dropped item stays, marked retired.

| Id | Item | How it's checked | Traces to | Claimed by | Status |
| --- | --- | --- | --- | --- | --- |
| DoD-1 | Every spec in the outline and every role session has its own working folder at the project root, with a CLAUDE.md whose reading list starts with the charter. | `propagate check`: every row has a folder and a CLAUDE.md; each reading list's first line is `..\CHARTER.md`. | M0 | S0 | live |
| DoD-2 | Every session follows one set of git rules and commits its own work, and GitHub's `main` holds all committed work by the morning. | `GIT.md` exists; `git log` shows path-limited commits per folder; `origin/main` equals local `main`. | M0 | S0 | live |
| DoD-3 | Any spec session can be launched from its own folder under its roster name, and gets a question through to the answer desk, which shows the operator one question at a time. | Each roster row has a launch line; at least one spec session's question appears in `answer-desk\qa\<asker>.md` with Alex's answer. | M0 | S0 | live |
| DoD-4 | Every wave-2 spec that needs research has a research list, shaped with the operator's input. | Each wave-2 spec that needs research has its list in `research\`, with Alex's input noted where he gave it. | M1 | S1 | live |
| DoD-5 | Every approved research item has a stored report with an index entry, and each report is on the reading list of every spec that needs it. | Every approved item has a report and a `DIRECTORY.md` entry; every reader spec's "Routing and resources" names it. | M1 | S1, S2 | live |
| DoD-6 | A new deliverable can be added to the charter in one step, and every dependent place (outline, run order, DoD, roster, folder, reading lists, the site's deliverables view) shows it. | One `add-deliverable` run, then `propagate check` reports clean. | M2 | S2 | live |
| DoD-7 | The project definition of done is in the charter, every item traced to a deliverable and claimed by at least one outline row, and the outline is marked signed off before wave 2 starts. | The charter's "Definition of done" holds DoD-1 onwards; `propagate check` finds no unclaimed item and no placeholder id; the outline carries "Signed off by S2". | M2 | S2 | live |
| DoD-8 | A legible demo of scraping and research on the Apify API is on the live site, in Addvery's brand. | The site has a D1 section that a visitor can follow without explanation. | D1, D8 | S-D1 | live |
| DoD-9 | The scraping demo's research output exists in a form other specs read, and is on their reading lists. | The output files exist; the specs that consume it name them in "Routing and resources". | D1 | S-D1 | live |
| DoD-10 | Addvery's top six stakeholders are identified and confirmed by the operator. | The six are listed in `Addvery Research\` and marked confirmed by Alex. | D2 | S-D2 (operator-owned) | live |
| DoD-11 | An Addvery brand capture (voice and visual identity) exists for the LinkedIn templates and content demos to use. | The capture is in `Addvery Research\`, and S-D6 and S-D7 name it as a resource. | D6, D7 | S-D2 (operator-owned) | live |
| DoD-12 | Ten ICPs, each with a drip sequence, and a classifier that routes each lead to the right automation are set up in GetSales, with no automation sending except the live run. | GetSales shows the ten sequences and the classifier; no send outside the live run. | D3 | S-D3 | live |
| DoD-13 | The full pipeline (Sales Navigator, CSV export, enrichment from D2, a computed first-message variable, import into GetSales) ran live on the six stakeholders through the operator's own sender profile, and a video clipped from the rig recordings shows it. | The clip exists and is on the site; it shows each pipeline stage. | D3, D9 | S-D3, S-D9 | live |
| DoD-14 | Fifteen minutes of operator dictation turns into a good-looking, near-final blog post, with only the last 10% left to him. | One test dictation produced a post Alex accepted as near-final. | D4 | S-D4 | live |
| DoD-15 | Three blog posts, each from a 15-minute dictation through the blog pipeline and finished by the operator, are published on the site. | The three posts are live on the site. | D5, D8 | S-D5 | live |
| DoD-16 | LinkedIn visual asset templates in Canva, in Addvery's brand, have the operator's brand sign-off. | The templates exist in Canva; Alex's sign-off is recorded. | D6 | S-D6 | live |
| DoD-17 | A demo of LinkedIn content created in Addvery's voice, built on the operator's brand capture repo, has his brand sign-off and is shown on the site. | The demo is on the site; Alex's sign-off is recorded. | D7, D8 | S-D7 | live |
| DoD-18 | The live site, in Addvery's branding, has a section for each of the six stakeholders from D2. | Six stakeholder sections on the live site, matching DoD-10's list. | D8, D2 | S-D8 | live |
| DoD-19 | The site shows every deliverable and its status, so visitors know what to expect, and kept getting clearer through the day without the operator asking. | The site has a deliverables view; the site's history shows additions made from build requests, not only from Alex's instructions. | D8, D9 | S-D8, S-D9 | live |
| DoD-20 | Every processed rig session was reviewed, and its most valuable moments reached the site through build requests to the website session, at least every two hours while sessions were being filed. | `legibility\posted.md` covers every filed session; the gaps between posts while filing never exceed two hours. | D9 | S-D9 | live |
| DoD-21 | A recording of the operator designing in Canva, made near the end, is on the site. | The video is live on the site. | D10, D8 | S-D10 | live |
| DoD-22 | Nothing published (the site, its videos, the public repo) shows secrets, the Apify proposal or the operator's own GetSales outbound. | A check of the site, the published videos and the repo finds none of them. | D1 to D10 | S-D8, S-D9 | live |

## Spec outline

This is the decomposition, not the specs themselves. Each row is one future executable spec, except a row marked operator-owned, which the operator runs himself with no spec. Once the definition of done exists, every item in it must be claimed by at least one row.

Spec IDs mirror deliverable IDs: S0 to S2 for M0 to M2, and S-D1 to S-D10 for D1 to D10. This whole outline is a rough draft. S2 (Project orchestrator) can still edit every row, and it owns the final sign-off on when the list of executable specs is fully decomposed and ready to run.

**Signed off by S2, 2 Nov 16:32 Prague:** the outline is fully decomposed. `propagate check` is clean (0 gaps), and every live DoD item is claimed by a spec or by the operator-owned S-D2 row. Wave 2 had already started spec by spec as each preflight was answered, on Alex's 14:38 "we need to remove blockers" (S2's decision log).

| Spec | Outline | Depends on | Needs the operator for |
| --- | --- | --- | --- |
| S0 — Bootstrap (meta) | Rolls out every sister working directory with its file tree and CLAUDE.md reading list, sets up the sessions, and ports the answer desk. | Charter handed to Claude Code | Approving the directory plan |
| S1 — Research (meta) | Owns the research subdirectory. Sets the methodology and, with the operator, produces the findings that each spec's reading list points to, within the usage budget. | S0 | Research details (he gives these in Claude Code) |
| S2 — Project orchestrator (meta) | Owns the skills that change this charter and propagate each change to everything dependent on it. | S0 | Nothing beyond review |
| S-D1 — Scraping research demo | Demonstrates scraping and research on the Apify API. Early, because others consume its output. | S1; S-D2 (the operator's own scraping and summary, in `Addvery Research\`) | Screen care around the recent proposal |
| S-D2 — Company and stakeholder research (operator-owned) | Operator-owned, with no spec or session (DI-2 Q2.2, DI-3 Q3.3): the operator researches Addvery, finds its top six stakeholders and captures its brand himself, one-on-one, in `Addvery Research\`, which is local and git-ignored. He runs the scraping for it there too, and S-D1 presents his scraping summary (DI-6). | — | All of it: he runs it himself, one-on-one |
| S-D3 — GetSales outbound demo | 10 ICPs and sequences, a lead classifier, and the full Sales Navigator to GetSales pipeline, run live on the six stakeholders. Delivered as a video. | S-D2; rig recordings; S-D9 for the clip | Running the live setup on camera |
| S-D4 — Blog pipeline | Turns 15 minutes of dictation into a near-final blog post. | S1 | One test dictation |
| S-D5 — Three blog articles | Three posts through the S-D4 pipeline. | S-D4 | Three 15-minute dictations and the last 10% of each post |
| S-D6 — Canva LinkedIn templates | Addvery-branded LinkedIn templates in Canva, redoing the earlier pixel-perfect assets demo. | Addvery brand capture, from S-D2 (the operator's own, in `Addvery Research\`) | Brand sign-off |
| S-D7 — LinkedIn content creation demo | LinkedIn content in Addvery's voice, built on the subjective brand capture repo. | Addvery brand capture, from S-D2 (the operator's own, in `Addvery Research\`) | Brand sign-off |
| S-D8 — Website | Builds out the existing website subdirectory: stakeholder sections, and a growing, legible picture of the project. | S0; S-D2; requests from S-D9 | Periodic review |
| S-D9 — Legibility analyzer | Turns processed rig clips into build requests for the website session, every hour or two. | OBS rig output; S-D8 session | Nothing |
| S-D10 — Canva design video | The operator designing in Canva, on camera. | S-D6 | The recording, near the end |

Wave 2 starts once S0, S1 and S2 are in place.

## Research reading list

[do not attempt to do this without the operator in the loop -- he will override and micromanage the research part once the meta specs/tooling is set up. ]

This section is a pointer, not a list (DI-4 Q4.2). Each executable spec carries its own research reading list, the findings it reads before it starts, in its "Routing and resources" section. What gets researched, and how deep, is decided with the operator through S1, which indexes every finding in `research\DIRECTORY.md`. Reports stay in `research\` (S1-Q5): `research\global\` for research the whole project or several specs need, `research\<spec folder>\` for one spec's own. S2 adds each report, and each spec output other specs read, to the reading list of every spec that needs it.

## S0 Bootstrap: parameters

S0 turns this charter into a project where every other spec can launch in parallel, and it runs before everything else.

- **Inputs.** This charter; the current contents of `Desktop/Hire me hackaton`; the answer desk from the earlier Client Demo project.
- **It produces:**
  - A sister working directory at the project root for every spec in the outline, plus one each for the orchestration session and the answer desk. Directories that already exist (the website subdirectory, the rig) are adopted, not overwritten.
  - A CLAUDE.md in each directory, with a reading list that starts with this charter.
  - The Git setup and commit conventions every session follows (P1).
  - The answer desk, ported and running: one session, its own monitor, one question at a time (P4).
  - A documented way to launch each spec session in the background so that it can message the answer desk and the others (P2).
- **Operator preflight.** One approval of the directory plan before anything is written.
- **Done when** any spec session can be launched from its own directory, reads its CLAUDE.md, and gets a question through to the answer desk.

## S1 Research: parameters

S1 owns the research subdirectory and produces the findings that each spec's reading list points to, through delegated research tasks, within a usage budget that rules out deep research on every topic.

- **Inputs.** The research details the operator gives in Claude Code; he stays in the loop and steers this part closely.
- **It produces:**
  - A short methodology: depth tiers, what each tier costs, and when a topic earns deep research.
  - One task per research topic, with its depth, delegated to subagents or sessions.
  - Findings stored in one place, `research\`, with an index, so each spec's own reading list (its "Routing and resources" section) can point at them.
- **Priority.** S-D1 (scraping) comes first, because other specs consume it. Addvery, its six stakeholders and brand capture are the operator's own (S-D2), so S1 has no Addvery topics. Shared topics are researched once, never per spec.
- **Operator preflight.** His research details and any judgment calls on depth, collected at the start through the answer desk.
- **Done when** every topic agreed with the operator has findings at its chosen depth, linked from the reading list of every spec that needs them.

## S2 Project orchestrator: parameters

S2 owns the skills that keep this charter and everything built from it consistent as the project changes.

- **Inputs.** This charter, in whatever form S0 places it in the project root.
- **It produces skills to:**
  - Add a deliverable.
  - Add or change a definition-of-done item.
  - Add, merge or split a row in the spec outline.
  - Propagate each change to everything that depends on it: the spec outline, specs' research reading lists, CLAUDE.md reading lists, and specs' links to DoD items.
- **Likely home of the orchestration session (P2),** since it already owns the dependency map. Confirm in Claude Code.
- **Done when** a new deliverable can be added in one step and every dependent place shows it.

## Run order

S0 runs alone; after it, everything with its inputs ready runs at once. Work that needs the operator is scheduled into today's window, and the rest runs overnight (P3, P6).

1. **S0 Bootstrap**, alone.
2. **S1 Research and S2 Project orchestrator**, in parallel.
3. **S-D1 Scraping and S-D2 Addvery research**, first in wave 2, because others consume them. S-D2 has no session: the operator runs it himself in `Addvery Research\`.
4. **Everything else as its inputs arrive:**
   - S-D2, from `Addvery Research\`, feeds S-D1 (his scraping summary), S-D3 (GetSales) and S-D8 (website).
   - S-D4 (blog pipeline) feeds S-D5 (three articles).
   - Brand capture, part of S-D2 and also in `Addvery Research\`, feeds S-D6 (Canva templates) and S-D7 (LinkedIn content). S-D6 feeds S-D10 (Canva video).
   - S-D9 (legibility analyzer) runs continuously off the rig and feeds S-D8.

**Operator scenes to shoot today:** the S0 directory approval, S1 research details, his own S-D2 work in `Addvery Research\` (Addvery, the six stakeholders and brand capture), the S-D3 live run, the S-D4 test dictation and the three S-D5 dictations, brand sign-off, and the S-D10 Canva recording.

## Standing decisions and constraints

These are settled and apply to every spec.

- **Project root.** `Desktop/Hire me hackaton` on the operator's computer is the parent directory of everything. Some work in it is already built.
- **Execution runs in the terminal.** Spec sessions run as terminal sessions, not in the Claude app. The charter is the operator's view of the project.
- **One working directory per session.** Every session works in its own sister directory at the root of the project folder. Sessions launch from different directories, run in the background, and message each other.
- **One CLAUDE.md per working directory.** Each has its own CLAUDE.md with a good reading list: what that session must read before it starts, beginning with this charter.
- **File trees are delegated.** The charter does not prescribe directory layouts. S0 rolls out every working directory, its file tree and its CLAUDE.md.

## Spec contract

Every executable spec declares the following, so it knows its place in the project without re-reading everything.

1. **Its place.** Its row ID in the spec outline and the definition-of-done items it claims. Its own definition of done traces each of its criteria to one of those items.
2. **Its neighbours.** What it depends on and what it runs in parallel with, matching the spec outline.
3. **Operator preflight (P3).** A block at the very start listing everything it needs from the operator: recordings, judgment calls, questions. All of it goes through the answer desk.
4. **Decision log (P5).** When the operator does not answer within 15 minutes, the spec orchestrator decides and logs: the decision, the justification, why it is the right call, and the blast radius if it has to change.
5. **Forking gates (P8).** Where its session hands off to a fresh one, and how the new active session is announced.
6. **Its working directory.** Which sister directory it runs in, and the CLAUDE.md reading list for that directory.

A spec never edits the charter. When a spec finds a conflict with it, the question goes to the answer desk.

## Risks and open questions

The biggest risk is something sensitive showing up in a recording that gets published. Rule for every spec: assume anything on screen can be published, and keep the Apify proposal and the operator's own GetSales outbound off screen.

- **Two copies of the charter.** After the handoff, the Markdown file in the project root is the source of truth, and this app doc is a snapshot. S2's skills edit the file.
- **Rig spec is not in the folder.** The Hackathon Capture Rig Spec is a Claude app doc that terminal sessions can't open. Export it into the project root, or point S-D9 at `rig\RUNBOOK.md`.

- [ ] Does Ivana still get a view-only GetSales account, or does the D3 video replace it?
- [ ] What is D3's second custom message? The first carries the variable computed before import.
- [x] Who owns Addvery brand capture: S1 as shared research, or S-D2? Answered: the operator, as part of S-D2, which he runs himself in `Addvery Research\` with no spec (DI-2 Q2.2, DI-3 Q3.3).
- [ ] What are the exact hours of today's operator window?
- [ ] Is "Addvery" the right spelling, and "GetSales" the tool meant by "GitSales"?

## Handoff to Claude Code

Save this charter as `CHARTER.md` in `Desktop/Hire me hackaton`, open a terminal session at that root, and paste:

```text
Read CHARTER.md in full. It is the parent context for this project; you do not execute it.
Your job: write the three meta specs it defines (S0 Bootstrap, S1 Research, S2 Project orchestrator),
using only the parameters in their sections, the core principles P1-P8 and the spec contract.
I am in the loop on all three: show me each spec's operator preflight and draft before you finalise it.
Start with S0, then write S1 and S2 in parallel with subagents, each as its own file.
Do not research anything yet; what gets researched is decided with me in S1.
Do not write any wave-2 spec. Do not edit CHARTER.md; list any conflicts you find for me.
```
