'use client';

import { useState } from 'react';
import { SafeImage } from '@/components/shared/safe-image';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RestaurantGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const prev = () => setActive((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActive((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      <div className="group relative overflow-hidden rounded-3xl">
        <div className="relative aspect-[16/9] sm:aspect-[21/9]">
          <SafeImage
            src={images[active]}
            alt={`${name} photo ${active + 1}`}
            fill
            className="object-cover transition duration-500"
            priority
            sizes="(min-width: 1024px) 66vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 opacity-0 shadow-lg transition group-hover:opacity-100 hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 opacity-0 shadow-lg transition group-hover:opacity-100 hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => setFullscreen(true)}
                className="absolute right-4 top-4 rounded-full bg-white/90 p-2 opacity-0 shadow-lg transition group-hover:opacity-100 hover:bg-white"
                aria-label="Fullscreen"
              >
                <Expand className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActive(i)}
                className={cn(
                  'relative aspect-[4/3] overflow-hidden rounded-xl transition ring-2 ring-offset-2',
                  i === active ? 'ring-sky-500' : 'ring-transparent opacity-70 hover:opacity-100',
                )}
              >
                <SafeImage src={img} alt="" fill className="object-cover" sizes="120px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {fullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4">
          <button
            onClick={() => setFullscreen(false)}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl">
            <SafeImage src={images[active]} alt={name} fill className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
