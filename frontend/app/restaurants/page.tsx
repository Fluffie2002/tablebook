'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { RestaurantCard } from '@/components/restaurants/restaurant-card';
import {
  FilterChip,
  RestaurantFilters,
  type RestaurantFilters as Filters,
} from '@/components/restaurants/restaurant-filters';
import { AppNav } from '@/components/shared/app-nav';
import { PageTransition } from '@/components/shared/page-transition';
import { EmptyState } from '@/components/states/empty-state';
import { ErrorState } from '@/components/states/error-state';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api/client';
import { restaurants as mockRestaurants } from '@/lib/mock-data';
import { Restaurant, PriceRange } from '@/types/tablebook';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const priceOrder: Record<PriceRange, number> = { BUDGET: 1, MODERATE: 2, PREMIUM: 3, LUXURY: 4 };

function applyFilters(list: Restaurant[], filters: Filters) {
  let result = [...list];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q),
    );
  }
  if (filters.city) result = result.filter((r) => r.city === filters.city);
  if (filters.cuisine) result = result.filter((r) => r.cuisine === filters.cuisine);
  if (filters.priceRange) result = result.filter((r) => r.priceRange === filters.priceRange);
  if (filters.minRating > 0) result = result.filter((r) => r.rating >= filters.minRating);

  switch (filters.sort) {
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'popular':
      result.sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0));
      break;
    case 'reviews':
      result.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case 'price-low':
      result.sort((a, b) => priceOrder[a.priceRange] - priceOrder[b.priceRange]);
      break;
    case 'price-high':
      result.sort((a, b) => priceOrder[b.priceRange] - priceOrder[a.priceRange]);
      break;
  }

  return result;
}

export default function RestaurantsPage() {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    city: '',
    cuisine: '',
    priceRange: '',
    minRating: 0,
    sort: 'rating',
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['restaurants', filters.search],
    queryFn: () => api.restaurants(filters.search || undefined),
  });

  const cities = useMemo(() => [...new Set(mockRestaurants.map((r) => r.city))], []);
  const cuisines = useMemo(() => [...new Set(mockRestaurants.map((r) => r.cuisine))], []);

  const filtered = useMemo(() => applyFilters(data ?? mockRestaurants, filters), [data, filters]);

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <AppNav />
      <PageTransition>
        <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Discovery</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">Find your next table</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Search Malaysian restaurants across Kuala Lumpur, Penang, Johor Bahru, and more — filter by cuisine, city, price, and ratings.
            </p>
            <div className="relative mt-7 max-w-xl">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <Input
                className="pl-11"
                placeholder="Search by restaurant, cuisine, or city"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <RestaurantFilters
              filters={filters}
              onChange={setFilters}
              cities={cities}
              cuisines={cuisines}
            />
            {(filters.city || filters.cuisine || filters.priceRange || filters.minRating > 0) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {filters.city && (
                  <FilterChip label={filters.city} onRemove={() => setFilters({ ...filters, city: '' })} />
                )}
                {filters.cuisine && (
                  <FilterChip label={filters.cuisine} onRemove={() => setFilters({ ...filters, cuisine: '' })} />
                )}
                {filters.priceRange && (
                  <FilterChip label={filters.priceRange} onRemove={() => setFilters({ ...filters, priceRange: '' })} />
                )}
                {filters.minRating > 0 && (
                  <FilterChip label={`${filters.minRating}+ stars`} onRemove={() => setFilters({ ...filters, minRating: 0 })} />
                )}
              </div>
            )}
          </div>

          <p className="mb-6 text-sm text-slate-500">
            {filtered.length} restaurant{filtered.length !== 1 ? 's' : ''} available
          </p>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-[22rem] rounded-3xl" />
              ))}
            </div>
          ) : isError ? (
            <ErrorState
              action={
                <Button onClick={() => window.location.reload()}>Try again</Button>
              }
            />
          ) : filtered.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No restaurants match your filters"
              description="Try adjusting your search or clearing some filters to see more results."
              action={
                <Button asChild variant="secondary">
                  <Link href="/restaurants">Clear filters</Link>
                </Button>
              }
            />
          )}
        </main>
      </PageTransition>
    </div>
  );
}
