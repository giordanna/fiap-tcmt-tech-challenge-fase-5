import { useState, useEffect } from 'react';
import { Server, Database, GitBranch, Activity, Clock, Box } from 'lucide-react';
import { DeployedResource } from '@/app/types';

interface ResourcesPageProps {
  resources: DeployedResource[];
}

export function ResourcesPage({ resources }: ResourcesPageProps) {
  const [activeTab, setActiveTab] = useState<'repos' | 'services' | 'databases'>('repos');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const getHealthColor = (health: string) => {
    if (health === 'healthy') return '#10B981';
    if (health === 'degraded') return '#F59E0B';
    return '#EF4444';
  };

  const services = resources.filter(r => r.category === 'service' || !r.category); // Fallback for existing mock data
  const dbs = resources.filter(r => r.category === 'database');
  const repos = [
    { id: '1', name: 'fiap-tech-challenge', type: 'GitHub', logo: 'https://cdn.worldvectorlogo.com/logos/github-icon-2.svg', stars: 12, lastUpdate: '2h ago' },
    { id: '2', name: 'payment-gateway', type: 'GitLab', logo: 'https://cdn.worldvectorlogo.com/logos/gitlab.svg', stars: 5, lastUpdate: '1d ago' },
    { id: '3', name: 'auth-service', type: 'GitHub', logo: 'https://cdn.worldvectorlogo.com/logos/github-icon-2.svg', stars: 8, lastUpdate: '3d ago' },
  ];

  const dbMocks = [
      { id: 'db1', name: 'CustomerDB PROD', type: 'PostgreSQL (RDS)', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg', env: 'production', status: 'running', health: 'healthy', createdAt: '2026-01-15' },
      { id: 'db2', name: 'CustomerDB STG', type: 'PostgreSQL (RDS)',logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg',  env: 'staging', status: 'running', health: 'healthy', createdAt: '2025-02-20' },
  ];

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center flex-shrink-0">
            <Server className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-[#F1F5F9] font-semibold">Meus Recursos</h1>
            <p className="text-sm text-[#94A3B8] mt-1">Gerencie seus serviços, bancos de dados e repositórios</p>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-8 border-b border-[#1E293B]">
          {[
            { id: 'repos', label: 'Repositórios', icon: GitBranch },
            { id: 'services', label: 'Serviços', icon: Server },
            { id: 'databases', label: 'Banco de Dados', icon: Database },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#10B981] text-[#F1F5F9]'
                  : 'border-transparent text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[#1E293B]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl overflow-hidden">
        {activeTab === 'repos' && (
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

        {activeTab === 'services' && (
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

        {activeTab === 'databases' && (
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
    </div>
  );
}
