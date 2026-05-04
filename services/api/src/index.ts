import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import { getEnv } from './lib/env.js';
import { logger } from './lib/logger.js';
import { requestId } from './middleware/request-id.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import { chatRouter } from './routes/chat.js';
import { bookingRouter } from './routes/booking.js';
import { paymentRouter } from './routes/payment.js';
import { servicesRouter } from './routes/services.js';
import { learningRouter } from './routes/learning.js';
import { marketingRouter } from './routes/marketing.js';
import { whatsappRouter } from './routes/whatsapp.js';
import { cronRouter } from './routes/cron.js';
import { webhookRouter } from './routes/webhooks.js';
import { healthRouter } from './routes/health.js';
import { authRouter } from './routes/auth.js';
import { sseRouter } from './routes/sse.js';
import { partnersRouter } from './routes/partners.js';
import { exportRouter } from './routes/export.js';
import { referralRouter } from './routes/referral.js';
import { closePool } from '@bookedai/db';

const env = getEnv();
const app = express();

// Trust proxy (behind nginx/Cloudflare)
app.set('trust proxy', 1);

// Security
app.use(helmet());
app.use(requestId);

// CORS - restrict to known origins
const allowedOrigins = env.ALLOWED_ORIGINS.split(',');
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
}));

// Logging
app.use(pinoHttp({ logger }));

// Webhook routes BEFORE json parsing (Stripe needs raw body)
app.use('/webhooks', webhookRouter);

// Body parsing
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/auth', authRouter);
app.use('/health', healthRouter);
app.use('/chat', chatRouter);
app.use('/services', servicesRouter);
app.use('/booking', bookingRouter);
app.use('/payment', paymentRouter);
app.use('/learning', learningRouter);
app.use('/marketing', marketingRouter);
app.use('/whatsapp', whatsappRouter);
app.use('/cron', cronRouter);
app.use('/events', sseRouter);
app.use('/partners', partnersRouter);
app.use('/export', exportRouter);
app.use('/referral', referralRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const server = app.listen(env.PORT, () => {
  logger.info({ port: env.PORT, env: env.NODE_ENV }, 'API service started');
});

// Graceful shutdown
async function shutdown(signal: string) {
  logger.info({ signal }, 'Shutting down gracefully');
  server.close(async () => {
    await closePool();
    logger.info('Server closed');
    process.exit(0);
  });
  // Force close after 10s
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10_000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
