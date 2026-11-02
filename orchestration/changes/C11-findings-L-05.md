# C11: FINDINGS L-05, the Canva, LinkedIn and Canva-video research, onto four reader specs

Status: applied 17:24, commit 8089eab
Asked by: `s1-research`, 2 Nov about 16:45 Prague (forwarded by the outgoing orchestration): `FINDINGS L-05 ready: research\global\L-05-synthesis.md, research\global\L-05-R1-pixel-perfect-demo.md, research\global\L-05-R2-canva-capabilities.md, research\global\L-05-R3-pixel-perfect-canva.md, research\global\L-05-R4-brand-voice-posts.md, research\global\L-05-W1-wildcard-executed.md, research\global\L-05-W2-wildcard-delivered.md, research\global\L-05-W3-wildcard-received.md; readers: S-D6, S-D7, S-D10 (emphasis per DIRECTORY.md's reverse index: S-D6 R1, R2, R3, W1, W2; S-D7 R4, W3; S-D10 R2, R3, W1, W2; synthesis first for all). Also for S-D5: R1 documents the 'template in the background, AI text on top' method Alex named for the article visuals.`
Approval: `research\lists\L-05-brand-assets.md`, Approved by: OT-09, ticked with changes, about 16:29 (`Operator tasks\Archive\Approve - Canva and LinkedIn demo research.md`). Resource lines from S1 skip the preview (SPEC section 4).
Findings: L-05: `research\global\L-05-synthesis.md`, `research\global\L-05-R1-pixel-perfect-demo.md`, `research\global\L-05-R2-canva-capabilities.md`, `research\global\L-05-R3-pixel-perfect-canva.md`, `research\global\L-05-R4-brand-voice-posts.md`, `research\global\L-05-W1-wildcard-executed.md`, `research\global\L-05-W2-wildcard-delivered.md`, `research\global\L-05-W3-wildcard-received.md`

Each reader gets one block in its SPEC.md "Routing and resources", just above its L-01 block: a lead line naming its emphasis from `research\DIRECTORY.md`'s reverse index, then the synthesis and its emphasised reports, each described from its DIRECTORY.md entry. Paths use `..\` like each spec's other lines.

## Places

### 1. `canva-templates\SPEC.md`, Routing and resources (above the L-01 block)

Before:
```
(no L-05 findings lines)
```
After:
```
- **L-05 findings** (S1's Canva and LinkedIn research, approved by Alex as OT-09; added by S2 as C11): for this spec, read the synthesis first, then R1, R2, R3, W1, W2. Read only; S1 owns them. Options for Alex, not decisions; under his reset rules the easy calls in them are yours, decided and logged.
  - `..\research\global\L-05-synthesis.md`: S1's synthesis: five lines for the next 30 minutes, convergences, conflicts with the 2-to-5-minute probe that settles each, recommendations per spec, and 12 one-line questions, each naming the spec it blocks. Start here.
  - `..\research\global\L-05-R1-pixel-perfect-demo.md`: Alex's earlier pixel-perfect demo: one 1200x1200 LinkedIn card, an agent filling a static HTML/CSS page on a fixed backdrop, screenshotted by headless Chrome. Reuse the method, not the files; its traps are guessed text budgets, colour-based geometry and Windows path and locale bugs.
  - `..\research\global\L-05-R2-canva-capabilities.md`: what Canva can do now: autofill on Pro and Teams since 21 Sep 2026, brand templates on any paid plan; the connector creates, imports from a URL, resizes, fills and exports, but can't lock elements, upload fonts or edit a brand kit; current LinkedIn sizes.
  - `..\research\global\L-05-R3-pixel-perfect-canva.md`: pixel-perfect in Canva: full locks on brand elements and position-only locks on slots, binding only in Brand Templates; fixed art as locked PNG or SVG, editable text as native Canva text; PNG and carousel-PDF export rules, and a 17-item checklist for the export checker.
  - `..\research\global\L-05-W1-wildcard-executed.md`: how the templates get from local files into Canva: the connector can't carry local files or set locks, Chrome is the only agent route that can (untested), so a 2-minute test import of the smallest template comes first.
  - `..\research\global\L-05-W2-wildcard-delivered.md`: what Addvery's people can actually open and use: pictures as planned; a template can't leave Alex's account whole, and only a template link (paid plan) gives an outsider a fillable copy, sent privately, not on the site.
```

### 2. `linkedin-content\SPEC.md`, Routing and resources (above the L-01 block)

Before:
```
(no L-05 findings lines)
```
After:
```
- **L-05 findings** (S1's Canva and LinkedIn research, approved by Alex as OT-09; added by S2 as C11): for this spec, read the synthesis first, then R4, W3. Read only; S1 owns them. Options for Alex, not decisions; under his reset rules the easy calls in them are yours, decided and logged.
  - `..\research\global\L-05-synthesis.md`: S1's synthesis: five lines for the next 30 minutes, convergences, conflicts with the 2-to-5-minute probe that settles each, recommendations per spec, and 12 one-line questions, each naming the spec it blocks. Start here.
  - `..\research\global\L-05-R4-brand-voice-posts.md`: LinkedIn posts in a brand's voice: a judge scoring against extracted traits shows rule-following, not voice; varied example posts beat descriptions; LinkedIn's "Seems like AI slop" flag (30 Jul 2026); a leader's personal brand needs the leader's own material and approval.
  - `..\research\global\L-05-W3-wildcard-received.md`: a leader's own voice, unasked and public, gift or overreach: company-voice posts and templates land as a gift when framed as tools the team keeps; a named leader's voice published unasked lands as overreach; options ranked A (company voice only) to E.
```

### 3. `canva-video\SPEC.md`, Routing and resources (above the L-01 block)

Before:
```
(no L-05 findings lines)
```
After:
```
- **L-05 findings** (S1's Canva and LinkedIn research, approved by Alex as OT-09; added by S2 as C11): for this spec, read the synthesis first, then R2, R3, W1, W2. Read only; S1 owns them. Options for Alex, not decisions; under his reset rules the easy calls in them are yours, decided and logged.
  - `..\research\global\L-05-synthesis.md`: S1's synthesis: five lines for the next 30 minutes, convergences, conflicts with the 2-to-5-minute probe that settles each, recommendations per spec, and 12 one-line questions, each naming the spec it blocks. Start here.
  - `..\research\global\L-05-R2-canva-capabilities.md`: what Canva can do now: autofill on Pro and Teams since 21 Sep 2026, brand templates on any paid plan; the connector creates, imports from a URL, resizes, fills and exports, but can't lock elements, upload fonts or edit a brand kit; current LinkedIn sizes.
  - `..\research\global\L-05-R3-pixel-perfect-canva.md`: pixel-perfect in Canva: full locks on brand elements and position-only locks on slots, binding only in Brand Templates; fixed art as locked PNG or SVG, editable text as native Canva text; PNG and carousel-PDF export rules, and a 17-item checklist for the export checker.
  - `..\research\global\L-05-W1-wildcard-executed.md`: how the templates get from local files into Canva: the connector can't carry local files or set locks, Chrome is the only agent route that can (untested), so a 2-minute test import of the smallest template comes first.
  - `..\research\global\L-05-W2-wildcard-delivered.md`: what Addvery's people can actually open and use: pictures as planned; a template can't leave Alex's account whole, and only a template link (paid plan) gives an outsider a fillable copy; the scene's screen care must add Canva's Uploads, Projects and Brand panels.
```

### 4. `blog-articles\SPEC.md`: untouched

S-D5 is a reader for R1 only, and its "Visuals resources" block already names `..\research\global\L-05-R1-pixel-perfect-demo.md` with the "backdrop plus slot map, AI text on top" method. No line added.

## Verify

Read back at 17:24: canva-templates\SPEC.md cites the synthesis, R1, R2, R3, W1 and W2 once each; linkedin-content\SPEC.md the synthesis, R4 and W3; canva-video\SPEC.md the synthesis, R2, R3, W1 and W2 (commit 8089eab). blog-articles\SPEC.md already cites R1. `propagate check`: no new gap from this change. No misses.
