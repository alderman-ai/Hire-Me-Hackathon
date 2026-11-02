# C03: The signed-off definition of done goes into the charter, and the placeholder ids are swapped

Status: applied 2 Nov 14:25
Skill: `change-dod` sign-off (SPEC section 6), then `propagate` for the placeholder swap
Asked by: S2's own DoD work under the charter's mandate (SPEC section 4, "What S2 accepts", item 4), run by a subagent of `orchestration`
Planned: 2 Nov · Preview: none. DI-5 was the preview (`change-dod`, "Sign-off", step 1: "The intake was the preview"), and the placeholder swap is a mechanical follow-on (SPEC section 4, step 2) · New ids: DoD-1 to DoD-22

**Approval, verbatim:**
- A5.1 (DI-5 Q5.1, `Operator tasks\Archive\DI-5 S2 DoD sign-off.md`): "The only thing I want you to change is loosen up the harsh language. Basically take the "research doesn't run without me" kind of language out of the DOD. I might soften that and change the research rules especially if we're running low on time"
- Read as option B with one change, to DoD-4, which was applied in `orchestration\DOD-DRAFT.md` before this record. Every other item is signed off as drafted.

**OT-02 kept intact.** C01 and C02 wait on Alex in `Operator tasks\OT-02 Gate approval S2 charter changes C01 C02.md`. Before this change, each of their 20 Before passages (19 in `CHARTER.md`, 1 in `bootstrap\SPEC.md`) occurred exactly once. C03 edits none of the lines they cover, the Definition of done rule lines included, and adds the table below them. Re-checked after apply (see Verify).

**C01 place 12 still applies on top.** C01 changes the third rule bullet to "... at least one spec or operator-owned row." C03 leaves that bullet as it is, and DoD-10 and DoD-11 are claimed by `S-D2 (operator-owned)`, exactly as in the draft.

## Placeholder map

Copied from the foot of `orchestration\DOD-DRAFT.md`.

| Placeholder | Becomes |
| --- | --- |
| DoD-S0-a, DoD-S0-b | DoD-1 |
| DoD-S0-c | DoD-2 |
| DoD-S0-d, DoD-S0-e | DoD-3 |
| DoD-S1-a, DoD-S1-b, DoD-S1-f | DoD-4 |
| DoD-S1-c, DoD-S1-d, DoD-S1-e | DoD-5 |
| DoD-S2-a | DoD-6 |
| DoD-S2-b, DoD-S2-c | DoD-7 |

The "(to be assigned by S2)" notes go with the placeholders. Where a sentence said the ids were placeholders, it now says S2 assigned them at the sign-off (C03); nothing else in the specs' wording changes.

## Places

### 1. CHARTER.md, "Definition of done", the signed-off table (added below the existing text)
Added below the three rule bullets and the "Once M2 exists" line, which stay word for word. The 22 rows are DOD-DRAFT.md's, verbatim, plus change-dod's Status column (`live`). No C01 or C02 line is touched.

Before:
```
Once M2 exists, its skills add and change items here and update everything that depends on them.
```
After:
```
Once M2 exists, its skills add and change items here and update everything that depends on them.

Signed off by Alex in DI-5 on 2 Nov, with DoD-4 loosened at his request, and written in by S2 as change C03. Ids are never renumbered or reused: a dropped item stays, marked retired.

| Id | Item | How it's checked | Traces to | Claimed by | Status |
| --- | --- | --- | --- | --- | --- |
| DoD-1 | Every spec in the outline and every role session has its own working folder at the project root, with a CLAUDE.md whose reading list starts with the charter. | `propagate check`: every row has a folder and a CLAUDE.md; each reading list's first line is `..\CHARTER.md`. | M0 | S0 | live |
| DoD-2 | Every session follows one set of git rules and commits its own work, and GitHub's `main` holds all committed work by the morning. | `GIT.md` exists; `git log` shows path-limited commits per folder; `origin/main` equals local `main`. | M0 | S0 | live |
| DoD-3 | Any spec session can be launched from its own folder under its roster name, and gets a question through to the answer desk, which shows the operator one question at a time. | Each roster row has a launch line; at least one spec session's question appears in `answer-desk\qa\<asker>.md` with Alex's answer. | M0 | S0 | live |
| DoD-4 | Every wave-2 spec that needs research has a research list, shaped with the operator's input. | Each wave-2 spec that needs research has its list in `research\`, with Alex's input noted where he gave it. | M1 | S1 | live |
| DoD-5 | Every approved research item has a stored report with an index entry, and each report is on the reading list of every spec that needs it. | Every approved item has a report and a `DIRECTORY.md` entry; every reader spec's "Routing and resources" names it. | M1 | S1, S2 | live |
| DoD-6 | A new deliverable can be added to the charter in one step, and every dependent place (outline, run order, DoD, roster, folder, reading lists, the site's deliverables view) shows it. | One `add-deliverable` run, then `propagate check` reports clean. | M2 | S2 | live |
| DoD-7 | The project definition of done is in the charter, every item traced to a deliverable and claimed by at least one outline row, and the outline is marked signed off before wave 2 starts. | The charter's "Definition of done" holds DoD-1 onwards; `propagate check` finds no unclaimed item and no placeholder id; the outline carries "Signed off by S2". | M2 | S2 | live |
| DoD-8 | A legible demo of scraping and research on the Apify API is on the live site, in Addvery's brand. | The site has a D1 section that a visitor can follow without explanation. | D1, D8 | S-D1 | live |
| DoD-9 | The scraping demo's research output exists in a form other specs read, and is on their reading lists. | The output files exist; the specs that consume it name them in "Routing and resources". | D1 | S-D1 | live |
| DoD-10 | Addvery's top six stakeholders are identified and confirmed by the operator. | The six are listed in `Addvery Research\` and marked confirmed by Alex. | D2 | S-D2 (operator-owned) | live |
| DoD-11 | An Addvery brand capture (voice and visual identity) exists for the LinkedIn templates and content demos to use. | The capture is in `Addvery Research\`, and S-D6 and S-D7 name it as a resource. | D6, D7 | S-D2 (operator-owned) | live |
| DoD-12 | Ten ICPs, each with a drip sequence, and a classifier that routes each lead to the right automation are set up in GetSales, with no automation sending except the live run. | GetSales shows the ten sequences and the classifier; no send outside the live run. | D3 | S-D3 | live |
| DoD-13 | The full pipeline (Sales Navigator, CSV export, enrichment from D2, a computed first-message variable, import into GetSales) ran live on the six stakeholders through the operator's own sender profile, and a video clipped from the rig recordings shows it. | The clip exists and is on the site; it shows each pipeline stage. | D3, D9 | S-D3, S-D9 | live |
| DoD-14 | Fifteen minutes of operator dictation turns into a good-looking, near-final blog post, with only the last 10% left to him. | One test dictation produced a post Alex accepted as near-final. | D4 | S-D4 | live |
| DoD-15 | Three blog posts, each from a 15-minute dictation through the blog pipeline and finished by the operator, are published on the site. | The three posts are live on the site. | D5, D8 | S-D5 | live |
| DoD-16 | LinkedIn visual asset templates in Canva, in Addvery's brand, have the operator's brand sign-off. | The templates exist in Canva; Alex's sign-off is recorded. | D6 | S-D6 | live |
| DoD-17 | A demo of LinkedIn content created in Addvery's voice, built on the operator's brand capture repo, has his brand sign-off and is shown on the site. | The demo is on the site; Alex's sign-off is recorded. | D7, D8 | S-D7 | live |
| DoD-18 | The live site, in Addvery's branding, has a section for each of the six stakeholders from D2. | Six stakeholder sections on the live site, matching DoD-10's list. | D8, D2 | S-D8 | live |
| DoD-19 | The site shows every deliverable and its status, so visitors know what to expect, and kept getting clearer through the day without the operator asking. | The site has a deliverables view; the site's history shows additions made from build requests, not only from Alex's instructions. | D8, D9 | S-D8, S-D9 | live |
| DoD-20 | Every processed rig session was reviewed, and its most valuable moments reached the site through build requests to the website session, at least every two hours while sessions were being filed. | `legibility\posted.md` covers every filed session; the gaps between posts while filing never exceed two hours. | D9 | S-D9 | live |
| DoD-21 | A recording of the operator designing in Canva, made near the end, is on the site. | The video is live on the site. | D10, D8 | S-D10 | live |
| DoD-22 | Nothing published (the site, its videos, the public repo) shows secrets, the Apify proposal or the operator's own GetSales outbound. | A check of the site, the published videos and the repo finds none of them. | D1 to D10 | S-D8, S-D9 | live |
```

### 2. bootstrap\SPEC.md, "Spec contract", item 1 (its place)
DoD-S0-a and -b become DoD-1, -c becomes DoD-2, -d and -e become DoD-3. Lines that share an id are merged (change-dod, sign-off step 3), so the count goes from five to three and the placeholder sentence goes.

Before:
```
1. **Its place.** Row S0 of the spec outline. It claims five definition-of-done items, one per output in the charter's S0 parameters. All are placeholders until S2 writes the project definition of done and assigns real ids:
   - DoD-S0-a (to be assigned by S2): a working directory for every spec and role.
   - DoD-S0-b (to be assigned by S2): a CLAUDE.md in each, with a reading list that starts with the charter.
   - DoD-S0-c (to be assigned by S2): Git setup and commit conventions every session follows.
   - DoD-S0-d (to be assigned by S2): the answer desk ported and running.
   - DoD-S0-e (to be assigned by S2): a documented launch for every spec session, which can then message the answer desk and the others.
```
After:
```
1. **Its place.** Row S0 of the spec outline. It claims three definition-of-done items, which cover the five outputs in the charter's S0 parameters. S2 assigned the ids at the DoD sign-off (C03):
   - DoD-1: a working directory for every spec and role, and a CLAUDE.md in each, with a reading list that starts with the charter.
   - DoD-2: Git setup and commit conventions every session follows.
   - DoD-3: the answer desk ported and running, and a documented launch for every spec session, which can then message the answer desk and the others.
```

### 3. bootstrap\SPEC.md, "Definition of done", intro and table
Ids only, plus the intro's placeholder sentence.

Before:
```
S0 is done when any spec session can be launched from its own directory, reads its CLAUDE.md, and gets a question through to the answer desk (charter). Each criterion traces to a placeholder item that S2 replaces with a real id.

| Criterion | DoD item |
| --- | --- |
| Every row of the folder-to-session table exists under its approved name, no folder name carries a spec number, and no adopted folder was overwritten | DoD-S0-a (to be assigned by S2) |
| S0's preflight answers were read from DI-2 and applied | DoD-S0-a (to be assigned by S2) |
| S0-Q1 was answered and its approved move table handed to `orchestration`, or the default (c) was logged | DoD-S0-a (to be assigned by S2) |
| Every new folder, and `research\`, has a CLAUDE.md that passes the step 8 check | DoD-S0-b (to be assigned by S2) |
| Every folder's settings were regenerated by the script, and `--check` reports no changes | DoD-S0-b (to be assigned by S2) |
| `website`, `rig` and `orchestration` have been sent the reading-list lines of step 6 | DoD-S0-b (to be assigned by S2) |
| `..\GIT.md` is adopted as the convention, and every S0 commit is path-limited, on `main` and unpushed | DoD-S0-c (to be assigned by S2) |
| `S0-Q1 queued` came back from the desk to `s0-bootstrap`, launched from `bootstrap\`, whose CLAUDE.md was built from the template and whose settings came from the script | DoD-S0-d and DoD-S0-e (to be assigned by S2) |
| Every new session has its row in `..\SESSIONS.md`, committed with `[roster]`, and the "one per wave-2 spec" placeholder row is gone | DoD-S0-e (to be assigned by S2) |
| Every new folder's CLAUDE.md holds its launch command, and `orchestration` has the handover message | DoD-S0-e (to be assigned by S2) |
```
After:
```
S0 is done when any spec session can be launched from its own directory, reads its CLAUDE.md, and gets a question through to the answer desk (charter). Each criterion traces to a project DoD item in the charter, by the id S2 assigned at the DoD sign-off (C03).

| Criterion | DoD item |
| --- | --- |
| Every row of the folder-to-session table exists under its approved name, no folder name carries a spec number, and no adopted folder was overwritten | DoD-1 |
| S0's preflight answers were read from DI-2 and applied | DoD-1 |
| S0-Q1 was answered and its approved move table handed to `orchestration`, or the default (c) was logged | DoD-1 |
| Every new folder, and `research\`, has a CLAUDE.md that passes the step 8 check | DoD-1 |
| Every folder's settings were regenerated by the script, and `--check` reports no changes | DoD-1 |
| `website`, `rig` and `orchestration` have been sent the reading-list lines of step 6 | DoD-1 |
| `..\GIT.md` is adopted as the convention, and every S0 commit is path-limited, on `main` and unpushed | DoD-2 |
| `S0-Q1 queued` came back from the desk to `s0-bootstrap`, launched from `bootstrap\`, whose CLAUDE.md was built from the template and whose settings came from the script | DoD-3 |
| Every new session has its row in `..\SESSIONS.md`, committed with `[roster]`, and the "one per wave-2 spec" placeholder row is gone | DoD-3 |
| Every new folder's CLAUDE.md holds its launch command, and `orchestration` has the handover message | DoD-3 |
```

### 4. research\SPEC.md, section 2, Place
The placeholder clause becomes the two ids.

Before:
```
- **Place.** Row S1 of the spec outline. It claims the DoD items in section 9, which stay placeholders until S2 assigns real ids.
```
After:
```
- **Place.** Row S1 of the spec outline. It claims the DoD items in section 9, DoD-4 and DoD-5, whose ids S2 assigned at the DoD sign-off (C03).
```

### 5. research\SPEC.md, section 9, intro and table
Ids only, plus the intro's placeholder sentence. The criteria's wording is S1's and stays.

Before:
```
S2 assigns the real ids; these are placeholders. The charter's done line for S1 is "every topic agreed with the operator has findings at its chosen depth, linked from the reading list". Following DI-4 Q4.2, that reading list is each spec's own.

| Criterion | Traces to |
| --- | --- |
| Alex has confirmed the storage reading (S1-Q5) | DoD-S1-a (to be assigned by S2) |
| Every wave-2 spec has a research list that Alex approved, merged or skipped before its methodology was written | DoD-S1-b (to be assigned by S2) |
| Every approved list has a report for each item (about four regular items and exactly three wildcards) plus a synthesis | DoD-S1-c (to be assigned by S2) |
| Every report sits at its level and has a DIRECTORY.md entry | DoD-S1-d (to be assigned by S2) |
| Every report is on the reading list of each spec that needs it (through S2) | DoD-S1-e (to be assigned by S2) |
| No research ran without Alex's approval, and the decision log shows no research decided by default | DoD-S1-f (to be assigned by S2) |
```
After:
```
S2 assigned the real ids at the DoD sign-off (C03). The charter's done line for S1 is "every topic agreed with the operator has findings at its chosen depth, linked from the reading list". Following DI-4 Q4.2, that reading list is each spec's own.

| Criterion | Traces to |
| --- | --- |
| Alex has confirmed the storage reading (S1-Q5) | DoD-4 |
| Every wave-2 spec has a research list that Alex approved, merged or skipped before its methodology was written | DoD-4 |
| Every approved list has a report for each item (about four regular items and exactly three wildcards) plus a synthesis | DoD-5 |
| Every report sits at its level and has a DIRECTORY.md entry | DoD-5 |
| Every report is on the reading list of each spec that needs it (through S2) | DoD-5 |
| No research ran without Alex's approval, and the decision log shows no research decided by default | DoD-4 |
```

### 6. orchestration\SPEC.md, section 2, spec contract item 1 (its place)
DoD-S2-b and -c merge into DoD-7. DoD-5 is added because the charter lists S2 as a claimant of it, with S1, and change-dod writes each claimant's place.

Before:
```
| 1. Its place | Row S2, deliverable M2. Claims `DoD-S2-a` (a charter change takes one step and shows in every dependent place), `DoD-S2-b` (the project DoD exists, every item traced to a deliverable and claimed by a row), `DoD-S2-c` (the spec outline is signed off before wave 2 starts). Placeholders, like S0's and S1's, until S2 writes the DoD (section 6). |
```
After:
```
| 1. Its place | Row S2, deliverable M2. Claims `DoD-6` (a charter change takes one step and shows in every dependent place), `DoD-7` (the project DoD exists, every item traced to a deliverable and claimed by a row, and the spec outline is signed off before wave 2 starts), and, with S1, `DoD-5` (each research report is on the reading list of every spec that needs it). Ids assigned at the DoD sign-off, C03 (section 6). |
```

### 7. orchestration\SPEC.md, section 6, Sign-off
The placeholder examples become the generic pattern, so no placeholder id is left to cite.

Before:
```
swap every placeholder (`DoD-S0-a`, `DoD-S1-a`, `DoD-S2-a` ...) for its real id through `propagate`
```
After:
```
swap every placeholder (`DoD-S<n>-<x>`) for its real id through `propagate`
```

### 8. orchestration\SPEC.md, section 7, Definition of done table
Ids only.

Before:
```
| A new deliverable can be added in one step and every dependent place shows it (charter, S2 "Done when"): one operator instruction, then `propagate check` reports clean | DoD-S2-a (to be assigned by S2) |
| The four skills sit in `orchestration\.claude\skills\`, load in the root session, refuse to run in any other session, and each dry run updates every place it should in the table in section 4 | DoD-S2-a |
| C01 and C02 are applied, and every change has a change record; every change applied on a default has a decision-log row | DoD-S2-a |
| The project DoD is in the charter as DoD-1 onwards, every item traced to a deliverable, reviewed by the operator or signed off on its default | DoD-S2-b |
| Every live DoD item is claimed by at least one outline row, and no spec still cites a placeholder | DoD-S2-b |
| The outline is marked signed off in the charter before wave 2 starts | DoD-S2-c |
```
After:
```
| A new deliverable can be added in one step and every dependent place shows it (charter, S2 "Done when"): one operator instruction, then `propagate check` reports clean | DoD-6 |
| The four skills sit in `orchestration\.claude\skills\`, load in the root session, refuse to run in any other session, and each dry run updates every place it should in the table in section 4 | DoD-6 |
| C01 and C02 are applied, and every change has a change record; every change applied on a default has a decision-log row | DoD-6 |
| The project DoD is in the charter as DoD-1 onwards, every item traced to a deliverable, reviewed by the operator or signed off on its default | DoD-7 |
| Every live DoD item is claimed by at least one outline row, and no spec still cites a placeholder | DoD-7 |
| The outline is marked signed off in the charter before wave 2 starts | DoD-7 |
```

### 9. orchestration\SPEC.md, section 9, decision log, DI-4 Q4.2 reading 2
The placeholder examples become the generic pattern; the decision is unchanged.

Before:
```
S0 and S1 cite placeholder DoD ids (DoD-S0-a, DoD-S1-a ...), which S2 swaps for DoD-1 onwards at sign-off.
```
After:
```
S0 and S1 cite placeholder DoD ids (`DoD-S<n>-<x>`), which S2 swaps for DoD-1 onwards at sign-off.
```

### 10. orchestration\DOD-DRAFT.md, the Status line
change-dod, sign-off step 4.

Before:
```
Waiting to be written into the charter by `change-dod`. Once signed off, it goes into the charter's "Definition of done" through `change-dod`, and the placeholder ids in the specs are swapped for these ids through `propagate`.
```
After:
```
**Written into the charter as C03** (2 Nov), and the placeholder ids in the specs swapped for these ids in the same change. The charter's "Definition of done" is now the source of truth: later changes go there through `change-dod`, not here.
```

## Not touched

- `website\content\docs\charter.md`, `s0-bootstrap.md`, `s1-research.md` and `s2-orchestrator.md`: the site's redacted copies, written by `website\scripts\sync_docs.py` from the files above. `website` owns them and re-syncs on the notice below. Until it does, check mode lists the placeholders in its copies as citation gaps.
- `orchestration\.claude\skills\change-dod\SKILL.md`, `propagate\SKILL.md` and `orchestration\propagate_check.py`: they name `DoD-S0-a` as an example of the placeholder form, not as a claim, and check mode reads neither `.claude\` nor `.py` files.
- Records: `orchestration\changes\` (C01 and C02 untouched) and `Operator tasks\`, OT-02 and the archive included.
- The charter's outline, run order and deliverables: no row is added, merged or split, and every one of the 22 items is claimed by a live row.
- CLAUDE.md boot lines and `SESSIONS.md`: no shared file moves and no roster row changes.

## Held

None. No wave-2 SPEC.md exists yet. When one is written, it cites the ids its row claims in the charter (DoD-8 onwards), and check mode reports any it doesn't.

## Commits and notices

- `git commit -m "[orchestration] C03: write the signed-off definition of done into the charter" -- CHARTER.md`
- `git commit -m "[orchestration] C03: swap S0's placeholder DoD ids for DoD-1 to DoD-3" -- bootstrap/SPEC.md`
- `git commit -m "[orchestration] C03: swap S1's placeholder DoD ids for DoD-4 and DoD-5" -- research/SPEC.md`
- `git commit -m "[orchestration] C03: swap S2's placeholder DoD ids for DoD-5 to DoD-7" -- orchestration/SPEC.md`
- `git commit -m "[orchestration] C03 record; DOD-DRAFT.md is now in the charter" -- orchestration/DOD-DRAFT.md orchestration/changes/C03-dod-signed-off.md`

Notices, for `orchestration` to send (this change ran in a subagent, which messages no one):
- `s1-research`: S2 changed research\SPEC.md for C03: the placeholder DoD ids are now the charter's real ones (DoD-S1-a, b and f are DoD-4; c, d and e are DoD-5) in section 2 and section 9, with your criteria's wording untouched. Alex loosened DoD-4 in DI-5 ("take the 'research doesn't run without me' kind of language out of the DOD"), and your section 9 still says lists are approved "before its methodology was written" and "No research ran without Alex's approval"; reword those if you want them to match.
- `website`: S2 C03: the charter's "Definition of done" now holds DoD-1 to DoD-22, signed off by Alex in DI-5, and the S0, S1 and S2 specs cite those ids instead of placeholders. Re-run scripts\sync_docs.py so content\docs\ matches. It will refuse until you add redactions for two new rows: DoD-13 has "sender profile" and DoD-22 has "proposal" and "own GetSales outbound" (exact strings in orchestration\changes\C03-dod-signed-off.md, "Website redactions").
- `wave2-specs`: S2 C03: the project definition of done is in the charter as DoD-1 to DoD-22 (signed off in DI-5). Each wave-2 spec cites the ids its row claims there, never placeholders.
- `bootstrap\SPEC.md`: its owner `s0-bootstrap` isn't on the running roster, so no notice.

## Website redactions

`website\scripts\sync_docs.py` refuses to write any doc in which a deny-listed term survives redaction. Two of the new charter rows hold such terms. Pairs that clear them, checked against the script's REDACTIONS and DENY lists:
- DoD-13: `" on the six stakeholders through the operator's own sender profile"` → `""`
- DoD-22: `"secrets, the Apify proposal or the operator's own GetSales outbound"` → `"secrets or private material"`

## Verify

Applied 2 Nov, about 14:25. Commits: `df8093a` (charter), `06661e3` (bootstrap), `502fc20` (research), `a29d0fa` (orchestration SPEC), then this record with `DOD-DRAFT.md`.
- **Places 1 to 10:** each After text reads back exactly once in its file. CHARTER.md: 27 lines added, none removed. `research\SPEC.md` keeps its CRLF line endings.
- **OT-02:** after the charter commit and again after the spec commits, all 20 Before passages of C01 and C02 (19 in `CHARTER.md`, 1 in `bootstrap\SPEC.md`) still occur exactly once.
- **Placeholders:** `git grep "DoD-S[0-9]-[a-z]"` finds none in `CHARTER.md` or the three SPEC.md files.
- **`propagate check`, before:** 1 gap (`[roster] S-D2`, which C01 closes) and 32 placeholders as notes.
- **`propagate check`, after:** DoD signed off, 22 items live, no `dod` or `dod links` gap: every item traces to a deliverable and is claimed by a live row, and S0, S1 and S2 each cite every id they claim. 55 gaps:
  - 36 `[citations]`, all in `website\content\docs\` (s0-bootstrap 16, s1-research 6, s2-orchestrator 14). These are the site's copies of the specs from before this change. They clear when `website` re-syncs, which first needs the two redactions above. **Open: owned by `website`.** It's on the notice.
  - 1 `[roster] S-D2`: as before, C01 closes it.
  - 15 `[resources]` in `scraping\`, `getsales\`, `canva-templates\` and `linkedin-content\` SPEC.md, and 3 `[changes]` (C01's held lines for S-D3, S-D6 and S-D7 can now be delivered). Not C03's: `wave2-specs` drafted those specs during this change (`0285a23`, `7362665`, and two not yet committed). C01 delivers its held lines when it applies.
