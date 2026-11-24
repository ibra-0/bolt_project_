import { checkAvailability, parseTimeInput } from '@/utils/time';
import { DEFAULT_ROOM, cloneRoom } from '@/fixtures';

export interface DurationRequest { startTime: string; duration: string | number; blocked: boolean }
export interface DurationResult { available: boolean; reasonCode: string; message: string; existingBookings: number[][] }

export function checkDuration(input: DurationRequest): DurationResult {
  const existingBookings = DEFAULT_ROOM.existing.map(b => [...b]);
  const reject = (reasonCode: string, message: string): DurationResult => ({ available: false, reasonCode, message, existingBookings });
  if (typeof input.startTime !== 'string' || input.startTime.length > 16 || typeof input.blocked !== 'boolean')
    return reject('INVALID_INPUT', 'Enter a valid start time and room status.');
  const start = parseTimeInput(input.startTime);
  if (start === null) return reject('INVALID_INPUT', 'Start time must use HH:MM or whole minutes.');
  const raw = String(input.duration).trim();
  const duration = /^\d+$/.test(raw) ? Number(raw) : NaN;
  if (!Number.isSafeInteger(duration) || duration <= 0 || duration > 120)
    return reject('INVALID_DURATION', 'Duration must be a whole number from 1 to 120 minutes.');
  const end = start + duration;
  if (start >= end || end > 1440) return reject('INVALID_TIME', 'The requested interval must fit within the day.');
  const room = cloneRoom(DEFAULT_ROOM); room.blocked = input.blocked;
  const result = checkAvailability(start, end, room);
  return result.available
    ? { available: true, reasonCode: 'AVAILABLE', message: 'Room 101 is available for this interval.', existingBookings }
    : reject(result.reasonCode, result.reason);
}
