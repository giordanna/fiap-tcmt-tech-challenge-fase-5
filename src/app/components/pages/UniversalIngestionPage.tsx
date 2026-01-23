import { Database, Link, RefreshCw, CheckCircle2, XCircle, Clock } from 'lucide-react';

export function UniversalIngestionPage() {
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
      lastSync: '5 min ago',
      records: '892',
      logo: '📋'
    },
    { 
      name: 'Jira', 
      status: 'syncing', 
      lastSync: 'sincronizando...',
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
      lastSync: '10 min ago',
      records: '156',
      logo: '🚨'
    },
  ];

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#0EA5E9] flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-[#F1F5F9] font-semibold">Hub de Ingestão Universal</h1>
              <p className="text-sm text-[#94A3B8] mt-1">Pipeline de dados centralizado de todas as ferramentas</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] rounded-lg transition-colors flex items-center gap-2">
            <Link className="w-4 h-4" />
            <span>Adicionar Integração</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total de Integrações', value: '12', color: '#00D9FF' },
          { label: 'Fontes Ativas', value: '9', color: '#10B981' },
          { label: 'Registros Sincronizados', value: '10.3k', color: '#A855F7' },
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
              <div className="text-lg text-[#F1F5F9] font-semibold">{integration.records}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
