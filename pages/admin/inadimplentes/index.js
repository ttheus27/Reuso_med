'use client';

import Pageheader from '@/shared/layout-components/pageheader/pageheader';
import Seo from '@/shared/layout-components/seo/seo';
import { getServerSession } from 'next-auth';
import { useEffect, useMemo, useState } from 'react';
import { Card, Col, Row, Spinner, Table } from 'react-bootstrap';
import styles from './styles.module.scss';

const daysBetweenToday = (iso) => {
    if (!iso) return null;
    const d = new Date(iso);
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const diff = start.getTime() - d.getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
};

export default function OverdueClientsPage() {
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [summary, setSummary] = useState({ amount: 0, count: 0 });

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    '/api/server/db/finance/getOverdueClients'
                );
                const data = await res.json();
                const list = Array.isArray(data?.clients) ? data.clients : [];
                setClients(list);
                setSummary({
                    amount: data?.overdueAmount || 0,
                    count: data?.overdueClientsCount || list.length || 0,
                });
            } catch {
                setClients([]);
                setSummary({ amount: 0, count: 0 });
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const formatAmount = (amount) =>
        new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(amount ?? 0);

    const formatDate = (iso) => {
        if (!iso) return '—';
        try {
            const d = new Date(iso);
            return new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }).format(d);
        } catch {
            return '—';
        }
    };

    const totalInvoices = useMemo(
        () => clients.reduce((a, b) => a + (b.invoiceCount || 0), 0),
        [clients]
    );

    const initials = (name = '') =>
        name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((p) => p[0]?.toUpperCase())
            .join('') || '•';

    const cleanDomain = (url) => {
        if (!url) return '';
        try {
            const withProto = /^https?:\/\//i.test(url)
                ? url
                : `https://${url}`;
            const u = new URL(withProto);
            return u.hostname.replace(/^www\./, '');
        } catch {
            return url;
        }
    };

    const ensureHttps = (url) => {
        if (!url) return null;
        return /^https?:\/\//i.test(url) ? url : `https://${url}`;
    };

    const waLink = (rawPhone, name) => {
        if (!rawPhone) return null;
        const digits = String(rawPhone).replace(/\D/g, '');
        const phone = digits.startsWith('55') ? digits : `55${digits}`;
        const txt = encodeURIComponent(
            `Olá ${
                name?.split(' ')?.[0] || ''
            }! Tudo bem? Vi aqui um valor em aberto e posso te ajudar a regularizar.`
        );
        return `https://wa.me/${phone}?text=${txt}`;
    };

    const contractBadge = (status) => {
        const map = {
            active: {
                label: 'Ver Contrato',
                cls: styles['statusBadge--active'],
            },
            pending: { label: 'Pendente', cls: styles['statusBadge--pending'] },
            canceled: {
                label: 'Cancelado',
                cls: styles['statusBadge--canceled'],
            },
        };
        const key = (status || '').toLowerCase();
        const conf = map[key] || {
            label: '—',
            cls: styles['statusBadge--neutral'],
        };
        return (
            <span className={`${styles.statusBadge} ${conf.cls}`}>
                {conf.label}
            </span>
        );
    };

    return (
        <div className={styles.page}>
            <Seo title="Inadimplentes" />
            <Pageheader
                title="INADIMPLENTES"
                heading="Inadimplentes"
                active="Inadimplentes"
            />

            <Row>
                <Col xs={12}>
                    <Card className={styles.card}>
                        <Card.Header className={styles.cardHeader}>
                            <div>
                                <h4 className="card-title mb-0">
                                    Clientes inadimplentes
                                </h4>
                                {!loading && (
                                    <div className={styles.subtleMeta}>
                                        {summary.count} cliente
                                        {summary.count === 1 ? '' : 's'} •{' '}
                                        {formatAmount(summary.amount)}
                                    </div>
                                )}
                            </div>

                            {!loading && summary.count > 0 && (
                                <div className={styles.pillGroup}>
                                    <span className={styles.pill}>
                                        <span className={styles.pillTitle}>
                                            Total em aberto
                                        </span>
                                        <span className={styles.pillValue}>
                                            {formatAmount(summary.amount)}
                                        </span>
                                    </span>
                                    <span className={styles.pill}>
                                        <span className={styles.pillTitle}>
                                            Mensalidades
                                        </span>
                                        <span className={styles.pillValue}>
                                            {totalInvoices}
                                        </span>
                                    </span>
                                </div>
                            )}
                        </Card.Header>

                        <Card.Body className={styles.cardBody}>
                            {loading ? (
                                <div className="d-flex justify-content-center py-4">
                                    <Spinner animation="border" role="status" />
                                </div>
                            ) : clients.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <div className={styles.emptyEmoji}>🎉</div>
                                    <div className={styles.emptyTitle}>
                                        Sem inadimplentes por aqui
                                    </div>
                                    <div className={styles.emptyText}>
                                        Nada em aberto no mês atual.
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.tableWrap}>
                                    <Table
                                        hover
                                        responsive
                                        className={styles.table}
                                    >
                                        <thead>
                                            <tr>
                                                <th className={styles.stickyTh}>
                                                    Cliente
                                                </th>
                                                <th
                                                    className={`${styles.stickyTh} text-center`}
                                                >
                                                    Contato
                                                </th>
                                                <th
                                                    className={`${styles.stickyTh} d-none d-md-table-cell`}
                                                >
                                                    Website
                                                </th>

                                                <th
                                                    className={`${styles.stickyTh} text-end`}
                                                >
                                                    Data do pagamento
                                                </th>

                                                <th
                                                    className={`${styles.stickyTh} d-none d-lg-table-cell`}
                                                >
                                                    Contrato
                                                </th>
                                                <th
                                                    className={`${styles.stickyTh} text-end`}
                                                >
                                                    Valor em aberto
                                                </th>
                                                <th
                                                    className={`${styles.stickyTh} text-end`}
                                                >
                                                    Mensalidades
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {clients.map((c) => {
                                                const siteHref = ensureHttps(
                                                    c.website
                                                );
                                                const domain = cleanDomain(
                                                    c.website
                                                );
                                                const wa = waLink(
                                                    c.whatsapp || c.phone,
                                                    c.name
                                                );
                                                const hasContract = Boolean(
                                                    c.contractUrl
                                                );

                                                return (
                                                    <tr key={c.id}>
                                                        <td>
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span
                                                                    className={
                                                                        styles.avatar
                                                                    }
                                                                >
                                                                    {initials(
                                                                        c.name
                                                                    )}
                                                                </span>
                                                                <div>
                                                                    <div className="fw-semibold">
                                                                        {c.name}
                                                                    </div>
                                                                    <div className="text-muted small">
                                                                        {c.email ||
                                                                            'sem e-mail'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Contato */}
                                                        <td className="text-center">
                                                            {wa ? (
                                                                <a
                                                                    href={wa}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="btn btn-success btn-sm d-inline-flex align-items-center gap-1"
                                                                >
                                                                    <i className="bi bi-whatsapp" />
                                                                    WhatsApp
                                                                </a>
                                                            ) : (
                                                                <span className="text-muted small">
                                                                    sem telefone
                                                                </span>
                                                            )}
                                                        </td>

                                                        {/* Website */}
                                                        <td className="d-none d-md-table-cell">
                                                            {siteHref ? (
                                                                <a
                                                                    href={
                                                                        siteHref
                                                                    }
                                                                    className="text-decoration-none"
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    {domain}
                                                                </a>
                                                            ) : (
                                                                <span className="text-muted small">
                                                                    sem site
                                                                </span>
                                                            )}
                                                        </td>

                                                        {/* Data em destaque */}
                                                        <td className="text-end">
                                                            {c.dueDate ||
                                                            c.lastInvoiceDueDate ? (
                                                                (() => {
                                                                    const iso =
                                                                        c.dueDate ??
                                                                        c.lastInvoiceDueDate;
                                                                    const days =
                                                                        daysBetweenToday(
                                                                            iso
                                                                        );
                                                                    const cls =
                                                                        days > 7
                                                                            ? `${styles.dateBadge} ${styles['dateBadge--danger']}`
                                                                            : `${styles.dateBadge} ${styles['dateBadge--warn']}`;

                                                                    return (
                                                                        <span
                                                                            className={
                                                                                cls
                                                                            }
                                                                            title={
                                                                                days
                                                                                    ? `${days} dia(s) em atraso`
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            {formatDate(
                                                                                iso
                                                                            )}
                                                                            {typeof days ===
                                                                                'number' &&
                                                                                days >
                                                                                    0 && (
                                                                                    <span
                                                                                        className={
                                                                                            styles.dateBadgeDays
                                                                                        }
                                                                                    >
                                                                                        {' '}
                                                                                        ·{' '}
                                                                                        {
                                                                                            days
                                                                                        }
                                                                                        d
                                                                                    </span>
                                                                                )}
                                                                        </span>
                                                                    );
                                                                })()
                                                            ) : (
                                                                <span className="text-muted small">
                                                                    —
                                                                </span>
                                                            )}
                                                        </td>

                                                        {/* Contrato */}
                                                        <td className="d-none d-lg-table-cell">
                                                            {contractBadge(
                                                                c.contractStatus
                                                            )}
                                                            {hasContract && (
                                                                <a
                                                                    className="ms-2 small text-decoration-none"
                                                                    href={ensureHttps(
                                                                        c.contractUrl
                                                                    )}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    ver contrato
                                                                </a>
                                                            )}
                                                        </td>

                                                        {/* Valor */}
                                                        <td className="text-end fw-bold">
                                                            {formatAmount(
                                                                c.totalOverdue ||
                                                                    0
                                                            )}
                                                        </td>

                                                        {/* Mensalidades */}
                                                        <td className="text-end fw-semibold">
                                                            {c.invoiceCount ||
                                                                0}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>

                                        <tfoot className={styles.tfoot}>
                                            <tr>
                                                <th
                                                    colSpan={5}
                                                    className="d-none d-md-table-cell"
                                                >
                                                    Total
                                                </th>
                                                <th className="text-end">
                                                    {formatAmount(
                                                        summary.amount
                                                    )}
                                                </th>
                                                <th className="text-end">
                                                    {totalInvoices}
                                                </th>
                                            </tr>
                                        </tfoot>
                                    </Table>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

OverdueClientsPage.layout = 'Contentlayout';

export const getServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res);
    if (!session) return { redirect: { destination: '/', permanent: false } };
    return { props: {} };
};
