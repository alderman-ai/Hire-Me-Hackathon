# website: status
As of 20:01, 2 Nov (Prague), written from the folder's own records after the 19:4x crash.

## Where it fits in the plan

**Deliverables.** D8 Website (spec S-D8, row "S-D8 — Website"). It also serves D12 Agent view: `s-d1-scraping` builds the generator, and this folder adds the person/agent toggle and serves the pages.

**DoD items S-D8 claims** (charter "Definition of done"):

| Id | What it asks | State | Evidence |
| --- | --- | --- | --- |
| DoD-18 | Six stakeholder sections on the live site, in Addvery's brand, matching Alex's six | Partly | All six `/for/<slug>` pages return 200, in the Addvery look, `noindex`. They carry the 17:50 text from the Claude Doc. The new personal landings (greeting, concerns, timed reading list) are built but gated: `landing.approved` is `false` on all six in `content\stakeholders.json`. Alex hasn't signed any of them off. |
| DoD-19 | A deliverables view, kept getting clearer without Alex asking | Met | The feed's `status` post lists the tooling and D1 to D12. `builds.md` logs 53 rows, most from other specs' BUILD requests. The board was last refreshed at 18:45. |
| DoD-22 | Nothing published shows secrets, the Apify proposal or Alex's own GetSales outbound | Partly | The last logged publish check was clean at 16:30 (`checks.md`). None has run since, and `/for`, `/about`, `/demos` and the new `/d1` all shipped after it. |

**Other DoD items that trace to D8.** This folder hosts them when their owners send content.

| Id | What it asks | State | Evidence |
| --- | --- | --- | --- |
| DoD-8 | The scraping demo on the site | Met | `/d1` returns 200. S-D1-B1 was built at 18:02. |
| DoD-15 | Two blog posts on the site | Not met | `/d5` is a placeholder. Both articles are with Alex for his last 10%. |
| DoD-17 | LinkedIn content demo on the site, with Alex's brand sign-off | Partly | The `/demos/linkedin-posts-in-addverys-voice-graded-blind` entry is live (S-D7-B1, 18:12). His sign-off is still open. |
| DoD-21 | The Canva design video on the site | Not met | Not recorded yet. `/d10` is a placeholder. |
| DoD-23 | The Comfy animation and brand video as a GTM demos entry | Not met | Alex hasn't picked the ideas. `/d11` is a placeholder. |
| DoD-24 | The day-one story on the site | Not met | The story is with Alex for his last 10%. Its clips are partly uploaded (see "What's been made"). |
| DoD-25 | The agent track, reachable from a toggle and `/llms.txt` | Not met | `/llms.txt` and `/agent/for/ceo.md` return 404. There's no toggle. The generator exists and has output (77 files in `..\scraping\agent-view\out\`), but nothing is served. |

DoD-13 (the two GetSales entries) traces only to D3 and D9, but its entries land here too. Not met: Alex hasn't recorded them.

**What it depends on.**
- Done: S0, and S-D2 (Alex's six and his brand capture).
- Content still to come, as BUILD requests or copy:
  - S-D3: the GetSales entries;
  - S-D5: the articles and the taste-capture entry;
  - S-D6: the templates;
  - S-D7: Alex's LinkedIn edits, and the copy;
  - S-D9: the day-one story;
  - S-D10/S-D11: the Canva video and the brand motion;
  - S-D12: the agent track.
- Layout calls came from `orch-site-map`, and the clock lines from `rig`.

**What depends on it.**
- The six links Alex sends by hand in the morning.
- His meeting with Ivana Karhanová, Addvery's Chief Growth Officer, on 3 Nov.
- S-D12's generator reads `website\content\`.

## What it was trying to do

The site is the project's one outcome: Alex's job application to Addvery, in Addvery's look, with a page for each of six stakeholders and the day's GTM demos. The home page became a live feed on Alex's ask, "like a live feed where new posts go on top", and the design copied Addvery's own site "as cloned as possible", with one red disclaimer above the menu. It took build requests from every spec and kept the site current "without me explicitly saying so", and it ran the recording countdown and the webcam uploads. At 18:30 Alex said "The website thing is starting to become very important to me". From then on the live site was the one source of truth, and review copies were exported from the real pages. The last push was the welcome with a time picker (5, 10, 20 or 60+ minutes), personal landings for the six, About Alex, and the D12 agent view.

## What's been made

**Pages** (live means it returns 200 on https://hire-me-hackathon.vercel.app; the last production deploy was at 18:57)

| Item | Where | State |
| --- | --- | --- |
| Home: "The Hire Me Hackathon Begins", countdown, start-here box, live feed, status board | `/`, `app\page.tsx` (deployed version), `app\feed.tsx`, `app\live.tsx`, `app\build-status.tsx` | live (old layout) |
| Welcome, time picker and summary carousel at the top of `/` | `app\welcome.tsx`, `welcome.css`, `time-picker.tsx`, `summary-carousel.tsx` and `.css`, `welcome-data.ts`, new `app\page.tsx` (commit e3e8b9f, 19:50) | half-done: built and committed, not deployed. Its local production build passed at about 19:09. |
| The six's section: 2×3 portrait grid, intro "A page for each of you" | `/for`, `app\for\page.tsx` | live |
| Six stakeholder pages (growth, ceo, cofounder-1, cofounder-2, delivery, bi) | `/for/<slug>`, `app\for\[slug]\page.tsx` | live with the 17:50 Doc text, `noindex` |
| Personal landings on those six pages (greeting, concerns, reading list with minutes, stop lines) | `content\stakeholders.json` → `pages[].landing` | done, gated (`approved: false` on all six) |
| Per-person preview cards | `app\for\[slug]\opengraph-image.tsx` | done, generic until each page is approved |
| About Alex: headshot, story, 34-post LinkedIn wall | `/about`, `app\about\` | live. The AI-portfolio slot is empty (`AI_PORTFOLIO_SLUG = ""`), and the article-2 link is still `ARTICLE-2-LINK` in `local\about\about-me.md`. |
| GTM demos index | `/demos`, `app\demos\` | live, 1 entry |
| LinkedIn posts in Addvery's voice, graded blind | `/demos/linkedin-posts-in-addverys-voice-graded-blind`, `content\demos\linkedin-voice.md` | live |
| Three sample entries (template tests) | `content\demos\sample-*.md` | done, never built on production |
| Scraping briefing with the research-board carousel | `/d1`, `app\d1.tsx`, `content\d1.json`, `public\d1\` (13 images) | live |
| Company research: org charts and the seven research documents | `/d2`, `app\org-charts.tsx`, `app\research-docs.tsx`, `local\org-diagrams.json`, `local\research\` | live |
| Demo pages D3 to D11 | `/d3` to `/d11`, `app\[demo]\page.tsx`, `content\deliverables.json` | live placeholders ("lands here when it's ready"). `/d4` is marked retired. `/d7` and `/d8` still say "being built" or "land here", though the D7 entry and `/for` are live. |
| Agent view page | `/d12` | live placeholder |
| Agent track: `/llms.txt` and `/agent/**.md` | the generator at `..\scraping\agent-view\generate.py`, served from `public\` | planned only (404) |
| Person/agent toggle | not built | planned only |
| Charter and S0 to S2 specs | `/docs/charter`, `/docs/s0-bootstrap`, `/docs/s1-research`, `/docs/s2-orchestrator`, `content\docs\` | live (last re-synced at C18) |
| Privacy notice | `/privacy`, `content\privacy.md` | live, unlinked, `noindex` |
| Site preview card | `app\opengraph-image.png` | live |
| Per-page preview tags for `/d2` to `/d11` | not built | planned only |
| "How this site was built" entry | the source is `..\linkedin-content\local\site-copy\how-this-site-was-built.md` | planned only (copy arrived at about 18:55, not started) |

**Content files** (`content\`)

| Item | Where | State |
| --- | --- | --- |
| Feed, 38 posts (newest: status 18:45, "The day so far" 18:26) | `content\feed.json` | live |
| Status board, as of 18:45 | `content\build.json` | live, stale |
| Demo page data | `content\deliverables.json` | live |
| Six pages' text and gated landings | `content\stakeholders.json` (tracked, so the gated text is already in the public repo) | live / gated |
| Welcome copy and the four reading paths (s-d7's 18:50 copy, not reviewed by Alex) | `content\time-paths.json` | half-done, not deployed |
| Read and watch times, 76 items | `content\inventory.json` | done |
| Webcam YouTube ids, S01 to S12 | `content\videos.json` | done |
| Clip YouTube ids (15) | `content\clips.json` | half-done (see Videos) |
| LinkedIn wall, 34 posts | `content\linkedin-wall.json` | live |
| S02 summary | `content\summary.json` | live |
| Scraping page data | `content\d1.json` | live |
| Privacy text | `content\privacy.md` | live |
| Docs index | `content\docs\index.json` | live |

**Scripts** (`scripts\`, never uploaded to Vercel)

| Item | Where | State |
| --- | --- | --- |
| Countdown sync to Blob | `scripts\clock_sync.py` | done. The loop died in the crash (pid 39924 isn't running). Last publish was 19:12: idle, 4.00 h left. |
| Webcam uploader | `scripts\upload_webcam.py` | done |
| Named-clip uploader | `scripts\upload_clip.py` | done |
| Docs copier (refuses secret-shaped strings only) | `scripts\sync_docs.py` | done |
| About assets builder | `scripts\about_assets.py` | done |
| D1 images | `scripts\d1_images.py` | done |
| Portrait preview cards | `scripts\people_og.py` | done |
| Review export and read-back | `scripts\review\build_review.py`, `scripts\review\apply_review_edits.py` | done, read-back not yet used |

**Git-ignored material that deploys** (it isn't in the public repo)

| Item | Where | State |
| --- | --- | --- |
| Addvery logos, icons and images | `public\addvery\` (24 files) | live |
| The six portraits and their cards | `public\people\` (18 files) | live |
| About images and wall images | `public\about\` (20 files) | live |
| LinkedIn entry slides | `public\demos\linkedin-voice\` (18 files) | live |
| Link-card glow | `app\demos\_og\glow.jpg` | live |
| About copy | `local\about\about-me.md` | live |
| Org charts and research documents | `local\org-diagrams.json`, `local\research\` (7 files) | live |
| Alex's picked assets | `local\alex\` | done |
| Addvery brand and frontend study | `local\addvery\` (kept out of deploys) | done |
| Old local copy of the six pages' text | `local\stakeholders.json`, `local\stakeholders-draft.md` | retired at 17:28, still on disk |
| Raw Addvery scrape | `.addvery-scrape\` (never deployed) | done |

**Review exports and Docs**

| Item | Where | State |
| --- | --- | --- |
| Review: growth (Ivana) | https://claude.ai/artifact/TCk45ox4gttBgNiyYVRA7r | with Alex. It's the most recently opened or updated item in his gallery, so unclear whether he has started. |
| Review: ceo (Štěpán) | https://claude.ai/artifact/EWewUdWbqYurU99uH3zM77 | with Alex |
| Review: cofounder-1 (Pavel) | https://claude.ai/artifact/Y542BkTDNhC4fYNVxeMnwn | with Alex |
| Review: cofounder-2 (Lukáš) | https://claude.ai/artifact/Uey12LMZ8mTNW2QNHiShx6 | with Alex |
| Review: delivery (Miloš) | https://claude.ai/artifact/2zQSocRf8xTBxx291oQd3h | with Alex |
| Review: bi (David) | https://claude.ai/artifact/PX2aWLB8ws6QfAGDf3GGmi | with Alex |
| Earlier edit surface: "Six stakeholder pages: text for your edit" | https://claude.ai/artifact/Abm1SeTTDwAEV4qBb55YtY | superseded by the six reviews (see risks) |
| Stray half-edited copy of page 1 ("page-1.md") | https://claude.ai/artifact/AW6Ld5n5CKuBHBX7JR3tj2 | to delete |

**External objects**

| Item | Where | State |
| --- | --- | --- |
| Vercel project | `hire-me-hackathon`, team `alex-alderman-s-projects` (Hobby) | live. The last production deploy was 18:57. |
| Clock status file | Blob store `hire-me-hackathon-clock`, `status.json` | live, frozen at 19:12 (idle, 4.00 h left) |
| Web Analytics | Vercel, aggregate and cookieless | live |
| Webcam videos, unlisted (all 12 resolve on YouTube as of 20:00) | S01 mbF291oW_yQ, S02 qrBNOsSYGrQ, S03 M38hI3M3Heo, S04 VaFD-Hm_Phs, S05 EoLyMiV77R0, S06 mxorwucznvE, S07 NULD_WteCRM, S08 MyYnFOQCagc, S09 cNI9EgxHUbk, S10 NyD-epukcWs, S11 iXr-pKhseB8, S12 lo486cSVBcM | done. S01, S02, S06, S08 and S11 are embedded in the feed. |
| Webcam videos S13, S14 (filed by the rig), S15 (recording since 19:56) | `..\OBS\Processed\S13_*`, `S14_*` | not uploaded |
| Day-one clips, first four (18:15) | 6Ynpp621fmY, pyFHE1JHMV8, S2NTaJHUmTM, FMYWlkGWdeY | done. pyFHE1JHMV8 and FMYWlkGWdeY are due to be replaced by the v2 cuts. |
| The 13-clip batch | 11 uploaded: rnFQPYyUmew, d4vSBeoVRg4, U7j50NbM29U, idojGfe0sJQ, _1C1X5--Pfc, zYbH8HfYqAU, PQIZoQ-Ic2w, XVqOE_-COOQ, 9vLcPuSVmLo, enaeHqxjeCc, 0_OKP-0C6Xk (bottleneck v2) | half-done. Clip 12 (`day1-2-too-much-at-once-v2`) and clip 13 (`c-s08-same-thing-tomorrow`) are missing. The ids were never sent to `s-d9-legibility`. |

**Records**

| Item | Where | State |
| --- | --- | --- |
| Session instructions | `CLAUDE.md`, `AGENTS.md` | done |
| Spec with its decision log | `SPEC.md` (§9 ends at 17:28) | done |
| Handoff | `HANDOFF.md` (written at about 18:35, last committed 19:09) | done, no successor took it |
| Pre-spec decisions | `DECISIONS.md` | done |
| Build log, 53 rows to 19:02 | `builds.md` | done |
| Publish checks, two runs (14:55, 16:30) | `checks.md` | stale |

## How far along

About 65%. The structure, brand, feed, status board, `/for`, `/about`, `/d1`, `/d2` and `/demos` are live. Three things are built but not live: the personal landings, the welcome and its time picker, and the agent track. The publish check, the hand-over and most hosted entries (GetSales, articles, Canva, Comfy, day one) are still to do.

"Done" here means:
- the six personal pages are approved by Alex and live;
- the welcome is live;
- the agent track and its toggle are live;
- every other spec's entry has been built or refused;
- the publish check is clean;
- SPEC §7's hand-over checklist is logged.

## What's left for Alex

The six pages must be approved and live before he sends the links in the morning. He meets Ivana on 3 Nov.

1. **Review the six stakeholder pages, Ivana's first.** Kind: attended copy. About 3 to 5 minutes each, about 25 minutes in all. For each page, either say "approved", or edit the outlined text, press "Save edits" and say "edited". Links: Ivana https://claude.ai/artifact/TCk45ox4gttBgNiyYVRA7r · Štěpán https://claude.ai/artifact/EWewUdWbqYurU99uH3zM77 · Pavel https://claude.ai/artifact/Y542BkTDNhC4fYNVxeMnwn · Lukáš https://claude.ai/artifact/Uey12LMZ8mTNW2QNHiShx6 · Miloš https://claude.ai/artifact/2zQSocRf8xTBxx291oQd3h · David https://claude.ai/artifact/PX2aWLB8ws6QfAGDf3GGmi.
2. **Confirm or fix three facts on those pages.** Kind: quick, about 1 minute. "nine months doing nothing but building with Claude Code" (Štěpán's page), "freelanced for ten years" (Lukáš), "came up through B2B marketing" (David). Edit the line on the page, or say yes or no.
3. **Give the line above the concerns on all six pages.** Kind: attended copy, about 2 minutes. Today it's hard-coded as "Your likely questions, as I imagine you'd put them, and my answers." in `app\for\[slug]\page.tsx`. It no longer fits the first-person guesses.
4. **Record the two GetSales demos.** Kind: recording, about 3 minutes plus 1 minute on camera. Their two entries must be live before the Ivana meeting. Owned by `getsales\`: https://claude.ai/artifact/83CBecbQdNyH3NZi2MLYDq and https://claude.ai/artifact/XipRZaxFuESjKrTW3qoKmB.
5. **Work through the welcome copy.** Kind: attended copy, about 10 minutes. This is the headline, subline, the four time choices and their promises, and the four reading paths in `content\time-paths.json`. It's s-d7's 18:50 draft, and Alex hasn't seen it. It includes "$1.24 of scraping", which needs a source.
6. **Look over the welcome, time picker and summary carousel as designed.** Kind: attended design, about 10 minutes, on a preview deploy (not on the live site).
7. **Decide what the top of `/` says once the 12 hours are done.** Kind: attended copy, about 5 minutes. SPEC §7's hand-over wants no live countdown and no "Begins", and a pointer to the six pages. Do it before the morning links.
8. **Say where the person/agent toggle sits.** Kind: quick, about 1 minute. The charter gives its two labels.
9. **Edit the "How this site was built" entry.** Kind: attended copy, about 10 minutes. The draft is `..\linkedin-content\local\site-copy\how-this-site-was-built.md`. Its status list is stamped 18:50 and is out of date.
10. **OK the refreshed status lines.** Kind: quick, about 2 minutes. They cover the board's D8 and D12 rows and the `/d7` and `/d8` placeholder lines, which contradict live pages. An assistant drafts them.
11. **Clear the other folders' items that put entries on this site.** Kinds: attended copy and recording. The two articles, the LinkedIn sign-off, the Canva video, the Comfy pick, the day-one story and the AI portfolio review are all rows 6 to 15 of `Open tasks.md`. Times are listed there, and each folder's STATUS.md has the detail.
12. **In the morning, before sending the links, check one `/for` link in LinkedIn's Post Inspector.** Kind: quick, about 2 minutes. It needs his own LinkedIn session.
13. **Optional: delete the stray artifact** https://claude.ai/artifact/AW6Ld5n5CKuBHBX7JR3tj2. Kind: quick, a yes.

## What's left for an assistant

1. **Restart the clock loop now, hidden.** The rig is recording S15 (since 19:56), but the loop is dead, so the site's countdown is frozen at 4.00 h. The command is in `CLAUDE.md` under "The countdown".
2. **Bring in each of the six pages as Alex signs it off.** Read his saved artifact back first, and never republish an artifact before that. Then run `python scripts\review\apply_review_edits.py <saved.html>` as a dry run, then with `--write`. Set that page's `landing.approved: true`, commit, deploy and check with curl. See `HANDOFF.md`, "In flight" and "Review sign-off protocol".
3. **Ship the welcome (e3e8b9f) once Alex has done his copy and design pass.** Use a preview deploy (`vercel deploy`) first, then production. Vercel builds it on its side, so skip local `next dev` and `next build` while the PC is fragile. See `HANDOFF.md`, "Deploying". The tree is clean now, so a plain deploy from `website\` works. The clean-export recipe in `HANDOFF.md` misses `public\about\` and `local\about\` and would drop `/about`'s images and copy.
4. **Upload the webcam for S13 and S14, and for S15 once it's filed.** Use `..\OBS\rig\.venv\Scripts\python.exe scripts\upload_webcam.py Sxx <scratch dir>`, one upload at a time. See `CLAUDE.md`, "Video".
5. **Finish the clip batch.** Rerun `C:\Users\alder\.claude\jobs\54c2d301\tmp\clips13.sh`; it skips done clips, so only clips 12 and 13 upload. Commit `content\clips.json` and pass the 13 ids, in order, to whoever builds the day-one story. See `HANDOFF.md`, "S-D9 clip batch".
6. **Serve the D12 agent track.**
   - Generate it into a clean folder and copy `llms.txt` and `agent\` into `public\`.
   - Serve `/agent/*.md` as `text/markdown` and `noindex`.
   - Git-ignore both, add the toggle where Alex says, and deploy.
   - See `HANDOFF.md`, "D12 agent view", `SPEC.md` §3, and `..\scraping\agent-view\README.md`.
7. **Run the DoD-22 publish check** over every live page and embedded video, and the tracked tree (file names only). Log it in `checks.md`. See `SPEC.md` §7, "Publish check".
8. **Refresh the status board** once Alex OKs the lines: change `build.json`'s `as_of` and move the `status` post's `at` to the same time. See `CLAUDE.md`, "Status board".
9. **Housekeeping.** Change "Prague" to "(Prague)" at `app\for\[slug]\page.tsx` line 606, and add per-page preview tags for `/d2` to `/d11`. See `HANDOFF.md`, "Next, in order", item 7.
10. **Build each incoming entry once its content is approved, and log it in `builds.md`.**
    - S-D3-B1 and B2 (the GetSales entries).
    - The two articles, then the article-2 link in `local\about\about-me.md`.
    - The taste-capture entry and the day-one story.
    - S-D6-B1, S-D11 and S-D7-B2.
    - "How this site was built".
    - `AI_PORTFOLIO_SLUG` in `app\about\profile.ts`.
    - See `HANDOFF.md`, "Next, in order", item 6.
11. **Before the morning,** run SPEC §7's hand-over checklist, and update `website`'s row in `..\SESSIONS.md`. It still names 54c2d301.

## Open questions and risks

- **The countdown is wrong right now.** S15 has been recording since 19:56. The sync loop died in the crash, so the site shows idle at 4.00 h until the loop restarts.
- **The handoff never happened.** Session 54c2d301 wrote `HANDOFF.md` at about 18:35 and updated it to 19:09, but no successor was launched. `SESSIONS.md` still lists 54c2d301 as the active session.
- **The welcome was in progress at the crash.** Its local build passed at about 19:09. Accessibility checks were running at 19:11, and their result isn't recorded. The commit calls it "work in progress".
- **The six reviews: unclear whether Alex has saved edits on any of them.** Ivana's artifact is the most recently opened or updated item in his gallery. A stray half-edited copy of page 1 exists, and reading that one back by mistake would be wrong.
- **Two edit surfaces.** `content\stakeholders.json` still names the Claude Doc (Abm1SeTTDwAEV4qBb55YtY) as Alex's edit surface. `HANDOFF.md` and `Open tasks.md` use the six review artifacts, which are newer (18:58). Unclear which wins if both carry edits.
- **The gated landing text is already public.** `content\stakeholders.json` is tracked, so it's in the public repo, three unconfirmed facts included. That was a choice made at 17:23 (Q9.3, the simpler option).
- **Role wording differs inside `stakeholders.json`.** The `role` fields say "Director of Growth", "Director of Delivery" and "Director of BI". The labels and titles say Chief Growth Officer, Chief Delivery Officer and Head of BI. Unclear where `role` shows on the page.
- **Records contradict each other on the webcam backlog.**
  - `Open tasks.md` (19:01) still says S03 to S12 are uploading.
  - `builds.md` and commit 27716be (18:57) say all 12 are online, and all 12 ids resolve on YouTube as of 20:00.
  - The brief's "S10 and S12 uploading" matches the older tracker, not the folder's records.
- **The 13-clip batch stopped at 11.**
  - Clips 12 and 13 are missing.
  - The 11 ids reached git only in the crash commit (e3e8b9f).
  - `s-d9-legibility` never got them.
  - The old day-one clips pyFHE1JHMV8 and FMYWlkGWdeY are meant to be replaced by the v2 cuts.
- **Stale or contradictory public text.**
  - The status board is from 18:45. Its D8 row still says "Live in the company's look since 16:29, with a page per demo".
  - `/d7` says the demo is being built, though its entry is live.
  - `/d8` says the stakeholder pages "land here when they're ready", though `/for` is live.
  - SPEC §7 says nothing public should read as unfinished.
- **No publish check since 16:30.** `checks.md` also accepted a desk photo whose monitors show a terminal line mentioning the proposal (Alex: "It's on purpose").
- **Decisions after 17:28 are only in `HANDOFF.md`.** That covers the anti-drift rules, the welcome placement, the fan-out rule and the sign-off protocol. SPEC §9 stops at 17:28.
- **The LinkedIn entry's description is 187 characters.** POST-FORMAT asks for 140 to 160, and the welcome build printed a warning. It's s-d7's copy.

## Sources

- `website\CLAUDE.md`, `website\SPEC.md` (§1 to §9 and Appendix A's header), `website\HANDOFF.md`, `website\DECISIONS.md`, `website\builds.md`, `website\checks.md`.
- `website\content\`: `feed.json`, `build.json`, `stakeholders.json`, `videos.json`, `clips.json`, `time-paths.json`, `inventory.json`, `linkedin-wall.json`, `deliverables.json`, `docs\index.json`, `demos\*.md` front matter.
- `website\.gitignore`, `website\.vercelignore`, `website\.clock\sync.pid` and the tail of `sync.log`, `app\page.tsx`, `app\welcome.tsx`, `app\about\profile.ts`, `app\for\[slug]\page.tsx` (grep only).
- Folder listings of `website\app\`, `content\`, `scripts\`, `public\` and `local\`. Media were counted, not opened.
- The job folder `C:\Users\alder\.claude\jobs\54c2d301\tmp\`: `clips13.sh`, `welcomebuild.log`, and the Aliased line of `deploy16.log`.
- `..\CHARTER.md` (Deliverables, Definition of done, Spec outline, Run order; its one uncommitted change is the spelling question ticked), `..\SESSIONS.md` (website row), `..\Open tasks.md` (status rows only), `..\answer-desk\qa\website.md` (headings), `..\scraping\agent-view\` (listing), `..\OBS\Processed\` and `..\OBS\Live\` (listings).
- Commits: `git log --oneline -60 -- website`, plus e3e8b9f, 27716be, 9906723, 994adcb and 86741e7.
- Live checks at 19:57 to 20:00. These pages return 200: `/`, `/for`, the six `/for/<slug>` pages, `/about`, `/demos`, the LinkedIn entry, `/d1`, `/d2`, `/d3` to `/d12`, `/docs/charter` and `/privacy`. `/llms.txt` and `/agent/for/ceo.md` return 404. All 27 YouTube ids resolve through oEmbed.
- The Artifact gallery listing (titles and order only).
