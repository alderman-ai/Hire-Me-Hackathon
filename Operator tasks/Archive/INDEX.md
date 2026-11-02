# Archive of answered intakes and operator tasks

Every decision intake (DI) and operator task (OT) that Alex has answered, and whose owning session has applied his answers, ends up in this folder. Each file holds his answers verbatim. Read them for his wording, and never ask him again what one already answers. The `orchestration` session files them here with its `archive-intake` skill, catalogs them below, and puts each one on its readers' reading lists. A question id `Q<n>.<k>` belongs to intake DI-<n>.

| Id | Title | Asked by | Answered | Decisions | Readers |
| --- | --- | --- | --- | --- | --- |
| DI-1 | Capture rig decisions | rig | 2026-11-01 | Q1.1 Free up C: by uninstalling Path of Exile and its related tools.<br>Q1.2 Record the webcam as a separate file.<br>Q1.3 Upload to his main YouTube channel.<br>Q1.4 No fixed session length: he ends sessions with /pause and /stop, about 1 to 1.5 hours each, and the timing is loose.<br>Q1.5 Record only, no livestream (he dropped the livestream idea in chat).<br>Q1.6 /pause stops the session timer. The 12 hours are a rough estimate, not a cutoff.<br>Q1.7 /process runs only when he types it.<br>Q1.8 Keep the local videos after upload.<br>Q1.9 No marker hotkeys: finding and sorting clips by stakeholder is the assistants' job. Stakeholders: RevOps, CSO, CMO, CEO, CTO, CAIO, COO.<br>Q1.10 3 seconds of clip padding, changeable later. | rig (`OBS\CLAUDE.md`, `OBS\rig\HANDOFF.md`, `OBS\rig\RIG_NOTES.md`) |
| DI-2 | S0 Bootstrap preflight | S0 | 2026-11-02 | Q2.1 Folder plan approved, but no spec prefix in any folder name: he hates renaming folders. Session names may keep the spec id.<br>Q2.2 `Addvery Research\` is his own folder, worked one-on-one, with no spec. It's git-ignored, so read it from the local disk, never from GitHub. | S0 (`bootstrap\SPEC.md`), S2 (`orchestration\SPEC.md`) |
| DI-3 | S1 Research preflight | S1 | 2026-11-02 | Q3.1 Model the research on his Knowledge Work Executable Specs repo. Research comes before the methodology: use an easy or converged answer if one exists, or at least learn the traps. Store findings at the parent or the child level, and put them on the reading list of every spec that needs them. Three wildcard topics on every research list.<br>Q3.2 No number: size the research like that repo's (a list of questions, the tools available).<br>Q3.3 He researches Addvery himself, one-on-one in `Addvery Research\`. No spec for it.<br>Q3.4 Research is preflight and involves him. He's at the computer until at least 18:00 Prague. After 15 minutes waiting on him, poke him through the desk. | S1 (`research\SPEC.md`), S2 (`orchestration\SPEC.md`) |
| DI-4 | S2 Orchestrator preflight | S2 | 2026-11-02 | Q4.1 `orchestration` stays at the root as the parent session. Its own files, such as the templates, live in `orchestration\`. `OBS\`, `website\` and the other working folders don't move.<br>Q4.2 Reading lists go into the executable specs, modelled on his Knowledge Work Executable Spec repo. Readings 2 to 4 went unaddressed, so they took their defaults (S2's decision log). | S2 (`orchestration\SPEC.md`, root `CLAUDE.md`) |
| DI-5 | S2 DoD sign-off | S2 | 2026-11-02 | Q5.1 DoD signed off with one change: soften the "research doesn't run without me" wording (DoD-4), since he may relax the research rules if time runs short. | S2 (`orchestration\SPEC.md`) |

## By topic

| Topic | Questions |
| --- | --- |
| Folders and naming | Q2.1, Q4.1 |
| `Addvery Research\` ownership | Q2.2, Q3.3 |
| Research method and budget | Q3.1, Q3.2 |
| Orchestration and reading lists | Q4.1, Q4.2 |
| Desk, pokes and Alex's hours | Q3.4 |
| Definition of done | Q5.1 |
| Rig: storage and capture | Q1.1, Q1.2, Q1.5, Q1.8 |
| Rig: sessions, processing and clips | Q1.3, Q1.4, Q1.6, Q1.7, Q1.10 |
| Stakeholders and clip sorting | Q1.9 |
