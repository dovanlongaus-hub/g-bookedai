'use client';

import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.g.bookedai.au';
const AGENT_URL = API_URL; // Agent auth proxied through API

// OpenAI Device Auth — browser-side (avoids Cloudflare challenge)
const OPENAI_DEVICE_AUTH_URL = 'https://auth0.openai.com/oauth/device/code';
const OPENAI_TOKEN_URL = 'https://auth0.openai.com/oauth/token';
const OPENAI_CLIENT_ID = 'DRivsnm2Mu42T3KOpqdtwB3NYviHYzwD';

type Step = 'idle' | 'requesting' | 'waiting' | 'polling' | 'success' | 'error';

export default function OpenAIAuthPage() {
  const [step, setStep] = useState<Step>('idle');
  const [deviceData, setDeviceData] = useState<{
    device_code: string;
    user_code: string;
    verification_uri: string;
    verification_uri_complete: string;
    interval: number;
    expires_in: number;
  } | null>(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<{ authenticated: boolean; source: string } | null>(null);

  // Check current auth status
  useEffect(() => {
    fetch(`${API_URL}/auth/agent/status`)
      .then(r => r.json())
      .then(d => setStatus(d))
      .catch(() => {});
  }, [step]);

  async function startDeviceAuth() {
    setStep('requesting');
    setError('');

    try {
      const res = await fetch(OPENAI_DEVICE_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: OPENAI_CLIENT_ID,
          audience: 'https://api.openai.com/v1',
          scope: 'openid profile email offline_access',
        }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = await res.json();
      setDeviceData(data);
      setStep('waiting');
    } catch (err: any) {
      setError(err.message);
      setStep('error');
    }
  }

  async function startPolling() {
    if (!deviceData) return;
    setStep('polling');

    const { device_code, interval } = deviceData;
    const pollMs = (interval || 5) * 1000;

    for (let i = 0; i < 60; i++) {
      await new Promise(r => setTimeout(r, pollMs));

      try {
        const res = await fetch(OPENAI_TOKEN_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
            client_id: OPENAI_CLIENT_ID,
            device_code,
          }),
        });

        const data = await res.json();

        if (data.access_token) {
          // Send token to agent service to store
          await fetch(`${API_URL}/auth/agent/store-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              access_token: data.access_token,
              refresh_token: data.refresh_token,
              expires_in: data.expires_in,
            }),
          });

          setStep('success');
          return;
        }

        if (data.error === 'authorization_pending') continue;
        if (data.error === 'slow_down') { await new Promise(r => setTimeout(r, 5000)); continue; }
        if (data.error === 'expired_token') { setError('Code expired. Try again.'); setStep('error'); return; }
        if (data.error === 'access_denied') { setError('Access denied.'); setStep('error'); return; }
      } catch {}
    }
    setError('Timeout — please try again.');
    setStep('error');
  }

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#0a0a0a', minHeight: '100vh', color: '#ededed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 500, width: '100%', padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/logo-light.png" alt="bookedai.au" style={{ height: 32, marginBottom: 16 }} />
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>OpenAI Authentication</h1>
          <p style={{ color: '#888', fontSize: 14 }}>Connect your OpenAI account to power the AI chat agent</p>
        </div>

        {/* Status */}
        {status && (
          <div style={{
            padding: '12px 16px', borderRadius: 8, marginBottom: 24,
            background: status.authenticated ? 'rgba(12,206,107,0.1)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${status.authenticated ? 'rgba(12,206,107,0.3)' : 'rgba(255,255,255,0.1)'}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: status.authenticated ? '#0cce6b' : '#f5a623' }} />
              <span style={{ fontSize: 13 }}>
                {status.authenticated ? `Connected (${status.source})` : 'Not connected'}
              </span>
            </div>
          </div>
        )}

        {/* Step: Idle */}
        {step === 'idle' && (
          <button onClick={startDeviceAuth} style={{
            width: '100%', padding: '14px 24px', borderRadius: 10,
            background: '#0070f3', color: '#fff', border: 'none',
            fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}>
            Connect OpenAI Account
          </button>
        )}

        {/* Step: Requesting */}
        {step === 'requesting' && (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#0070f3', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
            <p style={{ color: '#888' }}>Requesting device code...</p>
          </div>
        )}

        {/* Step: Waiting for user to open URL */}
        {step === 'waiting' && deviceData && (
          <div>
            <div style={{ background: 'rgba(0,112,243,0.1)', border: '1px solid rgba(0,112,243,0.3)', borderRadius: 12, padding: 24, textAlign: 'center', marginBottom: 24 }}>
              <p style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>Open this link and enter the code:</p>

              <a
                href={deviceData.verification_uri_complete}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block', padding: '12px 32px', borderRadius: 8,
                  background: '#0070f3', color: '#fff', textDecoration: 'none',
                  fontSize: 15, fontWeight: 600, marginBottom: 16,
                }}
              >
                Open OpenAI Login
              </a>

              <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Or go to:</p>
                <code style={{ fontSize: 13, color: '#0070f3', background: 'rgba(0,112,243,0.1)', padding: '4px 12px', borderRadius: 4 }}>
                  {deviceData.verification_uri}
                </code>
              </div>

              <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Your code:</p>
                <div style={{
                  fontSize: 32, fontWeight: 800, letterSpacing: 4,
                  color: '#fff', fontFamily: 'monospace',
                  background: 'rgba(255,255,255,0.05)', padding: '12px 24px',
                  borderRadius: 8, display: 'inline-block',
                }}>
                  {deviceData.user_code}
                </div>
              </div>

              <p style={{ fontSize: 11, color: '#555', marginTop: 12 }}>
                Expires in {Math.round(deviceData.expires_in / 60)} minutes
              </p>
            </div>

            <button onClick={startPolling} style={{
              width: '100%', padding: '14px 24px', borderRadius: 10,
              background: '#0cce6b', color: '#fff', border: 'none',
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
            }}>
              I've approved — Check now
            </button>
          </div>
        )}

        {/* Step: Polling */}
        {step === 'polling' && (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#0cce6b', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
            <p style={{ color: '#888' }}>Waiting for approval...</p>
            <p style={{ color: '#555', fontSize: 12 }}>Please approve in the OpenAI window</p>
          </div>
        )}

        {/* Step: Success */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>&#x2705;</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Connected!</h2>
            <p style={{ color: '#888', fontSize: 14 }}>OpenAI is now powering the bookedai.au AI agent.</p>
            <a href="https://g.bookedai.au" style={{
              display: 'inline-block', marginTop: 24, padding: '12px 32px', borderRadius: 8,
              background: '#0070f3', color: '#fff', textDecoration: 'none',
              fontSize: 14, fontWeight: 600,
            }}>
              Go to Dashboard
            </a>
          </div>
        )}

        {/* Step: Error */}
        {step === 'error' && (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>&#x274C;</div>
            <p style={{ color: '#ef4444', marginBottom: 16 }}>{error}</p>
            <button onClick={() => { setStep('idle'); setError(''); }} style={{
              padding: '12px 24px', borderRadius: 8,
              background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)',
              fontSize: 14, fontWeight: 500, cursor: 'pointer',
            }}>
              Try Again
            </button>
          </div>
        )}

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
}
