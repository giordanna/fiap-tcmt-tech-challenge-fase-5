import { useState } from 'react';
import { Brain, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/app/components/Toast';

export function AICopilotWidget() {
  const { showToast } = useToast();
  const [notificationSent, setNotificationSent] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleSendNotification = () => {
    setNotificationSent(true);
    showToast('Notificação enviada para @rafael.costa sobre o card AB#402', 'success');
  };

  const handleDismiss = () => {
    setDismissed(true);
    showToast('Alerta ignorado. Você pode revisar alertas anteriores nas configurações.', 'info');
  };

  if (dismissed) {
    return (
      <div 
        className="rounded-2xl p-6 border border-[#10B981]/20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(0, 217, 255, 0.05) 100%)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-[#F1F5F9] font-semibold">Copiloto Ágil</h3>
            <span className="text-sm text-[#10B981]">Sem alertas pendentes</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="rounded-2xl p-6 border border-[#A855F7]/20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(0, 217, 255, 0.05) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(168, 85, 247, 0.15)',
      }}
    >
      {/* Glassmorphism overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-2xl"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-[#F1F5F9] font-semibold">Copiloto Ágil</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
              <span className="text-xs text-[#94A3B8]">Monitoramento Ativo</span>
            </div>
          </div>
        </div>

        {/* Alert Card */}
        <div className="bg-[#0A0E1A]/40 backdrop-blur-sm border border-[#F59E0B]/30 rounded-xl p-4 mb-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#F1F5F9] mb-1">
                <span className="text-[#F59E0B]">Impedimento Silencioso Detectado</span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Card <span className="text-[#00D9FF] font-mono">AB#402</span> está parado há <span className="text-[#F59E0B]">48h</span> sem atualizações
              </p>
            </div>
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="bg-[#A855F7]/10 backdrop-blur-sm border border-[#A855F7]/30 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7] mt-1.5"></div>
            <div>
              <span className="text-xs text-[#A855F7] font-semibold">SUGESTÃO IA</span>
            </div>
          </div>
          <p className="text-sm text-[#F1F5F9] pl-3.5">
            Notificar Tech Lead <span className="text-[#00D9FF]">@rafael.costa</span> sobre possível bloqueio. Problemas similares levaram em média 3.2 dias para resolver.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {notificationSent ? (
            <div className="flex-1 bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] py-2.5 px-4 rounded-lg flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">Notificação Enviada</span>
            </div>
          ) : (
            <button 
              id="btn-copilot-action"
              onClick={handleSendNotification}
              className="flex-1 bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="text-sm">Enviar Notificação</span>
            </button>
          )}
          <button 
            onClick={handleDismiss}
            className="px-4 py-2.5 border border-[#1E293B] hover:border-[#94A3B8] text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg transition-colors text-sm"
          >
            Ignorar
          </button>
        </div>
      </div>
    </div>
  );
}

