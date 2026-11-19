import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';

afterEach(cleanup);

describe('Editable times have programmatic labels (R2)', () => {
  it.each(['Start Time', 'End Time'])('names the %s field', (name) => {
    render(<App />);
    expect(screen.getByRole('textbox', { name }).tagName).toBe('INPUT');
  });

  it.each(['Current time (mock)', 'Booking start time', 'Booking end time'])(
    'names the %s settings field', (name) => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: 'Mock Settings' }));
      expect(screen.getByRole('textbox', { name }).tagName).toBe('INPUT');
    }
  );
});
