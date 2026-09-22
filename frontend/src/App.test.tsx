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
});
