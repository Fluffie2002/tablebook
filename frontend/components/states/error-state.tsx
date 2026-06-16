import { AlertCircle } from 'lucide-react';
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

export function ErrorState({
  title = 'Something went wrong',
  description = 'We could not load this section. Please try again in a moment.',
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <Card className="flex flex-col items-center justify-center border-rose-100 bg-rose-50/50 px-6 py-16 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-rose-100 text-rose-600">
        <AlertCircle className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-slate-950">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </Card>
  );
}
