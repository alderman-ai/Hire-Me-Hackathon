# L-03 R1: Transcript to draft, in Alex's voice

**Question, verbatim as approved:** "Transcript to draft, in Alex's voice. What's the converged method for turning a 15-minute spoken transcript into a blog post that keeps the speaker's voice and ideas: one pass, or staged (extract the claims, outline, draft, edit)? How do people keep LLM drafts from sounding generic? What does "the last 10%" realistically leave for the human?"

2026-11-02 · session s1-research subagent · item 1 of 9 on list L-03 (R1)
Serves: DoD-14, DoD-15 · Readers: S-D4 blog pipeline, S-D5 blog articles · Depth: not deep (about 15 minutes of search)

## Method

- Read first: `CHARTER.md`, `research\lists\L-03-blog.md` (including Alex's OT-04 note), `blog-pipeline\SPEC.md`. I also read the v0 prompts `blog-pipeline\prompts\4-draft.md` and `5-edit.md` (read-only) so the recommendations are concrete.
- Searched on 2026-11-02 with WebSearch: voice-memo/transcript-to-blog workflows; dictation plus Claude workflows; Anthropic's prompt-chaining and hallucination guidance; Wikipedia's "Signs of AI writing"; the humanizer skill; research on LLM style imitation, homogenization and ownership of AI-written text; professional ghostwriting process; Orbit Media's blogger survey; Google's guidance on AI content; STORM (outline-first generation).
- Fetched and read with WebFetch: Anthropic's prompting best-practices page (where the old "chain prompts" URL now redirects) and its "Reduce hallucinations" page; the arXiv abstracts of 2509.14543 and 2502.11266; Every's Spiral v3 announcement and the Spiral CLI README; Wikipedia "Signs of AI writing" (first 100k characters); a practitioner workflow (lawsen, Substack); Grain's call-to-blog workflow; Rev's ghostwriting guide; Orbit Media's 2026 blogging statistics; one public "write in my voice" skill reference (Alexander Weichart).
- One fetch failed (EA Forum, HTTP 429); that source is cited only from its search listing and marked unverified.
- Sources older than 2026 are date-stamped. Inference is marked **(inference)**. Search-listing-only claims are marked **(search listing, unverified)**.

## Verdict up front

1. **Staged is the converged pattern, but the reason has shifted.** Every workflow and tool I found splits the work (capture, pull the upshot and verbatim quotes, outline or options, draft, review), and Anthropic's own docs still recommend explicit chaining "when you need to inspect intermediate outputs or enforce a specific pipeline structure". For current models the gain is less about raw quality and more about traceability: every claim checkable against the transcript, and every stage showable. That fits D4 exactly, because the "How this post was made" box is the legibility point. There is no converged *number* of stages: the published versions run from three to seven.
2. **Generic-sounding drafts are best prevented by reusing the speaker's own words, not by style imitation.** The research says LLMs imitate an everyday author's informal style poorly from a few samples, with blogs among the hardest cases, and that LLM polishing measurably flattens style (21 to 50% less variance in writing complexity). The levers that work in practice are verbatim phrase reuse, a voice reference (the transcript itself, ideally plus a few written samples), a pattern list built from Wikipedia's "Signs of AI writing", a no-new-facts rule with tracing, and a separate cleanup pass that doesn't rewrite. S-D4's v0 prompts already do most of this.
3. **"The last 10%" is the decisions only the author can make**: the specific number, example or result; the title and opening; confirming that each claim is true and his; the closing ask. Practitioners report AI getting them "75% of the way there", so 90% is achievable only because the method front-loads his ideas (talking prompts) and forbids invention. Whether it really is 10% is measurable: S-D4 already plans to show the share of words Alex changed. No study measures the share.

## Evidence

### Q1. One pass or staged?

**(1) Is there a converged answer?** Yes for "staged"; no for how many stages.

- **Anthropic's own guidance, current (accessed 2026-11-02).** "With adaptive thinking and subagent orchestration, Claude handles most multistep reasoning internally. Explicit prompt chaining (breaking a task into sequential API calls) is still useful when you need to inspect intermediate outputs or enforce a specific pipeline structure." And: "The most common chaining pattern is **self-correction:** generate a draft → have Claude review it against criteria → have Claude refine based on the review." ([Anthropic, Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)). The older version of this page used research, outline, write, format an essay as its chaining example (per a [search listing of the old page](https://docs.anthropic.com/claude/docs/chain-prompts), unverified, as the URL now redirects).
- **Grain's call-to-blog workflow (2026; the search listing says updated July 2026)** runs: set the audience, fetch the transcript, "find the upshot" (the one thing it was about), pull the strongest moments with verbatim quotes traced to the transcript, draft against a voice guide, optional SEO pass ("add no new facts"), review. Its summary: "The model does the first pass, you do the last." ([Grain](https://grain.com/ai-workflows/turn-calls-into-content))
- **Every's Spiral (21 Oct 2025)**, a commercial "AI ghostwriter", "won't start writing immediately": it first interviews the writer to find the core message, then "will write three different versions" to mix and match, guided by "a library of principles" (for example, the most interesting idea in the hook). ([Every, Spiral v3](https://every.to/on-every/introducing-spiral-v3-an-ai-writing-partner-with-taste))
- **A practitioner's dictation workflow (Feb 2025):** dump by voice, then Claude proposes several structures, opening hooks and outlines, asks clarifying questions (answered out loud), several spoken feedback rounds "until it feels 'close enough'", then manual editing and a proofread. ([lawsen, "my current writing workflow"](https://lawsen.substack.com/p/my-current-writing-workflow))
- **Human ghostwriting, the pre-LLM version of the same job (Oct 2019):** record and transcribe the interviews, pick out "witty or well-spoken phrases that capture the speaker's voice", outline before writing, then check the draft against the transcript for every key point. ([Rev](https://www.rev.com/blog/how-to-use-transcription-for-ghostwriting))
- **Research on outline-first generation (Feb 2024):** Stanford's STORM splits generation into an outline stage and a writing stage; its authors report that pre-writing quality correlates with final article quality, and more articles judged organized (+25% absolute) than an outline-driven retrieval baseline. This is research on Wikipedia-style articles from web sources, not on transcripts. ([STORM project page](https://storm-project.stanford.edu/research/storm/); [arXiv 2402.14207](https://arxiv.org/html/2402.14207v2))
- **Converging on the extract step:** Anthropic's hallucination guide recommends that for long documents Claude "extract word-for-word quotes first", and that each claim be verified against a supporting quote, with unsupported claims removed. ([Anthropic, Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)). A 15-minute transcript (about 2,000 to 2,500 words) is well under the >20k-token threshold the page names **(inference: the quote-first step is still useful here for traceability, not because of length)**.

**(2) Traps and gotchas.**

- **More stages, more drift.** Each hand-off can paraphrase his words away. The fix the sources share is to carry the raw words forward: Grain's verbatim quotes, Rev's "pick out phrases", and S-D4's v0 draft prompt, which already reads `1-clean.md` alongside the outline. **(inference)** Any stage that sees only the previous stage's summary is where voice gets lost.
- **One opinion source argues a three-step outline-draft-refine chain often gains little over one well-specified prompt for capable models**, at a cost in latency and failure points (a third-party blog, per [search listing](https://www.pravinkumar.co/blog/prompt-chaining-vs-single-prompt-webflow-content-2026), unverified). Anthropic's current wording ("Claude handles most multistep reasoning internally") leans the same way. For D4 the stages are justified by inspection and legibility, not by quality alone.
- **A transcript isn't an article.** Spoken material has filler, repetition, live-only asides and a non-linear order; on the page, the writing has to carry what delivery and slides carried live ([Gamma guide](https://gamma.app/explore/content/guides/turn-conference-talk-into-written-article), undated vendor content). Speech order is often not the best reading order **(inference)**; S-D4's outline rule ("in his order") is a deliberate choice for fidelity that may cost readability.
- **Single-path output removes the author's cheapest choice.** Spiral and the lawsen workflow both generate options (three drafts; several structures and hooks) for the human to pick from. A pipeline that produces exactly one title and one opening leaves Alex to rewrite instead of choose **(inference)**.

**(3) What would change the planned approach in SPEC.md?** Little. The v0 stages (clean, extract, outline, draft, edit, format, scan) are the converged shape, at the heavier end. Candidates, all options for Alex or the blog session:
- The stages are justified chiefly as an inspection and legibility device, which supports keeping them visible in the "How this post was made" box.
- Clean, Extract and Outline could be merged into fewer calls if time is short; the evidence doesn't require seven separate stages.
- Adding two or three title and opening options to the near-final gate would match the "options" pattern.

### Q2. How do people keep LLM drafts from sounding generic?

**(1) Is there a converged answer?** Partly. The field has converged on a toolkit, not a proven recipe.

- **Examples beat instructions for tone.** Anthropic: "Examples are one of the most reliable ways to steer Claude's output format, tone, and structure." ([Anthropic, Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)). The practitioner: "Giving more examples makes a huge difference in getting output that matches my voice" (Feb 2025, [lawsen](https://lawsen.substack.com/p/my-current-writing-workflow)). Spiral's CLI: "Give it a few writing samples so drafts sound like you from the first one" ([Spiral CLI README](https://cdn.jsdelivr.net/npm/@every-env/spiral-cli@1.11.0/README.md), undated).
- **But few-shot style imitation is weak for exactly this genre.** A study of more than 400 real authors and 40,000+ generations per model found that LLMs "can approximate user styles in structured formats like news and email" but struggle with the informal writing of blogs and forums (Wang et al., EMNLP 2025 Findings, Sep 2025, [arXiv 2509.14543](https://arxiv.org/abs/2509.14543)). **(inference)** For Alex, his own transcript words are a stronger voice source than imitation from samples, which is what S-D4's "use his phrases" rule relies on.
- **LLM editing flattens style, even when meaning survives.** Across 880,000+ texts, LLMs "homogenize writing styles, reducing writing-complexity variance by a statistically significant 21-50%" when they polish or rewrite human text (Sourati et al., v1 Feb 2025, published in *Nature Human Behaviour* 2026, [arXiv 2502.11266](https://arxiv.org/abs/2502.11266)). Related: GPT-4o suggestions pulled Indian writers toward American styles (Agarwal, Naaman, Vashistha, Cornell, Apr 2025, [Cornell news](https://news.cornell.edu/stories/2025/04/ai-suggestions-make-writing-more-generic-western); [arXiv 2409.11360](https://arxiv.org/html/2409.11360v2)); AI-assisted stories were rated better individually but were more similar to each other (Doshi and Hauser, *Science Advances*, Jul 2024, [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11244532)); essays co-written with InstructGPT showed less lexical and content diversity (Padmakumar and He, 2023, [arXiv 2309.05196](https://arxiv.org/pdf/2309.05196)). **(inference)** The edit stage is the stage most likely to make the post generic, so "restore, don't polish" is the right instruction for it.
- **The reference list of AI tells is Wikipedia's "Signs of AI writing"** (WikiProject AI Cleanup, a living page, accessed 2026-11-02): inflated significance ("is a testament", "serves as", "pivotal"), superficial "-ing" analyses, promotional tone, vague attributions ("Experts argue"), overused vocabulary (delve, crucial, showcase, tapestry), "serves as" in place of "is", negative parallelisms ("not just X, but also Y"), reflexive rule of three, excessive bold, heavy em dashes, formulaic upbeat conclusions. Its own caveat: "this list is *descriptive*, not *prescriptive*; it consists of observations, not rules." ([Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing); press coverage: [TechCrunch, Nov 2025](https://techcrunch.com/2025/11/20/the-best-guide-to-spotting-ai-writing-comes-from-wikipedia/))
- **The skills built on it.** `blader/humanizer`, a Claude Code skill built on that Wikipedia page, detects and rewrites 24 to 29 patterns depending on version ([gittrend listing](https://gittrend.io/repo/blader/humanizer); repo not opened, counts from secondary sites). Spiral separates a "humanize" command, "No voice rewrite — just mechanical cleanup", from its voice pass ([Spiral CLI README](https://cdn.jsdelivr.net/npm/@every-env/spiral-cli@1.11.0/README.md)). One public "write in my voice" skill keeps its anti-AI pattern file explicitly subordinate to the author's voice profile, with carve-outs where the author's own published writing uses a flagged pattern, and treats "density of patterns, not a single slip" as the problem (Alexander Weichart, undated, [reference file](https://alexanderweichart.de/7_Agent/skills/write-in-my-voice/references/anti-ai-writing)).
- **No new facts, everything traced.** Grain: every claim should trace to something said on the call ([Grain](https://grain.com/ai-workflows/turn-calls-into-content)). Anthropic's press-release example: after drafting, find a supporting quote for each claim, and remove any claim without one ([Anthropic, Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)). **(inference)** Generic copy is mostly filler claims the speaker never made, so the trace pass is also an anti-generic pass.
- **Front-load the ideas.** Spiral interviews before drafting; the lawsen workflow has Claude ask clarifying questions, answered out loud. S-D4's five talking prompts (stage 0) do this before the dictation, which fits P3 better than a mid-pipeline interview **(inference)**.

**(2) Traps and gotchas.**

- **Ban lists can backfire.** Anthropic advises telling Claude "what to do instead of what not to do" ([Anthropic, Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)); its examples are about formatting, but the principle carries over. **(inference)** A bare list of banned words invites the next cliché as a substitute. Pairing each pattern with what to do instead (Weichart's approach: "Just say what the thing is") is safer.
- **Counting rules don't belong in a prompt.** "No more than one em dash per 300 words" and "at most two paragraphs open with 'So'" are counts. **(inference)** Models count unreliably, and a small script counts exactly; S-D4 already has a `scripts\` folder for word counts.
- **Spoken voice is not written voice.** His transcript carries his rhythm and vocabulary, but also filler and live narration. The v0 prompts already handle this ("Written, not transcribed"). The open question is whether Alex's *written* voice (for example his LinkedIn posts) differs from his spoken one; no source settles which a reader expects on a blog.
- **Samples carry their own risk.** Written samples that mention clients or Addvery would pull private matter into the context. Any samples would need to be public and clean (screen care).
- **Over-correction.** Wikipedia warns its list isn't a ban; scrubbing every em dash and every group of three can produce stilted prose of a different kind **(inference)**.
- **The marketing-copy pull.** **(inference)** A general copywriting skill tends toward hooks, CTAs and SEO furniture. If its rules outrank the transcript, it reintroduces exactly the generic register the pipeline is trying to avoid.

**(3) What would change the planned approach?** Reading `prompts\4-draft.md` and `5-edit.md` (v0.1), S-D4 already has: his phrases kept verbatim, the transcript read before drafting, a banned list close to Wikipedia's, a no-invention rule, a fresh editor with a trace pass, and "restore his voice, not his fillers". The evidence suggests four refinements (all options, below): a voice reference beyond the transcript, ban rules paired with replacements, counting moved to a script, and a measure of how much of the post is still his words.

### Q3. What does "the last 10%" realistically leave for the human?

**(1) Is there a converged answer?** On *what*, yes; on *how much*, no data.

- **What the human does, consistently across sources:** checks that every claim is true and his; adds the specific number, example or result the model couldn't know; decides the opening and title; cuts what isn't him; approves. Grain: "you keep the voice, cut the filler, check that every claim traces to the call, and approve the draft before publishing" ([Grain](https://grain.com/ai-workflows/turn-calls-into-content)). The lawsen workflow: Claude's output "still always needs tweaking", and getting "75% of the way there in half the time is a huge win" (Feb 2025, [lawsen](https://lawsen.substack.com/p/my-current-writing-workflow)). A forum commenter reports turning about twenty minutes of recorded speech, plus spoken notes on what to cut, into an 800-word post ([EA Forum thread](https://forum.effectivealtruism.org/posts/pDA5554b8b56Qwjut/crowd-sourcing-ai-workflows); search listing, unverified, as the page returned HTTP 429).
- **AI drafting alone doesn't make a post perform.** Orbit Media's 2026 survey of 1,042 content marketers (Sep 2026): "None of the use cases for AI in the survey correlate with performance" and "Using AI does not improve content performance" ([Orbit Media](https://www.orbitmedia.com/blog/blogging-statistics/); the page's own chart text is internally inconsistent on percentages). **(inference)** What's left to the human is where the value comes from, not a polish step.
- **Search treats AI drafting neutrally, and values first-hand experience.** Google (Feb 2023): content should be "original, high-quality, people-first content demonstrating qualities E-E-A-T", however it is produced; automation is a problem when its primary purpose is manipulating rankings ([Google Search Central](https://developers.google.com/search/blog/2023/02/google-search-and-ai-content)). The "experience" in E-E-A-T is what his markers supply **(inference)**.
- **Ownership follows involvement.** In the "AI Ghostwriter Effect" studies, people didn't feel they owned AI-written text but still didn't declare AI authorship, and more control over the model raised the sense of ownership; the authors call for simple ways to declare individual contributions (Draxler et al., *ACM TOCHI* 2024, preprint Mar 2023, [arXiv 2303.03283](https://www.arxiv.org/pdf/2303.03283); [LMU press release](https://www.lmu.de/en/newsroom/news-overview/news/who-wrote-it-the-ai-ghostwriter-effect-80ece661.html)). This matches the "How this post was made" box and L-01 W3.

**(2) Traps and gotchas.**

- **Ten percent of what?** **(inference)** For a 1,200-word post, 10% is about 120 words: three to six one-sentence markers, a title pick and a reworked opening. If Alex rewrites the opening and the close, he passes 10% fast. A word-diff share also counts moved paragraphs as changes.
- **A public number can contradict the claim.** S-D4's decision log puts "the share of words Alex changed" in the box. If the real share is 25%, the box says so on the live site. That is honest, but it is a choice Alex should make knowingly.
- **Markers that ask for things he doesn't have** (an exact figure he never measured) turn the last 10% into research **(inference)**. A marker is cheapest when he can answer it from memory in one line.
- **Typo-level review isn't the last 10%.** **(inference)** If his pass is proofreading, the post has his name but not his decisions, which is what the ownership research flags.

**(3) What would change the planned approach?** S-D4's `[Alex: ...]` markers (three to six, each saying what's needed) are the right shape and match every source. Options: present them at the near-final gate as a short list he answers, alongside two or three title and opening options; decide in advance how the share of words changed is measured and shown.

### Where a copywriting skill fits (OT-04)

Alex's rule: "Do not do any copywriting without a copywriting skill." R5 chooses which skill; this is only where one sits in the method.

- **Stages that are copywriting:** 4 Draft, 5 Edit, and the copy parts of 6 Format (title options, meta description, pull quotes). A skill belongs on these.
- **Stages that arguably aren't:** 1 Clean (fixing mis-hearings), 2 Extract (quoting), 7 Scan. Stage 3 Outline is borderline (structure, not prose). **(inference)** Whether Alex's rule covers them is his call.
- **A mechanical cleanup pass** (humanizer-type: AI tells only, no voice rewrite, as Spiral separates it) fits at the end of stage 5, after the trace and restore passes.
- **Order of authority (inference, from Weichart's design and the homogenization evidence):** the transcript, then the voice rules, then the skill's general copy advice. A skill that rewrites for "engagement" after the voice pass would undo it.
- Installed here and on R5's list: `marketing:draft-content`, `marketing:content-creation`, `marketing:brand-review`. I didn't evaluate them; that is R5.

## Evidence gaps

- **No controlled comparison of one-pass versus staged** for transcript-to-blog voice fidelity. The staged consensus rests on vendor and practitioner workflows, Anthropic's guidance and STORM, which is on a different task.
- **No measurement of "the last 10%".** No study or survey I found reports what share of an AI draft authors change before publishing. The "75%" figure is one practitioner's estimate.
- **Voice preservation from a spoken source is unstudied.** The imitation research uses written samples; I found nothing on keeping a *speaker's* voice when moving speech to prose.
- **Ban-list effectiveness has no evidence base.** Wikipedia's list is observational; the skills built on it report no evaluations.
- **Several sources are vendors** (Grain, Spiral, Gamma, Rev) with an interest in the workflow working; the practitioner sources are individuals.
- **Not verified directly:** the humanizer repo itself (pattern counts from secondary sites), the EA Forum comment (HTTP 429), the old wording of Anthropic's chain-prompts page, Grain's exact update date, Orbit's 2025 claim that full-article AI users were least likely to report strong results (I read only the 2026 page).
- **Out of scope here:** Wispr Flow and rig transcript quality (R3), which skill (R5), what a finished post looks like (R4).

## Recommendations

Evidence plus options. Every call is Alex's; where a choice is purely the blog session's craft, I say so.

1. **Keep the staged pipeline; justify it as inspection.** The evidence supports staging for traceability and for showing the work, which is D4's legibility point.
   - Option A: keep all seven stages, and name them in the "How this post was made" box.
   - Option B: merge Clean, Extract and Outline into fewer calls if time runs short; the evidence doesn't require seven.
2. **A voice reference beyond the transcript.** Examples steer tone most reliably, but few-shot imitation of blog style is weak, so the transcript stays the primary source either way.
   - Option A: transcript only (the v0 design, and zero operator time).
   - Option B: Alex supplies two or three public, client-free pieces of his own writing as tone samples for stages 4 and 5. This costs him a few minutes and needs screen care.
3. **Pair ban rules with replacements, and count with a script.** The blog session's craft, no operator time. Rewrite the banned list as "instead of X, do Y" (Anthropic's positive-instruction advice; Weichart's design). Move counted rules (em dashes per 300 words, paragraphs opening with "So", banned words) into a script in `scripts\` that flags hits after stages 4 and 5.
4. **Measure how much is still his.** The blog session's craft. Add to the edit notes or scripts a "his words" share (how much of the post's wording appears in `1-clean.md`), so homogenization in the edit stage shows up as a number. **(inference: no standard metric exists; a simple phrase-overlap count is enough for a demo.)**
5. **Separate cleanup from voice.** Keep stage 5's "restore, don't polish", and if a humanizer-type skill is used, run it last as mechanical cleanup only (Spiral's separation; the homogenization evidence).
6. **Give Alex choices, not just a post, at the near-final gate.** For example, two or three titles and openings plus the marker list, so his last 10% is choosing and answering (Spiral, lawsen; the ownership research). Whether he wants options or one take is his call.
7. **Decide how "the last 10%" is measured and shown before the first post goes live.**
   - Option A: show the real word-diff share, whatever it is (honest, may exceed 10%).
   - Option B: show the number of markers he answered and the minutes he spent, which reflects decisions rather than word churn.
   - Option C: both.
8. **The copywriting skill (OT-04) goes on stages 4, 5 and the copy parts of 6**, with the transcript and the voice rules ranked above the skill's general advice. Which skill is R5's finding; whether stages 1 to 3 count as copywriting is Alex's call.

## Sources

- Anthropic, "Prompting best practices" (current, accessed 2026-11-02): https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Anthropic, "Chain prompts" (old URL, now redirects; old wording from search listing only): https://docs.anthropic.com/claude/docs/chain-prompts
- Anthropic, "Reduce hallucinations" (current, accessed 2026-11-02): https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- Wang, Tripto, Park, Li, Zhou, "Catch Me If You Can? Not Yet: LLMs Still Struggle to Imitate the Implicit Writing Styles of Everyday Authors", EMNLP 2025 Findings (Sep 2025): https://arxiv.org/abs/2509.14543
- Sourati et al., "The Shrinking Landscape of Linguistic Diversity in the Age of Large Language Models" (v1 Feb 2025; Nature Human Behaviour 2026): https://arxiv.org/abs/2502.11266
- Agarwal, Naaman, Vashistha, "AI Suggestions Homogenize Writing Toward Western Styles and Diminish Cultural Nuances" (2025): https://arxiv.org/html/2409.11360v2 ; Cornell news (Apr 2025): https://news.cornell.edu/stories/2025/04/ai-suggestions-make-writing-more-generic-western
- Doshi, Hauser, "Generative AI enhances individual creativity but reduces the collective diversity of novel content", Science Advances (Jul 2024): https://pmc.ncbi.nlm.nih.gov/articles/PMC11244532
- Padmakumar, He, "Does Writing with Language Models Reduce Content Diversity?" (2023): https://arxiv.org/pdf/2309.05196
- Draxler et al., "The AI Ghostwriter Effect", ACM TOCHI (2024; preprint Mar 2023): https://www.arxiv.org/pdf/2303.03283 ; LMU press release: https://www.lmu.de/en/newsroom/news-overview/news/who-wrote-it-the-ai-ghostwriter-effect-80ece661.html
- Shao et al., STORM (Feb 2024): https://arxiv.org/html/2402.14207v2 ; project page: https://storm-project.stanford.edu/research/storm/
- Wikipedia, "Signs of AI writing" (living page, accessed 2026-11-02): https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing
- TechCrunch, "The best guide to spotting AI writing comes from Wikipedia" (Nov 2025): https://techcrunch.com/2025/11/20/the-best-guide-to-spotting-ai-writing-comes-from-wikipedia/
- blader/humanizer, via gittrend listing (repo not opened): https://gittrend.io/repo/blader/humanizer
- Every, "Introducing Spiral v3: an AI writing partner with taste" (21 Oct 2025): https://every.to/on-every/introducing-spiral-v3-an-ai-writing-partner-with-taste
- Spiral CLI README, @every-env/spiral-cli 1.11.0 (undated): https://cdn.jsdelivr.net/npm/@every-env/spiral-cli@1.11.0/README.md
- lawsen, "my current writing workflow" (Feb 2025): https://lawsen.substack.com/p/my-current-writing-workflow
- Grain, "Turn one recorded call into a blog, LinkedIn posts, and videos" (2026): https://grain.com/ai-workflows/turn-calls-into-content
- Rev, "How to Use Transcription for Ghostwriting" (Oct 2019): https://www.rev.com/blog/how-to-use-transcription-for-ghostwriting
- Gamma, "Turn a conference talk into a written article" (undated vendor guide): https://gamma.app/explore/content/guides/turn-conference-talk-into-written-article
- Alexander Weichart, "write-in-my-voice" skill, anti-AI writing reference (undated): https://alexanderweichart.de/7_Agent/skills/write-in-my-voice/references/anti-ai-writing
- Orbit Media, "2026 Blogging Statistics" (Sep 2026): https://www.orbitmedia.com/blog/blogging-statistics/
- Google Search Central, "Google Search's guidance about AI-generated content" (Feb 2023): https://developers.google.com/search/blog/2023/02/google-search-and-ai-content
- EA Forum, "Crowd-sourcing AI workflows" (search listing only, HTTP 429 on fetch): https://forum.effectivealtruism.org/posts/pDA5554b8b56Qwjut/crowd-sourcing-ai-workflows
- Prompt chaining versus single prompt, opinion blog (2026, search listing only): https://www.pravinkumar.co/blog/prompt-chaining-vs-single-prompt-webflow-content-2026
