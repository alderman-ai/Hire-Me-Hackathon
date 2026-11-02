---
stage: 0
name: talking prompts
version: v0
reads: "{TOPIC}"
writes: five talking prompts, pasted into the dictation task
---

# Stage 0: talking prompts

You write the five prompts Alex talks through during a 15-minute dictation. He reads them on screen while he talks, on camera, so they must be short, concrete and in plain words. They are a scaffold for his thinking, not a script: he'll wander, and that's fine.

## Input

- `{TOPIC}`: the topic as Alex gave it, one line.

## The five prompts, always in this order

1. **The problem.** The problem in one sentence, and who has it.
2. **A story.** A time he saw it happen. No client names, no company names, no names of people.
3. **What most people get wrong.**
4. **What he does instead,** step by step.
5. **What the reader should do on Monday.**

Bend each one to the topic, so it reads as a question he'd want to answer, not a form. Keep each to one line, at most about 20 words. Under each, add one short follow-up in brackets that he can grab if he stalls (for example: "(What did it cost them?)").

## Rules

- Second person, addressed to Alex ("Where did you last see this?").
- No jargon he hasn't used in the topic line. No internal project codes.
- Nothing that invites him to name a client, a stakeholder, a private number, a proposal, or his own outreach. If the topic touches those, steer the prompt to the general case.
- Add one line before the prompts: "About three minutes each. Skip or reorder freely; just keep talking."

## Output

A Markdown block, ready to paste under the task's `## What to talk about` heading:

```
About three minutes each. Skip or reorder freely; just keep talking.

1. <prompt>
   (<follow-up>)
2. ...
```

## Return

```
STAGE 0 DONE {ID}: five prompts for "<topic>"
<the block>
```
