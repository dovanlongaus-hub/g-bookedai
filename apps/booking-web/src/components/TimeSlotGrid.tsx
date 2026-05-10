'use client';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotGridProps {
  date: string;
  dateLabel?: string;
  slots: TimeSlot[];
  selectedSlot: string | null;
  onSelect: (time: string) => void;
}

export function TimeSlotGrid({ date, dateLabel, slots, selectedSlot, onSelect }: TimeSlotGridProps) {
  return (
    <div className="time-slot-grid">
      {dateLabel && (
        <div className="time-slot-grid__header">
          <span className="time-slot-grid__date">{dateLabel}</span>
        </div>
      )}
      <div className="time-slot-grid__grid">
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot.time;
          const isDisabled = !slot.available;

          return (
            <button
              key={slot.time}
              type="button"
              className={`time-slot-grid__slot ${
                isSelected
                  ? 'time-slot-grid__slot--selected'
                  : isDisabled
                  ? 'time-slot-grid__slot--disabled'
                  : ''
              }`}
              onClick={() => !isDisabled && onSelect(slot.time)}
              disabled={isDisabled}
              aria-label={`${slot.time}${isDisabled ? ' (unavailable)' : ''}`}
              aria-pressed={isSelected}
            >
              {slot.time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
