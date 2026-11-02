# Status: every folder, and the order to finish

As of 20:08, 2 Nov (Prague). Written by `orchestration` from the twelve folder `STATUS.md` files below, after the crash at 19:4x.

## How the work runs now

At 19:58, after the crash, Alex changed course: "we're getting to the point where we're doing a lot of unattended graphic design, which, in my experience, is just not a real thing. Same thing with unattended copywriting."

- Work is finished one item at a time, with Alex attending. Graphic design and copy happen only with him.
- Six sessions run:
  - `orchestration`
  - `orch-site-map`
  - `orch-alex-prep`
  - `orch-briefing`
  - `website`
  - `rig`
- Every other session is paused (see `SESSIONS.md`, "Paused").
- Canva is switched off for every session. That covers the MCP connectors, and a guard stops Chrome from opening canva.com. It's switched on for one folder at a time with `orchestration\CANVA-ON`.
- Graphical work mostly runs with OBS off, because CPU and GPU load caused the crash.

## Every folder

| Folder | Deliverable | Done | What's live, or made | Alex's next step there | Kind |
| --- | --- | --- | --- | --- | --- |
| [`website`](website/STATUS.md) | D8 Website | ~65% | Live: the six stakeholder pages (first version), /about with the LinkedIn wall, /d1, /demos. Built, not live: the personal versions of the six pages, the welcome with the time picker and summary carousel, and the agent track. | Review the six pages, Ivana's first, and confirm three facts | attended copy, ~25 min |
| [`scraping`](scraping/STATUS.md) | D1 Scraping demo, D12 Agent view | ~80% | /d1 and the LinkedIn wall are live. The D12 generator is built (77 files), but nothing is served: /llms.txt returns 404, and there's no toggle. | Decide where the person/agent toggle goes and what it says, then the /d12 copy | attended design and copy, ~35 min |
| [`getsales`](getsales/STATUS.md) | D3 GetSales demo | ~70% | All 36 workflows are built, off, with no leads. Both entries are drafted. | Record demo 1 (~3 min) and demo 2 (~1 min, terminal) from `alex-prep\scenes\getsales-demos.md` | recording, ~10 min |
| [`blog-articles`](blog-articles/STATUS.md) | D5 Two blog articles | ~75% | Three near-final entries, none live | Your last 10% on article 1, article 2 and the taste-capture page (links in its STATUS) | attended copy, ~25 min |
| [`linkedin-content`](linkedin-content/STATUS.md) | D7 LinkedIn demo | ~75% | Live: the LinkedIn entry, /about copy and the /for intro. The "How this site was built" copy and the welcome copy exist but aren't live. | Brand sign-off on the posts Doc. Read the welcome copy before it goes live. | attended copy, ~20 min |
| [`legibility`](legibility/STATUS.md) | D9 Legibility analyzer | ~60% | Feed posts P1 to P10 are live, and S01 to S11 are indexed and cut. The grading page is built (127 moments, `legibility\grading\launch.ps1`), but no grades yet. The day-one story is in a Doc. | Two notes in the day-one Doc; yes or no on screen clips; P11 for S12 to S14; then grading | attended copy, quick, then ~40 min |
| [`research`](research/STATUS.md) | M1 Research | ~90% | 27 reports indexed and on every reader's list. The AI portfolio is on a review page. | Review the AI portfolio (five yellow marks); settle the sabbatical length (nine or six months) | attended copy, ~10 min |
| [`canva-templates`](canva-templates/STATUS.md) | D6 Canva templates | ~60% | Three of five templates are built and locked in Canva. The event teaser is half done, and the carousel isn't started. | Brand sign-off; decide on a Brand Kit; finish the teaser and the carousel, with OBS off | attended design |
| [`canva-video`](canva-video/STATUS.md) | D10 Canva video, D11 Comfy motion | ~30% | The prep is done (scene brief, ideas Doc, two draft entries), but neither video exists | Pick the Comfy ideas (1 and 5 recommended); record the Canva video once the scene sheet's lock step is fixed; do the Comfy work | quick, then recording and attended design |
| [`OBS`](OBS/STATUS.md) | The rig, under D3, D9 and D10 | S01 to S14 done | S01 to S14 are processed, and S01 to S12 are on YouTube. S15 has been recording since 19:56. | `/stop` S15 before setting up the GetSales demos; yes or no on a 720p webcam to cut the load | quick |
| [`site-map`](site-map/STATUS.md) | Scope map (role) | ~10% | The scope map is frozen at 19:02 and contradicts the live site. The DI-11 intake (10 questions) is unanswered. | Nothing yet: `orch-site-map` first brings the map in line with live | — |
| [`alex-prep`](alex-prep/STATUS.md) | Prep (role) | ~20% | The GetSales scene card (one stale rig step), the clip-grading brief and decisions, and "Waiting on you" re-ranked | Nothing new: its items are in the finish list below | — |
| [`blog-pipeline`](blog-pipeline/STATUS.md) | D4 (retired) | — | Tooling only, used by the others | — | — |

These need no step from Alex:
- `answer-desk`, `watcher` and `bootstrap` are infrastructure, and are paused or finished.
- `briefing` is `orch-briefing`'s folder.
- `Addvery Research\` is Alex's own private folder.

## The finish list, in order

The deadline is tomorrow's meeting with Addvery, plus the six connection notes Alex sends by hand in the morning, so the six pages and what they link to come first. Each step has an owner session, and it's always one at a time.

1. **The six stakeholder pages.**
   - Review Ivana's page first, then the other five.
   - Confirm three facts: "nine months building with Claude Code", "freelanced for ten years" and "came up through B2B marketing".
   - Settle the sabbatical length.
   - Then `website` deploys the personal versions.
   - Attended copy, ~30 min, with `orch-alex-prep`.
2. **The welcome at the top of `/`.** Read the welcome and its four time paths, then `website` deploys them. Attended copy, ~10 min.
3. **GetSales demos 1 and 2.**
   - `/stop` S15 first.
   - Record both, then write the two transcript summaries together.
   - Then `website` publishes both entries.
   - Recording ~10 min, then attended copy ~15 min.
4. **Articles 1 and 2, and the taste-capture page.** Your last 10% on each, then `website` publishes them. Attended copy, ~25 min.
5. **AI portfolio.** Review it, then `website` builds it into /about. Attended copy, ~10 min.
6. **Brand sign-offs** on the LinkedIn posts and on the Canva templates. Quick, ~15 min.
7. **Legibility.**
   - Two notes in the day-one Doc.
   - Yes or no on the screen clips.
   - P11 for S12 to S14.
   - Attended copy, ~20 min.
8. **Agent view (D12).** Decide where the toggle goes and what it says, and write the /d12 copy. Then `website` serves the track and /llms.txt. Attended design and copy, ~35 min.
9. **Clip grading.** All 127 moments, then the top 30 into Notion with your notes, then the rubric. ~40 min at 2x, and can be recorded.
10. **Canva and Comfy**, with OBS off and Canva switched on for one folder:
    - Finish the teaser and the carousel (attended design).
    - Record the Canva video, once its sheet is fixed.
    - Pick the Comfy ideas and do the Comfy work.
11. **Quick calls, any time:**
    - the meeting time
    - the clean-up of two old public repos
    - the stray artifact
    - the three LinkedIn posts left off the wall
    - a Canva Brand Kit
    - the YouTube test video
    - Windows Update

## Found in the pass, to fix along the way

- **Doc comments reach nobody now.** Each Claude Doc's comments go only to the session that made it, and those sessions are paused. When Alex finishes a Doc, he says so in chat, and the session he's working with reads it.
- **Fixed 20:14 (`website`):** the clip upload is 13 of 13, and both late ids are in `website\content\clips.json` (00e21ae). Still open: one grading clip (S09-h2) failed to cut.
- **Fixed 20:14 (`website`):** `website\HANDOFF.md`'s deploy steps now carry /about's images and text and keep the welcome off; the export was dry-run with no deploy (f9e6ca7).
- **The feed's last post went live at 18:25,** so DoD-20's two-hour gap opened at 20:25.
- **Scene sheet, step 10** (the Canva video) says "Lock position only", which doesn't work in Canva. `canva-video\site\d10.md` repeats it.
- **/privacy is live but was never approved.**
- **The scope map says /about and /demos are missing,** and both are live.
- **DoD-15 still says "from a 15-minute dictation",** but the articles were written from his transcripts. The charter wording needs one change.
- **The moment counts disagree** across the records: 106, 109, 124 and 127.
