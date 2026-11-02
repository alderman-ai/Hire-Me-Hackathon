---
System Primitive: Intake file
Intake State: Waiting on operator
Intake id: DI-7
Created: 2026-11-02
Build goals: []
---

<!-- File name: "Decide - how the GetSales outbound demo runs.md" -->

# Decide: how the GetSales outbound demo runs

## What this is

The site you're building today is a personalised job application to Addvery, built live in a 12-hour recorded hackathon. The GetSales part of it does two things:

1. **The alert.** It sends a short campaign from your own LinkedIn sender profile to the six Addvery stakeholders you pick in your own research. It tells them the hackathon is happening, why you're doing it, and that they can follow along. You asked for it to go by 15:30 Prague.
2. **The outreach demo.** It builds Addvery's top ICPs × the languages that make sense × 3 approaches as workflows in one new GetSales folder you can hide. Each workflow starts with the lead field `custom message 1`, and an explanation shows how Jev would route each lead into the right one.

Your answers on the scraping demo earlier today already settled almost everything:

- No scraping happens in the GetSales part. All of it is yours, in your Addvery Research folder.
- The alert's first message is `custom message 1`, computed from what's already scraped and imported with each lead.
- The ICP grid and the hideable folder are as you described them.
- The tech is the assistant's call. The six's list comes from the profile URLs in your research, with no export tool on your LinkedIn account. Once the alert is out, you save the six to a Sales Navigator lead list on camera, so the video shows that step of the pipeline too.

Here you're asked only three small things:

1. How the alert reaches people you aren't connected to.
2. Whether Ivana gets a GetSales login.
3. What Jev is.

Once you answer, the GetSales session uses them straight away. The alert itself still waits for one more thing from you: a separate approval file holding the six final messages, and ticking it is what sends them. Nothing sends without that tick.

**What's waiting on this right now:** the alert's form, question 1. Questions 2 and 3 only shape the demo, which comes later.

**On camera:** about 2 minutes after the alert is out, saving the six to a Sales Navigator lead list. No other scene.

**Time:** about 3 minutes. **Deadline:** question 1 by about 15:10, so the alert can go by 15:30; the other two before 18:00.

This intake holds 3 decisions, and each carries its own context. An empty fence means not answered. Say "DI-7 is ready" when you're done.

# Q7.1 How the alert reaches people you aren't connected to

On LinkedIn, a first message to someone you aren't connected with only goes once they accept your connection request, which may take hours or days. Until then, all they see is the connection request's note. The note is short, around 300 characters, and some plans cap how many notes you can send a month. InMail reaches them at once, but it uses Sales Navigator credits, and GetSales may not send it. For anyone you're already connected with, the alert goes straight in as the first message.

- **A.** A connection request whose note is a short version of the alert. On acceptance: `custom message 1`, then the why-I'm-doing-this message, then one more. The note lands today.
- **B.** A connection request with no note, then the same messages. Nothing reaches them until they accept.
- **C.** InMail where GetSales supports it, otherwise A.

I recommend A. It's the only option that's sure to put the alert in front of all six by 15:30, and it costs no credits.

If the fence is empty: before 18:00 Prague the session keeps waiting, without poking you while you're on your Addvery research, but the approval file for the six messages shows A, and your tick there counts as this answer. From 18:00 it takes A and logs it, and nothing sends without your tick.

This affects the alert's first step for anyone you aren't connected with, and what the approval file shows.

Write A, B or C.

## A7.1

`<operator_answer>`
```a-7-1

```
`</operator_answer>`

# Q7.2 Ivana's view-only GetSales account

An open question from the project charter: "Does Ivana still get a view-only GetSales account, or does the [GetSales demo] video replace it?" That video is the clip of the alert going out, which goes on the site.

A view-only account means GetSales emails her an invite into a team. The demo lives in a folder inside your own team, so unless GetSales can limit her to that folder, she'd also see your own outbound. A seat may cost money. The clip and the GetSales section of the site show the same workflows publicly, with no login needed.

- **A.** The video replaces it. No invite.
- **B.** She gets view-only access, but only if GetSales can limit her to the demo folder. The session checks that first, and invites her only after your yes.
- **C.** Something else. Say what.

I recommend A. It shows her the same thing without opening your account.

If the fence is empty: before 18:00 Prague the session keeps waiting, without poking you while you're on your Addvery research; from 18:00 it takes A and logs it.

This affects whether anyone outside gets into your GetSales, and what the site says about access.

Write A, B or C.

## A7.2

`<operator_answer>`
```a-7-2

```
`</operator_answer>`

# Q7.3 What Jev is

Earlier today you said the demo will "explain how Jev can be trained to put people into one of those workflows". The session doesn't know what Jev is: a tool in your stack, an agent you've built, or something Addvery uses. The site names it, so it has to be right.

- **A.** Tell me in one line what Jev is, and where to read about it if there's somewhere, such as a repo or a folder.
- **B.** Describe a generic trained AI router instead, and leave the name Jev out.

I recommend A. A named tool you actually use reads better than a generic one.

If the fence is empty: before 18:00 Prague the session keeps waiting, without poking you while you're on your Addvery research; from 18:00 it takes B and logs it. The demo waits for your Addvery research anyway, so this doesn't hold up the alert.

This affects the routing explanation in the demo and on the site.

Write A followed by one line, or B.

## A7.3

`<operator_answer>`
```a-7-3

```
`</operator_answer>`
