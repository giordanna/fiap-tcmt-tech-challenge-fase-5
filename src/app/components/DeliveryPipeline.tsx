import { CheckCircle2, Circle, Rocket, Shield, Sparkles, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '@/app/components/Modal';
import { useToast } from '@/app/components/Toast';

export function DeliveryPipeline() {
  const { showToast } = useToast();
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const handleDeploy = () => {
    setIsDeployModalOpen(false);
    showToast('Processo de deploy iniciado via GitOps agent', 'success');
  };
  const steps = [
    { label: 'Revisão de Código', status: 'completed', icon: CheckCircle2 },
    { label: 'Build & Testes', status: 'completed', icon: CheckCircle2 },
    { label: 'Scan de Segurança', status: 'completed', icon: CheckCircle2 },
    { label: 'Deploy em Staging', status: 'active', icon: Circle },
    { label: 'Produção', status: 'pending', icon: Circle },
  ];

  return (
    <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00D9FF]/10 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-[#00D9FF]" />
          </div>
          <div>
            <h3 className="text-[#F1F5F9] font-semibold">Pipeline de Deploy</h3>
            <p className="text-xs text-[#94A3B8] mt-0.5">Golden Path: API Gateway v2.4.1</p>
          </div>
        </div>
      </div>

      {/* Pipeline Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-1 relative">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10 ${
                step.status === 'completed' 
                  ? 'bg-[#10B981] text-white' 
                  : step.status === 'active'
                  ? 'bg-[#00D9FF] text-white animate-pulse'
                  : 'bg-[#1E293B] text-[#94A3B8]'
              }`}>
                <step.icon className="w-5 h-5" />
              </div>
              
              {/* Line connector */}
              {index < steps.length - 1 && (
                <div className={`absolute top-5 left-[60%] w-full h-0.5 ${
                  step.status === 'completed' ? 'bg-[#10B981]' : 'bg-[#1E293B]'
                }`}></div>
              )}
              
              {/* Label */}
              <span className={`text-xs text-center ${
                step.status === 'active' ? 'text-[#00D9FF]' : 'text-[#94A3B8]'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Risk Score */}
      <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#F1F5F9] font-semibold">Score de Risco do Deploy</span>
                <div className="flex items-center gap-1 bg-[#A855F7]/20 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-[#A855F7]" />
                  <span className="text-xs text-[#A855F7]">Aprovado por IA</span>
                </div>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">Todos os checks passaram • 0 problemas críticos</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl text-[#10B981] font-bold">BAIXO</div>
            <div className="text-xs text-[#94A3B8]">98% confiança</div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        id="btn-deploy-prod"
        onClick={() => setIsDeployModalOpen(true)}
        className="w-full bg-gradient-to-r from-[#00D9FF] to-[#00B8D4] hover:from-[#00C4E6] hover:to-[#00A3BF] text-[#0A0E1A] py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-[#00D9FF]/20"
      >
        <Rocket className="w-5 h-5" />
        <span>Deploy para Produção</span>
      </button>

      <Modal isOpen={isDeployModalOpen} onClose={() => setIsDeployModalOpen(false)} title="Confirmar Deploy em Produção">
        <div className="space-y-4">
          <div className="p-4 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0" />
            <div className="text-sm text-[#F1F5F9]">
              <span className="font-semibold text-[#F59E0B]">Atenção:</span> Você está prestes a realizar um deploy no ambiente de <span className="font-bold">Produção</span>. Esta ação afetará todos os usuários ativos.
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-[#94A3B8] font-semibold">Checks de Segurança (Autenticados por IA)</div>
            {[
              { label: 'Sem vulnerabilidades críticas (Snyk)', status: 'pass' },
              { label: 'Cobertura de testes > 85%', status: 'pass' },
              { label: 'Aprovação do Tech Lead', status: 'pass' },
              { label: 'Janela de GMUD aprovada', status: 'pass' },
            ].map((check, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-[#0A0E1A] border border-[#1E293B] rounded-lg">
                <span className="text-sm text-[#F1F5F9]">{check.label}</span>
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleDeploy}
              className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white py-2 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              Confirmar Deploy
            </button>
            <button
              onClick={() => setIsDeployModalOpen(false)}
              className="px-4 py-2 border border-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
