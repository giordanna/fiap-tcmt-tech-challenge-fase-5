import { Brain, Sparkles, MessageSquare, FileCode, TestTube, GitPullRequest, Lightbulb, Zap } from 'lucide-react';
import { AICopilotWidget } from '@/app/components/AICopilotWidget';
import { AICopilotExpanded } from '@/app/components/AICopilotExpanded';

export function AIAssistantPage() {
  const capabilities = [
    {
      icon: FileCode,
      title: 'Geração de Código',
      description: 'Crie endpoints, hooks, serviços e mais com descrições em linguagem natural',
      color: '#00D9FF',
    },
    {
      icon: TestTube,
      title: 'Geração de Testes',
      description: 'Gere testes unitários e de integração automaticamente para seu código',
      color: '#10B981',
    },
    {
      icon: GitPullRequest,
      title: 'Code Review',
      description: 'Análise automática de PRs com sugestões de melhorias e detecção de vulnerabilidades',
      color: '#A855F7',
    },
    {
      icon: Lightbulb,
      title: 'Sugestões Proativas',
      description: 'Recomendações inteligentes baseadas no contexto atual da plataforma',
      color: '#F59E0B',
    },
  ];

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-[#F1F5F9] font-semibold">Assistente IA</h1>
            <p className="text-sm text-[#94A3B8] mt-1">Seu copiloto inteligente para desenvolvimento, com tecnologia Azure OpenAI</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Gerações Hoje', value: '47', color: '#00D9FF', icon: Sparkles },
          { label: 'Testes Criados', value: '128', color: '#10B981', icon: TestTube },
          { label: 'PRs Analisados', value: '23', color: '#A855F7', icon: GitPullRequest },
          { label: 'Tempo Economizado', value: '12.5h', color: '#F59E0B', icon: Zap },
        ].map((stat, i) => (
          <div key={i} className="bg-[#131827] border border-[#1E293B] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <stat.icon className="w-4 h-4 flex-none" style={{ color: stat.color }} />
              <div className="text-sm text-[#94A3B8]">{stat.label}</div>
            </div>
            <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {capabilities.map((cap, i) => (
          <div 
            key={i} 
            className="bg-[#131827] border border-[#1E293B] rounded-xl p-5 hover:border-[#A855F7]/50 transition-colors"
          >
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: `${cap.color}20` }}
            >
              <cap.icon className="w-5 h-5" style={{ color: cap.color }} />
            </div>
            <h3 className="text-[#F1F5F9] font-semibold mb-2">{cap.title}</h3>
            <p className="text-sm text-[#94A3B8]">{cap.description}</p>
          </div>
        ))}
      </div>

      {/* AI Copilot Main Interface */}
      <AICopilotExpanded />

      {/* Contextual Alert Widget */}
      <AICopilotWidget currentPage="home" />

      {/* Tips Section */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div>
            <h3 className="text-lg text-[#F1F5F9] font-semibold">Dicas para Melhores Resultados</h3>
            <p className="text-xs text-[#94A3B8]">Como aproveitar ao máximo o Assistente IA</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Seja Específico',
              description: 'Quanto mais detalhes você fornecer, melhor será o código gerado. Inclua nomes de variáveis, tipos e comportamentos esperados.',
            },
            {
              title: 'Use Contexto',
              description: 'Mencione frameworks, bibliotecas e padrões do projeto. Ex: "usando Express com TypeScript e Prisma ORM".',
            },
            {
              title: 'Itere e Refine',
              description: 'Use o código gerado como ponto de partida. Peça ajustes específicos para refinar o resultado.',
            },
          ].map((tip, i) => (
            <div key={i} className="bg-[#0A0E1A]/50 border border-[#1E293B] rounded-xl p-4">
              <h4 className="text-sm text-[#F1F5F9] font-semibold mb-2">{tip.title}</h4>
              <p className="text-xs text-[#94A3B8]">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat History Preview */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00D9FF]/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#00D9FF]" />
            </div>
            <div>
              <h3 className="text-lg text-[#F1F5F9] font-semibold">Histórico Recente</h3>
              <p className="text-xs text-[#94A3B8]">Suas últimas interações com o Assistente</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { prompt: 'Gere um endpoint REST para listar usuários com paginação', type: 'generate', time: 'há 2 horas' },
            { prompt: 'Crie testes para UserService.createUser()', type: 'tests', time: 'há 5 horas' },
            { prompt: 'Analise o PR #1234 para vulnerabilidades', type: 'review', time: 'ontem' },
          ].map((item, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 p-3 bg-[#0A0E1A]/50 border border-[#1E293B] rounded-lg hover:border-[#94A3B8]/30 transition-colors cursor-pointer"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                item.type === 'generate' ? 'bg-[#00D9FF]/20' :
                item.type === 'tests' ? 'bg-[#10B981]/20' : 'bg-[#A855F7]/20'
              }`}>
                {item.type === 'generate' && <FileCode className="w-4 h-4 text-[#00D9FF]" />}
                {item.type === 'tests' && <TestTube className="w-4 h-4 text-[#10B981]" />}
                {item.type === 'review' && <GitPullRequest className="w-4 h-4 text-[#A855F7]" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#F1F5F9] truncate">{item.prompt}</p>
              </div>
              <span className="text-xs text-[#94A3B8] flex-shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
