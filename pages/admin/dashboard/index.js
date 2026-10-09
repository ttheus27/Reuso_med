import { subHours } from 'date-fns';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Modal, Row, Spinner, Table } from 'react-bootstrap';
import * as Dashboarddata from '../../../shared/data/dashboards/dashboards1data';
import { BasicTable } from '../../../shared/data/dashboards/dashboards1data';
import Seo from '../../../shared/layout-components/seo/seo';
import { authOptions } from '../../api/auth/[...nextauth]';
import { resolveRange } from '../../api/server/db/finance/_dateRanges';
import { getKpisByRange } from '../../api/server/db/finance/getKpisByRange';
import { getMonthlyTrends } from '../../api/server/db/finance/getMonthlyTrends';
import { getRecentPayments } from '../../api/server/db/finance/getRecentPayments';
import { prisma } from '../../api/server/db/prisma';

const getCurrentMonthNamePtBR = () => {
    const now = new Date();

    return now.toLocaleDateString('pt-BR', {
        month: 'long',
    });
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const Dashboard = ({
    initialRange,
    initialType,
    initialFrom,
    initialTo,
    chartData,
    recentOrders,
    currentMonthRecurring: initialCurrentMonthRecurring,
    totalMonthlyFees: initialTotalMonthlyFees,
    pendingAmount: initialPendingAmount,
    overdueAmount: initialOverdueAmount,
    overdueClientsCount: initialOverdueClientsCount,
}) => {
    const { data: session } = useSession();
    const router = useRouter();

    const [range, setRange] = useState(initialRange);
    const [type, setType] = useState(initialType);
    const [from, setFrom] = useState(initialFrom || '');
    const [to, setTo] = useState(initialTo || '');
    const [pendingAmount, setPendingAmount] = useState(
        initialPendingAmount || 0
    );
    const [overdueAmount, setOverdueAmount] = useState(
        initialOverdueAmount || 0
    );
    const [overdueClientsCount, setOverdueClientsCount] = useState(
        initialOverdueClientsCount || 0
    );
    const [currentMonthRecurring, setCurrentMonthRecurring] = useState(
        initialCurrentMonthRecurring || 0
    );
    const [isRecurringLoading, setIsRecurringLoading] = useState(false);
    const [totalMonthlyFees, setTotalMonthlyFees] = useState(
        initialTotalMonthlyFees || 0
    );
    const [isMonthlyFeesLoading, setIsMonthlyFeesLoading] = useState(false);
    const [monthSummary, setMonthSummary] = useState(null);
    const [isMonthSummaryLoading, setIsMonthSummaryLoading] = useState(false);
    const [monthTotal, setMonthTotal] = useState(0);

    // Modal de inadimplentes
    const [isOverdueModalOpen, setIsOverdueModalOpen] = useState(false);
    const [overdueClients, setOverdueClients] = useState([]);
    const [isOverdueLoading, setIsOverdueLoading] = useState(false);

    const openOverdueModal = async () => {
        setIsOverdueModalOpen(true);
        setIsOverdueLoading(true);
        try {
            const res = await fetch(
                `/api/server/db/finance/getOverdueClients?t=${Date.now()}`
            );
            const data = await res.json();
            setOverdueClients(Array.isArray(data.clients) ? data.clients : []);
        } catch (e) {
            console.error('Error loading overdue clients', e);
            setOverdueClients([]);
        } finally {
            setIsOverdueLoading(false);
        }
    };

    const closeOverdueModal = () => setIsOverdueModalOpen(false);

    // sempre refletir o estado na URL (shallow pra não refazer SSR ao digitar datas)
    const hasMountedRef = useRef(false);

    useEffect(() => {
        if (!hasMountedRef.current) {
            hasMountedRef.current = true;
            return;
        }

        const q = { range, type };
        if (range === 'custom') {
            if (from) q.from = from;
            if (to) q.to = to;
        }

        router.replace({ pathname: router.pathname, query: q }, undefined, {
            shallow: false,
        });
    }, [range, type, from, to]);

    // Os valores dos cards já vêm do servidor (getServerSideProps)
    // Este useEffect só atualiza se necessário (refresh manual)
    // Removido para usar apenas os dados do servidor e manter sincronização

    const formatAmount = (amount) =>
        new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(amount);

    const firstName = (session?.user?.name || '').split(' ')[0] || 'Usuário';
    const nowBrazil = subHours(new Date(), 3);
    console.log('UTC-3:', nowBrazil.toISOString());

    // UI
    return (
        <>
            <Seo title={'Dashboard'} />
            <React.Fragment>
                <Row
                    className="mb-3 align-items-center justify-content-between g-2"
                    style={{ marginTop: '20px' }}
                >
                    <Col
                        xs="12"
                        md="auto"
                        className="d-flex align-items-center"
                    >
                        <h3 className="mb-0 me-2">Dashboard</h3>
                        <span className="text-warning fw-semibold">
                            {/* › Geral */}
                        </span>
                    </Col>

                    {/* Direita: Filtros (mesma linha) */}
                    <Col xs="12" md="auto">
                        <div className="d-flex gap-2 flex-wrap">
                            {/* Período */}
                            <div>
                                <label className="form-label mb-1 d-block">
                                    Período
                                </label>
                                <select
                                    className="form-select form-select-sm"
                                    value={range}
                                    onChange={(e) => setRange(e.target.value)}
                                    style={{ minWidth: 220 }}
                                >
                                    <option value="last90">
                                        Últimos 90 dias
                                    </option>
                                    <option value="today">Hoje</option>
                                    <option value="yesterday">Ontem</option>
                                    <option value="last7">
                                        Últimos 7 dias
                                    </option>
                                    <option value="thisMonth">Este mês</option>
                                    <option value="lastMonth">
                                        Mês passado
                                    </option>
                                    <option value="custom">
                                        Personalizado
                                    </option>
                                </select>
                            </div>

                            {/* Datas aparecem só no personalizado */}
                            {range === 'custom' && (
                                <>
                                    <div>
                                        <label className="form-label mb-1 d-block">
                                            De
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control form-control-sm"
                                            value={from}
                                            onChange={(e) =>
                                                setFrom(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="form-label mb-1 d-block">
                                            Até
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control form-control-sm"
                                            value={to}
                                            onChange={(e) =>
                                                setTo(e.target.value)
                                            }
                                        />
                                    </div>
                                </>
                            )}

                            {/* Tipo de receita */}
                            <div>
                                <label className="form-label mb-1 d-block">
                                    Tipo de receita
                                </label>
                                <select
                                    className="form-select form-select-sm"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    style={{ minWidth: 220 }}
                                >
                                    <option value="all">
                                        Todas as receitas
                                    </option>
                                    <option value="recurring">
                                        Recorrente
                                    </option>
                                    <option value="new">Novas vendas</option>
                                    <option value="course">
                                        Treinamentos e cursos
                                    </option>
                                </select>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* ===== GRID (cards + gráfico) ===== */}
                <Row>
                    {/* Cards */}
                    <Col xxl={5} xl={12} lg={12} md={12} sm={12}>
                        <Row>
                            <Col xl={12}>
                                <Card>
                                    <Card.Body>
                                        <h3 className="text-dark fw-semibold mb-2 mt-0">
                                            Olá, bem-vindo de volta{' '}
                                            <span className="text-primary">
                                                {firstName}
                                            </span>
                                        </h3>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col xl={6} lg={6} md={6} sm={6}>
                                <Card
                                    className="sales-card"
                                    style={{
                                        minHeight: 170,
                                        cursor: 'pointer',
                                    }}
                                    onClick={openOverdueModal}
                                    role="button"
                                    title="Ver clientes inadimplentes"
                                >
                                    <Row className="h-100 align-items-center">
                                        <div className="col-8">
                                            <div className="ps-4 pt-4 pe-3 pb-4">
                                                <span className="mb-2 fs-12 fw-semibold d-block">
                                                    Clientes inadimplentes
                                                </span>
                                                <h4
                                                    className="fs-20 fw-semibold mb-2"
                                                    style={{
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {formatAmount(
                                                        overdueAmount
                                                    )}
                                                </h4>
                                                <small className="text-muted">
                                                    {overdueClientsCount}{' '}
                                                    cliente
                                                    {overdueClientsCount !== 1
                                                        ? 's'
                                                        : ''}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div
                                                className="circle-icon bg-danger-transparent text-center align-self-center overflow-hidden"
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <i className="fe fe-alert-triangle fs-20 text-danger"></i>
                                            </div>
                                        </div>
                                    </Row>
                                </Card>
                            </Col>

                            <Col xl={6} lg={6} md={6} sm={6}>
                                <Card
                                    className="sales-card"
                                    style={{ minHeight: 170 }}
                                >
                                    <Row className="h-100 align-items-center">
                                        <div className="col-8">
                                            <div className="ps-4 pt-4 pe-3 pb-4">
                                                <span className="mb-2 fs-12 fw-semibold d-block">
                                                    Recebidos esse mês
                                                    <br />
                                                    (recorrente)
                                                </span>
                                                <h4
                                                    className="fs-20 fw-semibold mb-2"
                                                    style={{
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {isRecurringLoading ? (
                                                        <span className="d-inline-flex align-items-center gap-2">
                                                            <Spinner
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                className="me-2"
                                                            />
                                                        </span>
                                                    ) : (
                                                        formatAmount(
                                                            currentMonthRecurring
                                                        )
                                                    )}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div
                                                className="circle-icon bg-warning-transparent text-center align-self-center overflow-hidden"
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <i className="fe fe-refresh-cw fs-20 text-warning"></i>
                                            </div>
                                        </div>
                                    </Row>
                                </Card>
                            </Col>

                            <Col xl={6} lg={6} md={6} sm={6}>
                                <Card
                                    className="sales-card"
                                    style={{ minHeight: 170 }}
                                >
                                    <Row className="h-100 align-items-center">
                                        <div className="col-8">
                                            <div className="ps-4 pt-4 pe-3 pb-4">
                                                <span className="mb-2 fs-12 fw-semibold d-block">
                                                    Valor previsto para
                                                    mensalidade em{' '}
                                                    {capitalize(
                                                        getCurrentMonthNamePtBR()
                                                    )}
                                                </span>

                                                <h4
                                                    className="fs-20 fw-semibold mb-2"
                                                    style={{
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {isMonthlyFeesLoading ? (
                                                        <span className="d-inline-flex align-items-center gap-2">
                                                            <Spinner
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                className="me-2"
                                                            />
                                                        </span>
                                                    ) : (
                                                        formatAmount(
                                                            totalMonthlyFees
                                                        )
                                                    )}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div
                                                className="circle-icon text-center align-self-end overflow-hidden"
                                                style={{
                                                    backgroundColor:
                                                        'rgba(13, 110, 253, 0.2)',
                                                    borderRadius: '8px',
                                                    width: '50px',
                                                    height: '50px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <i
                                                    className="fe fe-shopping-cart fs-20"
                                                    style={{ color: '#0d6efd' }}
                                                ></i>
                                            </div>
                                        </div>
                                    </Row>
                                </Card>
                            </Col>

                            <Col xl={6} lg={6} md={6} sm={6}>
                                <Card
                                    className="sales-card"
                                    style={{ minHeight: 170 }}
                                >
                                    <Row className="h-100 align-items-center">
                                        <div className="col-8">
                                            <div className="ps-4 pt-4 pe-3 pb-4">
                                                <span className="mb-2 fs-12 fw-semibold d-block">
                                                    Valor a Receber (até fim do
                                                    mês)
                                                </span>
                                                <h4
                                                    className="fs-20 fw-semibold mb-2"
                                                    style={{
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {formatAmount(
                                                        pendingAmount +
                                                            overdueAmount
                                                    )}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div
                                                className="circle-icon bg-success-transparent text-center align-self-center overflow-hidden"
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <i className="fe fe-clock fs-20 text-success"></i>
                                            </div>
                                        </div>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    {/* Gráfico (mensal histórico) */}
                    <Col xxl={7} xl={12} lg={12} md={12} sm={12}>
                        <Card className="custom-card overflow-hidden">
                            <Card.Header className="border-bottom-0">
                                <div>
                                    <h3 className="card-title mb-2">
                                        Relatório Mensal - Recorrência
                                    </h3>
                                    <span className="d-block fs-12 mb-0 text-muted">
                                        Recorrência
                                    </span>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div id="statistics1">
                                    <Dashboarddata.Statistics1
                                        chartData={chartData}
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Modal de clientes inadimplentes */}
                <Modal
                    show={isOverdueModalOpen}
                    onHide={closeOverdueModal}
                    size="lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Clientes inadimplentes
                            {overdueClientsCount
                                ? ` • ${overdueClientsCount} clientes`
                                : ''}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isOverdueLoading ? (
                            <div className="d-flex justify-content-center py-4">
                                <Spinner animation="border" role="status" />
                            </div>
                        ) : overdueClients.length === 0 ? (
                            <div className="text-center text-muted py-3">
                                Nenhum cliente inadimplente no período.
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <Table hover className="mb-0">
                                    <thead>
                                        <tr>
                                            <th>Cliente</th>
                                            <th className="text-end">
                                                Valor em aberto
                                            </th>
                                            <th className="text-end">
                                                Mensalidades
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {overdueClients.map((c) => (
                                            <tr key={c.id}>
                                                <td>{c.name}</td>
                                                <td className="text-end">
                                                    {formatAmount(
                                                        c.totalOverdue || 0
                                                    )}
                                                </td>
                                                <td className="text-end">
                                                    {c.invoiceCount || 0}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Total</th>
                                            <th className="text-end">
                                                {formatAmount(overdueAmount)}
                                            </th>
                                            <th className="text-end">
                                                {overdueClients.reduce(
                                                    (a, b) =>
                                                        a +
                                                        (b.invoiceCount || 0),
                                                    0
                                                )}
                                            </th>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </div>
                        )}
                    </Modal.Body>
                </Modal>

                {/* TABELA 100% */}
                <Row className="mt-3">
                    <Col xs={12}>
                        <Card>
                            <Card.Header>
                                <h4 className="card-title">Últimos pedidos</h4>
                            </Card.Header>
                            <Card.Body className="pt-0 example1-table">
                                <div className="table-responsive">
                                    <BasicTable recentOrders={recentOrders} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        </>
    );
};

Dashboard.layout = 'Contentlayout';
export default Dashboard;

export const getServerSideProps = async (context) => {
    let session;
    try {
        session = await getServerSession(context.req, context.res, authOptions);
    } catch (error) {
        console.error(
            'Erro ao obter sessão (possivelmente cookies antigos):',
            error?.message || error
        );

        const cookiesToClear = [
            'next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax',
            'next-auth.csrf-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax',
            '__Secure-next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly; SameSite=None',
            '__Host-next-auth.csrf-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None',
        ];

        context.res.setHeader('Set-Cookie', cookiesToClear);
        return { redirect: { destination: '/', permanent: false } };
    }

    if (!session) {
        return { redirect: { destination: '/', permanent: false } };
    }

    const {
        range = 'last90',
        type = 'all',
        from = '',
        to = '',
    } = context.query || {};
    const { start, end } = resolveRange({ range, from, to });

    // KPIs do período selecionado
    const kpis = await getKpisByRange({ start, end, type });

    // Histórico mensal (gráfico) usa o mesmo período selecionado
    const monthly = await getMonthlyTrends({ start, end });

    const chartData = {
        series: [
            {
                name: 'Recorrência (R$)',
                data: monthly.map((m) => Math.round(m.recurringCents / 100)),
            },
        ],
        categories: monthly.map((m) => m.month),
    };

    // ✅ Cards do mês atual (forecast/recebido/pendente/vencido) via SQL (rápido)
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
    );

    const lastDayOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
    );

    // One round-trip, deduplicated by company + due day + amount
    const rows = await prisma.$queryRaw`
      SELECT
        COALESCE(SUM(d.amountCents), 0) AS totalMonthlyFeesCents,

        COALESCE(SUM(CASE WHEN d.status = 'PAID' THEN d.amountCents ELSE 0 END), 0)
          AS currentMonthRecurringCents,

        COALESCE(SUM(
          CASE
            WHEN d.status IN ('PENDING','OVERDUE') AND d.dueDate < ${startOfToday}
            THEN d.amountCents
            ELSE 0
          END
        ), 0) AS overdueCents,

        COALESCE(SUM(
          CASE
            WHEN d.status IN ('PENDING','OVERDUE')
             AND d.dueDate >= ${startOfToday}
             AND d.dueDate <= ${lastDayOfMonth}
            THEN d.amountCents
            ELSE 0
          END
        ), 0) AS pendingToEndCents,

        COALESCE(COUNT(DISTINCT
          CASE
            WHEN d.status IN ('PENDING','OVERDUE') AND d.dueDate < ${startOfToday}
            THEN d.companyId
            ELSE NULL
          END
        ), 0) AS overdueClientsCount
      FROM (
        SELECT
          i.companyId,
          DATE(i.dueDate) AS dueDay,
          i.amountCents,
          MIN(i.dueDate) AS dueDate,
          CASE
            WHEN SUM(i.status = 'OVERDUE') > 0 THEN 'OVERDUE'
            WHEN SUM(i.status = 'PENDING') > 0 THEN 'PENDING'
            WHEN SUM(i.status = 'PAID') > 0 THEN 'PAID'
            ELSE 'CANCELED'
          END AS status
        FROM Invoice i
        WHERE
          i.periodYear = ${currentYear}
          AND i.periodMonth = ${currentMonth}
          AND i.isFuture = 0
          AND i.status IN ('PAID','PENDING','OVERDUE')
        GROUP BY
          i.companyId,
          DATE(i.dueDate),
          i.amountCents
      ) d;
    `;

    const agg = Array.isArray(rows) ? rows[0] : rows;

    // MySQL aggregates may come as strings depending on driver → normalize
    const totalMonthlyFeesCents = Number(agg?.totalMonthlyFeesCents || 0);
    const currentMonthRecurringCents = Number(
        agg?.currentMonthRecurringCents || 0
    );
    const pendingToEndCents = Number(agg?.pendingToEndCents || 0);
    const overdueCents = Number(agg?.overdueCents || 0);
    const overdueClientsCount = Number(agg?.overdueClientsCount || 0);

    const recentOrders = await getRecentPayments(20, { start, end, type });

    return {
        props: {
            // filtros atuais
            initialRange: range,
            initialType: type,
            initialFrom: from || null,
            initialTo: to || null,

            // KPIs (em reais)
            total: (kpis.totalCents || 0) / 100,
            recurring: (kpis.recurringCents || 0) / 100,
            newSales: (kpis.newSalesCents || 0) / 100,
            chartData,
            recentOrders,

            // Cards (mês atual - deduplicado e sem futuros)
            currentMonthRecurring: currentMonthRecurringCents / 100, // PAID
            totalMonthlyFees: totalMonthlyFeesCents / 100, // PAID + PENDING + OVERDUE
            pendingAmount: pendingToEndCents / 100, // due >= today, <= end of month (unpaid)
            overdueAmount: overdueCents / 100, // due < today (unpaid)
            overdueClientsCount,
        },
    };
};
