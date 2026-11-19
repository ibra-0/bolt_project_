# Task 5 - Risk register

L/I: 1 low, 2 medium, 3 high. Score = likelihood x impact; 1-2 low, 3-4 medium, 6-9 high.
Screening scores for unsupported candidates are not accepted defect priorities.

Top two corrective actions: R1 then R2, both 6. R3 ties at 6 but is managed
separately because observed UI failures are directly reproducible and dependency
reachability requires a distinct maintenance review. No production GO is given.

## R1 - Correctness / UI integration

**Classification:** Confirmed

**Cause:** AM/PM display labels are written into editable inputs whose parser accepts HH:MM or integer minutes.

**Event:** Select 11:00 AM - 12:00 PM, then click Check Availability again.

**Consequence:** A valid available slot becomes an invalid-input rejection; displayed time details disappear.

**Component:** src/hooks/useRoomChecker.ts:72-79; src/utils/time.ts:26-46

**Evidence:** baseline-browser-verified.txt: inputs 11:00 AM / 12:00 PM, repeatAvailable=0; regression-before-test.txt: four hook failures.

**Likelihood:** 3

**Impact:** 2

**Score:** 6

**Mitigation:** M1: one minutesToInput formatting adapter; quick slots and mock-time default use editable HH:MM.

**Owner:** Ibrakhim Razyyev (maintainer)

**Verification:** Four hook cases, seven format/parse boundary cases, final-browser.txt and all original tests.

**Residual:** Score 2. Adapter expects validated whole-minute domain inputs; arbitrary external room data is outside this prototype.

## R2 - Accessibility / usability

**Classification:** Confirmed

**Cause:** Visible label elements have no htmlFor/input id relationship; two booking fields have only placeholders; settings text hides on mobile.

**Event:** Locate time fields by programmatic name or open the icon-only mobile settings control.

**Consequence:** Assistive-technology users cannot reliably identify controls.

**Component:** src/App.tsx:57-67, 120-180, 201-221

**Evidence:** Five accessible-name tests fail before changes; baseline-browser-verified.txt: startAccessible=0.

**Likelihood:** 3

**Impact:** 2

**Score:** 6

**Mitigation:** M2: five explicit label/id associations; persistent aria-label for Mock Settings.

**Owner:** Ibrakhim Razyyev (UI maintainer)

**Verification:** Five DOM accessible-name tests and final mobile browser lookup at 402 px.

**Residual:** Score 2. No screen-reader session, full keyboard audit or WCAG conformance claim; duplicate Remove booking names remain.

## R3 - Dependency / security

**Classification:** Confirmed audit signal; exploitability unverified

**Cause:** The committed dependency graph includes packages matching registry security advisories.

**Event:** Tooling processes hostile input, or vulnerable dependency code is used in a future connected feature.

**Consequence:** Potential denial of service or other advisory-specific impact; no exploit was executed.

**Component:** package-lock.json; @supabase/supabase-js -> @supabase/realtime-js -> ws@8.18.3; cross-spawn@7.0.3 in tooling

**Evidence:** baseline-audit.txt and verified-final-audit.txt: 14 package entries, 9 high/4 moderate/1 low. Production-only audit: one high (ws). inspection-dependency-paths.txt records paths.

**Likelihood:** 2

**Impact:** 3

**Score:** 6

**Mitigation:** Deferred dependency PR: review removal of unused Supabase or compatible upgrades, re-audit and rerun checks; keep tooling on loopback with trusted inputs.

**Owner:** Ibrakhim Razyyev (dependency owner), before any public release

**Verification:** npm audit --json; npm audit --omit=dev --json; assess actual imports and bundle; independent review of any upgrade.

**Residual:** Score 6, OPEN. Production declaration does not prove code is shipped/reachable; source has no Supabase import. Package manifests were deliberately unchanged.

## R4 - Agent operations

**Classification:** Confirmed

**Cause:** Baseline AGENTS.md contains prohibitions but lacks architecture, setup/runtime, scoped-file and bounded-task failure guidance.

**Event:** An assistant assumes commands, expands scope or misreports stale evidence.

**Consequence:** Unreviewed changes or an unreliable audit trail.

**Component:** AGENTS.md baseline versus final

**Evidence:** Baseline archive root AGENTS.md (18 lines); final AGENTS.md documents setup, commands, scope, review and rollback.

**Likelihood:** 2

**Impact:** 2

**Score:** 4

**Mitigation:** Required Task 2 instruction update; read manually and enforce a file scope, no deployment, fresh logs and human merge gate.

**Owner:** Ibrakhim Razyyev (reviewer)

**Verification:** Inspect AGENTS.md and safeguards.md; confirm branch scope, manifest invariance and honest log index.

**Residual:** Score 2. Instructions guide behavior but are not a technical permission boundary; independent human approval is still pending.

## R5 - Maintainability / reproducibility

**Classification:** Confirmed documentation gap

**Cause:** README recommends npm install and does not identify a compatible Node/npm environment.

**Event:** A new contributor selects an older Node version or unintentionally updates lockfile resolutions.

**Consequence:** Setup differences, engine failures or dependency drift.

**Component:** README.md Setup; package-lock.json engine declarations

**Evidence:** Baseline README setup is npm install; clean npm ci --ignore-scripts succeeds on Node 26.13.0/npm 11.20.0 without manifest changes.

**Likelihood:** 2

**Impact:** 2

**Score:** 4

**Mitigation:** Document tested runtime and npm ci --ignore-scripts in README/AGENTS; keep lockfile unchanged.

**Owner:** Ibrakhim Razyyev (maintainer)

**Verification:** Repeat locked setup and four checks; verify package.json and package-lock.json have no diff.

**Residual:** Score 2. No engine pin, runtime manager file, cross-platform matrix or offline-install guarantee.

## R6 - Verification / agent operations

**Classification:** Confirmed

**Cause:** Baseline tests cover utilities only; no tracked .github/workflows exists.

**Event:** UI/hook regression is introduced while unit tests and build remain green.

**Consequence:** False confidence and defects reaching review.

**Component:** src/utils/*.test.ts; baseline tracked-file inventory

**Evidence:** Baseline 2 files/40 passing tests; all nine new integration/name checks fail on the unchanged app.

**Likelihood:** 2

**Impact:** 2

**Score:** 4

**Mitigation:** Targeted hook and UI tests are included with M1/M2; retain manual four-command gate until a separate CI proposal is approved.

**Owner:** Ibrakhim Razyyev (test owner)

**Verification:** verified-final-test.txt: 5 files/56 passed; run all commands before merge.

**Residual:** Score 4, PARTIAL. No CI, coverage measurement, full end-to-end suite or broader browser matrix.

## R7 - Correctness / trust boundary

**Classification:** Plausible / unverified

**Cause:** overlapCheck assumes existing booking tuples contain valid numeric intervals.

**Event:** A future external importer supplies malformed room.existing data.

**Consequence:** A conflict could be ignored or misleading output produced.

**Component:** src/utils/time.ts:77-83; RoomState existing: Booking[]

**Evidence:** Static inspection shows no validation of each existing tuple. Current mock addBooking parses inputs and rejects reversed/invalid values; no external importer exists.

**Likelihood:** 1

**Impact:** 2

**Score:** 2

**Mitigation:** Do not add speculative validation in this task; require a schema-validation boundary if external data is introduced.

**Owner:** Ibrakhim Razyyev, before an import/backend feature

**Verification:** If the feature is added, introduce malformed-data tests and integration checks at the new boundary.

**Residual:** Score 2, UNVERIFIED candidate. No present reachable failure or exploit is claimed.

## R8 - Dependency / reproducibility

**Classification:** Unsupported

**Cause:** AI candidate incorrectly suggests that dependency locking is missing.

**Event:** Unchallenged advice causes unnecessary lockfile regeneration.

**Consequence:** Avoidable dependency churn.

**Component:** package-lock.json

**Evidence:** git ls-files includes package-lock.json; it contains exact versions/integrity hashes and npm ci succeeded.

**Likelihood:** 1

**Impact:** 1

**Score:** 1

**Mitigation:** Reject the candidate. Keep existing lockfile and prefer evidence over generic audit advice.

**Owner:** Ibrakhim Razyyev (reviewer)

**Verification:** Compare baseline/final lockfile hashes and git diff.

**Residual:** Screening score 1 only; not an accepted repository defect. No corrective code change warranted.

## R9 - Security / confidential data

**Classification:** Unsupported as a current finding

**Cause:** Generic secret-exposure suspicion has no file or execution evidence in the reviewed source.

**Event:** A reviewer incorrectly labels the repository as leaking live credentials.

**Consequence:** Misleading release decisions and wasted effort.

**Component:** .gitignore; tracked-file inventory; src/

**Evidence:** .env is ignored; the app uses mock data and no backend import. No .env values were read and no comprehensive secret/history scan was performed.

**Likelihood:** 1

**Impact:** 1

**Score:** 1

**Mitigation:** Reject the asserted leak; keep no-secret instruction and require a dedicated scan if credentials/backends are later introduced.

**Owner:** Ibrakhim Razyyev (security reviewer)

**Verification:** Review any future auth/data change; use a vetted scanner without exposing matches in logs.

**Residual:** Screening score 1 only; absence of evidence is not a certification that all history is secret-free.
