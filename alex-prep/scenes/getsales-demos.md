# Scene card: GetSales demos 1 and 2

For Alex. About 10 minutes in all, for both. Nothing sends, and nothing in GetSales changes. The beats to say are in each demo's Doc; this card is only the setup and the order.

## Before you press anything (rig paused or stopped)

**Keep off screen:** your own GetSales flows, folders, leads, contacts and inbox (unread counts too); sender and LinkedIn account settings; any key, token or `.env`; the Apify proposal.

Open these, in this order, on the left monitor (the recorded one):

1. `getsales\routing\README.md` in a Markdown preview, scrolled to "The path of one lead".
2. GetSales, the demo folder: https://amazing.getsales.io/flow/automation?folder="39931098-c626-489b-a75d-a78153388d56". **Collapse or scroll the folder sidebar** so no other folder or flow name shows.
3. A second tab: the top workflow in the builder, https://amazing.getsales.io/flow/7d24cbf8-67ce-4ac4-9cd7-4c4f7f77c43b/builder ("Demo · Retail loyalty · EN · proof"; message 1 is `{{custom_message_1}}`).
4. `getsales\routing\sample.csv` in a CSV viewer, scrolled so the `custom_message_1` column shows.
5. Optional, 10 seconds: `getsales\live\pipeline-view.html` (the six's computed first messages). It gets blurred in the clip. Skipping it is fine.

For demo 2, a **fresh terminal** in `C:\Users\alder\Desktop\Hire me hackaton\getsales`: no other tabs, history cleared (`Clear-History; cls`), font about 18 pt, about 170 columns wide.

## Demo 1, about 3 minutes (Doc: https://claude.ai/artifact/83CBecbQdNyH3NZi2MLYDq)

| Time | On screen | You talk about |
| --- | --- | --- |
| 0:00 to 0:40 | tab 1, the README | classification tools |
| 0:40 to 1:40 | tab 2, scroll the 36 | the 36 workflows: four ICPs by EN, CS, DE by three tactics |
| 1:40 to 2:30 | tab 3, the builder: **zoom in, and hold still for 3 to 4 seconds** with the flow title and node #6 "Send Message" both on screen (that frame becomes the entry's figure) | the one variable, `{{custom_message_1}}` |
| 2:30 to 3:00 | tab 4, the CSV | where the variable comes from |

## Demo 2, about 1 minute (Doc: https://claude.ai/artifact/XipRZaxFuESjKrTW3qoKmB)

1. Type `python -I routing\route.py` and run it.
2. `cls`, then `python -I routing\route.py L06 L11` (the two hard cases).

## The rig

Type the commands in the rig's chat (the Claude Code session in `OBS\`). Each take is its own session, so each one gets its own clean files. Nothing to do in OBS: only the left monitor is recorded, with the webcam on top.

1. A session is running now (S14 since 19:01): type `/stop` before you set up, so the setup stays off the recording.
2. Set up the tabs above, then `/start` (S15). Demo 1. `/stop`.
3. Set up the fresh terminal, then `/start` (S16). Demo 2. `/stop`.
4. `/start` again whenever you go back to normal work.

## After you're done

Tell me "done" in this chat with rough start and end times (the rig sends them too). Then `s-d3-getsales` sends the clip request to `s-d9-legibility`, the clips are cut and frame-checked, and both site entries are already pre-built, so only the video id and a summary are left. Nothing else needs you.

Optional, off camera, 10 seconds, any time: the typo in https://amazing.getsales.io/flow/cff86c0b-0c77-4c51-a03c-d8da83afba70/builder ("Demo · Consumer lending · DE · problem"), follow-up 1 on both branches (nodes #7 and #21): "Folienätzen" should be "Foliensätzen". It isn't shown on camera.
