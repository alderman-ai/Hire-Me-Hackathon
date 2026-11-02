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

- **`/about` (About-me)**, a subagent of 54c2d301 building to orchestration's mockup (https://claude.ai/artifact/QUtWfgRq4Bcyko4PQNkkVF, 10 boards). Files: `app\about\*`, `content\linkedin-wall.json`, `public\about\` (git-ignored), `.gitignore`. If it isn't committed when you start, its files are uncommitted in the tree: check `/about` locally, commit, deploy, add "About Alex" to the menu (`app\site-links.ts`), and tell `s-d1-scraping` it's live (it asked to check the LinkedIn wall).
  - Copy: `..\linkedin-content\local\about\about-me.md` (keep his " -- "; the ARTICLE-2-LINK line returns once s-d5's article 2 is live).
  - Wall: `..\scraping\site\linkedin-wall\wall.json` (34 posts, verbatim; never show `why`).
  - Assets: `local\alex\` (list in `ASSETS.md`; alderman.ai has only three, the rest come from his desktop folders). `alex-alderman-final.png` is the Apify teaser: never use it.
  - The **AI portfolio** slot stays empty until `s1-research` sends its entry as a BUILD.

- **Webcam backlog upload** (rig, ~18:30: YouTube long uploads now allowed; Alex in S12: the backlog should go up). Running from 54c2d301 in the background, one at a time: S03, S04, S05, S07, S09, S10, S12. Check `content\videos.json`. Any session missing there: rerun `..\OBS\rig\.venv\Scripts\python.exe scripts\upload_webcam.py Sxx <scratch dir>` (it skips sessions already online; create the scratch dir first). Then commit `content\videos.json`. They're webcam only; where to show them is s-d9's call (BUILDs).

## Next, in order (from orchestration's mockup and Alex's 17:5x direction)

1. **Six review artifacts for Alex: in flight.** `COPY s-d7` arrived at ~18:40 (`..\linkedin-content\local\landing\new\page-1..6.md`, with `_notes.md` holding facts Alex may confirm). A subagent of 54c2d301 is mapping the text into `content\stakeholders.json` (adding `landing.concerns[].lead`, the bold short position) and publishing six review artifacts. If its work is uncommitted when you start, check it, commit it, then send `answer-desk` one TASK line with the six links. Original plan as written: wait for `COPY s-d7: six landing pages ready at <path>` (s-d7 is rewriting the greeting, concerns and so on in Alex's voice). Then load the `artifact-capabilities` skill and publish six artifacts, one per person: a faithful render of that person's landing (portrait, Addvery styling, greeting, concerns, reading list with times), with the text editable in place if the runtime allows, otherwise commentable. Send `answer-desk` one TASK line with the six links. Read his edits back into `content\stakeholders.json` (`pages[i].landing`), then set `landing.approved: true` per page he okays and deploy. The landing layout is already built and deployed gated (b0c1374). Totals today: growth 47 min, ceo 57, cofounder-1 57, cofounder-2 4, delivery 57, bi 10.
2. **Welcome and time picker** (mockup board): a component that explains the site and asks how much time the visitor has (5, 10, 20 minutes or more), then gives a reading path. It must sit either at the top of `/` above the feed (orchestration's recommendation) or on `/start`; Alex's pick is still open, and orchestration relays it. Paths come from `content\inventory.json`. Orchestration's call: ordered lists with stop-markers first, a guided tour only if there's time.
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
- **Clock:** loop pid 39924. `.clock\adjustments.json` holds two hours off on Alex's word. S12 stopped about 18:13, idle, 5.09 h left.

## Deploying

The tree usually holds a subagent's uncommitted work, so deploy a clean export of HEAD and copy the git-ignored assets in:

```bash
cd "/c/Users/alder/Desktop/Hire me hackaton"; D="$(cygpath -u "$CLAUDE_JOB_DIR")/tmp/clean-deploy"; rm -rf "$D"; mkdir -p "$D"
git archive --format=tar HEAD:website > "$D.tar" && tar -xf "$D.tar" -C "$D" && rm "$D.tar"
mkdir -p "$D/.vercel" "$D/public/addvery" "$D/public/people" "$D/public/demos" "$D/local"; cp website/.vercel/project.json "$D/.vercel/"
cp website/public/addvery/* "$D/public/addvery/"; cp website/public/people/* "$D/public/people/"
cp -r website/public/demos/linkedin-voice "$D/public/demos/"; cp website/app/demos/_og/glow.jpg "$D/app/demos/_og/"
cp -r website/local/org-diagrams.json website/local/research "$D/local/"
# once /about ships: cp -r website/public/about "$D/public/"
cd "$D" && MSYS_NO_PATHCONV=1 vercel deploy --prod --yes
```

Git-ignored but deployed: `public\addvery\`, `public\people\` (plus `*-og.jpg`), `public\demos\linkedin-voice\`, `app\demos\_og\glow.jpg`, `public\about\`, `local\org-diagrams.json`, `local\research\`. When the tree is clean, a plain `vercel deploy --prod --yes` from `website\` ships all of them.

## Working notes

- Long Python through Bash heredocs breaks on quotes and on `\u`/`\l` in Windows paths: Write the script to `$CLAUDE_JOB_DIR\tmp` and run it.
- Throwaway build copies with a junctioned `node_modules`: remove the junction with `cmd /c rmdir`, **never** a recursive delete (it would wipe the real `node_modules`). Done for `tmp\landbuild` at 18:30.
- If the dev server returns 500s with "Jest worker encountered child process exceptions", restart it hidden. A new `/demos` entry 404s in dev until a route file is touched.
- `vercel deploy --prod` prints a "Promote to production" hint anyway; the alias does update. Verify with curl.

## Messages

- No `website-Q` on the desk. DI-9 and DI-10 are archived.
- Waiting on: `COPY s-d7` (six landing texts), Alex's comments on the mockup and his welcome placement (via orchestration), and the BUILDs listed above.
