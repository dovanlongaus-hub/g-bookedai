// Domain architecture
export const DOMAINS = {
  AI_ENTRY: 'g.bookedai.au',
  AGENT: 'agent.g.bookedai.au',
  API: 'api.g.bookedai.au',
  APP_WORKSPACE: 'app.g.bookedai.au',
  LONGCARE_PUBLIC: 'longcare.au',
  LONGCARE_BOOKING: 'book.longcare.au',
  LONGCARE_APP: 'app.longcare.au',
  LONGCARE_ADMIN: 'admin.longcare.au',
  LONGCARE_SEO: 'services.longcare.au',
} as const;

// Revenue products
export const PRODUCTS = {
  STARTER_30MIN: { name: '30-min AI Starter Session', priceCents: 2900, standardPriceCents: 4900 },
  MENTOR_1H: { name: '1-hour AI Mentor', priceCents: 9900, standardPriceCents: 12000 },
  PACKAGE_5: { name: '5-Session Package', priceCents: 45000 },
  PACKAGE_10: { name: '10-Session Package', priceCents: 85000 },
  BUSINESS_TRANSFORM: { name: 'AI Business Transformation Program', priceCents: 150000 },
  SINGLE_LESSON: { name: 'Single Lesson', priceCents: 1900 },
  MODULE_5_LESSONS: { name: 'Module of 5 Lessons', priceCents: 7900 },
} as const;

// Pub/Sub topics
export const PUBSUB_TOPICS = {
  BOOKING_CREATED: 'booking.created',
  BOOKING_PAID: 'booking.paid',
  BOOKING_CANCELLED: 'booking.cancelled',
  PAYMENT_SUCCEEDED: 'payment.succeeded',
  PAYMENT_FAILED: 'payment.failed',
  SESSION_COMPLETED: 'session.completed',
  LEARNING_NOTES_CREATED: 'learning.notes.created',
  MARKETING_CONTENT_APPROVED: 'marketing.content.approved',
  ACCOUNTING_SYNC_FAILED: 'accounting.sync.failed',
} as const;

// Booking hold expiry (minutes)
export const HOLD_EXPIRY_MINUTES = 10;
