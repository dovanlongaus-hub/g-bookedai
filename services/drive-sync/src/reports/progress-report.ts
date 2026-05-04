import { query } from '@bookedai/db';
import { logger } from '../lib/logger.js';

export interface ProgressSnapshot {
  date: string;
  timestamp: string;

  // Booking stats
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  pendingBookings: number;

  // Revenue stats
  totalRevenueCents: number;
  stripeRevenueCents: number;
  bankTransferRevenueCents: number;
  pendingPayments: number;

  // User stats
  totalUsers: number;
  newUsersToday: number;

  // Learning stats
  totalSessions: number;
  sessionsWithSummary: number;

  // Marketing stats
  totalCampaigns: number;
  publishedCampaigns: number;
  draftCampaigns: number;

  // Service breakdown
  serviceBreakdown: { name: string; bookings: number; revenue: number }[];

  // Recent activity
  recentBookings: { id: string; service: string; status: string; amount: number; createdAt: string }[];
}

export async function generateProgressSnapshot(): Promise<ProgressSnapshot> {
  const today = new Date().toISOString().split('T')[0];
  const todayStart = `${today}T00:00:00Z`;

  // Parallel queries for performance
  const [
    bookingStats,
    revenueStats,
    userStats,
    newUsersToday,
    learningStats,
    campaignStats,
    serviceBreakdown,
    recentBookings,
  ] = await Promise.all([
    // Booking counts by status
    query(`
      SELECT status, COUNT(*)::int as count
      FROM bookings
      GROUP BY status
    `),

    // Revenue by payment method
    query(`
      SELECT method, status, SUM(amount_cents)::int as total, COUNT(*)::int as count
      FROM payments
      GROUP BY method, status
    `),

    // Total users
    query('SELECT COUNT(*)::int as total FROM users'),

    // New users today
    query('SELECT COUNT(*)::int as total FROM users WHERE created_at >= $1', [todayStart]),

    // Learning sessions
    query(`
      SELECT COUNT(*)::int as total,
             COUNT(CASE WHEN summary IS NOT NULL THEN 1 END)::int as with_summary
      FROM learning_sessions
    `),

    // Campaign stats
    query(`
      SELECT status, COUNT(*)::int as count
      FROM marketing_campaigns
      GROUP BY status
    `),

    // Revenue per service
    query(`
      SELECT s.name, COUNT(b.id)::int as bookings, COALESCE(SUM(b.total_cents), 0)::int as revenue
      FROM services s
      LEFT JOIN bookings b ON b.service_id = s.id AND b.status = 'CONFIRMED'
      WHERE s.active = true
      GROUP BY s.id, s.name
      ORDER BY revenue DESC
    `),

    // Recent 10 bookings
    query(`
      SELECT b.id, s.name as service, b.status, b.total_cents as amount, b.created_at
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      ORDER BY b.created_at DESC
      LIMIT 10
    `),
  ]);

  // Parse booking stats
  const bookingMap = new Map(bookingStats.rows.map((r: any) => [r.status, r.count]));
  const totalBookings = bookingStats.rows.reduce((sum: number, r: any) => sum + r.count, 0);

  // Parse revenue
  const successPayments = revenueStats.rows.filter((r: any) => r.status === 'SUCCEEDED');
  const stripeRevenue = successPayments.filter((r: any) => r.method === 'stripe_card')
    .reduce((sum: number, r: any) => sum + r.total, 0);
  const bankRevenue = successPayments.filter((r: any) => r.method === 'bank_transfer')
    .reduce((sum: number, r: any) => sum + r.total, 0);
  const pendingPayments = revenueStats.rows.filter((r: any) => r.status === 'PENDING')
    .reduce((sum: number, r: any) => sum + r.count, 0);

  // Parse campaigns
  const campaignMap = new Map(campaignStats.rows.map((r: any) => [r.status, r.count]));

  const snapshot: ProgressSnapshot = {
    date: today,
    timestamp: new Date().toISOString(),

    totalBookings,
    confirmedBookings: bookingMap.get('CONFIRMED') || 0,
    cancelledBookings: bookingMap.get('CANCELLED') || 0,
    pendingBookings: (bookingMap.get('HOLD') || 0) + (bookingMap.get('PENDING_PAYMENT') || 0),

    totalRevenueCents: stripeRevenue + bankRevenue,
    stripeRevenueCents: stripeRevenue,
    bankTransferRevenueCents: bankRevenue,
    pendingPayments,

    totalUsers: userStats.rows[0]?.total || 0,
    newUsersToday: newUsersToday.rows[0]?.total || 0,

    totalSessions: learningStats.rows[0]?.total || 0,
    sessionsWithSummary: learningStats.rows[0]?.with_summary || 0,

    totalCampaigns: campaignStats.rows.reduce((sum: number, r: any) => sum + r.count, 0),
    publishedCampaigns: campaignMap.get('PUBLISHED') || 0,
    draftCampaigns: campaignMap.get('DRAFT') || 0,

    serviceBreakdown: serviceBreakdown.rows.map((r: any) => ({
      name: r.name,
      bookings: r.bookings,
      revenue: r.revenue,
    })),

    recentBookings: recentBookings.rows.map((r: any) => ({
      id: r.id,
      service: r.service,
      status: r.status,
      amount: r.amount,
      createdAt: r.created_at,
    })),
  };

  logger.info({ date: today, revenue: snapshot.totalRevenueCents / 100 }, 'Progress snapshot generated');
  return snapshot;
}
