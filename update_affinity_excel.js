const ExcelJS = require('exceljs');
const path = require('path');

async function updateWorkbookWithAffinity() {
  const filePath = path.join(__dirname, 'Arquivos', 'Planning_Poker_Requisitos.xlsx');
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const primaryBlue = '1B365D';     // Azul PUCPR
  const lightBlue = 'E8F0FE';       // Azul Claro
  const darkTeal = '0F4C5C';
  const purpleTheme = '4A154B';     // Cor estilo Miro / Mural
  const borderThin = {
    top: { style: 'thin', color: { argb: 'D3D3D3' } },
    left: { style: 'thin', color: { argb: 'D3D3D3' } },
    bottom: { style: 'thin', color: { argb: 'D3D3D3' } },
    right: { style: 'thin', color: { argb: 'D3D3D3' } }
  };
  const cardBorder = {
    top: { style: 'medium', color: { argb: '1B365D' } },
    left: { style: 'thin', color: { argb: '999999' } },
    bottom: { style: 'thin', color: { argb: '999999' } },
    right: { style: 'thin', color: { argb: '999999' } }
  };

  // Se já existir as abas de Affinity, remove para recriar limpo
  const existing3 = workbook.getWorksheet('1º Passo - Affinity Estimation');
  if (existing3) workbook.removeWorksheet(existing3.id);
  const existing4 = workbook.getWorksheet('2º Passo - Affinity Avaliação');
  if (existing4) workbook.removeWorksheet(existing4.id);

  // ==========================================
  // ABA: 1º Passo - Affinity Estimation
  // ==========================================
  const wsAffinity = workbook.addWorksheet('1º Passo - Affinity Estimation', {
    views: [{ showGridLines: true }]
  });

  // Cabeçalho
  wsAffinity.mergeCells('A1:J1');
  const t1 = wsAffinity.getCell('A1');
  t1.value = 'PUCPR — ESTIMATIVA ÁGIL POR AFINIDADE (AFFINITY ESTIMATION / T-SHIRT SIZING)';
  t1.font = { name: 'Calibri', size: 14, bold: true, color: { argb: 'FFFFFF' } };
  t1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: purpleTheme } };
  t1.alignment = { horizontal: 'center', vertical: 'middle' };
  wsAffinity.getRow(1).height = 32;

  wsAffinity.mergeCells('A2:J2');
  const t2 = wsAffinity.getCell('A2');
  t2.value = 'Mural Virtual da Parede (Tamanhos XS, S, M, L, XL) — Sistema Reuso_med (Dashboard de Gestão)';
  t2.font = { name: 'Calibri', size: 11, bold: true, color: { argb: purpleTheme } };
  t2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F3E8FF' } };
  t2.alignment = { horizontal: 'center', vertical: 'middle' };
  wsAffinity.getRow(2).height = 24;

  wsAffinity.mergeCells('A3:J3');
  const t3 = wsAffinity.getCell('A3');
  t3.value = 'Técnica: 1º Dimensionamento Silencioso (cada membro aloca sem discutir) ➔ 2º Editando a Parede (discussão, alinhamento e reposicionamento em consenso).';
  t3.font = { name: 'Calibri', size: 10, italic: true, color: { argb: '555555' } };
  t3.alignment = { horizontal: 'center', vertical: 'middle' };
  wsAffinity.getRow(3).height = 20;

  // Cabeçalhos das 5 Colunas (Mural)
  const columns = [
    { name: 'XS\n(Extra Small)', range: 'A5:B5', color: 'E2E8F0', fontColor: '1E293B', desc: 'Menor esforço / Quase imediato' },
    { name: 'S\n(Small)', range: 'C5:D5', color: 'DCFCE7', fontColor: '14532D', desc: 'Simples / Baixa complexidade' },
    { name: 'M\n(Medium)', range: 'E5:F5', color: 'FEF9C3', fontColor: '713F12', desc: 'Médio esforço / Padrão' },
    { name: 'L\n(Large)', range: 'G5:H5', color: 'FED7AA', fontColor: '7C2D12', desc: 'Complexo / Alto esforço' },
    { name: 'XL\n(Extra Large)', range: 'I5:J5', color: 'FEE2E2', fontColor: '7F1D1D', desc: 'Maior esforço / Crítico / Desafio' }
  ];

  wsAffinity.getRow(5).height = 36;
  columns.forEach(col => {
    wsAffinity.mergeCells(col.range);
    const cell = wsAffinity.getCell(col.range.split(':')[0]);
    cell.value = col.name;
    cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: col.fontColor } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: col.color } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = borderThin;
  });

  // Linha 6: Subtítulo descritivo
  wsAffinity.getRow(6).height = 20;
  columns.forEach(col => {
    const range = col.range.replace('5', '6');
    wsAffinity.mergeCells(range);
    const cell = wsAffinity.getCell(range.split(':')[0]);
    cell.value = col.desc;
    cell.font = { name: 'Calibri', size: 9, italic: true, color: { argb: '555555' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F8FAFC' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = borderThin;
  });

  // Cards alocados no mural
  const boardData = [
    // Linha 1 de cartões (Linha 7 a 9)
    {
      col: 'XS', range: 'A8:B10',
      title: 'RF07: Notificar WhatsApp',
      detail: 'Link direto wa.me dinâmico com valor, nome e chave PIX.\nSem custo de API oficial da Meta.\nTempo: ~8h',
      bg: 'FFFFFF'
    },
    {
      col: 'S', range: 'C8:D10',
      title: 'RF03: Upload de Contratos',
      detail: 'Upload de PDFs na nuvem via Firebase Storage.\nValidação de tipo e tamanho de arquivo.\nTempo: ~12h',
      bg: 'FFFFFF'
    },
    {
      col: 'M', range: 'E8:E10',
      title: 'RF01: Auth & RBAC',
      detail: 'Login NextAuth, token JWT, sessões e proteção de rotas.\nTempo: ~16h',
      bg: 'FFFFFF'
    },
    {
      col: 'M2', range: 'F8:F10',
      title: 'RF04: Mensalidades',
      detail: 'Configuração de recorrência, datas de vencimento e virada de mês.\nTempo: ~16h',
      bg: 'FFFFFF'
    },
    {
      col: 'L', range: 'G8:H10',
      title: 'RF02: Cadastro de Empresas',
      detail: 'CRUD completo com Drawer lateral, validação CNPJ e vínculo com CS/Vendas.\nTempo: ~24h',
      bg: 'FFFFFF'
    },
    {
      col: 'XL', range: 'I8:I10',
      title: 'RF05: Faturas & Invoices',
      detail: 'Cálculo de juros com Strategy, lote de faturas e painel de inadimplentes.\nTempo: ~40h',
      bg: 'FFFFFF'
    },
    {
      col: 'XL2', range: 'J8:J10',
      title: 'RF08: Kanban c/ Timer',
      detail: 'Quadro interativo drag-and-drop, cronômetro dinâmico em tempo real.\nTempo: ~40h',
      bg: 'FFFFFF'
    }
  ];

  boardData.forEach(card => {
    wsAffinity.mergeCells(card.range);
    const cell = wsAffinity.getCell(card.range.split(':')[0]);
    cell.value = `${card.title}\n${card.detail}`;
    cell.font = { name: 'Calibri', size: 9 };
    cell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } };
    cell.border = cardBorder;
  });

  // Linha 2 de cartões no mural (Linha 12 a 14)
  const boardDataRow2 = [
    {
      range: 'E12:F14',
      title: 'RF06: Conciliação de Pagamentos',
      detail: 'Baixa de débitos, registro de método PIX/Venda e liquidação transacional atômica no banco.\nTempo: ~16h'
    },
    {
      range: 'G12:H14',
      title: 'RF09: Drawer 360° do Cliente',
      detail: 'Visão agregada consolidada: histórico financeiro, atendimentos, contratos e dados em um só painel.\nTempo: ~24h'
    },
    {
      range: 'I12:J14',
      title: 'RF10: Dashboard Executivo',
      detail: 'Gráficos analíticos de faturamento previsto vs. realizado, taxas de inadimplência e metas.\nTempo: ~40h'
    }
  ];

  boardDataRow2.forEach(card => {
    wsAffinity.mergeCells(card.range);
    const cell = wsAffinity.getCell(card.range.split(':')[0]);
    cell.value = `${card.title}\n${card.detail}`;
    cell.font = { name: 'Calibri', size: 9 };
    cell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } };
    cell.border = cardBorder;
  });

  wsAffinity.getRow(8).height = 24;
  wsAffinity.getRow(9).height = 24;
  wsAffinity.getRow(10).height = 24;
  wsAffinity.getRow(12).height = 24;
  wsAffinity.getRow(13).height = 24;
  wsAffinity.getRow(14).height = 24;

  // Tabela Consolidada de Votos Individuais vs Consenso do Affinity
  wsAffinity.mergeCells('A17:J17');
  const tTab = wsAffinity.getCell('A17');
  tTab.value = 'REGISTRO DETALHADO DO DIMENSIONAMENTO SILENCIOSO (INDIVIDUAL) E DO ALINHAMENTO NA PAREDE (CONSENSO)';
  tTab.font = { name: 'Calibri', size: 11, bold: true, color: { argb: primaryBlue } };
  tTab.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: lightBlue } };
  tTab.alignment = { horizontal: 'left', vertical: 'middle' };
  wsAffinity.getRow(17).height = 24;

  const hTab = [
    'ID',
    'Requisito Funcional',
    'Matheus\n(Silencioso)',
    'Int. 2\n(Silencioso)',
    'Int. 3\n(Silencioso)',
    'Int. 4\n(Silencioso)',
    'Tamanho Parede\n(Consenso)',
    'Equiv. Fibonacci',
    'Tempo Est.',
    'Justificativa do Posicionamento na Parede'
  ];

  const rowHTab = wsAffinity.getRow(18);
  rowHTab.height = 30;
  hTab.forEach((h, idx) => {
    const cell = rowHTab.getCell(idx + 1);
    cell.value = h;
    cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: purpleTheme } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = borderThin;
  });

  const affinityTableData = [
    { id: 'RF01', desc: 'Autenticar e Autorizar Usuários (NextAuth, JWT, RBAC)', v1: 'S', v2: 'M', v3: 'M', v4: 'S', consensus: 'M', fib: '5 pts', time: '16h', just: 'Biblioteca NextAuth pronta diminui o design, mas as regras de RBAC elevam o tamanho para M.' },
    { id: 'RF02', desc: 'Cadastro de Empresas/Clientes (Drawer lateral e CNPJ)', v1: 'L', v2: 'M', v3: 'L', v4: 'L', consensus: 'L', fib: '8 pts', time: '24h', just: 'Múltiplos relacionamentos, validações de máscaras e formulário complexo.' },
    { id: 'RF03', desc: 'Upload de Contratos em Nuvem (Firebase Storage)', v1: 'XS', v2: 'S', v3: 'S', v4: 'M', consensus: 'S', fib: '3 pts', time: '12h', just: 'SDK do Firebase resolve o armazenamento, necessitando apenas tratamento de erros e URLs.' },
    { id: 'RF04', desc: 'Gerenciar Mensalidades e Recorrência', v1: 'M', v2: 'L', v3: 'M', v4: 'M', consensus: 'M', fib: '5 pts', time: '16h', just: 'Regras de virada de mês e cálculo de datas sem algoritmos pesados.' },
    { id: 'RF05', desc: 'Gerar Faturas / Invoices e Inadimplência', v1: 'XL', v2: 'XL', v3: 'L', v4: 'XL', consensus: 'XL', fib: '13 pts', time: '40h', just: 'Módulo financeiro central com maior risco e complexidade interna de regras de juros.' },
    { id: 'RF06', desc: 'Registrar e Conciliar Pagamentos', v1: 'M', v2: 'M', v3: 'L', v4: 'M', consensus: 'M', fib: '5 pts', time: '16h', just: 'Transação atômica que altera status de faturas e consolida recebíveis.' },
    { id: 'RF07', desc: 'Notificar Cobrança via WhatsApp (wa.me)', v1: 'XS', v2: 'XS', v3: 'S', v4: 'XS', consensus: 'XS', fib: '2 pts', time: '8h', just: 'Montagem de link formatado na URL, sem dependência de serviços externos pesados.' },
    { id: 'RF08', desc: 'Quadro Kanban com Cronômetro Dinâmico', v1: 'XL', v2: 'L', v3: 'XL', v4: 'XL', consensus: 'XL', fib: '13 pts', time: '40h', just: 'Interatividade com drag-and-drop somada à sincronização contínua de timer em tempo real.' },
    { id: 'RF09', desc: 'Visualizar Drawer 360° do Cliente', v1: 'M', v2: 'M', v3: 'L', v4: 'L', consensus: 'L', fib: '8 pts', time: '24h', just: 'Agregação de múltiplos endpoints (financeiro, tarefas e contratos) em uma tela única.' },
    { id: 'RF10', desc: 'Visualizar Dashboard Executivo', v1: 'L', v2: 'XL', v3: 'XL', v4: 'L', consensus: 'XL', fib: '13 pts', time: '40h', just: 'Consultas agregadas e gráficos dinâmicos de metas e faturamento em tempo real.' }
  ];

  let rT = 19;
  affinityTableData.forEach((rowItem, idx) => {
    const row = wsAffinity.getRow(rT);
    row.height = 36;
    const bg = idx % 2 === 0 ? 'F9FAFB' : 'FFFFFF';

    row.getCell(1).value = rowItem.id;
    row.getCell(2).value = rowItem.desc;
    row.getCell(3).value = rowItem.v1;
    row.getCell(4).value = rowItem.v2;
    row.getCell(5).value = rowItem.v3;
    row.getCell(6).value = rowItem.v4;
    row.getCell(7).value = rowItem.consensus;
    row.getCell(8).value = rowItem.fib;
    row.getCell(9).value = rowItem.time;
    row.getCell(10).value = rowItem.just;

    for (let c = 1; c <= 10; c++) {
      const cell = row.getCell(c);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
      cell.border = borderThin;
      cell.font = { name: 'Calibri', size: 10 };

      if (c === 1 || (c >= 3 && c <= 9)) {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        if (c === 7) cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: purpleTheme } };
      } else {
        cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      }
    }
    rT++;
  });

  // Largura colunas Aba Affinity
  wsAffinity.getColumn(1).width = 9;   // ID
  wsAffinity.getColumn(2).width = 36;  // Desc
  wsAffinity.getColumn(3).width = 13;  // Voto 1
  wsAffinity.getColumn(4).width = 13;  // Voto 2
  wsAffinity.getColumn(5).width = 13;  // Voto 3
  wsAffinity.getColumn(6).width = 13;  // Voto 4
  wsAffinity.getColumn(7).width = 16;  // Consenso
  wsAffinity.getColumn(8).width = 16;  // Equiv
  wsAffinity.getColumn(9).width = 14;  // Tempo
  wsAffinity.getColumn(10).width = 48; // Justificativa


  // ==========================================
  // ABA: 2º Passo - Affinity Avaliação Cruzada
  // ==========================================
  const wsAffinity2 = workbook.addWorksheet('2º Passo - Affinity Avaliação', {
    views: [{ showGridLines: true }]
  });

  wsAffinity2.mergeCells('A1:G1');
  const tAff2 = wsAffinity2.getCell('A1');
  tAff2.value = 'AFFINITY ESTIMATION — 2º PASSO (AVALIAÇÃO CRUZADA DO MURAL ENTRE EQUIPES)';
  tAff2.font = { name: 'Calibri', size: 13, bold: true, color: { argb: 'FFFFFF' } };
  tAff2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: purpleTheme } };
  tAff2.alignment = { horizontal: 'center', vertical: 'middle' };
  wsAffinity2.getRow(1).height = 28;

  wsAffinity2.mergeCells('A3:G3');
  const sAff1 = wsAffinity2.getCell('A3');
  sAff1.value = 'PARTE A: AVALIAÇÃO DA NOSSA EQUIPE SOBRE O MURAL DA OUTRA EQUIPE (DE PREFERÊNCIA DIFERENTE DO PLANNING POKER)';
  sAff1.font = { name: 'Calibri', size: 11, bold: true, color: { argb: primaryBlue } };
  sAff1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: lightBlue } };
  sAff1.alignment = { horizontal: 'left', vertical: 'middle' };
  wsAffinity2.getRow(3).height = 24;

  const hAffSec1 = [
    'ID Requisito da Outra Equipe',
    'Descrição do Requisito Avaliado',
    'Coluna Original Deles (Mural)',
    'Dúvidas Identificadas / Complexidade Subestimada',
    'Nova Posição Sugerida no Mural',
    'Justificativa do Reposicionamento Sugerido'
  ];

  const rowHAffSec1 = wsAffinity2.getRow(4);
  rowHAffSec1.height = 30;
  hAffSec1.forEach((h, idx) => {
    const colIdx = idx === 5 ? 6 : idx + 1; // Ajuste
    const cell = rowHAffSec1.getCell(idx + 1);
    cell.value = h;
    cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: purpleTheme } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = borderThin;
  });

  const sampleAffinityReview = [
    {
      id: 'REQ_OUTRA_01',
      desc: 'Integração com Gateway de Pagamento e Webhooks',
      col: 'M (Medium)',
      duvida: 'Como tratarão idempotência de requisições e retentativas de webhooks duplicados?',
      sugestao: 'Mover para L ou XL',
      just: 'Webhooks de pagamento exigem validação de assinatura HMAC e tratamento rigoroso de filas para evitar duplicidade de crédito.'
    },
    {
      id: 'REQ_OUTRA_02',
      desc: 'Exportação Simples de CSV',
      col: 'L (Large)',
      duvida: 'Por que foi colocado em L se a estrutura tabular já existe em tela?',
      sugestao: 'Mover para S (Small)',
      just: 'A biblioteca de exportação client-side resolve a conversão de JSON para CSV em poucas linhas de código.'
    }
  ];

  let rAffA = 5;
  sampleAffinityReview.forEach((item, idx) => {
    const row = wsAffinity2.getRow(rAffA);
    row.height = 38;
    const bg = idx % 2 === 0 ? 'F9FAFB' : 'FFFFFF';
    row.getCell(1).value = item.id;
    row.getCell(2).value = item.desc;
    row.getCell(3).value = item.col;
    row.getCell(4).value = item.duvida;
    row.getCell(5).value = item.sugestao;
    row.getCell(6).value = item.just;

    for (let c = 1; c <= 6; c++) {
      const cell = row.getCell(c);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
      cell.border = borderThin;
      cell.font = { name: 'Calibri', size: 10 };
      if (c === 1 || c === 3 || c === 5) {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        if (c === 5) cell.font = { name: 'Calibri', size: 10, bold: true };
      } else {
        cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      }
    }
    rAffA++;
  });

  // Linhas livres
  for (let i = 0; i < 4; i++) {
    const row = wsAffinity2.getRow(rAffA);
    row.height = 30;
    row.getCell(1).value = `REQ_OUTRA_0${i + 3}`;
    for (let c = 1; c <= 6; c++) {
      const cell = row.getCell(c);
      cell.border = borderThin;
      cell.font = { name: 'Calibri', size: 10 };
      if (c === 1) cell.alignment = { horizontal: 'center', vertical: 'middle' };
    }
    rAffA++;
  }

  // Parte B: Feedback recebido no nosso mural
  rAffA += 2;
  wsAffinity2.mergeCells(`A${rAffA}:F${rAffA}`);
  const sAff2 = wsAffinity2.getCell(`A${rAffA}`);
  sAff2.value = 'PARTE B: SUGESTÕES RECEBIDAS DA OUTRA EQUIPE SOBRE O NOSSO MURAL (REUSO_MED) & AJUSTES FINAIS';
  sAff2.font = { name: 'Calibri', size: 11, bold: true, color: { argb: darkTeal } };
  sAff2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E0F2FE' } };
  sAff2.alignment = { horizontal: 'left', vertical: 'middle' };
  wsAffinity2.getRow(rAffA).height = 24;

  rAffA++;
  const hAffSec2 = [
    'Nosso Requisito',
    'Posição Original (Mural)',
    'Dúvida / Apontamento da Outra Equipe',
    'Sugestão de Reposicionamento',
    'Posicionamento da Nossa Equipe',
    'Decisão & Justificativa'
  ];

  const rowHAffSec2 = wsAffinity2.getRow(rAffA);
  rowHAffSec2.height = 30;
  hAffSec2.forEach((h, idx) => {
    const cell = rowHAffSec2.getCell(idx + 1);
    cell.value = h;
    cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: darkTeal } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = borderThin;
  });

  rAffA++;
  const affinityFeedbackSample = [
    {
      req: 'RF03: Upload de Contratos',
      posOrig: 'S (Small)',
      duvida: 'Se houver preview do PDF em tela ou assinatura eletrônica, ainda cabe em S?',
      sugestao: 'Mover para M caso tenha preview',
      posicao: 'ESCLARECIDO / MANTIDO EM S',
      decisao: 'O sistema realiza apenas o upload e disponibilização do download do contrato original, mantendo a estimativa correta em S.'
    },
    {
      req: 'RF09: Drawer 360° do Cliente',
      posOrig: 'L (Large)',
      duvida: 'A sincronização com tarefas e faturas é em tempo real via websocket?',
      sugestao: 'Se for websocket, mover para XL',
      posicao: 'ESCLARECIDO / MANTIDO EM L',
      decisao: 'A busca é por polling/SSR no carregamento da gaveta, sem necessidade de canal bidirecional persistente.'
    }
  ];

  affinityFeedbackSample.forEach((item, idx) => {
    const row = wsAffinity2.getRow(rAffA);
    row.height = 38;
    const bg = idx % 2 === 0 ? 'F9FAFB' : 'FFFFFF';
    row.getCell(1).value = item.req;
    row.getCell(2).value = item.posOrig;
    row.getCell(3).value = item.duvida;
    row.getCell(4).value = item.sugestao;
    row.getCell(5).value = item.posicao;
    row.getCell(6).value = item.decisao;

    for (let c = 1; c <= 6; c++) {
      const cell = row.getCell(c);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
      cell.border = borderThin;
      cell.font = { name: 'Calibri', size: 10 };
      if (c === 2 || c === 4 || c === 5) {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        if (c === 5) cell.font = { name: 'Calibri', size: 10, bold: true };
      } else {
        cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      }
    }
    rAffA++;
  });

  // Linhas livres
  for (let i = 0; i < 3; i++) {
    const row = wsAffinity2.getRow(rAffA);
    row.height = 30;
    for (let c = 1; c <= 6; c++) {
      const cell = row.getCell(c);
      cell.border = borderThin;
      cell.font = { name: 'Calibri', size: 10 };
    }
    rAffA++;
  }

  // Largura colunas Aba Affinity 2
  wsAffinity2.getColumn(1).width = 24;
  wsAffinity2.getColumn(2).width = 22;
  wsAffinity2.getColumn(3).width = 34;
  wsAffinity2.getColumn(4).width = 26;
  wsAffinity2.getColumn(5).width = 24;
  wsAffinity2.getColumn(6).width = 45;

  await workbook.xlsx.writeFile(filePath);
  console.log('Workbook atualizado com sucesso com as abas de Affinity Estimation!');
}

updateWorkbookWithAffinity().catch(err => {
  console.error(err);
  process.exit(1);
});
