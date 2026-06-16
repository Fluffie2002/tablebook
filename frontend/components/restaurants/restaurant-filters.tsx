'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PriceRange } from '@/types/tablebook';
import { cn } from '@/lib/utils';

export type RestaurantFilters = {
  search: string;
  city: string;
  cuisine: string;
  priceRange: PriceRange | '';
  minRating: number;
  sort: 'rating' | 'popular' | 'reviews' | 'price-low' | 'price-high';
};

type Props = {
  filters: RestaurantFilters;
  onChange: (filters: RestaurantFilters) => void;
  cities: string[];
  cuisines: string[];
};

export function RestaurantFilters({ filters, onChange, cities, cuisines }: Props) {
  const set = (patch: Partial<RestaurantFilters>) => onChange({ ...filters, ...patch });

  const hasActive =
    filters.city || filters.cuisine || filters.priceRange || filters.minRating > 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </div>
        {hasActive && (
          <Button
            variant="ghost"
            className="h-8 text-xs"
            onClick={() =>
              onChange({ ...filters, city: '', cuisine: '', priceRange: '', minRating: 0 })
            }
          >
            <X className="mr-1 h-3 w-3" /> Clear all
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">City</label>
          <select
            value={filters.city}
            onChange={(e) => set({ city: e.target.value })}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
          >
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Cuisine</label>
          <select
            value={filters.cuisine}
            onChange={(e) => set({ cuisine: e.target.value })}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
          >
            <option value="">All cuisines</option>
            {cuisines.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Price range</label>
          <select
            value={filters.priceRange}
            onChange={(e) => set({ priceRange: e.target.value as PriceRange | '' })}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
          >
            <option value="">Any price</option>
            <option value="BUDGET">Budget · under RM40</option>
            <option value="MODERATE">Moderate · RM40–80</option>
            <option value="PREMIUM">Premium · RM80–120</option>
            <option value="LUXURY">Luxury · RM120+</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Min. rating</label>
          <select
            value={filters.minRating}
            onChange={(e) => set({ minRating: Number(e.target.value) })}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
          >
            <option value={0}>Any rating</option>
            <option value={4}>4.0+</option>
            <option value={4.5}>4.5+</option>
            <option value={4.7}>4.7+</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Sort by</label>
          <select
            value={filters.sort}
            onChange={(e) => set({ sort: e.target.value as RestaurantFilters['sort'] })}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100"
          >
            <option value="rating">Highest rated</option>
            <option value="popular">Most popular</option>
            <option value="reviews">Most reviewed</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      onClick={onRemove}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-800 transition hover:bg-sky-100',
      )}
    >
      {label}
      <X className="h-3 w-3" />
    </button>
  );
}
