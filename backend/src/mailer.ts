import nodemailer from 'nodemailer';

import { config } from './config.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // false для порту 587 (використовує STARTTLS)
  auth: {
    user: config.gmailUser,
    pass: config.gmailAppPassword,
  },
  family: 4, // Примусово використовувати IPv4
} as any); // Використовуємо any для уникнення помилок типізації

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