import { TrendingUp, Users, DollarSign, Target, FileBarChart } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '@/app/components/Modal';
import { useToast } from '@/app/components/Toast';

export function ExecutiveSummary() {
  const { showToast } = useToast();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleExportReport = () => {
    setIsExportModalOpen(true);
  };

  const metrics = [
    {
      label: 'ROI Total',
      value: 'R$ 385k',
      change: '+24%',
      trend: 'up',
      icon: DollarSign,
      color: '#10B981',
      subtitle: 'Últimos 6 meses',
      highlight: true,
    },
    {
      label: 'NPS Interno',
      value: '8.5',
      change: '+1.2',
      trend: 'up',
      icon: Users,
      color: '#00D9FF',
      subtitle: 'Satisfação do time',
      subvalue: '/10',
      highlight: true,
    },
    {
      label: 'Taxa de Entregas no Prazo',
      value: '98.2%',
      change: '+5.3%',
      trend: 'up',
      icon: Target,
      color: '#A855F7',
      subtitle: 'Taxa de sucesso',
    },
    {
      label: 'Velocidade do Fluxo',
      value: '12.4 dias',
      change: '-38%',
      trend: 'up',
      icon: TrendingUp,
      color: '#F59E0B',
      subtitle: 'Tempo médio de entrega',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#131827] to-[#0F1624] border border-[#1E293B] rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl text-[#F1F5F9] font-semibold mb-1">Resumo Executivo</h2>
          <p className="text-sm text-[#94A3B8]">Indicadores para apresentação à diretoria</p>
        </div>
        <button 
          onClick={handleExportReport}
          className="px-4 justify-center py-2 bg-[#00D9FF]/10 hover:bg-[#00D9FF]/20 border border-[#00D9FF]/30 text-[#00D9FF] rounded-lg transition-colors text-sm flex items-center gap-2 flex-shrink-0 whitespace-nowrap"
        >
          <span>Exportar relatório</span>
          <FileBarChart className="w-4 h-4" />
        </button>
      </div>

      <Modal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} title="Exportar Relatório Executivo">
        <div className="space-y-4">
          <div className="p-4 bg-[#0A0E1A] border border-[#1E293B] rounded-xl text-center">
            <div className="w-12 h-12 rounded-full bg-[#00D9FF]/20 flex items-center justify-center mx-auto mb-3">
              <FileBarChart className="w-6 h-6 text-[#00D9FF]" />
            </div>
            <h3 className="text-[#F1F5F9] font-medium mb-1">Q1 2026 Executive Summary.pdf</h3>
            <p className="text-sm text-[#94A3B8]">Inclui análise de retorno, métricas de desempenho e projeções de custos</p>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                setIsExportModalOpen(false);
                showToast('Relatório enviado para seu email corporativo', 'success');
              }}
              className="flex-1 bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] font-semibold py-2 rounded-lg transition-colors"
            >
              Confirmar Exportação
            </button>
            <button
              onClick={() => setIsExportModalOpen(false)}
              className="px-4 py-2 border border-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div 
            key={i}
            className={`relative overflow-hidden rounded-xl p-5 group cursor-pointer transition-all hover:scale-105 ${
              metric.highlight ? 'ring-2' : ''
            }`}
            style={{
              background: `linear-gradient(135deg, ${metric.color}15 0%, ${metric.color}05 100%)`,
              border: `1px solid ${metric.color}30`,
              ringColor: metric.highlight ? `${metric.color}50` : 'transparent',
            }}
          >
            {/* Icon */}
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${metric.color}20` }}
            >
              <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
            </div>

            {/* Label */}
            <div className="text-sm text-[#94A3B8] mb-2">{metric.label}</div>

            {/* Value */}
            <div className="flex items-end justify-between mb-2">
              <div className="flex items-baseline">
                <div className="text-3xl font-bold text-[#F1F5F9]">
                  {metric.value}
                </div>
                {metric.subvalue && (
                  <span className="text-lg text-[#94A3B8] ml-1">{metric.subvalue}</span>
                )}
              </div>
              <div 
                className="flex items-center gap-1 px-2 py-1 rounded-md"
                style={{ backgroundColor: `${metric.color}20` }}
              >
                <TrendingUp className="w-3 h-3" style={{ color: metric.color }} />
                <span className="text-sm font-semibold" style={{ color: metric.color }}>
                  {metric.change}
                </span>
              </div>
            </div>

            {/* Subtitle */}
            <div className="text-xs text-[#94A3B8]">{metric.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Board Presentation Note */}
      <div className="mt-6 p-4 bg-[#0A0E1A]/50 border border-[#1E293B] rounded-xl flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#A855F7]/20 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-4 h-4 text-[#A855F7]" />
        </div>
        <div className="flex-1">
          <div className="text-sm text-[#F1F5F9] mb-1">
            <span className="text-[#A855F7] font-semibold">Destaque para a Diretoria:</span> A implantação da Plataforma ValueFlow 
            resultou em <span className="text-[#10B981]">R$ 385k em economia operacional</span> e 
            aumento de <span className="text-[#00D9FF]">47% na velocidade de entrega</span>.
          </div>
          <p className="text-xs text-[#94A3B8] mt-2">
            NPS Interno subiu de 7.3 para 8.5, indicando alta satisfação das equipes técnicas.
          </p>
        </div>
      </div>
    </div>
  );
}