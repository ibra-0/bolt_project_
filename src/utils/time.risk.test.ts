import { describe, it, expect } from 'vitest';
import {
  checkAvailability,
  parseTimeInput,
  validateTimeBounds,
  type RoomState,
} from './time';
import { DEFAULT_ROOM, cloneRoom } from '../fixtures';

// ─── Practice #10 risk regressions: malformed & boundary inputs ───

describe('Risk — NaN, fractional and infinite candidate times', () => {
  it('rejects NaN start via validateTimeBounds', () => {
    expect(validateTimeBounds(NaN, 600)).not.toBeNull();
  });

  it('rejects NaN end via validateTimeBounds', () => {
    expect(validateTimeBounds(540, NaN)).not.toBeNull();
  });

  it('rejects fractional start via validateTimeBounds', () => {
    expect(validateTimeBounds(540.5, 600)).not.toBeNull();
  });

  it('rejects fractional end via validateTimeBounds', () => {
    expect(validateTimeBounds(540, 600.5)).not.toBeNull();
  });

  it('rejects Infinity start via validateTimeBounds', () => {
    expect(validateTimeBounds(Infinity, 600)).not.toBeNull();
  });

  it('rejects -Infinity end via validateTimeBounds', () => {
    expect(validateTimeBounds(540, -Infinity)).not.toBeNull();
  });

  it('checkAvailability rejects fractional start/end instead of crashing', () => {
    const outcome = checkAvailability(540.5, 600, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(false);
    if (!outcome.available) expect(outcome.reason).toBeTruthy();
  });
});

describe('Risk — invalid current mock time (room.now)', () => {
  it('rejects room.now = 1440 (end-of-day is not a valid current minute)', () => {
    const room: RoomState = { ...cloneRoom(DEFAULT_ROOM), now: 1440 };
    const outcome = checkAvailability(1441, 1440, room);
    expect(outcome.available).toBe(false);
  });

  it('rejects NaN room.now', () => {
    const room: RoomState = { ...cloneRoom(DEFAULT_ROOM), now: NaN };
    const outcome = checkAvailability(660, 720, room);
    expect(outcome.available).toBe(false);
    if (!outcome.available) expect(outcome.reason).toBeTruthy();
  });

  it('rejects fractional room.now', () => {
    const room: RoomState = { ...cloneRoom(DEFAULT_ROOM), now: 540.5 };
    const outcome = checkAvailability(660, 720, room);
    expect(outcome.available).toBe(false);
  });
});

describe('Risk — parseTimeInput edge cases', () => {
  it('rejects 24:30 (beyond end-of-day)', () => {
    expect(parseTimeInput('24:30')).toBeNull();
  });

  it('rejects 24:01 through 24:59 representative (24:59)', () => {
    expect(parseTimeInput('24:59')).toBeNull();
  });

  it('rejects 24:01 through 24:59 representative (24:01)', () => {
    expect(parseTimeInput('24:01')).toBeNull();
  });

  it('accepts 24:00 as the end-of-day boundary (1440)', () => {
    expect(parseTimeInput('24:00')).toBe(1440);
  });

  it('rejects numeric minutes below 0 (e.g. -5 not parseable, 0 ok)', () => {
    expect(parseTimeInput('-5')).toBeNull();
  });

  it('rejects numeric minutes above 1440 (1441)', () => {
    expect(parseTimeInput('1441')).toBeNull();
  });

  it('rejects NaN-like strings and empty-ish inputs', () => {
    expect(parseTimeInput('NaN')).toBeNull();
    expect(parseTimeInput('  ')).toBeNull();
    expect(parseTimeInput('abc')).toBeNull();
  });

  it('rejects fractional numeric minutes (540.5)', () => {
    expect(parseTimeInput('540.5')).toBeNull();
  });
});

describe('Risk — touching endpoints still accepted', () => {
  it('accepts a slot ending exactly when an existing booking starts (touching)', () => {
    const outcome = checkAvailability(541, 600, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(true);
  });

  it('accepts a slot starting exactly when an existing booking ends (touching)', () => {
    const outcome = checkAvailability(660, 720, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(true);
  });
});

describe('Risk — exactly-120-minute acceptance preserved', () => {
  it('accepts a 120-minute slot that does not overlap existing bookings', () => {
    const outcome = checkAvailability(660, 780, cloneRoom(DEFAULT_ROOM));
    expect(outcome.available).toBe(true);
  });
});
