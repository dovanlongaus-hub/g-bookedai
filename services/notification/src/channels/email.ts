import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import type { NotificationType } from '@bookedai/shared';
import { getImpersonatedAuth } from '@bookedai/google';
import { getEmailTemplate } from '../templates/index.js';
import { logger } from '../lib/logger.js';

const FROM_EMAIL = 'bookedai.au <ceo@longcare.au>';

/**
 * Encode an email into base64url format for Gmail API
 */
function encodeMessage(to: string, subject: string, html: string): string {
  const boundary = `boundary_${Date.now()}`;
  const message = [
    `From: ${FROM_EMAIL}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(html).toString('base64'),
    `--${boundary}--`,
  ].join('\r\n');

  return Buffer.from(message).toString('base64url');
}

/**
 * Send email via Gmail API using domain-wide delegation (impersonating ceo@longcare.au)
 */
async function sendViaGmailApi(to: string, subject: string, html: string): Promise<void> {
  const auth = getImpersonatedAuth('ceo@longcare.au', [
    'https://www.googleapis.com/auth/gmail.send',
  ]);

  const gmail = google.gmail({ version: 'v1', auth });
  const raw = encodeMessage(to, subject, html);

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw },
  });
}

/**
 * Fallback: send email via nodemailer SMTP (if configured)
 */
async function sendViaSmtp(to: string, subject: string, html: string): Promise<void> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('SMTP credentials not configured');
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: FROM_EMAIL,
    to,
    subject,
    html,
  });
}

/**
 * Send an email notification.
 * Primary: Gmail API with domain-wide delegation (ceo@longcare.au)
 * Fallback: nodemailer SMTP
 */
export async function sendEmail(type: NotificationType, to: string, data: Record<string, unknown>) {
  const template = getEmailTemplate(type, data);

  try {
    await sendViaGmailApi(to, template.subject, template.html);
    logger.info({ type, to, method: 'gmail_api' }, 'Email sent via Gmail API');
  } catch (gmailErr) {
    logger.warn({ err: gmailErr, type, to }, 'Gmail API failed, trying SMTP fallback');

    try {
      await sendViaSmtp(to, template.subject, template.html);
      logger.info({ type, to, method: 'smtp' }, 'Email sent via SMTP fallback');
    } catch (smtpErr) {
      logger.error({ err: smtpErr, type, to }, 'Both Gmail API and SMTP failed');
      throw new Error(`Email delivery failed for ${to}: Gmail API and SMTP both failed`);
    }
  }
}
