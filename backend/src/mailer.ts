import nodemailer from 'nodemailer';

import { config } from './config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.gmailUser,
    pass: config.gmailAppPassword,
  },
});

export async function sendAutoReply(to: string, name: string): Promise<void> {
  await transporter.sendMail({
    from: `"Monkey Portfolio" <${config.gmailUser}>`,
    to,
    bcc: config.contactBcc,
    subject: 'We received your project brief',
    text: [
      `Hi ${name},`,
      '',
      'Thanks for reaching out! We received your project brief and will get back to you soon.',
      '',
      'The Monkey Portfolio team',
    ].join('\n'),
  });
}