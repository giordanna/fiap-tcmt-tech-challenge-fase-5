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

  // Highlight target element
  useEffect(() => {
    if (!isOpen || showWelcome) return;
    
    const currentStepData = steps[step];
    if (!currentStepData) return;
    
    const targetElement = document.querySelector(currentStepData.target) as HTMLElement;
    
    if (targetElement) {
      // Store original styles
      const originalZIndex = targetElement.style.zIndex;
      const originalPosition = targetElement.style.position;
      const originalBoxShadow = targetElement.style.boxShadow;
      const originalBorderRadius = targetElement.style.borderRadius;
      
      // Apply highlight styles
      targetElement.style.position = 'relative';
      targetElement.style.zIndex = '95';
      targetElement.style.boxShadow = '0 0 0 3px #00D9FF, 0 0 15px rgba(0, 217, 255, 0.6)';
      targetElement.style.borderRadius = '8px';
      
      // Scroll into view
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Cleanup function
      return () => {
        targetElement.style.zIndex = originalZIndex;
        targetElement.style.position = originalPosition;
        targetElement.style.boxShadow = originalBoxShadow;
        targetElement.style.borderRadius = originalBorderRadius;
      };
    }
  }, [isOpen, step, showWelcome]);

  const steps = [
    // --- HOME ---
    {
      target: '#sidebar-nav',
      page: 'home',
      title: 'Menu Principal',
      description: 'Este é o seu ponto de partida! Navegue pelas seções para gerenciar projetos, custos de nuvem, integrações de dados e muito mais.',
      icon: Zap,
      position: 'right'
    },
    {
      target: '#executive-summary',
      page: 'home',
      title: 'Resumo Executivo',
      description: 'Visualize os principais números da sua operação. Ideal para apresentar resultados em reuniões de liderança.',
      icon: Target,
      position: 'bottom'
    },
    {
      target: '#btn-copilot-action',
      page: 'home',
      title: 'Copiloto de IA',
      description: 'Seu assistente inteligente identifica problemas e sugere ações. Aqui você pode notificar responsáveis sobre tarefas com atraso.',
      icon: Zap,
      position: 'top'
    },
    {
      target: '#btn-new-card',
      page: 'home',
      title: 'Criar Nova Tarefa',
      description: 'Adicione tarefas à lista. A IA sugere a prioridade com base no impacto para o negócio.',
      icon: Play,
      position: 'bottom-right'
    },
    
    // --- STRATEGY ---
    {
      target: '#btn-new-project',
      page: 'strategy',
      title: 'Novo Projeto',
      description: 'Cadastre iniciativas aqui. O sistema calcula automaticamente qual projeto deve ser priorizado.',
      icon: Target,
      position: 'bottom-left'
    },

    // --- PLANNING ---
    {
      target: '#btn-new-request',
      page: 'planning',
      title: 'Nova Solicitação',
      description: 'Precisa de apoio de Infra, DBA ou Segurança? Abra uma solicitação com prazo e urgência definidos.',
      icon: Workflow,
      position: 'bottom-left'
    },

    // --- GOVERNANCE ---
    {
      target: '#btn-new-gmud',
      page: 'governance',
      title: 'Agendar Mudança',
      description: 'Registre alterações em sistemas. O calendário mostra conflitos e períodos de bloqueio automaticamente.',
      icon: Shield,
      position: 'bottom-left'
    },

    // --- INGESTION ---
    {
      target: '#btn-add-integration',
      page: 'ingestion',
      title: 'Adicionar Integração',
      description: 'Conecte suas ferramentas (Azure DevOps, Jira, etc.) para centralizar dados na plataforma.',
      icon: Database,
      position: 'bottom-left'
    },

    // --- GOLDEN PATHS ---
    {
      target: '#btn-new-path',
      page: 'golden-paths',
      title: 'Novo Template Padrão',
      description: 'Solicite templates prontos de infraestrutura para as equipes usarem sem complicação.',
      icon: Rocket,
      position: 'bottom-left'
    },

    // --- FINOPS ---
    {
      target: '#btn-apply-savings',
      page: 'finops',
      title: 'Aplicar Economia',
      description: 'Aceite sugestões de redução de custos com um clique — como desligar recursos ociosos ou subutilizados.',
      icon: DollarSign,
      position: 'top'
    },
    {
      target: '#btn-view-anomaly',
      page: 'finops',
      title: 'Ver Anomalia',
      description: 'Investigue picos inesperados de gastos e entenda o que aconteceu.',
      icon: DollarSign,
      position: 'top'
    },

    // --- GAMIFICATION ---
    {
      target: 'card-achievement-0',
      page: 'gamification',
      title: 'Conquistas',
      description: 'As equipes ganham pontos e medalhas por boas práticas — como deploys sem falhas e colaboração.',
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
        <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6 md:p-8 w-[90%] md:max-w-2xl md:w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00D9FF] to-[#A855F7]" />
          
          <div className="w-20 h-20 bg-gradient-to-br from-[#00D9FF] to-[#A855F7] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-[#00D9FF]/20">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-[#F1F5F9] mb-3">Bem-vindo ao ValueFlow!</h2>
          <p className="text-[#94A3B8] mb-6 text-lg">
            Aqui você gerencia tudo sobre a operação de TI em um só lugar — de projetos a custos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
            <div className="bg-[#0A0E1A] p-4 rounded-xl border border-[#1E293B]">
              <h3 className="text-[#00D9FF] font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" /> IA no Dia a Dia
              </h3>
              <p className="text-sm text-[#94A3B8]">Sugestões automáticas de prioridade, alertas de risco e economia de custos.</p>
            </div>
            <div className="bg-[#0A0E1A] p-4 rounded-xl border border-[#1E293B]">
              <h3 className="text-[#A855F7] font-semibold mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" /> Tudo Conectado
              </h3>
              <p className="text-sm text-[#94A3B8]">Veja como cada tarefa impacta os objetivos do negócio e a capacidade da equipe.</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={handleStart}
              className="w-full bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-[#00D9FF]/30 hover:scale-[1.02]"
            >
              <Play className="w-5 h-5 fill-current" />
              Iniciar Tour
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

  // Posicionamento inteligente para não tampar elementos destacados
  const getPositionClasses = (position: string) => {
    const base = "md:w-96";
    switch (position) {
      case 'right': 
        // Sidebar - tooltip à direita
        return `${base} md:bottom-auto md:right-auto md:top-20 md:left-72`;
      case 'top': 
        // Elementos no topo - tooltip abaixo à direita
        return `${base} md:bottom-auto md:left-auto md:top-40 md:right-10`;
      case 'bottom': 
        // Elementos no meio/baixo - tooltip no canto inferior
        return `${base} md:right-auto md:top-auto md:bottom-10 md:left-1/2 md:-translate-x-1/2`;
      case 'bottom-left': 
        // Botões de ação do header - tooltip bem afastado
        return `${base} md:left-auto md:top-auto md:bottom-24 md:right-10`;
      case 'bottom-right': 
        // Cards do backlog - tooltip à esquerda
        return `${base} md:right-auto md:top-auto md:bottom-24 md:left-72`;
      case 'center': 
        return `${base} md:bottom-auto md:right-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2`;
      default: 
        return `${base} md:right-auto md:top-auto md:bottom-10 md:left-1/2 md:-translate-x-1/2`;
    }
  };

  // Override específico por step para garantir que não tape elementos
  const getSmartPosition = (stepIndex: number) => {
    // Mobile: sempre na parte inferior da tela
    const mobileClasses = "bottom-4 left-4 right-4 w-auto fixed z-[100] transition-all duration-500";
    
    let desktopClasses = "";
    
    // Mapeamento específico por step para não sobrepor elementos
    switch (stepIndex) {
      case 0: // Sidebar
        desktopClasses = getPositionClasses('right');
        break;
      case 1: // Executive Summary - tooltip à direita para não tampar cards
        desktopClasses = "md:w-96 md:top-auto md:left-auto md:bottom-20 md:right-10";
        break;
      case 2: // Copiloto IA - tooltip longe do card
        desktopClasses = "md:w-96 md:top-auto md:right-auto md:bottom-20 md:left-72";
        break;
      case 3: // Nova Tarefa - tooltip posicionado para não tampar backlog
        desktopClasses = "md:w-96 md:top-auto md:right-auto md:bottom-20 md:left-72";
        break;
      case 4: // Novo Projeto (Strategy) - header buttons
      case 5: // Nova Solicitação (Planning)
      case 6: // Agendar Mudança (Governance)
      case 7: // Adicionar Integração (Ingestion)
      case 8: // Novo Caminho (Golden Paths)
        desktopClasses = "md:w-96 md:top-auto md:left-auto md:bottom-24 md:right-10";
        break;
      case 9: // FinOps - Aplicar Economia
        desktopClasses = "md:w-96 md:top-auto md:left-auto md:bottom-32 md:right-1/4";
        break;
      case 10: // FinOps - Ver Anomalia
        desktopClasses = "md:w-96 md:top-auto md:right-auto md:bottom-32 md:left-1/4";
        break;
      case 11: // Gamificação
        desktopClasses = "md:w-96 md:top-auto md:left-auto md:bottom-20 md:right-10";
        break;
      default:
        desktopClasses = getPositionClasses(currentStep?.position || 'center');
    }
    
    return `${mobileClasses} ${desktopClasses}`;
  };

  return (
    <>
      {/* Spotlight Overlay - Semi-transparent everywhere except target? 
          Implementing a true spotlight is hard without lib. We'll use a strong modal.
      */}
      <div className="fixed inset-0 z-[90] bg-black/40 pointer-events-none" /> 
      
      <div className={`fixed z-[100] ${getSmartPosition(step)} transition-all duration-500`}>
        <div className="bg-[#131827] border border-[#00D9FF] rounded-2xl p-5 shadow-2xl relative animate-in fade-in slide-in-from-bottom-4 duration-300 md:max-w-sm w-full mx-auto">
          
          <button 
            onClick={handleSkip}
            className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#F1F5F9]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mt-2 mb-3 flex items-center gap-3">
            <currentStep.icon className="w-6 h-6 text-[#00D9FF] flex-shrink-0" />
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
