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
  Shield
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'home', icon: GitBranch, label: 'Agile Engine', badge: 'Azure Boards' },
    { id: 'strategy', icon: Target, label: 'Estratégia & Priorização', badge: 'Pugh' },
    { id: 'planning', icon: Calendar, label: 'Planejamento & Capacidade', badge: '32h/40h' },
    { id: 'governance', icon: Shield, label: 'Governança & GMUD', badge: 'ServiceNow' },
    { id: 'ingestion', icon: Database, label: 'Universal Ingestion Hub' },
    { id: 'golden-paths', icon: Workflow, label: 'Golden Paths' },
    { id: 'finops', icon: DollarSign, label: 'FinOps & Observability' },
    { id: 'gamification', icon: Trophy, label: 'Gamification' },
    { id: 'roi', icon: BarChart3, label: 'Executive ROI Dashboard' },
  ];

  return (
    <aside className="w-20 bg-[#0F1624] border-r border-[#1E293B] flex flex-col items-center py-6 gap-6 overflow-y-auto">
      {/* Logo */}
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center mb-4 cursor-pointer"
        onClick={() => onNavigate('home')}
      >
        <Zap className="w-7 h-7 text-white" />
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-3 w-full px-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all relative group
              ${currentPage === item.id ? 'bg-[#00D9FF]/10 text-[#00D9FF]' : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F1F5F9]'}
            `}
          >
            <item.icon className="w-6 h-6" />
            {item.badge && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#A855F7] rounded-full border-2 border-[#0F1624]"></div>
            )}
            
            {/* Tooltip */}
            <div className="absolute left-20 bg-[#131827] border border-[#1E293B] rounded-lg px-3 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl">
              <div className="text-sm text-[#F1F5F9]">{item.label}</div>
              {item.badge && (
                <div className="text-xs text-[#00D9FF] mt-0.5">{item.badge}</div>
              )}
            </div>
          </button>
        ))}
      </nav>

      {/* Bottom spacer */}
      <div className="flex-1"></div>
    </aside>
  );
}