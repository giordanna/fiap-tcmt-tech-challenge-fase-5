import { Target, TrendingUp,  Users,  Plus, Sparkles, Clock, CheckCircle2, PlayCircle, AlertCircle, FileText, AlertTriangle, Copy, Tag } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '@/app/components/Modal';
import { useToast } from '@/app/components/Toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

export function StrategyPage() {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const criteria = [
    { name: 'Retorno Financeiro', weight: 40, baseline: 8 },
    { name: 'Alinhamento OKR Receita (+15%)', weight: 30, baseline: 7 },
    { name: 'Complexidade Técnica', weight: 15, baseline: 5, inverse: true },
    { name: 'Tempo até o Lançamento', weight: 15, baseline: 6 },
  ];

  // Project portfolio with status and teams
  const projectPortfolio = [
    {
      id: 'A',
      name: 'Modernização da Interface de Serviços',
      description: 'Migração para Kong + Service Mesh',
      status: 'em-andamento' as const,
      progress: 65,
      team: 'Squad Pagamentos',
      deadline: '15 Mar 2026',
      color: '#00D9FF',
    },
    {
      id: 'B',
      name: 'Motor de Análise Preditiva',
      description: 'Aprendizado de máquina para previsão de demanda',
      status: 'em-deploy' as const,
      progress: 90,
      team: 'Squad Data Platform',
      deadline: '28 Fev 2026',
      color: '#A855F7',
    },
    {
      id: 'C',
      name: 'Portal de Autoatendimento',
      description: 'Automação de caminhos padrão',
      status: 'a-fazer' as const,
      progress: 0,
      team: 'Squad Mobile',
      deadline: '30 Abr 2026',
      color: '#10B981',
    },
    {
      id: 'D',
      name: 'Reforço de Segurança',
      description: 'Implementação de WAF e SIEM',
      status: 'concluido' as const,
      progress: 100,
      team: 'Squad Segurança',
      deadline: '10 Jan 2026',
      color: '#F59E0B',
    },
  ];

  // ROI Data for chart
  const roiData = [
    { projeto: 'API Gateway', projetado: 280, realizado: 320, nome: 'Modernização API' },
    { projeto: 'Analytics', projetado: 450, realizado: 380, nome: 'Motor Preditivo' },
    { projeto: 'Self-Service', projetado: 200, realizado: 0, nome: 'Portal Auto' },
    { projeto: 'Segurança', projetado: 180, realizado: 195, nome: 'Reforço WAF' },
  ];

  const getStatusConfig = (status: 'a-fazer' | 'em-andamento' | 'em-deploy' | 'concluido') => {
    switch (status) {
      case 'a-fazer':
        return { label: 'A Fazer', color: '#94A3B8', icon: Clock, bg: '#94A3B8' };
      case 'em-andamento':
        return { label: 'Em Andamento', color: '#00D9FF', icon: PlayCircle, bg: '#00D9FF' };
      case 'em-deploy':
        return { label: 'Em Deploy', color: '#A855F7', icon: AlertCircle, bg: '#A855F7' };
      case 'concluido':
        return { label: 'Concluído', color: '#10B981', icon: CheckCircle2, bg: '#10B981' };
    }
  };

  const projects = [
    {
      id: 'A',
      name: 'Modernização da Interface de Serviços',
      color: '#00D9FF',
      scores: [9, 8, 6, 7], // Scores for each criterion
      description: 'Migração para Kong + Service Mesh',
    },
    {
      id: 'B',
      name: 'Motor de Análise Preditiva',
      color: '#A855F7',
      scores: [7, 9, 3, 5],
      description: 'Aprendizado de máquina para previsão de demanda',
    },
    {
      id: 'C',
      name: 'Portal de Autoatendimento',
      color: '#10B981',
      scores: [6, 6, 8, 9],
      description: 'Automação de caminhos padrão',
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

  // Stats for portfolio
  const portfolioStats = {
    total: projectPortfolio.length,
    emAndamento: projectPortfolio.filter(p => p.status === 'em-andamento').length,
    emDeploy: projectPortfolio.filter(p => p.status === 'em-deploy').length,
    concluidos: projectPortfolio.filter(p => p.status === 'concluido').length,
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex-none rounded-xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-[#F1F5F9] font-semibold">Projetos</h1>
              <p className="text-sm text-[#94A3B8] mt-1">Portfólio estratégico e priorização algorítmica</p>
            </div>
          </div>
          <button 
            id="btn-new-project"
            onClick={() => setIsModalOpen(true)}
            className="px-4 justify-center py-2 bg-[#A855F7] hover:bg-[#9333EA] text-white rounded-lg transition-colors flex items-center gap-2 flex-shrink-0 whitespace-nowrap"
          >
          
            <span>Novo Projeto</span>
              <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total de Projetos', value: portfolioStats.total.toString(), icon: Target, color: '#00D9FF' },
          { label: 'Em Andamento', value: portfolioStats.emAndamento.toString(), icon: PlayCircle, color: '#A855F7' },
          { label: 'Em Deploy', value: portfolioStats.emDeploy.toString(), icon: AlertCircle, color: '#F59E0B' },
          { label: 'Concluídos', value: portfolioStats.concluidos.toString(), icon: CheckCircle2, color: '#10B981' },
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

      {/* Project Portfolio Cards */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-xl text-[#F1F5F9] font-semibold mb-1">Portfólio de Projetos</h2>
          <p className="text-sm text-[#94A3B8]">Visão geral dos projetos ativos e seus status</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectPortfolio.map((project) => {
            const statusConfig = getStatusConfig(project.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <div 
                key={project.id}
                className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-xl p-5 hover:border-[#94A3B8]/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: project.color }}
                    >
                      {project.id}
                    </div>
                    <div>
                      <h3 className="text-sm text-[#F1F5F9] font-semibold">{project.name}</h3>
                      <p className="text-xs text-[#94A3B8]">{project.description}</p>
                    </div>
                  </div>
                  <div 
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                    style={{ backgroundColor: `${statusConfig.bg}20`, color: statusConfig.color }}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    {statusConfig.label}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#94A3B8]">Progresso</span>
                    <span className="text-[#F1F5F9] font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                    />
                  </div>
                </div>

                {/* Team & Deadline */}
                <div className="flex items-center justify-between text-xs pt-3 border-t border-[#1E293B]">
                  <div className="flex items-center gap-1.5 text-[#94A3B8]">
                    <Users className="w-3.5 h-3.5" />
                    <span>{project.team}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#94A3B8]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{project.deadline}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Triagem Inteligente com IA */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#A855F7]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#A855F7]" />
            </div>
            <div>
              <h2 className="text-lg text-[#F1F5F9] font-semibold">Triagem Inteligente</h2>
              <p className="text-xs text-[#94A3B8]">Classificação automática e identificação de duplicidades</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#94A3B8]">Última análise:</span>
            <span className="text-[#10B981]">há 30 segundos</span>
          </div>
        </div>

        {/* Demandas recentes com triagem */}
        <div className="space-y-3">
          {[
            {
              id: 'SN-12847',
              origem: 'ServiceNow',
              titulo: 'Erro crítico no módulo de pagamentos',
              status: 'triado',
              tags: ['#crítico', '#pagamentos', '#produção'],
              confianca: 94,
              duplicidade: null,
            },
            {
              id: 'SN-12848',
              origem: 'ServiceNow',
              titulo: 'Lentidão no sistema de relatórios',
              status: 'duplicidade',
              tags: ['#performance', '#relatórios'],
              confianca: 87,
              duplicidade: 'ADO-4521',
            },
            {
              id: 'ADO-4589',
              origem: 'Azure DevOps',
              titulo: 'Implementar novo endpoint de autenticação OAuth2',
              status: 'triado',
              tags: ['#segurança', '#api', '#backlog'],
              confianca: 91,
              duplicidade: null,
            },
            {
              id: 'SN-12849',
              origem: 'ServiceNow',
              titulo: 'Solicitação de acesso VPN para equipe externa',
              status: 'pendente',
              tags: ['#infraestrutura', '#acesso'],
              confianca: 78,
              duplicidade: null,
            },
            {
              id: 'AZ-892',
              origem: 'Azure Boards',
              titulo: 'Migração de banco de dados para PostgreSQL 16',
              status: 'triado',
              tags: ['#dba', '#migração', '#alta-prioridade'],
              confianca: 96,
              duplicidade: null,
            },
          ].map((demanda) => (
            <div 
              key={demanda.id}
              className={`bg-[#0A0E1A]/50 border rounded-xl p-4 hover:border-[#94A3B8]/30 transition-all ${
                demanda.status === 'duplicidade' ? 'border-[#F59E0B]/50' : 'border-[#1E293B]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* Header com origem e ID */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#00D9FF]/10 text-[#00D9FF]">
                      {demanda.origem}: {demanda.id}
                    </span>
                    {demanda.status === 'triado' && (
                      <span className="text-xs px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Triagem concluída
                      </span>
                    )}
                    {demanda.status === 'pendente' && (
                      <span className="text-xs px-2 py-0.5 rounded bg-[#F59E0B]/20 text-[#F59E0B] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Pendente
                      </span>
                    )}
                    {demanda.status === 'duplicidade' && (
                      <span className="text-xs px-2 py-0.5 rounded bg-[#F59E0B]/20 text-[#F59E0B] flex items-center gap-1">
                        <Copy className="w-3 h-3" /> Duplicado
                      </span>
                    )}
                  </div>

                  {/* Título */}
                  <h4 className="text-sm text-[#F1F5F9] font-medium mb-2">{demanda.titulo}</h4>

                  {/* Tags sugeridas pela IA */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="w-3 h-3 text-[#A855F7]" />
                    {demanda.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-0.5 rounded-full bg-[#A855F7]/10 text-[#A855F7]"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="text-xs text-[#94A3B8]">
                      ({demanda.confianca}% confiança)
                    </span>
                  </div>

                  {/* Alerta de duplicidade */}
                  {demanda.duplicidade && (
                    <div className="mt-3 p-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg inline-flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
                      <span className="text-xs text-[#F59E0B]">
                        Demanda duplicada de: <span className="font-semibold">{demanda.duplicidade}</span>
                      </span>
                      <button 
                        onClick={() => showToast('Demandas vinculadas com sucesso', 'success')}
                        className="ml-auto text-xs text-[#F59E0B] hover:text-[#FBBF24] underline"
                      >
                        Vincular
                      </button>
                    </div>
                  )}
                </div>

                {/* Ações */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button 
                    onClick={() => showToast('Triagem confirmada pela IA', 'success')}
                    className="px-3 py-1.5 text-xs bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20 rounded-lg transition-colors"
                  >
                    Confirmar
                  </button>
                  <button 
                    onClick={() => showToast('Demanda enviada para revisão manual', 'info')}
                    className="px-3 py-1.5 text-xs border border-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg transition-colors"
                  >
                    Revisar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas da triagem */}
        <div className="mt-6 pt-4 border-t border-[#1E293B] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#10B981]">847</div>
            <div className="text-xs text-[#94A3B8]">Triagens Hoje</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#F59E0B]">23</div>
            <div className="text-xs text-[#94A3B8]">Duplicidades Detectadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#A855F7]">91%</div>
            <div className="text-xs text-[#94A3B8]">Precisão IA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#00D9FF]">2.3s</div>
            <div className="text-xs text-[#94A3B8]">Tempo Médio</div>
          </div>
        </div>
      </div>


   

      {/* Pugh Matrix */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-xl text-[#F1F5F9] font-semibold mb-1">Matriz de Pugh – Priorização Algorítmica</h2>
          <p className="text-sm text-[#94A3B8]">Comparativo multicritério com pesos ajustáveis</p>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#1E293B]">
                <th className="text-left py-4 px-4 text-sm text-[#94A3B8]">Critério</th>
                <th className="text-center py-4 px-4 text-sm text-[#94A3B8]">Peso</th>
                <th className="text-center py-4 px-4 text-sm text-[#94A3B8]">Referência</th>
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
                  <span className="text-sm text-[#F1F5F9] font-bold">Pontuação Final</span>
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
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 flex-none rounded-xl bg-[#10B981] flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg text-[#F1F5F9] font-semibold mb-2">Recomendação</h3>
            <p className="text-[#F1F5F9] mb-4">
              Com base na análise Pugh, o projeto <span className="text-[#00D9FF] font-semibold">{projectsWithScores[0].name}</span> apresenta 
              o melhor score ponderado (<span className="text-[#10B981] font-bold">{projectsWithScores[0].totalScore > 0 ? '+' : ''}{projectsWithScores[0].totalScore.toFixed(2)}</span>), 
              equilibrando retorno financeiro, alinhamento estratégico e viabilidade técnica.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => showToast('Projeto aprovado! Movido para o roadmap.', 'success')}
                className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg transition-colors"
              >
                Aprovar para o Planejamento
              </button>
              <button 
                onClick={() => setIsAnalysisModalOpen(true)}
                className="px-4 py-2 border border-[#1E293B] hover:border-[#94A3B8] text-[#F1F5F9] rounded-lg transition-colors"
              >
                Ver Análise Detalhada
              </button>
            </div>
          </div>
        </div>
      </div>



      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Novo Projeto">
        <div className="space-y-4">
          {/* ServiceNow Integration Notice */}
          <div className="p-3 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-[#00D9FF]" />
              <span className="text-xs text-[#00D9FF] font-semibold">Integração ServiceNow</span>
            </div>
            <p className="text-xs text-[#94A3B8]">Os dados serão sincronizados automaticamente com o ServiceNow SPM</p>
          </div>

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
            <label className="block text-sm text-[#94A3B8] mb-1">Business Case</label>
            <textarea 
              className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F1F5F9] focus:outline-none focus:border-[#00D9FF] h-20 resize-none"
              placeholder="Descreva a justificativa de negócio e os benefícios esperados para a organização..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#94A3B8] mb-1">Tipo de Investimento</label>
              <Select defaultValue="capex">
                <SelectTrigger className="w-full bg-[#0A0E1A] border border-[#1E293B] text-[#F1F5F9]">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="capex">CAPEX</SelectItem>
                  <SelectItem value="opex">OPEX</SelectItem>
                  <SelectItem value="misto">Misto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm text-[#94A3B8] mb-1">Orçamento (R$)</label>
              <input 
                type="text"
                className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F1F5F9] focus:outline-none focus:border-[#00D9FF]"
                placeholder="R$ 0,00"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#94A3B8] mb-1">ROI Esperado (%)</label>
              <input 
                type="number"
                className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F1F5F9] focus:outline-none focus:border-[#00D9FF]"
                placeholder="0"
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

      <Modal isOpen={isAnalysisModalOpen} onClose={() => setIsAnalysisModalOpen(false)} title="Análise Detalhada – Modernização da Interface de Serviços">
        <div className="space-y-4">
          <div className="bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-4">
            <h4 className="text-sm text-[#F1F5F9] font-bold mb-3">Detalhamento da Pontuação Pugh</h4>
            <div className="space-y-3">
              {[
                { label: 'Retorno Financeiro', score: 9, weight: 40, contribution: 'Alto Impacto' },
                { label: 'Alinhamento OKR', score: 8, weight: 30, contribution: 'Estratégico' },
                { label: 'Complexidade', score: 6, weight: 15, contribution: 'Moderada' },
                { label: 'Time to Market', score: 7, weight: 15, contribution: 'Rápido' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm border-b border-[#1E293B] pb-2 last:border-0">
                  <span className="text-[#94A3B8]">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#A855F7] font-mono">{item.weight}%</span>
                    <span className="text-[#F1F5F9] font-bold">{item.score}/10</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#A855F7]" />
              <span className="text-sm font-semibold text-[#A855F7]">Insight</span>
            </div>
            <p className="text-xs text-[#94A3B8]">
              Este projeto tem alta sinergia com a iniciativa "Reforço de Segurança" prevista para o 3º trimestre. Considere unificar os backlogs para otimizar recursos de testes.
            </p>
          </div>
          <button
            onClick={() => setIsAnalysisModalOpen(false)}
            className="w-full py-2 border border-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      </Modal>
    </div>
  );
}
