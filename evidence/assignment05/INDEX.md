# Evidence index and provenance

Target baseline: 924680a9f5a509e56d79e211fa127834759d0892. Date: 19 November
2026; client timezone Asia/Almaty (UTC+5). Node 26.13.0, npm 11.20.0, macOS arm64.
Raw .txt outputs are captured, not reconstructed. Matching .json sidecars record
argv, cwd, UTC timestamps and exit codes where capture_checks.py was used.
That wrapper exits normally after capturing a child failure: read the child
exit_code in JSON, not the wrapper status.

Authoritative sequence:
1. baseline-install-authorized.txt: successful npm ci --ignore-scripts with
   temporary cache and fetch flags; tool exit 0. Initial DNS failures retained.
2. baseline-{test,lint,typecheck,build}.txt: 40 tests pass; all four exit 0.
3. baseline-browser-verified.txt: real Chrome reproduction, exit 0 (observational
   baseline script expects to record the defect, not to assert final success).
4. regression-before-test.txt: 40 pass, 9 fail; child exit 1. Only new tests
   were added to baseline application source at this stage.
5. final-{test,lint,typecheck,build}.txt: first modified attempt. Tests 56 pass,
   lint/build exit 0, typecheck exit 2. Retained as an intermediate failure.
6. verified-final-{test,lint,typecheck,build}.txt: corrected final test typing,
   56 pass/0 fail/0 skipped, all four exit 0. Final source tests contain the
   corrected typing; assertions were not relaxed.
7. final-browser.txt: final Chrome checks, child exit 0, no page errors;
   1280x1000 desktop and 402x874 mobile viewport (full-page images are taller).
8. baseline-audit.txt: successful audit query with findings, child exit 1.
   verified-final-audit.txt and verified-final-audit-production.txt were captured
   directly by shell redirection; both tool exit 1 because findings remain.
   Full audit = 14 entries (9 high, 4 moderate, 1 low), production-only = 1 high.
   The earlier final-audit*.txt files are failed DNS attempts, not successful
   audits. No manually invented start/end timestamps are supplied for direct runs.
9. inspection-dependency-paths.txt: npm ls paths and exact versions, exit 0.

All screenshots are local live application captures. Baseline-repeat-desktop
shows the observed invalid-input rejection; a CSS transition was in progress in
the banner background. No claim about final styling is based on that transition.
No terminal screenshot is fabricated; raw logs are the test execution evidence.
The missing bundled Chromium and first Chrome-harness method error are retained
in baseline-browser.txt / baseline-browser-chrome.txt. The latter process was
later cleaned up; its partial output is not a passing browser result.

No production deployment, remote smoke test, CI execution, screen-reader session,
multi-engine browser matrix, comprehensive secret scan or student sign-off is
claimed. Old root evidence in the repository is historical Practice #10 data.
