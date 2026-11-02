# L-05 R4: LinkedIn posts in a brand's voice

**Question (verbatim, as Alex approved it):** "LinkedIn posts in a brand's voice. Starting from Alex's Client Demo research on rubric extraction (local disk, read first so nothing is researched twice), what has changed or been added since August on making an LLM write LinkedIn posts in a specific brand's voice? What post formats does LinkedIn reward in late 2026 (text, carousel, document, video)? Lower priority, added from Alex's note: what does a LinkedIn personal-branding strategy for one company leader look like, as against a company page, and how does writing in an individual's voice differ from writing in a company's? (Method only; nothing about any named person.)"

**Date:** 2026-11-02 · session s1-research subagent · item 4 of 7 on list L-05 (`research\lists\L-05-brand-assets.md`)
**Serves:** DoD-17. **Readers:** S-D7 first (`linkedin-content\SPEC.md`), then S-D6 and S-D10.
**Depth:** not deep (per the list). About 15 minutes of searching. The evidence on formats and on personal brands is thin and mostly vendor data; this report says so wherever it applies.

---

## Method

1. **Local read, first.** `C:\Users\alder\Desktop\Atlas OS\Projects\PROJ_Client Demo\Research\RESEARCH DIRECTORY.md` (the index, updated 2026-08-02) and `rubric-extraction-viability.md` in full. I took the other reports (`split-vs-unified-rubric.md`, `grading-fanout-and-token-economics.md`, `cross-document-synthesis.md`) from their directory entries only, because the entries give their verdicts and caveats. I didn't open the `ultracode-experiment\` folder; its directory entry says it governs nothing in the build.
2. **Project context.** `CHARTER.md`, `research\lists\L-05-brand-assets.md`, and `linkedin-content\SPEC.md`, including its decision log to 16:28. The log matters because S-D7 already has a rubric (v0.3, floor plus brand layer, four tiers, 21 criteria), a blind judge, and a one-line-prompt baseline.
3. **Web.** WebSearch and WebFetch, 2 Nov 2026, finished about 16:35 Prague. Topics: LLM style imitation and its evaluation (arXiv, 2025–26); LinkedIn's July 2026 "AI slop" changes (press coverage); LinkedIn format benchmarks for 2026 (vendors); executive vs company-page strategy (vendors). LigoSocial's two 2026 reports and a PostPlanner newsletter returned HTTP 403, so they aren't used.
4. **Not read**, per the brief: `Addvery Research\`, the Apify proposal, Alex's GetSales outbound, LinkedIn itself.

Every substantive claim carries a link or a local path. Anything marked **(inference)** is my reasoning, not a source.

---

## What the August research already settled (don't re-research)

Alex's Client Demo research is dated **2026-08-02** (session `dd61bc59`, `PROJ_Client Demo\Research\`). It's about *inducing a grading rubric from graded posts*, not about imitating a brand's voice. Its conclusions, which still stand and which S-D7 already follows:

- **The grade of record comes from a fresh-context grader** that sees only the rubric and the post, never the writer. All five reports converged on this (`RESEARCH DIRECTORY.md`, entry 1).
- **Atomic binary criteria, with the tier derived from them.** At least a quarter of the criteria are disqualifiers, graded first and fail-closed. Exactly one holistic gate (`split-vs-unified-rubric.md`, via the directory, entry 4).
- **How to override a model's defaults, strongest first:** deterministic constraints, then worked exemplars, contrastive pairs, literal banned strings, and stated reasons last. Shouty capitals are counterproductive (same entry).
- **Feed failed criterion IDs back to the writer, not grader prose** (`cross-document-synthesis.md`, via the directory).
- **Judges track style far more than substance** (R ≈ 0.999 in Feuer et al.), and a self-refinement loop against the same rubric "will probably 'succeed,' and the success will not mean anything" (`rubric-extraction-viability.md`).
- **Its own gap:** "No literature on LinkedIn post quality specifically" (`rubric-extraction-viability.md`, section 7).

So the new ground is: (a) imitating a *specific* voice, and how to check it; (b) LinkedIn's own moves on AI-sounding posts since late July 2026; (c) 2026 format data; (d) the leader-vs-page question.

---

## Verdict

1. **Since August, the most useful new finding is a warning about the judge, not a better writing method.** Two 2026 papers by the same author found that an LLM judge scoring posts against a trait list an LLM extracted declares a clear winner where a trained authorship model finds no difference. In one case the generated text even outscored the real author's ([2604.26460](https://www.emergentmind.com/papers/2604.26460); [PersonalBench, 2608.19746, 20 Aug 2026](https://arxiv.org/abs/2608.19746)). S-D7's set-up is that pattern: the rubric is built from a capture, and the judge scores against the same rubric. Its scores show **rubric compliance**, which is worth showing, but they aren't proof that the posts "sound like Addvery". That changes how the site should word the scores, and possibly adds one control (Recommendations 1–3). Two older findings hold: example posts beat descriptions, and topic-matched examples do worse than varied ones ([Wang et al., EMNLP Findings 2025](https://arxiv.org/html/2509.14543v1)).
2. **LinkedIn moved against AI-sounding posts in summer 2026, and "AI tells" are now a reach risk, not only a taste issue.** On 30 July 2026 LinkedIn added a "Seems like AI slop" option to posts and began replacing its own AI post writer with a proofreader that keeps the user's voice; its chief product officer said "AI and slop are not the same thing" ([The Next Web, 30 Jul 2026](https://thenextweb.com/news/linkedin-seems-like-ai-slop-button)). Vendor data puts a modest reach cost on templated phrasings, and a larger one on posts with no concrete detail ([MagicPost, vendor, 2026](https://magicpost.in/blog/does-linkedin-penalize-ai-content)). The demo's rubric should name these tells as disqualifiers, and the demo can tell this story.
3. **On formats, there's no authoritative late-2026 answer, but the vendor data broadly agrees.** For company pages, document carousels and multi-image posts lead on engagement rate (6.40% each in Q3 2026); text is near the bottom (3.50%), and link posts are last (2.50%) ([Socialinsider, company pages, 2.45M posts](https://www.socialinsider.io/social-media-benchmarks/linkedin)). For personal profiles, text does far better ([DSMN8, employee posts, Jan–Feb 2026](https://dsmn8.com/blog/whats-working-on-linkedin-in-2026-report-key-findings/)). The spec's pair, a text post plus the copy for a document carousel, is the defensible choice. Video is out of reach today and isn't clearly rewarded anyway.
4. **Personal brand (lower priority), mostly vendor consensus and inference:** the leader posts and the page amplifies. A leader's voice can't be built from brand documents the way a company's can. It needs the person's own material and their approval of every post, and the slop risk lands on them personally.

---

## Q1. What's new since August on making an LLM write in a specific voice?

**(1) Is there a converged answer?** Partly. Three points agree across sources:

- **Show example posts; don't rely only on describing the voice.** Few-shot beat zero-shot across 400+ real authors and 40,000+ generations per model. Imitation worked in structured genres (news, email) and struggled in informal ones (blogs, forums) ([Wang et al., "Catch Me If You Can? Not Yet", EMNLP Findings 2025](https://arxiv.org/html/2509.14543v1)). A companion study found exemplar prompting "crucial" for high-fidelity imitation, though output stays more predictable than human text ([review of "How Well Do LLMs Imitate Human Writing Style?"](https://www.themoonlight.io/en/review/how-well-do-llms-imitate-human-writing-style); secondary summary, not checked against the paper). LinkedIn posts sit closer to blogs than to news **(inference)**, so expect a gap even with good examples.
- **Choose examples for range, not topic.** Choosing examples by topic similarity *reduced* authorship-attribution scores ([Wang et al.](https://arxiv.org/html/2509.14543v1)).
- **Inference-time methods don't close the gap to the real author.** In PersonalBench (50 authors, 1,000 generations, Qwen 3 and GLM-4), every method scored 0.484–0.508 on the authorship model, below the cross-author floor of 0.626 between two *different* humans. The methods were "statistically indistinguishable from each other" on that measure ([arXiv 2608.19746, 20 Aug 2026](https://arxiv.org/abs/2608.19746); [2604.26460, 29 Apr 2026](https://www.emergentmind.com/papers/2604.26460)).

**(2) Traps and gotchas.**

- **A circular judge.** In 2604.26460 the LLM judge's trait-match score crowned "Profile Extraction" (effect size d = 0.58), while the trained authorship model (LUAR) saw no difference. The two metrics barely correlate (|r| < 0.07), and profile extraction even beat the real author on the judge's score. The author's explanation: trait extraction and profile extraction both rely on LLM-extracted features, so the judge rewards following the profile, not matching the voice ([emergentmind summary of 2604.26460](https://www.emergentmind.com/papers/2604.26460)). The traits extracted were also unstable between runs (mean Jaccard 0.22). **What this means for S-D7 (inference):** a writer handed the rubric and a judge scoring against the same rubric will agree. A high score shows the post follows the rubric; whether it sounds like Addvery is a separate question.
- **Baseline by construction.** A one-line prompt that never saw the rubric will score low on that rubric almost by definition **(inference)**. The gap is real and legible, but it partly measures "saw the rubric or not", not "sounds like the brand or not".
- **Copied phrasing.** Writers lift the rubric's own example lines. S-D7's round 1 already hit this (decision log, 16:13). It matches the literature's point that exemplars transmit surface phrasing strongly.
- **Translated exemplars (inference).** S-D7's reference posts include translations. A translation carries the translator's voice, so any rhythm or function-word features taken from it are the translator's, not the brand's.
- **Scope of the evidence.** All of the above is about *individual* authors' voices, on open 32B models or GPT-class models, not Claude. I found no study of an *organisation's* voice. A brand voice is a designed, rule-like style (a style guide), so it's plausibly easier to follow than an individual's idiosyncrasies **(inference)**.

**(3) What would change the plan in `linkedin-content\SPEC.md`.**
- *Rubric:* no structural change. The August shape (disqualifiers first, binary criteria) still holds. Add LinkedIn's AI tells as literal disqualifiers (Q2).
- *Writer:* consider handing each writer 3–5 reference posts chosen for range, not topic, as style exemplars (local only). Today the writers get the rubric only. Options in Recommendation 4.
- *Judge and bar:* keep the blind judge. Change what the score is *called* on the site ("meets N of 21 voice rules"), and consider one control that tests the judge itself (Recommendations 1–3).

---

## Q2. What reads as AI-written on LinkedIn, and does LinkedIn act on it?

**(1) Converged answer?** Partly. **LinkedIn's own actions are confirmed by several outlets; the size of their effect is not.**

- **Confirmed:** on 30 July 2026 LinkedIn added a "Seems like AI slop" option to the post menu. It hides the post, and LinkedIn said reports help "tune our models". LinkedIn also said it is "ramping up a series of new and improved classifiers", and is replacing its "enhance your post" AI writer with a proofreader that keeps the writer's tone. AI-assisted writing isn't banned: "AI and slop are not the same thing" (chief product officer, quoted by [The Next Web, 30 Jul 2026](https://thenextweb.com/news/linkedin-seems-like-ai-slop-button); also [Engadget](https://engadget.com/2227188/linkedin-testing-seems-like-ai-slop-reporting-tool), [SmartCompany](https://www.smartcompany.com.au/artificial-intelligence/linkedin-ai-slop-report-button/)). Authors may see a private note in their analytics saying a post "may have come off as inauthentic" (same TNW piece).
- **Reported, not confirmed:** "more than one million" reports in the first two weeks, and slop-classified content getting "40% fewer views". Both come from [IBTimes UK, 24 Aug 2026](https://www.ibtimes.co.uk/linkedin-removes-ai-writing-tool-ai-slop-reports-1815794), attributed to LinkedIn's CPO, with no primary link. TNW carries neither figure. TNW also mentions an earlier May 2026 crackdown that cut generic AI posts from recommendations. I found no primary LinkedIn statement with numbers.
- **Prevalence:** Pangram, which sells an AI detector, put about 41% of long-form and 30% of short LinkedIn posts as likely AI-generated (via 404 Media, cited by [TNW](https://thenextweb.com/news/linkedin-seems-like-ai-slop-button)). That's vendor data.

**What counts as a tell.** These are the only quantified LinkedIn data I found, and they come from a vendor that sells an AI post writer and a "humanizer", so treat them as directional. Within-author comparisons by [MagicPost (2026)](https://magicpost.in/blog/does-linkedin-penalize-ai-content):
- "Stop X, start Y" / "If you want to…": about −6.6% reach
- "It's not X, it's Y": about −5.1%
- "Here's what / Here's how / what nobody tells you": about −4.1%
- the dramatic "The result?" bridge: about −3.0%
- **Bigger effect:** posts with no concrete detail and no lived experience ran 13% below the author's own average before 27 July 2026, and 23% below after. MagicPost frames the penalty as one for empty content, not for using AI.

The research side: the Antislop framework (ICLR 2026) found some LLM phrase patterns over 1,000× more frequent than in human text. It detects them by comparing word, bigram and trigram frequencies against human writing, and suppresses them during generation ([arXiv 2510.15061](https://arxiv.org/abs/2510.15061); [ICLR 2026 poster](https://iclr.cc/virtual/2026/poster/10008156)). A separate paper offers a taxonomy of "slop" for evaluation ([arXiv 2509.19163](https://arxiv.org/pdf/2509.19163)). Both predate August, but Alex's August research didn't cover them.

**(2) Traps.**
- **The figures circulating in blogs are mostly unsourced** (for example "2.8× less reach for fully AI posts", attributed to van der Blom's 2025 report by [SocialPilot](https://www.socialpilot.co/blog/linkedin-algorithm), with no method shown). Don't put any of them on the site as fact.
- **Collisions within the set.** The tells above are exactly the "Here's what…" constructions S-D7's blind judge caught in round 1 (decision log, 16:13). Collection rules (no two posts share a construction) help, but the list should also ban the tells outright.
- **A banned list can push the writer into the next cliché.** Antislop's case for suppressing at sampling time is that hard token bans degrade the output **(inference from its framing)**. A short list of literal strings, enforced by a deterministic check before the judge sees the post, is cheap and fits the August ordering (deterministic constraints first).

**(3) What would change the plan.**
- *Rubric:* add the four MagicPost constructions as literal disqualifier strings, if the floor layer (Alex's public rubric v2.1, per the decision log) doesn't already cover them. Add one criterion: "contains at least one concrete, checkable detail". The demo can't use client results (charter Scope), so this means concrete *process* detail. The decision log's rule that illustrative numbers are never framed as a client result is consistent with this.
- *Judge:* run a deterministic string check before the LLM judge, and report it separately ("0 of 12 AI tells").
- *Site story:* "LinkedIn now lets readers flag posts as AI slop (July 2026); these posts are checked for the patterns readers flag" is legible and dated. Cite TNW, not the 40% figure.

---

## Q3. Which formats does LinkedIn reward in late 2026?

**(1) Converged answer?** No single authoritative source; LinkedIn publishes no format figures. The vendor data broadly agrees on the ranking for **company pages**:

| Format | Engagement rate, Q3 2026, company pages | Note |
| --- | --- | --- |
| Native document (PDF carousel) | 6.40% | led the whole of 2025 at 7.00% |
| Multi-image | 6.40% | down from 6.60% in Q2 |
| Video | 5.25% | |
| Image | 4.70% | |
| Poll | 3.60% | down from 4.50% in Q2 |
| Text | 3.50% | |
| Link | 2.50% | down from 3.40% in Q2 |

Source: [Socialinsider LinkedIn benchmarks](https://www.socialinsider.io/social-media-benchmarks/linkedin) (vendor; 2,450,610 organic posts from about 26,000 company pages; engagement rate = reactions, comments and shares divided by impressions). The page's own dates are inconsistent: it's dated 16 March 2026 but shows Q3 2026. Treat the Q3 row as provisional. The full-2025 figures are from the same vendor's report summary.

For **personal (employee) profiles** the picture differs. Text averaged 775 impressions per post against 149 for link posts. Video had the best engagement conversion. Documents were credited with dwell time ([DSMN8, vendor, 110,000 employee posts, 1 Jan–16 Feb 2026](https://dsmn8.com/blog/whats-working-on-linkedin-in-2026-report-key-findings/)). An AuthoredUp-based roundup put documents at 1.39× median reach, text at 1.00× and video at 0.86× ([via a WebSearch summary of 2026 roundups](https://www.dataslayer.ai/blog/linkedin-algorithm-february-2026-whats-working-now); not checked against AuthoredUp itself).

**(2) Traps.**
- **Engagement rate isn't reach.** Socialinsider divides by impressions, so a format can have a high rate and low distribution. Most blog figures mix the two.
- **Page data and profile data point in opposite directions on text** (worst on pages, strongest on profiles). A company-voice demo should lean on the page data **(inference)**.
- **Video is contested:** uploads are up and reach is reported down. Sources disagree on short vs long video ([SocialPilot](https://www.socialpilot.co/blog/linkedin-algorithm)). The one monthly reach-by-format tracker I found (The Shield Index) closed on 22 May 2026, and its last report covers March ([archive](https://theshieldindex.beehiiv.com/archive)).
- **Links cost reach** in every source that mentions them (vendor, unquantified with confidence). Any CTA in the demo posts shouldn't depend on an outbound link **(inference)**.
- **The 360Brew ranking model**, a text-based LLM ranker reported to have gone live in March 2026 ([SocialPilot](https://www.socialpilot.co/blog/linkedin-algorithm), citing LinkedIn Engineering), has its arXiv paper marked withdrawn ([arXiv 2501.16450](https://arxiv.org/abs/2501.16450)). Don't build claims on its internals.

**(3) What would change the plan.**
- *Formats:* the spec's pair, a **text post** plus the **copy for a document carousel**, is supported. Multi-image ranks equal with documents on pages and pairs naturally with S-D6's Canva templates. Video and polls aren't worth the time today.
- *Rubric:* format-specific criteria for the carousel copy: one idea per slide, a cover slide that works alone, slide count in the 8–12 range vendors cite (unsourced; [SocialPilot](https://www.socialpilot.co/blog/linkedin-algorithm)). For the text post: no outbound link in the body.

---

## Q4 (lower priority). A leader's personal brand vs a company page; individual vs company voice

Method only. Nothing here is about any named person.

**(1) Converged answer?** A vendor consensus, not evidence:
- **The leader posts, and the page amplifies.** Vendors agree personal profiles out-distribute company pages, with multipliers that disagree wildly (about 1.8× to 10× engagement). One guide suggests about 80% personal-led and 20% page amplification ([summary of 2026 vendor guides](https://lagrowthmachine.com/linkedin-marketing-strategy-2026/), [RevenueZen](https://revenuezen.com/linkedin-company-page-vs-personal-profile)). Treat these as directional.
- **What the page is still for:** several admins, continuity if a person leaves, and ads, which need a page (same sources). Most concretely, **Thought Leader Ads** let a company sponsor a leader's own post, with the author's permission given in Campaign Manager. Since 2024 that has extended to non-employees ([LinkedIn, Thought Leader Ads](https://business.linkedin.com/advertise/ads/sponsored-content/thought-leader-ads)). That's the official bridge between the two strategies.
- **Why a leader's posts are worth the effort:** buyers use thought leadership to vet vendors. These figures come from the 2025 Edelman–LinkedIn report, seen only through secondary roundups (I found no 2026 edition) ([Edelman release](https://www.edelman.com/news-awards/new-research-edelman-linkedin-thought-leadership-influences-b2b-sales); [roundup](https://www.shno.co/marketing-statistics/thought-leadership-statistics)).

**A method sketch for one leader** (my synthesis of the above; **inference** throughout):
1. **Positioning:** two or three topics the leader can speak to from experience, consistent with their profile. A text-reading ranker plausibly rewards that consistency (inference; the 360Brew paper is withdrawn).
2. **Source material from the person:** their own dictation, talks or notes. This is the main difference from a company voice. The reach data punishes posts "with no concrete detail and no lived experience" ([MagicPost](https://magicpost.in/blog/does-linkedin-penalize-ai-content)), and only the person has that material. The project's own blog pipeline (S-D4, 15 minutes of dictation into a post) is the same mechanism.
3. **Voice capture from the person's own writing**, with exemplars chosen for range, plus a check by the person. The judge-circularity trap from Q1 is sharper here, because the person's idiosyncrasies are exactly what LLMs miss ([PersonalBench](https://arxiv.org/abs/2608.19746)).
4. **Every post approved by the person before it goes out;** the page reshares; Thought Leader Ads for reach.
5. **Cadence and mix:** vendors suggest 3–5 posts a week, split across perspective, behind-the-scenes, lessons and a little product ([HeroPost, vendor](https://www.heropost.io/linkedin-marketing-b2b-brands-2026/)). No evidence base.

**How individual and company voice differ** (inference, grounded where noted):
- **Grammatical person and stake:** "I" carries a personal claim and personal risk; "we" carries an institutional one. A company voice can be designed and written down as rules. An individual voice is largely unconscious habits (function words, rhythm), which is what authorship models detect and LLMs fail to reach ([2604.26460](https://www.emergentmind.com/papers/2604.26460), [PersonalBench](https://arxiv.org/abs/2608.19746)).
- **Where it comes from:** a company voice can come from brand documents and the page's past posts. A personal voice needs the person's own words and experiences, or it fails the "lived experience" test above.
- **Risk:** LinkedIn's slop flag and its private "inauthentic" nudge land on a named person's profile and reputation, not on a brand. Ghostwriting a person without disclosure or approval is a reputational risk; I found no LinkedIn policy text on ghostwriting. S-D7's decision log already rules out writing in a named person's voice on the public site.

**(2) Traps:** every multiplier in this section is vendor data. Searches for ghostwriting ethics and disclosure norms turned up nothing citable. A personal-brand *strategy* page that names the person, or writes as them, would hit S-D7's own impersonation rule and the charter's real-data scope.

**(3) What would change the plan:** nothing in S-D7's DoD. If Alex wants the leader angle in the demo, the cheap, safe form is a **method panel** ("how this would work for a leader: their dictation in, their approval out, the page amplifies through Thought Leader Ads"), with no persona and no posts in anyone's voice. A real personal-voice variant needs that person's own material and their say, which is outside today's scope.

---

## Evidence gaps

- **No primary LinkedIn numbers** on format reach or on the slop penalty. The "1 million reports" and "40% fewer views" figures come from one outlet (IBTimes) and are absent from TNW's report of the same announcement.
- **No study of an organisation's voice.** Every imitation study I found is about individual authors, on open models or GPT-class models. None tested Claude, or the rubric-plus-blind-judge pattern S-D7 uses.
- **Q4 2026 format data doesn't exist yet;** the Q3 figures come from one vendor page with inconsistent dates. LigoSocial's 2026 reports and van der Blom's 2026 report weren't readable (403, or summarised only in podcasts).
- **PersonalBench's specific methods** (whether few-shot or profile-based) aren't named on its abstract page. The method-level findings come from its April companion paper, via a secondary summary (emergentmind), not checked against the PDF.
- **Personal-brand evidence is entirely vendor material;** nothing citable on ghostwriting disclosure.
- I didn't check S-D7's current `local\rubric.md` or Alex's public rubric v2.1 (out of my read scope), so I can't say whether the AI tells in Q2 are already disqualifiers.

---

## Recommendations (options; every call is Alex's)

For S-D7 first; ordered by value against the 16:45 sign-off.

1. **How the score is worded on the site.** The evidence: an LLM judge scoring against an LLM-built trait list measures compliance, and can rate generated text above the real author ([2604.26460](https://www.emergentmind.com/papers/2604.26460)).
   - **A.** Show per-rule results ("meets 19 of 21 voice rules, 0 AI tells") and call it rubric adherence. Honest, and it costs nothing.
   - **B.** Keep a single score but add a line: "scored by a separate AI judge against the voice rules; a score shows the rules were followed, not that a reader can't tell."
   - **C.** As today.
2. **One control that tests the judge** (local only, never published). Slip one or two real reference posts, relabelled, into the judge's blind batch.
   - If the judge rates them below the generated posts, that's the circularity finding showing up in this demo. It's also a strong story for the method panel: "we tested our judge".
   - Cost: one extra judge run. Risk: it uses Alex's reference material inside a prompt. That's within "read for voice", but it's his call.
   - Alternatively, skip it and rely on Alex's sign-off as the human check.
3. **A stronger second baseline** (optional): "write a LinkedIn post for [company] in its brand voice" plus a one-paragraph company description, no rubric.
   - It shows the rubric adds something over a *reasonable* prompt, not just over a bare one.
   - Cost: one post, one judge pass. Without it, the baseline gap is partly guaranteed by construction (Q1).
4. **Example posts for the writers.**
   - **A.** Hand each writer 3–5 reference posts chosen for range, not topic, with the existing collection rules guarding against copying.
   - **B.** Rubric only, as now.
   - Evidence for A: [Wang et al.](https://arxiv.org/html/2509.14543v1). The risk with A is copying, and translated posts may carry the translator's voice.
5. **Ban LinkedIn's AI tells as literal disqualifiers,** checked deterministically before the judge sees a post:
   - the constructions: "Stop X, start Y", "If you want to…", "It's not X, it's Y", "Here's what / Here's how / what nobody tells you", "The result?";
   - plus one positive criterion: at least one concrete process detail.
   - Evidence: [MagicPost](https://magicpost.in/blog/does-linkedin-penalize-ai-content) (vendor) and S-D7's own round-1 finding.
6. **Formats:** keep the text post plus document-carousel copy. Optionally make one carousel a multi-image post to pair with S-D6's templates. Neither needs an outbound link. Evidence: [Socialinsider Q3 2026](https://www.socialinsider.io/social-media-benchmarks/linkedin) (vendor).
7. **The dated LinkedIn story for the method panel:** "LinkedIn added a 'Seems like AI slop' flag in July 2026; these posts are checked against the patterns readers flag", citing [TNW](https://thenextweb.com/news/linkedin-seems-like-ai-slop-button). Avoid the unconfirmed 40% figure.
8. **The leader angle** (lower priority), for S-D7 or the website:
   - **A.** A short method panel only (Q4, step list), with no persona.
   - **B.** Leave it for later.
   - **C.** A real personal-voice variant. It needs the person's own material and consent, and it conflicts with S-D7's current decision log and the charter's real-data scope, so it isn't recommended for today.

**For S-D6 and S-D10:** document carousels and multi-image posts are the two strongest company-page formats in the 2026 vendor data, so the templates' carousel or multi-image layouts carry the most weight.

---

## Sources

**Local (read only)**
- `C:\Users\alder\Desktop\Atlas OS\Projects\PROJ_Client Demo\Research\RESEARCH DIRECTORY.md` (updated 2026-08-02)
- `C:\Users\alder\Desktop\Atlas OS\Projects\PROJ_Client Demo\Research\rubric-extraction-viability.md` (2026-08-02)
- `C:\Users\alder\Desktop\Hire me hackaton\CHARTER.md`; `research\lists\L-05-brand-assets.md`; `linkedin-content\SPEC.md` (decision log to 16:28)

**Style imitation and its evaluation**
- Wang et al., *Catch Me If You Can? Not Yet: LLMs Still Struggle to Imitate the Implicit Writing Styles of Everyday Authors*, EMNLP Findings 2025: https://arxiv.org/html/2509.14543v1 · https://preview.aclanthology.org/dashboard/2025.findings-emnlp.532
- Sawant, *PersonalBench: Measuring the Authorship Gap in LLM Personalization*, 20 Aug 2026: https://arxiv.org/abs/2608.19746
- Sawant, *Theory-Grounded Evaluation Exposes the Authorship Gap in LLM Personalization*, 29 Apr 2026 (via summary): https://www.emergentmind.com/papers/2604.26460
- Review of *How Well Do LLMs Imitate Human Writing Style?* (secondary): https://www.themoonlight.io/en/review/how-well-do-llms-imitate-human-writing-style
- Paech et al., *Antislop*, ICLR 2026: https://arxiv.org/abs/2510.15061 · https://iclr.cc/virtual/2026/poster/10008156
- *Measuring AI "slop" in text* (taxonomy): https://arxiv.org/pdf/2509.19163

**LinkedIn and AI-sounding posts**
- The Next Web, 30 Jul 2026: https://thenextweb.com/news/linkedin-seems-like-ai-slop-button
- Engadget: https://engadget.com/2227188/linkedin-testing-seems-like-ai-slop-reporting-tool
- SmartCompany: https://www.smartcompany.com.au/artificial-intelligence/linkedin-ai-slop-report-button/
- IBTimes UK, 24 Aug 2026 (source of the unconfirmed 1M and 40% figures): https://www.ibtimes.co.uk/linkedin-removes-ai-writing-tool-ai-slop-reports-1815794
- MagicPost, *Does LinkedIn penalize AI content?* (vendor): https://magicpost.in/blog/does-linkedin-penalize-ai-content

**Formats (all vendor)**
- Socialinsider, LinkedIn benchmarks (company pages): https://www.socialinsider.io/social-media-benchmarks/linkedin
- DSMN8, *What's working on LinkedIn in 2026* (employee posts): https://dsmn8.com/blog/whats-working-on-linkedin-in-2026-report-key-findings/
- SocialPilot, LinkedIn algorithm (mostly unsourced figures): https://www.socialpilot.co/blog/linkedin-algorithm
- Dataslayer, February 2026 roundup: https://www.dataslayer.ai/blog/linkedin-algorithm-february-2026-whats-working-now
- The Shield Index archive (closed 22 May 2026): https://theshieldindex.beehiiv.com/archive
- 360Brew paper (marked withdrawn): https://arxiv.org/abs/2501.16450

**Personal brand vs company page**
- LinkedIn, Thought Leader Ads: https://business.linkedin.com/advertise/ads/sponsored-content/thought-leader-ads
- La Growth Machine, LinkedIn marketing strategy 2026 (vendor): https://lagrowthmachine.com/linkedin-marketing-strategy-2026/
- RevenueZen, company page vs personal profile (vendor): https://revenuezen.com/linkedin-company-page-vs-personal-profile
- HeroPost, LinkedIn for B2B brands 2026 (vendor): https://www.heropost.io/linkedin-marketing-b2b-brands-2026/
- Edelman, thought leadership release: https://www.edelman.com/news-awards/new-research-edelman-linkedin-thought-leadership-influences-b2b-sales
- Thought leadership statistics roundup: https://www.shno.co/marketing-statistics/thought-leadership-statistics
