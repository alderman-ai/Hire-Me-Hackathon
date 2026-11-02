# L-01 synthesis

2 Nov 2026
session s1-research subagent
synthesis of 7 reports on list L-01

Readers: every wave-2 spec on L-01 (S-D1, S-D3, S-D4, S-D5, S-D6, S-D7, S-D8, S-D9, S-D10), plus `orchestration` and the morning cleanup session for the overnight items. Serves DoD-5 (the synthesis step in S1's method) and, through the reports, DoD-8, DoD-13 and DoD-17 to DoD-22.

---

## Method

- **What I read:** `CHARTER.md`, `orchestration\DOD-DRAFT.md`, `research\lists\L-01-parent.md`, `research\SPEC.md` §4 (the synthesis rules and the precedence order), and all seven accepted reports in full. Nothing else.
- **No new web research.** I could rule on every conflict from the reports, the charter and the DoD. Where two reports describe a source differently and neither read it in full, I say so and rule on the safe side.
- **Precedence** (from S1's SPEC):
  1. This synthesis rules between reports.
  2. A live probe outranks literature on a tool's behaviour, within what it tested. Two reports ran probes: W1 probed the machine at about 15:10, and W2 probed the site at about 14:55.
  3. Any other disagreement goes to Alex.
  4. Alex's own directives (the charter, his DI answers) outrank everything.
- **Independence.** Where reports lean on the same source, I count it once. R1 and R2 both cite the Hire Overseas post and Databar. R1, R4 and W3 all draw on Buell & Norton and the effort heuristic.
- **Already routed.** At about 14:50, the time-critical findings went to `orchestration` for Alex's pre-send gate and for the overnight setup:
  - the alert URL;
  - the missing preview card;
  - the GDPR notice and opt-out;
  - the AI-written opening lines;
  - the overnight usage-limit and Windows Update risks.

  They appear again below, marked **already routed**, so this record is complete.
- **The alert.** It was due at 15:30, and this synthesis lands near 16:00. I don't know whether it has gone out. If it has, message 1 still hasn't: it only sends once someone accepts, most likely tonight (W2 B2). So the preview card, the notice link and the URL check still matter for message 1.
- **Tags:** **assistant-actionable** (a session can do it once Alex picks, or once the spec allows it), **operator decision**, **verify first**. Every call is Alex's.
- **Scope:** nothing about Addvery. I didn't open `Addvery Research\`, the Apify proposal, `hi-apify` or any GetSales data.

---

## Convergences

How strong each one is:
- **Strong:** three or more reports, from separate evidence bases, with at least one peer-reviewed or primary source.
- **Moderate:** two reports, or several reports drawing on overlapping or practitioner sources.

1. **Lead with the reader's problem and the outcome, not the tool or the process.** *Strong.*
   - R1: the converged order is the outcome, then a demo of 2 minutes or less, then a 3–4 step "how it works", then depth on request. A tool as the headline is a toy signal (Great Demo!, NN/g, MLH).
   - R2: "tool-first vocabulary" is HeyReach's top red flag. Databar says to start with the problem and the result.
   - R4: Nina4Airbnb runs from the company's gap to the plan to her fit, with the candidate last. R4's test: would this still be useful to them if Alex weren't applying?
   - W3: frame the build as skill and judgment, not as effort or "the agents take over".
   - W2's live probe shows the gap. At 14:55 the site opened on the countdown, the explainer and the agents' charter, and named Addvery zero times.
2. **The six stakeholder sections are the most exposed part of the plan, and law and psychology reach the same content rule.** *Strong.*
   - R3 (law): this is the weakest point legally. Write about the role and the company's agenda, not the person. Use professional facts from company sources and no photos. Give notice before publication, and offer one-click removal.
   - R4 (peer-reviewed reception research): this is where the plan is most exposed to "creepy". There's no precedent for sections on several named employees. The safer side is "what I'd do for your function", with sources shown and a way to say no.
   - W3: an agent-drafted "note from him" in a section is relational text, where the AI penalty is harshest.
   - R3 says it outright: "the legal and reception risks point the same way". Two disciplines, using different sources, reach the same rule: the role, not the person; sources shown; a way out offered.
3. **Visible AI use costs something by default, and how much depends on what kind of text it is.** *Strong.*
   - W3: preregistered experiments from 2023 to 2026 (Schilke & Reimann; Reif, Larrick & Soll; Kent 2026) find the penalty is real. It's smallest where AI fits the task, harshest on relational writing, and milder when the person discloses it themselves.
   - R4: the AI disclosure penalty works through perceived effort and care, and effort is part of why the format works at all.
   - R1: unlabelled AI is a toy signal. Stating human direction removed the labelling penalty for headlines (Altay & Gilardi).
   - R2: employers ask for Claude Code, agents and context files by name, and Provn wants AI use disclosed at the workflow level. That's W3's "task fit" condition, seen from the employer's side.
4. **Transparency and control make personal outreach acceptable.** *Strong.*
   - R3: the first message carries the Art. 14 notice and a separate Art. 21 objection sentence. Vague sourcing was one of the failures in KASPR.
   - R4: creepiness falls as transparency and control rise (Langer & König), and stated, acceptable data flows raise effectiveness (Kim, Barasz & John).
   - W3: disclosing AI use yourself costs less trust than being exposed by someone else (Schilke & Reimann, studies 9 to 13).
5. **The proof format is a short, narrated walkthrough of a workflow.** *Moderate:* R1 and R2 share two sources.
   - R1: the hackathon rules. Two minutes or less, a demo rather than a deck, no speeding up, dead time cut, captions.
   - R2: the Loom that agency posts ask for, with four beats: the problem, the tools, the outcome, and what broke.
6. **Breadth and cleverness read worse than one path that works.** *Moderate:* practitioner sources.
   - R1: breadth over one working path reads as a toy, and equal-weight panels read as noise.
   - R2: Clay, Apollo and The Kiln all treat over-engineering as a red flag. Databar advises "3 to 5 high-quality projects".
   - R4: the novelty fades and the substance remains (de Haaff, Fried). Spectacle reads as self-indulgent.
7. **Framing the outreach as a job application is safer than a services pitch, on three separate grounds.** *Moderate.*
   - R3: a services offer is likely a "commercial communication" under Czech Act 480/2004 § 7, which requires prior consent. LinkedIn also bans promotional invitations to strangers.
   - W2: Vercel Hobby is for non-commercial use only, and "advertising the sale of a product or service" is a listed example. A pause serves a 503 that never lifts by itself.
   - R4: one specific, small ask works, and you don't fix their business in public.
8. **The finished state matters more than the middle of the build.** *Moderate.*
   - W2: most acceptances come within 24 hours, before the site is finished. C-level replies take about two weeks on average, so they arrive after the hand-over.
   - W3 (Bray): people weight how a service ends.
   - R1: small errors, a "TODO" or a wall of "not started" rows all read as unfinished.
9. **Alex's judgment is the asset, and right now nobody can see it.** *Moderate.*
   - R2: hiring managers expect a decision trail with trade-offs, and none of the ten deliverables shows one. D9 and the meta layer match what 2026 job posts ask for, but they run behind the site.
   - W3: a skill frame is the one framing AI doesn't undercut. Alex's own line in the feed ("the bottleneck is judgment") already uses it.
   - R1: the labour illusion only pays off when the work on show is legible as work.

---

## Cross-document insights

These only show up when the reports are read together.

1. **The one demo allowed to use real data is the one whose real data can't be shown.**
   - The charter allows real data only in the D3 live run.
   - R1 says realistic data is what keeps a demo from reading as a toy.
   - R3 and DoD-22 keep the six people's data, and above all their replies, off everything published.

   So D3's clip has to earn its credibility through structure: the end state first, labelled stage chapters, and a dummy lead beside the blurred real ones. D1 has to earn realism without real personal data: synthetic data that looks like the target's own domain, or public company-level data if Alex allows it (Q3).
2. **R3's compliance steps are exactly the proof R2 says is missing.**
   - R2 lists the tests hiring managers keep applying that no deliverable passes: deliverability and sending safety, error handling, a decision trail, and approval gates on AI actions.
   - R3's checklist for the live run is that evidence: a balancing test, a notice page, objection handling, minimal fields, a retention date, human-paced sending and a pre-send gate.

   A short "guardrails" note on D3, screen-checked against DoD-22, turns legal hygiene into portfolio proof, and it costs only words.
3. **One 200-character note has to satisfy four reports at once, and for most of the six it's the whole delivery.**
   - W2: LinkedIn caps the note at 200 characters, and a URL in it may not be clickable. About 70% of cold recipients never accept, so they never see message 1.
   - R3: the note is the first communication, so it's the deadline for the Art. 14 notice (a link at least) and the separate Art. 21 objection sentence.
   - W3: it's relational text, so it should be in Alex's own words.
   - R4: one small ask, readable in seconds.

   Not all of it fits. The evidence favours Alex's own words, one hook and one opt-out line, plus the URL only if it's the production alias or a custom domain. The notice link and the context go in message 1. Parts of this were already routed. The character budget is the new point.
4. **The delay W2 regrets is the order R3 requires.**
   - W2: tonight's clickers will find no section for them, because the website's gate keeps the sections off until the morning.
   - R3: notice has to reach each person no later than the moment their section goes public (Art. 14(3)(c)).

   So "alert today, sections tomorrow" is the legally correct order. The fix for W2's problem isn't to rush the sections live. It's to orient tonight's visitors (W2 C4, option B or C) and to add a second "it's finished" touch after the hand-over (W2 C6).
5. **Hiding the AI is no longer possible, so every spec competes on framing.**
   - W3: the DoD-13 clip shows every pipeline stage, so the six will learn the alert was automated.
   - R1: undisclosed edits are what sank the Gemini and Devin demos.
   - W2: the feed is public.
   - R2: AI fluency is what employers are asking for.

   Together they support one frame for the whole site: Alex directs and decides, the agents build, and the relational parts are his.
6. **The content and design deliverables earn their place as proof of Alex's own hand, not as GTM proof.**
   - R2 rates D6 and D10 weakest for a reader hiring a GTM engineer, and D4, D5 and D7 only partial.
   - W3 rates the Canva work the clearest hand-made signal on the site, and the blog's "last 10%" as where his edit shows.
   - The machinery deliverables (D1, D3, D9) are both R2's strongest match and W3's zone of lowest AI penalty.

   So the site's hierarchy and its human-hand story line up. The systems demos lead, and the Canva and blog work is shown as his own judgment and taste.
7. **The site has two audiences with opposite needs.**
   - R4: the most reliable payoff is the second market, meaning other employers who see the public work.
   - R2: 45% of GTM engineers work for an agency or as consultants (Poyar, second-hand via OnFire). That matters for Alex's freelance pivot.
   - R3 and R4: the six need minimal, role-level content with a private way out.

   A public portfolio layer about the work serves the second market. Role-titled stakeholder sections serve the six, with named content gated or added only after notice. This also settles what happens if Addvery says no: the sections come down (under R3, an objection means removal), and the portfolio stays.
8. **The overnight risk falls on the same sessions that carry the hand-over.**
   - W1: `website` and `s-d9-legibility` carry the most overnight DoD weight and burn the most quota per turn. On disk, a stall looks the same as "nothing to do".
   - W2: what a C-level replier sees in about two weeks is whatever the morning cleanup leaves.

   An overnight stall on `website` means the hand-over state is wrong. W1's two-minute fixes protect W2's hand-over checklist.
9. **Measurement: three reports converge on aggregate analytics only.**
   - R4: per-person tracking links are tracking the recipient can't see, which puts them on the creepy side of the line.
   - R3: tracking is processing, so it belongs in the notice.
   - W2: knowing whether the site was seen still matters.

   Aggregate analytics, disclosed on the notice page, satisfies all three.
10. **A custom domain solves a reception problem as well as a delivery one.**
    - W2: 2026 security guidance names `*.vercel.app` links from unknown senders as a phishing signal.
    - R4: creepiness comes from ambiguity about who is asking and why.
    - R3: the notice has to name the controller.

    A short domain carrying Alex's name addresses all three. It costs a registration fee and a naming decision.

---

## Conflicts and how they're settled

1. **R1's "generic data reads as a toy" against the charter's "no real data" rule.**
   - *Ruling:* the charter rule stands. It's Alex's directive and outranks the literature. R1's finding governs *how* data is shown inside the rule, not *whether* real data runs.
   - *Why:* R1's own sources (Databar, the demo-data vendors) accept "realistic simulations or examples based on industry benchmarks". R2 adds that a stated reason for missing data reads as judgment ("If no metric exists, say why", Provn), and that fake metrics are worse than none.
   - *What follows:* use synthetic data that looks like the target's domain, labelled "sample" and never "John Doe". Or use public, non-personal company-level data shown live, if Alex says that isn't "real data" in the charter's sense (Q3). Either way, add one line saying the demos run without personal data by design. R3 governs any personal data.
2. **R3's "keep reactions off the site" and DoD-22, against DoD-13's clip of the live run.**
   - *Ruling:* both can be met. DoD-13 needs the clip to show "each pipeline stage", not each person's data or how the sends turned out. The stages can be shown with names and avatars blurred, or with a dummy lead alongside, and with no acceptances, replies or inbox views at all.
   - *Why:* R3 shows that replies are private communication nobody would expect to see published. R1, for legibility reasons of its own, recommends tight crops and zooms, which also keep the rest of Alex's GetSales account out of frame. DoD-22's "the operator's own GetSales outbound" clearly covers his other campaigns. Whether it also covers the six people's data is a wording question, not a real conflict.
   - *Left to Alex and S2:* which way to redact (Q4), and whether to use `change-dod` to extend DoD-22's list to "the six stakeholders' personal data beyond what the site deliberately shows, and any of their replies" (R3 rec 6).
3. **R1's "a raw build log is noise" against D8 and D9's live feed and DoD-19 and DoD-20.**
   - *Ruling:* not a real conflict, once D9 is read as the curator. The charter tells D9 to find and keep "the most valuable content", and DoD-20 asks for "its most valuable moments". Neither asks for a raw feed. That's R1's option A, a curated and dated "what changed" list, which R1 supports.
   - *Why:* R1's evidence backs dated, visible updates (Stanford guideline 8, NN/g on system status) and argues against raw logs and raw footage (Bray). W3 adds a condition: the feed helps if it shows Alex's judgment, and hurts if it reads as "agents take over", because AI users get seen as "replaceable" (Reif, experiment 1).
   - *What follows:*
     - Keep the feed, curated and dated, and place it below the outcome on the page (R1's order).
     - Write posts around Alex's decisions.
     - Never post raw clips or a commit stream.
     - At the hand-over, the top of the page is the finished application, with the feed underneath (W2 C7).
4. **R1's "a 'drafted with AI under human direction' label removes the penalty" against W3's "the penalty survives every framing".**
   - *Ruling:* both are true, about different things. R1's study (Altay & Gilardi) measured whether people believed *headlines*. W3's studies measured trust in the *person* (Schilke & Reimann) and reactions to relational messages (Kent). A job application judges the person, so W3's evidence is closer.
   - *A further wrinkle:* the two reports seem to describe the same Gilardi work differently. R1 says the penalty "largely disappeared" once human direction was explained. W3 says the wording of the label made "no difference". These may be different manipulations: the word on the label, against an explanation of what the AI did. Read together: changing the word doesn't help, and explaining the human's role may.
   - *What follows:* use the human-direction line, because it helps the content's credibility, but don't count on wording. On relational text, the human hand has to be real, not just labelled. Check both studies (verify first) before anyone quotes either one in public.
5. **R2's "make the orchestration layer visible" against W3's AI penalty and R1's "the tool is the headline".**
   - *Ruling:* show it, as skill, with Alex in charge. W3's own task-fit condition says the penalty disappears where AI is useful for the task, and for a GTM engineer, agents *are* the task (R2's job-post evidence). The risk sits in relational text, not in the machinery. R1's objection is to headlines built on tool names, which a "how this site built itself" panel avoids if it's worded around outcomes.
   - *Left to Alex:* a section on the site, an eleventh deliverable through `add-deliverable`, or a mention in the outreach only (R2-B; Q8).
6. **R2's "close the gaps" against the warnings in R2 itself, R1 and R4 not to over-build.**
   - *Ruling:* split them by cost.
     - The word-only gaps are cheap, overlap R3's checklist, and should be offered: sending safety, error handling, a curated decision trail, and why there are no outcome metrics.
     - The build gaps cost hours from a fixed window and happen only if Alex asks: a CRM write, a Clay table, signal triggers (Q10).
7. **R2's "publish a decision trail" against DoD-22.** R2 flags this itself.
   - *Ruling:* publish a curated slice only, written for the site and screen-checked against DoD-22. Never publish the raw decision logs, which may mention the Apify proposal, internal paths or the six.
8. **R4's "private first" and R3's "unlisted page per person" against DoD-18's "a section for each of the six on the live site".**
   - *Ruling:* the evidence doesn't settle it. It turns on how DoD-18 is read.
     - R3 and R4 converge on role-titled public sections, with named content added only after notice, or kept unlisted.
     - R3 reads role-titled sections as arguably meeting DoD-18 ("matching DoD-10's list").
   - Whether they do is Alex's and S2's call (Q2).
9. **Live probes against literature.**
   - W2's site probe outranks any assumption that LinkedIn will draw a preview card. It found no `og:` tags, a 404 at `/opengraph-image` and no mention of Addvery.
   - W1's machine probe outranks third-party claims about defaults. It found the retry watchdog unset, Windows Update active hours of 09:00 to 03:00, Opus subagents and bypass mode.
   - Both are snapshots, taken at 14:55 and 15:10. The findings routed at 14:50 may have been acted on since, so each one is **verify first** before anyone relies on it.

---

## Recommendations for each wave-2 spec's methodology

Every call is Alex's. **Already routed** means the item reached `orchestration` at about 14:50. The Q numbers point to the open questions in the next section.

### S-D1 Scraping research demo

| # | Recommendation | Evidence | Tag |
| --- | --- | --- | --- |
| 1.1 | Use the converged order: a readable research result first, then 3–4 steps worded as outcomes, then the actors, requests and JSON behind a "show me how" toggle | R1 §6; DoD-8 | assistant-actionable |
| 1.2 | Choose the data rule: synthetic data from the target's domain labelled "sample", or public company-level data. Either way, add one line saying why no personal data runs | R1 toy signal 1; R2 Q3 item 1; charter Scope | operator decision (Q3) |
| 1.3 | Use no cookie-based LinkedIn actors, source nothing on the site from LinkedIn, and filter actor output down to the fields actually used | R3 §3 and §6 | operator decision (Q13); R3 recommends it |
| 1.4 | Git-ignore raw Apify outputs before the first run | R3 rec 9 | assistant-actionable |
| 1.5 | Make the dedupe and normalisation visible, and add one line on "what broke and how it was handled" | R2 Q2 (D1 row), Q3 item 5 | assistant-actionable |
| 1.6 | Name the enrichment as the pattern a Clay waterfall implements, instead of adding Clay | R2-D option 2 | operator decision (Q10) |
| 1.7 | Screen care: crop the Apify console to the run being shown, and keep the proposal off screen | charter Risks; DoD-22 | assistant-actionable |

### S-D3 GetSales outbound demo

| # | Recommendation | Evidence | Tag |
| --- | --- | --- | --- |
| 3.1 | Alex writes or rewrites each of the six opening lines. Optionally, the message says it came out of the pipeline | W3 rec 1 (Kent; Cui, Dias & Ye on editing time) | operator decision, **already routed** (Q5) |
| 3.2 | The first communication carries the notice link and a separate objection sentence, and the notice page exists before the send | R3 §4; checklist steps 2 to 4 | operator decision, **already routed** |
| 3.3 | Use only the production alias or a custom domain, never a URL printed by a deploy, and check it logged out on a phone | W2 C1, C2, B5.1 | verify first, **already routed** (Q12) |
| 3.4 | Frame the first touch as a job application or a request for a conversation, not a services offer | R3 §5; W2 B5.2; R4 Q4 | operator decision (Q1) |
| 3.5 | Plan the 200 characters for the people who never accept: Alex's words, one hook, one opt-out line, and the URL only if it's clean. The notice link and context go in message 1 | Cross-document insight 3 | operator decision |
| 3.6 | Clip spec for DoD-13: 2 minutes or less (or about 60 s plus a longer cut), the end state in the first seconds, five labelled stage chapters, captions, no speeding up, cuts disclosed on screen, tight crops | R1 rec 4 | assistant-actionable (with S-D9) |
| 3.7 | Redact the live run in the clip: blur names and avatars, show a dummy lead alongside, or show the stages only. Never show acceptances, replies or the inbox | R3 §8; conflict 2 | operator decision (Q4) |
| 3.8 | Add a "guardrails" note to D3: no sends outside the live run, sender limits, the pre-send gate, human pacing, how opt-outs are handled, the retention date | R2-E; R3 checklist; cross-document insight 2 | assistant-actionable, after a DoD-22 check |
| 3.9 | Show the classifier as routing logic: which lead goes where, and why | R2 Q2 (D3 row), Q3 item 7 | assistant-actionable |
| 3.10 | Keep the automation footprint low: type the Sales Navigator rows by hand, and send at manual pace or by hand | R3 §6, rec 5 | operator decision (Q13) |
| 3.11 | Keep GetSales to the minimal fields, and state a deletion date in the notice | R3 checklist steps 7 and 9 | operator decision on the date (Q14) |
| 3.12 | Add a second delivery moment after the hand-over ("it's finished"), and check GetSales' delays between messages | W2 C6, B6 | operator decision (Q22); the delays are verify first |
| 3.13 | Add a CRM write step (free HubSpot) only if Alex wants that gap closed | R2-D option 1 | operator decision (Q10) |

### S-D4 Blog pipeline and S-D5 Three blog articles

| # | Recommendation | Evidence | Tag |
| --- | --- | --- | --- |
| 4.1 | Put a plain line on each post: drafted with AI from Alex's dictation, edited and approved by him | R1 rec 5; conflict 4 | operator decision |
| 4.2 | Make the last 10% visible, with a before and after or a "what I changed" line | W3 rec 4C; R1 on DoD-17; Cui, Dias & Ye | assistant-actionable once chosen |
| 4.3 | Present D4 as a pipeline with checks (input, prompts, checks, output), not as content marketing | R2 Q2 (D4 row), R2-F option 3 | operator decision |
| 4.4 | Prefer topics about the GTM work itself; Vercel's post names published technical explainers as a plus | R2 Q2 (D5 row) | operator decision |
| 4.5 | If a post touches Addvery's market, offer ideas, not a verdict on how they run their business | R4 rec 7 | assistant-actionable |

### S-D6 Canva templates, S-D7 LinkedIn content demo and S-D10 Canva design video

| # | Recommendation | Evidence | Tag |
| --- | --- | --- | --- |
| 6.1 | Present D6 and D10 as proof of Alex's own hand and taste. D10 is the clearest hand-made signal on the site, so where it sits matters | Cross-document insight 6; W3 §7; R2 Q2 | operator decision (with S-D8) |
| 6.2 | Show D7 as input (the voice capture or brief), then output (the post), then the human step (Alex's edits and sign-off) | R1 on DoD-17 | assistant-actionable |
| 6.3 | Frame D7's brand capture as a reusable context file | R2-F option 3; Databar | operator decision |
| 6.4 | Put one visible line on the brand work: an unofficial application by Alex, not affiliated with Addvery | W3 passed-over note (rank 2) | operator decision (Q20) |
| 6.5 | Keep stakeholder names and photos out of the template previews | R3 §7 table | assistant-actionable |
| 6.6 | Screen care for D10: only the design being made is in frame, with no other designs, accounts or tabs | charter Risks | assistant-actionable |

### S-D8 Website

| # | Recommendation | Evidence | Tag |
| --- | --- | --- | --- |
| 8.1 | Add a preview card before the first link goes out: `opengraph-image`, plus `openGraph` title, description and URL in `layout.tsx`. No names in it, and nothing DoD-22 forbids | W2 C3 (live probe) | assistant-actionable, **already routed**; verify first that it's live |
| 8.2 | Add a notice page: controller, purposes, legal basis, exact sources, processors, retention date, rights, and the right to complain to ÚOOÚ | R3 checklist step 2 | assistant-actionable, **already routed** |
| 8.3 | Use one section template: an outcome line, a demo of 2 minutes or less, 3–4 steps and a technical toggle, plus a "problem, how, result, what broke" card | R1 rec 1; R2-A | operator decision on scope (R1 options A, B, C) |
| 8.4 | Adopt R3's safe, risky and keep-off table and R4's "what I'd do for your function" as the content rule for stakeholder sections, with a sources line and a removal link on each | R3 §7 table; R4 rec 1 | operator decision (Q2) |
| 8.5 | Publication order: a section goes public only after its person has had notice. Named content follows the first message, or goes on an unlisted, `noindex` page per person | R3 §4, rec 1; R4 rec 2 | operator decision (Q2) |
| 8.6 | Orient tonight's visitors with a short panel at the top, or a landing path, saying what's being built for them and when their section is expected | W2 C4; cross-document insight 4 | operator decision (Q11) |
| 8.7 | Order the site so the systems demos (D3, D1, D9) lead, with the content work framed as Alex's own hand and as an AI content pipeline | R2-F; cross-document insight 6 | operator decision (Q7) |
| 8.8 | Add one framing line and a "how this was made" panel: Alex directs and decides, the agents build | W3 recs 2 and 3; R2-B | operator decision (Q8, Q18) |
| 8.9 | In the deliverables view, put done items first, write statuses in plain words, and avoid a wall of "not started" rows | R1 §6, rec 3 | assistant-actionable |
| 8.10 | Use aggregate analytics only, disclosed on the notice page, and no per-person tracking links | Cross-document insight 9 | operator decision (Q17) |
| 8.11 | Settle the Hobby plan: keep service-selling language off the site, ask Vercel Support, or move to Pro | W2 C5 | operator decision (Q15) |
| 8.12 | Consider a custom domain carrying Alex's name | W2 C1 option B; cross-document insight 10 | operator decision (Q12) |
| 8.13 | Run a hand-over checklist: the top of the page reads as finished; the sections are live or the page says why not; a logged-out check on a phone; the preview card; videos play logged out; the deploy came from the working tree with the git-ignored files; DoD-22 is clean; the DoD-2 push is done | W2 C7, B5.3 | assistant-actionable |
| 8.14 | Check the first screen and the YouTube embed in LinkedIn's in-app browser on a phone | W2 B3 | verify first |
| 8.15 | No errors, broken links or "TODO" anywhere public | R1 toy signal 7 (Stanford guideline 10) | assistant-actionable |
| 8.16 | Decide in advance what happens to the sections if Addvery says no, and whether the site doubles as Alex's portfolio | R4 rec 8; cross-document insight 7 | operator decision (Q16) |

### S-D9 Legibility analyzer

| # | Recommendation | Evidence | Tag |
| --- | --- | --- | --- |
| 9.1 | Post curated, dated "what changed" lines that link to the section, never raw clips or a commit stream | Conflict 3; R1 rec 3 option A | assistant-actionable |
| 9.2 | Prefer moments that show Alex's judgment (a choice, a cut, a check) and moments that show what broke and how it was handled | W3 rec 3; R2 Q3 items 5 and 6 | assistant-actionable |
| 9.3 | Frame new posts as Alex decides and the agents carry out; past titles stay as they are | W3 rec 3 option B | operator decision (Q18) |
| 9.4 | Screen-check every clip for the six people's names, LinkedIn profiles, GetSales lead lists and replies, as well as for everything on DoD-22's list | R3 §8; DoD-22 | assistant-actionable |
| 9.5 | Cut the DoD-13 clip to the spec in 3.6, with the redaction Alex picks in 3.7 | R1 rec 4; R3 rec 6 | assistant-actionable |
| 9.6 | Make D9 itself visible ("how this site built itself") if Alex wants the orchestration layer shown | R2-B | operator decision (Q8) |
| 9.7 | The overnight image checks are expensive; consider a longer interval between frames, or a smaller model for them | W1 B2, rec 3a | operator decision |

### Cross-cutting

| # | Recommendation | Evidence | Tag |
| --- | --- | --- | --- |
| X.1 | Treat AI disclosure as given, and split by task: the machinery shown as skill, the relational text in Alex's hand | Cross-document insight 5; W3 §7 | operator decision |
| X.2 | Write a one-page legitimate-interest balancing test, dated before the first scrape or send | R3 checklist step 1, rec 7 | operator decision (partly routed with the notice) |
| X.3 | Keep personal data out of git: `.gitignore` before the first run, and deploys from the working tree | R3 rec 9; W2 B5.3 | assistant-actionable |
| X.4 | Every number on the site is a range with a source, or a labelled projection. No invented metrics | R2 Q1 trap 5, Q3 traps | assistant-actionable |
| X.5 | A cold read by one to five people who don't know the project, at 5 to 10 seconds and at 60 seconds: What is this? Who made it? How much effort did it take? Would you reply? | R1 rec 6; W3 rec 6 | verify first; who reads is an operator decision (Q23) |
| X.6 | Ask S2 for a DoD item on delivery, such as "a logged-out check of the exact alert URL and its preview passed before the send" | W2 C8 | operator decision |
| X.7 | Ask S2 to extend DoD-22's list to the six people's personal data and replies, or to confirm the current wording covers them | R3 rec 6 | operator decision (Q4) |

### Overnight (orchestration and the morning cleanup)

| # | Recommendation | Evidence | Tag |
| --- | --- | --- | --- |
| N.1 | Before 17:50, read `/usage`: the five-hour bar, the weekly bar and the weekly reset time | W1 rec 1 | operator decision, **already routed** |
| N.2 | Before the 17:50 forks, pick one: usage credits with a cap, `CLAUDE_CODE_RETRY_WATCHDOG=1` with a recheck interval, both, or neither | W1 B3, rec 2 | operator decision, **already routed**; the settings change is assistant-actionable once he picks (Q21) |
| N.3 | Move Windows Update's active hours to cover the night (for example 14:00 to 08:00), or pause updates | W1 B4 probe, rec 4a | operator decision, **already routed** (Q21) |
| N.4 | Run subagents on Sonnet or Haiku for mechanical work, naming Opus where quality matters, and lower the effort level for routine overnight sessions | W1 recs 3a and 3b | operator decision (Q19) |
| N.5 | No pokes after 18:00; lean successors that read only HANDOFF.md and SPEC.md; stop sessions that have finished | W1 recs 3c to 3e | operator decision, through S2 |
| N.6 | Test whether a SendMessage wakes a session the supervisor stopped for being idle. If it doesn't, pin `website`, `answer-desk` and `orchestration` | W1 rec 5 | verify first |
| N.7 | The morning cleanup starts with `claude agents`, then attaches to or respawns any failed or blocked session, before it runs the hand-over checklist | W1 rec 6b; cross-document insight 8 | assistant-actionable |
| N.8 | `briefing` records the states from `claude agents --json` to a git-ignored file | W1 rec 6a | assistant-actionable |

---

## What the research didn't settle: questions for Alex

Each can be answered in a line. **Routed** means the question went to `orchestration` at about 14:50 and may already be answered there.

| Q | Question | Blocks |
| --- | --- | --- |
| Q1 | Is the first touch to the six a job application or request for a conversation, or a freelance services offer? | S-D3 (wording); S-D8 (site language, Hobby plan) |
| Q2 | Are the six sections role-titled or named? Are they public, unlisted per person, or unlocked when each person says yes? Does a role-titled section meet DoD-18? | S-D8; S2 for the DoD reading |
| Q3 | Does "no real data" allow public, non-personal company-level data in the demos, or only labelled synthetic data? | S-D1; S-D3's ICP examples |
| Q4 | How does the DoD-13 clip redact the live run (blurred names, a dummy lead alongside, or stages only)? Should DoD-22 explicitly cover the six people's data and replies? | S-D9, S-D3; S2 for the DoD change |
| Q5 | Who writes the six opening lines: the subagent, or you, rewriting a draft? (Routed) | S-D3 |
| Q6 | Who writes the "note from Alex" in each stakeholder section: you, or the agents with your edit? | S-D8 |
| Q7 | Should the systems demos (D3, D1, D9) lead the site, or should all ten carry equal weight? | S-D8 |
| Q8 | Does the orchestration layer (the sessions, the answer desk, D9's loop) get a section on the site, become an eleventh deliverable, or stay off the site? | S-D8, S-D9; S2 if it becomes a deliverable |
| Q9 | Which employer type is the target: an agency or an in-house team, the pipeline half or the data half? | S-D8 (headline and order); S-D3 (framing) |
| Q10 | Close any of the build gaps: a CRM write step in D3 (free HubSpot), a small Clay table, or neither? | S-D3, S-D1 |
| Q11 | What do visitors who click tonight see: the feed as it is, a panel naming Addvery, a dedicated landing path, or nothing yet because the alert waits? | S-D8; S-D3 if the alert hasn't gone |
| Q12 | Which URL does the alert carry: the production alias, a short custom domain, or none in the note? (Routed) | S-D3, S-D8 |
| Q13 | For the automation footprint: are Sales Navigator rows typed by hand, are sends at manual pace or by hand, and are cookie-based LinkedIn actors ruled out? | S-D3, S-D1 |
| Q14 | What's the deletion date for scraped data and GetSales leads: 30 days, the end of the hiring conversation, or another date? | S-D3, S-D1; S-D8's notice page |
| Q15 | Hobby plan: stay on it and keep service-selling language off the site, ask Vercel Support, or move to Pro? | S-D8 |
| Q16 | If Addvery says no or asks for changes, are the sections removed, anonymised or kept? Does the site double as your public portfolio? | S-D8 (hand-over) |
| Q17 | Analytics: aggregate only, one plain link per stakeholder with that disclosed, or none? | S-D8 |
| Q18 | How does the site frame AI: a top line ("Alex directs, the agents build"), a "how this was made" panel, a made-by tag on each deliverable, or the feed as it is? | S-D8, S-D9 |
| Q19 | Overnight, do subagents move to Sonnet or Haiku for mechanical work, or stay on Opus? | Overnight run (orchestration) |
| Q20 | Add a visible "unofficial application, not affiliated with Addvery" line? | S-D8, S-D6, S-D7 |
| Q21 | Before 17:50: usage credits, the watchdog, both or neither? And move active hours, or pause Windows Update? (Routed) | Overnight run (orchestration) |
| Q22 | Does the sequence get a second "it's finished" message after the hand-over? | S-D3 |
| Q23 | A cold read by one to five outsiders before the hand-over: yes or no, and who reads? | S-D8; S-D3 if before the alert |
| Q24 | One framing for all six, or sections weighted by how hands-on each person is with AI? (Only you know the six; W3's condition B) | S-D8 |

### Checks that need no decision, only a look (verify first)

- **Preview card:** are the `og:` tags live now? W2's probe was at 14:55, before routing. → S-D8
- **Logged-out load:** does the exact alert URL load without a Vercel login wall or a 503? This tests the Deployment Protection setting, which W2 didn't read. → S-D8, S-D3
- **Idle stops:** does a SendMessage wake a session the supervisor stopped for idleness? A two-minute test. → overnight
- **GetSales timing:** what delays sit between the alert's three messages, relative to the morning cleanup? → S-D3
- **Links in the note:** is a URL in a LinkedIn invitation note clickable? Only a test send settles it, and that uses Alex's account, so it's his call. → S-D3
- **Quotes for the site:** before anyone quotes these publicly, re-read Altay & Gilardi and Schilke & Reimann on label wording, and the blocked-page excerpts in R4 (Ask a Manager, subtraction.com). → S-D8, S-D4/S-D5

### Gaps no one can close today

Specs should plan around these rather than wait for them:
- No precedent for public sections on several named employees (R3, R4).
- No decision on whether cold LinkedIn messages count as "electronic mail" under Czech law, or whether a job application counts as a "commercial communication" (R3).
- No study of delayed disclosure, meaning a message that reads as hand-written and is revealed as automated later (W3).
- No European or GTM-specific reception evidence (R4).
- No published plan-quota numbers, so nobody can forecast the hour a limit hits (W1).

---

## Sources

Reports synthesised (all in `research\global\`):
- `L-01-R1-legibility.md`: R1, making the work legible
- `L-01-R2-gtm-engineer-hiring.md`: R2, what a GTM engineer is hired to show
- `L-01-R3-personal-data.md`: R3, GDPR and LinkedIn's terms for the six stakeholders
- `L-01-R4-format-reception.md`: R4, how recipients react to a personalised application site
- `L-01-W1-wildcard-executed.md`: W1, can it be executed (usage limits, the overnight run)
- `L-01-W2-wildcard-delivered.md`: W2, can it be delivered (the 15:30 alert, link, preview, hand-over)
- `L-01-W3-wildcard-received.md`: W3, will it be received (the AI-use penalty)

Context, read only:
- `CHARTER.md`
- `orchestration\DOD-DRAFT.md`
- `research\lists\L-01-parent.md`
- `research\SPEC.md` §3 and §4 (synthesis rules, precedence)
