import { Router } from 'express';
import { logger } from '../lib/logger.js';

export const sseRouter = Router();

// Server-Sent Events for real-time booking status updates
sseRouter.get('/booking/:bookingId', (req, res) => {
  const { bookingId } = req.params;

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  // Send initial connection event
  res.write(`data: ${JSON.stringify({ type: 'connected', bookingId })}\n\n`);

  // Heartbeat every 30s to keep connection alive
  const heartbeat = setInterval(() => {
    res.write(`: heartbeat\n\n`);
  }, 30_000);

  // TODO: Subscribe to Pub/Sub or Firestore for real-time booking updates
  // When booking status changes, send:
  // res.write(`data: ${JSON.stringify({ type: 'status_change', bookingId, status: 'CONFIRMED' })}\n\n`);

  req.on('close', () => {
    clearInterval(heartbeat);
    logger.info({ bookingId }, 'SSE client disconnected');
  });
});

// SSE for AI chat streaming
sseRouter.get('/chat/:sessionId', (req, res) => {
  const { sessionId } = req.params;

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  res.write(`data: ${JSON.stringify({ type: 'connected', sessionId })}\n\n`);

  const heartbeat = setInterval(() => {
    res.write(`: heartbeat\n\n`);
  }, 30_000);

  req.on('close', () => {
    clearInterval(heartbeat);
  });
});
