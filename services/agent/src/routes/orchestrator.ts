import { Router } from 'express';
import { revenueOrchestrator } from '../agents/revenue-orchestrator.js';

export const orchestratorRouter = Router();

orchestratorRouter.post('/chat', async (req, res) => {
  const { message, sessionId, language } = req.body;

  try {
    const result = await revenueOrchestrator(message, sessionId, language);
    res.json(result);
  } catch (error) {
    console.error('Orchestrator error:', error);
    res.status(500).json({ error: 'Agent processing failed' });
  }
});
