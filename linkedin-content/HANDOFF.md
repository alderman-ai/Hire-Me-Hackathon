# S-D7 handoff (forking gate F3, 2 Nov 17:17 Prague)

From session 6a355ef8 to the fresh `s-d7-linkedin-content`. Read `CLAUDE.md`, then this, then `SPEC.md` §1, §7 and §9 (the decision log's last rows are the live state). Then the reset rules at the top of `..\answer-desk\ASKING.md`, which override the spec where they differ: no gates for Alex except the brand sign-off, easy calls are yours (decide and log), public sources may be published, written work goes in a Claude Doc, design work needs a design skill, no 18:00 cut-off.

## Where things stand

Part 1 is done. The held intake (Appendix A) is never released; its questions are decided in §9 (17:15 row). The brand sign-off is Alex's comment on a Claude Doc, not a gate file.

**Five posts, all final text, all Great 21/21 from a fresh blind judge** (`local\drafts\judge-final.md`; key `local\blind-key-final.md`):

| Post | Format | Files in `local\drafts\` |
| --- | --- | --- |
| 1 AI pilots in production (invoices) | text | `post-1.txt` |
| 2 Fix the data before the model | carousel, 8 slides | `post-2-slides.txt`, `post-2-caption.txt` |
| 3 The launch date, not the deck | text | `post-3.txt` |
| 4 What not to hand to AI yet | carousel, 8 slides | `post-4-slides.txt`, `post-4-caption.txt` |
| 5 The spreadsheet that runs the company | text | `post-5.txt` |

`local\drafts\posts.md` holds all five as one file (offered to the Canva templates session as sample copy, not signed off).

**Contrast, same judge, same batch:** the one-line baseline (`local\baseline-raw\baseline.txt`) Unpostable 10/21; the fair baseline, asked for Addvery's brand voice with its public tagline (`local\baseline-raw\baseline-fair.txt`), Unpostable 12/21. Two real company-page posts were slipped in unlabelled as a local calibration and also scored Unpostable; the judge guessed all nine provenances right. So the score is rule adherence, not proof of sounding like Addvery. The calibration stays local, and the site never contrasts against Addvery's own posts.

**History** (for the method note): `local\scores.md` has every round. Round 1: all writers copied the rubric's own example lines, so the rubric (`local\rubric.md`, v0.3) gained set-level rules. Then rounds 2 and 3, a set-fix pass on two posts, a marketing:brand-review pass (`local\brand-review.md`: three unsourced outcome claims softened), and the final judge. Also in `local\`: `fingerprint-guard.md` (the brand rules tested against the page's own posts), `open-points.md`, `signoff\pack-head.md` (pack text with the four-step method and the five-rule voice summary, reusable for the Doc; `signoff\gate-draft.md` is superseded).

**Personal-brand part:** private, lowest priority, `local\personal-brand\`, never in a tracked file and her name nowhere outside that folder. Touch it only after everything else, and only if `orchestration` relays that Alex wants it.

**Committed:** `PIPELINE.md` (method), `preflight.py` (mechanical checks plus stock AI phrasings), `.gitignore`, `SPEC.md` decision log. Nothing on the site yet. No desk question open, no pokes, no BUILD awaiting a reply.

## Skills switched on for this folder (orchestration, 17:13)

marketing:draft-content, marketing:brand-review, anthropic-skills:docs, frontend-design, design:design-critique. Rule: copy skill first, then `anthropic-skills:docs` before any Docs call; `frontend-design` before any visual, then design:design-critique (and design:accessibility-review if available) before it ships. A subagent doing design gets the skill named in its prompt, to invoke first. Visual brand source: `..\website\local\addvery\brand\` (`BRAND.md`, `tokens.css`) and `..\website\public\addvery\`, read from disk; the site's tokens are in `..\website\app\addvery-tokens.css`.

## To do, in order (from orchestration's RESTART, 17:13)

1. **The Doc.** Invoke marketing:draft-content, then anthropic-skills:docs. Make one Claude Doc with the five posts as text, the two carousels as slide images (render the 8 slides each with `frontend-design` in Addvery's brand from the kit above; critique before use), each post's score as rule adherence ("meets 21 of 21 voice rules, 0 AI tells"), the fair baseline with its score, and a short method note (the four steps and honest limits from `local\signoff\pack-head.md`, plus the five-rule voice summary). Then send `answer-desk`: `TASK s-d7-linkedin-content: the five LinkedIn posts are ready for your brand sign-off: <Doc link>; comment approve or edits on the Doc.`
2. **Without waiting for him:** write `demo\posts.md` (the five posts with format and score), `demo\baseline.md` (the fair baseline and its score; mention the one-line baseline's 10/21 in a line), `demo\method.md` (four steps, the round-1 story, honest limits, the credit to `brand-voice-capture-demo-linkedin`), `demo\voice.md` (the five-rule summary). The carousel images go in `demo\` too if they're small. Commit, path-limited. Then send `website` (wording per SPEC §7 run step 11, updated): `BUILD S-D7-B1: add a D7 section, LinkedIn content in Addvery's voice, in the deliverables area: the five posts as LinkedIn-style cards (carousels as slide strips) with "meets 21 of 21 voice rules, 0 AI tells" each, the generic post beside post 1 with its score, a short how-it-was-made panel, and the five-rule voice summary. Content: linkedin-content\demo\. Source: posts written by S-D7 in Addvery's voice from public sources; brand sign-off pending on Alex's Doc, edits follow as a second request; nothing quoted from Addvery Research; no named person.` If the Canva templates session has previews in `..\canva-templates\exports\`, say which post pairs with which. Wait for `BUILT S-D7-B1` or `REFUSED S-D7-B1` before any next request.
3. **His comment lands** (it reaches the session that made the Doc): apply his edits to `local\drafts\` and `demo\`, re-run `preflight.py` on any changed post, re-score only if a rule could have moved, commit, and send `website` the update as `BUILD S-D7-B2` if the site already shows the old text. Send `answer-desk` `TASK DONE s-d7-linkedin-content: brand sign-off`. Send `s-d6-canva-templates` and `s-d10-canva-video` (if running) `COPY S-D7: signed-off posts in ..\linkedin-content\demo\posts.md`.
4. **Leak check** (run step 12): a subagent checks every committed file in `linkedin-content\` and the built section for text copied from `Addvery Research\`, real names, links to Alex's accounts and secrets. Fix, commit.
5. **DONE:** send `orchestration` `DONE S-D7: posts and baseline on the site, brand sign-off <approved | pending on the Doc>, BUILT S-D7-B1`.
6. Only then, and only if relayed: the personal-brand part.

## Forking

F1 (sign-off approved) and F3 (context half full) still apply (§8). This session forked at F3. `orchestration` removes the old id 6a355ef8.

## Since the fork (session 9e96773b, live state at 17:40)

- **Sign-off Doc:** https://claude.ai/artifact/A8cmvTCoTfMwd9CQz8u7kj (doc id 49f2804b-b296-4f67-9440-da7f81ab2030, tab body 4b6c9ae1-43d0). Complete: the five posts as exact text blocks, both carousels as contact-sheet images plus editable slide text, scores, the fair baseline, the method, the five rules, and a reception-check line (L-05 Q11). TASK sent to `answer-desk` at 17:22; the desk showed it. Alex's comment reaches this session.
- **Slides:** rendered by a design subagent (frontend-design read from its SKILL.md, then design-critique and accessibility-review), in `local\slides\` (source `src\`, rerun `node build.mjs` then `python post.py` there). Web copies and alt text copied to `demo\slides\` (git-ignored).
- **Site:** Alex at 17:23 (DI-10, relayed): the demo is one blog-style entry in the GTM demos section. `demo\entry.md` is that entry, with markers filled from `posts.md`, `baseline.md`, `voice.md`. `BUILD S-D7-B1` sent to `website` at 17:40; waiting for BUILT or REFUSED.
- **Next:** on BUILT, the leak check (step 4 above), then DONE to `orchestration` (sign-off pending or approved). On Alex's comment, step 3 above; if the site already shows old text, `BUILD S-D7-B2`.
- **Personal-brand part:** shelved until everything else is finished (Alex, Q10.8).
