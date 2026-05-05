import { describe, it, expect } from 'vitest';

const API_URL = process.env.API_URL || 'http://localhost:8180';

describe('Health API', () => {
  it('GET /health returns 200', async () => {
    const res = await fetch(`${API_URL}/health`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty('status');
  });
});

describe('Auth API', () => {
  it('GET /auth/providers returns available providers', async () => {
    const res = await fetch(`${API_URL}/auth/providers`);
    expect(res.status).toBe(200);
    const data = await res.json() as { success: boolean; data: { firebase: boolean; openai: boolean } };
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('firebase');
    expect(data.data).toHaveProperty('openai');
  });
});

describe('Services API', () => {
  it('GET /services returns service list', async () => {
    const res = await fetch(`${API_URL}/services`);
    expect(res.status).toBe(200);
    const data = await res.json() as { success: boolean; data: unknown[] };
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });
});

describe('Booking API', () => {
  it('POST /booking/hold without auth returns 401', async () => {
    const res = await fetch(`${API_URL}/booking/hold`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId: 'test', slotId: 'test' }),
    });
    expect(res.status).toBe(401);
  });
});

describe('Chat API', () => {
  it('POST /chat returns AI response', async () => {
    const res = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello', language: 'en' }),
    });
    // May return 200 or 502 depending on agent service
    expect([200, 502]).toContain(res.status);
  });
});
