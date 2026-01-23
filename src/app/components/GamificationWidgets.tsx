import { Trophy, Award, Star, Zap } from 'lucide-react';

export function GamificationWidgets() {
  const badges = [
    { 
      name: 'Campeão de Código Limpo', 
      icon: Star, 
      progress: 85, 
      color: '#00D9FF',
      description: '17/20 PRs sem code smells'
    },
    { 
      name: 'Mestre Ágil', 
      icon: Zap, 
      progress: 92, 
      color: '#A855F7',
      description: '23/25 sprints concluídos no prazo'
    },
    { 
      name: 'Herói DevOps', 
      icon: Trophy, 
      progress: 68, 
      color: '#F59E0B',
      description: '34/50 deploys com sucesso'
    },
  ];

  return (
    <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center">
          <Award className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-[#F1F5F9] font-semibold">Conquistas do Time</h3>
          <p className="text-xs text-[#94A3B8] mt-0.5">Time de Engenharia de Plataforma</p>
        </div>
      </div>

      {/* Badges */}
      <div className="space-y-4">
        {badges.map((badge, index) => (
          <div 
            key={index} 
            className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-xl p-4 hover:border-[#94A3B8]/30 transition-colors"
          >
            <div className="flex items-start gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${badge.color}20` }}
              >
                <badge.icon className="w-5 h-5" style={{ color: badge.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm text-[#F1F5F9] font-semibold">{badge.name}</h4>
                  <span className="text-sm font-semibold" style={{ color: badge.color }}>
                    {badge.progress}%
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8]">{badge.description}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#1E293B] rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${badge.progress}%`,
                  backgroundColor: badge.color,
                  boxShadow: `0 0 8px ${badge.color}40`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-[#1E293B]">
        <div className="text-center">
          <div className="text-2xl text-[#00D9FF] font-bold">47</div>
          <div className="text-xs text-[#94A3B8] mt-1">Total de Medalhas</div>
        </div>
        <div className="text-center">
          <div className="text-2xl text-[#A855F7] font-bold">12</div>
          <div className="text-xs text-[#94A3B8] mt-1">Ranking do Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl text-[#10B981] font-bold">3.2k</div>
          <div className="text-xs text-[#94A3B8] mt-1">Pontos XP</div>
        </div>
      </div>
    </div>
  );
}
