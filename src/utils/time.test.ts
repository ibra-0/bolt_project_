import { describe, it, expect } from 'vitest';
import {
  checkAvailability,
  type RoomState,
} from './time';
import { DEFAULT_ROOM, cloneRoom } from '../fixtures';

// ─── AC1: Time range bounds (0 <= start < end <= 1440, start > now) ───

describe('AC1 — time range bounds and future check', () => {
  it('rejects a start time in the past (start <= now)', () => {
    // start=540 equals now=540; AC1 requires start > now (strictly in the future)
    const outcome = checkAvailability(540, 600, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(false);
    expect(outcome.available ? '' : outcome.reason).toContain('future');
  });

  it('rejects a start time equal to now', () => {
    // start=540 == now; must be strictly after now
    const outcome = checkAvailability(540, 560, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(false);
  });

  it('rejects a reversed interval (start >= end)', () => {
    // start=660, end=600 — start must be < end
    const outcome = checkAvailability(660, 600, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(false);
    expect(outcome.available ? '' : outcome.reason).toContain('earlier than');
  });

  it('rejects an end time exceeding 1440', () => {
    // end=1500 exceeds the 1440-minute day boundary
    const outcome = checkAvailability(1380, 1500, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(false);
    expect(outcome.available ? '' : outcome.reason).toContain('24:00');
  });

  it('rejects a negative start time', () => {
    // start=-10 is below 0
    const outcome = checkAvailability(-10, 60, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(false);
    expect(outcome.available ? '' : outcome.reason).toContain('00:00');
  });

  it('accepts a valid future slot within bounds', () => {
    // start=541 > now=540, end=600, duration=59min, no overlap with [600,660]
    const outcome = checkAvailability(541, 600, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(true);
  });
});

// ─── AC2: Duration <= 120 minutes ───

describe('AC2 — duration limit', () => {
  it('rejects a 121-minute slot', () => {
    // 541→662 = 121 min, exceeds the 120-minute cap
    const outcome = checkAvailability(541, 662, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(false);
    expect(outcome.available ? '' : outcome.reason).toContain('exceeds the 120-minute');
  });

  it('accepts exactly 120 minutes', () => {
    // 541→661 = 120 min — boundary is inclusive (<= 120)
    // Does not overlap [600,660]? 541 < 660 and 600 < 661 → overlap.
    // Use a slot that's exactly 120 min and doesn't overlap: 660→780
    const outcome = checkAvailability(660, 780, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(true);
  });

  it('accepts a 60-minute slot', () => {
    // 660→720 = 60 min, starts after now, touches existing booking at 660 (no overlap)
    const outcome = checkAvailability(660, 720, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(true);
  });
});

// ─── AC3: Blocked room rejects all ───

describe('AC3 — blocked room', () => {
  it('rejects any request when room is blocked', () => {
    const room = cloneRoom(DEFAULT_ROOM);
    room.blocked = true;
    // A slot that would otherwise be valid
    const outcome = checkAvailability(660, 720, room);
    expect(outcome.available).toBe(false);
    expect(outcome.available ? '' : outcome.reason).toContain('blocked');
  });

  it('rejects even a perfectly valid slot when blocked', () => {
    const room = cloneRoom(DEFAULT_ROOM);
    room.blocked = true;
    const outcome = checkAvailability(660, 720, room);
    expect(outcome.available).toBe(false);
  });
});

// ─── AC4: Overlap detection (touching endpoints do NOT overlap) ───

describe('AC4 — overlap with existing bookings', () => {
  it('rejects a slot that overlaps the existing booking', () => {
    // existing=[600,660]; requested 580→620 overlaps since 580 < 660 and 600 < 620
    const outcome = checkAvailability(580, 620, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(false);
    expect(outcome.available ? '' : outcome.reason).toContain('overlaps');
  });

  it('accepts a slot ending exactly when an existing booking starts (touching)', () => {
    // requested 541→600 touches existing [600,660] at 600 — no overlap
    const outcome = checkAvailability(541, 600, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(true);
  });

  it('accepts a slot starting exactly when an existing booking ends (touching)', () => {
    // requested 660→720 touches existing [600,660] at 660 — no overlap
    const outcome = checkAvailability(660, 720, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(true);
  });

  it('rejects a slot fully inside an existing booking', () => {
    // requested 610→650 is entirely inside [600,660]
    const outcome = checkAvailability(610, 650, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(false);
    expect(outcome.available ? '' : outcome.reason).toContain('overlaps');
  });
});

// ─── AC5 + AC6: Result structure and human-readable reasons ───

describe('AC5/AC6 — result shape and error messages', () => {
  it('returns { available: true } with no reason for a valid slot', () => {
    const outcome = checkAvailability(660, 720, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(true);
  });

  it('returns { available: false, reason } with a non-empty string for every rejection', () => {
    const cases: { start: number; end: number; room: RoomState }[] = [
      // AC1 — past start
      { start: 500, end: 560, room: cloneRoom(DEFAULT_ROOM) },
      // AC1 — reversed
      { start: 700, end: 650, room: cloneRoom(DEFAULT_ROOM) },
      // AC2 — too long
      { start: 660, end: 800, room: cloneRoom(DEFAULT_ROOM) },
      // AC3 — blocked
      { start: 660, end: 720, room: { ...cloneRoom(DEFAULT_ROOM), blocked: true } },
      // AC4 — overlap
      { start: 610, end: 650, room: cloneRoom(DEFAULT_ROOM) },
    ];

    for (const c of cases) {
      const outcome = checkAvailability(c.start, c.end, c.room);
      expect(outcome.available).toBe(false);
      if (!outcome.available) {
        expect(outcome.reason).toBeTruthy();
        expect(outcome.reason.length).toBeGreaterThan(10);
      }
    }
  });
});

// ─── Fixture immutability ───

describe('Fixture immutability', () => {
  it('DEFAULT_ROOM has the expected initial values', () => {
    expect(DEFAULT_ROOM.now).toBe(540);
    expect(DEFAULT_ROOM.blocked).toBe(false);
    expect(DEFAULT_ROOM.existing).toEqual([[600, 660]]);
  });

  it('cloneRoom produces a deep copy that does not mutate the original', () => {
    const clone = cloneRoom(DEFAULT_ROOM);
    clone.existing.push([700, 760]);
    clone.blocked = true;
    clone.now = 600;

    expect(DEFAULT_ROOM.now).toBe(540);
    expect(DEFAULT_ROOM.blocked).toBe(false);
    expect(DEFAULT_ROOM.existing).toEqual([[600, 660]]);
    expect(clone.existing).toEqual([[600, 660], [700, 760]]);
  });
});
