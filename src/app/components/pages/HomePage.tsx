import { Users } from 'lucide-react';
import { MetricsGauges } from '@/app/components/MetricsGauges';
import { ExecutiveSummary } from '@/app/components/ExecutiveSummary';

export function HomePage() {
  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* User Welcome Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#A855F7] p-[2px]">
            <div className="w-full h-full rounded-full bg-[#131827] flex items-center justify-center overflow-hidden">
               <img src="https://ui-avatars.com/api/?name=Camila+Santos&background=0A0E1A&color=fff" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#F1F5F9]">Olá, Camila Santos 👋</h1>
            <div className="flex items-center gap-3 text-sm text-[#94A3B8] mt-1">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                SRE & Operations Team
              </span>
              <span className="w-1 h-1 bg-[#334155] rounded-full"></span>
              <span>Chefe de Operações</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
            <div className="px-4 py-2 rounded-lg bg-[#0A0E1A] border border-[#1E293B] flex flex-col items-center min-w-[100px]">
                <span className="text-xs text-[#94A3B8]">Minha Sprint</span>
                <span className="text-lg font-bold text-[#00D9FF]">92%</span>
            </div>
             <div className="px-4 py-2 rounded-lg bg-[#0A0E1A] border border-[#1E293B] flex flex-col items-center min-w-[100px]">
                <span className="text-xs text-[#94A3B8]">Tarefas</span>
                <span className="text-lg font-bold text-[#F1F5F9]">12/15</span>
            </div>
        </div>
      </div>

      {/* Executive Summary - Single Pane of Glass */}
      <div id="executive-summary">
        <ExecutiveSummary />
      </div>

      {/* DORA Metrics Row */}
      <MetricsGauges />
    </div>
  );
}