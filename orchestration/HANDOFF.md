# Orchestration handover

Written 2 Nov, 21:15 Prague, by the outgoing `orchestration` session (id `e41f29c0`, at 392k tokens, flagged ROT by the context watch). Read this, then `RULES.md` at the repo root, then `orchestration\local\ALEX-WANTS.md` (git-ignored; Alex's verbatim words tonight, W1 to W32), then `orchestration\assembly\VERDICT.md` (git-ignored). Take every time from `Get-Date`. The 20:11 handover this replaces is in git history.

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

- **Articles in his voice** → `blog-articles\voice\<slug>.md` and `INDEX.md`: articles 1 and 2, "AI slop into AI ops", the day-one story, and two new ones, "Knowledge arbitrage" and "So good AI that it looks human".
- **Clip side cards** (changed at 21:24 on Alex's word, W33 to W35: not one entry per Great) → `legibility\cards\<moment id>.md`, `cards.json` and `INDEX.md`. Each card is an internal definition, not copy: gist, points, his words, themes from one vocabulary, related library ids, what it could serve as, watch-outs. They're for the compilation agents that decide what goes together. Any summaries written before the change sit in `legibility\clip-articles\_drafts\`. The old bullet, now superseded: `legibility\clip-articles\<moment id>.md` and `INDEX.md`: about 12, his Greats first, re-reading grades.jsonl as he goes.
- **The visual plan page is published:** https://claude.ai/artifact/YBYAno5emmGsfwTLqKp3uZ ("Site Plan", 21:25, with capabilities `{db: {}}`). Its source is `orchestration\local\site-plan.html`, which you publish to that url to update it. Alex's answers to the five calls land in its db, collection `feedback`, docs `call-1` to `call-5`; read them with ArtifactData `list`. It was empty at 21:25. The builder notes that the verdict's own totals don't add up, so the page shows the row sums: Alex about 2 h 35 m, `website` about 4 h 35 m.
- An older page, `finish-plan.html` in the same tmp folder, was never published. It's superseded by the site plan, so don't publish it.

If any of these files is missing or half-written, that agent died with the old session. Rerun it from its brief in this file: its brief is the bullet's description plus "load `alex-voice` and follow it; RULES.md first".

## Next, in order

1. Close the handoff: `claude stop e41f29c0`, then `claude rm e41f29c0`, check one `orchestration` row, note the new id in `SESSIONS.md` (`[roster]` commit), and re-create the context-watch cron (`13,43 * * * *`, the prompt in the old cron: SPEC section 8 with the 20:12 rules, skip the paused sessions, the clock check, push when ahead).
2. Tell Alex in his chat (this is a new chat in agent view, under the same name) that a fresh session has his thread, in one line. Then read his answers to the five calls.
3. Keep `website` fed: it works through the verdict's section 4 on preview. When drafts land, it uses them. Interface words go through `alex-voice`.
4. **K1, `website\content\recommend.json`** (promised to `website` at 21:22): the default "recommended for you" carousel and one per person, as VERDICT section 2 places them, with each "why I picked this for you" line written through `alex-voice`. `website` builds W2 (the carousel and pill) on a marked placeholder until it lands. It has finished W1: the preview home is back to the live file, the welcome and picker are imported by nothing, and the wall is on /about (https://hire-me-hackathon-kha3g7fdn-alex-alderman-s-projects.vercel.app). It won't create a Vercel protection-bypass secret unasked, and that's right.
5. **The six pages and notes**, Ivana's first, through `alex-voice`, once call 1 is answered. They're needed by morning, so this is the top of the copy work.
6. The facts that disagree across the site go to Alex in one batch: sabbatical six or nine months; "over a decade" or "ten years" in Prague; "15 minutes of talking" for articles that weren't dictated; Ivana's title (Chief Growth Officer, but "Director of Growth" in stakeholders.json); "see all ten demos", when there are 12.
7. The wall's alt text: 76 of its 92 images have generic alt text (`website`'s accessibility check, 21:17; newest preview https://hire-me-hackathon-ks1zfq5zt-alex-alderman-s-projects.vercel.app/about#linkedin). A subagent that looks at each image in `scraping\site\linkedin-wall\img\` can write a one-line plain description into `wall-full.json` as `alt`. It's description, not his voice, so no `alex-voice` needed. Then tell `website`.
8. GetSales demo 2 (one minute at a terminal) is the ICP proof's missing video. Put it on his list at a good moment, with the rig.

## Rules learned tonight

- Alex messages arrive mid-turn. Fold them in, and record each one verbatim in `ALEX-WANTS.md` the same turn.
- PowerShell 5.1's `Set-Content -Encoding utf8` adds a BOM. Write with `[IO.File]::WriteAllText(path, text, (New-Object Text.UTF8Encoding $false))`.
- `python -I` can't see user-site packages such as PIL. Run your own trusted scripts without `-I` from a neutral folder.
- Background subagents die with their session. Hand off only when none are running, or make sure their output is files.
