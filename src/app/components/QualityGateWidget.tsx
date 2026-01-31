import { useState } from 'react';
import { Shield, CheckCircle2, XCircle, AlertTriangle, Clock, TrendingUp, Activity } from 'lucide-react';

interface QualityMetric {
  name: string;
  value: number;
  threshold: number;
  unit: string;
  status: 'pass' | 'fail' | 'warning';
}

export function QualityGateWidget() {
  const [lastRun] = useState('há 3 min');

  const metrics: QualityMetric[] = [
    { name: 'Tempo de Resposta P95', value: 245, threshold: 300, unit: 'ms', status: 'pass' },
    { name: 'Taxa de Erro', value: 0.8, threshold: 1, unit: '%', status: 'pass' },
    { name: 'Cobertura de Testes', value: 78, threshold: 80, unit: '%', status: 'warning' },
    { name: 'Complexidade Ciclomática', value: 12, threshold: 15, unit: '', status: 'pass' },
    { name: 'Vulnerabilidades Críticas', value: 0, threshold: 0, unit: '', status: 'pass' },
    { name: 'Code Smells', value: 8, threshold: 10, unit: '', status: 'pass' },
  ];

  const allPassing = metrics.every(m => m.status === 'pass');
  const hasWarnings = metrics.some(m => m.status === 'warning');
  const hasFails = metrics.some(m => m.status === 'fail');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return CheckCircle2;
      case 'fail': return XCircle;
      case 'warning': return AlertTriangle;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return '#10B981';
      case 'fail': return '#EF4444';
      case 'warning': return '#F59E0B';
      default: return '#94A3B8';
    }
  };

  const getOverallStatus = () => {
    if (hasFails) return { label: 'Bloqueado', color: '#EF4444', icon: XCircle };
    if (hasWarnings) return { label: 'Alerta', color: '#F59E0B', icon: AlertTriangle };
    return { label: 'Aprovado', color: '#10B981', icon: CheckCircle2 };
  };

  const overall = getOverallStatus();

  return (
    <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${overall.color}20` }}
          >
            <Shield className="w-5 h-5" style={{ color: overall.color }} />
          </div>
          <div>
            <h3 className="text-lg text-[#F1F5F9] font-semibold">Quality Gate</h3>
            <p className="text-xs text-[#94A3B8]">Dynatrace Site Reliability Guardian (SRG)</p>
          </div>
        </div>
        
        <div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ 
            backgroundColor: `${overall.color}15`,
            border: `1px solid ${overall.color}40`
          }}
        >
          <overall.icon className="w-4 h-4" style={{ color: overall.color }} />
          <span className="text-sm font-semibold" style={{ color: overall.color }}>
            {overall.label}
          </span>
        </div>
      </div>

      {/* Last Run Info */}
      <div className="flex items-center gap-4 mb-4 text-xs text-[#94A3B8]">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Última validação: {lastRun}</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-[#10B981]" />
          <span>Pipeline: <span className="text-[#00D9FF]">deploy-prod-v2.5.1</span></span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, i) => {
          const StatusIcon = getStatusIcon(metric.status);
          const color = getStatusColor(metric.status);
          
          return (
            <div 
              key={i}
              className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-lg p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#94A3B8]">{metric.name}</span>
                <StatusIcon className="w-4 h-4" style={{ color }} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-[#F1F5F9]">{metric.value}</span>
                <span className="text-xs text-[#64748B]">{metric.unit}</span>
                <span className="text-xs text-[#64748B] ml-auto">
                  limite: {metric.threshold}{metric.unit}
                </span>
              </div>
              {/* Progress bar */}
              <div className="mt-2 h-1 bg-[#1E293B] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${Math.min((metric.value / metric.threshold) * 100, 100)}%`,
                    backgroundColor: color
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Action based on status */}
      {hasFails && (
        <div className="mt-4 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-[#EF4444]" />
            <span className="text-sm text-[#EF4444] font-semibold">Deploy Bloqueado</span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Uma ou mais métricas estão abaixo do limite aceitável. Corrija antes de prosseguir.
          </p>
        </div>
      )}

      {hasWarnings && !hasFails && (
        <div className="mt-4 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-sm text-[#F59E0B] font-semibold">Requer Atenção</span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Algumas métricas estão próximas do limite. Deploy liberado com aprovação manual.
          </p>
        </div>
      )}

      {allPassing && (
        <div className="mt-4 bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm text-[#10B981] font-semibold">Deploy Liberado</span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Todas as métricas passaram nos SLOs definidos. Deploy automático habilitado.
          </p>
        </div>
      )}
    </div>
  );
}
