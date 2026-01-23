import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, TrendingDown, Sparkles } from 'lucide-react';

const data = [
  { month: 'Jul', aws: 12400, azure: 8900, gcp: 4200 },
  { month: 'Aug', aws: 13200, azure: 9200, gcp: 4800 },
  { month: 'Sep', aws: 11800, azure: 9800, gcp: 5200 },
  { month: 'Oct', aws: 14100, azure: 10200, gcp: 5400 },
  { month: 'Nov', aws: 13500, azure: 11000, gcp: 5800 },
  { month: 'Dec', aws: 12900, azure: 10500, gcp: 6100 },
  { month: 'Jan', aws: 14800, azure: 11200, gcp: 6400 },
];

export function FinOpsChart() {
  return (
    <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-[#10B981]" />
          </div>
          <div>
            <h3 className="text-[#F1F5F9] font-semibold">Análise de Gastos Multi-Cloud</h3>
            <p className="text-xs text-[#94A3B8] mt-0.5">AWS • Azure • GCP</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl text-[#F1F5F9]">R$ 32,500</div>
          <div className="text-xs text-[#94A3B8]">Mês Atual</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis 
              dataKey="month" 
              stroke="#94A3B8" 
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#94A3B8" 
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#131827', 
                border: '1px solid #1E293B',
                borderRadius: '8px',
                color: '#F1F5F9'
              }}
              labelStyle={{ color: '#94A3B8' }}
              itemStyle={{ color: '#F1F5F9' }}
              formatter={(value: number) => `R$ ${value.toLocaleString()}`}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }}
            />
            <Line 
              type="monotone" 
              dataKey="aws" 
              stroke="#F59E0B" 
              strokeWidth={2}
              name="AWS"
              dot={{ fill: '#F59E0B', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="azure" 
              stroke="#00D9FF" 
              strokeWidth={2}
              name="Azure"
              dot={{ fill: '#00D9FF', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="gcp" 
              stroke="#10B981" 
              strokeWidth={2}
              name="GCP"
              dot={{ fill: '#10B981', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Insight */}
      <div className="bg-gradient-to-r from-[#A855F7]/10 to-[#00D9FF]/10 border border-[#A855F7]/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#A855F7] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-[#A855F7] font-semibold">OTIMIZAÇÃO IA ENCONTRADA</span>
              <div className="flex items-center gap-1 bg-[#10B981]/20 px-2 py-0.5 rounded-full">
                <TrendingDown className="w-3 h-3 text-[#10B981]" />
                <span className="text-xs text-[#10B981]">Redução de Custo</span>
              </div>
            </div>
            <p className="text-sm text-[#F1F5F9]">
              Migrar para <span className="text-[#00D9FF]">EC2 Spot Instances</span> para cargas não-críticas pode economizar{' '}
              <span className="text-[#10B981] font-semibold">R$ 450/mês</span> (~14% de redução)
            </p>
            <button className="mt-3 text-xs text-[#A855F7] hover:text-[#C084FC] transition-colors">
              Ver Análise Detalhada →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
