import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-04-30.basil',
});

export async function createCheckoutSession(bookingId: string, priceId: string) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.APP_BASE_URL}/booking/success?id=${bookingId}`,
    cancel_url: `${process.env.APP_BASE_URL}/booking/cancel?id=${bookingId}`,
    metadata: { bookingId },
  });

  return { checkoutUrl: session.url };
}

export function getBankTransferInstructions(bookingId: string, amountCents: number) {
  return {
    payId: process.env.BANK_TRANSFER_PAYID,
    bsb: process.env.BANK_TRANSFER_BSB,
    accountNumber: process.env.BANK_TRANSFER_ACCOUNT_NUMBER,
    accountName: process.env.BANK_TRANSFER_ACCOUNT_NAME,
    amount: (amountCents / 100).toFixed(2),
    currency: 'AUD',
    reference: `BOOK-${bookingId.slice(0, 8).toUpperCase()}`,
  };
}
