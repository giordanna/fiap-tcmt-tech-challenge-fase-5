import { Clock, AlertCircle } from 'lucide-react';

interface BacklogCard {
  id: string;
  title: string;
  assignee: string;
  avatar: string;
  priority?: 'high' | 'medium' | 'low';
  effort?: string;
  badge?: { text: string; color: string };
}

interface ColumnProps {
  title: string;
  cards: BacklogCard[];
  color: string;
}

function BacklogCard({ card }: { card: BacklogCard }) {
  const priorityColors = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981',
  };

  return (
    <div className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-lg p-3 hover:border-[#94A3B8]/50 transition-all cursor-pointer group">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
          {card.avatar}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm text-[#F1F5F9] mb-1 group-hover:text-[#00D9FF] transition-colors">
            {card.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
            <span>{card.assignee}</span>
            {card.effort && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{card.effort}</span>
                </div>
              </>
            )}
          </div>
          {card.badge && (
            <div 
              className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-md text-xs font-medium"
              style={{ 
                backgroundColor: `${card.badge.color}20`,
                color: card.badge.color 
              }}
            >
              {card.badge.text}
            </div>
          )}
        </div>

        {/* Priority Indicator */}
        {card.priority && (
          <div 
            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1"
            style={{ backgroundColor: priorityColors[card.priority] }}
          ></div>
        )}
      </div>
    </div>
  );
}

function Column({ title, cards, color }: ColumnProps) {
  return (
    <div className="flex-1 min-w-[300px]">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
          <h3 className="text-sm text-[#F1F5F9] font-semibold">{title}</h3>
          <span className="text-xs text-[#94A3B8]">({cards.length})</span>
        </div>
        <div className="text-xs text-[#94A3B8]">
          {title === 'Prioritized Backlog (AI-Driven)' && 'AI optimized priority'}
          {title === 'In Progress (Sprint 26)' && 'Current sprint'}
          {title === 'Deployed to UAT' && 'Ready for testing'}
        </div>
      </div>

      <div className="space-y-3">
        {cards.map((card) => (
          <BacklogCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export function PrioritizedBacklog() {
  const prioritizedBacklog: BacklogCard[] = [
    {
      id: '1',
      title: 'Sanitização Golden Values',
      assignee: '@anderson.silva',
      avatar: 'AS',
      priority: 'high',
      effort: '5.5d',
      badge: { text: 'Legacy', color: '#00D9FF' },
    },
    {
      id: '2',
      title: 'Integrar RXSS via Neo Sentry',
      assignee: '@bruno.costa',
      avatar: 'BC',
      priority: 'high',
      effort: '3.1d',
    },
    {
      id: '3',
      title: 'Saperi EnterpriseGateway Br Dois',
      assignee: '@silva.lima',
      avatar: 'SL',
      priority: 'medium',
      effort: '8.2d',
      badge: { text: 'High Priority', color: '#EF4444' },
    },
  ];

  const inProgress: BacklogCard[] = [
    {
      id: '4',
      title: 'Implementar Predictive Analytics Engine',
      assignee: '@carlos.dias',
      avatar: 'CD',
      effort: '3.9d',
      badge: { text: 'API', color: '#00D9FF' },
    },
    {
      id: '5',
      title: 'Integrar SAP ERP via API Gateway',
      assignee: '@maria.santos',
      avatar: 'MS',
      effort: '5.6d',
    },
    {
      id: '6',
      title: 'Streamer Initiative AocRelations',
      assignee: '@pedro.silva',
      avatar: 'PS',
      badge: { text: 'LITE', color: '#10B981' },
    },
  ];

  const deployed: BacklogCard[] = [
    {
      id: '7',
      title: 'Implement SAP ERP API Gateway 3',
      assignee: '@ana.ferreira',
      avatar: 'AF',
      effort: '2.8d',
    },
    {
      id: '8',
      title: 'Integrar SAP ERP via API Gateway',
      assignee: '@lucas.martins',
      avatar: 'LM',
      effort: '4.3d',
      badge: { text: 'LITE', color: '#10B981' },
    },
    {
      id: '9',
      title: 'Streamer Initiative Grid Base',
      assignee: '@julia.rocha',
      avatar: 'JR',
      badge: { text: 'LITE', color: '#10B981' },
    },
  ];

  return (
    <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl text-[#F1F5F9] font-semibold mb-1">Prioritized Backlog</h2>
          <p className="text-sm text-[#94A3B8]">AI-driven work item orchestration</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-[#1E293B] hover:bg-[#334155] border border-[#1E293B] text-[#F1F5F9] rounded-lg text-sm transition-colors">
            Filter
          </button>
          <button className="px-3 py-1.5 bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] rounded-lg text-sm transition-colors">
            + New Card
          </button>
        </div>
      </div>

      {/* Columns */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        <Column 
          title="Prioritized Backlog (AI-Driven)" 
          cards={prioritizedBacklog} 
          color="#A855F7"
        />
        <Column 
          title="In Progress (Sprint 26)" 
          cards={inProgress} 
          color="#00D9FF"
        />
        <Column 
          title="Deployed to UAT" 
          cards={deployed} 
          color="#10B981"
        />
      </div>
    </div>
  );
}
