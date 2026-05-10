'use client';

import { useState, useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import 'react-day-picker/style.css';

interface BookingCalendarProps {
  onSelect: (date: Date) => void;
  selectedDate?: Date | null;
  availableDates?: Date[];
}

export function BookingCalendar({ onSelect, selectedDate, availableDates }: BookingCalendarProps) {
  const [month, setMonth] = useState<Date>(new Date());

  const today = useMemo(() => startOfDay(new Date()), []);
  const maxDate = useMemo(() => addDays(today, 56), [today]); // 8 weeks

  // Disable dates before today and after 8 weeks
  const disabledMatcher = useMemo(
    () => [
      { before: today },
      { after: maxDate },
    ],
    [today, maxDate]
  );

  // Create modifiers for available dates (dots)
  const modifiers = useMemo(() => {
    if (!availableDates || availableDates.length === 0) return {};
    return {
      available: availableDates.filter(
        (d) => !isBefore(d, today) && !isBefore(maxDate, d)
      ),
    };
  }, [availableDates, today, maxDate]);

  return (
    <div className="booking-calendar">
      <DayPicker
        mode="single"
        selected={selectedDate || undefined}
        onSelect={(date) => {
          if (date) onSelect(date);
        }}
        month={month}
        onMonthChange={setMonth}
        disabled={disabledMatcher}
        modifiers={modifiers}
        startMonth={today}
        endMonth={maxDate}
        classNames={{
          root: 'booking-calendar__picker',
          months: 'booking-calendar__months',
          month_caption: 'booking-calendar__caption',
          nav: 'booking-calendar__nav',
          button_previous: 'booking-calendar__nav-btn',
          button_next: 'booking-calendar__nav-btn',
          weekdays: 'booking-calendar__weekdays',
          weekday: 'booking-calendar__weekday',
          weeks: 'booking-calendar__weeks',
          week: 'booking-calendar__week',
          day: 'booking-calendar__day',
          day_button: 'booking-calendar__day-btn',
          selected: 'booking-calendar__day--selected',
          today: 'booking-calendar__day--today',
          disabled: 'booking-calendar__day--disabled',
          outside: 'booking-calendar__day--outside',
        }}
        modifiersClassNames={{
          available: 'booking-calendar__day--available',
        }}
      />
    </div>
  );
}
