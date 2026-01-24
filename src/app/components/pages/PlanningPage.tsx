import { Calendar, Users, AlertCircle, Clock, CheckCircle2, XCircle, Plus, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { useState } from 'react';
import { Modal } from '@/app/components/Modal';
import { useToast } from '@/app/components/Toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

const capacityData = [
  { name: 'Ana Silva', allocated: 28, available: 32, total: 40 },
  { name: 'Bruno Costa', allocated: 30, available: 32, total: 40 },
  { name: 'Carlos Dias', allocated: 25, available: 32, total: 40 },
  { name: 'Daniel Lima', allocated: 32, available: 32, total: 40 },
  { name: 'Elena Rocha', allocated: 27, available: 32, total: 40 },
  { name: 'Felipe Santos', allocated: 31, available: 32, total: 40 },
];

export function PlanningPage() {
  const { showToast } = useToast();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isRedistributeModalOpen, setIsRedistributeModalOpen] = useState(false);
  
  // New Request State
  const [requestType, setRequestType] = useState('Infra');
  const [requestTitle, setRequestTitle] = useState('');
  const [requestPriority, setRequestPriority] = useState('medium');

  const dependencies = [
    {
      id: 'DEP-001',
      type: 'DBA',
      title: 'Criação de schema PostgreSQL para Analytics',
      requester: 'Bruno Costa',
      status: 'approved',
      sla: '2h restantes',
      priority: 'high',
    },
    {
      id: 'DEP-002',
      type: 'Infra',
      title: 'Provisionamento cluster K8s para staging',
      requester: 'Ana Silva',
      status: 'pending',
      sla: '12h restantes',
      priority: 'medium',
    },
    {
      id: 'DEP-003',
      type: 'DBA',
      title: 'Otimização de índices - API Gateway',
      requester: 'Carlos Dias',
      status: 'in_progress',
      sla: '6h restantes',
      priority: 'high',
    },
    {
      id: 'DEP-004',
      type: 'Infra',
      title: 'Configuração VPN para acesso externo',
      requester: 'Elena Rocha',
      status: 'blocked',
      sla: 'SLA excedido',
      priority: 'critical',
    },
    {
      id: 'DEP-005',
      type: 'Security',
      title: 'Review de vulnerabilidades Nexus',
      requester: 'Daniel Lima',
      status: 'approved',
      sla: '1h restante',
      priority: 'medium',
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return { bg: '#10B981', text: 'Aprovado', icon: CheckCircle2 };
      case 'pending':
        return { bg: '#F59E0B', text: 'Pendente', icon: Clock };
      case 'in_progress':
        return { bg: '#00D9FF', text: 'Em Progresso', icon: Clock };
      case 'blocked':
        return { bg: '#EF4444', text: 'Bloqueado', icon: XCircle };
      default:
        return { bg: '#94A3B8', text: 'Desconhecido', icon: AlertCircle };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#00D9FF';
      default: return '#94A3B8';
    }
  };

  const handleCreateRequest = () => {
    setIsRequestModalOpen(false);
    showToast(`Solicitação DEP-${Math.floor(Math.random() * 1000)} criada com sucesso`, 'success');
    setRequestTitle('');
  };

  const handleRedistribute = () => {
    setIsRedistributeModalOpen(false);
    showToast('Carga de trabalho redistribuída automaticamente', 'success');
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#0EA5E9] flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-[#F1F5F9] font-semibold">Planejamento & Capacidade</h1>
            <p className="text-sm text-[#94A3B8] mt-1">Gestão de recursos e dependências</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Capacidade Total', value: '192h', sublabel: '6 devs × 32h', color: '#00D9FF' },
          { label: 'Alocação Atual', value: '173h', sublabel: '90% utilizado', color: '#10B981' },
          { label: 'Buffer Disponível', value: '19h', sublabel: 'Reserva estratégica', color: '#A855F7' },
          { label: 'Dependências Ativas', value: '5', sublabel: '1 bloqueada', color: '#F59E0B' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#131827] border border-[#1E293B] rounded-xl p-4">
            <div className="text-sm text-[#94A3B8] mb-2">{stat.label}</div>
            <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-[#94A3B8]">{stat.sublabel}</div>
          </div>
        ))}
      </div>

      {/* Capacity Chart */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-xl text-[#F1F5F9] font-semibold mb-1">Capacidade do Time</h2>
          <p className="text-sm text-[#94A3B8]">
            Regra <span className="text-[#00D9FF] font-semibold">32h/40h</span>: 8h reservadas para "afiar o instrumento" (estudos, refactoring, tech debt)
          </p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={capacityData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis type="number" stroke="#94A3B8" style={{ fontSize: '12px' }} domain={[0, 40]} />
              <YAxis type="category" dataKey="name" stroke="#94A3B8" style={{ fontSize: '12px' }} width={100} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#131827', 
                  border: '1px solid #1E293B',
                  borderRadius: '8px',
                  color: '#F1F5F9'
                }}
                labelStyle={{ color: '#94A3B8' }}
                itemStyle={{ color: '#F1F5F9' }}
                cursor={{ fill: 'rgba(30, 41, 59, 0.5)' }}
                formatter={(value: number) => `${value}h`}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <ReferenceLine x={32} stroke="#00D9FF" strokeDasharray="3 3" label={{ value: 'Limite 32h', fill: '#00D9FF', fontSize: 12 }} />
              <Bar dataKey="allocated" fill="#00D9FF" name="Alocado" radius={[0, 4, 4, 0]} />
              <Bar dataKey="available" fill="#1E293B" name="Disponível (até 32h)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 p-4 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-xl">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-[#A855F7] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm text-[#F1F5F9] mb-1">
                <span className="text-[#A855F7] font-semibold">Insight:</span> Daniel Lima está no limite (32h). 
                Considere redistribuir workload ou adiar tarefas não-críticas.
              </div>
              <button 
                onClick={() => setIsRedistributeModalOpen(true)}
                className="text-xs text-[#A855F7] hover:text-[#C084FC] transition-colors mt-2 underline"
              >
                Ver Sugestões de Redistribuição →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dependencies Management */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl text-[#F1F5F9] font-semibold mb-1">Gestão de Dependências</h2>
            <p className="text-sm text-[#94A3B8]">Rastreamento de solicitações para DBAs e Infraestrutura</p>
          </div>
          <button 
            id="btn-new-request"
            onClick={() => setIsRequestModalOpen(true)}
            className="px-4 py-2 bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Solicitação</span>
          </button>
        </div>

        <div className="space-y-3">
          {dependencies.map((dep) => {
            const statusConfig = getStatusConfig(dep.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <div 
                key={dep.id}
                className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-xl p-4 hover:border-[#94A3B8]/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Priority Indicator */}
                  <div 
                    className="w-1 h-full rounded-full flex-shrink-0"
                    style={{ backgroundColor: getPriorityColor(dep.priority) }}
                  ></div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-[#94A3B8]">{dep.id}</span>
                          <span 
                            className="text-xs px-2 py-0.5 rounded font-semibold"
                            style={{ 
                              backgroundColor: `${statusConfig.bg}20`,
                              color: statusConfig.bg 
                            }}
                          >
                            {dep.type}
                          </span>
                        </div>
                        <h3 className="text-sm text-[#F1F5F9] font-semibold mb-1">{dep.title}</h3>
                        <div className="text-xs text-[#94A3B8]">
                          Solicitante: <span className="text-[#00D9FF]">@{dep.requester}</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div 
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: `${statusConfig.bg}20` }}
                      >
                        <StatusIcon className="w-4 h-4" style={{ color: statusConfig.bg }} />
                        <span className="text-sm font-semibold" style={{ color: statusConfig.bg }}>
                          {statusConfig.text}
                        </span>
                      </div>
                    </div>

                    {/* SLA */}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1E293B]">
                      <Clock className="w-4 h-4 text-[#94A3B8]" />
                      <span className={`text-sm ${
                        dep.status === 'blocked' ? 'text-[#EF4444]' : 'text-[#94A3B8]'
                      }`}>
                        SLA: {dep.sla}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* New Request Modal */}
      <Modal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)} title="Nova Solicitação de Dependência">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#94A3B8] mb-1">Tipo de Dependência</label>
            <div className="grid grid-cols-3 gap-2">
              {['Infra', 'DBA', 'Security'].map(type => (
                <button
                  key={type}
                  onClick={() => setRequestType(type)}
                  className={`py-2 px-3 rounded-lg border text-sm transition-colors ${
                    requestType === type 
                      ? 'bg-[#00D9FF]/10 border-[#00D9FF] text-[#00D9FF]' 
                      : 'border-[#1E293B] text-[#94A3B8] hover:border-[#94A3B8]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#94A3B8] mb-1">Título da Solicitação</label>
            <input 
              type="text"
              value={requestTitle}
              onChange={(e) => setRequestTitle(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F1F5F9] focus:outline-none focus:border-[#00D9FF]"
              placeholder="Ex: Provisionar novo bucket S3"
            />
          </div>
          <div>
            <label className="block text-sm text-[#94A3B8] mb-1">Prioridade</label>
            <Select value={requestPriority} onValueChange={setRequestPriority}>
              <SelectTrigger className="w-full bg-[#0A0E1A] border border-[#1E293B] text-[#F1F5F9]">
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="critical">Crítica</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleCreateRequest}
              className="flex-1 bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] font-semibold py-2 rounded-lg transition-colors"
            >
              Criar Solicitação
            </button>
            <button
              onClick={() => setIsRequestModalOpen(false)}
              className="px-4 py-2 border border-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      {/* Redistribute Modal */}
      <Modal isOpen={isRedistributeModalOpen} onClose={() => setIsRedistributeModalOpen(false)} title="Sugestão de Redistribuição (IA)">
        <div className="space-y-6">
          <div className="p-4 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-xl">
            <p className="text-sm text-[#F1F5F9]">
              Identificamos que <span className="text-[#A855F7] font-semibold">Daniel Lima</span> está sobrecarregado. 
              Sugerimos mover as seguintes tarefas para alinhar com a capacidade disponível:
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#0A0E1A] border border-[#1E293B] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-xs text-[#94A3B8]">DL</div>
                <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
                <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-xs text-[#94A3B8]">CD</div>
              </div>
              <div className="text-sm text-[#F1F5F9]">Review de PRs Backend</div>
              <div className="text-xs text-[#00D9FF] font-mono">4h</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#0A0E1A] border border-[#1E293B] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-xs text-[#94A3B8]">DL</div>
                <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
                <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-xs text-[#94A3B8]">AS</div>
              </div>
              <div className="text-sm text-[#F1F5F9]">Documentação API</div>
              <div className="text-xs text-[#00D9FF] font-mono">2h</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRedistribute}
              className="flex-1 bg-[#A855F7] hover:bg-[#9333EA] text-white py-2 rounded-lg transition-colors"
            >
              Aplicar Mudanças
            </button>
            <button
              onClick={() => setIsRedistributeModalOpen(false)}
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
