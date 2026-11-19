# Task 9 - CONDITIONAL release decision

Reviewed scope: the final source proposal derived from baseline 924680a, for a
local, fictional-data classroom demonstration. This decision does not authorize
merge, deployment or exposure to untrusted users.

Evidence supports the two mitigations: forty baseline tests passed; nine new
regressions failed before fixes; the verified final has fifty-six passing tests,
clean lint/types and a successful build. Chrome confirms quick/repeat and
overlap behavior and a 402-pixel settings view. No existing tests or dependencies
were changed. Agent readiness is level 2, not level 3.

Conditions and owners:
1. Ibrakhim Razyyev must independently review the focused diff, reproduce quick
   slot/recheck and accessible field lookup, inspect logs, and approve the
   submission and any later merge. No student sign-off is claimed by Codex.
2. Keep demonstration local, with mock data, trusted inputs and loopback-only
   tooling. The maintainer owns these controls for every demonstration.
3. Before any public release, the maintainer must review the fourteen audit
   package entries (nine high, including one production ws dependency), assess
   reachability, remove/upgrade affected dependencies in a separate reviewed
   change and repeat audit plus all checks. Current exploitation is unverified.
4. Until CI exists, the maintainer must run the four-command gate before merge;
   broaden keyboard/screen-reader/browser testing before claiming accessibility
   conformance or general production readiness.

Why not GO? Open dependency findings, no CI, limited accessibility/browser
verification and pending human review. Why not reject the local demonstration?
The demonstrated behaviors pass, data is fictional, and explicit isolation and
review controls constrain the intended educational use. Production release is
NO-GO until the public-release conditions above are satisfied.

Rollback: baseline archive and commit remain intact; keep the PR unmerged if
review rejects it. Later merged changes require an ordinary reviewed revert.
No deployment, email submission or merge has occurred.
