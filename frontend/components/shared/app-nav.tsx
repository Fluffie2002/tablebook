'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Brain,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Store,
  Table2,
  Utensils,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth/auth-context';
import { cn } from '@/lib/utils';

const links = [
  { href: '/restaurants', label: 'Restaurants' },
  { href: '/reservations', label: 'Reservations' },
];

export function AppNav() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-[#e6ebf1] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a2540] text-white">
            <Utensils className="h-4 w-4" />
          </div>
          <span className="text-[15px] font-semibold text-[#0a2540]">TableBook</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium text-[#425466] transition hover:bg-[#f6f9fc] hover:text-[#0a2540]',
                pathname === link.href && 'bg-[#f6f9fc] text-[#0a2540]',
              )}
            >
              {link.label}
            </Link>
          ))}
          {user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium text-[#425466] transition hover:bg-[#f6f9fc]',
                pathname.startsWith('/admin') && 'bg-[#f6f9fc] text-[#0a2540]',
              )}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-sm text-[#697386] sm:block">{user.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="mr-1.5 h-3.5 w-3.5" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Start free</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const nav = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/reservations', label: 'Reservations', icon: CalendarDays },
    { href: '/admin/restaurants', label: 'Restaurants', icon: Store },
    { href: '/admin/tables', label: 'Tables', icon: Table2 },
    { href: '/admin/ai-insights', label: 'Insights', icon: Brain },
  ];

  return (
    <div className="flex min-h-screen bg-[#f6f9fc]">
      <aside className="hidden w-60 shrink-0 border-r border-[#e6ebf1] bg-white lg:flex lg:flex-col">
        <div className="flex h-14 items-center gap-2.5 border-b border-[#e6ebf1] px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0a2540] text-white">
              <Utensils className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-semibold text-[#0a2540]">TableBook</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-[#425466] transition hover:bg-[#f6f9fc]',
                pathname === item.href && 'bg-[#edf8ff] text-[#0369a1]',
              )}
            >
              <item.icon className="h-4 w-4 shrink-0 opacity-70" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-[#e6ebf1] p-4">
          <p className="truncate text-sm font-medium text-[#0a2540]">{user?.name}</p>
          <p className="truncate text-xs text-[#697386]">{user?.email}</p>
          <Button variant="ghost" size="sm" className="mt-3 w-full justify-start" onClick={logout}>
            Sign out
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-[#e6ebf1] bg-white px-5 sm:px-8">
          <p className="text-sm text-[#697386]">Operator workspace</p>
          <Link href="/restaurants" className="text-sm font-medium text-[#0ea5e9] hover:underline">
            View guest site
          </Link>
        </header>
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
