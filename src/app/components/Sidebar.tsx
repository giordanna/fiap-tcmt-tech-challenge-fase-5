import { 
  Database, 
  Workflow, 
  GitBranch, 
  DollarSign, 
  Trophy, 
  BarChart3,
  Zap,
  Target,
  Calendar,
  Shield,
  X
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onClose?: () => void;
}

export function Sidebar({ currentPage, onNavigate, onClose }: SidebarProps) {
  const navItems = [
    { id: 'home', icon: GitBranch, label: 'Agile Engine' },
    { id: 'strategy', icon: Target, label: 'Estratégia & Priorização' },
    { id: 'planning', icon: Calendar, label: 'Planejamento & Capacidade' },
    { id: 'governance', icon: Shield, label: 'Governança & GMUD' },
    { id: 'ingestion', icon: Database, label: 'Hub de Ingestão' },
    { id: 'golden-paths', icon: Workflow, label: 'Caminhos Padrão' },
    { id: 'finops', icon: DollarSign, label: 'FinOps & Observabilidade' },
    { id: 'gamification', icon: Trophy, label: 'Gamificação' },
    { id: 'roi', icon: BarChart3, label: 'Painel de ROI' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#0F1624] border-r border-[#1E293B] flex flex-col py-6 overflow-y-auto">
      {/* Header with Logo and Close Button */}
      <div className="flex items-center justify-between px-4 mb-6">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-semibold text-[#F1F5F9]">ValueFlow</div>
            <div className="text-xs text-[#94A3B8]">Plataforma</div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 rounded-lg bg-[#1E293B] flex items-center justify-center text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav id="sidebar-nav" className="flex-1 flex flex-col gap-1 px-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full px-3 py-3 rounded-lg flex items-center gap-3 transition-all text-left
              ${currentPage === item.id 
                ? 'bg-[#00D9FF]/10 text-[#00D9FF]' 
                : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F1F5F9]'
              }
            `}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{item.label}</div>
              {item.badge && (
                <div className="text-xs text-[#00D9FF] truncate">{item.badge}</div>
              )}
            </div>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 pt-4 border-t border-[#1E293B] mt-4">
        <div className="text-xs text-[#94A3B8] text-center">v1.0.0</div>
      </div>
    </aside>
  );
}