'use client';

import { AiInsightsPanel } from '@/components/dashboard/ai-insights-panel';
import { PageTransition } from '@/components/shared/page-transition';

export default function AiInsightsPage() {
  return (
    <PageTransition>
      <AiInsightsPanel />
    </PageTransition>
  );
}
