# 📊 Guia Completo: Planning Poker & Affinity Estimation
> **Disciplina:** Medição e Análise de Processos e Produtos de Software — PUCPR  
> **Professor:** Tiago Navarro  
> **Equipe:** Matheus, Felipe Nathan, Eduardo Martins e Ana Júlia  
> **Tema da Equipe:** Sistema `Reuso_med` (Dashboard de Gestão Clínica/Financeira)  
> **Planilha Excel Gerada:** [`Planning_Poker_Requisitos.xlsx`](file:///home/matheusfacul/Documents/Faculdade/Reuso/dashboard-main/Arquivos/Planning_Poker_Requisitos.xlsx)

---

## 🎭 Simulação Prática das Dinâmicas em Equipe

### Integrantes e Papéis na Discussão:
* **Matheus:** Focado no CRM, Cadastro de Clientes e Gestão de Usuários (RBAC/NextAuth).
* **Felipe Nathan:** Focado em Faturamento, Previsão Financeira e Regras de Mensalidade.
* **Eduardo Martins:** Focado em Cobrança de Inadimplência, Conciliação e Juros.
* **Ana Júlia:** Focada em Validações de Negócio, UX/UI, Testes e Segurança.

---

## 🃏 1. Tabela da Simulação: Planning Poker (Ativ 01)

| ID | Requisito Funcional | Matheus | Felipe Nathan | Eduardo Martins | Ana Júlia | Consenso | Complexidade | Tempo | Justificativa do Consenso da Equipe |
| :-: | :--- | :-: | :-: | :-: | :-: | :-: | :---: | :-: | :--- |
| **RF01** | **Autenticação e RBAC** (NextAuth/JWT) | 3 | 5 | 5 | 3 | **5 pts** | Média | 16h | Felipe e Eduardo alertaram que proteger rotas via middleware e gerenciar refresh token eleva o risco. Fechado em 5. |
| **RF02** | **Cadastro de Empresas/Clientes** (Drawer lateral) | 8 | 5 | 8 | 8 | **8 pts** | Média/Alta | 24h | Matheus e Ana Júlia defenderam que validação de CNPJ, máscaras e vínculo com CS/Vendedores justificam 8 pontos. |
| **RF03** | **Upload de Contratos** (Firebase Storage) | 2 | 3 | 3 | 5 | **3 pts** | Baixa/Média | 12h | Ana Júlia votou 5 por receio de arquivos corrompidos, mas Felipe mostrou que o SDK do Firebase simplifica o fluxo (3 pts). |
| **RF04** | **Mensalidades Recorrentes** | 5 | 8 | 5 | 5 | **5 pts** | Média | 16h | Felipe votou 8 prevendo regras de virada de mês (28/30/31 dias), mas o grupo padronizou o cálculo com a lib Date (5 pts). |
| **RF05** | **Faturas & Inadimplência** | 13 | 13 | 8 | 13 | **13 pts** | Alta | 40h | Eduardo votou 8, mas Matheus, Felipe e Ana Júlia demonstraram que regras de juros com Strategy e estornos exigem 13 pts. |
| **RF06** | **Conciliação de Pagamentos** | 5 | 5 | 8 | 5 | **5 pts** | Média | 16h | Eduardo sugeriu 8 prevendo conciliação bancária automática; o grupo esclareceu que a baixa é manual via transação (5 pts). |
| **RF07** | **Notificação via WhatsApp** (`wa.me`) | 2 | 2 | 3 | 2 | **2 pts** | Baixa | 8h | Unanimidade em 2 pontos por usar link formatado direto no navegador, sem custos ou burocracia de API da Meta. |
| **RF08** | **Kanban c/ Cronômetro Dinâmico** | 13 | 8 | 13 | 13 | **13 pts** | Alta | 40h | Felipe votou 8, mas Matheus e Ana Júlia apontaram que manter o timer persistente no banco sem atraso é bem complexo (13 pts). |
| **RF09** | **Drawer 360° do Cliente** | 5 | 5 | 8 | 8 | **8 pts** | Média/Alta | 24h | Eduardo e Ana Júlia convenceram os colegas de que agregar 4 tabelas relacionais em tela única sem lentidão exige 8 pts. |
| **RF10** | **Dashboard Executivo** | 8 | 13 | 13 | 8 | **13 pts** | Alta | 40h | Felipe e Eduardo sustentaram que agregar métricas de receita, metas e renderizar gráficos analíticos com Chart.js exige 13 pts. |
| — | **TOTAL GERAL CONSOLIDADO** | — | — | — | — | **72 pts** | — | **236h** | **29,5 dias úteis de trabalho em equipe.** |

---

## 👕 2. Tabela da Simulação: Affinity Estimation (Ativ 03)

### Dimensionamento Silencioso (Individual) ➔ Editando a Parede (Consenso):

| ID | Requisito Funcional | Matheus (Silencioso) | Felipe Nathan (Silencioso) | Eduardo Martins (Silencioso) | Ana Júlia (Silencioso) | Parede (Consenso) | Fibonacci Equiv. | Tempo | Justificativa do Posicionamento na Parede |
| :-: | :--- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :--- |
| **RF01** | Auth e RBAC (NextAuth) | S | M | M | S | **M** | 5 pts | 16h | RBAC e proteção de rotas de admin exigem atenção média no mural. |
| **RF02** | Cadastro Empresas/Clientes | L | M | L | L | **L** | 8 pts | 24h | Maioria posicionou em L pela densidade do formulário e relacionamentos. |
| **RF03** | Upload de Contratos (PDF) | XS | S | S | M | **S** | 3 pts | 12h | SDK pronto na nuvem evita esforço alto; alocado na coluna S. |
| **RF04** | Mensalidades e Recorrência | M | L | M | M | **M** | 5 pts | 16h | Votos convergiram em M após alinhamento da regra de datas. |
| **RF05** | Faturas & Inadimplência | XL | XL | L | XL | **XL** | 13 pts | 40h | Posição no topo da complexidade (XL) pelo risco financeiro. |
| **RF06** | Conciliação de Pagamentos | M | M | L | M | **M** | 5 pts | 16h | Classificado na coluna M como fluxo financeiro padrão. |
| **RF07** | Notificação WhatsApp | XS | XS | S | XS | **XS** | 2 pts | 8h | Posicionado no extremo esquerdo (XS - Menor esforço de todos). |
| **RF08** | Kanban c/ Cronômetro | XL | L | XL | XL | **XL** | 13 pts | 40h | Posicionado no extremo direito (XL - Alto desafio de frontend/backend). |
| **RF09** | Drawer 360° do Cliente | M | M | L | L | **L** | 8 pts | 24h | Alocado na coluna L por exigir composição de múltiplos serviços. |
| **RF10** | Dashboard Executivo | L | XL | XL | L | **XL** | 13 pts | 40h | Alocado em XL pelas consultas analíticas e visualização gráfica. |

---

### 🎨 Visualização do Mural da Parede:

```text
  ┌───────────────────┬───────────────────┬───────────────────┬───────────────────┬───────────────────┐
  │        XS         │         S         │         M         │         L         │        XL         │
  │   (Extra Small)   │      (Small)      │     (Medium)      │      (Large)      │   (Extra Large)   │
  ├───────────────────┼───────────────────┼───────────────────┼───────────────────┼───────────────────┤
  │ RF07: WhatsApp    │ RF03: Upload      │ RF01: Auth & RBAC │ RF02: Empresas    │ RF05: Faturas     │
  │ (wa.me direto)    │ (Firebase PDF)    │ (NextAuth/JWT)    │ (Drawer/CNPJ)     │ (Juros Strategy)  │
  │                   │                   ├───────────────────┼───────────────────┼───────────────────┤
  │                   │                   │ RF04: Mensalidade │ RF09: Drawer 360° │ RF08: Kanban Timer│
  │                   │                   │ (Recorrência)     │ (Visão Unificada) │ (Drag & Drop)     │
  │                   │                   ├───────────────────┴───────────────────┼───────────────────┤
  │                   │                   │ RF06: Baixa PIX                       │ RF10: Dashboard   │
  │                   │                   │ (Transação Atômica)                   │ (Gráficos/KPIs)   │
  └───────────────────┴───────────────────┴───────────────────────────────────────┴───────────────────┘
```
