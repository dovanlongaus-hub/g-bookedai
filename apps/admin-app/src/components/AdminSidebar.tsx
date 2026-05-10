'use client';

import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  CreditCard,
  Megaphone,
  BookOpen,
  BarChart3,
  Heart,
  Webhook,
  Mail,
  Settings,
  CheckCircle,
} from 'lucide-react';

const mainNavItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/bookings', label: 'Bookings', icon: CalendarDays, badge: '12' },
  { href: '/users', label: 'Users', icon: Users, badge: '156' },
  { href: '/payments', label: 'Payments', icon: CreditCard, badge: '3', badgeWarning: true },
  { href: '/approvals', label: 'Approvals', icon: CheckCircle, badgeWarning: true },
  { href: '/marketing', label: 'Marketing', icon: Megaphone },
  { href: '/learning', label: 'Learning', icon: BookOpen },
];

const secondaryNavItems = [
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/health', label: 'Health', icon: Heart, statusDot: 'green' as const },
  { href: '/webhooks', label: 'Webhooks', icon: Webhook },
  { href: '/emails', label: 'Emails', icon: Mail },
];

const settingsNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const [activePath, setActivePath] = useState('/');

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePath(href);
    window.location.href = href;
  };

  const renderNavGroup = (
    items: typeof mainNavItems
  ) => (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={item.label}
                  render={<a href={item.href} onClick={handleClick(item.href)} />}
                  className={isActive ? 'bg-indigo-500/10 text-white font-medium' : 'text-[#6b7280] hover:text-white'}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                  {'statusDot' in item && item.statusDot && (
                    <span
                      className="ml-auto size-2 rounded-full flex-shrink-0"
                      style={{
                        background: item.statusDot === 'green' ? '#22c55e' : '#ef4444',
                        boxShadow: `0 0 6px ${item.statusDot === 'green' ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.5)'}`,
                      }}
                    />
                  )}
                </SidebarMenuButton>
                {'badge' in item && item.badge && (
                  <SidebarMenuBadge
                    className={
                      'badgeWarning' in item && item.badgeWarning
                        ? 'bg-amber-500/15 text-amber-400 text-[0.7rem] font-semibold px-2 rounded-full'
                        : 'bg-indigo-500/15 text-indigo-400 text-[0.7rem] font-semibold px-2 rounded-full'
                    }
                  >
                    {item.badge}
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar className="border-r border-white/[0.08] bg-[#0a0a1a]">
      {/* Logo */}
      <SidebarHeader className="px-4 py-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-lg flex items-center justify-center font-bold text-white text-sm">
            B
          </div>
          <span className="font-bold text-[1.05rem] text-white tracking-tight">BookedAI</span>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-1">
        {renderNavGroup(mainNavItems)}
        <SidebarSeparator className="bg-white/[0.08]" />
        {renderNavGroup(secondaryNavItems)}
        <SidebarSeparator className="bg-white/[0.08]" />
        {renderNavGroup(settingsNavItems)}
      </SidebarContent>

      {/* User card */}
      <SidebarFooter className="border-t border-white/[0.08] px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-8 rounded-lg">
            <AvatarFallback className="rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-400 text-white text-xs font-semibold">
              LD
            </AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <div className="font-semibold text-[0.85rem] text-white truncate">Long Dovan</div>
            <div className="text-xs text-[#6b7280] truncate">Super Admin</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
