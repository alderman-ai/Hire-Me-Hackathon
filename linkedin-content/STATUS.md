# linkedin-content: status
As of 20:02, 2 Nov (Prague), written from the folder's own records after the 19:4x crash.

## Where it fits in the plan

**Deliverable:** D7, LinkedIn content creation demo (spec row S-D7, session `s-d7-linkedin-content`). It also became the copywriter for D8 (the website): Alex's voice copy for About me, the six stakeholder landing pages, the `/for` intro, the welcome with its time paths and the "How this site was built" entry.

**DoD items.** The charter names S-D7 as a claimant of DoD-17 only. It reads DoD-11 and serves DoD-22 (SPEC §2 agrees). Its copy also serves DoD-18 and DoD-19, which S-D8 claims.

| Id | What it says | State | Evidence |
| --- | --- | --- | --- |
| DoD-17 (claimed) | A LinkedIn content demo in Addvery's voice, built on Alex's brand capture repo, is on the site and has his brand sign-off. | Partly | The entry is live (HTTP 200 at 19:57, website commit 76b48f9, 18:12, BUILT S-D7-B1). The sign-off is not recorded: the Doc had no comment at rev 15 (orchestrator's brief, not re-checked here). |
| DoD-11 (read; claimed by S-D2, operator-owned) | An Addvery brand capture exists for the LinkedIn templates and content demos to use. | Met | `Addvery Research\Brand capture.md` exists on disk. `linkedin-content\SPEC.md` §3 and `canva-templates\SPEC.md` both name it. SPEC §3 marked it a draft, with Alex's review pending (C08). |
| DoD-22 (served; claimed by S-D8, S-D9) | Nothing published shows secrets, the Apify proposal or Alex's own GetSales outbound. | Met for this folder; the item as a whole is unchecked | Run step 12's leak check ran and its fixes were committed (1bff0f2, 18:19). A grep at 19:57 found none of the three in the folder's tracked files. The brand-asset slides are git-ignored. The project-wide publish check wasn't run (`website\HANDOFF.md`, Housekeeping). |

**Depends on:**
- Alex's brand capture (S-D2, in `Addvery Research\`).
- S1's research: L-05 (C11) and L-01 (C07).
- Alex's public repo `brand-voice-capture-demo-linkedin`.
- The website's brand kit (C09).
- For the voice copy: Alex's typed messages, his intake answers, the rig transcripts and `website\content\inventory.json` (for the welcome paths).

**Depends on it:**
- `website` (S-D8) builds every piece above.
- S-D12's agent-view generator needs `website\content\time-paths.json`, the welcome's file (`website\HANDOFF.md`).
- `s1-research` reads the voice guide.
- The clip-grading rubric demo reuses `demo\method.md` as its model (`alex-prep\CLAUDE.md`).
- S-D6 and S-D10 were offered the posts as sample copy. Neither depends on them.

## What it was trying to do

The problem, in SPEC §4: "AI-written LinkedIn posts sound like every other AI-written post. A brand team wants posts that sound like the brand, and a way to check that they do." The plan applied the method from Alex's brand capture repo to his capture of Addvery. Five posts were written to a 21-rule rubric and scored blind by a judge that wrote none of them, beside a generic AI post on the same topic. The demo is aimed at Addvery's marketing side and leadership, and nothing is ever posted to LinkedIn. From 18:00 the folder also wrote site copy in Alex's own voice, after his brief: "There needs to be some personality ... you've got so many transcripts of how I speak ... Don't go super crazy." At 18:4x he added: "If there's stuff to do let's do it quickly by fanning out."

## What's been made

Tracked files and live work:

| Item | Where | State |
| --- | --- | --- |
| Spec with a 22-row decision log | `linkedin-content\SPEC.md` | done (its status line is stale, see risks) |
| Method, prompts and the bar | `linkedin-content\PIPELINE.md` | done (its "still a draft" notes are stale) |
| Pre-flight checker (line lengths, stock AI phrasings) | `linkedin-content\preflight.py` | done |
| Handoff note, F3 | `linkedin-content\HANDOFF.md` (18:57) | done |
| Five posts (three text posts, two 8-slide carousels), all Great 21/21 | `linkedin-content\demo\posts.md` | done, live |
| Generic baseline, 12/21 | `linkedin-content\demo\baseline.md` | done, live |
| How it was made | `linkedin-content\demo\method.md` | done |
| Five voice rules, in fresh words | `linkedin-content\demo\voice.md` | done, live |
| Entry prose, with markers and a 144-character summary | `linkedin-content\demo\entry.md` | done. Live as B1, but the live page description is still the older, longer text; the 144-character summary waits on B2. |
| Carousel slides: 16 WebP images and 2 alt.json files | `linkedin-content\demo\slides\` (git-ignored) and `website\public\demos\linkedin-voice\` | done, live |
| LinkedIn demo entry (BUILD S-D7-B1) | https://hire-me-hackathon.vercel.app/demos/linkedin-posts-in-addverys-voice-graded-blind | live (200 at 19:57) |
| Brand sign-off Doc: posts, carousels, scores, baseline, method, voice rules, a reception-check line | the sign-off Doc (link in `local\links.md`) | draft, waiting on Alex's comment |
| BUILD S-D7-B2 (Alex's edits plus the 144-character summary) | not sent | planned only |

Git-ignored work in `local\`, 180 files in all. It's listed by name and count only.

| Item | Where | State |
| --- | --- | --- |
| Rubric v0.3 (21 criteria), the capture's open points, fingerprint guard, brand review | `local\rubric.md`, `open-points.md`, `fingerprint-guard.md`, `brand-review.md` | done |
| Drafts and blind judging: three rounds plus a final judge | `local\drafts\` (12 files, plus blind-round1 to 3 with 8 each and blind-final with 11), four `blind-key-*.md`, `scores.md` | done |
| Raw baselines; calibration against two real company posts (never on the site) | `local\baseline-raw\` (2), `local\calibration\` (2) | done, local only |
| Sign-off gate draft | `local\signoff\` (2) | superseded at 17:15 by the Doc |
| Slide sources and renders | `local\slides\src\` (build.mjs, post.py, slides.css, `html\` 16, `measure\` 17), `local\slides\post-2\` and `post-4\` (10 each, plus `web\` with 8 each) | done |
| Alex's voice guide | `local\alex-voice\guide.md` and `excerpts.md` | done |
| Private links | `local\links.md` | done |
| About me (copy job) | `local\about\about-me.md` and `_sources.md` | live at https://hire-me-hackathon.vercel.app/about (website 9906723, 18:50). No record that Alex has seen it. Holds an `ARTICLE-2-LINK` placeholder. |
| Six landing pages (copy job) | `local\landing\new\page-1..6.md` and `_notes.md`; old pages in `current\` (7); blind check in `blind\` (12), `blind-key.md`, `judge.md`, `scores.md` (the new page won all six pairs) | built gated in `website\content\stakeholders.json` (7a52622, 18:49). All six have `approved: false`. |
| Six review artifacts of those pages (made by website) | growth https://claude.ai/artifact/TCk45ox4gttBgNiyYVRA7r, ceo https://claude.ai/artifact/EWewUdWbqYurU99uH3zM77, cofounder-1 https://claude.ai/artifact/Y542BkTDNhC4fYNVxeMnwn, cofounder-2 https://claude.ai/artifact/Uey12LMZ8mTNW2QNHiShx6, delivery https://claude.ai/artifact/2zQSocRf8xTBxx291oQd3h, bi https://claude.ai/artifact/PX2aWLB8ws6QfAGDf3GGmi | waiting on Alex |
| Stakeholder section intro (copy job) | `local\site-copy\stakeholders-intro.md` and notes | live at https://hire-me-hackathon.vercel.app/for (7a52622). No record that Alex has seen it. |
| Welcome and four time paths (copy job) | `local\site-copy\welcome.md` and notes (18:50) | half-done. Pasted as written into `website\content\time-paths.json` and committed as work in progress (e3e8b9f, 19:50, after the crash). Not live: the home page doesn't show it. |
| "How this site was built" entry (copy job) | `local\site-copy\how-this-site-was-built.md` and sources (18:55) | copy done, not built. Website got the COPY line at about 18:55, marked "not started". There is no `website\content\demos\` file, and `/demos/how-this-site-was-built` returns 404. |
| Personal-brand part | `local\personal-brand\` (6) | half-done, shelved (Alex, Q10.8) |
| Stray private artifact: a half-edited copy of landing page 1 | https://claude.ai/artifact/AW6Ld5n5CKuBHBX7JR3tj2 | stays until Alex says delete |
| Sample-copy offer to S-D6 and S-D10 (run step 5) | none | unclear: no record that it was sent |

## How far along

About 75%. All the writing exists, and three of the six outputs are live (the LinkedIn entry, About me and the `/for` intro). What's left is about an hour of Alex's review and two website builds. "Done" here means two things. First, Alex's brand sign-off is recorded on the Doc and any edits are live as S-D7-B2 (DoD-17). Second, every copy job has been seen by Alex and is live, with the six landing pages approved.

## What's left for Alex

1. **Review the six landing pages** (attended copy, 3 to 5 minutes each, about 25 minutes in all; growth first). Open each review artifact (links above), edit in place or approve, and tell `orch-alex-prep`. Also confirm four facts: "nine months doing nothing but building with Claude Code" (ceo), "freelanced for ten years" (cofounder-2), "came up through B2B marketing" (bi), and his Czech level, B1 to B2. Each approval puts that page live.
2. **Brand sign-off on the LinkedIn posts** (attended copy, about 10 minutes). In the sign-off Doc (link in `local\links.md`), edit in place, then leave one comment: "approve", or what to change. This is what closes DoD-17.
3. **Read the welcome and its four time paths before they go live** (attended copy, 5 to 10 minutes). It's the first thing every visitor sees at the top of `/`. Source: `linkedin-content\local\site-copy\welcome.md`, as pasted into `website\content\time-paths.json`.
4. **Refresh "How this site was built"** (attended copy, 10 to 15 minutes). Its status list is stamped "As of 18:50", from before the crash. Source: `linkedin-content\local\site-copy\how-this-site-was-built.md`.
5. **Read the live About me and the `/for` intro** (attended copy, about 5 minutes): https://hire-me-hackathon.vercel.app/about and https://hire-me-hackathon.vercel.app/for.
6. **A new subheading for the concerns block on the six pages** (attended copy, about 2 minutes). Today it's hard-coded as "Your likely questions, as I imagine you'd put them", which no longer fits the first-person guesses (`website\HANDOFF.md`, In flight).
7. **The stray artifact** (quick, 1 minute): say "delete it" or keep it. https://claude.ai/artifact/AW6Ld5n5CKuBHBX7JR3tj2
8. **The public-history line** (quick, 1 minute). Commit b979ed6 has an older `SPEC.md` line that named the CGO beside the personal-brand proposal. The current file is fixed. Say "scrub it" or leave it; orchestration recommended leaving it.
9. **The personal-brand part** (attended copy, time unclear). It's last priority, picked up only once everything else is done (Q10.8).

No recording is needed. SPEC §1 once planned the sign-off on camera, but that slot was dropped at 16:40.

## What's left for an assistant

1. **After the sign-off:** apply Alex's edits to `local\drafts\` and `demo\`, run `python -I preflight.py` on any changed post, re-score only if a rule could have moved, commit, and have website build S-D7-B2. B2 also carries the 144-character summary. Described in `linkedin-content\HANDOFF.md` ("When he comments", steps 1 to 4) and `website\HANDOFF.md` (Incoming BUILDs). The website's script `C:\Users\alder\.claude\jobs\54c2d301\tmp\blog\assemble_linkedin.py` still existed at 19:57.
2. **After each landing review:** run `python scripts\review\apply_review_edits.py <saved.html>` as a dry run, then with `--write`. Set that page's `landing.approved: true`, deploy, and confirm. Described in `website\HANDOFF.md` (In flight, and the review sign-off protocol).
3. **After Alex reads the welcome:** check and finish the work-in-progress commit e3e8b9f, deploy it, then generate the D12 agent view, which reads `time-paths.json`. Described in `website\HANDOFF.md` (the welcome line and the D12 steps).
4. **After Alex refreshes it:** copy "How this site was built" to `website\content\demos\how-this-site-was-built.md`, set its status to `published`, check `/demos/<slug>` in dev, then deploy. Described in `website\HANDOFF.md`.
5. **Once article 2 is live:** replace `ARTICLE-2-LINK` in `local\about\about-me.md` and rerun `python scripts\about_assets.py`. Described in `website\HANDOFF.md` (the `/about` line).
6. **Only if a slide's text changes at the sign-off:** re-render in `local\slides\src\` (`node build.mjs`, then `python post.py`), and copy the results to `demo\slides\` and `website\public\demos\linkedin-voice\`. Described in `linkedin-content\HANDOFF.md`, step 6. Any change to the layout counts as attended design.
7. **After the sign-off:** point whoever finishes the Canva templates and the Canva video to the signed-off `demo\posts.md`. Described in `linkedin-content\HANDOFF.md`, step 5.
8. **Bring the stale records in line:** the SPEC status line, §1 and §5 (they still describe a held intake and a gate file), `PIPELINE.md`'s "What's still a draft", and the HANDOFF's routing to sessions that no longer run. No file describes this; it comes from this status.

## Open questions and risks

- **Nobody is watching the sign-off Doc.** Successor session 1cb7cbff left no commit and changed no file after 18:58. A scheduled-task lock appeared at 18:58, so it probably set a watch, and that watch died in the crash. Whoever picks up has to read the Doc by hand. Rev 15 with no comment comes from the brief; it wasn't checked here, because the Docs tools were off limits.
- **Half-done at the crash:** the welcome (pasted, committed as work in progress at 19:50, not live) and "How this site was built" (received, not started). Both were website's jobs. On this folder's side, the two writers had finished: the files are saved at 18:50 and 18:55 to 18:56, and the COPY lines went out before the 18:57 handoff commit. `website\content\time-paths.json` and `website\HANDOFF.md` confirm that website received both.
- **Copy Alex hasn't seen:** About me and the `/for` intro are live without his review. The six landings, the welcome and "How this site was built" are not live yet. All of it is attended copy now.
- **Not re-judged:** the landing pages' last polish pass (`local\landing\scores.md`).
- **Two set-level calls in the posts, made without Alex:** two posts share a "We do X. Read on." click line, which the final judge called a judgment call (`local\scores.md`). The voice rules follow how Addvery's leaders write rather than the company page (the fingerprint guard, `PIPELINE.md` point 8). Both were left for the sign-off.
- **The brand capture is provisional:** SPEC §3 marks it a draft, with Alex's review pending. If he changes it, the rubric and the posts may need re-scoring.
- **Links in this file:** the 18:19 leak check (1bff0f2) moved the sign-off Doc link out of tracked files into `local\links.md`. This file carries that link and the stray artifact's link because the brief asked for links. Both artifacts are owner-only, and neither link falls under DoD-22, but the orchestrator may want to swap them for `local\links.md` before committing.
- **Where the records disagree:**
  - The handoff time: `HANDOFF.md` says 18:58, `SESSIONS.md` says 19:00, and the commit is 18:57.
  - Stamps ahead of the clock: commit 62b8d66, made at 18:30, is titled "live state at 19:15", and `local\landing\scores.md` is headed "~19:05" in a file saved at 18:26.
  - The SPEC status line still says the rest "waits for its held intake", and §5 asks for an archived gate task. The 17:15 decision log row replaced both with a comment on the Doc.
  - `PIPELINE.md` says the repo credit waits on Alex's answer. The 17:15 row settled it as `brand-voice-capture-demo-linkedin`.
  - `website\HANDOFF.md` says to paste the welcome copy "when COPY s-d7 sends it", while `time-paths.json` says it was pasted. The 19:50 commit shows it was pasted.
  - The root task list still shows "How this site was built" as "Starting" and the welcome and intro as "Writing". All three were written and handed over.
  - The brief listed DoD-11 and DoD-22 as S-D7 claims. The charter gives them to S-D2, and to S-D8 and S-D9.

## Sources

- `linkedin-content\`: `CLAUDE.md`, `SPEC.md` (with its decision log), `HANDOFF.md`, `PIPELINE.md`, `demo\entry.md`, `demo\method.md`, `demo\posts.md` and `demo\baseline.md` (headings and score lines), `demo\voice.md`, `.gitignore`, and the folder tree. In `local\`: file names, times and counts; the score tables in `scores.md` and `landing\scores.md`; label lines in `links.md`.
- Root: `CHARTER.md` (the D7 row, DoD-11, DoD-17, DoD-22, the Spec outline, the Run order), `SESSIONS.md` (the S-D7 row), and `Open tasks.md` (status only).
- `website\`: `HANDOFF.md`, `builds.md`, `content\time-paths.json`, `content\stakeholders.json` (approval flags), `app\for\page.tsx`, `app\about\copy.ts`, and the `content\demos\` listing.
- `orchestration\HANDOFF.md`, `alex-prep\CLAUDE.md`, `alex-prep\DECISIONS.md`, and `canva-templates\SPEC.md` (grep only).
- Commits: `git log --oneline -50 -- linkedin-content`, and the last five with times (newest 4162f3b and 4f778ae, 18:57). Also 1bff0f2, 62b8d66, b979ed6 and f809961, plus website's 76b48f9, 7a52622, 9906723, 5ff7f17 and e3e8b9f.
- Live checks with curl, 19:57: the LinkedIn entry, `/`, `/about`, `/for` and `/for/ceo` returned 200; `/demos/how-this-site-was-built` returned 404. Text checks showed the `/for` intro live and the welcome not live.
