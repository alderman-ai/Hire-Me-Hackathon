# Handoff: website (S-D8)

Written 2 Nov at about 17:25 Prague at orchestration's RESTART (17:13), by the session that took over at 14:53 (context about 60%). Read CLAUDE.md first, then this file. Next read **the reset rules at the top of `..\answer-desk\ASKING.md`** (Alex, 17:00), which override older rules. Then read SPEC.md: §7 with its "(L-01)" revisions, §9 for every decision since 15:00, and Appendix A.

## The reset rules in one screen (ASKING.md has them in full)

- Easy calls are yours: decide, log the decision in SPEC §9 (with why and the blast radius), carry on. No plan or spec approvals go to Alex. Poke only when work is truly blocked, at most every 30 minutes. There's no 18:00 cut-off any more, since Alex works through the night.
- Public sources may be used and published. The only hard exclusions are DoD-22's three, as narrowed in `b5cb6fd`: secrets, the Apify proposal, and Alex's own outbound outside the GetSales demo folder.
- **Copy:** invoke a copy skill first (`design:ux-copy` or `marketing:draft-content`; `marketing:brand-review` checks it). Written work for outside readers is drafted in a **Claude Doc**: invoke `anthropic-skills:docs` before any Docs call. Alex's comment on the Doc is the sign-off. Read the final text back into the repo.
- **Design:** invoke `frontend-design` for pages and visuals, or `dataviz` for charts. Before anything ships, run `design:design-critique` and `design:accessibility-review`. Name the skill in any subagent's prompt and tell it to invoke the skill first.
- **One brand source:** `local\addvery\brand\` (BRAND.md, tokens.css), already carried as tokens in `app\addvery-tokens.css`.
- **What Alex still has to decide** is in one intake: `..\Operator tasks\Decide - everything left that needs you.md`. Orchestration relays each answer. Ask him nothing that's in it.
- SKILL ON for website (orchestration, 17:13): `frontend-design`, `design:ux-copy`, `marketing:draft-content`, `marketing:brand-review`, `dataviz`, `design:design-critique`, `design:accessibility-review`, `anthropic-skills:docs`.

## TO-DO, in order (from orchestration's RESTART)

1. **Docs and the deliverables view.**
   - Rerun `python scripts\sync_docs.py`. Cut its deny list (`DENY`, and the `REDACTIONS` and `REDACT_LINES` that exist only for privacy) down to DoD-22's three exclusions: secrets, the Apify proposal, Alex's own outbound. Names such as Ivana's no longer need redacting.
   - Then update the status board (`content\build.json`; the post `status` moves to the new time):
     - D3 is the 36 workflows plus the pipeline up to the first message, with the alert sent by hand.
     - D4 (blog pipeline) is retired.
     - D5 is two posts, not three. Rename "Three blog articles" as orchestration's change C10 does.

     Also fix `content\deliverables.json` for d3, d4 and d5. Check, deploy, commit, and reply `BUILT C<nn>` to orchestration.
2. **Stakeholder pages (DI-9).** Orchestration decided DI-9 on Alex's instruction ("If things are an easy judgment please clear the plate for me. We can just make edits later.").
   - Take each question's default. Where a default existed only for sensitivity, take the simpler option instead, and log it in §9. Defaults: Q9.2 a (named, role-led); Q9.3 b (text local); Q9.4 a; Q9.5 a (agents draft, Alex rewrites); Q9.6 a (systems first); Q9.7 a. Q9.3 and Q9.4's "paused review" existed only for sensitivity, so the simpler options probably apply: the text can be committed, and there's no paused review, since review happens in the Doc.
   - Keep the profiles' "likely objections" sections off the public pages. The /d2 trims (the per-function AI outreach rating and the growth lead's start date) are your call under the new rules.
   - Ivana Karhanová (Alex calls her "Yvonne") is first of the six, and her page (`growth`) leads.
   - Write all six pages' text into **one Claude Doc** for Alex's edit: copy skill first, then `anthropic-skills:docs`. Read his edits back into `local\stakeholders.json`, and into the repo if you take Q9.3's simpler option.
   - Going live waits on his answers in "Decide - everything left that needs you" (orchestration relays them): Q10.1 (the six confirmed), Q10.2 to Q10.5 (what may be claimed about him), and Q10.10 (default: live now, unlinked, edit later).
   - Then mark the DI-9 file (`..\Operator tasks\Decide - the six stakeholder pages on the site.md`) Intake State: Answered, with "decided by orchestration", and send `ARCHIVE Decide - the six stakeholder pages on the site.md: readers website` to orchestration.
3. **OT-07** (the website plan) is already closed on its defaults (17:03) and archived by S2 (`55d81e5`). Nothing to do.
4. Then S-D3's BUILDs, one at a time: the footer privacy link, an alert-visitor panel, then a "How this was made" panel. Then S-D1's scraping page (`S-D1-B1`, linking `/d2` as "the research itself") when it arrives.
5. **Housekeeping, when there's a gap:**
   - `design:design-critique` and `design:accessibility-review` on the live reskin, which shipped before rule 5 existed;
   - one `design:ux-copy` pass on copy already live: the demo pages' "what this is" lines, the reskin's UI labels, and the /d2 headings;
   - screenshots of the stakeholder pages at 390 and 1440 px.

## State of the site (live: https://hire-me-hackathon.vercel.app, last deploy 17:21, `ccb54b4`)

- **Addvery look** since 16:29 (`4a8099f`), on Alex's word at about 15:30 ("as cloned as possible to the Addvery website…").
  - Tokens: `app\addvery-tokens.css`. Fonts load with `next/font`: Inter Tight stands in for Neue Haas, plus Outfit, Inter and Plus Jakarta Sans.
  - One red disclaimer above the top menu, nowhere else (Alex: "once and only once… in red").
  - Chrome: `app\site-chrome.tsx`, `app\site-footer.tsx`, `app\site-links.ts`.
  - Motion: `app\motion.tsx` (`Reveal`, `RotateIn`; Addvery's values on desktop, lighter on phones, none for reduced motion).
  - Home: the hero (countdown and "start here" cards rotating in), the feed on their podcast-index pattern, and the status board as their industries band.
  - Inner pages use `app\article.css` (`.art` classes).
- **Brand kit** (local only, git-ignored): `local\addvery\brand\` and `local\addvery\frontend\` (FRONTEND.md, motion.md, screens). `local/addvery` is in `.vercelignore` (22 MB of screenshots). Addvery's files are in `public\addvery\` (24 files): git-ignored, but they must deploy. The raw scrape is in `.addvery-scrape\`, never committed or deployed.
- **Demo pages** `/d1` to `/d10`: `app\[demo]\page.tsx`, `content\deliverables.json`, statuses from `content\build.json`.
- **`/d2`:**
  - Chapter 01, org charts: `app\org-charts.tsx` with git-ignored `local\org-diagrams.json`, a trimmed copy of `Addvery Research\Org diagrams for the website.json`. It includes the growth plan (200M to 1B CZK) as the "why now", and "What Alex would set up first".
  - Chapter 02, "The research itself": `app\research-docs.tsx` and `.css`, showing the seven files in git-ignored `local\research\`, copied from `Addvery Research\for-site\` (addvery-research-B2).
- **Feed:** latest posts are S11 (`iXr-pKhseB8`, "Evening check-in", 17:07) and S-D9-B7's two posts. Status board as of 16:45.
- **Videos:** S01, S02, S06, S08 and S11 are webcams on YouTube. S03 to S05, S07, S09 and S10 are over 15 minutes and wait on channel verification.
- **Preview card:** static `app\opengraph-image.png` in the new look (S-D3-B5). `/privacy` is unlinked and `noindex` until S-D3 sends its footer BUILD.
- **Analytics:** Web Analytics is on. Query it with `MSYS_NO_PATHCONV=1 vercel api "/v1/query/web-analytics/visits/count?projectId=prj_rT9kFM97a02ouvSsMrZZRYqJi4jo&teamId=team_m6QeC9FHcO8dk7PvEHtfkAod&since=2026-11-02T00:00:00.000Z&until=2026-11-03T00:00:00.000Z"`. The Vercel MCP can't read this team.
- **Publish check:** clean at 16:30 (`checks.md`). Before and after the 17:21 deploy: `/for/*` 404, and no stakeholder names on `/` or `/d2`.

## Stakeholder pages (drafted, gated, not live)

- **Route:** `app\for\[slug]\page.tsx`, `app\stakeholders.ts`, and the `.sh-` block at the end of `app\article.css` (`ce5d5f6`; the code holds no names).
- **Content:** git-ignored `local\stakeholders.json` (`approved: false`, every note `note_is_draft: true`) and `local\stakeholders-draft.md` (with local URLs `http://localhost:3100/for/<slug>`).
- **Slugs:** `growth` (Ivana, Chief Growth Officer, the addressee; it leads), `ceo`, `cofounder-1`, `cofounder-2`, `delivery`, `bi`.
- **Demos per page:**

  | Page | Demos |
  | --- | --- |
  | growth | 3, 1, 4, 7 |
  | ceo | 3, 9, 4 |
  | cofounder-1 | 3, 9, 1 |
  | cofounder-2 | 6, 7, 4 |
  | delivery | 9, 8, 4 |
  | bi | 1, 3, 9 |

  D4 is now retired, so remap those slots.
- **Gate:** pages render only in `next dev`, or when `approved === true` AND that page's note is no longer a draft. `generateStaticParams` returns `[]` otherwise, with `dynamicParams = false` and `notFound()`. Pages are always `noindex`, tab titles are role-only, and nothing links to `/for/`. Proven with a real `next build` in a copy. A `/* turbopackIgnore: true */` keeps the JSON out of the bundle.
- **`.vercelignore`** excludes `local/stakeholders.json` and `local/stakeholders-draft.md` (`081ba4d`). **Remove those two lines when they go live**, or the build won't see them.
- **The hackathon's addressee:** Ivana posted that 1B CZK in revenue is Addvery's next milestone ("We must be seen and heard"). Alex commented "I might like to help with that", and she replied "let's find out how to make it possible". Her page opens with that exchange. "Two days ago" goes stale, so check it on send day. Alex meets her tomorrow.
- **Copy so far:** `design:ux-copy` and `marketing:draft-content`. Still due: `marketing:brand-review`, the Claude Doc for his edit, and the design critique and accessibility review.
- **The six:** `Addvery Research\GetSales six.json`, only the entries with `confirmed_by_alex: true`. By role: CEO, the growth lead, two co-founders, the Director of Delivery, the Director of BI.
- **Alex's private briefing** (`Decision-maker profiles.md`, the dossiers): keep the "likely objections" off public pages (orchestration). The dossiers' cited sources are the shareable part.

## Deploying

- The tree is clean, so a plain `MSYS_NO_PATHCONV=1 vercel deploy --prod --yes` from `website\` is safe. `.vercelignore` keeps the stakeholder drafts and the brand reference out, and `public\addvery\`, `local\org-diagrams.json` and `local\research\` go up.
- If a subagent leaves half-done files in `app\`, deploy a clean export instead:

  ```bash
  cd "/c/Users/alder/Desktop/Hire me hackaton"; D="$(cygpath -u "$CLAUDE_JOB_DIR")/tmp/clean-deploy"; rm -rf "$D"; mkdir -p "$D"
  git archive --format=tar HEAD:website > "$D.tar" && tar -xf "$D.tar" -C "$D" && rm "$D.tar"
  mkdir -p "$D/.vercel" "$D/public/addvery" "$D/local"; cp website/.vercel/project.json "$D/.vercel/"; cp website/public/addvery/* "$D/public/addvery/"; cp -r website/local/org-diagrams.json website/local/research "$D/local/"
  cd "$D" && MSYS_NO_PATHCONV=1 vercel deploy --prod --yes
  ```

## Clock

- Loop pid 39924 (`pythonw`), restarted at 17:07. On Alex's word (via rig, about 17:05: "minus a full hour off the clock"), `.clock\adjustments.json` (git-ignored) holds `{"seconds": 3600, ...}`, and `clock_sync.py` adds every entry there to the banked time and publishes it as `adjust_seconds`.
- Idle at 17:11 with 6.85 h left.
- S11 stopped, filed and posted. No session is recording right now.

## Settled elsewhere

- From s-d9-legibility's OT-05, approved on defaults at 17:03 (`55d81e5`):
  - **L-01 Q8 = (a):** the orchestration layer shows in the feed as Alex's skill, with no separate section.
  - **Q18 = (a):** posts are framed as "Alex directs and decides, the agents carry out", with no top line, panel or made-by tags.

  Either can change as an easy call.
- s-d9-legibility hands over to a fresh session at about 17:25.

## Build queue and messages

- Nothing in flight.
- Expected:
  - S-D3's three BUILDs (to-do 4);
  - `S-D1-B1`, the scraping page;
  - `addvery-research` per-person material, which goes into the stakeholder Doc, not as BUILDs;
  - S-D9 posts and status updates.
- Information only: the rig's S09 highlights (16:00). The leave-outs at 04:07, 07:14 and 21:09, and the screen share from 21:28 to 22:17, matter less now that public sources are fine, but the screen share is still a screen recording.

## Working notes

- In Git Bash, `export MSYS_NO_PATHCONV=1` before vercel commands. Protected preview URLs: `vercel curl <path> --deployment <url>`.
- Long Python through Bash heredocs breaks on quoting. Write the script to `$CLAUDE_JOB_DIR\tmp` and run it. `python -I` hides PIL, so use plain `python` from the job tmp dir for trusted local files.
- Headless Edge device-width screenshot scripts: `C:\Users\alder\.claude\jobs\b25f14b0\tmp\frontend-scripts\` and `tmp\reskin-scripts\`. These live in the old session's job dir and may be cleaned up; ask the frontend-design skill for a fresh way if they're gone.
- Webcam uploads: `..\OBS\rig\.venv\Scripts\python.exe scripts\upload_webcam.py Sxx <scratch dir>`. **Create the scratch dir first**, or it fails.
- The dev server on :3100 may be running from a subagent. If it's down, start it hidden: `Start-Process cmd.exe -ArgumentList '/c','npx next dev -p 3100' -WorkingDirectory <website> -WindowStyle Hidden`.
