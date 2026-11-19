import { useState } from 'react';
import {
  DoorClosed,
  Clock,
  CalendarClock,
  CheckCircle2,
  XCircle,
  Settings,
  Ban,
  Plus,
  Trash2,
  Building2,
  Timer,
} from 'lucide-react';
import { minutesToInput, minutesToLabel } from '@/utils/time';
import { QUICK_SLOTS } from '@/fixtures';
import { useRoomChecker } from '@/hooks/useRoomChecker';

function App() {
  const {
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
  } = useRoomChecker();

  const [showSettings, setShowSettings] = useState(false);
  const [newBookingStart, setNewBookingStart] = useState('13:00');
  const [newBookingEnd, setNewBookingEnd] = useState('14:00');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-200">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">Room Availability Checker</h1>
              <p className="text-xs text-slate-500">Smart Campus — Room 101</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Mock Settings"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              showSettings
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Mock Settings</span>
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                  room.blocked
                    ? 'bg-red-100 text-red-600'
                    : 'bg-emerald-100 text-emerald-600'
                }`}
              >
                {room.blocked ? <Ban className="w-7 h-7" /> : <DoorClosed className="w-7 h-7" />}
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Room Status</p>
                <p className={`text-lg font-bold ${room.blocked ? 'text-red-600' : 'text-emerald-600'}`}>
                  {room.blocked ? 'Blocked' : 'Operational'}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> Current mock time: {minutesToLabel(room.now)}
                </p>
              </div>
            </div>
            <button
              onClick={toggleBlocked}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                room.blocked ? 'bg-red-500' : 'bg-emerald-500'
              }`}
              aria-label="Toggle room blocked status"
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  room.blocked ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-2xl shadow-sm border border-blue-200 p-5 space-y-5">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">Mock Settings</h2>
            </div>

            {/* Current time */}
            <div>
              <label htmlFor="mock-now" className="text-xs font-medium text-slate-600 mb-1.5 block">Current time (mock)</label>
              <div className="flex gap-2">
                <input
                  id="mock-now"
                  type="text"
                  defaultValue={minutesToInput(room.now)}
                  onChange={(e) => updateNow(e.target.value)}
                  placeholder="HH:MM or minutes"
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-400 self-center">{minutesToLabel(room.now)}</span>
              </div>
            </div>

            {/* Existing bookings */}
            <div>
              <p className="text-xs font-medium text-slate-600 mb-2 block">Existing bookings</p>
              <div className="space-y-2">
                {sortedBookings.length === 0 && (
                  <p className="text-xs text-slate-400 italic">No existing bookings.</p>
                )}
                {sortedBookings.map(([s, e], i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <CalendarClock className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">
                        {minutesToLabel(s)} – {minutesToLabel(e)}
                      </span>
                      <span className="text-xs text-slate-400">({e - s} min)</span>
                    </div>
                    <button
                      onClick={() => removeBooking(i)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove booking"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add booking */}
              <div className="flex gap-2 mt-3">
                <label htmlFor="booking-start" className="sr-only">Booking start time</label>
                <input
                  id="booking-start"
                  type="text"
                  value={newBookingStart}
                  onChange={(e) => setNewBookingStart(e.target.value)}
                  placeholder="Start"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="booking-end" className="sr-only">Booking end time</label>
                <input
                  id="booking-end"
                  type="text"
                  value={newBookingEnd}
                  onChange={(e) => setNewBookingEnd(e.target.value)}
                  placeholder="End"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => addBooking(newBookingStart, newBookingEnd)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Time Input Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Check a Time Slot</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="slot-start" className="text-xs font-medium text-slate-600 mb-1.5 block">Start Time</label>
              <input
                id="slot-start"
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="09:00"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="slot-end" className="text-xs font-medium text-slate-600 mb-1.5 block">End Time</label>
              <input
                id="slot-end"
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="10:00"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {inputError && (
            <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">{inputError}</p>
          )}

          <button
            onClick={handleCheck}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 transition-all active:scale-[0.99]"
          >
            Check Availability
          </button>

          {/* Quick slots */}
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">Quick check:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_SLOTS.map(([s, e]) => (
                <button
                  key={`${s}-${e}`}
                  onClick={() => handleQuickSlot(s, e)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-xs font-medium text-slate-600 transition-colors"
                >
                  {minutesToLabel(s)} – {minutesToLabel(e)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Banner */}
        {result && (
          <div
            className={`rounded-2xl p-5 border-2 transition-all ${
              result.available
                ? 'bg-emerald-50 border-emerald-300'
                : 'bg-red-50 border-red-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  result.available ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              >
                {result.available ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : (
                  <XCircle className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`text-lg font-bold ${
                    result.available ? 'text-emerald-700' : 'text-red-700'
                  }`}
                >
                  {result.available ? 'AVAILABLE' : 'UNAVAILABLE'}
                </p>
                {result.reason && (
                  <p className="text-sm text-slate-600 mt-1">{result.reason}</p>
                )}
                {result.available && parsedStart !== null && parsedEnd !== null && (
                  <p className="text-sm text-emerald-600 mt-1">
                    Room 101 is free from {minutesToLabel(parsedStart)} to {minutesToLabel(parsedEnd)} ({parsedEnd - parsedStart} min).
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="text-center py-2">
          <p className="text-xs text-slate-400">
            Max 120 min per slot · Touching endpoints don't overlap · Checks availability only
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
