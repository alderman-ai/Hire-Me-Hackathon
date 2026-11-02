# S-D10 handoff

Written by the outgoing `s-d10-canva-video` session (launched 16:39, id starting acc0550f) ahead of forking gate F0. The F0 section at the bottom is filled in when `READY S-D6` arrives.

## Where things stand (17:20, 2 Nov)

- **Reset, 17:13** (`orchestration` RESTART; Alex's reset rules at the top of `..\answer-desk\ASKING.md`). No intake: the held one (SPEC Appendix A) is dropped and must not be released. S2-Q1 was withdrawn. Alex films tonight, whenever suits him, once the templates are in Canva. The video is Alex's Q10.9 (a): a screen recording of him customising one of the five templates live, up to 15 minutes, with Canva's private panels off camera. This session added a small webcam inset (SPEC §9).
- **Skills switched on** (`SKILL ON`, 17:13): `design:ux-copy`, `marketing:draft-content`, `anthropic-skills:docs`. Design work also needs `frontend-design` (reset rule 5), which this session's skill list didn't show. Ask `orchestration` if yours doesn't either.
- **Done and committed:** `SCENE.md` is the full brief, with the off-camera list (Step 1, 14 items) and the on-camera rules (Step 2: the Projects, Uploads, Brand and Share panels, the profile menu and file pickers kept off camera). L-05 (all reports and the synthesis) and L-01 are applied. SPEC.md is updated for the reset, with §9 rows from 16:45 and 17:20. `.gitignore` covers `local/`, `out/` and video files. Latest commit: 5eca0ab.
- **Messages sent at 17:19:**
  - `s-d6-canva-templates`: send `READY S-D6` with the folder, the link and the scene's template. No edits to that template and no Claude in Chrome from then until S-D10 says the scene is done. Say which templates made it in if not all five.
  - `s-d9-legibility`: heads-up, one clip tonight by the two cues, screen and webcam.
- **Open with nobody:** no desk question, no operator task, no pokes running.

## What the successor does (SPEC run steps 3 to 5)

1. Put the link from `READY S-D6` in `local\link.md` (git-ignored; never in a tracked file or a message to anyone but Alex's brief).
2. Fill `SCENE.md`'s placeholders:
   - `<template>`, from READY or from the previews in `..\canva-templates\exports\`;
   - `<copy>` and `<where the copy is>`, from `..\linkedin-content\demo\posts.md` once `COPY S-D7` says it exists. Pick a post naming no real person. Otherwise placeholder copy, written only after invoking `marketing:draft-content`, saved in `local\copy.md`;
   - the export line: PNG High 1x, or for a carousel PDF Standard with Flatten on.

   If READY reports no templates in Canva, use the draft notes' build-from-backdrop variant. Log any switch in §9.
3. Invoke `anthropic-skills:docs` and follow its guide before any Docs call. Make a Claude Doc from the title down to "When you are done", leaving out the draft notes and the HTML comment. Save its link in `local\doc.md`.
4. Send `answer-desk`: `TASK s-d10-canva-video: the Canva video is ready to record: <Doc link>, about 20 minutes with the off-camera list`.
5. Wait, with no polling, for Alex's comment on the Doc. Then send `TASK DONE s-d10-canva-video: the Canva video`, tell `s-d6-canva-templates` the template is free, note the scene's times here, and take F1.
6. After that: run steps 6 to 10 (the clip from `s-d9-legibility`, the cut, the screen-care check, `site\d10.md` through `design:ux-copy`, `BUILD S-D10-B1`, `DONE S-D10`).

## F0 (filled when READY S-D6 arrives)

- READY S-D6 received at: <time>
- Folder / template for the scene: <from READY>
- Templates in Canva: <all five, or which>
- Link saved in `local\link.md`: <yes/no>
- COPY S-D7: <received or not; path>
- Successor launched at: <time>; `HANDOFF s-d10-canva-video, <time>` sent to `orchestration`, which stops and removes the old id.
