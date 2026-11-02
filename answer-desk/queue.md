# Answer desk queue

Every question received, in arrival order. Statuses: open, checking, answered, skipped, withdrawn, replaced, returned.

## website-Q1 — open
From: website (uds:\.\pipe\LOCAL\cc-msg-a20244c812745d4843b7f744587f9bdb)
Received: 2026-11-02 12:52 CET (+01:00)
Desk takeover 13:00 CET: CHECK website-Q1 sent to website.
13:01 CET: CURRENT website-Q1 received; shown to Alex.
13:02 CET: new desk took over; shown again (confirmed current at 13:01).

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

