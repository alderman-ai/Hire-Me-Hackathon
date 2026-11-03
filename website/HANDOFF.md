# Handoff: website

Written 3 Nov at 08:15 Prague by the `website` session (job 91fdba88, Claude session 01UyYB1sYto5RMbi9fvTBjr1), for its same-name successor at orchestration's context refresh. **Run `date` before writing any time.**

## Tell yourself first

1. **Production is the best-of build plus one entry, and every production deploy needs all four flags** (`NEW_SITE`, `WALL_FULL`, `VIDEO_WALL`, `SKILLS_PAGE`). A plain `vercel deploy --prod` puts the old site back. The recipe is under "Deploying".
2. **This morning Alex redlines the live site** on a Claude Design canvas (`orchestration\local\ALEX-WANTS.md` W59, W60; plan in `orchestration\local\overnight\MORNING.md`). Build requests come from `orchestration`, `orch-site-map` and `orch-alex-prep`. Ask the asker whether a change goes to production at once (last night's go-live was given in advance, W58) or to a preview first (RULES.md rule 1). After each request, send the asker one line with the URL and what changed.
   - **Standing rule from `orchestration`, 3 Nov ~08:25:** every build request goes to a preview first (rule 1). Promote a batch to production only on `PROMOTE <request numbers>` from orchestration, after Alex has looked. Each promote gets the leak scan (see "Checks") and all four flags. A request that wants otherwise says so explicitly.
3. **Rules that bite:** no words without `alex-voice` (rule 2: you place words, you don't write them); **no asks on any page** (rule 11: no one-ask block, no `ask_line`, no questions block); no time picker; nothing about Canva; a No grade comes off.
4. **Clock:** loop pid 9044 (restarted 10:25 on 3 Nov for `finished_at` and `built_seconds`), idle, 2.92 h left; last rig line "S17 stopped" (10:16). Expect clock lines (CLAUDE.md, "Clock messages"). Check `.clock\sync.pid` and the tail of `.clock\sync.log` first.
5. **Budget (Alex, about 12:00 on 3 Nov: 19% of Claude usage left to finish):**
   - Use Sonnet subagents for mechanical work: copy swaps, placements, redirects, figure re-renders from given text, leak scans, layout checks, uploads, and builds.md and HANDOFF upkeep. Keep Opus only for real design builds.
   - Check at both widths only when layout changed. A words-only change gets one quick look.
   - Keep messages to orchestration to one or two lines.
   - Fold small fixes, such as the `/day-2` h1 to h3 skip, into the next real change.
6. Hand off again at about 350k tokens: finish the request you're on, update this file, tell orchestration.

## What's live

Production deployment `5b5w340og` (3 Nov 12:30), from `2071784`, built with all four flags. It carries:
- **The hackathon bar:** status LIVE! / On Break / Finished from the recording clock, with cells Day 1 Highlights | Day 1 Feed | Day 2 Feed (from `HACK_ITEMS` and the Day 2 group in `app\layout.tsx`).
- **`/log`, Day 1's page:**
  - the highlights with the merged session chart `app\log\day-lanes.tsx`;
  - the low point: rig's 3:38 cut `sBVgT-LbEQo`, in three beats;
  - the compact feed.
- **`/day-2`:** a real feed from `content\feed-day2.json`, with 8 posts:
  - on top, S19's update `mBa187jP1rc`;
  - then the S18 walkthrough, the Comfy videos post, Day 1's highs and lows, the three articles, and S17's update `NeASfMN1Kcc`.
- **C2 (`content\demos\getsales-36-workflows.md`):** the S18 article, with its full video `_vgNB5ubKjA`, which also plays on home and Ivana's page; clips c3 to c6; the grid; and the still cropped to the builder. Clips c1 and c2 are on `/videos`.
- **Articles:** four, under How the day went: teaching-a-machine, label-every-piece, build-it-in-their-brand, ai-workflows-are-always-a-managed-service. Also: M5 (the LinkedIn voice entry is gone), and `/demos` is titled Articles.

The earlier production deploys are logged in `builds.md`.
- **Open:**
  - The time-lapse has code (`app\log\timelapse.tsx`, `scripts\build_timelapse.py`) but no frames. The Vercel MCP can't reach the project's 41 Day 1 deployments, so it needs Alex to grant the connector access or OK a temporary bypass key. Orchestration also wants 1920×1080 frames kept as files, plus `<deployment>.boxes.json`, for comfy-collab.
  - The YouTube ids `6FlJ9h3IHzQ` (S17 webcam only) are unlisted and unused.
  - At 12:30, two live sessions answered to the name `orchestration`; that's for orchestration to sort out.
- **New tools:**
  - `scripts\upload_file.py`: uploads any finished MP4 unlisted under a `content\videos.json` key (`--replace`).
  - `scripts\check\` plus `$CLAUDE_JOB_DIR\tmp\derby_shot.mjs`: CDP viewport shots of an element mid-animation.
- **Finishing the build:** write `.clock\finished.json` as `{"at": <epoch seconds>}` when Alex calls the end; the sync then publishes `finished` and the bar reads "Finished at ... / Built in: ...". The clock loop is now pid 9044 (restarted 10:25 for the new fields).

| Route | What |
| --- | --- |
| `/` | The best-of home (`app\home\best-home.tsx`). In order: hero (pipeline headline, S10-c clip), numbers strip, the 36-workflow machine, the account, limits, CRM band, six faces, the argument, moments that became skills, the carousel, the about strip |
| `/for`, `/for/<slug>` ×6 | Lens lines plus S02-j on `/for`. Each personal page is P1 to P7: hello with `lead`, note, lens block, quote collection, made line, carousel, notice. No questions, no asks. `approved: true` on all six |
| `/skills` | 20 skills in four groups, eight moments, CRM band |
| `/videos` | The wall: 55 tiles in five rows, built from the booth's grades |
| `/about` | Glance row, S02-e, S12-m, How I work (six clips and two photos), What I've written, and the 94-post wall with alt text |
| `/demos` and entries | C2 `36-outbound-workflows-and-the-one-variable-behind-them` (with matrix, "Why I built this first", "Runs again"), C1 `sorting-twelve-leads-into-36-workflows-rules-first-then-jev`, `linkedin-posts-in-addverys-voice-graded-blind`, and `best-of-three-instead-of-redlining` (kind `showcase`) |
| `/d1`, `/d2`, `/log`, `/privacy`, `/docs/charter` | Unchanged; `/log` is the old feed. `/d3` to `/d12` redirect (`app\redirects.ts`) |

## Deploying

**Preview:** `bash scripts/preview_deploy.sh` (all four flags, never `--prod`). It exports **HEAD** to `$CLAUDE_JOB_DIR\tmp\clean-deploy`, so commit first. It also copies the git-ignored assets in: `public\addvery\`, `public\people\`, `public\about\` (with `wall-full\`, 178 files), `app\demos\_og\glow.jpg`, and `local\about\`, `local\org-diagrams.json`, `local\research\`. A preview needs a Vercel login; check it on a local build instead.

**Production:**
```bash
cd "/c/Users/alder/Desktop/Hire me hackaton/website" && EXPORT_ONLY=1 bash scripts/preview_deploy.sh
D="$(cygpath -u "$CLAUDE_JOB_DIR")/tmp/clean-deploy"   # no dev server running there, no node_modules junction left in it
cd "$D" && rm -rf .next && MSYS_NO_PATHCONV=1 vercel deploy --prod --yes --build-env NEW_SITE=1 --build-env WALL_FULL=1 --build-env VIDEO_WALL=1 --build-env SKILLS_PAGE=1
# then curl the routes above for 200, and check the menu reads Articles|Videos|Skills|About me|For Addvery
```
Don't use `vercel curl`: it would create a protection-bypass secret on the project.

**Local check (PC-light):**
1. `EXPORT_ONLY=1 bash scripts/preview_deploy.sh`.
2. Junction `node_modules` into the export: `cmd /c mklink /J "<export>\node_modules" "<website>\node_modules"`.
3. Start `node node_modules\next\dist\bin\next dev --webpack -p 3101` hidden (`Start-Process -WindowStyle Hidden`), with the four flags set in its environment. Add `VERCEL_ENV=production` to see exactly what production shows.

The server serves the export, so copy an edited file across before rechecking. Before re-exporting or deploying: stop it (kill processes whose command line contains `clean-deploy`), then `cmd /c rmdir "<export>\node_modules"`. Never delete the export with the junction still in it.

## Words, and where they live

- **New strings by key:** `content\site-copy.json`, read through `t()` in `app\copy.ts` (a missing key fails the build). `scripts\apply_copy.py [--check]` swaps in orchestration's `orchestration\local\mockups\best\copy\*.json` ({KEY: text}) and `copy\notes.json` ({slug: note}); it skips `spans.json`.
- **Personal pages:** `content\stakeholders.json` `pages[i].landing`, with `lead` (Ivana's starts with `lead_key` `for-growth.note.history`), `note` (paragraphs split by a blank line, `**bold**`), `made_line`, `sign`, and `approved`. `questions` and `ask_line` are retired. `pages[i].lens` / `lens_key` are the `/for` lens lines. Quotes: `content\quotes.json`.
- **`/skills`:** `content\skills.json` (each `line` is a `skills.<id>.1` key).
- **`/videos`:** `content\video-words.json` (intro, row labels, per-id title and summary; empty, so titles are the library's working titles and production shows no placeholders). Rows come from `scripts\build_video_wall.py` → `content\video-wall.json` plus stills in `public\videos\` (rerun after more grading; the grades are from 21:54).
- **Entries:** `content\demos\*.md` (front matter is validated in `app\demos\entries.ts`). `kind: article` needs a `made` box with real numbers, so an entry without them is `showcase`. `library_id` makes an entry resolve in `app\recommend.ts`. Any `data-needs` link (e.g. `art-pipeline-promise` on home, `/about` and C2's "Why I built this first") appears by itself once an entry carries that `library_id`.

## The walkthrough swap (MORNING item 3; orch-alex-prep has the scene card)

When the 36-workflow walkthrough is cut and uploaded, change only `video.youtube_id` (and `start`/`end`) in `content\demos\getsales-36-workflows.md`. Home, Ivana's page and the C2 entry all read it from there (`app\best\machine.tsx`). Then, through alex-voice:
- the C2 paragraph that starts "The video is me at 16:36 on build day...";
- `message-1-variable.png`, which should become a still from the walkthrough (see C2's own comment);
- Ivana's note already says "Start with the 3-minute video below", which only becomes true then (tonight the frame plays the 1:52 clip).

## Code map

- `app\flags.ts`: the four flags plus `IS_PRODUCTION_BUILD`. Menu: `newNavLinks()` in `app\site-links.ts`, called on the server.
- `app\best\`: shared parts (`parts.tsx`, `best.css`, `video-frame.tsx`) and `machine.tsx` (the 36 block: frame, stats, routing, matrix, messages, figures, links).
- `app\home\`: the home page.
- `app\for\[slug]\`: `personal.tsx`, `lens.tsx` (six P3 blocks), `quotes.tsx`, `for-href.ts`.
- `app\skills\`: the `/skills` page.
- `app\videos\`: the wall, with a dialog player.
- `app\about\`: the page plus `clips.ts`; the wall is `wall-full*`.
- `app\demos\`: `markdown.ts` (callouts, including `[!slot]`), `slots.tsx` (C2's three additions only), `entry-end.tsx` (C2's "Next for you" is forced to C1).
- `app\recommend.ts`: lists (including `about`); a card falls back to its page's dek; `pageHref()`.

## Open and parked

- **Best-of-three entry:** it's `showcase` because it has no `made` numbers. If orchestration sends them, switch it to `article`. Alex decides at the redline whether its usage line ("69%... that's a little scary") and "completely drained" stay.
- **Six verdict pieces graded No, off `/videos`:** `clip-c-s08-same-thing-tomorrow`, `clip-c-s09-assistant-can-do`, `clip-c-s07-making-decisions`, `clip-c-s04-legibility-born`, `m-s04-b` and `m-s12-o`. Orchestration knows. Clip starts and ends follow `cards.json`, 2 to 3 s off the mockups.
- **Webcam uploads S13 to S16** aren't done (CLAUDE.md, "Video"). Run them one at a time, with nothing recording.
- **Minor:**
  - `/log` may render two h1s (the S02 summary headline in `app\feed.tsx`); not checked since the move.
  - `/llms.txt` (W16, optional).
  - `AI_PORTFOLIO_SLUG` is empty.
  - The stray review artifact `page-1.md` (AW6Ld5n5CKuBHBX7JR3tj2) is for Alex to delete.
- **Retired:** the six 18:58 review artifacts, the 5/10/20/60 picker (`time-picker.tsx`, `welcome.tsx`; in git, imported by nothing), and the old K1/K2 placeholder shapes.

## Checks

- `node scripts\check\audit_page.mjs <url> <outdir>`: any page at 1,440 and 390 px. It reports sideways scroll, h1 count, heading skips, alt text, broken images, small targets and placeholders, and saves full-page JPEGs. Small inline text links are exempt from the target-size rule.
- `audit_videos.mjs` (the `/videos` dialog by keyboard) and `audit_wall.mjs` (`/about` wall).
- **Leak scan (DoD-22):** first `python scripts\check\render_pages.py http://localhost:3101 <out>` (every route's visible text, alt text and links), then `python -I ..\blog-pipeline\scripts\scan.py <out>`. The expected hits are the charter naming the proposal and his outbound (allowed), LinkedIn post URLs in `/about`'s links, and `/d2`'s public Addvery email and privacy-PDF URL. Its "website deny list not found" is harmless: `sync_docs.py`'s patterns are secret shapes the scan already checks.

## Working notes

- Long Python in Bash heredocs mangles backslashes (`\t`, `\[`); write the script to `$CLAUDE_JOB_DIR\tmp` and run it.
- `git archive` writes CRLF, so compare with `diff --strip-trailing-cr`. Commit path-limited with `[website]` (`..\GIT.md`).
- Last night four Sonnet subagents ported the pages, one owner per folder, and the session committed and checked each. Their brief carried the hard limits: no dev server or build, at most two `tsc` runs, no git writes, edit only their own files.
