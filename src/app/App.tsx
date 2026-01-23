import { useState } from 'react';
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
    <div className="dark min-h-screen bg-[#0A0E1A] flex">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}