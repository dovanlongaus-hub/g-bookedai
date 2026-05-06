'use client';

import { useState, useEffect, useCallback } from 'react';

interface ApprovalRequest {
  id: string;
  category: string;
  action: string;
  amountCents: number;
  amountDisplay: string;
  currency: string;
  reason: string;
  referenceType: string | null;
  referenceId: string | null;
  metadata: Record<string, unknown>;
  status: string;
  requesterEmail: string;
  requesterName: string | null;
  requestedAt: string;
  expiresAt: string | null;
  reviewerEmail?: string;
  reviewerName?: string;
  reviewedAt?: string;
  review_note?: string;
}

interface SpendingStats {
  pendingCount: number;
  pendingTotal: number;
  todayByCategory: { category: string; total: number }[];
  monthByCategory: { category: string; total: number }[];
  limits: { role: string; category: string; max_single_amount_cents: number; max_daily_amount_cents: number; max_monthly_amount_cents: number; requires_dual_approval: boolean; auto_approve_below_cents: number }[];
}

const CATEGORY_LABELS: Record<string, string> = {
  refund: 'Refund',
  payout: 'Payout',
  ad_spend: 'Google Ads',
  sms_cost: 'SMS (Twilio)',
  marketing_budget: 'Marketing',
  vendor_payment: 'Vendor Payment',
  subscription_charge: 'Subscription',
};

const CATEGORY_COLORS: Record<string, string> = {
  refund: '#e74c3c',
  payout: '#e67e22',
  ad_spend: '#3498db',
  sms_cost: '#2ecc71',
  marketing_budget: '#9b59b6',
  vendor_payment: '#1abc9c',
  subscription_charge: '#f39c12',
};

function formatMoney(cents: number): string {
  return `$${(cents / 100).toLocaleString('en-AU', { minimumFractionDigits: 2 })}`;
}

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return `${Math.floor(diff / (1000 * 60))}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function ApprovalsPage() {
  const [pending, setPending] = useState<ApprovalRequest[]>([]);
  const [history, setHistory] = useState<ApprovalRequest[]>([]);
  const [stats, setStats] = useState<SpendingStats | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'history' | 'limits'>('pending');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [rejectNote, setRejectNote] = useState<Record<string, string>>({});
  const [approveNote, setApproveNote] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [pendingRes, historyRes, statsRes] = await Promise.all([
        fetch('/api/approval/pending').then(r => r.json()),
        fetch('/api/approval/history?limit=50').then(r => r.json()),
        fetch('/api/approval/stats').then(r => r.json()),
      ]);
      if (pendingRes.success) setPending(pendingRes.data);
      if (historyRes.success) setHistory(historyRes.data);
      if (statsRes.success) setStats(statsRes.data);
    } catch {
      // API may not be authenticated yet
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleApprove = async (id: string) => {
    if (!confirm('Are you sure you want to APPROVE this spending request?')) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/approval/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: approveNote[id] || '' }),
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        alert(`Failed: ${data.error}`);
      }
    } catch {
      alert('Network error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!rejectNote[id]?.trim()) {
      alert('Rejection reason is REQUIRED. Please enter a reason.');
      return;
    }
    if (!confirm('Are you sure you want to REJECT this spending request?')) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/approval/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: rejectNote[id] }),
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        alert(`Failed: ${data.error}`);
      }
    } catch {
      alert('Network error');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredPending = selectedCategory
    ? pending.filter(p => p.category === selectedCategory)
    : pending;

  return (
    <main className="dashboard animate-in">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Approval Center</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Manual approval required for all spending. Dual-control principle enforced.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          {stats && (
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pending</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: stats.pendingCount > 0 ? 'var(--warning)' : 'var(--success)' }}>
                  {stats.pendingCount}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pending Total</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--warning)' }}>
                  {formatMoney(stats.pendingTotal)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spending Summary Cards */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Today Spending</div>
            <div className="stat-value" style={{ color: 'var(--warning)' }}>
              {formatMoney(stats.todayByCategory.reduce((s, c) => s + c.total, 0))}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {stats.todayByCategory.length} categories
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">MTD Spending</div>
            <div className="stat-value" style={{ color: 'var(--accent)' }}>
              {formatMoney(stats.monthByCategory.reduce((s, c) => s + c.total, 0))}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Across all categories
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pending Approval</div>
            <div className="stat-value" style={{ color: stats.pendingCount > 0 ? '#e74c3c' : 'var(--success)' }}>
              {stats.pendingCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {formatMoney(stats.pendingTotal)} total
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">GST (MTD Est.)</div>
            <div className="stat-value" style={{ color: 'var(--text-muted)' }}>
              {formatMoney(Math.round(stats.monthByCategory.reduce((s, c) => s + c.total, 0) / 11))}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              10% GST component
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid var(--border)', marginBottom: '1.5rem', marginTop: '1rem' }}>
        {(['pending', 'history', 'limits'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
              color: activeTab === tab ? 'var(--accent)' : 'var(--text-muted)',
              fontWeight: activeTab === tab ? 700 : 400,
              cursor: 'pointer',
              fontSize: '0.9rem',
              marginBottom: '-2px',
            }}
          >
            {tab === 'pending' && `Pending Approval (${pending.length})`}
            {tab === 'history' && 'History'}
            {tab === 'limits' && 'Spending Limits'}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      {activeTab !== 'limits' && (
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('')}
            className={`btn btn-sm ${!selectedCategory ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          >
            All
          </button>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`btn btn-sm ${selectedCategory === key ? 'btn-primary' : 'btn-outline'}`}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.8rem',
                borderColor: CATEGORY_COLORS[key],
                color: selectedCategory === key ? '#fff' : CATEGORY_COLORS[key],
                background: selectedCategory === key ? CATEGORY_COLORS[key] : 'transparent',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* PENDING TAB */}
      {activeTab === 'pending' && (
        <section>
          {loading ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>Loading...</div>
          ) : filteredPending.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>All clear</div>
              <p style={{ color: 'var(--text-muted)' }}>No pending approval requests</p>
            </div>
          ) : (
            filteredPending.map((item) => (
              <div className="approval-card" key={item.id} style={{ marginBottom: '1rem' }}>
                <div className="approval-card-header">
                  <div style={{ flex: 1 }}>
                    {/* Top row: category badge + amount */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <span
                        style={{
                          background: CATEGORY_COLORS[item.category] || 'var(--accent)',
                          color: '#fff',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                        }}
                      >
                        {CATEGORY_LABELS[item.category] || item.category}
                      </span>
                      <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e74c3c' }}>
                        {item.amountDisplay} {item.currency}
                      </span>
                    </div>

                    {/* Action */}
                    <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.35rem' }}>
                      {item.action}
                    </div>

                    {/* Reason */}
                    <div style={{
                      background: 'var(--bg-secondary)',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      marginBottom: '0.5rem',
                      borderLeft: '3px solid var(--warning)',
                    }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
                        REASON / JUSTIFICATION:
                      </div>
                      <div style={{ fontSize: '0.9rem' }}>{item.reason}</div>
                    </div>

                    {/* Metadata */}
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <span>Requested by: <strong>{item.requesterName || item.requesterEmail}</strong></span>
                      <span>Time: {timeAgo(item.requestedAt)}</span>
                      {item.referenceType && <span>Ref: {item.referenceType}/{item.referenceId?.slice(0, 8)}</span>}
                      {item.expiresAt && (
                        <span style={{ color: new Date(item.expiresAt) < new Date(Date.now() + 24 * 60 * 60 * 1000) ? '#e74c3c' : 'var(--text-muted)' }}>
                          Expires: {new Date(item.expiresAt).toLocaleDateString('en-AU')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Approval/Rejection Actions */}
                <div style={{ borderTop: '1px solid var(--border)', padding: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                  {/* Approve section */}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                      Approval note (optional):
                    </label>
                    <input
                      type="text"
                      placeholder="Verified bank statement..."
                      value={approveNote[item.id] || ''}
                      onChange={(e) => setApproveNote(prev => ({ ...prev, [item.id]: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        background: 'var(--bg)',
                        color: 'var(--text)',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  {/* Reject section */}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ fontSize: '0.75rem', color: '#e74c3c', display: 'block', marginBottom: '0.25rem' }}>
                      Rejection reason (REQUIRED to reject):
                    </label>
                    <input
                      type="text"
                      placeholder="Reason for rejection..."
                      value={rejectNote[item.id] || ''}
                      onChange={(e) => setRejectNote(prev => ({ ...prev, [item.id]: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #e74c3c33',
                        borderRadius: '4px',
                        background: 'var(--bg)',
                        color: 'var(--text)',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleApprove(item.id)}
                      disabled={actionLoading === item.id}
                      style={{ padding: '0.5rem 1.25rem', fontWeight: 600 }}
                    >
                      {actionLoading === item.id ? '...' : 'APPROVE'}
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleReject(item.id)}
                      disabled={actionLoading === item.id}
                      style={{ padding: '0.5rem 1.25rem', fontWeight: 600 }}
                    >
                      {actionLoading === item.id ? '...' : 'REJECT'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'history' && (
        <section>
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Action</th>
                  <th className="text-right">Amount</th>
                  <th>Status</th>
                  <th>Requester</th>
                  <th>Reviewer</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {history.length === 0 ? (
                  <tr><td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No history yet</td></tr>
                ) : history.filter(h => !selectedCategory || h.category === selectedCategory).map((item: any) => (
                  <tr key={item.id}>
                    <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                      {item.reviewed_at ? new Date(item.reviewed_at).toLocaleDateString('en-AU') : '-'}
                    </td>
                    <td>
                      <span style={{
                        background: CATEGORY_COLORS[item.category] || 'var(--accent)',
                        color: '#fff',
                        padding: '0.15rem 0.4rem',
                        borderRadius: '3px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                      }}>
                        {CATEGORY_LABELS[item.category] || item.category}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.action}
                    </td>
                    <td className="text-right" style={{ fontWeight: 600 }}>
                      {formatMoney(item.amount_cents)}
                    </td>
                    <td>
                      <span className={`badge ${item.status === 'APPROVED' ? 'confirmed' : item.status === 'REJECTED' ? 'cancelled' : 'pending'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>{item.requester_email || item.requesterEmail}</td>
                    <td style={{ fontSize: '0.8rem' }}>{item.reviewer_email || '-'}</td>
                    <td style={{ fontSize: '0.8rem', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-muted)' }}>
                      {item.review_note || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* LIMITS TAB */}
      {activeTab === 'limits' && stats && (
        <section>
          <h2 style={{ marginBottom: '1rem' }}>Spending Limits by Role & Category</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            These limits enforce financial controls. Changes require superadmin + database migration.
          </p>
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Category</th>
                  <th className="text-right">Max Single</th>
                  <th className="text-right">Max Daily</th>
                  <th className="text-right">Max Monthly</th>
                  <th className="text-right">Auto-approve Under</th>
                  <th>Dual Approval</th>
                </tr>
              </thead>
              <tbody>
                {stats.limits.map((limit, i) => (
                  <tr key={i}>
                    <td>
                      <span className={`badge ${limit.role === 'superadmin' ? 'confirmed' : 'pending'}`}>
                        {limit.role}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        background: CATEGORY_COLORS[limit.category] || 'var(--accent)',
                        color: '#fff',
                        padding: '0.15rem 0.4rem',
                        borderRadius: '3px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                      }}>
                        {CATEGORY_LABELS[limit.category] || limit.category}
                      </span>
                    </td>
                    <td className="text-right">{formatMoney(limit.max_single_amount_cents)}</td>
                    <td className="text-right">{formatMoney(limit.max_daily_amount_cents)}</td>
                    <td className="text-right">{formatMoney(limit.max_monthly_amount_cents)}</td>
                    <td className="text-right">
                      {limit.auto_approve_below_cents > 0 ? formatMoney(limit.auto_approve_below_cents) : '-'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {limit.requires_dual_approval ? (
                        <span style={{ color: '#e74c3c', fontWeight: 600 }}>YES</span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Compliance Notes */}
          <div className="card" style={{ marginTop: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
            <h3 style={{ marginBottom: '0.75rem' }}>Financial Control Rules</h3>
            <ul style={{ fontSize: '0.85rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              <li><strong>Dual-Control Principle:</strong> Cannot approve your own request. Another admin must approve.</li>
              <li><strong>Mandatory Reason:</strong> All spending requests must include a justification.</li>
              <li><strong>Rejection Reason Required:</strong> Cannot reject without providing a reason.</li>
              <li><strong>Expiry:</strong> Unapproved requests auto-expire after 72 hours.</li>
              <li><strong>GST Tracking:</strong> 10% GST automatically calculated on all spending.</li>
              <li><strong>Audit Trail:</strong> Every approve/reject is logged with actor, timestamp, and reason.</li>
              <li><strong>Reconciliation:</strong> All approved spending must be reconciled in the ledger.</li>
              <li><strong>Payout & Vendor:</strong> Require superadmin for dual-approval categories.</li>
            </ul>
          </div>
        </section>
      )}

      {/* MTD Spending by Category */}
      {stats && stats.monthByCategory.length > 0 && (
        <section className="section" style={{ marginTop: '2rem' }}>
          <h2>Month-to-Date Spending by Category</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            {stats.monthByCategory.map((cat) => (
              <div className="card" key={cat.category} style={{
                borderLeft: `4px solid ${CATEGORY_COLORS[cat.category] || 'var(--accent)'}`,
              }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  {CATEGORY_LABELS[cat.category] || cat.category}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem' }}>
                  {formatMoney(cat.total)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
