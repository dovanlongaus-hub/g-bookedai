'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import { MoreHorizontal, Eye, Check, X } from 'lucide-react';

type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'hold' | 'pending_payment';

interface Booking {
  id: string;
  customer: string;
  service: string;
  date: string;
  amount: string;
  status: BookingStatus;
}

const statusVariantMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  confirmed: 'default',
  pending: 'secondary',
  cancelled: 'destructive',
};

const statusStyleMap: Record<string, string> = {
  confirmed: 'bg-green-500/12 text-green-400 border-transparent',
  pending: 'bg-amber-500/12 text-amber-400 border-transparent',
  cancelled: 'bg-red-500/12 text-red-400 border-transparent',
};

export function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | BookingStatus>('all');
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    fetch('/api/dashboard/recent-bookings')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data) setBookings(d.data);
      })
      .catch(() => {});
  }, []);

  const normalizeStatus = (s: string): BookingStatus => {
    if (s === 'hold' || s === 'pending_payment') return 'pending';
    return s as BookingStatus;
  };

  const filtered =
    activeTab === 'all'
      ? bookings
      : bookings.filter((b) => normalizeStatus(b.status) === activeTab);
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const counts: Record<string, number> = {
    all: bookings.length,
    confirmed: bookings.filter((b) => normalizeStatus(b.status) === 'confirmed').length,
    pending: bookings.filter((b) => normalizeStatus(b.status) === 'pending').length,
    cancelled: bookings.filter((b) => normalizeStatus(b.status) === 'cancelled').length,
  };

  return (
    <Card className="bg-white/[0.04] backdrop-blur-xl border-white/[0.08] rounded-2xl p-0 overflow-hidden">
      {/* Tabs */}
      <div className="px-6 pt-4 pb-0">
        <Tabs defaultValue="all" onValueChange={(v: any) => { setActiveTab(v as any); setPage(1); }}>
          <TabsList variant="line" className="gap-0">
            {(['all', 'confirmed', 'pending', 'cancelled'] as const).map((tab) => (
              <TabsTrigger key={tab} value={tab} className="text-sm gap-2">
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className="text-[0.7rem] font-semibold bg-white/[0.06] px-2 py-0.5 rounded-md text-[#4b5563]">
                  {counts[tab]}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Table */}
      <Table className="mt-2">
        <TableHeader>
          <TableRow className="border-white/[0.06] hover:bg-transparent">
            <TableHead className="text-[#4b5563] text-xs uppercase tracking-wider font-medium px-6">Customer</TableHead>
            <TableHead className="text-[#4b5563] text-xs uppercase tracking-wider font-medium">Service</TableHead>
            <TableHead className="text-[#4b5563] text-xs uppercase tracking-wider font-medium">Date</TableHead>
            <TableHead className="text-[#4b5563] text-xs uppercase tracking-wider font-medium text-right">Amount</TableHead>
            <TableHead className="text-[#4b5563] text-xs uppercase tracking-wider font-medium">Status</TableHead>
            <TableHead className="text-[#4b5563] text-xs uppercase tracking-wider font-medium text-right px-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.length === 0 ? (
            <TableRow className="border-white/[0.04]">
              <TableCell colSpan={6} className="text-center py-8 text-[#6b7280]">
                No bookings found
              </TableCell>
            </TableRow>
          ) : (
            paginated.map((booking) => {
              const status = normalizeStatus(booking.status);
              const initials = booking.customer
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2);
              return (
                <TableRow key={booking.id} className="border-white/[0.04] hover:bg-white/[0.02]">
                  <TableCell className="px-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8 rounded-lg">
                        <AvatarFallback className="rounded-lg bg-[#111127] border border-white/[0.08] text-[0.7rem] font-semibold text-[#6b7280]">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white">{booking.customer}</div>
                        <div className="text-xs text-[#6b7280]">{booking.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">{booking.service}</TableCell>
                  <TableCell className="text-[#8b92a5]">{booking.date}</TableCell>
                  <TableCell className="text-right font-semibold font-mono text-white">{booking.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={statusVariantMap[status] || 'outline'}
                      className={statusStyleMap[status] || ''}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon" className="size-8 text-[#6b7280] hover:text-white" />
                        }
                      >
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="bottom" align="end" className="bg-[#1e1e3a] border-white/10">
                        <DropdownMenuItem className="gap-2 text-[#e2e8f0] focus:bg-white/[0.06] focus:text-white">
                          <Eye className="size-4" />
                          View
                        </DropdownMenuItem>
                        {status === 'pending' && (
                          <DropdownMenuItem className="gap-2 text-green-400 focus:bg-green-500/10 focus:text-green-300">
                            <Check className="size-4" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        {status !== 'cancelled' && (
                          <>
                            <DropdownMenuSeparator className="bg-white/[0.08]" />
                            <DropdownMenuItem variant="destructive" className="gap-2">
                              <X className="size-4" />
                              Cancel
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-6 py-4 border-t border-white/[0.08]">
          <span className="text-xs text-[#6b7280]">
            Showing {(page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)} of{' '}
            {filtered.length}
          </span>
          <div className="flex gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="text-xs bg-transparent border-white/[0.08] text-[#6b7280] hover:text-white disabled:opacity-30"
            >
              Prev
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={page === i + 1 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPage(i + 1)}
                className={
                  page === i + 1
                    ? 'text-xs bg-indigo-600 text-white border-indigo-600'
                    : 'text-xs bg-transparent border-white/[0.08] text-[#6b7280] hover:text-white'
                }
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="text-xs bg-transparent border-white/[0.08] text-[#6b7280] hover:text-white disabled:opacity-30"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
