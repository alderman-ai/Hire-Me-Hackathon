# R7: The research base for the second article

> Alex's scope (feedback on OT-04), verbatim: "The second article will be about how, basically, GTM engineers are the solution to the biggest social question of the AI era. A lot of companies are saying that AI is not a way for them to fire half their company. For AI to save a company any money there has to be some return on that investment. If it's not lowering their labor costs then it has to be increasing their revenue. That means GTM engineers who focus AI on their pipeline are actually the ones that are helping companies keep their promise: that AI is a way to do more business and have their whole team grow together, rather than replace half their team. GTM engineers have a really crucial role to play in this AI transformation and you use that as a base. We'll fill in more of the details later."
>
> The list question: "What evidence, data and existing frameworks support or challenge this argument, and what are the strongest counterarguments?"

2026-11-02
session s1-research subagent
item 7 of 10 on list L-03

Serves: DoD-15 (the blog articles, from Alex's dictation, live on the site). Readers: S-D5 (blog articles), S-D4 (blog pipeline).

This is a research base, not the article. It holds no copy, outline or headlines. Alex dictates the article himself.

---

## Method

- **When:** 2 Nov 2026, late afternoon, about 15 minutes. 24 web searches and 9 page fetches (5 succeeded; McKinsey timed out twice, PwC and Axios returned 403, and one Challenger PDF came back unreadable).
- **What I searched:** (1) company statements on AI and jobs set against announced cuts (IBM, Salesforce, Walmart, Amazon, Klarna, Duolingo, Shopify), plus Challenger, Gray & Christmas layoff tallies for 2025 and 2026; (2) enterprise AI ROI studies (MIT NANDA, McKinsey, PwC, NBER, HBR, Bain); (3) revenue-side AI and GTM engineering growth; (4) counter-evidence: SDR decline, AI-native headcount, entry-level employment, AI-washing.
- **Source quality:** where a figure comes only from a search-result summary and not from a page I opened, it's marked **(snippet only)**. Vendor numbers are marked **vendor data**. Anything I concluded myself is marked **inference**.
- **Not repeated here:** what a GTM engineer is hired to do, the tool stacks and the salary data are in `global\L-01-R2-gtm-engineer-hiring.md`. This report cites it rather than redoing it. R6 (article 1's base) didn't exist yet when I checked.
- **Excluded by rule:** anything about Addvery, `Addvery Research\`, the Apify proposal and Alex's own GetSales outbound.

---

## Verdict

1. **The premise holds: companies promise "growth, not cuts" while also cutting, and the two clearly diverge.** In 2026, AI is the most-cited single reason for announced US job cuts: about 22% of year-to-date cuts through August, roughly double the whole of 2025. Yet economy-wide data (NBER, Yale) still shows almost no AI effect on employment, and most "AI layoffs" are made in anticipation of AI's potential, not on proof of it (HBR: 2%). The gap between promise and practice is real and well documented.
2. **"ROI has to come from cost or revenue" is a sound frame, and on the revenue side the evidence mostly backs Alex.** McKinsey finds AI revenue gains most often in marketing and sales, and PwC's CEOs report revenue gains (30%) slightly more often than cost cuts (26%). The weakest point is MIT NANDA's widely cited finding: most AI budget goes to sales and marketing tools, but the measured return showed up in back-office cost cuts. A sceptical reader will know that study.
3. **The weakest link is the one the article rests on: that GTM engineers keep the team growing.** No independent study ties GTM engineering to headcount growth. The vendor pitch for GTM engineering is often the opposite: one engineer replacing several SDRs. Revenue-side AI can grow a business while its headcount stays flat (Walmart) or shrinks (AI-native startups). The argument is strongest framed as "the revenue side is where AI's return has to come from if the promise is to hold". It's weakest as "GTM engineers protect jobs".

---

## 1. "AI won't mean firing half the company": the promises against the record

### 1a. What companies and leaders said, and what they did

| Company / person | What was said (growth framing) | What was done | Reads as |
| --- | --- | --- | --- |
| **IBM**, Arvind Krishna, to the WSJ, May 2025 | AI agents replaced the work of "a couple hundred" HR staff, but "Our total employment has actually gone up", because the savings were reinvested in software engineers and **salespeople** ([People Matters](https://www.peoplematters.in/news/leadership/ibm-ceo-says-replacing-hr-staff-with-ai-led-to-more-hiring-45453); [Gigazine](https://gigazine.net/gsc_news/en/20250508-ibm-ceo-ai-replaced-workers)) | IBM hasn't published the hiring numbers. In 2023 Krishna told Bloomberg about 30% of back-office roles could be replaced over five years (~7,800 roles) | The cleanest public example of Alex's mechanism: cost saved in the back office, reinvested in revenue roles. One CEO's word, unverified |
| **Salesforce**, Marc Benioff, Sep 2025 | Earlier in 2025 he played down AI's job risk, and he says AI can't replace human salespeople ([UC Today](https://www.uctoday.com/ai/ai-agents-slash-4000-salesforce-jobs-months-after-ceo-downplays-ais-risks-on-jobs/)) | Support headcount cut from about 9,000 to about 5,000, attributed to Agentforce ([The Register, 2 Sep 2025](https://www.theregister.com/2025/09/02/salesforce_4000_jobs_ai)). In the same period it planned to hire 3,000 to 5,000 salespeople ([Storyboard18](https://www.storyboard18.com/brand-makers/salesforce-cuts-4000-support-roles-for-ai-but-plans-to-hire-5000-sales-staff-says-ceo-marc-benioff-82829.htm)) | Double-edged: cost cut in service, growth in sales. It supports "revenue roles grow", but contradicts "the whole team grows together" |
| **Walmart**, Sep 2025 | AI "is going to change literally every job" (Doug McMillon); no mass layoffs planned | Headcount held flat at about 2.1 million for three years while the business grows ([Fortune, 27 Sep 2025](https://www.fortune.com/2025/09/27/ai-ceos-job-market-transformation-walmart-accenture-salesforce)) | Growth without hiring: no cuts, but no team growth either |
| **Amazon**, Andy Jassy, Jun 2025 memo | Expects AI to "reduce our total corporate workforce" ([PBS, Oct 2025](https://www.pbs.org/newshour/economy/amazon-to-lay-off-14000-corporate-employees-as-spending-on-artificial-intelligence-accelerates)) | 14,000 corporate cuts in Oct 2025, which Jassy then called "not financially driven or AI driven" but cultural (same source). A further 16,000 in Jan 2026, about 30,000 in total (one secondary source: [McGraw Hill blog, Mar 2026](https://www.mheducation.com/highered/blog/2026/03/amazon-layoffs-5-key-takeaways)) | Here the attribution runs backwards: AI was named in advance, then denied at the time of the cuts |
| **Klarna**, Sebastian Siemiatkowski, 2024–25 | AI does the work of about 700 agents | Headcount from about 7,000 to about 3,000; in May 2025 it rehired humans after quality fell, with the CEO admitting the push had been "driven too much by cost" ([Entrepreneur, May 2025](https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396); [tech.co](https://tech.co/news/klarna-reverses-ai-overhaul)) | A cautionary tale for the cost-only route |
| **Duolingo**, Luis von Ahn, Apr 2025 memo | "This isn't about replacing Duos [employees] with AI" | The same memo phases out contractors for work AI can do, and approves headcount only if a team can't automate more ([Computing](https://www.computing.co.uk/news/2025/ai/duolingo-goes-ai-first-as-it-phases-out-human-contractors)) | The promise covers full-time staff; contractors bear the cut |
| **Shopify**, Tobi Lütke, Apr 2025 memo | AI as the baseline expectation for every employee | Teams must show why AI can't do the work before asking for headcount ([Gigazine](https://gigazine.net/gsc_news/en/20250409-shopify-ceo-ai-do-jobs)) | No cuts, but a hiring brake |
| **Jensen Huang** (Nvidia), CNN, Jul 2025 | "If the world runs out of ideas, then productivity gains translates to job loss"; over 300 years, jobs and productivity both rose ([ABC7 / CNN](https://abc7.com/post/ai-job-losses-nvidia-ceo-jensen-huang-says-artificial-intelligence-could-lead-layoffs-world-runs-ideas/17118672/)) | n/a | A framework close to Alex's: productivity only becomes job loss when there's no growth to spend it on |

I found no single, quotable large-company pledge in the form "AI will not cut our headcount". The promise lives in softer forms: "this isn't about replacing", "total employment has gone up", "no mass layoffs". Survey framing below.

### 1b. What the aggregate record shows

**Announced cuts attributed to AI (Challenger, Gray & Christmas, US):**
- 2025, full year: **54,836** (per Challenger's May 2026 report, **snippet only**). Oxford Economics put AI at about **4.5% of all 2025 US cuts** ([Fortune, 7 Jan 2026](https://fortune.com/2026/01/07/ai-layoffs-convenient-corporate-fiction-true-false-oxford-economics-productivity/)).
- 2026, through May: **87,714**, 22% of all cuts. May alone was 38,579 of 97,006, the highest monthly AI total since Challenger began tracking it in 2023 ([Challenger May 2026 PDF](https://www.challengergray.com/wp-content/uploads/2026/06/Challenger-Report-May-2026.pdf), **snippet only**).
- 2026, through June: **101,743**, about 23% of year-to-date cuts, and **173,568 since 2023**. AI was the top cited reason for the fourth month running ([Challenger, 1 Jul 2026](https://www.challengergray.com/?p=28455), fetched).
- 2026, through August: **116,175**, about 22%. In August AI fell to the fourth-most cited reason (3,462 cuts) (**snippet only**; I couldn't open the source).
- Not found: the September and October 2026 reports.

**Intentions, from surveys (they don't agree):**
- KPMG US CEO Outlook Pulse (Mar 2026, 100 US CEOs at firms over $500M revenue): **55%** expect to add staff because of AI; **9%** plan AI-linked reductions this year ([Axios, 10 Mar 2026](https://axios.com/2026/03/10/ai-jobs-hiring-ceo), via search; [KPMG](https://kpmg.com/us/en/articles/2026/ceo-pulse-gated.html)). Caveat: one reading of KPMG's PDF has 55% expecting *no net change*. Check before quoting.
- Mercer Global Talent Trends 2026 (825 C-suite leaders): **99%** expect AI to drive headcount reductions within two years ([Gizmodo](https://www.gizmodo.com/99-of-ceos-expect-ai-driven-layoffs-in-the-next-two-years-2000762994), **snippet only**).
- Chief Executive (2026): **31%** of companies cut headcount through AI in 2025, and **53%** plan to raise total headcount in 2026 ([Chief Executive](https://chiefexecutive.net/c-suite-survey-finds-ai-already-cutting-jobs-at-one-third-of-companies-even-as-hiring-rebounds/), **snippet only**).

**What actually happened to jobs (independent research):**
- NBER WP 34836, "Firm Data on AI" (Feb, revised Mar 2026; almost 6,000 executives in the US, UK, Germany and Australia). About 70% of firms use AI. Over three years, **more than 90% report no impact on their own employment** and **89% no impact on labour productivity** (sales per employee). For the next three years they expect +1.4% productivity, +0.8% output and **−0.7% employment** ([NBER](https://www.nber.org/papers/w34836); [The Register, 18 Feb 2026](https://www.theregister.com/2026/02/18/ai_productivity_survey/)).
- HBR, "Companies Are Laying Off Workers Because of AI's Potential—Not Its Performance" (early 2026; 1,006 executives surveyed Dec 2025). 39% made low-to-moderate cuts and 21% large cuts *in anticipation* of AI; **only 2% made large cuts based on AI already proven to do the work** ([Harvard feed](https://tagteam.harvard.edu/hub_feeds/924/feed_items/17213234); figures via secondary coverage, **snippet only**).
- Yale Budget Lab: no economy-wide AI disruption through March 2026 (update of 16 Apr 2026). The one possible early signal is a widening gap in job mix between recent and older graduates ([Fortune, 2 Feb 2026](https://fortune.com/2026/02/02/ai-labor-market-yale-budget-lab-ai-washing/); **snippet only** for the April update).
- Stanford Digital Economy Lab, "Canaries in the Coal Mine" (Brynjolfsson, Chandar, Chen; ADP payroll data): workers aged 22 to 25 in the most AI-exposed jobs saw a **13% relative fall in employment** (Aug 2025 version), revised to **16%** (13 Nov 2025 version) ([Stanford](https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine/)).

### 1c. Where promise and record diverge

All four points are **inference** from the sources above.
- **By who:** the promise covers full-time staff. Cuts fall on contractors and outsourced work (Duolingo, Klarna, MIT below) and on new entrants, who simply don't get hired (Stanford).
- **By how:** much of the reduction is not backfilling rather than layoffs (MIT, SaaStr below), which no pledge covers.
- **By function:** service and back-office roles shrink while sales roles are added (Salesforce, IBM). That supports Alex's direction, but it's "some teams grow", not "the whole team grows".
- **By story:** AI-washing runs both ways. Firms blame AI for cuts made for other reasons (Oxford: it "conveys a more positive message to investors"; HBR's 2%), and promise growth while braking hiring (Shopify, Walmart). Sam Altman, Feb 2026: there is "some AI washing" and "some real displacement" (via search summary of the [Fortune Oxford piece](https://fortune.com/2026/01/07/ai-layoffs-convenient-corporate-fiction-true-false-oxford-economics-productivity/) coverage, **snippet only**).

---

## 2. "ROI has to come from somewhere": where enterprise AI returns show up

| Study (date) | Sample | Headline | Cost or revenue? |
| --- | --- | --- | --- |
| **MIT NANDA, "The GenAI Divide: State of AI in Business 2025"** (Jul–Aug 2025; lead author Aditya Challapally) | ~150 leader interviews, 350-employee survey, 300 public deployments (per Fortune) | **95%** of enterprise GenAI pilots show no measurable P&L impact; about 5% achieve "rapid revenue acceleration" | **More than half of GenAI budgets go to sales and marketing tools** (some coverage says ~70%), **but the biggest ROI is in back-office automation**: cutting BPO, agency spend and operations costs. Workforce effect: mostly not refilling roles in customer support and admin. Bought tools succeed about 67% of the time; internal builds about a third as often ([Fortune via Yahoo, 18 Aug 2025](https://finance.yahoo.com/news/mit-report-95-generative-ai-105412686.html), fetched; 70% figure: [MediaPost](https://mediapost.com/publications/article/408575/95-of-companies-get-zero-roi-from-gai-initiatives.html), **snippet only**). Its authors call it directional and preliminary |
| **McKinsey, "The state of AI in 2025"** (Nov 2025) | Global survey | Only **39%** report any enterprise-level EBIT impact | **Revenue increases are most often reported in marketing and sales**, strategy and corporate finance, and product development. 80% set efficiency as an AI objective; the ~6% of "high performers" (EBIT impact of 5% or more) **also set growth and innovation as objectives** ([McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai); primary page timed out, figures **snippet only**) |
| **PwC 29th Global CEO Survey** (Jan 2026) | 4,454 CEOs, 95 countries, fielded 30 Sep–10 Nov 2025 | **56%** report no significant financial benefit from AI yet | **30% saw higher revenue, 26% lower costs, 12% both**. Firms applying AI widely in products and customer experience report margins nearly 4 points higher (as reported) ([PwC](https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-global-ceo-survey.html), 403 to me; [Management Today](https://www.managementtoday.co.uk/half-ceos-havent-realised-financial-benefits-ai-integrations/indepth/article/1945663), **snippet only**) |
| **NBER WP 34836** (Feb–Mar 2026) | ~6,000 executives | 89% see no productivity impact over three years | Neither, yet ([NBER](https://www.nber.org/papers/w34836)) |
| **Bain Technology Report, sales chapter** (23 Sep 2025) | Bain analysis | Sellers spend only **~25%** of their time selling; AI could double that. "Early successes show 30% or better improvement in win rates", but "truly successful results remain rare" | Revenue. Bain frames the gain as reallocating seller time, **not cutting roles** ([Bain](https://www.bain.com/insights/ai-transforming-productivity-sales-remains-new-frontier/), fetched) |

**What this means for the argument (inference).** The cost-or-revenue fork matches how the big surveys sort their own results, so the frame is defensible. The revenue branch has real support (McKinsey, PwC, Bain). MIT is the counterweight: spend is already concentrated on sales and marketing, and it isn't paying off there yet. Read one way, that means revenue-side AI doesn't work. Read Alex's way, it means sales and marketing AI is being bought as tools rather than engineered into the pipeline. MIT's own diagnosis (brittle workflows, no feedback loop, poor fit with daily work) is the second reading. But that is Alex's argument to make, not MIT's finding.

---

## 3. Revenue-side AI and GTM engineering

**Evidence that AI on the pipeline produces revenue:**
- McKinsey (above): marketing and sales is the function where AI-driven revenue increases are reported most often.
- Salesforce State of Sales, 6th ed. (**vendor data**; 5,500 sales professionals, 27 countries, fielded Mar–Apr 2024): **83%** of sales teams with AI saw revenue growth, against **66%** without ([Salesforce](https://salesforce.com/news/stories/sales-ai-statistics-2024)). Self-reported and correlational, and Salesforce sells the AI.
- Bain (above): 30%+ win-rate gains in early cases.
- monday.com, via Kyle Poyar's Growth Unhinged (24 Jun 2026): AI agents in GTM handled tens of thousands of leads and booked thousands of meetings in 2026, cut demo-request response time from 24 hours to under 2 minutes, and generated "millions of dollars in pipeline", at a $1B+ ARR public company with 1,000+ GTM staff growing 24% a year ([Growth Unhinged](https://www.growthunhinged.com/p/what-ai-native-gtm-looks-like-at-public-company-scale); paywalled after the intro, and no headcount change is visible).

**What GTM engineering is:** see `global\L-01-R2-gtm-engineer-hiring.md`, Q1. In short, it's "a build-and-operate role sitting inside the go-to-market motion" (RevGuild): automated workflows that find, enrich, personalise and route, with a pipeline half and a data half.

**How fast it's growing** (all **vendor data** or analyst data; use ranges):
- Kyle Poyar with Sumble data (Sep 2025): 45 GTM engineer posts in the past month and 128 in three months, up from fewer than 10 a month in 2024. About 45% of people with the title work as agencies or consultants ([Growth Unhinged](https://kylepoyar.substack.com/p/do-you-need-a-gtm-engineer), **snippet only**, paywalled).
- Apollo (**vendor**): LinkedIn postings went from about 1,400 in mid-2025 to 3,000+ by January 2026 ([Apollo](https://www.apollo.io/magazine/the-gtm-engineer-boom-inside-the-fastest-growing-job-in-b2b-sales), **snippet only**). OnFire: about 3,000 open roles in early 2026 (L-01-R2 source).
- A "205% year-on-year" figure attributed to Bloomberry (2024 to 2025) circulates widely, but sources disagree on its window. Don't use it as a single figure.

**What I couldn't find:** any independent study tying GTM engineers (as a role) to company revenue or headcount outcomes. Everything role-specific is vendor case studies.

---

## 4. Citable facts Alex could say aloud

Each is sourced above. Ranked by source strength, strongest first.

| # | Fact | Source, date | Strength |
| --- | --- | --- | --- |
| 1 | In 2026, AI is the single most-cited reason for announced US job cuts: about 102,000 through June, nearly double the 55,000 of all 2025. | Challenger, Gray & Christmas, 1 Jul 2026 and May 2026 reports | Primary tally of *announcements*, not proven causes |
| 2 | Yet in a survey of almost 6,000 executives, more than 90% said AI had no effect on their own headcount over three years. | NBER WP 34836, Feb–Mar 2026 | Academic working paper, self-reported |
| 3 | Only 2% of executives made large cuts based on AI that had already proven it could do the work; far more cut in anticipation. | HBR, early 2026 (survey Dec 2025) | Secondary figures; check the original |
| 4 | 56% of CEOs say AI hasn't yet paid off financially; of those who say it has, revenue gains (30%) are slightly more common than cost savings (26%). | PwC Global CEO Survey, Jan 2026 | Large sample; secondary figures |
| 5 | Revenue gains from AI are most often reported in marketing and sales. | McKinsey State of AI, Nov 2025 | Strong source; snippet only |
| 6 | 95% of enterprise GenAI pilots show no P&L impact; most budget goes to sales and marketing, but the best returns so far are in back-office cost. | MIT NANDA, Aug 2025 | Famous but small and preliminary; it cuts *against* the revenue claim, so say it as a challenge |
| 7 | Sellers spend about a quarter of their time selling; AI could double it, with early win-rate gains of 30% or more. | Bain, 23 Sep 2025 | Consultancy estimate, not measured across firms |
| 8 | IBM's CEO says AI replaced a few hundred HR roles, and total employment went *up*, with savings moved into engineers and salespeople. | WSJ via People Matters, May 2025 | One CEO's claim, no numbers published |
| 9 | Salesforce cut support from about 9,000 to 5,000 with AI agents, while planning to hire 3,000 to 5,000 salespeople. | The Register, 2 Sep 2025; Storyboard18 | Well reported; cuts both ways |
| 10 | GTM engineer job posts roughly doubled in about six months, to 3,000+ by January 2026. | Apollo (**vendor data**), Jan 2026 | Vendor, directional |

---

## 5. The strongest counterarguments, and what a sceptical B2B reader would spot

1. **Revenue growth doesn't need more people.**
   - Walmart plans to grow on a flat headcount for three years.
   - AI-native startups: AWS's 2026 founder survey (3,400+ founders) finds about 55% earn over $400,000 revenue per employee ([AWS press, Jun 2026](https://press.aboutamazon.com/2026/6/aws-global-startup-trends-report-reveals-ai-native-startups-are-reaching-billion-dollar-valuations-in-half-the-time)). A Harvard/INSEAD study finds startups that embed AI employ about 25% fewer workers at similar valuations (**snippet only**, via [KuCoin News](https://www.kucoin.com/news/flash/ai-native-startups-have-25-fewer-employees-than-traditional-firms-study-finds); primary not found).
   - Block cut about 40% of staff and its revenue per employee rose from $2.4M to $4M ([Tomasz Tunguz, Feb 2026](https://tomtunguz.com/are-we-seeing-layoffs-from-ai/index.md), **snippet only**).
   - "Do more business" and "the whole team grows" are separate claims, and the evidence supports the first far more than the second.
2. **GTM automation replaces SDRs: the role's own sales pitch.**
   - Vendors sell GTM engineering as the replacement for an SDR team, for example "one GTM engineer can automate 70% of SDR activities" (**vendor data**: [Factors.ai](https://www.factors.ai/blog/gtm-engineering-replacing-sdr-teams-ai-automation); [Metaflow](https://metaflow.life/blog/gtm-engineering-replacing-sdr-teams-ai-automation)). More measured vendor writing says 2 to 3 SDR seats' worth of manual research.
   - SDR postings were down 21% year on year in H1 2026 (Poyar with Sumble data), and SaaStr reports 36% of B2B companies cut sales development teams in 2025, mostly by not backfilling. Both figures come via vendor blogs, **snippet only** ([Landbase](https://www.landbase.com/blog/death-of-bdr-role-ai-agents-sdr-hiring-2026); [Refonte](https://www.refontelearning.com/blog/sdr-hiring-ai-native-companies-buck-slump)).
   - Counter-signal: Poyar's May 2026 post is subtitled "The companies selling AI are the ones doubling their SDR headcount" (subtitle only seen, **snippet only**).
   - A B2B reader who runs a sales team will know this pitch.
3. **The best ROI evidence points at cost, not revenue (MIT).** Sales and marketing already gets most AI budget and isn't yet showing returns. A CFO can bank cost savings with certainty; pipeline gains depend on demand (**inference**).
4. **Revenue is partly zero-sum.** More AI-driven outbound wins share from competitors, and it doesn't necessarily grow the market. If every firm's GTM engineer does the same, the advantage cancels out, and inboxes saturate. That's an **inference**; I found only unsourced vendor claims of falling reply rates, so nothing citable.
5. **The promise is cheap, and cuts happen anyway.**
   - Cuts are made in anticipation of AI (HBR), and AI is named or denied for PR reasons (Oxford, Amazon).
   - Mercer: 99% of leaders expect AI-driven reductions within two years.
   - A reader may say companies were never going to keep the promise, whoever does GTM.
6. **The team that "grows together" excludes the people who never get hired.** Entry-level employment in AI-exposed jobs fell 13 to 16% (Stanford). Contractors and outsourced staff take the cuts (Duolingo, Klarna, MIT).
7. **Self-interest.** A GTM engineer applying for a GTM engineering job argues that GTM engineers are the answer to AI's social question. The reader will see that straight away (**inference**).
8. **Scale of the claim.** "The biggest social question of the AI era" is a big frame. The evidence supports a narrower one: the revenue side is where AI's return must come from if headcount is to hold (**inference**).

**Gaps a sceptical reader would spot:**
- No firm-level evidence that GTM engineering grows headcount.
- No number for how much of an AI investment's ROI comes through pipeline.
- The examples are US big tech; there are none from European mid-market B2B.
- The revenue figures are self-reported and often vendor-made.

---

## Evidence gaps

- **Primary pages I couldn't open:** McKinsey State of AI 2025 (timed out twice), PwC CEO Survey release (403), the KPMG Pulse PDF (contested reading), HBR's article (figures via secondary coverage), and Challenger's July and August reports (one PDF unreadable). The figures from them are marked **snippet only** and should be checked before they're quoted.
- **Challenger's September and October 2026 reports** weren't found, so the latest AI-attributed total here runs through August.
- **No direct, quotable large-company pledge** that AI won't cut headcount. The "promise" exists as softer statements and survey intentions.
- **No independent study of the GTM engineer role's effect** on revenue or headcount. Every role-level figure is vendor data.
- **The SDR decline figures** (−21% postings, SaaStr's 36%) come via vendor blogs; I didn't reach Poyar's or SaaStr's primary posts.
- **Europe and Czechia:** no EU-specific data on AI layoffs or AI revenue gains was searched for or found. Every aggregate above is US or global.
- **The Harvard/INSEAD startup-headcount study** was seen only through a crypto news aggregator; its primary wasn't found.
- **Time-boxed:** about 15 minutes. No deep research, and no frameworks literature beyond what surfaced: Jevons-style rebound, task versus job automation, and the compensation effect appear only through Huang's and Bain's framings.

---

## Recommendations

Evidence, then options for Alex's talking points. Every call is Alex's. None of this is copy.

**R7-A. How strong to make the central claim.**
- *Evidence:* revenue-side AI has support (McKinsey, PwC, Bain), but "GTM engineers keep teams whole" has no independent evidence, and the vendor pitch runs the other way.
- *Options:*
  1. The strong claim, as dictated, with the counterarguments answered head-on.
  2. A conditional claim: the promise can only hold if AI's return comes from revenue, and pipeline is where that's engineered.
  3. Present it as an open challenge to employers, rather than a finding.

**R7-B. Which company example to lead with, if any.**
- *Evidence:*
  - IBM is the closest public match to the mechanism (cost saved, reinvested in sales), but rests on one CEO's word.
  - Salesforce shows both sides (support cut, sellers hired).
  - Klarna shows the cost-only route failing.
  - Walmart shows growth without hiring.
- *Options:* any one, a contrast pair (for example Klarna against IBM), or none.

**R7-C. How to handle MIT's "returns are in the back office".**
- *Evidence:* it's the study a sceptical reader is most likely to know, and it cuts against the revenue claim.
- *Options:*
  1. Raise it himself and give his reading of it. That the tools are bought, not engineered into the pipeline, is his argument, not MIT's finding.
  2. Leave it out. That risks a reader raising it.

**R7-D. How to handle "GTM automation replaces SDRs".**
- *Evidence:* vendor claims, plus a reported 21% fall in SDR postings, against Poyar's "AI sellers doubling SDR headcount".
- *Options:*
  1. Acknowledge it as a task shift, and say what he'd do with the freed people. Only he can say that from his own work.
  2. Narrow the claim to the company as a whole, not every role.
  3. Avoid headcount claims for sales roles.

**R7-E. The self-interest point.**
- *Evidence:* the reader is a prospective employer reading a GTM engineer's application.
- *Options:* name it openly, let the evidence carry it, or frame the article around the company's problem rather than the role.

**R7-F. Numbers on the page.**
- *Evidence:* most role-level figures are vendor data, and several key figures are snippet-only here.
- *Options:*
  1. Use only items 1 to 5 in section 4, which are the strongest sources.
  2. Use any, each labelled with source and date.
  3. Have S-D5 verify the snippet-only figures against the primaries before the post is published.

  Options 1 or 3 fit L-01-R2's warning that a mismatch between claim and proof is what experienced reviewers look for.

---

## Sources

Layoffs, commitments and labour-market data
- Challenger, Gray & Christmas, June 2026 report summary (1 Jul 2026): https://www.challengergray.com/?p=28455
- Challenger, Gray & Christmas, May 2026 report (PDF, snippet only): https://www.challengergray.com/wp-content/uploads/2026/06/Challenger-Report-May-2026.pdf
- Fortune, Oxford Economics on AI layoffs as "convenient corporate fiction" (7 Jan 2026): https://fortune.com/2026/01/07/ai-layoffs-convenient-corporate-fiction-true-false-oxford-economics-productivity/
- HBR, "Companies Are Laying Off Workers Because of AI's Potential—Not Its Performance" (early 2026): https://tagteam.harvard.edu/hub_feeds/924/feed_items/17213234
- NBER WP 34836, "Firm Data on AI" (Feb–Mar 2026): https://www.nber.org/papers/w34836 · The Register (18 Feb 2026): https://www.theregister.com/2026/02/18/ai_productivity_survey/
- Yale Budget Lab via Fortune (2 Feb 2026): https://fortune.com/2026/02/02/ai-labor-market-yale-budget-lab-ai-washing/
- Stanford Digital Economy Lab, "Canaries in the Coal Mine?" (Aug, rev. 13 Nov 2025): https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine/
- Axios on the KPMG CEO Pulse (10 Mar 2026): https://axios.com/2026/03/10/ai-jobs-hiring-ceo · KPMG: https://kpmg.com/us/en/articles/2026/ceo-pulse-gated.html
- Gizmodo on Mercer Global Talent Trends 2026: https://www.gizmodo.com/99-of-ceos-expect-ai-driven-layoffs-in-the-next-two-years-2000762994
- Chief Executive C-suite survey (2026): https://chiefexecutive.net/c-suite-survey-finds-ai-already-cutting-jobs-at-one-third-of-companies-even-as-hiring-rebounds/
- IBM: People Matters (May 2025): https://www.peoplematters.in/news/leadership/ibm-ceo-says-replacing-hr-staff-with-ai-led-to-more-hiring-45453 · Gigazine: https://gigazine.net/gsc_news/en/20250508-ibm-ceo-ai-replaced-workers
- Salesforce: The Register (2 Sep 2025): https://www.theregister.com/2025/09/02/salesforce_4000_jobs_ai · Storyboard18: https://www.storyboard18.com/brand-makers/salesforce-cuts-4000-support-roles-for-ai-but-plans-to-hire-5000-sales-staff-says-ceo-marc-benioff-82829.htm · UC Today: https://www.uctoday.com/ai/ai-agents-slash-4000-salesforce-jobs-months-after-ceo-downplays-ais-risks-on-jobs/
- Walmart: Fortune (27 Sep 2025): https://www.fortune.com/2025/09/27/ai-ceos-job-market-transformation-walmart-accenture-salesforce
- Amazon: PBS NewsHour (Oct 2025): https://www.pbs.org/newshour/economy/amazon-to-lay-off-14000-corporate-employees-as-spending-on-artificial-intelligence-accelerates · McGraw Hill blog (Mar 2026): https://www.mheducation.com/highered/blog/2026/03/amazon-layoffs-5-key-takeaways
- Klarna: Entrepreneur (May 2025): https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396 · tech.co: https://tech.co/news/klarna-reverses-ai-overhaul
- Duolingo: Computing (Apr 2025): https://www.computing.co.uk/news/2025/ai/duolingo-goes-ai-first-as-it-phases-out-human-contractors
- Shopify: Gigazine (9 Apr 2025): https://gigazine.net/gsc_news/en/20250409-shopify-ceo-ai-do-jobs
- Jensen Huang on CNN, via ABC7 (Jul 2025): https://abc7.com/post/ai-job-losses-nvidia-ceo-jensen-huang-says-artificial-intelligence-could-lead-layoffs-world-runs-ideas/17118672/

ROI studies
- MIT NANDA via Fortune/Yahoo (18 Aug 2025): https://finance.yahoo.com/news/mit-report-95-generative-ai-105412686.html · MediaPost: https://mediapost.com/publications/article/408575/95-of-companies-get-zero-roi-from-gai-initiatives.html
- McKinsey, "The state of AI in 2025" (Nov 2025; snippet only): https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai
- PwC 29th Global CEO Survey (Jan 2026): https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-global-ceo-survey.html · Management Today: https://www.managementtoday.co.uk/half-ceos-havent-realised-financial-benefits-ai-integrations/indepth/article/1945663
- Bain Technology Report 2025, sales chapter (23 Sep 2025): https://www.bain.com/insights/ai-transforming-productivity-sales-remains-new-frontier/

Revenue-side AI, GTM engineering and SDRs
- Salesforce State of Sales (vendor, 2024): https://salesforce.com/news/stories/sales-ai-statistics-2024
- Growth Unhinged, monday.com AI-native GTM (24 Jun 2026): https://www.growthunhinged.com/p/what-ai-native-gtm-looks-like-at-public-company-scale
- Growth Unhinged, "Do you need a GTM engineer?" (Sep 2025; snippet only): https://kylepoyar.substack.com/p/do-you-need-a-gtm-engineer
- Apollo, "The GTM engineer boom" (vendor; snippet only): https://www.apollo.io/magazine/the-gtm-engineer-boom-inside-the-fastest-growing-job-in-b2b-sales
- Factors.ai (vendor): https://www.factors.ai/blog/gtm-engineering-replacing-sdr-teams-ai-automation · Metaflow (vendor): https://metaflow.life/blog/gtm-engineering-replacing-sdr-teams-ai-automation
- Landbase (vendor, Apr 2026; snippet only): https://www.landbase.com/blog/death-of-bdr-role-ai-agents-sdr-hiring-2026 · Refonte (snippet only): https://www.refontelearning.com/blog/sdr-hiring-ai-native-companies-buck-slump
- AWS Global Startup Trends (Jun 2026): https://press.aboutamazon.com/2026/6/aws-global-startup-trends-report-reveals-ai-native-startups-are-reaching-billion-dollar-valuations-in-half-the-time
- KuCoin News on the Harvard/INSEAD startup study (snippet only): https://www.kucoin.com/news/flash/ai-native-startups-have-25-fewer-employees-than-traditional-firms-study-finds
- Tomasz Tunguz, "Are we seeing layoffs from AI?" (Feb 2026; snippet only): https://tomtunguz.com/are-we-seeing-layoffs-from-ai/index.md

Project
- `global\L-01-R2-gtm-engineer-hiring.md`: what a GTM engineer is, tool stacks, salaries, proof of work.
