# Research directory

The one index of every research report in this project, at both levels (SPEC.md section 6). Look here first. Each entry says where the report lives, what it decides, what it governs, when to read it and its caveats.

Storage (S1-Q5, Alex: "Just store it locally"): every report lives in `research\` and never moves. Parent-level reports are in `research\global\`, child-level ones in `research\<spec folder>\`.

## Lists

| List | Readers | Status | Approved by |
| --- | --- | --- | --- |
| [L-01 parent](lists/L-01-parent.md) | every wave-2 spec | done 15:05: 7 reports and the synthesis; on every reader's reading list (S2 change C07) | OT-01, Alex, 14:38 |
| [L-02 scraping](lists/L-02-scraping.md) | (S-D1 declined) | parked: Alex runs the scraping himself | — |
| [L-03 blog](lists/L-03-blog.md) | S-D5 (S-D4 retired) | on hold since 16:47 (orchestration's reset): all 10 reports accepted in `research\global\L-03-*.md`, entries and synthesis to follow on RESTART | OT-04, changes applied (`Operator tasks\Archive\Approve - research for the blog pipeline.md`) |
| [L-04 GetSales](lists/L-04-getsales.md), [L-06 website](lists/L-06-website.md) | S-D3; S-D8 | with Alex, one gate: `Operator tasks\Archive\Approve - research for the GetSales demo and website.md` (OT-03) | — |
| [L-05 brand assets](lists/L-05-brand-assets.md) | S-D6, S-D7, S-D10 | done 16:47: 7 reports and the synthesis | OT-09, ticked with changes, 16:29 (`Operator tasks\Archive\Approve - Canva and LinkedIn demo research.md`) |

## Parent level

Research that two or more specs need, or that shapes the whole project. L-01, L-03 and L-05 are here, in `research\global\`. Every recommendation in these reports is an option for Alex, not a decision. **Start with the synthesis.**

### L-05 synthesis (Canva templates, LinkedIn posts, Canva video) · [global/L-05-synthesis.md](global/L-05-synthesis.md)
- **Strongest findings:** (1) The Canva connector can't be today's route for the import or the locks: it can't lock elements or upload fonts, and imports only from a public URL, while the templates are local files held until sign-off (R2, W1). Alex by hand off camera, or the import as the 17:15 scene, after a 2-minute test import of the smallest template. (2) "Anyone can fill them in" isn't true as built: ordinary-design locks are guard rails anyone with edit rights can undo, Brand Templates can't leave a team, and custom fonts and brand kits don't carry to another account. Addvery's people get pictures unless a private template link goes in the hand-over (R3, W2). Canva-library stand-in fonts are right on three grounds. (3) The posts' scores measure rule-following, not whether a post sounds like Addvery: show them rule by rule and treat Alex's sign-off as the real check (R4, overriding W3's guess).
- **Has:** five lines for the next 30 minutes; convergences with their strength; conflicts adjudicated, each with the 2-to-5-minute probe that settles it (no report ran a live probe); recommendations per spec, tagged; 12 one-line questions for Alex, each naming the spec it blocks.
- **Governs:** the S-D6, S-D7 and S-D10 methodologies; DoD-16, DoD-17, DoD-21, DoD-22. **Read this when** bringing the templates into Canva, writing the D6 or D7 site claim, scoring or presenting the posts, or briefing the Canva scene.
- **Caveats:** no live probe of Canva, the connector or LinkedIn; R2, R3, W1 and W2 lean on the same Canva help pages, counted once. The leader is unnamed in tracked files.

### L-05-R1 Alex's earlier pixel-perfect demo · [global/L-05-R1-pixel-perfect-demo.md](global/L-05-R1-pixel-perfect-demo.md)
- **Verdicts:** it made one format, a 1200x1200 PNG LinkedIn speaker card: an agent fills a static HTML/CSS page on a fixed backdrop and headless Chrome screenshots it. Canva was only the first sketch, later replaced. Reusable: the method, not the files (render flags, bundled fonts, backdrop plus fixed slots, character budgets measured on real renders, "halt, don't degrade", the edge check). Hard: guessed text budgets clipped a card; colour-based geometry broke on brand colours; Windows traps (Chrome can't write to Desktop folders, a comma decimal locale breaks CSS numbers); 17 days for one template.
- **Bears on the plan:** the old demo went from Canva to code, and this redo goes the other way, so the pixel-perfect guarantee ends at import. It's also the "template in the background, AI text on top" method Alex named for the blog and LinkedIn imagery (OT-04).
- **Governs:** DoD-16. **Read this when** building templates or any card image code-first. **Caveats:** the repo has no licence, so reusing its code is Alex's call; its public history is squashed; no Canva or LinkedIn behaviour tested.

### L-05-R2 What Canva can do now · [global/L-05-R2-canva-capabilities.md](global/L-05-R2-canva-capabilities.md)
- **Verdicts:** Enterprise is no longer needed: API autofill opened to Pro and Teams on 2026-09-21, and brand templates need any paid plan. The connector creates, imports (from a URL), resizes, fills and exports; no documented tool locks elements, uploads fonts or edits a brand kit. LinkedIn: the company cover is now 1512x256, the personal banner 1584x396, the event cover 16:9; document posts take up to 100 MB and 300 pages; there's no official feed-image size (1080x1080 and 1080x1350 are third-party).
- **Governs:** DoD-16, DoD-21. **Read this when** choosing the Canva route or plan, or setting sizes. **Caveats:** the connector wasn't called; one Canva snippet says its tools were cut to two; which plan has element locking is contradictory.

### L-05-R3 Pixel-perfect in Canva · [global/L-05-R3-pixel-perfect-canva.md](global/L-05-R3-pixel-perfect-canva.md)
- **Verdicts:** a full Lock on brand elements and "Lock position only" on slots; locks bind only in Brand Templates. Fixed art as a locked PNG or simple SVG; editable text must be native Canva text in a static font; whole-template PDF import risks substitution and shift. Export PNG at exact size (LinkedIn up to 5 MB, 3:1 to 4:5); the carousel as PDF Standard, flattened, RGB, no bleed. Cropped-out image parts are recoverable from Canva PDFs that LinkedIn lets viewers download (a DoD-22 point).
- **Has:** a 17-item checklist for the export checker. **Governs:** DoD-16, DoD-21, DoD-22. **Read this when** building, locking or exporting a template, or checking an export. **Caveats:** documentation only; Canva's PDF-import pages contradict each other; LinkedIn's recompression is undocumented.

### L-05-R4 LinkedIn posts in a brand's voice · [global/L-05-R4-brand-voice-posts.md](global/L-05-R4-brand-voice-posts.md)
- **Verdicts:** a judge scoring against AI-extracted traits shows rule-following, not voice (an Aug 2026 study: an authorship model found no difference, and the judge rated generated text above the real author). Example posts chosen for variety beat descriptions. LinkedIn added a "Seems like AI slop" flag on 30 July 2026; stock phrasings and posts with no concrete detail lose reach (vendor). Formats, company pages Q3 2026: document carousels and multi-image lead (vendor). A leader's personal brand: the leader posts and the company amplifies; it needs the leader's own material and approval.
- **Governs:** DoD-17. **Read this when** setting the rubric, judge, baseline or how scores are shown. **Caveats:** format and personal-brand evidence is thin vendor data; no study of a company voice or of Claude.

### L-05-W1 Wildcard, can it be executed? · [global/L-05-W1-wildcard-executed.md](global/L-05-W1-wildcard-executed.md)
- **Question it picked:** can about five locked templates get from local files into Canva by 17:05, and by which route? **Verdicts:** not on the current route and clock (about 17:10-17:20). The connector can't carry local files or set locks; Chrome is the only agent route that can, untested. Fastest: sign off on the exports, then Alex imports by hand or the import becomes the scene, after a 2-minute test. Flagged: the Canva video had no session and nothing to start it.
- **Governs:** DoD-16, DoD-21. **Read this when** timing the Canva step or the scene. **Caveats:** no live test; the tool list is from third-party sources.

### L-05-W2 Wildcard, can it be delivered? · [global/L-05-W2-wildcard-delivered.md](global/L-05-W2-wildcard-delivered.md)
- **Question it picked:** what of a template can Addvery's people actually open and use, and by which route? **Verdicts:** as planned they get pictures; a template can't leave Alex's account whole; only a template link (paid plan) gives an outsider a fillable copy, and it belongs in a private message, not on the site. The video's screen-care list misses Canva's Uploads, Projects and Brand panels.
- **Governs:** DoD-16, DoD-19, DoD-21, DoD-22. **Read this when** writing the D6 claim, the hand-over or the scene's screen care. **Caveats:** no live test of a link or an embed.

### L-05-W3 Wildcard, will it be received? · [global/L-05-W3-wildcard-received.md](global/L-05-W3-wildcard-received.md)
- **Question it picked:** a leader's own voice and personal-brand strategy, unasked and public: gift or overreach? **Verdicts:** company-voice posts and templates land as a gift if framed as tools the team keeps; a named leader's voice, unasked and published, lands as overreach on every strand found. Options are ranked from A (company voice only) to E (published posts in the leader's voice); B and C combine.
- **Governs:** DoD-17, DoD-18. **Read this when** deciding anything personal to a named leader, or framing the templates and posts. **Caveats:** no study of this exact case; the law point is not legal advice.

### L-01 synthesis · [global/L-01-synthesis.md](global/L-01-synthesis.md)
- **Strongest findings:** (1) The stakeholder sections are the most exposed part of the plan. The law (R3) and the creepiness research (R4) independently give the same rule: write about the role, not the person; show sources; notice before publishing; a way out. The "alert today, sections tomorrow" order is what GDPR requires, so the fix for tonight's visitors is an orientation panel plus a second "it's finished" message after the hand-over, not rushing the sections live. (2) Visible AI use costs trust on the personal writing (the opening lines, the stakeholder notes), not on the machinery (scraping, ICPs, classifier), where it reads as skill. Hiding it is impossible once the clip shows every stage, so frame it as "Alex directs and decides, the agents build", with the personal parts in his words. (3) Lead with the outcome and the reader's problem, not the tool or the process. Also: R3's compliance steps are the "sending safety and guardrails" proof R2 says nothing shows; a guardrails note on the GetSales section turns them into portfolio evidence.
- **Conflicts settled:** "no real data" stands, and generic-looking data is fixed by labelling and realism. The live-run clip shows stages with names blurred and never replies. The live feed isn't noise because the legibility analyser curates it. W3's AI-label finding governs over R1's for a job application.
- **Has:** recommendations per spec, each tagged assistant-actionable / operator decision / verify first; 24 one-line questions for Alex, each naming the spec it blocks; six "verify first" checks.
- **Governs:** every wave-2 spec's methodology. **Read this when** writing any wave-2 spec's methodology or post-research questions: take your spec's section and the questions that name it.
- **Caveats:** inherits every report's caveats. Several questions (the alert URL, the opening lines, the overnight setup) were already routed to `orchestration` at about 14:50.

### L-01-R4 Does the format land? · [global/L-01-R4-format-reception.md](global/L-01-R4-format-reception.md)
- **Verdicts:** a site or campaign aimed at one employer almost always gets a senior reply, but becomes a job there far less often: of seven well-documented cases, four were hired by the target and three weren't, and the steadiest payoff is offers from others who saw the work in public (an upper bound, given survivorship bias). It turns creepy with personal, inferred or unexpected information about named people, unsourced, with no way out (advertising research agrees). It turns self-indulgent when the stunt is about the applicant, or claims to fix their business without knowing its constraints. Recipients act on one specific small ask they can read in seconds, from someone who clearly fits, best from a person who can say yes without a hiring process.
- **Bears on the plan:** the six stakeholder sections and building in public are the most exposed parts. The covering message matters as much as the site; an executive spends about nine seconds on an opened email.
- **Governs:** the outcome; closest DoD-18. **Read this when** writing a stakeholder section, the ask on the site, or the message that carries the link.
- **Caveats:** no precedent for a public site with sections on several named employees; no GTM-engineering case; all cases from the US or Canada; four figures unverified against originals.

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
| Every wave-2 spec | L-01 synthesis first (its own section plus the questions that name it), then the reports below |
| S-D1 Scraping demo | L-01: R1, R3 (what scraped data may show), R2, W3 |
| S-D3 GetSales outbound | L-01: R3 (notice, opt-out, LinkedIn account risk), W2 (alert link, preview, click timing), W3 (AI-written opening lines), R1 (the clip), R2, R4. L-04 when it runs |
| S-D4 Blog pipeline, S-D5 Three articles | L-01: R1, W3, R2. L-03 when it runs |
| S-D6 Canva templates, S-D7 LinkedIn content, S-D10 Canva video | L-05 synthesis first, then: S-D6 R1, R2, R3, W1, W2; S-D7 R4, W3; S-D10 R2, R3, W1, W2. L-01: R1 (AI labels), W3, R2 (Canva matched no GTM post) |
| S-D8 Website | L-01: all seven, above all R3 section 7, R4, W2 (preview card, hand-over checklist C7), R1. L-06 when it runs |
| S-D9 Legibility analyser | L-01: R1, R3 (what never to post), W3, W1 |
| Overnight run and the morning cleanup (orchestration) | L-01: W1, W2 (C7 hand-over checklist), synthesis "Overnight" section |

## Precedence

1. The synthesis adjudicates between reports.
2. A live probe outranks literature on a tool's behaviour, within what it tested.
3. Otherwise the disagreement is live and goes to Alex.
4. Alex's directives outrank everything.

A finding Alex overrides is edited in place, marked `Overridden by Alex, <time>`, and its readers are told.
