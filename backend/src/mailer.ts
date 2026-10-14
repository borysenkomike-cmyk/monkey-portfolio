import { Resend } from 'resend';
import { config } from './config.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAutoReply(to: string, name: string): Promise<void> {
  await resend.emails.send({
    from: 'Monkey Portfolio <onboarding@resend.dev>',
    to: [to],
    bcc: [config.contactBcc || config.gmailUser],
    subject: 'We received your project brief',
    text: `Hi ${name},\n\nThanks for reaching out! We received your project brief and will get back to you soon.`,
  });
}