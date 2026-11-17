# Room Availability Checker (Smart Campus — Room 101)

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
npm install
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
- `src/hooks/useRoomChecker.ts` — React state hook wiring logic to the UI.
- `src/fixtures.ts` — fictional default room and quick slots.
- `src/App.tsx` — the UI.

## Notes

- This app uses fictional data only. No Supabase/backend is required.
- Safe-agent rules and human review gates live in `AGENTS.md`.
