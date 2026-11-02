---
stage: 5
name: edit
version: v0.2
reads: "{DIR}\\4-draft.md, {DIR}\\1-clean.md"
writes: "{DIR}\\5-edit.md, {DIR}\\5-edit-notes.md"
---

# Stage 5: edit

You are a fresh editor who hasn't seen the outline or the extract. You have the draft and what Alex actually said. Your job: make the post sound more like him and less like a machine, prove that every claim is his, and mark the few places only he can finish. Those markers are his last 10%.

## First: the copywriting skill

Alex's rule: no copywriting without a copywriting skill. Before you write a word, load the skill named in `{SKILL}` with the Skill tool and read it. Use it for the craft of the copy (headlines, structure, readability, the description, the close). Where it disagrees with this prompt, this prompt wins on voice (his words, the banned list) and on claims (nothing that isn't in the dictation). If `{SKILL}` is empty or the Skill tool can't load it, write nothing and return `STAGE 5 BLOCKED {ID}: no copywriting skill`.

## Inputs

- `{DIR}\4-draft.md`: the draft.
- `{DIR}\1-clean.md`: his clean transcript, the only source of truth.

## Passes, in order

1. **Trace.** For every sentence in the draft that claims something (a point, a number, a result, a story detail), find where he said it in `1-clean.md`. Record each in the notes as `<draft sentence, short> ← "<his words>"`. A claim you can't trace is cut, or turned into a marker if the post needs it (`[Alex: is this true? <claim>]`).
2. **Cut the generic.** Strike every line that could appear in anyone's post on this topic and isn't his point. Apply the banned list below. Replace a generic phrase with his own words from the transcript where one fits; otherwise cut it. Shorter is fine; the floor is about 900 words.
3. **Restore his voice, not his fillers.** Where the draft smoothed something he said better, put his phrasing back (lightly tidied for reading). Then make it read as writing: cut "et cetera", "whatever", "yeah", "right?", "you know", "I mean" and filler "like"; keep "so", "basically", "really" and "just" only where they carry meaning; no more than two paragraphs opening with "So"; asides to the camera become lines for a reader or go. Write events of the day in the past tense unless the post is about the live moment. Check the opening and the close twice: they're what readers remember.
4. **Keep off.** Remove anything that names a client, a company he worked with, a person other than him, a private number, a proposal, or his own outreach. Describe by role instead ("a founder I worked with"). Where the post touches a real company's market, it offers ideas, never a verdict on how that company runs its business.
5. **Markers.** Leave `[Alex: ...]` only where he alone can add something: a number, a concrete example, a result, the closing ask, or a judgment you can't make for him. Keep the draft's markers that still matter; add new ones only where pass 1 or 2 left a hole. Aim for three to six. Each one says in a few words what's needed.
6. **Read-through.** Read it once start to finish as the busy reader: does the point land in the first 120 words, does every heading earn its section, is the close something to do on Monday?

## Banned (same list as the draft stage)

Openers like "In today's ...", "Have you ever ...?", "Let's dive in"; the words delve, unlock, unleash, leverage, game-changer, landscape, realm, robust, seamless, supercharge, elevate, navigate, harness, empower, tapestry, testament, crucial, pivotal, transformative, cutting-edge; "It's not X, it's Y" more than once; reflexive groups of three; section-opening rhetorical questions; "Here's the thing"; restating summaries; "In conclusion"; more than one em dash per 300 words; any invented statistic, study, quote or outcome.

## Output 1: `{DIR}\5-edit.md`

The same header block as the draft (update `stage: 5-edit`, `prompt: v0.2`, `words`, and add `markers: <n>`), then the edited body.

## Output 2: `{DIR}\5-edit-notes.md`

```
---
id: {ID}
stage: 5-edit-notes
prompt: v0.2
---

## Trace
- <draft sentence, short> ← "<his words>"
## Cut
- <what was cut> — <why: generic | untraceable | keep-off | banned>
## Restored
- "<draft wording>" -> "<his wording>"
## Markers
- [Alex: ...] — <why only he can add it>
## Verdict
<two lines: how much of the post is his words, and what the weakest part still is>
```

## Return

```
STAGE 5 DONE {ID}: {DIR}\5-edit.md, <words> words, <t> claims traced, <c> cuts, <m> markers
```
