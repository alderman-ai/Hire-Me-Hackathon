# C01: S-D2 becomes operator-owned, with brand capture

Status: planned
Skill: `change-outline`, operator-owned
Asked by: the operator, through his intake answers (SPEC section 4, "What S2 accepts", item 1)
Planned: 2 Nov · Preview: `Operator tasks\Approve - Addvery research is yours, reading lists per demo.md` (OT-02), together with C02 · New ids: none

**Approval, verbatim:**
- A2.2 (DI-2 Q2.2, `Operator tasks\Archive\DI-2 S0 Bootstrap preflight.md`): "I own this subdirectory. I'm going to be heavily involved in this and we don't need any spec from the project orchestrator from the charter. I'm going to handle this one-on-one and it's also going to be ignored just so we're not posting, even though it's public information inside. I'm handling this so the project orchestrator subdirectory can ignore this for now. I'll let it know or it can check just by the contents. Important: it'll be getting ignored from the public repo so the orchestrator needs that information. It needs to get it from the local machine not the GitHub repo"
- A3.3 (DI-3 Q3.3, `Operator tasks\Archive\DI-3 S1 Research preflight.md`): "I'm on this. I'm going to be doing it in the subdirectory Addvery Research. You do not need to build a spec to handle that. I'm going to handle that one-on-one"

**Dry run:** 2 Nov, about 14:00, by hand against a scratch copy (`%TEMP%\s2-dryrun-c01\Hire me hackaton`), following `change-outline` with the desk preview skipped. The eight charter Before texts of places 1 to 8 were each found exactly once and replaced; the scratch copy was then deleted. The real `CHARTER.md` is untouched.

**Added after the dry run (2 Nov, about 14:20):** places 9 to 12. The dry run found that three charter lines outside the listed places contradict the charter as C01 leaves it (places 9 to 11). Finishing the record found a fourth, the Definition of done rule that items are claimed "by at least one spec" (place 12): S-D2's items, DoD-10 and DoD-11 in `orchestration\DOD-DRAFT.md`, are claimed only by the S-D2 row, which no longer has a spec. These four weren't dry-run. Their Before texts were checked read-only against the real `CHARTER.md`: each occurs exactly once, none overlaps another place in C01 or C02, and no After text in C01 holds a term on the website's deny list (`website\scripts\sync_docs.py`).

## Places

### 1. CHARTER.md, "Spec outline", the S-D2 row
"Depends on" drops S1: S1 has no Addvery topics (A3.3; `research\SPEC.md` section 1). The `(operator-owned)` mark in the Spec cell is what `propagate` check mode skips on.

Before:
```
| S-D2 — Company and stakeholder research | Researches Addvery and finds its top six stakeholders. | S1; may use S-D1's scrapers | Confirming the six stakeholders |
```
After:
```
| S-D2 — Company and stakeholder research (operator-owned) | Operator-owned, with no spec or session (DI-2 Q2.2, DI-3 Q3.3): the operator researches Addvery, finds its top six stakeholders and captures its brand himself, one-on-one, in `Addvery Research\`, which is local and git-ignored. | May use S-D1's scrapers | All of it: he runs it himself, one-on-one |
```

### 2. CHARTER.md, "Spec outline", the S-D6 row ("Addvery brand capture")
Before:
```
| S-D6 — Canva LinkedIn templates | Addvery-branded LinkedIn templates in Canva, redoing the earlier pixel-perfect assets demo. | Addvery brand capture | Brand sign-off |
```
After:
```
| S-D6 — Canva LinkedIn templates | Addvery-branded LinkedIn templates in Canva, redoing the earlier pixel-perfect assets demo. | Addvery brand capture, from S-D2 (the operator's own, in `Addvery Research\`) | Brand sign-off |
```

### 3. CHARTER.md, "Spec outline", the S-D7 row ("Addvery brand capture")
Before:
```
| S-D7 — LinkedIn content creation demo | LinkedIn content in Addvery's voice, built on the subjective brand capture repo. | Addvery brand capture | Brand sign-off |
```
After:
```
| S-D7 — LinkedIn content creation demo | LinkedIn content in Addvery's voice, built on the subjective brand capture repo. | Addvery brand capture, from S-D2 (the operator's own, in `Addvery Research\`) | Brand sign-off |
```

### 4. CHARTER.md, "Run order", step 3
Before:
```
3. **S-D1 Scraping and S-D2 Addvery research**, first in wave 2, because others consume them.
```
After:
```
3. **S-D1 Scraping and S-D2 Addvery research**, first in wave 2, because others consume them. S-D2 has no session: the operator runs it himself in `Addvery Research\`.
```

### 5. CHARTER.md, "Run order", step 4, the S-D2 bullet
Before:
```
   - S-D2 feeds S-D3 (GetSales) and S-D8 (website).
```
After:
```
   - S-D2, from `Addvery Research\`, feeds S-D3 (GetSales) and S-D8 (website).
```

### 6. CHARTER.md, "Run order", step 4, the brand-capture bullet
Before:
```
   - Brand capture feeds S-D6 (Canva templates) and S-D7 (LinkedIn content). S-D6 feeds S-D10 (Canva video).
```
After:
```
   - Brand capture, part of S-D2 and also in `Addvery Research\`, feeds S-D6 (Canva templates) and S-D7 (LinkedIn content). S-D6 feeds S-D10 (Canva video).
```

### 7. CHARTER.md, "Run order", the operator scenes
Before:
```
**Operator scenes to shoot today:** the S0 directory approval, S1 research details, confirming the six stakeholders, the S-D3 live run, the S-D4 test dictation and the three S-D5 dictations, brand sign-off, and the S-D10 Canva recording.
```
After:
```
**Operator scenes to shoot today:** the S0 directory approval, S1 research details, his own S-D2 work in `Addvery Research\` (Addvery, the six stakeholders and brand capture), the S-D3 live run, the S-D4 test dictation and the three S-D5 dictations, brand sign-off, and the S-D10 Canva recording.
```

### 8. CHARTER.md, "Risks and open questions", the brand-capture question (ticked)
Before:
```
- [ ] Who owns Addvery brand capture: S1 as shared research, or S-D2?
```
After:
```
- [x] Who owns Addvery brand capture: S1 as shared research, or S-D2? Answered: the operator, as part of S-D2, which he runs himself in `Addvery Research\` with no spec (DI-2 Q2.2, DI-3 Q3.3).
```

### 9. CHARTER.md, "Deliverables", intro
"Each one becomes its own spec" stops being true of D2.

Before:
```
The project has ten client-facing deliverables plus three meta deliverables, in two waves. Every client-facing deliverable is a demonstration in the Addvery brand: legibility matters more than function, and no real data runs through it except where noted. Each one becomes its own spec.
```
After:
```
The project has ten client-facing deliverables plus three meta deliverables, in two waves. Every client-facing deliverable is a demonstration in the Addvery brand: legibility matters more than function, and no real data runs through it except where noted. Each one becomes its own spec, except D2, which the operator runs himself.
```

### 10. CHARTER.md, "Spec outline", intro
"Each row is one future executable spec" stops being true of the S-D2 row. The phrase "operator-owned" here is prose, not a marker: check mode reads markers only at the end of a row's Spec cell.

Before:
```
This is the decomposition, not the specs themselves. Each row is one future executable spec. Once the definition of done exists, every item in it must be claimed by at least one row.
```
After:
```
This is the decomposition, not the specs themselves. Each row is one future executable spec, except a row marked operator-owned, which the operator runs himself with no spec. Once the definition of done exists, every item in it must be claimed by at least one row.
```

### 11. CHARTER.md, "S1 Research: parameters", Priority
The line puts S-D2 and brand capture in S1's research queue, which A3.3 takes out ("You do not need to build a spec to handle that"; `research\SPEC.md` section 1: "S1 has no Addvery topics").

Before:
```
- **Priority.** S-D1 (scraping) and S-D2 (Addvery and stakeholders) come first, because other specs consume them. Shared topics such as brand capture are researched once, never per spec.
```
After:
```
- **Priority.** S-D1 (scraping) comes first, because other specs consume it. Addvery, its six stakeholders and brand capture are the operator's own (S-D2), so S1 has no Addvery topics. Shared topics are researched once, never per spec.
```

### 12. CHARTER.md, "Definition of done", the third rule
DoD-10 and DoD-11 are claimed only by the S-D2 row, which after place 10 is no spec. The outline intro already says "claimed by at least one row", and `orchestration\DOD-DRAFT.md` (signed off in DI-5) says the same, so only this line needs the exception.

Before:
```
- The spec outline is complete only when every item is claimed by at least one spec.
```
After:
```
- The spec outline is complete only when every item is claimed by at least one spec or operator-owned row.
```

### 13. bootstrap\SPEC.md, folder-to-session table, the S-D2 row (no folder made)
Already in C01's state: S0 wrote it on DI-2's answers. No edit. The "Addvery research and brand capture" row below it (`Addvery Research\`, no session, "Alex's own, git-ignored") also already matches.

Before and after (unchanged):
```
| S-D2 Company and stakeholder research | none from S0 | none | — | operator-owned: Alex runs it himself in `Addvery Research\` |
```

### 14. SESSIONS.md
Already in C01's state: no S-D2 row; `Addvery Research\` is under "Not sessions"; the `s-d3-getsales`, `s-d6-canva-templates` and `s-d7-linkedin-content` Planned rows already wait on Alex's work in `Addvery Research\`. No edit, no `[roster]` commit.

### 15. DoD claims
The DoD isn't in the charter yet. `orchestration\DOD-DRAFT.md` already has DoD-10 (the six stakeholders, D2) and DoD-11 (brand capture, D6 and D7) claimed by `S-D2 (operator-owned)`. No edit; they enter the charter with the DoD sign-off. If the DoD is written into the charter before C01 applies, place 12's Before text must still be found there; check it at apply.

## Held: resource lines for specs not written yet
None of S-D3, S-D6, S-D7 or S-D8 has a SPEC.md yet (`getsales\`, `canva-templates\`, `linkedin-content\` and `website\` hold none). Each line is written into that spec's "Routing and resources" section when its SPEC.md appears; check mode lists them until then. Their CLAUDE.md files already carry S0's Addvery line (`..\Addvery Research\`, read from local disk, never edit), so no CLAUDE.md changes.

One line per spec, as `- HELD <spec id> <file>: <resource line>`, the form `propagate` check mode reads. Once delivered, the line becomes `- DELIVERED ...` with the commit.

- DELIVERED (into getsales\SPEC.md §3 by wave2-specs, 2 Nov; commit 30d2ce5. Checked by orchestration 14:50: it is the only Addvery Research line in that file, so nothing to replace) S-D3 `getsales\SPEC.md`: - `C:\Users\alder\Desktop\Hire me hackaton\Addvery Research\`: the operator's own S-D2 work: Addvery and its six stakeholders, the input to enrichment and the live run. Local and git-ignored: read it from the local disk, never from GitHub, and never edit it.
- HELD S-D6 `canva-templates\SPEC.md`: - `C:\Users\alder\Desktop\Hire me hackaton\Addvery Research\`: the operator's own S-D2 work, including Addvery's brand capture (voice and visual identity), the input to the templates. Local and git-ignored: read it from the local disk, never from GitHub, and never edit it.
- HELD S-D7 `linkedin-content\SPEC.md`: - `C:\Users\alder\Desktop\Hire me hackaton\Addvery Research\`: the operator's own S-D2 work, including Addvery's brand capture, the voice this demo writes in. Local and git-ignored: read it from the local disk, never from GitHub, and never edit it.
- HELD S-D8 `website\SPEC.md`: - `C:\Users\alder\Desktop\Hire me hackaton\Addvery Research\`: the operator's own S-D2 work: the six stakeholders for the stakeholder sections, and Addvery's brand capture. Local and git-ignored: read it from the local disk, never from GitHub, and never edit it. What goes live from it follows Alex's say.

## Commits and notices (on apply)
- would commit: `git commit -m "[orchestration] C01: S-D2 becomes operator-owned, with brand capture" -- CHARTER.md`
- No other file changes, so no other commit. No roster change; no folder, so no excludes sync (`--check` reported no changes on the scratch copy).
- would send `website`: `S2 C01: the charter now marks S-D2 operator-owned, in Addvery Research\, with brand capture there too. Your Addvery input line already points there, so nothing changes in your folder. If the site's deliverables view shows S-D2, show it as Alex's own, with no session. Re-run scripts\sync_docs.py so the site's charter copy (content\docs\charter.md) matches.`
- would send `s1-research`: `S2 C01: the charter's S1 Priority line now says S-D1 comes first and S1 has no Addvery topics (S-D2, with brand capture, is Alex's own), as your spec already says. Nothing changes in your folder.`
- S-D3, S-D6 and S-D7 have no running session (Planned), so no notice; their held lines above go in with their SPEC.md. No running spec changes shape, so nothing waits for a forking gate.

## Verify (dry run)
- Places 1 to 8: each Before text occurred exactly once in the scratch `CHARTER.md` and reads back as its After text.
- Places 9 to 12: added after the dry run; each Before text occurs exactly once in the real `CHARTER.md` (read-only check, 2 Nov about 14:20). Not yet applied anywhere.
- Places 13 to 15: already match; nothing to write.
- `python orchestration\sync_claude_excludes.py --check`: no changes (scratch, with an empty `Addvery Research\` placeholder so the sister patterns match; the real repo also reports no changes).
- `python -I orchestration\propagate_check.py --root <scratch>`, with this record copied in: 1 gap, `[roster] S0 has no roster row in SESSIONS.md`. That gap is already in the real repo and isn't C01's. The same check on the unmodified real repo gives 2 gaps: that one, plus `[roster] S-D2 has no roster row`, which C01 closes (S-D2 is now `skipped: operator-owned`). C01 also clears the baseline notes "S-D6 depends on no outline row" and the same for S-D7. The four HELD lines are listed as notes, and the record shows as open.
- First pass caught a wording clash. The check counts a row as operator-owned if the phrase appears anywhere in it, so the first wording of places 2 and 3, "from S-D2 (operator-owned, ...)", made it skip S-D6 and S-D7. Both now say "the operator's own". Keep "operator-owned" only in the S-D2 row. (`propagate_check.py` now reads the marker only at the end of the Spec cell, so prose like places 10 and 12 is safe.)
