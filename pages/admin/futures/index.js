'use client';

import Pageheader from '@/shared/layout-components/pageheader/pageheader';
import Seo from '@/shared/layout-components/seo/seo';
import { getServerSession } from 'next-auth';
import { useEffect, useMemo, useState } from 'react';
import {
    Button,
    Card,
    Col,
    Form,
    Modal,
    Row,
    Spinner,
    Table,
} from 'react-bootstrap';
import styles from './styles.module.scss';

export default function FuturePaymentsPage() {
    // 🔍 busca de empresa
    const [companyQuery, setCompanyQuery] = useState('');
    const [companyResults, setCompanyResults] = useState([]);
    const [companySearchLoading, setCompanySearchLoading] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const [loading, setLoading] = useState(true);
    const [invoices, setInvoices] = useState([]);
    const [summary, setSummary] = useState({ amount: 0, count: 0 }); // vindo da API, mas não usamos mais no header/rodapé

    // filtros / ordenação
    const [q, setQ] = useState('');
    const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate' | 'amount' | 'companyName' | 'status'
    const [sortDir, setSortDir] = useState('asc'); // 'asc' | 'desc'

    // modal + CRUD
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null); // invoice ou null
    const [form, setForm] = useState({
        companyId: '',
        amount: '',
        dueDate: '',
    });
    const [saving, setSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // ==========================
    // helpers
    // ==========================
    const formatAmount = (amount) =>
        new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format((amount ?? 0) / 100);

    const formatAmountFromReais = (amountReaisStr) => {
        if (!amountReaisStr) return 0;
        const normalized = String(amountReaisStr)
            .replace('.', '')
            .replace(',', '.');
        const num = Number(normalized);
        if (!Number.isFinite(num)) return 0;
        return Math.round(num * 100);
    };

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

    const dateIsoToInput = (iso) => {
        if (!iso) return '';
        try {
            const d = new Date(iso);
            if (Number.isNaN(d.getTime())) return '';
            return d.toISOString().slice(0, 10);
        } catch {
            return '';
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
            }! Tudo bem? Sobre aquele pagamento futuro...`
        );
        return `https://wa.me/${phone}?text=${txt}`;
    };

    const statusLabel = (s) => {
        switch (s) {
            case 'PAID':
                return 'Pago';
            case 'OVERDUE':
                return 'Vencido';
            case 'CANCELED':
                return 'Cancelado';
            case 'PENDING':
            default:
                return 'Pendente';
        }
    };

    // ==========================
    // load data
    // ==========================
    const loadInvoices = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/server/db/invoice/getFutureInvoices');
            const data = await res.json();

            const list = Array.isArray(data?.invoices) ? data.invoices : [];
            setInvoices(list);
            setSummary({
                amount: data?.totalAmountCents || 0,
                count: data?.invoicesCount || list.length || 0,
            });
        } catch (err) {
            console.error(err);
            setInvoices([]);
            setSummary({ amount: 0, count: 0 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInvoices();
    }, []);

    // ==========================
    // empresas autocomplete
    // ==========================
    useEffect(() => {
        if (!showModal) return;

        const term = companyQuery.trim();
        if (term.length < 2) {
            setCompanyResults([]);
            setCompanySearchLoading(false);
            return;
        }

        let cancel = false;
        setCompanySearchLoading(true);

        const timer = setTimeout(async () => {
            try {
                const res = await fetch(
                    `/api/server/db/company/search?q=${encodeURIComponent(
                        term
                    )}`
                );
                if (!res.ok) throw new Error('Erro ao buscar empresas');
                const data = await res.json();
                if (cancel) return;
                const list = Array.isArray(data?.companies)
                    ? data.companies
                    : [];
                setCompanyResults(list);
            } catch (e) {
                if (!cancel) {
                    console.error(e);
                    setCompanyResults([]);
                }
            } finally {
                if (!cancel) setCompanySearchLoading(false);
            }
        }, 300); // debounce 300ms

        return () => {
            cancel = true;
            clearTimeout(timer);
        };
    }, [companyQuery, showModal]);

    // ==========================
    // filtros: esconder PAID
    // ==========================

    // invoices que ainda devem aparecer na tela (ignorando as pagas)
    const visibleInvoices = useMemo(
        () => invoices.filter((inv) => inv.status !== 'PAID'),
        [invoices]
    );

    // resumo baseado só nas visíveis
    const visibleSummary = useMemo(
        () => ({
            count: visibleInvoices.length,
            amount: visibleInvoices.reduce(
                (acc, inv) => acc + (inv.amountCents || 0),
                0
            ),
        }),
        [visibleInvoices]
    );

    // filtro + ordenação
    const filteredSorted = useMemo(() => {
        const term = q.trim().toLowerCase();
        const base = visibleInvoices;

        const filtered = !term
            ? base
            : base.filter((inv) => {
                  const name = inv.company?.name?.toLowerCase() || '';
                  const email = inv.company?.email?.toLowerCase() || '';
                  const domain =
                      cleanDomain(inv.company?.website)?.toLowerCase() || '';
                  return (
                      name.includes(term) ||
                      email.includes(term) ||
                      domain.includes(term)
                  );
              });

        const dir = sortDir === 'asc' ? 1 : -1;

        const sorted = [...filtered].sort((a, b) => {
            const getKey = (x) => {
                switch (sortBy) {
                    case 'amount':
                        return Number(x.amountCents || 0);
                    case 'companyName':
                        return (x.company?.name || '').toLowerCase();
                    case 'status':
                        return (x.status || '').toLowerCase();
                    case 'dueDate':
                    default:
                        return x.dueDate ? new Date(x.dueDate).getTime() : 0;
                }
            };

            const A = getKey(a);
            const B = getKey(b);

            if (typeof A === 'string' && typeof B === 'string') {
                return A.localeCompare(B) * dir;
            }
            if (A < B) return -1 * dir;
            if (A > B) return 1 * dir;

            // tie-breakers
            const t1 = (a.company?.name || '').localeCompare(
                b.company?.name || ''
            );
            if (t1 !== 0) return t1;

            return (a.id || 0) - (b.id || 0);
        });

        return sorted;
    }, [visibleInvoices, q, sortBy, sortDir]);

    const totalAmountFiltered = useMemo(
        () =>
            filteredSorted.reduce(
                (acc, inv) => acc + (inv.amountCents || 0),
                0
            ),
        [filteredSorted]
    );

    // ==========================
    // form helpers
    // ==========================
    const resetForm = () => {
        setForm({
            amount: '',
            dueDate: '',
        });
        setCompanyQuery('');
        setCompanyResults([]);
        setSelectedCompany(null);
        setErrorMsg('');
    };

    const handleOpenNew = () => {
        setEditing(null);
        resetForm();
        setShowModal(true);
    };

    const handleOpenEdit = (invoice) => {
        setEditing(invoice);
        setForm({
            amount: (invoice.amountCents / 100).toString().replace('.', ','),
            dueDate: dateIsoToInput(invoice.dueDate),
        });

        const comp =
            invoice.company ||
            (invoice.companyId && { id: invoice.companyId }) ||
            null;

        setSelectedCompany(comp);
        setCompanyQuery(comp?.name || '');
        setCompanyResults([]);
        setErrorMsg('');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        if (saving) return;
        setShowModal(false);
        setEditing(null);
        resetForm();
    };

    const handleFormChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!selectedCompany?.id) {
            setErrorMsg('Selecione uma empresa na busca.');
            return;
        }

        if (!form.dueDate) {
            setErrorMsg('Informe a data de vencimento.');
            return;
        }
        if (!form.amount) {
            setErrorMsg('Informe o valor.');
            return;
        }

        const amountCents = formatAmountFromReais(form.amount);
        if (!amountCents || amountCents <= 0) {
            setErrorMsg('Informe um valor maior que zero.');
            return;
        }

        setSaving(true);
        try {
            const payload = {
                id: editing?.id,
                companyId: Number(selectedCompany.id),
                amountCents,
                dueDate: form.dueDate,
            };

            const method = editing ? 'PUT' : 'POST';

            const res = await fetch('/api/server/db/invoice/futureInvoice', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(
                    errData?.message || 'Erro ao salvar pagamento futuro.'
                );
            }

            await loadInvoices();
            handleCloseModal();
        } catch (err) {
            console.error(err);
            setErrorMsg(err.message || 'Erro ao salvar pagamento futuro.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (invoice) => {
        if (!invoice?.id) return;
        const ok = window.confirm(
            `Tem certeza que deseja excluir o pagamento futuro da empresa "${
                invoice.company?.name || ''
            }"?`
        );
        if (!ok) return;

        try {
            const res = await fetch('/api/server/db/finance/futureInvoice', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: invoice.id }),
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(
                    errData?.message || 'Erro ao excluir pagamento futuro.'
                );
            }
            await loadInvoices();
        } catch (err) {
            console.error(err);
            alert(err.message || 'Erro ao excluir pagamento futuro.');
        }
    };

    // ==========================
    // render
    // ==========================
    return (
        <div className={styles.page}>
            <Seo title="Pagamentos Futuros" />
            <Pageheader
                title="PAGAMENTOS FUTUROS"
                heading="Pagamentos Futuros"
                active="Pagamentos Futuros"
            />

            <Row className="mb-3">
                <Col xs={12}>
                    <Card className={styles.card}>
                        <Card.Header className={styles.cardHeader}>
                            <div className="w-100">
                                <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 w-100">
                                    {/* 1) Título + meta */}
                                    <div className="flex-grow-1">
                                        <h4 className="card-title mb-0">
                                            Pagamentos futuros (invoices únicas)
                                        </h4>
                                        {!loading && (
                                            <div className={styles.subtleMeta}>
                                                {visibleSummary.count}{' '}
                                                pagamento(s) •{' '}
                                                {formatAmount(
                                                    visibleSummary.amount
                                                )}
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

                                    {/* 2) Filtros */}
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
                                                <option value="dueDate">
                                                    Ordenar por: Vencimento
                                                </option>
                                                <option value="amount">
                                                    Ordenar por: Valor
                                                </option>
                                                <option value="companyName">
                                                    Ordenar por: Empresa
                                                </option>
                                                <option value="status">
                                                    Ordenar por: Status
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

                                    {/* 3) Ações / botão novo */}
                                    <div className="d-flex flex-row gap-2 ms-lg-auto">
                                        <Button
                                            size="sm"
                                            variant="primary"
                                            onClick={handleOpenNew}
                                        >
                                            + Novo pagamento futuro
                                        </Button>
                                    </div>
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
                                    <div className={styles.emptyEmoji}>📅</div>
                                    <div className={styles.emptyTitle}>
                                        Nenhum pagamento futuro
                                    </div>
                                    <div className={styles.emptyText}>
                                        Clique em{' '}
                                        <strong>“Novo pagamento futuro”</strong>{' '}
                                        para agendar uma nova invoice única.
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
                                                    className={`${styles.stickyTh} d-none d-md-table-cell`}
                                                >
                                                    Website
                                                </th>
                                                <th
                                                    className={`${styles.stickyTh} text-center`}
                                                >
                                                    Contato
                                                </th>
                                                <th
                                                    className={`${styles.stickyTh} text-end`}
                                                >
                                                    Vencimento
                                                </th>
                                                <th
                                                    className={`${styles.stickyTh} text-end`}
                                                >
                                                    Valor
                                                </th>
                                                <th
                                                    className={`${styles.stickyTh} text-center`}
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    className={`${styles.stickyTh} text-end`}
                                                >
                                                    Ações
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredSorted.map((inv) => {
                                                const c = inv.company || {};
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
                                                    <tr key={inv.id}>
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
                                                                        {c.name ||
                                                                            '—'}
                                                                    </div>
                                                                    <div className="text-muted small">
                                                                        {c.email ||
                                                                            'sem e-mail'}
                                                                    </div>
                                                                    <div className="text-muted small">
                                                                        ID
                                                                        empresa:{' '}
                                                                        {c.id ??
                                                                            inv.companyId ??
                                                                            '—'}
                                                                    </div>
                                                                </div>
                                                            </div>
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

                                                        <td className="text-end">
                                                            {formatDate(
                                                                inv.dueDate
                                                            )}
                                                        </td>
                                                        <td className="text-end fw-bold">
                                                            {formatAmount(
                                                                inv.amountCents
                                                            )}
                                                        </td>
                                                        <td className="text-center">
                                                            <span
                                                                className={
                                                                    inv.status ===
                                                                    'OVERDUE'
                                                                        ? styles.badgeStatusOverdue
                                                                        : inv.status ===
                                                                          'PENDING'
                                                                        ? styles.badgeStatusPending
                                                                        : styles.badgeStatusDefault
                                                                }
                                                            >
                                                                {statusLabel(
                                                                    inv.status
                                                                )}
                                                            </span>
                                                        </td>

                                                        <td className="text-end">
                                                            <div className="btn-group btn-group-sm">
                                                                <Button
                                                                    variant="outline-secondary"
                                                                    onClick={() =>
                                                                        handleOpenEdit(
                                                                            inv
                                                                        )
                                                                    }
                                                                >
                                                                    Editar
                                                                </Button>
                                                                <Button
                                                                    variant="outline-danger"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            inv
                                                                        )
                                                                    }
                                                                >
                                                                    Excluir
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>

                                        <tfoot className={styles.tfoot}>
                                            <tr>
                                                <th colSpan={3}>Total</th>
                                                <th className="text-end">—</th>
                                                <th className="text-end">
                                                    {formatAmount(
                                                        q
                                                            ? totalAmountFiltered
                                                            : visibleSummary.amount
                                                    )}
                                                </th>
                                                <th className="text-center">
                                                    {q
                                                        ? filteredSorted.length
                                                        : visibleSummary.count}
                                                </th>
                                                <th />
                                            </tr>
                                        </tfoot>
                                    </Table>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* MODAL CRUD */}
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                backdrop="static"
            >
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton={!saving}>
                        <Modal.Title>
                            {editing
                                ? 'Editar pagamento futuro'
                                : 'Novo pagamento futuro'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control
                                type="text"
                                value={companyQuery}
                                onChange={(e) =>
                                    setCompanyQuery(e.target.value)
                                }
                                placeholder="Buscar por nome, e-mail ou domínio..."
                                autoComplete="off"
                            />
                            <Form.Text className="text-muted">
                                Digite pelo menos 2 letras para buscar.
                            </Form.Text>

                            {/* resultados da busca */}
                            {companyQuery.trim().length >= 2 &&
                                companyResults.length > 0 && (
                                    <div
                                        className={`${styles.companyResults} mt-2`}
                                    >
                                        {companyResults.map((c) => (
                                            <button
                                                key={c.id}
                                                type="button"
                                                className={`${
                                                    styles.companyResultItem
                                                } ${
                                                    selectedCompany?.id === c.id
                                                        ? styles.companyResultItemActive
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    setSelectedCompany(c);
                                                    setCompanyQuery(c.name);
                                                    setCompanyResults([]);
                                                }}
                                            >
                                                <div className="fw-semibold">
                                                    {c.name}
                                                </div>
                                                <div className="small text-muted">
                                                    ID {c.id}
                                                    {c.email
                                                        ? ` • ${c.email}`
                                                        : ''}
                                                    {c.website
                                                        ? ` • ${cleanDomain(
                                                              c.website
                                                          )}`
                                                        : ''}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                            {/* loading / vazio */}
                            {companyQuery.trim().length >= 2 &&
                                companySearchLoading &&
                                companyResults.length === 0 && (
                                    <div className="small text-muted mt-1">
                                        Buscando empresas...
                                    </div>
                                )}

                            {/* empresa selecionada */}
                            {selectedCompany && (
                                <div className="small mt-2">
                                    <span className="badge bg-success me-1">
                                        Selecionada
                                    </span>
                                    {selectedCompany.name} (ID{' '}
                                    {selectedCompany.id})
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Data de vencimento</Form.Label>
                            <Form.Control
                                type="date"
                                value={form.dueDate}
                                onChange={(e) =>
                                    handleFormChange('dueDate', e.target.value)
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Valor (R$)</Form.Label>
                            <Form.Control
                                type="text"
                                value={form.amount}
                                onChange={(e) =>
                                    handleFormChange('amount', e.target.value)
                                }
                                placeholder="Ex: 350,00"
                                required
                            />
                        </Form.Group>

                        {errorMsg && (
                            <div className="alert alert-danger py-2">
                                {errorMsg}
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleCloseModal}
                            disabled={saving}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={saving}
                        >
                            {saving
                                ? 'Salvando...'
                                : editing
                                ? 'Salvar alterações'
                                : 'Criar pagamento futuro'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

FuturePaymentsPage.layout = 'Contentlayout';

export const getServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res);
    if (!session) return { redirect: { destination: '/', permanent: false } };
    return { props: {} };
};
