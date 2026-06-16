'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RestaurantPerformance } from '@/types/tablebook';
import { currency, cn } from '@/lib/utils';

export function RestaurantPerformanceTable({ data }: { data: RestaurantPerformance[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Restaurant performance</CardTitle>
        <p className="text-sm text-slate-500">Ranked by reservation volume this month</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((r, i) => (
            <div
              key={r.name}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition hover:bg-white hover:shadow-sm"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-950">{r.name}</p>
                <p className="text-xs text-slate-500">
                  {r.reservations} reservations · {r.occupancy}% occupancy
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-950">{currency(r.revenue)}</p>
                <p
                  className={cn(
                    'flex items-center justify-end gap-0.5 text-xs font-semibold',
                    r.trend >= 0 ? 'text-emerald-600' : 'text-rose-600',
                  )}
                >
                  {r.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {r.trend >= 0 ? '+' : ''}
                  {r.trend}%
                </p>
              </div>
              <div className="hidden w-24 sm:block">
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
                    style={{ width: `${r.occupancy}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
