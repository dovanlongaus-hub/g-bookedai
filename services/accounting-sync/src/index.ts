import express from 'express';
import cors from 'cors';
import pino from 'pino';

const logger = pino({ name: 'accounting-sync' });
const app = express();
const port = Number(process.env.PORT) || 8085;

app.use(cors());
app.use(express.json());

// Xero config
const XERO_CLIENT_ID = process.env.XERO_CLIENT_ID || '';
const XERO_CLIENT_SECRET = process.env.XERO_CLIENT_SECRET || '';
const XERO_REDIRECT_URI = process.env.XERO_REDIRECT_URI || 'https://api.g.bookedai.au/accounting/xero/callback';
const XERO_SCOPES = 'openid profile email accounting.transactions accounting.contacts accounting.settings offline_access';

let xeroTokens: { access_token: string; refresh_token: string; expires_at: number; tenant_id: string } | null = null;

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'accounting-sync',
    xeroConnected: !!xeroTokens && Date.now() < (xeroTokens?.expires_at || 0),
  });
});

// Step 1: Redirect to Xero OAuth
app.get('/xero/connect', (_req, res) => {
  if (!XERO_CLIENT_ID) {
    res.status(503).json({ error: 'XERO_CLIENT_ID not configured' });
    return;
  }
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: XERO_CLIENT_ID,
    redirect_uri: XERO_REDIRECT_URI,
    scope: XERO_SCOPES,
    state: 'bookedai-xero',
  });
  res.redirect(`https://login.xero.com/identity/connect/authorize?${params}`);
});

// Step 2: OAuth callback
app.get('/xero/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) { res.status(400).json({ error: 'Missing code' }); return; }

  try {
    const tokenRes = await fetch('https://identity.xero.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${XERO_CLIENT_ID}:${XERO_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: XERO_REDIRECT_URI,
      }),
    });

    const tokens = await tokenRes.json() as { access_token: string; refresh_token: string; expires_in: number };

    // Get tenant ID
    const connectionsRes = await fetch('https://api.xero.com/connections', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const connections = await connectionsRes.json() as { tenantId: string }[];

    xeroTokens = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: Date.now() + tokens.expires_in * 1000,
      tenant_id: connections[0]?.tenantId || '',
    };

    logger.info({ tenantId: xeroTokens.tenant_id }, 'Xero connected');
    res.json({ success: true, message: 'Xero connected', tenantId: xeroTokens.tenant_id });
  } catch (err: any) {
    logger.error({ err }, 'Xero OAuth failed');
    res.status(500).json({ error: err.message });
  }
});

// Refresh token if needed
async function ensureToken() {
  if (!xeroTokens) throw new Error('Xero not connected. Visit /xero/connect first.');
  if (Date.now() < xeroTokens.expires_at - 60_000) return; // Still valid

  const res = await fetch('https://identity.xero.com/connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${XERO_CLIENT_ID}:${XERO_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: xeroTokens.refresh_token,
    }),
  });
  const tokens = await res.json() as { access_token: string; refresh_token: string; expires_in: number };
  xeroTokens.access_token = tokens.access_token;
  xeroTokens.refresh_token = tokens.refresh_token;
  xeroTokens.expires_at = Date.now() + tokens.expires_in * 1000;
  logger.info('Xero token refreshed');
}

// Create invoice in Xero
app.post('/invoice', async (req, res) => {
  const { contactName, contactEmail, lineItems, reference, dueDate } = req.body;

  try {
    await ensureToken();

    const invoice = {
      Type: 'ACCREC',
      Contact: { Name: contactName, EmailAddress: contactEmail },
      DateString: new Date().toISOString().split('T')[0],
      DueDateString: dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      Reference: reference,
      Status: 'AUTHORISED',
      LineAmountTypes: 'Inclusive', // GST inclusive
      LineItems: (lineItems || []).map((item: any) => ({
        Description: item.description,
        Quantity: item.quantity || 1,
        UnitAmount: (item.amountCents / 100).toFixed(2),
        AccountCode: '200', // Sales revenue
        TaxType: 'OUTPUT', // GST on sales
      })),
    };

    const xeroRes = await fetch('https://api.xero.com/api.xro/2.0/Invoices', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${xeroTokens!.access_token}`,
        'Xero-Tenant-Id': xeroTokens!.tenant_id,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ Invoices: [invoice] }),
    });

    const result = await xeroRes.json() as { Invoices: { InvoiceID: string; InvoiceNumber: string }[] };
    const created = result.Invoices?.[0];

    logger.info({ invoiceId: created?.InvoiceID, ref: reference }, 'Invoice created in Xero');
    res.json({ success: true, data: { invoiceId: created?.InvoiceID, invoiceNumber: created?.InvoiceNumber } });
  } catch (err: any) {
    logger.error({ err }, 'Failed to create Xero invoice');
    res.status(500).json({ success: false, error: err.message });
  }
});

// Record payment against invoice
app.post('/payment', async (req, res) => {
  const { invoiceId, amountCents, reference, paymentDate } = req.body;

  try {
    await ensureToken();

    const payment = {
      Invoice: { InvoiceID: invoiceId },
      Account: { Code: '090' }, // Bank account
      Amount: (amountCents / 100).toFixed(2),
      Date: paymentDate || new Date().toISOString().split('T')[0],
      Reference: reference,
    };

    const xeroRes = await fetch('https://api.xero.com/api.xro/2.0/Payments', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${xeroTokens!.access_token}`,
        'Xero-Tenant-Id': xeroTokens!.tenant_id,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ Payments: [payment] }),
    });

    const result = await xeroRes.json() as { Payments: { PaymentID: string }[] };
    logger.info({ paymentId: result.Payments?.[0]?.PaymentID }, 'Payment recorded in Xero');
    res.json({ success: true, data: result.Payments?.[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GST report data
app.get('/gst-summary', async (_req, res) => {
  try {
    await ensureToken();

    const xeroRes = await fetch(
      `https://api.xero.com/api.xro/2.0/Reports/GST?fromDate=${new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0]}&toDate=${new Date().toISOString().split('T')[0]}`,
      {
        headers: {
          'Authorization': `Bearer ${xeroTokens!.access_token}`,
          'Xero-Tenant-Id': xeroTokens!.tenant_id,
          'Accept': 'application/json',
        },
      }
    );

    const result = await xeroRes.json();
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => {
  logger.info({ port }, 'Accounting Sync service started');
});
