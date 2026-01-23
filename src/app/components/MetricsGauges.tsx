import { Activity, GitBranch, Clock, TrendingUp } from 'lucide-react';

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  icon: React.ElementType;
  color: string;
  unit?: string;
}

function Gauge({ value, max, label, icon: Icon, color, unit = '' }: GaugeProps) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-5 flex flex-col items-center">
      {/* Gauge Circle */}
      <div className="relative w-32 h-32 mb-4">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="#1E293B"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000"
            style={{
              filter: `drop-shadow(0 0 6px ${color}40)`
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="w-6 h-6 mb-1" style={{ color }} />
          <div className="text-2xl text-[#F1F5F9] font-bold">{value}{unit}</div>
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <div className="text-sm text-[#F1F5F9] font-semibold">{label}</div>
        <div className="text-xs text-[#94A3B8] mt-1">Meta: {max}{unit}</div>
      </div>
    </div>
  );
}

export function MetricsGauges() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Gauge
        value={8.5}
        max={10}
        label="Pontuação NPS"
        icon={TrendingUp}
        color="#10B981"
      />
      <Gauge
        value={92}
        max={100}
        label="Sucesso de Deploy"
        icon={Activity}
        color="#00D9FF"
        unit="%"
      />
      <Gauge
        value={18}
        max={24}
        label="Frequência de Deploy"
        icon={GitBranch}
        color="#A855F7"
        unit="/dia"
      />
      <Gauge
        value={0.8}
        max={1}
        label="MTTR (horas)"
        icon={Clock}
        color="#F59E0B"
        unit="h"
      />
    </div>
  );
}
