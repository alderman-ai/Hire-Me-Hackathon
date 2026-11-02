---
System Primitive: Intake file
Intake State: Answered
Intake id: DI-2
Created: 2026-11-02
Build goals: []
---

# Decision intake 2

This intake holds 2 decisions for S0 Bootstrap. Each question carries its own context, so you can answer them in any order. Q2.1's S-D2 row depends on your answer to Q2.2, and Q2.2 overlaps Q3.3 in DI-3, so answer those two consistently. An empty fence means not answered, and S0 then uses the default named in that question. Say "DI-2 is ready" when you're done.

# Q2.1 Approve the folder plan

Do you approve this plan of one folder per spec and role at the project root?

S0 Bootstrap is the first spec to run. It creates a folder at the project root for every spec. Each new folder gets only three things: a CLAUDE.md that tells its session what to read at startup (the charter, the git rules, and how to ask you questions), a settings file so the session ignores the root's coordinator instructions, and the command that launches it in the background. Each spec is written later. S0 writes no specs and does no research.

The charter says: "One approval of the directory plan before anything is written" and "Directories that already exist (the website subdirectory, the rig) are adopted, not overwritten." Each folder's name is also its session's name, lowercase and hyphenated, so the git watcher and the launch commands find every session the same way.

| Spec or role | Folder | Session | Status |
| --- | --- | --- | --- |
| S0 Bootstrap | `s0-bootstrap` | `s0-bootstrap` | new |
| S1 Research | `s1-research` | `s1-research` | new |
| S2 Project orchestrator | `s2-orchestrator` | `s2-orchestrator` | new |
| S-D1 Scraping research demo | `s-d1-scraping` | `s-d1-scraping` | new |
| S-D2 Company and stakeholder research | `s-d2-addvery` | `s-d2-addvery` | adopted from `Addvery Research` (see Q2.2) |
| S-D3 GetSales outbound demo | `s-d3-getsales` | `s-d3-getsales` | new |
| S-D4 Blog pipeline | `s-d4-blog-pipeline` | `s-d4-blog-pipeline` | new |
| S-D5 Three blog articles | `s-d5-blog-articles` | `s-d5-blog-articles` | new |
| S-D6 Canva LinkedIn templates | `s-d6-canva-templates` | `s-d6-canva-templates` | new |
| S-D7 LinkedIn content creation demo | `s-d7-linkedin-content` | `s-d7-linkedin-content` | new |
| S-D8 Website | `website` | `website` | adopted, unchanged |
| S-D9 Legibility analyzer | `s-d9-legibility` | `s-d9-legibility` | new |
| S-D10 Canva design video | `s-d10-canva-video` | `s-d10-canva-video` | new |
| Answer desk | `answer-desk` | `answer-desk` | adopted, unchanged |
| Orchestration session | project root for now | `orchestration` | adopted; stays at the root or moves into `s2-orchestrator`, which Q4.1 in DI-4 asks you separately |
| Capture rig (a role, not a spec) | `OBS` | `rig` | adopted, unchanged |
| Git watcher (not in the charter) | `watcher` | `watcher` | adopted, unchanged; it pushes hourly |

Four more things the plan decides:

- S0 doesn't edit adopted folders. The website and rig CLAUDE.md files don't yet list the charter or the rules for asking you, so S0 asks those two sessions to add them.
- The charter says every reading list "starts with this charter". Two exceptions: the answer desk keeps its question format first and reads only part of the charter, and the watcher reads only the git rules. Neither needs more for its job.
- `Operator tasks`, `_templates` and the Obsidian settings aren't session folders, and they stay as they are.
- If the S1 or S2 spec is already sitting in a folder with a different name when S0 runs, S0 keeps that name.

Your options:

- **A. Approve as shown.**
- **B. Approve with changes.** Name the rows and the new names or statuses.
- **C. Something else.** Say what.

I recommend A. It covers every spec in the charter's outline, renames nothing a running session uses, and any folder stays cheap to rename until its session first launches.

If the fence is left empty, S0 takes A and logs it in its decision log. A later change means renaming a folder before that spec launches. This answer affects every folder S0 creates and every launch command. The S-D2 row depends on Q2.2, and the orchestration row depends on Q4.1 in DI-4.

Write A, or B followed by the rows to change and their new names or statuses, or C and what you want instead.

## A2.1

`<operator_answer>`
```a-2-1
The subdirectories are fine. Remove the spec number. I don't love it being part of the name to be honest. You can connect each spec to the subdirectory in the spec itself. I don't want it to be in the actual naming of the subdirectories because it's not the final list and I don't want the numbering to be confusing. We might change some things around. This is just one more thing that would break if we didn't remember that we changed the folder names.

In general I hate changing folder names once they're reposted. Take out all of the prefixes, like the S0, SD1, whatever, from the folder name. For the session name I don't care what you name sessions. Actually in sessions, it might actually be helpful to have it. That's fine. 
```
`</operator_answer>`

# Q2.2 The Addvery Research folder

Which spec owns the `Addvery Research` folder you made, and may S0 rename it to `s-d2-addvery`?

You created the folder at 12:48 today. It holds two files, neither committed yet. The first is a CLAUDE.md: its scope is researching the target client with the Apify API, it references a recent project on how you research, and it says to keep tokens off camera. The second is "Research Addvery Spec.md", a stub for a deep research session on Addvery as a prospect-research pipeline demo, which will list the research, the tech stack, where results go and which sibling folders it feeds.

The folder has no settings file. Its CLAUDE.md doesn't list the charter, the git rules or how to ask you, so a session started there now would also pick up the root's coordinator instructions.

What the charter says about the candidates: S-D1 "demonstrates scraping and research on the Apify API"; S-D2 "researches Addvery and finds its top six stakeholders" and "may use S-D1's scrapers"; S1 owns the research methodology with you in the loop; existing folders "are adopted, not overwritten". Merging two specs into one folder is S2's job, not S0's. A folder name with a space can't match a session name, so the git watcher finds its owner less reliably. The repo is public, and S0 commits this folder along with the new ones.

This overlaps Q3.3 in DI-3, which asks whether S1 or S-D2 researches Addvery. If you give that research to S1 there, C below is the matching answer here.

Your options:

- **A. It's S-D2's folder, renamed `s-d2-addvery`, with session `s-d2-addvery`.** S0 keeps both your files word for word, adds the standard reading list above your text, and adds the settings file.
- **B. It's S-D2's folder under its current name,** with session `addvery-research` and the same additions.
- **C. It's S1's research folder, renamed `s1-research`,** and S-D2 gets a new `s-d2-addvery`.
- **D. Something else.** Say what. For instance, S-D1, or S-D1 and S-D2 together, which S0 passes to S2 as a merge.

I recommend A. Your notes describe researching Addvery, which is S-D2, and one naming scheme keeps every folder findable by its session name.

If the fence is left empty, S0 takes B: S0 won't rename a folder you made without your say-so, so it adds only the reading list and the settings file, and logs the decision. If this fence is empty but your answer to Q3.3 in DI-3 gives the Addvery research to S1, S0 follows that instead: the folder becomes S1's, still under its current name. This answer affects the S-D2 row of Q2.1's plan and the S-D2 launch command, and under C, also the S1 folder.

Write A, B, C, or D and what you want instead.

## A2.2

`<operator_answer>`
```a-2-2
I own this subdirectory. I'm going to be heavily involved in this and we don't need any spec from the project orchestrator from the charter. I'm going to handle this one-on-one and it's also going to be ignored just so we're not posting, even though it's public information inside. I'm handling this so the project orchestrator subdirectory can ignore this for now. I'll let it know or it can check just by the contents.

Important: it'll be getting ignored from the public repo so the orchestrator needs that information. It needs to get it from the local machine not the GitHub repo 
```
`</operator_answer>`
