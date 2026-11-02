# L-01 W3 Wildcard: will it be received?

**Question (verbatim):** When the six stakeholders and anyone else watching learn that AI agents made most of this application, including the personal opening line of the LinkedIn message the six receive, will they read the AI as the skill Alex is selling, or as a shortcut that drains the personal effort a job application exists to signal? And what decides which way it goes?

2 Nov 2026 · session s1-research subagent · item 7 of 7 on list L-01 · lens W3: will it be received?

Readers: every wave-2 spec on L-01, mainly S-D3 (the alert message), S-D8 (stakeholder sections, framing), S-D9 (feed posts), S-D4/S-D5 (blog), S-D7 (LinkedIn content). Serves the outcome; closest DoD-13, DoD-18, DoD-19 (flagged the same way as R2 and R4: it serves the outcome rather than one DoD item).

---

## Part (a) Gap analysis

### What the other items cover

| Item | What it asks | What it leaves open inside "will it be received?" |
| --- | --- | --- |
| R1 Making the work legible | Can a non-technical decision maker grasp the work in under a minute; what reads as toy or noise | Whether a reader who *does* grasp it approves of how it was made. Legible and well received are different things. |
| R2 What a GTM engineer is hired to show | Skills, stacks, proof of work employers want; which deliverables map | The demand side only. It says what employers want to see, not how the same artifact reads depending on how it's framed. |
| R3 Personal data on a public site | GDPR and LinkedIn terms for scraping, publishing and sequencing six named people | What's allowed, not how it feels to be the person on the receiving end. |
| R4 Does the format land | General reactions to personalised job-application websites; impressive versus creepy; what makes people act | The format in general. It does not cover what changes when the recipient learns the personalised work was produced by AI agents. |
| W1 Can it be executed? | Can it be built today with these tools | Nothing on reception. |
| W2 Can it be delivered? | Shipping it and getting it in front of the six | Getting it seen, not how it's taken once seen. |

### Everything left open within the lens

1. **AI authorship versus the effort signal.** The project openly shows agents doing most of the work, and the feed already leads with it ("The agents take over", "When the operator is away, agents decide", an agent "keeps this website up to date, which is how much of this feed gets here"; `website\content\feed.json`). The six also get a LinkedIn alert whose "one personal opening line per person" is "computed by a subagent" (`getsales\SPEC.md`, step 4). Does that read as the GTM-engineering skill on show, or as low effort?
2. **Uninvited use of their brand.** The whole site wears Addvery's branding on a URL Addvery doesn't own, with LinkedIn content "in Addvery's voice" and Canva templates in their brand. Flattering proof, or presumptuous, or mistaken by third parties for Addvery's own site?
3. **The wider audience and Alex's reputation.** The site is public, the feed is live, and Alex's freelance pivot means other prospective clients and employers may watch. What does a public, one-company "hire me" read as to them, and what happens to the story if Addvery doesn't reply?
4. **Six at once.** Contacting six people at one company together, each with a section the other five can read. Initiative, or pressure? What happens when they compare notes internally?
5. **Spec work.** An agency receiving unsolicited work in its own brand may read it as free consulting, or worry about what it may use.
6. **First visit to a half-built site.** The alert tells the six "the hackathon is happening, and they can follow along" (`getsales\SPEC.md`), so they may arrive mid-build and form a first impression on unfinished work.
7. **Internal machinery on show.** The "start here" box carries the charter and specs; spec codes and agent jargon may read as noise. (Mostly R1's ground.)

### Ranked shortlist

Ranked by: how much of the project it touches; how likely it is to decide the reception; whether Alex can still change it today; whether evidence exists to settle it in one pass.

| Rank | Question | Touches | Can still change today? | Evidence available |
| --- | --- | --- | --- | --- |
| 1 | AI authorship versus the effort signal | Every deliverable, both audiences, and the one message the six actually receive | Yes: the alert isn't sent and the stakeholder sections aren't drafted | Strong: a cluster of peer-reviewed 2023-2026 experiments plus two natural experiments on AI and job applications |
| 2 | Uninvited use of their brand | The whole site, D6, D7 | Yes: one visible "unofficial" line | Thin: case precedent and trademark commentary, little reception research |
| 3 | Wider audience and reputation | The public site and the freelance pivot | Partly | Thin: viral-case anecdotes |
| 4 | Six at once | D3, D8 | Partly | Thin; overlaps R4 |
| 5 | Spec work | D6, D7, the blog | Little | Mostly opinion writing |
| 6 | Half-built first visit | The alert timing | Yes | Overlaps W2 (timing) |
| 7 | Machinery on show | "Start here" box, feed | Yes | Overlaps R1 |

### Why this question, and what I passed over

I picked **rank 1** for four reasons.
- It's the only open question that touches every deliverable and both audiences at once.
- The project has already committed to showing the agents (the feed's framing), so the question isn't hypothetical.
- The single highest-stakes touchpoint, the message in each stakeholder's own LinkedIn inbox, is exactly the kind of personal, relational text that the research finds is penalised most when AI writes it.
- Alex can still change the parts that matter today.

How it differs from its neighbours: R2 may well find that employers want AI fluency. That's the demand side. This question is about perception: the same artifact can read as skill or as a shortcut depending on how the AI in it is shown. R4 covers personalised sites in general; the AI-authorship angle sits outside its wording.

Passed over, with a one-line note each for the synthesis:
- **Brand use (rank 2).** It's a real risk, but most of it is mitigated by one visible line ("an unofficial application by Alex Alderman, not affiliated with Addvery"). The best-known precedent, Nina Mufleh's mirror-image Airbnb site in 2015, drew a public "Very impressive" from Airbnb's CEO ([Fortune](https://fortune.com/2015/04/23/airbnb-resume)), so wearing the target's look isn't read as hostile by default. Not researched further.
- **Wider audience (rank 3).** It matters for the freelance pivot, but the evidence is anecdote. Worth a later item if Alex wants one.
- **Six at once, spec work, half-built visit, machinery on show (ranks 4 to 7).** Each overlaps R4, W2 or R1 enough to leave to them.

---

## Part (b) Research

### Method

- **When:** 2 Nov 2026, afternoon (Prague), in one pass of about 40 minutes.
- **Web:** WebSearch (standard mode), about 20 queries, covering:
  - the AI-disclosure trust penalty;
  - the social evaluation penalty for AI use at work and in hiring;
  - generative AI and labour-market signalling (Freelancer.com natural experiments);
  - AI writing assistance on resumes;
  - AI-mediated communication and perceived effort;
  - AI outsourcing of relational tasks;
  - operational transparency and the labour illusion;
  - visible AI reasoning;
  - the handmade effect and the effort heuristic;
  - recruiter surveys on AI-written applications;
  - LinkedIn AI-assisted messaging data;
  - AI content on LinkedIn;
  - AI outbound fatigue;
  - marketers' AI adoption;
  - GTM engineer job posts;
  - AI-built portfolios.
- **Pages fetched (WebFetch):**
  - arXiv abstracts of Galdin & Silbert and of Cui, Dias & Ye;
  - Tuck and Wharton write-ups;
  - Duke Fuqua's write-up of Reif, Larrick & Soll;
  - the University of Arizona write-up and RePEc abstract of Schilke & Reimann;
  - the University of Kent release on Claessens, Everett & Awad.
- **Failed:** PNAS returned 403, so Reif et al. rests on Duke's own write-up and search summaries.
- **DOIs checked:** three resolved to their journals (Management Science twice, QJE), but the landing pages weren't read.
- **Local, read-only:**
  - `CHARTER.md`, `research\lists\L-01-parent.md`, `orchestration\DOD-DRAFT.md`;
  - `research\SPEC.md` §4 (report shape);
  - `website\SPEC.md` §1 to §5;
  - a keyword grep of `getsales\SPEC.md` and `website\content\feed.json`, to see how the project currently presents AI and the alert.
- **Not opened:** nothing about Addvery, nothing from `Addvery Research\`, no connected tool.

### Verdict up front

1. **By default, the AI will cost Alex something.** Across many preregistered experiments from 2023 to 2026, people who visibly use AI are judged as lazier, less competent, less caring and less trustworthy. Disclosing it lowers trust ([Schilke & Reimann 2025](https://ideas.repec.org/a/eee/jobhdp/v188y2025ics0749597825000172.html); [Reif, Larrick & Soll 2025](https://www.fuqua.duke.edu/duke-fuqua-insights/Is-AI-Damaging-Your-Professional-Image)). Two natural experiments show AI has already cut how much employers trust a tailored application as a signal ([Cui, Dias & Ye 2025](https://arxiv.org/abs/2509.25054); [Galdin & Silbert 2025](https://arxiv.org/abs/2511.08785v1)).
2. **The penalty is conditional, and three conditions can work for this project:**
   - *Task fit:* the penalty vanishes where AI is useful for the task.
   - *Evaluator habits:* it reverses when the evaluator is a frequent AI user.
   - *Who tells:* it's milder when the person discloses than when others expose them.
   A GTM-engineering demo shown to B2B marketing people, with Alex telling the story himself, scores well on all three (inference).
3. **The exposure is concentrated in the relational parts, not the machinery.** Outsourcing relational writing (apologies, personal notes) to AI draws the harshest judgement, and that penalty survived both honest disclosure and high-quality writing ([Kent, 2026](https://www.kent.ac.uk/news/cyber-security-digital-technology-and-communication/37611/using-ai-for-love-letters-can-backfire-new-study-finds)). The AI-written personal opening line in the alert, and any agent-drafted "note from him" in a stakeholder section, sit squarely there. The scraping demo, the ten ICPs and the classifier sit where AI reads as skill.
4. **The six will learn the alert was automated whatever happens**, because the D3 clip shows each pipeline stage (DoD-13). So concealment isn't on the table. What Alex can still choose is *how* they learn it and *which* parts carry his own hand. The evidence favours saying it up front, and putting his own hand on the relational parts.
5. **Showing the work can pay back some of the lost effort signal.** Visible work raises perceived value (the labour illusion), and visible AI reasoning raises trust. That makes the live feed an asset if it shows Alex's judgment, not only the agents' activity (inference from adjacent evidence).

### Evidence

#### 1. Why a personalised application persuades: it's a costly signal, and AI makes it cheap

- **The classic model.** In Spence's job-market signalling model, a signal is credible because it costs a weak candidate more to send than a strong one ([Spence 1973, QJE](https://doi.org/10.2307/1882010)). A personalised website built for one company is persuasive largely because it looks expensive in time and care. *Inference:* that's the mechanism R4's "impressive" cases run on.
- **Galdin & Silbert, coding jobs on Freelancer.com.** Before LLMs, employers showed "a high willingness to pay for workers with more customized applications"; after LLMs, they didn't ([arXiv 2511.08785](https://arxiv.org/abs/2511.08785v1)).
  - In their counterfactual where written applications stop being informative, top-quintile workers are hired 19% less often and bottom-quintile workers 14% more often.
  - Galdin suggests employers will lean on harder-to-fake signals: live conversations, live tests, short paid trials, track records ([Tuck](https://tuck.dartmouth.edu/news/articles/what-happens-to-hiring-when-ai-writes-job-applications)).
- **Cui, Dias & Ye, Freelancer.com's AI cover-letter tool (April 2023), as a natural experiment** ([arXiv 2509.25054, v2 12 Nov 2025](https://arxiv.org/abs/2509.25054)):
  - Access made letters better tailored and raised callbacks.
  - The correlation between tailoring and callbacks fell 51%.
  - Employers shifted weight to prior work history.
  - **Among AI-generated drafts, more time spent editing was positively associated with hiring success.**
  - Wharton's summary: the tailored letter became "a prerequisite rather than a differentiator" ([Wharton](https://knowledge.wharton.upenn.edu/opinion/ai-is-killing-the-cover-letter/)).
- *Inference:* the personalisation that made sites like Nina Mufleh's stand out in 2015 is now cheap to produce. What still signals is what's hard to fake:
  - real work that runs (the demos);
  - visible time under constraint (the 12-hour clock);
  - judgment about their business;
  - the human edit on top of the AI draft.

#### 2. The penalty for visible AI use is real and broad

- **Schilke & Reimann (2025), 13 experiments.** Reported as "more than 5,000 participants" by the University of Arizona; a secondary brief says 3,000+. Their findings ([RePEc abstract](https://ideas.repec.org/a/eee/jobhdp/v188y2025ics0749597825000172.html); [Arizona](https://news.arizona.edu/employee-news/being-honest-about-using-ai-work-makes-people-trust-you-less-research-finds)):
  - People who disclose AI use are trusted less, because their work seems less legitimate.
  - The penalty held across disclosure framings, whether or not evaluators already knew AI was involved, and whether disclosure was voluntary or required.
  - Evaluators who like technology, or think AI is accurate, penalise less, but still penalise.
  - The tasks and actors tested included supervisors, professors, analysts, creatives and investment funds.
- **Reif, Larrick & Soll (PNAS, May 2025), four preregistered experiments, N = 4,439** ([Duke Fuqua](https://www.fuqua.duke.edu/duke-fuqua-insights/Is-AI-Damaging-Your-Professional-Image); [PsyPost](https://www.psypost.org/people-who-use-ai-may-pay-a-social-price-according-to-new-psychology-research); [DOI](https://doi.org/10.1073/pnas.2426766122)):
  - AI users are rated lazier, less competent and less diligent than people helped by a colleague or by other software.
  - People expect this: in experiment 1, participants using AI expected to be seen as "more replaceable", and were less willing to disclose.
- **Liu, Kang & Wei (2023, *Journal of Social and Personal Relationships*), 208 adults** ([Ohio State](https://news.osu.edu/ai-can-help-write-a-message-to-a-friend--but-dont-do-it/)):
  - A friend who used AI to help write a message was judged to have spent less effort on the relationship, and recipients were less satisfied and less sure they were valued.
  - Help from another *person* produced the same drop, so the mechanism is perceived effort, not technology as such.
  - Liu predicts people will run a "Turing test in the mind" on messages they receive.
- **Claessens, Everett & Awad (*Computers in Human Behaviour*, press release 5 Feb 2026), six studies, nearly 4,000 UK participants** ([Kent](https://www.kent.ac.uk/news/cyber-security-digital-technology-and-communication/37611/using-ai-for-love-letters-can-backfire-new-study-finds)):
  - Outsourcing relational writing (love letters, apologies, vows) to AI drew the strongest negative judgements: the sender was seen as less caring, less authentic, less trustworthy and lazier.
  - Practical tasks (code, schedules, recipes) drew "far less criticism".
  - The penalty held even when the writing was high quality and the sender was honest about the AI.
  - Claessens: people "judge how you produce it".
- **Hohenstein et al. (2023, *Scientific Reports*), 219 pairs** ([PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10073210); [PsyPost](https://www.psypost.org/study-uncovers-a-surprising-discrepancy-between-the-effects-of-perceived-vs-actual-use-of-ai-in-conversations/)):
  - *Actual* use of AI smart replies made partners rate each other as closer and more cooperative.
  - *Suspected* use made them rate each other more negatively.
  - Participants spotted a partner's AI use better than chance.
- **A 2026 Japanese study, 567 participants** ([J-STAGE](https://www.jstage.jst.go.jp/article/jaiop/39/2/39_211/_article/-char/en)): recipients felt less gratitude when told AI had chosen their gift. Known from a search summary only; not read.
- **Recruiter surveys** point the same way, though they're commissioned by resume-services firms and vary with wording:
  - 19.6% of 600 US hiring managers would reject an application that looks fully AI-generated ([TopResume, May 2025](https://topresume.com/career-advice/ai-in-hiring-survey));
  - 73% of hiring managers say they can spot AI use ([Robert Walters via Business News Wales](https://businessnewswales.com/73-of-hiring-managers-claim-they-can-spot-ai-enhanced-cvs/)).

#### 3. The penalty is conditional: three conditions decide it

- **Condition A, task fit.**
  - In Reif et al.'s experiment 4 (N = 1,006), a candidate using AI for a manual task (handwritten notes) got significantly lower task-fit ratings than one using conventional tools, but for a digital task where AI was described as useful, there was "no significant difference" ([Duke Fuqua](https://www.fuqua.duke.edu/duke-fuqua-insights/Is-AI-Damaging-Your-Professional-Image)).
  - The Kent studies split the same way: practical outsourcing drew far less criticism than relational outsourcing ([Kent](https://www.kent.ac.uk/news/cyber-security-digital-technology-and-communication/37611/using-ai-for-love-letters-can-backfire-new-study-finds)).
  - GTM engineer job posts describe the job as building LLM and agent workflows into GTM systems, and replacing "manual work with agents, workflows, and automation" ([hirist.tech posting](https://www.hirist.tech/j/gtm-engineer-ai-agents-1681365); [ConstructConnect posting](https://careers-constructconnect.icims.com/jobs/2069/senior-gtm-software-engineer/job); [LangChain GTM Engineer via ResumeGeni](https://resumegeni.com/jobs/gtm-engineer-at-langchain-san-francisco-ca)). These are aggregator copies, not a survey, so they're indicative only; R2 owns this ground.
  - *Inference:* for the machinery deliverables (scraping, ICPs, classifier, pipeline), AI is the task, so the penalty should be small or absent.
- **Condition B, the evaluator's own AI habits.**
  - In Reif et al.'s experiment 3 (N = 1,718 acting as managers), managers who rarely used AI were less likely to hire daily-AI candidates, while managers who used AI frequently *favoured* them ([Duke Fuqua](https://www.fuqua.duke.edu/duke-fuqua-insights/Is-AI-Damaging-Your-Professional-Image)).
  - Schilke & Reimann found the trust penalty attenuated, not eliminated, among tech-positive evaluators ([RePEc](https://ideas.repec.org/a/eee/jobhdp/v188y2025ics0749597825000172.html)).
  - Marketers as a population use AI heavily, but surveys disagree on how often: from about a fifth to a third daily in conservative surveys, to 56% daily in one survey of 1,100 US marketers ([MarTech](https://martech.org/ai-and-marketing-what-the-stats-show/); [Basis 2025, PDF](https://basis.com/wp-content/uploads/2025/08/AI-and-the-Future-of-Marketing_2025_Basis.pdf); [Campaign](https://campaignlive.com/article/half-us-marketers-use-generative-ai-every-day-study/1832464)). Agencies report heavier use than brands (NinjaCat figures via MarTech: 91% of agencies use AI).
  - *Inference:* the six are probably above the population median, but Alex knows them and the research doesn't; this report doesn't look at Addvery.
- **Condition C, who tells.**
  - Being exposed by a third party lowered trust more than disclosing it yourself (Schilke & Reimann, studies 9 to 13). The authors conclude "being upfront may ultimately be a better policy" ([Arizona](https://news.arizona.edu/employee-news/being-honest-about-using-ai-work-makes-people-trust-you-less-research-finds)).
  - *Inference:* there's no evidence on *delay*: a message that reads as hand-written, revealed as automated hours later on the sender's own site. It sits between disclosure and exposure, and the "Turing test in the mind" finding suggests some of the six will suspect it before the site tells them.

#### 4. The paradox: AI help often performs better when it isn't flagged

- Wiles, Munyikwa & Horton's field experiment with nearly half a million jobseekers found that algorithmic writing help raised hires by 8% (and wages by about 10% in the published version), with "no evidence that employers were less satisfied" ([NBER w30886](https://www.nber.org/papers/w30886); [Horton](https://john-joseph-horton.com/papers/algorithmic-writing-assistance-on-jobseekers-resumes-increases-hires/)). Note that this was polishing resumes, not writing relational text.
- LinkedIn reports that AI-assisted recruiter messages get a 44% higher acceptance rate and are accepted about 11% faster ([LinkedIn Q3 2025 product update](https://business.linkedin.com/hire/product-update/archival/product-update-q3-2025)). That's LinkedIn's own data, not independent, and the recipients presumably weren't told.
- The same split shows in Hohenstein et al.: actual AI help improved ratings, while suspected help hurt them ([PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10073210)).
- *Inference:* "AI messages work" and "AI disclosure hurts" are both true. This project can't use the first, because the D3 clip discloses everything. Its realistic route is to make the disclosed version land well (sections 3 and 5).

#### 5. The six's inboxes and feeds in 2026 are primed to spot AI

- Originality.ai estimated 54% of long-form English LinkedIn posts were likely AI-generated or AI-edited by October 2024, and 53.7% of posts from 99 influential profiles in a 2025 follow-up ([Originality.ai](https://originality.ai/blog/ai-content-published-linkedin); [The Register](https://www.theregister.com/2024/11/28/linkedin_ai_posts)). Pangram Labs' stricter count was 40.5%. These come from detector vendors, so the method is contestable; the order of magnitude is the point.
- Vendor writing on 2026 outbound describes buyers who "recognize the cadence, the structure, the slightly-too-tidy openers", with reply rates falling as AI volume rose ([Boomerang](https://www.getboomerang.ai/post/ai-sdr-backlash); [Baytech](https://www.baytechconsulting.com/blog/inbox-arms-race-why-your-ai-outreach-is-getting-ghosted)). This is weak evidence: vendor blogs, figures that disagree, causation asserted rather than measured.
- *Inference:* a short, warm, "personal" opening line generated from scraped facts is exactly the pattern 2026 LinkedIn users have learned to read as automated. For an audience that may itself run outbound, it's the genre they know best.

#### 6. Showing the work can win back some of the effort signal

- **The labour illusion.** Buell & Norton (2011, *Management Science* 57(9)) found that making a service's background work visible raises its perceived value ([DOI](https://doi.org/10.1287/mnsc.1110.1376)). Buell, Kim & Tsay's field work on reciprocal operational transparency reported a 22.2% rise in customer-rated quality ([DOI](https://doi.org/10.1287/mnsc.2015.2411); figure via search summary).
  - Caveat: Bray argues true transparency shows idleness as well as effort, and that customers weight how a service *ends* ([Bray, Kellogg PDF](https://www.kellogg.northwestern.edu/faculty/bray/doc/transparency/transparency.pdf)). *Inference:* the morning-after state of the site will weigh more than the middle of the build.
- **Visible AI reasoning.** A preregistered experiment (N = 752) found that showing AI reasoning increased trust and agreement with AI recommendations ([arXiv 2511.04050](https://arxiv.org/abs/2511.04050v1)). That's trust in AI advice, not in the person using it, so it's adjacent evidence only.
- **The effort heuristic.** Kruger et al. (2004) showed that perceived effort raises perceived quality when the work itself is held constant, most strongly when judges have little other information ([summary](https://en.wikipedia.org/wiki/Effort_heuristic)). Two caveats:
  - a 2023 replication supported it for liking and quality but not monetary value;
  - Cho & Schwarz found it only holds when an "effort" theory, rather than a "talent" theory, is active in the judge's mind ([U-M Deep Blue](https://deepblue.lib.umich.edu/items/f5e6e3d7-57bd-483b-adcc-b10d2a62b8be)).
  *Inference:* framing the build as *skill* (orchestration, judgment) rather than *effort* (hours) is the frame AI doesn't undercut.
- **The handmade effect.** Fuchs, Schreier & van Osselaer (2015, *Journal of Marketing*) found handmade products are valued because they're believed to carry the maker's love, more strongly for gifts to close others ([University of Vienna](https://mib.univie.ac.at/en/research/recent-publications/publikationen-detailansicht/pure/b4c66f26-9ce8-4460-a816-7f46a6c4cd0c/show/publ/Pure)). *Inference:* an unsolicited personal application behaves partly like a gift, and the parts that carry warmth are the ones where hand-made matters.
- **Advice on AI-built portfolios** converges on a similar line: hiring managers "know candidates used AI tools" and look for judgment, taste and documented decisions ([techinterview.org, Jul 2026](https://www.techinterview.org/post/3233475399/ai-portfolio-built-with-ai-2026-interviews/?format=md)). These are career-content sites, not surveys, so treat it as weak corroboration.
- **Label wording** ("AI-assisted" against "AI-generated") is mixed:
  - one 2025-26 *Journalism* experiment found "AI-generated" rated least credible ([FSU](https://news.cci.fsu.edu/cci-news/cci-faculty/new-research-on-the-effects-of-ai-disclosure-on-perception-of-news-credibility/));
  - Gilardi et al. (2024) found no difference;
  - Schilke & Reimann found the penalty survived every framing they tested.
  Don't count on wording alone.

#### 7. Applying it to this project's parts

*Inference throughout*, built from the task-fit split (sections 2 and 3) and the current plans in the repo. "Relational" means a text that speaks to a person about them or about Alex's regard for them.

| Touchpoint | Who made it (current plan) | Kind of task | Likely reading if the AI is shown |
| --- | --- | --- | --- |
| D3 alert: personal opening line to each of the six | A subagent, from scraped notes; Alex ticks a pre-send gate (`getsales\SPEC.md`) | Relational, and addressed to the evaluator personally | **Highest risk.** It's the case the Kent and Ohio State studies describe, made worse by 2026 pattern recognition |
| D8 stakeholder section: "a note from him on what the project means for that role" (`website\SPEC.md` default) | Not yet settled who drafts it | Relational | High risk if agent-drafted; strong signal if visibly his |
| D1 scraping demo; D3 ten ICPs, sequences, classifier, pipeline | Agents, directed by Alex | Practical; the AI is the job | Low risk; likely read as skill (task fit) |
| D4/D5 blog: 15-minute dictation, then AI, then Alex's last 10% | Mixed, his thinking and voice | Mixed | Medium; the "editing time predicts hiring" finding favours making his edit visible |
| D7 LinkedIn content in Addvery's voice | AI on his brand-capture repo | Practical, but in *their* voice | Medium; lands into a feed where about half of long posts already read as AI |
| D6 Canva templates; D10 Canva design video | Alex by hand, on camera | Craft | Low risk; the clearest hand-made signal on the site |
| Feed and webcam: "the agents take over", "agents decide" | S-D9 and website, from rig clips | Process | Can go either way: the labour illusion helps if the feed shows his judgment; it hurts if it reads as "replaceable" (Reif experiment 1) |

One point from the feed itself: Alex's own quote is already the right frame. "The bottleneck is focus. The bottleneck is judgment, discernment" (`website\content\feed.json`). *Inference:* it fits the evidence well. It's a skill frame rather than an effort frame, and it puts the legitimacy that Schilke & Reimann find disclosure erodes back with the human.

### Evidence gaps

- **No study tests this exact case**: an AI-built, personalised job-application website, or an automated outreach message disclosed as part of a demo. Everything here is transferred from adjacent settings (workplace vignettes, freelance platforms, friend messages), and that transfer is inference.
- **Most penalty evidence comes from online-panel vignette experiments**, not real decision makers judging a real applicant. The two Freelancer.com papers are real-market evidence, but about written proposals, not websites.
- **Time drift.** Soll says the penalty is "very contingent on the current cultural context" and "could disappear 10 years from now". Schilke & Reimann say it's unclear whether it will fade. The studies ran mostly in 2023 to 2025, and reception in November 2026 may already be milder among heavy AI users.
- **The six themselves.** Condition B (their own AI habits) is decisive, and I didn't research it. That's by rule: it's about Addvery, which is Alex's research.
- **Delayed disclosure.** No study found on a message that reads as hand-written but is revealed as automated hours later by the sender's own site.
- **Sources not read in full.** The PNAS paper (403), the Kent paper (press release only), the Japanese gift study (search summary only), and Buell & Norton (abstract-level only; the DOI resolved but the page wasn't read).
- **Reported but unchecked figures.** The Schilke & Reimann participant count (3,000+ against 5,000+), the Buell, Kim & Tsay 22.2% figure, and vendor outbound reply rates.
- **Not established:** whether showing the agents' work offsets the disclosure penalty for a *person*. The labour-illusion and visible-reasoning evidence is about services and AI advice, not about judging the human behind them.

---

## Part (c) Recommendations

Evidence plus options. Every call here is Alex's. Suggested tags for the synthesis are in brackets.

### 1. Who writes the personal line the six receive [operator decision; S-D3]

The six will learn the alert was automated, because the D3 clip shows every stage. The relational-outsourcing penalty survived honest disclosure and good writing in the Kent studies. Editing time on AI drafts was positively associated with hiring in Cui, Dias & Ye.

| Option | What it means | For | Against |
| --- | --- | --- | --- |
| A. As planned | A subagent writes the line, and Alex ticks the pre-send gate | No extra operator time | The highest-risk pattern in this report, sent to the evaluators personally |
| B. Alex writes or rewrites each line | The subagent drafts, and Alex rewrites six lines in his own words before the gate | The relational part carries his hand; matches the editing-time finding | About 10 minutes of operator time in the window |
| C. The message says what it is | e.g. "this message came out of the pipeline you can watch live at ..." | Self-disclosure beats being found out (Schilke & Reimann); turns the message into the demo | Disclosure still costs some trust; the line gets longer |
| D. B and C together | Alex's own personal line, plus an honest note that the delivery was automated | Uses both conditions | Combines the costs of B and C |

### 2. How the site says who did what [operator decision; S-D8, S-D9]

Schilke & Reimann found disclosure costs less than discovery, and the labour illusion rewards visible work. Reif et al. found that task fit removes the penalty.

- **Option A: a short "made by" tag on each deliverable** (Alex / agents directed by Alex / both). The most explicit, at a small cost in clutter; R1 may weigh in.
- **Option B: one "How this was made" panel** near "start here": what the agents did, what only Alex did (the judgment calls, the dictations, the Canva work, the six personal lines if option 1B or 1D is chosen). Less clutter.
- **Option C: keep the narrative feed as it is.** No extra work, but the split is left for each reader to infer.

### 3. Framing the agents: skill and judgment, not "agents take over" [operator decision; S-D9 and website via build requests]

Reif et al.'s experiment 1 found people expect AI users to be seen as more replaceable. The effort heuristic depends on whether an effort or a talent frame is active. Alex's own "the bottleneck is judgment" line is a talent frame.

- **Option A: leave the existing titles,** and future posts carry on as they are.
- **Option B: going forward, write posts so that Alex decides and the agents carry out.** Past posts stay as they are.
- **Option C: add one line to the top of the site** that sets the frame. For example: "Alex directs, the agents build: the judgment calls are his, and this is what one GTM engineer can ship in 12 hours."
- **The write-up itself is assistant-actionable** once he picks an option. The wording would go through S-D9 and website, not this session.

### 4. Where his own hand shows [operator decision; S-D8, S-D4/S-D5]

The handmade effect, the relational penalty, and editing time associated with hiring all point the same way.

- **Option A: Alex writes each stakeholder note himself** (the website default leaves the drafter unsettled), and the site says so.
- **Option B: agents draft the notes,** and he edits and approves them in his 10-minute review.
- **Option C: show the "last 10%" on the blog posts:** a before and after, or a line saying what he changed. The cheapest way to make his edit visible.
- **Note:** the Canva design video (D10) is already the clearest hand-made proof on the site. Where it sits on the page is a choice for him and S-D8.

### 5. Tune to the evaluator [operator decision; verify first]

The penalty reverses for frequent AI users (Reif et al., experiment 3). Alex knows his six; this report doesn't.

- **Option A: one framing for all six.**
- **Option B: weight each stakeholder section differently.** More machinery for the people he knows are hands-on with AI, more of his own hand for the others.
- **Option C: decide after a quick look** at his own notes on the six. This is his research, so nothing for the assistant side to do.

### 6. A five-minute cold read before the alert goes out [verify first; assistant-actionable for the logistics]

There's no study of this exact case, so a cheap direct check is worth more than more literature. One or two people who don't know the project look at the live site for 60 seconds and answer three questions:
- Who made this?
- How much effort did it take?
- Would you reply?

If "AI made it, not much effort" dominates, options 2 to 4 above matter more. Who does the reading, and whether it fits the window, is Alex's call.

### For the synthesis

- **Convergence to look for:** if R4 finds that personalised sites land through effort or care, this report says AI disclosure is the main threat to that mechanism in 2026.
- **Possible conflict:** if R1 recommends showing the agents' machinery prominently for legibility, that cuts both ways here. The machinery reads well for the practical deliverables and badly for the relational ones.
- **Unsettled:** the six's own AI habits (Alex's research), and delayed disclosure (no evidence either way).

---

## Sources

Peer-reviewed papers and working papers
- Schilke, O. & Reimann, M. (2025). The transparency dilemma: How AI disclosure erodes trust. *Organizational Behavior and Human Decision Processes* 188, 104405. [RePEc abstract](https://ideas.repec.org/a/eee/jobhdp/v188y2025ics0749597825000172.html) · [DOI](https://doi.org/10.1016/j.obhdp.2025.104405) · [University of Arizona write-up](https://news.arizona.edu/employee-news/being-honest-about-using-ai-work-makes-people-trust-you-less-research-finds)
- Reif, J. A., Larrick, R. P. & Soll, J. B. (2025). Evidence of a social evaluation penalty for using AI. *PNAS* 122(19), e2426766122. [DOI](https://doi.org/10.1073/pnas.2426766122) (403 when fetched) · [Duke Fuqua write-up](https://www.fuqua.duke.edu/duke-fuqua-insights/Is-AI-Damaging-Your-Professional-Image) · [PsyPost](https://www.psypost.org/people-who-use-ai-may-pay-a-social-price-according-to-new-psychology-research)
- Galdin, A. & Silbert, J. (2025). Making Talk Cheap: Generative AI and Labor Market Signaling. [arXiv 2511.08785](https://arxiv.org/abs/2511.08785v1) · [Tuck write-up](https://tuck.dartmouth.edu/news/articles/what-happens-to-hiring-when-ai-writes-job-applications)
- Cui, J., Dias, G. & Ye, J. (2025). Signaling in the Age of AI: Evidence from Cover Letters. [arXiv 2509.25054](https://arxiv.org/abs/2509.25054) · [Wharton commentary](https://knowledge.wharton.upenn.edu/opinion/ai-is-killing-the-cover-letter/)
- Wiles, E., Munyikwa, Z. & Horton, J. J. Algorithmic Writing Assistance on Jobseekers' Resumes Increases Hires. *Management Science* 71(12), 2025. [NBER w30886](https://www.nber.org/papers/w30886) · [Horton's page](https://john-joseph-horton.com/papers/algorithmic-writing-assistance-on-jobseekers-resumes-increases-hires/)
- Liu, B., Kang, J. & Wei, L. (2023). AI-assisted messages between friends. *Journal of Social and Personal Relationships*. [Ohio State release](https://news.osu.edu/ai-can-help-write-a-message-to-a-friend--but-dont-do-it/)
- Hohenstein, J. et al. (2023). Artificial intelligence in communication impacts language and social relationships. *Scientific Reports*. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10073210) · [PsyPost](https://www.psypost.org/study-uncovers-a-surprising-discrepancy-between-the-effects-of-perceived-vs-actual-use-of-ai-in-conversations/)
- Claessens, S., Everett, J. & Awad, E. (2026). Negative perceptions of outsourcing to artificial intelligence. *Computers in Human Behaviour*. [University of Kent release, 5 Feb 2026](https://www.kent.ac.uk/news/cyber-security-digital-technology-and-communication/37611/using-ai-for-love-letters-can-backfire-new-study-finds)
- Spence, M. (1973). Job Market Signaling. *Quarterly Journal of Economics* 87(3). [DOI](https://doi.org/10.2307/1882010)
- Buell, R. W. & Norton, M. I. (2011). The Labor Illusion: How Operational Transparency Increases Perceived Value. *Management Science* 57(9). [DOI](https://doi.org/10.1287/mnsc.1110.1376) (resolved to the journal; page not read)
- Buell, R. W., Kim, T. & Tsay, C.-J. (2017). Creating Reciprocal Value Through Operational Transparency. *Management Science*. [DOI](https://doi.org/10.1287/mnsc.2015.2411) (resolved to the journal; page not read)
- Bray, R. Operational Transparency: Showing When Work Gets Done. *MSOM*. [Kellogg PDF](https://www.kellogg.northwestern.edu/faculty/bray/doc/transparency/transparency.pdf)
- Revealing AI Reasoning Increases Trust but Crowds Out Unique Human Knowledge (2025). [arXiv 2511.04050](https://arxiv.org/abs/2511.04050v1)
- Kruger, J., Wirtz, D., Van Boven, L. & Altermatt, T. W. (2004). The effort heuristic. *Journal of Experimental Social Psychology*. [Summary with replication notes](https://en.wikipedia.org/wiki/Effort_heuristic) · [Cho & Schwarz, U-M Deep Blue](https://deepblue.lib.umich.edu/items/f5e6e3d7-57bd-483b-adcc-b10d2a62b8be)
- Fuchs, C., Schreier, M. & van Osselaer, S. M. J. (2015). The Handmade Effect: What's Love Got to Do with It? *Journal of Marketing* 79. [University of Vienna listing](https://mib.univie.ac.at/en/research/recent-publications/publikationen-detailansicht/pure/b4c66f26-9ce8-4460-a816-7f46a6c4cd0c/show/publ/Pure)
- AI gift-recommendation gratitude study (2026), *Japanese Association of Industrial/Organizational Psychology Journal*. [J-STAGE](https://www.jstage.jst.go.jp/article/jaiop/39/2/39_211/_article/-char/en) (search summary only)
- AI-disclosure label wording and news credibility. [FSU release](https://news.cci.fsu.edu/cci-news/cci-faculty/new-research-on-the-effects-of-ai-disclosure-on-perception-of-news-credibility/)

Industry data and surveys (weaker; commissioned or vendor sources)
- LinkedIn, Q3 2025 product update: AI-assisted messages, 44% higher acceptance. [LinkedIn](https://business.linkedin.com/hire/product-update/archival/product-update-q3-2025)
- Originality.ai, AI content on LinkedIn. [Originality.ai](https://originality.ai/blog/ai-content-published-linkedin) · [The Register](https://www.theregister.com/2024/11/28/linkedin_ai_posts)
- TopResume, hiring managers on AI applications (May 2025). [TopResume](https://topresume.com/career-advice/ai-in-hiring-survey)
- Robert Walters, 73% of hiring managers claim they can spot AI. [Business News Wales](https://businessnewswales.com/73-of-hiring-managers-claim-they-can-spot-ai-enhanced-cvs/)
- Marketers' AI use. [MarTech](https://martech.org/ai-and-marketing-what-the-stats-show/) · [Basis 2025 PDF](https://basis.com/wp-content/uploads/2025/08/AI-and-the-Future-of-Marketing_2025_Basis.pdf) · [Campaign](https://campaignlive.com/article/half-us-marketers-use-generative-ai-every-day-study/1832464)
- AI outbound fatigue (vendor blogs). [Boomerang](https://www.getboomerang.ai/post/ai-sdr-backlash) · [Baytech](https://www.baytechconsulting.com/blog/inbox-arms-race-why-your-ai-outreach-is-getting-ghosted)
- GTM engineer postings (aggregator copies). [hirist.tech](https://www.hirist.tech/j/gtm-engineer-ai-agents-1681365) · [ConstructConnect](https://careers-constructconnect.icims.com/jobs/2069/senior-gtm-software-engineer/job) · [ResumeGeni / LangChain](https://resumegeni.com/jobs/gtm-engineer-at-langchain-san-francisco-ca)
- AI-built portfolios in 2026 interviews (career content). [techinterview.org](https://www.techinterview.org/post/3233475399/ai-portfolio-built-with-ai-2026-interviews/?format=md)
- Nina Mufleh's Airbnb application (2015). [Fortune](https://fortune.com/2015/04/23/airbnb-resume)

Local files (read-only)
- `CHARTER.md`, `research\lists\L-01-parent.md`, `orchestration\DOD-DRAFT.md`, `research\SPEC.md` §4, `website\SPEC.md` §1 to §5, `getsales\SPEC.md` (keyword grep), `website\content\feed.json` (keyword grep).
