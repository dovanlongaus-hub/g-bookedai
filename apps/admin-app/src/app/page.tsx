'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { KpiCard } from '../components/KpiCard';
import { RevenueChart } from '../components/RevenueChart';
import { BookingsTable } from '../components/BookingsTable';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CommandDialog,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Download,
  Plus,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';

interface ServiceRevenue {
  service: string;
  revenueRaw: number;
  revenue: string;
  bookings: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [revenueByService, setRevenueByService] = useState<ServiceRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, revenueRes] = await Promise.all([
          fetch('/api/dashboard/stats').then((r) => r.json()),
          fetch('/api/dashboard/revenue').then((r) => r.json()),
        ]);
        if (statsRes.success) setStats(statsRes.data);
        if (revenueRes.success && revenueRes.data) setRevenueByService(revenueRes.data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Cmd+K listener
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmdOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleCommand = useCallback((action: string) => {
    setCmdOpen(false);
    switch (action) {
      case 'dashboard':
        window.location.href = '/';
        break;
      case 'bookings':
        window.location.href = '/bookings';
        break;
      case 'users':
        window.location.href = '/users';
        break;
      case 'payments':
        window.location.href = '/payments';
        break;
      case 'analytics':
        window.location.href = '/analytics';
        break;
      case 'settings':
        window.location.href = '/settings';
        break;
      case 'export':
        window.location.href = '/api/export/bookings.csv';
        toast.success('Export started');
        break;
      case 'new-booking':
        window.location.href = '/bookings/new';
        break;
      default:
        break;
    }
  }, []);

  const today = new Date().toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="dashboard-main">
      {/* Command Palette */}
      <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
        <Command className="bg-[#0a0a1a] border border-white/[0.08]">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => handleCommand('dashboard')}>
                <LayoutDashboard className="size-4 text-[#6b7280]" />
                <span>Dashboard</span>
              </CommandItem>
              <CommandItem onSelect={() => handleCommand('bookings')}>
                <CalendarDays className="size-4 text-[#6b7280]" />
                <span>Bookings</span>
              </CommandItem>
              <CommandItem onSelect={() => handleCommand('users')}>
                <Users className="size-4 text-[#6b7280]" />
                <span>Users</span>
              </CommandItem>
              <CommandItem onSelect={() => handleCommand('payments')}>
                <CreditCard className="size-4 text-[#6b7280]" />
                <span>Payments</span>
              </CommandItem>
              <CommandItem onSelect={() => handleCommand('analytics')}>
                <BarChart3 className="size-4 text-[#6b7280]" />
                <span>Analytics</span>
              </CommandItem>
              <CommandItem onSelect={() => handleCommand('settings')}>
                <Settings className="size-4 text-[#6b7280]" />
                <span>Settings</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => handleCommand('export')}>
                <Download className="size-4 text-[#6b7280]" />
                <span>Export Bookings</span>
              </CommandItem>
              <CommandItem onSelect={() => handleCommand('new-booking')}>
                <Plus className="size-4 text-[#6b7280]" />
                <span>New Booking</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>

      {/* Header */}
      <motion.header
        className="dashboard-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-date">{today}</p>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCmdOpen(true)}
            className="gap-2 bg-transparent border-white/[0.08] text-[#6b7280] hover:text-white"
          >
            <Search className="size-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="ml-1 pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-white/10 bg-white/[0.04] px-1.5 font-mono text-[0.65rem] font-medium text-[#4b5563]">
              <span className="text-xs">&#8984;</span>K
            </kbd>
          </Button>
          <a href="/api/export/bookings.csv">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent border-white/[0.08] text-[#6b7280] hover:text-white">
              <Download className="size-3.5" />
              Export
            </Button>
          </a>
          <a href="/bookings/new">
            <Button size="sm" className="gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-600">
              <Plus className="size-3.5" />
              New Booking
            </Button>
          </a>
        </div>
      </motion.header>

      {/* KPI Cards */}
      {loading ? (
        <div className="kpi-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-white/[0.04] border-white/[0.08] rounded-2xl p-6">
              <Skeleton className="h-4 w-24 bg-white/[0.06] mb-3" />
              <Skeleton className="h-8 w-32 bg-white/[0.06] mb-2" />
              <Skeleton className="h-3 w-20 bg-white/[0.06] mb-4" />
              <Skeleton className="h-10 w-full bg-white/[0.06]" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="kpi-grid">
          <KpiCard
            label="Revenue (MTD)"
            value={stats ? `$${(stats.revenueMtd / 100).toLocaleString('en-AU', { minimumFractionDigits: 0 })}` : '$4,832'}
            trend={18.2}
            sparkline={[320, 450, 380, 520, 610, 580, 720]}
            color="green"
            index={0}
          />
          <KpiCard
            label="Total Bookings"
            value={stats?.totalBookings?.toString() ?? '28'}
            trend={12.5}
            sparkline={[3, 5, 4, 6, 4, 7, 5]}
            color="indigo"
            index={1}
          />
          <KpiCard
            label="Active Users"
            value={stats?.totalUsers?.toString() ?? '156'}
            trend={8.3}
            sparkline={[18, 22, 20, 25, 28, 24, 30]}
            color="cyan"
            index={2}
          />
          <KpiCard
            label="Conversion Rate"
            value={stats ? `${stats.totalBookings > 0 ? Math.round((stats.confirmedBookings / stats.totalBookings) * 100) : 0}%` : '0%'}
            trend={0}
            sparkline={[0]}
            color="teal"
            index={3}
          />
        </div>
      )}

      {/* Revenue Chart */}
      <motion.section
        style={{ marginBottom: '2rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <RevenueChart />
      </motion.section>

      {/* Recent Bookings */}
      <motion.section
        style={{ marginBottom: '2rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h2 className="section-title">Recent Bookings</h2>
        <BookingsTable />
      </motion.section>

      {/* Revenue by Service */}
      <motion.section
        style={{ marginBottom: '2rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <h2 className="section-title">Revenue by Service</h2>
        <Card className="bg-white/[0.04] backdrop-blur-xl border-white/[0.08] rounded-2xl p-6">
          <div className="service-bars">
            {revenueByService.length === 0 ? (
              <div className="py-6 text-center text-[#6b7280]">No service data yet</div>
            ) : (() => {
              const maxRev = Math.max(...revenueByService.map((r) => r.revenueRaw), 1);
              const totalRev = revenueByService.reduce((sum, r) => sum + r.revenueRaw, 0);
              return revenueByService.map((item) => (
                <div key={item.service} className="service-bar-row">
                  <div className="service-bar-label">
                    <span className="service-bar-name">{item.service}</span>
                    <span className="service-bar-value">
                      {item.revenue} ({totalRev > 0 ? Math.round((item.revenueRaw / totalRev) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="service-bar-track">
                    <div
                      className="service-bar-fill"
                      style={{ width: `${(item.revenueRaw / maxRev) * 100}%` }}
                    />
                  </div>
                </div>
              ));
            })()}
          </div>
        </Card>
      </motion.section>
    </div>
  );
}
