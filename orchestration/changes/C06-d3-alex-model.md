# C06: D3, the S-D3 row and DoD-12 follow Alex's model (the alert, then ICP by language by approach workflows)

Status: in preview (OT-11), revised 16:42 on Alex's change note
Asked by: `s-d3-getsales`, S2 REQUEST 14:51
Approval: A6.4 (DI-6 Q6.4, `Operator tasks\Archive\Decide - how the scraping demo should work.md`): "we'll build 20 workflows. Let's label them under a new folder in GetSales so that I can hide them easily. We'll take each of their ICPs and do it in whatever languages make sense. We'll have 3 different approaches per language ... each of those workflows will start with that custom message"
Preview: `Operator tasks\Approve - three small charter fixes.md` (OT-11), with the other queued changes

## Places

### 1. CHARTER.md, "Deliverables", the D3 row

Before:
```
| D3 | GetSales outbound demo | Shows 10 ICPs with a drip sequence each, and a classifier that routes each lead to the right automation. Pipeline: Sales Navigator, then CSV export, then enrichment from D2, then a computed first-message variable, then import into GetSales. Live run: the six stakeholders from D2 go through the operator's own sender profile. The output is a video clipped from the rig recordings. |
```
After:
```
| D3 | GetSales outbound demo | Two parts. First, an alert: a short campaign from the operator's own LinkedIn account tells the six stakeholders from D2 that the hackathon is happening and they can follow along. Second, the demo: 36 workflows (four ICPs, by English, Czech and German, by three tactics) in a GetSales folder apart from his own, each opening with a custom first message, a variable imported as a field of the lead CSV. Nothing is tooled to run and no classifier is trained: the operator screen-records himself scrolling through the 36, explaining how a classifier could route leads into them, and opening the top one to show its first messages. Pipeline: the six from D2, enrichment, the computed first-message variable, import into GetSales. The output is a video clipped from the rig recordings. |
```

### 2. CHARTER.md, "Spec outline", the S-D3 row

Before:
```
| S-D3 — GetSales outbound demo | 10 ICPs and sequences, a lead classifier, and the full Sales Navigator to GetSales pipeline, run live on the six stakeholders. Delivered as a video. | S-D2; rig recordings; S-D9 for the clip | Running the live setup on camera |
```
After:
```
| S-D3 — GetSales outbound demo | The alert to the six stakeholders from the operator's own LinkedIn account, then 36 workflows (four ICPs, three languages, three tactics) in a GetSales folder apart from his own, each opening with a custom first message, explained in his screen-recorded walkthrough. Delivered as a video. | S-D2; rig recordings; S-D9 for the clip | Running the live setup on camera |
```

### 3. CHARTER.md, "Definition of done", the DoD-12 row

Before:
```
| DoD-12 | Ten ICPs, each with a drip sequence, and a classifier that routes each lead to the right automation are set up in GetSales, with no automation sending except the live run. | GetSales shows the ten sequences and the classifier; no send outside the live run. | D3 | S-D3 | live |
```
After:
```
| DoD-12 | 36 workflows (four ICPs, by English, Czech and German, by three tactics), each opening with a custom first message, sit in a GetSales folder apart from the operator's own, with no automation sending except the alert to the six. Nothing is tooled to run and no classifier is trained. | GetSales shows the folder and the 36 workflows, the top one with its first messages; the walkthrough explaining how a classifier could route leads is on the site; no send outside the alert. | D3 | S-D3 | live |
```

DoD-13 is unchanged, as the request asks: its pipeline stages stay, and the live run is the alert to the six.
New text says "his own LinkedIn account" where the old said "sender profile", a term the site's copy filters out.
Claimant S-D3 already follows this model (getsales\SPEC.md, A6.4 rows in its decision log); no spec text changes.

## Verify

Not applied yet.

## Revised 16:42 on Alex's change note in OT-11

He left the box unticked and wrote: "What I want is to create, again in a different folder that's not going to be confused with mine, 36 workflows. ... There are 4 main ICPs, 3 different languages (let's say English, Czech, German), and that's 12. Then let's do tactic 1, tactic 2, tactic 3 ... We're not tooling it up to run. We're not training the classifier agent. We're explaining what all the pieces are and clipping that into a video to explain it". The D3, S-D3 and DoD-12 After texts above now say that. DoD-13 is still unchanged. The OT-11 snapshot was updated to match, and it waits again: a tick applies it, and at 18:00 it applies on the default.
