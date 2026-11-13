# Documento de Entrega — Parte I: Modelo de Características e Restrições (FeatureIDE)

**Disciplina:** Engenharia de Software / Reúso de Software  
**Projeto:** Reuso_med — Dashboard de Gestão Financeira, Cobranças e Tarefas (Linha de Produto de Software)  
**Artefato de Modelo:** `model.xml` (localizado na raiz do repositório)  

---

## 1. Visão Geral do Modelo de Características

O modelo de características (*Feature Model*) foi construído no **FeatureIDE** para representar a variabilidade e a comunalidade da família de aplicações do Dashboard SaaS (Linha de Produto de Software - LPS).

A raiz do modelo é **`DashboardLPS`**, que se desdobra em 5 grandes eixos arquiteturais:
1. **CoreModule** (Módulo central de autenticação, controle de empresas e banco de dados);
2. **FinancialModule** (Faturamento, cobrança de inadimplência, formas de pagamento e split);
3. **OperationalModule** (Quadro Kanban, apontamento de tempo e priorização de demandas);
4. **ExportModule** (Mecanismos de exportação de dados estruturados);
5. **ProductProfile** (Perfis de empacotamento comercial: *Starter*, *Growth* e *Enterprise*);
6. **Módulos Adicionais/Cross-cutting**: Gestão Comercial (`CommercialManagement`) e Customização de Marca (`WhiteLabelTheme`).

---

## 2. Conceituação e Justificativas dos Tipos de Elementos do Modelo

O modelo contempla todos os tipos de características exigidos pela engenharia de Linhas de Produto de Software:

### 2.1. Abstract (Características Abstratas)
* **Conceito:** São nós conceituais ou de agrupamento na árvore que não possuem implementação direta em código (não geram uma classe ou módulo isolado). Servem para estruturar hierarquicamente o domínio e agregar subcaracterísticas.
* **Exemplos no Projeto:**
  * `DashboardLPS`: A raiz da Linha de Produto de Software.
  * `CoreModule`: Agrupa os serviços fundamentais de sustentação da aplicação.
  * `FinancialModule`: Agrupa faturamento, inadimplência e métodos de liquidação.
  * `ExportModule`: Agrupa os formatos de saída de relatórios.
* **Justificativa no Projeto:** Organiza a arquitetura em módulos de alto nível, permitindo que as decisões de configuração sejam categorizadas por responsabilidade de domínio sem poluir o mapeamento de código.

### 2.2. Concrete (Características Concretas)
* **Conceito:** São nós folha ou intermediários que possuem contrapartida direta no código-fonte, tabelas do banco de dados ou componentes de interface.
* **Exemplos no Projeto:**
  * `CompanyManagement` (mapeado na classe `Company.js`, tabela `Company` e tela `/admin/companies`);
  * `KanbanBoard` (mapeado na classe `Task.js`, tabela `Task` e tela `/admin/tarefas`);
  * `PixPayment` (mapeado na classe `PixPaymentStrategy.js`);
  * `CSVExport` (mapeado na classe `CsvExportTemplate.js`).
* **Justificativa no Projeto:** Representam as unidades reais de funcionalidade e reúso entregues ao cliente final.

### 2.3. Mandatory (Características Obrigatórias)
* **Conceito:** Uma característica que deve estar **obrigatoriamente** presente em todos os produtos gerados a partir da linha de produto, caso o módulo pai seja selecionado.
* **Exemplos no Projeto:**
  * `CoreModule` e `CompanyManagement`: Toda instância do Dashboard precisa do cadastro de empresas clientes para existir.
  * `UserAuthRBAC`: O controle de autenticação e permissões de acesso é indispensável para qualquer perfil.
  * `InvoiceManagement`: A emissão e gestão básica de faturas é o núcleo de qualquer operação de cobrança da plataforma.
  * `ProductProfile`: Todo produto instanciado deve obrigatoriamente pertencer a um dos perfis definidos.
* **Justificativa no Projeto:** Define o *Core Assets* (núcleo comum) da família de sistemas, garantindo consistência mínima e viabilidade operacional do software.

### 2.4. Optional (Características Opcionais)
* **Conceito:** Características que podem ou não ser incluídas em uma variante da LPS, dependendo do contrato, porte ou demanda do cliente.
* **Exemplos no Projeto:**
  * `AuditLogModule`: Gravação de trilhas de auditoria administrativa.
  * `FutureReceivables`: Módulo de projeção de fluxo de caixa futuro.
  * `WhatsAppNotification`: Disparo automático de mensagens para cobrança amigável.
  * `SplitPayment`: Divisão automatizada de recebíveis e comissões.
  * `WhiteLabelTheme`: Customização completa de logos, paleta de cores e identidade visual da empresa cliente.
* **Justificativa no Projeto:** Permite a diferenciação comercial entre os planos e customizações pontuais sob demanda sem alterar o código-base compartilhado.

### 2.5. Alternative Group (Grupo Alternativo / XOR - Exatamente Uma Opção)
* **Conceito:** Um grupo de características filhas em que **exatamente uma** deve ser selecionada (escolha mutuamente exclusiva).
* **Exemplos no Projeto:**
  1. `ProductProfile`: `{StarterProfile, GrowthProfile, EnterpriseProfile}` — Uma instalação do sistema opera sob um único plano de licenciamento.
  2. `DatabaseEngine`: `{SQLiteEngine, PostgreSQLEngine}` — A aplicação se conecta a um único mecanismo de banco relacional ativo por instância de implantação.
  3. `InterestStrategies`: `{StandardInterest, VipInterest, ExemptInterest}` — Para um determinado perfil de cobrança, a regra de cálculo de mora diária segue estritamente uma estratégia GoF Strategy (`StandardCustomerInterestStrategy`, `VipCustomerInterestStrategy` ou `ExemptCustomerInterestStrategy`).
* **Justificativa no Projeto:** Evita conflitos de execução (como rodar duas regras de juros incompatíveis ao mesmo tempo ou ter dois bancos de dados ativos disputando a mesma persistência).

### 2.6. Or Group (Grupo OR - Ao Menos Uma Opção)
* **Conceito:** Um grupo de características filhas em que **uma ou mais** opções podem ser selecionadas simultaneamente (escolha inclusiva).
* **Exemplos no Projeto:**
  1. `PaymentMethods`: `{PixPayment, BoletoPayment, CreditCardPayment}` — O cliente pode optar por aceitar apenas Pix, Pix + Boleto, ou todos os três meios de pagamento.
  2. `ExportFormats`: `{CSVExport, JSONExport}` — O módulo de relatórios pode disponibilizar download em planilha CSV, arquivo estruturado JSON para APIs, ou ambos.
  3. `TaskPrioritization`: `{DueDatePriority, IdleTimePriority, SeverityPriority}` — A ordenação do Kanban pode priorizar por data de vencimento, tempo ocioso ou severidade do chamado.
* **Justificativa no Projeto:** Garante flexibilidade comercial para o gestor escolher o mix de funcionalidades que melhor atende à sua operação.

---

## 3. Catálogo das 14 Restrições Lógicas (Constraints)

As restrições entre características (*Cross-Tree Constraints*) foram formalizadas no FeatureIDE com operadores de **Implicação ($\implies$)**, **Conjunção ($\land$)**, **Disjunção ($\lor$)** e **Negação ($\neg$)**.

| # | Regra / Expressão Proposicional | Operadores Utilizados | Justificativa Arquitetural e de Domínio |
| :-: | :--- | :---: | :--- |
| **1** | `EnterpriseProfile ⟹ (CommercialManagement ∧ WhiteLabelTheme)` | **Implies, And** | Clientes do plano Enterprise pagam por atendimento dedicado (vendedores/CS na tela) e exigem identidade visual personalizada da sua própria marca. |
| **2** | `StarterProfile ⟹ ¬CommercialManagement` | **Implies, Not** | O plano de entrada é voltado para microempreendedores; as colunas de Vendedor e CS Responsável são ocultadas na tela `/admin/companies` para manter a interface simples e barata. |
| **3** | `StarterProfile ⟹ ¬CreditCardPayment` | **Implies, Not** | Gateway de cartão de crédito possui custos fixos e taxas de adquirente não cobertas pela mensalidade básica (que aceita apenas Pix e Boleto). |
| **4** | `WhatsAppNotification ⟹ OverdueCollection` | **Implies** | A notificação ativa via WhatsApp é uma ferramenta de cobrança preventiva e de recuperação de inadimplência, dependendo do módulo de cobrança em atraso. |
| **5** | `VipInterest ⟹ EnterpriseProfile` | **Implies** | A estratégia de tolerância e isenção de multa contratual (`VipCustomerInterestStrategy`) é um benefício de negociação exclusivo para contas corporativas. |
| **6** | `TimeTrackerRealTime ⟹ KanbanBoard` | **Implies** | O cronômetro de horas trabalhadas (`totalTimeWorked`) é acoplado diretamente aos cartões do Kanban e suas transições de estado (`A_FAZER` → `EM_ANDAMENTO`). |
| **7** | `CreditCardPayment ⟹ (GatewayConciliation ∧ UserAuthRBAC)` | **Implies, And** | Transações de cartão exigem conciliação automatizada de repasses e rastreabilidade estrita de usuário autenticado por questões de segurança e *chargeback*. |
| **8** | `JSONExport ⟹ (GrowthProfile ∨ EnterpriseProfile)` | **Implies, Or** | A exportação em JSON destina-se a integração via API com ERPs de clientes médios e grandes; o plano Starter conta apenas com exportação CSV simples. |
| **9** | `FutureReceivables ⟹ InvoiceManagement` | **Implies** | A tela de recebíveis futuros calcula a receita recorrente a partir da entidade `Invoice` com o atributo `isFuture = true`. |
| **10** | `SplitPayment ⟹ (PixPayment ∧ EnterpriseProfile)` | **Implies, And** | A divisão automatizada de cotas e comissões opera através de chaves Pix automatizadas e é restrita a operações multiusuário corporativas. |
| **11** | `GrowthProfile ⟹ (KanbanBoard ∧ FutureReceivables)` | **Implies, And** | O perfil intermediário para médias empresas visa o equilíbrio entre eficiência operacional (Kanban) e previsibilidade financeira (Recebíveis Futuros). |
| **12** | `(AuditLogModule ∨ GatewayConciliation) ⟹ (UserAuthRBAC ∧ (SQLiteEngine ∨ PostgreSQLEngine))` | **Implies, And, Or** | Trilha de auditoria e liquidação de gateways exigem rastreamento de operador logado e persistência transacional em banco de dados relacional. |
| **13** | `(CommercialManagement ∧ OperationalModule) ⟹ CompanyManagement` | **Implies, And** | Atribuir vendedores e analistas a demandas de atendimento depende da existência do cadastro institucional de clientes corporativos. |
| **14** | `WhiteLabelTheme ⟹ ¬StarterProfile` | **Implies, Not** | O plano inicial exibe a marca padrão do Dashboard SaaS; a remoção dos créditos e customização de cores é restrita aos planos superiores. |

---

## 4. Como Obter e Inserir a Imagem do FeatureIDE no Documento

Para atender ao requisito de entrega da imagem exportada:
1. Abra o **Eclipse IDE** com o plugin **FeatureIDE** instalado;
2. Importe a pasta do projeto ou abra diretamente o arquivo `model.xml`;
3. No editor gráfico do FeatureIDE, clique com o botão direito sobre a área do diagrama de características;
4. Selecione a opção **"Export as Image..."** (ou utilize o atalho de captura em PNG/SVG com resolução nítida);
5. Insira a imagem exportada no topo ou no anexo do seu documento Word/PDF final.
