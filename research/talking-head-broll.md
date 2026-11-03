# Talking head + B-roll, and AI B-roll that looks professional

Research note, 3 Nov 2026. Honest caveat up front: the web sources I could reach are mostly tool-vendor blogs. None gives measured shot lengths or A-roll/B-roll ratios for named creators. Items marked (convention) are standard editing practice that I am stating from general craft knowledge; no source I fetched backs them with numbers. Treat them as defaults to tune by eye, not facts.

## 1. Who does it best, what the edit looks like
- Ali Abdaal: Adobe reports ~30 h of editing per video, of which ~8 h is only finding or shooting the best B-roll, ~6 h titles and motion graphics, ~4 h music and sound. B-roll is the biggest single labour item. Look is described (vendor copy, unverified) as desaturated with selective yellow pops, calm pacing. https://blog.adobe.com/en/publish/2024/09/05/how-ai-helps-ali-abdaal-save-hours-every-week and https://www.choppity.com/tools/recreate-video-editing-style/ali-abdaal/
- Johnny Harris / Vox style: textured overlays, film burns, light leaks, noise and grain on graphics and photos; physical props in the talking-head shots. https://blog.motionarray.com/learn/premiere-pro/edit-documentary-in-premiere-pro/ and https://rndr.beehiiv.com/p/5-visuals-next-video-ead0
- Takeaway: the pro look is one coherent texture and grade across everything, not fancy clips.

## 2. A-roll / B-roll cadence
- No source gives hard numbers. Async explicitly says there is "no fixed ratio" and warns that cutting to something new every few seconds just to follow a rule makes a video feel busy. Use B-roll for strong claims, processes, hard-to-picture ideas, and to cover clunky cuts; skip it for simple statements and moments where the speaker's face is the point. https://async.com/blog/what-is-b-roll/
- (convention) Talking-head stretches of 4-8 s on short-form, 8-15 s on long-form; B-roll shots 2-5 s; B-roll covering roughly 30-50% of runtime. Tune by eye.

## 3. Voice under B-roll, J/L-cuts, punch-ins
- L-cut: the speaker's audio continues while the picture changes to B-roll; this is the core technique for B-roll over a voice. J-cut: next shot's audio arrives early, useful to bridge B-roll back to the speaker. B-roll is also the standard way to hide jump cuts. https://www.epidemicsound.com/blog/j-cuts-and-l-cuts/ , https://cutback.video/blog/jump-cut-vs-j-cut-vs-l-cut-whats-the-difference , https://blitzcutai.com/blog/hard-cut-vs-j-cut-vs-l-cut
- (convention) Voice track never stops; picture changes 0.2-0.5 s before or after the voice. Punch-in 100% to 110-115% on alternate jump cuts to disguise the edit.

## 4. Hook in the first 3 s
- Not covered by fetched sources. (convention) Open on the speaker's strongest claim or a tension line, mid-sentence energy, no logo or greeting; add one on-screen keyword and a first B-roll cut by ~2-3 s.

## 5. What makes AI B-roll look professional
- Pick one look and name it in every prompt (subject, style, camera, mood, pace); generate 2-4 variants, pick best. https://ulazai.com/ai-cinematic-b-roll/
- Prompts that give lighting angle, subject placement, camera distance and brightness work best on Veo. https://www.kapwing.com/ai/models/veo?
- (convention) Style bible: palette, lens, lighting, grain; grade B-roll to match the talking head; one camera move per shot (slow push-in, dolly, orbit); 4-6 s shots; avoid text, readable UI, hands and faces from the model; motivated light, light film grain, optional letterbox.

## 6. On-screen text (1080x1920 figures from vendor blogs, not platform specs)
- Safe zone about 900x1400 px centred; bottom 300-450 px reserved for platform UI. Caption font 60-80 px (75-95 px for punchy kinetic), 55-65 px for full sentences. 3-5 words per chunk, max 2 lines, animate only 1-2 emphasised words. https://blitzcutai.com/blog/best-caption-size-youtube-shorts-2026 , https://reap.video/blog/short-form-video-safe-zones , https://blitzcutai.com/blog/best-caption-placement-short-form-video
- For 1920x1080 (convention): body captions ~48-64 px, keyword pop-ups 90-140 px, 5% margins, never over the speaker's mouth, one text element at a time.

## 7. Models
- Veo 3.1: realism, 8 s clips, native audio, first/last-frame support. Kling 3.0: longer (up to 15 s), multi-shot, scene continuity. Seedance 2.0: best when building from your own assets (up to 9 images, 3 videos, 3 audio refs). https://www.3daistudio.com/blog/best-ai-video-generator-2026 , https://www.kapwing.com/resources/seedance-vs-veo-vs-kling-text-to-video-comparison-2026
- Sources conclude no single model wins everything: pick a reference frame per shot, then match model to job.
- Why image-to-video: the still fixes composition, palette and subject, so every clip starts from your style bible instead of the model's random look. Generate stills in one image model, animate in another. https://www.kapwing.com/resources/seedance-vs-veo-vs-kling-text-to-video-comparison-2026

## 8. Blueprint, 75 s thesis video (convention, built from the above)
| t | Picture | Audio |
|---|---|---|
| 0-4 | Speaker, punch-in, keyword pop-up | Hook claim |
| 4-9 | B-roll 1 (L-cut) | Speaker continues |
| 9-17 | Speaker | Problem |
| 17-25 | B-roll 2 and 3, 4 s each | Speaker continues |
| 25-37 | Speaker, punch-in on cut | Thesis |
| 37-47 | B-roll 4, 5 | Speaker continues |
| 47-60 | Speaker | Proof / example |
| 60-68 | B-roll 6 (J-cut back) | Speaker line starts early |
| 68-75 | Speaker, then end card | Call to action |

## The 5 rules we follow
1. The speaker's voice never stops; B-roll goes under it with L-cuts and returns with J-cuts. Source: Epidemic Sound / Cutback J-L-cut guides.
2. Cut to B-roll only when it shows something the line claims or hides an edit; do not cut on a timer. Source: Async B-roll guide.
3. One style bible and one grade across all B-roll and the talking head, with grain and texture to glue it. Source: Motion Array on Johnny Harris; ulazai prompt structure.
4. Generate B-roll image-to-video from a styled still, 4-6 s, one slow camera move, no text, hands or faces. Source: Kapwing / 3daistudio model comparisons (stills as reference frames); the rest is convention.
5. Captions stay in the safe zone, 3-5 words, max two lines, one or two emphasised words. Source: blitzcutai caption guides, reap.video safe zones.
