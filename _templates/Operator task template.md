---
System Primitive: Operator task
Task id: OT-<nn>
Task State: Open
Build goals: [<G-keys>]
Unblocks: <what it opens, one line>
Depends on: <task ids, or nothing>
Time: <minutes>
Cost: <credits at the charged rate, dollars, or 0>
Created: <YYYY-MM-DD>
Moves to: <only when the task's result is a file that lives on elsewhere: its path after completion (R-189); else delete this line>
---

# OT-<nn> <title>

<One paragraph: what this is for, and why it matters now.>

## Step 1. <action>

<This step's own context: what the thing is, why this way, what to expect, what it costs.>

```powershell
<copy-paste ready; the two environment lines repeated if the step runs Python>
```

## Step <k>. Report

<What to write back.>

`<operator_answer>`
```ot-<nn>-s<k>

```
`</operator_answer>`

## When you are done

Say "OT-<nn> done". <What the assistant does next.>
