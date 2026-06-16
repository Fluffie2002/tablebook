'use client';

import Link from 'next/link';
import { SafeImage } from '@/components/shared/safe-image';
import { ArrowRight, BarChart3, CalendarCheck, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { liveActivity, overview, restaurants, trends } from '@/lib/mock-data';

export function LandingHero() {
  return (
    <section className="hero-surface border-b border-[#e6ebf1]">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="eyebrow">Malaysia&apos;s restaurant reservation platform</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#0a2540] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Fill every seat. Run every service with confidence.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-7 text-[#425466]">
            TableBook connects guest discovery, table management, and revenue analytics — built for Malaysian operators from KL kopitiams to Penang mamak stalls.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/restaurants">Browse restaurants</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/admin">Open dashboard</Link>
            </Button>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-[#e6ebf1] pt-8">
            {[
              ['528+', 'Monthly reservations'],
              ['4.8', 'Guest satisfaction'],
              ['18', 'Active venues'],
            ].map(([val, label]) => (
              <div key={label}>
                <dt className="text-2xl font-semibold text-[#0a2540]">{val}</dt>
                <dd className="mt-1 text-sm text-[#697386]">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-[#e6ebf1] bg-white shadow-lg">
            <div className="border-b border-[#e6ebf1] px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#697386]">Gross volume</p>
                  <p className="text-2xl font-semibold text-[#0a2540]">RM {overview.revenue.toLocaleString('en-MY')}</p>
                </div>
                <span className="rounded-md bg-[#e8f8ef] px-2 py-1 text-xs font-medium text-[#09825d]">+18.4%</span>
              </div>
            </div>
            <div className="flex h-28 items-end gap-1 border-b border-[#e6ebf1] px-5 py-4">
              {trends.slice(-12).map((d) => (
                <div
                  key={d.date}
                  className="flex-1 rounded-sm bg-[#0ea5e9]/80"
                  style={{ height: `${24 + (d.reservations / 40) * 76}%` }}
                />
              ))}
            </div>
            <div className="divide-y divide-[#e6ebf1]">
              {liveActivity.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-5 py-3.5 text-sm">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#09825d]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[#0a2540]">{item.text}</p>
                    <p className="text-xs text-[#8898aa]">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-lg border border-[#e6ebf1] bg-white p-3 shadow-md sm:block">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-md">
                <SafeImage src={restaurants[0].heroImageUrl} alt={restaurants[0].name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#0a2540]">{restaurants[0].name}</p>
                <p className="text-xs text-[#697386]">4 guests · 19:00 · Kuala Lumpur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingFeatures() {
  const items = [
    { icon: CalendarCheck, title: 'Guest booking', desc: 'Search, compare, and reserve with real-time availability across your portfolio.' },
    { icon: BarChart3, title: 'Revenue analytics', desc: 'Track covers, occupancy, and performance with operator-grade reporting.' },
    { icon: Shield, title: 'Secure operations', desc: 'Role-based access, audit-ready workflows, and enterprise authentication.' },
    { icon: Zap, title: 'Demand intelligence', desc: 'Surface peak periods and booking patterns to optimize staffing and inventory.' },
  ];

  return (
    <section className="border-b border-[#e6ebf1] bg-white py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow">Platform</p>
        <h2 className="section-title mt-2 max-w-xl">Infrastructure for modern restaurant groups</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="rounded-xl border border-[#e6ebf1] p-6 transition hover:border-[#c7d2e0]">
              <item.icon className="h-5 w-5 text-[#0ea5e9]" />
              <h3 className="mt-4 text-base font-semibold text-[#0a2540]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#697386]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingOwnerBenefits() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">For operators</p>
            <h2 className="section-title mt-2">Reduce no-shows. Increase cover velocity.</h2>
            <p className="mt-4 text-[#425466] leading-7">
              Operators use TableBook to approve reservations faster, understand demand curves, and align front-of-house with actual booking data.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-[#425466]">
              {['Unified reservation inbox', 'Per-venue performance benchmarks', 'Peak-hour staffing signals', 'Guest preference tracking'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#0ea5e9]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ['34%', 'Higher peak-hour utilization'],
              ['72%', 'First-touch approval rate'],
              ['2.4×', 'Faster reservation handling'],
              ['18%', 'Revenue lift in 90 days'],
            ].map(([v, l]) => (
              <div key={l} className="rounded-xl border border-[#e6ebf1] bg-white p-6">
                <p className="text-3xl font-semibold text-[#0a2540]">{v}</p>
                <p className="mt-2 text-sm text-[#697386]">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingTrust() {
  const metrics = [
    ['5', 'Cities'],
    ['180+', 'Tables managed'],
    ['99.9%', 'Uptime SLA'],
    ['<2min', 'Avg. approval time'],
  ];

  return (
    <section className="border-y border-[#e6ebf1] bg-[#f6f9fc] py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-center text-sm text-[#697386]">Trusted by restaurant groups across Peninsular Malaysia</p>
        <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {metrics.map(([val, label]) => (
            <div key={label} className="text-center">
              <dt className="text-2xl font-semibold text-[#0a2540]">{val}</dt>
              <dd className="mt-1 text-sm text-[#697386]">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function LandingCta() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="rounded-xl border border-[#e6ebf1] bg-[#0a2540] px-8 py-14 text-center sm:px-16">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Start managing reservations like a growth company
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[#a3b4c6]">
            Set up your venue, invite your team, and go live in under an hour.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-white text-[#0a2540] hover:bg-[#f6f9fc]">
              <Link href="/register">Create account</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-[#425466] text-white hover:bg-[#1a3a5c]">
              <Link href="/admin">View dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
