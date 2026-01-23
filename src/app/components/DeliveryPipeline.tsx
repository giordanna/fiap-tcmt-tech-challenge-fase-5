import { CheckCircle2, Circle, Rocket, Shield, Sparkles } from 'lucide-react';

export function DeliveryPipeline() {
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
      <button className="w-full bg-gradient-to-r from-[#00D9FF] to-[#00B8D4] hover:from-[#00C4E6] hover:to-[#00A3BF] text-[#0A0E1A] py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-[#00D9FF]/20">
        <Rocket className="w-5 h-5" />
        <span>Deploy para Produção</span>
      </button>
    </div>
  );
}
