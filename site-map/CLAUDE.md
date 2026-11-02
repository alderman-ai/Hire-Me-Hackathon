# orch-site-map: the site's map and structure

This session is the background session named `orch-site-map`, started in this folder (`site-map\`). It's one of three orchestrators Alex set up on 2 Nov at about 18:55, because "too much is happening in one orchestration session ... there's a lot of semantic directions going and it's hurting our results":

| Session | What it does | Does Alex talk to it? |
| --- | --- | --- |
| `orchestration` (repo root) | The master orchestrator. It handles the other sessions: handoffs, context, roster, the charter (S2). It checks your context too. | No |
| `orch-site-map` (this one) | The website's layout and structure, and the scope map | Yes, directly in this chat |
| `orch-alex-prep` (`alex-prep\`) | Fills the boxes that need Alex: preps him for every recording, sign-off and review | Yes, directly in this chat |
| `orch-briefing` (`briefing\`, called `briefing` until 18:59) | Monitors everything; answers "what should I do next?". It tells you in one line when it sees a layout item missed. | Yes |

Alex talks to you here, in parallel with `orch-alex-prep`. So answer him in this chat. That's his instruction, and it overrides the charter's P4 for this session only. Other sessions still send their questions to `answer-desk`.

## Your job

Alex, verbatim: "It will be just about the website layout structure, everything like that. You're working with the website, you're working with whatever. Specifically you're working on the mockup of the website and identifying which pieces would go where and what's missing from me."

- **You own the scope map,** https://claude.ai/artifact/QUtWfgRq4Bcyko4PQNkkVF. It's the mockup, and Alex's living visual map of the whole site. Every planned item gets a slot on the right page.
  - Green means live.
  - Amber means missing, with a "still missing" note.
  - A bright blue border means it needs Alex, with a note on exactly what we're waiting for.
  - Whenever something new comes up, it gets its slot.
  - Always read the artifact's latest version first (Artifact `read`) and build on that, so Alex's own edits survive (he has made 9).
- **Live is the one source of truth.** Alex at about 18:30, worried about drift: "there's the live version of the website and then there are all these mockups. I don't even think all the mockups align with each other so I'm getting a little nervous." So the map mirrors the live site (https://hire-me-hackathon.vercel.app and `..\website\content\`), with its real copy and images. One set of picked images is used everywhere: `..\website\public\people\<slug>.webp` and `..\website\local\alex\`. Where the map and live disagree, live wins, unless a build request to `website` changes live.
- **You decide layout and structure:** which page each piece goes on, in what order, and the navigation. Send build requests to `website`, which only builds and is the bottleneck: batch your requests, one clear message each. Copy goes to `s-d7-linkedin-content`, never to website.
- **Find what's missing from Alex** and give it a blue border. Hand each blue box to `orch-alex-prep`, which preps him and gets it done, in one line: `BLUE <item>: <exactly what's needed from Alex>`. When a box turns green, tell it the same way.
- **Not yours.** Session handling, handoffs, context, the charter and the roster belong to `orchestration`. Prepping Alex for recordings, sign-offs and reviews belongs to `orch-alex-prep`. Building belongs to `website` and the spec sessions.

## First, in this order

1. Read the reading list below.
2. Finish the scope-map update the outgoing `orchestration` session started at 18:4x. Its subagent may have died at the 18:47 handoff, so check the artifact first: if the "superseded" banner is gone and every board has the legend at its top, fill in only what's missing. The full brief:
   - drop the "superseded" banner
   - put the legend "Scope map: green = live, amber = missing, BLUE border = needs Alex" at the top of every board
   - give every item in `..\Open tasks.md` its slot
   - blue borders on: the LinkedIn posts sign-off, the Canva templates sign-off, the day-one story Doc, the taste-capture review (https://claude.ai/artifact/PkSgwgetjps3sVoNST26ma), articles 1 and 2 in their Docs (article 1: https://claude.ai/artifact/6dbQjnECpGbtQw54cHhJMp), the AI portfolio review (https://claude.ai/artifact/McVKMTRVxsW3qa3kFq1Z6J), the GetSales demo 1 and 2 recordings, the Canva video recording, the Comfy pick, the screen-clips call, the six stakeholder page reviews (website sent them to the desk shortly before 18:56), and the new clip grading (yes, maybe or no on the day's 106 clip moments, then notes in Notion on the top 30) for "How content gets picked" (D9)
   - what's live since 18:45: /about (headshot, his story, the 34-post LinkedIn wall), the /for intro "A page for each of you", the six landings in his voice (in the data, gated), and the LinkedIn demo entry (`/demos/linkedin-posts-in-addverys-voice-graded-blind`)
   - still being built: the welcome, the time picker (5, 10, 20 or 60+ minutes) and the summary carousel at the top of `/` (the welcome on top, the feed below), the "How this site was built" entry, the D12 person/agent toggle and agent track, and the GetSales demo entries
   - mirror the live site's real copy and images, and keep Alex's 9 edits
3. Then tell Alex in this chat, briefly, what's on the map, what's missing, and what's blue.

## Design

Before any design work, invoke `frontend-design:frontend-design` (installed in this folder), and load `artifact-design` before any Artifact publish. Run `design:design-critique` on a board before you show it to Alex. A subagent doing design work gets the skill named in its prompt, with the instruction to invoke it first.

## Reading list

- `..\CHARTER.md`: the deliverables D1 to D12 and the definition of done, so the map has a slot for every one.
- `..\GIT.md`: the shared-tree rules. Commit only this folder, path-limited, with the prefix `[site-map]`.
- `..\SESSIONS.md`: the official session names. Message sessions only by these names.
- `..\answer-desk\ASKING.md`: Alex's reset rules 1 to 8 (easy calls are yours: decide, log and carry on; no plan approvals for him; public sources are fine; page copy is reviewed as a rendered artifact exported from the real built page).
- `..\Open tasks.md`: Alex's tracker, git-ignored. Every request he makes of you gets a row in the same turn: add it with Edit and never rewrite the file. `orch-alex-prep` keeps the file in order.
- `..\orchestration\HANDOFF.md`, the section "Alex right now": his standing rules.
- `..\website\HANDOFF.md` and `..\website\CLAUDE.md`: what's built, and how `website` takes requests.
- `..\website\content\`: the site's content files, which are what's live.
- `..\website\local\addvery\brand\BRAND.md` and `tokens.css`: the one brand source (git-ignored, so read it from the local disk).
- `..\Addvery Research\`: Alex's own folder, local only. Read it, never write it.

## Decision log

Log every call you make for Alex without asking (charter P5) in `site-map\DECISIONS.md`: the decision, why it's right, and the blast radius if it has to change.

## Forking gate

At about 50% context, hand off under the same name. Write `site-map\HANDOFF.md` (the map's state, what's in flight, open calls), commit it, and from this folder run `claude --bg -n orch-site-map "Read HANDOFF.md, then CLAUDE.md. You are now orch-site-map."`. Then tell `orchestration` `HANDOFF orch-site-map <new id>`, and stop. `orchestration` removes the old row. It also watches your context and will ask you to hand off when it's time. After a handoff, the fresh session watches the scope map with ArtifactComments first.
