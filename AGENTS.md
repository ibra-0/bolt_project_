# Agent operating instructions

## Purpose and architecture
Smart Campus checks one fictional room's availability. No backend, account,
production data, persistence or real booking service is present.
`src/main.tsx` mounts `App.tsx`; `hooks/useRoomChecker.ts` manages mock state;
`utils/time.ts` owns pure rules and input/display formatting; `fixtures.ts`
contains immutable defaults. Vite builds the static client.

## Setup and safe commands
Verified environment: Node 26.13.0, npm 11.20.0 on macOS arm64. Use a compatible
Node version; consult lockfile engine requirements before selecting another.
Use the committed lockfile: `npm ci --ignore-scripts`. Do not regenerate it to
work around failures. Network access may require host approval.
Allowed verification: `npm run test`, `npm run lint`, `npm run typecheck`,
`npm run build`, `git status`, `git diff`, and read-only `npm audit --json`.
For local UI checks only: `npm run dev -- --host 127.0.0.1` or
`npm run preview -- --host 127.0.0.1`. Stop local servers when finished.

## Scope, conventions and acceptance
Use typed React functions, existing aliases and existing formatting. Prefer
pure helpers and minimal diffs. Keep business rules outside JSX. Edit only
files necessary for the assigned task; state the allowed-file list first.
No new dependencies/frameworks or unrelated cleanup. Never weaken, remove or
skip tests. Keep `DEFAULT_ROOM` and quick-slot fixtures unchanged.
Preserve AC1-AC6 in README and `docs/assignment05/acceptance-criteria.md`, including
strict future time, exactly 120 minutes, end-of-day 1440 and touching endpoints.
Editable values use HH:MM or whole minutes; AM/PM labels are for display only.

## Evidence and review gates
Preserve baseline SHA/export before edits. Review each proposed diff; record
what was checked, command, environment, exit status and real output. Run all
four checks above after changes. Targeted tests must reproduce a confirmed
defect before claiming a mitigation. Do not reuse old logs as new evidence.
Classify claims as confirmed, plausible/unverified or unsupported. A passing
build is not proof of UI behavior or absence of vulnerabilities.
Provide a diff, tests, build result, remaining risks and release recommendation.
Human review and approval are required before merge or deployment. Push or
draft-PR creation requires explicit task authorization; the Assignment #05
request authorizes an isolated branch/PR, never merge or deployment.

## Forbidden actions
Do not read, print, copy or commit secrets, credentials, .env values, personal
or confidential datasets. Do not deploy/publish, change shared infrastructure,
create accounts or send messages. No destructive commands, branch/file deletion,
force-push, reset --hard or history rewriting. No unreviewed dependency changes,
`npm audit fix`, or disabling safeguards to make checks pass.

## Bounded background work and failure handling
Start from a recorded SHA on an isolated branch/worktree. Define allowed files,
commands and a 30-minute limit; stop on scope expansion, secret exposure or
unexpected dependency changes. Report failed commands honestly and retain logs.
Return change summary, diff, tests, build result and residual-risk notes.
If verification fails, leave the branch unmerged and hand off the failure.
Rollback means retaining the baseline and closing the proposal; after a merge,
a human-reviewed revert is preferred to destructive resets. See the safeguards
document for the hypothetical background-task contract.
