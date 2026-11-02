# Routing: how each lead gets into the right workflow

Status: skeleton. What "Jev" is waits for Alex's answer on the open intake for this demo. Until then the router is called "the router" here.

Alex's model (2 Nov): the router "can be trained to put people into one of those workflows and each of those workflows will start with that custom message, which would be calculated after leads get exported. It depends on what stack they have. That custom message we created through their Claude or agentic LLM account, probably in a CSV if the tooling exists through MCP to their CRM ... those custom messages would be written before they get imported into GetSales."

## The path of one lead

```
Sales Navigator search ─► CSV export ─► enrichment ─► the router ─► custom message 1 ─► import into one workflow
                                                         │
                                       ICP? language? approach?
```

1. **Sales Navigator → CSV.** A saved search per ICP, exported to CSV.
2. **Enrichment.** Company and person fields: industry, size, country, role, seniority, recent signals (new role, hiring, funding, posts).
3. **The router decides three things:**
   - **ICP:** which of Addvery's ICPs the lead's company fits, from industry, size and model. No fit → no workflow.
   - **Language:** from the lead's country and the language their profile is written in.
   - **Approach:** signal-led if enrichment found a dated trigger in the last 90 days; proof-led if a close look-alike customer exists; otherwise problem-led.
4. **`custom message 1`.** Written for that lead in the chosen language and approach, by the client's own Claude or other agentic LLM, before import.
5. **Import.** Into the one workflow named `D3 · <ICP> · <LANG> · <approach>`, with `custom_message_1` as a lead field.

## How the router is trained

- **Rules first:** firmographic fields that decide the ICP outright (size bands, industries) are plain rules: free, exact and auditable.
- **An LLM for the rest:** a short description per ICP and per approach, and a few labelled example leads for each, so it can handle the leads the rules can't decide.
- **A feedback loop:** replies and meetings per workflow show which cells work. Leads that were routed wrong get relabelled and added to the examples.
- **GetSales alternative:** GetSales' own "AI condition rules" node can route inside one flow. It costs 1 to 3 credits per contact, and the decision isn't visible before import. Routing before import keeps the decision and the message in one reviewable CSV.

## Shown on a fictional sample

`sample.csv` (to come): about twelve fictional leads, routed offline to show every ICP, language and approach at least once, with the reason for each decision. No real people, nothing imported into GetSales.
