import express from 'express';
import cors from 'cors';
import { orchestratorRouter } from './routes/orchestrator.js';

const app = express();
const port = Number(process.env.PORT) || 8081;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'agent.g.bookedai.au' });
});

app.use('/orchestrator', orchestratorRouter);

app.listen(port, () => {
  console.log(`Agent service running on port ${port}`);
});
