import { Shield, AlertTriangle, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

interface ComplianceItem {
  id: string;
  resource: string;
  policy: string;
  status: 'compliant' | 'non_compliant' | 'warning';
  severity: 'critical' | 'high' | 'medium' | 'low';
  lastChecked: string;
}

export function ComplianceWidget() {
  const complianceItems: ComplianceItem[] = [
    {
      id: 'c1',
      resource: 'aks-prod-cluster',
      policy: 'Kubernetes clusters should use Azure Policy',
      status: 'compliant',
      severity: 'high',
      lastChecked: 'há 5 min'
    },
    {
      id: 'c2',
      resource: 'storage-account-logs',
      policy: 'Storage accounts should use private endpoints',
      status: 'non_compliant',
      severity: 'critical',
      lastChecked: 'há 10 min'
    },
    {
      id: 'c3',
      resource: 'sql-db-customers',
      policy: 'SQL databases should have TDE enabled',
      status: 'compliant',
      severity: 'critical',
      lastChecked: 'há 3 min'
    },
    {
      id: 'c4',
      resource: 'vm-legacy-backend',
      policy: 'Virtual machines should have backup configured',
      status: 'warning',
      severity: 'medium',
      lastChecked: 'há 15 min'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return CheckCircle2;
      case 'non_compliant': return XCircle;
      case 'warning': return AlertTriangle;
      default: return Shield;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return '#10B981';
      case 'non_compliant': return '#EF4444';
      case 'warning': return '#F59E0B';
      default: return '#94A3B8';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#00D9FF';
      case 'low': return '#94A3B8';
      default: return '#94A3B8';
    }
  };

  const compliantCount = complianceItems.filter(i => i.status === 'compliant').length;
  const nonCompliantCount = complianceItems.filter(i => i.status === 'non_compliant').length;
  const score = Math.round((compliantCount / complianceItems.length) * 100);

  return (
    <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#A855F7]/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#A855F7]" />
          </div>
          <div>
            <h3 className="text-lg text-[#F1F5F9] font-semibold">Compliance & Políticas</h3>
            <p className="text-xs text-[#94A3B8]">Azure Policy - Status em tempo real</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold" style={{ color: score >= 75 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444' }}>
            {score}%
          </div>
          <div className="text-xs text-[#94A3B8]">Score Geral</div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-[#10B981]">{compliantCount}</div>
          <div className="text-xs text-[#94A3B8]">Conformes</div>
        </div>
        <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-[#EF4444]">{nonCompliantCount}</div>
          <div className="text-xs text-[#94A3B8]">Violações</div>
        </div>
        <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-[#F59E0B]">
            {complianceItems.filter(i => i.status === 'warning').length}
          </div>
          <div className="text-xs text-[#94A3B8]">Alertas</div>
        </div>
      </div>

      {/* Compliance Items */}
      <div className="space-y-3">
        {complianceItems.map(item => {
          const StatusIcon = getStatusIcon(item.status);
          return (
            <div 
              key={item.id}
              className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-lg p-4 hover:border-[#94A3B8]/30 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <StatusIcon 
                  className="w-5 h-5 flex-shrink-0 mt-0.5" 
                  style={{ color: getStatusColor(item.status) }} 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-[#F1F5F9] font-medium truncate">{item.resource}</span>
                    <span 
                      className="text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold"
                      style={{ 
                        backgroundColor: `${getSeverityColor(item.severity)}20`,
                        color: getSeverityColor(item.severity)
                      }}
                    >
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] line-clamp-1">{item.policy}</p>
                  <div className="text-[10px] text-[#64748B] mt-1">Verificado: {item.lastChecked}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <button className="w-full mt-4 py-2 text-sm text-[#A855F7] hover:text-[#C084FC] transition-colors">
        Ver Todas as Políticas →
      </button>
    </div>
  );
}
