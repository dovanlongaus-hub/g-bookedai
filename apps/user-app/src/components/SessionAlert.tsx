'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, CalendarClock } from 'lucide-react';
import { motion } from 'motion/react';

interface SessionAlertProps {
  serviceName: string;
  dateTime: string;
  meetLink?: string;
  onReschedule?: () => void;
}

export function SessionAlert({ serviceName, dateTime, meetLink, onReschedule }: SessionAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card className="session-alert-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
          <motion.div
            className="pulse-dot-wrapper"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="pulse-dot" />
          </motion.div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              <CalendarClock className="h-4 w-4 text-[#22c55e]" />
              Your session starts in 2 hours
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 2 }}>
              {serviceName} &middot; {dateTime}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {meetLink && (
            <a
              href={meetLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" className="bg-[#22c55e] hover:bg-[#16a34a] text-white">
                <Video className="mr-1.5 h-3.5 w-3.5" />
                Join Meeting
              </Button>
            </a>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onReschedule}
            className="border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[rgba(255,255,255,0.04)]"
          >
            Reschedule
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
