---
System Primitive: Operator task
Task type: Gate approval
Task id: OT-08
Task State: Open
Gate: S-D3 pre-send (the alert to the six)
Requested by: s-d3-getsales
Snapshot of: getsales/live/pre-send.md (git-ignored) and getsales/alert/copy.json at commit f5184f1
Unblocks: the alert sends from Alex's LinkedIn sender to the six; answers DI-7 question 1 if ticked as it stands
Created: 2026-11-02 15:42 Prague (six changed 15:55)
---

<!-- File name: "Approve - the six alert messages before they send.md". No ids or codes in the name or the text. -->

# Approve: the six alert messages before they send

## What this is

Today's site is your job application to Addvery, built live. Part of it is a short LinkedIn alert from your own sender profile in GetSales to the six Addvery people from your research. It tells them the build is happening, why you're doing it, and that they can follow along. **Ticking the box below sends it.** Nothing goes to anyone before that, and nothing sends after 18:00 tonight; anything unsent waits for tomorrow morning.

**What you're asked:** read the six messages (about 5 minutes), and either tick, or write what to change in the box at the bottom. **Ticking also confirms these six as your top six**, so you needn't confirm them anywhere else. Every call below already shows the recommended choice, so a tick as it stands takes all of them.

**What happens when you tick:** within 5 minutes the session creates a hideable folder in GetSales, builds the alert flow in it, imports the six with their personal first message, checks that GetSales renders every message word for word as shown here, and starts it. If anything differs, it stops and asks you instead. Each step's time is logged for the video.

**Time:** about 5 minutes, or 15 if you rewrite the six opening lines yourself. **Deadline:** your sender's LinkedIn hours end at **16:30** today; tick by about 16:15 for today, or take call 9 to keep sending until 18:00.

**The exact text, with names, is in a file that stays on this computer** (it never reaches the public repo):

![[getsales/live/pre-send.md]]

Below, the same messages use role labels instead of names.

## What's being approved

### In five lines

1. A new folder in your GetSales team for the whole demo, with one flow in it: "Hackathon alert to the six", from your sender only.
2. Already connected: message 1 at once. Not connected: a connection request whose note is the alert; message 1 ten minutes after they accept.
3. Message 1 is `custom message 1`: one personal opening line, the alert, and a privacy line. Message 2 (a day later): why you're doing it, and that AI agents built most of it under your direction. Message 3 (three days later): a last note and a 20-minute ask, with no follow-up after.
4. Any reply stops the sequence for that person.
5. The calls below.

### The sequence

```
[1] Pre-check: already connected? (1 min)
 ├─ yes → [2] LinkedIn msg 1: {{custom_message_1}}          (at once)
 │          ↓ wait 1d
 │        [3] LinkedIn msg 2: why I'm doing this
 │          ↓ wait 3d
 │        [4] LinkedIn msg 3: last note
 │        → end
 └─ no  → [5] LinkedIn connect — note: the alert, under 200 characters (sends without note if LinkedIn limits notes)
            [6] Wait for acceptance (up to 10d, no automatic like)
             ├─ accepted → [7] LinkedIn msg 1: {{custom_message_1}}   (10 min after acceptance)
             │               ↓ wait 1d
             │             [8] LinkedIn msg 2: why I'm doing this
             │               ↓ wait 3d
             │             [9] LinkedIn msg 3: last note
             │             → end
             └─ 10 days, no answer → withdraw the request → end
```

### The six, with role labels and the shared text

The six are, in order: the CEO, the Chief Growth Officer (labelled Director of Growth), both co-founders (now advisors), the Chief Delivery Officer and the Head of BI. Their names and their exact lines are in the file above. **Changed at 15:55, at your word:** the Chief Growth Officer is in, the engagement manager is out. If you ticked before this change, tick again.

| # | Who | Opening line (characters) | What the line rests on |
| --- | --- | --- | --- |
| 1 | CEO | 151 | own LinkedIn post on a conference talk, 29 Oct |
| 2 | Director of Growth | 207 | own LinkedIn post after a data and AI governance event, 1 Oct |
| 3 | Co-founder (group) | 175 | own LinkedIn post on what never to hand to AI, 31 Oct |
| 4 | Co-founder (agency) | 204 | own LinkedIn post sharing the new agency's first interview, 14 Oct |
| 5 | Director of Delivery | 162 | own LinkedIn hiring post for an AI role, 21 Sep |
| 6 | Director of BI | 211 | own LinkedIn post on taking over BI, 8 Jun |

**The same for all six:**

- **Connection note** (only if you aren't connected yet), with their first name:
  > Hi [first name], I'm applying to work with Addvery via a 12-hour live build today. Follow along: hire-me-hackathon.vercel.app (privacy note there). Rather not? Ignore this, I won't follow up. Alex
- **Message 1**, `custom message 1`: their own opening line ("Hi [first name], ..."), then:
  > I'm applying to work with Addvery as a GTM engineer in an unusual way: a 12-hour live build today of the research and outbound systems I'd build at Addvery, recorded as it happens. You can follow along at hire-me-hackathon.vercel.app
  >
  > Why you're getting this, and what I keep about you: hire-me-hackathon.vercel.app/privacy. If you'd rather I stopped, reply "no" and I'll delete what I hold and not write again.
- **Message 2** (a day later):
  > A word on why I'm doing it this way. My background is B2B marketing, and the work I want now is GTM engineering: building the systems that find the right accounts, research them and start the right conversations. A CV can only claim that, so I built it in the open instead. Most of the building was done by AI agents working under my direction, including the research behind my first message to you. Deciding what to build, and checking it, was my part. It's all at hire-me-hackathon.vercel.app
- **Message 3** (three days after that):
  > Last note from me on this. If anything in the build is useful for Addvery, I'd value 20 minutes to walk you through it, or to hear what you'd have done differently. If not, no reply needed, and I won't follow up. Alex

### Your calls (a tick takes every recommendation)

1. **People you aren't connected to** (the open question on how the alert reaches them). **Recommended: a connection request whose note is the alert** (shown above), then message 1 on acceptance. The note lands today and costs no credits. Ticking answers that question.
2. **The link.** **Recommended: the site's own address, `hire-me-hackathon.vercel.app`, in the note and again in message 1.** It's short enough to retype if LinkedIn doesn't make it clickable in a note. Never a one-off deployment address, which shows a login wall. A custom domain is the alternative, but not inside an hour. Before sending, the session loads it logged out and checks it works.
3. **The link preview card.** Done, nothing to decide: the site now shows a 1200x630 card, "The Hire Me Hackathon", with no names on it, so the link doesn't arrive bare. Optional, about a minute: paste the address into LinkedIn's Post Inspector (it needs your LinkedIn login) so LinkedIn picks the card up fresh.
4. **What a click tonight sees.** Today the site doesn't yet read as an application to them. **Recommended: a short panel at the top for people arriving from the alert:** what's being built for them, what's live, when the rest lands, and "an unofficial application by Alex Alderman, not affiliated with Addvery". It names Addvery on the site, so it needs this tick. It doesn't hold up the send. The alternatives are to leave the site as it is, or to hold the alert until the site is the application, which loses today.
5. **Who writes the six opening lines.** The research found that AI-written personal lines are where trust is lost, even when AI use is disclosed, and that it helps when you tell the story yourself. **Recommended: rewrite any line you want in your own words in the box below** (as `CEO: <your line>`), and keep message 2's plain statement that agents built most of it under your direction. If you don't, the drafted lines go as shown.
6. **Saying who made what on the site.** **Recommended: one "How this was made" panel, "Alex directs, the agents build",** asked of the website session after this tick. The alternatives are a "made by" tag on every part, or nothing.
7. **The privacy notice.** The research on personal data treats this as required, not optional: someone you contact from public sources has to be told, at the first contact, who you are, why, what you hold, where it came from, how long you keep it, and that they can object. **Recommended: keep the short notice page below at `hire-me-hackathon.vercel.app/privacy`,** linked from message 1 and from the site's footer, with the right to object in its own sentence. It's already up but unlisted (no link to it anywhere, hidden from search) until you tick; if you'd rather not have it, say so below and it comes down. Also adopt the one-page balancing test below, dated today. Neither is legal advice.
8. **How it's framed: a job application, or a freelance services offer?** **Recommended (and already written that way): a job application and a request for a conversation, never a services pitch.** "Applying to work with Addvery as a GTM engineer" leaves employment and freelance both open without selling anything. No "freelance", "services", "offer" or "book a call". A pitch could count as unsolicited commercial communication under Czech law, it breaks LinkedIn's rule on promotional invitations, and it sits badly with the site's free hosting plan, which is for non-commercial use.
9. **When it sends.** Your sender's LinkedIn hours today are 07:45 to 16:30. **Recommended: give this one flow its own hours, Mon to Fri 07:45 to 18:00 Prague,** so a tick after 16:15 still sends today. Your sender's own settings and your other campaigns aren't touched. Nothing sends after 18:00.
10. **How much is automated.** **Recommended: GetSales sends, paced by your sender's own limits** (the six spread out, not in a burst), and the Sales Navigator step is done by hand, by you, after the send. Nothing scrapes or exports from your LinkedIn account. The alternative is sending the six by hand and keeping GetSales for the demo only, which is safer for your account but shows less.
11. **Deletion date, and if someone objects.** **Recommended: at the end of the hiring conversation, and by 31 December 2026 at the latest**, as the notice says. Shorter options: 30 days. A reply stops that person's sequence automatically. If they object, the session deletes what it holds on them, here and in GetSales, keeps only a note not to contact them again, and tells you.
12. **What the video shows of them.** Already asked once, as an optional one-liner in "Approve - the plan for the site's build updates"; answer it there, not here. Unless you say otherwise: names, photos and personal lines are blurred, the six appear only by role, and acceptances, replies, your own campaigns, leads and inbox never appear. The video needs the recording running (not paused) when you tick this box, and while GetSales shows the new folder.
13. **An "it's finished" message.** **Recommended: as built.** Message 2 goes a day after message 1, after tomorrow morning's clean-up, and points to the finished site. The alternative is a separate note you send by hand once you're happy with the site.
14. **A CRM step or Clay table in the demo.** It doesn't touch this send. **Recommended: neither for the alert;** it's decided with the outreach-demo approval later today.
15. **Language.** Most of the six post in Czech, and all are based in Czechia; Addvery's website is in English. **Recommended: English,** because you're writing as yourself and the site is English. The alternative is Czech messages, which you'd want to check line by line.

After it sends, one thing for you on camera, about 2 minutes, whenever suits: save the six to a Sales Navigator lead list, so the video shows that step of the pipeline too.

### The privacy notice (call 7)

As it stands at `hire-me-hackathon.vercel.app/privacy` (unlisted until you tick):

![[getsales/site/privacy.md]]

### The balancing test (call 7)

A one-page draft for you to adopt or change; not legal advice:

![[getsales/alert/balancing-test.md]]

## Approval

- [ ] I approve

Tick the box to approve as it stands. If something has to change first, leave the box empty and write what to change below. Either way, the requesting session checks this file every 5 minutes while it's blocked.

`<operator_answer>`
```ot-08-changes

```
`</operator_answer>`
