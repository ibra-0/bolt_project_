import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { QUICK_SLOTS } from '@/fixtures';
import { useRoomChecker } from './useRoomChecker';

afterEach(cleanup);

describe('Quick slots remain valid when checked again (R1)', () => {
  it.each(QUICK_SLOTS)('round-trips the %i to %i slot', (start, end) => {
    const { result } = renderHook(() => useRoomChecker());
    act(() => result.current.handleQuickSlot(start, end));
    const quickOutcome = result.current.result;
    expect(result.current.parsedStart).toBe(start);
    expect(result.current.parsedEnd).toBe(end);
    expect(result.current.inputError).toBeNull();
    act(() => result.current.handleCheck());
    expect(result.current.result).toEqual(quickOutcome);
  });
});
