import { Slot } from '@radix-ui/react-slot';
import { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
};

export function Button({ asChild, className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' && 'h-9 px-3.5',
        size === 'md' && 'h-10 px-4',
        size === 'lg' && 'h-11 px-5 text-[15px]',
        variant === 'primary' && 'bg-[#0a2540] text-white hover:bg-[#1a3a5c] shadow-sm',
        variant === 'secondary' && 'bg-white text-[#0a2540] border border-[#e6ebf1] hover:bg-[#f6f9fc] shadow-sm',
        variant === 'outline' && 'border border-[#c7d2e0] bg-transparent text-[#0a2540] hover:bg-white',
        variant === 'ghost' && 'text-[#425466] hover:bg-[#f0f4f8] hover:text-[#0a2540]',
        variant === 'danger' && 'bg-[#df1b41] text-white hover:bg-[#c4183a]',
        className,
      )}
      {...props}
    />
  );
}
