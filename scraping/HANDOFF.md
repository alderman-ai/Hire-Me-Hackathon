# S-D1 handoff: 2 Nov 17:17 Prague

From the first `s-d1-scraping` session (fork gate F2: context about half full, and `orchestration` said "HAND OFF NOW" at 17:13). Read this, then SPEC.md §1–§9, and **the reset rules at the top of `..\answer-desk\ASKING.md` (1dc71fc)**, which override the older rules in SPEC.md wherever they clash.

## The reset rules that change how you work (Alex, 17:00)

- **Easy calls are yours:** decide, log it in SPEC.md §9, and carry on. No plan approvals. Pokes only when work is blocked, at most every 30 minutes. **There's no 18:00 cut-off:** Alex works through the night.
- **Public sources are fine to publish**, names included (DoD-22 narrowed, b5cb6fd). Only secrets, the Apify proposal and his own outbound stay off.
- **Copy needs a copywriting skill, and design needs a design skill.** `orchestration` has switched on `marketing:draft-content` and `anthropic-skills:docs` for this session. Invoke `frontend-design` first for the page and carousel design, then `design:design-critique` (and `design:accessibility-review`) before it ships. Brand: `..\website\local\addvery\brand\BRAND.md` and `tokens.css` (git-ignored, so read from disk); the site tokens are in `..\website\app\addvery-tokens.css`.
- **Written work goes into Claude Docs** (rule 4). Alex has already signed this page off, below, so a Doc is only needed if a new copy change needs his edit.

## Where every step stands (SPEC.md §7)

| Step | State |
| --- | --- |
| 1–3 Reading list, RESEARCH line, groundwork | Done: `.gitignore` (draft/), `check_summary.py`, `site\frame.md`. |
| 4 S-D1-Q1 | Answered 14:58: summary at `..\Addvery Research\Scraping summary.md`, through the agent request `Agent request - scraping summary for the site.md` (S-D1-R1), completed agent-to-agent with `addvery-research`. |
| 5 OUTPUT line | Done; applied as C08 plus follow-ons. **DoD-9 is met.** |
| Summary | Found and final: `SUMMARY READY S-D1-R1`, check FOUND at 16:26. |
| 6 Plan gate (OT-06) | Superseded by OT-12, and archived by S2 (55d81e5). Nothing to do. |
| 7 Draft | `draft\d1.md` (git-ignored), SHA-256 0961c7fe33df: cold-read, copy-passed under `marketing:draft-content`, with Alex's 16:41 changes applied. Fill and cold-read briefs: see SPEC.md §7. |
| 8 Section sign-off (OT-12) | **Answered by Alex**, below. Marked Answered in the file (0bb061d). |
| 9 Publish and BUILD | **Next: yours.** |
| 10–11 Screen care, DONE | After BUILT. |

No desk question is open. The last poke was at 16:16 (OT-06). No `BUILD` is in flight.

## Alex's answer on the page (OT-12 feedback section, committed 17:14; box unticked)

> Yeah that's fine. This should be basically one page, framed. Imagine if every pitch started with a briefing like this // Then include the artifacts created in the Addvery research subdirectory. You can make a carousel of them maybe or probably a carousel is best so it doesn't eat up so much space. The rest of the stuff is fine but put the actual artifacts that were created first as a carousel with that headline. Then you can put the more boring disclaimer stuff and everything you wrote after that

`orchestration` (17:2x) reads this as **approval with changes, applied with no second approval**. It also answers DI-10 Q10.6 in `..\Operator tasks\Decide - everything left that needs you.md`. Its concrete reading:
1. One framed page, with the headline **"Imagine if every pitch started with a briefing like this"**.
2. Then a **carousel of the actual artifacts** made in `..\Addvery Research\`: the canvas pages in `canvas\project\` (`Main.dc.html`, `OrgChart.dc.html`, `Capabilities.dc.html`, `Activity.dc.html`, plus `canvas.json`), and anything else visual there, as images or embeds. The company-level docs in `for-site\` (00 to 06) are already going onto /d2 through `addvery-research-B2`.
3. Then the rest of the page as it stands: the result, the method, "Show me how", and the disclaimers last.

## Your next steps

1. **Coordinate the artifact exports.** Ask `addvery-research` (it owns the folder) for renders or exports of the canvas pages fit for a carousel. Ask `website` how it wants carousel items delivered (images in its `public\` or git-ignored `local\` folder, or embeds), since it already hosts the research docs on /d2. Keep it to one message each.
2. **Revise `draft\d1.md`** under `frontend-design` (structure) and `marketing:draft-content` (any copy):
   - the new H1;
   - a `<!-- block: carousel -->` listing each artifact, with a one-line caption and its source path;
   - then the existing content.
   - The old title and subheadline can become the intro under the headline; keep the closing lines and disclaimers at the end.
   - Run `design:design-critique` on the result.
   - Log the decisions in §9.
3. **Publish:** copy it to `site\d1.md` and commit, path-limited. The page may now carry what his answer allows. Send `website`: `BUILD S-D1-B1: add the D1 page at /d1, linked from demo 1 in "What's being built today" and announced by one feed post: headline, then a carousel of the research artifacts (sources listed in the content file), then the result, three steps, a closed "Show me how" toggle and the closing lines. Build in the Addvery brand; block types are in HTML comments; link /d2 and /d3 only if live. Content: scraping\site\d1.md, plus the artifact exports named in it. Source: Alex's Apify scraping and research of Addvery (Scraping summary.md, agent request S-D1-R1). Approved: Approve - what the scraping demo section shows.md, Alex's answer in its feedback section at 17:14, verbatim: "<quote it in full>".` One request at a time; on REFUSED, fix it and send S-D1-B2.
4. **Close the task:** send `answer-desk` `TASK DONE S-D1: Approve - what the scraping demo section shows.md`. Send `orchestration` `ARCHIVE Approve - what the scraping demo section shows.md: readers S-D1, S-D8`.
5. **On `BUILT S-D1-B1`:** do step 10's screen care, then send `orchestration` `DONE S-D1: D1 page live (BUILT S-D1-B1, approved in Approve - what the scraping demo section shows.md); Alex's research outputs named for readers (OUTPUT line, C08)`. Then stay up for readers until `orchestration` says stop.

## People and their state

- `addvery-research`: Alex's research session in `..\Addvery Research\`. It completed S-D1-R1, owns every artifact, and sends `website` the /d2 builds (B1 org charts, B2 the for-site docs). It is happy to be messaged directly.
- `website`: handed off at 17:27 to a fresh session under the same name, which is waiting for BUILD S-D1-B1. Rebuilt and reskinned to Addvery. /d2 is live ("Alex's research on the company"). The reader is Addvery's growth lead; her context is in `website`'s message at 16:43 (summarised in SPEC.md §9, 16:45).
- `orchestration`: handed off at 16:44. Relays Alex's answers.
- The summary watcher and gate monitors are all stopped. Nothing is polling.

## Decisions since launch

All are in SPEC.md §9, from 14:58 to 17:14. The material ones:
- the result-first frame after L-01;
- the LinkedIn rows combined into one truthful row;
- the labelling-model line left out, and offered back to Alex at OT-12;
- OT-06 folded into OT-12;
- Alex's 16:41 changes, made by the session that owns each one.
