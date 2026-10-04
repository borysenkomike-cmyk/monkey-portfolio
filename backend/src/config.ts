try {
  process.loadEnvFile();
} catch {
  // No .env file
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}. Add it to backend/.env`);
  }
  return value;
}

export const config = {
  gmailUser: required('GMAIL_USER'),
  gmailAppPassword: required('GMAIL_APP_PASSWORD'),
  contactBcc: process.env.CONTACT_BCC,
};