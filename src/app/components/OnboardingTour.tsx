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
      title: 'Navegação Unificada',
      description: 'Acesse aqui todas as áreas da plataforma: Estratégia, Planejamento, Integrações, Custos e mais. Cada seção ajuda a gerenciar uma parte do trabalho da sua equipe.',
      icon: Zap,
      position: 'right'
    },
    {
      target: '#executive-summary',
      page: 'home',
      title: 'Relatórios para a Diretoria',
      description: 'Painel unificado com os principais indicadores de desempenho. Clique em "Exportar Relatório" para gerar um PDF pronto para apresentar aos gestores.',
      icon: Target,
      position: 'bottom'
    },
    {
      target: '#btn-copilot-action',
      page: 'home',
      title: 'Assistente Ágil',
      description: 'A Inteligência Artificial monitora bloqueios no trabalho da equipe. Clique em "Enviar Notificação" para alertar o responsável sobre uma tarefa parada.',
      icon: Zap,
      position: 'top'
    },
    {
      target: '#btn-new-card',
      page: 'home',
      title: 'Lista de Tarefas Inteligente',
      description: 'Crie uma nova tarefa e veja a IA sugerir automaticamente a prioridade baseada no valor para o negócio e no esforço necessário.',
      icon: Play,
      position: 'top'
    },
    {
      target: '#btn-deploy-prod',
      page: 'home',
      title: 'Publicação Segura',
      description: 'Publique seu sistema em produção com verificação automática de segurança pela IA, seguindo os padrões da empresa.',
      icon: Rocket,
      position: 'top'
    },
    
    // --- STRATEGY ---
    {
      target: '#btn-new-project',
      page: 'strategy',
      title: 'Gestão de Projetos',
      description: 'Cadastre novos projetos e veja o sistema calcular automaticamente as prioridades usando análise comparativa.',
      icon: Target,
      position: 'bottom-left'
    },

    // --- PLANNING ---
    {
      target: '#btn-new-request',
      page: 'planning',
      title: 'Solicitações para Outras Equipes',
      description: 'Abra chamados para as equipes de Infraestrutura, Banco de Dados ou Segurança, com prazo e impacto claros no seu projeto.',
      icon: Workflow,
      position: 'bottom-left'
    },

    // --- GOVERNANCE ---
    {
      target: '#btn-new-gmud',
      page: 'governance',
      title: 'Agendamento de Mudanças',
      description: 'Agende alterações em sistemas verificando automaticamente conflitos com períodos de congelamento e outras mudanças.',
      icon: Shield,
      position: 'bottom-left'
    },

    // --- INGESTION ---
    {
      target: '#btn-add-integration',
      page: 'ingestion',
      title: 'Central de Integrações',
      description: 'Conecte novas ferramentas (Jira, Datadog, Sonar) em poucos cliques com configuração assistida.',
      icon: Database,
      position: 'bottom-left'
    },

    // --- GOLDEN PATHS ---
    {
      target: '#btn-new-path',
      page: 'golden-paths',
      title: 'Catálogo de Soluções',
      description: 'Crie modelos de infraestrutura prontos para uso que os times de desenvolvimento podem utilizar sem precisar de ajuda.',
      icon: Rocket,
      position: 'bottom-left'
    },

    // --- FINOPS ---
    {
      target: '#btn-apply-savings',
      page: 'finops',
      title: 'Economia Automática',
      description: 'Aplique sugestões de redução de custos (ex: desligar ambientes de desenvolvimento fora do horário) com um clique.',
      icon: DollarSign,
      position: 'top'
    },
    {
      target: '#btn-view-anomaly',
      page: 'finops',
      title: 'Análise de Gastos Anormais',
      description: 'Investigue aumentos inesperados de custo detectados pela IA e tome ações corretivas imediatas.',
      icon: DollarSign,
      position: 'top'
    },

    // --- GAMIFICATION ---
    {
      target: 'card-achievement-0', // ID dynamic logic handled separately or just assume first element
      page: 'gamification',
      title: 'Engajamento da Equipe',
      description: 'Desenvolvedores ganham medalhas e pontos por boas práticas, como revisar código de colegas ou publicar sistemas sem erros.',
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
          
          <h2 className="text-3xl font-bold text-[#F1F5F9] mb-3">Bem-vindo ao ValueFlow</h2>
          <p className="text-[#94A3B8] mb-6 text-lg">
            Sua plataforma centralizada para acompanhar e otimizar o trabalho da sua equipe de tecnologia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
            <div className="bg-[#0A0E1A] p-4 rounded-xl border border-[#1E293B]">
              <h3 className="text-[#00D9FF] font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Automação Inteligente
              </h3>
              <p className="text-sm text-[#94A3B8]">Inteligência Artificial para decidir prioridades, identificar riscos e analisar custos.</p>
            </div>
            <div className="bg-[#0A0E1A] p-4 rounded-xl border border-[#1E293B]">
              <h3 className="text-[#A855F7] font-semibold mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" /> Visão Estratégica
              </h3>
              <p className="text-sm text-[#94A3B8]">Conecte os objetivos da empresa ao trabalho do dia a dia, acompanhando prazos e disponibilidade.</p>
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
    const base = "md:w-96";
    switch (position) {
      case 'right': 
        return `${base} md:bottom-auto md:right-auto md:top-20 md:left-72`;
      case 'top': 
        return `${base} md:bottom-auto md:left-auto md:top-32 md:right-10`;
      case 'bottom-left': 
        return `${base} md:left-auto md:top-auto md:bottom-20 md:right-20`;
      case 'center': 
        return `${base} md:bottom-auto md:right-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2`;
      case 'bottom': 
        return `${base} md:right-auto md:top-auto md:bottom-10 md:left-1/2 md:-translate-x-1/2`;
      default: 
        return `${base} md:right-auto md:top-auto md:bottom-10 md:left-1/2 md:-translate-x-1/2`;
    }
  };

  // Override specific positions based on known layout
  const getSmartPosition = (stepIndex: number) => {
    // Base classes for mobile (bottom sheet style) - applied to ALL
    const mobileClasses = "bottom-4 left-4 right-4 w-auto fixed z-[100] transition-all duration-500";
    
    let desktopClasses = "";
    
    // Strategy/Planning/Gov/Ingestion/GP buttons are top right
    if ([5, 6, 7, 8, 9].includes(stepIndex)) {
      desktopClasses = getPositionClasses('top');
    }
    // FinOps buttons
    else if ([10].includes(stepIndex)) {
      // Custom for FinOps Savings - bottom rightish
      desktopClasses = "md:w-96 md:top-auto md:left-auto md:bottom-32 md:right-1/4";
    }
    else if ([11].includes(stepIndex)) {
       // Custom for FinOps Anomaly - bottom leftish
      desktopClasses = "md:w-96 md:top-auto md:right-auto md:bottom-32 md:left-1/4";
    }
    else {
      desktopClasses = getPositionClasses(currentStep.position || 'center');
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
