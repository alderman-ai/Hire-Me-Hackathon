# Handoff: website (S-D8)

Written 2 Nov at about 16:55 Prague, during orchestration's 16:47 HOLD (a full reset on Alex's instruction). Context is about 60%; the handoff happens as part of the RESTART. The session that took over at 14:53 wrote this after its stakeholder-pages subagent returned. Read CLAUDE.md first, then this file, then SPEC.md (§6, §7 with its "(L-01)" revisions, §9 for every decision since 15:00, and Appendix A).

## State of the site (live: https://hire-me-hackathon.vercel.app)

- **Look:** the whole site was re-skinned in Addvery's look at 16:29 (`4a8099f`), on Alex's direct word at about 15:30 ("as cloned as possible to the Addvery website… all the design, branding, style, and structure is going to come from their website").
  - Tokens are in `app\addvery-tokens.css`. Fonts load with `next/font`: Inter Tight stands in for their commercial heading face, and Outfit, Inter and Plus Jakarta Sans are used too.
  - One red disclaimer sits above the top menu and nowhere else (Alex: "once and only once… in red").
  - Chrome is in `app\site-chrome.tsx` and `app\site-footer.tsx`, with the links in `app\site-links.ts`.
  - Motion is in `app\motion.tsx` (`Reveal`, `RotateIn`; Addvery's values on desktop, lighter on phones, none for reduced motion).
  - The home page has the hero with the countdown and the "start here" cards rotating in, the feed on their podcast-index pattern, and the status board as their industries band.
  - Inner pages (`/d1` to `/d10`, `/docs/*`, `/privacy`) use `app\article.css` (`.art` classes).
- **Brand kit** (local only, git-ignored): `local\addvery\brand\BRAND.md` and `tokens.css`, plus `local\addvery\frontend\FRONTEND.md`, `motion.md` and `screens\`. That folder is in `.vercelignore` because the screenshots are 22 MB. Addvery's logo, icon and glow files are in `public\addvery\` (24 files): git-ignored, but they must deploy. The raw scrape is in `.addvery-scrape\`, never committed or deployed.
- **Demo pages** `/d1` to `/d10`: `app\[demo]\page.tsx` with `content\deliverables.json`, and statuses from `content\build.json`.
- **`/d2`** holds Alex's research on the company: org charts (`app\org-charts.tsx`) from `local\org-diagrams.json`. That file is git-ignored, must deploy, and is a trimmed copy of `Addvery Research\Org diagrams for the website.json`.
  - Left off the page: `outreach.by_function` (an AI rating of five role-identifiable leaders) and the Chief Growth Officer's start date.
  - The site-gap list is reframed as "What Alex would set up first".
  - `growth_plan` (200M to 1B CZK) is in, attributed by role, with Alex's okay: the hackathon is addressed to the growth lead (see below).
- **Preview card:** a static `app\opengraph-image.png` in the new look (S-D3-B5, 16:39), with `metadataBase` set to the alias.
- **`/privacy`:** the S-D3 text, unlinked and `noindex` until Alex ticks S-D3's pre-send gate.
- **Analytics:** Web Analytics is on (aggregate). Query it with `vercel api "/v1/query/web-analytics/visits/count?projectId=prj_rT9kFM97a02ouvSsMrZZRYqJi4jo&teamId=team_m6QeC9FHcO8dk7PvEHtfkAod&since=…&until=…"`. At about 16:00 it showed 5 visitors and 9 views.
- **Videos:** S01, S02, S06 and S08 are webcams on YouTube; S08 was posted in full on Alex's word. S03 to S05, S07 and S09 are over 15 minutes and wait on channel verification.
- **Last deploy:** 16:49 (`9a86a97`, S-D9-B7). The publish check is clean (`checks.md`, 16:30). Since then, B2 (`e1fee58`) and the stakeholder route (`ce5d5f6`) are committed but not deployed.

## How to deploy while uncommitted work sits in the tree

Vercel deploys the working tree. While a subagent has half-done files in `app\`, deploy a clean export instead. The git-ignored files the live site needs are `public\addvery\` and `local\org-diagrams.json`. Never copy in `local\stakeholders*` or `app\for\`, unless Alex has approved.

```bash
cd "/c/Users/alder/Desktop/Hire me hackaton"; D="$(cygpath -u "$CLAUDE_JOB_DIR")/tmp/clean-deploy"; rm -rf "$D"; mkdir -p "$D"
git archive --format=tar HEAD:website > "$D.tar" && tar -xf "$D.tar" -C "$D" && rm "$D.tar"
mkdir -p "$D/.vercel" "$D/public/addvery" "$D/local"; cp website/.vercel/project.json "$D/.vercel/"; cp website/public/addvery/* "$D/public/addvery/"; cp website/local/org-diagrams.json "$D/local/"
cd "$D" && MSYS_NO_PATHCONV=1 vercel deploy --prod --yes
```

Once the tree is clean (nothing uncommitted except git-ignored files), a plain `vercel deploy --prod --yes` from `website\` works and includes the ignored files.

## The six, and the growth lead

- Alex confirmed six of the eight in `Addvery Research\GetSales six.json` at about 15:59 (`confirmed_by_alex: true`). By role: CEO, the growth lead (Director of Growth, Chief Growth Officer), two co-founders, the Director of Delivery and the Director of BI. Only those six go near the site. Never print their names in tool output or messages.
- The hackathon is effectively addressed to the growth lead. She posted that 1B CZK in revenue is Addvery's next milestone ("We must be seen and heard"). Alex commented "I might like to help with that", and she replied "let's find out how to make it possible". He meets her tomorrow, and she sees all of this first. Her name appears only on her own stakeholder page once he approves it, never elsewhere. That includes the charter text, where `sync_docs.py` already removes lines naming her.
- Alex's private briefing on the six (part N5 of `Scraping summary.md`) is for the stakeholder pages only, and only once he approves what they show. The draft doesn't use it.

## Stakeholder pages (part 2, orchestration's go at about 16:05)

- **Drafted, local only:** the route is `app\for\[slug]\page.tsx` with `app\stakeholders.ts`, and its styles are the `.sh-` block at the end of `app\article.css` (committed `ce5d5f6`; the code holds no names). Content is in git-ignored `local\stakeholders.json` (`approved: false`, every note `note_is_draft: true`) and `local\stakeholders-draft.md` (a five-line summary, each page in full, local URLs `http://localhost:3100/for/<slug>`).
- **Slugs:** `growth` (Chief Growth Officer, the addressee), `ceo`, `cofounder-1`, `cofounder-2`, `delivery`, `bi`.
- **Demos per role** (demo numbers in the order shown on each page):
  - growth: 3, 1, 4, 7
  - ceo: 3, 9, 4
  - cofounder-1: 3, 9, 1
  - cofounder-2: 6, 7, 4
  - delivery: 9, 8, 4
  - bi: 1, 3, 9

  Demo 2 (the company research) is left off on purpose. Each page shows up to three feed moments, chosen by role tags.
- **Gate:** a page renders only in `next dev`, or when `approved === true` AND that page's note is no longer marked draft. Otherwise `generateStaticParams` returns `[]`, `dynamicParams = false`, and `notFound()` runs. Pages are always `noindex`, with role-only tab titles, and nothing links to `/for/`. This was proved with a real `next build` in a copy: no `/for/` output while unapproved, and no names in 356 output files. A `/* turbopackIgnore: true */` stops the JSON from being bundled.
- `.vercelignore` now also excludes `local/stakeholders.json` and `local/stakeholders-draft.md` (`081ba4d`). **On approval, remove those two lines**, or the Vercel build won't see the content.
- **Copy:** done with `design:ux-copy` (headings, labels, the note line, the asks, all six as questions) and `marketing:draft-content` (the role notes, still marked draft, the growth lead's "why now", the one-line demo reasons).
- **Still to do before the gate:**
  - screenshots at 390 and 1440 px, headless only;
  - `marketing:brand-review` against `Addvery Research\Brand capture.md`;
  - `design:accessibility-review`.
- **Flags from the drafting subagent:**
  - The growth page's sources line must also cite her public posts (the 1B CZK goal, the "why now", her reply).
  - "Two days ago" goes stale, so recheck it on send day.
  - Both co-founders' titles include their other CEO roles, as in their public titles.
  - The "why now" ends with one line of Alex's framing.
- **The working tree is clean at 16:55.** A plain `vercel deploy --prod --yes` from `website\` is safe again: `.vercelignore` keeps the stakeholder drafts out, and the git-ignored brand and research files go up. B2 (the research docs on `/d2`, `e1fee58`) is committed but **not yet deployed**, because of the HOLD; deploy it first after the RESTART.
- **Decisions put to Alex in chat at 16:47, at his request** ("What do you need my decision on?"). He's asked to reply "all defaults" or with exceptions:
  - **A:** OT-07's plan and its four defaults (Hobby plan; no cold read; the demo page layout; the stakeholder rule).
  - **B1 to B6:** DI-9's questions 2 to 7, defaults a, b, a, a, a, a.
  - **C:** keep the profiles' "likely objections" sections off public pages.
  - **D:** keep the per-function AI outreach rating and the growth lead's start date off `/d2`.

  Write his answers into the two task files verbatim, then send `TASK DONE` and `ARCHIVE`.
- **Copy rule** (Alex, about 16:40, now in ASKING.md): no copywriting without a copywriting skill switched on through orchestration. `SKILL ON website` came at about 16:44 for `design:ux-copy` (microcopy) and `marketing:draft-content` (longer copy). Before the stakeholder gate, run `marketing:brand-review` against `Addvery Research\Brand capture.md`; the site's words stay Alex's voice. Copy already live (the demo pages' "what this is" lines, the reskin's UI labels, the `/d2` headings) gets one pass through `design:ux-copy` the next time it's touched.
- **Next:**
  1. Brand review.
  2. Write `Operator tasks\Approve - what the six stakeholder pages show.md` (next free OT id, checked just before writing; OT-07 is the latest seen). Follow SPEC §7 step 8: "What this is", a five-line summary, `![[website/local/stakeholders-draft.md]]`, and its SHA-256 in `Snapshot of`.
  3. Commit it, send the TASK line, and run Monitor `check_gate` every 300 s.
  4. On APPROVED, set `approved: true`, add the links (start-here box) and deploy.

  Alex's 16:41 words (via s-d1-scraping) want the research artifacts shown "as it is"; per-person material goes through this gate so he sees exactly what's published. His rule from 16:36: an approval includes whatever he writes in its feedback fence.
- **DI-9** was RELEASED at 16:46 (`2219b78`) into the slot DI-7 freed, with the TASK line sent; the desk showed it, and SPEC §1 and the status line now say DI-9. Earlier notes follow. "Decide - the six stakeholder pages on the site": six questions (2 to 7). Question 1 (branding) was answered directly by Alex. The draft is at `C:\Users\alder\.claude\jobs\b25f14b0\tmp\DI-9-draft.md`. If the job tmp is gone, rebuild it with `tmp\make_di9.py` from SPEC Appendix A, minus QXX.1, using the narrowed Q3 in `tmp\q3_new.md`. Release it to `Operator tasks\Decide - the six stakeholder pages on the site.md` the moment DI-7 ("Decide - how the GetSales outbound demo runs") or DI-8 ("Decide - how the blog pipeline should work") closes. Orchestration allows at most two intakes in front of Alex, and this one is first in line. If neither has closed by 17:15, tell orchestration. Then commit, send `TASK website: Decide - the six stakeholder pages on the site.md is waiting on you: …`, and put the DI number in SPEC §1 and the status line.

## Gates and desk

- **OT-07** `Operator tasks\Approve - the plan for the website.md`: open since 15:08 (`589a798`), with its summary updated for the brand pass (`3b3823f`). Pokes went at 15:53, 16:08 and 16:23. The 16:38 poke was skipped because Alex said at 16:36 he was working through all his operator tasks. On APPROVED or CHANGES: apply the fence too (his rule), send `TASK DONE website: Approve - the plan for the website.md`, and send `ARCHIVE Approve - the plan for the website.md: readers website` to `orchestration`. From 18:00 Prague, proceed on the plan as written and log it in §9.
- website-Q4 is closed (analytics on). No website question is on the desk.
- **L-06** (S1's website list) still waits on Alex's OT-03. When FINDINGS land in `research\website\`, rerun step 5 and refresh the OT-07 snapshot.

## Build queue

- Nothing in flight.
- Expected:
  - **S-D3:** footer privacy link, an alert-visitor panel, then a "How this was made" panel, one at a time once Alex ticks the six-alert gate.
  - **S-D1:** the scraping page (`S-D1-B1`), linking `/d2` as "the research itself".
  - **addvery-research-B2:** company-level research artifacts for `/d2`, as they are. It was told to say per file whether a named person appears; per-person files go to the stakeholder gate, not a BUILD.
  - **S-D9:** posts and status updates.
- Information only, nothing to post: the rig's S09 highlights (16:00), with leave-outs at 04:07, 07:14, 21:09 and the 21:28 to 22:17 screen share.

## Processes

- **Clock loop:** pid 27164 (`pythonw`), alive. S10 started recording at about 16:24 ("recording S10, 8.53 h left").
- **Dev server** on :3100: restarted by a subagent at about 15:45, logging to `C:\Users\alder\.claude\jobs\b25f14b0\tmp\dev-c.log`. If it dies, start it hidden: `Start-Process cmd.exe -ArgumentList '/c','npx next dev -p 3100' -WorkingDirectory <website> -WindowStyle Hidden`.
- **Monitors:** all stopped for the HOLD at 16:47. Re-arm after the RESTART:
  - the OT-07 `check_gate` loop;
  - the DI-9 answer watch, the same `Intake State:` check on "Decide - the six stakeholder pages on the site.md". The DI-7 and DI-8 close watch is no longer needed.

## Working notes

- In Git Bash, `export MSYS_NO_PATHCONV=1` before vercel commands. Protected preview URLs: `vercel curl <path> --deployment <url>`. The Vercel MCP can't read this team (403 or "not found").
- Long Python via Bash heredocs can break on quoting, so write the script to `$CLAUDE_JOB_DIR\tmp` and run it. `python -I` drops the user site-packages, so PIL isn't found; use plain `python` from the job tmp directory for trusted local files.
- Headless Edge screenshot scripts with device widths, including 390 px: `C:\Users\alder\.claude\jobs\b25f14b0\tmp\frontend-scripts\` and `tmp\reskin-scripts\`.
- `sync_docs.py` now also drops any table row mentioning "proposal" or "own GetSales outbound" (S2's change-log rows).
- The publish check scans every live page for the risk-rule terms and for the eight candidates' first and last names from `GetSales six.json`, counting matches without printing them.
