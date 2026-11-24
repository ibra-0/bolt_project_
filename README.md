# Room Availability Checker (Smart Campus — Room 101)

## Practice 12 - code-based versus real low-code
Open the code-based duration screen at `/#practice12` after starting Vite.
`src/practice12` reuses the unchanged rule engine with a validated start/duration
adapter. The previous Practice 11 screen remains the default source route.
`lowcode/practice12` contains an importable real Node-RED 5.0.10 / FlowFuse
Dashboard 1.37.0 flow, exact dependency lock and loopback settings. Follow its
README; no account/subscription is needed. Both implementations use the same
fixed 09:00 clock and 10:00-11:00 booking. Shared requirements, test cases and
security/timing limits are under `docs/practice12`.

A small React + TypeScript + Vite app that checks whether a single room is
available for a requested time slot against fictional/mock data. No backend,
login, or booking creation — availability checks only.

## Acceptance criteria (AC1–AC6)

- **AC1** — Time range bounds: `0 <= start < end <= 1440`, and `start > now`.
- **AC2** — Duration limit: slots of at most 120 minutes (inclusive).
- **AC3** — Blocked room rejects every request.
- **AC4** — Overlap detection; touching endpoints (e.g. 10:00–11:00 vs
  11:00–12:00) do NOT overlap.
- **AC5** — Result is `{ available: true }` or `{ available: false, reason }`.
- **AC6** — Rejection reasons are human-readable strings.

## Setup

```bash
# Verified: Node 26.13.0 / npm 11.20.0 (macOS arm64)
npm ci --ignore-scripts
```

## Scripts

```bash
npm run dev        # start the Vite dev server
npm run test       # run the Vitest test suite once
npm run test:watch # run tests in watch mode
npm run lint       # run ESLint over the project
npm run typecheck  # run tsc --noEmit for type checking
npm run build      # produce a production build in dist/
npm run preview    # preview the production build locally
```

## Project layout

- `src/utils/time.ts` — pure time-parsing and availability logic.
- `src/utils/time.test.ts` — AC1–AC6 + fixture immutability tests.
- `src/utils/time.risk.test.ts` — risk regressions for malformed inputs.
- `src/utils/time.input.test.ts` — editable-time adapter round trips.
- `src/hooks/useRoomChecker.test.ts` — quick-slot/recheck regressions.
- `src/App.test.tsx` — accessible field-name regressions.
- `src/hooks/useRoomChecker.ts` — React state hook wiring logic to the UI.
- `src/fixtures.ts` — fictional default room and quick slots.
- `src/App.tsx` — the UI.

## Notes

- This app uses fictional data only. No Supabase/backend is required.
- Safe-agent rules and human review gates live in `AGENTS.md`.
- Use a Node version compatible with the lockfile engine requirements. The
  verified installation leaves `package.json` and `package-lock.json` unchanged.
- Editable times accept 24-hour HH:MM or whole minutes; AM/PM is display-only.
- `evidence/*.txt` are historical Practice #10 logs, not Assignment #05 evidence.
  New logs and audit notes are under `evidence/assignment05/` and
  `docs/assignment05/`. A passing build does not clear dependency audit findings.
- No deployment is performed for this assignment. Review the release decision
  and remaining risks before approving any merge or wider release.

## Practice 11 - Explain availability

After checking a slot, select **Explain availability** for an optional explanation.
This version is explicitly **MOCK MODE**: no provider, API key, external request,
login or database. Confirmed availability is always decided by the existing
checker. Structured reason codes are additive metadata; the booking conditions
and their order are unchanged.

- `src/features/explanation.ts`: five-field request contract, strict response
  validation, closed-vocabulary factual guard, deadline/cancellation and fallback.
- `src/components/AvailabilityExplanation.tsx`: optional button, labeled mock
  failure simulations, polite live feedback and local timing/cost display.
- Corresponding test files: normal/failure cases, input/output safety, agreement,
  cancellation and UI status preservation.
- `docs/practice11/`: feature contract, three-prompt comparison, review and limits.

Use the **Mock scenario** selector to reproduce timeout, API failure, unavailable
key, malformed output or contradictory output. All failures fall back to wording
derived from the deterministic reason code. Input changes clear the explanation.
Mock output is not proof of real-provider prompt quality, latency or cost.

For a future real model, add a reviewed server-side adapter with server-held
keys, request revalidation, budget/rate limits and factual checks. Never add a
VITE API key or call a paid provider directly from the browser. The current
system-instruction constant is a contract specification; mock mode does not
interpret natural-language prompts.
