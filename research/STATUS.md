# research: status
As of 20:02, 2 Nov (Prague), written from the folder's own records after the 19:4x crash.

## Where it fits in the plan

**Deliverable:** M1 Research (wave 1, meta), run as spec S1 Research by the session `s1-research`. It also took one job outside its spec: the AI portfolio story for the site's About-me page (`portfolio\README.md`: "a job for S1, outside its research spec").

**DoD items it claims:**

| DoD | What it says | State | Evidence |
| --- | --- | --- | --- |
| DoD-4 | Every wave-2 spec that needs research has a research list, shaped with Alex's input. | Met | L-01 (every wave-2 spec) approved as OT-01 (commit 96fa0bb, 14:37). L-03 (the blog articles) ran with Alex's OT-04 changes, and L-05 (Canva templates, LinkedIn content, Canva video) with his OT-09 changes. Each list's `Approved by` line quotes his input. L-02 (scraping) is parked because Alex runs the scraping himself (d43d13a, 14:40). L-04 (GetSales) and L-06 (website) were withdrawn at 17:03 on his word that "All the research scraping is done" (b676ffa, 17:15). |
| DoD-5 | Every approved item has a stored report with an index entry, on the reading list of every spec that needs it. Shared with S2. | Met | 27 reports in `global\`: L-01 has 8, L-03 has 11, L-05 has 8. Each one has a `DIRECTORY.md` entry and a reverse-index row. S2 changes C07 (6d3edb6, 15:01), C11 and C13 (8089eab, 17:24) wrote the reading-list lines. A check of the eight reader SPEC.md files at 20:00 found every report that the reverse index assigns to them. |

The AI portfolio has no DoD item of its own. It is part of D8's About-me section (C18), and the site covers that through DoD-18 and DoD-19, which S-D8 claims.

**Depends on:** S0 (the folders and the answer desk), and on Alex approving every list. The portfolio depends on Alex's public repos, his words on camera, `blog-pipeline\POST-FORMAT.md` and its `validate.py`, and the voice guide in `linkedin-content\local\alex-voice\`.

**Depends on it:** the methodology and reading lists of S-D1, S-D3, S-D5, S-D6, S-D7, S-D8, S-D9 and S-D10 (S-D4 is retired). The About-me page on the site (`website\app\about\profile.ts`, `AI_PORTFOLIO_SLUG`) and the agent view (`scraping\agent-view\generate.py`, the portfolio hook) are waiting on the portfolio.

## What it was trying to do

S1 set how research gets chosen, run, stored and indexed, and it kept Alex in the loop throughout. The charter says research is never done "without the operator in the loop", and Alex said in DI-3 that "all this research part is the part that should involve me." The method follows his rule: "if there's an easy answer, an obvious answer, or a converged-upon answer, we're using it. If not, we at least know traps and gotchas." Each list has about four questions, three wildcards (can it be executed, delivered, received?) and a synthesis. On storage he said "Just store it locally", so every report stays in `research\`. Later he asked for an AI portfolio that isn't "just linking" but "almost like a first-person narrative of what's interesting to me and what I've been building on ... a blog story thing that has citations", where "I can drop a repo underneath it that proves it".

## What's been made

| Item | Where | State |
| --- | --- | --- |
| Folder instructions and reading list | `research\CLAUDE.md` | done |
| Executable spec, with its decision log (3 entries) and DoD | `research\SPEC.md` | done (parts are stale, see risks) |
| Handoff at forking gate G4 (19:02) | `research\HANDOFF.md` | done |
| Index of every report, with a reverse index by spec and the precedence rules | `research\DIRECTORY.md` | done |
| Briefs for research subagents (regular item, wildcard, synthesis, shared rules) | `research\BRIEFS.md` | done |
| L-01 parent list (every wave-2 spec) | `research\lists\L-01-parent.md` | done |
| L-02 scraping list | `research\lists\L-02-scraping.md` | planned only (parked) |
| L-03 blog list (the two articles) | `research\lists\L-03-blog.md` | done |
| L-04 GetSales list | `research\lists\L-04-getsales.md` | planned only (withdrawn) |
| L-05 Canva and LinkedIn list | `research\lists\L-05-brand-assets.md` | done |
| L-06 website list | `research\lists\L-06-website.md` | planned only (withdrawn) |
| L-01 synthesis | `research\global\L-01-synthesis.md` | done |
| L-01-R1 Making the work legible | `research\global\L-01-R1-legibility.md` | done |
| L-01-R2 What a GTM engineer is hired to show | `research\global\L-01-R2-gtm-engineer-hiring.md` | done |
| L-01-R3 Personal data on a public site | `research\global\L-01-R3-personal-data.md` | done |
| L-01-R4 Does the format land? | `research\global\L-01-R4-format-reception.md` | done |
| L-01-W1 Wildcard: can it be executed? | `research\global\L-01-W1-wildcard-executed.md` | done |
| L-01-W2 Wildcard: can it be delivered? | `research\global\L-01-W2-wildcard-delivered.md` | done |
| L-01-W3 Wildcard: will it be received? | `research\global\L-01-W3-wildcard-received.md` | done |
| L-03 synthesis | `research\global\L-03-synthesis.md` | done |
| L-03-R1 Transcript to draft | `research\global\L-03-R1-transcript-to-draft.md` | done |
| L-03-R2 The Claude design app | `research\global\L-03-R2-claude-design.md` | done |
| L-03-R3 Capture (Wispr Flow, rig transcript) | `research\global\L-03-R3-capture.md` | done |
| L-03-R4 What a finished B2B post looks like | `research\global\L-03-R4-finished-b2b-post.md` | done |
| L-03-R5 The best skill to write blogs with | `research\global\L-03-R5-blog-writing-skill.md` | done |
| L-03-R6 Research base, article 1 | `research\global\L-03-R6-article-1-base.md` | done |
| L-03-R7 Research base, article 2 | `research\global\L-03-R7-article-2-base.md` | done |
| L-03-W1 Wildcard: can it be executed? | `research\global\L-03-W1-wildcard-executed.md` | done |
| L-03-W2 Wildcard: can it be delivered? | `research\global\L-03-W2-wildcard-delivered.md` | done |
| L-03-W3 Wildcard: will it be received? | `research\global\L-03-W3-wildcard-received.md` | done |
| L-05 synthesis | `research\global\L-05-synthesis.md` | done |
| L-05-R1 Alex's earlier pixel-perfect demo | `research\global\L-05-R1-pixel-perfect-demo.md` | done |
| L-05-R2 What Canva can do now | `research\global\L-05-R2-canva-capabilities.md` | done |
| L-05-R3 Pixel-perfect in Canva | `research\global\L-05-R3-pixel-perfect-canva.md` | done |
| L-05-R4 LinkedIn posts in a brand's voice | `research\global\L-05-R4-brand-voice-posts.md` | done |
| L-05-W1 Wildcard: can it be executed? | `research\global\L-05-W1-wildcard-executed.md` | done |
| L-05-W2 Wildcard: can it be delivered? | `research\global\L-05-W2-wildcard-delivered.md` | done |
| L-05-W3 Wildcard: will it be received? | `research\global\L-05-W3-wildcard-received.md` | done |
| Child-level reports (`research\<spec folder>\`) | none | none needed, so none were made |
| AI portfolio: the job, its steps and its decisions | `research\portfolio\README.md` | done |
| AI portfolio story, about 2,300 words, in the site's entry format (`kind: "showcase"`), with five `[Alex: ...]` notes | `research\portfolio\ai-portfolio.md` | draft (`status: "draft"`; validate.py 0 fail, commit cacf9c5, 18:50) |
| Fact sheets for the four repos, with citations and a "keep off the page" section in each | `research\portfolio\sources\` (cb6-prayer-project, executable-spec-research, factor-ai, pixel-perfect-demo) | done |
| Preview builder | `research\portfolio\build_preview.py` | done |
| Preview page, built from the story | `research\portfolio\preview.html` | draft |
| Review page for Alex | https://claude.ai/artifact/McVKMTRVxsW3qa3kFq1Z6J | live (private), waiting on his comment |
| The entry on the site | `website\content\demos\ai-portfolio.md`, linked from https://hire-me-hackathon.vercel.app/about | planned only (the file doesn't exist, and `AI_PORTFOLIO_SLUG` is still `""`) |

## How far along

**90%.** Every approved research list is done, indexed and on its readers' reading lists, and both DoD items are met. What's left is the portfolio's last mile: Alex's review, his edits, then publishing and placing it.

"Done" here means DoD-4 and DoD-5 are met (they are), and the AI portfolio is live at `/demos/ai-portfolio`, linked from /about, with Alex's sign-off.

## What's left for Alex

1. **Review the AI portfolio and settle its five yellow marks.** Kind: **attended copy**. Where: https://claude.ai/artifact/McVKMTRVxsW3qa3kFq1Z6J, or work through `research\portfolio\ai-portfolio.md` with an assistant. About 10 minutes. The five marks:
   - how long the sabbatical lasted, and an hours figure if he wants one;
   - whether to call the church campaign non-commercial;
   - whether to link the CB6 spec;
   - whether to link more Factor-AI files than the two he already shares;
   - the CB6 operator lens, which is held under the same rule as the CB6 spec.

   His comment is the sign-off.
2. **Decide on cleaning up two old public repos.** Kind: **quick**. Where: in chat (Open tasks, item 17). About 1 minute to decide. It settles whether the two CB6 proofs in the portfolio get links.
3. **Confirm the sabbatical length once: nine months or six.** Kind: **quick**. Where: in chat. About 10 seconds. The same fact appears in three places: the portfolio's first mark, the "At a glance" box on /about (which already says "nine-month sabbatical"), and one stakeholder page (Open tasks, item 3). One answer settles all three.

Nothing else in this folder needs Alex. No new research runs unless he asks for it.

## What's left for an assistant

1. **Watch for Alex's comment.** The comment subscription died with the sessions. Read the page's comments with `ArtifactComments`, or wait for him to say he's done. Described in `research\HANDOFF.md`, step 1.
2. **Apply his edits** to `research\portfolio\ai-portfolio.md`, which is the source of truth, and remove each `[Alex: ...]` note once it's settled. Where he says nothing on a note, take the safe default and log it in `portfolio\README.md`: CB6 stays unlinked, Factor-AI stays at its two files, and an unsourced figure is dropped. Load `marketing:content-creation` before rewriting any copy. Under the new rule, copy changes happen with Alex present. Described in `HANDOFF.md`, step 2.
3. **Validate and publish.** From the repo root, run `python -I blog-pipeline\scripts\validate.py research\portfolio\ai-portfolio.md`. It must show 0 fail (warning W20 on length is expected). Then set `status: "published"`. POST-FORMAT.md refuses to publish while any `[Alex: ...]` note remains. Rebuild with `python -I research\portfolio\build_preview.py`, read the artifact first, then republish it, and commit. Described in `HANDOFF.md`, step 2, and `blog-pipeline\POST-FORMAT.md`, lines 24 and 175.
4. **Place it on the site.** Copy the file to `website\content\demos\ai-portfolio.md` (this was BUILD S1-B1). The entry carries its own "How this post was made" text, so it doesn't need the template's box. Set `AI_PORTFOLIO_SLUG = "ai-portfolio"` in `website\app\about\profile.ts` so the /about card shows. Described in `HANDOFF.md`, step 3, and the comment in `profile.ts`.
5. **Re-run the agent-view generator** so D12 picks the entry up. The generator already has a hook for it, so this replaces the old step of handing `s-d1-scraping` the Markdown source. Described in `scraping\agent-view\README.md` (the "AI portfolio" line).
6. **Close the loops.**
   - Mark the `TASK S1: AI portfolio entry` block in `answer-desk\queue.md` done.
   - Clear item 13 in `Open tasks.md`, and its stale "Reading the repos" row under "Before the crash".
   - Update the `s1-research` row in `SESSIONS.md`: session 054f3f52 is no longer running.
7. **Optional tidy.**
   - Update SPEC.md's status line and section 7, which still describe the morning plan.
   - Fix L-03's "Drawn from" line, which says "three posts" where the charter now says two.
   - Rewrite `HANDOFF.md` for working without sessions.

## Open questions and risks

- **Unclear whether Alex has commented on the review page.** The records end with the successor session (054f3f52) "waiting on Alex's AI portfolio review; polls every 10m" at 19:09 (`briefing\data\events.md`). It made no commits. At 19:58, `Open tasks.md` still lists the review as waiting on him.
- **Half-done at the crash:** nothing. `research\` had no uncommitted changes when this was written. Steps 2 and 3 of the handoff (edits, BUILD, handover) hadn't started.
- **The public repo describes what the two old repos expose.** Three tracked files say what the old repos hold: `research\HANDOFF.md` ("Things Alex should know"), `research\portfolio\README.md` (the last decision row) and one `[Alex: ...]` note in `ai-portfolio.md`, which `preview.html` repeats. That stays true until the clean-up decision. Consider trimming those lines, and make sure none of it reaches the published entry.
- **A Claude Doc or an artifact?** Reset rule 4 asks for a Claude Doc for Alex's last-mile edit. The review went to an artifact page because no Docs connector was attached at 19:00. `portfolio\README.md` step 4 still says "Claude Doc". The text is the same either way.
- **Withdrawn research.** L-04 (GetSales) and L-06 (website) never ran, so S-D3 and S-D8 have only the parent research, L-01. S-D9 never had a list of its own. S-D11 and S-D12 were added after the lists and read L-01 only through their host specs (`canva-video\`, `scraping\`). This follows Alex's 17:03 instruction, but nobody checked it against those specs later.
- **Post-research questions.** The syntheses hold 24 one-line questions for Alex (L-01), 2 (L-03) and 12 (L-05). Each names the spec it blocks, and the reader specs own them. This folder's records don't show which were asked or answered. Unclear.
- **A caveat that matters for publishing:** L-03-R7 marks several of article 2's key figures "snippet only". They must be checked against the originals before that article goes live (`DIRECTORY.md`).
- **Times in the records run ahead of git.** Commit times used here:

  | Event | Records | Commit |
  | --- | --- | --- |
  | L-01 done | 15:05 | 14:59 |
  | OT-01 tick | 14:38 | 14:37 |
  | L-05 done | 16:47 (the list and DIRECTORY) | 16:45 (HANDOFF agrees) |
  | L-03 done | 17:21 | 17:20 |

- **Stale lines that contradict newer records:**
  - SPEC.md's status line ("ready to launch after S0") and section 7 (L-03 is still for S-D4; "S-D8 and S-D9 not drafted", though L-06 was drafted later).
  - L-01's and L-03's reader lines still include the retired S-D4.
  - L-03 says "three posts"; DoD-15 now says two.
  - The "Before the crash" table in `Open tasks.md` says the portfolio is "Reading the repos", but the draft was done at 18:50.

## Sources

- In `research\`: CLAUDE.md, SPEC.md, HANDOFF.md, DIRECTORY.md, BRIEFS.md (headings), `lists\L-01` to `L-06`, `portfolio\README.md`, `portfolio\ai-portfolio.md`, `portfolio\build_preview.py` (head), the headers of the four `portfolio\sources\` sheets, and the folder tree.
- `CHARTER.md`: the M1 and S1 rows, the Research reading list, DoD-4, DoD-5, DoD-18, DoD-19, the Spec outline and the Run order.
- `orchestration\changes\C07-findings-L-01.md`, `C11-findings-L-05.md`, `C13-findings-L-03.md`, and `C18-d8-about-welcome-landings.md` (its DoD lines).
- The eight reader `SPEC.md` files (scraping, getsales, blog-articles, canva-templates, linkedin-content, canva-video, website, legibility), grepped for report paths only.
- `answer-desk\qa\S1.md`; `answer-desk\queue.md` (the TASK S1 block); `SESSIONS.md` (the `s1-research` row); `briefing\data\events.md` (the `s1-research` lines).
- `website\app\about\profile.ts`; `scraping\agent-view\README.md` and `generate.py` (the portfolio hook); `blog-pipeline\POST-FORMAT.md` (the status rules).
- `Open tasks.md` (private), read for status only.
- Git:
  - `git log --oneline -50 -- research` and `git log -5 --format='%h %ad %s' --date=format:%H:%M -- research`
  - commits 96fa0bb, d43d13a, dca2c06, c1aa4b6, a829ea2, c7d9fe1, b676ffa, a1f2d58, c4d8b21, 16bffbc, fcc086e, cacf9c5, 7b675bb, a46ca72, 6cf97b2, 8aa0efb
  - `git status -- research`: clean
