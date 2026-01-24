import { useState } from 'react';
import { Menu } from 'lucide-react';
import { ToastProvider } from '@/app/components/Toast';
import { Sidebar } from '@/app/components/Sidebar';
import { Header } from '@/app/components/Header';
import { HomePage } from '@/app/components/pages/HomePage';
import { StrategyPage } from '@/app/components/pages/StrategyPage';
import { PlanningPage } from '@/app/components/pages/PlanningPage';
import { GovernancePage } from '@/app/components/pages/GovernancePage';
import { UniversalIngestionPage } from '@/app/components/pages/UniversalIngestionPage';
import { GoldenPathsPage } from '@/app/components/pages/GoldenPathsPage';
import { FinOpsPage } from '@/app/components/pages/FinOpsPage';
import { GamificationPage } from '@/app/components/pages/GamificationPage';
import { ExecutiveROIPage } from '@/app/components/pages/ExecutiveROIPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false); // Close menu after navigation
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'strategy':
        return <StrategyPage />;
      case 'planning':
        return <PlanningPage />;
      case 'governance':
        return <GovernancePage />;
      case 'ingestion':
        return <UniversalIngestionPage />;
      case 'golden-paths':
        return <GoldenPathsPage />;
      case 'finops':
        return <FinOpsPage />;
      case 'gamification':
        return <GamificationPage />;
      case 'roi':
        return <ExecutiveROIPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ToastProvider>
      <div className="dark min-h-screen bg-[#0A0E1A] flex">
        {/* Mobile Menu Button - only show when menu is closed */}
        {!mobileMenuOpen && (
          <button 
            className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-[#131827] border border-[#1E293B] flex items-center justify-center text-[#F1F5F9]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar - hidden on mobile, shown on lg+ or when menu is open */}
        <div className={`
          fixed lg:sticky lg:top-0 lg:h-screen z-40
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-transform duration-300
        `}>
          <Sidebar currentPage={currentPage} onNavigate={handleNavigate} onClose={() => setMobileMenuOpen(false)} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          {/* Header */}
          <Header />

          {/* Dashboard Content */}
          <main className="flex-1 p-3 sm:p-6 overflow-x-hidden">
            {renderPage()}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}