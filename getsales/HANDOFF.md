# S-D3 handoff (written 2 Nov 16:55 Prague; to-do updated at RESTART, 17:15)

Read `CLAUDE.md`, then `SPEC.md` (its decision log, §9, is current to 16:45), then this file. **RESTART came at 17:13: start on the to-do below straight away.** First read the reset rules at the top of `..\answer-desk\ASKING.md` (commit 1dc71fc), and `..\Operator tasks\Archive\Decide - everything left that needs you.md`. Ask Alex nothing that's already in that file; orchestration relays his answers.

**Rules since the reset:**
- Easy calls are yours: decide, log it in SPEC §9, carry on.
- No plan approvals go to Alex.
- Public sources are fine to show. Only secrets, the Apify proposal and his own outbound outside the demo folder stay off (DoD-22, narrowed).
- Copy for outside readers is drafted in a Claude Doc: invoke the copy skill first, then `anthropic-skills:docs` before any docs call. His comment on the Doc is his edit or sign-off; nothing waits on it.
- Skills are ON for this session: `marketing:email-sequence`, `marketing:brand-review`, `marketing:draft-content`, `anthropic-skills:docs`. Name the skill in any subagent's prompt ("invoke marketing:email-sequence first"), or it won't load.
- In GetSales, call `get_guide` first (`create_flow`, `write_message`), as its rules require.

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

## To-do (orchestration, RESTART 17:13), in order

1. **Copy pass on the 36 workflows, German included.** One subagent invokes `marketing:email-sequence` and `marketing:brand-review` (brand capture in `..\Addvery Research\brand\`), applies the fixes to `icps\<slug>.json` and `.md`, and rebuilds `icps\workflows.json` with `python -I icps\build_workflows.py`. Commit. Then put all 36 workflows' copy in **one Claude Doc** (invoke the copy skill, then `anthropic-skills:docs` first) so Alex can skim and edit it. Nothing waits on his comment.
2. **Build the 36** in the folder "Hackathon demo · Addvery" (`39931098-c626-489b-a75d-a78153388d56`):
   - `create_flow` with his sender `a44d7e92-2bf5-4784-83ad-11f91b1f7c6e`, `workspace_uuid`, `name` = the workflow name, `nodes` and `first_common_node_id: 2` from `workflows.json`, `template_id: "T2"`, and a short `user_request`.
   - No leads, never started. Call `get_guide` (`create_flow`) first.
   - Delegate in batches to subagents with the GetSales tools.
   - Read each flow back by id and record every id in `ids.md`. Commit.
3. **The pipeline for the six, up to each person's computed first message** (his intake's Q10.7 default (b); build it unless orchestration relays (a)). No import into GetSales, nothing sent. **Already done:**
   - `live\six.json` (the six, enrichment notes from his research, each opening line),
   - `live\alert.csv` (the CSV, with `custom_message_1`),
   - `live\pre-send.md` (each person's full first message, revised after the 16:46 skill pass),
   - stage times in `live-run.md`.

   What's left: make it recordable. A one-screen view of the stages (`alert\sequence.md`'s pipeline table, plus the CSV opened in a viewer) that he can show. Public sources may be shown now (DoD-22 narrowed), but keep it to name, role and the computed message. Check against `..\Operator tasks\Archive\Decide - everything left that needs you.md` before deciding what of the six appears on screen.
4. **When both are ready to record,** send `answer-desk` one line: `TASK s-d3-getsales: the GetSales walkthrough is ready to record: <what he shows, in 3 lines>`.
5. **After he records:**
   - `CLIP S-D3-C1` to `s-d9-legibility`, with the session or start and end times, his cue words, and the folder name exactly as it shows: "Hackathon demo · Addvery".
   - `BUILD S-D3-B1` to `website` with `site\section.md`, rewritten to the 36-workflow model and the alert going by hand. Draft it with `marketing:draft-content`.
6. Bring SPEC §5 in line with the charter's new DoD-12 and DoD-13. Close per SPEC §7 step 11, adjusted: no leads anywhere in the folder.

## Open with others

- **orchestration:** ARCHIVE of DI-7 and OT-08; the S2 REQUEST to reword DoD-13 (the alert goes by hand; C06 is folded in). Both acknowledged.
- **website:** S-D3-B3, B4 and B5 are BUILT (preview card, unlisted `/privacy` with noindex). Nothing pending. `/privacy` stays live but unlisted; whether to keep it is Alex's call, since his manual messages may or may not link it.
- **s-d9-legibility:** told at 16:44 that the clip is now his walkthrough. It waits for CLIP S-D3-C1.
- **s1-research:** nothing coming. OT-03 was withdrawn at 17:03 on Alex's instruction ("research is done"), so L-04 doesn't run. The copy rests on the draft method (SPEC §9, 16:18).
- **Archived by S2 (commit 55d81e5):** DI-7, OT-08 and OT-03 are in `..\Operator tasks\Archive\`, and SPEC.md's resource lines point there. The S2 REQUEST is applied (C06, commit b5cb6fd):
  - The charter's D3 row, the S-D3 outline row and DoD-12 now say 36 workflows (4 ICPs × EN/CS/DE × 3 tactics), in a folder apart from his own. Nothing sends from GetSales and no classifier is trained. The alert goes by hand, outside the demo.
  - DoD-13 is now the pipeline up to the computed first message for the six, plus the walkthrough of the 36, shown in a clip from his rig recording.
  - DoD-22 is narrowed to secrets, the Apify proposal and his own outbound outside the demo folder.
  - SPEC.md §5 still has the older wording; bring it in line with the charter at restart.

## Decisions since the last fork

None was forked before. They're all in SPEC §9, from 15:00 to 16:45.
