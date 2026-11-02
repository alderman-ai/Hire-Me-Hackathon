# Handoff: website

Written 2 Nov at 21:47 Prague by the `website` session started after the crash (Claude session 01UyYB1sQdTqDrzVEZnktDyZ, job 2d36e96a), at orchestration's context-refresh request. Updated at 22:10 by its successor (job 91fdba88) after W13. **Run `date` before writing any time**: estimated stamps ran ahead today, twice.

## Parked overnight (Alex, 22:05, via orchestration)

- **No website updates tonight.** Overnight, orchestration builds three alternative mockups; in the morning Alex picks one and `website` builds it out. Start nothing (W14 included) before that.
- **Two rules that change the build:** (1) **no asks on any page**: drop the one-ask block (P6) and every `ask_line` from every `/for` page; pages give, they never ask. (2) **The 5/10/20/60 time picker is retired for good** (it already never ships; see W1).
- **The wall's alt text is parked, not built:** `local\parked\wall-alt.patch` (git-ignored) wires orchestration's 92 alt lines (`scraping\site\linkedin-wall\alt.json`) into `content\linkedin-wall-full.json`, `scripts\about_assets.py`, `app\about\wall-full-data.ts` and the video cover in `wall-full.tsx` (the 34-post wall's checked alts still win; carousel pages read "Page n of N: <alt>"; link previews stay alt="" since their title names them). Orchestration said skip it at 22:05. Only when asked again: `git apply website/local/parked/wall-alt.patch` from the repo root, typecheck, preview.

## Read first

1. `CLAUDE.md` (the course change at the top: attended work only, one build at a time, keep the PC light).
2. `..\RULES.md` (Alex's ten rules; it wins over every older plan). Rule 1: every change goes to a **preview** first, and production moves only on Alex's yes. Rule 2: no words without `alex-voice`; you write no copy.
3. `..\orchestration\assembly\VERDICT.md` (git-ignored, on disk): §2 is the site's new structure, §4.1 is your numbered build list (W1 to W16).
4. `builds.md`, the last ten rows: what each W item changed and its preview.

**Who asks:** build requests come from `orchestration` (and `orch-alex-prep`, `orch-site-map`). Ask `orchestration`, not Alex, when something's unclear. After each request, send `orchestration` one line with the preview URL and what changed. Clock lines come from `rig` (see CLAUDE.md, "Clock messages").

## Where section 4 stands (21:47)

| # | State | Commit | Preview |
| --- | --- | --- | --- |
| W1 deploy safety | BUILT. `app\page.tsx` is the live home again (27716be). The welcome, time picker and summary carousel stay in git, imported by nothing, and never ship. | 429d041 | kha3g7fdn |
| W2 carousel + pill | BUILT on website's **placeholder** `content\recommend.json` (K1 replaces it) | 87c7234, 4ddfe5d | 203pda2gw |
| W3 `/for/<slug>` P1 to P7 | BUILT; K2's words not in yet, so previews show marked placeholders | 278113e, d68bf81 | kp2t6a31b |
| W4 entry template | BUILT: `video.start`/`end` (captions on), no read times, crumb, Next for you, rail, Back to your page | c75c3b6, df4d0a6 | o17683wof |
| W5 C1, C2 | BUILT as drafts from `getsales\site\demo-*.md`; `/d3` → C2. K4's copy fixes are logged with orchestration | 4494d07 | ct2rju3xo |
| W6 13 clip-articles | **PARKED** (Alex, 21:23): graded clips don't each become an entry. Side cards in `..\legibility\cards\`, then compilation agents decide. Nothing will land in `clip-articles\`. The W4 template is what those entries use. | | |
| W7 chrome and cleanup | BUILT: new menu and footer, `/d3` to `/d12` redirects, `/d1` `/d2` stripped, feed at `/log`, interim home | 3762e1b | **nr24z43xm (latest)** |
| W8 articles | NEXT. Waits on Alex approving `art-pipeline-promise` and `art-managed-service` (A4, A8); then fill `ARTICLE-2-LINK` in `local\about\about-me.md` | | |
| W9 checkpoint 1 | `publish-leak-scan` (DoD-22) on the preview, Alex walks Ivana's page, then promote (see "Going live") | | |
| W10 to W12 | Not started | | |
| W13 `/videos` | BUILT behind `VIDEO_WALL=1`: five rows, 55 tiles, from `scripts\build_video_wall.py` (library + side cards + the booth's latest grades; rerun it after more grading). Six verdict pieces graded No are off (`builds.md`, 22:03). Words go in `content\video-words.json` | ee2ab30, 920cdaf | **elj1v4aja (latest)** |
| W14 to W16 | Not started; parked by Alex (22:05). `SKILLS_PAGE` is already in `app\flags.ts`, and `newNavLinks()` adds Skills to the menu when it's set | | |

The latest preview, with everything above: https://hire-me-hackathon-elj1v4aja-alex-alderman-s-projects.vercel.app (Vercel login; Alex's Chrome is signed in). Older ones are `https://hire-me-hackathon-<id>-alex-alderman-s-projects.vercel.app` with the ids above. Production is unchanged since 18:57, and was checked after every item.

## The two build flags (`app\flags.ts`)

- **`NEW_SITE=1`**: the verdict's whole new structure. That covers the carousel, the pill, the personal pages, the entry template's new parts, the menu, footer and redirects, `/log`, the interim home and C1/C2's redirect. Only previews set it. Without it, a build is today's live site, so HEAD is always safe for an urgent production deploy, a takedown for example.
- **`WALL_FULL=1`**: the 94-post LinkedIn wall on `/about` (orchestration's BUILD, 20:55; a11y-checked, see `builds.md` 21:16). It's separate because W12 promotes it on its own glance.
- **`VIDEO_WALL=1`** (W13) and **`SKILLS_PAGE=1`** (W14, no page yet): each needs `NEW_SITE` too, and has its own flag because Alex promotes each on its own glance (M1). Without it the route is a 404 and the menu leaves it out (`newNavLinks()` in `app\site-links.ts`, called on the server only).
- `IS_PRODUCTION_BUILD` (`VERCEL_ENV === "production"`): placeholders never render in production, and a `recommend.json` with `"placeholder": true` shows no carousel there.
- At a checkpoint, going live means building production **with** the flags (see "Going live"), then later deleting the old branches.

## Content shapes other sessions write into

- **K1 → `content\recommend.json`** (orchestration delivers it through alex-voice; today it's website's placeholder):
  `{ "placeholder": false, "lists": { "default": [...], "growth": [...], "ceo": [...], "cofounder-1": [...], "cofounder-2": [...], "delivery": [...], "bi": [...] } }`. Each item is `{ "id": <library id>, "why": <the line under the card>, "fallback": <library id or null> }`. An optional `"capabilities"` list is what a cold visitor's "Next for you" walks. Cards take titles from the pages themselves.
  Ids resolve in `app\recommend.ts`: `demo-d1-scraping-briefing` → /d1, `demo-d2-company-research` → /d2, `demo-linkedin-voice-entry` → the LinkedIn entry, and any entry whose front matter has `library_id` (C1 `demo-getsales-routing`, C2 `demo-getsales-36-workflows`). An unresolved id falls back to its fallback, else it's skipped.
- **K2 → `content\stakeholders.json`, `pages[i].landing`**: `note` (80 to 150 words, paragraphs split by a blank line), `questions` `[{ "q", "a" }]` (at most 3, none for growth), `made_line`, `ask_line`. Markdown links `[words](/path)` work in all four, and internal links get `?for=<slug>`. `landing.approved: true` is the gate: production shows the note and P4 to P6 only then. Rendered by `app\for\[slug]\personal.tsx`.
- **Entries** (`content\demos\*.md`): new optional front-matter keys are `library_id`, `group` (the crumb: "How I'd reach your accounts", "What I think", "How the day went"; working names), and `video.end`.
- **Names on the six pages:** unchanged, deliberately. Each matches the person's own LinkedIn profile: Stepan Hyks, Milos Cerovsky, Pavel Novak, David Srenk (Addvery's site says "Šrenk"), Ivana Karhanová, Lukáš Marek. The diacritic forms in the verdict come from agent-written dossiers. orchestration has this.
- **Working labels** waiting for alex-voice: "Recommended for you", "Your page · <name>", "Questions you might have", "Next for you", "Articles", "← Back to your page", the menu's "About me", the footer's "The log", "The plan", "The code on GitHub", and the wall's "Quoting my post from…", "Poll", "<n> pages", "Plays on LinkedIn".

## Deploying

**Preview (every W item):** `bash scripts/preview_deploy.sh` from the repo root or `website\`. It exports HEAD into `$CLAUDE_JOB_DIR\tmp\clean-deploy`, copies every git-ignored asset in, and runs `vercel deploy --yes --build-env WALL_FULL=1 --build-env NEW_SITE=1 --build-env VIDEO_WALL=1`, with no `--prod`. Commit first: it deploys HEAD, not the working tree.

**Production (only on Alex's yes, or a takedown):**

```bash
cd "/c/Users/alder/Desktop/Hire me hackaton"; D="$(cygpath -u "$CLAUDE_JOB_DIR")/tmp/clean-deploy"
# if a dev server ran there: stop it, then remove its node_modules junction with  cmd //c rmdir "$(cygpath -w "$D/node_modules")"
rm -rf "$D"; mkdir -p "$D"
git archive --format=tar HEAD:website > "$D.tar" && tar -xf "$D.tar" -C "$D" && rm "$D.tar"
mkdir -p "$D/.vercel" "$D/public/addvery" "$D/public/people" "$D/public/demos" "$D/local"; cp website/.vercel/project.json "$D/.vercel/"
cp website/public/addvery/* "$D/public/addvery/"; cp website/public/people/* "$D/public/people/"
cp -r website/public/demos/linkedin-voice "$D/public/demos/"; cp website/app/demos/_og/glow.jpg "$D/app/demos/_og/"
cp -r website/public/about "$D/public/"
cp -r website/local/org-diagrams.json website/local/research website/local/about "$D/local/"
cd "$D" && MSYS_NO_PATHCONV=1 vercel deploy --prod --yes          # today's site
# going live at a checkpoint:  vercel deploy --prod --yes --build-env NEW_SITE=1 [--build-env WALL_FULL=1]
# then check with curl: /about 200 "From my LinkedIn", one /about/wall image 200, /for/growth 200, /demos 200
```

Git-ignored but deployed: `public\addvery\` (24), `public\people\` (18), `public\demos\linkedin-voice\` (18), `app\demos\_og\glow.jpg`, `public\about\` (20, plus `wall-full\` 178), `local\about\about-me.md`, `local\org-diagrams.json`, `local\research\` (7). The app reads only those three from `local\`. `public\demos-assets\` (C1 and C2 figures) is tracked. Don't use `vercel curl`: it would create a protection-bypass secret on the project, a settings change nobody asked for (orchestration agreed, 21:22).

**Going live at W9:** run `publish-leak-scan` on the preview first. K1 must have replaced the placeholder list, or production shows no carousel. Entries go live by setting `status: "published"`, and C1/C2 are drafts until Alex approves them.

## Checking a change locally (PC-light)

- Vercel's preview needs a Vercel login, and the connector can't see this team's deployments. So check on a local dev server of the **same export**:
  1. `EXPORT_ONLY=1 bash scripts/preview_deploy.sh`.
  2. Junction `node_modules` into the export: `cmd /c mklink /J "<export>\node_modules" "<website>\node_modules"`.
  3. Start `npx next dev --webpack -p 3101` there, hidden, with `NEW_SITE=1` and `WALL_FULL=1` set in its environment. Add `VERCEL_ENV=production` to test the production gate.
- Why the export: a dev server (pid 8612, not ours, started 20:10, no flags) already holds port 3100 in `website\`, and Next 16 refuses a second dev server in the same folder. Turbopack won't follow the junction, hence `--webpack`.
- **Never** delete the export with the junction in it. `scripts\preview_deploy.sh` removes the junction by `rmdir` first, so stop the dev server before running it.
- The dev server serves the export, not `website\`: copy an edited file across (or commit and re-export) before rechecking.
- Headless checks: `scripts\check\audit_videos.mjs` (/videos: contrast, targets, rows, the dialog by keyboard, phone and 200% zoom), `scripts\check\audit_wall.mjs` (Chrome over the DevTools protocol with its own throwaway profile: contrast, targets, keyboard, phone width). `scripts\check\new_site_check.py` (W7's route checks against :3101). Don't use Alex's Chrome window while the rig records.

## Still open from before the verdict

- **The six review artifacts (18:58) are superseded.** Alex now approves each page on the preview (A5, A6), with K2's words in `landing`. If he saved edits on any old artifact (`apply_review_edits.py` reads them back), they're raw material for K2: tell orchestration, don't republish them. The stray `page-1.md` artifact (AW6Ld5n5CKuBHBX7JR3tj2) is still there, for Alex to delete.
- **/about:** `AI_PORTFOLIO_SLUG` in `app\about\profile.ts` (morning, M7), and `ARTICLE-2-LINK` in `local\about\about-me.md` (W8). W12 adds `m-s12-o` and `m-s02-e`.
- **The wall's alt text:** 76 of the 92 images have generic alt text. Writing real descriptions means looking at each image; it's flagged to orchestration as words.
- **Webcam uploads:** S13 to S16 aren't uploaded yet (`CLAUDE.md`, "Video"). Run one at a time, only when nothing is recording.
- **Two `h1`s on the home page** (live too): the S02 summary block renders its headline as an `h1` (`app\feed.tsx`, line 158). Minor; fix it in W11's restack.
- **D12 agent view:** `/llms.txt` is the morning's optional W16 step (generator: `..\scraping\agent-view\`).
- **Clock:** loop pid 28388 (since 20:02). The last line from rig was "S16 stopped" (21:13), leaving 3.06 h. Check `.clock\sync.pid` and the log tail at the start of every session.

## Working notes

- Long Python through Bash heredocs mangles `\a`, `\t` and `\r` in strings. Write the script to `$CLAUDE_JOB_DIR\tmp` and run it, or use `chr(92)`.
- `git archive` writes CRLF (`core.autocrlf=true`), so compare exports with `diff --strip-trailing-cr`.
- `vercel deploy` prints a "Promote to production" hint even for a preview; a preview without `--prod` never touches the alias.
