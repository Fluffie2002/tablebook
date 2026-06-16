'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  Car,
  Clock,
  Mail,
  MapPin,
  Phone,
  Shirt,
  Star,
  Utensils,
} from 'lucide-react';
import { ReservationForm } from '@/components/reservations/reservation-form';
import { RestaurantGallery } from '@/components/restaurants/restaurant-gallery';
import { RestaurantReviews } from '@/components/restaurants/restaurant-reviews';
import { AppNav } from '@/components/shared/app-nav';
import { PageTransition } from '@/components/shared/page-transition';
import { ErrorState } from '@/components/states/error-state';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api/client';
import { enrichRestaurant } from '@/lib/mock-data';
import { currency } from '@/lib/utils';

export default function RestaurantDetailPage() {
  const params = useParams<{ slug: string }>();
  const { data: raw, isLoading, isError } = useQuery({
    queryKey: ['restaurant', params.slug],
    queryFn: () => api.restaurant(params.slug),
  });

  const restaurant = raw ? enrichRestaurant(raw) : undefined;

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav />
      <PageTransition>
        <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="aspect-[21/9] rounded-3xl" />
              <Skeleton className="h-64 rounded-3xl" />
            </div>
          ) : isError || !restaurant ? (
            <ErrorState title="Restaurant not found" description="This venue may no longer be available." />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
              <div className="space-y-8">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <Badge>{restaurant.cuisine}</Badge>
                    {restaurant.featured && <Badge className="bg-amber-100 text-amber-800">Featured</Badge>}
                    {restaurant.trending && <Badge className="bg-orange-100 text-orange-800">Trending</Badge>}
                    <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {restaurant.rating} ({restaurant.reviewCount} reviews)
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{restaurant.name}</h1>
                  <p className="mt-2 flex items-center gap-2 text-slate-500">
                    <MapPin className="h-4 w-4" />
                    {restaurant.address}
                  </p>
                </div>

                <RestaurantGallery
                  images={restaurant.gallery ?? [restaurant.heroImageUrl]}
                  name={restaurant.name}
                />

                <Card className="p-8">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-950">About</h2>
                  <p className="mt-4 text-lg leading-8 text-slate-600">{restaurant.description}</p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {[
                      ['Average spend', currency(restaurant.averageSpend)],
                      ['Price range', restaurant.priceRange],
                      ['Tables available', String(restaurant.tables?.length ?? 0)],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                        <p className="text-sm text-slate-500">{label}</p>
                        <p className="mt-2 text-xl font-bold text-slate-950">{value}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {restaurant.amenities && (
                  <Card className="p-8">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950">
                      <Utensils className="h-5 w-5 text-sky-500" />
                      Amenities & details
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-wrap gap-2">
                        {restaurant.amenities.map((a) => (
                          <Badge key={a} className="bg-sky-50 text-sky-800">{a}</Badge>
                        ))}
                      </div>
                      <div className="space-y-3 text-sm text-slate-600">
                        {restaurant.dressCode && (
                          <p className="flex items-center gap-2"><Shirt className="h-4 w-4 text-slate-400" /> Dress code: {restaurant.dressCode}</p>
                        )}
                        {restaurant.parking && (
                          <p className="flex items-center gap-2"><Car className="h-4 w-4 text-slate-400" /> {restaurant.parking}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                )}

                <Card className="p-8">
                  <h2 className="text-xl font-bold text-slate-950">Location & contact</h2>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div className="space-y-4 text-sm">
                      <p className="flex items-start gap-2 text-slate-600">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                        {restaurant.address}, {restaurant.city}
                      </p>
                      <p className="flex items-center gap-2 text-slate-600">
                        <Clock className="h-4 w-4 text-slate-400" />
                        {restaurant.openingTime} – {restaurant.closingTime}
                      </p>
                      {restaurant.phone && (
                        <p className="flex items-center gap-2 text-slate-600">
                          <Phone className="h-4 w-4 text-slate-400" />
                          {restaurant.phone}
                        </p>
                      )}
                      {restaurant.email && (
                        <p className="flex items-center gap-2 text-slate-600">
                          <Mail className="h-4 w-4 text-slate-400" />
                          {restaurant.email}
                        </p>
                      )}
                    </div>
                    <div className="relative h-44 overflow-hidden rounded-lg border border-[#e6ebf1] bg-[#f6f9fc]">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <MapPin className="h-6 w-6 text-[#c7d2e0]" />
                        <p className="mt-2 text-sm font-medium text-[#0a2540]">{restaurant.address}</p>
                        <p className="text-xs text-[#697386]">{restaurant.city}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {restaurant.reviews && restaurant.reviews.length > 0 && (
                  <RestaurantReviews
                    reviews={restaurant.reviews}
                    rating={restaurant.rating}
                    reviewCount={restaurant.reviewCount}
                  />
                )}
              </div>

              <ReservationForm restaurant={restaurant} />
            </div>
          )}
        </main>
      </PageTransition>
    </div>
  );
}
