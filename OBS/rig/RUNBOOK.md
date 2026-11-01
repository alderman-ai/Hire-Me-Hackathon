# Hackathon day runbook

## Before the first session

1. Open a new terminal, not the one from the rehearsal, start a Claude Code session in `C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\`, and leave it in the background. If `/start` ever prints `TEST MODE`, type `/stop` and open a new terminal.
2. Keep your work on the left monitor, the only one being recorded.
3. Leave the Wave:3's gain knob where it is. Its level is set for the current position.

## The four commands

| Type | When | What happens |
| --- | --- | --- |
| `/start` | Beginning of a session | Checks the mic, webcam and disk space, then starts the screen, webcam and backup audio |
| `/pause` | Private moment or a short break | Stops all three. Type it again to resume. |
| `/stop` | End of a session, after about 1 to 1.5 hours | Closes everything. Nothing stops by itself, and the next session waits for `/start`. |
| `/process` | During a break, after `/stop` | Transcribes and uploads in the background. You can start the next session straight away. |

## What you might hear

| Voice | What it means | What to do |
| --- | --- | --- |
| "Recording stopped. Restarting it now." | OBS crashed, and the rig is bringing it back in about 15 seconds | Keep working |
| "The backup recorder stopped..." or "The webcam recorder stopped..." | One recorder died and is restarting | Keep working |
| "Processing finished." | `/process` is done | Nothing |
| "Processing finished with problems." | A session didn't finish | Read the report below |
| "The rig controller has failed. Check the recording." | The background controller stopped | Type `/stop`, then `/start` |

## If something looks wrong

- **The report from `/process`** is in `rig\run\live\process_report.md`. Typing `/process` again is always safe. It carries on from where it stopped and never uploads twice.
- **`/start` says it's blocked.** The line above that message says why, usually a disconnected mic or webcam.
- **Closing this Claude Code window is safe.** Recording carries on. Open a new session in the same folder to type `/stop`.

## Finding a clip

```powershell
.venv\Scripts\python.exe scripts\find_clip.py "the quote you remember" --cut
```

This gives the session, a YouTube link at that second, and a padded clip in `OBS\Processed\clips\`, plus the matching webcam clip.
