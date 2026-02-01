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
import { TechDocsPage } from '@/app/components/pages/TechDocsPage';
import { MonitoringPage } from '@/app/components/pages/MonitoringPage';
import { AIAssistantPage } from '@/app/components/pages/AIAssistantPage';
import { OnboardingTour } from '@/app/components/OnboardingTour';
import { DeployedResource } from '@/app/types';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Shared State for Resources
  const [resources, setResources] = useState<DeployedResource[]>([
    {
      id: 'r1',
      name: 'Checkout Service API',
      type: 'Microsserviço .NET + Azure SQL',
      env: 'production',
      status: 'running',
      health: 'healthy',
      url: 'api.checkout.internal',
      createdAt: '2024-03-10',
      category: 'service'
    },
    {
      id: 'r2',
      name: 'Auth Gateway',
      type: 'Azure API Management',
      env: 'staging',
      status: 'testing',
      health: 'healthy',
      url: 'auth-stg.internal',
      createdAt: '2024-03-12',
      category: 'service'
    },
     {
      id: 'r3',
      name: 'Payments DB Replica',
      type: 'Azure SQL Database',
      env: 'production',
      status: 'running',
      health: 'degraded',
      url: 'db-pay-02.internal',
      createdAt: '2024-02-15',
      category: 'database'
    }
  ]);

  const handleAddResource = (resource: DeployedResource) => {
      setResources(prev => [resource, ...prev]);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false); // Close menu after navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        return <GoldenPathsPage onDeploy={handleAddResource} resources={resources} />;
      case 'finops':
        return <FinOpsPage />;
      case 'gamification':
        return <GamificationPage />;
      case 'monitoring':
        return <MonitoringPage />;
      case 'ai-assistant':
        return <AIAssistantPage />;
      case 'techdocs':
        return <TechDocsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ToastProvider>
      <OnboardingTour onNavigate={handleNavigate} />
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
          <Header onNavigate={handleNavigate} />

          {/* Dashboard Content */}
          <main className="flex-1 p-3 sm:p-6 overflow-x-hidden">
            {renderPage()}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}