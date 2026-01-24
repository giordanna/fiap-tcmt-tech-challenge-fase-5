import { Search, Sparkles, Bell, Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-20 h-16 bg-[#131827] border-b border-[#1E293B] flex items-center justify-between px-4 sm:px-6">
      {/* Spacer for hamburger menu on mobile */}
      <div className="w-12 lg:hidden" />
      
      {/* Search Bar - hidden on mobile */}
      <div id="header-search" className="hidden sm:block flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Buscar em todos os fluxos de valor..."
            className="w-full bg-[#1E293B] border border-[#1E293B] rounded-lg pl-12 pr-28 py-2.5 text-[#F1F5F9] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/50 focus:border-[#00D9FF]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-md px-2.5 py-1">
            <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
            <span className="text-xs text-[#A855F7]">Busca IA</span>
          </div>
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
          title="Reiniciar Tour de Onboarding"
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
