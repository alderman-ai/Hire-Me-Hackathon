# C14: D3 becomes two blog-style demo entries (Alex's A10.7)

Status: applied 17:31, commit e58af12
Asked by: Alex, DI-10 Q10.7, answered about 17:23 (`Operator tasks\Archive\Decide - everything left that needs you.md`), relayed by the coordinator; `s-d3-getsales` confirmed at about 17:28 that A10.7 makes the six's pipeline optional: in the clip, the six appear only as the variable's source, if Alex wants that beat.
Approval: A10.7, verbatim: "We'll break this into two demos. One will be a 3-minute video going through the 36 things, like an intro about JEV classification tools in general and showing the one variable. There's that part: classifying people into ICPs. We'll screen capture something short through OBS and that's basically the demo. Each of these will be almost like a blog. We'll have a video on top and a summary of the transcript at the bottom so they can either watch it or read it and have it in a blog stylization". No preview: his answer is the approval, and the reset rules (answer-desk\ASKING.md, rule 2) end plan approvals.

## Places

### 1. CHARTER.md, "Scope", the "Out" line

Before:
```
- **Out:** real data running through the demos (the one exception is D3's first messages, computed for the six stakeholders), automations actually sending, and connecting anyone else's LinkedIn account.
```
After:
```
- **Out:** real data running through the demos (the one exception: D3 may show its first-message variable computed for the six stakeholders), automations actually sending, and connecting anyone else's LinkedIn account.
```

### 2. CHARTER.md, "Deliverables", the D3 row

Before:
```
| D3 | GetSales outbound demo | 36 workflows (four ICPs, by English, Czech and German, by three tactics) in a GetSales folder apart from the operator's own, each opening with a custom first message, a variable imported as a field of the lead CSV. Nothing is tooled to run, nothing sends and no classifier is trained: the operator screen-records himself scrolling through the 36, explaining how a classifier could route leads into them, and opening the top one to show its first messages. The pipeline is demonstrated up to the first message: the six stakeholders from D2, the CSV, enrichment and the computed first message for each. The output is a video clipped from the rig recordings. The operator alerts the six by hand, outside this demo. |
```
After:
```
| D3 | GetSales outbound demo | Two demos, each a blog-style entry in the site's GTM demos list, with a video on top and a summary of its transcript below, to watch or read. First, a video of about 3 minutes: classification tools in general, then the 36 workflows (four ICPs, by English, Czech and German, by three tactics) in a GetSales folder apart from the operator's own, each opening with a custom first message, and the one variable behind it, imported as a field of the lead CSV. Second, a short screen capture through the rig of classifying people into ICPs. Nothing is tooled to run, nothing sends and no classifier is trained. The six stakeholders from D2 may appear as the variable's source, if the operator wants that beat. He alerts the six by hand, outside this demo. |
```

### 3. CHARTER.md, "Spec outline", the S-D3 row

Before:
```
| S-D3 — GetSales outbound demo | 36 workflows (four ICPs, three languages, three tactics) in a GetSales folder apart from the operator's own, each opening with a custom first message, explained in his screen-recorded walkthrough, and the pipeline up to the computed first message for the six. Nothing sends. Delivered as a video. | S-D2; rig recordings; S-D9 for the clip | Recording the walkthrough of the 36 workflows on camera |
```
After:
```
| S-D3 — GetSales outbound demo | Two blog-style demo entries, each a video with a transcript summary below: a walkthrough of about 3 minutes on classification tools, the 36 workflows (four ICPs, three languages, three tactics) in a GetSales folder apart from the operator's own, and the one variable; and a short rig capture of classifying people into ICPs. Nothing sends. | S-D2; rig recordings; S-D9 for the clip | Recording the walkthrough and the ICP-classification capture on camera |
```

### 4. CHARTER.md, "Definition of done", the DoD-13 row

Before:
```
| DoD-13 | The pipeline is demonstrated up to the computed first message (the six stakeholders identified from the operator's research, the CSV, enrichment, and custom message 1 for each), together with a walkthrough of the 36 workflows in GetSales, and a video clipped from the operator's rig recording shows both. | The clip exists and is on the site; it shows each stage up to the first message, and the walkthrough. | D3, D9 | S-D3, S-D9 | live |
```
After:
```
| DoD-13 | The two GetSales demo entries are on the site, each a video with a summary of its transcript below: the walkthrough of about 3 minutes (classification tools, the 36 workflows and the one variable) and the short capture of classifying people into ICPs, both clipped from the operator's rig recordings. | The site's GTM demos list has both entries, each with its video and transcript summary. | D3, D9 | S-D3, S-D9 | live |
```

### 5. CHARTER.md, "Run order", the operator scenes

Carried in C15, place 8, which edits the same line ("the S-D3 walkthrough of the 36 workflows" becomes "the two S-D3 recordings").

Untouched: DoD-12 (the 36 workflows still sit in GetSales). getsales\SPEC.md is s-d3-getsales's to bring in line; it already follows A10.7. The site's deliverables view: `website` is told.

## Verify

Read back at 17:31: each After text is in CHARTER.md exactly once and no Before is left (commit e58af12). `propagate check`: CLEAN, no new gap. No misses.
