# Practice 12 - one shared contract

Story: As a student, I want to enter a future start time and duration so I can
understand whether Room 101 is available without changing existing bookings.

Fixed data: now=540 (09:00), existing=[[600,660]] (10:00-11:00), one fictional
room. No login, payment, production database or personal booking data.
Inputs: startTime (HH:MM or whole minutes), duration (whole minutes), blocked
(boolean), and the fixed fictional booking context. Outputs: available boolean,
reasonCode, clear visible message and unchanged booking snapshot.

AC1 start strictly after now; AC2 duration is 1..120 inclusive; AC3 overlaps
reject but touching endpoints do not overlap; AC4 blocked room rejects valid
requests; AC5 show the decision without changing bookings; AC6 reject invalid
inputs with understandable feedback. Input validation precedes availability.
The original engine's predicates/order are preserved for valid requests.

common-cases.json was written before implementation. T1-T8 are identical across
both tracks. Message wording may differ; boolean and machine reason code must
agree. Code T8 checks DEFAULT_ROOM immutability; low-code T8 compares fixed
booking output and the whole exported flow configuration before/after tests.
