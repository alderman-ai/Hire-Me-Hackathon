# The ICP grid (proposed)

Status: proposed at 15:45 from the read of Addvery's public website (Alex's go, 15:30). He approves the grid at the demo approval. The research itself is in Alex's research folder (git-ignored, out of courtesy to the client); this file holds only the grid.

Addvery sells CRM, customer-value, loyalty and data work to large B2C companies, mostly in Central and Eastern Europe and German-speaking Europe. The grid takes the four ICPs the site supports best, in the languages each market buys in.

| # | ICP | Languages | Workflows |
| --- | --- | --- | --- |
| 1 | **Multi-market grocery and e-commerce retailers with loyalty programmes** (CEE and DACH) | Czech · German · English | 9 |
| 2 | **Telco, pay-TV and streaming operators**: customer value management and digital sales | Czech · Slovak · English | 9 |
| 3 | **Consumer lenders and retail banks**: lead funnel to contract, credit decisioning | Czech · Slovak · English | 9 |
| 4 | **Parcel and last-mile logistics companies entering new markets** | Czech · English | 6 |
| | | **Total** | **33** |

Each language row runs the three approaches: signal-led, problem-led, proof-led (`README.md`).

**Why these languages.** Czech is the home market and the language of Addvery's own podcast and hiring. Slovak is where telco and lending run as separate local markets. German is where the retail proof already rolled out (Austria, Germany). English covers regional group headquarters and cross-border logistics leadership. Polish is left out: Addvery's site never mentions Poland.

**Left out, and why:**
- **Considered-purchase retail** (kitchens, furniture): one case only. It folds into ICP 1's German row if Alex wants it.
- **Large enterprises moving AI from pilot to production:** Addvery's current push (their own tool, podcast and hiring), but it has no case study yet. A strong fifth ICP if Alex wants the grid to point where Addvery is heading: Czech and English, 6 more workflows, 39 in total.

**Names in GetSales:** `D3 · <ICP> · <LANG> · <approach>`, for example `D3 · Retail loyalty · DE · proof`. ICP short names: `Retail loyalty`, `Telco CVM`, `Consumer lending`, `Last-mile logistics`. Language codes: CS, SK, DE, EN. The routing sample (`..`..\routing\sample.csv`) uses the same names.
