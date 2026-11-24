import { useState } from 'react';
import { checkDuration, type DurationResult } from './duration';

export default function DurationChecker() {
  const [startTime,setStartTime]=useState('12:00');
  const [duration,setDuration]=useState('30');
  const [blocked,setBlocked]=useState(false);
  const [result,setResult]=useState<DurationResult|null>(null);
  return <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-10">
    <main className="max-w-xl mx-auto space-y-6">
      <header><p className="text-sm font-semibold text-blue-700">PRACTICE 12 · CODE-BASED</p><h1 className="text-3xl font-bold mt-2">Smart Campus Room 101</h1><p className="mt-3 text-slate-600">Fixed mock time: 09:00. Existing booking: 10:00-11:00.</p></header>
      <form className="bg-white border rounded-2xl p-6 space-y-5 shadow-sm" onSubmit={e=>{e.preventDefault();setResult(checkDuration({startTime,duration,blocked}));}}>
        <label className="block font-medium">Start time<input type="text" value={startTime} onChange={e=>{setStartTime(e.target.value);setResult(null);}} className="block mt-2 border rounded-lg w-full p-3" /></label>
        <label className="block font-medium">Duration (minutes)<input type="number" step="any" value={duration} onChange={e=>{setDuration(e.target.value);setResult(null);}} className="block mt-2 border rounded-lg w-full p-3" /></label>
        <label className="flex gap-3 items-center"><input type="checkbox" checked={blocked} onChange={e=>{setBlocked(e.target.checked);setResult(null);}} />Room blocked</label>
        <button className="w-full rounded-lg bg-blue-700 text-white p-3 font-semibold" type="submit">Check availability</button>
      </form>
      <section role="status" aria-live="polite" className="bg-white border rounded-2xl p-6" data-testid="duration-result" data-reason-code={result?.reasonCode??''}>
        {result ? <><h2 className={`font-bold text-xl ${result.available?'text-emerald-700':'text-red-700'}`}>{result.available?'AVAILABLE':'UNAVAILABLE'}</h2><p className="mt-2">{result.message}</p><p className="text-sm text-slate-500 mt-3">Reason code: {result.reasonCode}</p></> : <p>Choose a start and duration, then check the room.</p>}
      </section>
      <footer className="text-sm text-slate-500">Checks only · 1-120 minutes · Touching endpoints do not overlap · Bookings stay unchanged</footer>
    </main>
  </div>;
}
