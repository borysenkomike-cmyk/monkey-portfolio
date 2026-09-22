import { describe, expect, it } from 'vitest';
import { validateContact } from './validateContact';

describe('validateContact', () => {
  it('reports every required empty field', () => {
    expect(validateContact({ name: '', email: '', developer: '', summary: '' })).toEqual({
      name: 'Tell us your name.',
      email: 'Add your email.',
      developer: 'Choose a developer.',
      summary: 'Tell us a little about the project.',
    });
  });

  it('rejects a malformed email', () => {
    expect(
      validateContact({
        name: 'Ada',
        email: 'ada@',
        developer: 'mizaru',
        summary: 'A portfolio',
      }).email,
    ).toBe('Enter a valid email.');
  });
});
