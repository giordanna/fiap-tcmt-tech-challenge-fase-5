import { 
  Database, 
  Workflow, 
  DollarSign, 
  Trophy, 
  BarChart3,
  Zap,
  FolderKanban,
  Users,
  RefreshCw,
  Home,
  X,
  BookOpen,
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onClose?: () => void;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface NavItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export function Sidebar({ currentPage, onNavigate, onClose }: SidebarProps) {
  const navGroups: NavGroup[] = [
    {
      label: 'Visão Geral',
      items: [
        { id: 'home', icon: Home, label: 'Início' },
        { id: 'roi', icon: BarChart3, label: 'Dashboard Executivo' },
      ]
    },
    {
      label: 'Gestão Operacional',
      items: [
        { id: 'strategy', icon: FolderKanban, label: 'Projetos' },
        { id: 'planning', icon: Users, label: 'Times' },
        { id: 'governance', icon: RefreshCw, label: 'Mudanças' },
        { id: 'gamification', icon: Trophy, label: 'Desempenho' },
      ]
    },
    {
      label: 'Plataforma',
      items: [
        { id: 'ingestion', icon: Database, label: 'Hub de Dados' },
        { id: 'golden-paths', icon: Workflow, label: 'Caminhos Padrão' },
        { id: 'finops', icon: DollarSign, label: 'Custos Cloud' },
        { id: 'techdocs', icon: BookOpen, label: 'Documentação' },
      ]
    }
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

      {/* Grouped Navigation */}
      <nav id="sidebar-nav" className="flex-1 flex flex-col gap-6 px-3">
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold px-3 mb-2">
              {group.label}
            </div>
            <div className="flex flex-col gap-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all text-left
                    ${currentPage === item.id 
                      ? 'bg-[#00D9FF]/10 text-[#00D9FF]' 
                      : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F1F5F9]'
                    }
                  `}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 pt-4 border-t border-[#1E293B] mt-4">
        <div className="text-xs text-[#94A3B8] text-center">v1.0.0</div>
      </div>
    </aside>
  );
}