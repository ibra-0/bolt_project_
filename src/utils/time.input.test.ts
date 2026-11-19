import { describe, expect, it } from 'vitest';
import { minutesToInput, parseTimeInput } from './time';

describe('Input formatting adapter (R1)', () => {
  it.each([
    [0, '00:00'], [9, '00:09'], [540, '09:00'], [660, '11:00'],
    [720, '12:00'], [1439, '23:59'], [1440, '24:00'],
  ] as const)('formats and round-trips %i as %s', (minutes, label) => {
    expect(minutesToInput(minutes)).toBe(label);
    expect(parseTimeInput(minutesToInput(minutes))).toBe(minutes);
  });
});
