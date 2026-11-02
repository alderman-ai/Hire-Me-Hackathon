---
System Primitive: Operator task
Task type: Gate approval
Task id: OT-04
Task State: Archived
Gate: S-D4 research list L-03 (S-D5 reads it too)
Requested by: s1-research, for s-d4-blog-pipeline ("RESEARCH S-D4: L-03 plus L-01 ... needed by 16:00")
Snapshot of: research\lists\L-03-blog.md at commit e6c30db
Unblocks: the research behind the blog pipeline's drafting stages and the post's look, for the test post and the three articles
Created: 2026-11-02 14:57 Prague
Archived: 2026-11-02
---

# Approve research for the blog pipeline

## What this is

**About a 2-minute read. The blog session would like the findings by 16:00, but it isn't blocked: it drafts the test post anyway and revises it when the findings land.**

The blog pipeline turns about 15 minutes of you talking into a good-looking, near-final post, leaving you the last 10%. The three blog articles run through the same pipeline. Before it settles how the drafting works and how the post looks, it wants four questions answered.

**What you're approving.** The four questions below, used word for word, plus three wildcards. Each wildcard looks for the biggest open question the list misses, from one angle: can it be built in time, can it be delivered, will it be well received? Then one summary. Two of the questions feed choices still open in your blog-pipeline decisions: Claude Design or a site template, and Wispr Flow or the rig transcript.

**What happens when you tick the box.** Seven research helpers start at once, then the summary. The findings go to the blog session and to the three-articles session. Nothing about Addvery's audience or topics is researched; that's yours.

**If you want changes,** leave the box empty and write them in the box at the bottom, for example "skip the Claude Design question" or "no wildcards".

## What's being approved

**Question 1. Transcript to draft, in your voice.** What's the converged method for turning a 15-minute spoken transcript into a blog post that keeps the speaker's voice and ideas: one pass, or staged (extract the claims, outline, draft, edit)? How do people keep LLM drafts from sounding generic? What does "the last 10%" realistically leave for the human?

**Question 2. The Claude design app.** What can Anthropic's Claude Design do today for a good-looking long-form post (layouts, imagery, brand kits)? How does its output leave the app (export, handoff to code, Vercel's Claude Design import)? Is it the right tool, or is a post template built into the Next.js site simpler?

**Question 3. Capture.** The dictation goes through Wispr Flow, with the rig's transcript as backup. What breaks with 15 minutes of unscripted speech through each (long-form limits, filler, punctuation, mis-heard names and jargon), and what cleanup step does the pipeline need before drafting?

**Question 4. What a finished B2B post looks like.** What structure, length and visuals make a B2B agency's blog post look finished and get read in 2026 (headings, pull quotes, diagrams, cover image, SEO basics)? What's the smallest template that delivers that?

**Plus three wildcards and a summary.**

## Approval

- [x] I approve

Tick the box to approve as it stands. If something has to change first, leave the box empty and write what to change below. Either way, the requesting session checks this file every 5 minutes while it's blocked.

`<operator_answer>`
```ot-04-changes
Do not do any copywriting without identifying which skill you need to turn on, telling the orchestrator to turn it on for you. Do not do any copywriting without a copywriting skill.

For all of your research research what's the best skill to write blogs with. The three topics will be (and you can start researching for the base of the articles): we'll do two articles. One is about how there's no such thing as building something like an AI workflow as a product. It's always a managed service because the models always change.

Add to it that every company is going to have to decide what level of AI skill they want their company to have. Do they want to be able to just use workflows other people build? Do they want to be able to maintain them themselves or to build them themselves? You can imagine a sliding scale that's vertical: at the bottom is the training and at the top is the external building. They're going to have to find out where on the slider they are because they're either going to need to get trained how to do it themselves or they're going to have to bring in someone external or hire someone external. Still they're going to need to compensate someone else for whatever they build with the training to actually use it.

That's the general scope of one so you can get working on that one and you can draft some LinkedIn imagery or whatever. While you do that you can do some mockups of what the LinkedIn content might use. Use whatever frontend code or any kind of design choices they've scraped from LinkedIn content. Take that and then we can create it the same way we did the Appify one, where there's a template in the background and then the generative AI text on top. //  The second article will be about how, basically, GTM engineers are the solution to the biggest social question of the AI era. A lot of companies are saying that AI is not a way for them to fire half their company. For AI to save a company any money there has to be some return on that investment. If it's not lowering their labor costs then it has to be increasing their revenue.

That means GTM engineers who focus AI on their pipeline are actually the ones that are helping companies keep their promise: that AI is a way to do more business and have their whole team grow together, rather than replace half their team. GTM engineers have a really crucial role to play in this AI transformation and you use that as a base. We'll fill in more of the details later.

I really don't want to talk any more about articles right now. I want you to again find a skill that'll help you build good articles. These are the topics. You can go ahead and do some workshopping on what the visual assets that go with them might look like. We can also create something in Comfy. There's a Comfy UI repo on desktop that knows how to build things. Make a spec for all that or plan in the spec for all that. 
```
`</operator_answer>`
