# Research directory

The one index of every research report in this project, at both levels (SPEC.md section 6). Look here first. Each entry says where the report lives, what it decides, what it governs, when to read it and its caveats.

Storage (S1-Q5, Alex: "Just store it locally"): every report lives in `research\` and never moves. Parent-level reports are in `research\global\`, child-level ones in `research\<spec folder>\`.

## Lists

| List | Readers | Status | Approved by |
| --- | --- | --- | --- |
| [L-01 parent](lists/L-01-parent.md) | every wave-2 spec | running: 6 of 7 accepted, synthesis next | OT-01, Alex, 14:38 |
| [L-02 scraping](lists/L-02-scraping.md) | (S-D1 declined) | parked: Alex runs the scraping himself | — |
| [L-03 blog](lists/L-03-blog.md), [L-04 GetSales](lists/L-04-getsales.md), [L-05 brand assets](lists/L-05-brand-assets.md) | S-D4/S-D5, S-D3, S-D6/S-D7/S-D10 | drafts, waiting for a `RESEARCH` request | — |

## Parent level

Research that two or more specs need, or that shapes the whole project. All of L-01 is here, in `research\global\`. Every recommendation in these reports is an option for Alex, not a decision.

### L-01-R1 Making the work legible · [global/L-01-R1-legibility.md](global/L-01-R1-legibility.md)
- **Verdicts:** there's a converged *order*, not a format: outcome first, then a short demo (about 2 minutes or less), then a 3–4 step "how it works", detail on request, each framed around the reader's problem rather than the tool. A raw live build log has the weakest evidence and the highest noise risk; a short dated "what changed" list is supported. Toy signals: generic or fake-looking data, demos that claim more than they show, breadth over one working path, the tool as the headline, unlabelled AI work. Noise: equal weight on everything, unscannable text, long raw logs or videos.
- **Bears on the plan:** the "no real data" rule conflicts with "generic data reads as a toy" (options given). For the GetSales clip: 2 minutes or less, result in the first seconds, captions, cuts marked. For the LinkedIn content demo: an "AI-generated" label lowers trust unless it says AI drafted under human direction.
- **Governs:** DoD-8, DoD-13, DoD-17, DoD-19. **Read this when** designing any section of the site, a demo walkthrough or a clip.
- **Caveats:** no curated set of "strongest" GTM portfolios exists; only one documented "job application as outreach" site (Nina Mufleh, Airbnb, 2015); video-length figures are vendor data.

### L-01-R2 What a GTM engineer is hired to show · [global/L-01-R2-gtm-engineer-hiring.md](global/L-01-R2-gtm-engineer-hiring.md)
- **Verdicts:** employers converge on someone who builds automated systems to find accounts, enrich them, personalise outreach and route leads, proven by a 1–2 minute recorded walkthrough of a real workflow (problem, tools, result, what broke). Most-named tools: Clay, HubSpot or Salesforce, AI agents, increasingly Claude Code. Strongest fits: D3 (GetSales), then D1 (scraping) and D9 (the clip-to-website analyser). The project's own agent setup matches the fastest-growing asks but isn't shown on the site. D6 and D10 (Canva) matched no GTM job post.
- **Gaps none of the deliverables shows:** measured business results, any CRM write, Clay, email deliverability, what happens when something breaks, the decisions and trade-offs behind the build, signal-triggered or inbound routing. Several cost words on the site, not build hours.
- **Governs:** the outcome; closest DoD-18, DoD-19. **Read this when** framing the site, choosing what each demo claims, or writing the "about this application" copy.
- **Caveats:** the State of GTM Engineering figures are unverified; agency evidence leans on Clay's job board; nothing found for Prague. Whether Addvery hires like an agency or an in-house team is Alex's call from his own research.

### L-01-R3 Personal data on a public site · [global/L-01-R3-personal-data.md](global/L-01-R3-personal-data.md)
- **Verdicts:** GDPR legitimate interest can cover the outreach to the six with a dated one-page balancing test, minimal data, and a first message that links to a notice and states the right to object. LinkedIn's terms are the practical risk: scraping, copying LinkedIn content to other sites and automated sending are banned, and the exposure is Alex's own account. The public stakeholder sections are the weakest point: build them around the role and the company's own public material, no photos, notice before a section goes live, one-click removal.
- **Has:** a "safe / risky / keep off" table for the stakeholder sections (section 7) and a 10-point list of what the live run needs.
- **Flags a DoD conflict:** DoD-22 (keep Alex's GetSales outbound off everything published) against DoD-13 (a clip of the live run in GetSales).
- **Governs:** DoD-13, DoD-18, DoD-22. **Read this when** writing a stakeholder section, the alert or any message to the six, or anything that uses scraped LinkedIn data.
- **Caveats:** not legal advice. Unsettled: whether a job application is a "commercial communication" under Czech law, which country's anti-spam rule applies, and where GetSales and Apify process data. The EDPB legitimate-interest guidelines are still the 2024 consultation draft.

### L-01-W1 Wildcard, can it be executed? · [global/L-01-W1-wildcard-executed.md](global/L-01-W1-wildcard-executed.md)
- **Question it picked:** can one Claude subscription and one Windows machine keep a dozen-plus parallel background sessions working through the day and an unattended night, and what stops them?
- **Verdicts:** every session draws on one subscription's 5-hour and weekly limits. Background sessions that hit a limit stop and stay stopped unless `CLAUDE_CODE_RETRY_WATCHDOG` is set (it isn't) or usage credits are on (unchecked). Windows Update's active hours end at 03:00, so a restart could stop every session between 03:00 and 09:00. Sessions idle for about an hour are stopped. Each fix takes minutes, best done before the evening forks.
- **Governs:** P6 and every DoD item due by the morning. **Read this when** setting up the overnight run or a fork.
- **Caveats:** Alex's plan tier and usage weren't read (account data; `/usage` shows it). Two claims rest on third-party reports and are marked "verify first".

### L-01-W2 Wildcard, can it be delivered? · [global/L-01-W2-wildcard-delivered.md](global/L-01-W2-wildcard-delivered.md)
- **Question it picked:** when the 15:30 LinkedIn alert puts the site in front of the six, what reaches each of them, when do they click, and does the link land on something that works and reads as finished?
- **Verdicts:** most of the six will only see the short note (on vendor averages about 1.6 of 6 accept). Clicks come mostly within 24 hours, before the site is about them. The link arrives bare: the site had no Open Graph tags (S1 confirmed), and `*.vercel.app` from an unknown sender is a flagged phishing signal. It fails outright if a deployment URL is pasted instead of the production alias, or if the Hobby plan pauses the project.
- **Has:** a hand-over checklist for the morning cleanup (C7).
- **Governs:** DoD-13, DoD-18, DoD-19, DoD-22. **Read this when** preparing any link that goes to the six, the preview card, or the hand-over.
- **Caveats:** whether a URL in a connection note is clickable is unsettled; acceptance figures are vendor data for cold sales outreach.

### L-01-W3 Wildcard, will it be received? · [global/L-01-W3-wildcard-received.md](global/L-01-W3-wildcard-received.md)
- **Question it picked:** when the six learn that AI agents made most of the application, including each person's opening line, will they read the AI as the skill Alex is selling, or as a shortcut?
- **Verdicts:** by default visible AI use costs trust (studies 2023–2026). Three conditions shrink or reverse it: the AI fits the task, the evaluator uses AI a lot, and Alex tells the story himself rather than being found out. A GTM demo can score well on all three. The risk sits in the personal parts: the AI-written opening line and any agent-drafted stakeholder note, where the penalty survived honest disclosure. The scraping, the ICPs and the classifier are where AI reads as skill.
- **Governs:** the outcome; closest DoD-13, DoD-18, DoD-19. **Read this when** writing anything personal to the six, or deciding how the site credits the agents and Alex.
- **Caveats:** no study of this exact case; several papers read at abstract or press-release level.

## Child level

Research only one spec needs, grouped by spec.

No reports yet.

## Reverse index: reports by spec

| Spec | Reports to read before writing its methodology |
| --- | --- |

## Precedence

1. The synthesis adjudicates between reports.
2. A live probe outranks literature on a tool's behaviour, within what it tested.
3. Otherwise the disagreement is live and goes to Alex.
4. Alex's directives outrank everything.

A finding Alex overrides is edited in place, marked `Overridden by Alex, <time>`, and its readers are told.
