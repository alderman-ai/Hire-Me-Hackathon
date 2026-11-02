# Brief for the workflow copy (one writer per ICP)

The demo shows how Addvery could run its own outbound: one GetSales workflow per ICP × language × approach, in a hideable folder, with no leads and never started. These are **Addvery's** messages to **Addvery's** prospects, sent by an Addvery person (the sender). They are not Alex's messages.

## Read first

- `grid.md`: the ICPs, their languages, the workflow names.
- `README.md`: the three approaches and what each message does.
- `..\routing\README.md`: how a lead gets routed, and how `custom message 1` is written before import.
- Alex's git-ignored research, read only: `..\..\Addvery Research\addvery-website-research\02-industries-icps.md` (ICP problems in the buyer's words, roles, signals) and `03-case-studies.md` (results and exact proof lines). Copy no person's name from it. Client names and results may be used **only** as Addvery's own website states them, with the same qualifiers ("projected", "modelled", "identified"). Never cite the "John Doe" testimonial.

## Every workflow

| Step | When | Text |
| --- | --- | --- |
| Message 1 | 1 day after they accept, or at once if already connected | `{{custom_message_1}}`, computed per lead before import |
| Follow-up 1 | 3 days later | fixed text per cell, in its language and approach |
| Follow-up 2 | 3 days after that | fixed text per cell: the last touch, with an easy way out |

Any reply stops the sequence.

## What you write per cell

1. **Message 1 brief** (in English): the instruction the client's own LLM gets to write `custom message 1` for a lead routed to this cell. Say what the line must rest on (the signal, the problem, or the look-alike proof), what it must not do, and its length (2–3 sentences, under 400 characters).
2. **Message 1 example**: one example written to the brief, in the cell's language, for a fictional lead at a made-up company (e.g. "Northwind Grocery"). Never a real person or company.
3. **Follow-up 1** and **Follow-up 2**: the fixed texts, in the cell's language.

## Rules for the copy

- **Variables:** only `{{first_name}}`, `{{company_name}}` and `{{sender_first_name}}`, written exactly like that. No other variables, no single braces, no spintax.
- **Length:** each follow-up 250–550 characters. Plain text, no links, no emoji, no exclamation marks.
- **Voice:** Addvery's, "Fresh, focused & fearless": direct, plain, a little bold, never corporate. Short sentences. Peer to peer.
- **Each approach must read differently**, not as one template with words swapped:
  - signal-led: why that moment matters for their problem, then one proof point, then a light ask;
  - problem-led: how peers handle it, what Addvery does differently, then a light ask;
  - proof-led: the short story of a result for a look-alike company, what it could mean for them, then a light ask.
- **Light ask:** a 20-minute conversation, or "worth a look?", never "book a call" or a calendar link. Follow-up 2 always gives them an easy no ("if it's not a priority, just say so and I'll stop").
- **Languages:** native-sounding Czech, Slovak, German or English. Formal address in Czech, Slovak and German (vykání, vykanie, Sie). Avoid gendered first-person past-tense verbs in Czech and Slovak where you can, since the sender's gender isn't known. Mark the file "needs a native read" at the top.
- **Honesty:** no invented numbers, clients or promises. Proof only as Addvery's site states it.
- No internal project codes in the text, except the workflow names, which start `Demo ·`.

## Output

Two files per ICP, in `icps\`:
- `<slug>.md`: readable, one section per language, one subsection per approach, headed with the workflow name.
- `<slug>.json`: a list of objects `{workflow, icp, language, approach, msg1_brief, msg1_example, followup_1, followup_2}`, one per cell.

Slugs: `retail-loyalty`, `telco-cvm`, `consumer-lending`, `last-mile-logistics`.

Check before you finish: every cell in `grid.md` for your ICP is present once; every follow-up is 250–550 characters; no braces except the three allowed variables; the JSON parses.
