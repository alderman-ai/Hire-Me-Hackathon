---
System Primitive: Intake file
Intake State: Waiting on operator
Intake id: DI-8
Created: 2026-11-02
Build goals: []
---

# Decision intake 8

This intake holds 5 decisions for S-D4 Blog pipeline, the spec that turns about 15 minutes of your dictation into a good-looking, near-final blog post with only the last 10% left to you. Each question carries its own context, so you can answer them in any order. An empty fence means not answered. The spec draft is at `blog-pipeline\SPEC.md` for reference, but you needn't read it. The spec needs you on camera once, for a 15-minute test dictation proposed for 15:15–15:35 (question 4), and later about 10 minutes, on camera or not, to look at the post it made. Say "DI-8 is ready" when you're done.

# Q8.1 Where the post's look is built

The charter on D4: "Turns 15 minutes of operator dictation into a good-looking blog post that he finishes off (the last 10%). Likely built in the Claude design app."

The facts:
- The pipeline runs in terminal sessions, which can't drive the Claude Design app.
- The Vercel connector lists a tool that imports a Claude Design into Vercel. What it produces, and how it fits the existing site, isn't known yet; the blog research list asks.
- Every post must look finished on the live site, in its Addvery look. S-D5 publishes three of them, today or tomorrow morning.
- Your window to 18:00 is booked: the test dictation at 15:15, article dictations at 15:50 and 16:20, the brand sign-off at 16:45, the GetSales live run at 17:00 and the Canva recording at 17:30.

Your options:
- **A. A post template built into the site.** The `website` session builds a blog page in the site's own look from a post format S-D4 writes: a typographic cover, headings, pull quotes, and a "How this post was made" box showing minutes talked, words drafted and how much you changed. After that, every post is one text file and one build request. Costs none of your time. Claude Design isn't used.
- **B. Claude Design, today.** You design the post's look in the app, about 20 minutes on camera, at a time you name. `website` then imports it or rebuilds it as the template. Puts Claude Design on the recording, as the charter expected. Costs 20 minutes of a full window, and the import path is unproven.
- **C. A now, Claude Design tomorrow.** The site template carries today's posts. In the morning cleanup session, you restyle it in Claude Design if you still want to.

I recommend A. The charter says "likely", not "must". A costs you nothing and is the surest way to get three good-looking posts live. Pick C if you want Claude Design on the record without spending today's window.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer decides S-D4's first build request to `website`, and whether you have a Claude Design scene.

Write A, B with a time, or C.

## A8.1

`<operator_answer>`
```a-8-1

```
`</operator_answer>`

# Q8.2 Where your dictation lands

The facts:
- You dictate with Wispr Flow (your answer in the capture rig intake, DI-1).
- The rig also records and transcribes every session, but only once you've typed /stop and then /process in a break. DI-1: /process "runs only when he types it".
- S-D4 can start drafting only once it has the text.

Your options:
- **A. Wispr Flow into a dictation task, with the rig as backup.** S-D4 writes you an operator task for the slot: the topic, five prompts to talk through, and a "Dictate below this line" section. You open it, start Wispr Flow, talk for about 15 minutes, and tick Done. Drafting starts at once. The rig records as usual, and if Wispr Flow drops anything, S-D4 fills the gap from the rig transcript once that session is processed. If Wispr Flow stops partway, start it again in the same place. It tidies as it types, which helps the draft but may smooth your voice a little.
- **B. Just talk, rig transcript only.** No Wispr Flow: you talk during a recorded session. S-D4 finds those minutes in the transcript after your next /stop and /process, so drafting waits for your next break, often an hour or more, and your near-final review slips with it.
- **C. Something else.** Say what.

I recommend A. Drafting doesn't wait for a break, and your words appear on screen as you speak, which reads well in the recording.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer sets how you run every dictation, S-D5's three included, and when drafting can start.

Write A, B, or C and what you want instead.

## A8.2

`<operator_answer>`
```a-8-2

```
`</operator_answer>`

# Q8.3 Charter conflict: does the test dictation count as article 1?

The facts:
- The charter's run order lists, among the "Operator scenes to shoot today": "the S-D4 test dictation and the three S-D5 dictations". That's four dictations of about 15 minutes each.
- The definition of done you signed off (DI-5) checks D4 with "One test dictation produced a post Alex accepted as near-final" (DoD-14), and D5 with "Three blog posts, each from a 15-minute dictation through the blog pipeline and finished by the operator, are published on the site" (DoD-15). A test post that you accept and then finish meets both.
- The proposed timetable has the test at 15:15–15:35 and the articles at 15:50–16:10 and 16:20–16:40. With four dictations, the last one takes 16:40–17:00, so the brand sign-off at 16:45 and everything after it move back about 15 minutes, including the GetSales live run at 17:00.

Your options:
- **A. Count it.** Once you've accepted the test post as near-final, it becomes S-D5's article 1: you finish it and it's published like the others. Three dictations in all, about 20 minutes saved today. The test topic must then be one you'd publish (question 4). S-D4 asks S2 to note the change in the charter's scene list.
- **B. Keep them separate, as the charter lists them.** Four dictations. The test post isn't published as an article. About 20 more minutes of your window, and the afternoon moves back.
- **C. Something else.** Say what.

I recommend A. Both DoD items are met either way, and your time is the scarcest thing today (P3).

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer decides how many dictations S-D5 needs (its intake asks for two topics and slots under A, three under B), the afternoon timetable, and whether the test topic must be publishable.

Write A, B or C.

## A8.3

`<operator_answer>`
```a-8-3

```
`</operator_answer>`

# Q8.4 The test dictation: when, and about what

The facts:
- It's about 15 minutes of talking, on camera during a recorded rig session, plus a couple of minutes to open the task. The pipeline needn't exist yet: the dictation is raw input, drafted afterwards (the charter's movie-actor rule, P3).
- If it counts as article 1 (question 3), it gets published, so the topic should be one Addvery's audience would read. Which topics those are is your own Addvery research, so the proposals below come only from your own expertise and today's build. Swap any of them for one you know their readers want.
- The S-D5 intake offers the same list, so the articles won't repeat the test's topic.

Proposed topics:
1. The movie-actor rule: when your time is the bottleneck, shoot your scenes first and let ten AI sessions build around you.
2. From B2B marketing consultant to GTM engineer: what changed in the work, and what didn't.
3. Executable specs: how to brief AI agents so that parallel work doesn't fall apart.
4. Route before you sequence: why outbound needs a lead classifier before it needs more sequences.
5. Dictate, don't type: fifteen minutes from expertise to a publishable post.

Slot options:
- **A. 15:15–15:35**, as proposed.
- **B. Straight after you've answered this intake**, if that's earlier.
- **C. A time you name.**

I recommend A with topic 1. You're living it today, so 15 minutes comes easily, and it explains the whole site to a reader.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes the first slot of the morning cleanup session, with topic 1, and logs it.

This answer sets when the test dictation happens, what the first post is about, and which topics are left for S-D5.

Write the slot letter and a topic number or your own topic, for example "A, 1".

## A8.4

`<operator_answer>`
```a-8-4

```
`</operator_answer>`

# Q8.5 If research runs late

The facts:
- S1 has drafted the blog research list, L-03: how to turn a spoken transcript into a post that keeps your voice, what Claude Design can do, whether the rig transcript is good enough as input, and what a finished B2B post looks like, plus three wildcards. It comes to you separately, as S1's gate approval. S-D4 needs its findings by about 16:00.
- The method S1 follows puts research before the methodology. Your words when you signed off the definition of done (DI-5): "I might soften that and change the research rules especially if we're running low on time".
- The test dictation doesn't wait for research, but drafting it does. Your near-final review fits today only if the post is ready by about 16:10 (the gap before the 16:20 dictation) or 16:40.

Your options:
- **A. Don't wait.** S-D4 drafts the test post on its draft method as soon as your dictation is in. When the findings land, it revises the method and reruns the post before you see it, if the rerun is ready in time; otherwise you see the first version and the rerun follows. Costs some repeated drafting by assistants, none of your time.
- **B. Wait for the findings.** Nothing is drafted before L-03's synthesis lands. If that's late, your review slips to the end of your window or the morning, and S-D5's posts wait with it.
- **C. Skip L-03 for S-D4.** Build on the draft method and the parent list, L-01, only. Fastest, but it loses the research on voice and on the post's look.

I recommend A. Research still shapes the final method, and your review stays inside today.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer decides when the test post is ready for your review, and so whether S-D5's posts can be finished today.

Write A, B or C.

## A8.5

`<operator_answer>`
```a-8-5

```
`</operator_answer>`
