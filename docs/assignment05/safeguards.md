# Task 8 - Hypothetical asynchronous task contract

This is a design exercise. No paid/background agent, scheduled job or deployment
was started. One foreground Codex agent performed the assignment work.

Task: investigate the remaining dependency advisories and propose a minimal
dependency-maintenance patch. Start from the reviewed Assignment #05 source
version on a new isolated branch assignment05/dependency-review; use a separate
worktree if concurrent work exists. Record exact starting SHA and a clean status.

Allowed files: package.json, package-lock.json and docs/dependency-review.md.
Existing tests are read-only. Allowed commands: git status/diff/log, npm ls,
npm audit --json, npm audit --omit=dev --json, npm ci --ignore-scripts, and all
four existing verification scripts. After a reviewed manifest proposal, an
explicit version update may regenerate only the lockfile. No blanket audit fix.

Limit: 30 minutes wall time and two patch attempts, whichever arrives first;
stop and report if the budget expires. Use fictional fixtures and loopback-only
preview. Do not access credentials, .env values, production services or personal
data. No sending messages, unrelated edits, test removal, force-push, history
rewrite, merge, deployment, new service, account creation or unreviewed upgrade.

Stop conditions: new permission requirement, unexpected files in diff, required
major migration, unresolved critical verification failure, or suspected secret.
Preserve safe logs, redact rather than print confidential material, and hand off.

Artifacts: base/final SHAs, scoped diff, change rationale and dependency paths,
raw installation/test/lint/typecheck/build outputs with exit codes, audit before
and after, unresolved-risk notes and rollback plan. Human reviewer verifies
the patch and commands, then explicitly approves before merge or deployment.

Failure/rollback: leave the proposal branch unmerged and preserve baseline.
Never overwrite main to recover. If a change has already been merged later,
request a reviewed revert commit, rebuild, and rerun smoke checks. No production
rollback was needed or executed for this assignment.
