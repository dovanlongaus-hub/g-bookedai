'use client';

import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '\u{1F4CA}', active: true },
  { href: '/bookings', label: 'Bookings', icon: '\u{1F4C5}', badge: '12' },
  { href: '/users', label: 'Users', icon: '\u{1F465}', badge: '156' },
  { href: '/payments', label: 'Payments', icon: '\u{1F4B3}', badge: '3', badgeType: 'warning' as const },
  { href: '/approvals', label: 'Approvals', icon: '\u{2705}', badgeType: 'warning' as const },
  { href: '/marketing', label: 'Marketing', icon: '\u{1F4E3}' },
  { href: '/learning', label: 'Learning', icon: '\u{1F393}' },
  { type: 'divider' as const },
  { href: '/analytics', label: 'Analytics', icon: '\u{1F4C8}' },
  { href: '/health', label: 'Health', icon: '\u{1F6E1}', statusDot: 'green' as const },
  { href: '/webhooks', label: 'Webhooks', icon: '\u{1F517}' },
  { href: '/emails', label: 'Emails', icon: '\u{2709}' },
  { type: 'divider' as const },
  { href: '/settings', label: 'Settings', icon: '\u{2699}' },
];

export function AdminSidebar() {
  const [activePath, setActivePath] = useState('/');

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">B</div>
        <span className="sidebar-logo-text">BookedAI</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          if ('type' in item && item.type === 'divider') {
            return <div key={`div-${i}`} className="sidebar-divider" />;
          }

          const isActive = activePath === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setActivePath(item.href!);
                window.location.href = item.href!;
              }}
              className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
            >
              <span className="sidebar-item-icon">{item.icon}</span>
              <span className="sidebar-item-label">{item.label}</span>
              {'statusDot' in item && item.statusDot && (
                <span
                  className="sidebar-status-dot"
                  style={{
                    background: item.statusDot === 'green' ? '#22c55e' : '#ef4444',
                    boxShadow: `0 0 6px ${item.statusDot === 'green' ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.5)'}`,
                  }}
                />
              )}
              {'badge' in item && item.badge && (
                <span
                  className={`sidebar-badge ${
                    'badgeType' in item && item.badgeType === 'warning'
                      ? 'sidebar-badge-warning'
                      : ''
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </a>
          );
        })}
      </nav>

      {/* User card */}
      <div className="sidebar-user">
        <div className="sidebar-user-avatar">LD</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">Long Dovan</div>
          <div className="sidebar-user-role">Super Admin</div>
        </div>
      </div>
    </aside>
  );
}
