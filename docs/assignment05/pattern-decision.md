# Task 3 - One focused formatting adapter

Problem: the hook feeds presentation labels (11:00 AM) back into a parser that
accepts HH:MM or minutes. Display and edit representations have different contracts.

Decision: use ONE small functional Adapter at that boundary: minutesToInput in
src/utils/time.ts converts validated domain minutes to editable HH:MM. The hook
uses it for both quick-slot fields; App uses it for the mock-time default. Existing
minutesToLabel remains the display formatter. No class hierarchy, Strategy chain,
dependency injection framework, or second structural refactor is introduced.

Before: domain minutes -> minutesToLabel -> editable field -> parse failure.
After: domain minutes -> minutesToInput -> editable field -> parseTimeInput ->
original domain minutes. Display text still uses minutesToLabel.

Why not Strategy? Availability rules are a short ordered series of pure checks,
with no runtime rule-family selection. Strategy objects would add indirection
without solving the observed formatting mismatch. Broad parser grammar expansion
would enlarge accepted inputs unnecessarily. A typed function is enough here;
this is a boundary-adapter technique, not a claim of a full GoF object structure.

Cost: one exported helper and one explicit representation choice at each editable
boundary. The helper expects valid whole-minute values from the existing typed
domain, rather than becoming a new validator. Seven format/parse tests include
00:00, a single-digit minute, noon, 23:59 and the 24:00 end boundary. Four hook
tests verify all quick slots; the first slot remains unavailable at now=09:00.
All original forty tests remain unchanged and pass.
