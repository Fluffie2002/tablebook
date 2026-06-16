'use client';

import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PageTransition } from '@/components/shared/page-transition';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/api/client';

export default function AdminReservationsPage() {
  const { data = [] } = useQuery({ queryKey: ['admin-reservations'], queryFn: api.adminReservations });

  return (
    <PageTransition>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0a2540]">Reservations</h1>
        <p className="mt-1 text-sm text-[#697386]">Review, approve, and manage incoming booking requests.</p>
      </div>
      <div className="space-y-3">
        {data.map((reservation) => (
          <Card key={reservation.id} className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold text-[#0a2540]">{reservation.restaurant.name}</h2>
                <Badge variant={reservation.status === 'APPROVED' ? 'success' : reservation.status === 'PENDING' ? 'warning' : 'default'}>
                  {reservation.status}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-[#697386]">
                {reservation.user?.name} · {new Date(reservation.date).toLocaleDateString('en-MY')} at {reservation.timeSlot} · {reservation.guestCount} guests
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => toast.success('Reservation approved')}>Approve</Button>
              <Button variant="danger" size="sm" onClick={() => toast.success('Reservation declined')}>Decline</Button>
              <Button variant="ghost" size="sm" onClick={() => toast.message('Edit reservation', { description: 'Update date, time, or party size.' })}>Edit</Button>
            </div>
          </Card>
        ))}
      </div>
    </PageTransition>
  );
}
