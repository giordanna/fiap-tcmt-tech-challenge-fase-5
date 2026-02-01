import { useState } from 'react';
import { Brain, AlertTriangle, Send, CheckCircle2, DollarSign, Zap, Target, TrendingUp, ShieldCheck } from 'lucide-react';
import { useToast } from '@/app/components/Toast';

interface AICopilotWidgetProps {
  currentPage?: string;
}

// Contextual messages/alerts per page
const contextualContent: Record<string, {
  alertType: 'warning' | 'info' | 'success';
  alertTitle: string;
  alertDescription: string;
  suggestionTitle: string;
  suggestionDescription: string;
  actionLabel: string;
  actionToast: string;
  icon: React.ElementType;
}> = {
  strategy: {
    alertType: 'info',
    alertTitle: 'Oportunidade de Priorização',
    alertDescription: 'O projeto "Motor Preditivo" tem ROI projetado alto mas está com recursos subalocados.',
    suggestionTitle: 'SUGESTÃO DE PRIORIZAÇÃO',
    suggestionDescription: 'Considere realocar 2 desenvolvedores do projeto "Portal Auto" para o "Motor Preditivo". Isso pode acelerar o retorno do investimento em 34%.',
    actionLabel: 'Aplicar Sugestão',
    actionToast: 'Sugestão de priorização aplicada! Os recursos foram realocados.',
    icon: Target,
  },
  finops: {
    alertType: 'warning',
    alertTitle: 'Economia Potencial Detectada',
    alertDescription: 'Identificamos R$ 12.5k/mês em recursos subutilizados no ambiente de staging.',
    suggestionTitle: 'SUGESTÃO FINOPS',
    suggestionDescription: 'Ativar auto-scaling no cluster de staging pode reduzir custos em 40%. Instâncias sob demanda podem economizar mais 25%.',
    actionLabel: 'Ver Detalhes',
    actionToast: 'Relatório de economia gerado! Verifique o dashboard FinOps.',
    icon: DollarSign,
  },
  'golden-paths': {
    alertType: 'info',
    alertTitle: 'Template Recomendado',
    alertDescription: 'Com base no seu último deploy, o template "Microsserviço Java" seria 23% mais eficiente.',
    suggestionTitle: 'SUGESTÃO DE TEMPLATE',
    suggestionDescription: 'O Golden Path "Microsserviço Java" inclui configurações otimizadas de cache que podem melhorar a performance em 35%.',
    actionLabel: 'Ver Template',
    actionToast: 'Abrindo detalhes do template recomendado...',
    icon: Zap,
  },
  governance: {
    alertType: 'warning',
    alertTitle: 'Janela de Deploy Próxima',
    alertDescription: 'A próxima janela de GMUD é em 4 horas. 2 deploys estão aguardando aprovação.',
    suggestionTitle: 'LEMBRETE DE GMUD',
    suggestionDescription: 'Revise e aprove a solicitação GMUD-2026-002 antes das 18h para não perder a janela de mudança desta semana.',
    actionLabel: 'Revisar GMUDs',
    actionToast: 'Abrindo lista de GMUDs pendentes...',
    icon: ShieldCheck,
  },
  gamification: {
    alertType: 'success',
    alertTitle: 'Conquista Disponível!',
    alertDescription: 'Você está a 2 PRs de desbloquear a medalha "PR Ninja" e ganhar 500 XP.',
    suggestionTitle: 'OPORTUNIDADE DE XP',
    suggestionDescription: 'Complete mais 2 revisões de código hoje para subir no ranking semanal. Sua equipe está em 2º lugar!',
    actionLabel: 'Ver Ranking',
    actionToast: 'Abrindo leaderboard atualizado...',
    icon: TrendingUp,
  },
  home: {
    alertType: 'warning',
    alertTitle: 'Possível Bloqueio Identificado',
    alertDescription: 'Tarefa AB#402 está parada há 48h sem atualizações',
    suggestionTitle: 'SUGESTÃO INTELIGENTE',
    suggestionDescription: 'Notificar Líder Técnico @rafael.costa sobre possível bloqueio. Problemas similares levaram em média 3.2 dias para resolver.',
    actionLabel: 'Enviar Notificação',
    actionToast: 'Notificação enviada para @rafael.costa sobre a tarefa AB#402',
    icon: AlertTriangle,
  },
};

export function AICopilotWidget({ currentPage = 'home' }: AICopilotWidgetProps) {
  const { showToast } = useToast();
  const [actionTaken, setActionTaken] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const content = contextualContent[currentPage] || contextualContent.home;
  const IconComponent = content.icon;

  const handleAction = () => {
    setActionTaken(true);
    showToast(content.actionToast, 'success');
  };

  const handleDismiss = () => {
    setDismissed(true);
    showToast('Alerta ignorado. Você pode revisar alertas anteriores nas configurações do sistema.', 'info');
  };

  const getAlertColors = () => {
    switch (content.alertType) {
      case 'warning':
        return { border: '#F59E0B', bg: '#F59E0B' };
      case 'success':
        return { border: '#10B981', bg: '#10B981' };
      default:
        return { border: '#00D9FF', bg: '#00D9FF' };
    }
  };

  const alertColors = getAlertColors();

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
            <h3 className="text-[#F1F5F9] font-semibold">Assistente Ágil</h3>
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
            <h3 className="text-[#F1F5F9] font-semibold">Assistente Ágil</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
              <span className="text-xs text-[#94A3B8]">Monitoramento Ativo</span>
            </div>
          </div>
        </div>

        {/* Alert Card */}
        <div 
          className="bg-[#0A0E1A]/40 backdrop-blur-sm rounded-xl p-4 mb-4"
          style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: `${alertColors.border}50` }}
        >
          <div className="flex gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${alertColors.bg}15` }}
            >
              <IconComponent className="w-4 h-4" style={{ color: alertColors.bg }} />
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#F1F5F9] mb-1">
                <span style={{ color: alertColors.bg }}>{content.alertTitle}</span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {content.alertDescription}
              </p>
            </div>
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="bg-[#A855F7]/10 backdrop-blur-sm border border-[#A855F7]/30 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7] mt-1.5"></div>
            <div>
              <span className="text-xs text-[#A855F7] font-semibold">{content.suggestionTitle}</span>
            </div>
          </div>
          <p className="text-sm text-[#F1F5F9] pl-3.5">
            {content.suggestionDescription}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {actionTaken ? (
            <div className="flex-1 bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] py-2.5 px-4 rounded-lg flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">Ação Realizada</span>
            </div>
          ) : (
            <button 
              id="btn-copilot-action"
              onClick={handleAction}
              className="flex-1 bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-sm">{content.actionLabel}</span>
              <Send className="w-4 h-4" />
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
