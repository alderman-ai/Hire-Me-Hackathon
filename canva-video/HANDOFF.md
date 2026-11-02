# S-D10 handoff

Written by the outgoing `s-d10-canva-video` session (launched 16:39, id starting acc0550f) for forking gate F0. F0 now fires when the brainstorm draft is in (SPEC §8, 17:35). The F0 section at the bottom is filled in at the fork.

## Where things stand (17:35, 2 Nov)

- **Reset, 17:13** (`orchestration` RESTART; Alex's reset rules at the top of `..\answer-desk\ASKING.md`). No intakes for Alex: easy calls are yours, decided and logged in SPEC §9. Written work for him goes in Claude Docs. The held intake (SPEC Appendix A) is dropped; never release it.
- **DI-10, Alex at 17:23** (verbatim in `..\Operator tasks\Archive\Decide - everything left that needs you.md`):
  - **Q10.9, the Canva video:** Alex builds one LinkedIn graphic himself on camera, from an asset pack `s-d6-canva-templates` prepares out of his pixel-perfect branded assets repo, following one of its mockups. `SCENE.md` is rewritten for this: a fresh design, the pack's images staged on page 2 as a parts tray while paused, page 1 built on camera, page 2 deleted, export. Screen recording with a small webcam inset, at most 15 minutes.
  - **Q10.11, new deliverable D11:** a Comfy brand-motion brainstorm. A Claude Doc with 6 to 10 ideas, two lines each, covering a 5-second animation of one LinkedIn graphic and a one-minute video like his Gauss piece. He runs Comfy himself, by hand, and picks from the Doc. `orchestration` adds D11 to the charter.
- **Skills switched on** (17:13): `design:ux-copy`, `marketing:draft-content`, `anthropic-skills:docs`. Design work also needs `frontend-design` (reset rule 5), which this session's skill list didn't show. Ask `orchestration` if yours doesn't either.
- **Committed:** `SCENE.md` (the brief, re-planned for the pack), SPEC.md (updated for the reset, Q10.9 and Q10.11, with §9 rows to 17:35), `.gitignore`. Latest: ca14ab0.
- **The brainstorm draft** is `comfy-motion\IDEAS.md`, written by a subagent of the outgoing session from read-only references. It generated nothing and spent no credits.
- **Others:**
  - `s-d9-legibility` confirmed: one clip tonight, from the last "Canva design starts now" before "Canva design done", 3 s padding, screen plus webcam, `CLIPPED` with paths in `legibility\clips\`.
  - `s-d6-canva-templates` (session a841934d) sends `READY S-D6` when the pack is ready, and stays off Claude in Chrome from the brief's TASK line until told the scene is done.
- **Open with nobody:** no desk question, no pokes running.

## What the successor does

1. **The brainstorm Doc** (SPEC brainstorm step B2): invoke `anthropic-skills:docs` and follow its guide before any Docs call. Make a Claude Doc from `comfy-motion\IDEAS.md` and save its link in `local\comfy-doc.md`. Send `answer-desk`: `TASK s-d10-canva-video: Comfy brand-motion ideas are ready for you to pick: <Doc link>`. His pick comes back as a comment on the Doc: record it in `comfy-motion\PICK.md` and tell `orchestration` (B3).
2. **Wait, with no polling, for `READY S-D6`** (the asset pack). Fill `SCENE.md`'s placeholders from it (SPEC run step 3). Make the scene Doc from the title down to "When you are done", leaving out the HTML comment and the draft notes. Save its link in `local\doc.md`. Send `answer-desk`: `TASK s-d10-canva-video: the Canva video is ready to record: <Doc link>, about 20 minutes with the off-camera list` (run step 4).
3. On Alex's comment that the scene is done: `TASK DONE s-d10-canva-video: the Canva video`. Tell `s-d6-canva-templates` it can use Chrome again. Note the times here. Take F1 (run step 5).
4. Then run steps 6 to 10: the clip from `s-d9-legibility`, the cut (`frontend-design` first), the screen-care check, `site\d10.md` through `design:ux-copy`, `BUILD S-D10-B1`, `DONE S-D10`.

## F0 (filled at the fork)

- Brainstorm draft in at: <time>; committed: <hash>
- READY S-D6 received: <not yet / time and contents>
- Successor launched at: <time>; `HANDOFF s-d10-canva-video, <time>` sent to `orchestration`, which stops and removes the old id.
