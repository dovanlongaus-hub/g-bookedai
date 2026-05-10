'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '../lib/utils.js';

export interface SidebarItem {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: number;
  href?: string;
  onClick?: () => void;
}

export interface SidebarDivider {
  type: 'divider';
}

export type SidebarEntry = SidebarItem | SidebarDivider;

function isDivider(entry: SidebarEntry): entry is SidebarDivider {
  return 'type' in entry && entry.type === 'divider';
}

export interface SidebarProps {
  items: SidebarEntry[];
  activeId?: string;
  logo?: ReactNode;
  logoCollapsed?: ReactNode;
  user?: { name: string; email?: string; avatar?: ReactNode };
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
}

export function Sidebar({
  items,
  activeId,
  logo,
  logoCollapsed,
  user,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  className,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const collapsed = controlledCollapsed ?? internalCollapsed;

  const toggleCollapsed = () => {
    const next = !collapsed;
    if (controlledCollapsed === undefined) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };

  const sidebarContent = (
    <div
      className={cn(
        'flex flex-col h-full bg-white/[0.04] backdrop-blur-xl border-r border-white/[0.08] transition-all duration-300',
        collapsed ? 'w-16' : 'w-60',
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-white/[0.08] shrink-0">
        {collapsed ? (logoCollapsed || logo) : logo}
      </div>

      {/* Items */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {items.map((entry, i) => {
          if (isDivider(entry)) {
            return <div key={`div-${i}`} className="my-2 border-t border-white/[0.08]" />;
          }
          const isActive = entry.id === activeId;
          const Tag = entry.href ? 'a' : 'button';
          return (
            <Tag
              key={entry.id}
              href={entry.href}
              type={entry.href ? undefined : 'button'}
              onClick={() => { entry.onClick?.(); setMobileOpen(false); }}
              className={cn(
                'flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative',
                isActive
                  ? 'text-[var(--primary)] bg-[var(--primary)]/10'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.06]',
                collapsed && 'justify-center px-0'
              )}
              title={collapsed ? entry.label : undefined}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r bg-[var(--primary)]" />
              )}
              <span className="shrink-0 w-5 h-5 flex items-center justify-center">{entry.icon}</span>
              {!collapsed && (
                <>
                  <span className="flex-1 text-left truncate">{entry.label}</span>
                  {entry.badge != null && entry.badge > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-xs px-1.5">
                      {entry.badge > 99 ? '99+' : entry.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && entry.badge != null && entry.badge > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--primary)]" />
              )}
            </Tag>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-2 py-2 border-t border-white/[0.08]">
        <button
          type="button"
          onClick={toggleCollapsed}
          className="flex items-center justify-center w-full rounded-lg p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.06] transition-all duration-200"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            className={cn('transition-transform duration-200', collapsed && 'rotate-180')}
          >
            <path d="M10 4l-4 4 4 4" />
          </svg>
        </button>
      </div>

      {/* User */}
      {user && (
        <div className={cn('flex items-center gap-3 px-4 py-3 border-t border-white/[0.08] shrink-0', collapsed && 'justify-center px-2')}>
          {user.avatar || (
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-xs font-semibold shrink-0">
              {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
            </span>
          )}
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--text-main)] truncate">{user.name}</p>
              {user.email && <p className="text-xs text-[var(--text-muted)] truncate">{user.email}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile toggle */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 rounded-lg p-2 bg-white/[0.04] border border-white/[0.08] text-[var(--text-muted)] md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:block h-screen sticky top-0 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
