import Link from 'next/link';
import { Utensils } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e6ebf1] bg-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a2540] text-white">
                <Utensils className="h-4 w-4" />
              </div>
              <span className="font-semibold text-[#0a2540]">TableBook</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#697386]">
              Reservation infrastructure for Malaysian restaurants. Discovery, booking, and operations in one platform.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0a2540]">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-[#697386]">
              <li><Link href="/restaurants" className="hover:text-[#0a2540]">Restaurants</Link></li>
              <li><Link href="/reservations" className="hover:text-[#0a2540]">Reservations</Link></li>
              <li><Link href="/admin" className="hover:text-[#0a2540]">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0a2540]">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-[#697386]">
              <li><Link href="/register" className="hover:text-[#0a2540]">Get started</Link></li>
              <li><Link href="/login" className="hover:text-[#0a2540]">Sign in</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-[#e6ebf1] pt-8 text-xs text-[#8898aa] sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} TableBook Sdn. Bhd.</p>
          <p>Kuala Lumpur · Penang · Johor Bahru · Melaka</p>
        </div>
      </div>
    </footer>
  );
}
