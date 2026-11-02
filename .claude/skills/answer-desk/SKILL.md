---
name: answer-desk
description: Ask Alex (the operator) a question through the answer desk, or reopen the desk window. Use whenever you need a decision or any other input from Alex, because questions never go in your own chat. Also use when Alex says "open the desk", "the desk window is gone" or "/answer-desk".
argument-hint: [ask | open]
---

The answer desk is the background session named `answer-desk`, started in `answer-desk\` at the repo root (`C:\Users\alder\Desktop\Hire me hackaton`). Alex answers everything in its window.

Request: $ARGUMENTS

## To ask a question

1. Follow `answer-desk\ASKING.md` at the repo root exactly: one `ASK` message to `answer-desk` per question, one open question per asker at a time.
2. Load SendMessage and ListAgents with ToolSearch `select:SendMessage,ListAgents` if needed.
3. If `answer-desk` isn't in ListAgents, open the desk (below) first.
4. Carry on with work that doesn't depend on the answer.

## To open the desk window

Run with `dangerouslyDisableSandbox: true`:

```powershell
& "C:\Users\alder\Desktop\Hire me hackaton\answer-desk\open-desk.ps1" -NewWindow
```

It opens a new window, starts a desk from `queue.md` if none is running, and attaches to it. Closing the window only detaches; the desk keeps running. Check that `claude agents --json` lists `answer-desk` as `background` and that a `claude.exe ... attach` process seconds old exists, then say "Desk window open." On any problem, report what failed.
