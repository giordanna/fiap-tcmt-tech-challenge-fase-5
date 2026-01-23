import { BarChart3, TrendingUp, DollarSign, Users, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const roiData = [
  { month: 'Jul', savings: 45000, investment: 20000 },
  { month: 'Aug', savings: 52000, investment: 18000 },
  { month: 'Sep', savings: 48000, investment: 22000 },
  { month: 'Oct', savings: 63000, investment: 19000 },
  { month: 'Nov', savings: 58000, investment: 21000 },
  { month: 'Dec', savings: 71000, investment: 20000 },
  { month: 'Jan', savings: 68000, investment: 23000 },
];

const productivityData = [
  { month: 'Jul', deployments: 420, incidents: 23 },
  { month: 'Aug', deployments: 485, incidents: 18 },
  { month: 'Sep', deployments: 510, incidents: 15 },
  { month: 'Oct', deployments: 565, incidents: 12 },
  { month: 'Nov', deployments: 620, incidents: 10 },
  { month: 'Dec', deployments: 680, incidents: 8 },
  { month: 'Jan', deployments: 720, incidents: 6 },
];

export function ExecutiveROIPage() {
  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-[#F1F5F9] font-semibold">Executive ROI Dashboard</h1>
            <p className="text-sm text-[#94A3B8] mt-1">Business value and cost optimization metrics</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total ROI', value: 'R$ 385k', change: '+24%', icon: DollarSign, color: '#10B981' },
          { label: 'Cost Savings', value: 'R$ 68k/mo', change: '+12%', icon: TrendingUp, color: '#00D9FF' },
          { label: 'Team Velocity', value: '+47%', change: '+8%', icon: Users, color: '#A855F7' },
          { label: 'Time to Market', value: '-38%', change: 'faster', icon: Clock, color: '#F59E0B' },
        ].map((kpi, i) => (
          <div key={i} className="bg-[#131827] border border-[#1E293B] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-[#94A3B8]">{kpi.label}</div>
              <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
            </div>
            <div className="text-3xl font-bold text-[#F1F5F9] mb-1">{kpi.value}</div>
            <div className="text-sm" style={{ color: kpi.color }}>{kpi.change}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* ROI Chart */}
        <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
          <h3 className="text-lg text-[#F1F5F9] font-semibold mb-4">ROI Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="month" stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#131827', 
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    color: '#F1F5F9'
                  }}
                  formatter={(value: number) => `R$ ${value.toLocaleString()}`}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="savings" fill="#10B981" name="Savings" radius={[8, 8, 0, 0]} />
                <Bar dataKey="investment" fill="#EF4444" name="Investment" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Productivity Chart */}
        <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
          <h3 className="text-lg text-[#F1F5F9] font-semibold mb-4">Productivity Metrics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="month" stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#131827', 
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    color: '#F1F5F9'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line 
                  type="monotone" 
                  dataKey="deployments" 
                  stroke="#00D9FF" 
                  strokeWidth={3}
                  name="Deployments"
                  dot={{ fill: '#00D9FF', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="incidents" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  name="Incidents"
                  dot={{ fill: '#EF4444', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Value Stream Metrics */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <h3 className="text-lg text-[#F1F5F9] font-semibold mb-6">Value Stream Impact</h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              metric: 'Lead Time Reduction',
              before: '12.5 days',
              after: '4.2 days',
              improvement: '-66%',
              color: '#00D9FF',
            },
            {
              metric: 'Deployment Frequency',
              before: '2x/week',
              after: '18x/day',
              improvement: '+6,300%',
              color: '#10B981',
            },
            {
              metric: 'MTTR Improvement',
              before: '4.8 hours',
              after: '0.8 hours',
              improvement: '-83%',
              color: '#A855F7',
            },
          ].map((metric, i) => (
            <div key={i} className="p-4 bg-[#0A0E1A]/50 border border-[#1E293B] rounded-xl">
              <h4 className="text-sm text-[#94A3B8] mb-3">{metric.metric}</h4>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-xs text-[#94A3B8]">Before</div>
                  <div className="text-lg text-[#F1F5F9]">{metric.before}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#94A3B8]">After</div>
                  <div className="text-lg text-[#F1F5F9]">{metric.after}</div>
                </div>
              </div>
              <div 
                className="mt-3 text-center py-2 px-3 rounded-lg font-semibold"
                style={{ backgroundColor: `${metric.color}20`, color: metric.color }}
              >
                {metric.improvement}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
