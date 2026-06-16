'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { CalendarDays, Banknote, Percent, TrendingUp, Users, Utensils } from 'lucide-react';
import { AiInsightsPanel } from '@/components/dashboard/ai-insights-panel';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { ReservationHeatmap } from '@/components/dashboard/reservation-heatmap';
import { RestaurantPerformanceTable } from '@/components/dashboard/restaurant-performance';
import { OccupancyChart, TrendChart } from '@/components/dashboard/trend-chart';
import { PageTransition } from '@/components/shared/page-transition';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api/client';
export default function AdminDashboardPage() {
  const overview = useQuery({ queryKey: ['dashboard-overview'], queryFn: api.overview });
  const trends = useQuery({ queryKey: ['dashboard-trends'], queryFn: api.trends });
  const reservations = useQuery({ queryKey: ['admin-reservations'], queryFn: api.adminReservations });
  const popularTimes = useQuery({ queryKey: ['popular-times'], queryFn: api.popularTimes });
  const heatmap = useQuery({ queryKey: ['dashboard-heatmap'], queryFn: api.heatmap });
  const performance = useQuery({ queryKey: ['restaurant-performance'], queryFn: api.restaurantPerformance });

  return (
    <PageTransition>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#0a2540]">Overview</h1>
          <p className="mt-1 text-sm text-[#697386]">Reservation and revenue metrics across your portfolio.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#697386]">
          <span>Last 30 days</span>
          <span className="text-[#e6ebf1]">|</span>
          <Link href="/admin/ai-insights" className="font-medium text-[#0ea5e9] hover:underline">
            View insights
          </Link>
        </div>
      </div>

      {overview.isLoading || !overview.data ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <KpiCard title="Total reservations" numericValue={overview.data.totalReservations} suffix="+" change="+12.8% from prior period" trend="up" icon={CalendarDays} />
          <KpiCard title="Today's covers" numericValue={overview.data.todaysReservations} change="Peak expected 19:00" trend="up" icon={TrendingUp} />
          <KpiCard title="Gross volume" numericValue={overview.data.revenue} prefix="RM " change="+18.4% from prior period" trend="up" icon={Banknote} />
          <KpiCard title="Occupancy" numericValue={overview.data.occupancyRate ?? 0} suffix="%" change={`${overview.data.conversionRate}% approval rate`} trend="neutral" icon={Percent} />
          <KpiCard title="Active venues" value={String(overview.data.activeRestaurants)} change="6 cities across Malaysia" trend="neutral" icon={Utensils} />
          <KpiCard title="Avg. party size" numericValue={overview.data.avgPartySize ?? 0} decimals={1} change="Advance bookings trending up" trend="up" icon={Users} />
        </div>
      )}

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {trends.data ? <TrendChart data={trends.data} /> : <Skeleton className="h-80 lg:col-span-2 rounded-xl" />}
        {trends.data ? (
          <OccupancyChart data={trends.data.map((entry) => ({ date: entry.date, occupancy: entry.occupancy ?? 0 }))} />
        ) : (
          <Skeleton className="h-80 rounded-xl" />
        )}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {heatmap.data ? <ReservationHeatmap data={heatmap.data} /> : <Skeleton className="h-80 rounded-xl" />}
        <Card>
          <CardHeader>
            <CardTitle>Popular times</CardTitle>
            <CardDescription>Reservation volume by time slot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(popularTimes.data ?? []).map((item) => {
              const maxReservations = Math.max(...(popularTimes.data ?? []).map((entry) => entry.reservations), 1);
              return (
              <div key={item.timeSlot}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-[#0a2540]">{item.timeSlot}</span>
                  <span className="text-[#697386]">{item.reservations}</span>
                </div>
                <div className="h-2 rounded-full bg-[#f0f4f8]">
                  <div className="h-2 rounded-full bg-[#0ea5e9]" style={{ width: `${(item.reservations / maxReservations) * 100}%` }} />
                </div>
              </div>
            )})}
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {performance.data ? (
            <RestaurantPerformanceTable data={performance.data} />
          ) : (
            <Skeleton className="h-80 rounded-xl" />
          )}
        </div>
        <AiInsightsPanel compact />
      </div>

      <Card className="mt-5">
        <CardHeader className="border-b border-[#e6ebf1]">
          <CardTitle>Recent reservations</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-[#f6f9fc] text-[#697386]">
                <tr>
                  <th className="px-5 py-3 font-medium">Guest</th>
                  <th className="px-5 py-3 font-medium">Restaurant</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Party</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6ebf1]">
                {(reservations.data ?? []).map((r) => (
                  <tr key={r.id} className="hover:bg-[#f6f9fc]/50">
                    <td className="px-5 py-3.5 font-medium text-[#0a2540]">{r.user?.name ?? 'Guest'}</td>
                    <td className="px-5 py-3.5 text-[#425466]">{r.restaurant.name}</td>
                    <td className="px-5 py-3.5 text-[#425466]">{new Date(r.date).toLocaleDateString('en-MY')} · {r.timeSlot}</td>
                    <td className="px-5 py-3.5 text-[#425466]">{r.guestCount}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={r.status === 'APPROVED' ? 'success' : r.status === 'PENDING' ? 'warning' : 'default'}>
                        {r.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageTransition>
  );
}
