import { useState } from 'react';
import { Clock, AlertCircle, Sparkles, ArrowUp, ArrowDown } from 'lucide-react';
import { Modal } from '@/app/components/Modal';
import { useToast } from '@/app/components/Toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

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
  onCardClick: (card: BacklogCard) => void;
}

function BacklogCardComponent({ card, onClick }: { card: BacklogCard; onClick: () => void }) {
  const priorityColors = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981',
  };

  return (
    <div 
      onClick={onClick}
      className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-lg p-3 hover:border-[#94A3B8]/50 transition-all cursor-pointer group"
    >
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

function Column({ title, cards, color, onCardClick }: ColumnProps) {
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
          {title === 'Backlog Priorizado (IA)' && 'Prioridade otimizada por IA'}
          {title === 'Em Progresso (Sprint 26)' && 'Sprint atual'}
          {title === 'Deploy em UAT' && 'Pronto para testes'}
        </div>
      </div>

      <div className="space-y-3">
        {cards.map((card) => (
          <BacklogCardComponent key={card.id} card={card} onClick={() => onCardClick(card)} />
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
      badge: { text: 'Legado', color: '#00D9FF' },
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
      badge: { text: 'Alta Prioridade', color: '#EF4444' },
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

  const { showToast } = useToast();
  const [selectedCard, setSelectedCard] = useState<BacklogCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (card: BacklogCard) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleAcceptSuggestion = () => {
    setIsModalOpen(false);
    showToast(`Card "${selectedCard?.title}" movido para prioridade sugerida pela IA`, 'success');
  };

  const handleKeepPosition = () => {
    setIsModalOpen(false);
    showToast(`Card "${selectedCard?.title}" mantido na posição atual`, 'info');
  };

  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');

  const handleCreateCard = () => {
    setIsNewCardModalOpen(false);
    showToast('Card criado e adicionado ao backlog', 'success');
    setNewCardTitle('');
  };

  return (
    <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl text-[#F1F5F9] font-semibold mb-1">Backlog Priorizado</h2>
          <p className="text-sm text-[#94A3B8]">Orquestração de itens com IA</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-[#1E293B] hover:bg-[#334155] border border-[#1E293B] text-[#F1F5F9] rounded-lg text-sm transition-colors">
            Filtrar
          </button>
          <button 
            id="btn-new-card"
            onClick={() => setIsNewCardModalOpen(true)}
            className="px-3 py-1.5 bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] rounded-lg text-sm transition-colors"
          >
            + Novo Card
          </button>
        </div>
      </div>

      {/* Columns */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        <Column 
          title="Backlog Priorizado (IA)" 
          cards={prioritizedBacklog} 
          color="#A855F7"
          onCardClick={handleCardClick}
        />
        <Column 
          title="Em Progresso (Sprint 26)" 
          cards={inProgress} 
          color="#00D9FF"
          onCardClick={handleCardClick}
        />
        <Column 
          title="Deploy em UAT" 
          cards={deployed} 
          color="#10B981"
          onCardClick={handleCardClick}
        />
      </div>

      {/* Reprioritization Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Análise de Priorização IA">
        {selectedCard && (
          <div className="space-y-6">
            {/* Card Info */}
            <div className="bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center text-white text-sm font-semibold">
                  {selectedCard.avatar}
                </div>
                <div>
                  <h4 className="text-sm text-[#F1F5F9] font-medium">{selectedCard.title}</h4>
                  <p className="text-xs text-[#94A3B8]">{selectedCard.assignee}</p>
                </div>
              </div>
            </div>

            {/* AI Suggestion */}
            <div className="bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#A855F7]" />
                <span className="text-sm font-semibold text-[#A855F7]">Sugestão de IA</span>
              </div>
              <p className="text-sm text-[#F1F5F9] mb-3">
                Com base na análise de dependências e valor de negócio, recomendo mover este card <span className="text-[#10B981]">2 posições acima</span> no backlog.
              </p>
              <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-1">
                  <ArrowUp className="w-3 h-3 text-[#10B981]" />
                  <span>Impacto: Alto</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Confiança: 87%</span>
                </div>
              </div>
            </div>

            {/* Reasoning */}
            <div className="space-y-2">
              <div className="text-xs text-[#94A3B8] font-semibold">JUSTIFICATIVA</div>
              <ul className="space-y-1 text-sm text-[#94A3B8]">
                <li>• Remove bloqueios para 3 outros itens</li>
                <li>• Alinhado com OKR Q1 - Eficiência operacional</li>
                <li>• Equipe disponível no sprint atual</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAcceptSuggestion}
                className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ArrowUp className="w-4 h-4" />
                Aceitar Sugestão
              </button>
              <button
                onClick={handleKeepPosition}
                className="px-4 py-3 border border-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg transition-colors"
              >
                Manter Posição
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* New Card Modal */}
      <Modal isOpen={isNewCardModalOpen} onClose={() => setIsNewCardModalOpen(false)} title="Adicionar Novo Item ao Backlog">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#94A3B8] mb-1">Título do Card</label>
            <input 
              type="text"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F1F5F9] focus:outline-none focus:border-[#00D9FF]"
              placeholder="Ex: Implementar cache no endpoint de usuários"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#94A3B8] mb-1">Responsável</label>
              <Select defaultValue="@anderson.silva">
                <SelectTrigger className="w-full bg-[#0A0E1A] border border-[#1E293B] text-[#F1F5F9]">
                  <SelectValue placeholder="Selecione o responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="@anderson.silva">@anderson.silva</SelectItem>
                  <SelectItem value="@bruno.costa">@bruno.costa</SelectItem>
                  <SelectItem value="@silva.lima">@silva.lima</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm text-[#94A3B8] mb-1">Prioridade Inicial</label>
              <Select defaultValue="medium">
                <SelectTrigger className="w-full bg-[#0A0E1A] border border-[#1E293B] text-[#F1F5F9]">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="p-3 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#00D9FF]" />
              <span className="text-sm font-semibold text-[#00D9FF]">AI Analysis Preview</span>
            </div>
            <p className="text-xs text-[#94A3B8]">
              Ao criar, a IA analisará automaticamente a complexidade e sugerirá a melhor posição no backlog baseada na velocidade do time.
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCreateCard}
              className="flex-1 bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] font-semibold py-2 rounded-lg transition-colors"
            >
              Criar Card
            </button>
            <button
              onClick={() => setIsNewCardModalOpen(false)}
              className="px-4 py-2 border border-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
