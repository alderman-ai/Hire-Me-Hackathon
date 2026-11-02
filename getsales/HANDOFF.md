# S-D3 handoff (written 2 Nov, about 17:40 Prague, at forking gate G3)

Read `CLAUDE.md`, then `SPEC.md` (§5 is aligned with the charter's C14; the §9 decision log is current to 17:34), then this file. Alex's reset rules at the top of `..\answer-desk\ASKING.md` apply: easy calls are yours (decide, log in SPEC §9, carry on), no plan approvals go to him, written work for outside readers goes in a Claude Doc with a copywriting skill loaded first.

## What Alex wants now (A10.7, 17:23, charter C14)

Two demos, each a blog-style entry in the site's GTM demos list: the video on top, a summary of its transcript below.
- **Demo 1**, about 3 minutes: classification tools in general (Jev), a scroll through the 36 workflows, and the one variable (`{{custom_message_1}}`).
- **Demo 2**, short: leads classified into ICPs, screen-captured through the rig.
Both entries should be live before his meeting with Ivana on 3 Nov. Nothing sends; no classifier is trained.

## Where things stand

- **Copy:** all 36 workflows had a pass with `marketing:email-sequence` and `marketing:brand-review` (commit 3b76d37). Czech and German still want a native read.
- **GetSales** (ids in `ids.md`):
  - The lead custom field `custom_message_1` was created at 17:17.
  - All 36 workflows were built 17:27 to 17:34 in "Hackathon demo · Addvery", with Alex's sender. All are off, with no leads, and each was read back by id.
  - The top one, opened on camera: "Demo · Retail loyalty · EN · proof", `7d24cbf8-67ce-4ac4-9cd7-4c4f7f77c43b`, created last.
  - **One typo:** #23 "Demo · Consumer lending · DE · problem" (`cff86c0b-…`), nodes 7 and 21, has "Folienätzen", which should be "Foliensätzen". `update_flow_step` came back as a preview with a commit_token (gated: "backend lookup failed; gated to be safe"), so it isn't committed. The demo 1 TASK asks Alex to fix it in the UI. If it's still wrong later, leave it, or put a fresh preview to him through the desk (tokens live 5 minutes). Never self-commit a token.
- **Demo 1:** talking points are in a Doc, https://claude.ai/artifact/83CBecbQdNyH3NZi2MLYDq (doc `38fe59ac-f2f3-442c-a3ff-cff84f940f5c`, body node `3c841d47-cb97`). TASK sent to the desk at 17:35.
- **Demo 2:** talking points are in a Doc, https://claude.ai/artifact/XipRZaxFuESjKrTW3qoKmB (doc `f8c8e150-0743-4a0f-a62b-4011b65ff33a`, body node `18411007-27c7`). The screen is `python -I routing\route.py` from `getsales\` (commit f83f781): rules first, Jev's questions with labelled answers, 12 of 12 against the sample. TASK sent at about 17:33; the desk replied "task shown".
- **Copy of all 36:** in a Doc for Alex to skim and edit, https://claude.ai/artifact/Vvapg6BdDS4ToZ2SpaxRH3 (doc `ea3b2554-3332-49be-91d2-3c3c34b3c7ca`, body node `7c7521fc-4b60`). A subagent filled the four ICP sections from `icps\*.json`; see the line at the end of this file.
- **The six:** an optional ten-second beat at the end of demo 1 only. `python -I alert\view.py` writes `live\pipeline-view.html` (local, git-ignored), the six's computed first messages on one screen. S-D9 blurs them if they appear. Alex sends the alert to the six by hand.

## Next, in order

1. **Watch the three Docs for Alex's comments and edits.** Comments go to the session that made the Doc, which is retired after this handoff, so poll: `query(object:"utterance", container:{kind:"project",id:<doc id>}, payload:{under:{object:"node",id:<body id>}})`, and read the tab with `read(... payload {"kind":"view","sinceRev":<rev>})` for edits. Load `anthropic-skills:docs` first. Reply to any comment in its own thread, as a doc comment. Edits to the copy Doc:
   - copy them back into `icps\<slug>.json` and `.md`;
   - rebuild with `python -I icps\build_workflows.py`;
   - apply them to the flows with `update_flow_step` (call `get_guide` with `edit_flow` first). Any preview with a commit_token is Alex's: batch them into one desk ASK.
2. **When Alex has recorded a demo** (the desk or orchestration will say so), send `s-d9-legibility` one CLIP line per demo:
   - `CLIP S-D3-C1: demo 1, "36 workflows, one variable", about 3 minutes, <rig session or start and end times>, cue words <his>, the GetSales folder shows as "Hackathon demo · Addvery". For a blog-style entry in the GTM demos list: video on top, transcript summary below; send the transcript with CLIPPED. Blur the six if their page appears; never his own flows, folders, leads or inbox.`
   - `CLIP S-D3-C2: demo 2, "classifying leads into ICPs", a terminal capture, <times>, <cue words>. Same use.`

   Wait for `CLIPPED` (or `NO CLIP`, then fix and resend as C3 or C4).
3. **Each entry's words:** invoke `marketing:draft-content`, then `anthropic-skills:docs`. Draft a title, a one-line dek and the transcript summary in a Claude Doc, from S-D9's transcript and the talking points. Read the final text back into `site\demo-1.md` and `site\demo-2.md`, and retire the stale `site\section.md`. Then send `website` one BUILD at a time and wait for BUILT:
   - `BUILD S-D3-B1: GTM demos entry "<title>": the video <CLIPPED's path or YouTube id> on top, the summary below, blog-style. Content: getsales\site\demo-1.md.`
   - then B2 for demo 2.

   Both must be live before the meeting on 3 Nov.
4. **Close** (SPEC §7 step 11, adjusted):
   - read the 36 flows by id from `ids.md`: none started, none with leads;
   - run `python -I alert\pipeline.py scan`;
   - send `orchestration` `DONE S-D3: 36 workflows in "Hackathon demo · Addvery" (none started, no leads), demo entries live: <links>`.

## Open with others
- **answer-desk:** two TASK lines are out (demo 2 at about 17:33, demo 1 at 17:35). No question is on the desk.
- **orchestration:** has the plan (about 17:30). C14 is applied to the charter; DI-10 is archived.
- **website:** told at about 17:22 that the footer privacy link, the alert-visitor panel and "How this was made" are not coming. Only the two entries come, after recording. `/privacy` stays live, unlisted.
- **s-d9-legibility:** a fresh session since 17:16. It waits for CLIP lines, now two instead of one. Under its approved defaults the six are blurred if they appear, and clip approval is its own call.
- **s1-research:** nothing coming (L-04 withdrawn).

## Gotchas
- In Python run from a bash heredoc, write Windows paths as raw strings. `"routing\route.py"` in a normal string becomes a carriage return; it happened twice today.
- In GetSales, never list Alex's flows, leads, contacts or inbox: read by id from `ids.md`. Never self-commit a commit_token.
- `live\` is git-ignored; never commit it.

## The copy Doc's state at the fork
Filled at about 17:45: 4 ICP sections and 36 workflow headings, compared paragraph by paragraph against `icps\*.json` with no differences. Nobody has commented yet; its bookmark for edits is the rev after that fill (read the outline once to get it).

## Step 0 for the successor
The old session is `baa79b2c` (`baa79b2c-e1f1-4540-a8ae-278a2b09fb21`). It runs `claude stop` on itself right after launching you. Check `claude agents --json --all`. If it's still listed, run `claude stop baa79b2c` and then `claude rm baa79b2c`, so exactly one `s-d3-getsales` remains. Then put your id in the S-D3 row of `..\SESSIONS.md` and commit it on its own with `[roster]`.
