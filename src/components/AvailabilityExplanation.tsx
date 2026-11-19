import { useEffect, useRef, useState } from 'react';
import { createMockAdapter, explainAvailability, type ExplanationRequest, type ExplanationResult, type MockMode } from '@/features/explanation';

export default function AvailabilityExplanation({ request }: { request: ExplanationRequest }) {
  const [mode, setMode] = useState<MockMode>('normal');
  const [pending, setPending] = useState(false);
  const [response, setResponse] = useState<ExplanationResult | null>(null);
  const active = useRef<AbortController | null>(null);
  useEffect(() => () => active.current?.abort(), []);

  const explain = async () => {
    active.current?.abort();
    const controller = new AbortController();
    active.current = controller;
    setPending(true); setResponse(null);
    const result = await explainAvailability(request, createMockAdapter(mode), {
      signal: controller.signal, fallbackCode: request.reasonCode,
    });
    if (controller.signal.aborted) return;
    setResponse(result); setPending(false);
  };

  return (
    <section className="bg-white rounded-2xl border border-blue-200 p-5 space-y-3" aria-label="Availability explanation">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-slate-900">Understand this result</h2>
        <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded">MOCK MODE · no LLM API</span>
      </div>
      <p className="text-xs text-slate-500">Optional explanation. The confirmed availability above is decided by booking rules.</p>
      <div className="flex flex-wrap gap-3 items-center">
        <button type="button" disabled={pending} onClick={explain} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold disabled:opacity-50">
          {pending ? 'Explaining…' : 'Explain availability'}
        </button>
        <label className="text-xs text-slate-600 flex items-center gap-2">
          Mock scenario
          <select value={mode} onChange={e => { active.current?.abort(); setPending(false); setResponse(null); setMode(e.target.value as MockMode); }} className="border border-slate-300 rounded px-2 py-1 bg-white">
            <option value="normal">Normal</option><option value="timeout">Timeout</option>
            <option value="error">API failure</option><option value="missing-key">Unavailable key</option>
            <option value="malformed">Malformed output</option><option value="contradictory">Contradictory output</option>
          </select>
        </label>
      </div>
      <div role="status" aria-live="polite" aria-busy={pending} className="text-sm text-slate-700">
        {pending && <p>Preparing a mock explanation…</p>}
        {response && <>
          <p className="font-semibold text-xs mb-1">{response.source === 'mock' ? 'Mock-generated explanation' : `Deterministic fallback (${response.failure})`}</p>
          <p>{response.explanation}</p>
          <p className="text-xs text-slate-400 mt-2">Local elapsed time: {response.latencyMs} ms · Provider calls: 0 · API cost: $0</p>
        </>}
      </div>
    </section>
  );
}
