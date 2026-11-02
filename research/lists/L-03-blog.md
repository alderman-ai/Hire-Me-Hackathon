# L-03 Research list: S-D4 Blog pipeline (S-D5 offered merged)
Status: draft
Approved by: (not yet)
Level: child (`blog-pipeline\research\`, pending S1-Q5); parent instead if S-D5 merges in
Readers: S-D4; S-D5 if merged
Drawn from: D4 ("Turns 15 minutes of operator dictation into a good-looking blog post that he finishes off (the last 10%). Likely built in the Claude design app"), D5 ("Three posts produced through D4"), and the rig's `/process` step, which already transcribes every recorded session. S-D4's own problem, scope and DoD aren't written yet and the project DoD doesn't exist, so each item cites the charter line it serves instead of a DoD id.

Not on this list: which topics Addvery's audience would read. That's Addvery research, which is Alex's (DI-3 Q3.3).

- [ ] R1 Transcript to draft, in Alex's voice. What's the converged method for turning a 15-minute spoken transcript into a blog post that keeps the speaker's voice and ideas: one pass, or staged (extract the claims, outline, draft, edit)? How do people keep LLM drafts from sounding generic? What does "the last 10%" realistically leave for the human? · serves: D4 "near-final blog post that he finishes off" · tools: WebSearch, web-fetch · deep: no
- [ ] R2 The Claude design app. What can Anthropic's Claude Design do today for a good-looking long-form post (layouts, imagery, brand kits)? How does its output leave the app (export, handoff to code, Vercel's Claude Design import)? Is it the right tool, or is a post template built into the Next.js site simpler? · serves: D4 "likely built in the Claude design app" · tools: WebSearch, web-fetch, read-only look at the Vercel MCP's import tool description · deep: no
- [ ] R3 Capture. The rig already transcribes every session with `/process`. Is that transcript good enough as the pipeline's input, or does dictation need its own capture (a mic pass, transcription settings, filler cleanup)? What breaks with 15 minutes of unscripted speech? · serves: D4 "15 minutes of operator dictation" · tools: read-only look at two existing rig transcripts in `OBS\Processed\` and the `/process` skill, then WebSearch · deep: no
- [ ] R4 What a finished B2B post looks like. What structure, length and visuals make a B2B agency's blog post look finished and get read in 2026 (headings, pull quotes, diagrams, cover image, SEO basics)? What's the smallest template that delivers that? · serves: D4 "good-looking"; D5 · tools: WebSearch, web-fetch · deep: no
- [ ] W1 Wildcard: can it be executed?
- [ ] W2 Wildcard: can it be delivered?
- [ ] W3 Wildcard: will it be received?
<!-- after every item above is ticked -->
- [ ] Synthesis: cross-document insights and recommendations for S-D4's methodology
- [ ] DIRECTORY.md entries for every report above
