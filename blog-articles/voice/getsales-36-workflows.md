---
title: "36 sequences, and who goes into which one"
summary: "It doesn't matter how many outbound sequences you have. It matters who gets put into which one: 36 GetSales workflows for Addvery, a custom first message for every lead, and the classification that decides where each one goes."
read_minutes: 4
sources:
  - "OBS/Processed/S18_2026-11-03_1115/transcript/S18.md (his 16-minute walkthrough, 3 Nov 11:15 to 11:31, the main source)"
  - "website/content/demos/getsales-36-workflows.md (the earlier entry: the facts of the build)"
  - "getsales/STATUS.md and getsales/icps/grid.md (the four ICPs, languages, tactics; all 36 created 17:27 to 17:34 on 2 Nov)"
  - "RULES.md (his typed line on conversion rate, 2 Nov 20:45)"
  - "CHARTER.md, the D3 row"
attempts: 2
attempt_used: 2
alex_markers: 0
fact_markers: 0
run_log: ".claude/skills/alex-voice/local/runs/2026-11-03-36-getsales-36-workflows/log.md (git-ignored)"
status: "voice pass, not published"
note: "The new body for website/content/demos/getsales-36-workflows.md, under the full S18 walkthrough. Dropped from the old body: the three-minute-video promise, the rules-then-Jev routing with its 0.75 threshold, the Rohlik case line and the fictional-lead table (none of it is in his S18 words; the table could come back under the still, see Gaps). Clips should avoid S18 01:38 to 02:13 and about 10:25 to 10:34, where he is keeping something off screen, unless blurred (DoD-22). Names none of the six and no leads."
---
It doesn't matter how many outbound sequences you have. **It matters who gets put into which one.**

For Addvery I built 36 of them in GetSales. Four ICPs (ideal customer profiles) taken from your own website, if it's accurate. Each one in English, Czech and German. Each language with three tactics. And 36 isn't the impressive part.

Before AI, this was my thing. It's what I did at the company you probably know me from, and it's how I got into AI in the first place: automations first, everything else after.

[media: graphic | a 4 x 3 x 3 grid: the four ICPs (retail loyalty, telco customer value, consumer lending, last-mile logistics) by English, Czech and German by signal, problem and proof, adding up to 36 workflows | puts the 36 in one picture before the article argues they're the easy part | make it with: Claude Design]

## Writing the sequences is the easy part

AI is terrible at outreach copy, and the reason is pretty logical. When everyone's blasting you with messages, the only thing that makes you read one is differentiation. AI can't do differentiation, because it's literally trained on convergence. The exact opposite.

I still write a lot of my sequences by hand. That's not the hard part, and a lot of them are reusable. These 36 sit in their own folder, apart from my own outbound, and a script created all of them in about seven minutes.

The ICPs are retail loyalty, telco customer value, consumer lending, and last-mile logistics. The tactics: signal (something just happened at their company), problem (a known pain, tied to one fact about them) and proof (an Addvery case that looks like them).

Every one of the 36 opens the same way. Message 1 is a single variable, `custom_message_1`, imported as a field of the lead CSV. The follow-ups are fixed text for that language and tactic. **The first message is always custom**, written for that one person before the list goes in. Nothing here is tooled to send, and none of the 36 has a lead in it yet.

[media: image | one workflow open in the GetSales builder, message 1 set to the single variable {{custom_message_1}} with the fixed follow-ups under it, cropped to the builder and screen-checked | shows the one variable before the article turns to where its words come from | make it with: screenshot]

## The first message comes from research nobody wants to do

The signal I watch most is someone switching jobs. Don't bother them in week one, they're busy. Go find their job advert instead. Job adverts almost always carry 90-day goals now: what we expect in month one, two, three, the first half of the year. You do not understand how much value is in those. **You get the roadmap of what that person is doing, and the timeline of when to reach out.** "We expect you to redesign this system at the six-month mark." If that lines up with what you sell, that's your opening.

And it costs nothing. Pull your key accounts straight from your CRM and have an agent collect their job adverts for the roles that matter. (Junior marketer? Probably not.)

Same with LinkedIn. I spent time on it every day for eight years, and I don't want to anymore. Now Claude in Chrome can take over the browser and scroll a Sales Navigator feed daily, looking for specific things. With your long buying cycles, paying thousands for buy-signal data can make sense. For most companies, those triggers are now available from Claude.

That research tells you what to say. It doesn't tell you which of the 36 someone belongs in.

[media: video clip | me on position switches, job adverts and their 90-day goals, and timing the first message to them; S18 from about 05:29 to 07:00, ending before the spoken sample message (it closes on a coffee line) | the research idea in my own voice, right before the article hands over to who goes where | make it with: S18 clip]

## Who goes where is a classification problem

This is the part I care about most. Jev is one of the coolest tools to come out in AI, and no one's heard of it, because it's not an LLM. It's a classification model: it doesn't write anything, it gives you likelihoods. It does fine out of the box, you can train it over time, and it plugs straight into Claude. Give it a profile plus everything you know about their company, and it answers narrow questions. Is this a good person to reach out to? Which ICP?

It doesn't have to stop at ICP, either. Anyone who's really good at sales mirrors people: if they're informal, you're informal. There's this dance, right? You can read a lot of it from their posts, or from any interview they're in, even in a language you don't speak. Then you judge which sequence fits their personality. This is where the fun happens.

[media: video clip | me explaining Jev: not an LLM, a classification model that gives likelihoods instead of text, routing by ICP, then language and personality, up to "this is where the fun happens"; S18 from about 10:34 to 12:10 | the mechanism in one take, before the article turns to keeping it sharp | make it with: S18 clip]

## Building is a phase, not the deliverable

Say you've got 120 sequences. You ask Jev which one should get the best results for each person on your list, then you watch. I expected this one to win, it's getting bad results, so tweak how Jev decides. Or kill the sequence that's always worse than the others.

**Nothing in AI is a one-time setup where you press play.** Refining is the main work: looking at the data, constantly asking whether the approach is working and what to switch. That's a systems management job, not a type-things-into-Claude-Code job. (Although you do have to be pretty good at Claude Code to make it work.)

And honestly, I'm not there yet. It has to be so ICP-specific that nothing ready-made will ever fit a company out of the box. It gets custom built. (Here, Jev is only explained. Nothing's trained.)

[media: video clip | me on killing the sequence that's always worse and "nothing in AI is just one-time setup and press play" (S18 about 12:10 to 13:00), joined to "building is a phase, refining is the main work" (about 15:05 to 15:30) if the cut allows | lands the refining point in my words before the closing line on conversion | make it with: S18 clip]

## Every account, not only the key ones

Personalization and volume aren't an either-or anymore, and the personalization can be off the charts.

The reaction I'm after is "I can't believe you put in all this effort just to pitch me." Now imagine everyone in your CRM feeling that way. Then imagine your conversion rate.

## Gaps

- **No numbers from my own outbound record** (reply rate, meetings, pipeline) at the company "you probably know me from", which also stays unnamed. Would go in the third opening paragraph.
- **The conversion line has no figure behind it.** Nothing has run through these 36, so there's no result yet. Would go in the last section.
- **Who wrote the copy inside the 36.** A script built them, and the copy was drafted during the build; the Czech and German copy never had a native read. Would go after "a script created all of them in about seven minutes".
- **No filled-in first message in the text.** The old entry had two fictional leads' `custom_message_1` rows, which website could keep under the still. Whether to show a first message written for any of the six is his call. Would go after "The first message is always custom".
- **What follows message 1.** The build notes say two fixed follow-ups per workflow, and the charter still asks what a second custom message would be. Would go in "Writing the sequences is the easy part".
- **Jev has no cost, training-data or accuracy figures,** and he doesn't say who makes it on camera (the old entry says TypeSafe). Would go in "Who goes where is a classification problem".
- **No real example of a sequence killed or Jev re-tuned** from results, because nothing has run. Would go in "Building is a phase, not the deliverable".

## Media slots

| Slot | Kind | What it shows | Make it with |
| --- | --- | --- | --- |
| 1, after the opening | graphic | 4 ICPs x English, Czech, German x signal, problem, proof = 36 workflows | Claude Design |
| 2, end of "Writing the sequences is the easy part" | image | one workflow in the GetSales builder, message 1 = {{custom_message_1}}, fixed follow-ups below, screen-checked | screenshot |
| 3, end of "The first message comes from research nobody wants to do" | video clip | job adverts, 90-day goals and timing the first message (about 05:29 to 07:00, before the sample message) | S18 clip |
| 4, end of "Who goes where is a classification problem" | video clip | Jev: likelihoods not text, ICP, language and personality (about 10:34 to 12:10) | S18 clip |
| 5, end of "Building is a phase, not the deliverable" | video clip | kill the worse sequence, no one-time setup (about 12:10 to 13:00), plus "building is a phase" (about 15:05 to 15:30) | S18 clip |
