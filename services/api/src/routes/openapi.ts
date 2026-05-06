import { Router } from 'express';

export const openapiRouter = Router();

const spec = {
  openapi: '3.1.0',
  info: {
    title: 'bookedai.au API',
    version: '1.0.0',
    description: 'The AI Revenue Engine — API for booking, payments, learning, marketing, and notifications.',
    contact: { email: 'ceo@longcare.au', url: 'https://g.bookedai.au' },
  },
  servers: [
    { url: 'https://api.g.bookedai.au', description: 'Production' },
    { url: 'http://localhost:8180', description: 'Local development' },
  ],
  tags: [
    { name: 'Health', description: 'Health checks and diagnostics' },
    { name: 'Auth', description: 'Authentication (Firebase + OpenAI OAuth)' },
    { name: 'Booking', description: 'Booking Truth Engine — hold, confirm, cancel, reschedule' },
    { name: 'Payment', description: 'Stripe payments and bank transfer' },
    { name: 'Services', description: 'Service catalog' },
    { name: 'Chat', description: 'AI Chat (Gemini + OpenAI)' },
    { name: 'Learning', description: 'AI learning summaries and history' },
    { name: 'Marketing', description: 'AI marketing campaign generation' },
    { name: 'Courses', description: 'AI curriculum, quizzes, certificates' },
    { name: 'Notifications', description: 'User notifications (email, SMS, push, in-app)' },
  ],
  paths: {
    '/health': {
      get: { tags: ['Health'], summary: 'Health check', responses: { '200': { description: 'Service healthy' } } },
    },
    '/health/test-email': {
      post: { tags: ['Health'], summary: 'Send test email', requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { to: { type: 'string' }, type: { type: 'string' } } } } } }, responses: { '200': { description: 'Email sent' } } },
    },
    '/auth/providers': {
      get: { tags: ['Auth'], summary: 'List available auth providers', responses: { '200': { description: 'Provider list' } } },
    },
    '/auth/openai/login': {
      get: { tags: ['Auth'], summary: 'Initiate OpenAI OAuth flow', parameters: [{ name: 'returnUrl', in: 'query', schema: { type: 'string' } }], responses: { '302': { description: 'Redirect to OpenAI' } } },
    },
    '/auth/openai/callback': {
      get: { tags: ['Auth'], summary: 'OpenAI OAuth callback', responses: { '302': { description: 'Redirect with token' } } },
    },
    '/auth/agent/status': {
      get: { tags: ['Auth'], summary: 'Agent OpenAI auth status', responses: { '200': { description: 'Auth status' } } },
    },
    '/services': {
      get: { tags: ['Services'], summary: 'List active services', responses: { '200': { description: 'Service list' } } },
    },
    '/services/search': {
      post: { tags: ['Services'], summary: 'Search services', requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { query: { type: 'string' }, tenantId: { type: 'string' } } } } } }, responses: { '200': { description: 'Search results' } } },
    },
    '/chat': {
      post: { tags: ['Chat'], summary: 'AI chat message', requestBody: { content: { 'application/json': { schema: { type: 'object', required: ['message'], properties: { message: { type: 'string' }, language: { type: 'string', enum: ['en', 'vi', 'zh'] }, sessionId: { type: 'string' } } } } } }, responses: { '200': { description: 'AI response' } } },
    },
    '/booking/hold': {
      post: { tags: ['Booking'], summary: 'Hold a slot (10min)', security: [{ BearerAuth: [] }], requestBody: { content: { 'application/json': { schema: { type: 'object', required: ['serviceId', 'slotId'], properties: { serviceId: { type: 'string' }, slotId: { type: 'string' } } } } } }, responses: { '200': { description: 'Slot held' }, '401': { description: 'Unauthorized' } } },
    },
    '/booking/confirm': {
      post: { tags: ['Booking'], summary: 'Confirm booking + Calendar + Meet + Email', security: [{ BearerAuth: [] }], responses: { '200': { description: 'Booking confirmed' } } },
    },
    '/booking/cancel': {
      post: { tags: ['Booking'], summary: 'Cancel booking', security: [{ BearerAuth: [] }], responses: { '200': { description: 'Booking cancelled' } } },
    },
    '/booking/reschedule': {
      post: { tags: ['Booking'], summary: 'Reschedule booking', security: [{ BearerAuth: [] }], responses: { '200': { description: 'Booking rescheduled' } } },
    },
    '/payment/checkout': {
      post: { tags: ['Payment'], summary: 'Create Stripe checkout session', security: [{ BearerAuth: [] }], responses: { '200': { description: 'Checkout URL' } } },
    },
    '/webhooks/stripe': {
      post: { tags: ['Payment'], summary: 'Stripe webhook handler', responses: { '200': { description: 'Webhook processed' } } },
    },
    '/learning/session-summary': {
      post: { tags: ['Learning'], summary: 'Generate AI session summary', security: [{ BearerAuth: [] }], responses: { '200': { description: 'Summary generated' } } },
    },
    '/learning/history': {
      get: { tags: ['Learning'], summary: 'Get learning session history', security: [{ BearerAuth: [] }], responses: { '200': { description: 'Session list' } } },
    },
    '/marketing/campaigns': {
      post: { tags: ['Marketing'], summary: 'Generate marketing campaign', security: [{ BearerAuth: [] }], responses: { '200': { description: 'Campaign created' } } },
    },
    '/courses/generate-curriculum': {
      post: { tags: ['Courses'], summary: 'AI generate course curriculum', security: [{ BearerAuth: [] }], responses: { '200': { description: 'Curriculum generated' } } },
    },
    '/courses/generate-quiz': {
      post: { tags: ['Courses'], summary: 'AI generate quiz', security: [{ BearerAuth: [] }], responses: { '200': { description: 'Quiz generated' } } },
    },
    '/courses/certificate/{id}': {
      get: { tags: ['Courses'], summary: 'Get SVG certificate', security: [{ BearerAuth: [] }], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'SVG certificate' } } },
    },
    '/notifications': {
      get: { tags: ['Notifications'], summary: 'Get user notifications', security: [{ BearerAuth: [] }], responses: { '200': { description: 'Notification list' } } },
    },
    '/notifications/unread-count': {
      get: { tags: ['Notifications'], summary: 'Get unread notification count', security: [{ BearerAuth: [] }], responses: { '200': { description: 'Unread count' } } },
    },
    '/notifications/{id}/read': {
      post: { tags: ['Notifications'], summary: 'Mark notification as read', security: [{ BearerAuth: [] }], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Marked as read' } } },
    },
    '/openapi.json': {
      get: { tags: ['Health'], summary: 'OpenAPI 3.1 specification', responses: { '200': { description: 'OpenAPI JSON' } } },
    },
    '/docs': {
      get: { tags: ['Health'], summary: 'Interactive API documentation (Scalar)', responses: { '200': { description: 'HTML documentation page' } } },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', description: 'Firebase ID token or bookedai.au JWT (OpenAI OAuth)' },
    },
  },
};

openapiRouter.get('/', (_req, res) => {
  res.json(spec);
});
