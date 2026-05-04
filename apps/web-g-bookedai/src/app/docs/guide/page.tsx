import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Guide — BookedAI',
  description: 'Complete API usage guide with code examples for integrating BookedAI into your application.',
};

export default function ApiGuidePage() {
  const codeStyle = { background: '#0a0a0a', padding: '16px 20px', borderRadius: 8, overflow: 'auto', fontSize: '0.8rem', lineHeight: 1.7, color: '#e0e0e0', border: '1px solid rgba(255,255,255,0.06)', margin: '12px 0 24px' };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px 64px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8 }}>API Guide</h1>
      <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: 48 }}>Everything you need to integrate BookedAI into your application.</p>

      {/* Quick Start */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16 }}>Quick Start</h2>
        <p style={{ color: '#888', marginBottom: 12 }}>Make your first API call in under 30 seconds:</p>
        <pre style={codeStyle}>{`curl -X POST https://api.g.longcare.au/chat \\
  -H "Content-Type: application/json" \\
  -d '{"message": "What services do you offer?", "language": "en"}'`}</pre>
        <p style={{ color: '#888' }}>Response:</p>
        <pre style={codeStyle}>{`{
  "success": true,
  "data": {
    "reply": "Here are our AI mentoring services:\\n\\n• 30-min AI Starter — $29 AUD...",
    "actions": [{"type": "link", "label": "Book Now", "action": "https://book.longcare.au"}]
  }
}`}</pre>
      </section>

      {/* Authentication */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16 }}>Authentication</h2>
        <p style={{ color: '#888', marginBottom: 12 }}>BookedAI supports two authentication methods depending on the endpoint:</p>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 8, color: '#aaa' }}>Firebase Auth (User endpoints)</h3>
        <p style={{ color: '#888', marginBottom: 12 }}>Protected endpoints require a Firebase ID token in the Authorization header. Obtain one via Google Sign-In or Firebase Auth SDK.</p>
        <pre style={codeStyle}>{`curl -X POST https://api.g.longcare.au/booking/hold \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <FIREBASE_ID_TOKEN>" \\
  -d '{"serviceId": "SERVICE_UUID", "slotId": "SLOT_UUID"}'`}</pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 8, color: '#aaa' }}>API Key (Server-to-server)</h3>
        <p style={{ color: '#888', marginBottom: 12 }}>For server-to-server integrations, use your API key in the x-api-key header:</p>
        <pre style={codeStyle}>{`curl -X GET https://api.g.longcare.au/services \\
  -H "x-api-key: your-api-key"`}</pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 8, color: '#aaa' }}>Public endpoints (No auth required)</h3>
        <p style={{ color: '#888' }}>The following endpoints are publicly accessible: <code style={{ background: '#111', padding: '2px 6px', borderRadius: 4 }}>/chat</code>, <code style={{ background: '#111', padding: '2px 6px', borderRadius: 4 }}>/services</code>, <code style={{ background: '#111', padding: '2px 6px', borderRadius: 4 }}>/health</code>, <code style={{ background: '#111', padding: '2px 6px', borderRadius: 4 }}>/payment/guest-checkout</code></p>
      </section>

      {/* Chat API */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16 }}>Chat API</h2>
        <p style={{ color: '#888', marginBottom: 12 }}>Send a message to the AI assistant. Supports EN, VI, ZH.</p>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 8, color: '#aaa' }}>cURL</h3>
        <pre style={codeStyle}>{`curl -X POST https://api.g.longcare.au/chat \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "I want to book a session",
    "language": "en",
    "sessionId": "optional-session-id"
  }'`}</pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 8, color: '#aaa' }}>Node.js</h3>
        <pre style={codeStyle}>{`const response = await fetch('https://api.g.longcare.au/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'I want to book a session',
    language: 'en',
    sessionId: 'optional-session-id'
  })
});

const { data } = await response.json();
console.log(data.reply);`}</pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 8, color: '#aaa' }}>Python</h3>
        <pre style={codeStyle}>{`import requests

response = requests.post('https://api.g.longcare.au/chat', json={
    'message': 'What are your prices?',
    'language': 'en'
})

data = response.json()['data']
print(data['reply'])`}</pre>
      </section>

      {/* Services API */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16 }}>Services API</h2>
        <pre style={codeStyle}>{`# List all services
curl https://api.g.longcare.au/services

# Search services
curl -X POST https://api.g.longcare.au/services/search \\
  -H "Content-Type: application/json" \\
  -d '{"query": "mentor"}'`}</pre>
      </section>

      {/* Booking API */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16 }}>Booking API</h2>
        <p style={{ color: '#888', marginBottom: 12 }}>Create a booking without authentication:</p>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 8, color: '#aaa' }}>cURL</h3>
        <pre style={codeStyle}>{`curl -X POST https://api.g.longcare.au/guest-booking \\
  -H "Content-Type: application/json" \\
  -d '{
    "serviceId": "SERVICE_UUID",
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "+61400111222",
    "paymentMethod": "pay_later"
  }'`}</pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 8, color: '#aaa' }}>Node.js</h3>
        <pre style={codeStyle}>{`const response = await fetch('https://api.g.longcare.au/guest-booking', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    serviceId: 'SERVICE_UUID',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+61400111222',
    paymentMethod: 'pay_later'
  })
});

const { data } = await response.json();
console.log(data.bookingRef); // "BOOK-ABCD1234"`}</pre>

        <p style={{ color: '#888', marginTop: 16 }}>Response includes booking reference and Google Meet link:</p>
        <pre style={codeStyle}>{`{
  "success": true,
  "data": {
    "bookingRef": "BOOK-ABCD1234",
    "meetLink": "https://meet.longcare.au/BOOK-ABCD1234",
    "status": "CONFIRMED"
  }
}`}</pre>
      </section>

      {/* Payment API */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16 }}>Payment API</h2>
        <p style={{ color: '#888', marginBottom: 12 }}>Create a Stripe Checkout session for guest users. Returns a redirect URL to Stripe-hosted payment page.</p>
        <pre style={codeStyle}>{`# Create Stripe checkout session
curl -X POST https://api.g.longcare.au/payment/guest-checkout \\
  -H "Content-Type: application/json" \\
  -d '{"serviceId": "SERVICE_UUID"}'

# Returns: { "data": { "checkoutUrl": "https://checkout.stripe.com/..." } }`}</pre>
      </section>

      {/* Webhooks */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16 }}>Webhooks</h2>
        <p style={{ color: '#888', marginBottom: 12 }}>Stripe webhooks are sent to your configured endpoint. Signatures are verified automatically using the Stripe webhook secret.</p>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 8, color: '#aaa' }}>Verifying Signatures (Node.js)</h3>
        <pre style={codeStyle}>{`import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  switch (event.type) {
    case 'checkout.session.completed':
      // Handle successful payment
      break;
    case 'charge.refunded':
      // Handle refund
      break;
  }

  res.json({ received: true });
});`}</pre>

        <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 8, color: '#aaa' }}>Supported Events</h3>
        <pre style={codeStyle}>{`Events handled:
• checkout.session.completed — Payment successful
• checkout.session.expired — Payment expired
• charge.succeeded — Charge confirmed
• charge.failed — Charge failed
• charge.refunded — Refund processed`}</pre>
      </section>

      {/* WhatsApp */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16 }}>WhatsApp Integration</h2>
        <p style={{ color: '#888', marginBottom: 12 }}>BookedAI auto-replies to WhatsApp messages using the same AI agent:</p>
        <pre style={codeStyle}>{`Webhook URL: https://your-domain.com/whatsapp
Verify Token: your-verify-token

Supported intents: booking, pricing, cancel, refund, payment,
                   contact, greeting, services, meeting, learning`}</pre>
        <p style={{ color: '#888', marginTop: 12 }}>Configure your WhatsApp Business API webhook to point to your BookedAI API endpoint. The AI agent will automatically detect intent and respond in the user&#39;s language (EN, VI, ZH).</p>
      </section>

      {/* Rate Limits */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16 }}>Rate Limits</h2>
        <div style={{ background: '#111', borderRadius: 12, padding: '20px 24px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div><div style={{ color: '#555', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: 4 }}>Window</div><div style={{ fontWeight: 600 }}>15 minutes</div></div>
            <div><div style={{ color: '#555', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: 4 }}>Max Requests</div><div style={{ fontWeight: 600 }}>100</div></div>
            <div><div style={{ color: '#555', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: 4 }}>Headers</div><div style={{ fontWeight: 600 }}>RateLimit-*</div></div>
          </div>
        </div>
        <p style={{ color: '#888', fontSize: '0.85rem', marginTop: 16 }}>When rate limited, the API returns HTTP 429 with a <code style={{ background: '#111', padding: '2px 6px', borderRadius: 4 }}>Retry-After</code> header indicating how many seconds to wait. Implement exponential backoff for production workloads.</p>
        <pre style={codeStyle}>{`# Rate limit response headers
RateLimit-Limit: 100
RateLimit-Remaining: 0
RateLimit-Reset: 1717200000
Retry-After: 120`}</pre>
      </section>

      {/* Errors */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 16 }}>Error Codes</h2>
        <p style={{ color: '#888', marginBottom: 16 }}>All errors follow a consistent JSON format:</p>
        <pre style={codeStyle}>{`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body",
    "details": [{"field": "email", "message": "Invalid email format"}]
  }
}`}</pre>
        <div style={{ display: 'grid', gap: 2 }}>
          {[
            { code: 'UNAUTHORIZED', status: 401, desc: 'Missing or invalid auth token' },
            { code: 'FORBIDDEN', status: 403, desc: 'Insufficient permissions' },
            { code: 'NOT_FOUND', status: 404, desc: 'Resource not found' },
            { code: 'VALIDATION_ERROR', status: 400, desc: 'Invalid request body (Zod validation)' },
            { code: 'SLOT_UNAVAILABLE', status: 409, desc: 'Time slot is no longer available' },
            { code: 'RATE_LIMITED', status: 429, desc: 'Too many requests' },
            { code: 'INTERNAL_ERROR', status: 500, desc: 'Server error' },
          ].map((e, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 60px 1fr', padding: '10px 16px', background: '#111', fontSize: '0.85rem', borderRadius: i === 0 ? '8px 8px 0 0' : i === 6 ? '0 0 8px 8px' : 0 }}>
              <code style={{ color: '#f5a623' }}>{e.code}</code>
              <span style={{ color: '#555' }}>{e.status}</span>
              <span style={{ color: '#888' }}>{e.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <a href="/api-docs" style={{ color: '#0070f3', marginRight: 24 }}>Full API Reference →</a>
        <a href="/docs/openapi.yaml" style={{ color: '#888' }}>Download OpenAPI Spec</a>
      </div>
    </div>
  );
}
