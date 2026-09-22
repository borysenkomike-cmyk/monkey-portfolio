import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
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

  it('scrolls and moves focus to the selected project', () => {
    render(<App />);
    const project = document.getElementById('projects');
    expect(project).not.toBeNull();
    project!.scrollIntoView = vi.fn();

    fireEvent.click(screen.getAllByRole('button', { name: /view projects/i })[0]);

    expect(project!.scrollIntoView).toHaveBeenCalledOnce();
    expect(project).toHaveFocus();
  });

  it('moves focus into the contact form after booking', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /book a call with mizaru/i }));

    expect(screen.getByLabelText(/your name/i)).toHaveFocus();
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
