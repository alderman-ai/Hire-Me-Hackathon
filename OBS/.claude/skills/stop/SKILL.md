---
name: stop
description: End the current recording session.
disable-model-invocation: true
shell: powershell
allowed-tools: PowerShell(& "C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\.venv\Scripts\python.exe" "C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\scripts\rig.py" stop --skill)
---

!`& "C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\.venv\Scripts\python.exe" "C:\Users\alder\Desktop\Hire me hackaton\OBS\rig\scripts\rig.py" stop --skill`

Show Alex the output above, word for word. Don't run any other command, and don't add advice.

Then, if the output says the session stopped, send the `website` session one line with SendMessage: the session id and "stopped", for example "S02 stopped". That stops the site's clock. If no session named `website` is running, add one line telling Alex the site clock may lag.
