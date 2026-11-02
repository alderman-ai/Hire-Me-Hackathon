# Handoff: website (S-D8)

Last updated 2 Nov, 15:12 Prague, by the session that took over at 14:53 (gate F3). Not a fork yet: this is the running state, kept current so a crash or the next fork (F2 at about 17:50) starts clean. Read CLAUDE.md first, then this file, then SPEC.md.

## State of the site

- **Live:** https://hire-me-hackathon.vercel.app, last production deploy 15:02 (`a2b54e1`). Home page: title, countdown, "start here" box (S02 explainer, charter and S0 to S2 specs at `/docs/<slug>`), then the live feed (`content\feed.json`, 23 posts, status board as of 14:45).
- **Preview card** (S-D3-B3, 15:00): `openGraph`/`twitter` tags in `app\layout.tsx` with `metadataBase` = the production alias, and a static `app\opengraph-image.png` (1200x630 RGB) plus `opengraph-image.alt.txt`. In preview deploys `og:image` points at the deployment URL (Next's own behaviour); in production it's the alias.
- **`/privacy`** (S-D3-B3, B4): `app\privacy\page.tsx` renders `content\privacy.md`, copied from `getsales\site\privacy.md` minus its first comment line. Unlinked and `noindex` until Alex ticks S-D3's pre-send gate. S-D3 will send a BUILD for a footer link and an alert-visitor panel after that.
- **Web Analytics** on since 15:00 (Alex: "turn on analytics of this site pls", closing website-Q4). `@vercel/analytics` 2.0.1, `<Analytics />` in the layout. Counts: `vercel api "/v1/query/web-analytics/visits/count?projectId=prj_rT9kFM97a02ouvSsMrZZRYqJi4jo&teamId=team_m6QeC9FHcO8dk7PvEHtfkAod&since=2026-11-02T00:00:00.000Z&until=2026-11-03T00:00:00.000Z"` (the Vercel MCP returns "not found" for this team). 0 views at 15:08; a headless load didn't register.
- **Verified:** a file in git-ignored `local\` reaches the deploy upload (preview `dpl_5NakubbYg5HDnfNTqdpXJ8kTzAvK` listed `/src/local/deploy-probe.txt`; probe deleted). Step 1 is complete.
- Videos, docs and photo are unchanged from the 14:55 handoff (S01, S02, S06 on YouTube; S03 to S05 and S07 over the 15-minute cap).

## S-D8 progress (SPEC.md §7)

- Steps 1 and 2 done. Step 5 done at 15:05 (`45fc691`): the method revised on L-01. §6 "Findings" routes every S-D8 recommendation and question, §7 carries the "(L-01)" revisions and the coherency check, §9 has eight new rows, and Appendix A (the held intake) now has seven questions.
- **Step 6, spec-draft gate open:** `Operator tasks\Approve - the plan for the website.md`, OT-07, committed `589a798`. TASK line sent 15:08, and the desk said "task shown". Monitor `bn7agu954` checks every 5 min and prints "POKE DUE" every 15 min. First poke is due about 15:24 (`POKE website: waiting on you for Approve - the plan for the website, the website's plan`). On APPROVED or CHANGES: apply, send `TASK DONE website: Approve - the plan for the website.md` to `answer-desk` and `ARCHIVE Approve - the plan for the website.md: readers website` to `orchestration`. From 18:00, proceed on the plan as written and log it in §9.
- **Appendix A release:** when `..\Addvery Research\` has the six confirmed or the brand capture, or Alex says he's done. `wave2-specs` releases it while it runs, otherwise this session. Monitor `b7bp854u4` watches the folder's file list every 5 min (skipping `secrets\` and `.claude\`). At 15:10 it held only `CLAUDE.md` and `Research Addvery Spec.md`.
- **Part 2** waits for orchestration's part 2 line.
- **L-06** (S1's website list) waits on Alex's OT-03. If it reports, rerun step 5 for it and refresh the OT-07 snapshot.

## Build queue

- Nothing in flight. Last BUILT: S-D3-B4 at 15:02.
- Expected: S-D3's footer link plus visitor panel after the pre-send gate; `S-D1-B1` (the D1 page) after Alex approves its plan (OT-06, "Approve - the scraping demo plan"); S-D9 status updates.
- `s-d9-legibility` holds L-01 Q8 and Q18 in its OT-05 and will pass the answers on. Don't ask them.

## Processes

- **Clock loop:** pid 27164 (`pythonw`), alive. S08 started recording at about 15:07; published "recording S08, 9.10 h left" at 15:07:34 and replied to `rig`.
- **Dev server:** something answers on :3100 (a restart at 14:59 hit EADDRINUSE, and `netstat` doesn't show the owner). It serves the current code, including `@vercel/analytics`. If it stops, start it hidden: `Start-Process cmd.exe -ArgumentList '/c','npx next dev -p 3100' -WorkingDirectory <website> -WindowStyle Hidden`.
- **No stakeholder preview** is running.

## Decisions since 14:55

All are in SPEC.md §9 (15:00 to 15:05 rows): analytics aggregate-only; the card as a static PNG with no times or names; the L-01 method revisions; Q15 Hobby stays; Q20 needs no question; Q23 no cold read unless Alex names readers; the question routing; the gate goes out on L-01 alone.

## Working notes

- In Git Bash, `export MSYS_NO_PATHCONV=1` before vercel commands with `/paths`.
- Protected preview URLs: `vercel curl <path> --deployment <url>` bypasses the login. The Vercel MCP can't (403 for this team).
- Headless Edge screenshots: `msedge --headless=new --screenshot=… --window-size=W,H --virtual-time-budget=8000 http://localhost:3100/`.
- Long multi-line Python through Bash heredocs can break on quoting. Write the script to `$CLAUDE_JOB_DIR\tmp` and run it.
