# S-D5 handoff, 2 Nov 19:02 Prague

From session 5b465de8 (17:16 to 19:02) to the fresh `s-d5-blog-articles`. Why: forking gate F2 (context about half full, orchestration's context watch at 19:00), while nothing is in flight.

## First: watch Alex's three reviews

All three entries are with Alex for his last 10% / sign-off. **Comments on a Doc reach the session that made it, which was me, so they may not reach you.** Check them yourself: at startup, then about every 10 minutes while you're otherwise idle (`mcp__claude_ai_Claude_Docs__query`, object `utterance`, under each body id), and run `ArtifactComments` `watch` on the taste-capture page so comments sent to Claude wake you.

| Entry | Link | Doc id | Body id | Near-final source |
| --- | --- | --- | --- | --- |
| Article 1: "AI workflows are always a managed service" | https://claude.ai/artifact/6dbQjnECpGbtQw54cHhJMp | 2d99acab-0fdb-4591-9b95-c537a04eb4fb | 58269e1b-76ee | `drafts\A-01\post.md` (8babe9e) |
| Article 2: "If AI won't replace half your team, put it in your pipeline" | https://claude.ai/artifact/17rFReWZZesyLe94msLskk | 00f4d02e-c0db-4c39-9920-9eb99c64ca49 | d76b2d5c-51f0 | `drafts\A-02\post.md` (f3feb55) |
| Taste-capture: "How to refine AI slop into AI ops" (kind showcase, deliverable d7) | https://claude.ai/artifact/PkSgwgetjps3sVoNST26ma (a rendered review page, not a Doc) | n/a | n/a | `posts\03-how-to-refine-ai-slop-into-ai-ops.md` and `posts\assets\how-to-refine-ai-slop-into-ai-ops\` (0d333b9) |

Both Docs were sent at rev 4. Each has "Before you edit" on top (five notes, title and opening options, the cold read's marks, how to sign off), then the line **"The post starts below this line"**, then the post: its title as H2, sections as H3. `local\docs\DOCS.md` (git-ignored) repeats the ids and the readback mapping.

`orch-alex-prep` tracks all three for Alex (sent 18:58). The desk showed all three TASK lines. No pokes are out.

## On each sign-off ("approved", or edits plus a comment)

1. Reply in his comment thread (a doc comment under that root, per the Docs connector's rules), saying what happens next.
2. Read the Doc back from "The post starts below this line" and map it to POST-FORMAT v1.5: H3 to `##`; "Key points" plus bullets to `> [!summary]`; a blockquote ending in an italic "Alex Alderman, ..." line to `> [!quote]` (quotation line, then attribution line); "Pull quote:" blockquote to `> [!pull]`; article 1's bold "Diagram, drawn on the site as a vertical scale ..." paragraph plus its numbered list to `> [!diagram] scale` (caption after the colon); bold `[Alex: ...]` notes must be gone (or ask him in the thread). Keep the front matter from `drafts\A-0n\post.md`; if he changed the title, update title, slug, `title_lines` and `accent`.
3. Write `posts\0n-<slug>.md`: `status: "published"`, today's date, `share_changed_by_alex` from `python -I blog-pipeline\scripts\counts.py --changed blog-articles\drafts\A-0n\post.md <posts file>`. Run `validate.py` (exit 0) and `scan.py` (read the hits: a run of years read as a phone number and "About Me" read as a name are known false positives). Commit.
4. `BUILD S-D5-B<n>` to `website` (B1 and B2 are BUILT; the next is **B3**): copy the posts file unchanged to `website\content\demos\<slug>.md` (and, for the taste-capture entry, `posts\assets\<slug>\` to `website\public\demos-assets\<slug>\`), serve at `/demos/<slug>`. For article 2, ask to link it with the short version s-d7 writes for the site's About-me section (orchestration, about 18:15). Wait for BUILT, then curl the live page's head (its own og:title, og:url, og:image) before anything is shared. Log it in `PUBLISHED.md`.
5. For the taste page: if he asks for changes, edit `posts\03-...md` or the figures (sources and rebuild scripts in `local\taste\src\` and `local\taste\tools\`: `build_figures.py`, `build_review.py --linked` for the publishable review page), then republish the review page with the Artifact tool to the same URL. Open notes from its builder: "AI ops" can be misread as AIOps; the builder added a link to his public taste-capture repo (cut if he says); on the site the flow diagram's step padding is overridden by a `website` CSS rule (tell `website` if it shows on the preview).
6. When all are live: `DONE S-D5: <URLs>` to `orchestration`, roster row to Finished, stop.

## State

- **Spec:** `SPEC.md` §9 logs every decision since the RESTART (intake dropped; Docs; rung and ask; slider order; posts written from Alex's recorded words; block quotes and figures in the format; the third entry; a clock note: my logged times between 17:50 and 18:55 ran ahead, commit times are exact). The "Run steps since the RESTART" list in §7 is current.
- **Pipeline:** `..\blog-pipeline\` is S-D5's. PIPELINE v1 (compiled-source mode, cold read), POST-FORMAT v1.5 (`kind`, `deliverable`, `video`, `poster`; titles at most 64, kickers at most 28; `[!video]`, `[!quote]`, `[!figure]`; `made` required only for articles; the site's `[!post]`/`[!carousel]` noted). validate.py and counts.py match.
- **Sources:** `local\sources\A-0n.md` (Alex's own words compiled from rig transcripts S01 to S11, typed messages and written answers) and every stage file in `local\drafts\A-0n\` stay local: rig transcripts are kept out of the public repo.
- **Site:** template BUILT (`/demos`, "GTM demos", entries `/demos/<slug>` from `website\content\demos\`); B2 BUILT (video clips, feature quotes, figures). `/demos` is live.
- **Visuals:** six LinkedIn companion images re-skinned to the website's Addvery kit (`VISUALS.md`, 9d53496). Their text is redone from each finished post; the teasers' lower half is empty glow (open point), and "Read it on the blog" becomes the section's name ("GTM demos").
- **Dictation pages:** optional now (marked on both pages); fold in only if Alex records one.
- **Skills:** `frontend-design:frontend-design` should load by name in a fresh session (orchestration installed it per project); before that it was followed from its SKILL.md and logged. Copy work: `marketing:content-creation` first, then `anthropic-skills:docs` before any Docs call.

## Messages since the last fork

- `orchestration`: RESTART decisions; C13 notes (fixed); DI-10 Q10.10 (shared entry template) and Q10.5 (article 1 before the Ivana meeting); write from transcripts (about 18:15); the taste-capture article; fan out; split into three at 18:56 (`orchestration` master, `orch-site-map`, `orch-alex-prep` for everything that needs Alex); context watch at 19:00.
- `website`: B1 BUILT (shared entry template), B2 BUILT with both amendments (76b48f9).
- `s1-research`: the L-03 synthesis (confirmed received).
- `answer-desk`: every TASK shown; dictations marked optional and the 18:40 poke withdrawn.
