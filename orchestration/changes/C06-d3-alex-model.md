# C06: D3, the S-D3 row, DoD-12 and DoD-13 follow Alex's model (36 workflows and a walkthrough; the alert goes by hand)

Status: applied 2026-11-02 17:10, without the gate, on Alex's instruction in chat
Asked by: `s-d3-getsales`, S2 REQUEST 14:51; revised on its S2 REQUEST of 16:45
Approval: A6.4 (DI-6 Q6.4, `Operator tasks\Archive\Decide - how the scraping demo should work.md`): "we'll build 20 workflows. Let's label them under a new folder in GetSales so that I can hide them easily. We'll take each of their ICPs and do it in whatever languages make sense. We'll have 3 different approaches per language ... each of those workflows will start with that custom message". His change note in OT-11 (about 16:40): "What I want is to create, again in a different folder that's not going to be confused with mine, 36 workflows. ... There are 4 main ICPs, 3 different languages (let's say English, Czech, German), and that's 12. Then let's do tactic 1, tactic 2, tactic 3 ... We're not tooling it up to run. We're not training the classifier agent. We're explaining what all the pieces are and clipping that into a video to explain it". A7.1 (DI-7, `Operator tasks\Archive\Decide - how the GetSales outbound demo runs.md`, verified 17:05): "I'm going to do this manually. This is not going to happen through automation. Don't worry about it. You can kill this". A7.2 (same file): "We killed this. The deliverable is just going to be a video recorded through OBS, through the rig, with it being set up and then scrolling through it and explaining things".
Gate: OT-11 (`Operator tasks\Archive\Approve - three small charter fixes.md`) was closed unticked at 17:10: Alex told orchestration in chat, about 17:00, "If things are an easy judgment please clear the plate for me. We can just make edits later."

## Places

### 1. CHARTER.md, "Scope", the "Out" line

Before:
```
- **Out:** real data running through the demos (the one exception is the D3 live run on six stakeholders), automations actually sending, and connecting anyone else's LinkedIn account.
```
After:
```
- **Out:** real data running through the demos (the one exception is D3's first messages, computed for the six stakeholders), automations actually sending, and connecting anyone else's LinkedIn account.
```

### 2. CHARTER.md, "Deliverables", the D3 row

Before:
```
| D3 | GetSales outbound demo | Shows 10 ICPs with a drip sequence each, and a classifier that routes each lead to the right automation. Pipeline: Sales Navigator, then CSV export, then enrichment from D2, then a computed first-message variable, then import into GetSales. Live run: the six stakeholders from D2 go through the operator's own sender profile. The output is a video clipped from the rig recordings. |
```
After:
```
| D3 | GetSales outbound demo | 36 workflows (four ICPs, by English, Czech and German, by three tactics) in a GetSales folder apart from the operator's own, each opening with a custom first message, a variable imported as a field of the lead CSV. Nothing is tooled to run, nothing sends and no classifier is trained: the operator screen-records himself scrolling through the 36, explaining how a classifier could route leads into them, and opening the top one to show its first messages. The pipeline is demonstrated up to the first message: the six stakeholders from D2, the CSV, enrichment and the computed first message for each. The output is a video clipped from the rig recordings. The operator alerts the six by hand, outside this demo. |
```

### 3. CHARTER.md, "Spec outline", the S-D3 row

Before:
```
| S-D3 — GetSales outbound demo | 10 ICPs and sequences, a lead classifier, and the full Sales Navigator to GetSales pipeline, run live on the six stakeholders. Delivered as a video. | S-D2; rig recordings; S-D9 for the clip | Running the live setup on camera |
```
After:
```
| S-D3 — GetSales outbound demo | 36 workflows (four ICPs, three languages, three tactics) in a GetSales folder apart from the operator's own, each opening with a custom first message, explained in his screen-recorded walkthrough, and the pipeline up to the computed first message for the six. Nothing sends. Delivered as a video. | S-D2; rig recordings; S-D9 for the clip | Recording the walkthrough of the 36 workflows on camera |
```

### 4. CHARTER.md, "Definition of done", the DoD-12 row

Before:
```
| DoD-12 | Ten ICPs, each with a drip sequence, and a classifier that routes each lead to the right automation are set up in GetSales, with no automation sending except the live run. | GetSales shows the ten sequences and the classifier; no send outside the live run. | D3 | S-D3 | live |
```
After:
```
| DoD-12 | 36 workflows (four ICPs, by English, Czech and German, by three tactics), each opening with a custom first message, sit in a GetSales folder apart from the operator's own, with no automation sending. Nothing is tooled to run and no classifier is trained. | GetSales shows the folder and the 36 workflows, the top one with its first messages; nothing sends from GetSales. | D3 | S-D3 | live |
```

### 5. CHARTER.md, "Definition of done", the DoD-13 row

Before:
```
| DoD-13 | The full pipeline (Sales Navigator, CSV export, enrichment from D2, a computed first-message variable, import into GetSales) ran live on the six stakeholders through the operator's own sender profile, and a video clipped from the rig recordings shows it. | The clip exists and is on the site; it shows each pipeline stage. | D3, D9 | S-D3, S-D9 | live |
```
After:
```
| DoD-13 | The pipeline is demonstrated up to the computed first message (the six stakeholders identified from the operator's research, the CSV, enrichment, and custom message 1 for each), together with a walkthrough of the 36 workflows in GetSales, and a video clipped from the operator's rig recording shows both. | The clip exists and is on the site; it shows each stage up to the first message, and the walkthrough. | D3, D9 | S-D3, S-D9 | live |
```

### 6. CHARTER.md, "Risks and open questions", the view-only account question

Before:
```
- [ ] Does Ivana still get a view-only GetSales account, or does the D3 video replace it?
```
After:
```
- [x] Does Ivana still get a view-only GetSales account, or does the D3 video replace it? Answered: the video replaces it, with no view-only login (A7.2, DI-7).
```

### 7. CHARTER.md, "Run order", the operator scenes

Carried in C12, place 3, which edits the same line for C06, C10 and C12 together ("the S-D3 live run" becomes "the S-D3 walkthrough of the 36 workflows").

Untouched: the spec outline's other rows, every SPEC.md (S-D3 already follows this model: getsales\SPEC.md and its decision log), CLAUDE.md files, the roster. The site's deliverables view: `website` is told at the restart.

## Verify

Every place read back at 17:10: each After text is in CHARTER.md exactly once, and no Before text is left (commit b5cb6fd). `propagate check` after the change: CLEAN, no new gaps; the new notes are citations of the retired DoD-14 in blog-pipeline, blog-articles and the L-03 reports, which are history and stay. No misses.
