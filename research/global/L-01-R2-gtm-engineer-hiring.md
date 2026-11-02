# R2: What a GTM engineer is hired to show

> "R2 What a GTM engineer is hired to show. What do agencies and B2B companies hiring GTM engineers in 2026 look for: skills, tool stacks, proof of work? Which of the ten deliverables map to that, and what does a hiring manager expect that none of them shows?"

2 Nov 2026
session s1-research subagent
item 2 of 7 on list L-01

Serves: the project's outcome ("demonstrates what a GTM engineer can do"); closest DoD-18 and DoD-19 (the site and its framing). Readers: every wave-2 spec.

---

## Method

- **When:** 2 Nov 2026, in the afternoon after L-01 started (14:40). About 30 web searches and 25 page fetches.
- **Tools:** WebSearch and WebFetch both worked. Some pages failed to fetch (404 or 429: a Sympower post, a SIG Partners post, an employbl mirror of a Clay post, an Exit Five article, an EZO post). Where a claim rests only on a search-result snippet and not on a page I fetched, it is marked **(snippet only)**.
- **What I searched:**
  1. Market analyses of GTM engineer job posts (Bloomberry, OnFire, RevGuild, a Clay community tally, Cargo through a secondary source).
  2. Hiring guides written by employers and recruiters (Clay, Databar, HeyReach with The Clay Headhunter, Apollo, Explorium).
  3. Actual 2025 and 2026 job posts: B2B SaaS (Vercel, Clay, Ignite) and agencies (Growth Today, AutomateDemand, Simon & Co, ProspectX, Client Growths, Hire Overseas), with weight on Europe-eligible posts.
  4. Practitioner writing on portfolios and proof of work (Clay community threads, Databar, Provn, the GTM Engineer School podcast).
- **Excluded by rule:** anything about Addvery, Addvery's own job posts, the `Addvery Research\` folder, the Apify proposal, and Alex's own GetSales account.
- **Source quality:** most quantitative sources are vendors with an interest in the topic (Clay, Databar, HeyReach, Apollo, Explorium, Vibe Prospecting, OnFire, Cargo). I treat their numbers as directional and give the range across sources rather than one figure. **Inference** is marked as inference.

---

## Verdict

1. **The core ask has converged; the details haven't.** Every source agrees on one centre of gravity. A GTM engineer builds and runs automated systems that find the right accounts and people, enrich them, personalise outreach and route leads, and **shows they work by walking someone through a real, running workflow**. The tools shift between employers. The ask that recurs is to show the workflow, explain the reasoning and give the result.
2. **D3 (GetSales outbound), D1 (scraping) and D9 (legibility analyzer) map most directly onto what employers ask for.** The project's agent layer maps too: multi-session Claude Code, CLAUDE.md context files and the answer desk as a human approval gate. It may be the strongest match to the fastest-growing 2026 ask (AI agents, Claude Code, context engineering), but it isn't a client-facing deliverable today. D4, D5 and D7 map partly, as "AI content engine" work that only a minority of posts ask for. D6 and D10 (Canva) match nothing I found in GTM engineer posts.
3. **Seven things a hiring manager expects that none of the ten deliverables shows:**
   - measured business outcomes
   - a CRM touchpoint and data hygiene
   - Clay, the single most-named tool
   - deliverability and sending safety
   - error handling and what happens when something breaks
   - a decision trail with trade-offs
   - signal and intent triggers or inbound routing

   Some of these can be shown honestly within the charter's no-real-data rule. Others can't, and the site would have to say so.

---

## Q1. What do agencies and B2B companies hiring GTM engineers in 2026 look for?

### 1a. Is there a converged answer? Partly yes.

**Responsibilities (converged).** Bloomberry ran an LLM over job posts (published Oct 2025, updated Jan 2026) and ranked duties. The top three were building and automating GTM workflows, integrating the GTM tool stack, and owning or optimising the CRM. GTM roles lean towards outbound and prospecting, where RevOps leans towards forecasting ([Bloomberry](https://bloomberry.com/blog/i-analyzed-1000-gtm-engineering-jobs-here-is-what-i-learned/)). RevGuild independently describes "a build-and-operate role sitting inside the go-to-market motion, not alongside it." It lists the day job as Clay enrichment and outbound workflows, HubSpot or Salesforce automation, SQL, and QA of pipelines ([RevGuild, Jul 2026](https://revguild.org/blog/gtm-engineer-salary-market-report-2026/)).

**Tools (converged on a cluster, not on one tool).**

| Tool or skill | Share of GTM engineer posts | Source |
| --- | --- | --- |
| Clay | 62% (2,930 posts, Jun to Nov 2025); 66% (209 posts, 2026); "most popular" (Bloomberry) | [Clay community tally](https://community.clay.com/x/content-and-events/msg_iI3K8n3m1QVY/comprehensive-gtm-engineer-market-analysis-2930-jo), [OnFire](https://www.onfire.ai/blog/gtm-engineering-data), [Bloomberry](https://bloomberry.com/blog/i-analyzed-1000-gtm-engineering-jobs-here-is-what-i-learned/) |
| AI, LLMs or agents | 95% (OnFire); 70% LLM or agent workflows (Cargo, **snippet only**) | [OnFire](https://www.onfire.ai/blog/gtm-engineering-data), [Fueler citing Cargo](https://fueler.io/blog/gtm-engineer-salary-in-india-fresher-to-senior-plus-remote-us-pay) |
| HubSpot | 50 to 52% | OnFire, Bloomberry |
| Salesforce | 45 to 48% | OnFire, Bloomberry |
| Outreach (sequencer) | 49% | Bloomberry |
| SQL / Python / JS | 38% SQL and 38% Python (Bloomberry); 56% any of the three (OnFire) | Bloomberry, OnFire |
| APIs | 59% (Cargo, **snippet only**) | Fueler citing Cargo |
| Claude | 40 to 45% (OnFire's body and FAQ disagree) | OnFire |
| n8n | 28% (Bloomberry); 41% (OnFire) | Bloomberry, OnFire |
| Zapier | 39 to 40% | Bloomberry, OnFire |
| Apollo | 29% | Bloomberry |

Average posts name about 6 tools, and only 3 of OnFire's 209 posts named Clay alone ([OnFire](https://www.onfire.ai/blog/gtm-engineering-data)). Among companies hiring GTM engineers, 43% use a website visitor identification tool and 35% use intent or signal platforms ([Bloomberry](https://bloomberry.com/blog/i-analyzed-1000-gtm-engineering-jobs-here-is-what-i-learned/)).

**Traits (converged).** Clay's own hiring guide describes the best candidates as hybrids, "part commercial thinker, part builder." It names tinkering, commercial bias and comfort with ambiguity as the signals, and treats tools like Clay, n8n or SQL as nice-to-haves ([Clay, Apr 2026](https://www.clay.com/blog/how-to-hire-a-gtm-engineer)). Databar names four skills: data fluency, context and prompt engineering ("writes clear CLAUDE.md files"), integration thinking, and writing ("Most GTM work is words, not code") ([Databar, 2026](https://databar.ai/blog/article/how-to-hire-a-gtm-engineer)). Apollo screens for someone who can "describe a revenue system they built, not just operated" ([Apollo, Apr 2026](https://www.apollo.io/insights/how-do-i-hire-and-onboard-a-gtm-engineer-at-a-series-b-or-c-company)).

**Proof of work (converged on format).** Across hiring guides and actual posts, the recurring proof is **a short recorded walkthrough of a workflow you built**, plus the ability to defend it live:

- Agencies ask for it explicitly. Simon & Co wants "a personal Loom video showing a Clay and/or n8n workflow you've built" ([Dec 2025](https://community.clay.com/x/share-jobs/t8fk48fpocrg/hiring-gtm-engineer-for-automation-agency-remote-o)). AutomateDemand (DACH) asks for "a video of your favorite workflow" ([Jun 2026](https://community.clay.com/x/share-jobs/msg_q6W7ilgvMyOq/hiring-go-to-market-engineer-in-germanydach-region)).
- Hire Overseas requires a 1 to 2 minute Loom covering "the tools used, the problem it solved, and the outcome": "Only candidates who submit a Loom video will be moved to the next step" ([Workable](https://jobs.workable.com/jobs/3313239d-fbe2-48df-bcff-3c254c906609.md)). A second Hire Overseas post requires a portfolio, a Loom and a Clay certification ([Workable](https://jobs.workable.com/jobs/ab720e97-d4ba-436d-878c-619bee975e8c.md)).
- Hiring guides converge on the same format. HeyReach's guide (co-written with The Clay Headhunter) starts with "Ask them to show you a previous workflow" ([HeyReach, Mar 2026](https://www.heyreach.io/blog/how-to-hire-gtm-engineer)). Databar's screen asks about "a context file they've used in production" and a campaign built end to end, "including the tools used and what broke" ([Databar](https://databar.ai/blog/article/how-to-hire-a-gtm-engineer)).
- Take-homes test the same loop. Databar's sample gives 50 ICP companies and asks for a context file, enriched contacts, fit scoring, and a brief on who to contact first and why. Clay lists a 60-minute outbound campaign build ([Clay](https://www.clay.com/blog/how-to-hire-a-gtm-engineer)). Apollo puts a 90-minute live build in the loop ([Apollo](https://www.apollo.io/insights/how-do-i-hire-and-onboard-a-gtm-engineer-at-a-series-b-or-c-company)).
- Credentials matter little. RevGuild finds Clay certifications in 2.7% of practitioner profiles: "credentials are a nice-to-have, not a gate" ([RevGuild](https://revguild.org/blog/gtm-engineer-salary-market-report-2026/)).

**Agencies and B2B companies want different things (converged enough to act on).** These are two different buyers:

| | Agencies (outbound, Clay, cold-email shops) | B2B SaaS in-house |
| --- | --- | --- |
| Core job | Build and launch campaigns end to end for clients: "list building, enrichment, messaging, and launch" ([Growth Today](https://community.clay.com/x/share-jobs/9is5k0h0y5pt/hiring-gtm-engineer-at-growth-today-for-remote-eu)) | Own the revenue system: CRM, scoring, routing, funnel instrumentation, internal AI tools ([Clay's GTM Engineer, Marketing post](https://www.choppingblock.ai/jobs/gtm-engineer-marketing-at-clay)) |
| Typical stack | Clay, Claude Code, Instantly, HeyReach, Smartlead, LinkedIn Sales Navigator | HubSpot or Salesforce, SQL, Python or TypeScript, warehouse or BI, Clay preferred |
| Client-facing | Often explicit: "comfortable working directly with clients" (Growth Today, AutomateDemand) | Internal stakeholders: Demand Gen, SDRs, Sales |
| Experience asked | 1 to 3 years, or SDR/BDR/AE experience as a substitute | 4+ years on average ([Bloomberry](https://bloomberry.com/blog/i-analyzed-1000-gtm-engineering-jobs-here-is-what-i-learned/)); 6 to 10 years for Clay's marketing role |
| Proof asked | Loom of a workflow, sometimes a practical test ([ProspectX](https://community.clay.com/x/share-jobs/msg_R6Ygg7rRLhNJ/join-prospectx-now-hiring-world-class-gtm-engineer)) | Interview loop, take-home and live build; Vercel's software-engineer variant requires having "shipped a Next.js app to production with users" ([Vercel](https://vercel.com/careers/gtm-engineer-6225825004)) |
| Pay signal | ~€60K OTE in DACH (AutomateDemand); trial months and revenue share at small shops ([Client Growths](https://community.clay.com/x/share-jobs/msg_KPPhkBk0gCGc/hiring-a-remote-full-time-gtm-engineer-at-client-g)) | US medians $113K entry to $225K leader ([RevGuild](https://revguild.org/blog/gtm-engineer-salary-market-report-2026/)); EU example up to €70K base, €90K OTE ([Ignite, archived](https://www.remotely.de/job/ignite-gtm-engineer-fully-remote)) |

Per Kyle Poyar, as cited by OnFire, 45% of GTM engineers work in an agency or consulting capacity ([OnFire](https://www.onfire.ai/blog/gtm-engineering-data)). That matters because Alex is weighing freelance against employment.

**Claude Code is rising fast in 2026 posts.** Client Growths built its whole lead engine in Claude Code and requires it ([Oct 2026](https://community.clay.com/x/share-jobs/msg_KPPhkBk0gCGc/hiring-a-remote-full-time-gtm-engineer-at-client-g)). AutomateDemand lists it next to Clay. A ColdIQ Head of GTM Engineering listing calls Claude Code experience "non-negotiable" (aggregator, **snippet only**: [PitchMeAI](https://pitchmeai.com/jobs/coldiq/head-of-gtm-engineering-ci0xn8asfl)). Explorium recommends oversight for revenue-touching agent actions: "approval gates and escalation paths" ([Explorium, Sep 2026](https://www.explorium.ai/blog/data-for-gtm/gtm-engineer-salary-and-scope-2026-benchmarks-for-gtm-leaders/)). A vendor claim that Claude Code mentions rose 340% year on year is unverified.

### 1b. Traps and gotchas

1. **One title, two jobs.** Several sources split the role into a "pipeline half" (outbound agents, sequences, routing) and a "data half" (entity resolution, CRM architecture). The two pay and hire very differently ([Vibe Prospecting, Sep 2026](https://www.vibeprospecting.ai/blog/gtm-engineer-pay-2026-two-jobs-one-title); [Explorium](https://www.explorium.ai/blog/data-for-gtm/gtm-engineer-salary-and-scope-2026-benchmarks-for-gtm-leaders/), quoting Noah Adelstein: "It's two roles, not one"). A third variant is a full-stack software engineer on a GTM team ([Vercel](https://vercel.com/careers/gtm-engineer-6225825004)). A demo pitched at "GTM engineer" in general can miss whichever variant the reader is hiring for.
2. **Tool-first framing is itself a red flag.** HeyReach's top red flag is "tool-first vocabulary" ("tools are commodities") ([HeyReach](https://www.heyreach.io/blog/how-to-hire-gtm-engineer)). Databar's portfolio guide says "Don't organize your portfolio around the tools you used" ([Databar](https://databar.ai/blog/article/how-to-build-a-gtm-engineering-portfolio-that-gets-you-hired)). A site that leads with logos and tool names reads as junior, even when the tools are the right ones (inference from these two sources).
3. **Impressive is not the same as effective.** Patrick Spychalski (The Kiln, ex-Clay): "You're not getting hired to build crazy workflows that people think are cool" ([GTM Engineer School E6, Sep 2025](https://gtmengineerschool.substack.com/p/e6-clients-dont-pay-for-crazy-they)). Clay and Apollo both list over-engineering as a red flag, and Apollo says "The best GTM Engineers collapse workflows, not expand them." Ten deliverables in 12 hours risks reading as breadth for its own sake. This overlaps with R1 and R4.
4. **Seniority bar.** The Cargo sample (via Fueler, **snippet only**) is 75% mid-level, 20% senior and under 3% junior. The average post asks for 4.11 years ([Bloomberry](https://bloomberry.com/blog/i-analyzed-1000-gtm-engineering-jobs-here-is-what-i-learned/)). Practitioners mostly come from SDR/BDR and RevOps, and the marketing or growth path is "less common" (Bloomberry; RevGuild finds 20.5% from sales and 20.5% from growth). A career-switcher without the title has to make up for it with proof. In the community's words: posts describe an "extreme ideal candidate", and practitioners say mindset and evidence of systems thinking count more than tenure ([Clay community thread, Mar 2026](https://community.clay.com/x/gtm-career-advice/msg_mMpR0YwvTDPd/challenges-for-gtm-engineers-with-1-years-experien)).
5. **The statistics are vendor-made and inconsistent.** Clay's share is 62%, 66%, or an unverified "84% of GTM engineers, 96% of agencies" attributed to a State of GTM Engineering report I could not open (**snippet only**, [Understory](https://understoryagency.com/blog/best-gtm-engineering-agencies)). OnFire contradicts itself on Claude (40% or 45%). Use ranges, never one figure, if the site quotes any number.
6. **Selection bias in agency evidence.** Most agency posts I found sit on Clay's own community board, so they over-represent Clay. I found no systematic split of agency against SaaS posts.
7. **European specifics.** Several EU agency and SaaS posts require German at B2 to C1 (AutomateDemand, Ignite). I found no Czech or CEE-specific posts. Remote EU roles within CEST ±2 hours exist.

### 1c. What would change the planned approach

- If the target role is the **agency type** (campaign delivery, client-facing), the ask is concrete and the project already matches its shape: a workflow walkthrough video, end-to-end campaign build, and LinkedIn plus email outbound. The **in-house SaaS type** puts more weight on CRM, SQL, scoring and routing, which the plan barely touches. Which type the target is depends on Alex's own Addvery research, not this report.
- If the 2026 Claude Code trend holds, the project's **orchestration layer** is evidence employers are now asking for by name, and it is currently invisible to a visitor. See Q2.

---

## Q2. Which of the ten deliverables map to that?

### 2a. Is there an easy answer? Yes for most rows; the ratings are inference.

The "Strength" column is my **inference**, made by comparing each deliverable's charter description with the employer evidence above. It is not measured.

| ID | Deliverable (charter) | Skills employers ask for that it can show | Employer evidence | Strength | Gap inside this row |
| --- | --- | --- | --- | --- | --- |
| D1 | Scraping research demo on the Apify API | List building, web scraping and research, APIs, data structuring; the "data half" | Top duty "integrating GTM tech stack" (Bloomberry); APIs in 59% of posts (Cargo, **snippet only**); Claygent-style web research ([Hire Overseas](https://jobs.workable.com/jobs/ab720e97-d4ba-436d-878c-619bee975e8c.md)); Apify named in at least one Clay community post (**snippet only**, [AI venture studio](https://community.clay.com/x/share-jobs/msg_mJ6TaGUHInzO/hiring-remote-gtm-engineers-for-ai-venture-studio)) | Strong | No dedupe or normalisation shown unless made visible; no Clay |
| D2 | Company and stakeholder research | Account research, persona and buying-committee mapping, ABM, commercial judgment ("who to contact first and why") | Databar take-home ([Databar](https://databar.ai/blog/article/how-to-hire-a-gtm-engineer)); "systems for outbound, ABM" (Growth Today, AutomateDemand) | Strong as thinking, but operator-owned and only visible through D8's stakeholder sections | Method may not be visible to a visitor |
| D3 | GetSales outbound demo: 10 ICPs, drip sequences, routing classifier, Sales Navigator to CSV to enrichment to computed variable to import; live run on six; video | ICP segmentation, sequencing, routing, enrichment, AI personalisation variables, LinkedIn outbound; the "pipeline half" | Top-ranked duties (Bloomberry); "list building, enrichment, messaging, and launch" (Growth Today); HeyReach and Sales Navigator in agency stacks (AutomateDemand, Hire Overseas); the **video format matches the Loom ask** (Simon & Co, AutomateDemand, Hire Overseas) | Strongest | No outcome metric (six leads is not a sample); no CRM write; no deliverability or sending-limit story; classifier logic needs to be visible |
| D4 | Blog pipeline (dictation to near-final post) | AI workflow design, prompt and context engineering, content engine | Content-engine duties appear in a minority of GTM engineer posts, mostly at AI-native firms (**snippet only**: [Built In post](https://builtin.com/job/gtm-engineer/7107572), EZO "AI GTM Engineer", Growth Today "Content Engine") | Partial | Reads as content marketing unless framed as a pipeline (input, prompts, checks, output) |
| D5 | Three blog articles through D4 | Writing; explaining technical work in public | "Writing" is one of Databar's four skills; Vercel prefers "Published blogs or videos explaining technical concepts" ([Vercel](https://vercel.com/careers/gtm-engineer-6225825004)) | Partial; stronger if the posts are about the GTM work itself (inference) | None as engineering proof on their own |
| D6 | Canva LinkedIn templates | Brand-consistent asset systems | None found. No GTM engineer post I read mentions Canva or graphic design; design tools appear only for diagramming workflows (Miro, Lucidchart, Figma: [HeyReach](https://www.heyreach.io/blog/how-to-hire-gtm-engineer)) | Weak for this role | Shows a marketer's skill, not a GTM engineer's (inference) |
| D7 | LinkedIn content demo in Addvery's voice, on the brand capture repo | Context engineering (voice as a reusable context file); AI content workflow | Databar's "context and prompt engineering" and its screen on "a context file used in production" | Partial; stronger if the capture is shown as a context system (inference) | Same content-marketing reading risk as D4 |
| D8 | Website with stakeholder sections and a deliverables view | Shipping a production web app; packaging proof ("demo path", "project card"); personalised pages at scale | Vercel's Next.js production requirement; portfolio sites recommended ([Databar portfolio](https://databar.ai/blog/article/how-to-build-a-gtm-engineering-portfolio-that-gets-you-hired)); Provn's "project card readable in about 90 seconds" ([Provn, Jun 2026](https://provn.co/blog/2026/06/proof-work-portfolio-checklist)) | Strong as the container; partial as a skill in itself | None, if it carries the framing described in the Recommendations |
| D9 | Legibility analyzer: rig clips to build requests to the website session | Agentic workflow with a feedback loop, orchestration between agents, automation that runs without the operator | AI or agents in 70 to 95% of posts; Claude Code required at Client Growths and AutomateDemand; "builds systems that function without them" (HeyReach) | Strong, if a visitor can see it | Invisible by default: it works behind the site |
| D10 | Canva design video | Video walkthrough format | Format matches the Loom ask; the content (design) doesn't match any GTM engineer ask found | Weak for this role | Same as D6 |
| (M0 to M2) | The meta layer: multi-session Claude Code orchestration, CLAUDE.md reading lists, answer desk, decision logs | Context engineering, agent orchestration, human approval gates on AI actions, documentation | "Writes clear CLAUDE.md files" (Databar); "approval gates and escalation paths" (Explorium); "catch AI errors before they reach prospects" (Apollo) | Strong match (inference), but not a client-facing deliverable | Not on the site unless someone puts it there |

### 2b. Traps and gotchas

- **The deliverables lean towards marketing.** Five of ten (D4, D5, D6, D7, D10) are content or design. Employers' asks lean towards systems, data and outbound. For a reader hiring a GTM engineer, a site where half the demos are content and Canva may read as "marketer who automates", which the evidence suggests is the less common and lower-paid profile (Bloomberry; the Clay community tally's "tool operators at $60 to 90K versus system architects at $100 to 160K", one author's figures). This is **inference**. It flips if the target company's real need is content-heavy, and only Alex's Addvery research can answer that.
- **The strongest proof is the least visible.** D9 and the meta layer show exactly what 2026 posts ask for by name (Claude Code, agents, context files, approval gates). Both run behind the scenes.
- **A video alone isn't a walkthrough.** The Loom ask always covers the same four beats: "the tools used, the problem it solved, and the outcome" (Hire Overseas), plus what broke (Databar). A clip of screens without those beats doesn't meet the ask (inference).

### 2c. What would change the planned approach

- The deliverables view (DoD-19) could carry a short "what this shows" line for each deliverable, phrased as a problem solved rather than a tool used. That framing is what the portfolio sources recommend (Databar, Provn).
- D9 and the meta layer could become a visible section ("how this site built itself"). That would change nothing in the build, only what the site says about it. Whether to do it is Alex's call; see the options.

---

## Q3. What does a hiring manager expect that none of the deliverables shows?

### 3a. Converged answer: yes, on most items

Each item below appears in several independent sources. "Fixable within the charter" is **inference**.

1. **Measured business outcomes.** "Every project description should start with the problem you solved and the results you achieved" ([Databar portfolio](https://databar.ai/blog/article/how-to-build-a-gtm-engineering-portfolio-that-gets-you-hired)). Explorium wants pipeline metrics "tied to revenue, not activity volume." Clay's own customer stories lead with numbers. The charter rules out real data, and six live leads are not a sample. *Fixable within the charter:* partly. The site can show build metrics (time from dictation to post, cost per enriched record, coverage) and labelled benchmarks. Databar accepts "realistic simulations or industry benchmarks", and Provn says "If no metric exists, say why."
2. **A CRM touchpoint and data hygiene.** HubSpot and Salesforce appear in about half of all posts. CRM ownership is a top-three duty (Bloomberry), and agency posts ask for "clean field mapping" into Salesforce or HubSpot (Hire Overseas). No deliverable writes to a CRM. A Clay community practitioner suggests a free HubSpot account and a CSV import is enough for a portfolio ([thread, Aug 2026](https://community.clay.com/x/general/msg_TvgEMYnqrGak/do-gtm-engineer-portfolios-need-full-clay-integrat)). *Fixable:* yes, cheaply (inference).
3. **Clay.** It is named in 62 to 66% of posts and appears in more than 90% of practitioner profiles (Bloomberry). The plan's stack (Apify, GetSales, Canva) doesn't include it. *Counter-evidence:* Clay's own guide calls it a nice-to-have, and "a Claygent research workflow is way more impressive in a portfolio than a basic HubSpot sync" (same thread). The point is the enrichment and research pattern, not the brand. *Fixable:* by naming the equivalent pattern, or by adding a small Clay table. Both are options, not findings.
4. **Deliverability and sending safety.** HeyReach's third red flag is not asking about domain reputation or CRM health. Its interview prompt: "Should we buy 50 domains on GoDaddy and start sending tomorrow?" Agency posts require deliverability knowledge (Client Growths). Posts measure success by "no deliverability incidents" (Smart Working, **snippet only**, [Lever](https://jobs.lever.co/smart-working-solutions/0fffe190-c1ec-4748-9589-5f87a08259d2)). *Fixable:* yes. The charter already forbids sending outside the live run, and the site could present that, plus LinkedIn sender limits, as a deliberate safety design (inference).
5. **Error handling: what happens when it breaks.** HeyReach's fourth red flag: "What happens on a 429?" A blank stare is the red flag; retries, alerts and fallbacks are the good answer. Databar asks for "what broke." *Fixable:* yes, as a note or failure log for each deliverable (inference).
6. **A decision trail with trade-offs.** "Companies do not only hire output. They hire judgment under constraints" ([Provn](https://provn.co/blog/2026/06/proof-work-portfolio-checklist)). Clay's take-home rewards candidates who "state their assumptions and fallback logic." Databar's live session "pushes on choices." The project already keeps decision logs under P5, but they're not on the site. *Fixable:* yes, by surfacing a curated slice. DoD-22 limits what is safe to publish.
7. **Signal and intent triggers, inbound routing, scoring.** 43% of hiring companies use visitor identification tools and 35% use intent platforms (Bloomberry). Clay's marketing GTM role is built around scoring, intent detection, inbound routing and speed-to-lead. Ignite's role centres on "buying triggers." D3's classifier routes leads to sequences, but nothing is triggered by a signal. *Fixable:* partly. D3's classifier could be explained as routing logic. A signal-triggered demo would be new scope (inference).

Smaller gaps, each in one or two sources:

- **Code and SQL as visible skills.** 38 to 56% of posts ask for them. D1 and D8 involve code, but nothing on the plan foregrounds it.
- **Cost and credit efficiency.** Hire Overseas asks for "credit optimization"; Spychalski describes cutting a client's cost from about 60K to 7 to 10K; HeyReach suggests sizing enrichment spend to deal value.
- **A live build under questioning.** Apollo and Databar both put one in the loop. The hackathon recordings partly stand in for this, because they show real building, unscripted (inference).
- **Disclosure of how AI was used.** "AI-assisted work needs disclosure at the workflow level": tools used, AI-generated parts, human edits, verification ([Provn](https://provn.co/blog/2026/06/proof-work-portfolio-checklist)).

### 3b. Traps and gotchas

- **Filling every gap in an 11-hour build is the over-engineering trap** that Clay, Apollo and Spychalski all warn about. The evidence favours a few well-explained workflows over full coverage: "3 to 5 high-quality projects" ([Databar portfolio](https://databar.ai/blog/article/how-to-build-a-gtm-engineering-portfolio-that-gets-you-hired)).
- **Fake metrics are worse than none.** Provn: "The experienced reviewer looks for mismatch" between claims and proof. Any projected number has to be labelled as a projection.
- **Publishing the decision trail runs into DoD-22.** The decision logs may mention the Apify proposal, Alex's own GetSales outbound or internal paths. Any surfacing needs the same screen check as the videos.

### 3c. What would change the planned approach

- Items 4, 5 and 6 cost mostly words, not builds. They can be added to existing sections (inference).
- Items 2 and 3 need new build time. Item 7 is new scope. Each is a trade against the existing ten deliverables.

---

## Evidence gaps

- **No primary access to the State of GTM Engineering report** (Maja Voje and collaborators, 2026 or 2027 editions). Its widely repeated figures (84% Clay use, 96% among agencies, "2.4x pipeline velocity") are unverified. I didn't use them as findings.
- **Kyle Poyar's "Do you need a GTM engineer?"** (Growth Unhinged, Sep 2025) is paywalled. His agency share (45%) is cited second-hand through OnFire.
- **Few first-person hiring-manager posts.** LinkedIn posts aren't reachable with these tools, so the "hiring manager" view comes mainly from vendor and recruiter guides and Clay community threads.
- **No systematic agency vs SaaS split.** The agency picture rests on about eight individual posts, most from Clay's community board.
- **Europe is thin and CEE is absent.** I found a handful of DACH and EU-remote posts and nothing for Prague or the Czech Republic.
- **No evidence on how hiring managers react to content or design deliverables from a GTM engineer candidate.** The "reads as a marketer" point is inference.
- **Joe Rhew's 9-domain taxonomy** of GTM engineer roles, which a Clay community thread says was built from about 5,000 posts, was mentioned but not found.
- **Date noise.** Some pages show different publish dates in the byline and in their metadata (both Databar articles). Bloomberry's analysis exists in several versions with different windows. I used each page's byline date.
- **The target role's archetype is unknown to this report** by rule. Which column of the agency vs SaaS table applies depends on Alex's Addvery research.

---

## Recommendations

Evidence first, then options. Every call is Alex's. Rough effort is my estimate (inference).

**R2-A. Frame each deliverable as a workflow walkthrough, not a tool demo.**
- *Evidence:* the Loom ask is the most concrete proof format in agency posts, with four beats: problem, tools, outcome, what broke. Tool-first framing is a red flag.
- *Options:*
  1. A four-line "problem, how, result, what broke" card on each deliverable in the deliverables view (DoD-19). Low effort, mostly S-D8 copy.
  2. Option 1, plus a 1 to 2 minute narrated walkthrough for D1, D3 and D9 only. Medium effort; the narration needs Alex's voice.
  3. Leave framing as planned.

**R2-B. Decide whether the orchestration layer (D9 and M0 to M2) becomes visible on the site.**
- *Evidence:* Claude Code, context files and approval gates are named asks in 2026 posts (Databar, Explorium, Client Growths, AutomateDemand). Today they are invisible.
- *Options:*
  1. A "how this site built itself" section with a diagram of the sessions, the answer desk as human approval gate, and D9's build-request loop. Medium effort for S-D8 and S-D9, plus a DoD-22 screen check.
  2. Add it as an eleventh deliverable through M2's `add-deliverable` (DoD-6). Higher effort, and it changes the outline.
  3. Keep it off the site and mention it only in the outreach message.

**R2-C. Choose how to handle the "no outcome metrics" gap.**
- *Evidence:* every portfolio source leads with results; the charter forbids real data.
- *Options:*
  1. Show build metrics only (time, steps automated, cost per record), labelled as such.
  2. Option 1, plus labelled industry benchmarks ("a sequence like this typically sees X; source").
  3. State on the site that the demos run without real data by design, and why (Provn: "If no metric exists, say why").

  These can be combined.

**R2-D. Decide whether to close the CRM and Clay gaps.**
- *Evidence:* HubSpot or Salesforce appear in about half of posts; Clay in about two-thirds. Both are absent from the plan. Practitioners say a free HubSpot plus CSV import is enough for a portfolio, and that the enrichment pattern matters more than the brand.
- *Options:*
  1. Add a CRM write step to D3's pipeline description or demo (free HubSpot).
  2. Name D1 plus D3's enrichment as the same pattern a Clay waterfall implements, without adding Clay.
  3. Add a small Clay table to D1 or D3.
  4. Do nothing and accept the gap.

  Options 1 and 3 cost build hours from the 11 left.

**R2-E. Turn safety rules into visible proof.**
- *Evidence:* deliverability and sending safety, error handling and AI approval gates are recurring red-flag tests.
- *Options:* a short "guardrails" note on D3 covering:
  - no automation sends outside the live run (already a charter rule)
  - LinkedIn sender limits respected
  - human approval before any message

  Plus a "what broke and how it was handled" line per deliverable. Low effort, but each note needs a DoD-22 screen check.

**R2-F. Decide how much weight the content and design deliverables carry in the site's framing.**
- *Evidence:* D4 to D7 and D10 map weakly or partly to GTM engineer asks. A content-engine variant of the role exists in a minority of posts.
- *Options:*
  1. Keep all ten equal.
  2. Order the site so the systems demos (D3, D1, D9) lead, with content demos framed as an "AI content pipeline".
  3. Reframe D7 as "brand voice as a reusable context file" and D4 as "a pipeline with checks".
  4. Weight content higher, if Alex's Addvery research says their need is content-heavy.

  Which applies depends on research this report doesn't have.

**R2-G. Match the pitch to the employer type.**
- *Evidence:* agencies and in-house SaaS ask for different things (table in Q1).
- *Options:* Alex states which type the target is (agency or SaaS, pipeline half or data half), and S-D8 tunes the site's headline and deliverable order to it.

---

## Sources

Market analyses
- Bloomberry, "I analyzed 1,000 GTM engineering jobs" (Oct 2025, updated 25 Jan 2026): https://bloomberry.com/blog/i-analyzed-1000-gtm-engineering-jobs-here-is-what-i-learned/
- OnFire, GTM engineering data (2026; 209 posts): https://www.onfire.ai/blog/gtm-engineering-data
- RevGuild Research, "GTM Engineer Salary & Market Report 2026" (17 Jul 2026, updated 21 Aug 2026): https://revguild.org/blog/gtm-engineer-salary-market-report-2026/
- Bharat D., "Comprehensive GTM Engineer Market Analysis: 2,930 Jobs Reviewed", Clay community (18 Nov 2025): https://community.clay.com/x/content-and-events/msg_iI3K8n3m1QVY/comprehensive-gtm-engineer-market-analysis-2930-jo
- Fueler, citing Cargo's review of 1,350 posts (Apr to Jul 2026) (**snippet only**): https://fueler.io/blog/gtm-engineer-salary-in-india-fresher-to-senior-plus-remote-us-pay
- Understory, citing the 2026 State of GTM Engineering report (**snippet only, unverified**): https://understoryagency.com/blog/best-gtm-engineering-agencies

Hiring guides and practitioner writing
- Clay, "How to Hire a GTM Engineer" (14 Apr 2026): https://www.clay.com/blog/how-to-hire-a-gtm-engineer
- Databar (Jan Berning), "How to Hire a GTM Engineer in 2026": https://databar.ai/blog/article/how-to-hire-a-gtm-engineer
- Databar, "How to Build a GTM Engineering Portfolio That Gets You Hired": https://databar.ai/blog/article/how-to-build-a-gtm-engineering-portfolio-that-gets-you-hired
- HeyReach (Tim Yakubson, Noëmie Jacquemin), "How to hire a GTM engineer in 2026" (26 Mar 2026): https://www.heyreach.io/blog/how-to-hire-gtm-engineer
- Apollo, "How to Hire and Onboard a GTM Engineer at a Series B or C Company" (6 Apr 2026): https://www.apollo.io/insights/how-do-i-hire-and-onboard-a-gtm-engineer-at-a-series-b-or-c-company
- Explorium, "GTM Engineer Salary and Scope: 2026 Benchmarks" (7 Sep 2026): https://www.explorium.ai/blog/data-for-gtm/gtm-engineer-salary-and-scope-2026-benchmarks-for-gtm-leaders/
- Vibe Prospecting, "GTM engineer pay 2026: two jobs, one title" (7 Sep 2026): https://www.vibeprospecting.ai/blog/gtm-engineer-pay-2026-two-jobs-one-title
- Provn, "Proof of Work Portfolio for Builders: 2026 Checklist" (3 Jun 2026): https://provn.co/blog/2026/06/proof-work-portfolio-checklist
- GTM Engineer School E6 with Patrick Spychalski, "Clients don't pay for crazy, they pay for effective" (17 Sep 2025): https://gtmengineerschool.substack.com/p/e6-clients-dont-pay-for-crazy-they
- Clay community, "Do GTM engineer portfolios need full Clay integration?" (12 Aug 2026): https://community.clay.com/x/general/msg_TvgEMYnqrGak/do-gtm-engineer-portfolios-need-full-clay-integrat
- Clay community, "Challenges for GTM engineers with 1+ years experience" (6 Mar 2026): https://community.clay.com/x/gtm-career-advice/msg_mMpR0YwvTDPd/challenges-for-gtm-engineers-with-1-years-experien

Job posts, B2B SaaS
- Vercel, GTM Engineer (Field Engineering): https://vercel.com/careers/gtm-engineer-6225825004
- Clay, GTM Engineer, Marketing (posted 12 Oct 2026, via aggregator): https://www.choppingblock.ai/jobs/gtm-engineer-marketing-at-clay
- Ignite, GTM Engineer, EU remote (archived): https://www.remotely.de/job/ignite-gtm-engineer-fully-remote
- Built In, GTM Engineer with content-engine duties (**snippet only**): https://builtin.com/job/gtm-engineer/7107572
- Built In Austin, GTM Engineer, AI Platforms, portfolio mention (**snippet only**): https://www.builtinaustin.com/job/gtm-engineer-ai-platforms/6481369

Job posts, agencies
- Simon & Co automation agency, Clay community (9 Dec 2025): https://community.clay.com/x/share-jobs/t8fk48fpocrg/hiring-gtm-engineer-for-automation-agency-remote-o
- Growth Today, Clay community (11 Mar 2026): https://community.clay.com/x/share-jobs/9is5k0h0y5pt/hiring-gtm-engineer-at-growth-today-for-remote-eu
- AutomateDemand, DACH, Clay community (30 Jun 2026): https://community.clay.com/x/share-jobs/msg_q6W7ilgvMyOq/hiring-go-to-market-engineer-in-germanydach-region
- ProspectX, Clay community (22 Oct 2025): https://community.clay.com/x/share-jobs/msg_R6Ygg7rRLhNJ/join-prospectx-now-hiring-world-class-gtm-engineer
- Client Growths, Clay community (21 Oct 2026): https://community.clay.com/x/share-jobs/msg_KPPhkBk0gCGc/hiring-a-remote-full-time-gtm-engineer-at-client-g
- Hire Overseas, GTM Engineer (n8n, Loom required), Workable: https://jobs.workable.com/jobs/3313239d-fbe2-48df-bcff-3c254c906609.md
- Hire Overseas, GTM Engineer (Clay & Claude; portfolio, Loom and Clay certification required), Workable: https://jobs.workable.com/jobs/ab720e97-d4ba-436d-878c-619bee975e8c.md
- ColdIQ, Head of GTM Engineering, via PitchMeAI (**snippet only**): https://pitchmeai.com/jobs/coldiq/head-of-gtm-engineering-ci0xn8asfl
- AI venture studio post naming Apify, Clay community (**snippet only**): https://community.clay.com/x/share-jobs/msg_mJ6TaGUHInzO/hiring-remote-gtm-engineers-for-ai-venture-studio
- Smart Working Solutions, GTM Engineer, deliverability KPIs (**snippet only**): https://jobs.lever.co/smart-working-solutions/0fffe190-c1ec-4748-9589-5f87a08259d2
