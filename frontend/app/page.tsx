import Link from 'next/link';
import { AppNav } from '@/components/shared/app-nav';
import { SiteFooter } from '@/components/shared/site-footer';
import { RestaurantCard } from '@/components/restaurants/restaurant-card';
import {
  LandingCta,
  LandingFeatures,
  LandingHero,
  LandingOwnerBenefits,
  LandingTrust,
} from '@/components/marketing/landing-sections';
import { Button } from '@/components/ui/button';
import { restaurants } from '@/lib/mock-data';

export default function Home() {
  const featured = restaurants.filter((r) => r.featured);

  return (
    <div className="min-h-screen">
      <AppNav />
      <main>
        <LandingHero />
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Featured venues</p>
              <h2 className="section-title mt-2">Popular restaurants across Malaysia</h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/restaurants">View all</Link>
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
        <LandingFeatures />
        <LandingOwnerBenefits />
        <LandingTrust />
        <LandingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
