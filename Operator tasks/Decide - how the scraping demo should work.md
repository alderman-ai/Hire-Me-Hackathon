---
System Primitive: Intake file
Intake State: Answered
Intake id: DI-6
Created: 2026-11-02
Build goals: []
---

# Decide: how the scraping demo should work

## What this is

The site is a personalised job application to Addvery, built live during a 12-hour recorded hackathon. The scraping demo is the part of the site that shows you turning the open web into useful research about a company with Apify, and the outbound demo draws on that research.

This intake asked you five things: how the Apify token and spending would be handled, what the demo should scrape, whether the site may name Apify, who would gather the details on Addvery's six stakeholders, and whether earlier tooling of yours could be reused. You answered all five on 2 Nov.

Your answers reshaped the demo. You run all the scraping yourself, one-on-one in your own Addvery research folder, under a $10 spending cap, and you write a summary of what it found. The session behind this demo runs no scraping, holds no token and spends nothing. Once your summary exists, it turns it into the scraping section of the site, naming Apify, and shows you the whole draft section for approval before anything goes live. Nothing more is needed from you here, and nothing is waiting on this file.

This intake holds 5 decisions for S-D1 Scraping research demo, the first wave-2 spec, because S-D3 needs its output before the GetSales live run. Each question carries its own context, so you can answer them in any order. An empty fence means not answered. The spec draft is at `scraping\SPEC.md` for reference, but you needn't read it. S-D1 needs you on camera for nothing: its one task for you is about 2 minutes off camera, with the recording paused, to give it the Apify token (the first question), and you can do that as soon as you've answered. Say "DI-6 is ready" when you're done.

# Q6.1 Apify account, token and spend cap

S-D1 drives Apify through its public API with your API token. No Apify connector is attached to this project, so the token is the only access it has.

- **Where the token goes.** One file, `scraping\.env`, as one line: `APIFY_TOKEN=` followed by the token. Git already ignores it (checked 2 Nov: the repo's ignore rule `.env` covers that file), so it never reaches the public repo. The session never prints it, never puts it on a command line and never opens it on screen. Its check prints only "TOKEN SET" or "TOKEN EMPTY".
- **When.** The charter's risk rule is that anything on screen can be published, so the token goes in only while the recording is paused. It takes about 2 minutes, at any time. No slot is needed.
- **A token just for today.** A new token made in the Apify Console (Settings, then API and Integrations) can be revoked tomorrow without touching anything else. Do this while paused too.
- **Cost.** Apify's free plan includes $5 of platform usage a month (its public pricing as last known; the session checks your plan and this month's usage before the first run, printing only those fields). A demo-sized run uses tiny inputs: a handful of pages or results. The research step prices each actor before anything runs.
- **The cap.** The session logs every run's reported cost and doesn't start a run that would take the total past your cap. It asks you through the desk instead.

How the token arrives:

- **A. You put it in the file yourself.** Pause the recording, open `scraping\.env` in a text editor (create it if it isn't there yet), write the one line, save, and resume. Nothing passes through any chat or transcript.
- **B. The session reads it from 1Password** with the `op` command and writes it straight into the file without printing it. You name the 1Password item (its name, not the token). 1Password may ask you to approve once, so the recording is paused for that too.
- **C. Something else.** Say what.

I recommend A, with a $5 cap. A needs no extra tool and leaves nothing in any transcript. A $5 cap stays inside the free credit, and on a paid plan it still means no surprises; you can raise it at any time. If you have no Apify account yet, the free sign-up takes a few minutes; write "no account yet" and the session builds everything that doesn't need a run until the token is there.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A with a $5 cap and logs it. Until the token is in the file, it builds and shows only the synthetic sample.

This answer decides when the real runs can start and how much they may spend. If the token is already in the file when the session starts, it skips the token task entirely.

Write A or B (with B, the 1Password item's name), then "free", "paid" or "no account yet", then a cap in US dollars.

## A6.1

`<operator_answer>`
```a-6-1
$10 cap and we can move everything over now because we're currently not recording
```
`</operator_answer>`

# Q6.2 What the demo scrapes (a charter conflict)

The demo has to run real Apify actors on something, and the charter pulls two ways:

- Scope: "Out: real data running through the demos (the one exception is the D3 live run on six stakeholders)".
- Deliverables: every client-facing deliverable is a demonstration, and "no real data runs through it except where noted".
- But S-D2 "may use S-D1's scrapers", and D1 "comes early because its output feeds several other specs".
- And the DoD you signed off says (DoD-9): "The scraping demo's research output exists in a form other specs read". S-D3 reads it for its enrichment step before the GetSales import.

Whatever you pick, these hold: no actor needs a login or cookies; no named person appears in the D1 section; raw scraped data stays on this computer in a git-ignored folder inside `scraping\`, as you did for your own research (DI-2 Q2.2: "it's also going to be ignored just so we're not posting"); and only the curated D1 section reaches the site. A spec can't edit the charter, so under A or B the session sends S2 a request quoting your answer, and S2 records it as the reading of the Scope line: "real data" means personal data about anyone but you.

- **A. Addvery's public company footprint, company level only:** its website, its public job posts, and news about the company. The D1 section shows the reader's own company researched by the pipeline, the strongest personalisation on the site. The company data can also feed S-D3's first message, and your own research can use or ignore it. It touches your Addvery research a little (DI-3 Q3.3: "I'm on this. I'm going to be doing it in the subdirectory Addvery Research"): S-D1 scrapes only public company pages for the demo and draws no conclusions about anyone. Needs S2 to record the reading.
- **B. Your own public footprint:** your website and other public pages about your work. Real data, but only yours, so no third party is touched. The demo reads as the applicant running the tool on himself, which says less to Addvery. S-D3 gets only the schema and the synthetic sample from S-D1. Needs S2 to record the reading.
- **C. A scraping sandbox plus a synthetic sample:** the actors run on a site built for scraping practice (such as quotes.toscrape.com), and the research step runs on fictional, Addvery-shaped records. Matches the charter as written, with no change. It proves the API path but shows no real research, so it reads more like a tutorial.
- **D. Something else.** Say what.

I recommend A. A personalised outreach site is the point of the project, and company-level public pages are the least sensitive real data there is: no person is profiled, nothing raw is published, and the six stakeholders stay in your own folder.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes C and logs it. C is the only option that needs no charter reading. The runner is the same code under every option, so switching later is one run and one build request.

This answer decides the D1 section's content, what company context S-D3's first message can draw on, whether S2 records a reading of the Scope line, and how much of S-D1's output your own research can reuse.

Write A, B, C, or D and what you want instead.

## A6.2

`<operator_answer>`
```a-6-2
What are the demos? Look there are a lot of things that we can't conflate:

1. I'm going to scrape Addvery. I'm going to do that one-on-one in the Addvery research subdirectory. That is separate. No spec is going to manage that. However it is a demonstration of scraping and we'll do some kind of summary of all of the outputs. That, again, I'll manage one-on-one.
2. For GitSales really, the output is basically this: once the research is ready GitSales will pick the top six shareholders/stakeholders here. I need to get one of the first things I'm going to research in Addvery (I'm doing it. Don't execute this): getting the org chart built from scraping. Once we find the top stakeholders (the co-founders), they have a CAIO, RevOps, CEO, CTO, CSO, or any of the directors or equivalents if it's not C-suite. Once we identify those people we're going to send an actual campaign goal by the end of 15:30 Prague time, just letting them know this is happening and that they can follow along if they're interested in this hackathon. Yes I'll jump into that when I can. First I'm going to get the Addvery research started.
```
`</operator_answer>`

# Q6.3 May the public site name Apify?

- The charter names it. D1: "Shows the scraping and research capability on the Apify API." DoD-8: "A legible demo of scraping and research on the Apify API is on the live site".
- What must stay off is the proposal. DoD-22: "Nothing published (the site, its videos, the public repo) shows secrets, the Apify proposal or the operator's own GetSales outbound."
- At 13:50 the legibility session (S-D9) left the scraping tool's name off the site as a precaution, because you said it right next to the recent proposal in one of this morning's rig sessions. That stretch stays out whatever you answer here. This question is only about the name.
- The public repo already names Apify, in the charter and in the specs.

- **A. Name it.** The D1 section says it runs on the Apify API and names each actor it used. Most legible, and it's what the charter and DoD-8 say. S-D9 may then name it in the build story too, still leaving out anything from near the proposal.
- **B. Name it only inside the D1 section.** The build story and the timeline keep leaving it out, as S-D9 does now.
- **C. Don't name it anywhere on the site.** The section says "a scraping platform's API" and describes each actor by what it does. Safest, a little less legible. Naming it later is one build request.
- **D. Something else.** Say what.

I recommend A. The risk is the proposal, not the name, which is already public in the repo, and a demo that hides its own tool reads oddly to someone hiring a GTM engineer.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes C and logs it.

This answer decides the D1 section's wording and S-D9's rule on the name. S-D1 passes your answer to S-D9.

Write A, B, C, or D and what you want instead.

## A6.3

`<operator_answer>`
```a-6-3
yes
```
`</operator_answer>`

# Q6.4 The six stakeholders' enrichment for the GetSales live run

- The GetSales live run (proposed for 17:00 to 17:30) takes your six stakeholders through the full pipeline. DoD-13: "Sales Navigator, CSV export, enrichment from D2, a computed first-message variable, import into GetSales".
- You keep all Addvery research yourself. DI-3 Q3.3: "I'm on this. I'm going to be doing it in the subdirectory Addvery Research. You do not need to build a spec to handle that." That folder is git-ignored.
- The charter says S-D2 "may use S-D1's scrapers".
- By 16:30, S-D1 publishes the shape the enrichment must have (its fields, a source on each, and which fields feed the first-message variable), with six fictional records for S-D3's dry run.

- **A. Your research makes the six's enrichment, in your own folder, in S-D1's published shape.** S-D1 gives you its runner and a one-page how-to, and never touches anyone's personal data. It costs you the time to run or fill it before 17:00 (estimate: 10 to 20 minutes with the runner). People's data stays in one git-ignored place.
- **B. S-D1 does it once you've confirmed the six.** It reads your confirmed list from your folder, runs the people scrapes within the same spend cap, and writes the enrichment into its own git-ignored folder inside `scraping\`, where S-D3 reads it from this computer. It saves your time, but people's data then sits in a second git-ignored place, and S-D1 reads your folder.
- **C. Something else.** Say what.

I recommend A. It matches your answer in DI-3 and keeps people's data in the one folder you control. Take B if your time before 17:00 is the tighter limit.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer decides whether S-D1 ever handles personal data, what S-D3 reads for the live run, and whether S-D1 reads your folder.

Write A, B, or C and what you want instead.

## A6.4

`<operator_answer>`
```a-6-4
We're not going to have the GitSales subdirectory do any scraping. All the scraping is going to happen in Addvery. GitSales is basically going to use any information already scraped to build the custom first messages or maybe the second message, telling them that this is happening, why I'm doing this, and then another message. Get sales is two separate things:

1. Just sending out an alert to those top shareholders that we identify, that this is happening with the hackathon, preferably by 15:30 prog time.
2. That's through my sender profile. You can go to all the credentials. Let me know if there's any problem with the tech stack and okay you figure it out.

You can build, just as an example, like it could build 3 ICPs. Again wait till we have the research done. We'll guess or we'll pull from their website their top ICPs and we'll build 20 workflows. Let's label them under a new folder in GetSales so that I can hide them easily. We'll take each of their ICPs and do it in whatever languages make sense. We'll have 3 different approaches per language. If it's 4 ICPs, we'll say 3 languages, that's 12, and then 3 approaches, so that's going to be 36 workflows they can drip into. We'll explain how Jev can be trained to put people into one of those workflows and each of those workflows will start with that custom message, which would be calculated after leads get exported. It depends on what stack they have. That custom message we created through their Claude or agentic LLM account, probably in a CSV if the tooling exists through MCP to their CRM, whatever. I don't know their tech stack but those custom messages would be written before they get imported into GetSales. Message 1 is literally just a variable, like `custom message 1`, right? That gets imported as one of the fields when a lead is imported into GetSales.
```
`</operator_answer>`

# Q6.5 Earlier Apify tooling to reuse

S-D1 has to write a runner that starts Apify actors through the API, waits for them and collects their results, and it has to work the first time today. Its research list asks what the simplest reliable way is. If you already have Apify tooling that worked in an earlier project (scripts, skills, a client wrapper), S-D1 can reuse its method instead, which could save about half an hour (estimate) and some risk.

Either way, S-D1 reads only method and scripts, copies no company data, personal data or credential into this repo, and never opens the Apify proposal or your private `hi-apify` repo.

- **A. Nothing to reuse.** S-D1 builds from Apify's public docs and its research.
- **B. Reuse it.** Name the place: a local folder or a repo.

I recommend B if you have something that worked, and A otherwise.

If the fence is empty: before 18:00 Prague the session keeps waiting and pokes you every 15 minutes; from 18:00 it takes A and logs it.

This answer decides where the runner's method comes from and how long it takes to build.

Write A, or B and the place.

## A6.5

`<operator_answer>`
```a-6-5
Yeah D1. I'm going to be doing all the Apify stuff in the scraping thing. I really don't think this D1 needs any Apify actors or Apify API. It's all going to be happening in the Addvery research subdirectory and this spec or this demo can pull from that research 
```
`</operator_answer>`
