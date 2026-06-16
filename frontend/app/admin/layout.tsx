'use client';

import { RequireAuth } from '@/components/auth/require-auth';
import { AdminShell } from '@/components/shared/app-nav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth role="ADMIN">
      <AdminShell>{children}</AdminShell>
    </RequireAuth>
  );
}
