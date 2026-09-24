import { useState, type SyntheticEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { developers } from '../data/developers';
import { ContactToast } from './ContactToast';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
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
        <div className="field">
          <label htmlFor="contact-name">Your name</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Jane Appleseed"
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
          />
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
