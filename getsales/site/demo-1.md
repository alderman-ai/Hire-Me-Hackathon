---
title: "36 outbound workflows and the one variable behind them"
slug: "36-outbound-workflows-and-the-one-variable-behind-them"
description: "A three-minute walkthrough: how rules and a decision model sort leads, 36 GetSales workflows built on Addvery's ICPs, and the one field that personalises them."
author: "Alex Alderman"
date: "2026-11-02"
status: "draft"
kind: "showcase"
deliverable: "d3"
cover:
  kicker: "GetSales demo 1"
  subtitle: "Four ICPs, three languages, three tactics, and one personal first message per lead."
  accent: "one variable"
tags: ["outbound", "getsales", "classification"]
reading_minutes: 4
---
<!-- Video slot: when s-d9-legibility sends CLIPPED S-D3-C1, set kind to "video", add video (youtube_id, start) after deliverable, and rewrite this summary against the transcript. Words: Claude Doc e50390db (GetSales demo entries). Figures: getsales/site/assets/36-outbound-workflows-and-the-one-variable-behind-them/. -->

Outbound at Addvery's size isn't one campaign. It's buyer types times languages times angles, and every lead has to land in exactly one of them.

In three minutes I show how leads get sorted, the 36 GetSales workflows they land in, and the one field that makes each first message personal. Nothing here sends.

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
> Ten of the 36 workflows in the GetSales demo folder, each named Demo, ICP, language and tactic, every one switched off
> Every toggle is off: none of the 36 is running

Each ICP has three tactics. Signal: something just happened at their company. Problem: a known pain, tied to one fact about them. Proof: an Addvery case that looks like them.

None of the 36 has a lead, and none is started. It's the build, ready to receive leads.

## One variable carries the personal part

Every workflow opens the same way: message 1 is `{{custom_message_1}}` and nothing else. The follow-ups are fixed text for that language and tactic.

> [!figure] /demos-assets/36-outbound-workflows-and-the-one-variable-behind-them/message-1-variable.png
> The workflow Demo · Retail loyalty · EN · proof in the GetSales builder, its first message set to the single variable custom_message_1
> Message 1 is one lead field; everything after it is fixed text

The one I open on camera tells the Rohlík Group story as Addvery's site states it: four countries on one CRM model, +17% revenue per customer. Any reply stops the sequence, and there are no automatic likes.

## Where the variable comes from

The first message is written before import, one lead at a time, from the routing decision and the enriched fields. The client's own Claude, or another agentic LLM, writes it into the CRM through MCP or into a CSV column. A person reviews a sample before every import.

> [!figure] /demos-assets/36-outbound-workflows-and-the-one-variable-behind-them/custom-field.png
> The GetSales custom contact field custom_message_1, with a contacts count of 0
> Filled per lead before import by the client's own LLM, then a person checks a sample

The leads in the video are fictional, with one public fact each and nothing private. Two of them, as the CSV carries them:

| Lead (fictional) | Workflow | custom_message_1 |
| --- | --- | --- |
| Coho Last Mile | Demo · Last-mile logistics · EN · signal | Hi Dana, Coho Last Mile announced its move into Hungary in October. In a new market you start with no network, systems or brand, and what gets decided in the first months shapes the cost per parcel for years. How far along is the last-mile plan there? |
| Tailspin Parcel CZ | Demo · Last-mile logistics · CS · problem | Dobrý den, firma Tailspin Parcel CZ doručuje většinu zásilek až ke dveřím a doručení domů funguje, jen když je někdo doma. Opakované pokusy o doručení pak ukrajují z marže každé trasy. Řešíte teď úspěšnost prvního doručení, nebo to máte pod kontrolou? |

Each row can be checked before it goes anywhere. In this demo it goes nowhere: nothing is imported or sent.
