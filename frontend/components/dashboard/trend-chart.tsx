'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TrendChart({
  data,
}: {
  data: { date: string; reservations: number; revenue: number; occupancy?: number }[];
}) {
  return (
    <Card className="lg:col-span-2 overflow-hidden">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50">
        <CardTitle className="text-lg">Reservation & revenue trends</CardTitle>
        <p className="text-sm text-slate-500">30-day performance overview</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
              />
              <Area type="monotone" dataKey="reservations" stroke="#0EA5E9" fill="url(#resGrad)" strokeWidth={2.5} name="Reservations" />
              <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fill="url(#revGrad)" strokeWidth={2} name="Revenue (RM)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function OccupancyChart({
  data,
}: {
  data: { date: string; occupancy: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Occupancy rate</CardTitle>
        <p className="text-sm text-slate-500">Daily seat utilization</p>
      </CardHeader>
      <CardContent>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0' }} />
              <Bar dataKey="occupancy" fill="#10B981" radius={[6, 6, 0, 0]} name="Occupancy %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
