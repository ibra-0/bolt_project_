# Task 10 - AI reflection

AI-assisted draft for student review. No independent student verification is claimed.

For this assignment, I used OpenAI Codex, identified as a GPT-6-family coding assistant. It received the assignment PDF, the updated public repository, and a bounded preview of the previous conversation. The old Bolt logs provided context, but the new report relies on fresh executions against a preserved baseline.

The most useful suggestion was to test the boundary between displayed time labels and editable input. The original forty tests passed, yet selecting a quick slot produced AM/PM text that the parser rejected during a second check. Four failing hook tests made this a concrete defect rather than a stylistic preference. Five additional tests exposed missing programmatic labels. The final suite passes fifty-six tests after two focused mitigations.

One weak candidate was the suggestion that dependency locking was missing. Inspection showed a committed lockfile, and locked installation succeeded. I would reject that claim rather than accept generic AI advice. Another lesson was that passing tests did not guarantee correct test typings: the first modified typecheck failed, and Codex corrected the test code before repeating the complete gate.

Codex performed the recorded file inspection, diff review, browser checks, and command execution. These are agent checks, not a substitute for my independent student review. I still need to inspect both mitigations, reproduce the key scenarios, and approve the final submission myself. Clear repository instructions improved scope control and evidence handling. Next, I would review dependency advisories in a separate change and introduce continuous integration without weakening the existing acceptance criteria.

Word count: 246 (reflection body only).
