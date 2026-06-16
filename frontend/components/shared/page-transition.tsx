'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function PageTransition({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('page-enter', className)}>{children}</div>;
}

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn('animate-fade-in-up', className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
