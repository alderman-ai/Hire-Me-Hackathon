# Handoff: website (S-D8)

Written 2 Nov at about 19:00 Prague by session 54c2d301 (took over at 17:15 from b25f14b0), at forking gate F3 (context about half full). Read CLAUDE.md first, then this file, then **the reset rules at the top of `..\answer-desk\ASKING.md`** (Alex, 17:00), which override older rules. SPEC.md §9 has every decision since 15:00, the last three rows (17:22, 17:40, 18:00) are this session's.

## The rules in one screen

- Easy calls are yours: decide, log in SPEC §9 (decision, why, blast radius), carry on. No plan approvals to Alex. Pokes only when truly blocked. No 18:00 cut-off; Alex works through the night.
- Hard exclusions are only DoD-22's three: secrets, the Apify proposal, Alex's own outbound outside the GetSales demo folder. Public sources (photos included) may be published.
- **Copy:** copy skill first (`design:ux-copy` or `marketing:draft-content`; `marketing:brand-review` to check). **Design:** `frontend-design:frontend-design` first (if it doesn't resolve, Read `~\.claude\plugins\cache\claude-plugins-official\frontend-design\ea10b213686c\skills\frontend-design\SKILL.md` and log that you did), then `design:design-critique` and `design:accessibility-review` before shipping. Name the skill in every subagent's prompt.
- **Alex's sign-off on words is in a Claude Doc or (new) review artifacts**, never in chat. Questions to him go through `answer-desk` only.
- One brand source: `local\addvery\brand\` (git-ignored), tokens in `app\addvery-tokens.css`.

## In flight right now (background subagents of 54c2d301; their reports land in the OLD session)

If the old session ended before they reported, check the working tree: their files are uncommitted. Review with `git status website/`, check locally, then commit and deploy.

| Work | Files it touches | Status when written |
| --- | --- | --- |
| **S-D1-B1** `/d1` scraping briefing with artifact carousel (from `..\scraping\site\d1.md`) | `app\[demo]\page.tsx`, `app\d1.tsx`, `app\d1.css`, `app\carousel.tsx`, `app\carousel.css`, `content\d1.json`, `public\d1\`, `scripts\d1_images.py` | Running since ~17:50. Reply `BUILT S-D1-B1` to `s-d1-scraping` with the URL. It also asked for one feed post announcing /d1 (the subagent suggests text). |
| **S-D7-B1** entry "LinkedIn posts in Addvery's voice, graded blind", then **S-D5-B2** inline `[!video]` clips in entries | `app\demos\*`, `content\demos\*`, `public\demos\linkedin-voice\` (git-ignored), `.gitignore` | Running. The `/demos` template itself (S-D5-B1) is built and was BUILT on preview to s-d5; production ships with the first published entry. Reply `BUILT S-D7-B1` to `s-d7-linkedin-content` and `BUILT S-D5-B2` to `s-d5-blog-articles`. |
| **Inventory** of every page, post, video and entry with honest read/watch times | writes only `content\inventory.json` | Running. Feeds the reading-list times and Alex's time-picker. |
| **Landing layout** for `/for/<slug>`: greeting on top, "What I'm guessing you're concerned with", a numbered reading list with times and a running total, per-person preview card | `app\for\*`, `app\stakeholders.ts` | Running. Gated: renders only in `next dev` or when that page's `landing.approved === true` in `content\stakeholders.json`. |

`app\demos\_og\glow.jpg` is derived from Addvery's images: git-ignore it (the S-D7 subagent was told to add it to `.gitignore`).

## Next, in order

1. **Integrate the four subagents** as they land: local check, commit path-limited, deploy, reply BUILT. Deploy from a clean export of HEAD while other work is uncommitted (recipe below; copy `public\people\`, `public\demos\linkedin-voice\`, `app\demos\_og\glow.jpg` and `public\addvery\` in, since they're git-ignored).
2. **Menu** (`app\site-links.ts`): today Live feed · What's being built · For Addvery · The plan. Target (Alex, DI-10 Q10.10): Live feed (home) · Research (`/d1` scraping briefing + `/d2` company research; a `/research` landing is optional) · GTM demos (`/demos`) · For Addvery (`/for`). Add GTM demos once `/demos` has a published entry. Then tell `s-d9-legibility` the restructure is up so it sends P10 "The day so far" (a summary post).
3. **Six review artifacts for Alex (orchestration, 18:05, replaces the stakeholder Doc for these pages).** Alex: "I want to review it as one artifact at a time, which is the image, and then the branded stylized version of how the text will look ... Give me six individual ones for me to edit." Wait for `s-d7-linkedin-content` to send `COPY s-d7: six landing pages ready at <path>` (it's rewriting all six in Alex's own voice). Then: load the `artifact-capabilities` skill, and publish six artifacts, one per person, each a faithful render of that person's landing page as it will look live (portrait, Addvery styling, greeting, concerns, reading list with times, graphics), with the text editable in place if the runtime allows, otherwise commentable. Send `answer-desk` one TASK line with the six links. Read his edits back into `content\stakeholders.json`, set `landing.approved: true` per page he okays, deploy.
4. **Time-based paths (Alex, 17:5x):** a welcome that explains the site and asks how much time the visitor has (5, 10, 20 minutes or more), then a guided tour or a list of links; and a carousel of the summary posts at the top of the feed, newest first. Feed posts with `"summary": true` (+ `summary_line`) drive it: s02, s06, s08, s11 are tagged (agreed with s-d9). **Layout waits for Alex's comments on orchestration's design mockups**, which orchestration relays.
5. **S-D3-B1 and B2** (two GetSales `/demos` entries, video plus transcript summary) arrive after Alex records; both must be live before his meeting with Ivana on Tue 3 Nov. **S-D11** (Brand motion with Comfy) comes later as a `/demos` entry.
6. Housekeeping when there's a gap: the `.art-cta` purple band (lilac on amethyst, 4.37:1) fails AA site-wide in `app\article.css`; make its text white. Per-page preview tags for the `/dN` pages (L-03-W2: sub-pages unfurl as the homepage). The publish check (`checks.md`) at this fork wasn't run; run it after the integrations.

## State of the site (live: https://hire-me-hackathon.vercel.app)

- Last production deploy ~18:25 (commit ec995b5 + content after). Commits this session: 35a7e16, 4a51cb8, 4107ed0, 55e408f, c9c111c, e475ab3, 3306478, ec995b5, a59d4d4.
- **The six:** `/for` grid (credited public portraits: five from addvery.com team pages, Ivana's from ivanakarhanova.cz, which Alex okayed; uniform 4:5 greyscale; git-ignored `public\people\`, deployed) and six `/for/<slug>` pages, all `noindex`, menu "For Addvery". Text in tracked `content\stakeholders.json` (from the Claude Doc https://claude.ai/artifact/Abm1SeTTDwAEV4qBb55YtY). `local\stakeholders.json` is retired. Photos topic closed by Alex.
- **Status board** (`content\build.json`) as of 17:45: D1 to D11 (D4 retired, D11 Brand motion with Comfy added), intro "Fourteen pieces of work (one since retired)".
- **Docs:** `scripts\sync_docs.py` now redacts nothing; it only refuses secret-shaped strings. Rerun it on every charter or spec change.
- **Feed:** latest S-D9 build is B9 (posts `site-shape`, `workflows-built`). S-D9's next is P10 "The day so far", held until the restructure is up.
- **Clock:** loop pid 39924 (pythonw). `.clock\adjustments.json` holds two hours taken off on Alex's word (7200 s). S12 recording since ~17:34, 5.85 h left then.
- **Dev server** on :3100 was restarted hidden at ~17:20 (its worker crashed). If pages 500 with "Jest worker encountered child process exceptions", restart it.

## Messages and queue

- `website-Q` on the desk: none. TASK DONE sent for DI-9; DI-9 and DI-10 archived by orchestration.
- Waiting on: `COPY s-d7` (six landing texts), S-D3-B1/B2 after Alex records, orchestration's relay of Alex's mockup comments.
- S-D3's three earlier BUILDs (footer privacy link, alert-visitor panel, "How this was made") are cancelled by S-D3. `/privacy` stays unlisted and noindex.

## Deploying from a clean export

```bash
cd "/c/Users/alder/Desktop/Hire me hackaton"; D="$(cygpath -u "$CLAUDE_JOB_DIR")/tmp/clean-deploy"; rm -rf "$D"; mkdir -p "$D"
git archive --format=tar HEAD:website > "$D.tar" && tar -xf "$D.tar" -C "$D" && rm "$D.tar"
mkdir -p "$D/.vercel" "$D/public/addvery" "$D/public/people" "$D/local"; cp website/.vercel/project.json "$D/.vercel/"
cp website/public/addvery/* "$D/public/addvery/"; cp website/public/people/* "$D/public/people/"
cp -r website/local/org-diagrams.json website/local/research "$D/local/"
# once they exist: cp -r website/public/demos "$D/public/"; cp website/app/demos/_og/glow.jpg "$D/app/demos/_og/"
cd "$D" && MSYS_NO_PATHCONV=1 vercel deploy --prod --yes
```

When the tree is clean, plain `MSYS_NO_PATHCONV=1 vercel deploy --prod --yes` from `website\` is simpler and ships every git-ignored asset.

## Working notes

- Long Python through Bash heredocs breaks on quotes and `\u` escapes: Write the script to `$CLAUDE_JOB_DIR\tmp` and run it.
- `vercel deploy` prints a "Promote to production" hint even on `--prod`; the alias does update. Verify with curl.
- Webcam uploads: `..\OBS\rig\.venv\Scripts\python.exe scripts\upload_webcam.py Sxx <scratch dir>` (create the dir first).
