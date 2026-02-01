import { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, Bell, Settings, ChevronRight, LayoutGrid, Users, FileCode, Box, Target, Calendar, Shield, Database, DollarSign, Trophy, BarChart3, Workflow, BookOpen } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'project' | 'task' | 'person' | 'resource' | 'doc';
  title: string;
  subtitle: string;
  url?: string;
  page: string; // Add page identifier for navigation
}

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const mockData: SearchResult[] = [
    { id: '1', type: 'resource', title: 'Kubernetes Cluster', subtitle: 'AWS EKS • Caminho Padrão', page: 'golden-paths' },
    { id: '2', type: 'resource', title: 'Microsserviço .NET', subtitle: 'Template de Backend', page: 'golden-paths' },
    { id: '3', type: 'project', title: 'Migração Legacy', subtitle: 'Projeto Estratégico', page: 'strategy' },
    { id: '4', type: 'person', title: 'Camila Santos', subtitle: 'Chefe de Operações', page: 'planning' },
    { id: '5', type: 'task', title: 'Revisar Custos AWS', subtitle: 'Sprint 42 • Em andamento', page: 'finops' },
    { id: '6', type: 'project', title: 'Data Lake V2', subtitle: 'Big Data', page: 'ingestion' },
    { id: '7', type: 'person', title: 'João Silva', subtitle: 'Tech Lead', page: 'planning' },
    { id: '8', type: 'resource', title: 'API Gateway', subtitle: 'Kong • Caminho Padrão', page: 'golden-paths' },
    { id: '9', type: 'doc', title: 'API de Pagamentos v2.5', subtitle: 'Documentação • REST API', page: 'techdocs' },
    { id: '10', type: 'doc', title: 'Checkout Service - Arquitetura', subtitle: 'Documentação • .NET', page: 'techdocs' },
    { id: '11', type: 'doc', title: 'Guia de Onboarding para Devs', subtitle: 'Documentação • Setup', page: 'techdocs' },
  ];

  const filteredResults = searchQuery.length > 0 
    ? mockData.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'project': return <Target className="w-4 h-4 text-[#A855F7]" />; // Stratégia
      case 'task': return <DollarSign className="w-4 h-4 text-[#00D9FF]" />; // FinOps (assuming task relates to costs often, or use CheckCircle/FileCode if more generic)
      case 'person': return <Calendar className="w-4 h-4 text-[#10B981]" />; // Planejamento (Recursos de pessoas)
      case 'resource': return <Workflow className="w-4 h-4 text-[#F59E0B]" />; // Golden Paths (Recursos técnicos)
      case 'doc': return <BookOpen className="w-4 h-4 text-[#10B981]" />; // Documentação
    }
  };

  const handleResultClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#131827] border-b border-[#1E293B] flex items-center justify-between px-4 sm:px-6">
      {/* Spacer for hamburger menu on mobile */}
      <div className="w-12 lg:hidden" />
      
      {/* Search Bar - hidden on mobile */}
      <div id="header-search" className="hidden sm:block flex-1 max-w-2xl" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="Buscar projetos, tarefas e métricas..."
            className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg pl-12 pr-28 py-2.5 text-[#F1F5F9] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/50 focus:border-[#00D9FF]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-md px-2.5 py-1 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
            <span className="text-xs text-[#A855F7]">Busca Inteligente</span>
          </div>

          {/* Search Results Dropdown */}
          {isSearchOpen && searchQuery.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#131827] border border-[#1E293B] rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-2">
                {filteredResults.length > 0 ? (
                  <>
                    <div className="px-3 py-2 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                      Sugestões
                    </div>
                    {filteredResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result.page)}
                        className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-[#1E293B] group transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#0A0E1A] border border-[#1E293B] flex items-center justify-center flex-shrink-0 group-hover:border-[#94A3B8]/50 transition-colors">
                          {getIcon(result.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[#F1F5F9] truncate">
                            {result.title}
                          </div>
                          <div className="text-xs text-[#94A3B8] truncate">
                            {result.subtitle}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </>
                ) : (
                    <div className="p-8 text-center text-[#94A3B8]">
                        <p>Nenhum resultado encontrado para "{searchQuery}"</p>
                    </div>
                )}
              </div>
              <div className="bg-[#0A0E1A] px-4 py-2 border-t border-[#1E293B] text-xs text-[#94A3B8] flex justify-between">
                <span>Pressione <strong>Enter</strong> para ver todos</span>
                <span>{filteredResults.length} resultados</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-lg bg-[#1E293B] flex items-center justify-center text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B]/80 transition-colors">
          <Bell className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00D9FF] rounded-full flex items-center justify-center text-[9px] text-[#0A0E1A]">3</div>
        </button>

        {/* Settings */}
        <button 
          onClick={() => window.dispatchEvent(new Event('restart-onboarding'))}
          className="w-10 h-10 rounded-lg bg-[#1E293B] flex items-center justify-center text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B]/80 transition-colors"
          title="Iniciar tour de apresentação"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-[#1E293B]">
          <div className="hidden sm:block text-right">
            <div className="text-sm text-[#F1F5F9]">Camila Santos</div>
            <div className="text-xs text-[#94A3B8]">Chefe de Operações</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center text-white text-sm font-semibold">
            CS
          </div>
        </div>
      </div>
    </header>
  );
}
