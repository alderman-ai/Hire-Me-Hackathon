---
System Primitive: Operator task
Task type: Gate approval
Task id: OT-11
Task State: Open
Gate: S2 charter change preview (C04, C05, C06)
Requested by: orchestration
Snapshot of: orchestration\changes\C04-C05-dod22-wording.md and C06-d3-alex-model.md at the commit that adds this task
Unblocks: nothing waits on it; the specs already follow these answers. It brings the charter's wording in line with them.
Created: 2026-11-02 16:36 Prague
---

# Approve: three small fixes to the project plan's wording

## What this is

**About 2 minutes. No rush: if you do nothing, these are applied at 18:00 and logged, and you can undo any of them later in one line.**

The project plan (the charter) is the one document every session reads for what the project is and what counts as done. Three of its lines no longer match what you've decided today. Nothing is waiting on this, because each session already follows your answers. These fixes just make the plan say the same thing, so the overnight session and tomorrow's cleanup don't trip over the old wording.

1. **What "nothing sensitive is published" means.** The plan says nothing published may *show* the Apify proposal or your own GetSales outreach. You told the website session at 14:25 that the repo stays as it is, because the plan and the specs only *mention* the proposal. The fix: "show" means displaying them, and the documents may still name them.
2. **The GetSales video and that same rule.** The plan wants a video of the live GetSales run, and it also keeps your own GetSales outreach off everything published, so the two contradicted each other (the research found this). The fix: your own campaigns stay off, but the demo folder and the alert going to the six may appear in the video, with the six's names, photos and personal lines blurred. The rule also gains the six's personal data and their replies, which it didn't cover.
3. **What the GetSales demo is.** The plan still says "10 ICPs with a drip sequence each, and a classifier". Your answers replaced that: first the alert to the six, then 36 workflows (four ICPs, English, Czech and German, three tactics) in a folder apart from yours, each opening with the special first message, explained in your screen-recorded walkthrough. Nothing is tooled to run and no classifier is trained. **Updated 16:42 with your change note: please look again, or let it apply at 18:00.** The fix rewrites the demo's description, its line in the plan's list of specs, and its done item to match. The done item for the video itself stays as it is.

## What's being approved

The plan's lines exactly as they read now (Before) and as they would read (After). Codes in the text: "DoD-12" and "DoD-22" are the plan's numbered done items, "D3" is the GetSales demo, "D2" is your own research on Addvery, "S-D3" is the GetSales demo's spec, "S-D8" is the website, and "S-D9" is the session that turns recordings into site posts.

**Fixes 1 and 2: the "nothing sensitive is published" done item (DoD-22).**

Before:
> Nothing published (the site, its videos, the public repo) shows secrets, the Apify proposal or the operator's own GetSales outbound. · Checked by: a check of the site, the published videos and the repo finds none of them.

After:
> Nothing published (the site, its videos, the public repo) shows secrets, the Apify proposal, the operator's own GetSales outbound outside the demo folder, or the six stakeholders' personal data and replies. · Checked by: a check of the site, the published videos and the repo finds none of them displayed; the charter and specs may name them. The live-run clip may show the demo folder and the alert flow, with the six's names, photos and personal lines blurred.

**Fix 3a: the GetSales demo's description (D3).**

Before:
> Shows 10 ICPs with a drip sequence each, and a classifier that routes each lead to the right automation. Pipeline: Sales Navigator, then CSV export, then enrichment from D2, then a computed first-message variable, then import into GetSales. Live run: the six stakeholders from D2 go through the operator's own sender profile. The output is a video clipped from the rig recordings.

After:
> Two parts. First, an alert: a short campaign from the operator's own LinkedIn account tells the six stakeholders from D2 that the hackathon is happening and they can follow along. Second, the demo: 36 workflows (four ICPs, by English, Czech and German, by three tactics) in a GetSales folder apart from his own, each opening with a custom first message, a variable imported as a field of the lead CSV. Nothing is tooled to run and no classifier is trained: the operator screen-records himself scrolling through the 36, explaining how a classifier could route leads into them, and opening the top one to show its first messages. Pipeline: the six from D2, enrichment, the computed first-message variable, import into GetSales. The output is a video clipped from the rig recordings.

**Fix 3b: its line in the list of specs (S-D3).**

Before:
> 10 ICPs and sequences, a lead classifier, and the full Sales Navigator to GetSales pipeline, run live on the six stakeholders. Delivered as a video.

After:
> The alert to the six stakeholders from the operator's own LinkedIn account, then 36 workflows (four ICPs, three languages, three tactics) in a GetSales folder apart from his own, each opening with a custom first message, explained in his screen-recorded walkthrough. Delivered as a video.

**Fix 3c: its done item (DoD-12).**

Before:
> Ten ICPs, each with a drip sequence, and a classifier that routes each lead to the right automation are set up in GetSales, with no automation sending except the live run. · Checked by: GetSales shows the ten sequences and the classifier; no send outside the live run.

After:
> 36 workflows (four ICPs, by English, Czech and German, by three tactics), each opening with a custom first message, sit in a GetSales folder apart from the operator's own, with no automation sending except the alert to the six. Nothing is tooled to run and no classifier is trained. · Checked by: GetSales shows the folder and the 36 workflows, the top one with its first messages; the walkthrough explaining how a classifier could route leads is on the site; no send outside the alert.

Your options: (a) apply all three; (b) apply all except the ones you name, or with the changes you write; (c) drop all three.

## Approval

- [ ] I approve

Tick the box to apply all three. Anything you write below is applied along with them, even when you tick the box. Either way, the requesting session checks this file every 5 minutes. If it's still open at 18:00, all three are applied as written and logged, and a later answer is applied as a new change.

`<operator_answer>`
```ot-11-changes
What I want is to create, again in a different folder that's not going to be confused with mine, 36 workflows. I think we landed on 36 workflows. There are 4 main ICPs, 3 different languages (let's say English, Czech, German), and that's 12. Then let's do tactic 1, tactic 2, tactic 3, right?

What I'm going to do is have the video basically just scroll through those 36 and explain how the classifier could add leads there. It's also going to show the first couple messages. We're just going to open the top one, not all 36, and see that it has the special message. Let's just say, for the first message, that's a special variable that gets added as a special field in the CSV that gets imported The actual output will literally be just a screen recording of going through that and explaining it. A lot of these outputs are going to be just me screen recording, going through that, and explaining it. We're not tooling it up to run. We're not training the classifier agent. We're explaining what all the pieces are and clipping that into a video to explain it 
```
`</operator_answer>`
