'use client';

import Pageheader from '@/shared/layout-components/pageheader/pageheader';
import Seo from '@/shared/layout-components/seo/seo';
import { getServerSession } from 'next-auth';
import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import styles from './styles.module.scss';

export default function PagamentosPage() {
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [summary, setSummary] = useState({ amount: 0, count: 0 });

    // 🔎 filtros/ordenação
    const [q, setQ] = useState('');
    const [sortBy, setSortBy] = useState('totalPaid'); // 'totalPaid' | 'paidCount' | 'lastPaidAt' | 'name'
    const [sortDir, setSortDir] = useState('desc'); // 'asc' | 'desc'

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    '/api/server/db/finance/getPaymentsByCompany'
                );
                const data = await res.json();
                const list = Array.isArray(data?.companies)
                    ? data.companies
                    : [];
                setCompanies(list);
                setSummary({
                    amount: data?.totalAmountPaid || 0,
                    count: data?.companiesCount || list.length || 0,
                });
            } catch {
                setCompanies([]);
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

    const ensureHttps = (url) =>
        !url ? null : /^https?:\/\//i.test(url) ? url : `https://${url}`;

    const waLink = (rawPhone, name) => {
        if (!rawPhone) return null;
        const digits = String(rawPhone).replace(/\D/g, '');
        const phone = digits.startsWith('55') ? digits : `55${digits}`;
        const txt = encodeURIComponent(
            `Olá ${
                name?.split(' ')?.[0] || ''
            }! Tudo bem? Obrigado pelos pagamentos.`
        );
        return `https://wa.me/${phone}?text=${txt}`;
    };

    // 🔢 totais gerais independentes de filtro
    const totalPaidInvoicesAll = useMemo(
        () => companies.reduce((a, b) => a + (b.paidCount || 0), 0),
        [companies]
    );

    // 🔎 filtro + ordenação
    const filteredSorted = useMemo(() => {
        const term = q.trim().toLowerCase();

        const filtered = !term
            ? companies
            : companies.filter((c) => {
                  const domain = cleanDomain(c.website)?.toLowerCase() || '';
                  return (
                      (c.name || '').toLowerCase().includes(term) ||
                      (c.email || '').toLowerCase().includes(term) ||
                      domain.includes(term)
                  );
              });

        const dir = sortDir === 'asc' ? 1 : -1;
        const sorted = [...filtered].sort((a, b) => {
            const getKey = (x) => {
                switch (sortBy) {
                    case 'paidCount':
                        return Number(x.paidCount || 0);
                    case 'lastPaidAt':
                        return x.lastPaidAt
                            ? new Date(x.lastPaidAt).getTime()
                            : 0;
                    case 'name':
                        return (x.name || '').toLowerCase();
                    case 'totalPaid':
                    default:
                        return Number(x.totalPaid || 0);
                }
            };

            const A = getKey(a);
            const B = getKey(b);

            if (typeof A === 'string' && typeof B === 'string') {
                return A.localeCompare(B) * dir;
            }
            if (A < B) return -1 * dir;
            if (A > B) return 1 * dir;
            // tie-breakers: totalPaid desc, paidCount desc, name asc
            const t1 = Number(b.totalPaid || 0) - Number(a.totalPaid || 0);
            if (t1 !== 0) return t1 * (dir === -1 ? 1 : -1);
            const t2 = Number(b.paidCount || 0) - Number(a.paidCount || 0);
            if (t2 !== 0) return t2 * (dir === -1 ? 1 : -1);
            return (a.name || '').localeCompare(b.name || '');
        });

        return sorted;
    }, [companies, q, sortBy, sortDir]);

    // 🔢 totais do resultado filtrado
    const totalPaidInvoicesFiltered = useMemo(
        () => filteredSorted.reduce((a, b) => a + (b.paidCount || 0), 0),
        [filteredSorted]
    );
    const totalAmountFiltered = useMemo(
        () => filteredSorted.reduce((a, b) => a + (b.totalPaid || 0), 0),
        [filteredSorted]
    );

    return (
        <div className={styles.page}>
            <Seo title="Pagamentos" />
            <Pageheader
                title="PAGAMENTOS"
                heading="Pagamentos"
                active="Pagamentos"
            />

            <Row className="mb-3">
                <Col xs={12}>
                    <Card className={styles.card}>
                        <Card.Header className={`${styles.cardHeader}`}>
                            <div className="w-100">
                                <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 w-100">
                                    {/* 1) Título + meta (esquerda) */}
                                    <div className="flex-grow-1">
                                        <h4 className="card-title mb-0">
                                            Empresas com pagamentos
                                        </h4>
                                        {!loading && (
                                            <div className={styles.subtleMeta}>
                                                {summary.count} empresas •{' '}
                                                {formatAmount(summary.amount)}
                                                {q && (
                                                    <>
                                                        {' '}
                                                        <span className="text-muted">
                                                            |
                                                        </span>{' '}
                                                        {filteredSorted.length}{' '}
                                                        resultado(s) •{' '}
                                                        {formatAmount(
                                                            totalAmountFiltered
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* 2) Filtros (centro) */}
                                    <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2">
                                        <Form.Control
                                            size="sm"
                                            placeholder="Buscar por empresa, e-mail ou domínio…"
                                            value={q}
                                            onChange={(e) =>
                                                setQ(e.target.value)
                                            }
                                            style={{
                                                minWidth: 240,
                                                width: 320,
                                                maxWidth: '36vw',
                                            }}
                                        />
                                        <div className="d-flex align-items-center gap-2">
                                            <Form.Select
                                                size="sm"
                                                value={sortBy}
                                                onChange={(e) =>
                                                    setSortBy(e.target.value)
                                                }
                                                style={{ minWidth: 220 }}
                                                aria-label="Ordenação"
                                            >
                                                <option value="totalPaid">
                                                    Ordenar por: Valor total
                                                    (R$)
                                                </option>
                                                <option value="paidCount">
                                                    Ordenar por: Quantidade
                                                    (Qtd)
                                                </option>
                                                <option value="lastPaidAt">
                                                    Ordenar por: Último
                                                    pagamento
                                                </option>
                                                <option value="name">
                                                    Ordenar por: Nome (A–Z)
                                                </option>
                                            </Form.Select>

                                            <Button
                                                size="sm"
                                                variant="outline-secondary"
                                                onClick={() =>
                                                    setSortDir((d) =>
                                                        d === 'asc'
                                                            ? 'desc'
                                                            : 'asc'
                                                    )
                                                }
                                                title={
                                                    sortDir === 'asc'
                                                        ? 'Direção: ascendente'
                                                        : 'Direção: descendente'
                                                }
                                            >
                                                {sortDir === 'asc'
                                                    ? '↑ Asc'
                                                    : '↓ Desc'}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* 3) Totais (direita) */}
                                    {!loading && (
                                        <div
                                            className={`d-flex gap-2 ms-lg-auto ${styles.pillGroup}`}
                                        >
                                            <span className={styles.pill}>
                                                <span
                                                    className={styles.pillTitle}
                                                >
                                                    Total recebido
                                                </span>
                                                <span
                                                    className={styles.pillValue}
                                                >
                                                    {q
                                                        ? formatAmount(
                                                              totalAmountFiltered
                                                          )
                                                        : formatAmount(
                                                              summary.amount
                                                          )}
                                                </span>
                                            </span>
                                            <span className={styles.pill}>
                                                <span
                                                    className={styles.pillTitle}
                                                >
                                                    Faturas pagas
                                                </span>
                                                <span
                                                    className={styles.pillValue}
                                                >
                                                    {q
                                                        ? totalPaidInvoicesFiltered
                                                        : totalPaidInvoicesAll}
                                                </span>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card.Header>

                        <Card.Body className={styles.cardBody}>
                            {loading ? (
                                <div className="d-flex justify-content-center py-4">
                                    <Spinner animation="border" role="status" />
                                </div>
                            ) : filteredSorted.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <div className={styles.emptyEmoji}>🔍</div>
                                    <div className={styles.emptyTitle}>
                                        Nada encontrado
                                    </div>
                                    <div className={styles.emptyText}>
                                        Ajuste os filtros ou a busca.
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
                                                    Empresa
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
                                                    Último pagamento
                                                </th>
                                                <th
                                                    className={`${styles.stickyTh} text-end`}
                                                >
                                                    Faturas pagas
                                                </th>
                                                <th
                                                    className={`${styles.stickyTh} text-end`}
                                                >
                                                    Total pago
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredSorted.map((c) => {
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
                                                        <td className="d-none d-md-table-cell">
                                                            {siteHref ? (
                                                                <a
                                                                    href={
                                                                        siteHref
                                                                    }
                                                                    className={`${styles.linkWebsite} text-decoration-none d-inline-flex align-items-center gap-1`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <span className="underline-text">
                                                                        {domain}
                                                                    </span>
                                                                    <i className="bi bi-box-arrow-up-right small opacity-75" />
                                                                </a>
                                                            ) : (
                                                                <span className="text-muted small">
                                                                    sem site
                                                                </span>
                                                            )}
                                                        </td>

                                                        <td className="text-end">
                                                            {formatDate(
                                                                c.lastPaidAt
                                                            )}
                                                        </td>
                                                        <td className="text-end fw-semibold">
                                                            {c.paidCount || 0}
                                                        </td>
                                                        <td className="text-end fw-bold">
                                                            {formatAmount(
                                                                c.totalPaid || 0
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>

                                        <tfoot className={styles.tfoot}>
                                            <tr>
                                                <th
                                                    colSpan={3}
                                                    className="d-none d-md-table-cell"
                                                >
                                                    Total
                                                </th>
                                                <th className="text-end">—</th>
                                                <th className="text-end">
                                                    {q
                                                        ? totalPaidInvoicesFiltered
                                                        : totalPaidInvoicesAll}
                                                </th>
                                                <th className="text-end">
                                                    {q
                                                        ? formatAmount(
                                                              totalAmountFiltered
                                                          )
                                                        : formatAmount(
                                                              summary.amount
                                                          )}
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

PagamentosPage.layout = 'Contentlayout';

export const getServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res);
    if (!session) return { redirect: { destination: '/', permanent: false } };
    return { props: {} };
};
