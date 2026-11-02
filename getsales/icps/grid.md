# The ICP grid

Status: proposed at 15:45 from the read of Addvery's public website (Alex's go, 15:30); languages set by Alex at about 16:40 on 2 Nov: every ICP in Czech, German and English, Slovak dropped. No separate approval file: his words are the go to build. The research itself is in Alex's research folder (git-ignored, out of courtesy to the client); this file holds only the grid.

Addvery sells CRM, customer-value, loyalty and data work to large B2C companies, mostly in Central and Eastern Europe and German-speaking Europe. The grid takes the four ICPs the site supports best, each in Czech, German and English.

| # | ICP | Languages | Workflows |
| --- | --- | --- | --- |
| 1 | **Multi-market grocery and e-commerce retailers with loyalty programmes** (CEE and DACH) | Czech · German · English | 9 |
| 2 | **Telco, pay-TV and streaming operators**: customer value management and digital sales | Czech · German · English | 9 |
| 3 | **Consumer lenders and retail banks**: lead funnel to contract, credit decisioning | Czech · German · English | 9 |
| 4 | **Parcel and last-mile logistics companies entering new markets** | Czech · German · English | 9 |
| | | **Total** | **36** |

Each language row runs the three approaches: signal-led, problem-led, proof-led (`README.md`).

**Why these languages.** Czech is the home market and the language of Addvery's own podcast and hiring. German is for DACH: the retail proof already rolled out there (Austria, Germany), and it's where the larger players in the other three ICPs buy. English covers regional group headquarters and international leaders. Slovak leads get the Czech workflows: Slovak readers read Czech, so a separate Slovak row isn't needed. Polish is left out: Addvery's site never mentions Poland.

**Left out, and why:**
- **Considered-purchase retail** (kitchens, furniture): one case only. It folds into ICP 1's German row if Alex wants it.
- **Large enterprises moving AI from pilot to production:** Addvery's current push (their own tool, podcast and hiring), but it has no case study yet. A strong fifth ICP if Alex wants the grid to point where Addvery is heading: Czech, German and English, 9 more workflows, 45 in total.

**Names in GetSales:** `Demo · <ICP> · <LANG> · <approach>`, for example `Demo · Retail loyalty · DE · proof`. ICP short names: `Retail loyalty`, `Telco CVM`, `Consumer lending`, `Last-mile logistics`. Language codes: CS, DE, EN. The routing sample (`..\routing\sample.csv`) uses the same names.
