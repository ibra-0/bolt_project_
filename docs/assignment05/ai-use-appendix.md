# AI-use evidence appendix

Tool/date: OpenAI Codex desktop, GPT-6 model family, 19 November 2026. The exact
runtime model identifier is not exposed. No subagents were used. Python,
ReportLab/pypdf, npm/Vitest/ESLint/TypeScript/Vite and Playwright with installed
headless Chrome supplied deterministic checks and artifact generation.

Context: 37-page assignment PDF, public repository baseline 924680a, recent
previous-chat messages, and identity from earlier local assignment materials.
The PDF was obtained via read_thread attachments because /mnt/data is not a
path on this Mac. Old logs and screenshots are context, not new execution proof.

Prompt record (faithful summaries, not invented verbatim transcripts):
P1 - User asked to complete all ten tasks, preserve baseline, inspect the updated
repo, run actual checks, investigate 5+ risks/3+ categories, improve AGENTS, choose
at most one pattern, mitigate two confirmed risks on a separate branch/PR,
capture evidence and English deliverables; do not deploy or fabricate results.
P2 - Read-only audit phase: propose cross-category candidate risks without
application edits, challenge each against source and execution, and distinguish
confirmed, plausible/unverified and unsupported. Recorded in read-only-review.md.
This was a phase of the same Codex session, not an independent second AI review.
P3 - Implementation scope: add a small input formatter, accessible names and
regressions; retain original rules/tests/fixtures and dependency files. Review
diffs and rerun all four checks plus browser evidence.
P4 - Artifact phase: compile risk scores, readiness, safeguards, release decision,
reflection and appendix from actual evidence; render and visually inspect PDF.

Outputs accepted: formatting adapter, field-name associations, focused tests,
AGENTS/README updates, audit records and report. Unsupported missing-lockfile and
credential-leak claims were rejected. External-data validation remains unverified.
Problems found: initial browser harness called an unavailable Playwright method;
the first modified typecheck rejected test-only options/matcher typing. Corrected
the harness and test typing; preserved failures in evidence rather than hiding
them. Initial network/port restrictions required host approvals; successful
retried installation and audit are distinguished from failed attempts.

Instruction loading: root AGENTS.md was explicitly read through cat and applied
in the session; automatic discovery is not asserted. The updated file was read
and reviewed as part of the final diff. Existing instruction gates were retained;
the user's explicit request permits this isolated branch/draft PR, not a merge.

Verification sources: baseline/verified-final raw command logs and metadata,
regression-before-test.txt, final-browser.txt, original screenshots, audit JSON,
source exports and diff. npm official documentation explains npm ci/audit, and
the GitHub cross-spawn advisory corroborates one audit signal; advisory matches
are not proofs of exploitability in this app.

Human verification: independent student inspection and approval remain pending.
Student should inspect both product changes and risk evidence, rerun the four
commands, reproduce quick/repeat and overlap, inspect named fields and limits,
personalize the reflection, and confirm submission rules before submitting.
Codex did not claim to be the student, submit coursework, merge or deploy.

References (accessed 19 November 2026):
- Assignment brief pp. 5-28 (tasks), 32-36 (AI use, deliverables, deadline/format).
- https://docs.npmjs.com/cli/v11/commands/npm-ci/
- https://docs.npmjs.com/cli/v11/commands/npm-audit/
- https://github.com/advisories/GHSA-3xgq-45jj-v275
