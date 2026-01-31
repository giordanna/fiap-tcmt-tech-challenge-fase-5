import { useState } from 'react';
import { Brain, Code, TestTube, GitPullRequest, Sparkles, Copy, CheckCircle2, X, Play } from 'lucide-react';
import { useToast } from '@/app/components/Toast';
import { Modal } from '@/app/components/Modal';

type AITab = 'generate' | 'tests' | 'review';

export function AICopilotExpanded() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<AITab>('generate');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'generate' as AITab, label: 'Gerar Código', icon: Code },
    { id: 'tests' as AITab, label: 'Gerar Testes', icon: TestTube },
    { id: 'review' as AITab, label: 'Code Review', icon: GitPullRequest },
  ];

  const examplePrompts = {
    generate: [
      'Crie um endpoint REST para listar usuários com paginação',
      'Gere um hook React para gerenciar formulário de cadastro',
      'Crie um serviço de cache com Redis em Node.js',
    ],
    tests: [
      'Gere testes unitários para UserService.createUser()',
      'Crie testes de integração para API de pagamentos',
      'Gere cobertura de testes para o módulo de autenticação',
    ],
    review: [
      'Revise o código do PR #1234 para vulnerabilidades',
      'Analise performance do endpoint /api/checkout',
      'Verifique padrões de código no módulo de billing',
    ],
  };

  const mockGeneratedCode = {
    generate: `// Endpoint REST para listar usuários com paginação
import { Request, Response } from 'express';
import { UserService } from './services/UserService';

export async function listUsers(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const users = await UserService.findAll({
    skip: (page - 1) * limit,
    take: limit,
  });
  
  const total = await UserService.count();
  
  return res.json({
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}`,
    tests: `// Testes unitários para UserService.createUser()
import { describe, it, expect, vi } from 'vitest';
import { UserService } from './UserService';
import { UserRepository } from '../repositories/UserRepository';

vi.mock('../repositories/UserRepository');

describe('UserService.createUser', () => {
  it('should create a new user successfully', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
    };
    
    UserRepository.create.mockResolvedValue({
      id: '123',
      ...userData,
      createdAt: new Date(),
    });
    
    const result = await UserService.createUser(userData);
    
    expect(result.id).toBe('123');
    expect(result.name).toBe('John Doe');
    expect(UserRepository.create).toHaveBeenCalledWith(userData);
  });
  
  it('should throw error for duplicate email', async () => {
    UserRepository.create.mockRejectedValue(
      new Error('Email already exists')
    );
    
    await expect(
      UserService.createUser({ name: 'Test', email: 'existing@email.com' })
    ).rejects.toThrow('Email already exists');
  });
});`,
    review: `## 🔍 Análise de Code Review - PR #1234

### Resumo
Foram analisadas 247 linhas de código em 8 arquivos.

### ✅ Pontos Positivos
- Boa separação de responsabilidades
- Uso correto de tipos TypeScript
- Testes unitários incluídos

### ⚠️ Sugestões de Melhoria

**Arquivo: src/services/PaymentService.ts**
\`\`\`diff
- const result = await db.query(\`SELECT * FROM payments WHERE id = '\${id}'\`);
+ const result = await db.query('SELECT * FROM payments WHERE id = $1', [id]);
\`\`\`
> ⚠️ **SQL Injection**: Use parâmetros preparados em queries SQL.

**Arquivo: src/controllers/CheckoutController.ts**
\`\`\`diff
- } catch (e) {
-   console.log(e);
- }
+ } catch (error) {
+   logger.error('Checkout failed', { error, userId });
+   throw new CheckoutError('Failed to process checkout');
+ }
\`\`\`
> 💡 **Logging**: Use um logger estruturado e não exponha erros internos.

### 📊 Métricas
| Métrica | Valor |
|---------|-------|
| Complexidade Ciclomática | 12 |
| Cobertura de Testes | 78% |
| Duplicação de Código | 3% |

### 🏆 Score Final: **8.2/10**`,
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      showToast('Digite uma descrição do que deseja gerar', 'warning');
      return;
    }
    
    setIsGenerating(true);
    
    // Simula geração com delay
    setTimeout(() => {
      setGeneratedCode(mockGeneratedCode[activeTab]);
      setIsGenerating(false);
      setShowModal(true);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    showToast('Código copiado para a área de transferência!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseExample = (example: string) => {
    setPrompt(example);
  };

  return (
    <>
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg text-[#F1F5F9] font-semibold">IA Copiloto</h3>
            <p className="text-xs text-[#94A3B8]">Geração de código assistida por Azure OpenAI</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30'
                  : 'bg-[#0A0E1A] text-[#94A3B8] border border-[#1E293B] hover:border-[#94A3B8]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Prompt Input */}
        <div className="mb-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              activeTab === 'generate' ? 'Descreva o código que deseja gerar...' :
              activeTab === 'tests' ? 'Qual função ou módulo precisa de testes?' :
              'Cole o código ou descreva o que deseja revisar...'
            }
            className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-4 text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#A855F7] resize-none h-24"
          />
        </div>

        {/* Example Prompts */}
        <div className="mb-4">
          <div className="text-xs text-[#94A3B8] mb-2">Exemplos:</div>
          <div className="flex flex-wrap gap-2">
            {examplePrompts[activeTab].map((example, i) => (
              <button
                key={i}
                onClick={() => handleUseExample(example)}
                className="text-xs px-3 py-1.5 rounded-full bg-[#0A0E1A] text-[#94A3B8] border border-[#1E293B] hover:border-[#A855F7] hover:text-[#A855F7] transition-colors"
              >
                {example.length > 40 ? example.slice(0, 40) + '...' : example}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-[#A855F7] to-[#9333EA] hover:from-[#9333EA] hover:to-[#7C3AED] text-white py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Gerando com IA...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>
                {activeTab === 'generate' ? 'Gerar Código' :
                 activeTab === 'tests' ? 'Gerar Testes' : 'Analisar Código'}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Generated Code Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Código Gerado">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <Sparkles className="w-4 h-4 text-[#A855F7]" />
              Gerado por Azure OpenAI
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-sm text-[#00D9FF] hover:text-[#00C4E6] transition-colors"
            >
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          
          <div className="bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="text-sm text-[#F1F5F9] font-mono whitespace-pre-wrap">
              {generatedCode}
            </pre>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                showToast('Código aplicado ao repositório!', 'success');
                setShowModal(false);
              }}
              className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Aplicar ao Projeto
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2.5 border border-[#1E293B] hover:border-[#94A3B8] text-[#94A3B8] rounded-lg transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
