# S-D6 handoff: 2 Nov, about 19:05 Prague

From session 335b2144 to the fresh `s-d6-canva-templates`, at forking gate F3 (context at 57%, flagged by `orchestration`). This file replaces the 18:00 handoff; its to-do list still replaces SPEC.md run steps 7 to 13.

**Read first:** `..\answer-desk\ASKING.md` (reset rules), SPEC.md §9 from the 18:25 rows down, this file, then `local\canva-build-log.md` (the Canva state per template and every method that works or fails). Links (the sign-off Doc, all four Canva designs) are in `local\handoff-links.md`: git-ignored, never copied into a tracked file.

## First, before anything else
1. **Watch the sign-off Doc.** Load `anthropic-skills:docs`, then query its comments (call in `local\handoff-links.md`). No comment from Alex as of 18:46. Arm `ArtifactComments` watch on its link and a CronCreate reminder every 30 minutes (the old session's cron died with it). Since 18:56, everything that needs Alex goes through `orch-alex-prep` (see the routing note below).
2. **Chrome is yours until `s-d10-canva-video` sends SCENE START**, and again after SCENE DONE. Neither had arrived at 19:05.

## Done since 18:00
1. **Canva's font-size box is in points:** the number typed draws 4/3 as many px, and Canva floors each line height to a whole px. Measured in the DOM. The asset pack's two sheets now give each role's Canva size and a line spacing that lands on the mockup's line heights (`local\asset-pack\BUILD-quote-card.md`, `BUILD-all-templates.md`, Shared values). `s-d10-canva-video` was told at 18:25 and corrected its scene brief (quote 42/1.15, name 30/1.2, role 24/1.25, Shift+Enter before "real").
2. **Lock model, settled by test (18:55):** an element "Lock" blocks text editing too, so it's wrong for slots. What works: the **page lock "Only allow replacing content"** (layout and styles locked for everyone, words and the photo slot replaceable) + text elements left unlocked + brand art (backdrop, pills) element-locked so it can't be replaced. Verified by script on each finished template: a text slot enters edit mode; the backdrop offers no Replace.
3. **Gradient highlight Plan A works:** a selected phrase takes the linear gradient on its own.
4. **Built in Canva, named, locked and verified by DOM** (sizes, line heights, tracking, weights per run, colours, alignment, positions):
   - Quote card 1080×1080 (the reused test design)
   - Stat card 1080×1080
   - Portrait post 1080×1350 (with the replaceable image slot)
5. **Event teaser 1200×627: in progress.** Backdrop and CTA pill placed and locked; the date line is done. Remaining boxes, with every value, are in the build log's T5 row.
6. All 17 pack images are uploaded to Alex's Canva uploads (search by file name).
7. One slip, fixed at once: a Ctrl+V in the event teaser pasted Alex's system clipboard (his own unrelated text) as a text box. It was deleted within a minute; nothing was exported or shared. The build log now forbids pasting between designs.

## To-do, in order
1. **Finish the event teaser** (build log T5 row): duplicate the finished date line with Ctrl+D for each remaining box, retype, restyle, place; highlight the title phrase; page lock; verify by script.
2. **The carousel, 6 pages:** File → Make a copy of the portrait post (same size, so no resize), follow the build log's T4 row and `local\asset-pack\BUILD-all-templates.md` T4. Navigate your own tab group's tab to the copy's URL before closing anything.
3. **Folder and Brand Templates:** put all five in one Canva folder `Addvery · LinkedIn templates`; make each a Brand Template if the menu offers it without a brand-kit change. Open designs only by the links in `local\handoff-links.md`; never list, search or open a design you didn't create.
4. **Check the Canva versions against the coded exports** (BUILD-SHEET §9 check 17) with a checking subagent that didn't build them. Exporting downloads our own designs; it's part of the requested check. Expect the body face to differ (flagged in the Doc).
5. **Tell `s-d10-canva-video`** the folder name, with the link in the message only.
6. **On Alex's Doc comment:** approve → copy `local\exports\` PNGs and the carousel's LinkedIn PDF to `exports\`, commit, `TASK DONE s-d6-canva-templates: brand sign-off Doc` to `answer-desk`, `ARCHIVE brand sign-off Doc: readers S-D6, S-D10` to `orchestration`; changes → apply, re-render, run the three checks, swap the Doc's images, then rebuild the Canva versions to match.
7. **`BUILD S-D6-B1` to `website`** (SPEC run step 14). Write `site\d6.md` with `marketing:draft-content` first: a gallery of the exports (carousel as page images, a checked PDF download), a three-line how-it-was-made note, the lock wording "guard rails, binding as Brand Templates", and a "coded where Canva can't" line (DI-10). `orchestration` notes Alex's pixel-perfect demo assets now sit in `..\website\local\alex\pixel-perfect-demo\` (index `local\alex\ASSETS.md`), useful to show where the method comes from. Wait for BUILT or REFUSED.
8. **Final sweep** (run step 15), then `DONE S-D6` to `orchestration` (run step 16).

## Routing (orchestration, 18:56)
- `orchestration`: master only (handoffs, roster, context, charter).
- `orch-alex-prep` (`alex-prep\`): everything that needs Alex, the sign-off Doc included. Send status that matters to Alex there.
- `orch-site-map` (`site-map\`): the site's layout and scope map.
- Questions for Alex still go to `answer-desk`.
- `s-d7-linkedin-content` handed off at 19:00; its COPY S-D7 line comes after Alex signs off the posts. If the final post copy changes, refresh the templates' sample copy.

## Things to know
- **Commit only `canva-templates/`, path-limited.** Never commit `local\`. Tracked files carry no hex codes, font names or Canva links.
- **Shell trap:** Python heredocs turn `\a \b \f` in Windows paths into control characters. Write scripts with the Write tool into `$CLAUDE_JOB_DIR\tmp\scripts\`.
- The in-page helpers are in `local\tools\canva_helpers.js`: paste them into each new editor tab with the Chrome JavaScript tool.
- **Forking gates (SPEC §8):** F3 at about half context. On a handoff: write this file again, launch the successor under the same name, and send `orchestration` `HANDOFF s-d6-canva-templates <new id>`; it removes the old id and updates the roster.
