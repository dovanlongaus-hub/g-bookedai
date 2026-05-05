import express from 'express';
import cors from 'cors';
import { orchestratorRouter } from './routes/orchestrator.js';
import { requestDeviceCode, pollForToken, getAuthStatus, getOpenAIToken, storeExternalToken } from './auth/openai-device-auth.js';

const app = express();
const port = Number(process.env.PORT) || 8081;

app.use(cors());
app.use(express.json());

app.get('/health', async (_req, res) => {
  const auth = getAuthStatus();
  const token = await getOpenAIToken();
  res.json({
    status: 'ok',
    service: 'agent.g.bookedai.au',
    openai: {
      authenticated: auth.authenticated,
      source: auth.source,
      hasToken: !!token,
      expiresAt: auth.expiresAt ? new Date(auth.expiresAt).toISOString() : undefined,
    },
  });
});

/**
 * GET /auth/status
 * Check OpenAI authentication status
 */
app.get('/auth/status', async (_req, res) => {
  const auth = getAuthStatus();
  const token = await getOpenAIToken();
  res.json({
    authenticated: auth.authenticated,
    source: auth.source,
    hasToken: !!token,
    pendingAuth: auth.pendingAuth,
    expiresAt: auth.expiresAt,
  });
});

/**
 * POST /auth/openai/device
 * Start OpenAI Device Authorization Flow
 * Returns a URL for the user to visit and approve
 */
app.post('/auth/openai/device', async (_req, res) => {
  try {
    const result = await requestDeviceCode();
    console.log('\n========================================');
    console.log('  OpenAI Login Required');
    console.log('========================================');
    console.log(`  Open this URL: ${result.verificationUrlComplete}`);
    console.log(`  Or go to: ${result.verificationUrl}`);
    console.log(`  Enter code: ${result.userCode}`);
    console.log(`  Expires in: ${result.expiresIn}s`);
    console.log('========================================\n');

    res.json({
      success: true,
      data: {
        loginUrl: result.verificationUrlComplete,
        verificationUrl: result.verificationUrl,
        userCode: result.userCode,
        expiresIn: result.expiresIn,
        instructions: `Open ${result.verificationUrlComplete} in your browser to approve OpenAI access.`,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /auth/openai/poll
 * Poll for token after user approves on the device auth URL
 */
app.post('/auth/openai/poll', async (_req, res) => {
  try {
    const result = await pollForToken(60); // Poll for up to 5 minutes
    if (result.success) {
      console.log('[OpenAI Auth] User approved! Token stored.');
      res.json({ success: true, message: 'OpenAI authenticated successfully!' });
    } else {
      res.json({ success: false, error: result.error });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /auth/openai/store-token
 * Store a token obtained from browser-side device auth
 */
app.post('/auth/openai/store-token', (req, res) => {
  const { access_token, refresh_token, expires_in } = req.body;
  if (!access_token) {
    res.status(400).json({ success: false, error: 'Missing access_token' });
    return;
  }
  storeExternalToken(access_token, refresh_token, expires_in);
  console.log('[OpenAI Auth] Token stored from browser auth flow');
  res.json({ success: true, message: 'Token stored successfully' });
});

app.use('/orchestrator', orchestratorRouter);

app.listen(port, () => {
  console.log(`Agent service running on port ${port}`);
});
