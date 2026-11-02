# S-D3 GetSales outbound demo: executable spec

Status: restarted 17:13 on 2 Nov under Alex's reset rules; running the to-do in `HANDOFF.md` (copy pass, build the 36, the six's pipeline view, then the recording) · Row: S-D3 — GetSales outbound demo · Folder: `getsales\` · Session: `s-d3-getsales`

This spec does two things in GetSales, in this order:

- **(A) The alert,** the first deliverable, targeted for 15:30 Prague. A short campaign goes from Alex's own sender profile to the six Addvery stakeholders he identifies in his own research. It tells them the hackathon is happening, why he's doing it, and that they can follow along.
- **(B) The ICP demo.** Addvery's top ICPs × the languages that make sense × 3 approaches become a set of workflows in one new GetSales folder that he can hide. Each workflow starts with the lead field `custom message 1`, and an explanation shows how Jev would put each lead into the right workflow.

No scraping happens in `getsales\`: all of it is Alex's, in `..\Addvery Research\` (A6.4). On the site, this becomes a D3 section showing the workflows, the routing explanation and a clip of the alert going out, which S-D9 cuts from the rig recordings.

## 1. Operator preflight (P3)

**Settled by DI-6, verbatim in `..\Operator tasks\Archive\Decide - how the scraping demo should work.md`:**
- **A6.2.** Alex scrapes Addvery himself. GetSales takes the top six stakeholders from his research: the co-founders, plus the CAIO, RevOps, CEO, CTO and CSO, or directors or their equivalents. The alert goes "by the end of 15:30 Prague time".
- **A6.4.**
  - There's no scraping in `getsales\`.
  - The tech is the session's call ("okay you figure it out").
  - The ICP demo follows his model: ICPs × languages × 3 approaches, all in one new GetSales folder, each workflow starting with `custom message 1` imported as a lead field, plus the Jev routing explanation.

These supersede most of the first DI-7. That intake, `..\Operator tasks\Archive\Decide - how the GetSales outbound demo runs.md`, was rewritten down to three questions:

| DI-7 question | Question | Default (from 18:00 Prague) |
| --- | --- | --- |
| 1 | What form does the alert take for stakeholders Alex isn't connected to? | **Answered 16:44 (A7.1):** "I'm going to do this manually. This is not going to happen through automation. Don't worry about it. You can kill this". The automated alert is off; the pre-send gate is withdrawn. |
| 2 | Does Ivana still get a view-only GetSales account, or does the D3 video replace it? | **Answered 16:42 (A7.2):** "We killed this. The deliverable is just going to be a video recorded through OBS, through the rig, with it being set up and then scrolling through it and explaining things". No invite is sent. |
| 3 | What is Jev, for the routing explanation? | **Answered 16:44 (A7.3):** "The session can look up typesafe.ai and there's Jev research. Grep for Jev research or just look it up. Not knowing what Jev is is not really an excusable thing at this point". |

**Launch gate: met.** DI-6 settles everything that blocks the alert, so the session launches now and applies DI-7's answers as they land. If the pre-send gate is ready before question 1 is answered, it shows the recommended form, and his tick on it answers question 1.

**Sending stays behind his tick.** "You figure it out" covers the tech, not the send. Nothing goes to a real person until he ticks the pre-send gate, and nothing ever sends on a default. From 18:00 Prague anything unsent waits for the morning cleanup session.

**Operator scenes.** No separate scene. The rig records his work all day, and the clip uses the moments the session logs: his tick on the pre-send gate, and the GetSales demo folder on his screen.

**Off camera, with the rig paused.**
- Be logged into GetSales in his browser.
- No keys are needed: the GetSales connector authenticates through claude.ai ("You can go to all the credentials" is not used for anything else).

**Runtime questions** go to `answer-desk` as asker `S-D3`, ids `S-D3-Q1` onwards, one at a time (`..\answer-desk\ASKING.md`). After 15 minutes waiting on Alex for anything, send `POKE S-D3: waiting on you for <what>`, and poke again every 15 minutes. Before 18:00, keep waiting and keep working on whatever doesn't depend on the answer. From 18:00, decide on the default and log it in §9.

## 2. Spec contract

| Item | S-D3's answer |
| --- | --- |
| 1. Its place | Row S-D3. Claims DoD-12 (the ICP demo) and DoD-13 (the alert's pipeline and its clip, with S-D9). Both will be reworded to A6.4 through the S2 REQUEST in §7, step 2. Respects DoD-22. Reads DoD-10 (Alex's six). |
| 2. Its neighbours | **Depends on:** S-D2, Alex's own: the six, and what's already scraped, in `..\Addvery Research\`. Also the rig recordings, S-D9 for the clip, and S1 (L-04, L-01) for part B. S-D1 no longer feeds S-D3 (A6.2, A6.4). **Runs in parallel with** S-D1, S-D4 to S-D8 and S-D10. **Feeds** S-D8 (the D3 section, through `website`) and S-D9 (the stage times). |
| 3. Operator preflight | §1 (DI-6, DI-7) |
| 4. Decision log | §9 |
| 5. Forking gates | §8 |
| 6. Working directory | `getsales\`; its reading list is §3 |

## 3. Routing and resources

Paths are relative to `getsales\`. Step 1 of the run confirms that every resource is reachable, and turns anything ambiguous into a desk question.

- `..\CHARTER.md`: the parent context. Read only, never edit.
- `..\SESSIONS.md`: the roster. Message sessions only by these names. Edit only S-D3's own row.
- `..\GIT.md`: shared working-tree rules. Commit only `getsales\`, path-limited.
- `..\answer-desk\ASKING.md`: the desk format, gates, the poke and the 18:00 rule. `..\answer-desk\qa\S-D3.md`: S-D3's Q&A record, which the desk creates with the first question.
- `..\Operator tasks\Archive\INDEX.md`: Alex's earlier answers. Never re-ask what they settle. `..\Operator tasks\Archive\Decide - how the scraping demo should work.md` (DI-6): A6.2 and A6.4, his GetSales decisions, verbatim. `..\Operator tasks\Decide - how the GetSales outbound demo runs.md` (DI-7): this spec's open questions. Either may move to `..\Operator tasks\Archive\` once it's answered; look there if it's gone.
- `..\Operator tasks\Archive\Decide - everything left that needs you.md`: Alex's answers to the intake for everything left (DI-10, 17:23), verbatim; for this spec, Q10.7 (two demos, each a blog-style entry with a video on top and a transcript summary below). Read them for wording, never re-ask them.
- `..\Operator tasks\Archive\Approve - the six alert messages before they send.md`: Alex's answers to the pre-send gate for the alert to the six (withdrawn unticked at 16:43: he sends the alert by hand), verbatim. Read them for wording, never re-ask them.
- `..\Operator tasks\Archive\Approve - research for the GetSales demo and website.md`: Alex's answers to the GetSales and website research lists (withdrawn unticked at 17:03: research is done, so neither list runs), verbatim. Read them for wording, never re-ask them.
- `..\Operator tasks\Archive\Approve - three small charter fixes.md`: Alex's change note on this demo (36 workflows, three languages, three tactics, a walkthrough, nothing tooled to run), verbatim. Read it for wording, never re-ask it.
- `SPEC.md` (this file), and `HANDOFF.md` if it exists.
- The charter's "Definition of done" (in `..\CHARTER.md`, written in by S2 as change C03): the signed-off project DoD. Read DoD-12, DoD-13 and DoD-22.
- `..\orchestration\_templates\Gate approval template.md` and `..\orchestration\check_gate.py`: the gate tasks and their 5-minute check.
- `..\research\DIRECTORY.md`: the index of every report. `..\research\lists\L-04-getsales.md` and `..\research\lists\L-01-parent.md`: S1's lists. Read only.
- Research findings: S2 adds a line here for each report when S1 sends FINDINGS for L-04 and L-01.
- **L-01 findings** (S1's parent research, approved by Alex as OT-01; added by S2 as C07): for this spec, read the synthesis first, then R3 (notice, opt-out, LinkedIn account risk), W2 (alert link, preview card, click timing) and W3 (AI-written opening lines) before the pre-send gate (section 7, step 5); then R1 (the clip), R2, R4.
  - `..\research\global\L-01-synthesis.md`: S1's synthesis of the parent research: the strongest findings, recommendations per spec, and 24 one-line questions for Alex, each naming the spec it blocks. Start here: take this spec's section, and fold the questions that name it into your next gate. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R1-legibility.md`: making the work legible: outcome first, a short demo, a 3 to 4 step how-it-works; what reads as a toy or as noise; AI labels. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R2-gtm-engineer-hiring.md`: what a GTM engineer is hired to show, which deliverables fit it best, and the gaps none of them shows. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R3-personal-data.md`: personal data on a public site: GDPR, LinkedIn's terms, what the live run needs, and the safe, risky and keep-off table for stakeholder sections (section 7). Not legal advice. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-R4-format-reception.md`: whether a site aimed at one employer lands: replies versus hires, when it turns creepy or self-indulgent, and the one small ask. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W1-wildcard-executed.md`: whether a dozen background sessions can run through the day and night: usage limits, Windows Update restarts, idle stops. Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W2-wildcard-delivered.md`: what the six actually get from the alert: the link, the preview card, click timing, and the morning hand-over checklist (C7). Options for Alex, not decisions. Read only; S1 owns it.
  - `..\research\global\L-01-W3-wildcard-received.md`: whether AI-made work reads as skill or as a shortcut: the penalty bites on personal lines, not on the machinery. Options for Alex, not decisions. Read only; S1 owns it.
- `C:\Users\alder\Desktop\Hire me hackaton\Addvery Research\`: the operator's own S-D2 work: Addvery and its six stakeholders, the input to enrichment and the live run. Local and git-ignored: read it from the local disk, never from GitHub, and never edit it. Never copy or quote anything from it into a tracked file. Read the six only once his stakeholder list appears there.
  - Files in it, as Alex's research session listed them at 15:33 (relayed by S-D1 as an OUTPUT line; added by S2 as C08). Read from disk only, never edit, never copy into a tracked file. A file marked expected doesn't exist yet: check for it, don't wait on it.
    - `..\Addvery Research\addvery-website-research\00-report.md` to 04-team.md: Addvery's public website read in full: positioning, ICPs and languages, case studies, leadership pages. 04-team.md holds personal data and stays in the folder. The section "ICPs for the GetSales demo" (in 00-report.md) is the ICP source: no separate ICP file is coming (final list, 16:25).
    - `..\Addvery Research\GetSales six.json` (Alex confirmed the six at 15:55): the six stakeholders, each with a public profile link, sourced professional notes and a `confirmed_by_alex` flag.
- `..\legibility\CLAUDE.md` (S-D9's brief until its SPEC.md exists): how S-D9 picks moments and what it never posts. `..\OBS\rig\RUNBOOK.md`: how the rig records, files and cuts clips. `..\website\CLAUDE.md`: the live site's address, what it shows, and how videos get there. All read only.
- **The GetSales connector** (claude.ai GetSales MCP).
  - Call `get_guide` before creating flows, importing leads or writing messages.
  - Every data call runs against Alex's team, the one his sender is in.
  - A preview that returns a `commit_token` is for Alex. It's committed only when it matches a gate task he has ticked (§7). Otherwise it goes to him through the desk, never into this session's own chat.
  - **Never list or search Alex's flows, leads, contacts or inbox.** Read the demo folder and its flows by id only.
  - Every tool result lands in the rig's filed Claude Code logs, which S-D9 reads.

**Outputs** (files S-D3 creates; none exist yet, so they aren't resources): everything in the tree below. Its own ignore file, covering the git-ignored live folder and any env file, is written before anything personal is saved.

```
getsales\
  CLAUDE.md            written by S0
  SPEC.md              this file
  HANDOFF.md           at each fork (§8)
  .gitignore           live\ and .env*
  alert\               the alert's sequence template (no names) and its pipeline script
  live\                git-ignored: the six's CSV with custom message 1, pre-send full text
  icps\                the ICP × language × approach grid and each workflow's copy
  routing\             how Jev routes a lead, and a fictional sample CSV routed offline
  live-run.md          wall-clock time of each alert stage, for S-D9 (no names)
  site\                content for BUILD requests
```

## 4. Problem and scope

**The problem.**
- (A) The six people the application is aimed at should hear about the hackathon from Alex himself, by 15:30, in a message that shows he did his homework on each of them, sent through the same pipeline he'd build for a client.
- (B) A hiring manager should see a GTM build sized for Addvery's real market: their ICPs, in their languages, each with three approaches. It should be ready to receive leads, with a routing story that makes sense.

**In scope:**
- (A) The six's CSV, built from Alex's research. `custom message 1` per person, computed from what's already scraped. The alert flow in the new folder, the import, the pre-send gate and the send.
- (B) The ICP grid, every workflow in that folder (no leads, never started), the routing explanation with a fictional sample, and the D3 section.
- The stage times for S-D9's clip.

**Out of scope:**
- Any scraping (A6.4), including Sales Navigator scraping or export tools on his account (§9).
- Real data, except the six in the alert (charter Scope).
- Any sending, except the alert.
- Anyone else's LinkedIn account.
- Listing or showing Alex's own outbound.
- Cutting the clip, which is S-D9's.
- Hosting video, which goes through `website`.

## 5. Definition of done

Aligned at the 17:13 restart with the charter's DoD-12 and DoD-13 as reworded by S2 (C06), and again at 17:50 for C14 (A10.7: two blog-style demo entries): 36 workflows, nothing sends from GetSales, no classifier trained, the alert to the six goes by hand outside the demo. The earlier criteria (the alert through GetSales, the pre-send gate, only the six enrolled) are retired with DI-7 A7.1.

| # | Criterion | Traces to |
| --- | --- | --- |
| 1 | The folder "Hackathon demo · Addvery", apart from Alex's own flows, holds the 36 workflows (4 ICPs × English, Czech, German × 3 tactics). Each opens with `{{custom_message_1}}`, a lead field imported with the CSV. Every flow is read back by id and its id is in `ids.md`. | DoD-12 |
| 2 | No workflow has a lead, none is started, nothing sends from GetSales, and no classifier is trained. How Jev would route a lead into one workflow is explained in `routing\`, shown on a fictional sample only. | DoD-12 |
| 3 | The copy of all 36 has had a copywriting-skill pass and sits in one Claude Doc Alex can skim and edit. The top workflow is ready to open on camera with its first messages. | DoD-12 |
| 4 | Two recordable demos are ready, each with talking points in a Claude Doc: demo 1, about 3 minutes (classification tools, the 36 workflows, the one variable), and demo 2, a short capture of leads classified into ICPs (`routing\route.py` on the fictional sample). The six appear only as the variable's source, if Alex wants that beat; nothing about them is imported. | DoD-13 |
| 5 | Both entries are on the site's GTM demos list, each a video clipped by `s-d9-legibility` from his rig recording with a summary of its transcript below, built by `website` from S-D3's BUILD requests, live before his meeting on 3 Nov. | DoD-13 (with S-D9) |
| 6 | No tracked file, page or clip shows a secret, the Apify proposal or Alex's own outbound outside the demo folder. The six's data and messages stay in git-ignored `live\`. | DoD-22 |

## 6. Research step

At launch, send `s1-research` exactly one line: `RESEARCH S-D3: L-04 (R2 and R3 superseded by DI-6 A6.4: no Sales Navigator export, ICP × language × approach model; R1 and R4 still needed), plus L-01, part B's GetSales build and message copy rest on them, needed by 16:30`.

**The alert doesn't wait for research.** Its deadline is 15:30, Alex set it himself, and DI-5 lets research rules soften when time is short. The alert follows the connector's own `get_guide` playbooks, which the connector requires anyway.

**What waits for FINDINGS:** part B's copy rules (R4), the GetSales build details (R1), and what of the six is safe to publish (L-01 R3).

**Part B also waits for Alex's Addvery research** ("Again wait till we have the research done"). Groundwork that waits for neither: the folder tree, the grid's structure, the three approaches, and the routing explanation's skeleton.

## 7. Methodology and steps

**Draft methodology.**

- **(A) The alert pipeline,** one file per stage:
  1. **The six:** Alex's list in `..\Addvery Research\`, with each person's profile URL.
  2. **CSV:** `live\alert.csv`, built from that list. There's no Sales Navigator step (§9).
  3. **Enrichment:** what's already scraped about each person in his research.
  4. **`custom message 1`:** one personal opening line per person, computed by a subagent from that enrichment, plus the alert's point: the hackathon is happening, and they can follow along at the site.
  5. **Import:** into the alert flow in the new folder, with `custom message 1` as a lead field, per the `import_leads` guide.
  6. **Start.**
- **The alert's sequence.** It follows A6.4: message 1 is the variable; then a message on why he's doing this; then one more. The form for non-connections is DI-7 question 1. The non-personal copy lives in `alert\`, the personal text in `live\`.
- **(B) The ICP demo.**
  - **ICPs:** from his research, or failing that a subagent reads a few pages of Addvery's public website (reading only, no scraper), or failing that a labelled guess.
  - **Languages:** those that fit Addvery's markets.
  - **Approaches:** three, chosen by the session, for example signal-led, problem-led and proof-led.
  - **Workflows:** one per cell of the grid. Each workflow's message 1 is `custom message 1`, followed by follow-ups in that language and approach, per the `write_message` guide.
  - **Routing:** a document on how Jev would be trained to put each lead into one workflow, from the enriched fields, with the custom message written before import (by the client's Claude or agentic LLM, through MCP to their CRM, or as a CSV). It's demonstrated on a fictional sample CSV, offline.
- **Coherency check.** If we execute this methodology, will the DoD be satisfied? Run it against §5 before each gate. Any criterion it misses gets fixed first.

**Steps.** Commit after every finished step, path-limited: `git commit -m "[getsales] <message>" -- getsales/...`, after `git diff --cached --name-only` shows nothing outside `getsales\` and nothing in `live\`.

1. Read §3, confirm every resource, and load SendMessage and Monitor. Write `.gitignore`. Commit.
2. **Send two messages:**
   - The RESEARCH line (§6).
   - To `orchestration`: `S2 REQUEST s-d3-getsales: reword D3, the S-D3 outline row and DoD-12/DoD-13 from "10 ICPs ... and a classifier" to Alex's model (the pipeline stages in DoD-13 stay as they are): an alert campaign to the six by 15:30 through his sender, then ICPs × languages × 3 approaches workflows in one GetSales folder, each starting with custom message 1, with an explanation of how Jev routes leads (approved: A6.4: "we'll build 20 workflows. Let's label them under a new folder in GetSales so that I can hide them easily. We'll take each of their ICPs and do it in whatever languages make sense. We'll have 3 different approaches per language ... We'll explain how Jev can be trained to put people into one of those workflows and each of those workflows will start with that custom message")`.

   Until S2 applies the request, this spec follows his answer.
3. **Alert groundwork, now.**
   - Call `get_guide` for `create_flow`, `import_leads` and `write_message`, and check whether GetSales has folders.
   - Draft the alert's non-personal copy in `alert\` and the pipeline script.
   - Watch `..\Addvery Research\` with Monitor every 5 minutes for his stakeholder list. Don't poke for it: the list is his Addvery research itself, and he said at 14:38 that it's where his focus has to be ("di7 is waiting on addvery research"). The 15:30 target moves with his list (orchestration, 2 Nov 14:49).
4. **When the six appear,** a subagent is handed only his list and the scraped notes on them, and writes `live\alert.csv` with `custom message 1`. Render the six messages with the connector's message preview. Prepare the previews of the new folder and the alert flow.
5. **Pre-send gate.**
   - Write `..\Operator tasks\Approve - the six alert messages before they send.md` from the gate approval template. It opens with `## What this is`, uses no internal codes, and carries the next free OT id in its front matter only (check `Operator tasks\` and `Archive\` just before writing). It holds:
     - the folder and flow previews;
     - the sequence;
     - the form for each person (question 1);
     - the six final messages, with names and personal details replaced by role labels;
     - what the clip will show of them;
     - his calls from S1's research (orchestration, 2 Nov 14:49), each with its options and your recommendation, in plain words. From `..\research\global\L-01-W2-wildcard-delivered.md` section (c): which link the alert carries (the production alias or a custom domain, never a deployment URL, and whether the link goes in the note or only in message 1); a link preview card, which the site lacks (ask `website` for one: 1200x630, no stakeholder names); what someone who clicks tonight sees on the site. From `..\research\global\L-01-W3-wildcard-received.md`: who writes or edits the six personal opening lines, and whether the site says plainly who made what. From `..\research\global\L-01-R3-personal-data.md`: a short privacy notice page linked from the first message, with the right to object in its own sentence; framing the first touch as a job application or a conversation request, never a services pitch; human-paced sending. These are his calls, not legal advice, and none of them blocks writing the gate.
   - The exact text goes in `live\pre-send.md`, named as a place.
   - Commit that file alone, path-limited, and send `answer-desk` `TASK S-D3: Approve - the six alert messages before they send.md is waiting on you: the six alert messages; ticking it sends them from your profile, target 15:30`.
   - Wait with Monitor, running `python -I orchestration\check_gate.py "Operator tasks\Approve - the six alert messages before they send.md"` from the repo root every 300 seconds until it exits 0. Poke after 15 minutes. On `CHANGES`, apply them, refresh the snapshot and wait again.
   - Then send `TASK DONE S-D3: Approve - the six alert messages before they send.md` to `answer-desk` and `ARCHIVE Approve - the six alert messages before they send.md: readers S-D3` to `orchestration`.
6. **On APPROVED, send.**
   - Commit the folder and flow previews.
   - Import the six and start. Each preview is committed only if it matches the ticked gate. A mismatch, or an expired token whose re-preview differs, goes to Alex as one critical ASK.
   - Write each stage's time into `live-run.md`.
   - Verify by reading the alert flow by id.
   - Before 18:00 only. From 18:00 nothing sends; it waits for the morning.
7. **The clip.** Send `s-d9-legibility` one line: `CLIP S-D3-C1: the wall-clock times in getsales\live-run.md, each stage of the alert (the six identified, custom message 1 computed, Alex's tick on the pre-send gate, import, start, the alert flow in the GetSales folder), show <what the pre-send gate approved> of the six and blur their other names, photos and personal lines; never Alex's own outbound, flow list, leads, contacts or inbox. For: the D3 section of the site.` Wait for `CLIPPED S-D3-C1: <paths or YouTube id>` or `NO CLIP S-D3-C1: <why>`; on NO CLIP, fix what it names and send `CLIP S-D3-C2`.
8. **Part B,** once Alex's research has the ICPs (or at 16:30 on the fallbacks in the methodology).
   - Delegate in parallel (P7, P1): one subagent per ICP writes its languages × approaches copy, handed the grid, the approach definitions and the `write_message` guide notes. One more writes `routing\` and the fictional sample.
   - Prepare every workflow's preview in the folder, with no leads and unstarted.
9. **Demo gate.** One gate task, `..\Operator tasks\Approve - the demo outreach workflows in GetSales.md`, holding this spec, the grid, the copy and the previews, written in plain words with no internal codes. It's also where Alex approves S-D3's DoD. Same routine as step 5, with this file name in the TASK, `check_gate.py`, TASK DONE and ARCHIVE lines. On APPROVED, commit the previews and verify by id.
10. **Site requests**, one at a time, to `website`:
    - `BUILD S-D3-B1: a D3 section with the alert pipeline, the ICP grid and the Jev routing explanation. Content: getsales\site\section.md. Source: alert\, icps\, routing\.`
    - On `CLIPPED S-D3-C1`, `BUILD S-D3-B2: the alert clip in the D3 section, uploaded to YouTube unlisted through your upload flow. Content: getsales\site\clip.md. Source: S-D9's clip S-D3-C1.`

    Wait for `BUILT` or `REFUSED` before sending the next.
11. **Close.**
    - Read the folder's flows by id: only the six are enrolled.
    - Check the tracked files in `getsales\` against the names in `live\`, without printing either.
    - When §5 is met, send `orchestration` `DONE S-D3: alert sent to the six at <time>, <n> workflows in the GetSales folder, clip live in the D3 section`.

**Screen care, throughout.**
- Anything on screen can be published.
- On camera, GetSales shows only the new folder or one of its flows: never the flow list, leads, contacts or inbox.
- No secret on screen or in a tracked file.

## 8. Forking gates (P8)

| Gate | When |
| --- | --- |
| G1 | The alert has sent (step 6), if the context is more than a third full, so that part B starts clean |
| G2 | Shortly before 18:00 Prague, so overnight starts clean (P6) |
| G3 | When the context is about half full, whatever else is happening |

**How it forks.**
1. Write `HANDOFF.md` and commit it. It holds:
   - the state of each step;
   - the open gate tasks and desk question, with their times, and the pokes in progress;
   - the folder and flow ids;
   - whether the alert has sent;
   - the S2 REQUEST's status;
   - the pending BUILDs;
   - the decisions since the last fork.
2. From `getsales\`, launch `claude --bg -n s-d3-getsales "Read CLAUDE.md, then HANDOFF.md. You are now the active S-D3 session."`
3. Update S-D3's row in `..\SESSIONS.md` with the handoff time, and commit it with `[roster]`, path-limited.
4. Tell `answer-desk`, `s-d9-legibility` and `website`.
5. Stop with `claude stop` and the old session's own exact id.

## 9. Decision log (P5)

Before 18:00 Prague, a passed deadline means poke, not decide. From 18:00, decide on the default, log it here, and send `WITHDRAW <id>` for a desk question. Nothing sends on a default at any hour. Start each decision with the time and the question id.

| Decision | Justification | Why it's the right call | Blast radius if changed |
| --- | --- | --- | --- |
| 2 Nov, A6.2 applied: the six come from Alex's own research in `Addvery Research\` (co-founders, CAIO, RevOps, CEO, CTO, CSO, or directors or their equivalents). The alert targets 15:30 Prague. | His words: "once the research is ready GitSales will pick the top six", "by the end of 15:30 Prague time". | His answer, verbatim. | If the list is late, the alert sends as soon after as he ticks, before 18:00. |
| 2 Nov, A6.4 applied: no scraping in `getsales\`. Two parts: the alert, then the ICP demo (ICPs × languages × 3 approaches, one new GetSales folder, each workflow starting with `custom message 1` as a lead field, plus the Jev routing explanation). | His words: "We're not going to have the GitSales subdirectory do any scraping"; "Get sales is two separate things". | His answer, verbatim. | The first DI-7's questions 1, 3, 4 and 6 are superseded. Ivana carries over. |
| 2 Nov, A6.4 applied: the charter's "10 ICPs" and DoD-12's "Ten ICPs" conflict with his model. S-D3 sends the S2 REQUEST at launch (§7, step 2) and follows his answer until S2 applies it. | A spec never edits the charter. His answer is the approval S2 needs. | It keeps the charter the source of truth without holding up the 15:30 alert. | One `change-outline`/`change-dod` pass by S2. |
| 2 Nov, A6.4 "you figure it out": no Sales Navigator export. The alert's CSV is built from the profile URLs in his research. The Sales Navigator step appears only in the demo's explanation. | Six people he has already identified need no search. An export tool on his account adds LinkedIn risk and a secret. His answer gives the tech to the session. | It's the fastest route to 15:30, with no new risk to his account. | DoD-13 keeps its Sales Navigator stage, because his answer doesn't drop it: once the alert is out, Alex saves the six to a Sales Navigator lead list on camera (about 2 minutes, nothing re-sent), and the clip shows that stage. |
| 2 Nov, drafting (wave2-specs): the alert flow lives in the same new GetSales folder as the demo workflows, in Alex's existing team, the one his sender is in. If GetSales has no folders, everything is prefixed `D3 demo ·` and he's told. | One place he can hide, and his sender stays where it is. | It fits "a new folder in GetSales so that I can hide them easily". | Moving the flows to another folder later. Nothing re-sends. |
| 2 Nov, drafting (wave2-specs): the alert doesn't wait for research findings. | Alex set 15:30 himself, and DI-5 lets research rules soften when time is short. | His deadline wins, and the connector's guides cover the mechanics. | A finding that changes the copy only applies to part B. |
| 2 Nov, drafting (wave2-specs): only the six real leads ever enter GetSales. The routing is shown on a fictional sample, offline. | Scope: no real data except the live run. | It meets "no send outside the live run" by construction. | Demo leads in GetSales would need Alex's say. |
| 2 Nov, drafting (wave2-specs): the six's data stays in git-ignored `live\`. The pre-send gate's tracked copy uses role labels, with the exact text in `live\pre-send.md`. | Operator tasks are tracked and the repo is public. `Addvery Research\` is git-ignored out of courtesy to the client. | It keeps personal data about six real people out of the public repo (DoD-22). | Alex reads one local file at the gate. |
| 2 Nov, drafting (wave2-specs): the clip blurs the six's names, photos and personal lines unless Alex says otherwise at the pre-send gate. | S-D9's brief: never post research about Addvery's people until Alex says so. | It's the safe side, and he can lift it in the same tick. | Recutting with S-D9. |
| 2 Nov, drafting (wave2-specs): a ticked gate task counts as Alex's yes to every connector preview that matches it. Anything that differs goes to him as a critical desk ASK. | The connector's previews need his explicit yes, and P4 keeps his gate count at two. | His tick is explicit, and nothing unseen commits. | Separate confirmations per preview would add dozens of asks. |
| 2 Nov, drafting (wave2-specs): "GetSales" is the right spelling; the attached connector is GetSales. Logged, not asked. | The connector settles that half of the charter's open question. | It saves a question (P4). | None. |
| 2 Nov, drafting (wave2-specs): no GetSales API key and no `.env`. | The connector authenticates through claude.ai, and six leads don't need the bulk route. | Fewer secrets to keep off screen. | A key, if ever needed, goes in git-ignored `.env`, entered with the rig paused. |
| 2 Nov, drafting (wave2-specs): S-D9 cuts the clip from `live-run.md`, and S-D3 sends the BUILD that places it. | DoD-13 is claimed by both. | One owner per site section, with no duplicate requests. | If S-D9 sends its own BUILD, S-D3 drops B2. |
| 2 Nov 14:49 (orchestration): no poke at 15:00 for the six; the pre-send gate also carries Alex's calls from S1's delivery, reception and personal-data reports. | Alex, 14:38: his focus is the Addvery research, which is where the six come from. S1 flagged, before the send: the link the alert carries, the missing preview card, what a click tonight shows, who writes the opening lines, a privacy notice with the right to object, application framing and human-paced sending. | A poke can't speed up research he's already doing. The gate is where he decides what goes out, so the calls belong there, with options and a recommendation. | Step 3's poke and step 5's gate contents. If he wants the poke back, one line. |
| 2 Nov 15:00 (s-d3-getsales): the six's messages are rendered offline before the gate, and through the connector's `preview_message_template` after the tick, before start. A mismatch stops the start and goes to Alex as one critical ASK. | The connector's preview needs a real lead and sender. Before the tick the six aren't in GetSales, and putting them there early would write their data into his CRM, where an autofilter on one of his own flows could catch them. The alert's templates use only `{{first_name}}` and `{{custom_message_1}}`, which render the same offline. | Nothing about the six touches GetSales before his tick, and DoD criterion 1 (what sent matches the gate word for word) is still checked by GetSales itself before anything sends. | If the connector's render ever differs, the send waits for Alex. |
| 2 Nov 15:00 (s-d3-getsales): the alert flow is GetSales' T2 changed in three ways: already connected → message 1 at once (T2 ends there); no automatic like while waiting for acceptance; message 1 ten minutes after acceptance. Its sender is Alex's own profile alone. | The alert must reach all six, including people he's already connected to. An automated like on six senior people at the company he's applying to reads as a tactic. | It's the smallest change to GetSales' standard template that does the job. | One `update_flow_step` per node. |
| 2 Nov 15:00 (s-d3-getsales): Alex's sender's LinkedIn hours end at 16:30 on Mondays. The gate offers the alert flow its own window (Mon–Fri 07:45–18:00), recommended; his sender's settings are never touched. | A tick after about 16:15 would otherwise wait until tomorrow 07:45. | It's flow-only and reversible, and it keeps "nothing sends from 18:00". | One `update_flow`. |
| 2 Nov 15:03 (s-d3-getsales): asked `website` (S-D3-B3) for the link preview card and a `/privacy` page before the gate, the page reachable by URL only until Alex ticks. The footer link and the alert-visitor panel wait for his tick. | S1's delivery report: the card has to exist before the first link sends, or LinkedIn may cache a bare one for a week. Its personal-data report: the notice must be live no later than the first contact. Building after the tick would delay the send by a website cycle. | The card names nobody, and the page is factual, unlinked and in his own name, so nothing about anyone is published before he decides. | If he declines the notice at the gate, one BUILD takes the page down. |
| 2 Nov 15:03 (s-d3-getsales): the connection note is under 200 characters with one link, the site's address, and "privacy note there"; the notice link and the right to object are in message 1. | LinkedIn's own help says 200 characters for a note. Two links don't fit. | The site carries the notice link, so the first contact still reaches it in one click. | The note's wording, at the gate. |
| 2 Nov 15:25 (s-d3-getsales): Addvery's public website is researched now by four read-only subagents (positioning, industries and ICPs, case studies, team), not at 16:30. Reports go to git-ignored `live\addvery-website-research\`, then to `addvery-research`, which moves them into `Addvery Research\`. The six still come from `addvery-research`. | Alex's go, relayed by `addvery-research` at about 15:30: "it can research anything it wants from Addvery's public website. All the ICP stuff is there ... It doesn't need to be blocked by this", and "have the GetSales session spin up three or four subagents". | His words. Reading the site isn't scraping (A6.4): no scraper, no API, no LinkedIn fetch; anything harder goes to `addvery-research` as a request. | The team pages are personal data, so they stay in git-ignored files only; part B's grid starts from this report instead of waiting. |
| 2 Nov 16:18 (s-d3-getsales): part B's copy starts now on the draft method (the L-01 synthesis, the connector's write_message guide, the website research), not on L-04's R1 and R4. They're adjusted in when they land. | L-04 is still waiting on Alex's approval (OT-03, open since 14:54); a run takes about 25 minutes after his tick, so findings can't land by 16:30. S1, 16:16: "Carry on with your draft method". DI-5 lets research rules soften when time is short. | The workflows have no leads and never send, so a copy rule found later costs an edit, not a mistake in front of anyone. | Edits to the per-ICP copy files and the workflows before the demo approval. |
| 2 Nov 16:37 (s-d3-getsales): Alex's rule for every operator task, relayed by the desk at 16:36: a tick approves the file together with whatever he wrote in its feedback fence. On a tick, S-D3 reads the fence first, applies it, re-renders, and sends without asking again. Only feedback that can't be applied as written, or that changes who gets the alert, goes back to him as one critical ASK. | His words: "Even if I approve something that doesn't include what I mentioned in the feedback section, it's approved along with whatever's in the feedback section". `check_gate.py` reports APPROVED whatever the fence holds, so the fence has to be read separately. | His rule, verbatim. Nothing he didn't approve sends: his tick plus his own words are the approval. | Step 6's send and the demo gate's build both read the fence first. |
| 2 Nov 16:42 (s-d3-getsales): part B is 36 workflows, 4 ICPs × English, Czech, German × 3 approaches ("tactics"), in a GetSales folder apart from Alex's own. Slovak is dropped and German added for telco, lending and logistics. Only the top workflow needs its messages shown; there's no classifier to build or train. The deliverable is Alex's own screen-recorded walkthrough. No separate demo approval file: his words are the go to build, the workflows never get leads or start, and he sees them while recording. Each flow is created with his own sender attached (never started), because GetSales won't create a flow without one. | Alex, about 16:40, in the feedback box of orchestration's charter preview, relayed by orchestration: "36 workflows ... 4 main ICPs, 3 different languages (let's say English, Czech, German) ... tactic 1, tactic 2, tactic 3 ... We're not tooling it up to run. We're not training the classifier agent. We're explaining what all the pieces are". | His words, and it saves him one more approval while he's swamped (P3, P4). Nothing sends to anyone. | The grid, the copy files, the routing sample's language rule, and step 9 (now: build, read back by id, then tell him it's ready to record). S-D3's own DoD gets his yes in the alert's wrap-up message instead. |
| 2 Nov 16:42 (s-d3-getsales): DI-7 question 2 answered: no view-only GetSales account for anyone; the deliverable is Alex's rig recording of the demo, set up and then scrolled through and explained. | His answer, A7.2, verbatim in §1. | His words. | None: no invite was ever prepared. |
| 2 Nov 16:45 (s-d3-getsales): DI-7 question 1: Alex sends the alert to the six himself, by hand, not through GetSales. The alert flow is never created, the six never enter GetSales, the pre-send gate (OT-08) is withdrawn, and the pokes stop. The drafted messages stay in git-ignored `live\pre-send.md` for his own use. Part A's pipeline still exists up to the drafted messages; `live-run.md` records it. | His answer, A7.1, verbatim in §1. | His words; it also takes the six out of any automation, which the personal-data research favoured. | DoD criteria 1 and 2 (the alert through GetSales) no longer apply as written; criterion 6 holds trivially. S2 gets a REQUEST to reword DoD-13; S-D9's clip covers the pipeline up to the drafted messages and the 36-workflow walkthrough. |
| 2 Nov 17:20 (s-d3-getsales, restart): the copy pass on the 36 runs as four parallel subagents, one per ICP, each invoking `marketing:email-sequence` and `marketing:brand-review` first, against the voice in Alex's brand capture and the case studies on Addvery's site. The session rebuilds `workflows.json` and commits once all four are back. | The handoff said one subagent; four cuts the wait to a quarter, and the brief, conventions and checks are shared files, so the ICPs stay consistent. | Same skills, same rules, same checks, faster. | Re-running one ICP's pass if its tone drifts from the others. |
| 2 Nov 17:17 (s-d3-getsales, restart): created the lead custom field `custom_message_1` in Alex's team (uuid in `ids.md`). | GetSales' variable list had no custom fields, so `{{custom_message_1}}` would have rendered empty; the connector's `write_message` guide says to create the field before using it. | It's exactly his model (custom message 1 as a lead field), it touches no lead, and it shows in the walkthrough as the field the CSV fills. | One `manage_custom_fields` delete removes it. |
| 2 Nov 17:20 (s-d3-getsales, restart): the `create_flow` wizard's questions (mode, senders, template, preview "OK?") are answered by Alex's 16:40 model and the handoff: full mode, his own sender, T2 changed as `workflows.json` shows, AI-drafted texts replaced by the skill-passed copy, no leads, never started. The connector's live render check (`preview_message_template`) needs a real lead, and his leads are never touched, so the four warnings it checks (unknown variables, single braces, bare spintax, Liquid syntax) are checked offline instead: only `first_name`, `company_name`, `sender_first_name` and `custom_message_1` appear, all four in the team's variable list. | Reset rules 1 and 2: easy calls are the session's, and no plan approvals go to Alex. A fictional lead would put demo data in his CRM. | Nothing is started or sent, so the wizard's human gates protect nothing here, and the offline check covers what the render would catch. | If a flow renders oddly when he opens it on camera, one `update_flow_step` per node. |
| 2 Nov 17:20 (s-d3-getsales, restart): §5 rewritten to the charter's DoD-12 and DoD-13 (C06); the alert criteria are retired. | Handoff to-do 6. | The spec's DoD has to trace to the charter's live items. | None outside this file. |
| 2 Nov 17:40 (s-d3-getsales): A10.7 applied as relayed by orchestration at about 17:30: two demos, each a blog-style site entry (video on top, transcript summary below). Demo 1, about 3 minutes: classification tools in general (Jev), the 36 workflows, the one variable. Demo 2, short: leads classified into ICPs. Talking points in two Claude Docs (demo 1: claude.ai/artifact/83CBecbQdNyH3NZi2MLYDq; demo 2: claude.ai/artifact/XipRZaxFuESjKrTW3qoKmB); TASK to the desk per demo when it's ready; then CLIP to s-d9-legibility and BUILD to website per entry, live before his meeting tomorrow. | Alex's words, verbatim in orchestration's relay: "We'll break this into two demos ... a video on top and a summary of the transcript at the bottom". | His answer. | `site\section.md` becomes two entries; the earlier single walkthrough clip (CLIP S-D3-C1) is now two clips. |
| 2 Nov 17:40 (s-d3-getsales): the six appear only as an optional ten-second line at the end of demo 1 (their pipeline page, `live\pipeline-view.html`, local and git-ignored). The variable is shown on GetSales' `custom_message_1` field and the fictional sample instead. | Orchestration: "How much of the six's pipeline you keep is your call: only what showing the variable needs." S-D9 blurs the six if they appear, which would hide the variable anyway. | The fictional sample shows the same variable with nothing to blur. | DoD-13 still names the six's pipeline; flagged to orchestration for S2. If Alex wants the six beat, the page is ready. |
| 2 Nov 17:40 (s-d3-getsales): the top workflow, the one opened on camera, is "Demo · Retail loyalty · EN · proof". It's created last, so it's newest in the folder. | English reads for everyone watching; its follow-ups tell Addvery's own Rohlík Group and REWE Group stories as the site states them. | The people watching recognise their own work in it. | Any other of the 36 can be opened instead; nothing to rebuild. |
| 2 Nov 17:45 (s-d3-getsales): demo 2's screen is `routing\route.py`, a script that runs the README's rules on the twelve fictional leads and prints, for each decision, the rule or the narrow Jev question that settles it. Jev isn't called: its questions show the answer a person labelled, said plainly on screen and in the talking points. It reproduces the sample 12 of 12. | "No classifier gets trained" (A6.4 and Alex at 16:40) rules out a real model run; a live LLM run would differ take to take. | Deterministic, honest about what is and isn't run, and it shows the design: rules first, Jev for the rest, a person below the threshold. | One file. A live Claude run could replace it if Alex prefers. |
