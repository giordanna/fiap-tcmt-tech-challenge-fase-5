import { useState } from 'react';
import { Brain, AlertTriangle, Activity, CheckCircle2, RotateCcw, Zap, TrendingUp, Clock } from 'lucide-react';
import { useToast } from '@/app/components/Toast';

export function AIOpsMonitoringWidget() {
  const { showToast } = useToast();
  const [anomalyResolved, setAnomalyResolved] = useState(false);

  const handleApproveRollback = () => {
    setAnomalyResolved(true);
    showToast('Rollback aprovado! Versão anterior restaurada com sucesso.', 'success');
  };

  const predictiveAlerts = [
    {
      id: 1,
      severity: 'critical',
      service: 'Serviço de Pagamentos',
      metric: 'Latência',
      predicted: '+400ms',
      timeToImpact: '2h',
      confidence: 94,
      suggestedAction: 'Rollback para versão v2.3.1',
    },
    {
      id: 2,
      severity: 'warning',
      service: 'API Gateway',
      metric: 'Uso de CPU',
      predicted: '85%',
      timeToImpact: '4h',
      confidence: 78,
      suggestedAction: 'Auto-scaling horizontal',
    },
    {
      id: 3,
      severity: 'info',
      service: 'Auth Service',
      metric: 'Taxa de erros',
      predicted: '+2.5%',
      timeToImpact: '6h',
      confidence: 65,
      suggestedAction: 'Monitorar',
    },
  ];

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { color: '#EF4444', bg: '#EF4444', label: 'Crítico' };
      case 'warning':
        return { color: '#F59E0B', bg: '#F59E0B', label: 'Atenção' };
      default:
        return { color: '#00D9FF', bg: '#00D9FF', label: 'Info' };
    }
  };

  return (
    <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#A855F7] to-[#00D9FF] flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg text-[#F1F5F9] font-semibold">Monitoramento Preditivo </h2>
            <p className="text-xs text-[#94A3B8]">Análise em tempo real</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
          <span className="text-xs text-[#94A3B8]">Modelo ativo</span>
        </div>
      </div>

      {/* Main Critical Alert */}
      {!anomalyResolved ? (
        <div className="bg-gradient-to-r from-[#EF4444]/10 to-[#F59E0B]/10 border border-[#EF4444]/50 rounded-xl p-5 mb-4 animate-pulse-slow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EF4444]/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-[#EF4444]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded bg-[#EF4444] text-white font-bold">ANOMALIA PREVISTA</span>
                <span className="text-xs text-[#94A3B8]">Confiança: 94%</span>
              </div>
              <h3 className="text-[#F1F5F9] font-semibold mb-1">
                Anomalia de latência prevista no serviço de Pagamentos (+400ms)
              </h3>
              <p className="text-sm text-[#94A3B8] mb-3">
                Foi detectado que, com a tendência atual, o serviço degradará em <span className="text-[#F59E0B] font-semibold">2 horas</span> devido 
                a um vazamento de memória introduzido na última publicação (Deploy #1234).
              </p>
              
              {/* Root Cause */}
              <div className="bg-[#0A0E1A]/50 rounded-lg p-3 mb-4">
                <div className="text-xs text-[#94A3B8] mb-1">Causa Raiz Identificada:</div>
                <div className="text-sm text-[#F1F5F9]">
                  <span className="text-[#00D9FF] font-mono">Deploy #1234</span> do <span className="text-[#A855F7]">Serviço de Pagamento</span> 
                  {' '}(há 45 min) introduziu vazamento de memória no módulo de cache.
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleApproveRollback}
                  className="px-4 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg transition-colors flex items-center gap-2 font-semibold"
                >
                  <RotateCcw className="w-4 h-4" />
                  Aprovar Rollback
                </button>
                <button
                  onClick={() => showToast('Runbook de remediação iniciado automaticamente', 'success')}
                  className="px-4 py-2 bg-[#A855F7]/20 text-[#A855F7] hover:bg-[#A855F7]/30 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Auto-Remediação
                </button>
                <button
                  onClick={() => showToast('Incidente escalado para a equipe de plantão', 'info')}
                  className="px-4 py-2 border border-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg transition-colors"
                >
                  Escalar Incidente
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#10B981]/10 border border-[#10B981]/50 rounded-xl p-5 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
            </div>
            <div>
              <h3 className="text-[#10B981] font-semibold mb-1">Anomalia Resolvida</h3>
              <p className="text-sm text-[#94A3B8]">
                Rollback para versão v2.3.1 concluído com sucesso. Serviço de Pagamentos estável.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Other Predictions */}
      <div className="space-y-3">
        <h4 className="text-sm text-[#94A3B8] font-semibold">Outras Previsões</h4>
        {predictiveAlerts.slice(1).map((alert) => {
          const config = getSeverityConfig(alert.severity);
          return (
            <div
              key={alert.id}
              className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-lg p-3 hover:border-[#94A3B8]/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-2 h-full rounded-full flex-shrink-0"
                  style={{ backgroundColor: config.bg }}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-[#F1F5F9] font-medium">{alert.service}</span>
                    <span 
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: `${config.bg}20`, color: config.color }}
                    >
                      {config.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {alert.metric}: <span style={{ color: config.color }}>{alert.predicted}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Em {alert.timeToImpact}
                    </span>
                    <span>Confiança: {alert.confidence}%</span>
                  </div>
                </div>
                <button
                  onClick={() => showToast(`Ação sugerida: ${alert.suggestedAction}`, 'info')}
                  className="text-xs text-[#00D9FF] hover:underline whitespace-nowrap"
                >
                  Ver Ação
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
