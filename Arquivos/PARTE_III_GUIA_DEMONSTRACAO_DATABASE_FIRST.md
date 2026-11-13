# Roteiro e Guia de Demonstração — Parte III: Database First (Valor 3)

**Disciplina:** Engenharia de Reúso de Software  
**Tema:** Abordagem Database First com Prisma ORM e Prisma Studio  
**Objetivo:** Demonstrar como gerar modelos, classes, métodos CRUD e interfaces de tela automaticamente a partir de um banco de dados relacional existente.

---

## 1. Fundamentação Teórica: O que é Database First?

Na engenharia de software e reúso, existem três abordagens principais para integração com bancos de dados relacionais:

| Abordagem | Fluxo | Quando utilizar |
| :--- | :--- | :--- |
| **Database First** *(Foco desta etapa)* | **Banco Físico $\rightarrow$ Introspecção/Engenharia Reversa $\rightarrow$ Classes & Modelos ORM $\rightarrow$ Telas & CRUD** | Quando já existe um banco legado, quando o DBA modela o banco diretamente, ou quando se deseja velocidade máxima de desenvolvimento aproveitando um banco corporativo pré-existente. |
| **Code First** | Classes/Entidades no Código $\rightarrow$ Migrações $\rightarrow$ Banco de Dados | Quando a equipe inicia um projeto do zero e a regra de negócio do código dita a estrutura do banco. |
| **Model First** | Diagrama Entidade-Relacionamento visual $\rightarrow$ Gera Código e Gera DDL SQL | Abordagens baseadas em ferramentas CASE legadas. |

### Vantagens do Database First no Reúso de Software:
1. **Produtividade Instantânea**: Elimina o trabalho manual repetitivo de escrever dezenas de classes DTO, DAOs, tipos e queries SQL básicas.
2. **Consistência Total**: Garante que os modelos e relacionamentos do software reflitam fielmente as tabelas, chaves primárias e chaves estrangeiras (`Foreign Keys`) do banco físico.
3. **Reúso de Infraestrutura**: Permite que múltiplos sistemas ou microsserviços reutilizem a mesma base relacional sem duplicar esforço de modelagem.

---

## 2. As Ferramentas Utilizadas no Projeto

Para atender ao requisito *"Utilize alguma ferramenta para gerar classes e códigos completos a partir do banco de dados, e se possível gere até o CRUD e telas de forma automática"*, o projeto adota o **Prisma ORM** e o **Prisma Studio**:

1. **`npx prisma db pull` (Introspecção / Engenharia Reversa)**:
   * Conecta ao banco relacional SQLite físico (`prisma/dev.db`);
   * Lê todas as tabelas (`Invoice`, `User`, `Company`, `MonthlyFee`, `Sale`, `Payment`, `Task`), colunas, índices, constraints e chaves estrangeiras;
   * Gera e atualiza automaticamente o arquivo de definição de modelos (`prisma/schema.prisma`).
2. **`npx prisma generate` (Gerador de Classes e Métodos de Acesso a Dados)**:
   * Compila o schema inspecionado e gera o cliente `@prisma/client`;
   * Disponibiliza classes com métodos CRUD completos (`findMany`, `findUnique`, `create`, `update`, `delete`, agregações e transações) com tipagem forte e validação de atributos.
3. **`npx prisma studio` (Geração Automática de Telas e Painel CRUD)**:
   * Cria instantaneamente um servidor web local (`http://localhost:5555`) com uma interface gráfica completa;
   * Disponibiliza telas de listagem, paginação, filtros, busca, criação, edição e exclusão de registros para **todas** as tabelas do banco de dados, sem precisar escrever nenhuma linha de HTML/React.

---

## 3. Roteiro Prático de Demonstração (Passo a Passo para o Integrante)

> ⏱️ **Tempo estimado da apresentação:** 3 a 5 minutos.  
> 👤 **Quem pode apresentar:** Qualquer integrante do grupo.

### Passo 1: Contextualização Inicial (30 segundos)
* **O que falar:**  
  *"Professor, na Parte III demonstramos a abordagem **Database First**. Em vez de criarmos as classes e telas do zero manualmente, nós deixamos o banco de dados guiar o sistema. Usamos o Prisma ORM para inspecionar as tabelas existentes no banco relacional `dev.db`, gerar automaticamente as classes de negócio e métodos CRUD, e gerar telas visuais completas de gerenciamento através do Prisma Studio."*

---

### Passo 2: Demonstrar a Introspecção do Banco (Database First na prática) (1 minuto)
* Abra o terminal na raiz do projeto (`dashboard-main`).
* Mostre que o banco relacional já existe e execute o comando de introspecção:
  ```bash
  npx prisma db pull
  ```
* **O que mostrar:**  
  Mostre a saída do terminal: `Environment variables loaded from .env`, `Prisma schema loaded...`, `Introspecting database...` e `Added X models to schema.prisma`.
* **O que falar:**  
  *"Este comando `prisma db pull` é o coração do Database First. Ele lê o banco SQLite físico e faz engenharia reversa, descobrindo sozinho os relacionamentos 1-para-N entre Empresa e Faturas, Usuários e Tarefas, montando o modelo automaticamente sem intervenção manual."*

---

### Passo 3: Geração das Classes e Código do CRUD (1 minuto)
* No terminal, execute:
  ```bash
  npx prisma generate
  ```
* **O que falar:**  
  *"A partir do modelo gerado pelo banco, o comando `prisma generate` compila e cria todo o cliente tipado `@prisma/client`, gerando as classes com todos os métodos CRUD prontos para uso (`create`, `findMany`, `update`, `delete`)."*
* Execute o script de validação de CRUD desenvolvido pela equipe:
  ```bash
  node prisma/demo-database-first.js
  ```
* **O que mostrar:**  
  O script listará os dados existentes na tabela, criará um registro ao vivo, atualizará um campo e fará a exclusão com sucesso, comprovando o funcionamento em código.

---

### Passo 4: Geração Automática das Telas (Prisma Studio) (1 a 2 minutos)
* No terminal, execute o comando:
  ```bash
  npx prisma studio
  ```
* O terminal exibirá: `Prisma Studio is up on http://localhost:5555`.
* Abra o navegador em **`http://localhost:5555`**.
* **O que mostrar na tela:**
  1. Mostre as 7 tabelas geradas automaticamente no menu lateral (`Company`, `Invoice`, `User`, `Payment`, `MonthlyFee`, `Sale`, `Task`).
  2. Clique na tabela **`Company`**: mostre a listagem de empresas com filtros e ordenação.
  3. Clique em **"Add record"**: crie uma empresa nova na hora pela interface.
  4. Mostre que o registro já passa a existir no banco de dados e pode ser editado ou excluído diretamente pela tela gerada.
* **O que falar:**  
  *"Como podemos ver na tela, o Prisma Studio gera de forma 100% automática toda a interface visual de CRUD para todas as entidades a partir do banco de dados inspecionado, validando integralmente o requisito da Parte III."*

---

## 4. Resumo de Comandos Rápidos

| Ação | Comando |
| :--- | :--- |
| **Inspecionar Banco (Database First)** | `npx prisma db pull` |
| **Gerar Classes e Métodos CRUD** | `npx prisma generate` |
| **Testar CRUD em Código** | `node prisma/demo-database-first.js` |
| **Abrir Telas e CRUD Visual** | `npx prisma studio` |
