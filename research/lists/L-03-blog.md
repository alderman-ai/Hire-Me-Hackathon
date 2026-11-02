# L-03 Research list: S-D4 Blog pipeline (S-D5 reads it too)
Status: with Alex (OT-04, `Operator tasks\Approve - research for the blog pipeline.md`)
Approved by: (not yet)
Requested by: s-d4-blog-pipeline, `RESEARCH S-D4: L-03 plus L-01, the pipeline's stages and the post's look depend on them and the test dictation is in by 15:35, needed by 16:00` (2 Nov, about 14:56). Its spec lets the test post be drafted before the findings land and revised by them (DI-8 question 5).
Level: parent (`research\global\`), because S-D5 runs the same pipeline
Readers: S-D4, S-D5 (both also read L-01, already done)
Drawn from: `blog-pipeline\SPEC.md` (about 15 minutes of Alex talking becomes a good-looking, near-final post with only the last 10% left to him; a post page in the site's look; a "How this post was made" box; DI-8's open questions on Claude Design versus a site template, and Wispr Flow versus the rig transcript), DoD-14 (one test dictation becomes a post Alex accepts as near-final), DoD-15 (three posts live on the site).

Not on this list: which topics Addvery's audience would read. That's Addvery research, which is Alex's (DI-3 Q3.3). How AI-made work is received is already in L-01 (W3).

- [ ] R1 Transcript to draft, in Alex's voice. What's the converged method for turning a 15-minute spoken transcript into a blog post that keeps the speaker's voice and ideas: one pass, or staged (extract the claims, outline, draft, edit)? How do people keep LLM drafts from sounding generic? What does "the last 10%" realistically leave for the human? · serves: DoD-14, DoD-15 · tools: WebSearch, web-fetch · deep: no
- [ ] R2 The Claude design app. What can Anthropic's Claude Design do today for a good-looking long-form post (layouts, imagery, brand kits)? How does its output leave the app (export, handoff to code, Vercel's Claude Design import)? Is it the right tool, or is a post template built into the Next.js site simpler? · serves: DoD-14 ("good-looking"), DI-8 question 1 · tools: WebSearch, web-fetch, read-only look at the Vercel MCP's import tool description · deep: no
- [ ] R3 Capture. The dictation goes through Wispr Flow, with the rig's transcript as backup. What breaks with 15 minutes of unscripted speech through each (long-form limits, filler, punctuation, mis-heard names and jargon), and what cleanup step does the pipeline need before drafting? · serves: DoD-14 ("fifteen minutes of operator dictation"), DI-8 question 2 · tools: WebSearch, web-fetch; read-only look at one existing rig transcript in `OBS\Processed\` · deep: no
- [ ] R4 What a finished B2B post looks like. What structure, length and visuals make a B2B agency's blog post look finished and get read in 2026 (headings, pull quotes, diagrams, cover image, SEO basics)? What's the smallest template that delivers that? · serves: DoD-14 ("good-looking"), DoD-15 · tools: WebSearch, web-fetch · deep: no
- [ ] W1 Wildcard: can it be executed?
- [ ] W2 Wildcard: can it be delivered?
- [ ] W3 Wildcard: will it be received?
<!-- after every item above is ticked -->
- [ ] Synthesis: cross-document insights and recommendations for the S-D4 and S-D5 methodologies
- [ ] DIRECTORY.md entries for every report above
