'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const hours = ['12', '14', '18', '19', '20', '21'] as const;

export type HeatmapRow = {
  day: string;
  '12': number;
  '14': number;
  '18': number;
  '19': number;
  '20': number;
  '21': number;
};

function intensity(value: number, max: number) {
  const ratio = max ? (value / max) * 100 : 0;
  if (ratio >= 90) return 'bg-sky-600 text-white';
  if (ratio >= 70) return 'bg-sky-500 text-white';
  if (ratio >= 50) return 'bg-sky-400 text-white';
  if (ratio >= 30) return 'bg-sky-200 text-sky-900';
  return 'bg-sky-50 text-sky-700';
}

export function ReservationHeatmap({ data }: { data: HeatmapRow[] }) {
  const max = Math.max(
    ...data.flatMap((row) => hours.map((hour) => row[hour])),
    1,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Peak hours heatmap</CardTitle>
        <p className="text-sm text-slate-500">Reservation density by day and time</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[480px]">
            <div className="mb-2 grid grid-cols-[48px_repeat(6,1fr)] gap-1.5">
              <div />
              {hours.map((hour) => (
                <div key={hour} className="text-center text-xs font-medium text-slate-500">
                  {hour}:00
                </div>
              ))}
            </div>
            {data.map((row) => (
              <div key={row.day} className="mb-1.5 grid grid-cols-[48px_repeat(6,1fr)] gap-1.5">
                <div className="flex items-center text-xs font-semibold text-slate-600">{row.day}</div>
                {hours.map((hour) => {
                  const value = row[hour];
                  return (
                    <div
                      key={hour}
                      className={cn(
                        'flex h-10 items-center justify-center rounded-lg text-xs font-semibold transition hover:scale-105',
                        intensity(value, max),
                      )}
                      title={`${row.day} ${hour}:00 — ${value} reservations`}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
