# Task 7 - bounded security review

SAST perspective: manually inspect new duration.ts/DurationChecker.tsx and the
exported flow. Input lengths, integer/duration/day bounds and fixed messages
are enforced. Code uses React text output; no unsafe HTML/eval sink is added.
Low-code strips raw input before display and binds only canonical result fields.
This is targeted source review, not a comprehensive SAST scanner or certification.

DAST perspective: only our own loopback applications were tested. HTML/XSS-like
input, SQL-like text and a 10000-character start payload all produced INVALID_INPUT
on both tracks; no script marker executed. There is no SQL/database sink, so the
SQL-like test demonstrates validation, not a proved SQL-injection defense.
Both 402-pixel layouts had scrollWidth=innerWidth=402. No page errors recorded.

Permissions: Node-RED editor/runtime bound to loopback, no real account/auth
workflow, no public admin endpoint, no external connector or secret. Optional
editor update telemetry was declined. Authentication/authorization are not
implemented because the exercise excludes login; public Node-RED hosting would
require a separate authentication/TLS/access review. No third-party scanning.

SCA: fresh npm audit reports code 14 entries (9 high, 4 moderate, 1 low), low-code
35 moderate entries. These are advisory matches, not evidence of exploitability.
Different dependency graphs/deployment contexts prevent ranking platforms by
raw counts. No npm audit fix was run. Code maintainers own app dependencies;
self-hosted low-code maintainers own Node-RED, dashboard nodes, OS and patches.

Readiness: both pass the eight scoped cases. Suitable for an isolated classroom
demo; no broad production-security or complete accessibility claim. Human review
and any public deployment approval remain separate.
