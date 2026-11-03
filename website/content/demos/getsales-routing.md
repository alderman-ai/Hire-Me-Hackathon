---
title: "Who gets which message: rules first, a model for the rest"
slug: "sorting-twelve-leads-into-36-workflows-rules-first-then-jev"
description: "How I make sure every lead gets the right outreach, in the right language, before anyone writes to them: plain rules do most of the sorting, a model handles the rest, and every decision shows its reason."
author: "Alex Alderman"
date: "2026-11-02"
status: "published"
kind: "showcase"
deliverable: "d3"
library_id: "demo-getsales-routing"
group: "How I'd reach your accounts"
poster: "/demos-assets/sorting-twelve-leads-into-36-workflows-rules-first-then-jev/router-run-1.png"
cover:
  kicker: "How I'd reach your accounts"
  subtitle: "Every lead lands in exactly one workflow, and every decision shows what settled it."
  accent: "rules first"
tags: ["outbound", "classification"]
reading_minutes: 4
---
A lead comes out of a LinkedIn search with "Entertainment Providers" in the industry column. Read the company description and it's a paid streaming service selling subscriptions online. That's exactly who your Oneplay story was written for. A rule matching on industry would never send it there.

Across a whole list, every wrong guess sends a good message to the wrong person.

**That's the skill: I sort every lead into the right customer type, language and approach before anyone writes to it, and every decision says why.** Plain rules do most of the work. For the rest I use Jev, a classification model from TypeSafe: it doesn't write, it picks from a short list of answers and tells you how sure it is.

## Rules settled 25 of 34 decisions

For Addvery I built [36 outreach sequences](/demos/36-outbound-workflows-and-the-one-variable-behind-them): the four customer types on your website, each in English, Czech and German, each with three openings. Something that just happened at their company, a known pain, or one of your case stories that looks like them.

Then I ran twelve fictional leads through the sorter, printing every decision with what settled it. 4 leads were placed by rules alone, 7 needed the model at least once, and 1 fit nothing. Of the 34 decisions, rules settled 25.

> [!figure] /demos-assets/sorting-twelve-leads-into-36-workflows-rules-first-then-jev/router-run-1.png
> Screen output, part 1: four fictional leads, each decision tagged rule or Jev, each lead ending on its sequence
> Part 1 of 3: violet means a rule decided, amber means a question for the model

> [!figure] /demos-assets/sorting-twelve-leads-into-36-workflows-rules-first-then-jev/router-run-2.png
> Screen output, part 2: four more fictional leads, each decision tagged rule or Jev, each lead ending on its sequence
> Part 2 of 3: the Slovak lender here is one of the two hard cases further down

> [!figure] /demos-assets/sorting-twelve-leads-into-36-workflows-rules-first-then-jev/router-run-3.png
> Screen output, part 3: the last four fictional leads, each decision tagged rule or Jev, then the one-line summary
> Part 3 of 3: the software company fits no customer type and is logged with its reason; nothing is imported or sent

## Rules go first because they're free

The customer type comes from industry and company size: a grocery chain with 4,200 staff goes under retail loyalty, a software company with 120 fits nothing. The language comes from country and the language of their LinkedIn profile: Slovakia gets Czech, Austria gets German, and a profile written in English overrides both. And news under 90 days old means the message opens on it: a job post from 27 days ago counts, an app relaunch from 263 days ago doesn't.

**Rules cost nothing, they're exact, and anyone on your team can read why a lead went where it did.**

## The model gets one narrow question at a time

"Financial Services" says too little for a rule. So the model reads the company's public description, names stripped out first, and answers one question: which of your four customer types is this, none of them, or can't tell?

**An answer only counts if the model is at least 75% sure and 25 points ahead of its second choice.** Otherwise a person decides. The same kind of question picks the opening. A streaming service looks like your Oneplay case. A domestic courier looks like none of your stories yet, so its message opens on a known pain instead.

> [!figure] /demos-assets/sorting-twelve-leads-into-36-workflows-rules-first-then-jev/router-hard-cases.png
> Screen output for a Slovak lender and a Czech streaming service, whose industry labels are too broad for a rule: each shows the question the model gets and the answer a person labelled
> The two hard cases, where no rule can decide the customer type

Honest caveat: the model isn't called in this run. The hard cases show answers a person labelled, and nothing was imported or sent. That's how this starts for real anyway, right? Your labels are what tune the questions.

## A lead that fits nothing is an answer too

The software company gets logged with its reason, "B2B software, 120 employees", and nobody writes to it. That log tells you which LinkedIn search was too wide.

After that, replies and meetings show which sequences work. A lead in the wrong one (a reply like "we don't run a loyalty programme") gets relabelled by a person and becomes a new example. When the model keeps making the same call, it becomes a rule.

## Then I ran the same model on your team

This part is real. Mid-afternoon on the day I built this, I stopped counting your people on LinkedIn by hand and handed it over: classify everyone at Addvery, and tell me who sends outreach. I wanted to see if I could rebuild your sales team from public data. (Maybe that's over-engineering.)

It read all 57 people who list Addvery on LinkedIn: public profiles and posts, no login. For 55 it was sure enough what they do. For the other 2, their job titles decided.

**Nobody at Addvery holds a sales, business development or revenue operations title, and the model rates 10 people as likely doing outreach anyway.** That fits the rest of what I found: your new business runs on leaders and consultants posting and speaking. A signal, not a fact. But it's the first thing I want to know about any account: who actually sells? The charts are on [my research on Addvery](/d2), counts only, no names.

That's where sorting pays for a team like yours. Your leaders and consultants belong in the conversation, not working out whether "Financial Services" means a bank or a lender. They get a list where every lead already sits in the right sequence, with the reason next to it.

Reading 57 profiles and 50 posts cost the model $0.003. The next account is just a new list.
