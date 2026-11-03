# Orchestration handover

Written 2 Nov, 21:15 to 21:52 Prague, by the outgoing `orchestration` session (id `e41f29c0`, at about 440k tokens, flagged ROT by the context watch). Read this, then `RULES.md` at the repo root, then `orchestration\local\ALEX-WANTS.md` (git-ignored; Alex's verbatim words tonight, W1 to W32), then `orchestration\assembly\VERDICT.md` (git-ignored). Take every time from `Get-Date`. The 20:11 handover this replaces is in git history.

## Update, about 08:00 on 3 Nov: start here (fresh session, Alex works with you directly)

Alex asked for a fresh orchestration session ("launch a new you and then me and you will get to work"). He talks to orchestration directly this morning: this chat is his one surface. Read `orchestration\local\overnight\MORNING.md` next; it's still the plan (his morning in order, the rough edges, the open facts).

Since 00:20:
- **Preservation dump, done (Alex's ask):** `C:\Users\alder\Desktop\Full site outread\` (outside the repo). `METHODOLOGY.md` is the document that codifies the overnight method: label every piece, grade for taste, side cards and catalog, three stance mockups, best-of merge, keyed spans through `alex-voice`, parallel port. `extract_transcripts.py` re-extracts every transcript of the project (84 sessions, 377 subagents at 07:50) into `transcripts\` with `INDEX.md`, `RELATIONSHIPS.md`, `TIMELINE.md` and `catalog.json`; re-run it to pick up today. Building skills from it is out of scope for now.
- **Reboots at 07:55 (Alex: only sessions with work left):** `rig` (now session `4bad902f`, a copy of 1a1ba6cb; old id removed): healthy, nothing recording, ready for his `/start`. `orch-alex-prep` (759cb6b8): bringing `alex-prep\scenes\getsales-demos.md` in line with MORNING.md item 3, the 36-workflow walkthrough; it pings you when ready. `orch-briefing` (8bc2476e): answers "what next?" from MORNING.md's order. Their 20:25 hold is lifted for those parts only. `orch-site-map` (5a971503) is live and still holding. Roster commit 2689501.
- **Alex, about 08:00:** "no need to boot up any of the non essential sessions." The eleven paused sessions stay paused.
- `website` already runs as a fresh session, `e539ec86` (it replaced 91fdba88 this morning; check its `SESSIONS.md` row and that 91fdba88 is removed). The context-watch cron isn't running.
- **Your first step, the handoff's step 4:** the previous orchestration session is `e0e1d9d2`. Once `claude agents --json` shows it idle (or after 10 minutes either way), run `claude stop e0e1d9d2`, then `claude rm e0e1d9d2`, check that exactly one `orchestration` is live, put your id and the handoff time in its `SESSIONS.md` row and commit that file on its own. Then tell Alex in one or two lines that you're ready, and work with him from MORNING.md.

## Update, 00:20 on 3 Nov: the combined version is live

Alex asked at about 22:4x for the best of the three mockups combined and pushed live; he redlines it in the morning on a Claude Design canvas. **Live at 23:40** (https://hire-me-hackathon.vercel.app, deployment from 9e75838; production deploys need all four flags: NEW_SITE, WALL_FULL, VIDEO_WALL, SKILLS_PAGE). The redline canvas is https://claude.ai/artifact/EdXPA75GqZCSFbDub4Ndu2. An article on the method is committed (01e1e1d) and was sent to `website` at 00:17 to publish as an entry. `orchestration\local\overnight\MORNING.md` is rewritten for this state: read it first.

## Update, 22:35: start here in the morning

The session that took over at 21:52 (e0e1d9d2) changed the plan on Alex's word at about 22:05 (W36 to W54 in `ALEX-WANTS.md`). The structure verdict below is now one input, not the plan. **Read `orchestration\local\overnight\MORNING.md` first** (git-ignored): what's ready, and Alex's morning in order.
- Alex's answers to the five calls: he knows only Ivana; no asks on any page (`RULES.md` rule 11); the time picker is retired; the live router run is approved; where the CRM line sits is ours to decide.
- Overnight, by his usage limit (69% at 22:00, keep 15 to 20% for tomorrow; usage can't be read here), only these ran: side cards for every Great, Yes and Maybe clip (74, in `legibility\cards\`), a catalog of every piece (`orchestration\local\catalog\`), and **three alternative mockups** for him to pick from (`orchestration\local\mockups\index.html`: promise, machine, day, each with a RATIONALE). Also done: K4 (e3b1ec8), wall alt text (uncommitted, like the images), Ivana's note and message drafts (`orchestration\local\notes\ivana.md`).
- Stopped or dropped: K1 (`recommend.json` waits for his pick), the compilation step (the mockups replace it), the context-watch cron (re-create it when work resumes). `website` is parked at W13 on preview and builds the pick in the morning. The three sub-orchestrators stay on HOLD.

## The big change since 20:13: Alex talks to orchestration now

At about 20:15 Alex came to this session directly ("This isn't working ... everything is disjointed ... nothing is synced"), and he has worked here since. He's exhausted, he has promised Addvery the site is built, and he meets **Ivana at 4 pm on Tuesday 3 Nov** (his words at 17:45; never written down until 20:40). He sends the six their notes in the morning. He won't sleep: "I can't just get some sleep dude ... If it's halfway built it looks terrible." Talk to him plainly and briefly. Give him one thing at a time and make the easy calls for him.

**The three sub-orchestrators are on HOLD** (since 20:25): `orch-site-map`, `orch-alex-prep`, `orch-briefing`. They don't message Alex, publish, or send `website` builds until orchestration hands them a plan. Nothing has been handed to them yet. Decide whether to give them roles or leave them held. Alex asked for one surface, and that's this chat.

## What he wants (full list in ALEX-WANTS.md)

- **The site's goal, in his words (20:45; now at the top of `RULES.md`):** past "watch me build in public"; post-hoc proof it was built really well; demonstrations of everything he can do, ICP filtering most of all; "12 hours, here are all the skills we built that are reusable"; thought leadership from everything he talked about; "almost like a personal website but made just for them". The selling point is "Imagine your conversion rate if this is how you reached out to everyone in your CRM ... the ROI would be unbelievable."
- **His process (20:38):** finish every atomic piece of content, list and describe it, then have several agents decide which pieces stack on which page. That's done (below).
- **Content:** lots of blog entries, some written as blogs and some made from clips (video on top, summary below), shown in a "recommended for you" carousel. Never "watch demo 1, 7 and 9".
- **Voice:** "None of it sounds like me." No writing without a copywriting skill. The skill is now `alex-voice`.
- **Ivana:** she knows Alex personally (the context is in `ALEX-WANTS.md`, W19, git-ignored; keep it out of tracked files). Her page and note must read as from someone she knows.
- **LinkedIn wall:** all of it, edgy ones included: "I have personality."
- **Canva:** off. Don't bring it up, except to say it's parked.

## Done since 20:13 (all committed and pushed unless marked)

- **`RULES.md`** at the root: what the site is for, plus ten rules. Draft until Alex says yes; he hasn't objected. Every session and subagent reads it first.
- **The content library** in `orchestration\local\library\` (git-ignored): `written.md/json` (201 written and demo pieces), `video.md/json` (204: 15 sessions, 22 clips, 143 moments, image sets), `skills.md/json` (24 reusable skills, ICP pieces first), `live-site.md` (28 live pages), `mockup.md`. Audits are in `orchestration\local\audit\`: `AUDIT.md` (111 chat asks, 5 lost), `SPOKEN-WANTS.md` (84 spoken wants), `NUGGETS.md` (45 nuggets, top 15 ranked).
- **The `alex-voice` skill** in `.claude\skills\alex-voice\` (3efed5d): Write Great Post's rubric adapted for web and articles (web-1.2, 27 criteria), with a write, grade, retry loop, calibrated on his posts. Its private run logs are in `local\`, which is git-ignored.
- **Clip booth:** `legibility\grading\launch.ps1` at http://127.0.0.1:8765/, now with G Great, Y Yes, M Maybe, N No (a9e0d81). Alex is grading; grades go to `legibility\grading\grades.jsonl`. At about 21:05 he had 7 Greats, all from S02.
- **Full LinkedIn wall:** `scraping\site\linkedin-wall\wall-full.json` (94 posts, all kept) and `img\` (92 files), both uncommitted, because images in the public repo are his open call. `website` built it on a **preview** behind `WALL_FULL=1` (5a77321): https://hire-me-hackathon-gnx9x4xvo-alex-alderman-s-projects.vercel.app/about#linkedin. Production is unchanged. It goes live on his yes. I flagged that his kid's Halloween photo is the first card.
- **Best-of-three site structure:** brief at `orchestration\assembly\BRIEF.md`; proposals A (pitch first), B (proof first), C (person first); judge's `VERDICT.md`, which ranks C, B, A and gives a merged plan. Proposals and verdict are git-ignored. **`website` is building the verdict's section 4 on preview, one request at a time** (sent 21:08), skipping anything that hangs on the five calls, and reports one line per request to orchestration.
- `Open tasks.md` row 22 marked answered (the 4 pm meeting).

## Waiting on Alex: the five calls (asked at about 21:12, in chat and on the plan page)

1. Besides Ivana, which of the six know him, and how?
2. Does the CRM line close the machine section rather than head the site? (rec. yes)
3. Retire the 5/10/20/60 time picker for good? (rec. yes)
4. Fetch the TypeSafe key from 1Password, with the rig stopped, for a live run of the lead router's 7 hard leads? (rec. yes; never print the key; under a cent.) Jev is TypeSafe's model; `getsales\routing\route.py` has no client code yet, and it would go in `getsales\routing\runs\`.
5. The ask on each page: "reply to my note" on five, and on Ivana's a pointer to Tuesday without the time. (rec. yes)

His answers may arrive in chat or saved to the plan page's db (collection `feedback`, docs `call-1` to `call-5`). Read them with the ArtifactData tool, `list` on the page's url.

## Running when this was written (my subagents write files, so check the files)

- **DONE 21:30, the articles in his voice** (db51311): six pieces in `blog-articles\voice\`, each graded Good after 3 attempts, none Great. Each has `[Alex: ...]` markers for his last 10%: real results, the proudest afternoon moment, a closing line, and so on. Article 2 keeps "If AI won't replace half your team, put it in your pipeline", with the other title as `alt_title`. "So good AI that it looks human" quotes his 20:29 note, so it's his call. Two fixes for `alex-voice`: preflight flags every `[Alex: ...]` marker as third person, and the "one point and stop" length rule failed drafts within 5% of their target. Look at both before any 5-attempt rerun. The original brief, for reference: `blog-articles\voice\<slug>.md` and `INDEX.md`: articles 1 and 2, "AI slop into AI ops", the day-one story, and two new ones, "Knowledge arbitrage" and "So good AI that it looks human".
- **Clip side cards** (changed at 21:24 on Alex's word, W33 to W35: not one entry per Great) → `legibility\cards\<moment id>.md`, `cards.json` and `INDEX.md`. Each card is an internal definition, not copy: gist, points, his words, themes from one vocabulary, related library ids, what it could serve as, watch-outs. They're for the compilation agents that decide what goes together. Any summaries written before the change sit in `legibility\clip-articles\_drafts\`. The old bullet, now superseded: `legibility\clip-articles\<moment id>.md` and `INDEX.md`: about 12, his Greats first, re-reading grades.jsonl as he goes.
- **The visual plan page is published:** https://claude.ai/artifact/YBYAno5emmGsfwTLqKp3uZ ("Site Plan", 21:25, with capabilities `{db: {}}`). Its source is `orchestration\local\site-plan.html`, which you publish to that url to update it. Alex's answers to the five calls land in its db, collection `feedback`, docs `call-1` to `call-5`; read them with ArtifactData `list`. It was empty at 21:25. The builder notes that the verdict's own totals don't add up, so the page shows the row sums: Alex about 2 h 35 m, `website` about 4 h 35 m.
- An older page, `finish-plan.html` in the same tmp folder, was never published. It's superseded by the site plan, so don't publish it.

If any of these files is missing or half-written, that agent died with the old session. Rerun it from its brief in this file: its brief is the bullet's description plus "load `alex-voice` and follow it; RULES.md first".

## Next, in order

1. Close the handoff: `claude stop e41f29c0`, then `claude rm e41f29c0`, check one `orchestration` row, note the new id in `SESSIONS.md` (`[roster]` commit), and re-create the context-watch cron (`13,43 * * * *`, the prompt in the old cron: SPEC section 8 with the 20:12 rules, skip the paused sessions, the clock check, push when ahead).
2. Tell Alex in his chat (this is a new chat in agent view, under the same name) that a fresh session has his thread, in one line. Then read his answers to the five calls.
3. Keep `website` fed: it works through the verdict's section 4 on preview. When drafts land, it uses them. Interface words go through `alex-voice`.
4. **K1, `website\content\recommend.json`** (promised to `website` at 21:22): the default "recommended for you" carousel and one per person, as VERDICT section 2 places them, with each "why I picked this for you" line written through `alex-voice`. The shape `website` asked for (21:27): `{ "placeholder": false, "lists": { "default": [...], "growth": [...], "ceo": [...], "cofounder-1": [...], "cofounder-2": [...], "delivery": [...], "bi": [...] } }`, each item `{ "id": <library id>, "why": <the line under the card>, "fallback": <library id or null> }`. Cards take their titles from the pages, so only the why-lines are new words. Ids that resolve today: `demo-d1-scraping-briefing`, `demo-d2-company-research`, `demo-linkedin-voice-entry`; entries `website` builds from now on carry `library_id`. W2 is built on preview behind `NEW_SITE=1` (https://hire-me-hackathon-203pda2gw-alex-alderman-s-projects.vercel.app), and production refuses a placeholder list. Next it builds W3, the /for restack, with placeholders where K2's notes go (K2 waits on call 1). It has finished W1: the preview home is back to the live file, the welcome and picker are imported by nothing, and the wall is on /about (https://hire-me-hackathon-kha3g7fdn-alex-alderman-s-projects.vercel.app). It won't create a Vercel protection-bypass secret unasked, and that's right.
5. **K2, the six notes on the pages** (W3 is built on preview, 21:33: https://hire-me-hackathon-kp2t6a31b-alex-alderman-s-projects.vercel.app/for/growth). They go in `website\content\stakeholders.json`, `pages[i].landing`: `note` (80 to 150 words, paragraphs separated by a blank line), `questions` ([{q, a}], at most 3, none for growth), `made_line`, `ask_line`. Markdown links work, and internal links get `?for=<slug>` added. `landing.approved` is the gate: production shows only the hello, the carousel and the shared blocks until it's true, and previews mark unapproved words as a draft so Alex can approve them on the real page. Names follow each person's own LinkedIn spelling (Stepan Hyks, Milos Cerovsky, Pavel Novak, David Srenk; Ivana Karhanová and Lukáš Marek keep their diacritics). One for Alex: Addvery's site writes "David Šrenk". `website` builds W4 next, the entry template.
5aa. **`website` was refreshed at 21:49** (504k tokens): the fresh session is **91fdba88**, working from `website\HANDOFF.md` (6c9e08d). Roster committed (887319e). By then it had W7 on preview too (https://hire-me-hackathon-nr24z43xm-alex-alderman-s-projects.vercel.app): the menu is Articles · About me · For Addvery; the /d pages redirect; the feed moved to /log; the home has no countdown or board. W8 is next. **Side cards: DONE at about 21:50** (8765665): 53 cards (34 G, 19 Y) in `legibility\cards\`, one `.md` per moment, plus `cards.json` and `INDEX.md` (the 14-theme vocabulary and the clusters). Every quote and theme was checked by script. **Ten G or Y moments have no card yet** (S11-b, S12-a, S12-d, S12-e, S12-f, S12-g, S12-i, S12-j, S12-m, S12-n), and 13 were ungraded at the last pass. Launch a card agent for those and for any later grades, in the same format; its reusable tooling is in `C:\Users\alder\AppData\Local\Temp\clipart\cards\`. Clusters it found:
- the human bottleneck (S03-e, S03-f, S04-i, S10-h, day1-5)
- the outreach thesis (S02-c, S02-d, S02-h, S08-b, S10-e)
- why GTM engineers (S02-f, S10-c, S02-i, S10-b)
- closing every session by accident (day1-2, day1-3, S05-n, S07-d)
- the hiring pitch (S02-b, S02-e, S02-j, S03-j, S03-i)
- researching the company (S08-b, S09-b, S09-i, S09-f)

19 summaries written before the change sit in `legibility\clip-articles\_drafts\`, all graded Good. Next for the cards is the compilation step (5b). `website` (91fdba88) was moved at 21:52 to W13 (/videos) and W14 (/skills), since W8 waits on A4 and A8, and W9 on K1, K2, A5 and A6.
5a. **`website`'s progress by 21:40:** W4, the entry template (video by start and end, no read times, "Next for you"), and W5, the two GetSales entries, C1 `demo-getsales-routing` and C2 `demo-getsales-36-workflows`, both still drafts. W6, the 13 clip-articles, is **parked** (told 21:40): clips go through side cards and a compilation step instead. **K4 copy fixes** for C1 and C2, in `website\content\demos\`: drop the "GetSales demo 1/2" kickers, since the verdict bans "Demo N"; C2 promises a three-minute walkthrough that isn't recorded, while its video is the 112 s design clip; add the 57-person section and the plain line about the model; message-1-variable.png is a placeholder.
5b. **The compilation step** (Alex's W34, W35): once the cards are done, agents read the cards, the library and the articles, and propose which pieces combine into entries and in what shape. Then `website` builds those entries with the W4 template.
6. **The six connection notes** (Alex sends them by hand in the morning), Ivana's first, through `alex-voice`, once call 1 is answered. They're needed by morning, so this is the top of the copy work.
7. The facts that disagree across the site go to Alex in one batch: sabbatical six or nine months; "over a decade" or "ten years" in Prague; "15 minutes of talking" for articles that weren't dictated; Ivana's title (Chief Growth Officer, but "Director of Growth" in stakeholders.json); "see all ten demos", when there are 12.
8. The wall's alt text: 76 of its 92 images have generic alt text (`website`'s accessibility check, 21:17; newest preview https://hire-me-hackathon-ks1zfq5zt-alex-alderman-s-projects.vercel.app/about#linkedin). A subagent that looks at each image in `scraping\site\linkedin-wall\img\` can write a one-line plain description into `wall-full.json` as `alt`. It's description, not his voice, so no `alex-voice` needed. Then tell `website`.
9. GetSales demo 2 (one minute at a terminal) is the ICP proof's missing video. Put it on his list at a good moment, with the rig.

## Rules learned tonight

- Alex messages arrive mid-turn. Fold them in, and record each one verbatim in `ALEX-WANTS.md` the same turn.
- PowerShell 5.1's `Set-Content -Encoding utf8` adds a BOM. Write with `[IO.File]::WriteAllText(path, text, (New-Object Text.UTF8Encoding $false))`.
- `python -I` can't see user-site packages such as PIL. Run your own trusted scripts without `-I` from a neutral folder.
- Background subagents die with their session. Hand off only when none are running, or make sure their output is files.
