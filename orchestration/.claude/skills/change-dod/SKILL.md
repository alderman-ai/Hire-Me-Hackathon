---
name: change-dod
description: Add, change or retire a project definition-of-done item, in the draft before the DoD sign-off and in the charter after it, or write the signed-off draft into the charter at the sign-off, and carry it to every claiming spec through propagate. Use when the operator asks for it, when a spec reports a DoD gap through the desk, when add-deliverable or change-outline needs an item, or at the DoD sign-off. Runs only in the orchestration session started at the repo root.
argument-hint: add | change DoD-<n> | retire DoD-<n> | sign-off  [--root <path>] [--record C<nn>]
---

# change-dod

Request: $ARGUMENTS

`<root>` is the `--root` value, else the repo root `C:\Users\alder\Desktop\Hire me hackaton`. Every path below is relative to `<root>`. The spec is `orchestration\SPEC.md`, sections 4 to 6. On a root other than the repo root this is a dry run, under `propagate`'s dry-run rules.

## 0. Guard

Run step 0 of `propagate` (`python -I orchestration\propagate_check.py --guard` from the repo root), and stop the same way.

## Who called it

- **Directly** (the operator, a spec's gap through the desk, S2's own work): this skill writes its own change record, sends its own preview, and calls `propagate`. Run every step below.
- **From `add-deliverable` or `change-outline`** (`--record C<nn>`): write this skill's places into the caller's record, under its C number, as further `### <n>. <file>, <section>` places, and its held lines under the caller's `## Held`. Open no record of your own and send no preview: the caller's preview covers it. Don't call `propagate` either, because the caller does. Run steps 1, 2 and 3 only, then hand back the ids used and any item the change would leave untraced or unclaimed.

## Where the DoD lives

- **Before the sign-off** (the charter holds no `DoD-<n>` item yet): the table in `orchestration\DOD-DRAFT.md`, which is S2's own file. An add, change or retire edits the draft, the placeholders stay, and the item reaches the charter with the sign-off. If the sign-off intake has already gone out, the item is shown in this change's preview (or the caller's), so the sign-off carries it with the rest.
- **After the sign-off:** the table in the charter's "Definition of done", below the three rule bullets and the "Once M2 exists" line, which stay word for word. Create it on the first write and keep rows in id order:

```
| Id | Item | How it's checked | Traces to | Claimed by | Status |
| --- | --- | --- | --- | --- | --- |
| DoD-1 | <outcome> | <evidence> | M0 | S0 | live |
```

**Traces to:** deliverable ids, separated by commas, or a range ("D1 to D10"). **Claimed by:** row ids, with an operator-owned row written as `S-D2 (operator-owned)`. The draft has the same columns, without Status.

## Inputs

- **add:** the item; how it's checked; the deliverables it traces to (ids from "Deliverables"); the rows that claim it (ids from "Spec outline"). The item is an outcome someone who wasn't there could check tomorrow morning, never an instruction for how to build.
- **change:** the id, plus the new wording, check, traces or claims.
- **retire:** the id, and why.
- **sign-off:** `DOD-DRAFT.md` and the operator's answer to the sign-off intake, or its default.

If an input is missing from an operator request, ask for it through the desk, as S2's one open question. In S2's own work, decide it and say so in the record.

## Rules

- Ids run DoD-1, DoD-2 and so on, and are never renumbered or reused, like principle numbers. A new id is one more than the highest id the charter or the draft has ever held, counting retired items. `DoD-T<n>` is only for dry runs on a scratch copy.
- **Retire, never delete.** A dropped item keeps its row and its text, with Status `retired, <d Mon>: <why>` (in the draft, `Retired <d Mon>: <why>.` at the start of the Item cell), so no link breaks.
- Every live item traces to at least one deliverable and is claimed by at least one live row. Operator-owned rows count as claimants. If a change would leave an item untraced or unclaimed, the preview flags it, and the change isn't applied that way: name a claimant, or run `change-outline` first.
- When an item is retired or a claim moves, every spec criterion that traced to it needs a new trace, and the preview lists each one.

## Steps

1. **Guard** (step 0).
2. **Read.** Read "Deliverables" and "Spec outline" in the charter, and the DoD wherever it lives now. Find each claiming spec's folder in `SESSIONS.md`, and read its SPEC.md if it has one. Work out the ids.
3. **Plan the places,** each as `### <n>. <file>, <section>` with fenced `Before:` and `After:` blocks:
   - the DoD rows, in the draft or in the charter;
   - for each claimant that has a SPEC.md, after the sign-off only: its place (spec contract item 1, the ids it claims) and the "Traces to" cells of its own definition of done;
   - for each claimant with no SPEC.md yet, a line under `## Held`: `- HELD <spec id> <folder>\SPEC.md: claims <DoD id>`;
   - on a retire or a moved claim, each criterion that loses its trace;
   - a notice to `website` if the site shows DoD items.

   Called directly: write them into a new record, `orchestration\changes\C<nn>-dod-<slug>.md`, in `propagate`'s record format, with `Status: planned`, Asked by and the approval. Called by another skill: write them into its record, and stop here.
4. **Preview** (SPEC section 4, step 2). Add the change to the preview queue. When the desk holds no S2 question, send one ASK covering everything queued: each item before and after, with its claimants, and the options (a) apply all, (b) apply all except the C numbers named, or with the changes named, (c) drop all. Mechanical follow-ons of a change already previewed skip this step.
5. **Apply, verify, log:** run `propagate C<nn>` with the same `<root>`, then `propagate check`. Any new gap is a miss, so fix it within this change.

## Sign-off (SPEC section 6)

On the intake's answer (A, or B with its changes), or its default under the poke rule:
1. Write one record, `C<nn>-dod-sign-off.md`, with every draft row added to the charter table under the draft's own ids, Status `live`, and B's changes applied. The intake was the preview.
2. Run steps 2, 3 and 5.
3. **Swap the placeholders.** Copy the placeholder map from the foot of `DOD-DRAFT.md` into the record. Through `propagate`, as a mechanical follow-on with no preview, replace each placeholder (`DoD-S0-a` ...) in every SPEC.md with its id. Where two placeholders become one id, merge the lines they were on. Then `propagate check` must show no placeholder.
4. Mark `DOD-DRAFT.md` `Status: signed off, now in the charter`, and commit it.
5. If the sign-off was taken on the default, log it in SPEC section 9.
