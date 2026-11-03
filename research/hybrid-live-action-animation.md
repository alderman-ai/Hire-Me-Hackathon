# Hybrid live action + animation: measured from real videos

Scope cut by orchestration: 2 usable videos, first 90 s each, 360-480p downloads, ffmpeg scene detection (threshold 0.3), contact sheets at 1 frame per 2 s, and corner-luma classification for the Ali Abdaal video. Everything marked MEASURED comes from those files. Everything marked EYEBALLED is read off the contact sheets (+/- 2 s, +/- 2% of frame height). Nothing here is quoted from a vendor or an editor.

## What was and wasn't measured

- Downloaded and measured: Johnny Harris, Ali Abdaal. A third download (Theoretically Media) succeeded but is a pure AI-generated short film with no presenter and no hybrid structure, so it is excluded.
- Colin and Samir: download failed (YouTube 429 and ffmpeg abort). Dan Koe, Vox: not attempted for time.
- NOT measured: audio. The auto-subtitle download was rate-limited (HTTP 429), so "voice continues under the insert" is inferred from the presenter being visible or from the cut pattern, not from the track. Treat it as unverified.
- Scene detection only catches hard cuts. Ali Abdaal's animated segments are continuous motion without hard cuts, so his insert lengths come from corner brightness (light cream card = graphic, dark = camera), sampled at 2 per second.

## Video 1: Johnny Harris, "The REAL reason China built so much"

URL: https://www.youtube.com/watch?v=axRhjqd-rus (first 90 s; full length about 50 min)

| Metric | Value | Basis |
| --- | --- | --- |
| Hard cuts in 90 s | 56 | MEASURED |
| Median shot length | 1.17 s (max 6.4 s) | MEASURED |
| 0-36 s (cold open) | Dense cutting, median ~1.2 s, top-down and over-the-shoulder camera plus two framed video-call tiles | EYEBALLED |
| 36-84 s | Alternates between the creator seated in a dark den (A-roll, 3-6 s stretches) and found footage: vertical TikTok-style clips blown up over a blurred copy of themselves as background, each 0.7-1.7 s | MEASURED cuts, EYEBALLED labels |
| Closing 86-90 s | White full-frame screenshot card of an article headline, centred, no presenter | MEASURED frame |
| Insert type | Found vertical social video (not animation) and a flat screenshot card | EYEBALLED |
| Insert transition | Hard cut on both sides; none of the sheet frames shows a wipe | MEASURED cuts |
| Headline card text | Bold sans, cap height about 6% of frame height, card about 60% of frame width, centred, deck line under it about 2% height, 1 short title (7 words) | EYEBALLED on frame at 87 s |
| Burned-in text on found clips | Small captions, about 3-4% of frame height, bottom third | EYEBALLED |
| Voice under inserts | Unverified (no audio checked) | NOT MEASURED |

## Video 2: Ali Abdaal, "How to Learn So Fast People Assume You're Naturally Gifted (with AI)"

URL: https://www.youtube.com/watch?v=szVXpM7VVMg (first 90 s; full length about 29 min)

| Metric | Value | Basis |
| --- | --- | --- |
| Hard cuts in 90 s | 11 (median segment 5.2 s) | MEASURED |
| Graphic (animated card) segments | 5: 10.0 s, 10.5 s, 5.0 s, 5.5 s, 13.5 s (last one runs to the end of the clip, so it is a lower bound) | MEASURED (corner luma) |
| A-roll stretches | 1.5 s (hook), 12.0 s, 7.0 s, 4.0 s, 21.0 s | MEASURED |
| Graphic share of first 90 s | about 49% (44.5 s) | MEASURED |
| Time to first graphic | 1.5 s | MEASURED |
| Insert type | Light cream card with a flat 2D motion-graphic diagram: progress-line path, icon pairs, a calendar grid, a device-diagram that builds step by step | EYEBALLED |
| Presenter during inserts | Stays on screen as a small rounded picture-in-picture at the right edge, about 30% of frame height, body-sized, gesturing | EYEBALLED |
| Insert transition | The camera frame shrinks into the PiP and the card slides in under it, no hard cut; some segments are a plain cut to a full-screen card | EYEBALLED |
| On-camera text | A pill label ("Learning") about 12-14% of frame height box with text cap about 6%, lower-left; large serif lower-third ("The World's Best") about 12% height, lower-left, partially faded | EYEBALLED |
| Card text | 1-3 words per label, 3-5% of frame height; tip title card "Think of AI as Your Personal Tutor" is the largest card element at about 5% | EYEBALLED |
| Voice under inserts | Presenter stays visible and gesturing in the PiP, so the voice evidently continues, audio not checked | NOT MEASURED |

## Cross-video summary (n = 2, small sample, treat as evidence, not statistics)

| Metric | Johnny Harris | Ali Abdaal |
| --- | --- | --- |
| Cuts per 90 s | 56 | 11 |
| Median shot | 1.17 s | 5.2 s |
| Insert run length | 0.7-1.7 s per found clip, one 4 s card | 5-13.5 s, median about 10 s |
| Share of insert time in first 90 s | majority after 36 s | about 49% |
| Cut away from the creator | every 1-4 s | every 5-20 s |
| Transition | hard cut | shrink to PiP, or hard cut |
| Largest text | about 6% of frame height | about 12% (lower-third), 5% on cards |

## Rules, measured

1. **Two distinct hybrid styles exist; pick one per piece.** Johnny Harris runs a cut every 1.2 s with live/found footage; Ali Abdaal runs animated cards of 5-13 s with the presenter kept on screen. Do not mix cadences within one piece. (both videos)
2. **Animated inserts run 5-13 s when they carry an idea (diagram that builds), 1-2 s when they are found footage as evidence.** The longer ones always build in steps, nothing sits static. (Ali Abdaal; Johnny Harris for the short end)
3. **Keep the presenter visible during a long animated insert.** All five long inserts in the Ali Abdaal clip hold him in a small PiP at the right edge, about 30% of frame height. This preserves the voice-to-face link. (Ali Abdaal)
4. **Open with the presenter for under 2 s, then go to graphics.** The first graphic arrives at 1.5 s. (Ali Abdaal). Johnny Harris opens with a staged cold open instead; time to first hard cut was 0.9 s. (Johnny Harris)
5. **Return to the creator for 4-21 s between inserts.** A-roll stretches measured 4, 7, 12, 21 s in Ali Abdaal. Nothing under 4 s except the hook. (Ali Abdaal)
6. **Text sizes seen:** one headline card at about 6% of frame height, centred, one short line; on-camera lower-third labels at 6-12% box height in the lower-left; diagram labels at 3-5%. Numbers are EYEBALLED. (both)
7. **Transitions between camera and graphic are mostly hard cuts or a frame-shrink into PiP; no wipes or whips appeared in either sample.** (both)

## Flags

Voice-under-insert, whip/wipe transitions and parallax-photo or generated-footage inserts were not observed in these two videos, so there is no evidence for or against them. Sample is 90 s of 2 videos; a Colin and Samir, Dan Koe or Vox pass would be needed to widen it. Local files: `C:\Users\alder\.claude\jobs\50d431f4\tmp\creators\` (contact sheets `JH_sheet.png`, `AA_sheet.png`).
