# blog-pipeline: status
As of 20:02, 2 Nov (Prague), written from the folder's own records after the 19:4x crash.

## Where it fits in the plan

**Deliverable:** D4, Blog pipeline (spec row S-D4). **Retired** by Alex at about 16:45 (DI-8 question 1, charter change C12). Session `s-d4-blog-pipeline` stopped at 17:15.

| Id | What it says | State | Evidence |
| --- | --- | --- | --- |
| DoD-14 | Fifteen minutes of dictation turns into a near-final post, with the last 10% left to Alex. | Retired | Charter, DoD-14 status "retired". No test dictation was ever run. |

The folder is now tooling, owned by `s-d5-blog-articles`. It depends on S1's L-03 findings, which are complete. Who uses it:
- S-D5, which runs the stages and the scripts.
- `website`, whose `/demos` entry template follows POST-FORMAT.
- Every session that writes a `/demos` entry in the shared format: `s-d3-getsales`, `s-d10-canva-video` and `s-d9-legibility`.
- `s-d1-scraping`'s agent-view generator, which reads the same front matter.

## What it was trying to do

Build a runbook, stage prompts and scripts that turn about 15 minutes of Alex's dictation into a near-final post in a fixed format, proved once on a test dictation. Alex killed it as a separate deliverable: "Anything about blog pipelines is dead. The only deliverable is blogs." The kit stays for D5 and the other entry writers.

## What's been made

| Item | Where | State |
| --- | --- | --- |
| Runbook v1 (compiled-source mode, cold read, Docs for the last 10%) | `blog-pipeline\PIPELINE.md` (bacedbd, 18:42) | done |
| Post format v1.5 (shared entry fields, `[!video]`, `[!quote]`, `[!figure]`) | `blog-pipeline\POST-FORMAT.md` (d3896eb, 18:13) | done |
| Stage prompts 0 to 7, README and glossary | `blog-pipeline\prompts\` (10 files) | done |
| Sample post | `blog-pipeline\samples\sample-post.md` | done |
| Scripts: check_intake, check_done, join, find_in_rig, counts, lint, validate, scan, plus `banned.txt`, `deny-local.txt` and a README | `blog-pipeline\scripts\` | done |
| Dictations folder | `blog-pipeline\dictations\README.md` | done. No dictation ever landed. |
| Spec (marked retired) | `blog-pipeline\SPEC.md` | done |
| Test dictation T-01 and its test post | none | planned only. Never run. |

## How far along

Retired. As tooling it's 100%: S-D5 drafted all three entries with it. "Done" means the kit works for whoever writes the next entry.

## What's left for Alex

1. **Humanizer plugin, yes or no** (quick), for the edit stage. The records say it waits for the morning. It's optional, and nothing else here needs him.

## What's left for an assistant

1. Nothing is required.
2. If a stage's output is wrong, fix its prompt, bump the version and rerun from that stage. Where: `PIPELINE.md`, top.
3. Optional: fix the stale text below.

## Open questions and risks

- **Stale text.**
  - `CLAUDE.md` still describes an active `s-d4-blog-pipeline` session.
  - `PIPELINE.md` §4 still has the old `/blog` template request, but the site uses `/demos`.
  - `PIPELINE.md` §5 describes a gate approval, which v1 replaced with Docs.
- **The records disagree on what goes public.** `dictations\README.md` and an early SPEC decision say raw dictations and drafts get committed to the public repo. S-D5's later rule keeps rig-transcript text in git-ignored `local\` folders. The later rule is the one in use.
- **Clock.** The v1 line in `PIPELINE.md` says "~19:30", but it was committed at 18:42.

## Sources

- `blog-pipeline\CLAUDE.md`, `SPEC.md` (header, spec contract, DoD, decision log), `PIPELINE.md`, `POST-FORMAT.md` (header and outline), `dictations\README.md`, `scripts\README.md`, folder listing
- `..\CHARTER.md`: the D4 row, DoD-14, the S-D4 outline row; `..\SESSIONS.md` (the s-d4 row)
- `..\blog-articles\SPEC.md` §9 and `HANDOFF.md`; grep of other folders for POST-FORMAT and blog-pipeline references
- Commits: bacedbd, d3896eb, 1fa2ca5, 0832ebb, d12fa66, d50c22f, 71061a5, 87a7484, 5cb785a, e867386, and `git log` for the folder
