export type InvoiceStatus = 'DRAFT' | 'ISSUED' | 'PAID' | 'OVERDUE' | 'CANCELLED';
export type XeroSyncStatus = 'PENDING' | 'SYNCED' | 'FAILED' | 'NOT_CONFIGURED';

export interface Invoice {
  id: string;
  tenantId: string;
  bookingId: string;
  paymentId: string;
  userId: string;
  invoiceNumber: string;
  amountCents: number;
  gstCents: number;
  totalCents: number;
  currency: string;
  status: InvoiceStatus;
  xeroInvoiceId?: string;
  xeroSyncStatus: XeroSyncStatus;
  issuedAt?: Date;
  dueAt?: Date;
  paidAt?: Date;
  createdAt: Date;
}

// GST rate for Australia (10%)
export const GST_RATE = 0.10;

export function calculateGst(amountCents: number): { gstCents: number; totalCents: number } {
  // Australian services are GST-inclusive by default
  // GST = amount * 10/110
  const gstCents = Math.round(amountCents * 10 / 110);
  return { gstCents, totalCents: amountCents };
}

export function generateInvoiceNumber(tenantPrefix: string, sequence: number): string {
  const year = new Date().getFullYear();
  return `${tenantPrefix}-${year}-${String(sequence).padStart(5, '0')}`;
}
