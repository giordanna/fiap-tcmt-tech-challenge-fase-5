import { Trophy, Award, Star, Zap, TrendingUp, Users } from 'lucide-react';

export function GamificationPage() {
  const leaderboard = [
    { rank: 1, name: 'Ana Silva', team: 'Platform Eng', points: 3240, badges: 12, avatar: 'AS' },
    { rank: 2, name: 'Bruno Costa', team: 'DevOps', points: 3180, badges: 11, avatar: 'BC' },
    { rank: 3, name: 'Camila Santos', team: 'SRE', points: 3120, badges: 14, avatar: 'CS' },
    { rank: 4, name: 'Daniel Lima', team: 'Backend', points: 2890, badges: 9, avatar: 'DL' },
    { rank: 5, name: 'Elena Rocha', team: 'Frontend', points: 2750, badges: 10, avatar: 'ER' },
  ];

  const achievements = [
    { 
      name: 'Campeão de Código Limpo',
      description: '20 PRs sem code smells',
      icon: Star,
      color: '#00D9FF',
      completed: true,
      progress: 100,
    },
    {
      name: 'Mestre Ágil',
      description: '25 sprints concluídos no prazo',
      icon: Zap,
      color: '#A855F7',
      completed: true,
      progress: 100,
    },
    {
      name: 'Herói DevOps',
      description: '50 deploys com sucesso',
      icon: Trophy,
      color: '#F59E0B',
      completed: false,
      progress: 68,
    },
    {
      name: 'Revisor de Código Pro',
      description: '100 revisões de código concluídas',
      icon: Award,
      color: '#10B981',
      completed: false,
      progress: 82,
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
              <h1 className="text-2xl text-[#F1F5F9] font-semibold">Gamificação</h1>
              <p className="text-sm text-[#94A3B8] mt-1">Conquistas e ranking do time</p>
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
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              <div className="text-sm text-[#94A3B8]">{stat.label}</div>
            </div>
            <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
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

        {/* Achievements */}
        <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
          <h2 className="text-lg text-[#F1F5F9] font-semibold mb-4">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement, i) => (
              <div key={i} className="p-4 bg-[#0A0E1A]/50 border border-[#1E293B] rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${achievement.color}20` }}
                  >
                    <achievement.icon className="w-5 h-5" style={{ color: achievement.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm text-[#F1F5F9] font-semibold">{achievement.name}</h3>
                      {achievement.completed && (
                        <span className="text-xs bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded-full">
                          Concluído
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
        </div>
      </div>
    </div>
  );
}
