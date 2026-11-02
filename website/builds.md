# Website build log

Every build request and its reply (SPEC.md §7): who asked, what changed, the reply and the commit. Newest at the bottom. Ids: a spec's requests are `<spec id>-B<n>`; S-D9's `P1` to `P4` count as `S-D9-B1` to `S-D9-B4`. Alex's direct requests and the session's own additions have no id.

| Time | Id | Asker | What changed | Reply | Commit |
| --- | --- | --- | --- | --- | --- |
| 12:46 | — | Alex (direct) | S02 webcam uploaded to YouTube (`qrBNOsSYGrQ`) and featured, with an H1 summary and four paragraphs under it. | BUILT | `2b25d69` (committed by orchestration) |
| 12:46 | — | Alex (direct) | The S02 embed starts at 62 s, just after "hey Claude, starting now". | BUILT | `2b25d69` |
| 13:50 | S-D9-B1 (P1) | s-d9-legibility | "What's being built today": intro, how it runs, tooling and demo tables with statuses, two pull quotes. | BUILT | `e07e790` |
| 13:52 | S-D9-B2 (P2) | s-d9-legibility | "The story so far" timeline, S01 to bootstrap done; P1 statuses to 13:51. S06 webcam uploaded (`mxorwucznvE`) for its quote link. | BUILT | `0f7cc51` |
| 14:18 | — | Alex (direct) | The site becomes a live feed, newest on top. S06 update post with a summary above its video. Charter and S0 to S2 specs at `/docs`, redacted by `scripts\sync_docs.py`. | BUILT | `bfd8a4e` |
| 14:18 | S-D9-B3 (P3) | s-d9-legibility | Milestones "The finish line is defined" (14:02) and "Research gets its first lists" (14:10); status board to 14:15. Built into the feed. | BUILT | `bfd8a4e` |
| 14:18 | — | website | Eight Insight posts from the S03 to S05 transcripts, found by a subagent, every quote checked against its transcript. | — | `bfd8a4e` |
| 14:29 | C03 | orchestration | Charter and specs re-synced for DoD-1 to DoD-22, with DoD-13 and DoD-22 redacted. | BUILT | `5d9edb3` |
| 14:45 | S-D9-B4 (P4) | s-d9-legibility | "Alex builds himself a control room" (S07), "API keys never move on camera", "Every demo has a plan"; status board to 14:45, demo 1 renamed to name the Apify API (Alex's DI-6 Q6.3 "yes"). New `points` block. | BUILT | `9314fec` |
| 14:49 | — | Alex (direct) | "Lunch break, 14:25 to 15:00" with a photo of the setup. Unblurred on Alex's word ("don't blur any text … It's on purpose"); GPS and camera metadata stripped. New `image` block. | BUILT | `9ef53a3` |
| 15:00 | S-D3-B3 | s-d3-getsales | Link preview card: `openGraph` and `twitter` tags in `app\layout.tsx` (title, description, url, `metadataBase` set to the production alias) and a static `app\opengraph-image.png`, 1200x630, in the site's look, with no names. `/privacy` from `getsales\site\privacy.md`, first comment line dropped, URL-only and `noindex`. | BUILT | see git log |
| 15:00 | — | Alex (direct, relayed by the previous `website` session; answers website-Q4 with (a)) | "turn on analytics of this site pls": Vercel Web Analytics enabled for `hire-me-hackathon` (`vercel project web-analytics`), `@vercel/analytics` 2.0.1 with `<Analytics />` in `app\layout.tsx`. | BUILT | see git log |
| 15:02 | S-D3-B4 | s-d3-getsales | `/privacy` re-copied from `getsales\site\privacy.md`: the Vercel line now discloses aggregate, cookieless visit counting. Still unlinked and `noindex`. | BUILT | see git log |
| 15:15 | S-D9-B5 (P5) | s-d9-legibility | Milestone "The research is in" (14:59, points block) and Update "Agents hand over before they get tired" (15:00), with role tags; status board to 15:15 with six rows changed (Research, Apify scraping, GetSales, Blog pipeline, This website, Legibility analyzer). | BUILT | see git log |
| 15:21 | — | Alex (direct, relayed by `rig` with /process: "this whole session should be uplaoded and posted in full on the website"; "webcam") | S08 webcam (8 min) uploaded unlisted (`MyYnFOQCagc`) and posted in full as the Update "Back from lunch: what runs without him" (15:07), from 0:00, with a summary and one quote checked against the transcript. | BUILT | see git log |
