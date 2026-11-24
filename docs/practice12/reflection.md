# Short AI-use reflection - draft for student review

Codex reused the existing deterministic engine and generated the duration form,
Node-RED flow configuration, shared cases and evidence scripts. The low-code
track used a real local Node-RED/FlowFuse runtime rather than a simulated screen.
Code inspection and executions were performed by the agent; independent student
review is still required.

The most useful verification compared visible status and reason codes, not only
API responses. It found that the low-code widget initially rendered an object
instead of a message; a native JSONata binding repaired it. A harness race was
also corrected so AVAILABLE could not be confused with UNAVAILABLE. A fresh
mobile client exposed an omitted unchecked-checkbox value, repaired by normalizing
it to false before validation. Both final
interfaces passed the same eight cases without changing booking definitions.

Security findings were kept proportional to evidence: validation tests are not
a penetration test, and advisory counts are not proof that one platform is
secure. Timing was recorded but involved reused code and overlapping work, so
it cannot establish general speed advantages. I would retain the code-based
track for this small portable checker, while using low-code where visual workflow
handoff justifies the extra server/platform maintenance.
