import type { Booking, RoomState } from './utils/time';

export const DEFAULT_ROOM: RoomState = {
  now: 540,
  blocked: false,
  existing: [[600, 660]],
};

export const QUICK_SLOTS: [number, number][] = [
  [540, 600],
  [660, 720],
  [720, 780],
  [780, 840],
];

export const cloneRoom = (room: RoomState): RoomState => ({
  now: room.now,
  blocked: room.blocked,
  existing: room.existing.map(([s, e]) => [s, e] as Booking),
});
