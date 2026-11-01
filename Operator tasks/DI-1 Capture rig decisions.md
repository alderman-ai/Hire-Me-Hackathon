---
System Primitive: Intake file
Intake State: Answered
Intake id: DI-1
Created: 2026-11-01
Build goals: []
---

# Decision intake 1

This intake holds 10 decisions for the capture rig. Each question carries its own context, so you can answer them in any order. An empty fence means not answered, and the rig then uses the default named in that question. Say "DI-1 is ready" when you're done.

Four of the spec's open questions are already settled, so they aren't below:

- **Spec Q1, the D: drive:** a 2 TB Seagate hard disk, not an SSD, with 1,158.6 GB free.
- **Spec Q4, the main monitor:** your leftmost monitor, 1920x1080, with the webcam on top. The 4K monitor isn't recorded.
- **Spec Q7, dictation:** Wispr Flow.
- **Spec Q8, memory:** the RTX 3060 is the 12 GB card, and the PC has 32 GB of RAM.

# Q1.1 Free up space on C: (new)

C: has 32.6 GB free out of 464.5 GB. It's the system drive, and the spec puts everything except raw video there.

The rig will use up to about 21 GB of that (estimates): about 6 GB for the transcription tools and model, up to 9 GB for 12 hours of audio, and up to 6 GB for clips. That leaves about 11 GB for the hackathon itself: ComfyUI renders, website builds and the Windows page file. The page file grows on C: when memory runs short, which is exactly when ComfyUI is pushing the machine hardest. If C: fills up, OBS, ComfyUI and possibly Windows can crash.

The largest things that are easy to clear:

| Item | Location | Size |
| --- | --- | --- |
| Path of Exile | `C:\Program Files (x86)\Grinding Gear Games` | 68.6 GB |
| Steam | `C:\Program Files (x86)\Steam` | 23.4 GB |
| Camtasia library | `C:\ProgramData\TechSmith` | 16.4 GB |

Your options:

- **A. Uninstall Path of Exile.** Leaves about 100 GB free. Takes a few minutes, plus a re-download if you want it back.
- **B. Move Path of Exile and Steam to D:.** Leaves about 125 GB free and keeps both installed. Takes about 20 minutes of background copying (estimate), and the Path of Exile shortcut needs updating.
- **C. Leave C: as it is.** Costs nothing now and leaves about 11 GB of margin on hackathon day. This is the default, so nothing is removed without your say-so.

I recommend A, because it's the quickest way to a safe margin. If you still play it, choose B. Whichever you pick, I'm adding a C: check to preflight, because the spec only checks D:. It warns under 20 GB free and blocks /start under 10 GB.

Write A, B or C.

## A1.1

`<operator_answer>`
```a-1-1
A. Answered in chat on 2026-11-01: uninstall Path of Exile and all related tools.
```
`</operator_answer>`

# Q1.2 Webcam (spec Q3)

Your BRIO 4K webcam is connected and sits on top of the main monitor, so you'd be looking close to the lens while you work. A face makes the supercuts far less screen-only, which matters on a site meant to get you hired. The costs are extra GPU and CPU load while ComfyUI is running, and 12 hours on camera in videos anyone with the link can open.

Your options:

- **A. No camera.** The default. No added load and nothing extra to manage, but the supercuts stay screen-only.
- **B. Corner overlay in the screen recording.** A small webcam box, about 4% of the frame, burned into the video. It stays one file on one timeline, with no extra steps for you. It can't be removed later, and it covers a corner of your screen.
- **C. Separate webcam file.** Your face can be shown, hidden or resized in the edit. It adds a second recording to keep running, protect from crashes and keep in sync, so there's more load and more that can fail.

I recommend B, tested in Task 4 with ComfyUI running. If it pushes the recording over the spec's limit of "under 1% skipped or dropped frames", the rig falls back to no camera. B gets your face into the supercuts without adding anything new that can break.

Write A, B or C.

## A1.2

`<operator_answer>`
```a-1-2
c
```
`</operator_answer>`

# Q1.3 YouTube channel (spec Q9)

Every session video uploads to one YouTube channel as unlisted. Unlisted videos don't appear on the channel page or in search, but anyone with the link can watch them. The video page still shows the channel's name, so anyone opening a quote link from the site sees it.

You sign in once with that channel's Google account. The account has to be phone-verified, because videos over 15 minutes need it.

Your options:

- **Main channel.** The default. Nothing new to set up.
- **A different channel.** Keeps the raw footage apart from your main channel. It takes a few minutes to set up and may need its own phone verification.

I recommend your main channel, as long as its name is one you'd want a hiring manager to see.

Write "main", or the name of the channel to use.

## A1.3

`<operator_answer>`
```a-1-3
main
```
`</operator_answer>`

# Q1.4 Default session length (spec Q6)

Sessions can run from 60 to 90 minutes. This sets what a plain /start does. Typing `/start 60` or `/start 90` still changes any single session.

| Length | Sessions for 12 hours | 15-minute breaks | Whole day |
| --- | --- | --- | --- |
| 60 minutes | 12 | 2 h 45 | 14 h 45 |
| 75 minutes | 10 | 2 h 15 | 14 h 15 |
| 90 minutes | 8 | 1 h 45 | 13 h 45 |

Shorter sessions give you more rest but break your flow more often. Longer sessions do the opposite, and each one takes longer to transcribe in its break.

I recommend 75 minutes, the default. Task 8 picks the transcription model so that a 75-minute session finishes inside a 15-minute break.

Write a number from 60 to 90.

## A1.4

`<operator_answer>`
```a-1-4
I control when sessions end with pause and stop. and when the start with stop. they will be around 1-1.5 hours each, and none of the timing needs to be strict or perfect.
```
`</operator_answer>`

# Q1.5 Record only, or also livestream (spec Q2)

The spec records locally only, though the original brain dump said "streaming". Bandwidth isn't the problem: upload measured about 336 Mbps on one short test.

The real cost is exposure. Everything on your main monitor would go out live, with no chance to catch an API key or a client's name first. Streaming also adds a second encoding job while ComfyUI is using the GPU, needs a platform set up, and goes down with OBS if it crashes. Recording alone gives you the same footage for the site.

I recommend record only, the default.

Write "record only", or "stream" and the platform.

## A1.5

`<operator_answer>`
```a-1-5
if possibble would love to livestream on the website as it gets built out
Superseded in chat on 2026-11-01: no live streaming. Record only.
```
`</operator_answer>`

# Q1.6 Should /pause stop the session timer (spec Q11)

/pause always stops the recording and the backup audio. This decides whether the session countdown stops too.

- **Pause the timer.** The default. A session is always its full length of recording, and a 10-minute interruption moves the end 10 minutes later.
- **Keep it running.** Sessions end at their planned time, and any interruption comes out of that session's recorded time.

I recommend pausing the timer, so interruptions don't eat into the 12 recorded hours.

Write "pause" or "keep running".

## A1.6

`<operator_answer>`
```a-1-6
pausing session timer. and to be clear 12 hours is a rough estimate, it's not a hard cutoff
```
`</operator_answer>`

# Q1.7 Should /process run by itself (spec Q12)

/process joins a finished session's video, transcribes it on the GPU, uploads it and files everything away.

- **Only when you type it.** The default. You choose a moment when ComfyUI isn't using the GPU. It's one more command each break, but if you forget, the next run catches up.
- **Automatically after each session.** One less command. It takes the GPU the moment a session ends, so it can collide with a ComfyUI job you left running.

I recommend typing it. Memory pressure is this machine's main risk, and you're the one who knows when the GPU is free.

Write "typed" or "automatic".

## A1.7

`<operator_answer>`
```a-1-7
typed
```
`</operator_answer>`

# Q1.8 Keep local videos after upload (spec Q10)

Once YouTube confirms a session video, the local copy moves to `D:\OBS Outputs\Uploaded\`. At 1080p, the full 12 hours comes to about 72 GB (estimate), and D: has 1,158.6 GB free.

Keeping the copies lets find-clip cut frame-accurate clips locally, at the original quality. YouTube's copy is recompressed. Deleting them would free space D: doesn't need.

I recommend keeping them until the supercuts are finished, the default. You can delete them any time after that.

Write "keep" or "delete".

## A1.8

`<operator_answer>`
```a-1-8
keep
```
`</operator_answer>`

# Q1.9 Extra marker hotkeys (spec Q5)

Hotkeys drop a timestamped marker while you work. There are five so far: highlight, RevOps, Sales, Marketing and CEO. They're optional, because the transcripts alone must be enough to find every clip.

The site will have a page per stakeholder: "RevOps, Sales, Marketing, CEO and others". You could add a key for each of the others, but every extra key is one more thing to remember on a day with no spare attention.

I recommend keeping the five, the default.

Write "none", or the extra stakeholder names separated by commas.

## A1.9

`<operator_answer>`
```a-1-9
hotkeys? if you mean I need to press 1 of 5 buttons when I talk about sales, I'm not doing that. finds and sorting clips and messaging by stakeholder is the assistants job. RevOps, CSO, CMO, CEO, CTO, CAIO, COO
```
`</operator_answer>`

# Q1.10 Clip padding (spec Q13)

The clip finder adds padding to both ends of each clip, so there's room to trim in the edit. More padding means slightly longer clips and nothing else. You can cut any clip again with different padding later, so this isn't a one-way choice.

I recommend 3 seconds on each side, the default.

Write the number of seconds.

## A1.10

`<operator_answer>`
```a-1-10
3 as default, can change later if needed
```
`</operator_answer>`
