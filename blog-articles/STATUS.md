# blog-articles: status
As of 20:02, 2 Nov (Prague), written from the folder's own records after the 19:4x crash.

## Where it fits in the plan

**Deliverable:** D5, Two blog articles (spec row S-D5). Session `s-d5-blog-articles`. It also owns the retired D4 kit in `..\blog-pipeline\`. A third entry, the taste-capture article, is tagged `deliverable: "d7"`, so it doesn't count toward D5.

**DoD items it claims**

| Id | What it says | State | Evidence |
| --- | --- | --- | --- |
| DoD-15 | Two posts, each from a 15-minute dictation and finished by Alex, are published on the site. | Not met | Neither post is live. `website\content\demos\` holds only samples and the LinkedIn entry. Both posts wait in Docs for Alex's last 10%. Neither came from a dictation: both were compiled from his rig transcripts and typed words (SPEC §9, Alex's instruction of about 18:15). |
| DoD-14 | (Retired.) Fifteen minutes of dictation turns into a near-final post. | Retired | Charter C12. Not checked. |

**DoD items it serves, without claiming them** (its own SPEC §2): DoD-19, because the GTM demos list grows through the day. DoD-22, because every draft passed `scan.py` before commit ("scan pass" in 8babe9e and f3feb55). The taste-capture entry may feed S-D7's DoD-17. That's unclear, and S-D7's records own it.

**It depends on**
- S1's L-03 findings. Complete: the synthesis, R6 and R7 were all in by about 17:35.
- `website` (S-D8), for the entry template and for publishing. BUILD S-D5-B1 (the shared `/demos` template) and B2 (clips, quotes, figures) are BUILT.
- The kit in `..\blog-pipeline\` (PIPELINE v1, POST-FORMAT v1.5).
- Alex's recorded words: rig transcripts S01 to S11, compiled locally.

**What depends on it**
- `website`: the three `/demos/<slug>` entries. `/about` holds an `ARTICLE-2-LINK` placeholder for article 2. The paragraph stays hidden until the link is filled (`website\app\about\copy.ts`).
- S-D7's About-me short version links to article 2 (linkedin-content SPEC, 18:06 row).
- S-D9 was to get dictation clock times as clip candidates. That's moot, because no dictation was recorded.

## What it was trying to do

Turn two of Alex's topics into two near-final blog posts in his voice, for Addvery's audience, and publish them in the site's GTM demos list. Article 1 makes the point that "there's no such thing as building something like an AI workflow as a product. It's always a managed service because the models always change." Article 2 argues that "GTM engineers who focus AI on their pipeline are actually the ones that are helping companies keep their promise" to grow the whole team rather than cut half of it. Both topics are verbatim from his OT-04 note.

Each post was meant to come from about 15 minutes of dictation. At about 18:15 Alex changed that: "I've given you the transcripts. They are a treasure trove ... You can pull lots of quotes." His last 10% happens in a Claude Doc, and his comment there is the sign-off. Alex also added a third entry, his taste-capture method, "adapt that to their brand as one piece of content ... a little bit more bloggy".

## What's been made

| Item | Where | State |
| --- | --- | --- |
| Spec and decision log (rows up to 18:55) | `blog-articles\SPEC.md` (964175f) | done |
| Handoff at gate F2 (ids, readback steps, publish steps) | `blog-articles\HANDOFF.md` (2563424, 19:01) | done |
| Article 1 research base | `briefs\A-01-base.md` (be9b1f6) | done |
| Article 2 outline (superseded by its base) | `briefs\A-02-outline.md` (ef2ae6a) | done |
| Article 2 research base | `briefs\A-02-base.md` (c486210) | done |
| Dictation Doc 1 | https://claude.ai/artifact/3jZqfh9wfu8whexxYsxJQH | done. Optional, never recorded, withdrawn from the desk at 18:09. |
| Dictation Doc 2 | https://claude.ai/artifact/B1CssS1w8S18ZvxhYypsFL | done. Optional, never recorded, withdrawn from the desk at 18:09. |
| Compiled sources (his words per article) | `local\sources\A-01.md`, `A-02.md` (git-ignored) | done |
| Stage files, 8 per article plus `post.md` | `local\drafts\A-01\`, `local\drafts\A-02\` (git-ignored) | done |
| Article 1 near-final, "AI workflows are always a managed service" | `drafts\A-01\post.md` (8babe9e, 18:49) | draft. Near-final, 5 `[Alex: ...]` notes open, 5 block quotes, a `[!diagram] scale`, validates with 0 failures. |
| Article 1 finish Doc | https://claude.ai/artifact/6dbQjnECpGbtQw54cHhJMp | draft. Sent at rev 4 about 18:50, waiting on Alex. |
| Article 2 near-final, "If AI won't replace half your team, put it in your pipeline" | `drafts\A-02\post.md` (f3feb55, 18:47) | draft. Near-final, 5 notes open, 4 block quotes, validates with 0 failures. |
| Article 2 finish Doc | https://claude.ai/artifact/17rFReWZZesyLe94msLskk | draft. Sent at rev 4 about 18:48, waiting on Alex. |
| Doc readbacks taken by the successor | `local\docs\A-01-rev4.export.md`, `A-02-rev4.export.md` (19:08, git-ignored) | done. Both still show rev 4 with all five notes unfilled. |
| Doc and review-page index, readback mapping | `local\docs\DOCS.md` (git-ignored) | done |
| Taste-capture entry, "How to refine AI slop into AI ops" (showcase, d7) | `posts\03-how-to-refine-ai-slop-into-ai-ops.md` (0d333b9, 18:26) | draft. Near-final, validates with 0 failures, 0 warnings. |
| Its figures (2 PNG, 3 SVG) | `posts\assets\how-to-refine-ai-slop-into-ai-ops\` | done |
| Taste-capture review page | https://claude.ai/artifact/PkSgwgetjps3sVoNST26ma (built from `local\taste\review-pub\`, 7 images) | draft. Waiting on Alex since 18:26. |
| Taste-capture working files: 5 source SVGs, 13 PNGs from his demo, 2 build scripts, a preview | `local\taste\` (git-ignored) | done |
| Visuals plan, slot budgets, image text, review fixes | `VISUALS.md` (9d53496) | done |
| Six LinkedIn companion images (post, link card and diagram card per article), contact sheet, 4 stress renders | `local\visuals\out\` (git-ignored, 11 PNGs) | draft. Local mockups, made unattended at about 17:37. Their text predates the finished posts. |
| Visuals kit: 4 templates, slot map, 2 coded backdrops, content JSON, render tool, fonts | `local\visuals\` (git-ignored) | done |
| ComfyUI backdrops | `local\visuals\backdrops\comfy\` (empty) | planned only. Dropped at 17:13: no paid Comfy run. |
| Site template for entries (website's B1, B2) | https://hire-me-hackathon.vercel.app/demos | live (the index). No S-D5 entry on it yet. |
| `TOPICS.md` | `blog-articles\` | planned only. Never made. |
| Captured dictations | `dictations\A-0n.md` | planned only. No dictation was recorded. |
| Finished posts 1 and 2 | `posts\01-<slug>.md`, `posts\02-<slug>.md` | planned only |
| Publish log | `PUBLISHED.md` | planned only |
| Three live entries | `/demos/ai-workflows-are-always-a-managed-service`, `/demos/if-ai-wont-replace-half-your-team-put-it-in-your-pipeline`, `/demos/how-to-refine-ai-slop-into-ai-ops` | planned only. Not live. |

## How far along

About 75%. All three entries are near-final and the site's template is built. What's missing is Alex's last 10% on each, then readback and publishing, which are mechanical.

"Done" here means both articles finished by Alex and live at `/demos/<slug>`, each checked after BUILT (DoD-15), and the taste-capture entry live too. The companion images are extra.

## What's left for Alex

1. **Article 1, your last 10%** (attended copy). In https://claude.ai/artifact/6dbQjnECpGbtQw54cHhJMp:
   - Fill the five bold notes: did your method beat out-of-the-box; one company workflow a model update broke; what one workflow costs to run; the slider's order; signs of which rung a company is on.
   - Pick the title and opening.
   - Read the sceptical-reader marks on top.
   - Say "approved".

   About 10 minutes by the records. Aimed at near-final before the Ivana meeting.
2. **Article 2, your last 10%** (attended copy). In https://claude.ai/artifact/17rFReWZZesyLe94msLskk:
   - Fill the five bold notes: a worked pipeline example; one upskilling example; a real pipeline result; whether "the people set the limit" is true; what makes the ROI real now.
   - Confirm the title. The records give it two names (see risks).
   - Say "approved".

   About 10 minutes.
3. **Taste-capture review** (quick, or attended copy if you want changes). In https://claude.ai/artifact/PkSgwgetjps3sVoNST26ma:
   - Say "approved", or give your changes.
   - Decide two open points: whether "AI ops" could be misread as AIOps, and whether to keep the link to your public taste-capture repo.

   About 5 minutes.
4. **LinkedIn companion images** (attended design). Look at `blog-articles\local\visuals\out\contact-sheet.png` and the "Open points for Alex" in `VISUALS.md`. Pick the backdrop and say where the images go (Canva, LinkedIn posts or the site). Then rework their text from the finished posts. Two known gaps: the teasers' lower half is empty glow, and article 2's image text uses an older framing. The records give no time.
5. **Humanizer plugin, yes or no** (quick). For the edit stage. The records say it "waits for the morning".
6. **A dictation, only if you want one** (recording). Dictation Docs: https://claude.ai/artifact/3jZqfh9wfu8whexxYsxJQH and https://claude.ai/artifact/B1CssS1w8S18ZvxhYypsFL. About 15 minutes each. Both are marked optional; a new dictation gets folded into its post.

## What's left for an assistant

1. With Alex at hand, read both Docs and the review page for any comment he left after 19:09. Comments went to sessions that are now dead. Steps: `HANDOFF.md`, "First: watch Alex's three reviews".
2. On each sign-off, read the Doc back from "The post starts below this line" and map it to POST-FORMAT v1.5. Write `posts\0n-<slug>.md` with `status: "published"`, the date and `share_changed_by_alex` from `counts.py --changed`. Then run `validate.py` (it must exit 0) and `scan.py`, and commit. Steps: `HANDOFF.md`, "On each sign-off", steps 2 and 3, and `local\docs\DOCS.md`.
3. Publish. Copy each posts file unchanged to `website\content\demos\<slug>.md`. For the taste-capture entry, also copy its assets to `website\public\demos-assets\<slug>\`. The next build number is S-D5-B3. Steps: `HANDOFF.md` step 4, and `website\HANDOFF.md` under "Incoming BUILDs".
4. Once article 2 is live, replace `ARTICLE-2-LINK` in `website\local\about\about-me.md` and in linkedin-content's About-me source. Where: `website\HANDOFF.md`, the `/about` line.
5. Curl each live page's head (its own og:title, og:url and og:image) before any link is shared. Where: `HANDOFF.md` step 4, SPEC §7 step 6.
6. Write `PUBLISHED.md` with each entry's URL, build time, runbook version and share changed. Where: SPEC §3 outputs.
7. If Alex asks for taste-capture changes, edit `posts\03-...md` or the figures. Rebuild with `local\taste\tools\build_figures.py` and `build_review.py --linked`, then republish to the same artifact URL. On the preview, check the flow diagram's step padding, which a website CSS rule overrides. Where: `HANDOFF.md` step 5.
8. After Alex's attended design pass, re-render the companion images with `node blog-articles\local\visuals\tools\render.mjs`. Where: `VISUALS.md`, "Re-render".
9. Close out:
   - Move the `s-d5-blog-articles` row in `SESSIONS.md` to Finished.
   - Fix the stale text: `CLAUDE.md` and SPEC §2 still say "three"; SPEC §5 calls `TOPICS.md` done, but the file doesn't exist.

   Where: `HANDOFF.md` step 6.

## Open questions and risks

- **Nothing is live.** DoD-15 stays unmet until Alex finishes both articles and they're published.
- **Comments may be lost.** Doc comments reach only the session that made the Doc (5b465de8), which has stopped. Its successor, 55e56cc0, took over at about 19:05 and armed its checks. The last briefing snapshot is from 19:09. Whether Alex commented between 19:09 and the crash is unclear.
- **Half-done at the crash.** At 19:06 the successor's readback subagent was running. Its only trace is the two git-ignored exports at 19:08, and no commit followed 2563424 (19:01). Both folders' git status is clean.
- **DoD-15's wording no longer fits.** The charter still says "each from a 15-minute dictation". No dictation was recorded: both posts come from compiled transcripts, on Alex's own instruction. Each post's "made" box describes the compiled source. The charter row may need an S2 change, or a note that the instruction covers it.
- **Article 2 has two titles.** The Doc, the draft and `Open tasks.md` call it "If AI won't replace half your team, put it in your pipeline". `orchestration\HANDOFF.md` (18:47) calls it "GTM engineers and the AI jobs promise". Its kicker is "The AI jobs promise". The Doc's own title is the current one.
- **Article 1's "made" box doesn't add up.** It says `dictated: 10:31` with `rig_session: "S03"`, but S03 started at 11:25, and the Doc says "mostly the 11:25 session". Check this before publishing.
- **Times in the records are off.** SPEC §9 rows logged between 17:50 and 18:55 ran ahead by up to about 1.5 hours, as its own clock note says. The rows timed 19:00 to 19:10 were committed at 18:09. Alex's transcripts instruction, logged as "about 18:15", must have come before 18:09, when the desk withdrew the dictations. Article 1 reached the desk at 18:50, not the SPEC's 18:55. PIPELINE v1 says "~19:30" but was committed at 18:42.
- **The taste-capture entry isn't D5.** It's tagged d7, and the desk line calls it "part of the LinkedIn content demo". Whether S-D7 counts it toward DoD-17 is unclear.
- **The companion images need an attended redo.** They were made unattended, under the frontend-design skill read from its SKILL.md file, and Alex now says unattended design "is just not a real thing".
- **A stale flag.** The briefing flags still list the 17:58 dictation-1 poke, which was withdrawn at 18:09.
- **Dates still open.** Article 1 is aimed at before the Ivana meeting tomorrow, and the meeting time isn't set yet. "Search basics" and the humanizer both wait for the morning.

## Sources

- `blog-articles\CLAUDE.md`, `SPEC.md`, `HANDOFF.md`, `VISUALS.md`, `.gitignore`, `briefs\*`, `drafts\A-01\post.md`, `drafts\A-02\post.md`, `posts\03-how-to-refine-ai-slop-into-ai-ops.md`
- `blog-articles\local\docs\DOCS.md` and the two rev-4 exports (headers and note lines only); `local\` folder listings, counted
- `..\blog-pipeline\PIPELINE.md`, `POST-FORMAT.md`, `scripts\validate.py` (run read-only on the three entries)
- `..\CHARTER.md`: D4 and D5 rows, DoD-14 and DoD-15, the Spec outline and the Run order
- `..\SESSIONS.md` (the s-d5 and s-d4 rows); `..\answer-desk\queue.md` (the S-D5 TASK and POKE entries); `..\Open tasks.md` (status lines only)
- `..\orchestration\HANDOFF.md`; `..\website\HANDOFF.md`, `..\website\builds.md`, `..\website\app\about\copy.ts`; `..\linkedin-content\SPEC.md` (the 18:06 row); `..\briefing\data\latest.json` and `events.md` (S-D5 entries up to 19:09); `..\OBS\Processed\index.json` (session start times)
- Commits: 2563424, 964175f, 8babe9e, f3feb55, bacedbd, 0d333b9, ec22205, 491f1eb, 9d53496, c486210, be9b1f6, ef2ae6a, 4a776ee, cb5a1c5 (roster), and `git log` for both folders
