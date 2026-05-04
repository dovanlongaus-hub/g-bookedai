import nodemailer from 'nodemailer';
import type { NotificationType } from '@bookedai/shared';
import { getEmailTemplate } from '../templates/index.js';
import { logger } from '../lib/logger.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(type: NotificationType, to: string, data: Record<string, unknown>) {
  const template = getEmailTemplate(type, data);

  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'Longcare AU <noreply@longcare.au>',
    to,
    subject: template.subject,
    html: template.html,
  });

  logger.info({ type, to }, 'Email sent');
}
