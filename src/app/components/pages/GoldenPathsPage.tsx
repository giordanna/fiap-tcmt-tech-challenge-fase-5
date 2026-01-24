import { useState, useEffect } from 'react';
import { Workflow, Rocket, Database, Code, Shield, Zap, CheckCircle2, Loader2, Plus } from 'lucide-react';
import { Modal } from '@/app/components/Modal';
import { useToast } from '@/app/components/Toast';

interface Path {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  uses: number;
  avgTime: string;
}

export function GoldenPathsPage() {
  const { showToast } = useToast();
  const [selectedPath, setSelectedPath] = useState<Path | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewPathModalOpen, setIsNewPathModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);
  const [deployStage, setDeployStage] = useState('');
  const [selectedEnv, setSelectedEnv] = useState('staging');
  
  // New Path State
  const [newPathName, setNewPathName] = useState('');
  const [newPathDesc, setNewPathDesc] = useState('');

  const paths: Path[] = [
    {
      name: 'Kubernetes Cluster',
      description: 'Sistema de containers pronto para usar, com rede de serviços e monitoramento',
      icon: Database,
      color: '#00D9FF',
      uses: 47,
      avgTime: '12 min',
    },
    {
      name: 'Controle de Acesso a Serviços',
      description: 'Interface de serviços com autenticação e limite de requisições',
      icon: Code,
      color: '#A855F7',
      uses: 34,
      avgTime: '8 min',
    },
    {
      name: 'Microservice Template',
      description: 'Serviço pequeno com integração contínua e monitoramento',
      icon: Zap,
      color: '#10B981',
      uses: 89,
      avgTime: '15 min',
    },
    {
      name: 'Banco de Dados Seguro',
      description: 'Banco de dados PostgreSQL com segurança e cópias automáticas',
      icon: Shield,
      color: '#F59E0B',
      uses: 56,
      avgTime: '10 min',
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
            setIsModalOpen(false);
            setIsDeploying(false);
            showToast(`${selectedPath?.name} implantado com sucesso no ambiente ${selectedEnv === 'development' ? 'de desenvolvimento' : selectedEnv === 'staging' ? 'de homologação' : 'de produção'}!`, 'success');
          }, 500);
        }
        return Math.min(next, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isDeploying, selectedEnv, selectedPath, showToast]);

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] flex items-center justify-center flex-shrink-0">
              <Workflow className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-[#F1F5F9] font-semibold">Caminhos Padrão</h1>
              <p className="text-sm text-[#94A3B8] mt-1">Catálogo de soluções prontas para uso</p>
            </div>
          </div>
          <button 
            id="btn-new-path"
            onClick={() => setIsNewPathModalOpen(true)}
            className="px-4 py-2 bg-[#A855F7] justify-center hover:bg-[#9333EA] text-white rounded-lg transition-colors flex items-center gap-2 flex-shrink-0 whitespace-nowrap"
          >
           
            <span>Criar Novo Caminho</span>
             <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                <path.icon className="w-7 h-7" style={{ color: path.color }} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-[#F1F5F9] font-semibold mb-1 group-hover:text-[#00D9FF] transition-colors">
                  {path.name}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {path.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-[#1E293B]">
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">Usos</div>
                <div className="text-lg text-[#F1F5F9] font-semibold">{path.uses}</div>
              </div>
              <div>
                <div className="text-xs text-[#94A3B8] mb-1">Tempo Médio</div>
                <div className="text-lg text-[#F1F5F9] font-semibold">{path.avgTime}</div>
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

      {/* Deploy Modal */}
      <Modal isOpen={isModalOpen} onClose={() => !isDeploying && setIsModalOpen(false)} title={`Implantar ${selectedPath?.name || ''}`}>
        {!isDeploying ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-[#94A3B8] mb-2">Ambiente de Destino</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'development', label: 'Desenvolvimento' },
                  { id: 'staging', label: 'Homologação' },
                  { id: 'production', label: 'Produção' }
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
                className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4" />
                Iniciar Deploy
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
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
      <Modal isOpen={isNewPathModalOpen} onClose={() => setIsNewPathModalOpen(false)} title="Adicionar Novo Caminho Padrão">
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
              Criar Caminho
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

