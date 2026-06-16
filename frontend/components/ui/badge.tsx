import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const variants = {
  default: 'border-[#e6ebf1] bg-[#f6f9fc] text-[#425466]',
  success: 'border-[#cbf4e0] bg-[#e8f8ef] text-[#09825d]',
  warning: 'border-[#fce8b6] bg-[#fff8e6] text-[#9a6700]',
  danger: 'border-[#fad1d8] bg-[#fef0f3] text-[#df1b41]',
  accent: 'border-[#c7eafe] bg-[#edf8ff] text-[#0369a1]',
};

export function Badge({
  className,
  variant = 'default',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof variants }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
