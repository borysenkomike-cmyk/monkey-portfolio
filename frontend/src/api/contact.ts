export interface ContactRequest {
  name: string;
  email: string;
  developer: string;
  summary: string;
}

export async function sendContact(data: ContactRequest): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

    if (!response.ok) {
    throw new ContactError(response.status);
  }
}

export class ContactError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`Failed to send contact request: ${status}`);
    this.status = status;
  }
}