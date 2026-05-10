'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck, Calendar, Clock } from 'lucide-react';

interface OrderSummaryProps {
  serviceName: string;
  date: string;
  time: string;
  priceCents: number;
  currency: string;
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function OrderSummary({ serviceName, date, time, priceCents, currency }: OrderSummaryProps) {
  const subtotal = priceCents;
  const gst = Math.round(priceCents / 11); // GST inclusive: price / 11
  const total = priceCents;

  return (
    <Card className="order-summary">
      <CardHeader className="pb-3 pt-4 px-5">
        <CardTitle className="order-summary__title">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-4">
        <div className="order-summary__row">
          <span className="order-summary__label">Service</span>
          <span className="order-summary__value">{serviceName}</span>
        </div>

        <div className="order-summary__row">
          <span className="order-summary__label">
            <Calendar size={13} className="inline mr-1" style={{ verticalAlign: '-2px', color: 'var(--text-muted)' }} />
            Date
          </span>
          <span className="order-summary__value">{date}</span>
        </div>

        <div className="order-summary__row">
          <span className="order-summary__label">
            <Clock size={13} className="inline mr-1" style={{ verticalAlign: '-2px', color: 'var(--text-muted)' }} />
            Time
          </span>
          <span className="order-summary__value">{time}</span>
        </div>

        <Separator className="my-2.5" style={{ background: 'var(--glass-border)' }} />

        <div className="order-summary__row">
          <span className="order-summary__label">Subtotal (incl. GST)</span>
          <span className="order-summary__value">{formatPrice(subtotal)} {currency}</span>
        </div>

        <div className="order-summary__row">
          <span className="order-summary__label order-summary__label--muted">GST (10% included)</span>
          <span className="order-summary__value order-summary__value--muted">{formatPrice(gst)} {currency}</span>
        </div>

        <Separator className="my-2.5" style={{ background: 'var(--glass-border)' }} />

        <div className="order-summary__row order-summary__row--total">
          <span className="order-summary__label">Total</span>
          <span className="order-summary__total">{formatPrice(total)} {currency}</span>
        </div>

        <p className="order-summary__note">
          <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
          Free cancellation up to 24 hours before your session
        </p>
      </CardContent>
    </Card>
  );
}
