# S-D7 handoff (forking gate F3, 2 Nov 18:58 Prague)

From session 9e96773b to the fresh `s-d7-linkedin-content`. Read `CLAUDE.md`, then this, then `SPEC.md` §9 (the decision log's rows from 17:15 on are the live state). The reset rules at the top of `..\answer-desk\ASKING.md` override the spec where they differ: no gates for Alex except the brand sign-off, easy calls are yours (decide and log), public sources may be published, written work for outside readers goes in a Claude Doc unless Alex says otherwise, any copy or design work needs its skill invoked first (a subagent gets the skill named in its prompt), no 18:00 cut-off. Private links and ids are in `local\links.md` (git-ignored).

## Routing since 18:56 (Alex)

Orchestration is split in three. `orchestration` is the master: handoffs, roster, context, charter. Send it `HANDOFF ...` lines and status; Alex no longer talks to it. `orch-site-map` (`site-map\`) owns the site's layout and scope map, and copy requests for page sections may now come from it. `orch-alex-prep` (`alex-prep\`) owns everything that needs Alex, the LinkedIn sign-off Doc included: tell it when his comment lands and when the sign-off is done. Questions for Alex still go to `answer-desk`. The `website` session also handed off at 18:58 under the same name; BUILT replies come from its successor.

## The one thing open: Alex's brand sign-off on the LinkedIn posts

- **The Doc** (link in `local\links.md`) holds the five posts as exact text blocks, both carousels as images plus editable slide text, the scores, the fair baseline, the method, the five voice rules and a reception-check line. The TASK went to `answer-desk` at about 17:22, and the desk showed it. No comment yet.
- **Watch it:** load ArtifactComments (ToolSearch) and watch the Doc's URL. A comment sent to Claude may arrive as an `[Artifact comment sent to Claude]` turn. To check by hand, load the docs skill (`anthropic-skills:docs`), then use Claude Docs `query` for utterances under the tab body node. Answer a comment in its own thread (docs `create` utterance, parent = the thread root), as the docs guide says.
- **When he comments:**
  1. Apply his edits to `local\drafts\` and to `demo\posts.md` / `demo\baseline.md` / `demo\voice.md` / `demo\entry.md` (copy-skill first: `marketing:draft-content`).
  2. Run `python -I preflight.py <file>` on any changed post, and re-score only if a rule could have moved.
  3. Commit, path-limited.
  4. Send `website`: `BUILD S-D7-B2: <what changed>`. B2 also carries the entry summary, already cut to 144 characters in `demo\entry.md`. The B1 page is https://hire-me-hackathon.vercel.app/demos/linkedin-posts-in-addverys-voice-graded-blind (commit 76b48f9 on their side).
  5. Send `answer-desk` `TASK DONE s-d7-linkedin-content: brand sign-off`, and send `s-d6-canva-templates` and `s-d10-canva-video` `COPY S-D7: signed-off posts in ..\linkedin-content\demo\posts.md`.
  6. If a slide's text changed, re-render in `local\slides\src\`: `node build.mjs`, then `python post.py`. Invoke `frontend-design:frontend-design` first, then design-critique. Copy the web files to `demo\slides\`, and refresh the Doc's contact-sheet images.

## Done this session (all handed off, nothing awaiting a reply)

| What | Where | Status |
| --- | --- | --- |
| LinkedIn demo entry | `demo\` (entry, posts, baseline, method, voice; slides git-ignored in `demo\slides\`) | BUILT S-D7-B1; leak check done and fixed; `DONE S-D7` sent to `orchestration` (sign-off pending) |
| Alex's own voice guide | `local\alex-voice\guide.md`, `excerpts.md` | Used by every job below; `s1-research` reads it |
| About-me | `local\about\about-me.md` (+ `_sources.md`) | COPY s-d7 sent; live at /about |
| Six stakeholder landing pages | `local\landing\new\page-1..6.md` (+ `_notes.md`); blind check in `scores.md`, `judge.md` | COPY s-d7 sent, then re-sent with orchestration's two fixes; website gates them on Alex's in-place review |
| Stakeholder section intro | `local\site-copy\stakeholders-intro.md` | COPY s-d7 sent; replaces /for's own lead |
| Welcome page and time paths | `local\site-copy\welcome.md` (+ notes) | COPY s-d7 sent; /d1 leads each path |
| "How this site was built" entry | `local\site-copy\how-this-site-was-built.md` (+ sources) | COPY s-d7 sent at 18:57; the website should check its "As of 18:50" status list |

All `local\` output is git-ignored. `website` reads it from disk. Any later change to one of these files goes to `website` as a fresh `COPY s-d7: ...` line naming what changed.

## For Alex, when anyone reports to him

- A writer subagent accidentally published a private, owner-only claude.ai artifact with a mid-edit copy of landing page 1 (link in `local\links.md`). Delete it only if he asks.
- Facts on the landing pages he may want to confirm: his Czech level (B1 to B2), and nine months building in Claude Code. The LinkedIn post count is now "hundreds" (2,000 was unverified).
- One leak-check finding stays in public git history: an older `SPEC.md` line (commit b979ed6) named the CGO beside the personal-brand proposal. The current file is fixed, and rewriting history is orchestration's or his call.

## Shelved

The personal-brand part (`local\personal-brand\`, private) is last priority, revisited only once everything else is finished (Alex, Q10.8).

## Earlier history

Part 1 (the rubric, five posts all Great 21/21, the baselines at 12/21 and 10/21, the calibration kept local) is in `local\scores.md`, `local\rubric.md` and `PIPELINE.md`. Rounds, judges and blind keys are in `local\drafts\`.
