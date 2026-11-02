# Do: film yourself designing in Canva

<!-- Scene brief, draft. This is the body of the operator task `Do - film yourself designing in Canva.md` (run step 4 in SPEC.md): front matter from the operator task template, then everything from "What this is" down to "When you are done". The last section, "Draft notes", stays here and is not copied. Fill every <placeholder> first. No codes in the copied part: no spec, DoD or OT ids, no session names. -->

## What this is

The site you're building today is a personalised job application to Addvery, made live during a recorded 12-hour hackathon. One part of it is a short video of you designing in Canva: you fill one of the Addvery LinkedIn templates made earlier today with a post's copy, then export it. It shows Addvery's marketing side that the templates hold up in a person's hands, and that you can do the design work yourself, not only automate it. The video goes on YouTube, unlisted, and gets its own section on the site.

You're asked to film that scene at **<slot>**, in your normal recorded rig session (type `/start` first if you're between sessions). It takes about 5 minutes of setup with the recording paused, then 10 to 12 minutes on camera, never more than 15, because YouTube caps unverified channels at 15 minutes. Once you've said the closing line, nothing more is needed from you: the clip waits until you `/stop` and `/process` that session, as usual, and is then cut, checked frame by frame for anything private, and put on the site.

What's waiting on it: the video's section on the site. Deadline: the slot itself.

**The scene in one look**

| | |
| --- | --- |
| When | <slot>; start the setup at <slot minus 5 minutes> |
| What | <template> from the Addvery templates, filled with <copy>, then exported |
| Where | The left monitor only, the one being recorded. Everything else on the 4K monitor |
| Length | 10 to 12 minutes of designing, never over 15 |
| Say at the start | "Canva design starts now" |
| Say at the end | "Canva design done" |

Your Canva account holds other clients' work, and Canva shows it in more places than the home page. Steps 1 and 2 keep it off camera. The frame-by-frame check before upload is the backstop, not the plan.

## Step 1. Get the screen ready, with the recording paused

About 5 minutes. Type `/pause` first (or do all of this before `/start`).

1. **Notifications off.** `Win+N`, then Do not disturb. A pop-up from email or chat can carry a client's name.
2. **Clear the left monitor.** Move everything except one Chrome window to the 4K monitor: terminals, Obsidian, this task, email, and any Chrome window the assistants are working in.
3. **One clean Chrome window for the scene,** with no other tabs open.
4. **Clear Chrome's download list:** open `chrome://downloads` and click Clear all. The files stay on disk. After you export, Chrome pops up a list of recent downloads, and older ones could show a client's file name.
5. **Downloads save without asking:** in Chrome, Settings, then Downloads, check that "Ask where to save each file before downloading" is off. If it's on, a save dialog showing a folder's files appears on camera when you export.
6. **Your own Canva account,** not a client's team. If you belong to more than one Canva team, switch to your own before you open the design.
7. **Open the design by its link,** not from Canva's home or projects: the link is in `canva-video\local\link.md`, a local file kept out of git. It opens straight into the editor.
8. **Check the brand sections once.** Click any text box, then open the colour picker, the font list and the Text tab on the left. Each can show a brand kit by name, with its colours and fonts. If any shows another client's kit, switch the selector to Addvery's, or plan not to open that panel on camera. Close them again.
9. **The title at the top** is on screen the whole time: make sure it names only Addvery or the template.
10. **Find Download:** check that the File menu at the top left has Download. If it does, you can export without the Share panel, which lists who has access.
11. **Close the left side panel** if one is open, so the scene starts on the design itself.
12. **Have the copy ready on the 4K monitor:** <where the copy is>. Copy and paste from there. Don't open Windows' clipboard history (`Win+V`): it shows past clips.
13. **Full screen:** press `F11` in Chrome. It hides the tabs, the address bar with the design's link, the bookmarks bar and the extension icons.
14. Type `/pause` again to resume the recording.

## Step 2. Design on camera

1. Say **"Canva design starts now"**.
2. Say what you're about to make, in one sentence of your own, before you start. The first few seconds carry most of a video's viewing, so the outcome goes first. After that, talk as you go only if it comes naturally.
3. **Work only inside this design.** Type and paste into the text slots, move, resize and align, duplicate or delete pages. <If the carousel: fill three or four pages and delete the rest, so it fits the time.>
4. **Stay out of these on camera.** They list things from across your whole account:
   - the **Projects**, **Uploads** and **Brand** tabs in the left panel;
   - Canva's home page (the Canva logo or the back arrow at the top left);
   - the **Share** panel (it lists who has access);
   - your profile menu at the top right (it lists your teams);
   - any file picker or Explorer window.
5. **Need an image, a logo or anything from those panels?** Type `/pause`, do it, then type `/pause` again. Paused time never reaches the video. Otherwise use only the logo and images already in the template.
6. **No real person** in the design: no name and no photo of anyone. The copy is chosen so it names no one.
7. **Canva AI** won't fill the locked slots. Try it off camera first if you want it in the scene.
8. **Export** through the File menu: Download, then <PNG, quality High, size 1x | for a carousel: PDF Standard, with Flatten PDF on>. If Canva shows an upgrade prompt when you change the quality, keep the defaults. Don't open the downloaded file on camera. Finish on the design in Canva: zoom out so every page is in view.
9. Say **"Canva design done"**.

**If something goes wrong**
- **Something private shows for a moment:** carry on. Write down roughly when, in Step 4. The check before upload blurs or cuts it.
- **A secret shows (a key, a password):** type `/pause` at once and say so in Step 4.
- **You want a retake:** say "Canva design starts now" again and start over. The cut runs from the last start line to "Canva design done".
- **Running long:** past 12 minutes, wrap up. The cut trims waiting and exporting, and never changes the order.

## Step 3. After the scene

1. Press `F11` to leave full screen. Turn Do not disturb off if you like.
2. Carry on with the rig session as usual. The clip waits until you `/stop` and `/process` it. Nothing about that changes.

## Step 4. Report

Write roughly when you said each line, and anything that went wrong or showed on screen that shouldn't have. "All fine" is enough.

`<operator_answer>`
```ot-<nn>-s4

```
`</operator_answer>`

## When you are done

Say "OT-<nn> done". The assistant waits for the session to be filed, asks for the clip between your two lines, cuts it, has a separate check look at a frame at every scene change and at least every 5 seconds, then hands the video to the site.

---

## Draft notes (not copied into the operator task)

**Placeholders and what fills each**
- `<slot>`: Alex's answer to S2-Q1 (today 17:30 or tomorrow morning), sent by `orchestration`. Today at 17:30: the task goes out by 17:20, setup 17:25–17:30, scene 17:30–17:45, which leaves 17:45–18:00 for a retake, `/stop` and `/process`. Tomorrow: the morning cleanup slot he names.
- `<template>`, the link in `local\link.md`: `READY S-D6` (S-D6 run step 12).
- `<copy>`, `<where the copy is>`: `COPY S-D7`, from `..\linkedin-content\demo\posts.md` (read only). Pick a post that names no real person (L-01 synthesis 6.5). Without it: neutral placeholder copy in no one's name, opened from `canva-video\local\copy.md`. That placeholder is template text viewers see, so it's copywriting: send `SKILL s-d10-canva-video: marketing:draft-content for placeholder copy in the Canva video's template` to `orchestration` and wait for `SKILL ON` before writing it (ASKING.md, Alex about 16:40).
- No scripted lines for Alex beyond the two cues: what he says on camera is his own (the copywriting rule).
- Export line: one of the two, by template. PNG High 1x, or PDF Standard with Flatten on (L-05-R3 Q5, Q6, Q8).
- `<nn>`: the next free OT number, in the front matter and the two fences only.
- Length: "never over 15" holds unless the held intake's question 2 comes back "verify". The rig records screen and webcam either way, so question 3 (screen or webcam) doesn't change the brief, only the cut.

**If the templates aren't in Canva by the slot** (S-D6 says what exists in its `READY S-D6`, or doesn't send one)
- Preferred: build one template on camera from its backdrop. With the recording paused, upload that template's backdrop image into a new design of the right size and place it; resume. On camera: lock the backdrop, add native text boxes at the slots, fill, export. This uses S-D6's own route (backdrop plus native text) and keeps the Uploads panel and the file picker off camera (L-05-W1 C2 option B and C6). The brief's Step 1 item 7 then reads "open the new design" and Step 2 item 3 gains the locking.
- Last resort, the spec's original fallback: a post on a blank canvas in Addvery's brand. It leans on the colour and font pickers, so Step 1 item 8 matters most.
- Either way, log the switch in SPEC.md §9.

**Coordination before the slot** (send when the slot is known)
- `s-d6-canva-templates`: no Canva edits and no Claude in Chrome during the slot. A connector commit fails if the design is edited at the same time (L-05-R2 1.3), and two sessions driving Chrome on Windows collide (L-05-W1 E5).
- `s-d9-legibility`: the heads-up from run step 2, with the slot.

**Sources for the checklist.** Spec §1 and methodology step 1 (home, projects, other brand kits, tabs, the 4K monitor). L-05-W1 C6 and L-05-W2 B4, C5 (the editor's Projects, Uploads and Brand panels; use only placed images; pause to add one). L-05-R3 Q8 (the Share panel's access list, exact export clicks, the upgrade prompt, Canva AI and locks). L-01-R1 (outcome first in the opening seconds). The rest is this session's inference, to check on the day: the download bubble and save dialog, brand-kit selectors in the colour, font and Text panels, the team switcher, notifications, `F11`. Every Canva menu name is from help pages and research, not a live look; the session never opens Canva.
