import React, { useState } from 'react';
import { Card, Col, Row, Button, Badge, Form, Tab, Nav, ProgressBar, Table, Modal } from 'react-bootstrap';
import Seo from '../../../shared/layout-components/seo/seo';
import Pageheader from '../../../shared/layout-components/pageheader/pageheader';

export default function VariabilidadeDemonstracaoPage() {
    // Estado do Perfil de Cliente Selecionado para simular Variabilidade
    const [clientProfile, setClientProfile] = useState('VIP'); // 'STARTER', 'GROWTH', 'VIP'
    const [currentScreen, setCurrentScreen] = useState('screen1');
    const [timerRunning, setTimerRunning] = useState(true);
    const [timerSeconds, setTimerSeconds] = useState(4825); // ~1h 20m 25s
    const [themeColor, setThemeColor] = useState('#6c5dd3');
    const [nfeEmitted, setNfeEmitted] = useState(false);
    const [splitExecuted, setSplitExecuted] = useState(false);

    // Helpers de perfil
    const isStarter = clientProfile === 'STARTER';
    const isGrowth = clientProfile === 'GROWTH';
    const isVip = clientProfile === 'VIP';

    const formatTimer = (sec) => {
        const h = Math.floor(sec / 3600).toString().padStart(2, '0');
        const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return (
        <div className="variabilidade-container pb-5">
            <Seo title="Demonstração de Alta Variabilidade - Reuso" />
            <Pageheader title="PROTOTIPAGEM DE ALTA VARIABILIDADE" heading="Engenharia de Reuso" active="Parte III" />

            {/* SELETOR INTERATIVO DE TENANT / CLIENTE */}
            <Card className="custom-card shadow-sm border-primary mb-4" style={{ borderLeft: '6px solid var(--primary-bg-color, #6c5dd3)' }}>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col lg={7} md={12}>
                            <h4 className="fw-bold mb-1 text-primary">
                                <i className="fe fe-sliders me-2"></i>Simulador de Variabilidade Multi-Tenant
                            </h4>
                            <p className="text-muted mb-0">
                                Alterne o perfil de cliente abaixo para visualizar como as <strong>12 interfaces</strong> se adaptam dinamicamente sem alterar o código-base, aplicando <strong>Feature Toggles</strong> e <strong>Ativos Centrais Reutilizáveis (Core Assets)</strong>.
                            </p>
                        </Col>
                        <Col lg={5} md={12} className="mt-3 mt-lg-0 text-lg-end">
                            <div className="btn-group p-1 bg-light rounded" role="group">
                                <Button
                                    variant={isStarter ? 'primary' : 'outline-light text-dark'}
                                    size="sm"
                                    className="fw-semibold px-3"
                                    onClick={() => setClientProfile('STARTER')}
                                >
                                    <i className="fe fe-user me-1"></i> 1. Starter (PME)
                                </Button>
                                <Button
                                    variant={isGrowth ? 'primary' : 'outline-light text-dark'}
                                    size="sm"
                                    className="fw-semibold px-3"
                                    onClick={() => setClientProfile('GROWTH')}
                                >
                                    <i className="fe fe-trending-up me-1"></i> 2. Growth (CS/Comercial)
                                </Button>
                                <Button
                                    variant={isVip ? 'danger' : 'outline-light text-dark'}
                                    size="sm"
                                    className="fw-semibold px-3 shadow-sm"
                                    onClick={() => setClientProfile('VIP')}
                                >
                                    <i className="fe fe-award me-1"></i> 3. VIP Enterprise (Formaturas)
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* PAINEL NAVEGADOR DAS 12 TELAS */}
            <Row>
                <Col xl={3} lg={4} md={12}>
                    <Card className="custom-card shadow-sm">
                        <Card.Header className="bg-light">
                            <h6 className="main-content-label mb-0 fw-bold">
                                <i className="fe fe-grid me-2"></i>Catálogo das 12 Telas
                            </h6>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <div className="list-group list-group-flush">
                                {[
                                    { id: 'screen1', title: '1. Dashboard Principal', tag: 'Core + Widgets' },
                                    { id: 'screen2', title: '2. Gestão de Empresas', tag: 'Colunas Dinâmicas' },
                                    { id: 'screen3', title: '3. Drawer/Form Cadastro', tag: 'Schema JSON' },
                                    { id: 'screen4', title: '4. Kanban de Tarefas', tag: 'Time Tracker' },
                                    { id: 'screen5', title: '5. Gestão de Mensalidades', tag: 'Motor de Índices' },
                                    { id: 'screen6', title: '6. Invoices & NFS-e', tag: 'Emissão Fiscal' },
                                    { id: 'screen7', title: '7. Inadimplência & Réguas', tag: 'WhatsApp Bots' },
                                    { id: 'screen8', title: '8. [VIP] Split de Pagamento', tag: 'Função Exclusiva' },
                                    { id: 'screen9', title: '9. Vendas & Comissões', tag: 'Módulo Sellers' },
                                    { id: 'screen10', title: '10. White-Label & Tema', tag: 'CSS Variables' },
                                    { id: 'screen11', title: '11. Matriz de Acesso (RBAC)', tag: 'Permissões' },
                                    { id: 'screen12', title: '12. Hub de Integrações', tag: 'Webhooks/API' },
                                ].map((s) => (
                                    <button
                                        key={s.id}
                                        type="button"
                                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3 ${
                                            currentScreen === s.id ? 'active fw-bold' : ''
                                        }`}
                                        onClick={() => setCurrentScreen(s.id)}
                                    >
                                        <span>{s.title}</span>
                                        <Badge bg={currentScreen === s.id ? 'light' : 'secondary'} className={currentScreen === s.id ? 'text-primary' : ''}>
                                            {s.tag}
                                        </Badge>
                                    </button>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>

                    {/* STATUS DO CLIENTE ATUAL */}
                    <Card className="custom-card shadow-sm border-0 bg-primary text-white">
                        <Card.Body>
                            <h6 className="fw-bold mb-2">
                                <i className="fe fe-info me-2"></i>Tenant Ativo na Simulação
                            </h6>
                            <p className="mb-2 fs-13">
                                <strong>Plano:</strong> {isStarter ? 'Starter Padrão' : isGrowth ? 'Growth Comercial' : 'VIP Enterprise (Momento Único)'}
                            </p>
                            <p className="mb-2 fs-13">
                                <strong>Módulos Ativos:</strong>
                            </p>
                            <ul className="mb-0 ps-3 fs-12">
                                <li>Core Financeiro & Tarefas: <Badge bg="success">Sim</Badge></li>
                                <li>CS e Vendedores: {isGrowth || isVip ? <Badge bg="success">Sim</Badge> : <Badge bg="secondary">Não</Badge>}</li>
                                <li>Time Tracker & Auditoria: {isVip ? <Badge bg="success">Sim</Badge> : <Badge bg="secondary">Não</Badge>}</li>
                                <li>Split Pix Multi-Favorecido: {isVip ? <Badge bg="danger">EXCLUSIVO</Badge> : <Badge bg="secondary">Bloqueado</Badge>}</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>

                {/* CONTEÚDO PRINCIPAL DA TELA SELECIONADA */}
                <Col xl={9} lg={8} md={12}>
                    {/* TELA 1: DASHBOARD */}
                    {currentScreen === 'screen1' && (
                        <div>
                            <Card className="custom-card shadow-sm">
                                <Card.Header className="d-flex justify-content-between align-items-center">
                                    <h5 className="main-content-label mb-0">TELA 1: DASHBOARD DINÂMICO</h5>
                                    <Badge bg={isVip ? 'danger' : isGrowth ? 'primary' : 'secondary'}>
                                        Modo: {clientProfile}
                                    </Badge>
                                </Card.Header>
                                <Card.Body>
                                    <Row className="mb-3">
                                        <Col md={4}>
                                            <div className="p-3 border rounded bg-light text-center">
                                                <span className="text-muted fs-12">Faturamento Mensal</span>
                                                <h4 className="fw-bold text-primary mt-1">R$ 145.200,00</h4>
                                                <Badge bg="success">+12% vs mês anterior</Badge>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="p-3 border rounded bg-light text-center">
                                                <span className="text-muted fs-12">Mensalidades Recebidas</span>
                                                <h4 className="fw-bold text-success mt-1">R$ 118.500,00</h4>
                                                <Badge bg="info">81% da meta atingida</Badge>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="p-3 border rounded bg-light text-center">
                                                <span className="text-muted fs-12">Inadimplência</span>
                                                <h4 className="fw-bold text-danger mt-1">R$ 26.700,00</h4>
                                                <Badge bg="warning">8 empresas em atraso</Badge>
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* VARIANTE ENTERPRISE / VIP */}
                                    {isVip && (
                                        <div className="p-3 border border-danger rounded bg-light-danger mb-3">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="fw-bold text-danger mb-0">
                                                    <i className="fe fe-award me-2"></i>[VARIABILIDADE VIP] Painel de Repasse Multi-Unidades / Holdings
                                                </h6>
                                                <Badge bg="danger">Enterprise Only</Badge>
                                            </div>
                                            <Row>
                                                <Col md={6}>
                                                    <div className="p-2 bg-white rounded border mb-2">
                                                        <span className="fw-semibold fs-13">Unidade SP (Formaturas):</span>
                                                        <ProgressBar now={85} variant="danger" label="85% Liquidado" className="mt-1" />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="p-2 bg-white rounded border mb-2">
                                                        <span className="fw-semibold fs-13">Unidade RJ (Buffet & Eventos):</span>
                                                        <ProgressBar now={62} variant="warning" label="62% Liquidado" className="mt-1" />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}

                                    {/* EXPLICAÇÃO DA VARIABILIDADE NA TELA */}
                                    <div className="alert alert-info mt-4 mb-0">
                                        <h6 className="fw-bold"><i className="fe fe-help-circle me-1"></i>Explicação da Alta Variabilidade nesta Tela:</h6>
                                        <ul className="mb-0 fs-13">
                                            <li><strong>Core Fixo (Reuso):</strong> Os 3 cards de KPI (Faturamento, Recebidos, Inadimplência) são Ativos Centrais presentes para 100% dos usuários.</li>
                                            <li><strong>Ponto de Variação (Slot Dinâmico):</strong> Para clientes <em>VIP Enterprise</em>, a interface injeta o componente de consolidação de multi-unidades, dispensando a criação de uma tela separada.</li>
                                        </ul>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    )}

                    {/* TELA 2: GESTÃO DE EMPRESAS */}
                    {currentScreen === 'screen2' && (
                        <Card className="custom-card shadow-sm">
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <h5 className="main-content-label mb-0">TELA 2: GESTÃO DE EMPRESAS / CLIENTES</h5>
                                <Badge bg="primary">Tabela com Colunas Condicionais</Badge>
                            </Card.Header>
                            <Card.Body>
                                <div className="table-responsive">
                                    <Table bordered hover className="align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Razão Social / CNPJ</th>
                                                <th>Responsável</th>
                                                {(isGrowth || isVip) && <th className="text-primary">[VAR] CS Dedicado</th>}
                                                {(isGrowth || isVip) && <th className="text-primary">[VAR] Vendedor</th>}
                                                <th>Mensalidade</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><strong>Alfa Formaturas Ltda</strong><br /><small className="text-muted">12.345.678/0001-90</small></td>
                                                <td>Carlos Silva</td>
                                                {(isGrowth || isVip) && <td><Badge bg="primary">Mariana Santos</Badge></td>}
                                                {(isGrowth || isVip) && <td>Matheus Henrique</td>}
                                                <td>R$ 3.500,00</td>
                                                <td>
                                                    <Button size="sm" variant="outline-primary" className="me-1"><i className="fe fe-eye"></i></Button>
                                                    <Button size="sm" variant="outline-secondary"><i className="fe fe-edit"></i></Button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><strong>Beta Eventos Eireli</strong><br /><small className="text-muted">98.765.432/0001-11</small></td>
                                                <td>Ana Souza</td>
                                                {(isGrowth || isVip) && <td><Badge bg="primary">Rodrigo Silva</Badge></td>}
                                                {(isGrowth || isVip) && <td>Lucas Gabriel</td>}
                                                <td>R$ 1.800,00</td>
                                                <td>
                                                    <Button size="sm" variant="outline-primary" className="me-1"><i className="fe fe-eye"></i></Button>
                                                    <Button size="sm" variant="outline-secondary"><i className="fe fe-edit"></i></Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>

                                <div className="alert alert-info mt-3 mb-0">
                                    <h6 className="fw-bold"><i className="fe fe-help-circle me-1"></i>Explicação da Alta Variabilidade nesta Tela:</h6>
                                    <p className="fs-13 mb-0">
                                        O componente <code>CompaniesTable.jsx</code> reutiliza o mesmo grid para todos os clientes. As colunas de <strong>CS</strong> e <strong>Vendedor</strong> só são renderizadas se o tenant possuir o módulo de gestão comercial ativo.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {/* TELA 3: DRAWER / FORM DE CADASTRO COM SCHEMA DINÂMICO */}
                    {currentScreen === 'screen3' && (
                        <Card className="custom-card shadow-sm">
                            <Card.Header>
                                <h5 className="main-content-label mb-0">TELA 3: CADASTRO COM CAMPOS DINÂMICOS (DYNAMIC FORM)</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Label>Razão Social (Core Fixo)</Form.Label>
                                        <Form.Control defaultValue="Momento Único Eventos SP" />
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Label>CNPJ (Core Fixo)</Form.Label>
                                        <Form.Control defaultValue="23.881.992/0001-44" />
                                    </Col>
                                </Row>

                                {/* SEÇÃO DINÂMICA DE METADADOS */}
                                <div className="p-3 border rounded bg-light mb-3">
                                    <h6 className="fw-bold text-primary mb-2">
                                        <i className="fe fe-code me-2"></i>[VARIABILIDADE] Campos Customizados pelo Cliente (JSON Metadata)
                                    </h6>
                                    <Row>
                                        <Col md={4} className="mb-2">
                                            <Form.Label className="fs-12">Qtde de Formandos (Custom Eventos)</Form.Label>
                                            <Form.Control size="sm" defaultValue="140" />
                                        </Col>
                                        <Col md={4} className="mb-2">
                                            <Form.Label className="fs-12">Data Prevista do Baile</Form.Label>
                                            <Form.Control size="sm" type="date" defaultValue="2026-12-18" />
                                        </Col>
                                        <Col md={4} className="mb-2">
                                            <Form.Label className="fs-12">Local da Cerimônia</Form.Label>
                                            <Form.Control size="sm" defaultValue="Espaço Grand Hall" />
                                        </Col>
                                    </Row>
                                </div>

                                <div className="d-flex justify-content-end">
                                    <Button variant="primary">Salvar Alterações</Button>
                                </div>

                                <div className="alert alert-info mt-3 mb-0">
                                    <h6 className="fw-bold"><i className="fe fe-help-circle me-1"></i>Explicação da Alta Variabilidade nesta Tela:</h6>
                                    <p className="fs-13 mb-0">
                                        Permite que clientes de diferentes segmentos (Buffet, Produtora de Formaturas, Software) adicionem novos campos no formulário sem precisar alterar a tabela física <code>Company</code> no banco.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {/* TELA 4: KANBAN COM TIME TRACKER */}
                    {currentScreen === 'screen4' && (
                        <Card className="custom-card shadow-sm">
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <h5 className="main-content-label mb-0">TELA 4: CENTRAL DE TAREFAS / OPERAÇÕES</h5>
                                <Badge bg={isVip ? 'success' : 'secondary'}>
                                    {isVip ? 'Time Tracking Ativo' : 'Quadro Básico'}
                                </Badge>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <div className="p-3 border rounded bg-light mb-3">
                                            <span className="badge bg-primary mb-2">EM ANDAMENTO</span>
                                            <h6 className="fw-bold">Confecção das Becas e Convites VIP</h6>
                                            <p className="text-muted fs-12 mb-2">Empresa: Alfa Formaturas Ltda | Resp: Lucas</p>

                                            {/* VARIANTE VIP: TIME TRACKER */}
                                            {isVip ? (
                                                <div className="p-2 border border-success rounded bg-white mt-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span className="fw-bold text-success">
                                                            ⏱️ {formatTimer(timerSeconds)}
                                                        </span>
                                                        <Button
                                                            size="sm"
                                                            variant={timerRunning ? 'outline-warning' : 'outline-success'}
                                                            onClick={() => setTimerRunning(!timerRunning)}
                                                        >
                                                            {timerRunning ? 'Pausar Cronômetro' : 'Retomar'}
                                                        </Button>
                                                    </div>
                                                    <small className="text-muted d-block mt-1">Auditado: 03h 45m acumuladas nesta tarefa</small>
                                                </div>
                                            ) : (
                                                <small className="text-muted italic">Módulo de auditoria de horas desativado no plano atual.</small>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="p-3 border rounded bg-light mb-3">
                                            <span className="badge bg-success mb-2">CONCLUÍDO</span>
                                            <h6 className="fw-bold">Contrato de Salão Assinado</h6>
                                            <p className="text-muted fs-12 mb-2">Empresa: Beta Eventos | Resp: Mariana</p>
                                            <Badge bg="light" className="text-dark border">Finalizado em 02/09/2026</Badge>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="alert alert-info mt-2 mb-0">
                                    <h6 className="fw-bold"><i className="fe fe-help-circle me-1"></i>Explicação da Alta Variabilidade nesta Tela:</h6>
                                    <p className="fs-13 mb-0">
                                        O modelo <code>Task</code> do Prisma possui campos como <code>startedAt</code> e <code>totalTimeWorked</code>. Na interface, clientes corporativos têm o botão de controle de horas de trabalho, enquanto clientes básicos utilizam o card simples.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {/* TELA 5: MENSALIDADES RECORRENTES */}
                    {currentScreen === 'screen5' && (
                        <Card className="custom-card shadow-sm">
                            <Card.Header>
                                <h5 className="main-content-label mb-0">TELA 5: GESTÃO DE MENSALIDADES E RECORRÊNCIA</h5>
                            </Card.Header>
                            <Card.Body>
                                <Table bordered hover>
                                    <thead className="table-light">
                                        <tr>
                                            <th>Empresa</th>
                                            <th>Vencimento</th>
                                            <th>Valor Base</th>
                                            <th>[VAR] Regra de Reajuste</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Alfa Formaturas Ltda</td>
                                            <td>Dia 10</td>
                                            <td>R$ 3.500,00</td>
                                            <td><Badge bg="info">Anual (IPCA + 2%)</Badge></td>
                                            <td><Badge bg="success">ATIVA</Badge></td>
                                        </tr>
                                        <tr>
                                            <td>Beta Eventos Eireli</td>
                                            <td>Dia 05</td>
                                            <td>R$ 1.800,00</td>
                                            <td><Badge bg="secondary">Valor Fixo</Badge></td>
                                            <td><Badge bg="success">ATIVA</Badge></td>
                                        </tr>
                                    </tbody>
                                </Table>

                                <div className="alert alert-info mt-3 mb-0">
                                    <h6 className="fw-bold"><i className="fe fe-help-circle me-1"></i>Explicação da Alta Variabilidade nesta Tela:</h6>
                                    <p className="fs-13 mb-0">
                                        Reuso do motor de recorrência (<code>MonthlyFee</code>), permitindo alternar a estratégia de reajuste automático (Strategy Pattern) conforme o contrato de cada cliente.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {/* TELA 6: INVOICES & NFS-E */}
                    {currentScreen === 'screen6' && (
                        <Card className="custom-card shadow-sm">
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <h5 className="main-content-label mb-0">TELA 6: FATURAMENTO E EMISSÃO FISCAL</h5>
                                {isVip && (
                                    <Button
                                        size="sm"
                                        variant={nfeEmitted ? 'success' : 'primary'}
                                        onClick={() => setNfeEmitted(!nfeEmitted)}
                                    >
                                        <i className="fe fe-file-text me-1"></i>
                                        {nfeEmitted ? 'NFS-e Emitida em Lote (Sucesso)' : 'Emitir Lote Fiscal (NFS-e)'}
                                    </Button>
                                )}
                            </Card.Header>
                            <Card.Body>
                                <Table bordered hover>
                                    <thead className="table-light">
                                        <tr>
                                            <th>Fatura</th>
                                            <th>Cliente</th>
                                            <th>Valor</th>
                                            <th>Vencimento</th>
                                            <th>Status</th>
                                            <th>[VAR] Nota Fiscal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>#INV-2091</strong></td>
                                            <td>Alfa Formaturas Ltda</td>
                                            <td>R$ 3.500,00</td>
                                            <td>10/09/2026</td>
                                            <td><Badge bg="warning">PENDENTE</Badge></td>
                                            <td>
                                                {isVip ? (
                                                    <Badge bg={nfeEmitted ? 'success' : 'primary'}>
                                                        {nfeEmitted ? 'NFS-e #44910 Autorizada' : 'Pronta p/ Emissão'}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-muted fs-12">Não configurado</span>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>

                                <div className="alert alert-info mt-3 mb-0">
                                    <h6 className="fw-bold"><i className="fe fe-help-circle me-1"></i>Explicação da Alta Variabilidade nesta Tela:</h6>
                                    <p className="fs-13 mb-0">
                                        O faturamento base é compartilhado, mas a emissão automática de Nota Fiscal de Serviços Eletrônica (NFS-e) é isolada como um micro-módulo ativado apenas para planos que demandam integração com prefeituras.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {/* TELA 7: INADIMPLÊNCIA & RÉGUAS */}
                    {currentScreen === 'screen7' && (
                        <Card className="custom-card shadow-sm">
                            <Card.Header>
                                <h5 className="main-content-label mb-0">TELA 7: INADIMPLÊNCIA & RÉGUA DE COBRANÇA</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <div className="p-3 border rounded bg-light">
                                            <h6 className="fw-bold text-danger">Ômega Festas Eireli</h6>
                                            <p className="mb-1 text-muted fs-12">Fatura #INV-2041 | Valor: R$ 2.200,00 | Atraso: 14 dias</p>
                                            <div className="mt-2">
                                                <Badge bg="success" className="me-2"><i className="fe fe-message-circle me-1"></i>WhatsApp D+7 Enviado</Badge>
                                                <Button size="sm" variant="outline-danger">Disparar Notificação</Button>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="p-3 border rounded bg-light">
                                            <h6 className="fw-bold text-danger">Sigma Formaturas</h6>
                                            <p className="mb-1 text-muted fs-12">Fatura #INV-2012 | Valor: R$ 4.500,00 | Atraso: 32 dias</p>
                                            <div className="mt-2">
                                                <Badge bg="danger" className="me-2">Encaminhado para Cobrança Jurídica</Badge>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="alert alert-info mt-3 mb-0">
                                    <h6 className="fw-bold"><i className="fe fe-help-circle me-1"></i>Explicação da Alta Variabilidade nesta Tela:</h6>
                                    <p className="fs-13 mb-0">
                                        Varia entre um relatório estático de inadimplentes (Starter) e um motor automático de réguas de disparo via WhatsApp e e-mail (Growth/VIP).
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {/* TELA 8: FUNÇÃO EXCLUSIVA VIP - SPLIT PIX */}
                    {currentScreen === 'screen8' && (
                        <Card className="custom-card shadow-sm border-danger">
                            <Card.Header className="bg-danger text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 fw-bold">
                                    <i className="fe fe-award me-2"></i>TELA 8: [FUNÇÃO EXCLUSIVA VIP] SPLIT DE PAGAMENTO MULTI-FAVORECIDO
                                </h5>
                                <Badge bg="light" className="text-danger">Exclusivo Formaturas & Eventos</Badge>
                            </Card.Header>
                            <Card.Body>
                                {!isVip ? (
                                    <div className="text-center py-5">
                                        <i className="fe fe-lock text-muted" style={{ fontSize: '48px' }}></i>
                                        <h5 className="fw-bold mt-3">Módulo Bloqueado para o Plano Atual</h5>
                                        <p className="text-muted">
                                            O Split de Pagamento Multi-Favorecido é um módulo exclusivo para grandes produtoras de eventos e holdings.
                                        </p>
                                        <Button variant="danger" size="sm" onClick={() => setClientProfile('VIP')}>
                                            Alternar Simulador para Plano VIP
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="p-3 bg-light rounded border mb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <span className="text-muted fs-12">Transação PIX Dinâmica:</span>
                                                    <h5 className="fw-bold text-dark mb-0">#TRX-98831 - Pacote Formatura Medicina 2026</h5>
                                                </div>
                                                <div className="text-end">
                                                    <span className="text-muted fs-12">Valor Total Recebido:</span>
                                                    <h4 className="fw-bold text-success mb-0">R$ 12.000,00</h4>
                                                </div>
                                            </div>
                                        </div>

                                        <h6 className="fw-bold mb-2">Divisão Automática de Repasse (Split Rules):</h6>
                                        <Table bordered responsive className="align-middle">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Favorecido / Sub-Conta</th>
                                                    <th>Regra de Repasse</th>
                                                    <th>Valor Calculado</th>
                                                    <th>Status de Transferência</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><strong>Produtora Matriz (Taxa Admin)</strong></td>
                                                    <td>15% Percentual</td>
                                                    <td><strong className="text-primary">R$ 1.800,00</strong></td>
                                                    <td><Badge bg="success">Liquidado em Conta</Badge></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Espaço de Eventos Grand Hall</strong></td>
                                                    <td>Fixo: R$ 6.000,00</td>
                                                    <td><strong className="text-primary">R$ 6.000,00</strong></td>
                                                    <td><Badge bg="success">PIX Transferido Auto</Badge></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Buffet & Bebidas Premium</strong></td>
                                                    <td>25% Percentual</td>
                                                    <td><strong className="text-primary">R$ 3.000,00</strong></td>
                                                    <td><Badge bg="success">PIX Transferido Auto</Badge></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Empresa de Fotografia e Álbum</strong></td>
                                                    <td>Saldo Restante</td>
                                                    <td><strong className="text-primary">R$ 1.200,00</strong></td>
                                                    <td><Badge bg="warning">Retido até Entrega</Badge></td>
                                                </tr>
                                            </tbody>
                                        </Table>

                                        <div className="d-flex justify-content-end">
                                            <Button
                                                variant={splitExecuted ? 'success' : 'danger'}
                                                onClick={() => setSplitExecuted(true)}
                                            >
                                                <i className="fe fe-check-circle me-1"></i>
                                                {splitExecuted ? 'Repasses Auditados e Confirmados no BACEN' : 'Executar Simulação de Repasse'}
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                <div className="alert alert-info mt-3 mb-0">
                                    <h6 className="fw-bold"><i className="fe fe-help-circle me-1"></i>Separação Arquitetural desta Função:</h6>
                                    <p className="fs-13 mb-0">
                                        Esta funcionalidade demonstra a separação estrita de requisitos. O código é isolado em um módulo dedicado, carregado sob demanda (<em>Dynamic Import</em>) e protegido por guardas de rota no front e no back-end.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {/* TELA 9: VENDAS & COMISSÕES */}
                    {currentScreen === 'screen9' && (
                        <Card className="custom-card shadow-sm">
                            <Card.Header>
                                <h5 className="main-content-label mb-0">TELA 9: CONTROLE DE VENDAS E COMISSIONAMENTO</h5>
                            </Card.Header>
                            <Card.Body>
                                <Table bordered hover>
                                    <thead className="table-light">
                                        <tr>
                                            <th>Vendedor</th>
                                            <th>Total Vendido no Mês</th>
                                            <th>Comissão (%)</th>
                                            <th>Valor da Comissão</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Matheus Henrique</td>
                                            <td>R$ 78.000,00</td>
                                            <td>5.0%</td>
                                            <td><strong>R$ 3.900,00</strong></td>
                                            <td><Badge bg="success">PAGO (PIX)</Badge></td>
                                        </tr>
                                        <tr>
                                            <td>Lucas Gabriel</td>
                                            <td>R$ 52.000,00</td>
                                            <td>4.5%</td>
                                            <td><strong>R$ 2.340,00</strong></td>
                                            <td><Badge bg="warning">PENDENTE</Badge></td>
                                        </tr>
                                    </tbody>
                                </Table>

                                <div className="alert alert-info mt-3 mb-0">
                                    <h6 className="fw-bold"><i className="fe fe-help-circle me-1"></i>Explicação da Alta Variabilidade nesta Tela:</h6>
                                    <p className="fs-13 mb-0">
                                        Reutiliza os modelos <code>Sale</code> e <code>User</code> já existentes no banco, ativando as regras de comissão escalonada apenas para quem opera com equipe de vendas interna.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {/* TELA 10: WHITE-LABEL E TEMAS */}
                    {currentScreen === 'screen10' && (
                        <Card className="custom-card shadow-sm">
                            <Card.Header>
                                <h5 className="main-content-label mb-0">TELA 10: PERSONALIZAÇÃO DA MARCA (WHITE-LABEL)</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Label>Nome da Instância / Empresa</Form.Label>
                                        <Form.Control defaultValue="Momento Único Formaturas SP" />
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Label>Domínio Customizado (CNAME)</Form.Label>
                                        <Form.Control defaultValue="https://painel.alfaeventos.com.br" />
                                    </Col>
                                    <Col md={12} className="mb-3">
                                        <Form.Label>Cor Primária do Tema (CSS Variables em Tempo de Execução)</Form.Label>
                                        <div className="d-flex align-items-center gap-2">
                                            <Form.Control
                                                type="color"
                                                value={themeColor}
                                                onChange={(e) => setThemeColor(e.target.value)}
                                                style={{ width: '80px', height: '40px' }}
                                            />
                                            <span className="fw-bold" style={{ color: themeColor }}>
                                                {themeColor} (Pré-visualização da Cor do Tema)
                                            </span>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="alert alert-info mt-3 mb-0">
                                    <h6 className="fw-bold"><i className="fe fe-help-circle me-1"></i>Explicação da Alta Variabilidade nesta Tela:</h6>
                                    <p className="fs-13 mb-0">
                                        Permite trocar totalmente a identidade visual de cada cliente sem necessidade de recompilar a aplicação, aplicando variáveis CSS injetadas no layout raiz.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {/* TELA 11: MATRIZ DE ACESSO RBAC */}
                    {currentScreen === 'screen11' && (
                        <Card className="custom-card shadow-sm">
                            <Card.Header>
                                <h5 className="main-content-label mb-0">TELA 11: MATRIZ DE CONTROLE DE ACESSO (RBAC)</h5>
                            </Card.Header>
                            <Card.Body>
                                <Table bordered hover>
                                    <thead className="table-light">
                                        <tr>
                                            <th>Módulo</th>
                                            <th>Visualizar</th>
                                            <th>Criar / Editar</th>
                                            <th>Excluir</th>
                                            <th>Exportar Relatórios</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Empresas & Clientes</td>
                                            <td><Form.Check defaultChecked /></td>
                                            <td><Form.Check defaultChecked /></td>
                                            <td><Form.Check /></td>
                                            <td><Form.Check defaultChecked /></td>
                                        </tr>
                                        <tr>
                                            <td>Faturamento & Invoices</td>
                                            <td><Form.Check defaultChecked /></td>
                                            <td><Form.Check defaultChecked /></td>
                                            <td><Form.Check /></td>
                                            <td><Form.Check defaultChecked /></td>
                                        </tr>
                                        <tr>
                                            <td>Split de Pagamento VIP</td>
                                            <td><Form.Check defaultChecked={isVip} disabled={!isVip} /></td>
                                            <td><Form.Check defaultChecked={isVip} disabled={!isVip} /></td>
                                            <td><Form.Check /></td>
                                            <td><Form.Check defaultChecked={isVip} disabled={!isVip} /></td>
                                        </tr>
                                    </tbody>
                                </Table>

                                <div className="alert alert-info mt-3 mb-0">
                                    <h6 className="fw-bold"><i className="fe fe-help-circle me-1"></i>Explicação da Alta Variabilidade nesta Tela:</h6>
                                    <p className="fs-13 mb-0">
                                        Variabilidade a nível de usuários: define quais botões, rotas e operações cada usuário dentro do mesmo cliente pode acessar.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {/* TELA 12: HUB DE INTEGRAÇÕES */}
                    {currentScreen === 'screen12' && (
                        <Card className="custom-card shadow-sm">
                            <Card.Header>
                                <h5 className="main-content-label mb-0">TELA 12: HUB DE INTEGRAÇÕES E WEBHOOKS</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={4} className="mb-3">
                                        <div className="p-3 border rounded text-center h-100">
                                            <i className="fe fe-credit-card text-primary mb-2" style={{ fontSize: '32px' }}></i>
                                            <h6 className="fw-bold">Gateway de Pagamentos</h6>
                                            <Badge bg="success" className="mb-2">Asaas / PIX Conectado</Badge>
                                            <p className="text-muted fs-12 mb-0">Processamento de boletos e PIX com retorno automático.</p>
                                        </div>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <div className="p-3 border rounded text-center h-100">
                                            <i className="fe fe-message-square text-success mb-2" style={{ fontSize: '32px' }}></i>
                                            <h6 className="fw-bold">API WhatsApp Evolution</h6>
                                            <Badge bg="success" className="mb-2">Instância Conectada</Badge>
                                            <p className="text-muted fs-12 mb-0">Envio de faturas e réguas de cobrança automatizadas.</p>
                                        </div>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <div className="p-3 border rounded text-center h-100">
                                            <i className="fe fe-database text-warning mb-2" style={{ fontSize: '32px' }}></i>
                                            <h6 className="fw-bold">Data Warehouse / BI</h6>
                                            <Badge bg={isVip ? 'success' : 'secondary'} className="mb-2">
                                                {isVip ? 'Sync Ativo (BigQuery)' : 'Exclusivo VIP'}
                                            </Badge>
                                            <p className="text-muted fs-12 mb-0">Exportação em tempo real para BI externo.</p>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="alert alert-info mt-3 mb-0">
                                    <h6 className="fw-bold"><i className="fe fe-help-circle me-1"></i>Explicação da Alta Variabilidade nesta Tela:</h6>
                                    <p className="fs-13 mb-0">
                                        Permite conectar diferentes ecossistemas externos dependendo da maturidade tecnológica do cliente, mantendo o Core do sistema desacoplado de fornecedores externos.
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </div>
    );
}

VariabilidadeDemonstracaoPage.layout = 'Contentlayout';
