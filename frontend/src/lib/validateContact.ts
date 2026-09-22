import type { DeveloperId } from '../data/developers';

export interface ContactValues {
  name: string;
  email: string;
  developer: DeveloperId | '';
  summary: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name.trim()) errors.name = 'Tell us your name.';

  if (!values.email.trim()) {
    errors.email = 'Add your email.';
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email.';
  }

  if (!values.developer) errors.developer = 'Choose a developer.';
  if (!values.summary.trim()) errors.summary = 'Tell us a little about the project.';

  return errors;
}
