import { type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-10 w-full rounded-lg border border-[#e6ebf1] bg-white px-3 text-sm text-[#0a2540] shadow-sm outline-none transition placeholder:text-[#8898aa] focus:border-[#0ea5e9] focus:ring-2 focus:ring-sky-500/15',
        className,
      )}
      {...props}
    />
  );
}
