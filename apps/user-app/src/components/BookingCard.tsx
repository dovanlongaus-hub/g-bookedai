'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Video, ArrowRight } from 'lucide-react';

interface BookingCardProps {
  date: string;
  time: string;
  serviceName: string;
  meetLink?: string;
  countdown?: string;
  onReschedule?: () => void;
}

export function BookingCard({ date, time, serviceName, meetLink, countdown, onReschedule }: BookingCardProps) {
  return (
    <Card className="booking-card-upgraded">
      <div style={{ minWidth: 80 }}>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-[#6366f1]" />
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>{date}</span>
        </div>
        {countdown && (
          <Badge variant="outline" className="mt-1.5 text-[0.7rem] px-2 py-0 border-[rgba(255,255,255,0.1)] text-[var(--text-muted)]">
            {countdown}
          </Badge>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{serviceName}</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{time}</div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {meetLink ? (
          <a
            href={meetLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="bg-[#6366f1] hover:bg-[#818cf8] text-white">
              <Video className="mr-1.5 h-3.5 w-3.5" />
              Join
            </Button>
          </a>
        ) : null}
        <Button
          variant="outline"
          size="sm"
          onClick={onReschedule}
          className="border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[rgba(255,255,255,0.04)]"
        >
          Reschedule
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
}
