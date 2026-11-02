---
System Primitive: Operator task
Task type: Gate approval
Task id: OT-<nn>
Task State: Open
Gate: <spec id> <which gate, e.g. research list, definition of done, spec draft, charter change preview>
Requested by: <session name>
Snapshot of: <path> at commit <short hash>
Unblocks: <what starts once it's approved, one line>
Created: <YYYY-MM-DD HH:MM Prague>
---

<!-- File name: "Approve - <what it's about, in everyday words>.md", meaning in the first 35 characters. No ids or codes in the name or the text. -->

# Approve: <what it's about, in plain words>

## What this is

<In plain words, so Alex needs no other file: what this part of the project is and what it's for; what he's being asked; what happens once he answers; what's waiting on it right now; about how long it takes him; the deadline. No internal codes (no D2, S1, S-D3, DoD-13, C01, P4): say what the thing is. Ids stay in the frontmatter.>

## What's being approved

<The spec, list or draft exactly as it stands at this stage, copied in whole. This is a frozen snapshot: the live file may move on, but this is what the approval covers. If it's long, put a five-line summary first, then the full text.>

<!-- Git-ignored drafts: when the draft lives in a git-ignored file (so it never reaches the public repo), embed it here with an Obsidian embed, ![[<path to the draft>]], instead of copying it in. That file is then the snapshot: it must not change while this gate is open. To change it, write the change below, wait for his answer, and only then edit the draft. -->

## Approval

- [ ] I approve

Tick the box to approve as it stands. If something has to change first, leave the box empty and write what to change below. Either way, the requesting session checks this file every 5 minutes while it's blocked.

`<operator_answer>`
```ot-<nn>-changes

```
`</operator_answer>`
