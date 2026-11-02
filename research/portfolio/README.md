# AI portfolio (a job for S1, outside its research spec)

`orchestration` gave this to `s1-research` at about 18:20 on 2 Nov, from Alex, verbatim: "I also like another subagent to go through and build an AI portfolio. A lot of this is the GTM stuff but I want to focus on my spec, knowledge, executable spec things here. There's an email somewhere that lists what I consider my AI portfolio so you can go through that to build an AI portfolio for me But I don't want it just to be linking. I want it to be built to where it's mostly explaining things or it's almost like a first-person narrative of what's interesting to me and what I've been building on. We could explain my AI sabbatical, what I learned through it, what was interesting to me, and what I built on. You can use this email.eml file that includes the curated AI stuff but make it more like a blog story thing that has citations. I can talk about being interested in it then I can drop a repo underneath it that proves it, right?"

## Files

- `sources\`: one fact sheet per repo the email lists, each with citations and a "keep off the page" section.
- `ai-portfolio.md`: the story, in the site's shared entry format (`..\..\blog-pipeline\POST-FORMAT.md`), checked with its `validate.py`.
- Alex's quotes and the email text stay in the job's temp folder, untracked.

## Steps

1. Read the email as data; read each repo it lists (subagents). Done 18:28.
2. Draft with `marketing:content-creation` on; check with `validate.py`.
3. Brand review with `marketing:brand-review` against `linkedin-content\local\alex-voice\guide.md`.
4. Put it in a Claude Doc for Alex's last-mile edit (reset rule 4); TASK line to `answer-desk` with the link.
5. After his comment: read the final text back here, then `BUILD` to `website` to place it at `website\content\demos\ai-portfolio.md`, linked from his About-me section.

## Decisions (easy calls under Alex's reset rules; each reversible)

| Decision | Why | Blast radius if changed |
| --- | --- | --- |
| Drafted in `research\portfolio\`; `website` places the file by BUILD. | GIT.md: a session writes only its own folder. | One file move. |
| Reviewed in a Claude Doc, not an artifact. | Reset rule 4: written work for outside readers goes in a Claude Doc, and his comment is the sign-off. | None to the text. |
| The email's recipient, its job application and its feedback ask stay out entirely; only the four listed repos and his own words about them are used. | It's a private note; DoD-22 and the charter keep job applications and the Apify proposal off the site. | None. |
| No figures from the pixel-perfect demo. | Every one carries Apify's card design and logo; `website`'s own asset list excludes Apify images; it's an application to Addvery. | Add figures later if Alex wants them. |
| Link only the specific CB6 and Factor-AI files he already shares, and flag their repos' history to him. | CB6's git history still holds a client contact's details, GPS data and a Drive link; Factor-AI holds 18 raw session transcripts with his email and private folder names. Reported to `orchestration` for Alex. | Drop or keep those links at his word. |
