---
System Primitive: Intake file
Intake State: Waiting on operator
Intake id: DI-8
Created: 2026-11-02
Build goals: []
---

<!-- File name: "Decide - how the blog pipeline should work.md" -->

# Decide: how the blog pipeline should work

## What this is

The whole site is a personalised job application to Addvery, built live in a 12-hour recorded hackathon. This part is the **blog pipeline**: it turns about 15 minutes of you talking into a good-looking blog post that's nearly finished, so you only do the last 10%. On the site it shows that you can turn an expert's knowledge into published content fast, and it's the tool your three blog posts for the site are made with.

**What you're asked:** five things. Where the post's look is built; where your dictation goes; whether the test dictation also counts as the first of your three blog posts; when the test dictation happens and what it's about; and what to do if the blog research runs late.

**What happens once you answer:** the blog pipeline session starts. It writes you a short task to dictate into, asks the website session for a blog page, and drafts a post from your dictation. You then get one approval file asking whether that post is near-final, about 10 minutes, in your next gap.

**Waiting on this right now:** the test dictation, proposed for 15:15–15:35, and through it all three blog posts.

**On camera:** once, about 15 minutes of talking for the test dictation, plus a couple of minutes to open the task.

**Time to answer:** about 5 minutes. **Deadline:** about 15:10, so the test dictation can happen at 15:15. Anything still empty at 18:00 takes its default.

**Timetable change:** the GetSales outreach to Addvery's six stakeholders now goes out by 15:30 instead of a live run at 17:00 (your answer at 14:30), so 17:00–17:30 is free. If that outreach needs you around 15:15, pick B or C for the test dictation's time in question 4.

This intake holds 5 decisions. Each question carries its own context, so you can answer them in any order. An empty fence means not answered. The full plan for this part is at `blog-pipeline\SPEC.md` for reference, but you needn't read it. Say "DI-8 is ready" when you're done.

# Q8.1 Where the post's look is built

The charter says the blog pipeline "turns 15 minutes of operator dictation into a good-looking blog post that he finishes off (the last 10%). Likely built in the Claude design app."

The facts:
- The pipeline runs in terminal sessions, which can't drive the Claude Design app.
- The Vercel connector lists a tool that imports a Claude Design into Vercel. What it produces, and how it fits the existing site, isn't known yet; the research session's blog research list asks.
- Every post must look finished on the live site, in its Addvery look. Three of them get published, today or tomorrow morning.
- Your window to 18:00: the test dictation at 15:15, the GetSales outreach by 15:30, blog dictations at 15:50 and 16:20, the brand sign-off at 16:45, the Canva recording at 17:30. 17:00–17:30 is now free.

Your options:
- **A. A post template built into the site.** The website session builds a blog page in the site's own look from a post format the blog pipeline writes: a typographic cover, headings, pull quotes, and a "How this post was made" box showing minutes talked, words drafted and how much you changed. After that, every post is one text file and one build request. Costs none of your time. Claude Design isn't used.
- **B. Claude Design, today.** You design the post's look in the app, about 20 minutes on camera, at a time you name (17:00–17:30 is free). The website session then imports it or rebuilds it as the template. Puts Claude Design on the recording, as the charter expected. Costs 20 minutes of your window, and the import path is unproven.
- **C. A now, Claude Design tomorrow.** The site template carries today's posts. In the morning cleanup session, you restyle it in Claude Design if you still want to.

I recommend A. The charter says "likely", not "must". A costs you nothing and is the surest way to get three good-looking posts live. Pick C if you want Claude Design on the record without spending today's window.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer decides the blog pipeline's first request to the website session, and whether you have a Claude Design scene.

Write A, B with a time, or C.

## A8.1

`<operator_answer>`
```a-8-1

```
`</operator_answer>`

# Q8.2 Where your dictation lands

The facts:
- You dictate with Wispr Flow (your answers on the capture rig yesterday).
- The rig also records and transcribes every session, but only once you've typed /stop and then /process in a break. You chose yesterday that /process runs only when you type it.
- The pipeline can start drafting only once it has the text.

Your options:
- **A. Wispr Flow into a dictation task, with the rig as backup.** The blog pipeline session writes you a task file for the slot: the topic, five prompts to talk through, and a "Dictate below this line" section. You open it, start Wispr Flow, talk for about 15 minutes, and tick Done. Drafting starts at once. The rig records as usual, and if Wispr Flow drops anything, the gap is filled from the rig transcript once that session is processed. If Wispr Flow stops partway, start it again in the same place. It tidies as it types, which helps the draft but may smooth your voice a little.
- **B. Just talk, rig transcript only.** No Wispr Flow: you talk during a recorded session. The pipeline finds those minutes in the transcript after your next /stop and /process, so drafting waits for your next break, often an hour or more, and your near-final review slips with it.
- **C. Something else.** Say what.

I recommend A. Drafting doesn't wait for a break, and your words appear on screen as you speak, which reads well in the recording.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer sets how you run every dictation, the three blog posts' included, and when drafting can start.

Write A, B, or C and what you want instead.

## A8.2

`<operator_answer>`
```a-8-2

```
`</operator_answer>`

# Q8.3 Charter conflict: does the test dictation count as the first blog post?

The facts:
- The charter's list of scenes to shoot today names the blog pipeline's test dictation and the three blog-post dictations separately: four dictations of about 15 minutes each.
- The definition of done you signed off earlier today checks the pipeline with "One test dictation produced a post Alex accepted as near-final", and the posts with "Three blog posts, each from a 15-minute dictation through the blog pipeline and finished by the operator, are published on the site". A test post that you accept and then finish meets both.
- The proposed timetable has the test at 15:15–15:35 and blog dictations at 15:50–16:10 and 16:20–16:40. A fourth dictation would take 17:00–17:20, which the GetSales change freed, so nothing else moves.

Your options:
- **A. Count it.** Once you've accepted the test post as near-final, it becomes the first of the three blog posts: you finish it and it's published like the others. Three dictations in all, about 20 minutes saved today. The test topic must then be one you'd publish (question 4). The blog pipeline session asks the orchestration session to note the change in the charter's list of scenes.
- **B. Keep them separate, as the charter lists them.** Four dictations. The test post isn't published as one of the three. About 20 more minutes of your window, in the 17:00 slot.
- **C. Something else.** Say what.

I recommend A. Both definition-of-done lines are met either way, and your time is the scarcest thing today (the rule that your time is shot first).

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer decides how many more dictations the three blog posts need (their decision file asks for two topics and slots under A, three under B), the afternoon timetable, and whether the test topic must be publishable.

Write A, B or C.

## A8.3

`<operator_answer>`
```a-8-3

```
`</operator_answer>`

# Q8.4 The test dictation: when, and about what

The facts:
- It's about 15 minutes of talking, on camera during a recorded rig session, plus a couple of minutes to open the task. The pipeline needn't exist yet: the dictation is raw input, drafted afterwards (the rule that your time is shot first, before the build, like a film's most expensive actor).
- If it counts as the first blog post (question 3), it gets published, so the topic should be one Addvery's audience would read. Which topics those are is your own Addvery research, so the proposals below come only from your own expertise and today's build. Swap any of them for one you know their readers want.
- The decision file for your three blog posts offers the same list, so the posts won't repeat the test's topic.
- The GetSales outreach goes out by 15:30. If it needs you then, take B or C below.

Proposed topics:
1. The movie-actor rule: when your time is the bottleneck, shoot your scenes first and let ten AI sessions build around you.
2. From B2B marketing consultant to GTM engineer: what changed in the work, and what didn't.
3. Executable specs: how to brief AI agents so that parallel work doesn't fall apart.
4. Route before you sequence: why outbound needs a lead classifier before it needs more sequences.
5. Dictate, don't type: fifteen minutes from expertise to a publishable post.

Slot options:
- **A. 15:15–15:35**, as proposed.
- **B. Straight after you've answered this intake**, if that's earlier.
- **C. A time you name**, for example 17:00–17:20, which is now free.

I recommend A with topic 1. You're living it today, so 15 minutes comes easily, and it explains the whole site to a reader.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes the first slot of the morning cleanup session, with topic 1, and logs it.

This answer sets when the test dictation happens, what the first post is about, and which topics are left for the other two posts.

Write the slot letter and a topic number or your own topic, for example "A, 1".

## A8.4

`<operator_answer>`
```a-8-4

```
`</operator_answer>`

# Q8.5 If research runs late

The facts:
- The research session has drafted the blog research list: how to turn a spoken transcript into a post that keeps your voice, what Claude Design can do, whether the rig transcript is good enough as input, and what a finished B2B post looks like, plus three open-ended wildcard questions. It comes to you separately, as the research session's own approval file. The blog pipeline needs its findings by about 16:00.
- The project's research method puts research before the method of each part. Your words when you signed off the definition of done earlier today: "I might soften that and change the research rules especially if we're running low on time".
- The test dictation doesn't wait for research, but drafting it does. Your near-final review fits today only if the post is ready by one of your gaps: about 16:10 (before the 16:20 dictation), 16:40, or 17:00–17:30.

Your options:
- **A. Don't wait.** The pipeline drafts the test post on its draft method as soon as your dictation is in. When the findings land, it revises the method and reruns the post before you see it, if the rerun is ready in time; otherwise you see the first version and the rerun follows. Costs some repeated drafting by assistants, none of your time.
- **B. Wait for the findings.** Nothing is drafted before the blog research is summed up. If that's late, your review slips to the end of your window or the morning, and the three blog posts wait with it.
- **C. Skip the blog research list.** Build on the draft method and the research list for the whole project only. Fastest, but it loses the research on voice and on the post's look.

I recommend A. Research still shapes the final method, and your review stays inside today.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer decides when the test post is ready for your review, and so whether the three blog posts can be finished today.

Write A, B or C.

## A8.5

`<operator_answer>`
```a-8-5

```
`</operator_answer>`
