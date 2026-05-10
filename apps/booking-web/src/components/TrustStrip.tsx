'use client';

import { ShieldCheck, Zap, Lock } from 'lucide-react';

const TRUST_ITEMS = [
  { text: 'Free cancellation 24h prior', icon: ShieldCheck },
  { text: 'Instant confirmation', icon: Zap },
  { text: 'SSL secured', icon: Lock },
];

export function TrustStrip() {
  return (
    <div className="trust-strip">
      {TRUST_ITEMS.map(({ text, icon: Icon }) => (
        <div key={text} className="trust-strip__item">
          <Icon size={14} style={{ color: 'var(--accent)' }} />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}
