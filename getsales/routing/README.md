# Routing: how each lead gets into the right workflow

Status: complete. Jev is TypeSafe's decision model: it answers narrow typed questions about a piece of text (yes or no, pick one, place on a scale) with a probability for each answer, and writes no text ([typesafe.ai](https://typesafe.ai), [TypeSafe docs](https://docs.typesafe.ai/introduction)); here it's the router.

Alex's model (2 Nov): Jev "can be trained to put people into one of those workflows and each of those workflows will start with that custom message, which would be calculated after leads get exported. It depends on what stack they have. That custom message we created through their Claude or agentic LLM account, probably in a CSV if the tooling exists through MCP to their CRM ... those custom messages would be written before they get imported into GetSales."

## The path of one lead

```
Sales Navigator search ─► CSV export ─► enrichment ─► rules + Jev ─► custom message 1 ─► import into one workflow
                                                           │
                                                ICP? language? tactic?
                                                           │
                                                           └─► no fit: logged, no workflow
```

1. **Sales Navigator → CSV.** A saved search per ICP, exported to CSV.
2. **Enrichment.** Industry, employees, country, title, profile language, and any recent signal with its date (new role, hiring, funding, a launch).
3. **Rules, then Jev,** make three decisions, in order; code writes the reason for each into the CSV.
4. **`custom message 1`.** Written for that lead in the chosen language and tactic, before import.
5. **Import.** Into the one workflow named `Demo · <ICP> · <LANG> · <tactic>`, with `custom_message_1` as a lead field. Codes: EN English, CS Czech, DE German.

## The three decisions

Rules decide first: free, exact and auditable. An LLM handles only what they can't.

**1. ICP**, from industry, size and country. All four sell to consumers in Central and Eastern Europe or German-speaking Europe:
- **Retail loyalty:** groceries, drugstores, online retail; 1,000+ employees.
- **Telco CVM:** telecoms, pay-TV, streaming; 500+.
- **Consumer lending:** consumer lenders, retail banks; 300+.
- **Last-mile logistics:** parcel, courier, lockers; 200+.

A lead that clearly matches none is no fit.

**2. Language**, from country and profile language. The workflows run in English, Czech and German only. Czechia and Slovakia give CS (Slovak readers get Czech), Austria, Germany and Switzerland DE, anywhere else EN. A profile written in English overrides to EN. All four ICPs run in all three languages, so every lead has a workflow in its language.

**3. Tactic** (tactic = approach: the ICP files and the sample call it "approach"), first match wins:
- **signal** if enrichment found a dated trigger in the last 90 days;
- **proof** if Addvery has a close look-alike case in that ICP, from a short list of case types per ICP ("multi-country online grocer", "streaming platform launch");
- otherwise **problem**.

**The LLM step.** It decides only what a rule can't: a vague industry label ("Entertainment Providers" for a streaming service), a missing field, a post that might be a trigger, a case that might be a look-alike. It's given a paragraph on each ICP and tactic and a few labelled example leads per ICP, no-fit ones included. It returns the same decisions, each with a probability; below the threshold, a person decides. This step is Jev's (next section).

## Jev as the router

Nothing here is built, run or trained. This is how Jev would be set up, following Alex's research on scoring leads in Sales Navigator and routing them to drip campaigns.

Jev is never asked "which workflow?": in that research, one routing question came out more confident than the facts it rested on. The rules above run first, in code. Jev answers only what they leave open, as narrow questions in one request per lead, with the questions in English, over company text with names and personal data stripped in code first.

- **ICP:** one pick-one question over the four ICPs plus "none of these" and "can't tell", each option given what it covers, what it doesn't, and the labelled examples. Headcount and country stay in code, because Jev is weak with numbers.
- **Language:** no Jev. Country and the language of the lead's own writing are code; text under about 40 characters counts as unknown.
- **Tactic:** a yes/no on whether an event is a trigger, with its date checked in code, and a pick-one over that ICP's case types plus "none".

An answer counts only if its top option is at least 0.75, at least 0.25 ahead of the next and not "can't tell"; these are starting guesses. Otherwise a person decides. Jev returns probabilities, not reasons, so the reason in the CSV names the rule or question that settled it.

Jev writes nothing. The client's own LLM writes message 1 from the decision, and Jev can then check each draft with yes/no questions, such as whether it says anything the lead's fields don't support.

A person still checks every lead below the threshold, a sample of messages before each import, and the labels: Jev can't be fine-tuned, so those labels are what tune the rules and questions.

## No fit

No workflow and no message. The lead is logged with its reason, such as "B2B software, 120 employees". The log shows which Sales Navigator search is too wide.

## How the routing is tuned

- **Rules first:** the rules above, in one file anyone can read.
- **Jev for the rest:** the descriptions and labelled examples.
- **A feedback loop:** replies and meetings per workflow show which cells work. A misrouted lead (a reply like "we don't run a loyalty programme") is relabelled by a person and becomes a new example. When Jev keeps making the same call, it becomes a rule.

## Where `custom message 1` is written

By the client's own Claude or other agentic LLM, from the enriched fields and the routing decision: through MCP into their CRM if their stack has it, or as a column in the CSV that gets imported. Two guardrails:

- **One researched line, no private data.** Each message rests on one public fact about the lead or their company, such as a job post or a launch. Nothing private or personal.
- **A human reviews a sample before each import.** If it fails, nothing is imported until the prompt or rule is fixed.

## The GetSales-native alternative

GetSales' own "AI condition rules" node can route inside one flow instead. It costs 1 to 3 credits per contact, and its decision isn't visible before import. Routing before import keeps the decision, its reasons and the message in one reviewable CSV, and rule-decided leads cost nothing to route. The native node suits a team without its own LLM or CRM stack.

## Shown on a fictional sample

`sample.csv`: twelve fictional leads, routed offline on 2 Nov 2026: all four ICPs and tactics, two LLM decisions and one no fit, each with its reasons. No real people or companies; nothing imported into GetSales. Its two Slovak leads (L04, L06) go to the Czech workflows under the three-language rule.

`route.py` runs the rules on those twelve and prints each decision with what settled it: a rule, or the narrow question Jev would get. Jev isn't called in the demo, so its questions show the answer a person labelled. `python -I routingoute.py` from `getsales\`; it reproduces the sample 12 of 12.
