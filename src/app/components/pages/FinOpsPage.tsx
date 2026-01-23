import { FinOpsChart } from '@/app/components/FinOpsChart';
import { DollarSign, TrendingDown, AlertTriangle, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const anomalyData = [
  { date: '30.03', dev: 45, terrablade: 120 },
  { date: '02.05', dev: 78, terrablade: 95 },
  { date: '05.07', dev: 125, terrablade: 110 },
  { date: '08.09', dev: 92, terrablade: 140 },
  { date: '11.11', dev: 88, terrablade: 105 },
  { date: '14.13', dev: 110, terrablade: 130 },
  { date: '17.15', dev: 95, terrablade: 115 },
  { date: '20.17', dev: 102, terrablade: 125 },
];

export function FinOpsPage() {
  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-[#F1F5F9] font-semibold">FinOps & Observability</h1>
            <p className="text-sm text-[#94A3B8] mt-1">Cost optimization and monitoring</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Monthly Spend', value: 'R$ 32.5k', change: '-8%', color: '#10B981' },
          { label: 'Optimizations Found', value: '7', change: 'new', color: '#00D9FF' },
          { label: 'Potential Savings', value: 'R$ 2.1k', change: '+12%', color: '#A855F7' },
          { label: 'Cost Anomalies', value: '2', change: 'active', color: '#F59E0B' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#131827] border border-[#1E293B] rounded-xl p-4">
            <div className="text-sm text-[#94A3B8] mb-2">{stat.label}</div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-[#F1F5F9]">{stat.value}</div>
              <div className="text-sm" style={{ color: stat.color }}>{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <FinOpsChart />

      {/* Cost Anomaly Detection */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg text-[#F1F5F9] font-semibold mb-1">Cost Anomaly Detection</h3>
            <p className="text-sm text-[#94A3B8]">AI-powered spending pattern analysis</p>
          </div>
          <div className="flex items-center gap-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-3 py-1.5 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-sm text-[#F59E0B] font-semibold">2 Anomalies</span>
          </div>
        </div>

        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={anomalyData}>
              <defs>
                <linearGradient id="colorDev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00D9FF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTerrablade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="date" stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#131827', 
                  border: '1px solid #1E293B',
                  borderRadius: '8px',
                  color: '#F1F5F9'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="dev" 
                stroke="#00D9FF" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorDev)" 
                name="Dev Environment"
              />
              <Area 
                type="monotone" 
                dataKey="terrablade" 
                stroke="#10B981" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorTerrablade)"
                name="Terrablade Idle Resources"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Recommendations */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#A855F7] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#A855F7] font-semibold mb-1">AI RECOMMENDATION</div>
                <p className="text-sm text-[#F1F5F9] mb-2">
                  Terrablade environment has <span className="text-[#F59E0B]">idle resources</span> consuming R$ 890/month
                </p>
                <button className="text-xs text-[#A855F7] hover:text-[#C084FC] transition-colors">
                  View Details →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#10B981] font-semibold mb-1">COST SAVING</div>
                <p className="text-sm text-[#F1F5F9] mb-2">
                  Schedule non-production environments to save <span className="text-[#10B981] font-semibold">R$ 1.2k/month</span>
                </p>
                <button className="text-xs text-[#10B981] hover:text-[#34D399] transition-colors">
                  Apply Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
