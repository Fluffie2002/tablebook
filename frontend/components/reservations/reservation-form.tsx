'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { CalendarCheck, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AvailabilitySlots } from '@/components/restaurants/availability-slots';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api/client';
import { getAvailability } from '@/lib/mock-data';
import { currency } from '@/lib/utils';
import { Restaurant } from '@/types/tablebook';

const schema = z.object({
  date: z.string().min(1, 'Choose a date'),
  timeSlot: z.string().min(1, 'Choose a time'),
  guestCount: z.coerce.number().min(1).max(12),
  notes: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof schema>;
type ReservationFormInput = z.input<typeof schema>;

export function ReservationForm({ restaurant }: { restaurant: Restaurant }) {
  const slots = getAvailability(restaurant.slug);
  const [selectedSlot, setSelectedSlot] = useState('19:00');

  const form = useForm<ReservationFormInput, unknown, ReservationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date().toISOString().slice(0, 10),
      timeSlot: '19:00',
      guestCount: 2,
      notes: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (values: ReservationFormValues) =>
      api.createReservation({ ...values, restaurantId: restaurant.id }),
    onSuccess: () => toast.success('Reservation request submitted!', { description: 'You will receive confirmation shortly.' }),
    onError: () => toast.error('Could not create reservation', { description: 'Please try a different time slot.' }),
  });

  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time);
    form.setValue('timeSlot', time);
  };

  return (
    <Card className="sticky top-20 overflow-hidden">
      <CardHeader className="border-b border-[#e6ebf1]">
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck className="h-4 w-4 text-[#0ea5e9]" />
          Reserve a table
        </CardTitle>
        <p className="text-sm text-[#697386]">Free cancellation up to 2 hours before</p>
      </CardHeader>
      <CardContent className="p-6">
        <form className="space-y-5" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Date</label>
            <Input type="date" {...form.register('date')} />
          </div>

          <AvailabilitySlots slots={slots} selected={selectedSlot} onSelect={handleSlotSelect} />
          <input type="hidden" {...form.register('timeSlot')} />

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Number of guests</label>
            <Input type="number" min={1} max={12} {...form.register('guestCount')} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Special requests</label>
            <Input placeholder="Halal seating, high chair, allergies..." {...form.register('notes')} />
          </div>

          <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-4 text-sm text-slate-600">
            <p className="flex items-center gap-2 font-semibold text-slate-950">
              <Sparkles className="h-4 w-4 text-sky-500" />
              Est. {currency(restaurant.averageSpend * Number(form.watch('guestCount') || 2))} total
            </p>
            <p className="mt-1 text-xs text-slate-500">Based on average spend per guest</p>
          </div>

          <Button className="w-full h-12 text-base" disabled={mutation.isPending}>
            {mutation.isPending ? 'Submitting...' : 'Request reservation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
