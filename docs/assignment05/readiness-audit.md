# Task 6 - Agent-readiness audit

Final level: **2 - Documented** (baseline also level 2, with material gaps).
Level 3 is withheld because instruction quality alone is insufficient: dependency
advisories, no CI, narrow browser coverage and independent human sign-off remain.

| Area | Observed baseline | Final evidence / remaining gap |
| --- | --- | --- |
| Readable structure | App -> hook -> pure utilities/fixtures | Retained; one formatting adapter |
| README | Basic setup/scripts; no tested runtime | Locked setup and tested Node/npm documented |
| Dependencies | Lockfile exists, ranges in manifest | Lockfile preserved; 14 audit entries remain |
| Tests | 40 utility tests, no hook/UI tests | 56 tests in 5 files, 9 regressions proved red first |
| Lint/types/build | All three pass | All pass in verified-final logs |
| Agent permissions | Existing prohibitions and review gates | Architecture, scope, safe commands, limits and rollback added |
| Logging | Historical Bolt evidence only | Fresh raw output, exit metadata and screenshots |
| Automation | No tracked CI workflow | Manual pre-merge gate; CI deferred |
| Security | .env ignore, mock-only data | No deployment; audit warnings retained; no formal secret scan |

Evidence: baseline archive; read-only-review.md; baseline/verified-final command
logs; AGENTS.md; final-browser.txt. A fresh clean locked installation succeeded
on macOS arm64, Node 26.13.0/npm 11.20.0. No Linux/Windows matrix, actual
screen-reader session, coverage report, penetration test or production smoke
test was performed. Agent checks are separate from pending student approval.
