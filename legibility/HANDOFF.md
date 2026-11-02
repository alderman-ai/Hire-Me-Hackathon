# S-D9 handoff — 2 Nov, 17:16 Prague (forking gate G3)

**First, before anything else: start the 30-minute loop.** Run `/loop 30m` with this prompt: "Run the S-D9 30-minute check from legibility\SPEC.md section 7: check ..\OBS\Processed\index.json for sessions filed since the last line of checks.md and read each new one; look at what changed in the project since then (specs, SESSIONS.md, git log, the clock); read the titles in ..\website\content\feed.json so nothing goes up twice; post anything a follower should know (one BUILD S-D9-B<n> at a time, only after the last one is BUILT); log the check in checks.md and commit legibility\. If nothing changed, end the turn straight away." The old loop (cron `d3d4dcf3`) was deleted at 16:52 for orchestration's reset hold, so no old loop is running.

Then read, in order: `CLAUDE.md` (the reading list), `SPEC.md` (the job; the reset-rules block at the top of section 7 overrides the rest), `..\answer-desk\ASKING.md` (the reset rules at its top), `posted.md` and the last ten lines of `checks.md`.

## Where things stand

- **Last check line:** 17:06, on HOLD. The hold ended at 17:13 with orchestration's RESTART.
- **Posts:** P1 to P7 are live. The last, P7 (`S-D9-B7`), went live at **16:49** (website 9a86a97). Nothing is in flight with `website`.
- **Two-hour floor (DoD-20):** the next post must be live by **18:49**. Post a status refresh by about 18:29 even if nothing new is filed.
- **Next post id:** P8, sent as `BUILD S-D9-B8`.
- **Filed sessions covered:** S01 to S09 (see "Sessions covered" in `posted.md`). **S10** (recording since 16:24) and **S11** aren't filed yet. Read them when they are, oldest first.
- **The status board** (feed post `status`) is at as_of 16:45. The rows are in `..\website\content\build.json`. Refresh it with the next post.
- **Feed format:** `..\website\content\feed.json`, newest on top. Kinds: Status, Update, Milestone, Insight, Session, Explainer. Blocks: p, list, quote, highlight, points, video. `website` stores the role tags as `roles` on each post. Also check the feed for posts `website` wrote itself (s06, s08, the lunch and dog-walk breaks, the 8 Insights from S03 to S05) so nothing goes up twice.

## Open clip request

- **CLIP S-D3-C1** isn't sent yet. Since 16:44 it's **Alex's own walkthrough** of the 36 GetSales demo workflows, not a live run: Alex sends the alert to the six by hand. `s-d3-getsales` sends the CLIP once the folder is built and he has recorded it, with the session or times, the cue words and the folder's exact on-screen name (asked at 16:50).
- **No Alex gate any more** (reset rule 2; told S-D3 at 17:14). Cut it with ffmpeg into `clips\` (git-ignored) to SPEC section 7's clip spec. Check one frame every 2 seconds against DoD-22: secrets, the Apify proposal, and his own outbound outside the demo folder. That means cutting his own campaigns, the inbox, other folders and sender settings. Blur any of the six if they appear (Q4 default). Then reply `CLIPPED S-D3-C1: <paths>`. S-D3 places it on the site.
- **Design rule 5** treats caption cards as visual work. Ask orchestration for a design skill (`frontend-design`) before making any.
- **Heads-up:** at 17:14 SendMessage reported **two live sessions named `s-d3-getsales`**. Orchestration has been told. Reply to whichever one sends the CLIP, at its `from` address.

## Gates and pokes

- **OT-05** ("Approve - the plan for the site's build updates") is closed: approved on its defaults at 17:03 by S2, on Alex's word, and archived (55d81e5). The defaults now stand: Q4 blur; Q8 show the orchestration layer in the feed as his skill; Q18 posts framed as "Alex directs and decides, the agents carry out". `website` and `s-d3-getsales` were told at 17:14.
- **No pokes are pending, and no desk question is open** (no `S-D9-Q` was ever asked). Poke only when work is truly blocked, at most every 30 minutes.

## Decisions and rules since 13:48, in short

- **Reset rules (17:00).** These override earlier rules:
  - **Never post:** only DoD-22's three hard exclusions, plus `do-not-post.md`, which is still empty. Public sources may be published. The older "left out" entries in `posted.md` were taste or the old rules, not bans now.
  - **Easy calls:** decide and log them in SPEC section 9.
  - **No 18:00 cut-off.**
- **Copywriting rule (16:40).** Invoke `marketing:draft-content` before writing each post. `design:ux-copy` and `anthropic-skills:docs` are also on since 17:13.
- **Rule 4, Claude Docs:** written work for outside readers is drafted in a Claude Doc. My recommendation for feed posts (decide and log it): draft each post in a Doc after loading the copy skill and then the docs skill, and publish at once without waiting for Alex's comment. If he comments later, send an edit build. If that slows posting below the two-hour floor, keep posts in `posts\` and log why.
- **Approvals (16:36):** a tick approves the file plus whatever its feedback fence holds. That only matters if a gate comes back.
- **Framing (research, W3 and 9.3):** posts lead with Alex's judgment calls and with what broke and how it was handled. Write "Alex decides, the agents carry out", never "the agents take over". Plain words, one point per post. Every number comes from a source.
- **Apify may be named** (DI-6 Q6.3). Anything Alex said near the proposal (S04, 09:23 to 09:31) stays out.
- **Quotes:** take exact times from `segments.jsonl`. A helper script is in the old job's tmp folder; it's simple to rewrite: match the text, then print `video_start` and `wall_start`. The webcam starts about 2.5 s after the screen, so YouTube links use t = screen time minus about 5 s. On YouTube: S01 `mbF291oW_yQ`, S02 `qrBNOsSYGrQ`, S06 `mxorwucznvE`, S08 `MyYnFOQCagc`. Sessions over 15 minutes aren't uploaded.
- **Shell gotcha:** Python heredocs turn `\r`, `\b` and `\f` inside Windows paths into control characters. Use the Edit tool, or `chr(92)`, for backslash paths in `posted.md` and `checks.md`.
- **Git:** commit only `legibility\`, path-limited. If `index.lock` exists, wait and retry; never delete it.

## For the old session

Deleted: the loop `d3d4dcf3`, every poke cron, and the gate Monitor. Orchestration removes the old session id after the "HANDOFF s-d9-legibility" line.
