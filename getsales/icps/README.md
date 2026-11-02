# The ICP demo: grid structure

Addvery's top ICPs × the languages that fit their markets × 3 approaches, as one GetSales workflow per cell, all in the same new GetSales folder as the alert, which Alex can hide. Alex's model (his words, 2 Nov): "We'll take each of their ICPs and do it in whatever languages make sense. We'll have 3 different approaches per language ... each of those workflows will start with that custom message".

Status: skeleton. The ICPs and languages wait for Alex's Addvery research (fallback at 16:30: a few pages of Addvery's public website, read only, then a labelled guess). Copy rules wait for the research findings on the computed first message and GetSales mechanics (due about 16:30).

## The grid

| | Language 1 | Language 2 | Language 3 |
| --- | --- | --- | --- |
| ICP 1 | signal · problem · proof | signal · problem · proof | signal · problem · proof |
| ICP 2 | … | … | … |
| ICP n | … | … | … |

Workflows = ICPs × languages × 3. Four ICPs in three languages make 36. A cell is left out only where an ICP doesn't buy in that language, and the grid says so.

Naming, so the folder sorts itself: `Demo · <ICP short name> · <LANG> · <approach>`, for example `Demo · Mid-market SaaS · EN · signal`.

## The three approaches

Each approach decides how `custom message 1` is written for a lead before import, and what the follow-ups say.

| Approach | `custom message 1` opens with | Follow-ups | Fits when |
| --- | --- | --- | --- |
| **Signal-led** | Something that just happened to the lead or their company: a new role, a hire, funding, a launch, a post | Why that moment matters for the ICP's problem; one proof point; a light ask | The enrichment found a dated trigger in the last 90 days |
| **Problem-led** | A problem this ICP typically has, in the lead's own terms, tied to one fact about their company | How peers solve it; what Addvery does differently; a light ask | No fresh trigger, but the ICP's pain is well known |
| **Proof-led** | A result Addvery got for a company like theirs | The short story of that result; what it would look like for them; a light ask | A close look-alike customer or case exists |

## Every workflow

- Message 1 is only the variable: `{{custom_message_1}}`, imported as a lead field.
- Then two follow-ups in that language and approach, written from the ICP's research.
- The same connection pre-check as the alert: already connected → message 1 at once; otherwise a connection request, then message 1 on acceptance.
- No leads, never started. They exist to show the build, not to send.

## Files (to come)

- `grid.md`: the ICPs, languages and the reason for each, from Alex's research.
- `<icp-slug>.md`: per ICP, each language × approach's message 1 brief and follow-ups.
- `workflows.json`: every workflow's name, graph and copy, ready for GetSales.
