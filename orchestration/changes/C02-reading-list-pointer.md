# C02: The charter's research reading list becomes a pointer to each spec's own

Status: planned
Skill: `propagate`, from S2's own work on an operator answer (no outline-row operation: the S1 row is reworded in place)
Asked by: the operator, through his intake answer (SPEC section 4, "What S2 accepts", item 1)
Planned: 2 Nov · Preview: `Operator tasks\OT-02 Gate approval S2 charter changes C01 C02.md`, together with C01 · New ids: none

**Approval, verbatim:**
- A4.2 (DI-4 Q4.2, `Operator tasks\Archive\DI-4 S2 Orchestrator preflight.md`): "Reading lists go into the executable specs, which are not written yet, or at least to my knowledge. Again consult the knowledge work executable spec in my GitHub. Look how it handles research and specs and everything, and go ahead and model the research section after that,"
- Where findings live, for the pointer's wording:
  - A3.1 (DI-3 Q3.1, `Operator tasks\Archive\DI-3 S1 Research preflight.md`): "the research, when done, should be stored at either the parent or child level (depending on if it's global or local research) and added to the reading list of any specs that need it."
  - S1-Q5 (`answer-desk\qa\S1.md`, answered 13:59): "Just store it locally". `research\SPEC.md` section 6 reads it as: every report stays in `research\`, in `research\global\` for parent-level research and `research\<spec folder>\` for child-level.
- The model, already in S2's spec (`orchestration\SPEC.md` section 5, "Reading lists"): every executable spec carries its own reading list in a "Routing and resources" section, after `alderman-ai/knowledge-work-executable-spec-research`.

**Kept word for word:** the section's bracketed note, "[do not attempt to do this without the operator in the loop -- he will override and micromanage the research part once the meta specs/tooling is set up. ]". It sits inside place 3's Before and After unchanged.

**Dry run:** not run against a scratch copy. Each charter Before text below was checked read-only against the real `CHARTER.md` (2 Nov, about 14:20): each occurs exactly once, none overlaps a C01 place, so C01 and C02 apply in either order, and no After text holds a term on the website's deny list (`website\scripts\sync_docs.py`).

## Places

### 1. CHARTER.md, "Purpose and boundary", item 1
Before:
```
1. **A research reading list:** a place for every spec's research, with its contents decided on the Claude Code side.
```
After:
```
1. **A research reading list:** a pointer to where every spec's research is listed (in each spec) and stored (in `research\`), with its contents decided on the Claude Code side.
```

### 2. CHARTER.md, "Spec outline", the S1 row
Only the Outline cell changes. S1 produces the findings; S2 writes the lines that point at them into each spec (`research\SPEC.md` section 2).

Before:
```
| S1 — Research (meta) | Owns the research subdirectory. Sets the methodology and fills the research reading list with the operator, within the usage budget. | S0 | Research details (he gives these in Claude Code) |
```
After:
```
| S1 — Research (meta) | Owns the research subdirectory. Sets the methodology and, with the operator, produces the findings that each spec's reading list points to, within the usage budget. | S0 | Research details (he gives these in Claude Code) |
```

### 3. CHARTER.md, "Research reading list", the section body
The heading stays, so the name every skill and spec uses for this place still finds it.

Before:
```
[do not attempt to do this without the operator in the loop -- he will override and micromanage the research part once the meta specs/tooling is set up. ]

This section is the project's research reading list: the findings each spec reads before it starts. Filling it is one of the first tasks on the Claude Code side, done with the operator. That pass decides what gets researched, how deep each topic goes, and where findings are stored.

Reading list: empty until that pass fills it.
```
After:
```
[do not attempt to do this without the operator in the loop -- he will override and micromanage the research part once the meta specs/tooling is set up. ]

This section is a pointer, not a list (DI-4 Q4.2). Each executable spec carries its own research reading list, the findings it reads before it starts, in its "Routing and resources" section. What gets researched, and how deep, is decided with the operator through S1, which indexes every finding in `research\DIRECTORY.md`. Reports stay in `research\` (S1-Q5): `research\global\` for research the whole project or several specs need, `research\<spec folder>\` for one spec's own. S2 adds each report to the reading list of every spec that needs it.
```

### 4. CHARTER.md, "S1 Research: parameters", intro
Before:
```
S1 owns the research subdirectory and fills the research reading list through delegated research tasks, within a usage budget that rules out deep research on every topic.
```
After:
```
S1 owns the research subdirectory and produces the findings that each spec's reading list points to, through delegated research tasks, within a usage budget that rules out deep research on every topic.
```

### 5. CHARTER.md, "S1 Research: parameters", the findings bullet
DI-4 Q4.2 puts the reading lists in the specs, not in CLAUDE.md files.

Before:
```
  - Findings stored in one place with an index, so specs' CLAUDE.md reading lists can point at them.
```
After:
```
  - Findings stored in one place, `research\`, with an index, so each spec's own reading list (its "Routing and resources" section) can point at them.
```

### 6. CHARTER.md, "S1 Research: parameters", Done when
Before:
```
- **Done when** every topic agreed with the operator has findings at its chosen depth, linked from the reading list.
```
After:
```
- **Done when** every topic agreed with the operator has findings at its chosen depth, linked from the reading list of every spec that needs them.
```

### 7. CHARTER.md, "S2 Project orchestrator: parameters", the propagate bullet
"CLAUDE.md reading lists" stays: each folder's boot lines are still a dependent place (`orchestration\SPEC.md` section 4).

Before:
```
  - Propagate each change to everything that depends on it: the spec outline, the research reading list, CLAUDE.md reading lists, and specs' links to DoD items.
```
After:
```
  - Propagate each change to everything that depends on it: the spec outline, specs' research reading lists, CLAUDE.md reading lists, and specs' links to DoD items.
```

### 8. Specs' reading lists (each SPEC.md, "Routing and resources")
No edit. No resource line moves, because the charter list was empty. `orchestration\SPEC.md` (section 5) and `research\SPEC.md` (sections 2, 6 and 9) already follow DI-4 Q4.2. `research\SPEC.md` line 5 quotes the bracketed note, which stays, so it remains true.

### 9. CLAUDE.md boot lines
No edit: no shared file moves or is added. `research\CLAUDE.md` line 3 says S1 "fills the research reading list with the operator". That's its role line, not a boot line, so S2 doesn't write it; the notice to `s1-research` names it.

### 10. SESSIONS.md
No edit. The `s1-research` row's role cell says "fills the research reading list with Alex". The roster lets each session edit only its own rows, and C02 adds or splits no row, so the notice to `s1-research` names it instead.

### 11. DoD claims
No edit. DoD-5 (signed off in DI-5) already reads "each report is on the reading list of every spec that needs it".

### Checked, not touched (charter)
The S0 row, "S0 Bootstrap: parameters" ("A CLAUDE.md in each directory, with a reading list that starts with this charter"), "Standing decisions" ("One CLAUDE.md per working directory") and "Spec contract" item 6 ("the CLAUDE.md reading list for that directory") describe each folder's CLAUDE.md boot reading, which C02 doesn't change.

## Held
None.

## Commits and notices (on apply)
- would commit: `git commit -m "[orchestration] C02: the research reading list becomes a pointer to each spec's own" -- CHARTER.md`
- No other file changes, so no other commit. No roster change; no folder, so no excludes sync.
- would send `s1-research`: `S2 C02: the charter's "Research reading list" is now a pointer: each spec carries its own reading list in "Routing and resources", and S1's parameters say it produces the findings those lists point to, as your spec already says. Nothing changes in your folder. Your CLAUDE.md line 3 and your SESSIONS.md role cell still say "fills the research reading list"; reword them if you like.`
- would send `website`: `S2 C02: the charter's "Research reading list" section is now a pointer to each spec's own list, and the S1 and S2 parameters are reworded to match. Re-run scripts\sync_docs.py so the site's charter copy (content\docs\charter.md) matches.`

## Verify
Not applied yet.
