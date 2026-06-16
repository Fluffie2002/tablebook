'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { RESTAURANT_PLACEHOLDER } from '@/lib/restaurant-images';
import { cn } from '@/lib/utils';

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  src: string;
  alt: string;
};

export function SafeImage({ src, alt, className, ...props }: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      className={cn(className)}
      onError={() => {
        if (currentSrc !== RESTAURANT_PLACEHOLDER) {
          setCurrentSrc(RESTAURANT_PLACEHOLDER);
        }
      }}
    />
  );
}
