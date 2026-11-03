# Scene card: the 36-workflow walkthrough (GetSales)

For Alex, 3 Nov. Brought in line with `orchestration\local\overnight\MORNING.md` (item 3) and the rig as it is now at 07:56. **About 3 minutes on camera, plus about 5 minutes to set up.** Nothing sends, and nothing in GetSales changes.

**Why this take matters:** it swaps into the live "36 outbound workflows and the one variable behind them" entry (C2) and into Ivana's page, where it's called a "3-minute" walkthrough. Today both play the 16:36 planning clip as a stand-in.

## Before you press anything (nothing is recording now)

**Keep off screen:**
- your own GetSales flows, folders, leads, contacts and inbox, unread counts included
- sender and LinkedIn account settings
- any key, token or `.env`
- the Apify proposal

**Keep the PC light.** At 90 to 98% CPU the webcam recorder falls behind (S14 lost its last 36 seconds). Close Canva and any heavy Chrome tabs first.

Open these, in this order, on the **left monitor** (the only one recorded):

1. `getsales\routing\README.md` in a Markdown preview, scrolled to **"The path of one lead"**.
2. GetSales, the demo folder: https://amazing.getsales.io/flow/automation?folder="39931098-c626-489b-a75d-a78153388d56". **Collapse or scroll the folder sidebar** so no other folder or flow name shows.
3. A second tab with the top workflow in the builder: https://amazing.getsales.io/flow/7d24cbf8-67ce-4ac4-9cd7-4c4f7f77c43b/builder ("Demo · Retail loyalty · EN · proof"). Its message 1 is `{{custom_message_1}}`.
4. `getsales\routing\sample.csv` in a CSV viewer, scrolled right until the `custom_message_1` column shows. It's fictional sample data.

## The take, about 3 minutes

The order follows the live entry, so the video and the page tell the same story. Say it your way; the right-hand column is only the gist.

| Time | On screen | The gist |
| --- | --- | --- |
| 0:00 to 0:40 | tab 1, the README's path of one lead | Rules sort most leads for free: industry, headcount, country, profile language. Jev, TypeSafe's decision model, answers only what rules can't settle, with a probability. Below 0.75, a person decides. |
| 0:40 to 1:30 | tab 2, scroll the 36 | Four ICPs from Addvery's own website (retail loyalty, telco customer value, consumer lending, last-mile logistics), each in Czech, German and English, with three tactics each: signal, problem, proof. All switched off, 0 contacts. |
| **about 1:40** | tab 3, the builder. **Zoom in, then hold still for 3 to 4 seconds** with the flow title and node #6, "Send Message", both on screen | Message 1 is one variable, `{{custom_message_1}}`. Everything after it is fixed text. **That held frame becomes the entry's figure** (the image there now is a placeholder), so nobody needs a screenshot from you. |
| 2:20 to 3:00 | tab 4, the CSV | Where the variable comes from: written per lead before import by the client's own Claude or LLM, through MCP or a CSV column. A person checks a sample before every import. |

## The rig

Type the commands in the rig's chat (the Claude Code session in `OBS\`). There's nothing to do in OBS itself: only the left monitor is recorded, with the webcam on top.

1. Nothing is recording now (S16 was the last; it's filed). Set up the four tabs first, so the setup stays off the recording.
2. `/start`. The rig names the session, probably S17. Record the take, then `/stop`.
3. `/process`. It transcribes and files in the background, and you can carry on with other work.

## After you're done

Say "done" in this chat (rough start and end times are enough; `rig` sends them to me too). Then, without you:

1. **orch-alex-prep** cuts the take from the recording and runs the frame check (nothing from the "keep off screen" list). It also pulls the still from the 1:40 hold, cropped to the title bar and node #6.
2. **website** uploads it unlisted and changes the one `video` field in `content\demos\getsales-36-workflows.md` (the home page, Ivana's page and the entry follow). It also swaps in the still, all on a **preview**.
3. The intro paragraph ("The video is me at 16:36...") is rewritten for the new video through `alex-voice`.
4. **Production moves on your yes** to the preview link (rule 1).

## Optional

- **GetSales demo 2**, one minute at the terminal: twelve leads sorted into ICPs. Use a fresh terminal in `C:\Users\alder\Desktop\Hire me hackaton\getsales` with no other tabs, history cleared (`Clear-History; cls`), font about 18 pt, about 170 columns wide. `/start`, run `python -I routing\route.py`, then `cls`, then `python -I routing\route.py L06 L11` (the two hard cases), then `/stop`. Its beats: https://claude.ai/artifact/XipRZaxFuESjKrTW3qoKmB.
- **One German typo, off camera, 10 seconds:** in https://amazing.getsales.io/flow/cff86c0b-0c77-4c51-a03c-d8da83afba70/builder ("Demo · Consumer lending · DE · problem"), follow-up 1 on both branches (nodes #7 and #21), change "Folienätzen" to "Foliensätzen". It isn't shown on camera.
