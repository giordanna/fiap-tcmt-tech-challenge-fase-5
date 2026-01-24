import { FinOpsChart } from '@/app/components/FinOpsChart';
import { DollarSign, TrendingDown, AlertTriangle, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { Modal } from '@/app/components/Modal';
import { useToast } from '@/app/components/Toast';

const anomalyData = [
  { date: '30.03', dev: 45, terrablade: 120 },
  { date: '02.05', dev: 78, terrablade: 95 },
  { date: '05.07', dev: 125, terrablade: 110 },
  { date: '08.09', dev: 92, terrablade: 140 },
  { date: '11.11', dev: 88, terrablade: 105 },
  { date: '14.13', dev: 110, terrablade: 130 },
  { date: '17.15', dev: 95, terrablade: 115 },
  { date: '20.17', dev: 102, terrablade: 125 },
];

export function FinOpsPage() {
  const { showToast } = useToast();
  const [isCostSavingModalOpen, setIsCostSavingModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleApplyCostSaving = () => {
    setIsCostSavingModalOpen(false);
    showToast('Política de agendamento aplicada. Economia estimada: R$ 1.2k/mês', 'success');
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-[#F1F5F9] font-semibold">FinOps & Observabilidade</h1>
            <p className="text-sm text-[#94A3B8] mt-1">Otimização de custos e monitoramento</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Gasto Mensal', value: 'R$ 32.5k', change: '-8%', color: '#10B981' },
          { label: 'Otimizações Encontradas', value: '7', change: 'novo', color: '#00D9FF' },
          { label: 'Economia Potencial', value: 'R$ 2.1k', change: '+12%', color: '#A855F7' },
          { label: 'Anomalias de Custo', value: '2', change: 'ativo', color: '#F59E0B' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#131827] border border-[#1E293B] rounded-xl p-4">
            <div className="text-sm text-[#94A3B8] mb-2">{stat.label}</div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-[#F1F5F9]">{stat.value}</div>
              <div className="text-sm" style={{ color: stat.color }}>{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <FinOpsChart />

      {/* Cost Anomaly Detection */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg text-[#F1F5F9] font-semibold mb-1">Detecção de Anomalias de Custo</h3>
            <p className="text-sm text-[#94A3B8]">Análise de padrões de gasto com IA</p>
          </div>
          <div className="flex items-center gap-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-3 py-1.5 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-sm text-[#F59E0B] font-semibold">2 Anomalias</span>
          </div>
        </div>

        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={anomalyData}>
              <defs>
                <linearGradient id="colorDev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00D9FF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTerrablade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="date" stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#131827', 
                  border: '1px solid #1E293B',
                  borderRadius: '8px',
                  color: '#F1F5F9'
                }}
                labelStyle={{ color: '#94A3B8' }}
                itemStyle={{ color: '#F1F5F9' }}
              />
              <Area 
                type="monotone" 
                dataKey="dev" 
                stroke="#00D9FF" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorDev)" 
                name="Ambiente Dev"
              />
              <Area 
                type="monotone" 
                dataKey="terrablade" 
                stroke="#10B981" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorTerrablade)"
                name="Recursos Ociosos"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Recommendations */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#A855F7] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#A855F7] font-semibold mb-1">RECOMENDAÇÃO IA</div>
                <p className="text-sm text-[#F1F5F9] mb-2">
                  Ambiente Terrablade possui <span className="text-[#F59E0B]">recursos ociosos</span> consumindo R$ 890/mês
                </p>
                <button 
                  onClick={() => setIsDetailsModalOpen(true)}
                  className="text-xs text-[#A855F7] hover:text-[#C084FC] transition-colors"
                  id="btn-view-anomaly"
                >
                  Ver Detalhes →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#10B981] font-semibold mb-1">ECONOMIA DE CUSTO</div>
                <p className="text-sm text-[#F1F5F9] mb-2">
                  Agendar ambientes de não-produção para economizar <span className="text-[#10B981] font-semibold">R$ 1.2k/mês</span>
                </p>
                <button 
                  onClick={() => setIsCostSavingModalOpen(true)}
                  className="text-xs text-[#10B981] hover:text-[#34D399] transition-colors"
                  id="btn-apply-savings"
                >
                  Aplicar Agora →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isCostSavingModalOpen} onClose={() => setIsCostSavingModalOpen(false)} title="Aplicar Política de Economia">
        <div className="space-y-4">
          <div className="p-4 bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl">
            <h4 className="text-[#10B981] font-semibold mb-2">Shutdown Automático</h4>
            <p className="text-sm text-[#F1F5F9]">
              Deseja configurar o desligamento automático dos ambientes de desenvolvimento e staging fora do horário comercial (20h - 08h e finais de semana)?
            </p>
          </div>
          <div className="bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#94A3B8]">Economia Estimada:</span>
              <span className="text-[#10B981] font-bold">R$ 1.250,00 / mês</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#94A3B8]">Impacto:</span>
              <span className="text-[#F59E0B]">Baixo (Dev/Staging)</span>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleApplyCostSaving}
              className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white py-2 rounded-lg transition-colors"
            >
              Confirmar e Aplicar
            </button>
            <button
              onClick={() => setIsCostSavingModalOpen(false)}
              className="px-4 py-2 border border-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title="Detalhes da Anomalia - Terrablade">
        <div className="space-y-4">
          <div className="bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
              <h4 className="text-sm text-[#F1F5F9] font-bold">Recursos Ociosos Detectados</h4>
            </div>
            <p className="text-sm text-[#94A3B8] mb-3">
              A IA detectou 3 instâncias `t3.large` no ambiente de staging com utilização de CPU &lt; 5% nos últimos 7 dias.
            </p>
            <div className="flex items-center justify-between text-xs bg-[#1E293B] p-2 rounded">
              <span className="text-[#94A3B8]">Custo Desperdiçado:</span>
              <span className="text-[#EF4444] font-mono">R$ 890,00 / mês</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-xs text-[#94A3B8] font-semibold uppercase">Ação Recomendada</h5>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  showToast('Instâncias redimensionadas para t3.micro', 'success');
                }}
                className="flex-1 bg-[#A855F7] hover:bg-[#9333EA] text-white text-sm py-2 rounded-lg transition-colors"
              >
                Downsize (t3.micro)
              </button>
              <button 
                onClick={() => {
                  setIsDetailsModalOpen(false);
                  showToast('Instâncias terminadas com sucesso', 'success');
                }}
                className="flex-1 border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10 text-sm py-2 rounded-lg transition-colors"
              >
                Terminar Instâncias
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
