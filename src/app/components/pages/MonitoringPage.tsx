import { Activity, Shield, AlertTriangle, CheckCircle2, Clock, Zap, RefreshCw } from 'lucide-react';
import { AIOpsMonitoringWidget } from '@/app/components/AIOpsMonitoringWidget';
import { AutoRemediationWidget } from '@/app/components/AutoRemediationWidget';
import { ComplianceWidget } from '@/app/components/ComplianceWidget';

export function MonitoringPage() {
  const activeIncidents = [
    {
      id: 'INC-2026-047',
      title: 'Latência elevada no serviço de Checkout',
      severity: 'high',
      status: 'investigating',
      service: 'checkout-service',
      startTime: '14:32',
      duration: '28 min',
    },
    {
      id: 'INC-2026-046',
      title: 'Falha intermitente na conexão com Redis',
      severity: 'medium',
      status: 'mitigated',
      service: 'cache-cluster',
      startTime: '12:15',
      duration: '2h 45min',
    },
  ];

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { color: '#EF4444', bg: '#EF4444', label: 'Crítico' };
      case 'high':
        return { color: '#F59E0B', bg: '#F59E0B', label: 'Alto' };
      case 'medium':
        return { color: '#00D9FF', bg: '#00D9FF', label: 'Médio' };
      default:
        return { color: '#94A3B8', bg: '#94A3B8', label: 'Baixo' };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'investigating':
        return { color: '#F59E0B', icon: AlertTriangle, label: 'Investigando' };
      case 'mitigated':
        return { color: '#00D9FF', icon: Clock, label: 'Mitigado' };
      case 'resolved':
        return { color: '#10B981', icon: CheckCircle2, label: 'Resolvido' };
      default:
        return { color: '#94A3B8', icon: AlertTriangle, label: 'Desconhecido' };
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#0EA5E9] flex items-center justify-center flex-shrink-0">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-[#F1F5F9] font-semibold">Monitoramento</h1>
            <p className="text-sm text-[#94A3B8] mt-1">Observabilidade, incidentes e saúde dos serviços</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Serviços Monitorados', value: '47', color: '#00D9FF', icon: Activity },
          { label: 'Incidentes Ativos', value: '2', color: '#F59E0B', icon: AlertTriangle },
          { label: 'MTTR Médio', value: '0.8h', color: '#10B981', icon: Clock },
          { label: 'Uptime (30d)', value: '99.94%', color: '#A855F7', icon: Shield },
        ].map((stat, i) => (
          <div key={i} className="bg-[#131827] border border-[#1E293B] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <stat.icon className="w-4 h-4 flex-none" style={{ color: stat.color }} />
              <div className="text-sm text-[#94A3B8]">{stat.label}</div>
            </div>
            <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* AIOps Predictive Monitoring */}
      <AIOpsMonitoringWidget />

      {/* Active Incidents */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <h2 className="text-lg text-[#F1F5F9] font-semibold">Incidentes Ativos</h2>
              <p className="text-xs text-[#94A3B8]">Sincronizado com Dynatrace • Atualizado há 30 seg</p>
            </div>
          </div>
          <button className="p-2 hover:bg-[#1E293B] rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {activeIncidents.map((incident) => {
            const severityConfig = getSeverityConfig(incident.severity);
            const statusConfig = getStatusConfig(incident.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={incident.id}
                className={`bg-[#0A0E1A]/50 border rounded-xl p-4 hover:border-[#94A3B8]/30 transition-all ${
                  incident.severity === 'high' || incident.severity === 'critical' 
                    ? 'border-[#F59E0B]/30' 
                    : 'border-[#1E293B]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1E293B] text-[#94A3B8]">
                        {incident.id}
                      </span>
                      <span 
                        className="text-xs px-2 py-0.5 rounded font-semibold"
                        style={{ backgroundColor: `${severityConfig.bg}20`, color: severityConfig.color }}
                      >
                        {severityConfig.label}
                      </span>
                    </div>
                    <h4 className="text-sm text-[#F1F5F9] font-medium mb-1">{incident.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#94A3B8]">
                      <span>Serviço: <span className="text-[#00D9FF]">{incident.service}</span></span>
                      <span>Início: {incident.startTime}</span>
                      <span>Duração: {incident.duration}</span>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${statusConfig.color}20` }}
                  >
                    <StatusIcon className="w-4 h-4" style={{ color: statusConfig.color }} />
                    <span className="text-sm font-semibold" style={{ color: statusConfig.color }}>
                      {statusConfig.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {activeIncidents.length === 0 && (
          <div className="text-center py-12 text-[#94A3B8]">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-[#10B981]" />
            <p>Nenhum incidente ativo no momento</p>
          </div>
        )}
      </div>

      

      {/* Auto-Remediation */}
      <AutoRemediationWidget />

      {/* Compliance */}
      {/* <ComplianceWidget /> */}
    </div>
  );
}
