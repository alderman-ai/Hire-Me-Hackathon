# S-D3 handoff (written 2 Nov 16:55 Prague, during orchestration's reset hold)

Read `CLAUDE.md`, then `SPEC.md` (its decision log, §9, is current to 16:45), then this file. Wait for orchestration's RESTART before doing anything below.

## Where things stand

**Part A, the alert to the six: closed, nothing sent by this session.**
- Alex answered at 16:44 (DI-7 A7.1): "I'm going to do this manually. This is not going to happen through automation ... You can kill this". He sends the alert to the six himself.
- The six never entered GetSales. The alert flow was never created. The pre-send approval file (OT-08) was withdrawn, unticked.
- The pipeline ran up to the computed `custom message 1`: `live-run.md` has every stage's time and whether the rig was recording.
- The drafts, revised after a `marketing:email-sequence` pass at 16:46, are in git-ignored `live\pre-send.md` for his own sends. `addvery-research` has the path.

**Part B, the ICP demo: copy done, nothing built in GetSales yet.**
- Alex's model, about 16:40 (relayed by orchestration): 36 workflows, 4 ICPs × English, Czech, German × 3 tactics, in a folder apart from his own. Only the top workflow needs its messages shown. No classifier gets built or trained. The deliverable is his own screen-recorded walkthrough.
- Grid: `icps\grid.md` (Retail loyalty, Telco CVM, Consumer lending, Last-mile logistics).
- Copy: `icps\<slug>.json` and `.md`, 9 cells each, committed (`f1dde31`). Czech and German need a native read. **The copy hasn't had its skill pass yet** (Alex's rule, 16:40: no copywriting without a copywriting skill; SKILL ON for `marketing:email-sequence` and `marketing:brand-review` came at about 16:45). Name the skill in the subagent's prompt ("invoke marketing:email-sequence first"), or it won't load.
- Graphs: `icps\workflows.json` (36, built by `python -I icps\build_workflows.py`). Same shape as GetSales' T2, with two changes: already connected goes straight to message 1, and there's no automatic like. Message 1 is `{{custom_message_1}}`.
- Routing: `routing\README.md`. Jev is TypeSafe's decision model: typed questions in, a probability for each answer out, no text. It's tuned by labels, not trained. The fictional sample is in `routing\sample.csv`.
- The website research Alex asked for (15:25 to 15:42) now lives in `..\Addvery Research\addvery-website-research\` (git-ignored; `04-team.md` is personal data).

## GetSales

The ids are in `ids.md`. Team: Alex's Team (12269). Folder: "Hackathon demo · Addvery", `39931098-c626-489b-a75d-a78153388d56`, empty. Sender: Alex's own, `a44d7e92-2bf5-4784-83ad-11f91b1f7c6e`. Never list his flows, leads, contacts or inbox.

## Next, after RESTART

1. **Skill pass:** one subagent, prompt naming `marketing:email-sequence` and `marketing:brand-review` (brand capture in `..\Addvery Research\brand\`), over the four ICP files. It applies the fixes and rebuilds `workflows.json`. Commit.
2. **Build:** 36 `create_flow` calls in the folder, with his sender, `nodes` and `first_common_node_id: 2` from `workflows.json`, `template_id: "T2"`, and `name` = the workflow name. Never start any of them, never enrol a lead. Delegate in batches to subagents with the GetSales tools: the guides require `get_guide` (`create_flow`, `write_message`) first. Then read each flow back by id and record the ids in `ids.md`.
3. **Tell Alex** through the desk (a TASK line, or an operator task if orchestration says so) that the folder is ready to record. The top workflow to open is the first one in `workflows.json`.
4. **The clip:** once he has recorded, send `CLIP S-D3-C1` to `s-d9-legibility` with the session or start and end times, his cue words if any, and the folder name exactly as it shows on screen: "Hackathon demo · Addvery".
5. **The site:** `BUILD S-D3-B1` to `website` with `site\section.md`, updated to the 36-workflow model and the alert going by hand. Use `marketing:draft-content` for that copy, and name it in the prompt.
6. **Close** per SPEC §7 step 11, adjusted: no leads anywhere in the folder.

## Open with others

- **orchestration:** ARCHIVE of DI-7 and OT-08; the S2 REQUEST to reword DoD-13 (the alert goes by hand; C06 is folded in). Both acknowledged.
- **website:** S-D3-B3, B4 and B5 are BUILT (preview card, unlisted `/privacy` with noindex). Nothing pending. `/privacy` stays live but unlisted; whether to keep it is Alex's call, since his manual messages may or may not link it.
- **s-d9-legibility:** told at 16:44 that the clip is now his walkthrough. It waits for CLIP S-D3-C1.
- **s1-research:** nothing coming. OT-03 was withdrawn at 17:03 on Alex's instruction ("research is done"), so L-04 doesn't run. The copy rests on the draft method (SPEC §9, 16:18).
- **Archived by S2 (commit 55d81e5):** DI-7, OT-08 and OT-03 are in `..\Operator tasks\Archive\`, and SPEC.md's resource lines point there. The S2 REQUEST on DoD-12 and DoD-13 was being applied to the charter at 17:03.

## Decisions since the last fork

None was forked before. They're all in SPEC §9, from 15:00 to 16:45.
