export type Booking = [number, number];

export interface RoomState {
  now: number;
  blocked: boolean;
  existing: Booking[];
}

export type CheckOutcome =
  | { available: true }
  | { available: false; reason: string };

export const minutesToLabel = (mins: number): string => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h < 12 || h === 24 ? 'AM' : 'PM';
  let displayH = h % 12;
  if (displayH === 0) displayH = 12;
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`;
};

export const parseTimeInput = (raw: string): number | null => {
  const trimmed = raw.trim();
  if (trimmed === '') return null;

  if (/^\d+$/.test(trimmed)) {
    const n = parseInt(trimmed, 10);
    if (!Number.isSafeInteger(n) || n < 0 || n > 1440) return null;
    return n;
  }

  const m = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (m) {
    const h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    if (h < 0 || h > 24 || min < 0 || min >= 60) return null;
    // 24:00 is the end-of-day boundary (1440); 24:01–24:59 are invalid.
    if (h === 24 && min !== 0) return null;
    return h * 60 + min;
  }

  return null;
};

export const validateTimeBounds = (start: number, end: number): string | null => {
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end)) {
    return 'Start and end times must be whole-minute values.';
  }
  if (start < 0) return 'Start time cannot be earlier than 00:00 (12:00 AM).';
  if (end > 1440) return 'End time cannot exceed 24:00 (12:00 AM).';
  if (start >= end) return 'Start time must be earlier than end time.';
  return null;
};

export const isFutureCheck = (start: number, now: number): string | null => {
  if (start <= now) {
    return `Start time must be in the future (after ${minutesToLabel(now)}).`;
  }
  return null;
};

export const durationCheck = (start: number, end: number): string | null => {
  const dur = end - start;
  if (dur > 120) return `Duration is ${dur} minutes, which exceeds the 120-minute maximum.`;
  return null;
};

export const blockedCheck = (blocked: boolean): string | null => {
  if (blocked) return 'The room is currently marked as blocked — no requests can be accepted.';
  return null;
};

export const overlapCheck = (start: number, end: number, existing: Booking[]): string | null => {
  const conflicts = existing.filter(([bs, be]) => start < be && bs < end);
  if (conflicts.length > 0) {
    const [cs, ce] = conflicts[0];
    return `This slot overlaps with an existing booking (${minutesToLabel(cs)} – ${minutesToLabel(ce)}).`;
  }
  return null;
};

export const checkAvailability = (
  start: number,
  end: number,
  room: RoomState
): CheckOutcome => {
  const blocked = blockedCheck(room.blocked);
  if (blocked) return { available: false, reason: blocked };

  if (!Number.isSafeInteger(room.now) || room.now < 0 || room.now > 1439) {
    return { available: false, reason: 'Current mock time is invalid.' };
  }

  const bounds = validateTimeBounds(start, end);
  if (bounds) return { available: false, reason: bounds };

  const future = isFutureCheck(start, room.now);
  if (future) return { available: false, reason: future };

  const dur = durationCheck(start, end);
  if (dur) return { available: false, reason: dur };

  const overlap = overlapCheck(start, end, room.existing);
  if (overlap) return { available: false, reason: overlap };

  return { available: true };
};
