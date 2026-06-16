'use client';

import { Flame, Users } from 'lucide-react';
import { TimeSlotAvailability } from '@/types/tablebook';
import { cn } from '@/lib/utils';

const popularityStyles = {
  low: 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100',
  medium: 'border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100',
  high: 'border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100',
  peak: 'border-orange-200 bg-orange-50 text-orange-800 hover:bg-orange-100',
};

export function AvailabilitySlots({
  slots,
  selected,
  onSelect,
}: {
  slots: TimeSlotAvailability[];
  selected?: string;
  onSelect: (time: string) => void;
}) {
  const recommended = slots.filter((s) => s.available && (s.popularity === 'medium' || s.popularity === 'low'));

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-slate-950">Available times</p>
        <p className="text-xs text-slate-500">Real-time table availability for your selected date</p>
      </div>

      {recommended.length > 0 && (
        <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">Recommended</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {recommended.slice(0, 3).map((slot) => (
              <button
                key={slot.time}
                type="button"
                onClick={() => onSelect(slot.time)}
                className={cn(
                  'rounded-xl border px-3 py-2 text-sm font-semibold transition',
                  selected === slot.time ? 'border-sky-500 bg-sky-500 text-white' : popularityStyles[slot.popularity],
                )}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {slots.map((slot) => (
          <button
            key={slot.time}
            type="button"
            disabled={!slot.available}
            onClick={() => onSelect(slot.time)}
            className={cn(
              'relative rounded-xl border px-2 py-3 text-center text-sm font-medium transition',
              !slot.available && 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300 line-through',
              slot.available && selected === slot.time && 'border-slate-950 bg-slate-950 text-white shadow-lg',
              slot.available && selected !== slot.time && popularityStyles[slot.popularity],
            )}
          >
            {slot.time}
            {slot.popularity === 'peak' && slot.available && (
              <Flame className="absolute -right-1 -top-1 h-3.5 w-3.5 text-orange-500" />
            )}
            {slot.available && slot.tablesLeft && (
              <span className="mt-0.5 flex items-center justify-center gap-0.5 text-[10px] opacity-70">
                <Users className="h-2.5 w-2.5" />
                {slot.tablesLeft}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Available</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-400" /> Peak demand</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-slate-300" /> Unavailable</span>
      </div>
    </div>
  );
}
