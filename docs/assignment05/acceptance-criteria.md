# Assignment #05 acceptance criteria

These five grouped criteria preserve all original AC1-AC6; no rule is relaxed.

1. **A1 - Valid future interval (AC1):** whole-minute `0 <= start < end <= 1440`,
   `start > now`, and `now` in `0..1439`. Invalid values fail with a reason.
2. **A2 - Duration (AC2):** 120 minutes is accepted when other rules pass;
   121 minutes is rejected.
3. **A3 - Room state and conflicts (AC3/AC4):** blocked rooms reject requests;
   overlaps reject, touching endpoints do not overlap; fixtures remain unchanged.
4. **A4 - Results and errors (AC5/AC6):** success is `{available:true}`;
   rejection includes a non-empty human-readable reason. Malformed input does
   not become an availability success.
5. **A5 - Editable interface:** each quick slot leaves parseable inputs and
   rechecking preserves the outcome; all five editable time fields have
   programmatic names. The settings button keeps its name on narrow screens.

Evidence: original 40 unit tests for A1-A4; four hook regressions, seven
format/parser round trips and five accessible-name tests for A5. Browser checks
exercise quick/repeat, overlap and a 402-pixel settings viewport; they are
targeted checks, not a full browser or screen-reader certification.
