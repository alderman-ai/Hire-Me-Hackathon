---
title: "36 sequences, and who goes into which one"
slug: "36-outbound-workflows-and-the-one-variable-behind-them"
description: "It doesn't matter how many outbound sequences you have. It matters who gets put into which one: 36 GetSales workflows and a custom first message for every lead."
author: "Alex Alderman"
date: "2026-11-02"
status: "published"
kind: "showcase"
library_id: "demo-getsales-36-workflows"
group: "How I'd reach your accounts"
video:
  youtube_id: "_vgNB5ubKjA"
  start: 0
cover:
  kicker: "How I'd reach your accounts"
  subtitle: "36 GetSales workflows for Addvery, and a custom first message for every lead."
tags: ["outbound", "getsales", "classification"]
reading_minutes: 4
---
It doesn't matter how many outbound sequences you have. **It matters who gets put into which one.**

For Addvery I built 36 of them in GetSales. Four ICPs (ideal customer profiles) taken from your own website, if it's accurate. Each one in English, Czech and German. Each language with three tactics. And 36 isn't the impressive part.

Before AI, this was my thing. It's what I did at the company you probably know me from, and it's how I got into AI in the first place: automations first, everything else after.

> [!figure] /demos-assets/36-outbound-workflows-and-the-one-variable-behind-them/36-grid.png
> A 4 x 3 x 3 grid: four ICPs by English, Czech and German by signal, problem and proof, adding up to 36 workflows

## Writing the sequences is the easy part

AI is terrible at outreach copy, and the reason is pretty logical. When everyone's blasting you with messages, the only thing that makes you read one is differentiation. AI can't do differentiation, because it's literally trained on convergence. The exact opposite.

I still write a lot of my sequences by hand. That's not the hard part, and a lot of them are reusable. These 36 sit in their own folder, apart from my own outbound, and a script created all of them in about seven minutes.

The ICPs are retail loyalty, telco customer value, consumer lending, and last-mile logistics. The tactics: signal (something just happened at their company), problem (a known pain, tied to one fact about them) and proof (an Addvery case that looks like them).

Every one of the 36 opens the same way. Message 1 is a single variable, `custom_message_1`, imported as a field of the lead CSV. The follow-ups are fixed text for that language and tactic. **The first message is always custom**, written for that one person before the list goes in. Nothing here is tooled to send, and none of the 36 has a lead in it yet.

> [!figure] /demos-assets/36-outbound-workflows-and-the-one-variable-behind-them/workflow-message-1.png
> One workflow open in the GetSales builder, message 1 set to the single variable {{custom_message_1}} with the fixed follow-ups under it

| Lead (fictional) | Workflow | custom_message_1 |
| --- | --- | --- |
| Coho Last Mile | Demo · Last-mile logistics · EN · signal | Hi Dana, Coho Last Mile announced its move into Hungary in October. In a new market you start with no network, systems or brand, and what gets decided in the first months shapes the cost per parcel for years. How far along is the last-mile plan there? |
| Tailspin Parcel CZ | Demo · Last-mile logistics · CS · problem | Dobrý den, firma Tailspin Parcel CZ doručuje většinu zásilek až ke dveřím a doručení domů funguje, jen když je někdo doma. Opakované pokusy o doručení pak ukrajují z marže každé trasy. Řešíte teď úspěšnost prvního doručení, nebo to máte pod kontrolou? |

## The first message comes from research nobody wants to do

The signal I watch most is someone switching jobs. Don't bother them in week one, they're busy. Go find their job advert instead. Job adverts almost always carry 90-day goals now: what we expect in month one, two, three, the first half of the year. You do not understand how much value is in those. **You get the roadmap of what that person is doing, and the timeline of when to reach out.** "We expect you to redesign this system at the six-month mark." If that lines up with what you sell, that's your opening.

And it costs nothing. Pull your key accounts straight from your CRM and have an agent collect their job adverts for the roles that matter. (Junior marketer? Probably not.)

Same with LinkedIn. I spent time on it every day for eight years, and I don't want to anymore. Now Claude in Chrome can take over the browser and scroll a Sales Navigator feed daily, looking for specific things. With your long buying cycles, paying thousands for buy-signal data can make sense. For most companies, those triggers are now available from Claude.

That research tells you what to say. It doesn't tell you which of the 36 someone belongs in.

> [!video] V7VgtPe8BVk
> S18, 3 Nov

## Who goes where is a classification problem

This is the part I care about most. Jev is one of the coolest tools to come out in AI, and no one's heard of it, because it's not an LLM. It's a classification model: it doesn't write anything, it gives you likelihoods. It does fine out of the box, you can train it over time, and it plugs straight into Claude. Give it a profile plus everything you know about their company, and it answers narrow questions. Is this a good person to reach out to? Which ICP?

It doesn't have to stop at ICP, either. Anyone who's really good at sales mirrors people: if they're informal, you're informal. There's this dance, right? You can read a lot of it from their posts, or from any interview they're in, even in a language you don't speak. Then you judge which sequence fits their personality. This is where the fun happens.

> [!video] rDUsnHrAwv0
> S18, 3 Nov

## Building is a phase, not the deliverable

Say you've got 120 sequences. You ask Jev which one should get the best results for each person on your list, then you watch. I expected this one to win, it's getting bad results, so tweak how Jev decides. Or kill the sequence that's always worse than the others.

**Nothing in AI is a one-time setup where you press play.** Refining is the main work: looking at the data, constantly asking whether the approach is working and what to switch. That's a systems management job, not a type-things-into-Claude-Code job. (Although you do have to be pretty good at Claude Code to make it work.)

And honestly, I'm not there yet. It has to be so ICP-specific that nothing ready-made will ever fit a company out of the box. It gets custom built. (Here, Jev is only explained. Nothing's trained.)

> [!video] IEVscs4eg5c
> S18, 3 Nov

> [!video] kV7KD1-pRCE
> S18, 3 Nov

## Every account, not only the key ones

Personalization and volume aren't an either-or anymore, and the personalization can be off the charts.

The reaction I'm after is "I can't believe you put in all this effort just to pitch me." Now imagine everyone in your CRM feeling that way. Then imagine your conversion rate.
