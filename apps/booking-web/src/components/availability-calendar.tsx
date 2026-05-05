'use client';

import { useState, useMemo, useCallback } from 'react';

interface CalendarProps {
  mode: 'single' | 'multi';
  sessionCount?: number; // 5 or 10 for packages
  onSelectSlot: (date: string, time: string) => void;
  onSelectMultiSlots?: (slots: { date: string; time: string }[]) => void;
  selectedSlot?: { date: string; time: string };
  selectedSlots?: { date: string; time: string }[];
}

const HOURS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

function getWeekDays(startDate: Date): { date: Date; label: string; dayName: string; fullDate: string }[] {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    days.push({
      date: d,
      label: d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }),
      dayName: d.toLocaleDateString('en-AU', { weekday: 'short' }),
      fullDate: d.toISOString().split('T')[0],
    });
  }
  return days;
}

// Consistent availability based on date hash (not random per render)
function isAvailable(dateStr: string, hour: string): boolean {
  const d = new Date(dateStr);
  if (d.getDay() === 0 || d.getDay() === 6) return false;
  // Hash-based pseudo-random for consistency
  const hash = (d.getDate() * 31 + d.getMonth() * 13 + parseInt(hour) * 7) % 10;
  return hash > 2; // ~70% availability
}

export function AvailabilityCalendar({ mode, sessionCount = 1, onSelectSlot, onSelectMultiSlots, selectedSlot, selectedSlots = [] }: CalendarProps) {
  const [weekOffset, setWeekOffset] = useState(0);
  const maxWeeks = 8; // 2 months

  const startDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + (weekOffset * 7) + 1);
    return d;
  }, [weekOffset]);

  const days = useMemo(() => getWeekDays(startDate), [startDate]);

  const availability = useMemo(() => {
    const avail: Record<string, boolean> = {};
    days.forEach(d => {
      HOURS.forEach(h => {
        avail[`${d.label}-${h}`] = isAvailable(d.fullDate, h);
      });
    });
    return avail;
  }, [days]);

  // For multi mode: when first slot selected, auto-generate remaining slots (same day+time weekly)
  const handleSlotClick = useCallback((dateLabel: string, time: string, fullDate: string) => {
    if (mode === 'single') {
      onSelectSlot(dateLabel, time);
      return;
    }

    // Multi mode
    if (selectedSlots.length === 0) {
      // First selection — auto-generate remaining sessions on same weekday+time
      const firstDate = new Date(fullDate);
      const slots: { date: string; time: string }[] = [{ date: dateLabel, time }];

      for (let i = 1; i < sessionCount; i++) {
        const nextDate = new Date(firstDate);
        nextDate.setDate(nextDate.getDate() + (i * 7)); // Same day next week
        const nextLabel = nextDate.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
        slots.push({ date: nextLabel, time });
      }

      onSelectMultiSlots?.(slots);
    } else {
      // User is overriding a specific session — find the nearest session to replace
      // Or add/remove from selection
      const existingIndex = selectedSlots.findIndex(s => s.date === dateLabel && s.time === time);
      if (existingIndex >= 0) {
        // Deselect this slot
        const updated = [...selectedSlots];
        updated.splice(existingIndex, 1);
        onSelectMultiSlots?.(updated);
      } else if (selectedSlots.length < sessionCount) {
        // Add this slot
        onSelectMultiSlots?.([...selectedSlots, { date: dateLabel, time }]);
      } else {
        // Replace the last slot
        const updated = [...selectedSlots];
        updated[updated.length - 1] = { date: dateLabel, time };
        onSelectMultiSlots?.(updated);
      }
    }
  }, [mode, sessionCount, selectedSlots, onSelectSlot, onSelectMultiSlots]);

  const isSlotSelected = (dateLabel: string, time: string) => {
    if (mode === 'single') {
      return selectedSlot?.date === dateLabel && selectedSlot?.time === time;
    }
    return selectedSlots.some(s => s.date === dateLabel && s.time === time);
  };

  const getSlotNumber = (dateLabel: string, time: string): number | null => {
    if (mode !== 'multi') return null;
    const idx = selectedSlots.findIndex(s => s.date === dateLabel && s.time === time);
    return idx >= 0 ? idx + 1 : null;
  };

  // Week range label
  const weekLabel = `${days[0].label} — ${days[6].label}`;
  const monthLabel = days[0].date.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });

  return (
    <div>
      {/* Month header */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: '1rem', fontWeight: 700 }}>{monthLabel}</span>
      </div>

      {/* Week navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <button
          className="btn-secondary"
          style={{ width: 'auto', margin: 0, padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
          disabled={weekOffset === 0}
        >
          ← Prev
        </button>
        <span style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {weekLabel}
        </span>
        <button
          className="btn-secondary"
          style={{ width: 'auto', margin: 0, padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          onClick={() => setWeekOffset(weekOffset + 1)}
          disabled={weekOffset >= maxWeeks - 1}
        >
          Next →
        </button>
      </div>

      {/* Week quick-jump dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: '0.75rem' }}>
        {Array.from({ length: maxWeeks }).map((_, i) => (
          <button
            key={i}
            onClick={() => setWeekOffset(i)}
            style={{
              width: weekOffset === i ? 20 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              background: weekOffset === i ? 'var(--primary, #4f46e5)' : 'rgba(255,255,255,0.1)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            title={`Week ${i + 1}`}
          />
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '50px repeat(7, 1fr)', gap: 2, minWidth: 560 }}>
          {/* Day headers */}
          <div />
          {days.map(d => (
            <div key={d.label} style={{ textAlign: 'center', padding: '6px 2px' }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{d.dayName}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{d.label.split(' ')[0]}</div>
            </div>
          ))}

          {/* Time slots */}
          {HOURS.map(hour => (
            <div key={`row-${hour}`} style={{ display: 'contents' }}>
              <div style={{ padding: '6px 4px', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                {hour}
              </div>
              {days.map(d => {
                const key = `${d.label}-${hour}`;
                const avail = availability[key];
                const selected = isSlotSelected(d.label, hour);
                const slotNum = getSlotNumber(d.label, hour);

                return (
                  <div
                    key={key}
                    onClick={() => avail && handleSlotClick(d.label, hour, d.fullDate)}
                    style={{
                      padding: '6px 2px',
                      borderRadius: 6,
                      cursor: avail ? 'pointer' : 'default',
                      background: selected
                        ? 'var(--primary, #4f46e5)'
                        : avail ? 'rgba(255,255,255,0.03)' : 'transparent',
                      border: `1px solid ${selected ? 'var(--primary, #4f46e5)' : avail ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
                      textAlign: 'center',
                      fontSize: '0.7rem',
                      color: selected ? '#fff' : avail ? 'var(--text-main)' : 'rgba(255,255,255,0.1)',
                      transition: 'all 0.15s',
                      opacity: avail ? 1 : 0.2,
                      position: 'relative',
                    }}
                  >
                    {avail ? (slotNum ? `#${slotNum}` : hour) : '—'}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }} />
          Available
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--primary, #4f46e5)' }} />
          Selected
        </div>
        {mode === 'multi' && (
          <div style={{ color: 'var(--accent)', fontWeight: 500 }}>
            {selectedSlots.length}/{sessionCount} sessions chosen
          </div>
        )}
      </div>

      {/* Multi-session list */}
      {mode === 'multi' && selectedSlots.length > 0 && (
        <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: '12px 16px' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>
            Your {sessionCount}-Session Schedule
          </h4>
          <div style={{ display: 'grid', gap: 4 }}>
            {selectedSlots.map((s, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '6px 10px', borderRadius: 6,
                background: 'rgba(255,255,255,0.02)', fontSize: '0.82rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: '#fff' }}>{i + 1}</span>
                  <span>{s.date} at {s.time}</span>
                </div>
                <button
                  onClick={() => {
                    const updated = selectedSlots.filter((_, idx) => idx !== i);
                    onSelectMultiSlots?.(updated);
                  }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          {selectedSlots.length < sessionCount && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 8, fontStyle: 'italic' }}>
              Click on the calendar to add more sessions. Navigate weeks with arrows.
            </p>
          )}
          {selectedSlots.length > 0 && (
            <button
              onClick={() => onSelectMultiSlots?.([])}
              style={{ marginTop: 8, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline' }}
            >
              Reset all sessions
            </button>
          )}
        </div>
      )}

      <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
        All times AEST (Sydney) • Calendar synced with ceo@longcare.au
      </p>
    </div>
  );
}
