import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Monkey Portfolio', () => {
  it('updates hero and profile from the developer selector', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /select kikazaru/i }));

    expect(screen.getByRole('heading', { name: 'Kikazaru' })).toBeInTheDocument();
    expect(screen.getByText(/systems that stay calm under pressure/i)).toBeInTheDocument();
  });

  it('preselects the active developer when booking a call', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /select iwazaru/i }));
    fireEvent.click(screen.getByRole('button', { name: /book a call with iwazaru/i }));

    expect(screen.getByLabelText(/^developer$/i)).toHaveValue('iwazaru');
  });

  it('shows a success state after valid local submission', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'ada@example.com' } });
    fireEvent.change(screen.getByLabelText(/project summary/i), {
      target: { value: 'A playful portfolio.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send project brief/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/brief received/i);
  });
});
