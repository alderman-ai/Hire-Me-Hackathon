---
System Primitive: Intake file
Intake State: Archived
Intake id: DI-3
Created: 2026-11-02
Archived: 2026-11-02
Build goals: []
---

# Decision intake 3

This intake holds 4 decisions for S1 Research, the spec that sets how research is chosen, sized, run and stored. Each question carries its own context, so you can answer them in any order. Three of them lean on others: Q3.1's topic list depends on Q3.3 (who owns items 2 and 10) and on Q3.2 (what the tiers may spend), and Q3.4 decides what happens if Q3.1 is left empty. Q3.3 also overlaps Q2.2 in DI-2. An empty fence means not answered, and S1 then uses the default named in that question. Say "DI-3 is ready" when you're done.

# Q3.1 What gets researched, and how deep

The charter says the research reading list is "empty until that pass fills it", and "do not attempt to do this without the operator in the loop". S1 runs nothing you haven't approved.

Depth has three tiers:

- **Light:** one helper agent, a few sources, about a page.
- **Standard:** more sources, cross-checked, gaps named.
- **Deep:** a multi-agent research run. It's by far the costliest, and the budget rules out Deep for everything.

The list below is shaped only from the deliverable descriptions, with a suggested tier for each. Nothing on it is decided.

1. Apify API: what the public API and ready-made scrapers can do for the demo, and their limits. Feeds S-D1, and S-D2 if it uses S-D1's scrapers. Public material only; the Apify proposal stays out. Suggested: Standard.
2. Addvery brand capture: visual identity and voice. Feeds S-D6, S-D7 and the site's Addvery branding. Who owns it is Q3.3. Suggested: Deep.
3. Addvery's market and buyers, as raw material for the 10 ICPs. Feeds S-D3, with angles for S-D5 and S-D7. Suggested: Standard.
4. What Addvery needs from a GTM engineer (open roles, stated priorities), for the site's job-application framing. Feeds S-D8. Suggested: Light.
5. GetSales: flows, CSV import, custom variables, routing leads to different automations. Feeds S-D3. Suggested: Light.
6. Sales Navigator export to CSV, and enrichment options before import. Feeds S-D3. Suggested: Light.
7. Dictation-to-blog tooling, including what the Claude design app can do. Feeds S-D4. Suggested: Light.
8. Blog topics Addvery's audience would read. Feeds S-D5. Suggested: Light.
9. Canva: brand kits, templates, LinkedIn asset sizes. Feeds S-D6 and S-D10. Suggested: Light.
10. Addvery's LinkedIn presence and voice. Feeds S-D7. Suggested: Light, or fold into item 2.
11. Your own GitHub repos as references: the earlier pixel-perfect branded-assets demo and the subjective brand capture repo. Read, not researched. Feeds S-D6 and S-D7. Suggested: Light.

Not listed: Addvery the company and its top six stakeholders, which are S-D2's own deliverable unless Q3.3 says otherwise.

Findings will sit in one findings folder inside the S1 research folder, with one index that every spec's reading list points at. Say so if you want them elsewhere. Your own notes on researching Addvery with Apify already sit in the "Addvery Research" folder you created at the project root, and who owns that folder is Q2.2 in DI-2.

Your options:

- **A. Approve the list as it stands,** with the suggested tiers.
- **B. Edit it:** strike numbers, add topics, change tiers, and give your research details (sources to use or avoid, what you already know, the questions a topic must answer).
- **C. Something else.** Say what.

I recommend B, because the list comes only from the deliverable descriptions, and the charter has your research details decide what gets researched.

If the fence is empty, nothing is researched. I build the empty findings folder, index and task files, log the wait, and leave this question open in DI-3 to raise at your next block at the computer.

This answer shapes every research task S1 runs. Q3.2 sets what the tiers here may spend, Q3.3 decides whether items 2 and 10 are S1's, and Q3.4 decides whether anything starts while you're away.

Write A, B or C. With B, add your edits underneath as numbered lines.

## A3.1

`<operator_answer>`
```a-3-1
Okay look up on my GitHub repo, the "Knowledge Work Executable Specs" repo (something like that), and look up the research section there: how it works and how we find the definition of done for each thing.

The research is to figure out, when we figure out the methodology of what to do, what should be researched first before we decide on a methodology: to make sure that if there's an easy answer, an obvious answer, or a converged-upon answer, we're using it. If not, we at least know traps and gotchas that we don't fall into, so that when we design the methodology to go from problem to DOD, we have research to guide that process.

We're not just using raw training data, which also means that the research, when done, should be stored at either the parent or child level (depending on if it's global or local research) and added to the reading list of any specs that need it.

Also from that repo I told you to look up, look up how wildcards work and have three wildcard researches on every research list 
```
`</operator_answer>`

# Q3.2 Research budget

The charter says S1 works "within a usage budget that rules out deep research on every topic". No number has been set.

Research shares your usage with every other session running today, including the website build. There are three depth tiers: Light (one helper agent, a few sources), Standard (more sources, cross-checked) and Deep (a multi-agent research run, by far the costliest). Each task records what it spent. S1 stops starting new runs at the cap and asks before going over. I can only estimate research's share of your usage; I can't read your usage meter.

Your options:

- **A. Cap by count:** at most 2 Deep runs. Light and Standard are limited only by the topic list you approve in Q3.1. I can enforce this myself.
- **B. Cap by share:** you name a share of your usage limit for research, for example a percentage. I estimate against it and ask you to check the meter at the halfway point.
- **C. No cap:** I run the approved list and you watch usage yourself.
- **D. Something else.** Say what.

I recommend A, because a count is the one cap I can enforce without needing your eyes on a meter (P4).

If the fence is empty, no Deep run starts. Topics you approved at Light or Standard run; Deep ones wait until you set a cap.

This answer sets the cost lines in S1's method, and how many topics in Q3.1 can run Deep.

Write A, B, C or D. With A, you can change the number of Deep runs; with B, add the share.

## A3.2

`<operator_answer>`
```a-3-2
Again go to my GitHub Knowledge Work executable specs and look how research is done there and scope it to about that size. There should be a list of questions. I don't know off the top of my head how this works. We should look it up: what tool calls are available to us, stuff like that. You'll get a sense of the scope from that document in the repo
```
`</operator_answer>`

# Q3.3 Who researches Addvery

The charter leaves this open: "Who owns Addvery brand capture: S1 as shared research, or S-D2?"

The facts it turns on:

- S-D2 is "Company and stakeholder research: Researches Addvery and finds its top six stakeholders."
- S-D6 (Canva templates) and S-D7 (LinkedIn content) both depend on "Addvery brand capture", which no spec row owns, and both need your brand sign-off.
- The whole site is "in Addvery's branding".
- S1's rule is: "Shared topics such as brand capture are researched once, never per spec."
- D7 references your subjective brand capture repo on GitHub, so brand capture would use its method.
- S1 starts before S-D2.
- This overlaps Q2.2 in DI-2, which asks who owns the "Addvery Research" folder you created at the project root. That folder holds your own notes on researching Addvery with Apify. Whoever owns the folder is the natural owner of Addvery company research, so the two answers should agree.

Your options:

- **A. S1 owns brand capture only,** done once. S-D2 keeps company and stakeholder research as written. Brand sign-off happens once, on S1's findings, for both S-D6 and S-D7.
- **B. S1 owns everything shared:** brand capture plus the company overview and market. S-D2 narrows to finding and profiling the six stakeholders.
- **C. S-D2 owns all Addvery research,** brand capture included. S1 sticks to method and the non-Addvery topics (Apify, GetSales, Canva, blog tooling).
- **D. A separate brand-capture spec,** added through S2's skills.
- **E. Something else.** Say what.

I recommend A, because it answers the open question with the smallest change to the spec outline, and it unblocks S-D6 and S-D7 without waiting for S-D2.

If the fence is empty, I take A: brand capture goes to S1. Company research follows your answer to Q2.2 in DI-2. If Q2.2 gives the Addvery Research folder to S1, company research moves to S1 too; otherwise it stays with S-D2. I log the decision and ask S2 to close the open question in the charter.

This answer settles items 2 and 10 on the Q3.1 topic list, what S-D2, S-D6 and S-D7 read, and where brand sign-off happens.

Write A, B, C, D or E.

## A3.3

`<operator_answer>`
```a-3-3
I'm on this. I'm going to be doing it in the subdirectory Addvery Research. You do not need to build a spec to handle that. I'm going to handle that one-on-one 
```
`</operator_answer>`

# Q3.4 Charter conflict: research while you're away

Two charter rules pull apart here.

- P5: "Never allow this to halt a build! If you don't get a response for 15 mins, assume the operator is afk, and then the assistant orchestrating that session gets to make the decision."
- The research reading list: "do not attempt to do this without the operator in the loop -- he will override and micromanage the research part once the meta specs/tooling is set up."

S-D1, S-D2 and S-D4 depend on S1, so a full stop holds them up. Building the empty findings folder, index and task files needs nothing from you either way. Every default would be logged with its justification and blast radius, and you can override it at any time.

The question: when you leave a research question unanswered, may S1 start research on a default, or must it wait for you?

Your options:

- **A. Wait:** nothing you haven't approved is researched, and the specs that depend on S1 wait for your next block.
- **B. Narrow default:** only the topics S-D1 and S-D2 are waiting on start, at Light, logged. Everything else waits for you. A Light run is cheap to redo when you override it.
- **C. Full default:** I run my suggested topic list at the suggested tiers, logged.
- **D. Something else.** Say what.

I recommend B, because it keeps your rule for everything except the two topics wave 2 is blocked on, at the lowest cost.

If the fence is empty, I take A. The research rule is the more specific one and asks for you by name, so I won't spend usage on research you haven't approved until you say I may.

This answer decides what happens if Q3.1 or any later research question goes unanswered, and it feeds the S1 decision log.

Write A, B, C or D.

## A3.4

`<operator_answer>`
```a-3-4
When we go back to the charter and we talk about the expensive actor, shooting a scene, stuff like that, all this research part is the part that should involve me.

I've been at the computer for a long time now. You can assume, wall clock, that right now it's 13:12. You can assume until at least 18:00 that I'm at the computer.

If I'm idle for more than 20 minutes, send it to the question desk and poke me. Actually not 20 minutes: if you're waiting on me for 15 minutes, tell the question desk to alert me that this session name is waiting on me for this, whether that's an operator task that you're waiting on or what.

There'll be a poke system now where it says, "Hey I need you. Tell me you need me." If it's before 18:00 wall clock, then I'll be here and can handle it. Research is part of the preflight check because we don't want to mess that up 
```
`</operator_answer>`
