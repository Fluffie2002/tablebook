import { Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Review } from '@/types/tablebook';

export function RestaurantReviews({ reviews, rating, reviewCount }: { reviews: Review[]; rating: number; reviewCount: number }) {
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    pct: stars === 5 ? 72 : stars === 4 ? 20 : stars === 3 ? 6 : 1,
  }));

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">Guest reviews</h2>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        <div className="text-center lg:text-left">
          <p className="text-5xl font-bold text-slate-950">{rating}</p>
          <div className="mt-2 flex justify-center gap-0.5 lg:justify-start">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-slate-500">{reviewCount} verified reviews</p>
          <div className="mt-6 space-y-2">
            {distribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-slate-500">{d.stars}</span>
                <div className="h-2 flex-1 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-amber-400" style={{ width: `${d.pct}%` }} />
                </div>
                <span className="w-8 text-slate-400">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition hover:bg-white hover:shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                    {review.author[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">{review.author}</p>
                    <p className="text-xs text-slate-400">{new Date(review.date).toLocaleDateString('en-MY', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
