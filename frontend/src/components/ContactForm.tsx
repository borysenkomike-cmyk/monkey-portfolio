import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';

import { developers, type DeveloperId } from '../data/developers';
import {
  validateContact,
  type ContactErrors,
  type ContactValues,
} from '../lib/validateContact';

export function ContactForm() {
    const [selectedDeveloper, setSelectedDeveloper] = useState<DeveloperId>('mizaru');
    const [values, setValues] = useState<Omit<ContactValues, 'developer'>>({
      name: '',
      email: '',
      summary: '',
    });
    const [errors, setErrors] = useState<ContactErrors>({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
      if (!submitted) return;

      const timeoutId = window.setTimeout(() => setSubmitted(false), 4500);
      return () => window.clearTimeout(timeoutId);
    }, [submitted]);

    const updateValue = (field: keyof typeof values, value: string) => {
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const nextValues: ContactValues = {
        ...values,
        developer: selectedDeveloper,
      };
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

      setValues({ name: '', email: '', summary: '' });
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

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
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
              value={values.name}
              onChange={(event) => updateValue('name', event.target.value)}
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
              value={values.email}
              onChange={(event) => updateValue('email', event.target.value)}
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
              value={selectedDeveloper}
              onChange={(event) => setSelectedDeveloper(event.target.value as DeveloperId)}
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
              value={values.summary}
              onChange={(event) => updateValue('summary', event.target.value)}
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

        {submitted && (
          <div className="contact-toast" role="status" aria-live="polite">
            <span className="contact-toast__icon">
              <Check aria-hidden="true" />
            </span>
            <div>
              <strong>Request sent</strong>
              <span>We&apos;ll get back to you soon.</span>
            </div>
            <button type="button" onClick={() => setSubmitted(false)} aria-label="Dismiss notification">
              <X aria-hidden="true" />
            </button>
          </div>
        )}
      </section>
    );
}
