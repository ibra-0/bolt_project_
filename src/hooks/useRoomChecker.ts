import { useCallback, useMemo, useState } from 'react';
import {
  type Booking,
  type RoomState,
  checkAvailability,
  minutesToLabel,
  parseTimeInput,
} from '@/utils/time';
import { DEFAULT_ROOM, cloneRoom } from '@/fixtures';

export interface RoomCheckerResult {
  room: RoomState;
  startTime: string;
  endTime: string;
  parsedStart: number | null;
  parsedEnd: number | null;
  inputError: string | null;
  result: { available: boolean; reason?: string } | null;
  sortedBookings: Booking[];
  setStartTime: (v: string) => void;
  setEndTime: (v: string) => void;
  handleCheck: () => void;
  handleQuickSlot: (s: number, e: number) => void;
  toggleBlocked: () => void;
  updateNow: (raw: string) => void;
  addBooking: (start: string, end: string) => void;
  removeBooking: (idx: number) => void;
}

const outcomeToResult = (
  outcome: ReturnType<typeof checkAvailability>
): { available: boolean; reason?: string } =>
  outcome.available ? { available: true } : { available: false, reason: outcome.reason };

export function useRoomChecker(): RoomCheckerResult {
  const [room, setRoom] = useState<RoomState>(DEFAULT_ROOM);
  const [startTime, setStartTimeState] = useState('09:30');
  const [endTime, setEndTimeState] = useState('10:00');
  const [result, setResult] = useState<{ available: boolean; reason?: string } | null>(null);

  const parsedStart = parseTimeInput(startTime);
  const parsedEnd = parseTimeInput(endTime);

  const inputError = useMemo(() => {
    if (parsedStart === null) return 'Start time is invalid. Use HH:MM or minutes.';
    if (parsedEnd === null) return 'End time is invalid. Use HH:MM or minutes.';
    return null;
  }, [parsedStart, parsedEnd]);

  const setStartTime = useCallback((v: string) => {
    setStartTimeState(v);
    setResult(null);
  }, []);

  const setEndTime = useCallback((v: string) => {
    setEndTimeState(v);
    setResult(null);
  }, []);

  const handleCheck = useCallback(() => {
    if (parsedStart === null || parsedEnd === null) {
      setResult({
        available: false,
        reason: inputError ?? 'Please enter valid times.',
      });
      return;
    }
    const outcome = checkAvailability(parsedStart, parsedEnd, room);
    setResult(outcomeToResult(outcome));
  }, [parsedStart, parsedEnd, inputError, room]);

  const handleQuickSlot = useCallback(
    (s: number, e: number) => {
      setStartTimeState(minutesToLabel(s));
      setEndTimeState(minutesToLabel(e));
      const outcome = checkAvailability(s, e, room);
      setResult(outcomeToResult(outcome));
    },
    [room]
  );

  const toggleBlocked = useCallback(() => {
    setRoom((prev) => {
      const next = cloneRoom(prev);
      next.blocked = !prev.blocked;
      return next;
    });
    setResult(null);
  }, []);

  const updateNow = useCallback((raw: string) => {
    const n = parseTimeInput(raw);
    if (n !== null && n >= 0 && n <= 1440) {
      setRoom((prev) => {
        const next = cloneRoom(prev);
        next.now = n;
        return next;
      });
      setResult(null);
    }
  }, []);

  const addBooking = useCallback((start: string, end: string) => {
    const s = parseTimeInput(start);
    const e = parseTimeInput(end);
    if (s === null || e === null || s >= e) return;
    setRoom((prev) => {
      const next = cloneRoom(prev);
      next.existing = [...prev.existing, [s, e] as Booking].sort((a, b) => a[0] - b[0]);
      return next;
    });
    setResult(null);
  }, []);

  const removeBooking = useCallback((idx: number) => {
    setRoom((prev) => {
      const next = cloneRoom(prev);
      next.existing = prev.existing.filter((_, i) => i !== idx);
      return next;
    });
    setResult(null);
  }, []);

  const sortedBookings = useMemo(
    () => [...room.existing].sort((a, b) => a[0] - b[0]),
    [room.existing]
  );

  return {
    room,
    startTime,
    endTime,
    parsedStart,
    parsedEnd,
    inputError,
    result,
    sortedBookings,
    setStartTime,
    setEndTime,
    handleCheck,
    handleQuickSlot,
    toggleBlocked,
    updateNow,
    addBooking,
    removeBooking,
  };
}
