---
name: pause
description: Pause the recording, or resume it if it's already paused.
disable-model-invocation: true
shell: powershell
allowed-tools: PowerShell(& "C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\.venv\Scripts\python.exe" "C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\scripts\rig.py" pause --skill)
---

!`& "C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\.venv\Scripts\python.exe" "C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\scripts\rig.py" pause --skill`

Show Alex the output above, word for word. Don't run any other command, and don't add advice.

Then, if the output says the session paused or resumed, send the `website` session one line with SendMessage: the session id and "paused" or "resumed", for example "S02 paused". That stops or restarts the site's clock. If no session named `website` is running, add one line telling Alex the site clock may lag.
