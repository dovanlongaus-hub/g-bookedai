'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, QrCode, Clock, ShieldCheck, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  recommended?: boolean;
}

interface PaymentMethodSelectorProps {
  selectedMethod: string | null;
  onSelect: (methodId: string) => void;
  onStripeCheckout: () => void;
  onBankTransfer: () => void;
  onPayLater: () => void;
  stripeLoading?: boolean;
  stripeError?: string | null;
  showQR?: boolean;
  qrContent?: React.ReactNode;
}

const METHODS: PaymentMethod[] = [
  {
    id: 'stripe',
    name: 'Pay with Card',
    description: 'Visa, Mastercard, AMEX via Stripe',
    icon: <CreditCard size={24} />,
    recommended: true,
  },
  {
    id: 'bank_transfer',
    name: 'QR Code / Bank Transfer',
    description: 'PayID (AUD) or VietQR (VND)',
    icon: <QrCode size={24} />,
  },
  {
    id: 'pay_later',
    name: 'Book Now, Pay Later',
    description: 'Confirm booking and arrange payment before session',
    icon: <Clock size={24} />,
  },
];

export function PaymentMethodSelector({
  selectedMethod,
  onSelect,
  onStripeCheckout,
  onBankTransfer,
  onPayLater,
  stripeLoading,
  stripeError,
  showQR,
  qrContent,
}: PaymentMethodSelectorProps) {
  return (
    <div className="payment-selector">
      <div className="payment-selector__methods">
        {METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;

          return (
            <motion.button
              key={method.id}
              type="button"
              className={`payment-selector__method ${
                isSelected ? 'payment-selector__method--selected' : ''
              }`}
              onClick={() => onSelect(method.id)}
              aria-pressed={isSelected}
              whileTap={{ scale: 0.98 }}
              animate={isSelected ? { borderColor: 'var(--primary)' } : {}}
              transition={{ duration: 0.2 }}
            >
              <div className="payment-selector__radio">
                <motion.div
                  className={`payment-selector__radio-dot ${isSelected ? 'payment-selector__radio-dot--active' : ''}`}
                  animate={{ scale: isSelected ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>
              <div className="payment-selector__icon">{method.icon}</div>
              <div className="payment-selector__info">
                <span className="payment-selector__name">
                  {method.name}
                  {method.recommended && (
                    <Badge
                      variant="secondary"
                      className="ml-2 text-[0.6rem] py-0"
                      style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary-light)', border: 'none' }}
                    >
                      Recommended
                    </Badge>
                  )}
                </span>
                <span className="payment-selector__desc">{method.description}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {stripeError && (
        <div className="payment-selector__error">
          {stripeError}
        </div>
      )}

      {/* Action button based on selected method */}
      {selectedMethod === 'stripe' && (
        <button
          className="btn-primary payment-selector__action"
          onClick={onStripeCheckout}
          disabled={stripeLoading}
        >
          {stripeLoading ? 'Redirecting to Stripe...' : 'Pay with Card'}
        </button>
      )}

      {selectedMethod === 'bank_transfer' && (
        <>
          <button
            className="btn-primary payment-selector__action"
            onClick={onBankTransfer}
            style={{ background: 'var(--accent)' }}
          >
            Show QR Code / Bank Details
          </button>
          {showQR && qrContent}
        </>
      )}

      {selectedMethod === 'pay_later' && (
        <button
          className="btn-primary payment-selector__action"
          onClick={onPayLater}
          style={{ background: 'transparent', border: '1px dashed rgba(255,255,255,0.2)', color: 'var(--accent)' }}
        >
          Confirm Booking (Pay Later)
        </button>
      )}

      {/* Trust badges */}
      <div className="payment-selector__trust">
        <div className="payment-selector__trust-badge">
          <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
          Secured by Stripe
        </div>
        <div className="payment-selector__trust-badge">
          <Lock size={14} style={{ color: 'var(--accent)' }} />
          SSL Encrypted
        </div>
      </div>
    </div>
  );
}
