# Git rules for every session

All sessions share one working tree on `main`. A command that changes the branch or the whole tree hits every session at once.

## Stay on main
- Never run `git checkout <branch>`, `git switch`, `git stash`, `git reset --hard`, `git clean`, `git restore .`, `git checkout -- .`, `git rebase`, `git pull --rebase` or `git pull --autostash`. They touch every session's files.
- If the branch or the tree looks wrong, message `orchestration` and stop. Don't fix it yourself.

## Commit only your own folder
- Stage: `git add -- <your-folder>/...`
- Commit: `git commit -m "[<folder>] message" -- <your-folder>/...`. The path list keeps other sessions' staged files out of your commit.
- Never `git add -A`, `git add .` or `git commit -a`.
- Before committing, run `git diff --cached --name-only`. Every path must be in your folder, and none may be a secret.

## Commit early and often (charter P1)
- Commit after every finished step, without asking. Small commits are fine.
- Don't push. The watcher pushes.

## Lock errors
- `index.lock exists` means another session is mid-commit. Wait a few seconds and retry. Never delete the lock file.

## Ownership
- Each top-level folder belongs to the session started in it: `website\` to `website`, `OBS\` to `rig`, `watcher\` to `watcher`, and each spec folder to its spec session.
- A folder whose session doesn't exist yet (such as a scaffold S0 creates) belongs to the session that created it until its own session starts.
- Never edit or commit files in another session's folder. Send that session a message instead.
- Root-level files (CHARTER.md, GIT.md, the root CLAUDE.md) belong to the `orchestration` session.
- **Exception:** until the S2 project orchestrator session takes over, `orchestration` may edit and commit files in any folder, without asking that folder's session (Alex, 2 Nov). It tells the owner afterwards. That's a standing instruction from Alex, not a peer's request.

## Secrets
- Never commit `.env*`, `client_secret*.json`, tokens or keys. `.gitignore` covers the usual ones; check anyway.

## The watcher
- The `watcher` session (in `watcher\`) runs an hourly sweep: it finds uncommitted work, asks each idle owner to commit its folder, then pushes `main` to origin.
- When it messages you, commit your folder now, following these rules.
- It never commits your files, never interrupts a busy session, and never force-pushes.
- If the push is rejected or HEAD is off `main`, it tells `orchestration` and does nothing else.
