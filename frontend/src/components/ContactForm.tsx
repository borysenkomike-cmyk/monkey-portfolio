import { useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { developers } from '../data/developers';
import {
  validateContact,
  type ContactErrors,
  type ContactValues,
} from '../lib/validateContact';
import { ContactToast } from './ContactToast';

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const clearFieldError = (event: ChangeEvent<HTMLFormElement>) => {
    const field = (event.target as HTMLElement).getAttribute('name') as keyof ContactValues | null;
    if (!field) return;

    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextValues = Object.fromEntries(formData) as unknown as ContactValues;
    const nextErrors = validateContact(nextValues);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalidField = (['name', 'email', 'developer', 'summary'] as const).find(
        (field) => nextErrors[field],
      );
      if (firstInvalidField) {
        document.getElementById(`contact-${firstInvalidField}`)?.focus();
      }
      return;
    }

    form.reset();
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-section__intro">
        <span className="section-heading__index">03 / Say hello</span>
        <h2 id="contact-title">Let&apos;s make something bananas.</h2>
        <p>Bring us the rough idea. We&apos;ll help turn it into a product people want to use.</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} onChange={clearFieldError} noValidate>
        {Object.keys(errors).length > 0 && (
          <p className="contact-form__error-summary" role="alert">
            Please check the highlighted fields and try again.
          </p>
        )}
        <div className="field">
          <label htmlFor="contact-name">Your name</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            placeholder="Jane Appleseed"
          />
          {errors.name && <span id="contact-name-error" className="field__error">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            placeholder="jane@company.com"
          />
          {errors.email && <span id="contact-email-error" className="field__error">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="contact-developer">Developer</label>
          <select
            id="contact-developer"
            name="developer"
            defaultValue="mizaru"
            aria-invalid={Boolean(errors.developer)}
            aria-describedby={errors.developer ? 'contact-developer-error' : undefined}
          >
            {developers.map((developer) => (
              <option key={developer.id} value={developer.id}>
                {developer.name} — {developer.role}
              </option>
            ))}
          </select>
          {errors.developer && (
            <span id="contact-developer-error" className="field__error">{errors.developer}</span>
          )}
        </div>

        <div className="field field--wide">
          <label htmlFor="contact-summary">Project summary</label>
          <textarea
            id="contact-summary"
            name="summary"
            rows={4}
            aria-invalid={Boolean(errors.summary)}
            aria-describedby={errors.summary ? 'contact-summary-error' : undefined}
            placeholder="What are we building, and why now?"
          />
          {errors.summary && (
            <span id="contact-summary-error" className="field__error">{errors.summary}</span>
          )}
        </div>

        <button className="button button--primary contact-form__submit" type="submit">
          Send project brief
          <ArrowUpRight aria-hidden="true" />
        </button>
      </form>

      {submitted && <ContactToast onClose={() => setSubmitted(false)} />}
    </section>
  );
}
