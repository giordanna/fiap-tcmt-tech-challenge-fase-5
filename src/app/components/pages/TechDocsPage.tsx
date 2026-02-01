import { useState } from 'react';
import { BookOpen, Search, FileText, Code, Database, Server, ChevronRight, ExternalLink, Clock, User } from 'lucide-react';

interface DocItem {
  id: string;
  title: string;
  category: 'api' | 'service' | 'database' | 'guide';
  description: string;
  lastUpdated: string;
  author: string;
  tags: string[];
}

export function TechDocsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);

  const docs: DocItem[] = [
    {
      id: 'doc-1',
      title: 'API de Pagamentos v2.5',
      category: 'api',
      description: 'Documentação completa da API de pagamentos, incluindo endpoints, autenticação OAuth2 e exemplos de integração.',
      lastUpdated: 'há 2 dias',
      author: 'Ana Silva',
      tags: ['REST', 'OAuth2', 'Pagamentos']
    },
    {
      id: 'doc-2',
      title: 'Checkout Service - Arquitetura',
      category: 'service',
      description: 'Visão geral da arquitetura do serviço de checkout, padrões de design e fluxos de dados.',
      lastUpdated: 'há 1 semana',
      author: 'Bruno Costa',
      tags: ['.NET', 'Azure', 'Microsserviços']
    },
    {
      id: 'doc-3',
      title: 'Schema CustomerDB',
      category: 'database',
      description: 'Documentação do schema do banco de dados de clientes, incluindo ERD e políticas de retenção.',
      lastUpdated: 'há 3 dias',
      author: 'Carlos Mendes',
      tags: ['PostgreSQL', 'Schema', 'GDPR']
    },
    {
      id: 'doc-4',
      title: 'Guia de Onboarding para Devs',
      category: 'guide',
      description: 'Passo a passo para novos desenvolvedores configurarem o ambiente local e começarem a contribuir.',
      lastUpdated: 'há 5 dias',
      author: 'Diana Rocha',
      tags: ['Onboarding', 'Setup', 'Git']
    },
    {
      id: 'doc-5',
      title: 'Auth Gateway - Integração',
      category: 'api',
      description: 'Como integrar com o gateway de autenticação corporativo, incluindo SSO e tokens JWT.',
      lastUpdated: 'há 4 dias',
      author: 'Eduardo Lima',
      tags: ['SSO', 'JWT', 'Azure AD']
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos', icon: FileText },
    { id: 'api', label: 'APIs', icon: Code },
    { id: 'service', label: 'Serviços', icon: Server },
    { id: 'database', label: 'Bancos de Dados', icon: Database },
    { id: 'guide', label: 'Guias', icon: BookOpen },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'api': return '#00D9FF';
      case 'service': return '#A855F7';
      case 'database': return '#F59E0B';
      case 'guide': return '#10B981';
      default: return '#94A3B8';
    }
  };

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl text-[#F1F5F9] font-semibold">Documentação Técnica</h1>
              <p className="text-sm text-[#94A3B8] mt-1">Docs-like-Code: documentação viva junto ao código</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Buscar na documentação..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0E1A] border border-[#1E293B] rounded-lg pl-10 pr-4 py-3 text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#00D9FF]"
            />
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30'
                    : 'bg-[#0A0E1A] text-[#94A3B8] border border-[#1E293B] hover:border-[#94A3B8]'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total de Documentos', value: '156', color: '#00D9FF' },
          { label: 'Atualizados Hoje', value: '12', color: '#10B981' },
          { label: 'Contribuidores', value: '24', color: '#A855F7' },
          { label: 'Visualizações Hoje', value: '1.2k', color: '#F59E0B' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#131827] border border-[#1E293B] rounded-xl p-4">
            <div className="text-sm text-[#94A3B8] mb-2">{stat.label}</div>
            <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Docs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            onClick={() => setSelectedDoc(doc)}
            className="bg-[#131827] border border-[#1E293B] rounded-xl p-5 hover:border-[#94A3B8]/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${getCategoryColor(doc.category)}20` }}
              >
                {doc.category === 'api' && <Code className="w-5 h-5" style={{ color: getCategoryColor(doc.category) }} />}
                {doc.category === 'service' && <Server className="w-5 h-5" style={{ color: getCategoryColor(doc.category) }} />}
                {doc.category === 'database' && <Database className="w-5 h-5" style={{ color: getCategoryColor(doc.category) }} />}
                {doc.category === 'guide' && <BookOpen className="w-5 h-5" style={{ color: getCategoryColor(doc.category) }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[#F1F5F9] font-semibold group-hover:text-[#00D9FF] transition-colors truncate">
                    {doc.title}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
                <p className="text-sm text-[#94A3B8] line-clamp-2 mb-3">{doc.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {doc.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-[#0A0E1A] text-[#94A3B8] border border-[#1E293B]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#1E293B] text-xs text-[#94A3B8]">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {doc.lastUpdated}
              </div>
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {doc.author}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Doc Preview */}
      {selectedDoc && (
        <div className="bg-[#131827] border border-[#1E293B] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-[#F1F5F9] font-semibold">{selectedDoc.title}</h2>
            <button className="flex items-center gap-2 text-sm text-[#00D9FF] hover:underline">
              Abrir Completo <ExternalLink className="w-4 h-4" />
            </button>
          </div>
          
          {/* Mock Markdown Content */}
          <div className="bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-6 font-mono text-sm">
            <div className="text-[#10B981] mb-2"># {selectedDoc.title}</div>
            <div className="text-[#94A3B8] mb-4">{selectedDoc.description}</div>
            <div className="text-[#F59E0B] mb-2">## Instalação</div>
            <div className="bg-[#1E293B] rounded p-3 mb-4">
              <code className="text-[#00D9FF]">npm install @valueflow/{selectedDoc.id}</code>
            </div>
            <div className="text-[#F59E0B] mb-2">## Uso Básico</div>
            <div className="bg-[#1E293B] rounded p-3">
              <code className="text-[#00D9FF]">
                {`import { ${selectedDoc.title.split(' ')[0]} } from '@valueflow/${selectedDoc.id}';`}
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
