# 📋 Guia Geral de Entrega — Reúso de Software (Partes I, II e III)

Este documento resume a situação de cada parte do trabalho exigido, onde encontrar cada arquivo no repositório e o que a equipe precisa fazer para realizar a entrega e a apresentação com nota máxima.

---

## 📌 Checklist Rápido de Entrega

| Etapa | Requisito | Status no Repositório | Onde está o conteúdo |
| :---: | :--- | :---: | :--- |
| **Geral** | Entrar no grupo da disciplina | ⚠️ **Ação da equipe** | Entrar no grupo informado pelo professor. |
| **Parte I** (Valor 4) | Modelo FeatureIDE + 14 Restrições + Justificativas (Abstract, Concrete, Optional, Mandatory, Or, Alt) | ✅ **Pronto para entrega** | • [model.xml](file:///home/matheusfacul/Documents/Faculdade/Reuso/dashboard-main/model.xml)<br>• [Restricoes_Modelo_FeatureIDE.docx](file:///home/matheusfacul/Documents/Faculdade/Reuso/dashboard-main/Arquivos/Restricoes_Modelo_FeatureIDE.docx)<br>• [PARTE_I_FEATUREIDE_MODELO_E_RESTRICOES.md](file:///home/matheusfacul/Documents/Faculdade/Reuso/dashboard-main/Arquivos/PARTE_I_FEATUREIDE_MODELO_E_RESTRICOES.md) |
| **Parte II** (Valor 2) | Classificação MPS.BR GRU (1 a 5) e DRU (6 a 9) com semáforo e proposta de adequação | ✅ **100% Pronto e revisado** | • [RELATORIO_MPSBR_GRU_DRU.md](file:///home/matheusfacul/Documents/Faculdade/Reuso/dashboard-main/Arquivos/RELATORIO_MPSBR_GRU_DRU.md)<br>• [MPSBR.xlsx](file:///home/matheusfacul/Documents/Faculdade/Reuso/dashboard-main/Arquivos/MPSBR.xlsx) |
| **Parte III** (Valor 3) | Database First: Geração de classes, métodos CRUD e telas automáticas a partir do banco | ✅ **100% Implementado e validado** | • [PARTE_III_GUIA_DEMONSTRACAO_DATABASE_FIRST.md](file:///home/matheusfacul/Documents/Faculdade/Reuso/dashboard-main/Arquivos/PARTE_III_GUIA_DEMONSTRACAO_DATABASE_FIRST.md)<br>• Script de teste: `prisma/demo-database-first.js`<br>• Painel visual: `npx prisma studio` |

---

## 🔍 Detalhamento por Parte

### 🔹 Parte I (Valor 4): Modelo de Características FeatureIDE
1. **O que já está feito:**
   - O arquivo [model.xml](file:///home/matheusfacul/Documents/Faculdade/Reuso/dashboard-main/model.xml) na raiz do projeto contém a árvore completa do FeatureIDE da Linha de Produto de Software (LPS).
   - Contém todos os conceitos exigidos: **Abstract**, **Concrete**, **Optional**, **Mandatory**, **Or Group** e **Alternative Group**.
   - Contém **14 restrições proposicionais** usando `Implies`, `And`, `Or` e `Not`.
   - O arquivo [PARTE_I_FEATUREIDE_MODELO_E_RESTRICOES.md](file:///home/matheusfacul/Documents/Faculdade/Reuso/dashboard-main/Arquivos/PARTE_I_FEATUREIDE_MODELO_E_RESTRICOES.md) contém a conceituação e justificativas de cada tipo de nó, além da tabela completa das 14 restrições.
2. **O que fazer para entregar:**
   - Abra o `model.xml` no Eclipse FeatureIDE (ou use o diagrama do FeatureIDE) e exporte a imagem do modelo (PNG/SVG).
   - Cole a imagem no início do documento Word/PDF e junte com o conteúdo de [PARTE_I_FEATUREIDE_MODELO_E_RESTRICOES.md](file:///home/matheusfacul/Documents/Faculdade/Reuso/dashboard-main/Arquivos/PARTE_I_FEATUREIDE_MODELO_E_RESTRICOES.md).

---

### 🔹 Parte II (Valor 2): MPS.BR (GRU e DRU)
1. **O que já está feito:**
   - O arquivo [RELATORIO_MPSBR_GRU_DRU.md](file:///home/matheusfacul/Documents/Faculdade/Reuso/dashboard-main/Arquivos/RELATORIO_MPSBR_GRU_DRU.md) já está completamente escrito e formatado.
   - **GRU (pág. 36):** Classificação de GRU 1 a 5 em Verde 🟢, Amarelo 🟡 e Vermelho 🔴 com justificativas reais do código e tabela de adequação.
   - **DRU (pág. 42):** Classificação de DRU 1 a 9 com justificativas e tabela de adequação detalhada para DRU 6, 7, 8 e 9.
2. **O que fazer para entregar:**
   - O relatório já está pronto. Pode ser exportado diretamente para PDF ou Word via editor de texto / Markdown.

---

### 🔹 Parte III (Valor 3): Database First
1. **O que já está feito:**
   - O banco de dados SQLite real (`prisma/dev.db`) possui as 7 tabelas do sistema (`Company`, `User`, `Invoice`, `MonthlyFee`, `Sale`, `Payment`, `Task`).
   - O comando `npx prisma db pull` faz a engenharia reversa do banco para o schema (Database First nativo).
   - O comando `npx prisma generate` gera as classes e métodos CRUD do `@prisma/client`.
   - O script `prisma/demo-database-first.js` executa o teste prático de CRUD no terminal em 2 segundos.
   - O comando `npx prisma studio` abre um painel web completo com telas e CRUD interativo automático.
   - O guia completo da apresentação oral está pronto em [PARTE_III_GUIA_DEMONSTRACAO_DATABASE_FIRST.md](file:///home/matheusfacul/Documents/Faculdade/Reuso/dashboard-main/Arquivos/PARTE_III_GUIA_DEMONSTRACAO_DATABASE_FIRST.md).
2. **O que fazer na apresentação:**
   - Um membro da equipe segue o roteiro de 3 a 5 minutos, executando os comandos no terminal e mostrando o navegador com o Prisma Studio.
