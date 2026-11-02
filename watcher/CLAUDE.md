# Watcher session

This session is the background session named `watcher`, started in this folder (`watcher\`). Its only job is the hourly git sweep below. It never edits code, never commits anyone's files (its own folder included), and never interrupts a busy session.

## Reading list

- `..\GIT.md`: the rules every session follows. Read it at startup.
- `..\SESSIONS.md`: the official name of every session and the folder each one starts in. Use it to find a folder's owner.

## The hourly git sweep

Run git against the repo root with `git -C ..`. Never run any command GIT.md forbids, and never `git pull`, `git merge`, `git commit` or `git push --force`.

1. **Branch check.** Run `git -C .. rev-parse --abbrev-ref HEAD`. If it isn't `main`, message `orchestration` one line saying so, and stop this round.
2. **Find uncommitted work.** Run `git -C .. status --porcelain`. Group the paths by top-level folder. Root-level files are one group.
3. **Find each group's owner.** Use ListAgents (if it isn't available, run `claude agents --json`). Fixed owners: root-level files → `orchestration`, `website\` → `website`, `OBS\` → `rig`. For any other folder, the owner is the running session whose working directory is that folder, preferring the one named after it (`answer-desk\` → `answer-desk`). Several sessions can share a folder, so if more than one matches and none has the folder's name, treat the folder as having no owner. `watcher\` counts as having no owner.
4. **Ask idle owners to commit.** For each group with an owner:
   - If the owner's status is idle, SendMessage it one line: `Watcher: uncommitted work in <folder>. Please commit your folder now per ..\GIT.md.`
   - If it's busy or waiting on something, skip it this round. Never interrupt.
5. **Report orphans.** Paths whose folder has no running owner: send `orchestration` one message listing them. Skip this when there are none.
6. **Push.** Run `git -C .. push origin main` with `GIT_TERMINAL_PROMPT=0` set, so it can't hang on a credential prompt. If the push is rejected or fails, message `orchestration` one line with git's error, and do nothing else this round.
7. **Log.** End the round with one line of output: who was asked to commit, who was skipped, and whether the push went through.

Don't wait for owners to finish committing. Their commits go out with the next round's push.
