import { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface ContactToastProps {
  onClose: () => void;
}

export function ContactToast({ onClose }: ContactToastProps) {
  useEffect(() => {
    const timeoutId = window.setTimeout(onClose, 4500);
    return () => window.clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div className="contact-toast" role="status" aria-live="polite">
      <span className="contact-toast__icon">
        <Check aria-hidden="true" />
      </span>
      <div>
        <strong>Request sent</strong>
        <span>We&apos;ll get back to you soon.</span>
      </div>
      <button type="button" onClick={onClose} aria-label="Dismiss notification">
        <X aria-hidden="true" />
      </button>
    </div>
  );
}
