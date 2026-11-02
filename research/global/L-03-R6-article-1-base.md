# L-03 R6 The research base for the first article

**Question (verbatim).** Alex's scope (OT-04): "One is about how there's no such thing as building something like an AI workflow as a product. It's always a managed service because the models always change. Add to it that every company is going to have to decide what level of AI skill they want their company to have. Do they want to be able to just use workflows other people build? Do they want to be able to maintain them themselves or to build them themselves? You can imagine a sliding scale that's vertical: at the bottom is the training and at the top is the external building. They're going to have to find out where on the slider they are because they're either going to need to get trained how to do it themselves or they're going to have to bring in someone external or hire someone external. Still they're going to need to compensate someone else for whatever they build with the training to actually use it."
List question: "What evidence, data and existing frameworks support or challenge this argument, and what are the strongest counterarguments?"

2 Nov 2026 · session s1-research subagent · item 6 of 9 on list L-03 · deep: no

Readers: S-D5 (the articles), S-D4 (the pipeline). Serves DoD-15.

This is the research base, not the article. It holds no copy, outline, headline or phrasing for the post: Alex dictates it, and copywriting waits for a copywriting skill (his OT-04 rule). Every option below is his call.

---

## Method

- Searched 2 Nov 2026, about 20 minutes, with WebSearch (about 30 queries) and WebFetch (about 12 pages).
- Primary pages opened and read: Anthropic's model-deprecations page, OpenAI's deprecations page, Anthropic's Opus 3 deprecation update and its September 2025 postmortem, a16z's forward-deployed-engineer essay, Sequoia's "Services: The New Software", Fortune's report on the MIT NANDA study, the Article 4 page on artificialintelligenceact.eu, and law-firm and KI-Campus notes on the Digital Omnibus.
- Taken from search snippets or secondary coverage only (marked where used): Gartner's predictions (gartner.com returned 403), McKinsey's taker/shaper/maker page (timed out), Microsoft's 2025 Work Trend Index figures, Menlo Ventures' 2024 baseline, S&P Global, Intercom Fin pricing, and salary data.
- Anything I worked out myself (date arithmetic, how the frameworks map onto each other) is marked **inference**.
- Source labels: **vendor's own docs** (a provider describing its own policy, which is primary and reliable for that fact), **vendor data** (a survey or report by someone who sells AI or AI services), **investor view** (a VC firm arguing a thesis it invests in), **analyst** and **academic**.

## Verdict

**Mostly backed on the first half, partly on the second.** The "models always change" premise is strongly backed by the providers' own documents. Every major provider retires models on a published schedule. Anthropic's API models from 2024–25 lasted about 12 to 22 months from snapshot to retirement (inference from the dates on its page). OpenAI and Anthropic also retire the APIs and tools around the models: OpenAI's own Agent Builder shuts down about 14 months after launch. Behaviour drifts even without a version change. Investors (Foundation Capital, Sequoia, a16z) now argue openly that AI is sold as services or with embedded engineers.

**Weakest point 1: "no such thing as a product".** That is too absolute. AI products exist and sell, priced per outcome or per seat (Intercom Fin, for example). In 2025, 76% of enterprise AI solutions were bought rather than built (Menlo Ventures, investor data). Those products don't show maintenance is unnecessary, though. They show the vendor absorbs it inside the subscription. The evidence supports "someone always has to maintain it" better than "it can't be a product".

**Weakest point 2: the slider.** Existing frameworks only partly match it. McKinsey's taker/shaper/maker and MIT CISR's four stages measure how much a company does itself, with in-house building at the top. Alex's slider puts training at the bottom and external building at the top, so it mixes two questions: what level of capability the company needs, and who supplies it. A sceptical reader will spot that. The training leg also rests on a rule that has just been softened: since 27 July 2026, the EU AI Act's Article 4 asks companies to "take measures to support" AI literacy, no longer to "ensure... a sufficient level". Finally, Alex's own business benefits from the conclusion, and readers will notice.

---

## 1. "Always a managed service": the evidence

### 1a. Models retire on a schedule (vendor's own docs)

| Provider | Stated policy | Examples, with dates |
| --- | --- | --- |
| Anthropic | "at least 60 days' notice before model retirement for publicly released models". Also: "Applications relying on Anthropic models may need occasional updates to keep working" and "Deprecated models are likely to be less reliable than active models." ([Anthropic deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations), read 2 Nov 2026) | Claude 3.5 Sonnet: notice 13 Aug 2025, retired 28 Oct 2025. Claude 3 Opus: notice 30 Jun 2025, retired 5 Jan 2026. Sonnet 4 and Opus 4: notice 14 Apr 2026, retired 15 Jun 2026. Sonnet 4.5: notice 30 Sep 2026, retires 30 Nov 2026. Every active model carries a "not sooner than" retirement date. |
| OpenAI | At least 6 months' notice for generally available models, at least 3 months for specialised variants, about 2 weeks for previews ([OpenAI deprecations](https://developers.openai.com/api/docs/deprecations), read 2 Nov 2026) | GPT-4.5-preview: announced 14 Apr 2025, shut down 14 Jul 2025. GPT-5, GPT-5 mini/nano/pro, o3 and o3-pro: announced 11 Jun 2026, shut down 11 Dec 2026. GPT-4o snapshots and GPT-4.1: announced 14 Oct 2026, shut down 14 Jan 2027. The page lists about 28 deprecation entries for 2025–26 alone (my count of its table). |
| Microsoft Azure OpenAI / Foundry | GA model versions available for a minimum of 12 months; at least 60 days' notice before retirement ([Azure model retirements](https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/model-lifecycle-retirement), via search snippet) | Its own schedule, separate from OpenAI's |
| Google (Gemini API, Vertex AI) | Vertex: retirement dates "may be extended but never moved earlier", and new usage is blocked one month before. Gemini API dates are "the earliest a model might be retired" ([Vertex model versions](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions), via search snippet) | Gemini 1.5 Flash-002 retired 24 Sep 2025. A developer replied on Google's forum: "It's too short. We hope at least 5 years" ([Google AI forum](https://discuss.ai.google.dev/t/gemini-1-5-flash-002-discontinuation-date-is-september-24-2025-its-too-short-we-hopt-at-least-5-years/47703)). Gemini 2.0 retired on Vertex 1 Jun 2026; Gemini 2.5 in October 2026 (secondary sources). |

**Inference, from Anthropic's table.** Measured from the snapshot date in each model ID to retirement: Claude 3 Opus lasted about 22 months, 3.5 Sonnet about 16, 3.7 Sonnet about 12, Sonnet 4 about 13, Opus 4.1 about 12, and Sonnet 4.5 about 14. A workflow built on one model today should plan a forced migration within roughly one to two years. The same model can also carry different dates on Bedrock or Google Cloud (Anthropic's page says so).

**Cost of keeping old models (vendor's own docs).** Anthropic says retirement is needed because of "the cost and complexity of maintaining public access", and that the cost "scales roughly linearly with each model we serve" ([Anthropic, Opus 3 deprecation update, 25 Feb 2026](https://anthropic.com/research/deprecation-updates-opus-3)). It preserves the weights, but preserved weights aren't served to a customer's workflow.

### 1b. The APIs and tools around the models retire too (vendor's own docs)

- **OpenAI Assistants API.** Deprecation notice sent 26 Aug 2025; shutdown 26 Aug 2026. Users had to move to the Responses and Conversations APIs ([OpenAI deprecations](https://developers.openai.com/api/docs/deprecations); [OpenAI forum](https://community.openai.com/t/assistants-api-beta-deprecation-august-26-2026-sunset/1354666)). Zapier-style tools had to respond: Make's community has a thread on how to replace Assistants ([Make community](https://community.make.com/t/depreciation-of-the-assistants-api-by-openai-how-to-replace-assistants/90619)).
- **OpenAI Agent Builder, Evals platform and reusable prompts.** Deprecation announced 3 Jun 2026; Evals read-only from 31 Oct 2026; all three shut down 30 Nov 2026. Users move to the Agents SDK, ChatGPT Workspace Agents, Promptfoo, or application code ([OpenAI deprecations](https://developers.openai.com/api/docs/deprecations)). Agent Builder launched at DevDay on 6 Oct 2025 ([TechCrunch, 6 Oct 2025](https://techcrunch.com/2025/10/06/openai-launches-agentkit-to-help-developers-build-and-ship-ai-agents)), so the provider's own no-code workflow builder lived about 14 months (inference). This is the sharpest single fact for the argument: even the platform meant to absorb change for the customer was retired.
- **Anthropic API parameters.** `temperature`, `top_p` and `top_k` are removed in API version `2026-10-21` and return a 400 error; on Claude 4.7 and later they're rejected at non-default values ([Anthropic deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations)). Workflows that tuned these settings have to be reworked.

### 1c. Behaviour changes, even without a retirement

- **Drift under the same model name.** GPT-4's accuracy at telling prime from composite numbers fell from 84% (March 2023) to 51% (June 2023), and both GPT-3.5 and GPT-4 made more formatting mistakes in code ([Chen, Zaharia, Zou, arXiv 2307.09009, July 2023](https://arxiv.org/abs/2307.09009v1); academic). Caveats: the study used the undated "gpt-4" name, not a pinned snapshot, and Arvind Narayanan argued it shows behaviour change rather than proven decline ([coverage](https://www.goodreads.com/author_blog_posts/23900641-study-claims-chatgpt-is-losing-capability-but-some-experts-aren-t-convi)).
- **A shipped regression.** OpenAI rolled out a GPT-4o update in ChatGPT on 25 Apr 2025 that made the model "noticeably more sycophantic", and began rolling it back on 28 Apr. Sycophancy wasn't explicitly flagged in its pre-launch evaluations ([OpenAI, "Expanding on what we missed with sycophancy", May 2025](https://openai.com/index/expanding-on-sycophancy/); [TechCrunch, 29 Apr 2025](https://techcrunch.com/2025/04/29/openai-explains-why-chatgpt-became-too-sycophantic)). This happened in the ChatGPT product, not the pinned API.
- **Infrastructure bugs change outputs.** From August to early September 2025, three bugs degraded Claude's responses. At the worst hour (31 Aug 2025), 16% of Sonnet 4 requests were affected. Anthropic wrote: "The evaluations we ran simply didn't capture the degradation users were reporting" and "We never reduce model quality due to demand, time of day, or server load" ([Anthropic postmortem, 17 Sep 2025](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues); vendor's own docs).
- **Upgrades break individual cases even when they're better overall.** Apple researchers call this "model update regression": answers that were right become wrong after an update ("negative flips"). Their method cut negative flips by up to 40% but didn't remove them ([MUSCLE, arXiv 2407.09435, July 2024](https://arxiv.org/pdf/2407.09435v2.pdf); academic, from Apple).
- **Prompts are brittle.** Formatting changes alone (with the same meaning) moved accuracy by up to 76 points for LLaMA-2-13B, and by up to 56 points for GPT-3.5. The spread wasn't removed by bigger models or instruction tuning ([Sclar et al., ICLR 2024, arXiv 2310.11324](https://arxiv.org/html/2310.11324v2); academic). **Inference:** a prompt tuned for one model isn't guaranteed to transfer to its successor, so it has to be re-tested.

### 1d. What it costs to keep an agent working

- **Quality is the main blocker.** In LangChain's State of Agent Engineering survey (1,300+ respondents, fielded late 2025), 32% named quality as the top barrier to production, and cost fell as a concern; 57% have agents in production ([LangChain](https://langchain.com/state-of-agent-engineering); vendor data).
- **Cost estimates miss badly.** Gartner analysts at Symposium 2024 (Gold Coast, Sept 2024) warned that generative AI cost estimates can be off by 500% to 1,000% ([iStart, 13 Sep 2024](https://istart.com.au/news-items/ai-blowouts-its-really-easy-to-waste-money/); [heise](https://heise.de/-9864445); analyst, secondary).
- **What vendors tell customers to do.** Anthropic: "consider thorough testing of your applications with the new models well before the retirement date", and audit usage for deprecated models ([Anthropic deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations)). **Inference:** that recurring test, migrate and re-prompt cycle is the "managed service" in practice: someone owns an evaluation set and a migration calendar.
- **Gap.** I found no independent figure for annual hours or cost to maintain one AI workflow (see Evidence gaps).

### 1e. Who already argues "services, not products"

- **Foundation Capital, "service-as-software"** (Ashu Garg and colleagues, 2023–24): AI stops being a tool and does the whole job. It sizes the addressable pool at about $4.6T: about $2.3T of salaries plus about $2.3T of outsourced IT and business-process services ([Foundation Capital](https://foundationcapital.com/ai-service-as-software/); [$4.6T piece](https://foundationcapital.com/ideas/the-ai-hype-600b-question-or-4-6t-opportunity); investor view).
- **Sequoia, "Services: The New Software"** (Julien Bek, 5 Mar 2026): "The next $1T company will be a software company masquerading as a services firm." "A copilot sells the tool. An autopilot sells the work." "For every dollar spent on software, six are spent on services." ([Sequoia](https://sequoiacap.com/article/services-the-new-software); investor view)
- **a16z, forward deployed engineers** (Joe Schmidt, 4 Jun 2025): "Enterprises buying AI are like your grandma getting an iPhone: they want to use it, but they need you to set it up." He argues AI startups should trade gross margin for embedded engineers, and notes OpenAI and Anthropic hire forward deployed engineers too ([a16z, "Trading Margin for Moat"](https://a16z.com/services-led-growth/); investor view). Tom Tunguz counts $9.75B committed to forward-deployed engineering by AI companies in 12 months ([Tunguz](https://tomtunguz.com/the-10b-fde-boom); investor view, not checked against a primary source).
- **Note.** These investors argue that the vendor sells the managed service at software-like scale. That backs "it's a service", but it also means Alex's "managed service" can be a product with services inside it. See 1f.

### 1f. The best counter-evidence

- **Version pinning works, for a while.** OpenAI: "Snapshots let you lock in a specific version of the model so that performance and behavior remain consistent" ([OpenAI chatgpt-4o-latest page](https://developers.openai.com/api/docs/models/chatgpt-4o-latest.md)). Pinning removes drift for the snapshot's life, which is the 12 to 22 months above. It postpones the migration but doesn't remove it. It also doesn't stop infrastructure bugs (1c).
- **The windows are long enough for many firms.** Azure promises 12 months of availability, and OpenAI 6 months' notice for GA models. A sceptic can say a once-a-year migration is ordinary maintenance, not a reason to call it a service.
- **All software is maintained.** Classic estimates put maintenance at 40–80% of lifecycle cost, about 60% on average ([97 Things Every Programmer Should Know, O'Reilly](https://www.oreilly.com/library/view/97-things-every/9780596805425/ch34.html); Lientz and Swanson via [UW lecture](https://courses.cs.washington.edu/courses/csep503/98au/lectures/lecture4/tsld009.htm)). A sceptic can say "every SaaS is a managed service" and ask what's new. **Inference, a possible answer:** with AI, the timing is set by the model vendor, and what changes is behaviour, not just interfaces.
- **Platforms do absorb the change for the buyer.** Intercom's Fin is priced at $0.99 per resolution, billed by outcome on top of seats ([Intercom learning center](https://www.intercom.com/learning-center/intercom-pricing); third-party pricing pages; vendor pricing, not fully verified). The buyer gets a product, and the vendor does the model migrations. Enterprises now mostly buy: 76% of AI solutions were purchased rather than built in 2025, against near-parity 18 months earlier ([Menlo Ventures, 9 Dec 2025](https://menlovc.com/2025-the-state-of-generative-ai/); investor data).
- **New models are usually better.** Most forced migrations go to a better or cheaper model, so "decay" can be the wrong word. The counter-counter is MUSCLE: better on average still breaks specific cases (1c).

---

## 2. The capability slider: frameworks and evidence

### 2a. Existing frameworks that map onto it

| Framework | What it says | How it lines up with Alex's slider (**inference**) |
| --- | --- | --- |
| McKinsey, takers / shapers / makers (2023, reused 2024) | Takers use off-the-shelf tools; shapers adapt models with their own data and systems; makers build their own models. Talent needs rise from taker to maker ([McKinsey theme page](https://www.mckinsey.com/featured-insights/themes/the-takers-shapers-and-makers-of-gen-ai), not opened, timed out; [AWS APN blog](https://aws.amazon.com/blogs/apn/generative-ai-trends-and-opportunities-for-aws-partners-a-conversation-with-mckinsey-and-company/); [CIO.com](https://www.cio.com/article/645425/should-you-build-or-buy-generative-ai.html/amp/)) | The closest match to use / maintain / build. "Maker" means building foundation models, which is above anything a B2B firm means by "build", and its top is in-house, not external. |
| MIT CISR Enterprise AI Maturity Model (Weill, Woerner, Sebastian, Dec 2024) | Four stages. Firms in stages 1–2 had below-industry-average financial performance; stages 3–4 were well above. 28% were in stage 1. Survey of 721 firms, mostly pre-generative-AI ([MIT CISR press release, 19 Dec 2024](https://cisr.mit.edu/sites/default/files/2024-12/EnterpriseAIMaturityModel_CISRpressrelease_121924_0.pdf); academic) | Backs "where you sit matters", with money attached. It measures maturity, not sourcing. |
| Build / buy / partner (MIT NANDA, Aug 2025) | "Purchasing AI tools from specialized vendors and building partnerships succeed about 67% of the time"; internal builds succeed about a third as often. Based on 150 interviews, 350 employees and 300 public deployments ([Fortune, 18 Aug 2025](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/)) | Backs "bring someone external in". The authors warn correlation isn't causation, and the study's 95% headline is disputed ([critique](https://arnon.dk/mits-95-ai-failure-rate-is-wrong/); [BigDATAwire](https://www.hpcwire.com/bigdatawire/2025/09/04/mit-report-flags-95-genai-failure-rate-but-critics-say-it-oversimplifies/)). |
| Forward deployed engineer model (a16z, 2025) | The vendor embeds engineers to set up and keep the AI working | A hybrid: external building with an ongoing relationship, which is close to "managed service". |

**Inference, the orientation problem.** Every framework above runs from little in-house capability (use) to a lot (build). Alex's vertical has training at the bottom and external building at the top. Read literally, external building sits above in-house building, which inverts the maturity models. Two clean readings a reader could take:
- (a) A **capability** axis: use, then maintain, then build.
- (b) A **dependence** axis: from trained users who run what others built, to full reliance on an external builder.

Which reading he means is his call (Recommendations, option B).

**His last sentence has two readings too.** "Still they're going to need to compensate someone else for whatever they build with the training to actually use it" could mean either of these:
- (a) Even a self-sufficient company keeps paying someone: model fees, platforms, and the vendor's maintenance (1a, 1f).
- (b) Whoever builds it has to be paid to train the users who run it, which is the a16z "set it up for grandma" point.

Both have evidence. Which one he means is his call.

### 2b. Train, hire or bring someone in: the evidence

- **Training is thin.** In 2024, only 39% of people using AI at work had received AI training from their company, and 66% of leaders said they wouldn't hire someone without AI skills (31,000 people, 31 countries) ([Microsoft and LinkedIn Work Trend Index, 8 May 2024](https://news.microsoft.com/source/2024/05/08/microsoft-and-linkedin-release-the-2024-work-trend-index-on-the-state-of-ai-at-work/); vendor data).
- **Training changes use.** 79% of employees with more than 5 hours of training were regular AI users, against 67% with less; only 36% said their training was enough (about 10,600 respondents, 11 countries) ([BCG AI at Work, 26 Jun 2025](https://www.bcg.com/press/26june2025-beyond-ai-adoption-full-potential); consultancy data, BCG sells AI transformation).
- **Leaders plan both training and hiring.** 47% name AI upskilling as a near-term priority; 78% are considering AI-specific hires (95% at "Frontier Firms") ([Microsoft Work Trend Index 2025, Apr 2025, secondary](https://capitalfm.africa/ai-powered-frontier-firms-to-dominate-future-workplaces-microsoft-report/); vendor data).
- **Hiring is hard and costly.** In ManpowerGroup's 2026 survey (39,063 employers, 41 countries), AI skills became the hardest skill to find, for the first time ([Staffing Industry Analysts](https://www.staffingindustry.com/editorial/it-staffing-report/ai-displaces-it-as-hardest-skill-to-find-manpowergroup)). US median pay for AI roles was $162,240 in Q1 2026 ([Broadbean](https://www.broadbean.com/resources/blog/recruitment/the-state-of-ai-recruitment-in-2026-us-salaries-job-titles-and-year-on-year-growth/)), and other aggregators put it at $165k–$180k (vendor data, methods differ). One German study puts time to fill specialised AI roles at 69 days (secondary, not US).
- **Pilots often die.** S&P Global (2025, about 1,000 respondents in North America and Europe): 42% of companies scrapped most of their AI initiatives, up from 17% a year earlier, and the average firm abandoned 46% of its proofs of concept ([CIO Dive](https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/); analyst, secondary). Gartner predicts over 40% of agentic AI projects will be cancelled by the end of 2027, citing cost, unclear value and weak risk controls (June 2025; [coverage](https://www.newelectronics.co.uk/content/news/over-40-of-agentic-ai-projects-could-be-cancelled-by-2027); analyst, primary not opened). RAND cites outside estimates of over 80% AI project failure, twice the IT rate, and found the top root cause is misunderstanding the problem to solve (65 interviews) ([RAND, 13 Aug 2024](https://www.rand.org/pubs/research_reports/RRA2680-1.html)). The 80% isn't RAND's own measurement.

### 2c. A rule that pushes training: EU AI Act, Article 4

- **Original duty.** Article 4 has applied since 2 Feb 2025. Providers and deployers "shall take measures to ensure, to their best extent, a sufficient level of AI literacy of their staff and other persons dealing with the operation and use of AI systems on their behalf" ([Article 4 text](https://artificialintelligenceact.eu/article/4/)).
- **Softened from July 2026.** The Digital Omnibus on AI, Regulation (EU) 2026/1744, was published 24 Jul 2026 and in force 27 Jul 2026 ([Lewis Silkin, 27 Jul 2026](https://www.lewissilkin.com/insights/2026/07/27/the-digital-omnibus-on-ai-enters-into-force-today-102nedo)). Providers and deployers must now "take measures to support the development of AI literacy". The obligation "does not require providers or deployers to guarantee any specific level of AI literacy of any individual", and the Commission and Member States must help, especially SMEs ([artificialintelligenceact.eu](https://artificialintelligenceact.eu/article/4/); [KI-Campus, 28 Jul 2026](https://ki-campus.org/en/blog/eu-ai-act-ai-omnibus-recalibrates-article-4-ai-literacy-remains-mandatory)).
- **Enforcement.** National market surveillance authorities enforce it, from August 2026 (sources differ on 2 or 3 Aug). There's no Article 4-specific fine tier; penalties are set nationally, and the Commission sets no fixed curriculum ([Covington, Mar 2025](https://www.insideprivacy.com/artificial-intelligence/european-commission-provides-guidance-on-ai-literacy-requirement-under-the-eu-ai-act/); [Burges Salmon](https://www.burges-salmon.com/articles/102kazh/ai-literacy-european-commission-publishes-faq)).
- **What it means for the argument (inference).** The duty applies to every company that deploys AI, at every point on the slider, not only to those at the bottom. It's a duty to make an effort, not a certification.

---

## 3. Citable facts Alex could say aloud

| # | Fact | Source and date | Label |
| --- | --- | --- | --- |
| 1 | Anthropic gives at least 60 days' notice before retiring a model; Claude Sonnet 4.5, released Sept 2025, retires 30 Nov 2026. | [Anthropic deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations), read 2 Nov 2026 | Vendor's own docs |
| 2 | OpenAI shuts down GPT-5 and o3 on 11 Dec 2026, about six months after announcing it (11 Jun 2026). | [OpenAI deprecations](https://developers.openai.com/api/docs/deprecations), read 2 Nov 2026 | Vendor's own docs |
| 3 | OpenAI's Agent Builder launched 6 Oct 2025 and shuts down 30 Nov 2026, along with its Evals platform and reusable prompts. | [OpenAI deprecations](https://developers.openai.com/api/docs/deprecations); [TechCrunch, 6 Oct 2025](https://techcrunch.com/2025/10/06/openai-launches-agentkit-to-help-developers-build-and-ship-ai-agents) | Vendor's own docs |
| 4 | Between March and June 2023, GPT-4's accuracy on one simple maths task fell from 84% to 51% under the same model name. | [Chen, Zaharia, Zou, July 2023](https://arxiv.org/abs/2307.09009v1) | Academic (contested reading) |
| 5 | At the worst hour of a 2025 incident, 16% of one Claude model's requests were degraded by infrastructure bugs, and Anthropic's own evaluations missed it. | [Anthropic postmortem, 17 Sep 2025](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues) | Vendor's own docs |
| 6 | Buying from specialised vendors or partnering reached deployment about 67% of the time; internal builds about a third as often. | MIT NANDA, via [Fortune, 18 Aug 2025](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/) | Academic; method disputed |
| 7 | 76% of enterprise AI solutions were bought, not built, in 2025. | [Menlo Ventures, 9 Dec 2025](https://menlovc.com/2025-the-state-of-generative-ai/) | Investor data |
| 8 | Only 39% of people using AI at work had been trained by their employer; 66% of leaders wouldn't hire someone without AI skills. | [Microsoft and LinkedIn Work Trend Index, 8 May 2024](https://news.microsoft.com/source/2024/05/08/microsoft-and-linkedin-release-the-2024-work-trend-index-on-the-state-of-ai-at-work/) | Vendor data |
| 9 | 42% of companies scrapped most of their AI initiatives in 2025, up from 17% the year before. | S&P Global, via [CIO Dive](https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/) | Analyst, secondary |
| 10 | "For every dollar spent on software, six are spent on services." | [Sequoia, 5 Mar 2026](https://sequoiacap.com/article/services-the-new-software) | Investor view |

Also usable, with care: the EU AI Act's AI-literacy duty since 2 Feb 2025, softened on 27 Jul 2026 (2c); BCG's 79% vs 67% on training (2b); and Foundation Capital's $4.6T (investor view).

---

## 4. Counterarguments, and the gaps a sceptical B2B reader would spot

1. **"Products exist."** Fin-style tools and Microsoft Copilot are sold as products, priced per seat or per outcome, and the vendor does the migrations. Most enterprises now buy (Menlo, 76%). The absolute claim, "no such thing as a product", is the easiest to attack. The evidence supports a narrower version: the maintenance never goes away, but it can sit inside a vendor's product.
2. **"All software needs maintenance."** At 40–80% of lifecycle cost, maintenance is normal. A reader may ask why AI is different. Evidence for a difference: the vendor sets the timetable (1a), whole tools retire (1b), and what changes is behaviour rather than just interfaces (1c). A reader may still find the gap smaller than Alex's framing implies.
3. **"Pin the version."** Pinned snapshots are stable for 12 to 22 months, and Azure guarantees 12. For a low-stakes internal workflow, an annual migration may be cheap. Alex's argument is strongest for workflows that run unattended and touch customers.
4. **"Upgrades improve things."** Most forced moves are to better and cheaper models. The decay framing has to rest on regressions in specific cases (MUSCLE, the GPT-4o sycophancy update), not on average quality.
5. **The slider's direction.** Every maturity model puts in-house building at the top, and Alex's puts external building at the top (2a). The slider also merges level and sourcing. A reader trained on McKinsey or Gartner may find it confusing.
6. **Training isn't only the bottom rung.** Article 4 and the BCG data apply to every company that uses AI, so training sits at every level, not just the lowest.
7. **Contested statistics.** The MIT 95% figure is widely disputed, and RAND's 80% is a cited estimate, not its own finding. A sceptical reader who knows this will discount the whole post if it leans on them.
8. **Self-interest.** Alex sells GTM-engineering services, and the article concludes that companies must pay someone like him. Readers will see it. The strongest evidence for him is vendor documentation (1a, 1b), which has no stake in his conclusion.
9. **The vendors' answer.** Providers are building "agents that maintain agents", automatic evaluations and migration guides. A reader may say the maintenance burden will shrink. I found no evidence it has shrunk yet: OpenAI is retiring its own Evals platform (1b).
10. **Small firms may never choose.** For many SMBs, the realistic option is AI built into tools they already pay for. The slider decision may only apply to firms with custom workflows. That's an audience question for Alex.

---

## Evidence gaps

- No independent figure for what maintaining one AI workflow costs per year, in hours or money, or for the cost of one model migration. Vendor blogs make claims, but I found no study.
- No head-to-head data on the cost of training staff versus hiring versus outsourcing for AI work in B2B or agency settings, and nothing specific to Czech or CEE firms.
- Not opened: Gartner's own press releases (403 error), McKinsey's taker/shaper/maker page (timed out), the MIT NANDA PDF, S&P Global's report, and Microsoft's 2025 Work Trend Index. Their figures here come from consistent secondary coverage.
- Article 4 after the Omnibus: the amended wording comes from artificialintelligenceact.eu and law-firm notes, not EUR-Lex. The exact enforcement start (2 or 3 Aug 2026) and how national authorities will check it weren't confirmed.
- Menlo's 2024 baseline (47% built) is secondhand; only the 2025 figure of 76% purchased is on Menlo's page.
- Model lifetimes are my arithmetic from snapshot dates, not a published statistic.
- Intercom Fin pricing comes from third-party pricing pages; Intercom's own page was listed but not opened.

---

## Recommendations (evidence and options, every call is Alex's)

- **A. How absolute the opening claim is.** The evidence backs "it always needs managing" better than "it can't be a product". He can keep the strong form and answer counterargument 1 in the post, or use the narrower form. Either has support (1a–1c against 1f).
- **B. Which way the slider runs.** He can keep training at the bottom and external building at the top, as dictated, and say why. Or he can align it with McKinsey's taker/shaper/maker, with use at the bottom and build at the top, and treat "train, hire or bring someone in" as a separate choice at each level. Section 2a has both readings.
- **C. Which meaning of the last sentence he intends** (paying the vendor and platforms, or paying the builder to train the users). Both have evidence (2a).
- **D. Which proof to lead with.** The provider documents (facts 1–3, 5) have no stake in his conclusion, while the investor and consultancy figures (facts 7, 8, 10) do. One option is to lean on the first group and label the second.
- **E. Whether to mention the EU rule, and how.** If he does, the softened July 2026 wording is the accurate one (2c). The original "ensure a sufficient level" wording is out of date.
- **F. Whether to name his own stake.** Counterargument 8 will occur to a B2B reader whether or not he raises it.
- **G. What to avoid.** The MIT 95% and RAND 80% figures are best left out or attributed with their caveats (counterargument 7).

---

## Sources

Vendor's own documents
- Anthropic, Model deprecations, read 2 Nov 2026: https://platform.claude.com/docs/en/about-claude/model-deprecations
- Anthropic, Deprecation updates: Opus 3, 25 Feb 2026: https://anthropic.com/research/deprecation-updates-opus-3
- Anthropic, A postmortem of three recent issues, 17 Sep 2025: https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues
- OpenAI, Deprecations, read 2 Nov 2026: https://developers.openai.com/api/docs/deprecations
- OpenAI, chatgpt-4o-latest model page (snapshots): https://developers.openai.com/api/docs/models/chatgpt-4o-latest.md
- OpenAI, Expanding on what we missed with sycophancy, May 2025: https://openai.com/index/expanding-on-sycophancy/
- OpenAI forum, Assistants API sunset: https://community.openai.com/t/assistants-api-beta-deprecation-august-26-2026-sunset/1354666
- Microsoft, Foundry model lifecycle and retirement: https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/model-lifecycle-retirement
- Google, Vertex AI model versions: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions
- Google AI forum, Gemini 1.5 Flash-002 retirement thread: https://discuss.ai.google.dev/t/gemini-1-5-flash-002-discontinuation-date-is-september-24-2025-its-too-short-we-hopt-at-least-5-years/47703
- Intercom pricing: https://www.intercom.com/learning-center/intercom-pricing

Academic and analyst
- Chen, Zaharia, Zou, How is ChatGPT's behavior changing over time?, Jul 2023: https://arxiv.org/abs/2307.09009v1
- Sclar et al., Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design, ICLR 2024: https://arxiv.org/html/2310.11324v2
- Echterhoff et al. (Apple), MUSCLE, Jul 2024: https://arxiv.org/pdf/2407.09435v2.pdf
- MIT CISR, Enterprise AI maturity press release, 19 Dec 2024: https://cisr.mit.edu/sites/default/files/2024-12/EnterpriseAIMaturityModel_CISRpressrelease_121924_0.pdf
- RAND, Root causes of failure for AI projects, 13 Aug 2024: https://www.rand.org/pubs/research_reports/RRA2680-1.html
- MIT NANDA via Fortune, 18 Aug 2025: https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/
- Critiques of the NANDA 95% figure: https://arnon.dk/mits-95-ai-failure-rate-is-wrong/ and https://www.hpcwire.com/bigdatawire/2025/09/04/mit-report-flags-95-genai-failure-rate-but-critics-say-it-oversimplifies/
- S&P Global via CIO Dive, 2025: https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/
- Gartner agentic-AI prediction, Jun 2025, via New Electronics: https://www.newelectronics.co.uk/content/news/over-40-of-agentic-ai-projects-could-be-cancelled-by-2027
- Gartner cost warning, Sep 2024, via iStart: https://istart.com.au/news-items/ai-blowouts-its-really-easy-to-waste-money/ and heise: https://heise.de/-9864445
- Software maintenance share: https://www.oreilly.com/library/view/97-things-every/9780596805425/ch34.html and https://courses.cs.washington.edu/courses/csep503/98au/lectures/lecture4/tsld009.htm
- ManpowerGroup 2026 via SIA: https://www.staffingindustry.com/editorial/it-staffing-report/ai-displaces-it-as-hardest-skill-to-find-manpowergroup
- Broadbean, AI recruitment 2026: https://www.broadbean.com/resources/blog/recruitment/the-state-of-ai-recruitment-in-2026-us-salaries-job-titles-and-year-on-year-growth/

Investor views and vendor data
- Foundation Capital, service-as-software: https://foundationcapital.com/ai-service-as-software/ and https://foundationcapital.com/ideas/the-ai-hype-600b-question-or-4-6t-opportunity
- Sequoia, Services: The New Software, 5 Mar 2026: https://sequoiacap.com/article/services-the-new-software
- a16z, Trading Margin for Moat, 4 Jun 2025: https://a16z.com/services-led-growth/
- Tom Tunguz, The $10B FDE boom: https://tomtunguz.com/the-10b-fde-boom
- Menlo Ventures, 2025 State of Generative AI in the Enterprise, 9 Dec 2025: https://menlovc.com/2025-the-state-of-generative-ai/
- Microsoft and LinkedIn Work Trend Index 2024, 8 May 2024: https://news.microsoft.com/source/2024/05/08/microsoft-and-linkedin-release-the-2024-work-trend-index-on-the-state-of-ai-at-work/
- Microsoft Work Trend Index 2025, secondary: https://capitalfm.africa/ai-powered-frontier-firms-to-dominate-future-workplaces-microsoft-report/
- BCG AI at Work 2025, 26 Jun 2025: https://www.bcg.com/press/26june2025-beyond-ai-adoption-full-potential
- LangChain, State of Agent Engineering: https://langchain.com/state-of-agent-engineering
- McKinsey takers/shapers/makers: https://www.mckinsey.com/featured-insights/themes/the-takers-shapers-and-makers-of-gen-ai (not opened); AWS APN: https://aws.amazon.com/blogs/apn/generative-ai-trends-and-opportunities-for-aws-partners-a-conversation-with-mckinsey-and-company/; CIO.com: https://www.cio.com/article/645425/should-you-build-or-buy-generative-ai.html/amp/
- TechCrunch, AgentKit launch, 6 Oct 2025: https://techcrunch.com/2025/10/06/openai-launches-agentkit-to-help-developers-build-and-ship-ai-agents

EU AI Act
- Article 4 (current and amended text): https://artificialintelligenceact.eu/article/4/
- Lewis Silkin, Digital Omnibus enters into force, 27 Jul 2026: https://www.lewissilkin.com/insights/2026/07/27/the-digital-omnibus-on-ai-enters-into-force-today-102nedo
- KI-Campus, Article 4 recalibrated, 28 Jul 2026: https://ki-campus.org/en/blog/eu-ai-act-ai-omnibus-recalibrates-article-4-ai-literacy-remains-mandatory
- Covington on the Commission's AI literacy guidance, Mar 2025: https://www.insideprivacy.com/artificial-intelligence/european-commission-provides-guidance-on-ai-literacy-requirement-under-the-eu-ai-act/
- Burges Salmon on the Commission FAQ: https://www.burges-salmon.com/articles/102kazh/ai-literacy-european-commission-publishes-faq
