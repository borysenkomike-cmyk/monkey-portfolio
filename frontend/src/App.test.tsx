import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Monkey Portfolio', () => {
  it('updates hero and profile from the developer selector', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /select kikazaru/i }));

    expect(screen.getByRole('heading', { name: 'Kikazaru' })).toBeInTheDocument();
    expect(screen.getByText(/calm systems, even under pressure/i)).toBeInTheDocument();
  });

  it('keeps the active developer selected when following the booking link', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /select iwazaru/i }));
    const bookingLink = screen.getByRole('link', { name: /book a call with iwazaru/i });

    expect(bookingLink).toHaveAttribute('href', '#contact');
    expect(screen.getByLabelText(/^developer$/i)).toHaveValue('iwazaru');
  });

  it('clears the form and announces a valid local submission', () => {
    render(<App />);

    const name = screen.getByLabelText(/your name/i);
    const email = screen.getByLabelText(/email/i);
    const summary = screen.getByLabelText(/project summary/i);

    fireEvent.change(name, { target: { value: 'Ada' } });
    fireEvent.change(email, { target: { value: 'ada@example.com' } });
    fireEvent.change(summary, {
      target: { value: 'A playful portfolio.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send project brief/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/request sent/i);
    expect(name).toHaveValue('');
    expect(email).toHaveValue('');
    expect(summary).toHaveValue('');
  });

  it('numbers the opening section consistently with the rest of the page', () => {
    render(<App />);

    expect(screen.getByText('01 / Meet the crew')).toBeInTheDocument();
  });

  it('keeps carousel controls available independent of animation', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /previous developer/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /next developer/i })).toBeEnabled();
  });

  it('keeps the contact developer synchronized with profile selection', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /select kikazaru/i }));

    expect(screen.getByLabelText(/^developer$/i)).toHaveValue('kikazaru');
  });

  it('links to the selected project with a native anchor', () => {
    render(<App />);

    const projectLink = screen.getAllByRole('link', { name: /view projects/i })[0];

    expect(projectLink).toHaveAttribute('href', '#projects');
  });

  it('announces invalid submission and focuses the first invalid field', () => {
    render(<App />);
    const email = screen.getByLabelText(/email/i);
    fireEvent.change(email, { target: { value: 'ada@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /send project brief/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/check the highlighted fields/i);
    expect(screen.getByLabelText(/your name/i)).toHaveFocus();
    expect(email).toHaveValue('ada@example.com');
  });
});
