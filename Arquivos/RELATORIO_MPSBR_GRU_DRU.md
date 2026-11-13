# Entrega de Trabalho – Classificação MPS.BR (GRU e DRU)

---

## 1) GRU – Gerência de Reutilização (MPS.BR 2016, página 36)

### Classificação e Justificativa

* **GRU 1 – Uma estratégia de gerenciamento de ativos é documentada, contemplando a definição de ativo reutilizável, além dos critérios para aceitação, certificação, classificação, descontinuidade e avaliação de ativos reutilizáveis.**
  * **Classificação:** 🟡 **Amarelo (Identificação parcial)**
  * **Justificativa:** Na documentação do nosso projeto nós definimos e classificamos o que são os nossos ativos reutilizáveis (as 10 classes principais de negócio, os padrões de projeto GoF como *Singleton*, *Strategy* e *Template Method*, e os componentes visuais das telas). Porém, não chegamos a documentar regras formais de como aprovar/certificar um componente novo, como avaliar sua qualidade ou quando descontinuar um ativo antigo.

* **GRU 2 – Um mecanismo de armazenamento e recuperação de ativos reutilizáveis é implantado.**
  * **Classificação:** 🟢 **Verde (De acordo com a GRU)**
  * **Justificativa:** Nós organizamos todos os ativos reutilizáveis em pastas separadas por responsabilidade dentro do repositório no Git/GitHub (uma pasta só para as classes principais do núcleo do sistema, uma pasta só para os padrões de projeto e outra para componentes de interface), com arquivos centralizadores que facilitam importar e recuperar qualquer componente nas 8 telas do sistema.

* **GRU 3 – Os dados de utilização dos ativos reutilizáveis são registrados.**
  * **Classificação:** 🔴 **Vermelho (Não encontrado)**
  * **Justificativa:** Apesar de sabermos em quais telas do trabalho cada padrão de projeto foi aplicado, o nosso protótipo não possui nenhum contador, log específico ou tabela no banco de dados que registre quantas vezes cada componente reutilizável foi usado ou chamado durante o uso do sistema.

* **GRU 4 – Os ativos reutilizáveis são periodicamente mantidos, segundo os critérios definidos, e suas modificações são controladas ao longo do seu ciclo de vida.**
  * **Classificação:** 🟡 **Amarelo (Identificação parcial)**
  * **Justificativa:** As alterações feitas nos componentes reutilizáveis ficam registradas e controladas pelo histórico de *commits* do Git e pela divisão em camadas do código, o que evita quebrar o resto do sistema. Mesmo assim, é parcial porque não definimos um cronograma de manutenção periódica nem controle de versão individual para cada ativo.

* **GRU 5 – Os usuários de ativos reutilizáveis são notificados sobre problemas detectados, modificações realizadas, novas versões disponibilizadas e descontinuidade de ativos.**
  * **Classificação:** 🔴 **Vermelho (Não encontrado)**
  * **Justificativa:** Como o projeto foi desenvolvido em uma equipe pequena de 4 integrantes, a comunicação sobre mudanças nos componentes foi feita apenas de forma informal entre o grupo. Não existe no sistema um histórico de versões (*Changelog*) ou avisos automáticos notificando quando um ativo teve problemas, foi atualizado ou deixou de ser usado.

---

### Como adequar o protótipo aos níveis da GRU (GRU 1, 2, 3, 4 e 5)

| Nível | Status Atual | Como adequaríamos o nosso protótipo |
| :---: | :---: | :--- |
| **GRU 1** | 🟡 Amarelo | Criar um documento simples de regras no repositório definindo os critérios para um componente entrar no projeto (ex.: código padronizado, testado e seguindo os padrões GoF definidos pelo grupo) e quando ele deve ser substituído ou descontinuado. |
| **GRU 2** | 🟢 Verde | Já atende pela estrutura de pastas e repositório no GitHub, mas poderíamos melhorar criando uma página ou tabela de catálogo listando todos os componentes prontos e como usar cada um. |
| **GRU 3** | 🔴 Vermelho | Criar uma tabela simples de logs no banco de dados (aproveitando a classe de auditoria que já temos) para registrar toda vez que um ativo reutilizável (como o cálculo de juros, meio de pagamento ou exportação de arquivo) for executado no sistema. |
| **GRU 4** | 🟡 Amarelo | Definir revisões nos componentes a cada nova entrega da equipe e colocar número de versão (ex.: v1.0, v1.1) nos comentários de cabeçalho de cada classe e padrão reutilizável para controlar melhor o ciclo de vida. |
| **GRU 5** | 🔴 Vermelho | Criar um arquivo de histórico de atualizações (*Changelog*) no repositório e usar as Issues/notificações do próprio GitHub para avisar todos os integrantes sempre que um componente compartilhado sofrer alteração, tiver algum bug corrigido ou for desativado. |

---

## 2) DRU – Desenvolvimento para Reutilização (MPS.BR 2016, página 42)

### Classificação e Justificativa

* **DRU 1 – Domínios de aplicação em que serão investigadas oportunidades de reutilização de ativos ou nos quais se pretende praticar reutilização são identificados, detectando os respectivos potenciais de reutilização.**
  * **Classificação:** 🟢 **Verde (De acordo com a DRU)**
  * **Justificativa:** Identificamos claramente os módulos do nosso domínio (Gestão de Empresas/CRM, Faturamento e Cobranças, Controle de Tarefas/Kanban e Exportação de Relatórios) e mapeamos onde havia potencial de reúso para gerar diferentes planos do sistema (Starter, Growth e VIP Enterprise) reaproveitando a mesma base.

* **DRU 2 – A capacidade de reutilização sistemática da organização é avaliada e ações corretivas são tomadas, caso necessário.**
  * **Classificação:** 🟡 **Amarelo (Identificação parcial)**
  * **Justificativa:** No início o código estava mais acoplado e nós avaliamos o que precisava mudar para aplicar reúso, refatorando o projeto para usar arquitetura em camadas e padrões GoF. Porém, não existe uma avaliação formal e contínua da capacidade de reúso da equipe como pede o guia.

* **DRU 3 – Um programa de reutilização, envolvendo propósitos, escopo, metas e objetivos, é planejado com a finalidade de atender às necessidades de reutilização de domínios.**
  * **Classificação:** 🟡 **Amarelo (Identificação parcial)**
  * **Justificativa:** Nós fizemos o planejamento técnico de reúso (dividindo as 8 telas CRUD entre os 4 integrantes para reutilizar as mesmas 10 classes base e os mesmos padrões de projeto), mas não criamos um plano formal com metas numéricas de negócio (como porcentagem de economia de tempo ou custo).

* **DRU 4 – O programa de reutilização é implantado, monitorado e avaliado.**
  * **Classificação:** 🔴 **Vermelho (Não encontrado)**
  * **Justificativa:** Nós colocamos o reúso em prática no código e no configurador da linha de produto, mas não fizemos um acompanhamento com métricas para monitorar e avaliar os resultados do programa de reutilização ao longo do tempo.

* **DRU 5 – Propostas de reutilização são avaliadas de forma a garantir que o resultado da reutilização seja apropriado para a aplicação alvo.**
  * **Classificação:** 🟢 **Verde (De acordo com a DRU)**
  * **Justificativa:** Criamos 14 restrições lógicas no modelo do FeatureIDE que garantem que cada funcionalidade reutilizada só seja ativada se for compatível com o perfil do produto alvo (por exemplo: impedir que o plano básico Starter ative pagamento por cartão de crédito ou módulo comercial).

* **DRU 6 – Formas de representação para modelos de domínio e arquiteturas de domínio são selecionadas.**
  * **Classificação:** 🟢 **Verde (De acordo com a DRU)**
  * **Justificativa:** Escolhemos formas padronizadas para representar o domínio e a arquitetura do sistema: usamos o **FeatureIDE** (árvore de features em XML) e **lógica proposicional** para representar o modelo de domínio e suas restrições, e usamos **diagramas de classes e de camadas** na documentação para representar a arquitetura e os padrões GoF.

* **DRU 7 – Um modelo de domínio é desenvolvido e seus limites e relações com outros domínios são estabelecidos e mantidos. Este modelo deve ser capaz de capturar características, capacidades, conceitos e funções comuns, variantes, opcionais e obrigatórios.**
  * **Classificação:** 🟢 **Verde (De acordo com a DRU)**
  * **Justificativa:** Desenvolvemos o modelo de características completo no FeatureIDE, separando o que é obrigatório para todos os produtos (como cadastro de empresas, login e faturas), o que é opcional (como auditoria, recebíveis futuros, split de pagamento e notificação por WhatsApp), e as variantes alternativas/OR (tipos de banco de dados, regras de cálculo de juros, meios de pagamento, formatos de exportação CSV/JSON e os 3 perfis de produto), além das 14 restrições relacionando os módulos.

* **DRU 8 – Uma arquitetura de domínio descrevendo uma família de aplicações para o domínio é desenvolvida e mantida por todo o seu ciclo de vida.**
  * **Classificação:** 🟡 **Amarelo (Identificação parcial)**
  * **Justificativa:** Nós definimos a arquitetura em camadas e planejamos os 3 produtos da família (Starter, Growth e VIP Enterprise), criando uma tela de simulação de variabilidade e aplicando a variação real na tela de Empresas (que mostra ou esconde as colunas de CS e Vendedor conforme o plano). Foi classificado como amarelo porque essa adaptação automática ainda não está ligada em todas as 8 telas CRUD do sistema ao mesmo tempo.

* **DRU 9 – Ativos do domínio são especificados; adquiridos ou desenvolvidos, e mantidos por todo o seu ciclo de vida.**
  * **Classificação:** 🟡 **Amarelo (Identificação parcial)**
  * **Justificativa:** Nós especificamos e programamos os ativos principais do domínio (as 10 classes de entidades com validações e os 8 exemplos de padrões GoF para cálculo de juros, pagamentos, ordenação de tarefas e exportação). Porém, a manutenção ao longo de todo o ciclo de vida é parcial, pois faltam testes automatizados e um controle formal ligando cada item do FeatureIDE diretamente à manutenção do código.

---

### Como adequar o protótipo aos níveis da DRU (DRU 6, 7, 8 e 9)

| Nível | Status Atual | Como adequaríamos o nosso protótipo |
| :---: | :---: | :--- |
| **DRU 6** | 🟢 Verde | Já está de acordo pelo uso do FeatureIDE, diagramas UML e lógica proposicional. Para deixar ainda mais completo, poderíamos padronizar também a documentação das rotas da API (usando Swagger) para representar melhor a comunicação entre o frontend e o backend. |
| **DRU 7** | 🟢 Verde | O modelo no FeatureIDE e o documento com as 14 restrições já atendem ao esperado. Para melhorar, poderíamos deixar mais explícito no modelo os limites com sistemas externos (como a integração externa do WhatsApp, emissão de nota fiscal e operadoras de cartão). |
| **DRU 8** | 🟡 Amarelo | Fazer com que a escolha do perfil da Linha de Produto (Starter, Growth ou VIP) funcione de forma global no sistema inteiro, e não só na tela de Empresas e no simulador. Assim, ao trocar o plano, o menu lateral e todas as 8 telas CRUD já bloqueariam ou liberariam automaticamente as funcionalidades (como esconder a exportação JSON e o pagamento por cartão no plano Starter). |
| **DRU 9** | 🟡 Amarelo | Criar uma tabela de rastreabilidade ligando cada feature do modelo do FeatureIDE ao seu arquivo correspondente no código, além de criar testes básicos e manter um histórico de versão para garantir que os ativos (classes e padrões GoF) continuem funcionando corretamente conforme o sistema evoluir. |
