# Task 7 - Two verified product mitigations

## M1 -> R1: editable time representation
Allowed product files: src/utils/time.ts, src/hooks/useRoomChecker.ts, src/App.tsx;
targeted tests: src/hooks/useRoomChecker.test.ts and src/utils/time.input.test.ts.
One minutesToInput helper formats domain minutes as HH:MM. Quick slots and the
mock-time default use it. Parser, decision order, fixtures, original tests and
dependency files are unchanged. Diff inspected for these invariants.

Before: four hook cases fail; browser quick available=1, repeat available=0.
After: four hook cases and seven round trips pass; browser quick/repeat both=1,
no invalid message. Residual R1 score: 6 -> 2.

## M2 -> R2: programmatic control names
Allowed product file: src/App.tsx; test file: src/App.test.tsx. Add five explicit
label/id pairs and a persistent settings button aria-label. Convert the section
heading from an unassociated label to a paragraph; no business-rule change.
Before: all five named-field tests fail. After: all five pass and the mobile
browser finds Mock Settings plus Current time (mock). Residual score: 6 -> 2.

## Diff and verification review
Agent reviewed application diff before accepting each mitigation: no fixture,
parser grammar, availability rule, package manifest or lockfile changes. Human
review remains pending. Required AGENTS/README documentation work is separate
from these two product mitigations; it also improves R4/R5 controls.

Baseline: 40/40 passing; lint/types/build exit 0. Added regression tests against
unchanged application: 40 pass, 9 fail. First modified run: 56 tests pass but
typecheck exits 2 due to unsupported testing-library exact options and matcher
types. Tests corrected without relaxing behavior assertions. Verified final:
56/56 pass, zero failed/skipped; lint, typecheck and build exit 0.

Browser: local Chrome headless, 1280x1000 desktop and 402x874 mobile viewport;
quick/repeat, overlap rejection, mobile settings names and horizontal width
checked. No page errors recorded. Mobile full-page PNG extends beyond viewport.
Not executed: live deployment smoke test, multiple browser engines, actual
screen reader, penetration test, comprehensive history secret scan or CI run.
