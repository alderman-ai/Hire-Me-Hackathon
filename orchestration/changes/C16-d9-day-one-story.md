# C16: D9 also writes the long-form "day one" story (Alex, in chat)

Status: applied 18:01, commits 8a4ae57, 85ad2c2
Asked by: Alex, in chat with the coordinator, about 18:00 (relayed as "about 18:05"; the clock read 18:01 when this was applied, and `s-d9-legibility` had already taken the article on in its d38814e at 17:58).
Approval: Alex's words, verbatim as relayed: "I want one blog to be the story of day one ... having one subagent really go through the transcripts and build a narrative arc of everything up until now as an article ... You've got video clips you can put in between the writing". No preview: he asked for it himself, and the reset rules (answer-desk\ASKING.md, rule 2) end plan approvals.
New ids: DoD-24 (the next free id after DoD-23). No new deliverable, row, folder or session: the running `s-d9-legibility` session writes it.

## Places

Walked in the order of SPEC section 4, "Dependent places".

- Charter "Deliverables": touched, D9's "What it is" gains one sentence. Counts in "Scope": untouched, no deliverable added.
- Charter "Spec outline", "Run order", operator scenes: untouched. The S-D9 row still holds (it feeds S-D8 through build requests), and the story needs no operator scene: a subagent builds it from the transcripts.
- Charter "Definition of done": touched, DoD-24 added.
- Charter "Research reading list" and "Risks and open questions": untouched, no research and no open question involved.
- `legibility\SPEC.md`: touched, its place (spec contract item 1) and its own definition of done. "Routing and resources": untouched, the transcripts and recordings are already on it.
- CLAUDE.md boot lines, `SESSIONS.md`, new folders: untouched, no shared file moved and no row added.
- The site's deliverables view: not notified by this helper (the coordinator scoped notices to `s-d9-legibility`); D9's wording changed, so `website` may want a re-sync.

### 1. CHARTER.md, "Deliverables", the D9 row

Before:
```
sends build requests to the website session ("add this, add that"). Checks run every hour or two. |
```
After:
```
sends build requests to the website session ("add this, add that"). Checks run every hour or two. It also turns the day's transcripts and rig recordings into a long-form "day one" story, with video clips between the sections, published as an entry in the site's GTM demos list. |
```

### 2. CHARTER.md, "Definition of done", a new DoD-24 row after DoD-23

Before:
```
| DoD-23 | ... | The site's GTM demos list has the entry, with both videos. | D11, D8 | S-D11 | live |
```
After:
```
| DoD-23 | ... | The site's GTM demos list has the entry, with both videos. | D11, D8 | S-D11 | live |
| DoD-24 | A long-form day-one story, built from the transcripts with clips between its sections, is on the site. | The entry is live in the GTM demos list. | D9, D8 | S-D9 | live |
```

### 3. `legibility\SPEC.md`, section 2, "Its place"

Before:
```
Row S-D9 — Legibility analyzer. It claims four items:<br>... Alex's own GetSales outbound, with S-D8.<br>It also serves two items.
```
After:
```
Row S-D9 — Legibility analyzer. It claims five items:<br>... Alex's own GetSales outbound, with S-D8.<br>• DoD-24: a long-form day-one story, built from the transcripts with clips between its sections, is live in the site's GTM demos list (C16).<br>It also serves two items.
```

### 4. `legibility\SPEC.md`, section 5, "Definition of done", a new last row

Before:
```
(no row for DoD-24)
```
After:
```
| The long-form day-one story, a narrative arc of the day built from the transcripts with video clips between its sections, is live as an entry in the site's GTM demos list. | DoD-24 |
```

## Held

None.

## Notices

- `s-d9-legibility`: S2 changed legibility\SPEC.md for C16: you now claim DoD-24, the day-one story live in the GTM demos list.

## Verify

Read back at 18:01: each After text is in its file exactly once (CHARTER.md in 8a4ae57, legibility\SPEC.md in 85ad2c2). `propagate check` before the change: CLEAN, 0 gaps, 91 notes, 23 DoD items. After: CLEAN, 0 gaps, 91 notes, 24 DoD items (23 live, 1 retired). No misses.
