# Verification Summary

**Execution date:** 2026-11-17 (15:36 UTC)
**Working directory:** /home/project
**Environment:** Node v22.23.1, npm 10.9.8, Linux
**Verification target:** Final project state (post Practice #10 patch)

## Commands executed

Each command below was run exactly as listed against the current project. The
complete, unmodified terminal output of each is saved alongside this file in
`evidence/`. Output was captured directly via shell redirection — not
hand-written or summarized.

| # | Command | Output file | Exit code | Result |
|---|---------|-------------|-----------|--------|
| 1 | `npm run test`     | `evidence/test-results.txt`     | 0 | PASS |
| 2 | `npm run lint`     | `evidence/lint-results.txt`     | 0 | PASS |
| 3 | `npm run typecheck`| `evidence/typecheck-results.txt`| 0 | PASS |
| 4 | `npm run build`    | `evidence/build-results.txt`    | 0 | PASS |

## Test counts

- **Test files:** 2 passed (2 total)
  - `src/utils/time.test.ts` — 19 tests
  - `src/utils/time.risk.test.ts` — 21 tests
- **Total tests:** 40 passed, 0 failed, 0 skipped
- **Framework:** Vitest v5.1.0

## Lint

- **Tool:** ESLint (`eslint .`)
- **Result:** Clean — no errors, no warnings.

## Type check

- **Tool:** `tsc --noEmit -p tsconfig.app.json`
- **Result:** Clean — no type errors.

## Build

- **Tool:** Vite v7.3.7 production build
- **Result:** Success — 1567 modules transformed.
- **Artifacts produced in `dist/`:**
  - `dist/index.html` — 0.71 kB (gzip: 0.39 kB)
  - `dist/assets/index-Dbt6xfJK.css` — 15.22 kB (gzip: 3.58 kB)
  - `dist/assets/index-7pnLAkZx.js` — 157.38 kB (gzip: 50.62 kB)

## Failures

None. All four commands exited with code 0. No errors, no warnings, no failing
tests.

## Notes / limitations

- All output was captured directly from real command execution into the
  `evidence/*.txt` files. Nothing was fabricated, summarized away, or manually
  reconstructed.
- This verification run did **not** capture browser screenshots or mobile
  previews — this environment has no browser or screenshot tool available.
  UI scenarios (11:00–12:00 Available, overlapping 10:30–11:30 Unavailable,
  blocked status, start-exactly-now, 121-minute duration, mobile layout) are
  covered by the passing automated tests in `time.test.ts` and
  `time.risk.test.ts`, but were not visually verified in a live viewport.
- No application logic was modified, no tests removed, no dependencies
  installed, and the application was not published during this verification.
