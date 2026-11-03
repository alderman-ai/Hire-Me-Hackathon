---
name: dictate-article
description: Turn a few minutes of spoken dictation into a short, well-rounded article with media slots. Alex dictates the topic for 2 to 5 minutes, gets back the 5 to 10 questions that matter most for a complete article, answers them all in one dictated burst, then receives a draft whose order follows the argument (not the order he said things in), a list of what's still missing, and media slots describing the image, video or graphic that would bridge each section. Use when Alex says "write an article", "dictate an article", "I want to talk through a post", or "/dictate-article". Works in any project; inside a project with a media library it can also match the slots to existing clips and graphics.
---

# dictate-article

Alex talks; the article comes out structured, short and his. Three rounds, two of them his voice only.

## Round 1: the topic dictation (Alex, 2 to 5 minutes)

Say, in one line: "Dictate the topic for 2 to 5 minutes: what it's about, who it's for, what you want them to take away, and anything you already know you want in it." Then wait. Don't interrupt, don't summarise back.

## Round 2: the questions (you, then Alex in one burst)

Read the dictation against what a well-rounded article needs:

1. **One point.** What the reader should believe or do after reading, in one sentence.
2. **The reader.** Who it's for, and what they already know or doubt.
3. **Why now / why it matters.** The stakes, the cost of getting it wrong.
4. **Proof.** A concrete example, story, number or before/after from his own work.
5. **How it works.** The mechanism or method, specific enough to copy.
6. **The objection.** The strongest "yes, but", and his answer.
7. **What it doesn't do.** The limit or honest rough edge.
8. **What to do with it.** The takeaway the reader can act on (never an ask aimed at the reader).
9. **The opening.** A moment, line or scene that earns the first paragraph.
10. **The ending.** Where it lands: a line, a callback, a consequence.

Ask only about what the dictation leaves thin or missing: **5 to 10 questions**, most important first, each one line, numbered, with a few words on why it matters. Don't ask what he already answered. End with: "Answer them all in one go, in any order; skip any you don't care about."

## Round 3: the draft (a subagent; keep the session lean)

Hand both dictations, verbatim, to a fresh subagent (Opus for the draft itself) with these instructions:

- **Atomise first.** List every claim, story, example, number and phrase in both dictations as a separate item, tagged with which of the ten needs above it serves. Mark his best lines; keep them in his words.
- **Pick the spine.** Write the one point. Choose the order of the article from the argument (opening, stakes, proof and mechanism, objection, limit, takeaway, ending), never from the order he said things in, and never as one block per question. Items from different parts of the dictation sit together when they serve the same step.
- **Connect.** Every section hands off to the next: each one ends on something the next one picks up. No section reads as a standalone answer.
- **Short.** No fixed word count; aim for the shortest version that keeps the point, the proof and the ending (usually 500 to 900 words). Cut repetition; the dictation repeats itself, the article doesn't.
- **His voice.** First person, his phrasings kept, cleaned of filler. If the project has a voice skill (here, `alex-voice`), the draft goes through it afterwards as an existing draft, with both dictations as the source.
- **Media slots.** Between sections, wherever a visual would carry the point better than more text, put a slot on its own line:
  `[media: <image | video | graphic | chart | screen recording> | what it should show | why here (what it bridges) | make it with: <existing asset | screenshot | Claude Design | Comfy | either>]`
  Describe the content, not a file. 2 to 5 slots for a short article. The skill doesn't need to know any media library; "a chart of the commits per hour, showing the 13:20 drop" is enough.
- **Gaps.** After the draft, list what's still missing or unsupported ("no number for the time saved", "the objection has no answer yet"), each with where it would go. Never invent a fact, number or quote to fill one; leave the gap and list it.

Output: the draft as Markdown (title, a one-sentence summary, the body with media slots), then `## Gaps`, then `## Media slots` as a table (slot, kind, what it shows, make it with).

## Round 4 (inside a project with media): match the slots

If the project has a media library, a Sonnet subagent searches it for each slot and fills in the best existing match (path or id, plus a one-line reason), or marks the slot "to make" with its route: Claude Design for charts, diagrams and graphics; Comfy for animation and video generation; a screenshot for UI. In the hackathon project, the library is `legibility\cards\INDEX.md` and `cards.json` (graded clips, with YouTube ids and times), `orchestration\local\library\` (written, video and skills), and the site's own figures under `website\public\`. Never pick a clip graded No.

## Then

Show Alex the title, the summary, the gaps and the media table, in a few lines, and where the draft is. He fills the gaps in one more short dictation if he wants; the subagent folds them in. Publishing is the project's own step (here: `website` places it as an article entry, never labelled "demo").

## Notes

- Questions are for him to answer by talking. Keep them short enough to hold in his head while dictating.
- If he dictates more than 5 minutes, that's fine: more material, same process.
- Works for a blog post, a LinkedIn article or a write-up of a project. For LinkedIn posts (short, hook and fold rules), use his Write Great Post skill instead.
