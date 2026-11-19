# Practice 11 - Explain availability contract

Story: As a student, I want a short explanation of room availability so I
understand the decision.

Flow: user time fields -> parse/validate -> existing deterministic checker ->
status and reason code -> minimal five-field request -> mock adapter -> schema
and factual-agreement validation -> explanation UI. The deterministic banner
remains authoritative. Invalid requests and failed/invalid outputs use a safe
deterministic fallback. No explanation output flows back into booking state.

Current trust boundary: browser-local mock only, clearly labeled in UI. Future
real flow: browser -> reviewed server with request revalidation/authoritative
decision and server-held key -> LLM provider -> validated result -> browser.
No such server/provider integration was implemented or invoked.

Input, exactly five fields:

```json
{"roomLabel":"Room 101","startTime":"11:00","endTime":"12:00","isAvailable":true,"reasonCode":"AVAILABLE"}
```

Room label is allowlisted, times are strings 1-16 characters and must parse as
whole minutes or HH:MM, availability is boolean, and reason code is one of
AVAILABLE/BLOCKED/INVALID_TIME/INVALID_INPUT/PAST_TIME/TOO_LONG/OVERLAP. Only
AVAILABLE pairs with isAvailable=true. Unexpected fields and malformed input
are rejected before adapter invocation. No user prose, identity or complete
booking list is sent to the adapter. Structured codes are added by the rule
engine; no reason-message string matching or new availability decision is added.

Provider response: exactly {"explanation": string}; nonempty, max 240 characters,
single paragraph, at most two sentence terminators, no HTML. For this closed
mock, accept only the canonical text for the reason code. This deliberately
rejects arbitrary paraphrases as well as unsupported/contradictory facts.

Service result adds source=mock|fallback, optional failure category and measured
local latencyMs. No availability value is returned by the explanation service.
Default deadline is 700 ms; active work is aborted on timeout/unmount/context
change. The service deadline also bounds adapters that ignore cancellation.
One button request at a time; a second click is disabled while pending. Timers
and event listeners are cleaned up. No retry loop or paid calls.

AC1: old booking rules unchanged, original tests pass.
AC2: explanation agrees with supplied deterministic code; no new booking facts.
AC3: empty/malformed/oversized requests are rejected before adapter execution.
AC4: timeout, simulated error/missing key and invalid output use safe fallback.
AC5: confirmed status is separate from mock-generated/fallback text and remains
unchanged; mock label is always visible. Dynamic feedback uses a polite status
region; this is not a full accessibility certification.

Limits: mock does not interpret prompts or assess actual LLM quality. A real
server must re-establish trust in decisions and enforce independent budgets.
Inherited dependency audit warnings from Assignment 05 were not remediated or
newly audited in this practice; package manifests and lockfile are unchanged.
