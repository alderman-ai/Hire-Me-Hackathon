# Side cards: index

One card per moment Alex graded G (great) or Y (yes) in `legibility\grading\grades.jsonl`: 53 cards, 34 G and 19 Y. A grade means the moment is acceptable raw material, not that it becomes content; greats win ties over yeses. Each card says what the moment is, what it could serve as and what to watch for, so a builder can decide what goes together. Cards are internal notes, written plainly; quotes are verbatim from the machine transcript. `cards.json` holds the same data.

## Theme vocabulary

Every card uses only these tags, most central first.

- gtm-thesis: why GTM engineering matters; AI has to grow revenue, not cut staff; pipeline first; upskill, don't fire; the role's future demand.
- personalisation-at-scale: personalization vs volume, the costly signal, knowledge arbitrage, "AI so good it looks human", top accounts.
- icp-filtering: sorting leads into ideal customer profiles, classifiers, the 36 workflows, routing, first-message variables.
- ai-managed-service: no AI workflow is a product; build / maintain / train; token cost; why a company still needs the person after month one.
- orchestration: running many agent sessions at once; specs, the charter, parallel work, delegation, forking, front-loading, async human in the loop, the answer desk.
- human-bottleneck: the human (time, focus, judgment) as the limit; operator overload; micromanaging; drowning in requests.
- reusable-skills: work codified so it repeats; skills, "same thing tomorrow with a new company", repeatability, speed the second time.
- failure-and-recovery: mistakes, setbacks and fixes on camera; closing every session, starting over or not, halts, low points.
- research-method: how he researches companies and people; org charts, scraping, public sources, stakeholder pages.
- ai-craft: what using and learning AI is actually like; clarity over files, the three tribes, mindset, gut feel, model and tool judgment.
- hiring-pitch: why hire him; the site as the application; no CV; what he wants from the job; why this company.
- build-in-public: the recording itself, legibility, the live site updating as it's built, showing the work.
- voice-and-taste: his writing voice, brand capture, design and copy taste, what "good" looks like to him.
- personality: humour, candour, energy, self-deprecation; moments that show who he is more than what he argues.

## Cards

| Id | Grade | Length | Gist | Themes | Standalone |
| --- | --- | --- | --- | --- | --- |
| [S01-c](S01-c.md) | Y | 17 s | At the start of the day he says that to have any chance of finishing in 12 hours he has to get a lot of things running in parallel and actually plan what he's doing. | orchestration, ai-craft | medium |
| [S01-d](S01-d.md) | Y | 38 s | He says he'll keep talking so the transcripts come out full (the start of that sentence sits just before the moment). | build-in-public, personalisation-at-scale | medium |
| [S01-e](S01-e.md) | Y | 30 s | He keeps his terminal off to the side so none of his credentials show up on the recording. | build-in-public, hiring-pitch | high |
| [S01-f](S01-f.md) | Y | 39 s | Before making the day's plan, he explains that when he builds with AI he gives it everything it needs in a fairly complex document, and that he spent six months building his own methodology for this. | ai-craft, orchestration | medium |
| [S02-b](S02-b.md) | Y | 87 s | The opening of his intro video: what the hackathon is and why he's reaching out. | hiring-pitch, personalisation-at-scale, gtm-thesis, build-in-public | high |
| [S02-c](S02-c.md) | G | 75 s | He explains knowledge arbitrage: things are valuable because you know something before other people (the sentence starts just before the moment). | personalisation-at-scale, gtm-thesis | high |
| [S02-d](S02-d.md) | G | 48 s | Following on from people being able to tell personal outreach from a shotgun blast, he calls that a very costly signal, and says this 12-hour build in public for one company is costly too: he can't do it for 30 companies a day yet, because he's building it for the first time. | personalisation-at-scale, reusable-skills, build-in-public, personality | medium |
| [S02-e](S02-e.md) | G | 31 s | He starts on 'the next company' (leaning on the context line before: once the automations exist he could redo most of this through AI), then corrects himself: he doesn't want there to be a next company. | hiring-pitch | medium |
| [S02-f](S02-f.md) | G | 86 s | He predicts the pipeline-boosting role will be one of the most in-demand positions over the next five to ten years. | gtm-thesis, personality | medium |
| [S02-h](S02-h.md) | G | 34 s | Once automated, the work looks costly but isn't. | personalisation-at-scale, gtm-thesis | high |
| [S02-i](S02-i.md) | G | 58 s | He says it isn't free: beyond his own service it costs tokens. | ai-managed-service, hiring-pitch | medium |
| [S02-j](S02-j.md) | G | 71 s | He lists what the site will hold: his background, live demos and, instead of a page per service, a page with a customised pitch for every stakeholder he thinks might be involved in hiring him, built from deep research of the company's org chart with scraping tools. | hiring-pitch, personalisation-at-scale, research-method, build-in-public | medium |
| [S02-k](S02-k.md) | Y | 20 s | Wrapping up the S02 explainer, he says articles will explain why his skills are worth a lot and touches on what he'll ask to be paid (flagged, see watch-outs). | build-in-public, personality, hiring-pitch | medium |
| [S03-e](S03-e.md) | Y | 75 s | Stating the second principle for the document his executable specs will be built from, Alex says his own time is the main bottleneck, so every pre-flight check and anything that needs a human should surface at the start of each spec. | orchestration, human-bottleneck | medium |
| [S03-f](S03-f.md) | G | 78 s | Alex adds the next principle: if his time is the bottleneck, his focus is an even tighter one. | human-bottleneck, orchestration | medium |
| [S03-g](S03-g.md) | Y | 55 s | Continuing a principle he has just named, semantic cohesion (in the context line before), Alex says each spec is run by one orchestrator session that passes as much as possible to subagents, so its context window stays semantically clustered and usable, with strategic forking so there is no context rot in long automated work. | orchestration, ai-craft | medium |
| [S03-h](S03-h.md) | G | 63 s | Turning to the people watching ("hi humans"), Alex says AI work right now is heavily front-loaded, and that normally he has a lot of this automated. | ai-craft, build-in-public | high |
| [S03-i](S03-i.md) | G | 100 s | Calling it one of his spiciest takes (the set-up is in the context line before), Alex lays out the three tribes of AI: skilled practitioners today mostly came from academia, from coding, or from entrepreneurship. | ai-craft, hiring-pitch | high |
| [S03-j](S03-j.md) | Y | 31 s | Picking up from the third tribe, marketers (the context line before has "it takes a lot of crazy stuff like this to get"), Alex says that when companies look for an engineer or anyone to build their workflows, a CV like his, from experience, doesn't really get looked at. | hiring-pitch, build-in-public | medium |
| [S03-m](S03-m.md) | G | 60 s | Midway through dictating where the resources folders should go (context lines), Alex stops himself: he won't micromanage the how. | human-bottleneck, ai-craft, orchestration | high |
| [S03-n](S03-n.md) | G | 53 s | At noon, with nothing yet running in parallel (the context lines just before set this up), he calls it a really tough decision and explains that AI work is always front-loaded: time put in at the beginning pays off because the automated work can run overnight. | orchestration, ai-craft, failure-and-recovery | medium |
| [S04-i](S04-i.md) | G | 57 s | He says that once you know the leverage of running lots of things in parallel, it's hard to take the time to get everything right first, but experience shows it's far more time-efficient to do the beginning well, because mistakes cascade and snowball. | human-bottleneck, orchestration, ai-craft | high |
| [S04-k](S04-k.md) | G | 53 s | He gives another rule of AI work: if you get a bad feeling about how something starts, it's almost always worth starting over, and admits he has that feeling now about "that document". | ai-craft, failure-and-recovery, personality, build-in-public | medium |
| [S05-b](S05-b.md) | Y | 90 s | He dictates the instruction that starts the first parallel work: understand the charter, then fork, and have the forked session spin up three Opus subagents, one per initial spec, each writing its spec and running a pre-flight check with him. | orchestration, personality | low |
| [day1-2](day1-2.md) | G | 44 s | He says the day is stressful, partly by design (he set it up to be stressed so he'd focus more), but now uncomfortably so. | failure-and-recovery, personality, human-bottleneck, build-in-public | high |
| [S05-g](S05-g.md) | Y | 65 s | He dictates how the spec writers' opening questions should reach him: each spec's questions go into the question part of a decision intake, one document per spec, in an "operator tasks" folder, so he can answer the batch all at once. | orchestration, human-bottleneck | medium |
| [S05-j](S05-j.md) | Y | 37 s | Pointing an agent at the research section of his own executable-specs repo (the context lines set this up), he explains where research sits in his method: first the definition of done for each thing, then research before the methodology is decided. | ai-craft, orchestration, research-method | medium |
| [day1-3](day1-3.md) | G | 33 s | Seconds after the accident he says "So that was bad" and explains it: he was trying to end one session he didn't need anymore and ended all of them, including the ones that handle the recording. | failure-and-recovery, personality, build-in-public | medium |
| [S05-n](S05-n.md) | G | 54 s | Straight after closing every session, he dictates what happened to an AI session (a fresh one, per the clip index): he meant to delete one session he didn't need and ended a bunch of background sessions that were all working in parallel, because that command on the folder deletes all of them. | failure-and-recovery, orchestration, ai-craft | medium |
| [S06-b](S06-b.md) | Y | 51 s | In a short status update around 13:30, he explains the plan: agents take the project charter (named in the context lines just before) and break it into pieces, turning each deliverable into a plan they execute autonomously, including researching how to do it and asking him, the operator, for feedback and judgment. | orchestration, human-bottleneck, build-in-public | medium |
| [S07-a](S07-a.md) | G | 44 s | He asks for something the charter doesn't mention: a new subdirectory and session that watches everything and talks mainly to him. | human-bottleneck, orchestration | medium |
| [S07-b](S07-b.md) | G | 57 s | He defines done for the site: he just builds and works, and the website gets additions because something reads the transcripts for interesting things to post. | build-in-public, orchestration | medium |
| [S07-d](S07-d.md) | G | 35 s | He asks for a skill that fixes all this again if it ever happens again, whether the power goes out or anything else: a background session recovery skill. | reusable-skills, failure-and-recovery, orchestration | medium |
| [S07-i](S07-i.md) | G | 32 s | He marks a decision intake as done and asks for a life cycle for them. | orchestration, reusable-skills | low |
| [S07-k](S07-k.md) | G | 46 s | He sets a rule for gates: whenever a spec is waiting for his approval, such as a research list or the definition of done, it should be forked at whatever stage it's in into an operator task of a "gate approval" kind. | orchestration, human-bottleneck | low |
| [S07-m](S07-m.md) | G | 63 s | He tells the website session (the context lines show he first asked the wrong session) to add a couple of things: what's being built will pick out important things from processed clips, and the site should update to include them. | build-in-public, orchestration | medium |
| [S07-n](S07-n.md) | G | 53 s | Something needs secret keys handled with care (what "they" are is unclear in the transcript), so he says he'll turn off the recording while the keys are moved over, just in case. | build-in-public, orchestration | medium |
| [S08-a](S08-a.md) | Y | 59 s | Back from lunch, he says he set the day up to be high pressure, high stakes and high adrenaline, and it delivered: he had to go sit down and chill, because far more is happening than he can track. | orchestration, human-bottleneck, personality | medium |
| [S08-b](S08-b.md) | G | 64 s | Speaking to the company, he says he's doing a lot of scraping and research on it: an org chart, a profile of all the key decision makers, any information he can find. | research-method, personalisation-at-scale | high |
| [S08-c](S08-c.md) | G | 66 s | He tours what runs without him. | orchestration, build-in-public, human-bottleneck | medium |
| [S08-d](S08-d.md) | Y | 33 s | He says he has a couple of key blockers now, mostly the research, which is blocked because it's not something he wanted to delegate: it involves a bunch of secret tokens and API keys. | build-in-public, human-bottleneck, orchestration | medium |
| [S09-b](S09-b.md) | Y | 81 s | He dictates a message for the GetSales session ("GitSales" in the transcript): it can research anything it wants from the company's public website, where all the ICP material is, and doesn't need to be blocked. | research-method, orchestration, icp-filtering | medium |
| [S09-f](S09-f.md) | Y | 80 s | Answering an agent about the company's visual assets and a disclaimer (what the agent proposed is unclear beyond its suggested wording), he says the assets are public, but if the agent prefers it can put all the branding being pulled into a subdirectory and git-ignore it; just don't block anything. | build-in-public, human-bottleneck, research-method | medium |
| [S09-i](S09-i.md) | G | 73 s | Having asked (in the context line just before) for the company's org chart and a scrape of every person's LinkedIn, he says what he wants: a Jev classification that decides whether each person is someone sending cold outreach, to see if the session can rebuild the company's sales team, though he wonders if that's over-engineering. | research-method, icp-filtering, ai-craft | medium |
| [S10-b](S10-b.md) | G | 69 s | Dictating the topic of the first of two blog articles (the context lines set that up), he says there's no such thing as building an AI workflow as a product: it's always a managed service, because the models always change. | ai-managed-service, gtm-thesis | high |
| [S10-c](S10-c.md) | G | 56 s | Dictating the topic of the second blog article (the context lines set that up), he says GTM engineers are the solution to the biggest social question of the AI era. | gtm-thesis, hiring-pitch | high |
| [S10-e](S10-e.md) | Y | 106 s | He lays out the design of a demo (the outbound demo, per the packet and library): 36 workflows in a folder apart from his own, from four main ICPs times three languages (English, Czech, German) times three tactics. | icp-filtering, personalisation-at-scale, build-in-public | medium |
| [S10-h](S10-h.md) | G | 93 s | With sessions piling questions on him (the context lines have two asking for research at once), he says "decision time" and tells his orchestrator everything is a little off the rails. | human-bottleneck, orchestration, failure-and-recovery | medium |
| [S10-i](S10-i.md) | G | 28 s | Carrying on from the halt (S10-h; he's speaking to the orchestrator), he asks it to look at all the operator tasks and specs, and names his biggest worry: sessions trying to do a task without an appropriate skill enabled. | ai-craft, voice-and-taste, reusable-skills | medium |
| [S10-k](S10-k.md) | G | 34 s | He asks a session (unclear which in the transcript) for help with the website sessions specifically: a bunch of its subagents are frozen, he thinks waiting on him for about three hours. | human-bottleneck, research-method, orchestration | medium |
| [day1-5](day1-5.md) | G | 51 s | He says the bottleneck is always, always, always human: not the amount of work the agents can focus on, but the person, and he's paying the price for jumping in too early. | human-bottleneck, orchestration, failure-and-recovery | high |
| [S10-l](S10-l.md) | Y | 38 s | He asks a session for a focus session (it can fork as needed) to go one by one through the deliverables: how each will be built and what has actually been done on it. | human-bottleneck, orchestration, failure-and-recovery | medium |
| [S11-a](S11-a.md) | G | 37 s | In an aside, he calls it funny that his sense of how big a context window is is always too small: almost a superstition from working in AI two years ago, when context windows really were small and you needed a feel for when context rot set in. | ai-craft, personality | medium |

## By theme

Main theme first; cards in brackets carry the theme as a secondary tag.

- **gtm-thesis**: S02-f, S10-c (S02-b, S02-c, S02-h, S10-b)
- **personalisation-at-scale**: S02-c, S02-d, S02-h (S01-d, S02-b, S02-j, S08-b, S10-e)
- **icp-filtering**: S10-e (S09-b, S09-i)
- **ai-managed-service**: S02-i, S10-b
- **orchestration**: S01-c, S03-e, S03-g, S03-n, S05-b, S05-g, S06-b, S07-i, S07-k, S08-a, S08-c (S01-f, S03-f, S03-m, S04-i, S05-j, S05-n, S07-a, S07-b, S07-d, S07-m, S07-n, S08-d, S09-b, S10-h, S10-k, day1-5, S10-l)
- **human-bottleneck**: S03-f, S03-m, S04-i, S07-a, S10-h, S10-k, day1-5, S10-l (S03-e, day1-2, S05-g, S06-b, S07-k, S08-a, S08-c, S08-d, S09-f)
- **reusable-skills**: S07-d (S02-d, S07-i, S10-i)
- **failure-and-recovery**: day1-2, day1-3, S05-n (S03-n, S04-k, S07-d, S10-h, day1-5, S10-l)
- **research-method**: S08-b, S09-b, S09-i (S02-j, S05-j, S09-f, S10-k)
- **ai-craft**: S01-f, S03-h, S03-i, S04-k, S05-j, S10-i, S11-a (S01-c, S03-g, S03-m, S03-n, S04-i, S05-n, S09-i)
- **hiring-pitch**: S02-b, S02-e, S02-j, S03-j (S01-e, S02-i, S02-k, S03-i, S10-c)
- **build-in-public**: S01-d, S01-e, S02-k, S07-b, S07-m, S07-n, S08-d, S09-f (S02-b, S02-d, S02-j, S03-h, S03-j, S04-k, day1-2, day1-3, S06-b, S08-c, S10-e)
- **voice-and-taste**:  (S10-i)
- **personality**:  (S02-d, S02-f, S02-k, S04-k, S05-b, day1-2, day1-3, S08-a, S11-a)

## Graded G or Y, no card yet

At the last pass over `grades.jsonl`, 10 G or Y moments had no card yet, and 13 moments were still ungraded. A fresh session picks these up with the same fields and the same theme vocabulary. The tooling used for these cards (BRIEF.md for the card-writing agents, vocab.md, prep.py for the per-moment packets, render.py for validation and these files) is in `C:/Users/alder/AppData/Local/Temp/clipart/cards/` on this machine.

- S11-b (G)
- S12-a (G)
- S12-d (G)
- S12-e (G)
- S12-f (G)
- S12-g (Y)
- S12-i (G)
- S12-j (G)
- S12-m (G)
- S12-n (Y)
