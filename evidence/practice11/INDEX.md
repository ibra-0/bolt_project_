# Real verification record - 19 November 2026

Environment: macOS arm64, Node 26.13.0, npm 11.20.0. Baseline final Assignment 05
commit dbf088428f512404f8b42ec7bcccaa910ef09f9d was restored from the preserved
Git bundle because the old checkout had been removed. New branch:
practice11/explain-availability. No user edits were overwritten.

Setup: npm ci --ignore-scripts --offline --no-audit --cache
/private/tmp/assignment05-npm-cache; exit 0, 361 packages. No dependency changes.

Baseline npm run test: 56 passed in 5 files, exit 0. Baseline npm run lint,
typecheck and build: each exit 0. Fresh practice logs are outside the source
repo in Practice_11_Ibrakhim_Razyyev/evidence; old source evidence is historical.

First feature proposal plus review regressions: 94 passed / 2 failed, exit 1.
F1 contradiction accepted after format-only validation; F2 missing live region.
Proposal diff and read-only review were retained before repair. Two focused
fixes were then applied. Final and verified-final runs: 96 passed / 0 failed /
0 skipped in 7 files; lint, typecheck and build each exit 0. All 56 pre-existing
tests and fixture/dependency files are unchanged. Rule predicates and ordering
remain unchanged; reasonCode is additive metadata, and the hook preserves it.

Browser: installed Chrome via headless Playwright, 1280x1100. Twelve expected vs
observed scenarios pass; confirmed status remains unchanged after every
explanation. Only 127.0.0.1 network requests and no page errors were recorded.
First mobile capture after resizing had a compositor artifact; it is retained
but not used as final layout evidence. A fresh 402x874 page produced the verified
mobile screenshot; scrollWidth=innerWidth=402 and only one h1 exists. The
full-page screenshot is 1112 pixels tall, not the viewport height.

Raw logs are captured directly; JSON sidecars contain argv, cwd, UTC times and
child exit codes. capture_checks.py itself exits normally after recording a
failed child; use the sidecar child exit_code. No manually fabricated terminal
images, output, model calls or student sign-off.

Not performed: real LLM API/key, real model prompt comparison, external provider
latency/token measurement, public deployment, email, merge, screen-reader
session, multi-engine browser matrix or new dependency audit. The earlier
Assignment 05 dependency warnings remain historical context, not a fresh audit.
