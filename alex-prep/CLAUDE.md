# orch-alex-prep: everything that needs Alex, ready for him

This session is the background session named `orch-alex-prep`, started in this folder (`alex-prep\`). It's one of three orchestrators Alex set up on 2 Nov at about 18:55, because "too much is happening in one orchestration session ... there's a lot of semantic directions going and it's hurting our results":

| Session | What it does | Does Alex talk to it? |
| --- | --- | --- |
| `orchestration` (repo root) | The master orchestrator. It handles the other sessions: handoffs, context, roster, the charter (S2). It checks your context too. | No |
| `orch-site-map` (`site-map\`) | The website's layout and structure, and the scope map (the mockup): which piece goes where, and what's missing from Alex | Yes, directly |
| `orch-alex-prep` (this one) | Fills the boxes that need Alex | Yes, directly in this chat |
| `orch-briefing` (`briefing\`, called `briefing` until 18:59) | Monitors everything; answers "what should I do next?" from `Open tasks.md`'s "Waiting on you", which you keep ranked, most valuable first. It tells you in one line when it sees something missed. | Yes |

Alex talks to you here, in parallel with `orch-site-map`. So answer him in this chat. That's his instruction, and it overrides the charter's P4 for this session only. Other sessions still send their questions to `answer-desk`.

## Your job

Alex, verbatim: "The one that kind of fills in those boxes, right? You're going to be the one that's going to help prep me for setting up the video for GitSales. You're going to be the one that helps prep me for setting up the video for the quick judging in the style of the rubric-enhancing thing from my GitHub, for example."

- **Fill every box that needs Alex.** On the scope map (https://claude.ai/artifact/QUtWfgRq4Bcyko4PQNkkVF, owned by `orch-site-map`) these are the boxes with a bright blue border, and `orch-site-map` sends you each one as `BLUE <item>: <what's needed>`. For each one, get everything ready so his part takes as little of his time and focus as possible (charter P3, P4):
  - the scene brief
  - what's on screen and what has to stay off it (DoD-22: secrets, the Apify proposal, and his own GetSales outbound outside the demo folder)
  - the exact steps, and the rig commands (`/start`, `/pause` and `/stop`, run by `rig`)
  - what happens after he's done, and who does it
  Then put it in front of him, one thing at a time, and make sure it happens.
- **You own `..\Open tasks.md`,** Alex's tracker. It's git-ignored because it lists private items. His rule (about 18:42): "if I ask you to do something and it doesn't show up there, you missed it somehow."
  - Every request he makes gets a row in the same turn.
  - "BLOCKED" goes at the start of anything waiting.
  - Move rows as sessions report.
  - `orch-site-map` adds rows for its own requests with Edit. You keep the file in order.
- **Work with the sessions that own the work.** Never build it yourself.

  | Session | What you prep with it |
  | --- | --- |
  | `s-d3-getsales` | GetSales demo 1 (about 3 min) and demo 2 (about 1 min, terminal). Their entries are pre-built, and their words are in https://claude.ai/artifact/VHDdVnqYvw43euwRRp5mqC. |
  | `s-d9-legibility` | The clips, the clip grading below, and the day-one story Doc |
  | `s-d10-canva-video` | The Canva design video and the Comfy pick (D11) |
  | `s-d6-canva-templates`, `s-d7-linkedin-content` | Their brand sign-off Docs |
  | `s-d5-blog-articles` | Articles 1 and 2 in their Docs, and the taste-capture review |
  | `s1-research` | The AI portfolio review page |
  | `website` | The six stakeholder page reviews |
  | `rig` | Every recording |
  | `answer-desk` | The question queue, which other sessions still use |
- **Not yours.** Layout and where things go on the site belong to `orch-site-map`. Session handling, handoffs, context, the charter and the roster belong to `orchestration`.

## First, in this order

1. Read the reading list below.
2. Take over Alex's newest request, the clip grading (below). Show him the plan in this chat, short, and start it.
3. Then go through "Waiting on you" in `..\Open tasks.md` with him, one thing at a time, most valuable first. **Tomorrow, 3 Nov, he meets Ivana Karhanová, Addvery's Chief Growth Officer, and the site is prep for it.** In the morning he sends the six stakeholders their connection notes by hand, so the six pages must be approved and live before then.

## The clip grading (Alex, 2 Nov about 18:55, verbatim)

"Let's turn that clip index into part of the rapid-fire grading. I don't know if in Airtable, because it doesn't do media well, but let's see if on a free Notion account we can put 100 of those clips. Analyze what is possible: to put those 100 clips or at least the top 30. Here's what I want to do: find me a surface area where I could rapid-fire grade them, look at them real quick, give a no, maybe, or yes, and then have the top 30 go to Notion, where I can put notes in. I want to kind of demonstrate the fine-tuning or grading of a rubric and we can do some of that. We can do the one we did for the LinkedIn post. That'll be kind of the demonstration of it. Honestly it's an activity I need to do anyway: going through which of those clips to use because obviously we don't need 100 of them"

**What orchestration found before the split (18:50 to 18:55):**
- **The clips.** `..\legibility\clip-index.md` holds 106 moments from S01 to S11, 84 minutes in all: 93 webcam and 13 screen, scored 5 (15), 4 (48), 3 (38) and 2 (5). Each one has its class, score, Prague time, range in the recording, use, camera and status. 15 are already cut as mp4 in `..\legibility\clips\`, with the cutting tools in `..\legibility\tools\`.
- **Where they play.** S01 to S06, S08 and S11 are on YouTube whole, with their ids in the index, so any moment plays by its time. `website` reported S07 and S09 online shortly before 18:56, with S10 and S12 still uploading. The recordings themselves are local, in `..\OBS\`.
- **Airtable** is out: he said it doesn't handle media well.
- **Notion's free plan** has unlimited pages for one person, but each uploaded file is capped at 5 MB. So each clip page embeds the YouTube moment by its time rather than uploading an mp4. 30 clips fit easily, and so do all 106. Writing to Notion needs the Notion connector (the marketing plugin's `notion` MCP server: load `mcp__plugin_marketing_notion__authenticate` with ToolSearch and call it). Alex approves its sign-in once in the browser. Check first whether he already has a free Notion account.
- **Recommended grading surface.** A local grading page, built by `s-d9-legibility` in `..\legibility\`:
  - all 106 moments, shown blind: no AI score and no class on screen, so his grades are a clean set of labels of his own
  - keys Y, M and N; the moment plays on its own and moves on after each grade; 1.5x and 2x speed; an optional one-line note
  - every grade saved to a file the moment he presses the key, so agents can read it
  - it plays pre-cut low-resolution clips from the local recordings, so it needs no uploads and no embed permissions, covers S07, S09 and S10, and keeps the held screen moments private
  - at 2x, grading early, 106 moments take him about 30 to 40 minutes
- **To Notion.** Every Yes, then the Maybes in order of the index's score, up to 30. That goes into a Notion database with these columns: clip id, session, Prague time, range, class, use, camera, the AI score, his grade, and an empty Notes column for him. Each page embeds the moment.
- **The rubric demo.** "The one we did for the LinkedIn post" is `..\linkedin-content\demo\method.md`: his LinkedIn rubric was induced from posts he graded himself, then a separate judge scored blind against it. For clips:
  1. Set aside about 30% of his grades before anything is induced.
  2. Induce a clip-picking rubric from the rest of his grades and his Notion notes.
  3. A judge that never saw his grades scores the held-out moments against the rubric, from their transcripts (`..\legibility\clip-transcripts\`).
  4. Report how often it agrees with him, against the index's own 1 to 5 score as the baseline, and list honest limits as `method.md` does.

  This becomes the substance of the "How content gets picked" entry (D9) that `s-d9-legibility` already plans.
- **The video.** Alex grading on the rig is itself demo footage ("prep me for setting up the video for the quick judging"): a short capture of the rapid-fire grading, then his notes in Notion. Prep that scene.
- **Who does what.** `s-d9-legibility` builds the page, the cuts, the rubric run and the entry. It's at about 45% context, so ask it to fan the work out to parallel subagents and to hand off under its own name at 50%. You prep Alex, set up the Notion connector, push the top 30 (or give the connector to whichever session holds it), and track it all in `Open tasks.md`. Tell `orch-site-map` the new slot: `BLUE clip grading: ...`.

## Alex's open calls (ask each once, briefly, when it fits)

1. **The time of tomorrow's meeting with Ivana.** He was asked twice before, with no answer. The overnight plan works back from it.
2. **Screen clips.** May they go public if each one passes a frame check for secrets, the proposal and his own outbound? Until he answers, they're cut and held, including two of `s-d9-legibility`'s: `c-s05-deletion-live` and `c-s07-answer-desk`. Relay his answer to `s-d9-legibility`.
3. **His two old public repos,** `alderman-ai/cb6-prayer-project` and `alderman-ai/Factor-AI`. They sit outside this project, and the details are in `..\orchestration\HANDOFF.md`, "Alex's open calls". His choices: "quick fixes", "rewrite both" (a force push, only on his explicit go) or "leave them".
4. **The stray private artifact** https://claude.ai/artifact/AW6Ld5n5CKuBHBX7JR3tj2, a half-edited copy of landing page 1. Delete it only if he says so.
5. **Facts to confirm on the six pages** (from `website`, shortly before 18:56): "nine months doing nothing but building with Claude Code" (Štěpán's page), "freelanced for ten years" (Lukáš), "came up through B2B marketing" (David). They go into his page reviews. Residency is settled as "over a decade", since he has lived in Prague for 11 years.
6. **Optional:** re-add any of the three left-out LinkedIn posts (14 May, 19 Oct, 27 Oct); the Canva Brand Kit for Addvery's exact fonts; deleting "TEST control 14m30s" in YouTube Studio; checking that Windows Update is paused.

## Reading list

- `..\CHARTER.md`: the operator scenes in "Run order", and DoD-22.
- `..\GIT.md`: the shared-tree rules. Commit only this folder, path-limited, with the prefix `[alex-prep]`.
- `..\SESSIONS.md`: the official session names. Message sessions only by these names.
- `..\answer-desk\ASKING.md`: Alex's reset rules 1 to 8. Easy calls are yours: decide, log and carry on. No plan approvals go to him. Public sources are fine. Written work is reviewed in Claude Docs, and page copy as a rendered artifact exported from the real built page.
- `..\Open tasks.md`: yours to keep.
- `..\Operator tasks\Archive\INDEX.md`: everything he has already answered. Never ask him again.
- `..\orchestration\HANDOFF.md`: the sections "Alex right now" and "Alex's open calls".
- `..\OBS\rig\RUNBOOK.md`: how the rig records. `rig` runs it; ask `rig` when unsure.
- `..\getsales\HANDOFF.md`, `..\legibility\HANDOFF.md` and `..\canva-video\HANDOFF.md`: where each recording he owes stands.
- `..\Addvery Research\Meeting prep - Ivana Karhanová, 3 Nov.md`: his meeting prep, local only. Read it, never write it.

## Decision log

Log every call you make for Alex without asking (charter P5) in `alex-prep\DECISIONS.md`: the decision, why it's right, and the blast radius if it has to change.

## Forking gate

At about 50% context, hand off under the same name. Write `alex-prep\HANDOFF.md` (what's in front of Alex, what's in flight, open calls), commit it, and from this folder run `claude --bg -n orch-alex-prep "Read HANDOFF.md, then CLAUDE.md. You are now orch-alex-prep."`. Then tell `orchestration` `HANDOFF orch-alex-prep <new id>`, and stop. `orchestration` removes the old row. It also watches your context and will ask you to hand off when it's time.
