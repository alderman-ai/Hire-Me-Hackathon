---
System Primitive: Intake file
Intake State: Waiting on operator
Intake id: DI-7
Created: 2026-11-02
Build goals: []
---

# Decision intake 7

> **On hold, don't answer yet.** Your DI-6 answers settle most of this intake (the 15:30 alert to the six, the ICP x language x approach workflows, a hidden GetSales folder). A shorter version replaces this text in about 10 minutes.

This intake holds 6 decisions for S-D3, the GetSales outbound demo. Each question carries its own context, so you can answer them in any order. Question 5 leans on question 2. An empty fence means not answered. The spec draft is at `getsales\SPEC.md` for reference, but you don't need to read it. S-D3 needs you on camera once, for the live run on the six stakeholders, proposed for 17:00–17:30 Prague (question 6). Say "DI-7 is ready" when you're done.

# Q7.1 What the ten ICPs are, and where the six go

The facts:

- The charter's D3: "Shows 10 ICPs with a drip sequence each, and a classifier that routes each lead to the right automation. ... Live run: the six stakeholders from D2 go through the operator's own sender profile."
- DoD-12: "Ten ICPs, each with a drip sequence, and a classifier that routes each lead to the right automation are set up in GetSales, with no automation sending except the live run."
- Only the six real people ever go into GetSales, because the charter's scope keeps real data out of the demos except the live run. A flow sends nothing unless one of the six is routed into it.
- The six are Addvery's own people, drawn from the roles you named: RevOps, CSO, CMO, CEO, CTO, CAIO, COO.
- None of S1's research covers Addvery's market, because that's your own research in the Addvery Research folder. S1's GetSales list only researches how to structure ten ICPs and a classifier.

Your options:

- **A. The ten are Addvery's own buyers.**
  - Ten flows Addvery could use for its own outbound, none of which ever sends. The classifier is shown routing a fictional sample of about 20 leads across all ten.
  - The six go through the same pipeline. The classifier routes them as "hiring stakeholder, not a buyer" to an eleventh flow: your job application, with a variant for each role.
  - This shows the most about what you'd build for Addvery. The live run proves the pipeline, but sends all six to one flow.
  - The ten draw on your notes on Addvery's market. Without them, the session drafts from the charter alone, and you correct them at the spec-draft gate.
- **B. The ten are the people who'd hire a GTM engineer.**
  - The seven roles above plus three more, for example a Head of Growth, a VP of Sales and an agency founder, each with its own pitch of you.
  - The classifier routes each of the six to its role's flow, live, so the live run proves the classifier on real leads.
  - It needs no notes on Addvery's market, and shows less of it.
- **C. Something else.** Say what.

I recommend A. A GTM engineer is hired to build outbound for the company's own market, so ten ICPs Addvery could use say more than ten pitches of you. The classifier is still proven on every route with the fictional sample, and the eleventh flow shows the routing live.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer affects the ten ICP drafts, the classifier's routes, which flows the six enter, and what the D3 section of the site shows.

Write A, B or C. With A, add where your Addvery market notes will be, if you know.

## A7.1

`<operator_answer>`
```a-7-1

```
`</operator_answer>`

# Q7.2 Where the demo lives in GetSales

The facts:

- The charter's risk rule says to "keep the Apify proposal and the operator's own GetSales outbound off screen". DoD-22 says nothing published may show "the operator's own GetSales outbound".
- The live run has to go through your own sender profile, the LinkedIn account already in GetSales. The clip has to show each stage, GetSales included.
- The GetSales connector works on one selected team at a time. The session never lists your flows, leads, contacts or inbox. Every tool result it reads lands in the rig's filed Claude Code logs, which the legibility session reads for posts.
- Not yet known: whether one LinkedIn account can sit in two GetSales teams, and whether a second team or seat costs money. The session checks the connector's guide for attaching LinkedIn at launch, before you do anything.

Your options:

- **A. A new team just for the demo.**
  - You create it and attach your LinkedIn sender to it too, off camera with the rig paused. That takes about 10 minutes.
  - GetSales then holds only demo objects on screen, so any GetSales page is safe to film.
  - If attaching your sender would take it out of your own outbound team, or needs a paid seat, the session tells you through the desk first, and you can fall back to B.
- **B. Your existing team.**
  - Every demo object is named `D3 demo · ...`, and the session reads only those objects, by id.
  - On camera, GetSales is only ever open on a single demo flow's page, never the flow list, leads, contacts or inbox. Opening any other page means pausing the rig first.
  - It costs nothing and changes no settings. But one slip on camera shows your outbound, and the clip has to be checked frame by frame.
- **C. Something else.** Say what.

I recommend A if it costs nothing and leaves your own outbound untouched, otherwise B. A makes every GetSales frame safe to film, and it's what makes a view-only account for Ivana possible (question 5).

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes B and logs it, because no money is spent and no account setting changes on a default.

This answer affects which team every GetSales call runs against, what can be filmed, how the clip is checked, and question 5.

Write A or B followed by the team's name (the new team's name with A, the team to use with B), or C and what you want instead.

## A7.2

`<operator_answer>`
```a-7-2

```
`</operator_answer>`

# Q7.3 Sales Navigator to CSV on your own account

The facts:

- The pipeline starts "Sales Navigator, then CSV export" (charter, D3), on your own LinkedIn account. For the live run, the export holds six rows.
- LinkedIn restricts accounts that use scraping tools or browser extensions. S1's GetSales research checks how strict it is now, and which tools are risky. GetSales already runs automation on your account, under its own safety limits.
- Not yet known: whether GetSales can take a Sales Navigator search or lead list and give back a CSV. The same research checks this.
- An export tool's LinkedIn cookie or token is a secret. It's entered with the rig paused and kept in a git-ignored file.

Your options:

- **A. Only GetSales' own LinkedIn import.** No new tool touches your account. On screen you'd see the Sales Navigator search, then the import, then the CSV. If the research says GetSales can't do it, this falls back to C.
- **B. An export tool the research picks:** a browser extension, or an Apify scraper that uses your LinkedIn session. It looks most like a real pipeline, but it adds the risk of an account restriction, maybe a paid plan, and a secret to handle.
- **C. No automation on LinkedIn for the export.** On camera, you save the six to a Sales Navigator lead list, and the session writes the six-row CSV from what that list shows: name, title, company and profile URL. No added risk, but the export stage is the session's work, not a tool's.

I recommend A, with C as its fallback. It adds no new tool to your account and still shows a real export.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes C and logs it.

This answer affects the first two stages of the pipeline, what you do on camera, any secret to handle, and the risk to your LinkedIn account.

Write A, B or C.

## A7.3

`<operator_answer>`
```a-7-3

```
`</operator_answer>`

# Q7.4 What the live run sends, and the second message

The facts:

- The live run sends real LinkedIn activity to six real people, from your own profile. That's in scope: the charter makes "the D3 live run on six stakeholders" the one exception to its no-real-data rule, and DoD-12 allows nothing to send "except the live run".
- The charter's open question, verbatim: "What is D3's second custom message? The first carries the variable computed before import." The variable is one researched line per person, written by the pipeline from your enrichment.
- A first message can only go once someone accepts your connection request, which may be hours or days later, off camera. The clip shows the requests going out, plus any first message to someone you're already connected with.
- LinkedIn limits how long a connection-request note can be, and some plans cap how many notes you can send a month. S1's GetSales research checks the numbers.
- Nothing sends until two things have happened:
  - you've approved the six final messages in the pre-send gate, an operator task at about 16:10–16:20;
  - you've said yes on camera at the start.

  From 18:00, nothing sends on a default.

Your options for the steps of the flow the six go into (question 1):

- **A.** A connection request with a short note. Then, on acceptance, the first message carrying the computed line. Then, 3 days later if there's no reply, the second message.
- **B.** The same, but the connection request goes without a note.
- **C.** A connection request only. The sequence ends there, and both messages stay in the demo, unsent.
- **D. Something else.** Say what.

For the second message, I recommend one line pointing them at their own section of the site, with its link, plus one line on what it shows. You'll see all six in the pre-send gate before anything goes.

I recommend A with that second message. The note gets the request read, the first message carries the researched line the pipeline exists to show, and the second takes them to the site, which is the application itself.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A with the recommended second message, built but unsent, and logs it. Nothing sends until the morning cleanup session has your yes.

This answer affects the steps and copy of the flow the six go into, what the six receive and when, what the clip can show, and the pre-send gate.

Write A, B, C or D. For the second message, write "as recommended" or what it should say.

## A7.4

`<operator_answer>`
```a-7-4

```
`</operator_answer>`

# Q7.5 Ivana's view-only GetSales account

The facts:

- The charter's open question, verbatim: "Does Ivana still get a view-only GetSales account, or does the D3 video replace it?"
- A view-only account means inviting her into a GetSales team. GetSales sends her the invite, so it reaches the outside world.
- She would see everything in that team. It's only safe on a team that holds nothing but the demo, which is question 2's option A.
- Whether a seat costs money isn't known yet.
- The D3 video and the D3 section of the site show the same flows, classifier and live run, publicly, with no account needed.

Your options:

- **A. The video replaces it.** No invite.
- **B. She gets view-only access to the demo team,** invited after the live run, once you say yes. This needs question 2's option A. Under option B it falls back to A here.
- **C. Both:** the video now, and the morning cleanup session asks you about the invite.

I recommend A. It shows her the same thing without opening your account to anyone, and it costs nothing.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer affects whether anyone outside gets into your GetSales, any seat cost, and what the D3 section says about access.

Write A, B or C.

## A7.5

`<operator_answer>`
```a-7-5

```
`</operator_answer>`

# Q7.6 The live-run slot and the road to it

The facts:

- The proposed slot is 17:00–17:30 Prague. Your other scenes today, all Prague time:

  | Time | Scene |
  | --- | --- |
  | 15:15–15:35 | Test dictation |
  | 15:50–16:10 | Dictation |
  | 16:20–16:40 | Dictation |
  | 16:45–17:00 | Brand sign-off |
  | 17:30–17:55 | Canva recording |
- On camera, for about 30 minutes: you run the Sales Navigator search and the export, watch each stage run, and say yes to the import and to the start.
- The road to it, with your two gate tasks fitted into the gaps between dictations:
  - **About 15:30:** research findings are due. That's S1's GetSales list, which S1 brings to you separately.
  - **15:35–15:50:** the spec-draft gate, with the ten ICPs, their sequences and S-D3's definition of done.
  - **16:10–16:20:** the pre-send gate, with every GetSales flow preview and the six final messages.
  - **16:40:** go/no-go. It needs the six stakeholders confirmed in your Addvery research, the flows built, the dry run passed and the pre-send gate approved.
- In DI-5 you said you may soften the research rules "especially if we're running low on time".
- Groundwork that needs no research (scripts, drafts, a fictional sample) runs in parallel with research either way. Nothing goes into GetSales before the spec-draft gate.

Your options:

- **A. 17:00–17:30, with this road.** If findings haven't landed by 15:30, the spec-draft gate still goes to you at 15:35, with the research verdicts marked pending. Anything a later finding changes is fixed before the pre-send gate. A no-go at 16:40 moves the live run to tomorrow morning's cleanup session.
- **B. 17:00–17:30, but the spec-draft gate waits for findings.** If that pushes the go/no-go past 16:40, the live run moves to tomorrow morning.
- **C. A different slot:** tomorrow morning in the cleanup session, or after the Canva recording from 17:55 (running past 18:00 only if you're still here). Name it.

I recommend A. The live run is the one scene of yours that S-D3 can't do without. A keeps it today without skipping research: only the order changes.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it moves the live run to the morning cleanup session, sends nothing, and logs it.

This answer affects when you're on camera, when the two gate tasks reach you, and whether research may land after the spec draft.

Write A, B, or C and the slot.

## A7.6

`<operator_answer>`
```a-7-6

```
`</operator_answer>`
