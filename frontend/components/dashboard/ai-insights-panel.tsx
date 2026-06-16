'use client';

import { useState } from 'react';
import {
  BarChart3,
  Brain,
  Clock,
  Lightbulb,
  Loader2,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { aiInsights } from '@/lib/mock-data';
import { AiInsight } from '@/types/tablebook';
import { cn } from '@/lib/utils';

const categoryIcons = {
  'peak-times': Clock,
  behavior: Users,
  performance: BarChart3,
  prediction: TrendingUp,
  recommendation: Lightbulb,
};

export function AiInsightsPanel({ compact = false }: { compact?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<AiInsight[]>([]);
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => {
      setInsights(aiInsights);
      setLoading(false);
      setGenerated(true);
    }, 1800);
  };

  if (compact) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-[#0ea5e9]" />
            <CardTitle>Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#697386]">Analyze booking patterns and surface recommendations.</p>
          <Button className="mt-4 w-full" variant="secondary" onClick={generate} disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Running analysis...</> : 'Generate report'}
          </Button>
          {generated && insights.slice(0, 2).map((insight) => (
            <div key={insight.id} className="mt-3 rounded-lg border border-[#e6ebf1] p-3 text-sm">
              <p className="font-medium text-[#0a2540]">{insight.title}</p>
              <p className="mt-1 text-xs text-[#697386]">{insight.summary}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#0a2540]">Insights</h1>
          <p className="mt-1 text-sm text-[#697386]">Demand forecasting and operational recommendations.</p>
        </div>
        <Button onClick={generate} disabled={loading}>
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : <><Zap className="mr-2 h-4 w-4" /> Generate report</>}
        </Button>
      </div>

      {!generated && !loading && (
        <Card className="border-dashed p-12 text-center">
          <Target className="mx-auto h-10 w-10 text-[#c7d2e0]" />
          <p className="mt-4 font-medium text-[#0a2540]">No report generated yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#697386]">
            Run analysis to review peak periods, guest behavior, and venue performance across your portfolio.
          </p>
        </Card>
      )}

      {loading && (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-5">
              <div className="skeleton-shimmer h-4 w-1/3 rounded" />
              <div className="skeleton-shimmer mt-3 h-5 w-2/3 rounded" />
              <div className="skeleton-shimmer mt-3 h-14 w-full rounded" />
            </Card>
          ))}
        </div>
      )}

      {generated && (
        <div className="grid gap-4 md:grid-cols-2">
          {insights.map((insight) => {
            const Icon = categoryIcons[insight.category];
            return (
              <Card key={insight.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="rounded-md border border-[#e6ebf1] bg-[#f6f9fc] p-2">
                      <Icon className="h-4 w-4 text-[#425466]" />
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className={cn('rounded-md px-2 py-0.5 font-medium', insight.impact === 'high' ? 'bg-[#fef0f3] text-[#df1b41]' : 'bg-[#f6f9fc] text-[#697386]')}>
                        {insight.impact}
                      </span>
                      <span className="rounded-md bg-[#edf8ff] px-2 py-0.5 font-medium text-[#0369a1]">{insight.confidence}%</span>
                    </div>
                  </div>
                  <h3 className="mt-4 font-semibold text-[#0a2540]">{insight.title}</h3>
                  <p className="mt-2 text-sm text-[#0ea5e9]">{insight.summary}</p>
                  <p className="mt-3 text-sm leading-6 text-[#697386]">{insight.detail}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
