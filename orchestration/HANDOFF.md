# Orchestration handover

Written 2 Nov, 18:47 Prague, by the outgoing `orchestration` session (id `ab58b0bf`), at forking gate F2 (context about 48%). Read this, then `orchestration\SPEC.md`, then **`Open tasks.md` at the repo root**. You are the parent session and the S2 project orchestrator. Take every time from the clock (`Get-Date`); never guess one.

**Update, 18:59, by the fresh session (cc2ff5a3): orchestration is split in four** (Alex). This session is now the master: sessions only, and Alex doesn't talk to it. The scope map and the scope-map subagent's unfinished brief went to `orch-site-map`. `Open tasks.md`, the open calls and the clip grading went to `orch-alex-prep`. `briefing` became `orch-briefing`. See SPEC section 9, the last row. Where this file says "your duty" for the scope map or `Open tasks.md`, read it as theirs.

## First, in this order

1. Wait until `claude agents --json --all` shows your row live. Then run `claude stop ab58b0bf` and `claude rm ab58b0bf`, and check that exactly one `orchestration` row is left. Put your id and the handoff time in the `orchestration` row of `SESSIONS.md` and commit it on its own (`[roster]`).
2. Send the HANDOFF announcement (SPEC section 8) to every running roster session: `answer-desk`, `rig`, `watcher`, `briefing`, `website`, `s1-research`, `s-d1-scraping`, `s-d3-getsales`, `s-d5-blog-articles`, `s-d6-canva-templates`, `s-d7-linkedin-content`, `s-d9-legibility`, `s-d10-canva-video` and `addvery-research`. `s-d4-blog-pipeline` is finished and removed. If a bare name hits a Remote Control duplicate, address `<name> [ref]` from ListAgents.
3. Re-create the context-watch cron with CronCreate: cron `13,43 * * * *`, recurring, the CONTEXT WATCH prompt in SPEC section 8. **The hold ended at 17:13 (RESTART), so act on every flag; don't just report.**
4. No Monitors are needed. Every gate now comes back as a message or a Doc comment, and Alex talks to you directly in chat.

**Context watch at 18:48:** website was at 54.8% (ROT). It was asked at 18:48 to hand off at its next natural stop; when "HANDOFF website" arrives, stop and remove the old id `54c2d301`. The sessions on WATCH, all between 43% and 48%: s-d6-canva-templates, addvery-research, s-d9-legibility, s-d5-blog-articles and s1-research. Ask each one for a same-name handoff when it crosses 50%.

## Alex right now

He's at the computer and **working through the night**: the 18:00 cut-off no longer applies. **He has a meeting with Ivana Karhanová (Addvery's Chief Growth Officer) tomorrow, 3 Nov, and the site is prep for it.** He'll send the six stakeholders their links by hand in the morning. I asked him twice for the meeting time and got no answer: ask again once, briefly.

His standing rules since the 16:47 reset are written in `answer-desk\ASKING.md`, reset rules 1 to 8. In short:
- easy calls are the session's own: decide, log it, carry on
- no plan or spec approvals go to him
- public sources are fine; the only hard exclusions are secrets, the Apify proposal and his own outbound (DoD-22)
- articles and posts are drafted in Claude Docs; page copy is reviewed as a rendered artifact exported from the real built page
- design needs a design skill and copy needs a copywriting skill
- pokes only when something blocks work, at most every 30 minutes

Rules he added after that:
- **"Open tasks.md" is your duty** (Alex, about 18:42): "if I ask you to do something and it doesn't show up there, you missed it somehow." Every request of his gets a row, in the same turn. Move rows as sessions report. "BLOCKED" goes at the start of anything waiting. It's at the repo root and git-ignored, because it lists private items, including his six connection notes for the morning.
- **The scope map is your duty** (Alex, about 18:5x): the mockup https://claude.ai/artifact/QUtWfgRq4Bcyko4PQNkkVF is his living visual map of the whole site. Every planned item gets a slot on the right page. Green means live, amber means missing, with a "still missing" note. A **bright blue border means it needs Alex**, with a note on exactly what we're waiting for. Every time something new comes up, add its slot, through a subagent that reads the artifact's latest version first and keeps Alex's own edits.
- **Live is the one source of truth** (Alex, about 18:30, worried about drift). Review artifacts are exported from the real built page. Ship each piece as it's done. One set of picked images: the files website applied (`website\public\people\<slug>.webp`, `website\local\alex\`) are used everywhere.
- **Fan out** (Alex, about 18:4x): "we've got plenty of usage". Push every session to run its queue as parallel subagents. website is the bottleneck, so copy goes to `s-d7-linkedin-content` and website only builds.
- Images of people: cite the source, prefer their own websites. Settled.
- Times on the site: Prague only, "12:24 (Prague)" or just "12:24". Done site-wide.

## In flight at handoff (also in Open tasks.md)

- **My scope-map subagent** was still running when I wrote this, and it dies with this session. If its report didn't land before the handoff, re-run it from this brief:
  - drop the "superseded" banner, and put the legend "Scope map: green = live, amber = missing, BLUE border = needs Alex" at the top of every board
  - give every item in `Open tasks.md` its slot
  - blue borders on: the LinkedIn posts sign-off, the Canva templates sign-off, the day-one story Doc, the taste-capture review (https://claude.ai/artifact/PkSgwgetjps3sVoNST26ma), the GetSales demo 1 and 2 recordings, the Canva video recording, the Comfy pick, the screen-clips call, and the six page reviews once they arrive
  - mirror the live site's real content and images, and keep Alex's 9 edits
- **website (54c2d301)** is running four parallel builders: /about (About-me, headshot, the 34-post LinkedIn wall, the AI-portfolio slot); the six stakeholder review exports, which have s-d7's voice copy plus two fact fixes ("hundreds of LinkedIn posts", the "late start" cut); the welcome, time picker and summary carousel at the top of `/` (my call: the welcome on top of `/`, the feed below); and the long webcam uploads. Then the D12 toggle. It hands off at its next natural stop; when its HANDOFF arrives, stop and remove the predecessor.
- **s-d7-linkedin-content**: copy for website: the "How this site was built" entry (D8), the welcome copy with its time paths, and the stakeholder section intro. Its LinkedIn sign-off Doc waits on Alex.
- **s-d5-blog-articles**: article 1, "AI workflows are always a managed service", and article 2, "GTM engineers and the AI jobs promise", both written from his transcripts with block quotes, plus the taste-capture article, now rendered and waiting on Alex.
- **s1-research**: the AI portfolio story, from `C:\Users\alder\Desktop\AI Work Samples.eml` (only the four items it lists; nothing about the person it's addressed to or the Apify application). It doesn't link the cb6-prayer-project repo until Alex decides on the clean-up.
- **s-d9-legibility**: the clip index (`legibility\clip-index.md`, three subagents), the best 8 to 12 clips, and the "How content gets picked" entry. The day-one story Doc waits on Alex. Screen clips are cut but held until Alex answers.
- **s-d1-scraping**: D12, the agent view. `scraping\agent-view\generate.py` builds a pure-Markdown track and /llms.txt from website\content\, and website runs it at build time. Then website adds the person/agent toggle.
- **s-d3-getsales**: 36 workflows built. It's pre-building both GTM demos entries; both recordings wait on Alex (demo 1 has one typo he fixes by hand first). When rig says RECORDED, it sends CLIP to s-d9.
- **s-d6-canva-templates** (335b2144): the five templates into Canva through Chrome, using Inter (the Brand Kit button was refused by its permission check; Alex can make the kit himself if he wants the exact fonts). Its sign-off Doc waits on Alex.
- **s-d10-canva-video**: it also runs S-D11. It's pre-building the D10 and D11 entries; the Canva video recording and the Comfy pick wait on Alex.
- **addvery-research**: done. The ghostwriting report and the meeting prep are in `Addvery Research\` (private). Alex works with it directly.

## Alex's open calls (ask only if he brings it up, or once, briefly)

1. **Screen clips:** may they go public if each one passes a frame check for secrets, the proposal and his own outbound? Until he answers, they're cut and held.
2. **His two old public repos,** `alderman-ai/cb6-prayer-project` and `alderman-ai/Factor-AI`, outside this project. cb6's history holds a client contact's name and email, photo GPS data and a Drive link; its README links three Google Docs anyone can edit, and its spec has Canva edit links. Factor-AI has 18 raw session transcripts in `_THE SHIP/SatNav/Incoming Transmissions/`. Options: "quick fixes" (he sets the links to view-only; a session deletes the transcript folder in a normal commit; the portfolio doesn't link cb6), "rewrite both" (a force push, only on his explicit go) or "leave them".
3. **The stray private artifact** https://claude.ai/artifact/AW6Ld5n5CKuBHBX7JR3tj2: delete it only if he says so.
4. Optional: re-add any of the three left-out LinkedIn posts (14 May, 19 Oct, 27 Oct).
5. A public-history line in `linkedin-content\SPEC.md` (commit b979ed6) named the CGO beside the personal-brand proposal. The current file is fixed; I recommended leaving the history alone. Only act if he says "scrub it".

## Charter state

C11 to C18 are applied since the last handoff:
- C11 and C13: the L-05 and L-03 findings on reading lists
- C14: D3 as two demo entries
- C15: D11 Comfy brand motion, run by s-d10
- C16: D9's day-one story, DoD-24
- C17: D12 agent view, DoD-25, run by s-d1
- C18: D8 wording (About me, the welcome, the landing pages)

There are now 15 deliverables and 25 DoD items. `propagate check` was clean after s1-research's fix (fcc086e). Earlier (by the 17:13 fork): C04 to C06 (DoD-22 narrowed, D3 per Alex), C10 (two posts), C12 (D4 retired). Every change has its record in `changes\` and its row in SPEC section 9. Archived today: DI-7, DI-8, DI-9, DI-10, OT-03, OT-05, OT-06, OT-07, OT-08, OT-10, OT-11 and OT-12.

## Overnight and the morning

- **OT-10, his answers:** power settings done by him; no usage credits, no pins, and no `CLAUDE_CODE_RETRY_WATCHDOG`. I couldn't confirm Windows Update is paused (the registry shows no pause), and he has been told. With no pins, the context watch's STOPPED flag is the only overnight keep-alive: act on it every run.
- **YouTube:** long uploads read `allowed` since 18:35 (checked live). The rig's sign-in can't delete videos; Alex deletes the private "TEST control 14m30s" himself.
- **In the morning, Alex sends the six connection notes by hand** (the text is in `Open tasks.md`). Before then the six pages must be approved and live with their greeting, concerns and reading lists.

## Rules learned the hard way

- `frontend-design` was installed only for another project of his (Atlas OS), so switching it on here did nothing. It's now installed per project for website, blog-articles, canva-templates, canva-video and linkedin-content, and its skill name is `frontend-design:frontend-design`. For a new visual folder, run `claude plugin install frontend-design@claude-plugins-official --scope project` from that folder, then check it in a fresh `claude -p` session.
- After a handoff, Doc comments don't reach the fresh session. Its first step is to watch every Doc its predecessor published (ArtifactComments) and read their comments through the Docs connector every 20 minutes (ASKING.md rule 4).
- A Bash heredoc collapses doubled backslashes, and `\f` turned into a form feed once. Build paths with `chr(92)` in Python, or use Edit, and check for control characters afterwards.
- I wrote a guessed time into the roster once and had to fix it: take every time from `Get-Date`. Peers' times are often guesses too.
- Over-caution is the failure Alex hates most ("it needs to stop freezing me"). When a session hides public material or asks him about it, overrule it with the reset rules and his own words.
