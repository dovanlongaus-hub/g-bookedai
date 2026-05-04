import type { ProgressSnapshot } from './progress-report.js';

/**
 * Format progress snapshot as HTML document for Google Docs.
 */
export function formatDailyReportHtml(snapshot: ProgressSnapshot): string {
  const revenue = (snapshot.totalRevenueCents / 100).toFixed(2);
  const stripeRevenue = (snapshot.stripeRevenueCents / 100).toFixed(2);
  const bankRevenue = (snapshot.bankTransferRevenueCents / 100).toFixed(2);

  return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">

<h1 style="color: #0070f3; border-bottom: 2px solid #0070f3; padding-bottom: 10px;">
  📊 Daily Progress Report — ${snapshot.date}
</h1>
<p style="color: #666;">Generated: ${new Date(snapshot.timestamp).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</p>

<h2 style="color: #333;">💰 Revenue</h2>
<table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
  <tr style="background: #f5f5f5;">
    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Revenue</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-size: 1.2em; font-weight: bold; color: #22c55e;">$${revenue} AUD</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">Stripe (Card)</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">$${stripeRevenue}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">Bank Transfer</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">$${bankRevenue}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">Pending Payments</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.pendingPayments}</td>
  </tr>
</table>

<h2 style="color: #333;">📅 Bookings</h2>
<table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
  <tr style="background: #f5f5f5;">
    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Bookings</strong></td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold;">${snapshot.totalBookings}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">✅ Confirmed</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.confirmedBookings}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">⏳ Pending</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.pendingBookings}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">❌ Cancelled</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.cancelledBookings}</td>
  </tr>
</table>

<h2 style="color: #333;">👥 Users</h2>
<table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">Total Users</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.totalUsers}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">New Users Today</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.newUsersToday}</td>
  </tr>
</table>

<h2 style="color: #333;">📚 Learning</h2>
<table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">Total Sessions</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.totalSessions}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">With AI Summary</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.sessionsWithSummary}</td>
  </tr>
</table>

<h2 style="color: #333;">📢 Marketing</h2>
<table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">Total Campaigns</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.totalCampaigns}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">Published</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.publishedCampaigns}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">Draft (Pending Approval)</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${snapshot.draftCampaigns}</td>
  </tr>
</table>

<h2 style="color: #333;">📦 Revenue by Service</h2>
<table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
  <tr style="background: #0070f3; color: white;">
    <th style="padding: 10px; text-align: left;">Service</th>
    <th style="padding: 10px; text-align: right;">Bookings</th>
    <th style="padding: 10px; text-align: right;">Revenue (AUD)</th>
  </tr>
  ${snapshot.serviceBreakdown.map((s) => `
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">${s.name}</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${s.bookings}</td>
    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">$${(s.revenue / 100).toFixed(2)}</td>
  </tr>`).join('')}
</table>

<h2 style="color: #333;">🕐 Recent Bookings</h2>
<table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
  <tr style="background: #f5f5f5;">
    <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Service</th>
    <th style="padding: 8px; text-align: center; border: 1px solid #ddd;">Status</th>
    <th style="padding: 8px; text-align: right; border: 1px solid #ddd;">Amount</th>
    <th style="padding: 8px; text-align: right; border: 1px solid #ddd;">Date</th>
  </tr>
  ${snapshot.recentBookings.map((b) => `
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;">${b.service}</td>
    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${b.status}</td>
    <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${(b.amount / 100).toFixed(2)}</td>
    <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${new Date(b.createdAt).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</td>
  </tr>`).join('')}
</table>

<hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
<p style="color: #999; font-size: 12px;">
  Auto-generated by BookedAI Drive Sync — bookedai.au<br/>
  Report synced to Google Drive: ceo@longcare.au
</p>

</body>
</html>`;
}

/**
 * Format progress data as CSV for Google Sheets.
 */
export function formatRoadmapCsv(snapshot: ProgressSnapshot): string {
  const today = snapshot.date;
  const lines = [
    'Metric,Value,Date',
    `Total Revenue (AUD),${(snapshot.totalRevenueCents / 100).toFixed(2)},${today}`,
    `Stripe Revenue,${(snapshot.stripeRevenueCents / 100).toFixed(2)},${today}`,
    `Bank Transfer Revenue,${(snapshot.bankTransferRevenueCents / 100).toFixed(2)},${today}`,
    `Total Bookings,${snapshot.totalBookings},${today}`,
    `Confirmed Bookings,${snapshot.confirmedBookings},${today}`,
    `Cancelled Bookings,${snapshot.cancelledBookings},${today}`,
    `Pending Bookings,${snapshot.pendingBookings},${today}`,
    `Total Users,${snapshot.totalUsers},${today}`,
    `New Users Today,${snapshot.newUsersToday},${today}`,
    `Learning Sessions,${snapshot.totalSessions},${today}`,
    `Sessions with Summary,${snapshot.sessionsWithSummary},${today}`,
    `Total Campaigns,${snapshot.totalCampaigns},${today}`,
    `Published Campaigns,${snapshot.publishedCampaigns},${today}`,
    '',
    'Service,Bookings,Revenue (AUD)',
    ...snapshot.serviceBreakdown.map((s) => `${s.name},${s.bookings},${(s.revenue / 100).toFixed(2)}`),
  ];

  return lines.join('\n');
}
