import { TrendingUp, TrendingDown, Minus, MessageSquare, Users, Sparkles, Mail, Hash, Smile, Frown, Meh } from 'lucide-react';

interface Stakeholder {
  nome: string;
  cargo: string;
  sentimento: 'positivo' | 'neutro' | 'negativo';
  ultimoFeedback: string;
  fonte: 'slack' | 'teams' | 'email';
  dataFeedback: string;
}

export function StakeholderSentimentWidget() {
  const stakeholders: Stakeholder[] = [
    {
      nome: 'Carlos Mendes',
      cargo: 'VP de Tecnologia',
      sentimento: 'positivo',
      ultimoFeedback: 'Excelente progresso no projeto de migração cloud. Time está entregando com qualidade.',
      fonte: 'slack',
      dataFeedback: '2h atrás',
    },
    {
      nome: 'Ana Paula Silva',
      cargo: 'Diretora de Produto',
      sentimento: 'neutro',
      ultimoFeedback: 'Precisamos alinhar melhor as prioridades do backlog com as expectativas do cliente.',
      fonte: 'teams',
      dataFeedback: '5h atrás',
    },
    {
      nome: 'Roberto Almeida',
      cargo: 'CFO',
      sentimento: 'negativo',
      ultimoFeedback: 'Custos de infraestrutura estão 15% acima do budget. Precisamos revisar.',
      fonte: 'email',
      dataFeedback: '1d atrás',
    },
    {
      nome: 'Fernanda Costa',
      cargo: 'Head de Segurança',
      sentimento: 'positivo',
      ultimoFeedback: 'Auditoria SOC2 foi um sucesso. Parabéns ao time de compliance.',
      fonte: 'slack',
      dataFeedback: '2d atrás',
    },
  ];

  const sentimentStats = {
    positivo: stakeholders.filter(s => s.sentimento === 'positivo').length,
    neutro: stakeholders.filter(s => s.sentimento === 'neutro').length,
    negativo: stakeholders.filter(s => s.sentimento === 'negativo').length,
  };

  const totalStakeholders = stakeholders.length;
  const sentimentScore = Math.round(
    ((sentimentStats.positivo * 100) + (sentimentStats.neutro * 50) + (sentimentStats.negativo * 0)) / totalStakeholders
  );

  const getSentimentIcon = (sentimento: string) => {
    switch (sentimento) {
      case 'positivo':
        return Smile;
      case 'negativo':
        return Frown;
      default:
        return Meh;
    }
  };

  const getSentimentColor = (sentimento: string) => {
    switch (sentimento) {
      case 'positivo':
        return '#10B981';
      case 'negativo':
        return '#EF4444';
      default:
        return '#F59E0B';
    }
  };

  const getSourceIcon = (fonte: string) => {
    switch (fonte) {
      case 'slack':
        return Hash;
      case 'email':
        return Mail;
      default:
        return MessageSquare;
    }
  };

  return (
    <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#00D9FF] flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg text-[#F1F5F9] font-semibold">Sentimento de Stakeholders</h3>
            <p className="text-xs text-[#94A3B8]">Análise via NLP de Slack, Teams e Email</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-2xl font-bold text-[#F1F5F9]">{sentimentScore}%</div>
            <div className="text-xs text-[#94A3B8]">Score Geral</div>
          </div>
          {sentimentScore >= 70 ? (
            <TrendingUp className="w-5 h-5 text-[#10B981]" />
          ) : sentimentScore >= 40 ? (
            <Minus className="w-5 h-5 text-[#F59E0B]" />
          ) : (
            <TrendingDown className="w-5 h-5 text-[#EF4444]" />
          )}
        </div>
      </div>

      {/* Sentiment Distribution */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg p-3 text-center">
          <Smile className="w-5 h-5 text-[#10B981] mx-auto mb-1" />
          <div className="text-xl font-bold text-[#10B981]">{sentimentStats.positivo}</div>
          <div className="text-xs text-[#94A3B8]">Positivo</div>
        </div>
        <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg p-3 text-center">
          <Meh className="w-5 h-5 text-[#F59E0B] mx-auto mb-1" />
          <div className="text-xl font-bold text-[#F59E0B]">{sentimentStats.neutro}</div>
          <div className="text-xs text-[#94A3B8]">Neutro</div>
        </div>
        <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg p-3 text-center">
          <Frown className="w-5 h-5 text-[#EF4444] mx-auto mb-1" />
          <div className="text-xl font-bold text-[#EF4444]">{sentimentStats.negativo}</div>
          <div className="text-xs text-[#94A3B8]">Negativo</div>
        </div>
      </div>

      {/* Stakeholder List */}
      <div className="space-y-3 mb-6">
        {stakeholders.map((stakeholder, i) => {
          const SentimentIcon = getSentimentIcon(stakeholder.sentimento);
          const sentimentColor = getSentimentColor(stakeholder.sentimento);
          const SourceIcon = getSourceIcon(stakeholder.fonte);

          return (
            <div 
              key={i}
              className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-xl p-3 hover:border-[#94A3B8]/30 transition-all"
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${sentimentColor}20` }}
                >
                  <SentimentIcon className="w-4 h-4" style={{ color: sentimentColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="text-sm text-[#F1F5F9] font-semibold">{stakeholder.nome}</span>
                      <span className="text-xs text-[#94A3B8] ml-2">{stakeholder.cargo}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
                      <SourceIcon className="w-3 h-3" />
                      <span>{stakeholder.dataFeedback}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">{stakeholder.ultimoFeedback}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Summary */}
      <div className="bg-gradient-to-r from-[#A855F7]/10 to-[#00D9FF]/10 border border-[#A855F7]/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#A855F7]" />
          <span className="text-sm font-semibold text-[#F1F5F9]">Resumo</span>
        </div>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          <strong className="text-[#F1F5F9]">Tendência geral positiva</strong> com 62% de aprovação. 
          Principais preocupações: <span className="text-[#EF4444]">custos de infraestrutura</span> (CFO) e 
          <span className="text-[#F59E0B]">alinhamento de prioridades</span> (Produto). 
          Destaques: <span className="text-[#10B981]">migração cloud</span> e 
          <span className="text-[#10B981]">auditoria SOC2</span> bem avaliados.
        </p>
      </div>
    </div>
  );
}
