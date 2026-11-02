# Handoff: website (S-D8)

Written 2 Nov, 14:55 Prague, at forking gate F3 (context about half full). The previous `website` session has run the site since the morning and became the S-D8 orchestrator at 14:50. Read CLAUDE.md first, then this file, then SPEC.md.

## State of the site

- **Live:** https://hire-me-hackathon.vercel.app, last production deploy 14:49 (`9ef53a3`). Home page: title, countdown, "start here" box (S02 explainer link, charter and S0 to S2 specs at `/docs/<slug>`), then the live feed from `content\feed.json`, newest first, 23 posts. Top three: the status board (`status`, as of 14:45), "Every demo has a plan" (14:39), "Lunch break, 14:25 to 15:00" with the setup photo.
- **Feed blocks** (`app\feed.tsx`): `p`, `list`, `points` (bullets `{lead, text?, quote?}`), `quote`, `highlight`, `video` (`session`, `start`), `image` (`src` in `public\`, `width`, `height`, `alt`, `caption`), `summary`, `status-board`, `doc-link`. Posts may carry `roles` (S-D9's stakeholder tags, unused until part 2).
- **Videos on YouTube** (`content\videos.json`): S01, S02 (embedded from 62 s), S06 (embedded). S03, S04, S05 and S07 are over the 15-minute cap and not uploaded; they need Alex to verify the channel.
- **Docs:** `python scripts\sync_docs.py` copies and redacts the charter and S0 to S2 specs; it refuses if a deny-listed term survives. Last run 14:28 for change C03.
- **Photo:** `public\setup-2026-11-02.jpg`, unblurred on Alex's explicit word ("don't blur any text from the image. It's this project. It's on purpose"); GPS and camera metadata stripped.

## S-D8 progress (SPEC.md §7)

- **Step 1 done** (`5c2d26f`, roster `6fdaf4c`): clock loop alive, production and preview deploys work (preview URL pattern `hire-me-hackathon-<hash>-alex-alderman-s-projects.vercel.app`), local preview runs, `builds.md` backfilled, `checks.md` created, `local/` added to `.gitignore`. **Not yet verified:** that a file in `local\` reaches the deploy upload. `.vercelignore` doesn't list it, so it should; confirm with a preview deploy and its file list before part 2 relies on it.
- **Step 2 done:** `RESEARCH S-D8: …` sent to `s1-research` at 14:52. Its reply (about 14:56): the S-D8 list is drafted as `..\research\lists\L-06-website.md`, with R1 structure and how each named visitor finds their part, R2 what a stakeholder section holds per role, R3 the brand pass mechanics, plus three wildcards. It waits on Alex's gate "Approve - research for the GetSales demo and website.md" (asked by about 15:20), with findings by about 16:30. **L-01 is done and reviewed:** read `..\research\global\L-01-R1-legibility.md` (structure: outcome, demo, "how it works"), `L-01-R3-personal-data.md` (section 7: what a stakeholder section may and may not hold), `L-01-R4-format-reception.md`, `L-01-W2-wildcard-delivered.md` (preview card, hand-over checklist C7) and `L-01-W3-wildcard-received.md`. The L-01 synthesis lands by about 16:00, which triggers step 6.
- **SPEC.md Appendix A** (`6e936f7`, from wave2-specs): the held part 2 intake and its release rule. wave2-specs releases it when Alex's Addvery research has his confirmed six or his brand capture, or he says he's done; if wave2-specs has stopped by then, `website` or `orchestration` releases it as the appendix says.
- **Step 3 onwards:** serve build requests; add demo, video and blog pages as their requests arrive.
- **Step 6** (spec-draft gate) goes out once L-01's synthesis lands. If the S-D8 list hasn't run by 17:00, send it on L-01 alone and say so.
- **Part 2** (branding, six stakeholder pages) waits for orchestration's part 2 line.

## Build queue

- **Nothing in flight.**
- **Expected soon:** a link preview card (Open Graph title, description, URL and a 1200x630 image) before the GetSales alert's link goes out around 15:30. `s1-research` flagged it (source `research\global\L-01-W2-wildcard-delivered.md`, section (c), C2, C3, C7). Orchestration said to build it as a BUILD from `s-d3-getsales` when that request arrives. The image must carry no stakeholder names and nothing DoD-22 forbids. Check the production alias logged out afterwards.
- **Later:** `S-D1-B1`, the D1 page (content `scraping\site\d1.md`), after Alex approves its draft. Alex allowed naming Apify (DI-6 Q6.3 "yes", in `Operator tasks\Decide - how the scraping demo should work.md`); the proposal rule still stands.

## On the desk

- **website-Q4 open** (queued at the desk), sent 14:52, deadline 15:07: turn on Vercel Web Analytics? Alex asked whether anyone besides him has visited; nothing can tell, because Web Analytics was never enabled ("Web Analytics not found") and the site has no server logs. Recommended (a), turn it on now. No poke sent yet. Poke from 15:07 every 15 minutes (`POKE website: waiting on you for website-Q4, visitor counting`); before 18:00 keep waiting, from 18:00 leave it off.
- If (a): enable Web Analytics for project `hire-me-hackathon` (dashboard, project → Analytics → Enable, or the API), add `@vercel/analytics` with its `<Analytics />` component in `app\layout.tsx` (check the package's current Next.js import path first), deploy, then confirm with the Vercel MCP `count_pageviews` for `projectId: hire-me-hackathon`, `slug: alex-alderman-s-projects`.

## Processes

- **Clock loop:** pid 27164 (`pythonw`), last published 14:15:50 idle, 9.10 h left. It's separate and keeps running.
- **Dev server:** this session started `npx next dev -p 3100`; it may stop with this session. Restart it in the background if you need it. Restart it after any `npm install`, or new packages 500.
- **No stakeholder preview** is running.

## Decisions since the morning (before SPEC.md's §9 existed; DECISIONS.md has the rest)

- 14:00, Alex: the site is a live feed, newest on top; the charter must be on the site. Built with the specs too, redacted.
- 14:18: a subagent found eight Insight posts in S03 to S05; every quote checked against its transcript.
- 14:25, website-Q3, Alex "a": leave the public repo as it is; mentions of the proposal are fine.
- 14:45: Apify named on the site after Alex's DI-6 Q6.3 "yes" (checked in the intake file).
- 14:49, Alex: the setup photo stays unblurred; metadata stripped anyway.
- 14:55: first publish check clean (`checks.md`).

## Working notes

- In Git Bash, `export MSYS_NO_PATHCONV=1` before curl or vercel commands with `/paths`.
- Headless Edge screenshots for visual checks: `msedge --headless=new --screenshot=… --window-size=W,H --virtual-time-budget=8000 http://localhost:3100/`. It won't lay out narrower than about 540 px, so a phone-width shot looks clipped on the right; that's the browser, not the page.
- The S-D9 asker sends one request at a time and waits for BUILT. Log every build in `builds.md`.
