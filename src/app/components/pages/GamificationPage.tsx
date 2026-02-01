import { Trophy, Award, Star, Zap, TrendingUp, Users, Shield, GitPullRequest, CheckCircle2, Heart, Sparkles, Target, Calendar, Plus, Clock } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '@/app/components/Modal';
import { useToast } from '@/app/components/Toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

export function GamificationPage() {
  const { showToast } = useToast();
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);

  const handleAchievementClick = (achievement: any) => {
    setSelectedAchievement(achievement);
    setIsAchievementModalOpen(true);
  };

  const [isSquadModalOpen, setIsSquadModalOpen] = useState(false);
  const [selectedSquad, setSelectedSquad] = useState<any>(null);

  const handleSquadClick = (squad: any) => {
    setSelectedSquad(squad);
    setIsSquadModalOpen(true);
  };

  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    metric: 'code_review',
    badge: '',
    duration: '7',
  });

  const campaigns = [
    {
      id: 1,
      name: 'Ninja dos PRs',
      description: 'Quem reduzir o tempo de Code Review ganha a badge especial',
      metric: 'Tempo de Code Review',
      target: '-30%',
      badge: '🥷 Ninja dos PRs',
      participants: 24,
      progress: 65,
      daysLeft: 5,
      status: 'active' as const,
      color: '#10B981',
    },
    {
      id: 2,
      name: 'Deploy Champions',
      description: 'Sprint com mais deploys sem rollback',
      metric: 'Deploys com Sucesso',
      target: '50 deploys',
      badge: '🚀 Deploy Champion',
      participants: 18,
      progress: 82,
      daysLeft: 3,
      status: 'active' as const,
      color: '#00D9FF',
    },
    {
      id: 3,
      name: 'Documentação Viva',
      description: 'Maior cobertura de documentação técnica',
      metric: 'Cobertura de Docs',
      target: '90%',
      badge: '📚 Doc Master',
      participants: 12,
      progress: 45,
      daysLeft: 12,
      status: 'active' as const,
      color: '#A855F7',
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Ana Silva', team: 'Platform Eng', points: 3240, badges: 12, avatar: 'AS' },
    { rank: 2, name: 'Bruno Costa', team: 'DevOps', points: 3180, badges: 11, avatar: 'BC' },
    { rank: 3, name: 'Camila Santos', team: 'SRE', points: 3120, badges: 14, avatar: 'CS' },
    { rank: 4, name: 'Daniel Lima', team: 'Backend', points: 2890, badges: 9, avatar: 'DL' },
    { rank: 5, name: 'Elena Rocha', team: 'Frontend', points: 2750, badges: 10, avatar: 'ER' },
  ];

  const squadLeaderboard = [
    { rank: 1, name: 'Squad Pagamentos', members: 6, points: 15420, cards: 12, active: true },
    { rank: 2, name: 'Squad Data Platform', members: 7, points: 14850, cards: 8, active: true },
    { rank: 3, name: 'Squad Mobile', members: 4, points: 9200, cards: 5, active: true },
    { rank: 4, name: 'Squad Checkout', members: 5, points: 8900, cards: 7, active: false },
    { rank: 5, name: 'Squad Core Banking', members: 8, points: 8750, cards: 9, active: false },
  ];

  const achievements = [
    { 
      name: 'Campeão de Código Limpo',
      description: '20 PRs sem code smells',
      icon: Star,
      color: '#00D9FF',
      completed: true,
      progress: 100,
      xpReward: 250,
      category: 'Qualidade',
    },
    {
      name: 'Mestre Ágil',
      description: '25 sprints concluídos no prazo',
      icon: Zap,
      color: '#A855F7',
      completed: true,
      progress: 100,
      xpReward: 300,
      category: 'Agilidade',
    },
    {
      name: 'Herói DevOps',
      description: '50 deploys com sucesso',
      icon: Trophy,
      color: '#F59E0B',
      completed: false,
      progress: 68,
      xpReward: 500,
      category: 'DevOps',
    },
    {
      name: 'Revisor de Código Pro',
      description: '100 revisões de código concluídas',
      icon: Award,
      color: '#10B981',
      completed: false,
      progress: 82,
      xpReward: 350,
      category: 'Qualidade',
    },
    {
      name: 'Zero Downtime Master',
      description: '10 deploys em produção sem incidentes',
      icon: Shield,
      color: '#EF4444',
      completed: false,
      progress: 40,
      xpReward: 600,
      category: 'SRE',
    },
    {
      name: 'Golden Path Advocate',
      description: '5 templates de Golden Path utilizados',
      icon: CheckCircle2,
      color: '#00D9FF',
      completed: true,
      progress: 100,
      xpReward: 200,
      category: 'Platform',
    },
  ];

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-[#F1F5F9] font-semibold">Desempenho</h1>
              <p className="text-sm text-[#94A3B8] mt-1">Metas, conquistas e reconhecimento das equipes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'XP Total', value: '15.2k', icon: TrendingUp, color: '#00D9FF' },
          { label: 'Medalhas Conquistadas', value: '47', icon: Award, color: '#A855F7' },
          { label: 'Ranking do Time', value: '#12', icon: Users, color: '#10B981' },
          { label: 'Conquistas', value: '85%', icon: Star, color: '#F59E0B' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#131827] border border-[#1E293B] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <stat.icon className="w-4 h-4 flex-none" style={{ color: stat.color }} />
              <div className="text-sm text-[#94A3B8]">{stat.label}</div>
            </div>
            <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Campanhas de Engajamento */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <h2 className="text-xl text-[#F1F5F9] font-semibold">Campanhas de Engajamento</h2>
              <p className="text-sm text-[#94A3B8]">Desafios para incentivar boas práticas na equipe</p>
            </div>
          </div>
          <button
            onClick={() => setIsCampaignModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-lg transition-colors font-semibold text-sm"
          >
            <Plus className="w-4 h-4" />
            Nova Campanha
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="p-4 bg-[#0A0E1A]/50 border border-[#1E293B] rounded-xl hover:border-[#94A3B8]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{campaign.badge.split(' ')[0]}</span>
                    <h3 className="text-sm text-[#F1F5F9] font-semibold">{campaign.name}</h3>
                  </div>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">{campaign.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Meta: <span className="text-[#F1F5F9] font-semibold">{campaign.target}</span></span>
                  <span className="text-[#94A3B8]">{campaign.metric}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#1E293B] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${campaign.progress}%`, backgroundColor: campaign.color }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: campaign.color }}>
                    {campaign.progress}%
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#1E293B]">
                  <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
                    <Users className="w-3 h-3" />
                    <span>{campaign.participants} participantes</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="w-3 h-3 text-[#F59E0B]" />
                    <span className="text-[#F59E0B] font-semibold">{campaign.daysLeft} dias restantes</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="text-[#10B981] font-semibold">Dica: </span>
              <span className="text-[#94A3B8]">Campanhas de gamificação aumentam em média 40% o engajamento da equipe em práticas de qualidade.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
          <h2 className="text-lg text-[#F1F5F9] font-semibold mb-4">Ranking</h2>
          <div className="space-y-3">
            {leaderboard.map((player) => (
              <div 
                key={player.rank}
                className="flex items-center gap-4 p-3 bg-[#0A0E1A]/50 border border-[#1E293B] rounded-lg hover:border-[#94A3B8]/30 transition-colors"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  player.rank === 1 ? 'bg-[#F59E0B] text-white' :
                  player.rank === 2 ? 'bg-[#94A3B8] text-white' :
                  player.rank === 3 ? 'bg-[#D97706] text-white' :
                  'bg-[#1E293B] text-[#94A3B8]'
                }`}>
                  {player.rank}
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center text-white text-sm font-semibold">
                  {player.avatar}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#F1F5F9] font-semibold">{player.name}</div>
                  <div className="text-xs text-[#94A3B8]">{player.team}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg text-[#00D9FF] font-bold">{player.points}</div>
                  <div className="text-xs text-[#94A3B8]">{player.badges} medalhas</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Squads Leaderboard */}
        <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
          <h2 className="text-lg text-[#F1F5F9] font-semibold mb-4">Ranking de Squads</h2>
          <div className="space-y-3">
            {squadLeaderboard.map((squad) => (
              <div 
                key={squad.rank}
                onClick={() => handleSquadClick(squad)}
                className="flex items-center gap-4 p-3 bg-[#0A0E1A]/50 border border-[#1E293B] rounded-lg hover:border-[#94A3B8]/30 transition-colors cursor-pointer group"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  squad.rank === 1 ? 'bg-[#F59E0B] text-white' :
                  squad.rank === 2 ? 'bg-[#94A3B8] text-white' :
                  squad.rank === 3 ? 'bg-[#D97706] text-white' :
                  'bg-[#1E293B] text-[#94A3B8]'
                }`}>
                  {squad.rank}
                </div>
                <div className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center text-[#94A3B8]">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#F1F5F9] font-semibold group-hover:text-[#00D9FF] transition-colors">{squad.name}</div>
                  <div className="text-xs text-[#94A3B8]">{squad.members} membros • {squad.cards} tarefas ativas</div>
                </div>
                <div className="text-right">
                  <div className="text-lg text-[#00D9FF] font-bold">{((squad.points) / 1000).toFixed(1)}k</div>
                  <div className="text-xs text-[#94A3B8]">pontos</div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Achievements */}
        {/* <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
          <h2 className="text-lg text-[#F1F5F9] font-semibold mb-4">Conquistas</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {achievements.map((achievement, i) => (
              <div 
                key={i} 
                id={i === 0 ? "card-achievement-0" : undefined}
                onClick={() => handleAchievementClick(achievement)}
                className="p-4 bg-[#0A0E1A]/50 border border-[#1E293B] rounded-lg cursor-pointer hover:border-[#94A3B8]/30 hover:bg-[#0A0E1A]/80 transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${achievement.color}20` }}
                  >
                    <achievement.icon className="w-5 h-5" style={{ color: achievement.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm text-[#F1F5F9] font-semibold">{achievement.name}</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1E293B] text-[#94A3B8]">
                          {achievement.category}
                        </span>
                      </div>
                      {achievement.completed ? (
                        <span className="text-xs bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded-full">
                          Concluído
                        </span>
                      ) : (
                        <span className="text-xs text-[#F59E0B] font-semibold">
                          +{achievement.xpReward} XP
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#94A3B8]">{achievement.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#1E293B] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${achievement.progress}%`,
                        backgroundColor: achievement.color 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: achievement.color }}>
                    {achievement.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      

      {/* Squad Health - NPS Interno */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#10B981]/20 flex items-center justify-center">
            <Heart className="w-5 h-5 text-[#10B981]" />
          </div>
          <div>
            <h2 className="text-xl text-[#F1F5F9] font-semibold">Saúde da Equipe</h2>
            <p className="text-sm text-[#94A3B8]">NPS Interno e indicadores de satisfação</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-xl p-4 text-center">
            <div className="text-4xl font-bold text-[#10B981] mb-2">+72</div>
            <div className="text-sm text-[#94A3B8] mb-1">NPS Interno</div>
            <div className="text-xs text-[#10B981]">↑ 8 pontos vs. mês anterior</div>
          </div>
          <div className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-xl p-4 text-center">
            <div className="text-4xl font-bold text-[#00D9FF] mb-2">4.2</div>
            <div className="text-sm text-[#94A3B8] mb-1">Índice de Satisfação</div>
            <div className="text-xs text-[#94A3B8]">de 5.0</div>
          </div>
          <div className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-xl p-4 text-center">
            <div className="text-4xl font-bold text-[#A855F7] mb-2">89%</div>
            <div className="text-sm text-[#94A3B8] mb-1">Engajamento</div>
            <div className="text-xs text-[#A855F7]">Alta Performance</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-sm text-[#94A3B8] font-semibold mb-3">Dimensões de Saúde</h4>
            {[
              { name: 'Clareza de Objetivos', score: 85, color: '#10B981' },
              { name: 'Colaboração', score: 92, color: '#00D9FF' },
              { name: 'Autonomia', score: 78, color: '#A855F7' },
              { name: 'Carga de Trabalho', score: 65, color: '#F59E0B' },
              { name: 'Crescimento', score: 88, color: '#EF4444' },
            ].map((dimension, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-32 text-sm text-[#94A3B8] truncate">{dimension.name}</div>
                <div className="flex-1 h-2 bg-[#1E293B] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${dimension.score}%`, backgroundColor: dimension.color }}></div>
                </div>
                <div className="text-sm font-semibold" style={{ color: dimension.color }}>{dimension.score}%</div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <h4 className="text-sm text-[#94A3B8] font-semibold mb-3">Pesquisas Rápidas de Clima</h4>
            {[
              { q: 'Como você avalia o clima do ciclo?', avg: 4.5, date: 'há 2 dias' },
              { q: 'O backlog está claro?', avg: 4.2, date: 'há 5 dias' },
              { q: 'O time está alinhado?', avg: 4.8, date: 'há 1 semana' },
            ].map((s, i) => (
              <div key={i} className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-lg p-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-sm text-[#F1F5F9] line-clamp-1">{s.q}</span>
                  <span className="text-xs text-[#94A3B8] whitespace-nowrap">{s.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-3 h-3 ${star <= Math.floor(s.avg) ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#1E293B]'}`} />
                  ))}
                  <span className="text-xs text-[#00D9FF] font-semibold">{s.avg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-4 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-xl">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#A855F7] flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="text-[#A855F7] font-semibold">Insight: </span>
              <span className="text-[#94A3B8]">A dimensão "Carga de Trabalho" está abaixo da meta. Considere redistribuir tarefas.</span>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isAchievementModalOpen} onClose={() => setIsAchievementModalOpen(false)} title="Detalhes da Conquista">
        {selectedAchievement && (
          <div className="space-y-4">
            <div className="p-4 bg-[#0A0E1A] border border-[#1E293B] rounded-xl flex items-start gap-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${selectedAchievement.color}20` }}
              >
                <selectedAchievement.icon className="w-8 h-8" style={{ color: selectedAchievement.color }} />
              </div>
              <div>
                <h3 className="text-lg text-[#F1F5F9] font-semibold mb-1">{selectedAchievement.name}</h3>
                <p className="text-sm text-[#94A3B8]">{selectedAchievement.description}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Progresso Atual</span>
                <span className="text-[#F1F5F9] font-bold">{selectedAchievement.progress}%</span>
              </div>
              <div className="h-3 bg-[#1E293B] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${selectedAchievement.progress}%`,
                    backgroundColor: selectedAchievement.color 
                  }}
                ></div>
              </div>
            </div>

            <div className="p-3 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-lg">
              <h4 className="text-xs text-[#A855F7] font-semibold mb-1 uppercase">Recompensa</h4>
              <p className="text-sm text-[#F1F5F9]">+250 XP e Badge exclusiva no perfil</p>
            </div>

            <div className="flex gap-3 pt-2">
              {selectedAchievement.completed ? (
                <button
                  onClick={() => {
                    setIsAchievementModalOpen(false);
                    showToast('Recompensa resgatada com sucesso!', 'success');
                  }}
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2 rounded-lg transition-colors font-semibold"
                >
                  Resgatar Recompensa
                </button>
              ) : (
                <button
                  onClick={() => setIsAchievementModalOpen(false)}
                  className="w-full border border-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] py-2 rounded-lg transition-colors"
                >
                  Fechar
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
      <Modal isOpen={isSquadModalOpen} onClose={() => setIsSquadModalOpen(false)} title="Detalhes da Squad">
        {selectedSquad && (
          <div className="space-y-4">
             <div className="p-4 bg-[#0A0E1A] border border-[#1E293B] rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00D9FF]/20 flex items-center justify-center">
                   <Users className="w-6 h-6 text-[#00D9FF]" />
                </div>
                <div>
                   <h3 className="text-lg text-[#F1F5F9] font-bold">{selectedSquad.name}</h3>
                   <p className="text-sm text-[#94A3B8]">{selectedSquad.points} Pontos Totais</p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#131827] rounded-lg border border-[#1E293B] text-center">
                   <div className="text-2xl font-bold text-[#F1F5F9]">{selectedSquad.members}</div>
                   <div className="text-xs text-[#94A3B8]">Membros Ativos</div>
                </div>
                <div className="p-3 bg-[#131827] rounded-lg border border-[#1E293B] text-center">
                   <div className="text-2xl font-bold text-[#10B981]">{selectedSquad.cards}</div>
                   <div className="text-xs text-[#94A3B8]">Tarefas em Andamento</div>
                </div>
             </div>

             <div className="border-t border-[#1E293B] pt-4">
                <h4 className="text-sm text-[#F1F5F9] font-semibold mb-3">Membros em Destaque</h4>
                <div className="space-y-2">
                   {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-2 hover:bg-[#1E293B]/50 rounded-lg transition-colors">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#A855F7]"></div>
                         <div className="flex-1">
                            <div className="text-sm text-[#F1F5F9]">Membro da Squad {i}</div>
                            <div className="text-xs text-[#94A3B8]">Senior Engineer</div>
                         </div>
                         <div className="text-xs font-bold text-[#F59E0B]">Nível {10 - i}</div>
                      </div>
                   ))}
                </div>
             </div>

             <button
               onClick={() => setIsSquadModalOpen(false)}
               className="w-full bg-[#1E293B] hover:bg-[#334155] text-white py-2 rounded-lg transition-colors"
             >
               Fechar
             </button>
          </div>
        )}
      </Modal>
      <Modal isOpen={isCampaignModalOpen} onClose={() => setIsCampaignModalOpen(false)} title="Nova Campanha de Engajamento">
        <div className="space-y-4">
          <div className="p-4 bg-[#0A0E1A] border border-[#1E293B] rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div>
                <h3 className="text-lg text-[#F1F5F9] font-bold">Criar Campanha</h3>
                <p className="text-sm text-[#94A3B8]">Configure um desafio para a equipe</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#94A3B8] mb-2">Nome da Campanha</label>
              <input
                type="text"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                placeholder="Ex: Ninja dos PRs"
                className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1E293B] rounded-lg text-[#F1F5F9] placeholder-[#64748B] focus:border-[#F59E0B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[#94A3B8] mb-2">Descrição</label>
              <textarea
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                placeholder="Ex: Quem reduzir o tempo de Code Review ganha a badge especial"
                rows={2}
                className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1E293B] rounded-lg text-[#F1F5F9] placeholder-[#64748B] focus:border-[#F59E0B] focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#94A3B8] mb-2">Métrica Alvo</label>
                <Select value={newCampaign.metric} onValueChange={(value) => setNewCampaign({ ...newCampaign, metric: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a métrica" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="code_review">Tempo de Code Review</SelectItem>
                    <SelectItem value="deploys">Deploys com Sucesso</SelectItem>
                    <SelectItem value="coverage">Cobertura de Testes</SelectItem>
                    <SelectItem value="docs">Documentação</SelectItem>
                    <SelectItem value="lead_time">Lead Time</SelectItem>
                    <SelectItem value="bugs">Redução de Bugs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm text-[#94A3B8] mb-2">Duração</label>
                <Select value={newCampaign.duration} onValueChange={(value) => setNewCampaign({ ...newCampaign, duration: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a duração" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">1 Semana</SelectItem>
                    <SelectItem value="14">2 Semanas</SelectItem>
                    <SelectItem value="30">1 Mês</SelectItem>
                    <SelectItem value="90">1 Trimestre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#94A3B8] mb-2">Badge de Recompensa</label>
              <input
                type="text"
                value={newCampaign.badge}
                onChange={(e) => setNewCampaign({ ...newCampaign, badge: e.target.value })}
                placeholder="Ex: 🥷 Ninja dos PRs"
                className="w-full px-4 py-2 bg-[#0A0E1A] border border-[#1E293B] rounded-lg text-[#F1F5F9] placeholder-[#64748B] focus:border-[#F59E0B] focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-lg">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#A855F7] flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="text-[#A855F7] font-semibold">Sugestão IA: </span>
                <span className="text-[#94A3B8]">Com base nos dados do time, uma campanha focada em "Tempo de Code Review" pode ter alto impacto.</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setIsCampaignModalOpen(false)}
              className="flex-1 border border-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] py-2 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                setIsCampaignModalOpen(false);
                setNewCampaign({ name: '', description: '', metric: 'code_review', badge: '', duration: '7' });
                showToast('Campanha criada com sucesso! A equipe foi notificada.', 'success');
              }}
              className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-white py-2 rounded-lg transition-colors font-semibold"
            >
              Lançar Campanha
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
