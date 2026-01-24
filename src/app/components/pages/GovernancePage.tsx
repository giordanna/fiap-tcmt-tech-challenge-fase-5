import { Shield, Calendar as CalendarIcon, AlertTriangle, CheckCircle2, Clock, Snowflake } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '@/app/components/Modal';
import { useToast } from '@/app/components/Toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

export function GovernancePage() {
  const { showToast } = useToast();
  const [selectedMonth] = useState(0); // 0 = January 2026
  const [isGMUDModalOpen, setIsGMUDModalOpen] = useState(false);
  
  // GMUD Form State
  const [gmudTitle, setGmudTitle] = useState('');
  const [gmudSystem, setGmudSystem] = useState('API Gateway');
  const [gmudImpact, setGmudImpact] = useState('Médio');
  const [gmudDate, setGmudDate] = useState('');

  const months = ['Janeiro 2026', 'Fevereiro 2026', 'Março 2026'];
  
  // Calendar data structure
  const calendarData = {
    0: { // January 2026
      freezing: [1, 2, 3, 4, 5, 27, 28, 29, 30, 31], // New Year + Month End
      windows: [
        { date: 6, type: 'normal', gmud: 'GMUD-2026-001', status: 'approved' },
        { date: 7, type: 'normal', gmud: 'GMUD-2026-002', status: 'pending' },
        { date: 8, type: 'normal', gmud: 'GMUD-2026-003', status: 'approved' },
        { date: 13, type: 'normal', gmud: 'GMUD-2026-004', status: 'approved' },
        { date: 14, type: 'normal', gmud: 'GMUD-2026-005', status: 'in_progress' },
        { date: 15, type: 'normal', gmud: 'GMUD-2026-006', status: 'approved' },
        { date: 20, type: 'normal', gmud: 'GMUD-2026-007', status: 'pending' },
        { date: 21, type: 'normal', gmud: 'GMUD-2026-008', status: 'approved' },
        { date: 22, type: 'normal', gmud: 'GMUD-2026-009', status: 'approved' },
      ],
      weekends: [4, 5, 11, 12, 18, 19, 25, 26],
    },
  };

  const currentCalendar = calendarData[selectedMonth as keyof typeof calendarData];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'in_progress': return '#00D9FF';
      case 'rejected': return '#EF4444';
      default: return '#94A3B8';
    }
  };

  const getDayType = (day: number) => {
    if (currentCalendar.freezing.includes(day)) return 'freezing';
    if (currentCalendar.weekends.includes(day)) return 'weekend';
    const window = currentCalendar.windows.find(w => w.date === day);
    if (window) return 'window';
    return 'normal';
  };

  const getWindow = (day: number) => {
    return currentCalendar.windows.find(w => w.date === day);
  };

  // Generate calendar grid (31 days for January)
  const daysInMonth = 31;
  const firstDayOfWeek = 3; // January 1, 2026 is Wednesday (0=Sun, 3=Wed)
  const calendarGrid = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarGrid.push(null);
  }
  
  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarGrid.push(day);
  }

  const stats = [
    { label: 'GMUDs Aprovadas', value: '23', sublabel: 'Este mês', color: '#10B981' },
    { label: 'Taxa de Sucesso', value: '98.2%', sublabel: 'Últimos 90 dias', color: '#00D9FF' },
    { label: 'Janelas Disponíveis', value: '12', sublabel: 'Janeiro 2026', color: '#A855F7' },
    { label: 'Freezing Days', value: '10', sublabel: 'Ano novo + Fim de mês', color: '#EF4444' },
  ];

  const upcomingGMUDs = [
    {
      id: 'GMUD-2026-002',
      title: 'Deploy API Gateway v2.5.0',
      date: '07 Jan, 19:00',
      system: 'API Gateway',
      impact: 'Médio',
      status: 'pending',
    },
    {
      id: 'GMUD-2026-005',
      title: 'Migração Database PostgreSQL 15',
      date: '14 Jan, 20:00',
      system: 'Banco de Dados',
      impact: 'Alto',
      status: 'in_progress',
    },
    {
      id: 'GMUD-2026-007',
      title: 'Atualização Kubernetes 1.28',
      date: '20 Jan, 18:00',
      system: 'Infraestrutura',
      impact: 'Alto',
      status: 'pending',
    },
  ];

  const handleCreateGMUD = () => {
    setIsGMUDModalOpen(false);
    showToast('GMUD agendada e aguardando aprovação', 'success');
    setGmudTitle('');
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex-none bg-gradient-to-br from-[#EF4444] to-[#DC2626] flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-[#F1F5F9] font-semibold">Governança & GMUD</h1>
              <p className="text-sm text-[#94A3B8] mt-1">
                Integrado com <span className="text-[#00D9FF]">ServiceNow</span>
              </p>
            </div>
          </div>
          <button 
            id="btn-new-gmud"
            onClick={() => setIsGMUDModalOpen(true)}
            className="px-4 py-2 bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] rounded-lg transition-colors flex-shrink-0 whitespace-nowrap"
          >
            Nova GMUD +
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#131827] border border-[#1E293B] rounded-xl p-4">
            <div className="text-sm text-[#94A3B8] mb-2">{stat.label}</div>
            <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-[#94A3B8]">{stat.sublabel}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="col-span-2 bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-xl text-[#F1F5F9] font-semibold mb-4">Calendário de Mudanças</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#10B981] flex-none rounded"></div>
                <span className="text-sm text-[#94A3B8]">Janela de Mudança</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#EF4444] flex-none rounded"></div>
                <span className="text-sm text-[#94A3B8]">Congelamento</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#1E293B] flex-none rounded"></div>
                <span className="text-sm text-[#94A3B8]">Fim de Semana</span>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Weekday Headers */}
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="text-center text-sm text-[#94A3B8] font-semibold py-2">
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {calendarGrid.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square"></div>;
              }

              const dayType = getDayType(day);
              const window = getWindow(day);

              let bgColor = '#0A0E1A';
              let borderColor = '#1E293B';
              let textColor = '#F1F5F9';

              if (dayType === 'freezing') {
                bgColor = '#EF444420';
                borderColor = '#EF4444';
              } else if (dayType === 'weekend') {
                bgColor = '#1E293B';
                borderColor = '#1E293B';
                textColor = '#94A3B8';
              } else if (dayType === 'window') {
                bgColor = '#10B98120';
                borderColor = '#10B981';
              }

              return (
                <div
                  key={day}
                  className="aspect-square border rounded-lg p-2 cursor-pointer hover:scale-105 transition-transform relative"
                  style={{ backgroundColor: bgColor, borderColor }}
                >
                  <div className="text-sm font-semibold" style={{ color: textColor }}>
                    {day}
                  </div>
                  {dayType === 'freezing' && (
                    <Snowflake className="w-3 h-3 text-[#EF4444] absolute top-1 right-1" />
                  )}
                  {window && (
                    <div className="mt-1">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getStatusColor(window.status) }}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 p-4 bg-[#0A0E1A]/50 border border-[#1E293B] rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-[#94A3B8]">
                <span className="text-[#F1F5F9] font-semibold">Política de GMUD:</span> Janelas de mudança de Segunda a Quinta, 18h-22h. 
                Freezing durante finais de ano (1-5 Jan) e fechamento de mês (últimos 5 dias).
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming GMUDs */}
        <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
          <h3 className="text-lg text-[#F1F5F9] font-semibold mb-4">Próximas GMUDs</h3>
          <div className="space-y-4">
            {upcomingGMUDs.map((gmud) => {
              const statusColor = getStatusColor(gmud.status);
              const StatusIcon = gmud.status === 'approved' ? CheckCircle2 : 
                                 gmud.status === 'in_progress' ? Clock : 
                                 AlertTriangle;

              return (
                <div
                  key={gmud.id}
                  className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-xl p-4 hover:border-[#94A3B8]/30 transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${statusColor}20` }}
                    >
                      <StatusIcon className="w-4 h-4" style={{ color: statusColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-mono text-[#94A3B8] mb-1">{gmud.id}</div>
                      <h4 className="text-sm text-[#F1F5F9] font-semibold mb-1">{gmud.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{gmud.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-[#1E293B]">
                    <span className="text-xs text-[#94A3B8]">{gmud.system}</span>
                    <span 
                      className="text-xs px-2 py-0.5 rounded font-semibold"
                      style={{
                        backgroundColor: gmud.impact === 'Alto' ? '#EF444420' : '#F59E0B20',
                        color: gmud.impact === 'Alto' ? '#EF4444' : '#F59E0B',
                      }}
                    >
                      {gmud.impact}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ServiceNow Integration */}
          <div className="mt-6 p-4 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
              <span className="text-sm text-[#00D9FF] font-semibold">ServiceNow Sync</span>
            </div>
            <p className="text-xs text-[#94A3B8]">
              Última sincronização: há 3 minutos
            </p>
          </div>
        </div>
      </div>

      <Modal isOpen={isGMUDModalOpen} onClose={() => setIsGMUDModalOpen(false)} title="Agendar Nova GMUD">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#94A3B8] mb-1">Título da Mudança</label>
            <input 
              type="text"
              value={gmudTitle}
              onChange={(e) => setGmudTitle(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F1F5F9] focus:outline-none focus:border-[#00D9FF]"
              placeholder="Ex: Atualização do cluster de produção"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#94A3B8] mb-1">Sistema</label>
              <Select value={gmudSystem} onValueChange={setGmudSystem}>
                <SelectTrigger className="w-full bg-[#0A0E1A] border border-[#1E293B] text-[#F1F5F9]">
                  <SelectValue placeholder="Selecione o sistema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="API Gateway">API Gateway</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm text-[#94A3B8] mb-1">Impacto Esperado</label>
              <Select value={gmudImpact} onValueChange={setGmudImpact}>
                <SelectTrigger className="w-full bg-[#0A0E1A] border border-[#1E293B] text-[#F1F5F9]">
                  <SelectValue placeholder="Selecione o impacto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baixo">Baixo</SelectItem>
                  <SelectItem value="Médio">Médio</SelectItem>
                  <SelectItem value="Alto">Alto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#94A3B8] mb-1">Data e Hora</label>
            <input 
              type="datetime-local"
              value={gmudDate}
              onChange={(e) => setGmudDate(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg px-4 py-2 text-[#F1F5F9] focus:outline-none focus:border-[#00D9FF] [color-scheme:dark]"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleCreateGMUD}
              className="flex-1 bg-[#00D9FF] hover:bg-[#00C4E6] text-[#0A0E1A] font-semibold py-2 rounded-lg transition-colors"
            >
              Agendar GMUD
            </button>
            <button
              onClick={() => setIsGMUDModalOpen(false)}
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
