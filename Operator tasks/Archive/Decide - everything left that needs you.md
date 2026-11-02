---
System Primitive: Intake file
Intake State: Archived
Intake id: DI-10
Created: 2026-11-02
Archived: 2026-11-02
Build goals: []
Asker: S2 (orchestration)
Replaces: OT-12 (scraping page sign-off), folded in as Q10.6
Answered by: Alex, in the fences, about 17:23
---

<!-- File name: "Decide - everything left that needs you.md" -->

# Decide: everything left that needs you

## What this is

**This is the only file waiting on you.** Every session is paused while we reset. Everything else that was waiting on you is either closed on its default or decided by me below, and you can change any of it later. Once you've answered this, every session restarts and builds. It takes about 15 minutes. There's no deadline: we're working through the night. If a fence stays empty, I take the default shown, and you can change it later.

There are 11 questions. Each one carries its own context, and an empty fence means not answered. Write "DI-10 is ready" in chat when you're done.

**Already decided for you (write in Q10.11 only if you want one changed):**
- **Brand:** every visual uses the brand kit the website pulled from addvery.com. The violet-to-orchid gradient leads, and the calmer solid purple is for long pages. The body font is Outfit, exactly Addvery's. Their licensed display font is replaced by a free near-identical stand-in (Inter Tight).
- **Your research folder** stays out of the public repo, transcripts included.
- **Blog visuals** are coded, with no paid Comfy run. The humanizer plugin waits for later.
- **Research is done.** The extra research for the GetSales demo and the website is dropped.
- **Plan approvals are closed** on their defaults: the website plan, the plan for the site's updates and the old scraping plan.
- **Sensitivity:** anything from public sources can be used and published. The only things kept off are secrets, the Apify proposal and your own outbound. Sessions stop asking you about anything else.
- **Written work** (articles, posts, page text) is drafted in Claude Docs, where you edit and approve it with a comment.
- **Design work** always runs with a design skill switched on, and copy always runs with a copywriting skill.

**After this, coming to you as links, with no files to fill in:**
- the five Canva templates, as images to sign off
- the five LinkedIn posts, in a Doc to sign off
- the six stakeholder pages' text, in a Doc to edit
- each blog post's draft, in a Doc, for your last 10%

**Also on your list (no answer needed here):** check Settings → Windows Update. I couldn't confirm it's paused: Windows shows no pause set.

# Q10.1 Confirm the six key people

Your research ranks the people at Addvery who decide on hiring you. The site gives each of these six their own page, and the alert goes to them:

1. Ivana Karhanová, Chief Growth Officer: champion and hiring manager, ranked first
2. Štěpán Hykš, CEO: economic buyer
3. Pavel Novák, co-founder, Group President, Skygena CEO: veto voice
4. Lukáš Marek, co-founder and advisor, iMEDIATIC CEO: veto voice on headcount
5. Miloš Čerovský, Chief Delivery Officer: technical evaluator
6. David Šrenk, Head of Business Intelligence (Brno): technical evaluator, data

Two more have profiles but no page: Jakub Strýček (iMEDIATIC CMO) and Anna Matejovska (Director APAC and Africa).

Write "confirmed", or who goes in and who goes out. If empty: confirmed as listed.

## A10.1

`<operator_answer>`
```a-10-1
approved
```
`</operator_answer>`

# Q10.2 Your Czech level

Every Addvery job ad your research found asks for native Czech or Slovak. The pitch and the pages should claim exactly what's true. What can you honestly do: read and approve Czech copy, follow a Czech meeting, present in Czech?

Write it in your own words. If empty: the pages make no claim about Czech.

## A10.2

`<operator_answer>`
```a-10-2
B1-B2
```
`</operator_answer>`

# Q10.3 Work authorisation and invoicing

Addvery's AI role asked for someone who can be employed without sponsorship. Do you hold Czech permanent residence, or another status that lets you be employed here without sponsorship? Can you invoice as a freelancer, with a trade licence or a company?

Write both answers. If empty: the pages don't mention it.

## A10.3

`<operator_answer>`
```a-10-3
I've lived in the Czech Republic for 10 years and have a živnostenský list and long-term residency. I'm married to a Czech national 
```
`</operator_answer>`

# Q10.4 Employed or freelance

Which do you prefer, what's your minimum, and would you accept a paid pilot first? This shapes the one small ask on each stakeholder page.

Write it in your own words, and say whether the minimum may appear on the site (my advice: it shouldn't). If empty: the pages say you're open to either and offer a short paid pilot as the first step.

## A10.4

`<operator_answer>`
```a-10-4
Open to either/or or a combination 
```
`</operator_answer>`

# Q10.5 Which company you're pitching

Addvery sits in a group, and your research found three possible homes for you:
- (a) **Addvery itself:** building Ivana Karhanová's growth system.
- (b) **iMEDIATIC:** Lukáš Marek's performance and measurement agency, hiring now.
- (c) **Skygena:** Pavel Novák's AI studio. One source says it's hiring AI roles, but none were listed.

The whole site is built as an application to Addvery, so (a) is my recommendation, with the others mentioned only on the co-founders' own pages.

Write a, b, c, or a mix. If empty: (a).

## A10.5

`<operator_answer>`
```a-10-5
I specifically have a meeting with Ivana tomorrow and this is prep for that meeting 
```
`</operator_answer>`

# Q10.6 Publish the scraping page as it stands

This replaces the separate "Approve - what the scraping demo section shows" file, which I'll close.

The page shows your Apify scraping and research on Addvery, written up by its session with your 16:41 changes, and it has had a copywriting pass. It:
- leads with the result: what was read, what it cost, and three company-level findings about Addvery
- explains the method in three steps
- has a folded "Show me how" part, with the scrapers, results, time, cost against your $10 cap, and what broke
- names no one and shows no LinkedIn data, only that LinkedIn was read and why, with the three LinkedIn scrapers in one combined row
- links to your research page and ends with two lines in your voice

The draft is in the scraping folder, under draft, as d1.md.

Write (a) to publish as it stands, (b) followed by your changes, or "LinkedIn: itemise" or "LinkedIn: hide" to change the LinkedIn row. If empty: (a).

## A10.6

`<operator_answer>`
```a-10-6
Yep show it off. It's like they should be doing this to their targets too. Like this they should see how it looks 
```
`</operator_answer>`

# Q10.7 What the GetSales video shows

Your model, from your answers this afternoon: 36 demo workflows in GetSales (4 customer profiles × English, Czech and German × 3 approaches), in a folder apart from your own. None of them is ever started and none has leads. You walk through them on camera, and you send the alert to the six by hand.

The original plan also showed the pipeline for the six people: a Sales Navigator search, the CSV export, enrichment from your research, and a computed first message for each person.

- (a) **The walkthrough of the 36 workflows only.**
- (b) **The walkthrough plus the pipeline for the six,** shown up to each person's computed first message, with no import into GetSales and nothing sent. This is my recommendation: the computed message is the most GTM-engineering part of the demo, and it reuses your research.
- (c) Something else. Say what.

If empty: (b).

## A10.7

`<operator_answer>`
```a-10-7
We'll break this into two demos. One will be a 3-minute video going through the 36 things, like an intro about JEV classification tools in general and showing the one variable. There's that part: classifying people into ICPs. We'll screen capture something short through OBS and that's basically the demo.

Each of these will be almost like a blog. We'll have a video on top and a summary of the transcript at the bottom so they can either watch it or read it and have it in a blog stylization 
```
`</operator_answer>`

# Q10.8 The personal-brand proposal for Ivana

Alongside Addvery's company posts, the LinkedIn session is writing a personal-brand proposal for Ivana Karhanová, which you asked for at lower priority. It's kept private and is never shown on the site.

- (a) **Keep it,** private and lowest priority, done after everything else.
- (b) **Drop it.**

If empty: (a).

## A10.8

`<operator_answer>`
```a-10-8
This is the last priority. We can revisit this if everything's finished 
```
`</operator_answer>`

# Q10.9 How the Canva video is filmed

You design in Canva on camera, once the five templates are in Canva tonight.

- (a) **A screen recording of you customising one of the five templates live,** up to 15 minutes, with Canva's private panels kept off camera. This is my recommendation: it shows the design itself, and the templates exist for exactly this.
- (b) **Building a design from scratch** on camera.
- (c) **Webcam only.** It shows none of the design.

If empty: (a).

## A10.9

`<operator_answer>`
```a-10-9
First this is going to be based on the pixel-perfect branding assets thing. Make sure that's either cloned and explored or just explored through my GitHub.

You're going to make a bunch of mockups of something that could be used as a template right out the gate. If you can't then I want to do something very similar to the Appify thing. Find some coded thing if possible or if not then let's build it ourselves. Give me all the assets I need to build it myself 
```
`</operator_answer>`

# Q10.10 When the six stakeholder pages go live

The six pages are drafted. Each one carries a line saying why it exists, where its facts came from, and "ask and it's removed". They aren't linked from anywhere and aren't listed in search, so nobody sees one until you send its link.

- (a) **Live now, unlinked, with the drafted text.** You edit the text in a Doc afterwards, and the page updates. This is my recommendation: nobody can see them until you send a link anyway.
- (b) **Live only after you've edited the text in the Doc.**

If empty: (a).

## A10.10

`<operator_answer>`
```a-10-10
If we're doing web structure I want:

1. The live feed to be the homepage
2. Background research
3. GTM demos. That's going to be the videos recorded with GetSales and the eventual pixel-perfect branded assets. We'll introduce the grading rubric thing and those will all live. This will be the content section.

The demo section will basically look like a CMS, like a list of blog entries. Some of them will have a video and some of them will just be purely written. That'll be the GTM stuff, the demos there. A lot of the demos are like the website itself: the building of the website, selecting important content, and all that stuff. A lot of the demos are baked into the website already. The things that are specifically content that's video plus text or just text plus images will go in one section/ Then I think the six decision-maker profiles should be on the research subpage. Here's what we're going to do: we're going to combine the pixel-perfect branded assets and the stakeholder profiles. The branded Canva template thing will be a stakeholder profile, whatever, and we'll have a background for it. Eventually they'll be displayed as a carousel within the research section, the scraping research section 
```
`</operator_answer>`

# Q10.11 Anything else

Your recording slots tonight: the two blog dictations (ready now), the GetSales walkthrough (once the 36 workflows are built), and the Canva video (once the templates are in Canva). The desk tells you when each one is ready. Add any times you can't record, anything from "Already decided for you" that you want changed, or anything that looks off track.

The rest of the pitch questions from your research are optional and can wait. If you want to answer them now, they are:
- what you've built that runs and is used by others
- what attributed pipeline numbers you can cite
- your Python and SQL level
- whether you'd travel to Asia or Romania
- any warm intros through Zonky, Home Credit, Adastra or the CzechCrunch podcast

If empty: nothing to add.

## A10.11

`<operator_answer>`
```a-10-11
I want to do some demo of Comfy but that can be pretty manual. I've got a lot of that set up in a repo elsewhere. I just need some brainstorming of what ideas I can do.

I would like to basically do some mild animations. Take some LinkedIn graphics and apply... Maybe we'll take one of them and we'll show a little 5-second animation. Instead of just having a static image on LinkedIn, we can have a light shimmer. We can have the brand getting some kind of 3D texture to it. It kind of builds itself. I don't know. It's just to show that it's possible to add some energy to the brand through video generation. -- And then I want to create a one-minute video similar to the Gauss rocket thing. You can check that out. It's on the desktop and we have a lot of the skills already built to make that 

```
`</operator_answer>`
