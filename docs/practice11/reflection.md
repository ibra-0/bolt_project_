# Short reflection - AI-assisted draft

Codex generated the optional explanation module, UI integration and targeted tests. I used the existing Smart Campus checker as the authoritative decision engine rather than asking an LLM to determine availability. The permitted mock adapter made the workflow testable without credentials or paid calls.

The recorded checks were executed by Codex: fifty-six baseline tests passed, twelve browser scenarios preserved the confirmed status, and the final suite passed ninety-six tests. Read-only review exposed two confirmed weaknesses in the first proposal: format validation accepted a contradictory explanation, and asynchronous feedback lacked a live announcement region. The final implementation adds a reason-specific canonical-output guard and polite status feedback. Existing booking predicates, fixtures and original tests remain intact.

Three prompts were compared as written specifications. Because the mock does not interpret prompts, no improvement in real-model factuality, latency or cost is claimed. Independent student inspection and approval are still required. Before replacing the mock, I would require a server-side adapter, secret handling, budget controls and a real evaluation set.
