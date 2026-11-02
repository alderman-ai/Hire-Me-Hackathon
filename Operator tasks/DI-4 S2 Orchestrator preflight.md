---
System Primitive: Intake file
Intake State: Answered
Intake id: DI-4
Created: 2026-11-02
Build goals: []
---

# Decision intake 4

This intake holds 2 decisions for S2 Project orchestrator. Each question carries its own context, so you can answer them in any order. Neither depends on the other, but Q4.1 settles the orchestration row that S0's folder plan (Q2.1 in DI-2) shows as pending. The sign-off of the project definition of done isn't here: it gets its own intake once the S2 session has written the draft. An empty fence means not answered, and S2 then uses the default named in that question. Say "DI-4 is ready" when you're done.

# Q4.1 Where the orchestration session lives

Should the orchestration session move into S2's folder, so that it alone holds the skills that change the charter?

The orchestration session, named `orchestration`, runs from the project root today. It coordinates the other sessions and owns the dependency map. The charter's P2 says: "One orchestration session owns the dependency map." S2 Project orchestrator builds four skills that change the charter: add a deliverable; add or change a definition-of-done item; add, merge or split a spec outline row; and propagate each change to every place that depends on it.

The charter says S2 is the "likely home of the orchestration session (P2), since it already owns the dependency map. Confirm in Claude Code." It also says "A spec never edits the charter", and the root instructions say no session edits it except through S2's skills.

Where the skills are stored decides who can run them. A session finds the skills in the folder it was started in and in every folder above it. Skills at the project root therefore reach every session, all 10 wave-2 specs included. Skills in S2's folder, `s2-orchestrator`, reach only sessions started there. Every session messages `orchestration` by name, and that name stays the same whichever you pick.

S0's folder plan (Q2.1 in DI-2) shows the orchestration row as pending this question. S0 creates nothing for it either way.

Your options:

- **A. Orchestration stays at the root, and S2's skills go in the root's skills folder.** Nothing moves. Every session can see and run the charter-changing skills, so "a spec never edits the charter" rests on instructions alone.
- **B. S2's folder becomes the orchestration session's home.** Once the skills work, `orchestration` hands off to a fresh session started in `s2-orchestrator` under the same name. That's a forking gate: the new session takes over from the files, and the old one stops. The coordinator instructions move from the root into that folder. Only that one session can run the skills.
- **C. Something else.** Say what.

I recommend B. It keeps the dependency map and the power to change the charter in one session, which is what P2 and the charter's "likely home" line ask for.

If the fence is left empty, S2 takes B and logs it in its decision log. The skills get built in `s2-orchestrator` under either option, so if you later pick A, moving them to the root is one step. This answer affects where the skills are stored, which session runs every later charter change, the orchestration row in DI-2's folder plan, and S2's first forking gate.

Write A, B, or C and what you want instead.

## A4.1

`<operator_answer>`
```a-4-1
It can stay at root and you can have a slash. We can have an orchestration subdirectory for any files that specifically go just to the orchestration tasks (for example, even the templates and stuff that is currently at root). Basically anything at root now.

The orchestration session is the parent session. Its file tree, instead of having it at root, is in this orchestration subdirectory. Every other working directory has its own directory at root. The parent directory's file tree will be in this orchestration directory at the root of the parent Anything currently existing there that's not part of a working directory, and that includes stuff before the charter. That includes the rig, OBS, the website, all that stuff. Those don't move but any templates or anything else like that
```
`</operator_answer>`

# Q4.2 Four unclear charter passages

Do you accept S2's reading of four charter passages that clash or leave a gap?

S2 Project orchestrator owns the skills that change the charter, writes the project definition of done (DoD), and signs off the spec outline. The charter says "A spec never edits the charter" and that S2's skills edit the file. Four passages clash with that, or leave a gap:

1. **The reading list.** The charter says S1 Research "fills the research reading list", which is a section of the charter, yet S1 is a spec. Reading: S1 settles every entry with you and sends it to S2, which writes it into the charter and into the reading lists of the specs that need it. S2 never decides research content.
2. **DoD ids.** The spec contract asks every spec to name "the definition-of-done items it claims", but S0 runs first and the DoD is S2's to write. Reading: S0 and S1 use placeholder ids (DoD-S0-a, DoD-S1-a and so on), and S2 swaps in the real ids (DoD-1, DoD-2 and so on) once the DoD is signed off.
3. **When wave 2 starts.** The charter says "Wave 2 starts once S0, S1 and S2 are in place." Reading: S2 is in place once the DoD is signed off and every item is claimed by a spec outline row. S2's charter-change skills are finished while wave 2 starts, so S-D1 (scraping) and S-D2 (Addvery research) don't wait for them.
4. **Spec ids.** The charter says "Spec IDs mirror deliverable IDs", but S2 can also split a row, or add one with no deliverable of its own. Reading: a split row keeps its id plus a letter (S-D3a, S-D3b), and a row with no deliverable gets an id you see in that change's preview.

Your options:

- **A. Accept all four readings.**
- **B. Accept them except the numbers you name,** with what you want instead.
- **C. Something else.** Say what.

I recommend A. Each reading keeps the charter's intent, and none of them adds anything that waits on you.

If the fence is left empty, S2 takes A and logs it in its decision log. This answer affects how S1's findings reach the reading list, the S0 and S1 specs' DoD links, when the orchestration session may launch S-D1 and S-D2, and the ids of any split row. The later DoD sign-off intake assumes reading 2.

Write A, or B followed by the numbers and what you want instead, or C and what you want instead.

## A4.2

`<operator_answer>`
```a-4-2
Reading lists go into the executable specs, which are not written yet, or at least to my knowledge. Again consult the knowledge work executable spec in my GitHub. Look how it handles research and specs and everything, and go ahead and model the research section after that, 
```
`</operator_answer>`
