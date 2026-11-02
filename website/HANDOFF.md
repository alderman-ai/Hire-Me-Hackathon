# Handoff: website (S-D8)

Written 2 Nov at about 18:35 Prague by session 54c2d301 (took over at 17:15 from b25f14b0), at forking gate F3. Read CLAUDE.md first, then this file, then **the reset rules at the top of `..\answer-desk\ASKING.md`** (they override older rules; rule 4 now says page copy is reviewed as a rendered page artifact). SPEC.md §9 rows from 17:19 on are this session's.

**Run `date` before writing any time.** This session stamped some times by estimate, up to 1 h 40 min ahead, and had to correct the site and the logs (18:25).

## The rules in one screen

- Easy calls are yours: decide, log in SPEC §9 (decision, why, blast radius), carry on. No plan approvals to Alex. Pokes only when truly blocked. No 18:00 cut-off.
- Hard exclusions are only DoD-22's three: secrets, the Apify proposal, Alex's own outbound outside the GetSales demo folder. Public sources, photos included, may be published.
- **Copy:** copy skill first (`design:ux-copy`, `marketing:draft-content`; `marketing:brand-review` checks). **Design:** `frontend-design:frontend-design` first; if it doesn't resolve, Read `~\.claude\plugins\cache\claude-plugins-official\frontend-design\ea10b213686c\skills\frontend-design\SKILL.md`, follow it and log that. Then `design:design-critique` and `design:accessibility-review` before shipping. Name the skill in every subagent's prompt.
- Alex reviews words as rendered page artifacts (or the Claude Doc), never in chat. Questions to him go only through `answer-desk`.
- **Times on the site:** Prague time of day only, "12:24" or "12:24 (Prague)". Quote sources read "Alex, S04, 12:24". Never "Prague time", never a session offset next to a clock.

## In flight

- **Full LinkedIn wall: on a PREVIEW, waiting for Alex's yes** (orchestration's BUILD, 20:55; built 21:03, 5a77321). All 94 posts, image-led masonry, `app\about\wall-full.tsx`, `wall-full-data.ts`, `wall-full.css`, `content\linkedin-wall-full.json`. Images: git-ignored `public\about\wall-full\` (178 WebP files, made by `python scripts\about_assets.py --wall-full`; the HANDOFF recipe's `cp -r website/public/about` already carries them). It's behind `WALL_FULL=1` in `app\about\page.tsx`, so production keeps the 34-post wall. Preview: https://hire-me-hackathon-gnx9x4xvo-alex-alderman-s-projects.vercel.app/about#linkedin, deployed with `$CLAUDE_JOB_DIR\tmp\preview_wall.sh` (the clean export plus `vercel deploy --yes --build-env WALL_FULL=1`, no `--prod`). **When Alex says yes:** make the full wall the default (drop the flag, delete `wall.tsx` and `content\linkedin-wall.json` if nothing else reads them), then deploy production with the recipe under "Deploying". RULES.md at the repo root (draft, 20:45) now governs site work: previews before live, `alex-voice` for every word.

- **`/about` is DONE and live** (9906723, menu "About Alex"). Its copy is in git-ignored `local\about\about-me.md` and its images in git-ignored `public\about\`; copy both into any clean export. Rerun `python scripts\about_assets.py` if the copy, the wall or the images change. AI-portfolio slot: set `AI_PORTFOLIO_SLUG` in `app\about\profile.ts` once `s1-research`'s entry is published. Article 2: replace `ARTICLE-2-LINK` in `local\about\about-me.md` (and in linkedin-content's source). `alex-alderman-final.png` is the Apify teaser: never use it.
- **The six review artifacts are DONE**, sent to answer-desk at ~19:05 as one TASK: growth https://claude.ai/artifact/TCk45ox4gttBgNiyYVRA7r, ceo https://claude.ai/artifact/EWewUdWbqYurU99uH3zM77, cofounder-1 https://claude.ai/artifact/Y542BkTDNhC4fYNVxeMnwn, cofounder-2 https://claude.ai/artifact/Uey12LMZ8mTNW2QNHiShx6, delivery https://claude.ai/artifact/2zQSocRf8xTBxx291oQd3h, bi https://claude.ai/artifact/PX2aWLB8ws6QfAGDf3GGmi. **When Alex saves edits** (watch them with `ArtifactComments`, or read each with the Artifact tool's `read` action): run `python scripts\review\apply_review_edits.py <saved.html>` for a dry run, then add `--write`. Keys are paths inside that slug's `pages[]` object. Then set that page's `landing.approved: true`, commit, deploy and tell orchestration. **Never republish those artifacts before reading his saved versions back.** Open items from s-d7's `_notes.md`, which Alex should confirm: "nine months doing nothing but building with Claude Code" (Stepan), "freelanced for ten years" (Lukáš), "came up through B2B marketing" (David), and residency "over a decade" (Stepan and Milos pages) versus "ten years" in About me. The concerns subheading is hard-coded in `app\for\[slug]\page.tsx` ("Your likely questions, as I imagine you'd put them"); it no longer fits the first-person guesses, so ask s-d7 for a line and change it after his review.

- **Webcam backlog: DONE** (19:00, 27716be). All 12 filed sessions are on YouTube, unlisted (`content\videos.json`); s-d9 has the ids, and where they show is its call. For S13 onwards, upload each filed session with `..\OBS\rig\.venv\Scripts\python.exe scripts\upload_webcam.py Sxx <scratch dir>` (create the dir first).
- **D12 agent view, OUTPUT S-D1 arrived ~19:07 (not started):**
  - **Generate:** from the repo root, before every deploy, run `python -I scraping\agent-view\generate.py --out <dedicated dir>`. The generator is in 994adcb and its output is git-ignored. It refuses to wipe a folder holding files it didn't write, so generate into a clean dir (e.g. `$CLAUDE_JOB_DIR\tmp\agent-out`), then copy into `public\`: `llms.txt` at the root (`/llms.txt`), and `agent\**` to `public\agent\` (`/agent/d3.md`, `/agent/for/ceo.md`, `/agent/feed/s02.md`). It exits non-zero on a broken link, any HTML, or a DoD-22 hit.
  - **Serve:** `/agent/*.md` as `text/markdown; charset=utf-8` and noindex (headers in `next.config` or `vercel.json`), linked only from the person/agent toggle and `/llms.txt`.
  - **Toggle:** where it sits is `orch-site-map`'s call, so ask it. README: `..\scraping\agent-view\README.md`.
  - **Depends on `content\time-paths.json`** (the welcome builder's file), so generate after that's committed.
  - Git-ignore `public/agent/` and `public/llms.txt`, and add them to the clean-export copy list.
- **Review sign-off protocol (agreed with orch-alex-prep, ~19:05):** `orch-alex-prep` relays "APPROVED <slug>" for an unchanged page, and "EDITED <slug>" after Alex saves edits on its artifact (read them back with `scripts\review\apply_review_edits.py`, then approve). Fact confirmations or corrections come relayed word for word, or as edits on the page. On each APPROVED or EDITED, set that page's `landing.approved: true`, deploy, and tell `orch-alex-prep` it's live.
- **Routing since 18:56:** `orchestration` is the master (handoffs, roster, charter). Layout and placement requests now come from `orch-site-map` (site-map\). Anything that needs Alex goes to `orch-alex-prep` (alex-prep\), which keeps his "Open tasks.md". Questions still go to `answer-desk`. Residency is "over a decade" everywhere (fixed, 5ff7f17).

- **Welcome, time picker and summary carousel** at the top of `/`: a subagent of 54c2d301 (since ~18:50). Files: `app\welcome.tsx` and its CSS, a carousel component, `app\page.tsx`, `content\time-paths.json` (path picks plus placeholder intro copy). Paste s-d7's welcome copy into `content\time-paths.json` when `COPY s-d7` sends it.
- **Fan-out rule: SUPERSEDED at 19:58.** After the crash, Alex's course change (top of `CLAUDE.md`) says one item at a time, attended design and copy only, one build at a time. Build requests now come from `orchestration`, `orch-alex-prep` and `orch-site-map`, and `s-d7` and the other spec sessions are paused. Old text, for history: (Alex ~18:4x: "We should be really fanning out now") run every queued item as a parallel builder subagent on its own files. Copy now comes from `s-d7-linkedin-content` as `COPY s-d7` (the "how this site was built" entry, the welcome and time-path copy, the stakeholder section intro); you only build it. When something ships, tell `orchestration` in one line (it keeps Alex's root tracker, "Open tasks.md").

- **"How this site was built" entry (COPY s-d7, ~18:55, not started):** `..\linkedin-content\local\site-copy\how-this-site-was-built.md` (POST-FORMAT v1.5, showcase, d8, status near-final; sources in `how-this-site-was-built.sources.md` beside it). Copy it to `content\demos\how-this-site-was-built.md`. Its status list is stamped "As of 18:50" and counts the six stakeholder pages as live: say instead that the six pages are live and their new personal versions are with Alex for review (or whatever is true when you ship). Set status `published` (it isn't in the DoD's sign-off list), check `/demos/<slug>` in dev, then commit, deploy and tell s-d7 and orchestration. Keep his " -- ".
- **S-D9 clip batch: DONE, 13 of 13** (20:12, 00e21ae). Clips 12 and 13 reached `content\clips.json` at 20:10, from a run after the crash. Both ids resolve with s-d9's exact titles, and their lengths match the files. `54c2d301`'s job folder, `clips13.sh` included, no longer exists. `s-d9-legibility` is paused, so the ids were not sent. Whoever builds the day-one story reads them from `content\clips.json` by file stem, in the order below. History: the batch started uploading at ~19:03 from 54c2d301. Ids land in `content\clips.json` under each file's stem. The order and titles: upload each one unlisted with `..\OBS\rig\.venv\Scripts\python.exe scripts\upload_clip.py <file> "<title>"`, in this order, after the webcam backlog finishes (one upload at a time; the rig throttles to 10 MB/s while recording). Then reply to `s-d9-legibility` with the 13 ids in order. Files are in `..\legibility\clips\`; the titles are exactly as s-d9 sent them:
  1. c-s03-noon-low-leverage.mp4: "Hire Me Hackathon, day one: noon, and nothing running yet (S03, 11:58)"
  2. c-s04-legibility-born.mp4: "Hire Me Hackathon, day one: this feed is born (S04, 12:22)"
  3. c-s04-worth-starting-over.mp4: "Hire Me Hackathon, day one: a bad feeling, and why he didn't start over (S04, 12:35)"
  4. c-s07-done-means-additions.mp4: "Hire Me Hackathon, day one: done means the website gets additions (S07, 13:41)"
  5. c-s07-making-decisions.mp4: "Hire Me Hackathon, day one: I told you to make decisions (S07, 14:06)"
  6. c-s09-assistant-can-do.mp4: "Hire Me Hackathon, day one: an assistant can do this (S09, 15:38)"
  7. c-s10-managed-service.mp4: "Hire Me Hackathon, day one: no AI workflow is a product (S10, 16:31)"
  8. c-s10-gtm-engineers.mp4: "Hire Me Hackathon, day one: GTM engineers and AI's biggest social question (S10, 16:33)"
  9. c-s10-36-workflows.mp4: "Hire Me Hackathon, day one: the outbound demo's 36 workflows (S10, 16:36)"
  10. c-s10-halt.mp4: "Hire Me Hackathon, day one: decision time, halt everything (S10, 16:43)"
  11. day1-5-bottleneck-human-v2.mp4: "Hire Me Hackathon, day one: the bottleneck is always human (S10, 16:58)" (replaces FMYWlkGWdeY)
  12. day1-2-too-much-at-once-v2.mp4: "Hire Me Hackathon, day one: too many new things at once (S05, 12:56)" (replaces pyFHE1JHMV8)
  13. c-s08-same-thing-tomorrow.mp4: "Hire Me Hackathon, day one: I could do the same thing tomorrow (S08, 15:11)" (replaces the S08 240 to 277 range)

  All 13 passed s-d9's DoD-22 frame check (webcam only). Glance at one contact sheet (`<name>_sheet.jpg`) anyway.

## Anti-drift rules (Alex ~18:30: "I'm worried about drift between what's live and what's in the mockup ... The website thing is starting to become very important to me")

1. **The live site is the one source of truth.** Orchestration's mockup is frozen, marked "superseded by the live site". No more mockups.
2. **Every review artifact is exported from the real built page** (its actual HTML and CSS, real content files, real images), never redrawn. Edits go back into the content file, and the live page re-renders from it.
3. **Ship each piece to live as it's done**, gated where needed. Never hold finished work for a batch.
4. **One set of picked images** (Alex): the six portraits in `public\people\` and his assets in `local\alex\`. Every page, artifact and mockup uses exactly those files. If you change a pick, tell orchestration.

**Decided by orchestration:** the welcome and time picker sit at the top of `/`, with the summary carousel and the feed right below. The six personal links go straight to `/for/<slug>`.

**Copy fixes on the six pages (pending Alex):** "about 2,000 LinkedIn posts" becomes "hundreds of LinkedIn posts" unless the count is verified, and the "late start" mention on Miloš's page goes. Both were passed to the review-artifact subagent.

**D12, the agent view (coming):** a toggle between "I want to view this as a person" and "I want my agentic LLM to view this". The LLM side is a machine-optimised track in pure Markdown, with no buttons, that a visitor pastes into their LLM. `s-d1-scraping` builds the Markdown generator from the site's content files (so it can't drift) and `/llms.txt`. You add the toggle and serve the output as unlisted pages. Details come from s-d1.

## Next, in order (from orchestration's mockup and Alex's 17:5x direction)

1. **Six review artifacts: DONE (see In flight above for the read-back).** History: `COPY s-d7` arrived at ~18:40 (`..\linkedin-content\local\landing\new\page-1..6.md`, with `_notes.md` holding facts Alex may confirm). A subagent of 54c2d301 is mapping the text into `content\stakeholders.json` (adding `landing.concerns[].lead`, the bold short position) and publishing six review artifacts. If its work is uncommitted when you start, check it, commit it, then send `answer-desk` one TASK line with the six links. Original plan as written: wait for `COPY s-d7: six landing pages ready at <path>` (s-d7 is rewriting the greeting, concerns and so on in Alex's voice). Then load the `artifact-capabilities` skill and publish six artifacts, one per person: a faithful render of that person's landing (portrait, Addvery styling, greeting, concerns, reading list with times), with the text editable in place if the runtime allows, otherwise commentable. Send `answer-desk` one TASK line with the six links. Read his edits back into `content\stakeholders.json` (`pages[i].landing`), then set `landing.approved: true` per page he okays and deploy. The landing layout is already built and deployed gated (b0c1374). Totals today: growth 47 min, ceo 57, cofounder-1 57, cofounder-2 4, delivery 57, bi 10.
2. **Welcome and time picker** (mockup board): a component that explains the site and asks how much time the visitor has (5, 10, 20 minutes or more), then gives a reading path. **Decided: top of `/`**, with the summary carousel and the feed below. Paths come from `content\inventory.json`. Orchestration's call: ordered lists with stop-markers first, a guided tour only if there's time.
3. **Summary carousel** at the top of the feed: posts with `"summary": true` (+ `summary_line`), newest first. s02, s06, s08 and s11 are tagged. s-d9's P10 "The day so far" is the next one (cleared to send).
4. **"How this site was built"**, a `/demos` entry you write yourself (copy skills, shared entry format, deliverable d8). s-d9 writes "how content gets picked" (d9).
5. **Menu target:** Live feed · Research (`/d1` + `/d2`) · GTM demos (`/demos`) · For Addvery (`/for`) · About Alex (`/about`). Today: Live feed · What's being built · GTM demos · For Addvery · The plan.
6. **Incoming BUILDs:**
   - S-D3-B1 and B2: two GetSales `/demos` entries (video plus transcript summary), after Alex records; both must be live before his meeting with Ivana on Tue 3 Nov.
   - s-d5's two articles (kind article, d5): copy `blog-articles\posts\<nn>-<slug>.md` to `content\demos\<slug>.md`, plus assets to `public\demos-assets\<slug>\`, then put the article-2 link into About-me.
   - s-d5's third entry (taste-capture, showcase, d7).
   - s-d9's day-one story (showcase, d9), using the four clips in `content\clips.json`.
   - S-D6-B1 (templates gallery) after Alex's sign-off.
   - S-D11 (brand motion) later.
   - S-D7-B2 (Alex's edits to the LinkedIn entry): rerun `C:\Users\alder\.claude\jobs\54c2d301\tmp\blog\assemble_linkedin.py` if it still exists, otherwise reassemble from `..\linkedin-content\demo\`.
7. **Housekeeping:**
   - per-page preview tags for `/d2` to `/d11` (sub-pages still unfurl as the homepage);
   - `app\for\[slug]\page.tsx` line ~604 renders "HH:MM Prague", which should be "(Prague)";
   - a publish check in `checks.md` (none was run at this fork);
   - the hand-over checklist (SPEC §7) before morning.

## State of the site (live: https://hire-me-hackathon.vercel.app; last deploy ~18:33, b0c1374)

- **Home `/`:** countdown, start-here, live feed (newest first), status board as of 18:03 (D1 to D11; D4 retired; D11 Brand motion with Comfy).
- **`/d1`:** the scraping briefing with a five-slide board carousel (S-D1-B1). **`/d2`:** org charts and the research documents. **`/d3` to `/d11`:** demo pages, mostly placeholders.
- **`/demos`** (GTM demos, in the menu): one shared entry template with video on top, inline `[!video]` clips, `[!quote]` feature quotes, `[!figure]`, `[!post]` and `[!carousel]`. Entries are `content\demos\*.md`; production builds only `status: published`. Live entry: "LinkedIn posts in Addvery's voice, graded blind" (S-D7-B1).
- **`/for`:** a 2×3 grid of credited public portraits (git-ignored `public\people\`), each opening `/for/<slug>`. Text in `content\stakeholders.json`. Every page is `noindex`.
- **Docs:** `scripts\sync_docs.py` only refuses secret-shaped strings; rerun it on every charter or spec change (last synced at C16, 8a4ae57).
- **`content\inventory.json`:** 75 items with honest read and watch times (rebuild scripts in the job tmp: `stage1-3.py`).
- **Clips:** `scripts\upload_clip.py <file> "<title>"` uploads any named file unlisted through the rig's sign-in; ids go in `content\clips.json`.
- **Clock:** loop pid 28388, restarted by `orchestration` at 20:02 after the crash killed 39924. It's alive at 20:13 and last published at 20:12:59: recording S15 since 19:56:38, 3.72 h left at 20:13. The log's "4.00 h left" is the banked figure at the span's start, and the page counts down from `running_since`. `.clock\adjustments.json` holds 9000 s (2.5 h) off on Alex's word (5071a93).

## Deploying

**Warning (20:10): HEAD now contains the unreviewed welcome** (e3e8b9f, `app\page.tsx` and friends, committed at Alex's request after the crash). Alex reads the welcome copy and the four paths before it ships (attended copy, STATUS.md finish list item 2). Until he has, any deploy from HEAD ships it, a plain `vercel deploy` from `website\` included. So until he OKs it, always deploy the clean export below, which swaps `app\page.tsx` back to 9906723's version (the same file as 4a8099f, live since 16:30). `page.tsx` is the only file that imports the welcome, so the other welcome files are then unused and harmless. Once he OKs it, delete that one line.

Deploy a clean export of HEAD and copy **every** git-ignored asset in (fixed 20:10: the earlier recipe missed `/about`'s images and copy). Dry-run checked by `website` at 20:12: every ignored file that deploys reaches the export with matching counts, and no `.env*`, `.clock`, `local\addvery` or `local\alex` gets in.

```bash
cd "/c/Users/alder/Desktop/Hire me hackaton"; D="$(cygpath -u "$CLAUDE_JOB_DIR")/tmp/clean-deploy"; rm -rf "$D"; mkdir -p "$D"
git archive --format=tar HEAD:website > "$D.tar" && tar -xf "$D.tar" -C "$D" && rm "$D.tar"
git show 9906723:website/app/page.tsx > "$D/app/page.tsx"   # keeps the welcome off; delete this line once Alex OKs it
mkdir -p "$D/.vercel" "$D/public/addvery" "$D/public/people" "$D/public/demos" "$D/local"; cp website/.vercel/project.json "$D/.vercel/"
cp website/public/addvery/* "$D/public/addvery/"; cp website/public/people/* "$D/public/people/"
cp -r website/public/demos/linkedin-voice "$D/public/demos/"; cp website/app/demos/_og/glow.jpg "$D/app/demos/_og/"
cp -r website/public/about "$D/public/"
cp -r website/local/org-diagrams.json website/local/research website/local/about "$D/local/"
# once D12 ships: cp -r website/public/agent website/public/llms.txt into "$D/public/"
cd "$D" && MSYS_NO_PATHCONV=1 vercel deploy --prod --yes
# then check: /about 200 with "From my LinkedIn", one /about/wall image 200, /for/growth 200, /demos 200,
# and / has no welcome markup until Alex OKs it
```

Git-ignored but deployed: `public\addvery\` (24 files), `public\people\` (18, `*-og.jpg` included), `public\demos\linkedin-voice\` (18), `app\demos\_og\glow.jpg`, `public\about\` (20), `local\about\about-me.md`, `local\org-diagrams.json`, `local\research\` (7). The app reads only those three from `local\` (`app\about\copy.ts`, `app\org-charts.tsx`, `app\research-docs.tsx`). If you add a git-ignored file the build needs, add it to the recipe too.

## Working notes

- Long Python through Bash heredocs breaks on quotes and on `\u`/`\l` in Windows paths: Write the script to `$CLAUDE_JOB_DIR\tmp` and run it.
- Throwaway build copies with a junctioned `node_modules`: remove the junction with `cmd /c rmdir`, **never** a recursive delete (it would wipe the real `node_modules`). Done for `tmp\landbuild` at 18:30.
- If the dev server returns 500s with "Jest worker encountered child process exceptions", restart it hidden. A new `/demos` entry 404s in dev until a route file is touched.
- `vercel deploy --prod` prints a "Promote to production" hint anyway; the alias does update. Verify with curl.

## Messages

- No `website-Q` on the desk. DI-9 and DI-10 are archived.
- Waiting on: `COPY s-d7` (six landing texts), Alex's comments on the mockup and his welcome placement (via orchestration), and the BUILDs listed above.
