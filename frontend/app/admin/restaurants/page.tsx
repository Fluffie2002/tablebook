'use client';

import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PageTransition } from '@/components/shared/page-transition';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api/client';

export default function AdminRestaurantsPage() {
  const { data = [] } = useQuery({ queryKey: ['restaurants'], queryFn: () => api.restaurants() });

  return (
    <PageTransition>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0a2540]">Restaurants</h1>
        <p className="mt-1 text-sm text-[#697386]">Manage venue profiles, availability, and table inventory.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          {data.map((restaurant) => (
            <Card key={restaurant.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-[#0a2540]">{restaurant.name}</h2>
                  <Badge variant="accent">{restaurant.cuisine}</Badge>
                </div>
                <p className="mt-1 text-sm text-[#697386]">{restaurant.city} · {restaurant.address}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => toast.success('Changes saved')}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => toast.success('Venue deactivated')}>Deactivate</Button>
              </div>
            </Card>
          ))}
        </div>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Add restaurant</CardTitle>
          </CardHeader>
          <form className="space-y-3 px-5 pb-5" onSubmit={(e) => { e.preventDefault(); toast.success('Restaurant added'); }}>
            <Input placeholder="Name" required />
            <Input placeholder="Slug" required />
            <Input placeholder="Cuisine" required />
            <Input placeholder="City" required />
            <Input placeholder="Image URL" required />
            <Button className="w-full" type="submit">Add venue</Button>
          </form>
        </Card>
      </div>
    </PageTransition>
  );
}
