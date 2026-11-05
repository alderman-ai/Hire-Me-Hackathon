# Context monitoring

The `orchestration` session reads this file only when the switch at the top of the root `CLAUDE.md` says **active**. When it says **disabled**, none of this runs. Alex sets the switch, and every session states it to him at its start and asks him to confirm (the root `CLAUDE.md` says how).

## Why it exists

- Alex, 2 Nov about 14:55: "you're also in charge of all of these other lingering sessions, like website and stuff. Monitor their context as well. You can use your judgment on whether they can just be cleared, whether they can just be compacted, or whether they need to launch a new session. Just make sure that nothing is rotting in context without it being fixed."
- Alex, 2 Nov 20:12, after a refresh cut into a session he was writing in with under 100k tokens: "instead of doing it on a timer, check to see if it's over 300,000, 400,000 tokens, and then gently halt and refresh please."
- On 4 Nov the watch lapsed after a handoff, and both `orchestration` and `website` reached 70% before anyone noticed. Hence the switch: it is either on or off, never forgotten.

## When active: what to do

1. **Create the cron first.** It's a Claude Code session cron (`CronCreate`). It lives only in this session's memory, dies when the session ends and expires after 7 days, so every new orchestration session creates it again. Schedule `13,43 * * * *` (the scheduler shifts it a few minutes; on 4 Nov it fired at :20 and :50). The prompt:

   > Context watch (orchestration\CONTEXT-WATCH.md). Take the time from Get-Date, never from memory. From the repo root run `python -I orchestration\context_check.py --warn 35 --watch 30` and act on its FLAGS as CONTEXT-WATCH.md says. Check `claude agents --json --all` for any name with two rows. Then `git fetch -q`, and if local main is ahead of origin/main, `git push origin main`. Report in one line only if something needs action; otherwise stay silent.

2. **Note the cron's job id** in the `orchestration` row of `SESSIONS.md`.
3. **On each firing,** act on the flags below. Skip sessions that `SESSIONS.md` marks paused.

## The flags

`orchestration\context_check.py` only measures. It reads each live session's newest turn from its transcript (every model here has a 1M window) and changes nothing.

- **ROT** (35% or more, about 350k tokens): ask that session for a same-name handoff at its next natural stopping point. Then launch the fresh one from its folder, and stop and remove the predecessor by exact id (`claude stop <id>`, then `claude rm <id>`). Update its `SESSIONS.md` row.
- **WATCH** (30%): note it only.
- **SAMENAME:** two live sessions share a name. Stop and remove the older one.
- **STALE:** a stopped row sits next to a live one under the same name. `claude rm` it.
- **STOPPED:** a roster session went down with nothing live under its name (an idle stop after about 8 hours, a usage limit, a crash). Resume it with `claude --resume <session id> --bg` from its folder, or remove it if its job is done.

Hard limits: never refresh a session under 300k tokens unless Alex names that session. Never on a timer, and never all at once. Never clear or compact another session from here.

## Cost

Each firing is a turn of this session, so it re-sends this session's whole context, mostly from cache. On the night of 4 to 5 Nov, about 28 firings at about 200k tokens each cost about 6 million cached tokens, while nothing was being built. Keep the switch active only while sessions are doing real work: context only grows when they work.

## Turning it off mid-session

Delete the cron (`CronList`, then `CronDelete <id>`), set the switch in the root `CLAUDE.md` to `disabled`, and commit that file.

## Not part of this

- The `/for/ceo` visit watch is its own standing order, in the root `CLAUDE.md`. It's a background script that uses no model tokens, and it runs whatever this switch says.
- Committing and pushing your own work stays part of every commit, switch or no switch.
