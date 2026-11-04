# Handoff: website

Written 4 Nov at 19:59 Prague by the `website` session (job 534b5bd8) for its same-name successor, at Alex's request (context at 70%). It replaces the 3 Nov 13:10 handoff. Every build since then has a row in `builds.md` (newest at the bottom). **Run `date` before you write any time.**

## Tell yourself first

1. **The situation.**
   - The hackathon is finished. `.clock\finished.json` is written and the bar reads "Finished at 10:01pm on 3 Nov · Built in: 11 hrs 21 mins". No clock lines come from `rig`. Don't restart the clock loop.
   - Only `orchestration` runs (session a77ec41a since 13:32 on 4 Nov). It is your only requester and the only place questions go; the answer desk is paused.
   - The GitHub repo `alderman-ai/Hire-Me-Hackathon` is private now. The site has no link to it; keep it that way.
2. **How a build flows.**
   - Orchestration sends `BUILD` / `REQUEST` (sometimes `+ SHIP`). The words come as a JSON file in `..\orchestration\local\copy\*.json`, written through alex-voice.
   - Place every word exactly. Never rewrite, and never add words (UI labels included, unless a key exists). The `_structure` or `_note` key is the build spec. If a key can't go where the spec says, say so instead of improvising.
   - Default: a preview first, then send orchestration the link. Production only on orchestration's word (`SHIP`, carrying Alex's yes). Orchestration can say a change goes straight to production (deletions, "quick clean then push").
   - Reply in one message: what changed, what you checked, anything skipped and why, then the preview link or the production deployment id and commit.
3. **Every deploy needs all four flags:** `NEW_SITE`, `WALL_FULL`, `VIDEO_WALL`, `SKILLS_PAGE`. A plain `vercel deploy --prod` puts the old site back.
4. **Rules that bite** (all from Alex, all still in force):
   - No new words, and no asks on any page (rule 11).
   - No gold, amber or orange anywhere. Addvery tokens only (`app\addvery-tokens.css`): violet `#6645eb`, orchid `#d445eb`, amethyst `#8b3fcf`, lavender `#d3c3ff`.
     - Never violet text on ink (3.1:1), never white on orchid (3.6:1).
   - The home page is for Addvery only: no line for visitors from elsewhere (W216).
   - The six people appear only by role on figures.
   - Screen captures: crop out tab bars, bookmarks bars and the taskbar (`public\videos\s18-c4.webp` is the example).
   - "Sequences", not "workflows": Alex didn't build 36 workflows; it's an approach for 30 to 50 sequences, and his example has 36.
   - Addvery's staff count is 56; 57 is the number of profiles the model read.
   - No "next company" line anywhere (removed site-wide on 4 Nov).
   - On `/for/ceo`, his AI's route never meets the labour framing: no pipeline-promise article and no `/log` in his "Where next", and no "keep the promise" footer line.
5. **Keep the PC light.** One build at a time. Stop every local server you start (see Deploying).

## What's live

**Production `m44erl63e`** (`dpl_4Cawjx3q4L6UBmWqyDBsqfF4oiAm`, 4 Nov 16:30), built from `98684ca` with all four flags. Later commits touch only `scripts\check\`, `builds.md` and this file, none of which deploy. Check it any time with `MSYS_NO_PATHCONV=1 vercel inspect hire-me-hackathon.vercel.app`.

What changed since the 3 Nov handoff, in order (details in `builds.md`):
- **3 Nov evening:**
  - The agent version: `lib\agent-track\`, a `.md` twin of every page, `/llms.txt`, `/llms-full.txt`, `/agent`, `/mcp` and WebMCP.
  - /about's client recommendations.
  - The article "What to do after your outbound sequences go live".
  - The Finished bar.
  - (`builds.md` has no rows for the last three, 21:38 to 22:05, production `bfik4z43z`.)
- **4 Nov:**
  - Repo links removed.
  - `/log` time-lapse removed.
  - `/for/ceo` recalibrated after Alex's interview (plus four fix rounds).
  - "36 workflows" reworded to 30 to 50 sequences across the site.
  - The home page rewritten.
  - The hero tinted violet; /videos without gold.
  - The routing captures' Jev labels in orchid; "57 profiles".
  - The next-company line removed.
  - The Web Analytics opt-out.

### /for/ceo, a recalibrated personal page
- **Words:** `content\for-copy\ceo.json`, orchestration's file kept as sent. Keys are flat; lists arrive as `key[i].field`; `_` keys are notes.
  - `app\for\[slug]\for-copy.ts`: `forText`, `forList` and `recalReady`. A value starting `[placeholder]` shows on previews only; production hides the whole recalibrated page until none is left.
  - `stakeholders.json`'s ceo page mirrors the shared fields (name Štěpán Hykš, greeting, lead, note, framing, sources, concerns, reading_list). Its `ask` is empty, and the gate in `app\stakeholders.ts` no longer requires `ask`.
- **Page:** `personal.tsx` branches on `recalReady(slug)`.
  - `recal.tsx`: `RecalTitle` (the h1, Czech half `lang="cs"`), `RecalLead` (the quote renders only if both quote keys have words; fix 1 emptied them), and `RecalBody`. RecalBody holds the person, join, argument, strategy, how it runs, the quarters timeline, the offer, proof with a copyable MCP line, concerns (`concerns.tsx`, shared with the old landing) and the CRM band.
  - The made line comes from the words file, and an empty one means no block (fix 4).
  - No lens, old note or quote collection. Styles are in `recal.css`.
- **Agent block** (`agent-guide.tsx`, after the byline): Open in Claude with `agent.ceo.prompt`, plus a copy-the-prompt fallback. It renders only for a page that has a guide.
- **His guide:** `/for/ceo/llms.txt` (`app\for\[slug]\llms.txt\route.ts`, `personGuide` in `lib\agent-track\docs.ts`).
  - It's listed under his page in `/llms.txt`, and `/agent-track.json` carries it, so the MCP tool `read_page "/for/ceo/llms.txt"` works.
  - Its title falls back to the page title and its note to the intro's first sentence (no `guide_title` or `guide_note` was ever sent).
  - `personNext()` keeps the pipeline-promise article and `/log` out of his "Where next".
- **His carousel:** `recommend.json` `lists.ceo`. Its second item carries its own `image` (`36-grid-card.png`), via the optional `RecItem.image` in `app\recommend.ts`.
- **Footer line:** `app\footer-line.tsx` leaves "...keep their promise" off `/for/ceo` (`HIDDEN_ON`).

### / (the home, rewritten 4 Nov, plus fix 1)
- **Sections:** `app\home\best-home.tsx` renders eight of them: the hero, `#what`, `#six`, `#argument`, `#proof`, `#team`, `#build`, the carousel and `#who`. Every word is a `home.*` key in `content\site-copy.json`. The spec is the `_structure` of `..\orchestration\local\copy\home-4nov.json` (and `-fix1.json`).
- **The lead card:** `lead-card-words.ts` (keys only, so `index.md` reads the same) and `lead-card.tsx`. It holds:
  - the seven fields from sample.csv row L11;
  - five steps on violet, orchid, lavender and gradient rules, with Rule, Jev and Person pills;
  - the Jev clip with the local still `/videos/s18-c4.webp`;
  - the Matrix with only Litware lit (`shownLegend={null}` hides the second legend item);
  - both messages;
  - fix 1: note.1 above the messages, then note.2, the four input chips joined into "Message 1", and note.close.
- **Carousel:** `recommend.json` `lists.home` (six articles). `ListSlug` includes `"home"`, but `LIST_SLUGS` doesn't.
- **The six faces:** each carries its hook line through `lensLine()` in `app\stakeholders.ts`, which the /for grid uses too.
- **Hero:** words unchanged. The still has a violet-to-orchid hue tint (`.bh-promise-tint`, `mix-blend-mode: hue`). The accents are lavender and the brand gradient. Contrast is measured in home.css's comment.
- **Removed:** `Machine36` is deleted, and `home-words.ts` holds only `HOME_SKILLS_TITLE` (which /skills imports).
- **`/index.md`:** `homeDoc` in `docs.ts` mirrors the same keys in the same order.

### Smaller things that live in code now
- `MACHINE_STAT_NUMS` (`app\best\machine-words.ts`) feeds the stat numbers to both the page and its Markdown ("30-50", "1", "0").
- `MATRIX_HITS[0].title` is `t("home.proof.matrix_hit_title")`. Matrix's screen-reader text says "sequence {n}".
- /videos featured cards: a 2 px violet-to-orchid ring (masked) and a gradient star badge.
- **Web Analytics opt-out** (`app\site-analytics.tsx`, replacing `<Analytics />` in the layout):
  - `?me=on` sets localStorage `va-disable` and drops that pageview; `?me=off` clears it. A flagged browser sends nothing.
  - The param is stripped with `history.replaceState`, and every storage access is in try/catch.
  - Alex's link: https://hire-me-hackathon.vercel.app/?me=on, once per browser.
  - Vercel's script already skips HeadlessChrome, and `scripts\check\*.mjs` set `va-disable` on every page anyway.
  - Tested live with `scripts\check\va_test.mjs` (`REAL_UA=1`): a flagged browser sends nothing, `?me=off` sends one `POST /8f3da83105c529e2/view`.

## Routes

| Route | What |
| --- | --- |
| `/` | The home (above) |
| `/for`, `/for/<slug>` ×6 | Grid with hook lines; personal pages P1 to P7 (`personal.tsx`), with `/for/ceo` recalibrated, plus `/for/ceo/llms.txt` |
| `/articles`, `/articles/<slug>` | Entries from `content\demos\*.md` (`/demos/*` redirect here) |
| `/videos` | The wall from `content\videos-wall.json` (33 clips) |
| `/skills`, `/about`, `/d1`, `/d2` (+ `/d2/<note>`), `/privacy` | As before (/about lost the S02-e clip) |
| `/log`, `/day-2` | Day 1 page (highlights, feed; no time-lapse) and the Day 2 feed |
| `/agent`, `/mcp`, `/llms.txt`, `/llms-full.txt`, `/agent-track.json`, `/<page>.md` | The agent version |
| `/docs/*` | Redirects to `/` |

## Words, and where they live
- **`content\site-copy.json`:** flat keys read with `t()` (`app\copy.ts`). A missing or empty key fails the build, and `{skills}` is filled in.
- **`content\for-copy\<slug>.json`:** a recalibrated page's words file (`ceo` only).
- **`content\stakeholders.json`:** the six pages (`landing`, `lens` / `lens_key`, `sources`, `notice`).
- **`content\recommend.json`:** lists `default`, the six, `about` and `home`; an item may carry `image`.
- **Entries:** `content\demos\*.md`.
- **/videos:** `content\videos-wall.json`.
- **`content\video-wall.json`:** the old wall, still read by `machine-words.ts` for tile titles.
- **Quotes:** `content\quotes.json`.

## Deploying
- **Preview:** `bash scripts/preview_deploy.sh`.
  - It exports **HEAD** to `$CLAUDE_JOB_DIR\tmp\clean-deploy` (so commit first), copies the git-ignored assets in, and deploys with the four flags.
  - A preview needs a Vercel login, so headless Chrome can't open one. Check on a local build instead. Don't create share or bypass links.
- **Production:**
  ```bash
  cd "/c/Users/alder/Desktop/Hire me hackaton/website" && EXPORT_ONLY=1 bash scripts/preview_deploy.sh
  D="$(cygpath -u "$CLAUDE_JOB_DIR")/tmp/clean-deploy"   # no dev server running there, no node_modules junction left in it
  cd "$D" && rm -rf .next && MSYS_NO_PATHCONV=1 vercel deploy --prod --yes --build-env NEW_SITE=1 --build-env WALL_FULL=1 --build-env VIDEO_WALL=1 --build-env SKILLS_PAGE=1
  ```
- **Promoting a preview exactly:** deploy its export again with `--prod` (check `git diff <preview commit> HEAD -- .` shows only builds.md or HANDOFF.md).
- **A hotfix while unapproved changes sit on main** (used at 13:28 for the time-lapse):
  1. `git worktree add -b <tmp branch> <tmp dir> <production commit>`, then cherry-pick the fix.
  2. `git archive <commit>:website` into its own folder, and copy the git-ignored assets as `preview_deploy.sh` does.
  3. Deploy with `--prod`.
  4. `git worktree remove`, then `git branch -D`.
- **Local check:**
  1. `EXPORT_ONLY=1 bash scripts/preview_deploy.sh`, then `cmd /c mklink /J "<export>\node_modules" "<website>\node_modules"`.
  2. Start `node node_modules\next\dist\bin\next dev --webpack -p 3101` hidden (`Start-Process -WindowStyle Hidden -PassThru`), with the four flags set in its environment. Add `VERCEL_ENV=production` to see what production shows: placeholders and draft strips gone.
  3. The server serves the export, so copy an edited file across before rechecking.
  4. To stop: kill the PID and its children (`Get-CimInstance Win32_Process | ? ParentProcessId -eq <pid>`), then `cmd /c rmdir "<export>\node_modules"`. Never delete the export with the junction still in it.

## Checks
- `node scripts\check\audit_page.mjs <url> <outdir>`: 1440 and 390 px.
  - It reports h1 count, heading skips, sideways scroll, broken images, alt text, small targets and placeholders.
  - It saves full-page JPEGs; cut them with `node scripts\check\crops.mjs <full.jpg> <prefix> <height> <width>`.
- `node scripts\check\element_shot.mjs <url> <selector> <width> <out.png>`: one element.
- **Leak scan** (`render_pages.py` reports every route's status):
  1. `python scripts\check\render_pages.py http://localhost:3101 <out>`.
  2. `python -I ..\blog-pipeline\scripts\scan.py <out> > scan.out`.
  3. `python -I scripts\check\scan_sum.py scan.out`.
  - Expected: 111 fail, all on URL lines (89 LinkedIn URLs on /about, 2 Addvery PDF links on /d2, 2 prompt links per article) plus 2 CONTACT hits for /d2's public info@addvery.com.
- **Analytics:** `REAL_UA=1 MSYS_NO_PATHCONV=1 node scripts\check\va_test.mjs https://hire-me-hackathon.vercel.app "/?me=on" /about "/?me=off"`. The `?me=off` step adds one real pageview.

## Working notes (gotchas)
- **Shell traps:**
  - Bash heredocs mangle backslashes (`\u2019`, `\\.`) and sometimes quotes. Write a script with the Write tool into `$CLAUDE_JOB_DIR\tmp` and run it with `python -I`.
  - Git Bash turns `/path` arguments into `C:/Program Files/Git/path`: set `MSYS_NO_PATHCONV=1`.
  - `npx tsc ... | tail` hides tsc's exit code: redirect to a file, then `echo $?`.
- **Code traps:**
  - `.bx-q { margin: 0 }` beats the `bx-mt-*` helpers. The home spaces its quotes with `.bx-q.bh-q`.
  - A Next `page.tsx` can't export helpers (that's why `concerns.tsx` exists).
- **Edits and commits:**
  - JSON edits: load, change, then dump with `ensure_ascii=False, indent=2` and a `\n` ending; that matches the files. For files you'd rather not reformat (the wall JSONs), remove objects as text.
  - Commit path-limited with `[website]` (`..\GIT.md`). Orchestration pushes now; GIT.md's "the watcher pushes" is stale while the watcher is paused.
  - Keep `builds.md`: one row per build, newest at the bottom.

## Open and parked (nothing is half-done; the working tree is clean)
- **YouTube titles**, Alex's channel only: the walkthrough `_vgNB5ubKjA` is titled "Hire Me Hackathon, the 36 GetSales workflows (full walkthrough)", and it shows in the embed on the 36 article, the home's old spots and Ivana's page.
- **Flags orchestration knows about and left for now:**
  - `skills.operator-attention-controls.1` says "all back in 9 minutes"; the feed says about seven, and the home says "under ten".
  - `/log.md` opens on "we're not going to fire half the team", the `/llms.txt` summary says "cut labor or increase revenue", and other pages' "Where next" lists include the pipeline article.
  - The content-distribution article's caption "yellow is a post I had to chase" belongs to a different figure (the old hand-kept tracker).
- **Dead code and leftovers, harmless:**
  - `Routing` in `machine.tsx`; `CeoLens` and `ceoSteps` (lines 41 and 50 of `lens-words.ts` still say "36 workflows", but nothing renders them now).
  - `scripts\build_timelapse.py`; `public\videos\S02-e.webp` and `public\videos\wall\s02-e.webp` (unreferenced).
- **`builds.md`** has no rows for 3 Nov 21:38 to 22:05 (About recommendations, the after-the-sequence article, the Finished bar; production `bfik4z43z`).
- **`local\research\06 How the research was done.md`** (git-ignored, deploys to /d2) lost its public-repo bullet on 4 Nov, so it now differs from `..\Addvery Research\for-site\`.
- **`CLAUDE.md` is out of date** ("Repo: public"; the clock and rig duties; "don't push"). It isn't yours to edit unless orchestration asks.
