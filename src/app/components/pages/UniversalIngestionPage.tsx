import { Database, Link, RefreshCw, CheckCircle2, XCircle, Clock, Settings } from 'lucide-react';
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
      logo: '🔄'
    },
    { 
      name: 'Azure Boards', 
      status: 'active', 
      lastSync: 'há 5 min',
      records: '892',
      logo: '📋'
    },
    { 
      name: 'Jira', 
      status: 'syncing', 
      lastSync: 'atualizando...',
      records: '2,341',
      logo: '🎯'
    },
    { 
      name: 'GitHub', 
      status: 'active', 
      lastSync: 'há 1 min',
      records: '5,678',
      logo: '💻'
    },
    { 
      name: 'GitLab', 
      status: 'error', 
      lastSync: 'há 1 hora',
      records: '0',
      logo: '🦊'
    },
    { 
      name: 'PagerDuty', 
      status: 'active', 
      lastSync: 'há 10 min',
      records: '156',
      logo: '🚨'
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
              <h1 className="text-2xl text-[#F1F5F9] font-semibold">Hub de Ingestão Universal</h1>
              <p className="text-sm text-[#94A3B8] mt-1">Central de dados integrada com todas as ferramentas</p>
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
                <div className="w-12 h-12 bg-[#1E293B] rounded-lg flex items-center justify-center text-2xl">
                  {integration.logo}
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
                <SelectItem value="New Relic">New Relic</SelectItem>
                <SelectItem value="Datadog">Datadog</SelectItem>
                <SelectItem value="AWS">AWS CloudWatch</SelectItem>
                <SelectItem value="Jenkins">Jenkins</SelectItem>
                <SelectItem value="SonarQube">SonarQube</SelectItem>
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
