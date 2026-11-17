## Project Smart Campus room availability checker; one room, fictional data.
## Constraints Preserve AC1-AC6; no backend, login or booking creation.

## Safe-agent rules (scoped)
- Make only the smallest change needed to satisfy the requested fix. Prefer pure functions and minimal diffs.
- Do not install new dependencies, add new frameworks, or refactor unrelated components.
- Do not weaken, delete, or skip existing tests. New tests must assert real behavior.
- Do not mutate booking fixtures; keep responsive UI feedback intact.
- Preserve AC1-AC6 acceptance criteria and touching-endpoint / exactly-120-minute behavior.

## Human review gates
- Stop before publishing, deploying, or pushing. Await explicit human confirmation.
- Surface the exact changed-file diff and command-by-command pass/fail counts before claiming success.
- If a command fails, fix the root cause without weakening tests; re-run and report real output.

## Prohibited actions
- No reading, printing, or committing secrets, API keys, or .env values.
- No deploy, publish, push, or remote operations without confirmation.
- No destructive commands (rm -rf, drop, force-push, git reset --hard, deleting branches/files).
- No creating accounts, sending messages, or modifying shared infrastructure.

## Verification Run `npm run test`, `npm run lint`, `npm run typecheck`, and `npm run build`. Report changed files, rationale, and genuine test output.
