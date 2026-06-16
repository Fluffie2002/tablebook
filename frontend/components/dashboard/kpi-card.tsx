import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import { cn } from '@/lib/utils';

export function KpiCard({
  title,
  value,
  numericValue,
  prefix = '',
  suffix = '',
  decimals = 0,
  change,
  trend = 'up',
  icon: Icon,
}: {
  title: string;
  value?: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  index?: number;
}) {
  return (
    <div className="rounded-xl border border-[#e6ebf1] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-[#697386]">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#0a2540]">
            {numericValue !== undefined ? (
              <AnimatedCounter value={numericValue} prefix={prefix} suffix={suffix} decimals={decimals} />
            ) : (
              value
            )}
          </p>
          <p
            className={cn(
              'mt-2 flex items-center gap-1 text-sm',
              trend === 'up' && 'text-[#09825d]',
              trend === 'down' && 'text-[#df1b41]',
              trend === 'neutral' && 'text-[#697386]',
            )}
          >
            {trend === 'up' && <TrendingUp className="h-3.5 w-3.5" />}
            {trend === 'down' && <TrendingDown className="h-3.5 w-3.5" />}
            {change}
          </p>
        </div>
        <div className="rounded-lg border border-[#e6ebf1] bg-[#f6f9fc] p-2.5 text-[#425466]">
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
