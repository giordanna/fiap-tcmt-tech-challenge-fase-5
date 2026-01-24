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

### 1. Copiloto Ágil - Ação de Notificação

**Localização**: Home → Widget "Copiloto Ágil"

| Ação                        | Resultado                                |
| --------------------------- | ---------------------------------------- |
| Clique "Enviar Notificação" | Toast de sucesso + botão muda estado     |
| Clique "Ignorar"            | Widget muda para "Sem alertas pendentes" |

---

### 2. Deploy via Golden Path

**Localização**: Sidebar → "Caminhos Padrão"

| Etapa                    | Descrição                                          |
| ------------------------ | -------------------------------------------------- |
| 1. Selecione um template | Kubernetes, API Gateway, Microservice, ou Database |
| 2. Escolha o ambiente    | Development, Staging ou Production                 |
| 3. Inicie o deploy       | Progress bar animada com estágios                  |
| 4. Conclusão             | Toast de sucesso + modal fecha                     |

---

### 3. Repriorização de Backlog com IA

**Localização**: Home → "Backlog Priorizado"

| Etapa                      | Descrição                                   |
| -------------------------- | ------------------------------------------- |
| 1. Clique em qualquer card | Modal abre com análise de IA                |
| 2. Visualize a sugestão    | Recomendação de priorização + justificativa |
| 3. Aceite ou mantenha      | Toast confirma a ação escolhida             |

---

## 📂 Estrutura de Páginas

| Página                        | Descrição                                  |
| ----------------------------- | ------------------------------------------ |
| **Agile Engine**              | Dashboard principal com métricas e backlog |
| **Estratégia & Priorização**  | Matriz Pugh para priorização               |
| **Planejamento & Capacidade** | Alocação de time e capacidade              |
| **Governança & GMUD**         | Calendário de mudanças e aprovações        |
| **Hub de Ingestão**           | Conectores e integrações de dados          |
| **Caminhos Padrão**           | Templates de infraestrutura self-service   |
| **FinOps & Observabilidade**  | Custos multi-cloud e monitoramento         |
| **Gamificação**               | Ranking e conquistas do time               |
| **Painel de ROI**             | Métricas executivas de retorno             |

## 👥 Grupo 31

Desenvolvido para o Tech Challenge FIAP - Fase 5 (1TCMT).
