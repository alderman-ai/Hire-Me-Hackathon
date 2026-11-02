# canva-templates: status
As of 20:01, 2 Nov (Prague), written from the folder's own records after the 19:4x crash.

Like every tracked file here, this one carries no Canva links, hex codes or font names. The Canva links are in `local\handoff-links.md` (git-ignored).

## Where it fits in the plan

**Deliverable:** D6, Canva LinkedIn templates: LinkedIn visual asset templates in Canva, in Addvery's brand, redoing Alex's earlier pixel-perfect branded-assets demo. Spec row S-D6, session `s-d6-canva-templates` (down since the crash).

**DoD items it claims**

| Id | What it asks | State | Evidence |
| --- | --- | --- | --- |
| DoD-16 | The Canva LinkedIn templates, in Addvery's brand, have Alex's brand sign-off | Partly | Three of five templates are built, page-locked and checked in Canva. The event teaser is half done and the carousel isn't started. There's no Canva folder and no Brand Templates yet. The sign-off Doc has been with Alex since 17:42, and no comment was recorded as of 18:46 (`HANDOFF.md`). |

**DoD items it serves but doesn't claim:** DoD-19 (the site shows every deliverable: the D6 section, not built; `site\d6.md` isn't written), DoD-21 (Alex's Canva video uses this folder's asset pack) and DoD-22 (nothing published leaks; the final sweep, run step 15, hasn't run). It reads DoD-11, Alex's brand capture.

**Depends on:**
- Alex's brand capture in `..\Addvery Research\` (S-D2, his own; read from disk only).
- The website's Addvery brand kit in `..\website\local\addvery\brand\`, the one brand source for every visual (reset rule 6).
- S1's research L-05 and L-01, already applied.
- Canva access through Claude in Chrome, on Alex's paid account.
- S-D7's LinkedIn posts, the source of the sample copy. Their brand sign-off is still open.

**What depends on it:**
- S-D10, the Canva video. The asset pack went over at about 18:00 (`READY S-D6`, commit 44710ce).
- S-D11, brand motion with Comfy. Its ideas animate this folder's backdrops and graphics.
- The site's D6 section, through `website`.

## What it was trying to do

It builds about five LinkedIn templates for Addvery in Canva. Brand art is locked, and text and image slots stay editable, so a brand team can fill them in without a designer. The templates were built code-first as exact-size HTML files and checked, then rebuilt in Canva as a locked backdrop plus native Canva text. Alex asked for mockups "that could be used as a template right out the gate" and, for the video, "Give me all the assets I need to build it myself" (DI-10 A10.9). The work started before any input from him, because "i'm swamped we need to remove blockers" (14:38). His only sign-off is the brand sign-off, given as a comment on a Claude Doc.

## What's been made

| Item | Where | State |
| --- | --- | --- |
| Spec, with decision log to 19:00 | `canva-templates\SPEC.md` | done |
| Handoff to session fa39a8c5 (F3, 57% context) | `canva-templates\HANDOFF.md` | done, commit 4ac526e at 19:03 |
| Build sheet: set, sizes, grid, type scale, layouts, locks, export spec, 17 checks, by role | `canva-templates\BUILD-SHEET.md` | done; its §7 lock model is out of date (see risks) |
| Build notes: pipeline, traps, native Canva shapes | `canva-templates\BUILD-NOTES.md` | done; its "Into Canva (part 2, not started)" line is out of date |
| Brand values by role | `local\brand.md` | done |
| The capture's open points, with the reading each template takes | `local\open-points.md` | done |
| Import-ready templates: five, plus five stress versions, with a shared tokens file and scripts | `local\import\` (10 HTML, 3 shared files) | done |
| Coded exports: every template as PNG, every template as PDF, plus the carousel's flattened LinkedIn PDF | `local\exports\` (10 PNG, 6 PDF, 1.7 MB) | done; re-check passes checks 1 to 16 |
| Stress renders at maximum copy length | `local\exports\stress\` (10 PNG, 1 PDF) | done |
| Independent check report | `local\check-report.md` | done; verdict "fit for Alex's brand sign-off" |
| Sample copy, with sources and alt text | `local\sample-copy.md` | done, from S-D7's final posts |
| Queued fixes after the re-check | `local\next-fixes.md` | done (N1, N2 and copy fixes applied) |
| Backdrops with the text slots hidden | `local\canva\backdrops\` (10 PNG) | done |
| Solid-accent fallback previews | `local\canva\fallback\` (10 PNG) | done; not needed, since Canva takes the gradient |
| Native shape boxes, image-slot part, flat carousel page | `local\canva\` (1 JSON, 1 HTML, 1 PNG in `parts\`) | done |
| Static open-licence font files | `local\fonts\` (15 font files, 1 text file, 4.2 MB) | done |
| Logo asset | `local\assets\` (1 PNG) | done |
| Tools: render, slot check, Canva parts, sRGB tag, PDF trim, in-editor Canva helpers | `local\tools\` (6 scripts) | done |
| Asset pack for Alex: README, quote card build sheet, all-templates build sheet, copy | `local\asset-pack\` (4 MD) | done, sizes corrected to Canva points at 18:25; lock steps out of date |
| Asset pack mockups | `local\asset-pack\mockups\` (11 PNG, 1 PDF, 1.3 MB) | done |
| Asset pack images | `local\asset-pack\images\` (10 PNG, 2 SVG) | done |
| Asset pack backdrops | `local\asset-pack\backdrops\` (10 PNG) | done |
| Canva test-import findings (plan, fonts, gradient, brand kit refused) | `local\canva-notes.md` | done |
| Canva build log: state per template and every method that works | `local\canva-build-log.md` | half-done (stops at 19:05) |
| Link index: the sign-off Doc and the four Canva designs | `local\handoff-links.md` | done |
| Retired sign-off gate draft | `local\gate-draft.DROPPED.md` | dropped at the 17:15 reset |
| Brand sign-off Doc, with the 17:40 exports | https://claude.ai/artifact/CFuMcU2Qpxfp1ciRVhJoxX | live, waiting on Alex |
| The 17 pack images, uploaded | Alex's Canva Uploads | done |
| Quote card, 1080×1080 (the reused test design) | Canva: "Addvery · LinkedIn · Quote card · 1080×1080" | done; lock state unclear (see risks) |
| Stat card, 1080×1080 | Canva: "Addvery · LinkedIn · Stat card · 1080×1080" | done: page-locked, checked |
| Portrait post, 1080×1350, with a replaceable image slot | Canva: "Addvery · LinkedIn · Portrait post · 1080×1350" | done: page-locked, checked at 18:45 |
| Event teaser, 1200×627 | Canva: "Addvery · LinkedIn · Event teaser · 1200×627" | half-done at 19:05 |
| Document carousel, 6 pages, 1080×1350 | Canva | planned only |
| One Canva folder, "Addvery · LinkedIn templates" | Canva | planned only |
| The five as Brand Templates | Canva | planned only |
| Signed-off exports, committed | `canva-templates\exports\` | planned only (after the sign-off) |
| D6 site entry | `canva-templates\site\d6.md` | planned only |
| The site's D6 page and status line | `..\website\content\deliverables.json`, `build.json` (website's files) | placeholder text; the status line ("then into Canva") is out of date |
| Leftover Chrome profile from an early render | `local\tools\.chrome-profile\` (7.9 MB, from 15:51) | leftover; the current scripts use throwaway profiles |

## How far along

About 60%. The code-first build, its checks and the asset pack are finished. Canva holds 3 of the 10 template pages finished plus a half-built one, and the sign-off, folder, Canva check, site entry and sweep haven't started.

"Done" here means: all five in one Canva folder, locked and on brand; Alex's brand sign-off recorded; the Canva versions checked against the coded exports; the D6 section on the site; and a clean sweep for leaks.

## What's left for Alex

1. **Give the brand sign-off.** Open the Doc, then comment "approve" or the changes you want: https://claude.ai/artifact/CFuMcU2Qpxfp1ciRVhJoxX. About 5 minutes. The Doc also puts the capture's open points to you, by heading. It shows the coded exports, not the Canva versions. **Quick.**
2. **Decide on fonts before more is built.** Canva has only one of the brand's faces in its library, so the Canva versions set every role in that one face, with letter spacing tuned per role. Their body text visibly differs from the coded exports (open point 2 in the Doc). If you want the exact faces, make a brand kit yourself: Canva, Brand, Create new Brand Kit, about 2 minutes. The session's own attempt was refused by a permission check. Swapping the fonts in afterwards is attended design. **Quick.**
3. **Finish the event teaser in Canva.** Open the design by its link in `local\handoff-links.md`. Four boxes are left (eyebrow, title with the gradient on "after the pilot", format line, CTA label), then the page lock and the check. Every value is in the T5 row of `local\canva-build-log.md`. About 15 minutes (estimate). Look first: session fa39a8c5 ran from 19:03 to the crash and left no record. OBS off. **Attended design.**
4. **Build the 6-page carousel in Canva.** Start from File, then Make a copy of the portrait post, and follow the T4 row in `local\canva-build-log.md` and T4 in `local\asset-pack\BUILD-all-templates.md`. About 30 to 45 minutes (estimate). OBS off. **Attended design.**
5. **Folder, Brand Templates and the quote card's locks.** Put all five in one folder, "Addvery · LinkedIn templates". Make each a Brand Template (the plan has them). Check the quote card against the page-lock model. About 10 minutes (estimate). **Attended design.**
6. **The D6 site entry's words** (`site\d6.md`, not written yet): a short how-it-was-made note, the lock wording "guard rails, binding as Brand Templates", and a "coded where Canva can't" line (HANDOFF to-do 7). About 10 minutes (estimate). **Attended copy.**
7. **Say whether the stakeholder-profile carousel is still wanted.** In DI-10 A10.10 you asked for the Canva template to become a stakeholder profile on a branded background, shown as a carousel in the research section. No session has a plan or an owner for it. **Quick.**

## What's left for an assistant

1. **Read the sign-off Doc's comments.** Nobody has watched the Doc since the crash. The query call is in `local\handoff-links.md`; load `anthropic-skills:docs` first. Described in HANDOFF "First, before anything else", item 1.
2. **On "approve":** copy the PNGs and the carousel's LinkedIn PDF from `local\exports\` to `exports\`, then commit path-limited. Close the desk task and send the ARCHIVE line. On changes: re-render with `local\tools\render.mjs`, re-run the checks and swap the Doc's images. HANDOFF to-do 6; SPEC run step 8.
3. **Bring the lock instructions up to the 18:55 model** (SPEC §9, 18:55 row). Use Canva's page lock "Only allow replacing content", leave the text unlocked, and fully lock the brand art. The fix goes in BUILD-SHEET §7, step 10 of `local\asset-pack\BUILD-quote-card.md`, the "Locks" line of `local\asset-pack\BUILD-all-templates.md` and SPEC §7 methodology step 4. Do it before Alex films, since his scene follows the quote card sheet's step 10.
4. **Check the Canva versions against the coded exports** (BUILD-SHEET §9 check 17), using a checking subagent that didn't build them. Expect the body face to differ. HANDOFF to-do 4; SPEC run step 13.
5. **Bring the build log up to date.** Fill in the T3 lock state, the T5 state and the T4 state once Alex has looked. `local\canva-build-log.md`.
6. **Assemble the D6 entry** around Alex's words: a gallery of the exports, the carousel as page images and a checked PDF download. Then send the build to `website` (`BUILD S-D6-B1`, SPEC run step 14). The `website` session is down too, so whoever works in `website\` builds it. Placement for D6 isn't recorded: `orch-site-map` placed only D10 and D11.
7. **Final sweep** for other designs, logins, links to Alex's account, secrets and copied brand values in every committed file and export (SPEC run step 15). Then the `DONE S-D6` line (run step 16).
8. **Optional:** delete the leftover `local\tools\.chrome-profile\` (git-ignored; no current script uses it). Not in the records' to-do.

## Open questions and risks

- **Half-done in Canva at the crash.** At 19:05 the event teaser's page was unlocked, its old text and image slot were deleted, and only the backdrop, the CTA pill and the date line were in place. The carousel wasn't started. No folder existed and none of the designs was a Brand Template. Session fa39a8c5 took over at 19:03 and committed nothing before the crash, so Canva may hold work the records don't show. The Chrome tab group is gone too (tab ids don't carry over).
- **The quote card's locks are unclear.** The HANDOFF says three templates are built, locked and checked under the page-lock model. But the build log's quote card row still shows the old element "Lock" on its text boxes, which the 18:55 test found blocks text editing. It also has no page-lock line, unlike the stat card and portrait post rows.
- **The lock model is out of date in several places.** BUILD-SHEET §7, both asset-pack sheets, SPEC §7 and `..\canva-video\site\d10.md` still say "Lock position only" for text. The 18:55 test found that model doesn't exist in Canva's current menus. Alex's on-camera build follows the quote card sheet, so its step 10 would tell him to lock the wrong way.
- **The fonts differ from the exports.** The Canva versions use one library face. The brand kit route that would allow uploads was refused by the session's permission check and wasn't retried, and Alex's own kits are never touched.
- **The sign-off covers the coded exports, not Canva.** If Alex asks for changes, the re-render is quick, but the Canva designs then need rebuilding to match.
- **The sample copy depends on S-D7.** It comes from S-D7's final posts, whose sign-off is still open. If he edits the posts, the templates' sample copy needs a refresh (HANDOFF routing note).
- **One clipboard slip, about 19:00.** A Ctrl+V pasted Alex's own unrelated clipboard text into the event teaser. It was deleted within a minute, and nothing was exported or shared. The records don't say whether Canva's version history still holds it.
- **The names don't match.** BUILD-SHEET §1 names T1 and T2 "Single-image post" and "Insight card", while the Canva designs are "Portrait post" and "Stat card".
- **A message is still owed.** `s-d10-canva-video` was owed a second `READY S-D6` with the Canva folder name (run step 12, HANDOFF to-do 5). The scene no longer needs it: since Q10.9 Alex builds from the pack in a fresh design.
- **Times.** The HANDOFF is headed "about 19:05", but its commit is at 19:03. This file uses the commit time.

## Sources

- `canva-templates\CLAUDE.md`, `SPEC.md` (with §9 decision log), `HANDOFF.md`, `BUILD-SHEET.md`, `BUILD-NOTES.md`, `.gitignore`
- `canva-templates\local\`: `canva-build-log.md`, `canva-notes.md`, `check-report.md` (the re-check), `next-fixes.md`, `open-points.md` (headings only), `handoff-links.md` (links masked), `asset-pack\README.md`, and the lock and gradient lines of `asset-pack\BUILD-quote-card.md` and `BUILD-all-templates.md`; the tools' profile lines; file counts and sizes per folder
- `..\CHARTER.md`: D6 row, DoD-16, Spec outline, Run order, operator scenes
- `..\SESSIONS.md` (S-D6 row), `..\answer-desk\queue.md` (the S-D6 TASK, 17:42 and 18:03), `..\Operator tasks\Archive\Decide - everything left that needs you.md` (A10.9, A10.10)
- `..\website\content\deliverables.json` and `build.json` (D6 lines), `..\site-map\DECISIONS.md` (SM-1)
- `..\Open tasks.md` (git-ignored; status only)
- Commits: 4ac526e (19:03), cfe2a2c (19:03, roster), 44710ce (18:02), 457adf3, 782f733 (17:43), ee39a9e, 87e201a, 01b64d9, 520d923, 89fa116, 87b5acb, c26431f, 6b1013f, 1e9022a, 1e42062, efbc716, 32d0dd1, 4541304; `git log --oneline -50 -- canva-templates canva-video`
