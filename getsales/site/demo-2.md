---
title: "Sorting twelve leads into 36 workflows: rules first, then Jev"
slug: "sorting-twelve-leads-into-36-workflows-rules-first-then-jev"
description: "A one-minute terminal run: twelve fictional leads sorted by ICP, language and tactic, with rules doing most of the work and narrow model questions for the rest."
author: "Alex Alderman"
date: "2026-11-02"
status: "draft"
kind: "showcase"
deliverable: "d3"
cover:
  kicker: "GetSales demo 2"
  subtitle: "Every lead lands in exactly one workflow, and every decision shows what settled it."
  accent: "rules first"
tags: ["outbound", "classification"]
reading_minutes: 3
---
<!-- Video slot: when s-d9-legibility sends CLIPPED S-D3-C2, set kind to "video", add video (youtube_id, start) after deliverable, and rewrite this summary against the transcript. Words: Claude Doc e50390db (GetSales demo entries). Figures: getsales/site/assets/sorting-twelve-leads-into-36-workflows-rules-first-then-jev/. -->

This is the classifying itself. One terminal run sorts twelve fictional, already enriched leads into the 36 GetSales workflows from the first demo, and prints what settled each decision.

It ends on one line: 12 leads, 4 placed by rules alone, 7 that needed a model's answer for at least one decision, 1 no fit.

> [!summary]
> - Each lead gets three decisions: its ICP, its language and its tactic.
> - Rules settle most of them, from industry, headcount, country, profile language and signal age.
> - Jev answers one narrow question when an industry label is too vague.
> - A lead that fits nothing is logged with its reason, and nothing is imported or sent.

## The input

Each lead has an industry, a headcount, a country, a job title, a profile language and its latest signal with a date. For a client, that's a Sales Navigator search per ICP, exported to CSV.

## Rules settle most of it

Three rules do most of the work, in this order:

- Industry and headcount give the ICP. Groceries with 4,200 staff is retail loyalty; software with 120 staff fits nothing.
- Country and profile language give the language. Slovakia reads Czech, Austria gets German, and an English profile overrides both.
- A signal under 90 days old makes the lead signal-led. A job post 27 days old counts; an app relaunch 263 days old doesn't.

> [!figure] /demos-assets/sorting-twelve-leads-into-36-workflows-rules-first-then-jev/router-run-1.png
> Terminal run, part 1: fictional leads L01 to L04, each decision tagged rule or Jev, ending on its workflow
> The full run, part 1 of 3: violet marks a rule, amber marks a question for Jev

> [!figure] /demos-assets/sorting-twelve-leads-into-36-workflows-rules-first-then-jev/router-run-2.png
> Terminal run, part 2: fictional leads L05 to L08, each decision tagged rule or Jev, ending on its workflow
> Part 2 of 3: L06 is one of the two hard cases, shown again below

> [!figure] /demos-assets/sorting-twelve-leads-into-36-workflows-rules-first-then-jev/router-run-3.png
> Terminal run, part 3: fictional leads L09 to L12, each decision tagged rule or Jev, ending on its workflow, then the summary
> Part 3 of 3: L12 fits no ICP and is logged with its reason; nothing is imported or sent

Rules are free, exact, and anyone can read why a lead went where it did.

## A narrow question for the rest

An industry label like "Financial Services" says too little. So Jev gets one question over the company's public description, with names stripped out first: which of these four does this company sell, none of them, or can't tell? It answers with a probability for each option.

An answer counts only at 0.75 or above and 0.25 ahead of the next; otherwise a person decides. The same kind of question picks proof or problem. A streaming service looks like Addvery's Oneplay case; a domestic courier looks like nothing yet.

> [!figure] /demos-assets/sorting-twelve-leads-into-36-workflows-rules-first-then-jev/router-hard-cases.png
> Terminal output for L06 and L11, whose industry labels are too broad for a rule: each shows its Jev question and the answer a person labelled
> The two hard cases, where a rule can't decide the ICP

Jev isn't called in this recording. The answers on screen are labels a person gave, and that's how a model like this starts: the labels are what tune it.

## No fit is an answer too

The software company is logged with its reason, and that log shows which search was too wide. Next, the client's LLM writes each lead's `custom_message_1`, a person checks a sample, and the CSV is imported. Nothing in this demo is imported or sent.
