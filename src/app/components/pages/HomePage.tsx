import { AICopilotWidget } from '@/app/components/AICopilotWidget';
import { FinOpsChart } from '@/app/components/FinOpsChart';
import { DeliveryPipeline } from '@/app/components/DeliveryPipeline';
import { GamificationWidgets } from '@/app/components/GamificationWidgets';
import { MetricsGauges } from '@/app/components/MetricsGauges';
import { PrioritizedBacklog } from '@/app/components/PrioritizedBacklog';
import { SentimentWidget } from '@/app/components/SentimentWidget';
import { ExecutiveSummary } from '@/app/components/ExecutiveSummary';

export function HomePage() {
  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Executive Summary - Single Pane of Glass */}
      <div id="executive-summary">
        <ExecutiveSummary />
      </div>

      {/* DORA Metrics Row */}
      <MetricsGauges />

      {/* Prioritized Backlog */}
      <PrioritizedBacklog />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - AI Copilot & Gamification */}
        <div className="space-y-6">
          <AICopilotWidget />
          <GamificationWidgets />
          <SentimentWidget />
        </div>

        {/* Middle & Right Columns - FinOps & Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          <FinOpsChart />
          <DeliveryPipeline />
        </div>
      </div>
    </div>
  );
}