import { Database, Link, RefreshCw, CheckCircle2, XCircle, Clock, Settings, Sparkles, Copy, Tag, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '@/app/components/Modal';
import { useToast } from '@/app/components/Toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

export function UniversalIngestionPage() {
  const { showToast } = useToast();
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedConfigIntegration, setSelectedConfigIntegration] = useState<any>(null);
  const [selectedProvider, setSelectedProvider] = useState('');

  const handleConfigClick = (integration: any) => {
    setSelectedConfigIntegration(integration);
    setIsConfigModalOpen(true);
  };

  const integrations = [
    { 
      name: 'ServiceNow', 
      status: 'active', 
      lastSync: 'há 2 min',
      records: '1,247',
      logo: 'https://logosandtypes.com/wp-content/uploads/2020/12/servicenow.svg'
    },
    { 
      name: 'Azure DevOps', 
      status: 'active', 
      lastSync: 'há 5 min',
      records: '892',
      logo: 'https://tbxtech.com.br/wp-content/uploads/2024/11/1_uE6eLcrESeBC1E9hwKvuxQ.webp'
    },
    { 
      name: 'GitHub', 
      status: 'active', 
      lastSync: 'há 1 min',
      records: '5,678',
      logo: 'https://cdn.worldvectorlogo.com/logos/github-icon-2.svg'
    },
    { 
      name: 'Dynatrace', 
      status: 'active', 
      lastSync: 'há 30 seg',
      records: '24,892',
      logo: 'https://companieslogo.com/img/orig/DT-89e31c0c.png?t=1720244491'
    },
    { 
      name: 'Snowflake', 
      status: 'syncing', 
      lastSync: 'atualizando...',
      records: '156,234',
      logo: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/snowflake-color.png'
    },
  ];

  const handleAddIntegration = () => {
    setIsIntegrationModalOpen(false);
    showToast('Conector configurado e sincronizando dados', 'success');
    setSelectedProvider('');
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#0EA5E9] flex items-center justify-center flex-shrink-0">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-[#F1F5F9] font-semibold">Hub de Dados</h1>
              <p className="text-sm text-[#94A3B8] mt-1">Conexões com ferramentas que alimentam a plataforma</p>
            </div>
          </div>
          <button 
            id="btn-add-integration"
            onClick={() => setIsIntegrationModalOpen(true)}
            className="px-4 py-2 justify-center bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] rounded-lg transition-colors flex items-center gap-2 flex-shrink-0 whitespace-nowrap"
          >
            <span>Adicionar Integração</span>
            <Link className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total de Integrações', value: '12', color: '#00D9FF' },
          { label: 'Conexões Ativas', value: '9', color: '#10B981' },
          { label: 'Dados Sincronizados', value: '10.3k', color: '#A855F7' },
          { label: 'Taxa de Sucesso', value: '98.7%', color: '#F59E0B' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#131827] border border-[#1E293B] rounded-xl p-4">
            <div className="text-sm text-[#94A3B8] mb-2">{stat.label}</div>
            <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((integration, i) => (
          <div key={i} className="bg-[#131827] border border-[#1E293B] rounded-xl p-5 hover:border-[#94A3B8]/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1E293B] rounded-lg flex items-center justify-center p-2">
                  <img src={integration.logo} alt={integration.name} className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h3 className="text-[#F1F5F9] font-semibold">{integration.name}</h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">{integration.lastSync}</p>
                </div>
              </div>
              {integration.status === 'active' && (
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
              )}
              {integration.status === 'syncing' && (
                <RefreshCw className="w-5 h-5 text-[#00D9FF] animate-spin" />
              )}
              {integration.status === 'error' && (
                <XCircle className="w-5 h-5 text-[#EF4444]" />
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#1E293B]">
              <div className="text-sm text-[#94A3B8]">Registros</div>
              <div className="flex items-center gap-3">
                <div className="text-lg text-[#F1F5F9] font-semibold">{integration.records}</div>
                <button 
                  id={i === 0 ? "btn-config-integration-0" : undefined}
                  onClick={() => handleConfigClick(integration)}
                  className="p-1.5 hover:bg-[#1E293B] rounded-lg text-[#94A3B8] hover:text-[#00D9FF] transition-colors"
                  title="Configurar Integração"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
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
              <p className="text-xs text-[#94A3B8]">Classificação automática e detecção de duplicidades</p>
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
                        <CheckCircle2 className="w-3 h-3" /> Triagem completa
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
                        Card duplicado de: <span className="font-semibold">{demanda.duplicidade}</span>
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
            <div className="text-xs text-[#94A3B8]">Demandas duplicadas</div>
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

      <Modal isOpen={isConfigModalOpen} onClose={() => setIsConfigModalOpen(false)} title={`Configurar ${selectedConfigIntegration?.name || ''}`}>
        <div className="space-y-4">
          <div className="bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm text-[#F1F5F9] font-semibold">Status da Conexão</h4>
                <p className="text-xs text-[#94A3B8]">Última sincronização: {selectedConfigIntegration?.lastSync}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                selectedConfigIntegration?.status === 'active' ? 'bg-[#10B981]/20 text-[#10B981]' : 
                selectedConfigIntegration?.status === 'error' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 
                'bg-[#00D9FF]/20 text-[#00D9FF]'
              }`}>
                {selectedConfigIntegration?.status.toUpperCase()}
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1">Frequência de Atualização</label>
                <select className="w-full bg-[#1E293B] border border-[#1E293B] rounded px-2 py-1 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D9FF]">
                  <option>Tempo Real (Automático)</option>
                  <option>A cada 15 min</option>
                  <option>A cada 1 hora</option>
                </select>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-[#F1F5F9]">Organização Automática de Dados (IA)</span>
                <div className="w-10 h-5 bg-[#00D9FF] rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                setIsConfigModalOpen(false);
                showToast('Configurações salvas com sucesso', 'success');
              }}
              className="flex-1 bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] font-semibold py-2 rounded-lg transition-colors"
            >
              Salvar Alterações
            </button>
            <button
              onClick={() => {
                setIsConfigModalOpen(false);
                showToast('Teste de conexão realizado: OK', 'success');
              }}
              className="px-4 py-2 border border-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg transition-colors"
            >
              Testar Conexão
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isIntegrationModalOpen} onClose={() => setIsIntegrationModalOpen(false)} title="Adicionar Nova Integração">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#94A3B8] mb-1">Selecione o Provedor</label>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger className="w-full bg-[#0A0E1A] border border-[#1E293B] text-[#F1F5F9]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Terraform">Terraform</SelectItem>
                <SelectItem value="Azure Functions">Azure Functions</SelectItem>
                <SelectItem value="Azure Logic Apps">Azure Logic Apps</SelectItem>
                <SelectItem value="Qlik Sense">Qlik Sense</SelectItem>
                <SelectItem value="Backstage">Backstage</SelectItem>
                <SelectItem value="Webhook Customizado">Webhook Customizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campos adicionais para Webhook Customizado */}
          {selectedProvider === 'Webhook Customizado' && (
            <div className="space-y-3 p-4 bg-[#0A0E1A] border border-[#1E293B] rounded-xl">
              <h4 className="text-sm text-[#F1F5F9] font-semibold flex items-center gap-2">
                <span className="text-lg">🔗</span> Configuração do Webhook
              </h4>
              
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1">Nome da Integração</label>
                <input
                  type="text"
                  placeholder="Ex: Meu Sistema Interno"
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded px-3 py-2 text-sm text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#00D9FF]"
                />
              </div>
              
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1">URL do Webhook</label>
                <input
                  type="url"
                  placeholder="https://api.meuservico.com/webhook"
                  className="w-full bg-[#1E293B] border border-[#1E293B] rounded px-3 py-2 text-sm text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#00D9FF]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#94A3B8] mb-1">Método HTTP</label>
                  <Select defaultValue="POST">
                    <SelectTrigger className="w-full bg-[#1E293B] border border-[#1E293B] text-[#F1F5F9]">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs text-[#94A3B8] mb-1">Formato</label>
                  <Select defaultValue="JSON">
                    <SelectTrigger className="w-full bg-[#1E293B] border border-[#1E293B] text-[#F1F5F9]">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JSON">JSON</SelectItem>
                      <SelectItem value="XML">XML</SelectItem>
                      <SelectItem value="Form Data">Form Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1">Autenticação (opcional)</label>
                <Select defaultValue="Nenhuma">
                  <SelectTrigger className="w-full bg-[#1E293B] border border-[#1E293B] text-[#F1F5F9]">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nenhuma">Nenhuma</SelectItem>
                    <SelectItem value="API Key">API Key (Header)</SelectItem>
                    <SelectItem value="Bearer Token">Bearer Token</SelectItem>
                    <SelectItem value="Basic Auth">Basic Auth</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2 border-t border-[#1E293B]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#F1F5F9]">Mapeamento automático de campos (IA)</span>
                  <div className="w-10 h-5 bg-[#00D9FF] rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <p className="text-xs text-[#64748B] mt-1">A IA identifica e mapeia automaticamente os campos recebidos</p>
              </div>
            </div>
          )}
          
          {selectedProvider !== 'Webhook Customizado' && (
            <div className="p-4 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-xl flex items-start gap-3">
               <div className="w-8 h-8 rounded-lg bg-[#00D9FF] flex items-center justify-center flex-shrink-0 text-white">i</div>
               <p className="text-sm text-[#F1F5F9]">
                 A conexão segura será estabelecida via autenticação segura. Você será redirecionado para autorizar o acesso após clicar em "Conectar".
               </p>
            </div>
          )}

          {selectedProvider === 'Webhook Customizado' && (
            <div className="p-4 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-xl flex items-start gap-3">
               <div className="w-8 h-8 rounded-lg bg-[#A855F7] flex items-center justify-center flex-shrink-0 text-white">🔗</div>
               <p className="text-sm text-[#F1F5F9]">
                 Após configurar, você receberá um endpoint único para enviar dados. Nosso sistema processará automaticamente os payloads recebidos.
               </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddIntegration}
              disabled={!selectedProvider}
              className={`flex-1 py-2 rounded-lg transition-colors font-semibold ${
                selectedProvider 
                  ? 'bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A]' 
                  : 'bg-[#1E293B] text-[#94A3B8] cursor-not-allowed'
              }`}
            >
              {selectedProvider === 'Webhook Customizado' ? 'Criar Webhook' : `Conectar ${selectedProvider}`}
            </button>
            <button
              onClick={() => setIsIntegrationModalOpen(false)}
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
