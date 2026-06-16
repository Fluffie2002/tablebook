import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <Card className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br from-sky-100 to-indigo-100">
        {icon ?? (
          <svg className="h-10 w-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">{description}</p>
      {action ? <div className="mt-8">{action}</div> : null}
    </Card>
  );
}
