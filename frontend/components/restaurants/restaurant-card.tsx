import { SafeImage } from '@/components/shared/safe-image';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Restaurant } from '@/types/tablebook';

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link href={`/restaurants/${restaurant.slug}`} className="group block focus-ring rounded-xl">
      <Card className="overflow-hidden transition hover:border-[#c7d2e0] hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden">
          <SafeImage
            src={restaurant.heroImageUrl}
            alt={restaurant.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {restaurant.trending && (
            <Badge variant="accent" className="absolute left-3 top-3">High demand</Badge>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-[#0a2540] group-hover:text-[#0ea5e9] transition-colors">
                {restaurant.name}
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-sm text-[#697386]">
                <MapPin className="h-3.5 w-3.5" />
                {restaurant.city} · {restaurant.cuisine}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-[#0a2540]">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {restaurant.rating}
            </div>
          </div>
          <p className="mt-3 line-clamp-2 text-sm leading-5 text-[#697386]">{restaurant.description}</p>
          <p className="mt-3 border-t border-[#e6ebf1] pt-3 text-xs text-[#8898aa]">
            {restaurant.openingTime} – {restaurant.closingTime} · {restaurant.reviewCount} reviews
          </p>
        </div>
      </Card>
    </Link>
  );
}
