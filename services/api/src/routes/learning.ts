import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { logger } from '../lib/logger.js';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { query } from '@bookedai/db';

const sessionSummarySchema = z.object({
  bookingId: z.string().uuid(),
  transcript: z.string().min(1).max(50000),
});

export const learningRouter = Router();

learningRouter.post('/session-summary', authenticate, validate(sessionSummarySchema), async (req, res, next) => {
  try {
    const { bookingId, transcript } = req.body;

    // Verify booking belongs to user
    const bookingResult = await query(
      'SELECT * FROM bookings WHERE id = $1 AND user_id = $2',
      [bookingId, req.auth!.userId],
    );

    if (bookingResult.rows.length === 0) {
      res.status(404).json({ success: false, error: { code: 'BOOKING_NOT_FOUND', message: 'Booking not found' } });
      return;
    }

    // Call learning-agent via HTTP (separate microservice)
    const user = (await query('SELECT * FROM users WHERE id = $1', [req.auth!.userId])).rows[0];
    const agentUrl = process.env.LEARNING_AGENT_URL || 'http://localhost:8084';

    let summaryResult: any;
    try {
      const agentRes = await fetch(`${agentUrl}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript, language: user.language || 'en' }),
      });
      summaryResult = await agentRes.json();
    } catch {
      // Fallback: return processing status if learning-agent is unavailable
      logger.warn('Learning agent unavailable, returning processing status');
      res.json({
        success: true,
        data: { bookingId, status: 'processing', message: 'Session summary is being generated.' },
      });
      return;
    }

    // Store in database
    const { randomUUID } = await import('crypto');
    const sessionId = randomUUID();
    await query(
      `INSERT INTO learning_sessions (id, booking_id, summary, qa_json, improvement_plan, next_cta)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [sessionId, bookingId, summaryResult.summary, JSON.stringify(summaryResult.qaItems), JSON.stringify(summaryResult.improvementAreas), summaryResult.nextCta],
    );

    // Create Google Docs notes
    let docUrl: string | undefined;
    try {
      const { docsService } = await import('@bookedai/google');
      const docResult = await docsService.createSessionNotes({
        title: `Session Notes — ${new Date().toLocaleDateString('en-AU')}`,
        summary: summaryResult.summary,
        keyIdeas: summaryResult.keyIdeas || [],
        qaItems: summaryResult.qaItems || [],
        improvementAreas: summaryResult.improvementAreas || [],
        nextCta: summaryResult.nextCta || '',
        shareWithEmail: user.email,
      });
      docUrl = docResult.docUrl;

      await query(
        `INSERT INTO learning_notes (learning_session_id, google_doc_id, google_doc_url, language)
         VALUES ($1, $2, $3, $4)`,
        [sessionId, docResult.docId, docResult.docUrl, user.language || 'en'],
      );
    } catch (docErr) {
      logger.error({ docErr, sessionId }, 'Failed to create Google Docs notes');
    }

    // Upload transcript to Google Drive
    let driveLink: string | undefined;
    try {
      const { driveService } = await import('@bookedai/google');
      const service = (await query('SELECT name FROM services WHERE id = $1', [bookingResult.rows[0].service_id])).rows[0];
      const driveResult = await driveService.uploadTranscript({
        bookingId,
        sessionDate: new Date().toLocaleDateString('en-AU'),
        serviceName: service?.name || 'Session',
        content: transcript,
      });
      driveLink = driveResult.driveLink;

      // Share transcript with user
      await driveService.shareFile(driveResult.fileId, user.email);
    } catch (driveErr) {
      logger.error({ driveErr, sessionId }, 'Failed to upload transcript to Drive');
    }

    // Create NotebookLM-ready source document
    let notebookLMUrl: string | undefined;
    let notebookInstructions: string | undefined;
    try {
      const { notebookLMService } = await import('@bookedai/google');
      const service = (await query('SELECT name FROM services WHERE id = $1', [bookingResult.rows[0].service_id])).rows[0];
      const nbResult = await notebookLMService.createSessionNotebook({
        sessionDate: new Date().toLocaleDateString('en-AU'),
        serviceName: service?.name || 'Session',
        transcript,
        summary: summaryResult.summary,
        qaItems: summaryResult.qaItems || [],
        improvementAreas: summaryResult.improvementAreas || [],
        nextCta: summaryResult.nextCta || '',
        shareWithEmail: user.email,
      });
      notebookLMUrl = nbResult.notebookLMUrl;
      notebookInstructions = notebookLMService.generateNotebookLMInstructions(nbResult.docUrl);
    } catch (nbErr) {
      logger.error({ nbErr, sessionId }, 'Failed to create NotebookLM source');
    }

    // Publish event
    try {
      const { pubsubService } = await import('@bookedai/google');
      await pubsubService.publishLearningNotesCreated(sessionId, docUrl || '');
    } catch {}

    logger.info({ bookingId, sessionId }, 'Session summary + Drive + NotebookLM generated');

    res.json({
      success: true,
      data: {
        sessionId,
        bookingId,
        summary: summaryResult.summary,
        qaItems: summaryResult.qaItems,
        improvementAreas: summaryResult.improvementAreas,
        nextCta: summaryResult.nextCta,
        googleDocs: { url: docUrl },
        googleDrive: { transcriptLink: driveLink },
        notebookLM: { url: notebookLMUrl, instructions: notebookInstructions },
      },
    });
  } catch (err) {
    next(err);
  }
});

// Get user's learning history
learningRouter.get('/history', authenticate, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT ls.*, b.service_id, s.name as service_name
       FROM learning_sessions ls
       JOIN bookings b ON ls.booking_id = b.id
       JOIN services s ON b.service_id = s.id
       WHERE b.user_id = $1
       ORDER BY ls.created_at DESC`,
      [req.auth!.userId],
    );

    res.json({ success: true, data: result.rows });
  } catch (err) {
    next(err);
  }
});
