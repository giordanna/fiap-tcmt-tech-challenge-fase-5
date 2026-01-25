# ValueFlow Platform - Tech Challenge FIAP Fase 5

Protótipo de alta fidelidade de uma plataforma de gestão de fluxos de valor (Value Stream Management) para times de tecnologia.

## 🛠️ Stack Tecnológica

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **Recharts** - Gráficos
- **Lucide React** - Ícones

## 🚀 Como Executar

```bash
npm install
npm run dev
```

Acesse http://localhost:5173/

## 📱 Responsividade

O protótipo é totalmente responsivo:

- **Desktop**: Sidebar fixa com navegação completa
- **Mobile**: Menu hamburguer com sidebar deslizante

## 🎯 Jornadas de Usuário Mockadas

### 1. Onboarding: Tour Guiado (Cross-Platform)

**Localização**: Inicia automaticamente no primeiro acesso ou via Configuração (Header)

| Etapa                    | Descrição                                                                     |
| ------------------------ | ----------------------------------------------------------------------------- |
| 1. Welcome Modal         | Apresentação da proposta de valor com opção de iniciar tour                   |
| 2. Navegação Guiada      | O tour navega automaticamente entre páginas (Home -> Strategy -> Planning...) |
| 3. Destaque de Elementos | Tooltips posicionados destacam botões e KPIs críticos em cada tela            |

---

### 2. Copiloto Ágil - Ação de Notificação

**Localização**: Home → Widget "Copiloto Ágil"

| Ação                        | Resultado                                |
| --------------------------- | ---------------------------------------- |
| Clique "Enviar Notificação" | Toast de sucesso + botão muda estado     |
| Clique "Ignorar"            | Widget muda para "Sem alertas pendentes" |

---

### 3. Deploy via Golden Path

**Localização**: Sidebar → "Golden Paths"

| Etapa                    | Descrição                                          |
| ------------------------ | -------------------------------------------------- |
| 1. Selecione um template | Kubernetes, API Gateway, Microservice, ou Database |
| 2. Escolha o ambiente    | Development, Staging ou Production                 |
| 3. Inicie o deploy       | Progress bar animada com estágios                  |
| 4. Conclusão             | Toast de sucesso + modal fecha                     |

---

### 4. Repriorização de Backlog com IA

**Localização**: Home → "Backlog Priorizado"

| Etapa                      | Descrição                                   |
| -------------------------- | ------------------------------------------- |
| 1. Clique em qualquer card | Modal abre com análise de IA                |
| 2. Visualize a sugestão    | Recomendação de priorização + justificativa |
| 3. Aceite ou mantenha      | Toast confirma a ação escolhida             |

---

### 5. Criação de Novo Projeto (Estratégia)

**Localização**: Estratégia & Priorização → Botão "Novo Projeto"

| Etapa                       | Descrição                                         |
| --------------------------- | ------------------------------------------------- |
| 1. Clique em "Novo Projeto" | Modal de cadastro abre                            |
| 2. Preencha os dados        | Nome, descrição, custo e prazo                    |
| 3. Confirme                 | Projeto criado e enviado para priorização (Toast) |

---

### 6. Gestão de Dependências e Capacidade (Planejamento)

**Localização**: Planejamento & Capacidade

| Ação                  | Descrição                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| **Nova Solicitação**  | Clique em "+ Nova Solicitação" → Modal para abrir ticket para DBA/Infra/Sec                    |
| **Redistribuição IA** | Clique em "Ver Sugestões..." no card de Insight → Modal para aceitar redistribuição de tarefas |

---

### 7. Agendamento de GMUD (Governança)

**Localização**: Governança & GMUD → Botão "+ Nova GMUD"

| Etapa                  | Descrição                                          |
| ---------------------- | -------------------------------------------------- |
| 1. Iniciar agendamento | Modal para definir título, sistema, impacto e data |
| 2. Confirmar           | GMUD agendada e pendente de aprovação (Toast)      |

---

### 8. FinOps: Economia Automática

**Localização**: FinOps & Observabilidade → Widget "Economia de Custo" → Botão "Aplicar Agora"

| Ação                   | Resultado                                                |
| ---------------------- | -------------------------------------------------------- |
| Clique "Aplicar Agora" | Modal confirma shutdown de ambientes dev fora do horário |
| Confirmação            | Aplicação da política e estimativa de economia (Toast)   |

---

### 9. Adicionar Integração (Ingestão)

**Localização**: Hub de Ingestão → Botão "Adicionar Integração"

| Etapa                  | Descrição                                       |
| ---------------------- | ----------------------------------------------- |
| 1. Selecionar Provider | Escolha entre New Relic, Datadog, AWS, etc.     |
| 2. Conectar            | Simulação de fluxo OAuth2 e feedback de sucesso |

---

### 10. Criação de Golden Path (Platform Eng)

**Localização**: Golden Paths → Botão "Criar Novo Caminho"

| Etapa               | Descrição                                         |
| ------------------- | ------------------------------------------------- |
| 1. Definir Template | Nome do novo caminho e stack tecnológica          |
| 2. Salvar           | Template disponível no catálogo para outros times |

---

### 11. Delivery Pipeline: Deploy Seguro (Home)

**Localização**: Widget "Pipeline de Deploy" → Botão "Deploy para Produção"

| Etapa                 | Descrição                                                |
| --------------------- | -------------------------------------------------------- |
| 1. Clique em "Deploy" | Modal abre listando checks de segurança automáticos (IA) |
| 2. Confirme           | Deploy iniciado via GitOps agent com feedback visual     |

---

### 12. Criação de Card no Backlog (Home)

**Localização**: Widget "Backlog Priorizado" → Botão "+ Novo Card"

| Etapa        | Descrição                                               |
| ------------ | ------------------------------------------------------- |
| 1. Novo Card | Modal permite criar item e ver prévia da análise de IA  |
| 2. Criar     | Card adicionado e priorizado automaticamente (simulado) |

---

### 13. Exportação de Relatório Executivo (Home)

**Localização**: Widget "Resumo Executivo" → Botão "Exportar relatório"

| Etapa        | Descrição                                       |
| ------------ | ----------------------------------------------- |
| 1. Exportar  | Modal de confirmação com detalhes do PDF        |
| 2. Confirmar | Feedback visual de envio para email corporativo |

---

### 14. Análise Detalhada de Estratégia (Estratégia)

**Localização**: Estratégia & Priorização → Card "Recomendação Executiva" → Botão "Ver Análise Detalhada"

| Etapa          | Descrição                                           |
| -------------- | --------------------------------------------------- |
| 1. Ver Análise | Modal exibe breakdown do Score Pugh por critério    |
| 2. Insights IA | Exibição de insight de sinergia com outros projetos |

---

### 15. Detalhes de Anomalia FinOps (FinOps)

**Localização**: FinOps & Observabilidade → Widget "Recomendação IA" → Botão "Ver Detalhes ->"

| Etapa           | Descrição                                                              |
| --------------- | ---------------------------------------------------------------------- |
| 1. Ver Detalhes | Modal mostra recursos ociosos específicos                              |
| 2. Ação Rápida  | Botões para "Downsize" ou "Terminar Instâncias" com feedback immediato |

---

### 16. Configuração de Integração (Ingestão)

**Localização**: Hub de Ingestão → Card de Integração → Ícone "Engrenagem"

| Etapa            | Descrição                                                 |
| ---------------- | --------------------------------------------------------- |
| 1. Configurar    | Modal exibe detalhes de conexão e frequência de sync      |
| 2. Salvar/Testar | Botões para persistir alterações ou validar conectividade |

---

### 17. Planejamento de Capacidade (Planejamento)

**Localização**: Planejamento & Capacidade → Card "Insight: Daniel Lima" → Botão "Ver Sugestões"

| Etapa               | Descrição                                           |
| ------------------- | --------------------------------------------------- |
| 1. Ver Sugestões    | Modal exibe tarefas para redistribuição inteligente |
| 2. Aplicar Mudanças | Confirmação move tarefas para colegas com idle time |

---

### 18. Nova Solicitação de Dependência (Planejamento)

**Localização**: Planejamento & Capacidade → Botão "Nova Solicitação"

| Etapa                | Descrição                                  |
| -------------------- | ------------------------------------------ |
| 1. Criar Solicitação | Modal para abrir ticket para DBA/Infra/Sec |
| 2. Priorização       | Definição de SLA e impacto no projeto      |

---

### 19. Gamificação: Detalhes de Conquista (Gamificação)

**Localização**: Gamificação → Card de Conquista

| Etapa                      | Descrição                                      |
| -------------------------- | ---------------------------------------------- |
| 1. Clique em Conquista     | Modal exibe detalhes do progresso e recompensa |
| 2. Resgatar (Se concluído) | Feedback de resgate de XP e badge              |

---

## 📂 Estrutura de Páginas

| Página                        | Descrição                                  |
| ----------------------------- | ------------------------------------------ |
| **Agile Engine**              | Dashboard principal com métricas e backlog |
| **Estratégia & Priorização**  | Matriz Pugh para priorização               |
| **Planejamento & Capacidade** | Alocação de time e capacidade              |
| **Governança & GMUD**         | Calendário de mudanças e aprovações        |
| **Hub de Ingestão**           | Conectores e integrações de dados          |
| **Golden Paths**              | Templates de infraestrutura self-service   |
| **FinOps & Observabilidade**  | Custos multi-cloud e monitoramento         |
| **Gamificação**               | Ranking e conquistas do time               |
| **Painel de ROI**             | Métricas executivas de retorno             |

## 👥 Grupo 31

Desenvolvido para o Tech Challenge FIAP - Fase 5 (1TCMT).
