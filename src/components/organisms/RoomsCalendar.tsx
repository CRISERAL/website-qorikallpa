'use client';

import { useState } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isAfter, isBefore, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

type Props = {
  dateRange: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
  onClose: () => void;
  onClear: () => void;
};

export default function RoomsCalendar({ dateRange, onSelect, onClose, onClear }: Props) {
  const [currentMonth] = useState(startOfToday());
  const [selectingFrom, setSelectingFrom] = useState(true);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const firstDayOfWeek = monthStart.getDay();

  const nextMonth = addMonths(currentMonth, 1);
  const nextMonthStart = startOfMonth(nextMonth);
  const nextMonthEnd = endOfMonth(nextMonth);
  const nextMonthDays = eachDayOfInterval({ start: nextMonthStart, end: nextMonthEnd });
  const nextFirstDayOfWeek = nextMonthStart.getDay();

  const today = startOfToday();

  const handleDayClick = (day: Date) => {
    if (isBefore(day, today)) return;

    if (selectingFrom) {
      onSelect({ from: day, to: undefined } as DateRange);
      setSelectingFrom(false);
    } else {
      if (dateRange?.from && isAfter(day, dateRange.from)) {
        onSelect({ from: dateRange.from, to: day });
        setSelectingFrom(true);
      } else {
        onSelect({ from: day, to: undefined } as DateRange);
        setSelectingFrom(false);
      }
    }
  };

  const isInRange = (day: Date) => {
    if (!dateRange?.from) return false;
    const to = dateRange.to || dateRange.from;
    return isAfter(day, dateRange.from) && isBefore(day, to);
  };

  const isSelected = (day: Date) => {
    return (dateRange?.from && isSameDay(day, dateRange.from)) || 
           (dateRange?.to && isSameDay(day, dateRange.to));
  };

  const isRangeStart = (day: Date) => {
    return dateRange?.from && isSameDay(day, dateRange.from);
  };

  const isRangeEnd = (day: Date) => {
    return dateRange?.to && isSameDay(day, dateRange.to);
  };

  const isDisabled = (day: Date) => {
    return isBefore(day, today);
  };

  const handleClear = () => {
    onClear();
    onClose();
  };

  const renderDays = (monthDays: Date[], firstDay: number, month: Date) => (
    <div>
      <div className="text-center mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-tertiary-700 font-playfair">
          {format(month, 'MMMM yyyy', { locale: es })}
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map((d) => (
          <div key={d} className="text-[0.65rem] font-semibold text-tertiary-500 text-center uppercase">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array(firstDay).fill(null).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {monthDays.map((day) => {
          const disabled = isDisabled(day);
          const selected = isSelected(day);
          const inRange = isInRange(day);
          const rangeStart = isRangeStart(day);
          const rangeEnd = isRangeEnd(day);

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => handleDayClick(day)}
              className={`
                w-8 h-8 text-xs rounded transition-all duration-150 font-medium
                ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-secondary-200'}
                ${selected && (rangeStart || rangeEnd) ? 'bg-primary-600 text-white' : ''}
                ${inRange ? 'bg-secondary-200 text-tertiary-900 rounded-none' : ''}
                ${isSameDay(day, today) && !selected ? 'border border-primary-600 text-primary-600 font-bold' : ''}
                ${!selected && !inRange && !disabled ? 'text-tertiary-800' : ''}
                ${rangeStart ? 'rounded-l-md rounded-r-none' : ''}
                ${rangeEnd ? 'rounded-r-md rounded-l-none' : ''}
              `}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20" onClick={onClose} />

      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-fit">
        <div className="bg-white rounded-xl shadow-2xl border border-neutral-300 overflow-hidden">
          <div className="px-6 py-4 text-center border-b border-neutral-200">
            <h3 className="font-playfair text-lg font-bold text-tertiary-800 mb-1">
              Selecciona tu estadía
            </h3>
            <p className="text-xs text-tertiary-500">
              {dateRange?.from && dateRange?.to
                ? `${format(dateRange.from, 'dd MMM yyyy', { locale: es })} - ${format(dateRange.to, 'dd MMM yyyy', { locale: es })}`
                : dateRange?.from
                ? `Desde ${format(dateRange.from, 'dd MMM yyyy', { locale: es })}`
                : 'Elige las fechas de entrada y salida'}
            </p>
          </div>

          <div className="p-4">
            <div className="flex flex-wrap justify-center gap-6">
              {renderDays(days, firstDayOfWeek, currentMonth)}
              {renderDays(nextMonthDays, nextFirstDayOfWeek, nextMonth)}
            </div>
          </div>

          <div className="flex gap-2 px-4 pb-4">
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 bg-neutral-200 text-tertiary-700 hover:bg-neutral-300"
            >
              Limpiar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 bg-primary-600 text-white hover:bg-primary-700"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}