'use client';

import { useState } from 'react';

interface Notification {
  id: string;
  icon: string;
  title: string;
  description: string;
  timeAgo: string;
  read: boolean;
  link: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'n1',
      icon: '\u2714',
      title: 'Booking confirmed',
      description: '1-hour AI Mentor session on May 6 at 10:00 AM AEST with Dr. Sarah Chen.',
      timeAgo: '2 hours ago',
      read: false,
      link: '/',
    },
    {
      id: 'n2',
      icon: '\uD83D\uDCDD',
      title: 'Session summary ready',
      description: 'Your notes from "Introduction to Neural Networks" are ready to view.',
      timeAgo: '1 day ago',
      read: true,
      link: '/',
    },
    {
      id: 'n3',
      icon: '\u23F0',
      title: 'Reminder: Session tomorrow at 10:00 AM',
      description: 'AI Strategy Consultation with Dr. Sarah Chen via Google Meet.',
      timeAgo: '2 days ago',
      read: true,
      link: '/',
    },
    {
      id: 'n4',
      icon: '\uD83D\uDCB3',
      title: 'Payment received',
      description: '$99 AUD payment confirmed for Career Pathway Review. Receipt sent to your email.',
      timeAgo: '3 days ago',
      read: true,
      link: '/',
    },
    {
      id: 'n5',
      icon: '\uD83D\uDC4B',
      title: 'Welcome to Longcare!',
      description: 'Your learning journey begins. Browse available sessions and book your first mentor session.',
      timeAgo: '5 days ago',
      read: true,
      link: '/',
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <main className="dashboard animate-in">
      <div className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h1>Notifications</h1>
          {unreadCount > 0 && (
            <span style={{
              background: 'var(--primary)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.2rem 0.6rem',
              borderRadius: 20,
              lineHeight: 1,
            }}>
              {unreadCount}
            </span>
          )}
        </div>
        <div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
              Mark all as read
            </button>
          )}
        </div>
      </div>

      <section className="section">
        {notifications.map(n => (
          <a
            key={n.id}
            href={n.link}
            onClick={(e) => { e.preventDefault(); markAsRead(n.id); }}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <div
              className="card"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                borderLeft: n.read ? '3px solid transparent' : '3px solid var(--primary)',
                background: n.read ? 'var(--surface)' : 'rgba(99, 102, 241, 0.06)',
                cursor: 'pointer',
              }}
            >
              {/* Icon */}
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'rgba(99, 102, 241, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                flexShrink: 0,
              }}>
                {n.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ fontWeight: n.read ? 400 : 600, fontSize: '0.95rem' }}>
                    {n.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{n.timeAgo}</span>
                    {!n.read && (
                      <span style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        display: 'inline-block',
                        flexShrink: 0,
                      }} />
                    )}
                  </div>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.3rem', lineHeight: 1.5 }}>
                  {n.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </section>

      <div style={{ textAlign: 'center', padding: '1rem 0 2rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          You have seen all your notifications.
        </p>
      </div>
    </main>
  );
}
