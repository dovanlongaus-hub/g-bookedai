export type PaymentMethod = 'stripe_card' | 'bank_transfer';

export type PaymentStatus = 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED';

export interface Payment {
  id: string;
  bookingId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amountCents: number;
  stripePaymentIntentId?: string;
  bankReference?: string;
  createdAt: Date;
}

export interface BankTransferInstructions {
  payId: string;
  bsb?: string;
  accountNumber?: string;
  accountName: string;
  amount: string;
  currency: string;
  reference: string;
}
