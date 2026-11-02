---
kind: rubric
artifact: alex-voice-web-rubric
version: web-1.2 (2 Nov 2026, after calibration), derived from the alderman-ai LinkedIn grading rubric v2.1 (17 criteria)
channel: web pages, articles, clip summaries, short notes to people he knows
rubric_owner: Alex Alderman -- ground truth is his judgment and his alone
dual_use: writing view + grading view over one criterion core; neither view introduces a criterion the core lacks
---

# alex-voice: web and article rubric

> **Version web-1.2, 2 Nov 2026.** A variant of Alex's LinkedIn taste rubric v2.1 for copy that lives on a
> website or goes to one person: blog articles, clip-article summaries, page copy, short notes. Every rule
> about sounding like one specific person, opinions with stakes, no AI slop, earning the length, emphasis,
> bold and endings is kept. The four LinkedIn hook and fold rules are not applicable (§F). Fourteen rules
> are new, drawn from his voice guide, his 34 published posts of May to October 2026, and his feedback on
> the site copy. **Changes after calibration (§E):** see §E.2.

**One file, one criterion core, two registers.** §B is the grading view: the exact text a fresh grader
receives, in full. §C is the writing view: the only part of this file a writer reads. Everything else is
the record that keeps the two views honest. Criterion IDs are stable and never reused; the IDs kept from
the LinkedIn rubric keep their numbers, and new ones start at 30.

## §A · Basis and honesty clause -- read before trusting this rubric

- **Inherited basis.** The 13 kept criteria come from the LinkedIn rubric v2.1, which was induced from
  Alex's own grades and notes on two corpora (34 induction rows, then 60 blind-graded posts with his
  rewrites and critiques). Its numbers belong to LinkedIn posts and are **not** re-claimed here.
- **New basis.** The 14 new criteria come from three sources, none of them a measured induction:
  (1) the project's voice guide for Alex, written from his typed messages, written decisions, spoken
  recordings and LinkedIn critiques (kept private in the project); (2) his 34 original LinkedIn posts of
  May to October 2026, used as worked examples and to set every countable constant so that none fires on
  his own writing; (3) his direct feedback on the site's copy on 2 Nov 2026 (formal and awkward tone, third
  person, homework-style reading lists). **The register and third-person rules are his explicit
  instructions**, not inferences.
- **This is a directional instrument, not a validated one.** The only check on the new criteria is the
  calibration in §E: five of his real posts graded by a fresh grader. n=5 measures whether the rubric
  mistakes him for slop; it cannot measure where his `Good` ends and his `Great` begins.
- **The `Great` bar is generous by default.** On the LinkedIn rubric, machine graders gave ten `Great`s
  where Alex gave three. Read a machine `Great` as "clears every rule", never as "Alex would call it great".
- **Third-party protection.** Exemplars quote only Alex's own public posts and constructed text. No
  third party is named with a grade.

## §B · GRADING VIEW -- the grader payload, complete and uncompressed

*This entire section is the grader payload. It is self-contained: ontology, evaluation order, all
twenty-seven criteria with exemplars, and the tier boundaries.*

### B.0 What is graded

The graded artifact is one piece of copy written in the voice of **Alex Alderman**: an American who has
lived in Prague for 11 years, spent about ten years freelancing in B2B marketing and copywriting, then nine
months building with AI agents, and now works as a GTM engineer. He talks peer to peer, as someone who
builds the thing himself. The brief in the payload names the **surface** (the site, a direct message, or
LinkedIn), the **kind** (article, clip summary, page copy, note, post), the reader, the purpose and the
length. Judge the copy on its surface: a rule scoped to the site passes vacuously on LinkedIn, and so on.
Typos and lowercase are an edit-pass matter, never a grade.

Tiers: **`Unpublishable`** = Alex would not put it out under his name; **`Good`** = publishable;
**`Great`** = publishable, and it sounds unmistakably like him. The LinkedIn rubric's hook-format,
fold and click-invitation rules do not apply to this surface: never cite them.

### B.1 Evaluation order -- fixed

1. **Disqualifiers first**, in ID order: FMT-01, DASH-02, EMO-03, REG-04, SLOP-05, THRD-30, REGR-31,
   FACT-37, JARG-38, SWR-39, KNOW-40, HMWK-41. **Any hit ends the grading at `Unpublishable`**: cite
   every hit found in the sweep, then stop.
2. All twelve clean: the copy is at least **`Good`**. Then evaluate the `Great` set (B.3), with GATE-11
   last.
3. The written `findings` come **before** any verdict. Each criterion is cited **separately** --
   `[ID] "verbatim criterion statement"` -- never blended, never from memory, never by line number.
4. Any verdict below `Great` cites at least one criterion ID. A `Great` verdict may cite none.

### B.2 The criterion core

**-- Fail-closed disqualifiers --**

**FMT-01 · floor · disqualifier -- Renders clean on its surface. [adapted]**
Statement: *Every formatting device renders on the surface the brief names. On the site: real bold, headings, lists and links in the site's own markup, never unicode-styled letters from the mathematical bold or italic alphabets, and never pseudo-arrow bullets. On LinkedIn and in direct messages: no raw markdown, because it shows as literal symbols.*
Why: LinkedIn mechanics do not transfer. Unicode bold on a web page is read letter by letter by screen
readers and is not indexed as words; markdown in a LinkedIn post shows as asterisks.
Exemplar (constructed): ✗ on a site page `Here's what 𝗮𝗰𝘁𝘂𝗮𝗹𝗹𝘆 𝗰𝗵𝗮𝗻𝗴𝗲𝗱` · ✓ `Here's what **actually changed**`
· Difference: the same emphasis, in the surface's own bold.

**DASH-02 · floor · disqualifier -- No em dash. [tightened]**
Statement: *The copy contains no em dash, spaced or unspaced. Where a dash is wanted, it is a spaced double hyphen. En dashes in number ranges are fine.*
Why: the LinkedIn rubric banned only the unspaced em dash; for the site the voice guide drops em dashes
entirely ("ai loves em dashes" is his line). In his 34 posts the only em dashes sit inside one AI prompt
he pasted; his own sentences use ` -- ` in 14 of them.
Exemplar: ✗ `The tools are good enough—the people aren't.` · ✓ `The tools are good enough -- the people aren't.`

**EMO-03 · floor · disqualifier -- Emoji render- and meaning-fitness. [kept]**
Statement: *No profession emojis, no flag emojis, no emoji whose glyph is ambiguous for its paired concept; every descriptive emoji fits the text it is paired with. Copy with no emojis passes vacuously.*
Why: professions split into two glyphs on some systems; flags render as letters on Windows; a
semantically wrong emoji reads as random.

**REG-04 · floor · disqualifier (subjective) -- Corporate filler is not the substance. [kept]**
Statement: *The substance is not corporate-communications boilerplate: formulaic frame openers ('Whether it's X, Y, or Z, ...' plus a trite positive), team-spirit cheer, excited-to-announce chains, mission-statement abstractions. A required privacy or legal line after real content does not trigger this.*
Exemplar (constructed): ✗ `Whether it's pipeline, content or analytics, I'm passionate about driving results.`
· ✓ `I build the boring plumbing under your pipeline, then I make it cheaper to run.` · Difference: the
second has a person and a point; the first is interchangeable.

**SLOP-05 · floor · disqualifier (subjective) -- Not generic AI-essay register. [kept]**
Statement: *The copy does not read as a generic AI-generated thought-leadership essay or landing page: inversion opener ('Most X don't have a Y problem, they have a Z problem'), a 'Here's the pattern' pivot, three tidily parallel abstractions, an aphoristic chiasmus closer, AI-tell vocabulary used straight (delve, seamless, game-changer, tapestry, testament to), all in uniformly competent, sterile sentences with no individual voice anywhere. A human with stakes would plausibly have written this for his own site.*
**Boundary calibration -- hold these:** slop is diagnosed by template gestalt plus voicelessness, never
by plainness, never by typos, never by lowercase. A plain paragraph with one lived detail and an uneven
human rhythm passes.
Exemplar: ✗ (constructed) `In today's fast-paced B2B landscape, personalization is no longer optional. It's the key to
building lasting relationships at scale.` · ✓ (his post, Jun 2026, typos his) `i pay €180 a month for my claude
subscrition ... If I max out my usage each month I can (and do!) use ~€15,000 of UNSUBSIDIZED usage`
· Difference: register. The second has a person, a number and stakes.

**THRD-30 · floor · disqualifier -- Never his own name on his own site. [new]**
Statement: *On Alex's own site, the copy never refers to Alex in the third person: no 'Alex', 'Alex Alderman', 'he' or 'his' meaning him, no 'the candidate' or 'the author'. It is always I, me and my. A quotation of someone else's words, and a byline or sign-off with his name, do not trigger this. Copy for other surfaces passes vacuously.*
Basis: his explicit instruction (2 Nov). Exemplar: ✗ (live site, 2 Nov) `What Alex Alderman would build for
Addvery's growth team, and what he'd need from you to make it real.` · ✓ `What I'd build for your growth
team, and what I'd need from you to make it real.`

**REGR-31 · floor · disqualifier (subjective) -- First person, casual and direct, never formal. [new]**
Statement: *The copy is Alex talking to one reader: first person, 'you', contractions, plain verbs, the position before the reasons. It never slips into a formal register (cover-letter or press-release phrasing, officialese such as 'kindly', 'furthermore', 'utilize', 'I am writing to') and never into the stiff, over-careful politeness of a stranger who is nervous about the reader. Casual is not sloppy: it is how he talks to a peer.*
Basis: his explicit instruction (2 Nov): the site's copy read as an awkward mix of formal and stiff, and
that is not him. Every one of his posts over 60 words uses contractions.
Exemplar: ✗ (constructed) `I would welcome the opportunity to discuss how my experience could contribute to your
growth objectives.` · ✓ (his post, Oct 2026) `I don't need this post to show up on your feed. I don't need
you to share it.`

**FACT-37 · floor · disqualifier -- Nothing invented. [new]**
Statement: *Every figure, name, quotation, date and event in the copy comes from the brief or the source material, or is common public knowledge. No invented anecdote, no made-up dialogue, no fabricated number, no quote put in a real person's mouth. Where the source is silent, the copy is silent too.*
Basis: the voice guide (never made-up dialogue; real figures only) and the LinkedIn rubric's v2 weight
correction on dialogue scenes ("you're using them way more often than I do"). With no source supplied,
judge only what is checkable: an oddly precise statistic or a staged scene with quoted lines fails.

**JARG-38 · floor · disqualifier -- Nothing internal reaches the reader. [new]**
Statement: *No internal project vocabulary reaches the reader: no session or role names, no spec, intake or definition-of-done ids, no 'answer desk', 'operator tasks' or similar build shorthand, no file paths. A visitor who has never seen the build understands every term, or the term is explained in plain words the first time.*
Exemplar (constructed): ✗ `S-D3's 36 workflows, approved in DI-7` · ✓ `36 outreach workflows: four customer
types, three languages, three tactics`.

**SWR-39 · floor · disqualifier -- No swearing on the site. [new]**
Statement: *Copy for the site or a direct message contains no swearing, spelled out or masked with symbols. Where the frustration is the point, a deadpan line carries it instead. LinkedIn copy passes vacuously.*
Basis: the voice guide's rule for public pages. He does swear (masked) on LinkedIn, which is why that
surface is exempt.

**KNOW-40 · floor · disqualifier -- Written to someone he knows. [new; notes only]**
Statement: *A note to a named person reads as from someone who knows them at the level the brief states: it opens on the person or the shared history, not on a formula; it uses the real context the brief gives at its true warmth, no warmer and no colder; and it contains no cold-outreach formula ('I hope this finds you well', 'I came across your profile', 'I wanted to reach out', 'I'd love to connect'). Copy that is not a note passes vacuously.*
Basis: his explicit instruction (2 Nov) that a note to someone he has known for years must not read like
outreach to a stranger.

**HMWK-41 · floor · disqualifier -- No homework for the reader. [new]**
Statement: *The copy never hands the reader homework: no numbered viewing or reading orders ('watch demos 1, 7 and 9'), no 'your reading list', no instructions on how to consume the site. It recommends the way a person would: one thing at a time, with the reason it's worth their minutes.*
Basis: his explicit instruction (2 Nov). Exemplar: ✗ `Start with demo 3, then 1, then 9.` · ✓ `If you
only watch one thing, make it the outreach one: it's the part of your pipeline I'd build first.`

**-- Excellence criteria: the `Great` set --**

**BUDG-07 · voice · excellence -- Bounded, varied emphasis budget. [kept, web tools]**
Statement: *Emphasis exists where the piece is long enough to need it and is disciplined: several tools (real bold, a short line on its own, a parenthetical aside, punctuation pacing, rare caps, an emoji) each used sparingly; no single tool saturates the copy; when one tool's budget is spent, the writer switches tools rather than doubling down. Copy under about 80 words passes vacuously.*

**PERS-08 · voice · excellence -- The copy performs its meaning. [kept]**
Statement: *The writing enacts what it says rather than only describing it: self-aware asides, pacing that mimics content, repetition that performs repetition, a concrete two-line moment instead of an abstraction. Invented dialogue never counts as enactment. Copy under about 150 words passes vacuously.*
Exemplar (his post, Oct 2026): `And then it got better and better and better / and then... / Everything suddenly
sucks.` -- the copy climbs, then drops. A sentence that says "things got worse over time" only describes.
**Weight note:** a dialogue scene is a rare instrument, never the default move.

**HUMN-09 · voice · excellence (non-gating) -- The double-hyphen human tag. [kept]**
Statement: *Where dash punctuation is wanted, spaced double hyphens are used: his deliberate 'Still Human' signal.*
Not required at any boundary; cited as voice evidence when present.

**SIGN-10 · voice · excellence (absence) -- No templated engagement bait. [kept]**
Statement: *No templated footer or call to action soliciting likes, shares, follows, subscriptions or comments ('subscribe for more', 'let's connect', 'thoughts?', 'agree?'), and no generic bolt-on question added only to manufacture engagement.*

**CLWN-22 · voice · excellence -- Mockery targets peers, never buyers. [kept, broadened]**
Statement: *Any mockery, the clown emoji included, targets a peer's bad opinion or the writer himself, never a potential buyer, employer or the reader; irony aimed at an idea is carried by a deadpan line or a melting or upside-down face instead. Copy with no mockery passes vacuously.*
Basis, his words: "Peers with bad opinions are fair game. Potential clients are not." On this site the
readers are potential employers, so the rule binds harder here than on LinkedIn.

**BOLD-25 · voice · excellence -- Every bold has a role; the bolds skim coherent. [kept, real bold]**
Statement: *Every bolded string serves one of three roles: emphasis of a subsection within a longer paragraph, one side of a contrast pair, or a link in a skim trail whose bolded parts alone read as a coherent gist. No isolated bolded line floats without a role. Copy with no bold passes vacuously.*

**LEN-27 · floor · excellence (`Great`-blocking) -- Length is earned. [kept]**
Statement: *The length is earned and fits the brief: the piece makes its one point and stops, nothing restates what was already said, and no stretch of three or more consecutive dense paragraphs runs without whitespace, a heading or emphasis relief.*
Basis: his single most-repeated complaint on the LinkedIn corpus, 13 times ("Kill 30% of it", "Cut it in
half"). **Never a disqualifier.**

**OPEN-32 · voice · excellence -- Opens with the claim. [new; the web stand-in for the hook rules]**
Statement: *The first sentence carries the point or the most interesting true thing, not a wind-up: no greeting on a page, no 'As part of', 'In this article' or 'Welcome to', no context the reader has to get through before anything happens. A note may open with a greeting line, and the sentence after it is held to this rule.*
Exemplar: ✗ `As part of my research into the company, I tried to work out who I'd need to talk to.`
· ✓ (his post, Oct 2026) `I use LinkedIn in a MANY ways that I'd never recommend to a client.`

**ECON-33 · voice · excellence -- Economics, not hype. [new]**
Statement: *Every claim about what AI or automation does for a business or a team is tied to a mechanism: cost, return, pipeline or people, with AI growing the team rather than replacing it. No transformation, revolution or unlocking without saying what changes and who pays for it. A practitioner's observation about how a tool behaves or where the technology is heading is not such a claim. Copy with no such claim passes vacuously.*
Exemplar (his post, May 2026): `any kind of "Dave-gentic" workflows are at best managed services -- NOT
products.` A claim with a business model attached.

**FING-34 · voice · excellence -- One line only he would write. [new]**
Statement: *At least one line only Alex would write: a dry aside, usually parenthetical, aimed at himself or a peer's bad idea; an honest admission of a rough edge; or a concrete number from his own work. Copy over about 150 words also owns at least one rough edge honestly, and nothing claims polished-agency perfection.*
Exemplars (his posts): `(for those considering hiring me ... look ... I ... ok ... I have other strengths ok?)`
· `lol this did not end up being as pro-fable as I thought it would.`

**SPOK-35 · voice · excellence -- Talking, not typing. [new]**
Statement: *The rhythm is his speech, tidied: longer chains that land on a short punch, an aside on its own line, the reader addressed as you. His fingerprint words (right?, honestly, look, basically) appear sparingly, no more than about once per 150 words; sprinkled more often they become a caricature, which fails.*
Constant: the pre-flight allows each word max(2, words / 150) times per section. Its first value, once per
250 words, fired on two of his own posts and was loosened (§E.2).

**SRC-36 · voice · excellence -- Keeps his own words. [new]**
Statement: *Where the source material carries Alex's own words, the copy keeps his strongest phrasings from it, cleaned of fillers and transcription errors, rather than paraphrasing them into smoother generic copy; his lines are reworded only where they don't work in writing. A draft that could have been written without the source fails. Copy with no source in his words passes vacuously.*

**CLOS-42 · voice · excellence -- Ends deliberately. [new; the v2.1 closer doctrine promoted]**
Statement: *The last line is chosen: a punchline, a callback, or one specific low-key invitation. A deadpan TL;DR that turns the point into a joke counts as a punchline. It never trails off, never restates the piece as a neutral summary ('In short', 'Ultimately', 'In conclusion'), and never asks a generic question to fill the space.*
Exemplars (his posts): `mine. it's always mine. because this is just software and mistakes are a skill issue`
· `Tinkering now. Will tell you how it goes.`

**EMOJ-43 · voice · excellence -- Two emojis at most off LinkedIn. [new]**
Statement: *Copy for the site or a direct message uses at most two emojis in the whole piece, each one meaning something. LinkedIn copy passes vacuously.*

**-- The holistic gate --**

**GATE-11 · floor · holistic gate -- Read to the end, and it's him. [adapted]**
Statement: *Imagining the reader the brief names, busy and with a choice of what to read next: would they read this to the last line, and would someone who has heard Alex talk recognise him in it? One judgment, made on the whole; the checklist above cannot substitute for it.*
**Why it is load-bearing:** copy can clear every enumerated rule and still teach without gripping. That gap
has no other name.

### B.3 Tier boundaries -- every boundary below `Great` is citable

- **`Unpublishable`** ⟵ any disqualifier hit (FMT-01, DASH-02, EMO-03, REG-04, SLOP-05, THRD-30, REGR-31,
  FACT-37, JARG-38, SWR-39, KNOW-40, HMWK-41). The verdict cites every hit.
- **`Good`** ⟵ all twelve disqualifiers clean, but the `Great` set is not fully met. The verdict cites the
  unmet `Great`-set IDs.
- **`Great`** ⟵ disqualifiers clean **and** BUDG-07, PERS-08, SIGN-10, CLWN-22, BOLD-25, LEN-27, OPEN-32,
  ECON-33, FING-34, SPOK-35, SRC-36, CLOS-42, EMOJ-43 **and** GATE-11 all met. HUMN-09 never gates.
- A criterion that passes vacuously (out of its scope for this surface, kind or length) counts as met.
- **Do not report any agreement statistic about the `Great` boundary.** It is a stated preference
  structure, not a measured one.

## §C · WRITING VIEW -- actionable, positively framed

Write in this order. The IDs are the same criteria as the grading view, written as instructions. This
section, the brief and the source are all you read.

### C.1 Before you write

1. **Find the one point** [LEN-27, OPEN-32]: write one line stating what the reader should walk away
   with. The first sentence carries it, or carries the most interesting true thing that leads to it.
   No wind-up: no "As part of", "In this article", "Welcome to". A note may start "Hi Name," and the next
   sentence is held to the same rule.
2. **Mine the source first** [SRC-36, FACT-37]: underline his best lines in the source before drafting.
   Keep them, cleaned (see C.4). Every number, name, quote and event comes from the brief or the source;
   if the source doesn't say it, neither do you. Never invent dialogue or an anecdote.

### C.2 While you write

3. **Be him, talking to one person** [REGR-31, THRD-30, SPOK-35]: first person, "you", contractions,
   plain verbs, the position first and the reason in the same breath. On his site he is always I, me,
   my: never "Alex", never "he". Casual and direct, never formal, never nervous-polite. Longer chains that
   land on a short punch; an aside can sit on its own line.
4. **Sound like one specific human** [SLOP-05, REG-04]: an opinion with stakes, uneven texture, at least
   one line only he'd write. If a paragraph could appear on any company's site, cut it or rewrite it. No
   inversion openers, no "Here's the pattern", no three tidy parallel abstractions, no chiasmus closer.
5. **Leave a fingerprint** [FING-34]: a dry parenthetical aside aimed at himself or a peer's bad idea, an
   honest admission of a rough edge, or a concrete number from his own work. Anything over about 150
   words owns one rough edge honestly.
6. **Argue in economics** [ECON-33]: tie every claim about what AI does for a business to cost, return,
   pipeline or people. AI grows the team; it doesn't replace half of it.
7. **Perform, don't describe** [PERS-08]: make the copy do the thing: slow pacing for slow ideas,
   repetition for repetition, a concrete two-line moment instead of an abstraction. Dialogue only if it's
   real and in the source, and rarely.
8. **Point mockery at peers, never at buyers** [CLWN-22]: the readers of this site are potential
   employers. Tease yourself or a peer's bad take; never the reader.
9. **Keep it in plain words** [JARG-38]: no session names, spec or decision ids, file paths or build
   shorthand. Explain any real term the first time.
10. **Recommend like a person** [HMWK-41]: one thing at a time, with the reason it's worth their minutes.
    Never "watch 1, 7 and 9", never "your reading list".
11. **Notes to people he knows** [KNOW-40]: open on them or on what you share. Use the real history the
    brief gives at its true warmth. No "I hope this finds you well", "I came across your profile", "I
    wanted to reach out", "I'd love to connect".

### C.3 Mechanics

12. **Render clean** [FMT-01]: on the site, real bold, headings and links (markdown); never unicode-bold
    letters, never ↳ bullets. On LinkedIn or in a message, no markdown.
13. **Dashes** [DASH-02, HUMN-09]: never an em dash. Use ` -- `.
14. **Emojis** [EMO-03, EMOJ-43]: on the site or in a message, zero to two in the whole piece, each one
    meaning something. Never a profession or a flag.
15. **Spend emphasis like a budget** [BUDG-07, BOLD-25]: a little bold, a short line, an aside, pacing;
    switch tools when one runs out. Every bold has a role, and the bolds read top to bottom as the gist.
16. **No swearing on the site** [SWR-39]: if the frustration is the point, say it deadpan.
17. **Earn the length** [LEN-27]: hit the brief's length. Make the one point and stop. Three dense
    paragraphs in a row owe a cut, a heading, a bold or air.
18. **End deliberately, no bait** [CLOS-42, SIGN-10]: a punchline, a callback, a deadpan TL;DR, or one
    specific low-key invitation ("DM me if you want to see what one of my specs looks like"). Never
    "In short", never "Thoughts?", never "let's connect".
19. **Then read it as the reader** [GATE-11]: would they finish it, and would someone who's heard him
    talk recognise him? If not, nothing above saves it.

### C.4 Cleaning his spoken words

- Fix transcription errors: "cloud code" is Claude Code, "vertzel" is Vercel, "ad very" is Addvery.
- Split run-ons at the "so", "and" and "right?" joints. Keep one or two "right?" or "honestly" per
  section as a fingerprint, never more; cut most "um", "like", "basically", "kind of", "you know".
- Keep his verbs and his images; drop only what doesn't work written down.
- Cut swearing. Keep the energy.

### C.5 Voice palette

- **He reaches for:** right?, honestly, look, pretty cool, that's fine, just run, kill it, scope creep,
  show off a little bit, win-win, costly signal, knowledge arbitrage, pipeline, managed service,
  "(no really)", "Spoiler:", "Don't believe me?", TL;DR.
- **He never uses:** em dashes, templated sign-offs, the "Silence. / Then:" construction, made-up
  dialogue, buzzwords used straight (revolutionize, game-changer, seamless, delve), unless he's mocking
  them.
- **Stance:** a practitioner, not an evangelist. Honest about cost and the slog. Pro-human, never anti-AI.
  His marketing past is his on-ramp and his authority, never an apology. Generous once the call is made.

### C.6 By kind

- **Page copy:** short paragraphs, the reader is one person, the bolds alone give the gist.
- **Article:** the claim first; headings that say something; a real number or moment from the build; ends
  on a punchline or one invitation.
- **Clip summary:** the video sits above, so don't narrate it ("In this video ..."). Say what he argues
  and why it matters, in first person, keeping his best one to three lines from the clip, cleaned.
- **Note to someone he knows:** short; open on them or the shared history; one specific ask or none;
  signed with his first name.

## §D · Worked examples (constructed unless marked)

- **`Unpublishable` (page copy):** `Alex Alderman is a GTM engineer passionate about leveraging AI to drive
  seamless growth. In this page, he outlines how his skills could support your team.` Fails THRD-30
  (third person), REGR-31 (formal), SLOP-05 (seamless, passion boilerplate), OPEN-32 would fail too.
- **`Good` (about-me copy):** `I spent ten years in B2B marketing, then nine months building with AI
  agents. Now I build the systems under a sales pipeline.` Clean, first person, casual. Not `Great`: no
  fingerprint (FING-34), nothing only he would write.
- **`Great` (about-me copy):** the same facts with his own turn: `I spent ten years writing B2B copy, then
  nine months building with AI agents full time. (I called it a sabbatical. It was not restful.)
  Now I build the plumbing under a sales pipeline, and I'm still a copywriter about it.`
- **`Great` as written (his post, Oct 2026):** the "second-order consequences" post: an admission ("i
  delegated judgement"), a concrete mechanism (the one-line rule that made the assistant write a script),
  performed escalation ("i hate ai / i love ai! / i hate loving ai"), and a closer that turns on himself.

## §E · Calibration record

Five of his own posts, chosen before grading for range of length and subject from his 34 original
posts of May to October 2026, graded one per fresh grader call through the same payload as a real
run, with the brief set to his LinkedIn surface (so surface-scoped rules pass vacuously and LinkedIn
rendering is the standard for FMT-01). They should land `Good` or `Great`. An `Unpublishable` on his own
writing means the rubric is wrong.

The five, fixed before any grading: the five posts **not quoted anywhere in the grading view** (so the
grader cannot recognise them from an exemplar), spanning 547 to 2,990 characters. The brief did not say
they were his. Full assessments are in the git-ignored run log.

### E.1 Results (2 Nov 2026)

| Post (LinkedIn activity id) | Date | Chars | Grade | Failed |
|---|---|---|---|---|
| 7489690972952449024 (20 hours to save 15 minutes) | 2 Aug | 1,024 | **Great** | none |
| 7500671990362677248 (Fable 5.1 and marketing) | 1 Sep | 1,005 | **Great** | none |
| 7509209981741662209 (172 tools at session start) | 25 Sep | 547 | **Great** | none |
| 7513505338554302464 (LinkedIn confession, ten-step plan) | 7 Oct | 1,324 | Good | LEN-27, CLOS-42 |
| 7514643351871291392 (sessions and subagents changed) | 10 Oct | 2,990 | Good | web-1.1: LEN-27, ECON-33, CLOS-42, GATE-11 · web-1.2: LEN-27, GATE-11 |

**No disqualifier fired on any of the five**, and none of the 34 posts trips a countable rule on its own
surface except the two his own LinkedIn rubric would also fail (an em dash inside a pasted AI prompt; a
profession emoji). The two `Good`s fail on length, which is his own most-repeated complaint; the second
of them calls itself "rambling" in its own text.

### E.2 Changes made after calibration

1. **CLOS-42** (web-1.1 → web-1.2): the grader failed "TL;DR someone broke my workflow and it's
   frustrating lol" as a restatement. A deadpan TL;DR is one of his closers, so the statement now says
   it counts as a punchline and bans only a *neutral* summary.
2. **ECON-33** (web-1.1 → web-1.2): the grader failed a practitioner's aside ("this is huge", about a
   Claude Code change) as unbacked hype. The rule exists for claims about what AI does for a business;
   it is now scoped to those, and observations about tools or where the technology is heading are out.
   Re-graded on web-1.2, that post loses both failures and keeps the two fair ones (LEN-27, GATE-11).
3. **SPOK-35's constant**: "each fingerprint word once per 250 words" fired on two of his own posts
   ("basically" twice in 206 and in 454 words). Now max(2, words / 150) per section.
4. **The grader prompt, not the rubric:** the first dispatches asked for verbatim "reasoning", and the
   API's safeguards stopped 5 of 7 responses as reasoning extraction. The payload now asks for written
   "findings"; every stopped post then graded normally.

## §F · Lineage: the LinkedIn rubric's 17 criteria here

| LinkedIn v2.1 | Here | Note |
|---|---|---|
| FMT-01 | adapted | surface-relative: real bold on the site, no markdown on LinkedIn |
| DASH-02 | tightened | no em dash at all (voice guide) |
| EMO-03 | kept | |
| REG-04 | kept | |
| SLOP-05 | kept | web exemplars; AI-tell vocabulary named |
| HOOK-06 | not applicable | LinkedIn fold and click-invitation; OPEN-32 is the web stand-in |
| BUDG-07 | kept | web emphasis tools; short copy vacuous |
| PERS-08 | kept | invented dialogue never counts; short copy vacuous |
| HUMN-09 | kept | non-gating |
| SIGN-10 | kept | web bait phrases named |
| GATE-11 | adapted | the reader the brief names; "is it him" added |
| HOOKF-19 | not applicable | LinkedIn hook formats |
| WRAP-20 | not applicable | LinkedIn hook-line wrap |
| CLWN-22 | kept, broadened | all mockery, not only the clown emoji |
| BOLD-25 | kept | real bold |
| LEN-27 | kept | "fits the brief" added |
| HBAL-28 | not applicable | LinkedIn hook emphasis balance |

New: THRD-30, REGR-31 (his instructions, 2 Nov); OPEN-32, ECON-33, FING-34, SPOK-35, EMOJ-43, SWR-39,
JARG-38 (voice guide); SRC-36 (this skill takes source material); FACT-37 (voice guide plus the v2 dialogue
correction); KNOW-40, HMWK-41 (his instructions, 2 Nov); CLOS-42 (the v2.1 closer doctrine, promoted).

## §G · Observed doctrine -- NOT criteria

*Recorded for the writer's palette. Nothing here may be cited in a grade.*

- **Pro-human, never anti-AI.** AI is how a team does more business and grows together.
- **Point first, body second.** As he writes LinkedIn hooks first, he writes the claim first here, and
  the body pays it off.
- **One honest admission per page** is what makes the rest believable.
- **Generous once the call is made** ("That's fine.").
- **✅ and ❌ over 👍 and 👎** for binary lists, and never both pairs together.
- **Confident, not arrogant.** His own note on a draft: "Post tone is reallllly close to the line of
  confident to arrogant."
