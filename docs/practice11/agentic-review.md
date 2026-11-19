# Practice 11 - read-only review of the first feature proposal

Reviewer: OpenAI Codex, same foreground session as implementation; not an
independent human or second AI. Context: proposal diff, README, root AGENTS,
feature contract in the practice brief, related rule engine/hook and tests.
Application files were not changed during this review phase. Proposal retained
as feature-proposal.patch. Review regressions: 94 passed, 2 failed (96 total).

## F1 - Confirmed, high: format validation does not prove factual agreement

Proposal src/features/explanation.ts:45-50 validates shape/length only; line 94
accepts a response after this check. A response saying "The room is unavailable
because of a new booking." passes format checks for an AVAILABLE request.
It contradicts the deterministic status and invents a booking (AC2 violation).
Reproduction: explanation.test.ts, "rejects well-formed but contradictory/invented
provider text"; review-before-test.txt records expected fallback, received mock.
Minimal fix: in this deliberately constrained mock, accept only the canonical
explanation for the supplied reason code after schema validation. Otherwise use
the deterministic fallback. Do not let any response change the confirmed status.
This restricts paraphrases; broader real-model generation requires a separately
reviewed, structured factual-validation design.

## F2 - Confirmed, medium: async feedback lacks programmatic announcement

Proposal src/components/AvailabilityExplanation.tsx:43 uses an ordinary div for
loading/result/fallback feedback. There is no live status region. A student using
assistive technology may miss completion or fallback after pressing the button.
Reproduction: AvailabilityExplanation.test.tsx "announces loading and completion
in a polite live status region"; getByRole('status') fails in review-before log.
Minimal fix: role=status, aria-live=polite and aria-busy tied to pending state.
Verify both loading and completion, rather than claiming full accessibility.

## F3 - Unsupported, security: output executes HTML/scripts in the browser

React renders response.explanation as a text node at component line 47; no
dangerouslySetInnerHTML, eval or executable model output exists. Response shape
also rejects angle brackets. Marked unsupported, not a confirmed XSS exploit.
Verification: source trace plus malformed-output rejection tests. No claim of a
full application penetration test.

## F4 - Unsupported for the current implementation, correctness/performance

Candidate: a late explanation overwrites a changed booking result. App keys the
component by selected inputs, room state and deterministic result; changing any
input clears result and unmounts it. Cleanup aborts the request, and the completion
handler checks cancellation. The test "discards an in-flight explanation when
input changes" passes. No stale status overwrite was reproduced. Human reviewer
should still inspect this lifecycle when adding real network calls.

## F5 - Plausible/unverified future security boundary

The current five-field request is built from trusted local checker output and
sent only to a browser mock; it is not an authenticated server API. A real
provider must be reached through a server that revalidates inputs/recomputes or
authenticates the deterministic decision, holds keys and enforces rate/cost limits.
No key or network exists in this prototype, so this is not a current credential
exposure finding. Real-provider rollout is outside this classroom change.

Decision: implement F1 and F2 only; preserve original booking conditions and
fixtures. Then rerun all tests, lint, typecheck/build and local UI failure cases.
Human student review and any merge/deployment approval remain pending.
