# S-D6 handoff: 2 Nov, about 18:00 Prague

From session a841934d to the fresh `s-d6-canva-templates`, at forking gate F3 (context past half). This file replaces the 17:16 handoff, and its to-do list replaces SPEC.md run steps 7 to 13.

**Read first:** `..\answer-desk\ASKING.md` (the reset rules at the top), then SPEC.md §9 from the 17:15 rows down, then this file. Links (the sign-off Doc, the Canva test design) are in `local\handoff-links.md`: git-ignored, never copied into a tracked file.

## Done since 17:16
1. **One brand source** (item 1): the templates follow the website's Addvery kit. Every colour already matched. The display and label roles take the kit's stand-in face; a new `font-numeric` role (the kit's stat-counter face) sets the T2 number; pills and the T5 panel take the kit's button and card gradients. Static font files are in `local\fonts\`. Each role in `local\import\_shared\tokens.css` names its kit token. §9, 17:25.
2. **Item 2:**
   - Copy is refreshed from S-D7's final posts (`..\linkedin-content\demo\posts.md`); sources in `local\sample-copy.md`.
   - The three queued fixes are done (p2/p3 titles bottom-aligned, the T1 caption, the p6 CTA).
   - N1 is done: the backdrops leave out the pills, p4 markers and T1 image slot; positions are in `local\canva\native-shapes.json` and the BUILD-NOTES "Native Canva shapes (N1)" table.
   - The design critique and accessibility review ran; what was fixed and what was skipped is in `local\next-fixes.md`.
   - Every check passes: `render.mjs`, then the new `local\tools\slot_check.mjs` (every slot inside its box, no orphans), then `canva_assets.mjs`.
3. **Canva test import**, off camera on the 4K monitor (`local\canva-notes.md`; §9, 17:30):
   - The plan is paid, with Brand Templates.
   - Of the brand's faces, Canva's library has only the kit's body-face stand-in, and nothing may be uploaded. "Create new Brand Kit" was refused by the permission check. Don't retry it; `orchestration` has told Alex he can create the kit himself.
   - Canva builds use that one face with measured letter spacing: display −64, labels +76, body −33, number −50.
   - Canva text takes linear gradients.
4. **The L-05 synthesis questions** for this spec are decided and logged (§9, 17:28).
5. **Brand sign-off Doc**: written, with all five templates (the carousel as six pages) and the two open points. The TASK line went to `answer-desk` at about 17:50, and the desk says "task shown". **Nothing else waits on Alex.**
6. **DI-10 (Alex 17:23, with the 17:26 correction):**
   - No stakeholder cards.
   - Ground everything in his pixel-perfect assets repo (L-05 R1 covers it).
   - Templates usable in Canva out of the gate, coded where Canva can't (the coded exports stay exact).
   - Give him an asset pack for his on-camera build.
   - The archived answers are in `..\Operator tasks\Archive\Decide - everything left that needs you.md`.
7. **Skills:** `frontend-design` didn't load in a841934d; its SKILL.md was read from the plugin cache and followed, and both subagents were told to do the same. `orchestration` has since installed it for this folder: invoke `frontend-design:frontend-design`.

8. **Asset pack** (`local\asset-pack\`), done and checked:
   - Contents: mockups (plus a Canva-fonts preview of the quote card), images (logo, quote mark, image slot, swipe arrow, CTA pills and the T5 panel as PNGs, because Canva can't set angled gradients), backdrops, `BUILD-quote-card.md` (12 steps), `BUILD-all-templates.md` (every slot, shape and image for the Canva build of all five, highlight overlay positions included) and `copy.md` (explicit line breaks where Canva wouldn't balance).
   - Its notes: subhead letter spacing would match better at −48 than −33, and the T2 number at −22 than −50. The brief's values were kept. Revisit them in the Canva build if widths look off.
   - **READY S-D6 went to `s-d10-canva-video` at about 18:10** with every path.

## To-do, in order
1. **Stay off Claude in Chrome between `s-d10-canva-video`'s SCENE START and SCENE DONE** (two Chrome drivers collide on Windows). Answer any question it sends about the pack.
2. **Watch the Doc for Alex's sign-off.** His comment reaches the session that made the Doc, which may be the old one, so query the Doc's comments every 30 minutes (call in `local\handoff-links.md`) and reply in the thread with a doc comment.
   - On "approve": copy `local\exports\` PNGs and the carousel's LinkedIn PDF to `exports\` and commit them (spec Outputs). Send `TASK DONE s-d6-canva-templates: brand sign-off Doc` to `answer-desk` and `ARCHIVE brand sign-off Doc: readers S-D6, S-D10` to `orchestration`.
   - On changes: apply them, re-render, run the three checks, and swap the Doc's images.
3. **The five into Canva through Chrome**, using `local\asset-pack\BUILD-all-templates.md`. Load the `claude-in-chrome` skill first and work in a new tab in the window on the 4K monitor (check with `screen.width * devicePixelRatio = 3840`).
   - Open new designs only by URL (`https://www.canva.com/design?create&width=W&height=H&units=px`). Never show the home page, and never list, search or open a design you didn't create. Canva screenshots often time out, so read the page text by script.
   - Per template: backdrop as the locked background (Lock), then native text boxes at the sheet's positions (Lock position only), then native shapes (pills, markers), then images.
   - Name each `Addvery · LinkedIn · <type> · <size>`, in one folder `Addvery · LinkedIn templates`. Make each a Brand Template if the menu offers it without a brand-kit change.
   - Reuse or rename the test design (see links).
   - Afterwards, check each Canva export against its coded export (BUILD-SHEET §9, check 17), with a checking subagent that didn't build them. Expect the body face to differ (by design, flagged in the Doc).
4. **Tell `s-d10-canva-video`** when the templates are in Canva (folder name; the link in the message only).
5. **`BUILD S-D6-B1` to `website`** (SPEC run step 14). Write `site\d6.md` with `marketing:draft-content` first:
   - a gallery of the exports, with the carousel as page images and a checked PDF download;
   - a three-line how-it-was-made note;
   - the lock wording "guard rails, binding as Brand Templates";
   - a "coded where Canva can't" line, matching DI-10.
   Wait for BUILT or REFUSED.
6. **Final sweep** (run step 15), then `DONE S-D6` to `orchestration` (run step 16).

## Things to know
- **Commit only `canva-templates/`, path-limited.** Never commit `local\`. Tracked files carry no hex codes, font names or Canva links (BUILD-SHEET names roles only).
- **Shell trap (bit again today):** Python heredocs turn `\a \b \f` in Windows paths into control characters. Write scripts with the Write tool into `$CLAUDE_JOB_DIR\tmp\scripts\`. Repair with `fix_ctrl.py` (pattern in a841934d's job dir, or rewrite it) and scan with `grep -nP "[\x00-\x08\x0b\x0c\x0e-\x1f]"`.
- Run fontTools and Pillow scripts without `-I` (they live in user site-packages), from a clean scripts folder.
- The CTA label on the button gradient is 4.4:1 at its worst pixels (AA wants 4.5:1). It's logged in `local\next-fixes.md` as a brand-level choice, not fixed.
- **Forking gates (SPEC §8):** F3 at about half context. On a handoff: write this file again, launch the successor under the same name, and tell `orchestration`, which stops and removes the old id and updates the roster.
