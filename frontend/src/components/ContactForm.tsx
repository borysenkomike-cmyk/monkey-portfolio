import { useState, type SyntheticEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { developers } from '../data/developers';
import { ContactToast } from './ContactToast';

import { ContactError, sendContact } from '../api/contact';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSending(true);
    setSendError(null);

    try {
      await sendContact({
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        developer: String(formData.get('developer') ?? ''),
        summary: String(formData.get('summary') ?? ''),
      });
      form.reset();
      setSubmitted(true);
    } catch (error) {
      if (error instanceof ContactError && error.status === 429) {
        setSendError('Too many requests. Please try again in an hour.');
      } else {
        setSendError('Could not send your brief. Please try again later.');
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-section__intro">
        <span className="section-heading__index">03 / Say hello</span>
        <h2 id="contact-title">Let&apos;s make something bananas.</h2>
        <p>Bring us the rough idea. We&apos;ll help turn it into a product people want to use.</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="contact-name">Your name</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Jane Appleseed"
            maxLength={80}
          />
        </div>

        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            maxLength={254}
          />
        </div>

        <div className="field">
          <label htmlFor="contact-developer">Developer</label>
          <select
            id="contact-developer"
            name="developer"
            defaultValue="mizaru"
          >
            {developers.map((developer) => (
              <option key={developer.id} value={developer.id}>
                {developer.name} — {developer.role}
              </option>
            ))}
          </select>
        </div>

        <div className="field field--wide">
          <label htmlFor="contact-summary">Project summary</label>
          <textarea
            id="contact-summary"
            name="summary"
            rows={4}
            placeholder="What are we building, and why now?"
            maxLength={2000}
          />
        </div>

        {sendError && (
          <p className="contact-form__error" role="alert">
            {sendError}
          </p>
        )}

        <button
          className="button button--primary contact-form__submit"
          type="submit"
          disabled={isSending}
        >
          {isSending ? 'Sending…' : 'Send project brief'}
          <ArrowUpRight aria-hidden="true" />
        </button>
      </form>

      {submitted && <ContactToast onClose={() => setSubmitted(false)} />}
    </section>
  );
}
