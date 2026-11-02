---
title: "36 outbound workflows and the one variable behind them"
slug: "36-outbound-workflows-and-the-one-variable-behind-them"
description: "Me on camera at 16:36, planning 36 GetSales workflows for Addvery, then what got built: four ICPs, three languages, three tactics and one lead field."
author: "Alex Alderman"
date: "2026-11-02"
status: "draft"
kind: "showcase"
deliverable: "d3"
library_id: "demo-getsales-36-workflows"
group: "How I'd reach your accounts"
video:
  youtube_id: "9vLcPuSVmLo"
  start: 0
cover:
  kicker: "How I'd reach your accounts"
  subtitle: "Four ICPs, three languages, three tactics, and one personal first message per lead."
  accent: "one variable"
tags: ["outbound", "getsales", "classification"]
reading_minutes: 4
---
<!-- W5 (website, 2 Nov): placed from getsales/site/demo-1.md as is (words: Claude Doc e50390db). Front matter added for the new site: library_id, group, the fallback video on top (clip-c-s10-36-workflows). K4 brings the rest (VERDICT.md 2.3). Status stays draft: previews only. -->
<!-- Video slot: when s-d9-legibility sends CLIPPED S-D3-C1, set kind to "video", add video (youtube_id, start) after deliverable, and rewrite this summary against the transcript. Words: Claude Doc e50390db (GetSales demo entries). Figures: getsales/site/assets/36-outbound-workflows-and-the-one-variable-behind-them/. message-1-variable.png is a placeholder: replace it with a still from the recording (the builder at about 1:40), cropped to the title bar and node #6, screen-checked. -->

Outbound at Addvery's size isn't one campaign. It's buyer types times languages times angles, and every lead has to land in exactly one of them.

The video is me at 16:36 on build day, planning it out loud: four main ICPs, three languages, three tactics, so 36 workflows, in a different folder that's not going to be confused with mine. Fifty minutes later a script built all 36 in seven minutes. Below is what got built, how a lead finds its one workflow, and the field that makes each first message personal. Nothing here sends.

> [!summary]
> - Rules sort most leads for free; a decision model answers only what rules can't settle.
> - 36 workflows cover four Addvery ICPs in Czech, German and English, with three tactics each.
> - Message 1 of every workflow is one variable, written for each lead before import.
> - No workflow has a lead, none is started, and nothing sends.

## Rules first, then a decision model

Most of the sorting is rules: industry, headcount, country and profile language. They're free, exact, and anyone can audit them.

> [!diagram] flow
> How one lead finds its workflow
> 1. Rules: industry, headcount, country and profile language settle most leads
> 2. Jev: one narrow question when a rule can't decide
> 3. A person: decides below 0.75, or when two answers are close
> 4. One workflow: the lead lands in exactly one of the 36

What rules can't settle goes to a decision model. Jev, from TypeSafe, answers narrow typed questions, such as "which of these four ICPs, or none?", with a probability for each answer, and it writes no text.

Below 0.75, or when two answers are too close to call, a person decides. Those decisions become the labels that tune it. Nothing is trained in this demo.

## 36 workflows in one folder

The workflows sit in their own GetSales folder. The four ICPs come from Addvery's own website: retail loyalty, telco customer value, consumer lending and last-mile logistics. Each runs in Czech, German and English, and Slovak leads get Czech.

> [!figure] /demos-assets/36-outbound-workflows-and-the-one-variable-behind-them/workflows-folder.png
> Six of the 36 workflows in the GetSales demo folder, named Demo, ICP, language and tactic, each switched off with 0 contacts
> Every toggle off and every count at 0: none of the 36 is running

Each ICP has three tactics. Signal: something just happened at their company. Problem: a known pain, tied to one fact about them. Proof: an Addvery case that looks like them.

None of the 36 has a lead, and none is started. It's the build, ready to receive leads.

## One variable carries the personal part

Every workflow opens the same way: message 1 is `{{custom_message_1}}` and nothing else. The follow-ups are fixed text for that language and tactic.

> [!figure] /demos-assets/36-outbound-workflows-and-the-one-variable-behind-them/message-1-variable.png
> The workflow Demo · Retail loyalty · EN · proof in the GetSales builder, its first message set to the single variable custom_message_1
> Message 1 is one lead field; everything after it is fixed text

The English retail loyalty proof workflow tells the Rohlík Group story as Addvery's site states it: four countries on one CRM model, +17% revenue per customer. Any reply stops the sequence, and there are no automatic likes.

## Where the variable comes from

The first message is written before import, one lead at a time, from the routing decision and the enriched fields. The client's own Claude, or another agentic LLM, writes it into the CRM through MCP or into a CSV column. A person reviews a sample before every import.

> [!figure] /demos-assets/36-outbound-workflows-and-the-one-variable-behind-them/custom-field.png
> The GetSales custom contact field custom_message_1, with a contacts count of 0
> Filled per lead before import by the client's own LLM, then a person checks a sample

The leads are fictional, the same twelve I sort in [the routing run](/demos/sorting-twelve-leads-into-36-workflows-rules-first-then-jev), with one public fact each and nothing private. Two of them, as the CSV carries them:

| Lead (fictional) | Workflow | custom_message_1 |
| --- | --- | --- |
| Coho Last Mile | Demo · Last-mile logistics · EN · signal | Hi Dana, Coho Last Mile announced its move into Hungary in October. In a new market you start with no network, systems or brand, and what gets decided in the first months shapes the cost per parcel for years. How far along is the last-mile plan there? |
| Tailspin Parcel CZ | Demo · Last-mile logistics · CS · problem | Dobrý den, firma Tailspin Parcel CZ doručuje většinu zásilek až ke dveřím a doručení domů funguje, jen když je někdo doma. Opakované pokusy o doručení pak ukrajují z marže každé trasy. Řešíte teď úspěšnost prvního doručení, nebo to máte pod kontrolou? |

Each row can be checked before it goes anywhere. In this demo it goes nowhere: nothing is imported or sent.
