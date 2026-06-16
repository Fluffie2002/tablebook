'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { heatmapData } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const hours = ['12', '14', '18', '19', '20', '21'];

function intensity(value: number) {
  if (value >= 90) return 'bg-sky-600 text-white';
  if (value >= 70) return 'bg-sky-500 text-white';
  if (value >= 50) return 'bg-sky-400 text-white';
  if (value >= 30) return 'bg-sky-200 text-sky-900';
  return 'bg-sky-50 text-sky-700';
}

export function ReservationHeatmap() {
  const max = Math.max(...heatmapData.flatMap((d) => hours.map((h) => d[h as keyof typeof d] as number)));

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
              {hours.map((h) => (
                <div key={h} className="text-center text-xs font-medium text-slate-500">
                  {h}:00
                </div>
              ))}
            </div>
            {heatmapData.map((row) => (
              <div key={row.day} className="mb-1.5 grid grid-cols-[48px_repeat(6,1fr)] gap-1.5">
                <div className="flex items-center text-xs font-semibold text-slate-600">{row.day}</div>
                {hours.map((h) => {
                  const val = row[h as keyof typeof row] as number;
                  return (
                    <div
                      key={h}
                      className={cn(
                        'flex h-10 items-center justify-center rounded-lg text-xs font-semibold transition hover:scale-105',
                        intensity((val / max) * 100),
                      )}
                      title={`${row.day} ${h}:00 — ${val} reservations`}
                    >
                      {val}
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
