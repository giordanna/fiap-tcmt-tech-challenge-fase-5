import { Target, TrendingUp, DollarSign, Users, Zap, Plus } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '@/app/components/Modal';
import { useToast } from '@/app/components/Toast';

export function StrategyPage() {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const criteria = [
    { name: 'Retorno Financeiro', weight: 40, baseline: 8 },
    { name: 'Alinhamento OKR Receita (+15%)', weight: 30, baseline: 7 },
    { name: 'Complexidade Técnica', weight: 15, baseline: 5, inverse: true },
    { name: 'Time to Market', weight: 15, baseline: 6 },
  ];

  const projects = [
    {
      id: 'A',
      name: 'API Gateway Modernization',
      color: '#00D9FF',
      scores: [9, 8, 6, 7], // Scores for each criterion
      description: 'Migração para Kong + Service Mesh',
    },
    {
      id: 'B',
      name: 'Predictive Analytics Engine',
      color: '#A855F7',
      scores: [7, 9, 3, 5],
      description: 'ML para forecast de demanda',
    },
    {
      id: 'C',
      name: 'Self-Service Portal',
      color: '#10B981',
      scores: [6, 6, 8, 9],
      description: 'Golden Paths automation',
    },
  ];

  // Calculate weighted scores
  const calculateScore = (project: typeof projects[0]) => {
    return criteria.reduce((total, criterion, index) => {
      const score = project.scores[index];
      const baseline = criterion.baseline;
      const diff = criterion.inverse ? baseline - score : score - baseline;
      return total + (diff * criterion.weight) / 100;
    }, 0);
  };

  const projectsWithScores = projects.map(project => ({
    ...project,
    totalScore: calculateScore(project),
  })).sort((a, b) => b.totalScore - a.totalScore);

  const handleCreateProject = () => {
    setIsModalOpen(false);
    showToast('Projeto criado e enviado para análise de priorização', 'success');
    setNewProjectName('');
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-[#F1F5F9] font-semibold">Estratégia & Priorização</h1>
              <p className="text-sm text-[#94A3B8] mt-1">Portfolio management com Matriz de Pugh</p>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#A855F7] hover:bg-[#9333EA] text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Projeto</span>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'ROI Médio Projetado', value: '247%', icon: DollarSign, color: '#10B981' },
          { label: 'Alinhamento OKRs', value: '94%', icon: Target, color: '#00D9FF' },
          { label: 'Projetos Ativos', value: '8', icon: TrendingUp, color: '#A855F7' },
          { label: 'NPS Interno', value: '8.5', icon: Users, color: '#F59E0B' },
        ].map((kpi, i) => (
          <div key={i} className="bg-[#131827] border border-[#1E293B] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
              <div className="text-sm text-[#94A3B8]">{kpi.label}</div>
            </div>
            <div className="text-3xl font-bold text-[#F1F5F9]">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Pugh Matrix */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-xl text-[#F1F5F9] font-semibold mb-1">Matriz de Pugh - Priorização Automática</h2>
          <p className="text-sm text-[#94A3B8]">Comparação multi-critério com peso diferenciado</p>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#1E293B]">
                <th className="text-left py-4 px-4 text-sm text-[#94A3B8]">Critério</th>
                <th className="text-center py-4 px-4 text-sm text-[#94A3B8]">Peso</th>
                <th className="text-center py-4 px-4 text-sm text-[#94A3B8]">Baseline</th>
                {projects.map(project => (
                  <th key={project.id} className="text-center py-4 px-4">
                    <div className="flex flex-col items-center gap-1">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: project.color }}
                      >
                        {project.id}
                      </div>
                      <span className="text-xs text-[#F1F5F9]">{project.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion, criterionIndex) => (
                <tr key={criterionIndex} className="border-b border-[#1E293B] hover:bg-[#0A0E1A]/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#F1F5F9]">{criterion.name}</span>
                      {criterion.inverse && (
                        <span className="text-xs bg-[#F59E0B]/20 text-[#F59E0B] px-2 py-0.5 rounded">
                          Inverso
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-semibold text-[#A855F7]">{criterion.weight}%</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm text-[#94A3B8]">{criterion.baseline}</span>
                  </td>
                  {projects.map(project => {
                    const score = project.scores[criterionIndex];
                    const baseline = criterion.baseline;
                    const diff = criterion.inverse ? baseline - score : score - baseline;
                    const isPositive = diff > 0;
                    const isNeutral = diff === 0;
                    
                    return (
                      <td key={project.id} className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg font-bold text-[#F1F5F9]">{score}</span>
                          <span 
                            className={`text-xs font-semibold ${
                              isNeutral ? 'text-[#94A3B8]' : 
                              isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'
                            }`}
                          >
                            {isNeutral ? '=' : isPositive ? `+${diff}` : diff}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              {/* Total Score Row */}
              <tr className="bg-[#0A0E1A]/80">
                <td className="py-4 px-4">
                  <span className="text-sm text-[#F1F5F9] font-bold">Score Ponderado</span>
                </td>
                <td className="py-4 px-4 text-center" colSpan={2}>
                  <span className="text-xs text-[#94A3B8]">Total</span>
                </td>
                {projectsWithScores.map(project => (
                  <td key={project.id} className="py-4 px-4 text-center">
                    <div 
                      className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-bold text-white"
                      style={{ backgroundColor: project.color }}
                    >
                      {project.totalScore > 0 ? '+' : ''}{project.totalScore.toFixed(2)}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-gradient-to-r from-[#10B981]/10 to-[#00D9FF]/10 border border-[#10B981]/30 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#10B981] flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg text-[#F1F5F9] font-semibold mb-2">Recomendação Executiva</h3>
            <p className="text-[#F1F5F9] mb-4">
              Com base na análise Pugh, o projeto <span className="text-[#00D9FF] font-semibold">{projectsWithScores[0].name}</span> apresenta 
              o melhor score ponderado (<span className="text-[#10B981] font-bold">{projectsWithScores[0].totalScore > 0 ? '+' : ''}{projectsWithScores[0].totalScore.toFixed(2)}</span>), 
              equilibrando retorno financeiro, alinhamento estratégico e viabilidade técnica.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => showToast('Projeto aprovado! Movido para o roadmap.', 'success')}
                className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg transition-colors"
              >
                Aprovar para Roadmap
              </button>
              <button className="px-4 py-2 border border-[#1E293B] hover:border-[#94A3B8] text-[#F1F5F9] rounded-lg transition-colors">
                Ver Análise Detalhada
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Projeto">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#94A3B8] mb-1">Nome do Projeto</label>
            <input 
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F1F5F9] focus:outline-none focus:border-[#00D9FF]"
              placeholder="Ex: Migração Cloud"
            />
          </div>
          <div>
            <label className="block text-sm text-[#94A3B8] mb-1">Descrição</label>
            <textarea 
              className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F1F5F9] focus:outline-none focus:border-[#00D9FF] h-24 resize-none"
              placeholder="Descreva o objetivo do projeto..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#94A3B8] mb-1">Custo Estimado</label>
              <input 
                type="text"
                className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F1F5F9] focus:outline-none focus:border-[#00D9FF]"
                placeholder="R$ 0,00"
              />
            </div>
            <div>
              <label className="block text-sm text-[#94A3B8] mb-1">Prazo (meses)</label>
              <input 
                type="number"
                className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F1F5F9] focus:outline-none focus:border-[#00D9FF]"
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleCreateProject}
              className="flex-1 bg-[#A855F7] hover:bg-[#9333EA] text-white py-2 rounded-lg transition-colors"
            >
              Criar Projeto
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
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
