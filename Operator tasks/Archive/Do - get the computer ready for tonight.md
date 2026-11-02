---
System Primitive: Operator task
Task id: OT-10
Task State: Archived
Build goals: []
Unblocks: the overnight run: the background sessions keep working from 18:00 to the morning instead of stopping
Depends on: nothing
Time: 5
Cost: 0, unless you switch on usage credits (step 3)
Created: 2026-11-02 16:35 Prague
Archived: 2026-11-02
Closed: 2026-11-02 17:03 Prague by orchestration on Alex's instruction in chat ("If things are an easy judgment please clear the plate for me. We can just make edits later."): done on his report: steps 1 and 2 done by him; Windows Update could not be confirmed paused (no pause in the registry at 16:49; he was told in chat); steps 3 to 5 take their defaults: no usage credits, no pins, no retry watchdog.
---

# Do: get the computer ready for tonight

## What this is

**About 5 minutes. Please do it before you leave, ideally by 17:45.**

Tonight the project keeps building without you: about fifteen background Claude sessions on this computer carry on from 18:00 until the morning cleanup. A research check this afternoon, confirmed against Claude Code's own documentation, found four things that can quietly stop all of them overnight. A sleeping or restarting computer stops them all. A usage limit stops them until someone replies. And Claude Code stops a session that has sat waiting for about an hour with no window attached; nothing is lost, but it doesn't start again by itself.

Each fix below takes a minute or less. Steps 1 and 2 need nothing but a click. Steps 3 to 5 are quick choices, and each one has a default if you skip it. Nothing else is waiting on this, but the later it's done, the shorter the night that's protected. Write your answers in the box at the bottom.

## Step 1. Keep the computer awake

A sleeping computer runs nothing. Set it to never sleep while plugged in. Either use Settings, then System, then Power and battery, then "Screen, sleep and hibernate timeouts", and set "Make my device sleep after" to Never when plugged in; or paste this into PowerShell:

```powershell
powercfg /change standby-timeout-ac 0
powercfg /change hibernate-timeout-ac 0
```

The screen can still turn off; only sleep matters. Leave the computer plugged in overnight.

## Step 2. Pause Windows updates for a week

A restart for an update stops every background session, and Windows' active hours on this computer end at 03:00, so an update could restart it in the middle of the night. In Settings, then Windows Update, click "Pause updates" and choose one week. You can resume them tomorrow.

## Step 3. Check your usage, and decide on usage credits

Every session draws on your one Claude subscription. If it hits its limit tonight, the sessions stop until it resets and someone replies to them.

- In any Claude Code window, type `/usage`. It shows your plan's limits and when they reset. Write down roughly how much is left and when it resets.
- Usage credits let work continue past the limit, charged up to a monthly cap you choose. `/usage-credits` opens the page on claude.ai (Settings, then Usage) where you switch them on and set the cap. The documentation doesn't say for certain whether unattended background sessions draw on them, so this is a safety net, not a guarantee.

Write the cap you set, or "no". If you skip it, nothing changes, and the sessions that hit the limit wait for the reset.

## Step 4. Pin the sessions that must run all night

The one documented way to stop Claude Code from shutting a waiting session after about an hour is to pin it: in the agent view, select the session and press `Ctrl+T`. Pin these four: `orchestration` (it restarts the others every 30 minutes if they were shut), `watcher` (it saves and pushes the work every hour), `s-d9-legibility` (it keeps the site's feed fed), and `website` (it builds what the others ask for).

Write "pinned" or "skip". If you skip it, the orchestration session still restarts any session it finds shut, but only while it is running itself.

## Step 5. Let sessions wait out limits instead of stopping

One setting, `CLAUDE_CODE_RETRY_WATCHDOG=1`, makes a session keep retrying when it hits a capacity error or a usage limit, waiting for the reset instead of stopping. It goes into the project's Claude settings file, and only sessions started after the change pick it up: tonight that's every session that hands over to a fresh one, the orchestration session included at about 17:40.

Write "yes" to have the orchestration session add it now, or "no". If you skip it, it isn't added, because it changes how Claude Code itself runs.

## Report

One line per step is enough, for example: "1 done, 2 done, 3 about 40% left, resets 21:00, credits $20, 4 pinned, 5 yes".

`<operator_answer>`
```ot-10-report
All of my power settings and stuff are configured for overnight runs. You can confirm the Windows update is paused. I think it is but fine Everything else: default answers 
```
`</operator_answer>`

## When you are done

Say "OT-10 done", or just fill in the box: the orchestration session checks this file every 5 minutes. On step 5's "yes" it adds the setting at once and tells you which sessions picked it up. Your answers go into the hand-over for the overnight session, so the morning cleanup knows what was protected.
