import { useState, useEffect } from 'react';
import { Rocket, X, ArrowRight, Zap, Target, DollarSign, Database, Workflow, Shield, Play, Trophy } from 'lucide-react';

interface OnboardingTourProps {
  onNavigate: (page: string) => void;
}

export function OnboardingTour({ onNavigate }: OnboardingTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('onboardingCompleted');
    if (!hasOnboarded) {
      setTimeout(() => setShowWelcome(true), 1000);
    }
  }, []);

  useEffect(() => {
    const handleRestart = () => {
      setStep(0);
      setIsOpen(true);
      setShowWelcome(false);
      onNavigate('home'); // Reset to home for tour
    };
    window.addEventListener('restart-onboarding', handleRestart);
    return () => window.removeEventListener('restart-onboarding', handleRestart);
  }, [onNavigate]);

  const steps = [
    // --- HOME ---
    {
      target: '#sidebar-nav',
      page: 'home',
      title: 'Navegação Unificada',
      description: 'Acesse aqui todas as dimensões do Value Stream Management: Estratégia, Planejamento, Ingestão, FinOps e mais.',
      icon: Zap,
      position: 'right'
    },
    {
      target: '#executive-summary',
      page: 'home',
      title: 'Jornada 12: Relatórios Executivos',
      description: 'Single Pane of Glass com KPIs críticos. Clique em "Exportar Relatório" para simular o envio de PDF para stakeholders.',
      icon: Target,
      position: 'bottom'
    },
    {
      target: '#btn-copilot-action',
      page: 'home',
      title: 'Jornada 1: Copiloto Ágil',
      description: 'A IA monitora gargalos. Clique em "Enviar Notificação" para ver o agente desbloqueando um card parado.',
      icon: Zap,
      position: 'top'
    },
    {
      target: '#btn-new-card',
      page: 'home',
      title: 'Jornada 3 & 11: Backlog Inteligente',
      description: 'Crie um card e veja a IA sugerir automaticamente a prioridade baseada em valor e esforço.',
      icon: Play,
      position: 'top'
    },
    {
      target: '#btn-deploy-prod',
      page: 'home',
      title: 'Jornada 2 & 10: Deploy Seguro',
      description: 'Inicie um deploy para Produção com validação de segurança automática via IA e Golden Path.',
      icon: Rocket,
      position: 'top'
    },
    
    // --- STRATEGY ---
    {
      target: '#btn-new-project',
      page: 'strategy',
      title: 'Jornada 4: Gestão de Portfolio',
      description: 'Defina novos projetos e veja a Matriz de Pugh calcular prioridades automaticamente.',
      icon: Target,
      position: 'bottom-left'
    },

    // --- PLANNING ---
    {
      target: '#btn-new-request',
      page: 'planning',
      title: 'Jornada 17: Solicitação de Dependências',
      description: 'Gerencie tickets de Infra/DBA/Sec com SLA claro e impacto visível no projeto.',
      icon: Workflow,
      position: 'bottom-left'
    },

    // --- GOVERNANCE ---
    {
      target: '#btn-new-gmud',
      page: 'governance',
      title: 'Jornada 6: Agendamento GMUD',
      description: 'Valide janelas de mudança automaticamente contra períodos de freezing e conflitos.',
      icon: Shield,
      position: 'bottom-left'
    },

    // --- INGESTION ---
    {
      target: '#btn-add-integration',
      page: 'ingestion',
      title: 'Jornada 8: Hub de Integração',
      description: 'Conecte novas ferramentas (Jira, Datadog, Sonar) em segundos com configuração assistida.',
      icon: Database,
      position: 'bottom-left'
    },

    // --- GOLDEN PATHS ---
    {
      target: '#btn-new-path',
      page: 'golden-paths',
      title: 'Jornada 9: Catálogo de Serviços',
      description: 'Crie novos templates de infraestrutura self-service padronizados para os times de desenvolvimento.',
      icon: Rocket,
      position: 'bottom-left'
    },

    // --- FINOPS ---
    {
      target: '#btn-apply-savings',
      page: 'finops',
      title: 'Jornada 7: Economia Automática',
      description: 'Aplique recomendações de redução de custo (ex: shutdown de ambientes dev) com um clique.',
      icon: DollarSign,
      position: 'top'
    },
    {
      target: '#btn-view-anomaly',
      page: 'finops',
      title: 'Jornada 14: Análise de Anomalias',
      description: 'Investigue picos de custo detectados pela IA e tome ações corretivas imediatas.',
      icon: DollarSign,
      position: 'top'
    },

    // --- GAMIFICATION ---
    {
      target: 'card-achievement-0', // ID dynamic logic handled separately or just assume first element
      page: 'gamification',
      title: 'Jornada 19: Engajamento',
      description: 'Desenvolvedores ganham badges e XP por boas práticas (Code Review, Deploy sem erro).',
      icon: Trophy,
      position: 'top'
    }
  ];

  const handleStart = () => {
    setShowWelcome(false);
    setIsOpen(true);
    setStep(0);
    onNavigate('home');
  };

  const handleSkip = () => {
    setShowWelcome(false);
    setIsOpen(false);
    localStorage.setItem('onboardingCompleted', 'true');
  };

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      const nextStep = steps[step + 1];
      if (nextStep.page !== currentStep.page) {
        onNavigate(nextStep.page);
        // Small delay to allow render
        setTimeout(() => setStep(step + 1), 100);
      } else {
        setStep(step + 1);
      }
    } else {
      handleSkip();
    }
  };

  if (showWelcome) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-8 max-w-2xl w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00D9FF] to-[#A855F7]" />
          
          <div className="w-20 h-20 bg-gradient-to-br from-[#00D9FF] to-[#A855F7] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-[#00D9FF]/20">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-[#F1F5F9] mb-3">Bem-vindo ao ValueFlow</h2>
          <p className="text-[#94A3B8] mb-6 text-lg">
            Sua plataforma centralizada para gestão de fluxo de valor.
          </p>

          <div className="grid grid-cols-2 gap-4 text-left mb-8">
            <div className="bg-[#0A0E1A] p-4 rounded-xl border border-[#1E293B]">
              <h3 className="text-[#00D9FF] font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Automação Inteligente
              </h3>
              <p className="text-sm text-[#94A3B8]">IA para priorização de backlog, riscos de deploy e análise de custos.</p>
            </div>
            <div className="bg-[#0A0E1A] p-4 rounded-xl border border-[#1E293B]">
              <h3 className="text-[#A855F7] font-semibold mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" /> Visão Estratégica
              </h3>
              <p className="text-sm text-[#94A3B8]">Conecte OKRs ao código, gerenciando dependências e capacidade.</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={handleStart}
              className="w-full bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-[#00D9FF]/30 hover:scale-[1.02]"
            >
              <Play className="w-5 h-5 fill-current" />
              Iniciar Tour pelas Jornadas (13 passos)
            </button>
            <button
              onClick={handleSkip}
              className="text-[#94A3B8] hover:text-[#F1F5F9] py-2 transition-colors text-sm"
            >
              Pular introdução
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isOpen) return null;

  // Simple positioning logic based on quadrant roughly
  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'right': return 'top-20 left-72';
      case 'top': return 'top-32 right-10 max-w-sm'; // Default for buttons usually on right
      case 'bottom-left': return 'bottom-20 right-20 max-w-sm';
      case 'center': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      default: return 'bottom-10 left-1/2 -translate-x-1/2';
    }
  };

  // Override specific positions based on known layout
  const getSmartPosition = (stepIndex: number) => {
    // Strategy/Planning/Gov/Ingestion/GP buttons are top right
    if ([5, 6, 7, 8, 9].includes(stepIndex)) return 'top-32 right-10 max-w-sm';
    // FinOps buttons
    if ([10].includes(stepIndex)) return 'bottom-32 right-1/4 max-w-sm'; // Savings
    if ([11].includes(stepIndex)) return 'bottom-32 left-1/4 max-w-sm'; // Anomaly
    
    return getPositionClasses(currentStep.position || 'center');
  };

  return (
    <>
      {/* Spotlight Overlay - Semi-transparent everywhere except target? 
          Implementing a true spotlight is hard without lib. We'll use a strong modal.
      */}
      <div className="fixed inset-0 z-[90] bg-black/40 pointer-events-none" /> 
      
      <div className={`fixed z-[100] ${getSmartPosition(step)} transition-all duration-500`}>
        <div className="bg-[#131827] border border-[#00D9FF] rounded-2xl p-6 shadow-2xl relative animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="absolute -top-3 -left-3 w-12 h-12 bg-[#00D9FF] rounded-xl flex items-center justify-center text-[#0A0E1A] font-bold shadow-lg ring-4 ring-[#0A0E1A]">
            {step + 1}
          </div>
          
          <button 
            onClick={handleSkip}
            className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#F1F5F9]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mt-2 mb-3 flex items-center gap-3">
            <currentStep.icon className="w-6 h-6 text-[#00D9FF]" />
            <h3 className="text-lg font-bold text-[#F1F5F9]">{currentStep.title}</h3>
          </div>
          
          <p className="text-[#94A3B8] mb-6 leading-relaxed text-sm">
            {currentStep.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-xs text-[#94A3B8] font-mono">
              Passo {step + 1} de {steps.length}
            </div>
            
            <button
              onClick={handleNext}
              className="bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] px-5 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors text-sm"
            >
              {step === steps.length - 1 ? 'Concluir' : 'Próximo'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
