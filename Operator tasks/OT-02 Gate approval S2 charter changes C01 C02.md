---
System Primitive: Operator task
Task type: Gate approval
Task id: OT-02
Task State: Open
Gate: S2 charter change preview (C01, C02)
Requested by: orchestration
Snapshot of: orchestration\changes\C01-sd2-operator-owned.md and C02-reading-list-pointer.md at the commit that adds this task
Unblocks: applying C01 and C02 to the charter, which clears the last consistency gap before the outline sign-off and wave 2
Created: 2026-11-02 14:18 Prague
---

# OT-02 Gate approval: S2 charter change preview (C01, C02)

This is S2's first preview of charter changes. Both changes write answers you've already given into `CHARTER.md`: C01 makes S-D2 your own row (DI-2 Q2.2, DI-3 Q3.3), and C02 turns the charter's research reading list into a pointer to each spec's own list (DI-4 Q4.2). Approving applies both: `orchestration` writes every line below into the charter, sends the notices, and runs its consistency check. To drop or change one, leave the box empty and write it in the fence, for example "apply C01 only", "drop both", or a place number and your wording. It's blocking now: the spec outline can't be signed off, and wave 2 can't start, while the charter contradicts your answers. Until 18:00 Prague S2 waits for you. From 18:00 it applies both as written and logs that, because both only carry out answers you've given.

## What's being approved

**Summary.**
- C01: S-D2 (Addvery, its six stakeholders and brand capture) stays in the outline but becomes yours, marked operator-owned, with no spec or session, in `Addvery Research\`.
- C01 also rewrites the lines that would otherwise contradict that: the S-D6 and S-D7 inputs, the run order and scenes, two intros, one DoD rule, and S1's priority; and it ticks the brand-capture open question.
- C02: the "Research reading list" section becomes a pointer. Each spec carries its own reading list, and reports stay in `research\`, indexed by S1.
- C02 also rewords the six other lines that describe one central list. The bracketed note on you steering research stays word for word.
- Outside the charter, nothing is edited now. Resource lines pointing S-D3, S-D6, S-D7 and S-D8 at `Addvery Research\` wait until those specs exist, and `website` and `s1-research` get one-line notices.

The full records, with every exact text: `orchestration\changes\C01-sd2-operator-owned.md` and `orchestration\changes\C02-reading-list-pointer.md`. Place numbers below match them.

### C01: S-D2 becomes operator-owned, with brand capture

**What and why.** S-D2 keeps its id but becomes yours, with no spec or session, and brand capture moves into it, because you said "I own this subdirectory. … we don't need any spec from the project orchestrator from the charter" (DI-2 Q2.2) and "I'm going to be doing it in the subdirectory Addvery Research. You do not need to build a spec to handle that" (DI-3 Q3.3).

**1. Spec outline, the S-D2 row, old and new side by side.**

| Cell | Before | After |
| --- | --- | --- |
| Spec | S-D2 — Company and stakeholder research | S-D2 — Company and stakeholder research (operator-owned) |
| Outline | Researches Addvery and finds its top six stakeholders. | Operator-owned, with no spec or session (DI-2 Q2.2, DI-3 Q3.3): the operator researches Addvery, finds its top six stakeholders and captures its brand himself, one-on-one, in `Addvery Research\`, which is local and git-ignored. |
| Depends on | S1; may use S-D1's scrapers | May use S-D1's scrapers |
| Needs the operator for | Confirming the six stakeholders | All of it: he runs it himself, one-on-one |

**2 and 3. Spec outline, the S-D6 and S-D7 rows, "Depends on" cell (the other cells don't change).**
> **Before:** Addvery brand capture
>
> **After:** Addvery brand capture, from S-D2 (the operator's own, in `Addvery Research\`)

**4. Run order, step 3.**
> **Before:** 3. **S-D1 Scraping and S-D2 Addvery research**, first in wave 2, because others consume them.
>
> **After:** 3. **S-D1 Scraping and S-D2 Addvery research**, first in wave 2, because others consume them. S-D2 has no session: the operator runs it himself in `Addvery Research\`.

**5. Run order, step 4, the S-D2 bullet.**
> **Before:** S-D2 feeds S-D3 (GetSales) and S-D8 (website).
>
> **After:** S-D2, from `Addvery Research\`, feeds S-D3 (GetSales) and S-D8 (website).

**6. Run order, step 4, the brand-capture bullet.**
> **Before:** Brand capture feeds S-D6 (Canva templates) and S-D7 (LinkedIn content). S-D6 feeds S-D10 (Canva video).
>
> **After:** Brand capture, part of S-D2 and also in `Addvery Research\`, feeds S-D6 (Canva templates) and S-D7 (LinkedIn content). S-D6 feeds S-D10 (Canva video).

**7. Run order, the operator scenes.**
> **Before:** **Operator scenes to shoot today:** the S0 directory approval, S1 research details, confirming the six stakeholders, the S-D3 live run, the S-D4 test dictation and the three S-D5 dictations, brand sign-off, and the S-D10 Canva recording.
>
> **After:** **Operator scenes to shoot today:** the S0 directory approval, S1 research details, his own S-D2 work in `Addvery Research\` (Addvery, the six stakeholders and brand capture), the S-D3 live run, the S-D4 test dictation and the three S-D5 dictations, brand sign-off, and the S-D10 Canva recording.

**8. Risks and open questions, the brand-capture question, ticked.**
> **Before:** - [ ] Who owns Addvery brand capture: S1 as shared research, or S-D2?
>
> **After:** - [x] Who owns Addvery brand capture: S1 as shared research, or S-D2? Answered: the operator, as part of S-D2, which he runs himself in `Addvery Research\` with no spec (DI-2 Q2.2, DI-3 Q3.3).

Places 9 to 12 weren't in the first plan. Checking the plan against a copy of the charter showed each would contradict the charter once S-D2 is yours.

**9. Deliverables, intro.**
> **Before:** The project has ten client-facing deliverables plus three meta deliverables, in two waves. Every client-facing deliverable is a demonstration in the Addvery brand: legibility matters more than function, and no real data runs through it except where noted. Each one becomes its own spec.
>
> **After:** The project has ten client-facing deliverables plus three meta deliverables, in two waves. Every client-facing deliverable is a demonstration in the Addvery brand: legibility matters more than function, and no real data runs through it except where noted. Each one becomes its own spec, except D2, which the operator runs himself.

**10. Spec outline, intro.**
> **Before:** This is the decomposition, not the specs themselves. Each row is one future executable spec. Once the definition of done exists, every item in it must be claimed by at least one row.
>
> **After:** This is the decomposition, not the specs themselves. Each row is one future executable spec, except a row marked operator-owned, which the operator runs himself with no spec. Once the definition of done exists, every item in it must be claimed by at least one row.

**11. S1 Research: parameters, Priority.**
> **Before:** **Priority.** S-D1 (scraping) and S-D2 (Addvery and stakeholders) come first, because other specs consume them. Shared topics such as brand capture are researched once, never per spec.
>
> **After:** **Priority.** S-D1 (scraping) comes first, because other specs consume it. Addvery, its six stakeholders and brand capture are the operator's own (S-D2), so S1 has no Addvery topics. Shared topics are researched once, never per spec.

**12. Definition of done, the third rule.** This is the one place that changes a rule. DoD-10 (the six stakeholders) and DoD-11 (brand capture) are claimed only by your S-D2 row, which after place 10 isn't a spec.
> **Before:** The spec outline is complete only when every item is claimed by at least one spec.
>
> **After:** The spec outline is complete only when every item is claimed by at least one spec or operator-owned row.

**Every other place C01 touches.**
- `bootstrap\SPEC.md` (its S-D2 folder row) and `SESSIONS.md` (no S-D2 session): already in this state. No edit.
- DoD-10 and DoD-11 in the signed-off DoD draft: already claimed by S-D2 (operator-owned). No edit.
- Held until each spec exists: one resource line each for S-D3, S-D6, S-D7 and S-D8, pointing at `Addvery Research\` on the local disk, never on GitHub, and never edited.
- Notices: `website` (show S-D2 as yours, with no session, and re-sync the site's copy of the charter), and `s1-research` (its priority line now matches its spec; nothing in its folder changes).
- `Addvery Research\` itself: never touched.

### C02: The research reading list becomes a pointer to each spec's own

**What and why.** The charter's "Research reading list" section stops being one central list and points to where research now lives: each executable spec carries its own reading list in its "Routing and resources" section, and S1 keeps every report in `research\`, indexed in `research\DIRECTORY.md`. You said "Reading lists go into the executable specs" (DI-4 Q4.2), and, on storage, "Just store it locally" (S1-Q5).

**3. Research reading list, the section body.** The heading stays. The bracketed note stays word for word.
> **Before:**
> [do not attempt to do this without the operator in the loop -- he will override and micromanage the research part once the meta specs/tooling is set up. ]
>
> This section is the project's research reading list: the findings each spec reads before it starts. Filling it is one of the first tasks on the Claude Code side, done with the operator. That pass decides what gets researched, how deep each topic goes, and where findings are stored.
>
> Reading list: empty until that pass fills it.

> **After:**
> [do not attempt to do this without the operator in the loop -- he will override and micromanage the research part once the meta specs/tooling is set up. ]
>
> This section is a pointer, not a list (DI-4 Q4.2). Each executable spec carries its own research reading list, the findings it reads before it starts, in its "Routing and resources" section. What gets researched, and how deep, is decided with the operator through S1, which indexes every finding in `research\DIRECTORY.md`. Reports stay in `research\` (S1-Q5): `research\global\` for research the whole project or several specs need, `research\<spec folder>\` for one spec's own. S2 adds each report to the reading list of every spec that needs it.

**1. Purpose and boundary, item 1.**
> **Before:** 1. **A research reading list:** a place for every spec's research, with its contents decided on the Claude Code side.
>
> **After:** 1. **A research reading list:** a pointer to where every spec's research is listed (in each spec) and stored (in `research\`), with its contents decided on the Claude Code side.

**2. Spec outline, the S1 row, Outline cell (the other cells don't change).**
> **Before:** Owns the research subdirectory. Sets the methodology and fills the research reading list with the operator, within the usage budget.
>
> **After:** Owns the research subdirectory. Sets the methodology and, with the operator, produces the findings that each spec's reading list points to, within the usage budget.

**4. S1 Research: parameters, intro.**
> **Before:** S1 owns the research subdirectory and fills the research reading list through delegated research tasks, within a usage budget that rules out deep research on every topic.
>
> **After:** S1 owns the research subdirectory and produces the findings that each spec's reading list points to, through delegated research tasks, within a usage budget that rules out deep research on every topic.

**5. S1 Research: parameters, the findings bullet.**
> **Before:** Findings stored in one place with an index, so specs' CLAUDE.md reading lists can point at them.
>
> **After:** Findings stored in one place, `research\`, with an index, so each spec's own reading list (its "Routing and resources" section) can point at them.

**6. S1 Research: parameters, Done when.**
> **Before:** **Done when** every topic agreed with the operator has findings at its chosen depth, linked from the reading list.
>
> **After:** **Done when** every topic agreed with the operator has findings at its chosen depth, linked from the reading list of every spec that needs them.

**7. S2 Project orchestrator: parameters, the propagate bullet.**
> **Before:** Propagate each change to everything that depends on it: the spec outline, the research reading list, CLAUDE.md reading lists, and specs' links to DoD items.
>
> **After:** Propagate each change to everything that depends on it: the spec outline, specs' research reading lists, CLAUDE.md reading lists, and specs' links to DoD items.

**Every other place C02 touches.**
- Specs' reading lists: no edit. The charter list was empty, so nothing moves, and the S1 and S2 specs already work this way.
- DoD-5 (signed off in DI-5) already says each report goes "on the reading list of every spec that needs it". No edit.
- Checked and left alone: the charter's lines on each folder's CLAUDE.md reading list (the S0 row and parameters, "Standing decisions", spec contract item 6). Those describe a session's startup reading, which C02 doesn't change.
- Notices: `s1-research` (the charter now matches its spec; its own CLAUDE.md role line and its roster row still say "fills the research reading list", for it to reword), and `website` (re-sync the site's copy of the charter).

## Approval

- [ ] I approve

Tick the box to approve as it stands. If something has to change first, leave the box empty and write what to change below. Either way, the requesting session checks this file every 5 minutes while it's blocked.

`<operator_answer>`
```ot-02-changes

```
`</operator_answer>`
