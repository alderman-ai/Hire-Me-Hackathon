# S-D5 handoff, 2 Nov 17:15 Prague

From session 1bffb92f (launched 16:41, groundwork only) to the fresh `s-d5-blog-articles`. Why: `orchestration`'s RESTART at 17:13 asked for a handoff first, so the new session loads `frontend-design` and the Claude Docs connector.

## Read first, in this order
1. `CLAUDE.md`, then the **reset rules at the top of `..\answer-desk\ASKING.md`** (Alex, 17:00). They override older text in `SPEC.md`: easy calls are yours (decide and log), no intakes or plan approvals go to Alex, public sources are fine, written work goes in Claude Docs, design work needs a design skill, and one brand source for visuals. Pokes only when blocked, at most every 30 minutes. No 18:00 cut-off.
2. `SPEC.md`: §1a (Alex's OT-04 decisions, verbatim), §7a (the visuals plan) and §9 (decision log). Parts of §1, §6 to §8 and Appendix A predate the reset and S-D4's retirement; the to-do below says what to change.
3. This file.

## What orchestration decided at RESTART (17:13): log these in §9 first
- The held intake (Appendix A) is **dropped**. No intake goes to Alex.
- C10 is applied: the charter's D5 and DoD-15 now say **two posts**.
- `blog-pipeline\` is **S-D5's now**: use and edit it directly. `s-d4-blog-pipeline` is stopping.
- **Dictation:** when ready, send `answer-desk` one line: `TASK s-d5-blog-articles: blog dictation 1 is ready to record: <topic and the talking prompts, 3 lines>`. The same for 2.
- **Drafts go in a Claude Doc.** Invoke the copy skill first, then `anthropic-skills:docs` before any Docs call. Alex does his last 10% in the Doc, and **his comment on it is the sign-off**; the comment reaches the session that made the Doc. Then read the final text back into the repo. Posts go live after his comment.
- **Article 1's rung and where the ask goes are S-D5's call,** logged. My recommendation, for both articles alike: the conclusion lands on "someone inside who can maintain and extend it" (L-03 W3 C4 A, which fits a job application), and the interest is named once, plainly, in the opening, with no ask at the end (C5 C), since the site's own ask carries the pitch. Article 2's outline already recommends C5 C.
- **No ComfyUI run:** coded visuals only. The `humanizer` skill is for the morning.
- **Skills on** (SKILL ON, 17:13): `marketing:content-creation`, `marketing:brand-review`, `frontend-design`, `design:design-critique`, `anthropic-skills:docs`. Name the skill in every subagent prompt that writes copy or does design, with the instruction to invoke it first.

## State
| Article | Topic (Alex's, §1a) | Brief | Dictation | Draft | Published |
| --- | --- | --- | --- | --- | --- |
| 1 | AI workflows are always a managed service; the vertical AI-skill slider | `briefs\A-01-base.md`, committed be9b1f6, from L-03 R6 and W3. About 1,200 words. | Not yet | — | — |
| 2 | GTM engineers answer the AI era's jobs question; AI pays through revenue | `briefs\A-02-outline.md`, committed ef2ae6a, from Alex's note. L-03 R7 (its research base) accepted 17:16: `..esearch\global\L-03-R7-article-2-base.md`, not yet folded in. | Not yet | — | — |

**Visuals** (`local\visuals\`, git-ignored; `local\visuals\README.md` has the details): six coded mockups plus `out\contact-sheet.png` (sent to Alex 17:05). Per article: a 1080×1350 teaser, a 1200×630 link card and a 1080×1350 diagram card. Backdrop plus slot map plus AI text in `content\A-0n.json`, with budgets measured by binary search. Render with `node "blog-articles\local\visuals\tools\render.mjs"` (`--measure`, `--stress`). **They use S-D6's canva-templates tokens (Inter), which are no longer the brand source**: reset rule 6 makes `website\local\addvery\brand\` (`BRAND.md`, `tokens.css`; Outfit body, Inter Tight display, the violet-to-orchid gradient leading) the one source. Open points: check the slider's rung order (Alex's top is "external building"; the frameworks put in-house building on top); the link card uses 96px margins on every side; "labor" is spelled as in Alex's note.

**ComfyUI:** never run, nothing spent (§9, 16:58).

**In flight:** nothing at the desk, and no monitors, loops or crons. Pending from others: the L-03 synthesis from `s1-research` (about 17:26, written for S-D5 alone now that S-D4 has retired), and FINDINGS for L-05 R1 coming onto the reading list from `orchestration`.

**R7 in brief** (from `s1-research`, 17:16): the promise and the practice split (AI is the most-cited reason for announced US job cuts in 2026, yet most executives surveyed say it hasn't changed their headcount). "ROI comes from cost or revenue" holds, and the revenue side mostly backs Alex (McKinsey, PwC). The weakest link: no independent study backs "GTM engineers keep the whole team growing"; vendors often sell GTM engineering as an SDR-team replacement. Several figures are "snippet only" and must be checked against the originals before they go in a post. No EU or Czech data.

## To-do, in order
1. **Log** the RESTART decisions above in §9, and update §1, Appendix A (dropped), §6 and §8 (no `s-d4-blog-pipeline` in the announcement list). Decide and log the rung and the ask. Commit.
2. **Visuals:** invoke `frontend-design`, then re-skin the templates from `website\local\addvery\brand\` (link to it, never copy values into a tracked file), re-render, and run `design:design-critique` and `design:accessibility-review`. Write `VISUALS.md` (tracked, role names only: formats, slots and budgets, the text used, how to re-render). Commit.
3. **Briefs:** already committed. Refresh `briefs\A-02-outline.md` into a base from R7 (and the L-03 synthesis when it lands), under `marketing:content-creation`, with the same rules as article 1's base: the facts are options for Alex to say aloud, and the objection R7 flags (GTM engineering sold as an SDR replacement) becomes one he answers. Commit.
4. **BUILD S-D5-B1** to `website`: the blog template. The text is in `..\blog-pipeline\PIPELINE.md` §4, plus per-post preview tags and the `og:image` from the cover (POST-FORMAT v1.1 §5; L-01 W2 says previews must be right before anyone shares a link). It should use the Addvery brand tokens the site already carries (`website\app\addvery-tokens.css`). Wait for `BUILT` or `REFUSED`.
5. **Dictation 1:** write the dictation task per `..\blog-pipeline\PIPELINE.md` steps 1 and 2 (stage 0 talking prompts from `briefs\A-01-base.md`, plus its extra prompts), then send the desk the TASK line above. Then dictation 2 the same way.
6. **After each dictation:** run the pipeline's stages (`..\blog-pipeline\prompts\`, `{SKILL}` = `marketing:content-creation`), put the post in a Claude Doc (copy skill, then `anthropic-skills:docs`), tell the desk it's ready for his last 10%, wait for his comment, read the final text back into `posts\`, run the scan, and publish with a BUILD. The share of words he changed still goes on the post (§9).

## Messages since the last fork
- `orchestration`: SKILL ON at 16:47 (content-creation), HOLD at 16:47, RESTART at 17:13. My STATUS replies at about 17:00 and 17:06.
- `s1-research`: R6 accepted at 16:52, used for article 1's base; R7 accepted at 17:16; the synthesis follows.
- `s-d4-blog-pipeline`: PIPELINE v0 at 621cd01, then retired (Alex in DI-8 question 1: "Anything about blog pipelines is dead. The only deliverable is blogs.").
