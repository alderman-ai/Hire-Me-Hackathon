# S-D6 handoff: 2 Nov, 17:16 Prague

From session e692a845 to the fresh `s-d6-canva-templates`, at `orchestration`'s RESTART (17:13): handed off first, so the new session loads `frontend-design` and the Claude Docs connector. Context was about 60%.

**Read first:** `..\answer-desk\ASKING.md`, the reset rules at the top (they override older rules, including in SPEC.md). Then SPEC.md §9, the last three rows (17:15). Then this file. SPEC.md's run steps 7 to 13 still describe the dropped combined gate; this file's to-do list replaces them. Update the steps as you go.

## Where things stand

- **Part 1 is done.** Five templates are built code-first as exact-size files: a portrait post 1080×1350, a stat card and a quote card at 1080×1080, a six-page document carousel at 1080×1350, and an event teaser at 1200×627. Everything branded is in git-ignored `local\`.
  - Sources: `local\import\t*-*\` (plus `*-stress\` twins with max-length copy). Shared tokens: `local\import\_shared\tokens.css` (every brand role as a variable) and `page.js` (`?page=N`, `?grid`, `?backdrop`, `?canva`).
  - Exports: `local\exports\` (PNG, sRGB, plus a PDF with live text for each template; `...-carousel-...-linkedin.pdf` is the flattened one for a LinkedIn document post).
  - Canva assets: `local\canva\backdrops\` (brand art, text slots empty) and `local\canva\fallback\` (highlights in the solid accent).
- **Render:** `node local\tools\render.mjs [folder ...]`, then `node local\tools\canva_assets.mjs`. Both run from `canva-templates\`, and every line must say `ok`.
- **Checks:** an independent reviewer, then a re-check: 16 checks pass; the verdict is ready for sign-off as image exports. Report: `local\check-report.md` (the "Re-check" section is at the top).
- **Tracked docs:** `BUILD-SHEET.md` (sizes, grid, type scale, colour roles, slot tables with measured character limits, export spec, 17 checks; by role only), `BUILD-NOTES.md` (pipeline and traps), `SPEC.md`.
- **Brand values:** `local\brand.md` (from Alex's capture, cross-checked with the website kit) and `local\open-points.md` (gradient or single colour; the heading font). Sample copy: `local\sample-copy.md`. Most lines come from S-D7's drafts (`..\linkedin-content\local\drafts\posts.md`, read only); the rest were written under `marketing:draft-content`.
- **Research applied:** L-01 and L-05 (R1 to R3, W1, W2, synthesis) in `..\research\global\`. Its gist: the Canva connector can't import local files or lock, so the route is Chrome. Canva goes in as a locked backdrop plus native Canva text in library fonts, after a 2-minute test import. Locks are guard rails unless the templates are Brand Templates. Export settings are in BUILD-SHEET §8.
- **Decided (SPEC.md §9, 17:15):** route Chrome; Alex's main account, with the plan checked read-only and Brand Templates if the plan has them; Addvery gets the gallery and the video, with no template link; the site's lock wording is "guard rails, binding as Brand Templates". The combined gate is dropped (draft kept as `local\gate-draft.DROPPED.md`).
- **Nothing is waiting on Alex yet.** No desk question is open and no task has been sent.

## To-do, in order (from `orchestration`'s RESTART)

Skills are switched on for this folder: `marketing:draft-content`, `frontend-design`, `design:design-critique`, `design:accessibility-review`, `anthropic-skills:docs` and `claude-in-chrome`. Invoke the design skill before design work and the copy skill before copy (reset rule 5). Name the skill in any subagent's prompt.

1. **Switch to the one brand source** (reset rule 6): `..\website\local\addvery\brand\` (`BRAND.md`, `tokens.css`; assets in `..\website\public\addvery\`).
   - The display role becomes the kit's stand-in face and weight (part 1 used another face). It's a token change in `tokens.css`; get static font files for it into `local\fonts\`, like the others.
   - Diff the kit's colour values against `local\brand.md` and adopt the kit's.
   - Re-render, re-run the stress twins: no slot over its max lines.
   - Is the new face in Canva's library? Check during the test import; if not, upload its static files (open licence).
2. **The three queued fixes** (`local\next-fixes.md`):
   - carousel p2/p3: bottom-align the point title in its 216px slot;
   - the T1 caption says "below" but LinkedIn shows post text above the image: reword it;
   - p6 says "by Friday" twice: change the CTA.

   The copy goes through `marketing:draft-content`, within the sheet's limits. Then run `design:design-critique` and `design:accessibility-review` on the five, fix what's worth it, re-render and run `canva_assets.mjs`.
3. **Brand sign-off in a Claude Doc** (reset rule 4; load `anthropic-skills:docs` before any Docs call). One Doc with the five templates' exports (the carousel as six pages), each with one line on what it's for. Add the two open points by heading only, with the reading taken (gradient as the signature accent; free stand-in fonts). Send `answer-desk`: `TASK s-d6-canva-templates: the five Canva templates are ready for your brand sign-off: <Doc link>; comment approve or changes on the Doc.` His comment on the Doc is the sign-off (DoD-16). Then send `orchestration` `ARCHIVE`, as ASKING.md says.
4. **Without waiting for it: into Canva through Chrome.** Load the `claude-in-chrome` skill first. Work in a new tab on the 4K monitor, which isn't recorded. Never list, search or open a design you didn't create, and never show the Canva home page on the recorded monitor.
   - First, the 2-minute test import of the quote card, off camera. Check the text boxes, fonts, gradient words and the lock menu.
   - Then the five, as backdrop plus native text at the sheet's slot positions, in one folder, named `Addvery · LinkedIn · <type> · <size>`. Brand art goes on Lock, slots on Lock position only. They become Brand Templates if the plan allows.
   - **Fix N1 first** (`local\next-fixes.md`): CTA pills, the p4 list markers and the T1 diagram must not be baked into the backdrops.
   - If Canva needs Alex's login, send the desk one line saying so.
   - Afterwards, check each Canva export against its preview (BUILD-SHEET §9, check 17).
5. **Tell `s-d10-canva-video` the moment the templates are in Canva:** `READY S-D6: templates in Canva, folder <name>, link <link>; for the scene, use <template>`. It's idle, waiting for that. The link goes in the message only, never in a tracked file.
6. **`BUILD S-D6-B1` to `website`** (SPEC.md run step 14). Write `site\d6.md` with the copy skill, using the decided lock wording. Show the carousel as page images. Wait for BUILT or REFUSED.
7. **Final sweep** (run step 15), then `DONE S-D6` to `orchestration` (run step 16).

## Things to know

- **Commit only `canva-templates/`, path-limited.** Never commit `local\`. Tracked files carry no brand values (no hex codes, font names or Canva links); `BUILD-SHEET.md` names roles only.
- **Shell trap:** Python heredocs in the Bash tool lost backslashes twice: `\b` and `\f` in Windows paths became control characters, and `\\s` became `\s`. Write the script to `$CLAUDE_JOB_DIR\tmp` with the Write tool, then run it. Afterwards, scan tracked files for control characters.
- **Pillow here has no JPEG encoder.** Build PDFs through Chrome (see `canva_assets.mjs`), not Pillow.
- **Canva text and gradients:** if native Canva text can't take a gradient fill, highlights use the solid accent role; previews of that are in `local\canva\fallback\`. Say so in the Doc if it happens.
- **Forking gates (SPEC.md §8):** F3 at about half context. On a handoff, write this file again, launch the successor under the same name, update the roster row, and tell `orchestration`.
