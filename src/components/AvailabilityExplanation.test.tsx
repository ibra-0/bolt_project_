import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from '@/App';

afterEach(cleanup);
function available() {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: '11:00 AM – 12:00 PM' }));
}

describe('Explanation UI preserves the confirmed status', () => {
  it('does not show explanation before a deterministic check', () => {
    render(<App />);
    expect(screen.queryByRole('button', { name: 'Explain availability' })).toBeNull();
  });
  it('labels mock output separately and leaves AVAILABLE unchanged', async () => {
    available();
    fireEvent.click(screen.getByRole('button', { name: 'Explain availability' }));
    await screen.findByText('Mock-generated explanation');
    expect(screen.getByText('AVAILABLE').textContent).toBe('AVAILABLE');
    expect(screen.getByText(/no LLM API/).textContent).toContain('MOCK MODE');
  });
  it('discards an in-flight explanation when input changes', async () => {
    available();
    fireEvent.click(screen.getByRole('button', { name: 'Explain availability' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Start Time' }), { target: { value: '12:00' } });
    await act(() => new Promise(resolve => setTimeout(resolve, 200)));
    expect(screen.queryByText('Mock-generated explanation')).toBeNull();
    expect(screen.queryByText('AVAILABLE')).toBeNull();
  });
  it('clears completed explanation on a blocked-state change', async () => {
    available();
    fireEvent.click(screen.getByRole('button', { name: 'Explain availability' }));
    await screen.findByText('Mock-generated explanation');
    fireEvent.click(screen.getByRole('button', { name: 'Toggle room blocked status' }));
    expect(screen.queryByText('Mock-generated explanation')).toBeNull();
  });
  it('shows safe fallback on simulated API failure without changing status', async () => {
    available();
    fireEvent.change(screen.getByRole('combobox', { name: 'Mock scenario' }), { target: { value: 'error' } });
    fireEvent.click(screen.getByRole('button', { name: 'Explain availability' }));
    await screen.findByText('Deterministic fallback (unavailable)');
    expect(screen.getByText('AVAILABLE').textContent).toBe('AVAILABLE');
  });
});

describe('Review finding F2 - dynamic explanation feedback', () => {
  it('announces loading and completion in a polite live status region', async () => {
    available();
    fireEvent.click(screen.getByRole('button', { name: 'Explain availability' }));
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-live')).toBe('polite');
    expect(status.getAttribute('aria-busy')).toBe('true');
    await waitFor(() => expect(status.getAttribute('aria-busy')).toBe('false'));
    expect(status.textContent).toContain('Mock-generated explanation');
  });
});
