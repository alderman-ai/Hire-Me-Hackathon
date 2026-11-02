# Answer desk queue

Every question received, in arrival order. Statuses: open, checking, answered, skipped, withdrawn, replaced, returned.

## website-Q1 — answered
From: website (uds:\.\pipe\LOCAL\cc-msg-a20244c812745d4843b7f744587f9bdb)
Received: 2026-11-02 12:52 CET (+01:00)
Desk takeover 13:00 CET: CHECK website-Q1 sent to website.
13:01 CET: CURRENT website-Q1 received; shown to Alex.
13:02 CET: new desk took over; shown again (confirmed current at 13:01).
13:04 CET: answered; recorded in qa\website.md and sent to website.

```
ASK website-Q1
Critical: no
Deadline: 13:15

## website-Q1 — What did "Let's have Video Session" mean?

**The question:** When you asked for the S02 webcam and summary on the site, you added "Let's have Video Session." What should change on the page?

**Context you need.** The live site now shows: the title "The Hire Me Hackathon Begins", the countdown, the S02 webcam video (starting at 62 s, just after "hey Claude, starting now"), then an H1 headline and four summary paragraphs. There is no label on the video. Your full line was: "The new video basically replaces the first one. Let's have Video Session."

**Options.**
- (a) Add a label above the video, e.g. "Video Session 2". Say the exact wording.
- (b) It was a dictation slip; change nothing. (Recommended: the page already does what the rest of the message asked.)
- (c) Something else — say what.

**If unanswered by the deadline:** leave the page as it is, with no label.

**Affects:** only the text above the video on the live site.
```

## website-Q2 — returned
From: website (uds:\.\pipe\LOCAL\cc-msg-a20244c812745d4843b7f744587f9bdb)
Received: 2026-11-02 12:52 CET (+01:00)
Desk takeover 13:00 CET: returned under the one-question rule (website-Q1 still open).

```
ASK website-Q2
Critical: no
Deadline: 13:15

## website-Q2 — Is the lip sync right in the site's S02 video?

**The question:** When you play the S02 video on the site, do your lips match your voice?

**Context you need.** The site's video is the webcam recording, with its sound from the Wave:3 mic and its picture from the BRIO camera, joined without re-encoding. Nobody has checked whether they line up. The live page is https://hire-me-hackathon.vercel.app; the first 30 seconds of play are enough to tell.

**Options.**
- (a) In sync: nothing to do.
- (b) Out of sync: say roughly how far, and whether the voice is early or late. I'll shift the audio and upload again (new YouTube video, about 10 minutes).
- (c) Something else — say what.

**If unanswered by the deadline:** assume it's in sync and leave the video as it is.

**Affects:** the S02 video now, and every later webcam upload, which use the same two devices.
```

## website-Q2 — answered
From: website (uds:\.\pipe\LOCAL\cc-msg-a20244c812745d4843b7f744587f9bdb)
Received: 2026-11-02 13:05 CET (+01:00)
Resent after website-Q1 was answered; shown to Alex.
13:06 CET: Alex asked for more time; nothing sent.
13:19 CET: WITHDRAW website-Q2 received (deadline reached); noted in qa\website.md.
13:19 CET: Alex answered after the withdrawal; recorded in qa\website.md and sent to website.

```
ASK website-Q2
Critical: no
Deadline: 13:19

## website-Q2 — Is the lip sync right in the site's S02 video?

**The question:** When you play the S02 video on the site, do your lips match your voice?

**Context you need.** The site's video is the webcam recording: sound from the Wave:3 mic, picture from the BRIO camera, joined without re-encoding. Nobody has checked whether they line up. The live page is https://hire-me-hackathon.vercel.app, and the first 30 seconds of play are enough to tell. (website-Q1 is settled: no label on the video, the page stays as it is.)

**Options.**
- (a) In sync: nothing to do.
- (b) Out of sync: say roughly how far, and whether the voice is early or late. I'll shift the audio and upload again (new YouTube video, about 10 minutes).
- (c) Something else — say what.

**If unanswered by the deadline:** assume it's in sync and leave the video as it is.

**Affects:** the S02 video now, and every later webcam upload, which use the same two devices.
```

## S0-Q1 — answered
From: s0-bootstrap (uds:\.\pipe\LOCAL\cc-msg-71c4ea7ee2b90dfeb9a9aa325e036669)
Received: 2026-11-02 13:42 CET (+01:00)
13:42 CET: shown to Alex.
13:43 CET: answered; recorded in qa\S0.md and sent to s0-bootstrap.

```
ASK S0-Q1
Critical: no
Deadline: 18:00 Prague

## S0-Q1 — Move `_templates\` into `orchestration\`?

**The question:** Should the root folder `_templates\` move to `orchestration\_templates\`, as DI-4 Q4.1 set out?

**Context you need.** In DI-4 Q4.1 you said the orchestration session stays at the root, and root files only it uses go into `orchestration\`. You also said moves are hard to undo and you dislike renames once they're pushed, so nothing moves until you approve. S0 checked the whole root at 13:41. Only one thing qualifies:

| Now at the root | Moves to |
| --- | --- |
| `_templates\` (Decision intake template.md, Operator task template.md, Operator inbox.base) | `orchestration\_templates\`, same folder name |

- **What changes with it:** one line each in `orchestration\SPEC.md`, the root `CLAUDE.md` and `SESSIONS.md`, all orchestration's own files. The script also drops the `_templates` exclusion from every folder's settings when it reruns. `orchestration` makes the move and the edits, not S0.
- **Your Obsidian inbox view keeps working.** It filters on `Operator tasks` from the vault root, so you just open it from its new place. No `.obsidian\` setting names `_templates`, and the Templates plugin has no folder set.
- **Stays at the root:** CHARTER.md, GIT.md, CLAUDE.md, SESSIONS.md, .gitignore, .claude\, .obsidian\ and Operator tasks\ (the inbox view lists that folder by path).
- **Never moves:** OBS\, website\, answer-desk\, watcher\, Addvery Research\ and every spec folder.
- The folders haven't been pushed with this layout yet, so it's cheapest to do now.

**Options.**
- (a) Move as shown. One folder moves, and orchestration updates three lines.
- (b) Move with changes you name.
- (c) Move nothing. `_templates\` stays at the root, and the root keeps one folder only orchestration uses.
- (d) Something else: say what.
Recommended: (a). It does exactly what you asked for in DI-4, and the move touches only orchestration's own files.

**If unanswered by the deadline:** (c), move nothing. Before 18:00 S0 only pokes and doesn't decide. S0 carries on scaffolding in the meantime, since nothing else depends on this.
```

## rig-Q1 — withdrawn
From: rig (uds:\.\pipe\LOCAL\cc-msg-13e39e86966344b52a59fed1b38a570f)
Received: 2026-11-02 13:43 CET (+01:00)
13:43 CET: shown to Alex.
13:47 CET: WITHDRAW rig-Q1 received (rig says Alex answered it in the rig chat); noted in qa\rig.md.

```
ASK rig-Q1
Critical: no
Deadline: 13:58

## rig-Q1 — Add the charter to the rig's CLAUDE.md?

**The question:** Should rig add a line pointing to CHARTER.md to its own CLAUDE.md, as s0-bootstrap asked?

**Context you need.** s0-bootstrap (charter spec S0, step 6) audited every folder's CLAUDE.md. It found that OBS\CLAUDE.md lists GIT.md, ASKING.md, qa\rig.md and SESSIONS.md in its boot reading but not the charter. It asked rig to add this line first in that list, by path and not imported with @: "`..\CHARTER.md`: the parent context of the whole project. Never edit it." Then rig would commit OBS\ per GIT.md. Rig doesn't change its own instructions just because another session asked. That's why the answer-desk line went through you earlier, and orchestration made that edit. S07 is recording now, so whatever you decide, the edit happens only after /stop.

**Options.**
- (a) Yes, rig adds the line after S07 stops and commits OBS\. It's a one-line pointer, and it matches what S0 is doing in every folder.
- (b) Orchestration makes the edit instead, the way it added the answer-desk line.
- (c) Leave OBS\CLAUDE.md as it is.
- (d) Something else — say what.
Recommendation: (a). It's a harmless reading pointer, and S0's audit wants it in every folder.

**If unanswered by the deadline:** before 18:00, rig pokes and keeps waiting. From 18:00, rig leaves OBS\CLAUDE.md unchanged.
```

