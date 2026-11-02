# Routing: how each lead gets into the right workflow

Status: complete except one point. Alex calls the router "Jev"; this page says "the router" until that's confirmed. [What Jev is: pending Alex's answer]

Alex's model (2 Nov): the router "can be trained to put people into one of those workflows and each of those workflows will start with that custom message, which would be calculated after leads get exported. It depends on what stack they have. That custom message we created through their Claude or agentic LLM account, probably in a CSV if the tooling exists through MCP to their CRM ... those custom messages would be written before they get imported into GetSales."

## The path of one lead

```
Sales Navigator search ─► CSV export ─► enrichment ─► the router ─► custom message 1 ─► import into one workflow
                                                         │
                                       ICP? language? approach?
                                                         │
                                                         └─► no fit: logged, no workflow
```

1. **Sales Navigator → CSV.** A saved search per ICP, exported to CSV.
2. **Enrichment.** Industry, employees, country, title, profile language, and any recent signal with its date (new role, hiring, funding, a launch).
3. **The router** makes three decisions, in order, and writes its reasons into the CSV.
4. **`custom message 1`.** Written for that lead in the chosen language and approach, before import.
5. **Import.** Into the one workflow named `D3 · <ICP> · <LANG> · <approach>`, with `custom_message_1` as a lead field. Codes: CS Czech, SK Slovak, DE German, EN English.

## The three decisions

Rules decide first: free, exact and auditable. An LLM handles only what they can't.

**1. ICP**, from industry, size and country. All four sell to consumers in Central and Eastern Europe or German-speaking Europe:
- **Retail loyalty:** groceries, drugstores, online retail; 1,000+ employees.
- **Telco CVM:** telecoms, pay-TV, streaming; 500+.
- **Consumer lending:** consumer lenders, retail banks; 300+.
- **Last-mile logistics:** parcel, courier, lockers; 200+.

A lead that clearly matches none is no fit.

**2. Language**, from country and profile language. Czechia gives CS, Slovakia SK, Austria, Germany and Switzerland DE, anywhere else EN. A profile written in English overrides to EN. If the ICP has no row in that language (`..\icps\grid.md`), a Slovak lead gets CS and everyone else EN.

**3. Approach**, first match wins:
- **signal** if enrichment found a dated trigger in the last 90 days;
- **proof** if Addvery has a close look-alike case in that ICP, from a short list of case types per ICP ("multi-country online grocer", "streaming platform launch");
- otherwise **problem**.

**The LLM step.** It decides only what a rule can't: a vague industry label ("Entertainment Providers" for a streaming service), a missing field, a post that might be a trigger, a case that might be a look-alike. It's given a paragraph on each ICP and approach and a few labelled example leads per ICP, no-fit ones included. It returns the same decisions with a reason and a confidence; below the threshold, a person decides.

## No fit

No workflow and no message. The lead is logged with its reason, such as "B2B software, 120 employees". The log shows which Sales Navigator search is too wide.

## How the router is trained

- **Rules first:** the rules above, in one file anyone can read.
- **An LLM for the rest:** the descriptions and labelled examples.
- **A feedback loop:** replies and meetings per workflow show which cells work. A misrouted lead (a reply like "we don't run a loyalty programme") is relabelled and becomes a new example. When the LLM keeps making the same call, it becomes a rule.

## Where `custom message 1` is written

By the client's own Claude or other agentic LLM, from the enriched fields and the router's decision: through MCP into their CRM if their stack has it, or as a column in the CSV that gets imported. Two guardrails:

- **One researched line, no private data.** Each message rests on one public fact about the lead or their company, such as a job post or a launch. Nothing private or personal.
- **A human reviews a sample before each import.** If it fails, nothing is imported until the prompt or rule is fixed.

## The GetSales-native alternative

GetSales' own "AI condition rules" node can route inside one flow instead. It costs 1 to 3 credits per contact, and its decision isn't visible before import. Routing before import keeps the decision, its reasons and the message in one reviewable CSV, and rule-decided leads cost nothing to route. The native node suits a team without its own LLM or CRM stack.

## Shown on a fictional sample

`sample.csv`: twelve fictional leads, routed offline on 2 Nov 2026: all four ICPs, languages and approaches, two LLM decisions and one no fit, each with its reasons. No real people or companies; nothing imported into GetSales.
