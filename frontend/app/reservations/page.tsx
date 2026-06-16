'use client';

import { useQuery } from '@tanstack/react-query';
import { CalendarX } from 'lucide-react';
import { toast } from 'sonner';
import { RequireAuth } from '@/components/auth/require-auth';
import { AppNav } from '@/components/shared/app-nav';
import { PageTransition } from '@/components/shared/page-transition';
import { EmptyState } from '@/components/states/empty-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api/client';

export default function ReservationsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['my-reservations'],
    queryFn: api.myReservations,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav />
      <RequireAuth>
        <PageTransition>
        <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Guest account</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Reservation history</h1>
          </div>

          {isLoading ? (
            <Skeleton className="h-80" />
          ) : data?.length ? (
            <div className="space-y-4">
              {data.map((reservation) => (
                <Card key={reservation.id} className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-semibold text-slate-950">{reservation.restaurant.name}</h2>
                      <Badge>{reservation.status}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">
                      {new Date(reservation.date).toLocaleDateString('en-MY')} at {reservation.timeSlot} · {reservation.guestCount} guests · Table {reservation.table.label}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => toast.success('Reservation cancelled')}
                    disabled={reservation.status === 'CANCELLED'}
                  >
                    <CalendarX className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState title="No reservations yet" description="Browse restaurants and request your first TableBook reservation." />
          )}
        </main>
        </PageTransition>
      </RequireAuth>
    </div>
  );
}
