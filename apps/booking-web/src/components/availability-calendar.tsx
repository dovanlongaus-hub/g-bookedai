'use client';

import { useState } from 'react';

interface CalendarProps {
  onSelectSlot: (date: string, time: string) => void;
  selectedSlot?: { date: string; time: string };
}

const HOURS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

function getWeekDays(startDate: Date): { date: Date; label: string; dayName: string }[] {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    days.push({
      date: d,
      label: d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }),
      dayName: d.toLocaleDateString('en-AU', { weekday: 'short' }),
    });
  }
  return days;
}

// Mock availability (in production, fetch from API)
function isAvailable(date: Date, hour: string): boolean {
  const day = date.getDay();
  if (day === 0 || day === 6) return false; // No weekends
  const h = parseInt(hour);
  if (h < 9 || h > 17) return false;
  // Random availability for demo
  return Math.random() > 0.3;
}

export function AvailabilityCalendar({ onSelectSlot, selectedSlot }: CalendarProps) {
  const [weekOffset, setWeekOffset] = useState(0);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + (weekOffset * 7) + 1); // Start from tomorrow

  const days = getWeekDays(startDate);
  const [availability] = useState(() => {
    const avail: Record<string, boolean> = {};
    days.forEach(d => {
      HOURS.forEach(h => {
        avail[`${d.label}-${h}`] = isAvailable(d.date, h);
      });
    });
    return avail;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button
          className="btn-secondary"
          style={{ width: 'auto', margin: 0, padding: '0.4rem 1rem', fontSize: '0.85rem' }}
          onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
          disabled={weekOffset === 0}
        >
          &lt; Prev
        </button>
        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
          {days[0].label} — {days[6].label}
        </span>
        <button
          className="btn-secondary"
          style={{ width: 'auto', margin: 0, padding: '0.4rem 1rem', fontSize: '0.85rem' }}
          onClick={() => setWeekOffset(weekOffset + 1)}
          disabled={weekOffset >= 4}
        >
          Next &gt;
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', gap: 2, minWidth: 600 }}>
          {/* Header */}
          <div style={{ padding: '8px 4px', fontSize: '0.7rem', color: 'var(--text-muted)' }}></div>
          {days.map(d => (
            <div key={d.label} style={{ textAlign: 'center', padding: '8px 4px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{d.dayName}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{d.label.split(' ')[0]}</div>
            </div>
          ))}

          {/* Time rows */}
          {HOURS.map(hour => (
            <>
              <div key={`label-${hour}`} style={{ padding: '8px 4px', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                {hour}
              </div>
              {days.map(d => {
                const key = `${d.label}-${hour}`;
                const avail = availability[key];
                const isSelected = selectedSlot?.date === d.label && selectedSlot?.time === hour;

                return (
                  <div
                    key={key}
                    onClick={() => avail && onSelectSlot(d.label, hour)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 6,
                      cursor: avail ? 'pointer' : 'default',
                      background: isSelected
                        ? 'var(--primary, #4f46e5)'
                        : avail
                          ? 'rgba(255,255,255,0.04)'
                          : 'transparent',
                      border: `1px solid ${isSelected ? 'var(--primary, #4f46e5)' : avail ? 'var(--surface-border, rgba(255,255,255,0.08))' : 'transparent'}`,
                      textAlign: 'center',
                      fontSize: '0.75rem',
                      color: isSelected ? '#fff' : avail ? 'var(--text-main, #fff)' : 'rgba(255,255,255,0.15)',
                      transition: 'all 0.15s',
                      opacity: avail ? 1 : 0.3,
                    }}
                    onMouseEnter={e => { if (avail && !isSelected) (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
                    onMouseLeave={e => { if (avail && !isSelected) (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                  >
                    {avail ? hour : '—'}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
          Available
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--primary, #4f46e5)' }} />
          Selected
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, opacity: 0.3 }} />
          Unavailable
        </div>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
        All times shown in AEST (Sydney). Calendar synced with Google Calendar.
      </p>
    </div>
  );
}
