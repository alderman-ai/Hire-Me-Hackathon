# L-01 R1: Making the work legible

> "R1 Making the work legible. How do the strongest GTM-engineer portfolios, hackathon demos and "job application as outreach" sites make the work legible to a non-technical decision maker in under a minute? Is there a converged pattern (short video, live build log, before/after, a "how it works" panel)? What makes such demos read as toys, or as noise?"

- 2 Nov 2026
- session s1-research subagent
- item 1 of 7 on list L-01
- Serves: DoD-8, DoD-13, DoD-17, DoD-19. Readers: every wave-2 spec.

---

## Method

- **When:** all searches and fetches ran on 2 Nov 2026, in one sitting of about 40 minutes.
- **Tools:** WebSearch and WebFetch both worked. Some pages refused the fetch: INFORMS and HBS (403) for the Labor Illusion paper, PMC (captcha), and LinkedIn's Talent Blog (502). Where that happened I used an index page (IDEAS/RePEc, OUP) or a press copy instead, and I say so next to the claim.
- **What I searched:** GTM-engineer portfolio advice and job posts (Clay community, job boards, vendor blogs); hackathon judging and demo-video rules (MLH, ETHGlobal, Devpost write-ups, Builder Base, winners' accounts); "job application as a website" cases (Nina Mufleh / Airbnb, 2015); B2B demo method (Great Demo!, Navattic, Arcade); attention research (NN/g, the Ladders eye-tracking study, Wistia, Vidyard, Verizon/Publicis captions); credibility and transparency research (the Stanford Web Credibility guidelines, Buell & Norton's "labor illusion", Altay & Gilardi on AI labels); and failure cases (Google's Gemini demo, Cognition's Devin demo).
- **How strong the sources are,** from strongest to weakest: peer-reviewed experiments (Buell & Norton 2011; Altay & Gilardi 2024; Ziano et al. 2023); established UX research (NN/g, Stanford); hackathon organisers' own rules (MLH, ETHGlobal); vendor benchmarks drawn from their own platform data (Wistia, Navattic, Vidyard: real data, but self-reported); practitioner and community opinion (Clay community, Databar, Builder Base, Great Demo!); and the press.
- **Conventions:** every substantive claim has a link. **(inference)** marks my own reasoning. **(search summary)** marks a claim I saw only in a search-result summary and couldn't fetch myself.
- **Scope:** nothing about Addvery. I didn't open `Addvery Research\`, the Apify proposal, the private repo or any GetSales data.

---

## Verdict

**1. Yes, there is a converged pattern, but it's an order rather than a format.** The sources agree from four directions: hackathon organisers, portfolio research, B2B demo method and hiring posts. The order is:
**(a) the outcome first → (b) a short demo, not a presentation (≤ 2 min, ideally ~1 min) → (c) a plain-language "how it works" in 3–4 steps → (d) depth only on request.** Each piece is organised around the reader's problem, not around the tool.
- Short video, before/after and a "how it works" panel are each supported as *components* of that order.
- None of them works as the whole answer on its own.

**2. Of the four candidates, the "live build log" has the weakest direct evidence and the highest risk of noise.**
- Showing the work behind a service does raise perceived value in lab experiments ([Buell & Norton 2011](https://ideas.repec.org/a/inm/ormnsc/v57y2011i9p1564-1579.html)).
- Visible status builds trust ([NN/g](https://www.nngroup.com/articles/visibility-system-status/)).
- But I found no evidence for build logs in a hiring context. Transparency also exposes idle time ([Bray 2023](https://ideas.repec.org/a/inm/ormsom/v25y2023i3p812-826.html), search summary).
- A curated "what changed and when" log is supported. A raw feed isn't (inference).

**3. Demos read as toys** when:
- the data looks generic or fake;
- a claim outruns what's shown, or edits aren't disclosed (Gemini, Devin);
- breadth wins over one working path;
- the tool, not the problem, is the headline;
- AI involvement is unlabelled or ambiguous.

**Demos read as noise** when everything has equal weight, the text can't be scanned, and logs or videos are raw and long.

### At a glance

| Candidate pattern | Converged? | Best evidence | Strength |
| --- | --- | --- | --- |
| Outcome first ("do the last thing first") | Yes | [Great Demo!](https://www.skmurphy.com/blog/2014/02/20/improve-your-sales-pitch/), [Databar](https://databar.ai/blog/article/how-to-build-a-gtm-engineering-portfolio-that-gets-you-hired), [NN/g 10-second rule](https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/) | Practitioner consensus plus attention research |
| Short demo video (≤ 2 min, a demo not a deck) | Yes | [MLH](https://guide.mlh.com/general-information/judging-and-submissions/judging-plan), [ETHGlobal](https://ethglobal.com/events/superhack/info/details), [GTM job post](https://jobs.workable.com/jobs/a34ef0b3-a799-4d7f-95eb-c7f11d1ae4d2.md), [Wistia](https://wistia.com/blog/optimal-video-length) | Strong as a convention; vendor data on length |
| "How it works" in 3–4 steps | Convention | [Landing-page guidance](https://www.pravinkumar.co/blog/webflow-how-it-works-section-design-2026), [NN/g scanning](https://www.nngroup.com/articles/how-users-read-on-the-web/) | Weak (blogs); consistent with scanning research |
| Before/after | Convention | [Builder Base](https://intercom.help/builderbase/en/articles/14836128-builder-s-guide-ch-14-crafting-a-demo-that-lands), [Nina4Airbnb structure](https://fortune.com/2015/04/23/airbnb-resume) | Weak (no tested data) |
| Live build log | Not converged | [Labor illusion](https://ideas.repec.org/a/inm/ormnsc/v57y2011i9p1564-1579.html), [NN/g status](https://www.nngroup.com/articles/visibility-system-status/), [Stanford #8](https://credibility.stanford.edu/guidelines/index.html) | Indirect only (lab experiments on other services) |
| Choose-your-path / several short flows | Emerging | [Navattic 2026](https://www.navattic.com/report/state-of-the-interactive-product-demo-2026) | Vendor data: multi-flow completion 57% vs 35% |

---

## Evidence

### 1. The time budget: "under a minute" is really "under ten seconds, then thirty"

- **Easy answer? Yes.** NN/g finds that "the first 10 seconds of the page visit are critical." To earn several minutes of attention you "must clearly communicate your value proposition within 10 seconds." And "only after people have stayed on a page for about 30 seconds does the curve become relatively flat" ([Nielsen, NN/g, 2011](https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/)).
- **Hiring readers scan too.**
  - NN/g surveyed 204 UX hiring managers: "Very rarely will hiring managers take the time to read your entire portfolio word for word," so portfolios should be scannable ([Krause, NN/g, 2019](https://www.nngroup.com/articles/ux-design-portfolios/)).
  - The Ladders' 2018 study put the first résumé screen at about 7.4 seconds. Recruiters scanned titles and subheadings, and simple layouts with clear sections held their attention ([HR Dive](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/)). The method is thinly documented and the sample size unpublished ([ERE critique](https://www.ere.net/articles/is-the-6-second-resume-scan-a-myth)), so treat 7.4 s as indicative.
- **Most readers scan pages generally.** In NN/g's testing, 79% of users scanned and 16% read word by word. Their fixes: meaningful subheadings, one idea per paragraph, the conclusion first, and about half the words ([Nielsen, NN/g, 1997](https://www.nngroup.com/articles/how-users-read-on-the-web/)).
- **Hackathon judges get minutes, not seconds.**
  - MLH budgets "4 mins per project," with 2 of them for presentation and demo, and recommends "2 minute videos" ([MLH judging plan](https://guide.mlh.com/general-information/judging-and-submissions/judging-plan)).
  - A Devpost veteran puts it at "around five minutes to judge each project": "make sure the info the judges need is put front and center" ([Biggin, DEV, 2021](https://dev.to/jacklyn/how-to-make-your-devpost-submissions-not-suck-37i0)).
- **What would change the approach (inference):** "under a minute" breaks into three gates.
  1. A ten-second gate: what is this, and for whom?
  2. A thirty-second gate: what did he build, and does it work?
  3. Depth for the reader who stays.

  Each deliverable section needs its own ten-second answer, because readers arrive section by section.

### 2. GTM-engineer portfolios

- **Easy answer? Partly.** Hiring posts ask for the same two artefacts again and again.
  - One "GTM Engineer (Clay & Claude)" post requires "a portfolio or examples of Clay tables, enrichment workflows, or outbound systems you have built" and "a short Loom video (1 to 2 minutes)". The video walks through a workflow, the Claygent prompts, the waterfall enrichment and how the data was activated in a CRM or outbound tool. "Only candidates who submit both a portfolio and Loom video will be moved to the next step" ([Hire Overseas post, Workable](https://jobs.workable.com/jobs/a34ef0b3-a799-4d7f-95eb-c7f11d1ae4d2.md); no posting date shown).
  - Clay-community job posts ask for similar Loom walkthroughs ([search summary of Clay community job threads](https://community.clay.com/x/share-jobs/msg_DLF4pS9nGPWx/hiring-gtm-engineer-with-clay-experience-for-b2b-g)).
- **What practitioners say should be in it.** From a Clay community thread of 12 Aug 2026 ([thread](https://community.clay.com/x/general/msg_TvgEMYnqrGak/do-gtm-engineer-portfolios-need-full-clay-integrat)):
  - "technical skills alone usually aren't enough if you want to get hired as a GTM Engineer." Show that you can take an ICP, segment the market, find accounts and people, and reach them (Mihajlo M.).
  - "Clients care more about the actual relevant data, efficient workflows and outcome of campaigns" (tyee).
  - "GTM Engineer is a bit of a catchall term" (Joe R.), so pick a speciality to lead with.
- **Structure advice from a vendor blog.** "Every project description should start with the problem you solved and the results you achieved. Technical implementation details come later." Also: "A short demo video often communicates more than pages of written explanation." And a warning: "many portfolios are full of technical jargon that business stakeholders can't understand" ([Databar, Jul 2025, updated Oct 2026](https://databar.ai/blog/article/how-to-build-a-gtm-engineering-portfolio-that-gets-you-hired)). Databar is a data-enrichment vendor, so weigh it as practitioner opinion.
- **Traps:**
  - I found **no curated set of "strongest" GTM-engineer portfolios.** The public examples I found are individual Notion or GitHub Pages sites posted for feedback ([Clay community](https://community.clay.com/x/gtm-career-advice/5g4ei0e3k38q/seeking-feedback-and-guidance-on-building-a-portfo)). The advice in those threads is about skills, not presentation.
  - The genre's native artefact, a Clay table or workflow canvas, is dense and tool-shaped. Shown raw to a non-technical reader, it's exactly the "tool, not problem" failure the advice warns against (inference).
- **What would change the approach (inference):** the hiring convention is a 1–2 minute narrated walkthrough plus a written problem → build → result card. That maps directly onto one video and one card per deliverable. The site can borrow the convention instead of inventing a format.

### 3. Hackathon demos

- **Easy answer? Yes.** Organisers converge on "a demo, not a presentation," roughly two minutes long.
  - MLH: "Their video should be a demo of their hack, not a presentation" ([MLH](https://guide.mlh.com/general-information/judging-and-submissions/judging-plan)).
  - ETHGlobal: 2–4 minutes; "DO NOT speed up the video to fit under the time limit"; skip any unnecessary waiting; slides only to summarise, with "no more than 4 bullet points per slide"; at least 720p ([ETHGlobal Superhack rules](https://ethglobal.com/events/superhack/info/details)).
- **A common two-minute shape:** problem (15–20 s, told through one person's day "before and after your tool"), solution in one sentence, live demo 60–90 s, impact 10–15 s, ask 5–10 s. Also: "A working prototype beats slides every single time." Prefer a narrow demo that works over a broad one that crashes, and record a backup video ([Rundberg, Builder Base, 30 Apr 2026](https://intercom.help/builderbase/en/articles/14836128-builder-s-guide-ch-14-crafting-a-demo-that-lands)).
- **A five-time winner's lessons:**
  - "The videos are all many judges will see of your presentation."
  - Judges ask, "If I reward this project, will my company look good?"
  - "Judges did not necessarily reward superior technical output."
  - Rivals "made big claims, and didn't deliver."

  ([Deck, Sustained Writing, 2022](https://sustained.substack.com/p/lessons-from-winning-five-hackathons))
- **Traps:**
  - Speeding footage up to fit a limit (ETHGlobal bans it).
  - Dead waiting time.
  - Architecture and team-bio openings (Builder Base says cut them).
- **What would change the approach (inference):** the judge's question translates into the hiring reader's question: "If I hire this person, does it solve *our* problem and make us look good?" Each demo's opening line could name the company's problem, not the tool.

### 4. "Job application as outreach" sites

- **Easy answer? No.** There's one well-documented case, and it's from 2015.
- **What it contained.** Nina Mufleh's nina4airbnb.com was organised as: what the company was missing; why it mattered; where to start; ongoing partnership opportunities; why she belonged at Airbnb. Her full résumé was a link, not the page ([Fortune, 23 Apr 2015](https://fortune.com/2015/04/23/airbnb-resume)). It carried a market report on Airbnb's Middle East expansion ([Wamda, 23 Apr 2015](https://www.wamda.com/en/2015/04/jordanian-girl-got-innovative-attention-airbnb)). That it mirrored Airbnb's visual design is reported (search summary, LinkedIn Talent Blog; the page returned 502).
- **What came of it.** Airbnb's CMO replied publicly, "We'll set something up for us to meet. I love your smarts" ([Wamda](https://wamda.com/en/2015/04/jordanian-girl-got-innovative-attention-airbnb)). Fortune ran a correction: "An earlier headline for this story incorrectly stated she received a job offer already" ([Fortune](https://fortune.com/2015/04/23/airbnb-resume)).
- **Legibility lesson (inference):** the structure runs from the company's problem to the opportunity, the plan and the fit. The site leads with *their* gap, and the candidate comes last. That's the "outcome first, organised by the reader's problem" pattern in another genre.
- **Traps:**
  - I found no 2024–2026 GTM-specific case with documented outcomes. Vendor claims that résumé sites "10x interviews" are unverified ([search summary](https://caliber.beehiiv.com/p/how-resume-websites-can-10x-your-interview-rate)).
  - Whether the format *lands* is R4's question, not this one.

### 5. B2B demo practice: the closest analogue for a non-technical decision maker

- **Outcome first.** Peter Cohan's *Great Demo!* method, "Do the Last Thing First," turns the demo upside down and presents "the most important deliverables up front." The rationale: the more senior the viewer, the less they care about the process ([S. K. Murphy, partner blog](https://www.skmurphy.com/blog/2014/02/20/improve-your-sales-pitch/)). These are the method's own and its partners' claims, not an independent test.
- **Short flows, choice of path, no gate, high on the page** ([Navattic 2026, 40,000+ demos on its platform](https://www.navattic.com/report/state-of-the-interactive-product-demo-2026)):
  - "The flows with the highest completion rate are between 1 to 6 steps."
  - Demos with two or more flows completed at 57%, against 35% for single-flow demos.
  - Ungated demos beat gated ones on engagement (58% vs 52%) and completion (49% vs 42%).
  - 80% of the top 1% are promoted above the fold or in the navbar.
  - Navattic's own guidance is to pick 2–3 "aha moments" first ([Navattic best practices](https://www.navattic.com/blog/best-practices-building-interactive-demos)).
  - All of this is vendor data.
- **Video length:**
  - Wistia, across 13M+ videos: "Videos under a minute average a 52% engagement rate," and product videos 50%. Engagement is the average share of the video watched ([Wistia, Jul 2025](https://wistia.com/blog/optimal-video-length)).
  - Vidyard reports that engagement peaks in the first 10% of a video, whatever its length, then declines ([search summary, SEJ on Vidyard](https://www.searchenginejournal.com/b2b-video-shorter-length-watched-longer/312915/)).
- **Captions.** In a 2019 survey of 5,616 US adults, 69% said they watch video with the sound off in public. 80% said they're more likely to watch a whole video when it has captions ([3Play Media on Verizon Media/Publicis](https://www.3playmedia.com/blog/verizon-media-and-publicis-media-find-viewers-want-captions/)). That's a share of respondents, not "80% more likely."
- **What would change the approach (inference):** ten deliverables on one site is a multi-flow demo. Navattic's data favours letting the visitor pick a path through short flows over one long tour. And the first 10% of every video carries most of the viewing, so the outcome belongs there.

### 6. Candidate by candidate

**Short video.**
- **Converged:** yes ([MLH](https://guide.mlh.com/general-information/judging-and-submissions/judging-plan), [job post](https://jobs.workable.com/jobs/a34ef0b3-a799-4d7f-95eb-c7f11d1ae4d2.md), [Wistia](https://wistia.com/blog/optimal-video-length)).
- **Traps:** a presentation instead of a demo; footage sped up; dead time; relying on sound; the payoff arriving late.

**Before/after.**
- **Converged:** as a storytelling device, yes ([Builder Base](https://intercom.help/builderbase/en/articles/14836128-builder-s-guide-ch-14-crafting-a-demo-that-lands); the problem → plan structure of [Nina4Airbnb](https://fortune.com/2015/04/23/airbnb-resume)).
- **Gap:** no tested data.
- **Trap (inference):** a "before" that's a straw man reads as a sales trick.

**"How it works" panel.**
- **Converged:** as a landing-page convention of 3–4 verb-led steps, yes ([landing-page guide](https://www.pravinkumar.co/blog/webflow-how-it-works-section-design-2026)). The evidence is blog-level. It agrees with the scanning research ([NN/g](https://www.nngroup.com/articles/how-users-read-on-the-web/)) and with progressive disclosure: "Initially, show users only a few of the most important options" ([Nielsen, NN/g, 2006](https://www.nngroup.com/articles/progressive-disclosure/)).
- **Trap:** steps that name tools ("Apify actor → JSON → Claude") rather than outcomes (inference).

**Live build log.**
- **Converged:** no.
- **Indirect support:**
  - In five experiments with simulated travel and dating sites, people preferred sites that showed their effort, even with longer waits and identical results. Perceived effort produced feelings of reciprocity ([Buell & Norton, *Management Science* 2011](https://ideas.repec.org/a/inm/ormnsc/v57y2011i9p1564-1579.html); INFORMS page blocked, IDEAS abstract used).
  - "The predictability of the interaction creates trust" ([Harley, NN/g, 2018](https://www.nngroup.com/articles/visibility-system-status/)).
  - "Update your site's content often (at least show it's been reviewed recently)" ([Stanford guideline 8](https://credibility.stanford.edu/guidelines/index.html)).
- **Caveats:**
  - A 2023 replication of the related effort heuristic was mixed: support for liking and quality, none for monetary value ([Ziano et al., *Collabra* 2023](https://forrt.org/flora-replication-atlas/doi/10.1525/collabra.87489/)).
  - Real transparency shows idleness as well as industry ([Bray 2023](https://ideas.repec.org/a/inm/ormsom/v25y2023i3p812-826.html), search summary).
  - "Build in public" advocacy is anecdotal, with no controlled studies ([Failory](https://failory.com/blog/building-in-public)).

**Deliverables view with status.**
- **Converged:** as a UX principle, yes: visibility of system status is NN/g's usability heuristic #1 ([NN/g](https://www.nngroup.com/articles/visibility-system-status/)).
- **Trap (inference):** many "not started" rows at equal weight read as unfinished work.

---

## What makes these demos read as toys, or as noise

### Toy signals

1. **Generic or fake-looking data.**
   - Databar warns against tutorial-style scenarios such as a "sample e-commerce recommendation engine." Where real data isn't available, it suggests "realistic simulations or examples based on industry benchmarks" ([Databar](https://databar.ai/blog/article/how-to-build-a-gtm-engineering-portfolio-that-gets-you-hired)).
   - Demo-data vendors argue that names like "John Doe" and data that doesn't match the buyer's industry make a demo feel generic ([Demostack](https://demostack.com/post/good-fake-data-is-hard-to-find), [Tonic](https://www.tonic.ai/blog/3-ways-to-nail-your-demo-data); vendor claims, no controlled study).
   - **This collides with the charter rule** that "no real data runs through" the demos, except the D3 live run (inference).
2. **The claim outruns what's shown, or edits aren't disclosed.**
   - Google's Gemini "Hands-on" video was made by prompting "using still image frames from the footage, and prompting via text." TechCrunch concluded: "The 'interaction' showed in the video didn't happen" ([Coldewey, TechCrunch, 7 Dec 2023](https://techcrunch.com/2023/12/07/googles-best-gemini-demo-was-faked/)).
   - Cognition's Devin demo was picked apart frame by frame. The critique said it solved a different task than the client asked for, and that the timeline was compressed ([80.lv summarising Internet of Bugs](https://80.lv/articles/first-ai-software-engineer-creators-are-accused-of-lying/); secondary source).
   - The lesson (inference): a clipped video needs to say on screen what was cut and what's live.
3. **Breadth over one working path.** "A working prototype beats slides every single time," and a narrow demo that works beats a broad one that crashes ([Builder Base](https://intercom.help/builderbase/en/articles/14836128-builder-s-guide-ch-14-crafting-a-demo-that-lands)). Rivals who "made big claims" lost ([Deck](https://sustained.substack.com/p/lessons-from-winning-five-hackathons)).
4. **The tool is the headline, not the problem.**
   - Feature tours lose non-technical buyers. The advice is to open with the business problem and hide "the settings, the edge cases, and the clever engineering" ([eChai founder guide](https://echai.ventures/startingup/founder-sales/when-my-product-is-technical-and-i-am-selling-to-non-technical-buyers-how-do-i-demo-it-without-confusing-them)).
   - Overly complex builds made to show off are a named portfolio anti-pattern ([Databar](https://databar.ai/blog/article/how-to-build-a-gtm-engineering-portfolio-that-gets-you-hired)).
5. **Unlabelled or ambiguous AI.**
   - In two preregistered experiments (N = 4,976), labelling headlines "AI-generated" lowered perceived accuracy and willingness to share, even for true or human-made headlines. The cause was the assumption that the content was entirely AI-written.
   - When participants were told the AI only improved the wording or drafted under human direction, the penalty largely disappeared ([Altay & Gilardi, *PNAS Nexus* 2024](https://academic.oup.com/pnasnexus/article/3/10/pgae403/7795946)).
   - That bears directly on the LinkedIn content demo (D7) and the blog pipeline (D4/D5) (inference).
6. **Novelty format over content (inference).** A gamified or overly clever layout costs scan time. The résumé study found that simple layouts with clear sections held attention ([HR Dive](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/)).
7. **Small errors.** "Avoid errors of all types, no matter how small they seem" ([Stanford guideline 10](https://credibility.stanford.edu/guidelines/index.html)). A broken link or a "TODO" on a demo site is the cheapest way to read as a toy (inference).

### Noise signals

1. **Text that can't be scanned.** 79% of readers scan ([NN/g](https://www.nngroup.com/articles/how-users-read-on-the-web/)).
2. **Everything at equal weight.** No progressive disclosure ([NN/g](https://www.nngroup.com/articles/progressive-disclosure/)). Ten deliverables shown as ten equal panels, each with full detail, is a feature tour (inference).
3. **Raw logs and raw footage.**
   - A commit feed or an unedited rig clip shows effort, but also idleness and dead ends ([Bray](https://ideas.repec.org/a/inm/ormsom/v25y2023i3p812-826.html), search summary).
   - The labor-illusion benefit presumes the work shown is legible as work ([Buell & Norton](https://ideas.repec.org/a/inm/ormnsc/v57y2011i9p1564-1579.html)); applying that to a raw log is inference.
4. **Long videos with dead time** ([ETHGlobal](https://ethglobal.com/events/superhack/info/details), [Wistia](https://wistia.com/blog/optimal-video-length)).
5. **Too much promotion.** "Use restraint with any promotional content" ([Stanford guideline 9](https://credibility.stanford.edu/guidelines/index.html)). On a job-application site, the self-promotion is the promotional content (inference).

---

## What this means for each DoD item (inference, built on the evidence above)

**DoD-8 (a visitor can follow the scraping demo without explanation).**
- **The converged form:** the output first (a readable research result), then "how it works" in 3–4 outcome-worded steps, then the raw layer (requests, JSON, actor names) behind a "show me how" toggle.
- **The trap:** sample data that looks generic.
- **"Without explanation" can be tested.** A five-second test shows the page briefly, then asks what people remember and understand. Lyssna suggests 5–10 participants to find the major issues ([Lyssna guide](https://www.lyssna.com/guides/five-second-testing-guide/); vendor).

**DoD-13 (a video shows the live GetSales pipeline run).**
- **The converged form:**
  - ≤ 2 minutes, a demo not a deck.
  - The end state in the first seconds: the message in GetSales.
  - One labelled chapter per stage. DoD-13 names five: Sales Navigator, CSV export, enrichment, the computed first-message variable, import.
  - Captions for sound-off viewing.
  - Waiting cut out, but no speeding up.
  - Cuts disclosed on screen.
- **Where privacy and legibility agree (inference):** tight crops and zooms help a non-technical viewer and also keep Alex's own GetSales outbound off screen (DoD-22).

**DoD-17 (the LinkedIn content demo is on the site).**
- **The converged form:** the input (the brief or voice capture), then the output (the post), then the human step (Alex's edits and sign-off).
- **The evidence-backed label:** state that AI drafted under his direction and that he edited and approved it. That's the condition under which the AI penalty disappeared ([Altay & Gilardi](https://academic.oup.com/pnasnexus/article/3/10/pgae403/7795946)).
- **Before/after:** a draft-versus-final view shows "the last 10%."

**DoD-19 (the site shows every deliverable and its status, and keeps getting clearer).**
- **Supported:** a status view ([NN/g heuristic #1](https://www.nngroup.com/articles/visibility-system-status/)) and visible, dated updates ([Stanford guideline 8](https://credibility.stanford.edu/guidelines/index.html), [labor illusion](https://ideas.repec.org/a/inm/ormnsc/v57y2011i9p1564-1579.html)).
- **Not supported by evidence:** a raw build feed.
- **Choice of paths:** Navattic's multi-flow data argues for letting the visitor choose a deliverable over one long scroll ([Navattic 2026](https://www.navattic.com/report/state-of-the-interactive-product-demo-2026)).

---

## Evidence gaps

- **No study of non-technical decision makers reading GTM-engineer portfolios.** The GTM evidence is job posts and community opinion. I found no ranked or curated set of "the strongest" portfolios, so I can't name exemplars with confidence.
- **"Job application as outreach" has one documented case,** Nina4Airbnb (2015). Its outcome beyond an interview is unconfirmed, and Fortune corrected a headline that claimed an offer. I found no recent GTM case with documented results.
- **Live build log:** no direct evidence in hiring or portfolio contexts. The support is lab experiments on travel and dating sites (Buell & Norton) plus UX heuristics, extrapolated. I couldn't read the full Buell & Norton paper (INFORMS and HBS returned 403), so the boundary conditions it tests are unknown to me.
- **Before/after and "how it works":** conventions only, with no controlled tests found.
- **Video length and interactive-demo figures** are vendor platform data (Wistia, Navattic, Vidyard), self-reported and not independent. The Vidyard first-10% finding is from a search summary I didn't fetch.
- **Toy perception** isn't studied directly. My list combines failure cases (Gemini, Devin), practitioner advice and the credibility guidelines.
- **The Devin critique** comes through secondary coverage of one critic's video. I didn't watch the original.
- **Unverified:** the widely repeated NN/g "10–20 seconds" figure. NN/g's own article gives the 10-second and 30-second thresholds used above ([NN/g](https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/)).

---

## Recommendations (evidence plus options; every call is Alex's)

1. **Adopt the converged order as the site's section template?**
   - **Evidence:** outcome first → demo ≤ 2 min → 3–4 step "how it works" → depth on request (sections 3, 5, 6).
   - **Option A:** one template for every deliverable section, with the outcome line, the video or interactive piece, the steps and a toggle for the technical layer. It's consistent, and the website session can reuse it.
   - **Option B:** the template for D1, D3 and D7 only, with lighter cards for the rest.
   - **Option C:** leave each spec free. That risks the "equal weight, no hierarchy" noise.
2. **How to show demo data under the charter's "no real data" rule?**
   - **Evidence:** generic data reads as a toy ([Databar](https://databar.ai/blog/article/how-to-build-a-gtm-engineering-portfolio-that-gets-you-hired), demo-data vendors), and Databar suggests realistic, benchmark-based simulations instead.
   - **Option A:** realistic synthetic data in the target's own domain, labelled "sample."
   - **Option B:** public, non-personal data only (for example, company-level pages), shown live.
   - **Option C:** show the shape of the output with placeholders, and accept the toy risk.
   - **Note:** R3 governs what personal data may appear.
3. **What form does "keeps getting clearer" (DoD-19) take?**
   - **Evidence:** status visibility and dated updates are supported. Raw logs aren't, and they expose idle time.
   - **Option A:** a curated "what changed" list (date, time, one plain line, a link to the section), fed by the legibility analyzer's build requests.
   - **Option B:** status badges per deliverable plus a "last updated" stamp, with no log.
   - **Option C:** a live feed. That's the highest noise risk.
   - **To decide either way:** done items first, and statuses in plain words.
4. **Spec the DoD-13 video against the hackathon rules?**
   - **Evidence:** ≤ 2 min ([MLH](https://guide.mlh.com/general-information/judging-and-submissions/judging-plan)); no speed-up, dead time cut ([ETHGlobal](https://ethglobal.com/events/superhack/info/details)); captions ([Verizon/Publicis](https://www.3playmedia.com/blog/verizon-media-and-publicis-media-find-viewers-want-captions/)); the outcome in the first 10% ([Vidyard](https://www.searchenginejournal.com/b2b-video-shorter-length-watched-longer/312915/), search summary); edits disclosed ([Gemini](https://techcrunch.com/2023/12/07/googles-best-gemini-demo-was-faked/)).
   - **Option A:** one ~90-second cut with five stage chapters.
   - **Option B:** a ~60-second highlight plus the longer cut for the reader who stays.
   - **Either way:** the stage labels and the "cut for length" note go on screen.
5. **Label the AI work in D4, D5 and D7?**
   - **Evidence:** the AI-label penalty disappears when human direction is stated ([Altay & Gilardi](https://academic.oup.com/pnasnexus/article/3/10/pgae403/7795946)).
   - **Option A:** a plain line on each piece, such as "Drafted with AI from Alex's dictation or brief, edited and approved by Alex," with before/after where it helps.
   - **Option B:** no label. That leaves visitors to assume full automation.
6. **Test "without explanation" before calling DoD-8 done?**
   - **Evidence:** the five-second test method, 5–10 people ([Lyssna](https://www.lyssna.com/guides/five-second-testing-guide/)).
   - **Option A:** Alex shows each section to 3–5 non-technical people for 5–10 seconds and asks: "What is this? Who made it? What could he do for this company?"
   - **Option B:** an agent reviews screenshots against the ten-second question. It's cheaper, but not a human test.
   - **Option C:** skip the test and rely on review.
7. **Let the visitor choose a path?**
   - **Evidence:** multi-flow demos 57% vs 35% completion (vendor; [Navattic](https://www.navattic.com/report/state-of-the-interactive-product-demo-2026)).
   - **Option A:** a top-of-page chooser, either by stakeholder or by deliverable, that leads into short flows.
   - **Option B:** one guided scroll.

---

## Sources

**Research and UX**
- Nielsen, J. (2011). How Long Do Users Stay on Web Pages? NN/g. https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/
- Nielsen, J. (1997). How Users Read on the Web. NN/g. https://www.nngroup.com/articles/how-users-read-on-the-web/
- Nielsen, J. (2006). Progressive Disclosure. NN/g. https://www.nngroup.com/articles/progressive-disclosure/
- Harley, A. (2018). Visibility of System Status. NN/g. https://www.nngroup.com/articles/visibility-system-status/
- Krause, R. (2019). UX Design Portfolios (survey of 204 hiring managers). NN/g. https://www.nngroup.com/articles/ux-design-portfolios/
- Fogg, B. J. (2002). Stanford Web Credibility Guidelines. https://credibility.stanford.edu/guidelines/index.html
- Buell, R. W. & Norton, M. I. (2011). The Labor Illusion. *Management Science* 57(9). https://ideas.repec.org/a/inm/ormnsc/v57y2011i9p1564-1579.html (DOI 10.1287/mnsc.1110.1376)
- Bray, R. (2023). Operational Transparency: Showing When Work Gets Done. *MSOM*. https://ideas.repec.org/a/inm/ormsom/v25y2023i3p812-826.html (search summary)
- Ziano, I. et al. (2023). "The Effort Heuristic" Revisited. *Collabra: Psychology*. https://forrt.org/flora-replication-atlas/doi/10.1525/collabra.87489/
- Altay, S. & Gilardi, F. (2024). People are skeptical of headlines labeled as AI-generated. *PNAS Nexus* 3(10). https://academic.oup.com/pnasnexus/article/3/10/pgae403/7795946
- The Ladders eye-tracking study (2018), via HR Dive: https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/ ; critique: https://www.ere.net/articles/is-the-6-second-resume-scan-a-myth
- Verizon Media/Publicis (2019) captions survey, via 3Play Media: https://www.3playmedia.com/blog/verizon-media-and-publicis-media-find-viewers-want-captions/

**Hackathon organisers and practitioners**
- MLH Hackathon Organizer Guide, Judging Plan: https://guide.mlh.com/general-information/judging-and-submissions/judging-plan
- ETHGlobal Superhack, submission details: https://ethglobal.com/events/superhack/info/details
- Biggin, J. (2021). How to make your Devpost submissions not suck. https://dev.to/jacklyn/how-to-make-your-devpost-submissions-not-suck-37i0
- Rundberg, N. (2026). Builder's Guide Ch. 14: Crafting a Demo That Lands. https://intercom.help/builderbase/en/articles/14836128-builder-s-guide-ch-14-crafting-a-demo-that-lands
- Deck, R. (2022). Lessons from Winning Five Hackathons. https://sustained.substack.com/p/lessons-from-winning-five-hackathons

**GTM-engineer hiring and portfolios**
- Hire Overseas, GTM Engineer (Clay & Claude) post: https://jobs.workable.com/jobs/a34ef0b3-a799-4d7f-95eb-c7f11d1ae4d2.md
- Clay community, "Do GTM engineer portfolios need full Clay integrations?" (Aug 2026): https://community.clay.com/x/general/msg_TvgEMYnqrGak/do-gtm-engineer-portfolios-need-full-clay-integrat
- Clay community, "Seeking feedback… portfolio for GTM Engineering roles" (Jun 2026): https://community.clay.com/x/gtm-career-advice/5g4ei0e3k38q/seeking-feedback-and-guidance-on-building-a-portfo
- Clay community job thread (Loom walkthrough request): https://community.clay.com/x/share-jobs/msg_DLF4pS9nGPWx/hiring-gtm-engineer-with-clay-experience-for-b2b-g
- Databar. How to Build a GTM Engineering Portfolio That Gets You Hired: https://databar.ai/blog/article/how-to-build-a-gtm-engineering-portfolio-that-gets-you-hired

**Job application as outreach**
- Snyder, B. (2015). Fortune on nina4airbnb (with correction): https://fortune.com/2015/04/23/airbnb-resume
- Knight, L. (2015). Wamda on nina4airbnb: https://www.wamda.com/en/2015/04/jordanian-girl-got-innovative-attention-airbnb
- Caliber, résumé websites claim (unverified): https://caliber.beehiiv.com/p/how-resume-websites-can-10x-your-interview-rate

**B2B demo and video practice (vendor data marked)**
- S. K. Murphy on Peter Cohan's *Great Demo!*: https://www.skmurphy.com/blog/2014/02/20/improve-your-sales-pitch/
- Navattic, State of the Interactive Product Demo 2026 (vendor): https://www.navattic.com/report/state-of-the-interactive-product-demo-2026
- Navattic, Best Practices for Building Interactive Demos (vendor): https://www.navattic.com/blog/best-practices-building-interactive-demos
- Wistia, Optimal Video Length (Fishman & Hoogervorst, 2025; vendor): https://wistia.com/blog/optimal-video-length
- Search Engine Journal on Vidyard engagement (search summary): https://www.searchenginejournal.com/b2b-video-shorter-length-watched-longer/312915/
- eChai, demoing technical products to non-technical buyers: https://echai.ventures/startingup/founder-sales/when-my-product-is-technical-and-i-am-selling-to-non-technical-buyers-how-do-i-demo-it-without-confusing-them
- Demostack, Good Fake Data is Hard To Find (vendor): https://demostack.com/post/good-fake-data-is-hard-to-find
- Tonic.ai, Don't be uncanny (vendor): https://www.tonic.ai/blog/3-ways-to-nail-your-demo-data
- "How it works" section guide (blog): https://www.pravinkumar.co/blog/webflow-how-it-works-section-design-2026
- Lyssna, Five-second testing guide (vendor): https://www.lyssna.com/guides/five-second-testing-guide/
- Failory, Building in public: https://failory.com/blog/building-in-public

**Failure cases**
- Coldewey, D. (2023). Google's best Gemini demo was faked. TechCrunch. https://techcrunch.com/2023/12/07/googles-best-gemini-demo-was-faked/
- 80.lv on the Internet of Bugs critique of Devin (secondary): https://80.lv/articles/first-ai-software-engineer-creators-are-accused-of-lying/
