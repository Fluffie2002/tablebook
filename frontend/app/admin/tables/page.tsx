'use client';

import { toast } from 'sonner';
import { PageTransition } from '@/components/shared/page-transition';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { restaurants } from '@/lib/mock-data';

export default function AdminTablesPage() {
  const tables = restaurants.flatMap((r) =>
    (r.tables ?? []).map((t) => ({ ...t, restaurantName: r.name })),
  );

  return (
    <PageTransition>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0a2540]">Tables</h1>
        <p className="mt-1 text-sm text-[#697386]">Configure seating capacity and availability per venue.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="grid gap-3 sm:grid-cols-2">
          {tables.map((table) => (
            <Card key={table.id} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-[#0a2540]">{table.label}</h2>
                  <p className="mt-1 text-sm text-[#697386]">{table.restaurantName}</p>
                </div>
                <Badge>{table.capacity} seats</Badge>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => toast.success('Table updated')}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => toast.success('Table removed')}>Remove</Button>
              </div>
            </Card>
          ))}
        </div>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Add table</CardTitle>
          </CardHeader>
          <form className="space-y-3 px-5 pb-5" onSubmit={(e) => { e.preventDefault(); toast.success('Table added'); }}>
            <Input placeholder="Restaurant ID" required />
            <Input placeholder="Label (e.g. T1)" required />
            <Input type="number" placeholder="Capacity" min={1} required />
            <Button className="w-full" type="submit">Add table</Button>
          </form>
        </Card>
      </div>
    </PageTransition>
  );
}
