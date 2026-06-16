'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/lib/auth/auth-context';
import { UserRole } from '@/types/tablebook';

export function RequireAuth({ children, role }: { children: ReactNode; role?: UserRole }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="mx-auto grid min-h-[70vh] max-w-2xl place-items-center px-5">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Sign in required</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Sign in to your TableBook account to access this workspace.</p>
          <Button asChild className="mt-6">
            <Link href="/login">Sign in</Link>
          </Button>
        </Card>
      </main>
    );
  }

  if (role && user.role !== role) {
    return (
      <main className="mx-auto grid min-h-[70vh] max-w-2xl place-items-center px-5">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Admin access required</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">This area is reserved for restaurant operators and platform admins.</p>
        </Card>
      </main>
    );
  }

  return <>{children}</>;
}
