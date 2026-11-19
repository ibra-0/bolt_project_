# Read-only AI candidate review - 19 November 2026

Target: baseline 924680a9f5a509e56d79e211fa127834759d0892. Application source
was unchanged during this review; only targeted tests were added for reproduction.
Prompt: propose risks across correctness, maintainability, security/dependencies
and agent operations without editing application files; challenge each claim.

1. CONFIRMED, correctness: useRoomChecker.handleQuickSlot writes AM/PM display
   labels into parser inputs. Baseline browser-verified.txt records 11:00 AM,
   repeatAvailable=0, and invalid=2. Four new hook tests fail; old 40 pass.
2. CONFIRMED, accessibility: App.tsx labels lack htmlFor/input ids; mock booking
   fields have only placeholders. Five new accessible-name tests fail. Baseline
   browser finds zero textboxes named Start Time.
3. CONFIRMED audit signal, dependency/security: npm audit exit 1 reports 14
   vulnerable package entries (9 high, 4 moderate, 1 low). This is not evidence
   of exploitation or of reachable vulnerabilities in the shipped static page.
4. CONFIRMED, agent operations: AGENTS.md lacks setup/runtime, architecture,
   allowed-file scope and bounded-task/rollback guidance. Existing prohibitions
   are useful but do not establish reproducible agent execution.
5. CONFIRMED, reproducibility: README prescribes npm install and specifies no
   runtime. A committed lockfile exists and npm ci succeeds with Node 26.13.0,
   npm 11.20.0. Lockfile engine ranges show older Node installations may fail.
6. CONFIRMED, verification: baseline has only utility tests and no tracked
   .github/workflows. Tests do not exercise the hook or UI labels, allowing
   findings 1 and 2 to survive all 40 baseline tests.
7. PLAUSIBLE/UNVERIFIED, correctness: malformed externally supplied existing
   booking tuples could bypass overlap checks. Current typed mock editor validates
   parsed bounds; no external import/backend exists. No reachable exploit shown.
8. UNSUPPORTED: the repository has no lockfile. Inspection shows a committed
   package-lock.json with integrity hashes; installation succeeds without changes.
9. UNSUPPORTED: live credentials were found. No such evidence; no environment
   values were read. .gitignore excludes .env. This is not a comprehensive secret scan.

Action selection: R1 then R2 are the two tied score-6, directly reproduced
user-facing defects; R3 is also score 6, retained with isolation controls and a
separate dependency-maintenance owner. No blanket npm audit fix.

Diff review plan: add one tiny numeric-minute-to-HH:MM formatting adapter;
reuse it for quick slots and the mock-time default. Add explicit field label
associations and a persistent settings button name. Preserve parser grammar,
availability decision order, fixtures, existing tests, package manifests and lock.
Review this focused diff and rerun all four checks plus local browser evidence.
