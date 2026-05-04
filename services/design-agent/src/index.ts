import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { designRouter } from './routes/design.js';
import { brandRouter } from './routes/brand.js';
import { componentRouter } from './routes/component.js';

const logger = pino({ name: 'design-agent' });
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', service: 'design-agent', version: '0.1.0' });
});

app.use('/design', designRouter);
app.use('/brand', brandRouter);
app.use('/component', componentRouter);

const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Design Agent service started');
});
