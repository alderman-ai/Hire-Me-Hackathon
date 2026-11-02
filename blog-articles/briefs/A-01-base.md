# Article 1 base

Base from Alex's note of 2 Nov and research L-03 R6; not dictated yet. Facts are options for Alex to say aloud; nothing goes in the post unless he says it.

## His scope, verbatim

OT-04 note, cut at "//", where article 2 starts.

> For all of your research research what's the best skill to write blogs with. The three topics will be (and you can start researching for the base of the articles): we'll do two articles. One is about how there's no such thing as building something like an AI workflow as a product. It's always a managed service because the models always change.
>
> Add to it that every company is going to have to decide what level of AI skill they want their company to have. Do they want to be able to just use workflows other people build? Do they want to be able to maintain them themselves or to build them themselves? You can imagine a sliding scale that's vertical: at the bottom is the training and at the top is the external building. They're going to have to find out where on the slider they are because they're either going to need to get trained how to do it themselves or they're going to have to bring in someone external or hire someone external. Still they're going to need to compensate someone else for whatever they build with the training to actually use it.
>
> That's the general scope of one so you can get working on that one and you can draft some LinkedIn imagery or whatever. While you do that you can do some mockups of what the LinkedIn content might use. Use whatever frontend code or any kind of design choices they've scraped from LinkedIn content. Take that and then we can create it the same way we did the Appify one, where there's a template in the background and then the generative AI text on top.

## Thesis (he picks)

- **His:** "There's no such thing as building an AI workflow as a product: it's always a managed service, because the models always change."
- **Sharpened,** paraphrasing R6's verdict (not its words): "The models always change, so someone always has to maintain an AI workflow, often the vendor inside the product."

## Who it's for

- B2B leaders choosing to buy, build or bring in AI help; Addvery's leaders first.
- They leave knowing their rung on the slider, and who they'll pay there.

## Title options

1. There's no such thing as an AI workflow product (47 characters; his provocation, W3 C6)
2. Every AI workflow needs someone to keep it running (50)
3. Use, maintain or build: where does your company sit? (52)

Option 1: `cover.kicker` "AI workflows"; `cover.subtitle` "The models always change, so someone has to keep every workflow running, and you choose who."; `cover.accent` "no such thing".

## Section skeleton

Fact numbers are R6 section 3's.

**Lede.** [Alex: a workflow you built that a model change broke, and what fixing it took] (W3 C8)

### 1. The models change on a schedule you don't set
Argues: "the models always change."
- #1 Anthropic gives at least 60 days' notice; Sonnet 4.5 retires 30 Nov 2026 (Anthropic deprecations, read 2 Nov 2026).
- #3 OpenAI's own Agent Builder: launched 6 Oct 2025, shuts 30 Nov 2026 (OpenAI deprecations; TechCrunch, 6 Oct 2025).
- #5 Bugs degraded 16% of a Claude model's requests at peak, unseen by Anthropic's tests (Anthropic postmortem, 17 Sep 2025).
- [Alex: how long your last model migration took]

### 2. AI products exist, and someone still maintains them
Argues: "no such thing as a product", conceded, then answered (W3 C2, C6).
- #7 76% of enterprise AI solutions were bought, not built, in 2025 (Menlo Ventures, 9 Dec 2025; investor data).
- [Alex: the best argument against this, and your answer]

### 3. Each company chooses its own level of AI skill
Argues: "find out where on the slider they are", as self-placement (W3 C3). Diagram here.
- #6 Bought or partnered AI reached deployment about 67% of the time, internal builds a third as often (MIT NANDA via Fortune, 18 Aug 2025; disputed, and from the same study whose 95% headline R6 says to avoid, so use with care or not at all).
- [Alex: a company on the wrong rung, no names]

### 4. Sometimes training your own people is enough
Argues: the bottom rung, against his interest (standard prompt 3).
- With over 5 hours of training, 79% of staff used AI regularly, against 67% with less (BCG, 26 Jun 2025; consultancy data).
- [Alex: a time you said no outside help was needed]

### 5. Whatever rung you pick, someone gets paid to run it
Argues: "compensate someone else", read two ways (open choices).
- "Applications relying on Anthropic models may need occasional updates to keep working." (Anthropic deprecations, read 2 Nov 2026)
- [Alex: closing ask], apart from the argument (W3 C5).

## The slider as a diagram

Rungs are his; notes are proposals he confirms aloud.

```markdown
> [!diagram] scale
> Where does your company sit, and who keeps its workflows running?
> 1. External building: for custom work without AI staff; costs an ongoing fee
> 2. Build in-house: for workflows that set you apart; costs scarce AI hires
> 3. Maintain in-house: for bought workflows; costs staff time each model change
> 4. Train to use: for ready-made tools; costs training plus subscriptions
```

**Mismatch (R6 2a).** McKinsey and MIT CISR put in-house building on top, he puts external. Rename the axis "who builds it", or keep "level of skill" with outside help a choice at each rung.

## Counterarguments to answer

1. **Products exist.** Vendors sell AI per seat or outcome and do the migrations; most enterprises buy. *Answer:* why isn't that a product?
2. **All software needs upkeep** (40 to 80% of lifecycle cost), and pinned versions hold 12 to 22 months. *Answer:* what makes AI different, and for which workflows?
3. **You sell this.** The conclusion pays someone like you. *Answer:* do you say so, and when does your advice not favour you?

## Facts to avoid or update

- **EU AI Act, Article 4.** Since 27 Jul 2026 it only asks firms to "take measures to support" AI literacy; "ensure ... a sufficient level" is outdated.
- **Disputed.** MIT NANDA's 95%, RAND's 80%, #4 (GPT-4's 84% to 51%).
- **Interested sources.** Menlo, BCG and any vendor survey: label them.
- **Unverified.** Intercom Fin's pricing; "12 to 22 months" is R6's arithmetic.
- **Dates.** After 30 Nov 2026, #1 and #3 go past tense.

## Extra talking prompts

Stage 0 topic: "It's always a managed service because the models always change." Angle: plus the slider, as self-placement.

```
6. What does keeping one workflow alive take you each month?
   (No figure exists anywhere. Rough hours?)
7. "Compensate someone else": the vendor, the platform or the trainer?
   (Which did you mean?)
8. Which rung would you want to work on inside a company?
   (Inside hire, outside builder, or both?)
```

## Open choices for Alex

- **Thesis and axis:** see above.
- **"Compensate someone else":** vendor fees, or paying the builder to train users.
- **EU rule:** in or out.
- **Audience:** all companies, or only those with custom workflows (R6 section 4, #10).
- **C1:** W3's extra prompts already sit in standard prompt 3; keep or split.
- **C4:** end on inside hire, neutral, or external (reads as a vendor pitch).
- **C5:** ask at the end, none, or stake named in the lede.
