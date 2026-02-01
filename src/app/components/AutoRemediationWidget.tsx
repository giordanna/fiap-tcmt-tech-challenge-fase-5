import { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, RefreshCw, History, Zap, Server, AlertOctagon } from 'lucide-react';
import { Modal } from '@/app/components/Modal';
import { useToast } from '@/app/components/Toast';

interface Incident {
  id: string;
  title: string;
  service: string;
  severity: 'critical' | 'high' | 'medium';
  status: 'active' | 'mitigating' | 'resolved';
  detectedAt: string;
  autoRemediationAvailable: boolean;
  suggestedAction: string;
}

export function AutoRemediationWidget() {
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const incidents: Incident[] = [
    {
      id: 'INC-001',
      title: 'Alta latência detectada no Checkout API',
      service: 'checkout-api-prod',
      severity: 'high',
      status: 'active',
      detectedAt: 'há 5 min',
      autoRemediationAvailable: true,
      suggestedAction: 'Restart do pod checkout-api-prod-7d8f9bb'
    },
    {
      id: 'INC-002',
      title: 'Memory pressure no cluster AKS',
      service: 'aks-prod-cluster',
      severity: 'medium',
      status: 'mitigating',
      detectedAt: 'há 15 min',
      autoRemediationAvailable: true,
      suggestedAction: 'Scale horizontal: adicionar 2 nodes ao pool'
    },
    {
      id: 'INC-003',
      title: 'Falha de conexão com database replica',
      service: 'sql-replica-02',
      severity: 'critical',
      status: 'active',
      detectedAt: 'há 2 min',
      autoRemediationAvailable: true,
      suggestedAction: 'Failover para replica saudável sql-replica-03'
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#00D9FF';
      default: return '#94A3B8';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return AlertOctagon;
      case 'mitigating': return RefreshCw;
      case 'resolved': return CheckCircle2;
      default: return AlertTriangle;
    }
  };

  const handleAutoRemediate = (incident: Incident) => {
    setSelectedIncident(incident);
    setShowModal(true);
  };

  const executeRemediation = () => {
    setIsExecuting(true);
    
    setTimeout(() => {
      setIsExecuting(false);
      setShowModal(false);
      showToast(`Auto-remediation executado: ${selectedIncident?.suggestedAction}`, 'success');
    }, 3000);
  };

  return (
    <>
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#EF4444]/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#EF4444]" />
            </div>
            <div>
              <h3 className="text-lg text-[#F1F5F9] font-semibold">Auto-Remediation</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[#94A3B8]">Monitoramento Ativo</span>
          </div>
        </div>

        {/* Active Incidents */}
        <div className="space-y-3">
          {incidents.map(incident => {
            const StatusIcon = getStatusIcon(incident.status);
            return (
              <div 
                key={incident.id}
                className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-lg p-4 hover:border-[#94A3B8]/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${getSeverityColor(incident.severity)}20` }}
                  >
                    <StatusIcon 
                      className={`w-4 h-4 ${incident.status === 'mitigating' ? 'animate-spin' : ''}`}
                      style={{ color: getSeverityColor(incident.severity) }} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-[#F1F5F9] font-medium">{incident.title}</span>
                      <span 
                        className="text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold"
                        style={{ 
                          backgroundColor: `${getSeverityColor(incident.severity)}20`,
                          color: getSeverityColor(incident.severity)
                        }}
                      >
                        {incident.severity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-2">
                      <Server className="w-3 h-3" />
                      <span>{incident.service}</span>
                      <span className="text-[#64748B]">•</span>
                      <span>{incident.detectedAt}</span>
                    </div>
                    
                    {incident.autoRemediationAvailable && incident.status !== 'resolved' && (
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleAutoRemediate(incident)}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 hover:bg-[#10B981]/20 transition-colors"
                        >
                          <Zap className="w-3 h-3" />
                          Executar Auto-Remediation
                        </button>
                        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#0A0E1A] text-[#94A3B8] border border-[#1E293B] hover:border-[#94A3B8] transition-colors">
                          <History className="w-3 h-3" />
                          Ver Histórico
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#1E293B]">
          <div className="text-center">
            <div className="text-xl font-bold text-[#10B981]">127</div>
            <div className="text-[10px] text-[#94A3B8]">Auto-fixes (30d)</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-[#00D9FF]">45s</div>
            <div className="text-[10px] text-[#94A3B8]">MTTR Médio</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-[#A855F7]">94%</div>
            <div className="text-[10px] text-[#94A3B8]">Taxa Sucesso</div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirmar Auto-Remediation">
        {selectedIncident && (
          <div className="space-y-4">
            <div className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-lg p-4">
              <h4 className="text-sm text-[#F1F5F9] font-semibold mb-2">{selectedIncident.title}</h4>
              <div className="text-xs text-[#94A3B8] space-y-1">
                <div>Serviço: <span className="text-[#00D9FF]">{selectedIncident.service}</span></div>
                <div>Detectado: <span className="text-[#F59E0B]">{selectedIncident.detectedAt}</span></div>
              </div>
            </div>

            <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm text-[#10B981] font-semibold">Ação Sugerida pela IA</span>
              </div>
              <p className="text-sm text-[#F1F5F9]">{selectedIncident.suggestedAction}</p>
            </div>

            <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#94A3B8]">
                  Esta ação será executada automaticamente. Um registro será criado no ServiceNow para auditoria.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={executeRemediation}
                disabled={isExecuting}
                className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isExecuting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Executando...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Confirmar Execução
                  </>
                )}
              </button>
              <button
                onClick={() => setShowModal(false)}
                disabled={isExecuting}
                className="px-4 py-2.5 border border-[#1E293B] hover:border-[#94A3B8] text-[#94A3B8] rounded-lg transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
