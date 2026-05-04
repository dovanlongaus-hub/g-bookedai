import { Router } from 'express';
import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';
import { randomUUID } from 'crypto';

export const referralRouter = Router();

/**
 * Generate a referral link
 */
referralRouter.post('/generate', async (req, res) => {
  try {
    const { referrerEmail, referrerName } = req.body;
    if (!referrerEmail) {
      res.status(400).json({ success: false, error: 'referrerEmail required' });
      return;
    }

    const code = randomUUID().slice(0, 8).toUpperCase();
    const link = `https://book.longcare.au?ref=${code}&utm_source=referral&utm_medium=link&utm_campaign=${code}`;

    // Log referral
    await query(
      `INSERT INTO audit_logs (id, entity_type, entity_id, action, after_json)
       VALUES ($1, 'referral', $2, 'REFERRAL_CREATED', $3)`,
      [randomUUID(), code, JSON.stringify({ referrerEmail, referrerName, code, link })],
    );

    logger.info({ code, referrerEmail }, 'Referral link generated');

    res.json({
      success: true,
      data: {
        code,
        link,
        message: `Share this link: ${link}. You'll earn a reward when someone books through it.`,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to generate referral' });
  }
});

/**
 * Track referral click
 */
referralRouter.get('/track/:code', async (req, res) => {
  try {
    const { code } = req.params;
    await query(
      `INSERT INTO audit_logs (id, entity_type, entity_id, action, after_json)
       VALUES ($1, 'referral', $2, 'REFERRAL_CLICKED', $3)`,
      [randomUUID(), code, JSON.stringify({ timestamp: new Date().toISOString(), userAgent: req.headers['user-agent'] })],
    );
    // Redirect to booking page with ref code
    res.redirect(`https://book.longcare.au?ref=${code}`);
  } catch {
    res.redirect('https://book.longcare.au');
  }
});
