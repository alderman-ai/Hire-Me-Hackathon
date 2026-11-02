# C15: add D11, Brand motion demo with Comfy (Alex's A10.11)

Status: applied 17:31, commits e58af12, 4cd476e, 24b0b39
Asked by: Alex, DI-10 Q10.11, answered about 17:23 (`Operator tasks\Archive\Decide - everything left that needs you.md`), relayed by the coordinator with the shape: no new folder or session; the existing `s-d10-canva-video` session runs S-D11 in `canva-video\`.
Approval: A10.11, verbatim: "I want to do some demo of Comfy but that can be pretty manual. I've got a lot of that set up in a repo elsewhere. I just need some brainstorming of what ideas I can do. I would like to basically do some mild animations. Take some LinkedIn graphics and apply... Maybe we'll take one of them and we'll show a little 5-second animation. Instead of just having a static image on LinkedIn, we can have a light shimmer. We can have the brand getting some kind of 3D texture to it. It kind of builds itself. I don't know. It's just to show that it's possible to add some energy to the brand through video generation. -- And then I want to create a one-minute video similar to the Gauss rocket thing. You can check that out. It's on the desktop and we have a lot of the skills already built to make that". No preview: his answer is the approval, and the reset rules (answer-desk\ASKING.md, rule 2) end plan approvals.
New ids: deliverable D11, outline row S-D11, DoD-23. Asker S-D11. No folder, no session, no CLAUDE.md: `add-deliverable` adapted on the coordinator's instruction. The Gauss Hero Animation is in `C:\Users\alder\Desktop\Gauss Hero Animation\`, outside the repo.

## Places

### 1. CHARTER.md, "Deliverables", the opening count

Before:
```
The project has ten client-facing deliverables (one of them, D4, retired on 2 Nov)
```
After:
```
The project has eleven client-facing deliverables (one of them, D4, retired on 2 Nov)
```

### 2. CHARTER.md, "Deliverables", a new D11 row after D10

Before:
```
| D10 | Canva design video | A recording of the operator designing in Canva, done near the end. |
```
After:
```
| D10 | Canva design video | A recording of the operator designing in Canva, done near the end. |
| D11 | Brand motion demo with Comfy | Shows that video generation can add energy to the brand: a 5-second animation of one Addvery LinkedIn graphic (a light shimmer, a 3D texture, the graphic building itself) and a one-minute brand video like the operator's Gauss Hero Animation. He runs the Comfy work himself; the project brainstorms the ideas and puts the result on the site. |
```

### 3. CHARTER.md, "Scope", the first sentence

Before:
```
The project covers the three meta deliverables and ten client-facing deliverables listed below,
```
After:
```
The project covers the three meta deliverables and eleven client-facing deliverables listed below,
```

### 4. CHARTER.md, "Scope", the "In" line

Before:
```
- **In:** M0 to M2 and D1 to D10.
```
After:
```
- **In:** M0 to M2 and D1 to D11.
```

### 5. CHARTER.md, "Spec outline", the intro

Before:
```
S-D1 to S-D10 for D1 to D10.
```
After:
```
S-D1 to S-D11 for D1 to D11.
```

### 6. CHARTER.md, "Spec outline", a new S-D11 row after S-D10

Before:
```
| S-D10 — Canva design video | The operator designing in Canva, on camera. | S-D6 | The recording, near the end |
```
After:
```
| S-D10 — Canva design video | The operator designing in Canva, on camera. | S-D6 | The recording, near the end |
| S-D11 — Brand motion demo with Comfy | An ideas Doc for the operator to pick from, then the chosen 5-second animation of one LinkedIn graphic and a one-minute brand video, made by him with Comfy, on the site as a GTM demo entry. Run by the `s-d10-canva-video` session in `canva-video\`, with no folder or session of its own. | S-D6 (the graphics); the operator's pick from the ideas Doc | Picking the ideas, and running the Comfy work himself |
```

### 7. CHARTER.md, "Run order", step 4

Before:
```
S-D6 feeds S-D10 (Canva video).
```
After:
```
S-D6 feeds S-D10 (Canva video) and S-D11 (brand motion with Comfy), which also waits on the operator's pick of its ideas.
```

### 8. CHARTER.md, "Run order", the operator scenes (also carries C14)

Before:
```
the S-D3 walkthrough of the 36 workflows, the two S-D5 dictations, brand sign-off, and the S-D10 Canva recording.
```
After:
```
the two S-D3 recordings (the walkthrough of the 36 workflows and the ICP-classification capture), the two S-D5 dictations, brand sign-off, the S-D10 Canva recording, and picking the S-D11 ideas and running its Comfy work.
```

### 9. CHARTER.md, "Definition of done", DoD-22's traces and a new DoD-23 row

Before:
```
| D1 to D10 | S-D8, S-D9 | live |
```
After:
```
| D1 to D11 | S-D8, S-D9 | live |
| DoD-23 | The chosen animation of one Addvery LinkedIn graphic (about 5 seconds) and a one-minute brand video, both made with Comfy, are on the site as a GTM demo entry. | The site's GTM demos list has the entry, with both videos. | D11, D8 | S-D11 | live |
```

### 10. `SESSIONS.md`, the `s-d10-canva-video` row's Role cell

Before:
```
filming waits on Alex's answer to S2-Q1, today 17:30 or tomorrow morning. |
```
After:
```
filming waits on Alex's answer to S2-Q1, today 17:30 or tomorrow morning. Also runs S-D11 Brand motion demo with Comfy (C15): the ideas Doc, then the chosen animation and the one-minute video on the site. |
```

### 11. `canva-video\SPEC.md`, a new closing section for S-D11

Before:
```
(no S-D11 section)
```
After:
```
## S-D11 Brand motion demo with Comfy (run by this session; added by S2 as C15)

Row S-D11, deliverable D11, claims `DoD-23`: the chosen animation of one Addvery LinkedIn graphic (about 5 seconds) and a one-minute brand video, both made with Comfy, are on the site as a GTM demo entry. Depends on S-D6 (the graphics) and on Alex's pick from the ideas Doc. His scenes: picking the ideas, and running the Comfy work himself.

His words (DI-10 A10.11, `..\Operator tasks\Archive\Decide - everything left that needs you.md`): "I just need some brainstorming of what ideas I can do ... a little 5-second animation. Instead of just having a static image on LinkedIn, we can have a light shimmer. We can have the brand getting some kind of 3D texture to it. It kind of builds itself ... And then I want to create a one-minute video similar to the Gauss rocket thing." The reference is `C:\Users\alder\Desktop\Gauss Hero Animation\`, outside the repo; the Comfy skills listed in this session (comfy, comfy-director and the others) are the ones to name. Write the ideas in a Claude Doc (reset rule 4) and plan the rest of this section yourself, logged in your decision log.
```

### 12. `orchestration\propagate_check.py`

A roster row's Role cell may say `Also runs S-D<n>`; the check then counts that session and folder for row S-D<n> too, so S-D11 has a roster row and a folder without a session of its own.

## Notices

- `s-d10-canva-video`: S2 changed canva-video\SPEC.md and its SESSIONS.md row for C15: it now also runs S-D11.
- `website`: re-run `scripts\sync_docs.py`, and add D11 to the deliverables view (with C14's D3 change).
- `s1-research`: none. Alex said the research is done, and the ideas are brainstormed by the running session.

## Verify

Read back at 17:31: every charter After text is in CHARTER.md exactly once (commit e58af12); the roster row says "Also runs S-D11" (4cd476e); canva-video\SPEC.md has its S-D11 section, committed as 6 added lines on top of the session's own ca14ab0 (24b0b39). `propagate check` first showed one new gap (S-D11 with no roster row): the check's new pattern had lost its `\b` to a shell escape, written as a backspace character. Fixed as a mechanical follow-on in the same commit; then CLEAN, 0 gaps. New notes: canva-video\SPEC.md's DoD-16, 17, 21 and 22 citations seen from S-D11, and DoD-23 seen from S-D10; both are expected with one spec file for two rows.
