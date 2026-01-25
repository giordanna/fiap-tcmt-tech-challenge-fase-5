import { useState, useEffect } from 'react';
import { Workflow, Rocket, Plus, DollarSign, Sparkles, AlertTriangle, CheckCircle2, Loader2, Server, Database, GitBranch, Activity, Clock } from 'lucide-react';
import { Modal } from '@/app/components/Modal';
import { useToast } from '@/app/components/Toast';
import { DeployedResource } from '@/app/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface Path {
  id: string;
  name: string;
  description: string;
  logo: string;
  color: string;
  uses: number;
  avgTime: string;
  custoMensal: number;
  techStack: string[];
  requiresApproval: boolean;
  category: 'service' | 'database';
}

interface GoldenPathsPageProps {
  onDeploy?: (resource: DeployedResource) => void;
  resources: DeployedResource[];
}

export function GoldenPathsPage({ onDeploy, resources }: GoldenPathsPageProps) {
  const { showToast } = useToast();
  // Catalog State
  const [selectedPath, setSelectedPath] = useState<Path | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewPathModalOpen, setIsNewPathModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);
  const [deployStage, setDeployStage] = useState('');
  const [selectedEnv, setSelectedEnv] = useState('staging');
  const [approvalRequested, setApprovalRequested] = useState(false);
  
  // New Path State
  const [newPathName, setNewPathName] = useState('');
  const [newPathDesc, setNewPathDesc] = useState('');

  // Resources Tab State
  const [activeResourceTab, setActiveResourceTab] = useState<'repos' | 'services' | 'databases'>('repos');

  const getHealthColor = (health: string) => {
    if (health === 'healthy') return '#10B981';
    if (health === 'degraded') return '#F59E0B';
    return '#EF4444';
  };

  const services = resources.filter(r => r.category === 'service' || !r.category);
  // Using mocks for DBs as per original ResourcesPage logic, but could filter from resources if needed
  // const dbs = resources.filter(r => r.category === 'database'); 

  const repos = [
    { id: '1', name: 'fiap-tech-challenge', type: 'GitHub', logo: 'https://cdn.worldvectorlogo.com/logos/github-icon-2.svg', stars: 12, lastUpdate: '2h ago' },
    { id: '2', name: 'payment-gateway', type: 'GitLab', logo: 'https://cdn.worldvectorlogo.com/logos/gitlab.svg', stars: 5, lastUpdate: '1d ago' },
    { id: '3', name: 'auth-service', type: 'GitHub', logo: 'https://cdn.worldvectorlogo.com/logos/github-icon-2.svg', stars: 8, lastUpdate: '3d ago' },
  ];

  const dbMocks = [
      { id: 'db1', name: 'CustomerDB PROD', type: 'PostgreSQL (RDS)', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg', env: 'production', status: 'running', health: 'healthy', createdAt: '2026-01-15' },
      { id: 'db2', name: 'CustomerDB STG', type: 'PostgreSQL (RDS)',logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg',  env: 'staging', status: 'running', health: 'healthy', createdAt: '2025-02-20' },
  ];

  const paths: Path[] = [
    {
      id: 'p1',
      name: 'Kubernetes Cluster',
      description: 'Cluster EKS com 3 nodes, Istio service mesh, Prometheus/Grafana e auto-scaling configurado',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg',
      color: '#00D9FF',
      uses: 47,
      avgTime: '12 min',
      custoMensal: 850,
      techStack: ['AWS EKS', 'Istio', 'Prometheus', 'Grafana'],
      requiresApproval: true,
      category: 'service'
    },
    {
      id: 'p2',
      name: 'API Gateway + Auth',
      description: 'Kong Gateway com OAuth2, rate limiting, WAF e integração com Azure AD',
      logo: 'https://avatars.githubusercontent.com/u/962416',
      color: '#A855F7',
      uses: 34,
      avgTime: '8 min',
      custoMensal: 280,
      techStack: ['Kong', 'OAuth2', 'Azure AD', 'AWS WAF'],
      requiresApproval: false,
      category: 'service'
    },
    {
        id: 'p3',
      name: 'Microsserviço .NET + RDS',
      description: '.NET 8 com PostgreSQL RDS, CI/CD completo, Health Checks e OpenTelemetry',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Microsoft_.NET_logo.png',
      color: '#10B981',
      uses: 89,
      avgTime: '15 min',
      custoMensal: 420,
      techStack: ['.NET 8', 'PostgreSQL', 'GitHub Actions', 'OpenTelemetry'],
      requiresApproval: false,
      category: 'service'
    },
    {
      id: 'p4',
      name: 'Banco de Dados Enterprise',
      description: 'PostgreSQL Multi-AZ com backup automático, read replicas e criptografia em repouso',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg',
      color: '#F59E0B',
      uses: 56,
      avgTime: '10 min',
      custoMensal: 1200,
      techStack: ['PostgreSQL', 'Multi-AZ', 'AWS KMS', 'Point-in-time Recovery'],
      requiresApproval: true,
      category: 'database'
    },
  ];

  const deployStages = [
    'Validando configurações...',
    'Provisionando recursos...',
    'Aplicando configurações de segurança...',
    'Iniciando serviços...',
    'Configurando rede...',
    'Executando verificações de funcionamento...',
    'Finalizando publicação...',
  ];

  const handleDeploy = (path: Path) => {
    setSelectedPath(path);
    setIsModalOpen(true);
    setDeployProgress(0);
    setIsDeploying(false);
  };

  const handleCreatePath = () => {
    setIsNewPathModalOpen(false);
    showToast('Template salvo no catálogo e pronto para uso', 'success');
    setNewPathName('');
    setNewPathDesc('');
  };

  const startDeploy = () => {
    setIsDeploying(true);
    setDeployProgress(0);
  };

  useEffect(() => {
    if (!isDeploying) return;

    const interval = setInterval(() => {
      setDeployProgress(prev => {
        const next = prev + 2;
        const stageIndex = Math.min(Math.floor((next / 100) * deployStages.length), deployStages.length - 1);
        setDeployStage(deployStages[stageIndex]);
        
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Add to resources list via callback
            if (selectedPath && onDeploy) {
                const newResource: DeployedResource = {
                    id: `r${Date.now()}`,
                    name: `${selectedPath.name} (Novo)`,
                    type: selectedPath.name,
                    env: selectedEnv as any,
                    status: 'testing',
                    health: 'healthy',
                    url: `resource-${Date.now()}.internal`,
                    createdAt: new Date().toISOString().split('T')[0],
                    category: selectedPath.category
                };
                onDeploy(newResource);
            }

            setIsModalOpen(false);
            setIsDeploying(false);
            showToast(`${selectedPath?.name} implantado com sucesso! Recurso movido para testes.`, 'success');
          }, 500);
        }
        return Math.min(next, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isDeploying, selectedEnv, selectedPath, showToast, onDeploy]);

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <Tabs defaultValue="catalog" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] flex items-center justify-center flex-shrink-0">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-[#F1F5F9] font-semibold">Golden Paths & Recursos</h1>
                <p className="text-sm text-[#94A3B8] mt-1">Catálogo de soluções padronizadas e gerenciamento de recursos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
               <TabsList className="bg-[#0A0E1A] border border-[#1E293B]">
                <TabsTrigger value="catalog">Catálogo</TabsTrigger>
                <TabsTrigger value="resources">Meus Recursos</TabsTrigger>
              </TabsList>

              <button 
                id="btn-new-path"
                onClick={() => setIsNewPathModalOpen(true)}
                className="px-4 py-2 bg-[#A855F7] justify-center hover:bg-[#9333EA] text-white rounded-lg transition-colors flex items-center gap-2 flex-shrink-0 whitespace-nowrap"
              >
                <span>Solicitar Novo Caminho</span>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <TabsContent value="catalog" className="mt-0">
             {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                { label: 'Total de Caminhos', value: '24', color: '#A855F7' },
                { label: 'Publicações Ativas', value: '142', color: '#00D9FF' },
                { label: 'Tempo Médio de Publicação', value: '11m', color: '#10B981' },
                { label: 'Taxa de Sucesso', value: '99.2%', color: '#F59E0B' },
                ].map((stat, i) => (
                <div key={i} className="bg-[#131827] border border-[#1E293B] rounded-xl p-4">
                    <div className="text-sm text-[#94A3B8] mb-2">{stat.label}</div>
                    <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                </div>
                ))}
            </div>

            {/* Golden Paths Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paths.map((path, i) => (
                <div 
                    key={i} 
                    className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6 hover:border-[#94A3B8]/50 transition-all group cursor-pointer"
                >
                    <div className="flex items-start gap-4 mb-4">
                    <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${path.color}20` }}
                    >
                        <img src={path.logo} alt={path.name} className="w-10 h-10 object-contain" style={{ color: path.color }} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg text-[#F1F5F9] font-semibold group-hover:text-[#00D9FF] transition-colors">
                            {path.name}
                        </h3>
                        {path.requiresApproval && (
                            <span className="text-xs px-2 py-0.5 rounded bg-[#F59E0B]/20 text-[#F59E0B]">
                            Aprovação
                            </span>
                        )}
                        </div>
                        <p className="text-sm text-[#94A3B8] leading-relaxed">
                        {path.description}
                        </p>
                    </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                    {path.techStack.map((tech, j) => (
                        <span key={j} className="text-xs px-2 py-0.5 rounded bg-[#0A0E1A] text-[#94A3B8] border border-[#1E293B]">
                        {tech}
                        </span>
                    ))}
                    </div>

                    <div className="flex items-center gap-6 pt-4 border-t border-[#1E293B]">
                    <div>
                        <div className="text-xs text-[#94A3B8] mb-1">Usos</div>
                        <div className="text-lg text-[#F1F5F9] font-semibold">{path.uses}</div>
                    </div>
                    <div>
                        <div className="text-xs text-[#94A3B8] mb-1">Tempo</div>
                        <div className="text-lg text-[#F1F5F9] font-semibold">{path.avgTime}</div>
                    </div>
                    <div>
                        <div className="text-xs text-[#94A3B8] mb-1">Custo/mês</div>
                        <div className="text-lg text-[#10B981] font-semibold">R$ {path.custoMensal.toLocaleString()}</div>
                    </div>
                    <button 
                        onClick={() => handleDeploy(path)}
                        className="ml-auto px-4 py-2 rounded-lg transition-colors hover:opacity-80"
                        style={{ 
                        backgroundColor: `${path.color}20`,
                        color: path.color
                        }}
                    >
                        Implantar
                    </button>
                    </div>
                </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-0">
             <div className="bg-[#131827] border border-[#1E293B] rounded-2xl overflow-hidden mt-6">
               <div className="flex items-center gap-1 border-b border-[#1E293B] px-6">
                  {[
                    { id: 'repos', label: 'Repositórios', icon: GitBranch },
                    { id: 'services', label: 'Serviços', icon: Server },
                    { id: 'databases', label: 'Banco de Dados', icon: Database },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveResourceTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeResourceTab === tab.id
                          ? 'border-[#10B981] text-[#F1F5F9]'
                          : 'border-transparent text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[#1E293B]'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
               </div>

                {activeResourceTab === 'repos' && (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {repos.map(repo => (
                          <div key={repo.id} className="bg-[#0A0E1A] border border-[#1E293B] rounded-xl p-4 flex flex-col gap-3 hover:border-[#94A3B8]/50 transition-colors cursor-pointer">
                              <div className="flex items-start justify-between">
                                  <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-lg bg-[#1E293B] flex items-center justify-center">
                                          <img src={repo.logo} alt={repo.name} className="w-10 object-contain h-10 text-[#94A3B8]" />
                                      </div>
                                      <div>
                                          <div className="font-medium text-[#F1F5F9]">{repo.name}</div>
                                          <div className="text-xs text-[#94A3B8]">{repo.type}</div>
                                      </div>
                                  </div>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-[#94A3B8] pt-2 border-t border-[#1E293B]">
                                  <span>Last update: {repo.lastUpdate}</span>
                                  <span>Stars: {repo.stars}</span>
                              </div>
                          </div>
                      ))}
                  </div>
                )}

                {activeResourceTab === 'services' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#0A0E1A] border-b border-[#1E293B]">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-[#94A3B8] uppercase">Recurso</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[#94A3B8] uppercase">Ambiente</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[#94A3B8] uppercase">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[#94A3B8] uppercase">Health</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[#94A3B8] uppercase">Criado em</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[#94A3B8] uppercase text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1E293B]">
                                {services.map((resource) => (
                                    <tr key={resource.id} className="hover:bg-[#1E293B]/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-[#0A0E1A] border border-[#1E293B] flex items-center justify-center">
                                                    <Server className="w-4 h-4 text-[#A855F7]" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-[#F1F5F9]">{resource.name}</div>
                                                    <div className="text-xs text-[#94A3B8]">{resource.type}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs px-2 py-1 rounded-full border ${
                                                resource.env === 'production' ? 'bg-red-500/10 border-red-500/30 text-red-500' :
                                                resource.env === 'staging' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' :
                                                'bg-blue-500/10 border-blue-500/30 text-blue-500'
                                            }`}>
                                                {resource.env === 'production' ? 'Production' :
                                                    resource.env === 'staging' ? 'Staging' : 'Development'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {resource.status === 'running' && <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>}
                                                {resource.status === 'testing' && <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse"></div>}
                                                <span className="text-sm text-[#F1F5F9] capitalize">
                                                    {resource.status === 'testing' ? 'Em Testes' : resource.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Activity className="w-4 h-4" style={{ color: getHealthColor(resource.health) }} />
                                                <span className="text-sm" style={{ color: getHealthColor(resource.health) }}>
                                                    {resource.health === 'healthy' ? 'Saudável' : 
                                                        resource.health === 'degraded' ? 'Degradado' : 'Crítico'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-[#94A3B8] text-sm">
                                                <Clock className="w-4 h-4" />
                                                {resource.createdAt}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-[#00D9FF] text-sm hover:underline">Ver Detalhes</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                          {services.length === 0 && (
                            <div className="p-12 text-center text-[#94A3B8]">
                                <Server className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p>Nenhum serviço implantado ainda.</p>
                            </div>
                        )}
                    </div>
                )}

                {activeResourceTab === 'databases' && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#0A0E1A] border-b border-[#1E293B]">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-[#94A3B8] uppercase">Banco de Dados</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[#94A3B8] uppercase">Tipo</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[#94A3B8] uppercase">Ambiente</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-[#94A3B8] uppercase">Status</th>
                                      <th className="px-6 py-4 text-xs font-semibold text-[#94A3B8] uppercase text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1E293B]">
                                {dbMocks.map((db) => (
                                    <tr key={db.id} className="hover:bg-[#1E293B]/30 transition-colors">
                                        <td className="px-6 py-4 text-[#F1F5F9] font-medium">{db.name}</td>
                                        <td className="px-6 py-4 text-[#94A3B8] text-sm">{db.type}</td>
                                        <td className="px-6 py-4">
                                              <span className={`text-xs px-2 py-1 rounded-full border ${
                                                db.env === 'production' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'
                                            }`}>
                                                {db.env}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[#10B981] flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                                            {db.status}
                                        </td>
                                          <td className="px-6 py-4 text-right">
                                            <button className="text-[#00D9FF] text-sm hover:underline">Gerenciar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
             </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Deploy Modal */}
      <Modal isOpen={isModalOpen} onClose={() => !isDeploying && setIsModalOpen(false)} title={`Implantar ${selectedPath?.name || ''}`}>
        {!isDeploying ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-[#94A3B8] mb-2">Ambiente de Destino</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'development', label: 'Desenvolvimento', multiplier: 0.5 },
                  { id: 'staging', label: 'Homologação', multiplier: 0.7 },
                  { id: 'production', label: 'Produção', multiplier: 1 }
                ].map(env => (
                  <button
                    key={env.id}
                    onClick={() => setSelectedEnv(env.id)}
                    className={`py-2 px-3 rounded-lg border text-sm transition-colors ${
                      selectedEnv === env.id 
                        ? 'bg-[#00D9FF]/10 border-[#00D9FF] text-[#00D9FF]' 
                        : 'border-[#1E293B] text-[#94A3B8] hover:border-[#94A3B8]'
                    }`}
                  >
                    {env.label}
                  </button>
                ))}
              </div>
            </div>

            {/* FinOps Predictor */}
            <div className="bg-gradient-to-r from-[#A855F7]/10 to-[#00D9FF]/10 border border-[#A855F7]/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-[#A855F7]" />
                <span className="text-sm font-semibold text-[#F1F5F9]">Estimativa de Custo (FinOps)</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#0A0E1A]/50 rounded-lg p-3">
                  <div className="text-xs text-[#94A3B8] mb-1">Custo Mensal</div>
                  <div className="text-xl font-bold text-[#10B981]">
                    R$ {((selectedPath?.custoMensal || 0) * (selectedEnv === 'development' ? 0.5 : selectedEnv === 'staging' ? 0.7 : 1)).toLocaleString()}
                  </div>
                </div>
                <div className="bg-[#0A0E1A]/50 rounded-lg p-3">
                  <div className="text-xs text-[#94A3B8] mb-1">Custo Anual Projetado</div>
                  <div className="text-xl font-bold text-[#00D9FF]">
                    R$ {((selectedPath?.custoMensal || 0) * 12 * (selectedEnv === 'development' ? 0.5 : selectedEnv === 'staging' ? 0.7 : 1)).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* AI Cost Suggestion */}
              <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg p-3 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-[#10B981] font-semibold">Sugestão IA: </span>
                  <span className="text-[#94A3B8]">
                    Use instâncias Spot para economizar até 70% no ambiente de {selectedEnv === 'development' ? 'desenvolvimento' : selectedEnv === 'staging' ? 'homologação' : 'produção'}.
                    {selectedPath?.custoMensal && selectedPath.custoMensal > 800 && ' Considere também Reserved Instances para workloads estáveis.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Approval Gate Warning */}
            {selectedPath?.requiresApproval && (
              <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-[#F59E0B] mb-1">Approval Gate Necessário</div>
                    <p className="text-xs text-[#94A3B8] mb-3">
                      Este template possui custo elevado e requer aprovação prévia do FinOps Team antes do provisionamento.
                    </p>
                    {!approvalRequested ? (
                      <button
                        onClick={() => {
                          setApprovalRequested(true);
                          showToast('Solicitação de aprovação enviada para o FinOps Team', 'success');
                        }}
                        className="text-xs px-3 py-1.5 bg-[#F59E0B]/20 text-[#F59E0B] hover:bg-[#F59E0B]/30 rounded transition-colors"
                      >
                        Solicitar Aprovação
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-[#10B981]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Aprovação solicitada - aguardando resposta</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-4">
              <div className="text-xs text-[#94A3B8] mb-2">Configuração</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Template:</span>
                  <span className="text-[#F1F5F9]">{selectedPath?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Tempo estimado:</span>
                  <span className="text-[#F1F5F9]">{selectedPath?.avgTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Ambiente:</span>
                  <span className="text-[#00D9FF]">
                    {selectedEnv === 'development' ? 'Desenvolvimento' : 
                     selectedEnv === 'staging' ? 'Homologação' : 'Produção'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={startDeploy}
                disabled={selectedPath?.requiresApproval && !approvalRequested}
                className={`flex-1 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  selectedPath?.requiresApproval && !approvalRequested
                    ? 'bg-[#1E293B] text-[#94A3B8] cursor-not-allowed'
                    : 'bg-[#10B981] hover:bg-[#059669] text-white'
                }`}
              >
                <Rocket className="w-4 h-4" />
                {selectedPath?.requiresApproval && !approvalRequested ? 'Aguardando Aprovação' : 'Iniciar Deploy'}
              </button>
              <button
                onClick={() => { setIsModalOpen(false); setApprovalRequested(false); }}
                className="px-4 py-3 border border-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-[#00D9FF] animate-spin" />
              <span className="text-sm text-[#F1F5F9]">{deployStage}</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#94A3B8]">Progresso</span>
                <span className="text-[#00D9FF]">{deployProgress}%</span>
              </div>
              <div className="h-3 bg-[#1E293B] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00D9FF] to-[#A855F7] rounded-full transition-all duration-200"
                  style={{ width: `${deployProgress}%` }}
                />
              </div>
            </div>

            {deployProgress >= 100 && (
              <div className="flex items-center gap-2 text-[#10B981]">
                <CheckCircle2 className="w-5 h-5" />
                <span>Deploy concluído com sucesso!</span>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* New Path Modal */}
      <Modal isOpen={isNewPathModalOpen} onClose={() => setIsNewPathModalOpen(false)} title="Solicitar Novo Caminho Padrão">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#94A3B8] mb-1">Nome do Template</label>
            <input 
              type="text"
              value={newPathName}
              onChange={(e) => setNewPathName(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F1F5F9] focus:outline-none focus:border-[#00D9FF]"
              placeholder="Ex: Redis Cache Cluster"
            />
          </div>
          <div>
            <label className="block text-sm text-[#94A3B8] mb-1">Descrição da Solução</label>
            <textarea 
              value={newPathDesc}
              onChange={(e) => setNewPathDesc(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F1F5F9] focus:outline-none focus:border-[#00D9FF] h-24 resize-none"
              placeholder="Descreva a infraestrutura, dependências e configurações..."
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleCreatePath}
              className="flex-1 bg-[#A855F7] hover:bg-[#9333EA] text-white py-2 rounded-lg transition-colors font-semibold"
            >
              Solicitar Caminho
            </button>
            <button
              onClick={() => setIsNewPathModalOpen(false)}
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

