'use client';

import Pageheader from '@/shared/layout-components/pageheader/pageheader';
import Seo from '@/shared/layout-components/seo/seo';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Badge,
    Button,
    ButtonGroup,
    Card,
    Col,
    Modal,
    OverlayTrigger,
    Row,
    Tooltip,
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.scss';

const eventDayKey = (ev) => {
    // your start is ISO string, so we can safely slice YYYY-MM-DD
    const day =
        typeof ev.start === 'string'
            ? ev.start.slice(0, 10)
            : ymdUTC(new Date(ev.start));

    const companyId =
        ev?.meta?.company?.id ?? ev?.meta?.companyId ?? 'no-company';
    const amountCents = ev?.meta?.amountCents ?? 'no-amount';

    return `${companyId}|${day}|${amountCents}`;
};

/* ========= helpers ========= */
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => {
    const x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
};
const addMonths = (d, n) => {
    const x = new Date(d);
    x.setMonth(x.getMonth() + n);
    return x;
};
const addYears = (d, n) => {
    const x = new Date(d);
    x.setFullYear(x.getFullYear() + n);
    return x;
};
const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

/** Data-UTC pura -> 'YYYY-MM-DD' (sem derrapar no fuso) */
const ymdUTC = (d) => {
    const dt = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    return dt.toISOString().slice(0, 10);
};

const getMonthMatrix = (anchor) => {
    const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    const startWeekIdx = (first.getDay() + 6) % 7; // monday
    const gridStart = addDays(first, -startWeekIdx);
    return Array.from({ length: 6 }).map((_, w) =>
        Array.from({ length: 7 }).map((__, d) => addDays(gridStart, w * 7 + d))
    );
};

const fmtMonthTitle = (d) =>
    new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(
        d
    );

const fmtWeekTitle = (ref) => {
    const start = addDays(ref, -((ref.getDay() + 6) % 7));
    const end = addDays(start, 6);
    const f = (x, withYear = false) =>
        new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'short',
            ...(withYear ? { year: 'numeric' } : {}),
        }).format(x);
    return `${f(start)} — ${f(end, start.getFullYear() !== end.getFullYear())}`;
};

const dayLabel = (d) =>
    new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })
        .format(d)
        .toUpperCase();

const formatBRL = (cents) =>
    ((cents ?? 0) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

const statusBadge = (status) => {
    switch (status) {
        case 'PAID':
            return {
                text: 'Pago✅',
                style: {
                    background: 'rgb(var(--success-rgb)) !important',
                    fontSize: '14px',
                },
            };
        case 'OVERDUE':
            return {
                text: 'Atrasado',
                style: { background: 'rgb(var(--danger-rgb)) !important' },
            };
        case 'CANCELED':
            return {
                text: 'Cancelado',
                style: { background: 'var(--gray-5) !important' },
            };
        default:
            return {
                text: 'Pendente',
                style: { background: 'rgb(var(--warning-rgb))', color: '#000' },
            };
    }
};

/* ========= page ========= */
export default function CalendarPage({ initialEvents, initialCursorISO }) {
    const [view, setView] = useState('month');
    const [cursor, setCursor] = useState(
        initialCursorISO ? new Date(initialCursorISO) : new Date()
    );
    const [events, setEvents] = useState(initialEvents ?? []);
    const [loading, setLoading] = useState(false);
    const [busy, setBusy] = useState(false);

    const [dayModal, setDayModal] = useState({
        show: false,
        date: null,
        events: [],
    });

    const [filter, setFilter] = useState(() => {
        if (typeof window === 'undefined') return 'all';
        return localStorage.getItem('calendarFilter') || 'all';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('calendarFilter', filter);
        }
    }, [filter]);

    const openDayModal = (date) => {
        const list = eventsByDay.get(ymdUTC(date)) ?? [];
        setDayModal({ show: true, date, events: list });
    };
    const closeDayModal = () =>
        setDayModal({ show: false, date: null, events: [] });

    const title = useMemo(() => {
        if (view === 'month') return fmtMonthTitle(cursor);
        if (view === 'week') return fmtWeekTitle(cursor);
        if (view === 'day')
            return new Intl.DateTimeFormat('pt-BR', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }).format(cursor);
        if (view === 'year')
            return new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(
                cursor
            );
        return fmtMonthTitle(cursor);
    }, [view, cursor]);

    const goPrev = () => {
        if (view === 'day') setCursor(addDays(cursor, -1));
        else if (view === 'week') setCursor(addDays(cursor, -7));
        else if (view === 'month') setCursor(addMonths(cursor, -1));
        else setCursor(addYears(cursor, -1));
    };
    const goNext = () => {
        if (view === 'day') setCursor(addDays(cursor, 1));
        else if (view === 'week') setCursor(addDays(cursor, 7));
        else if (view === 'month') setCursor(addMonths(cursor, 1));
        else setCursor(addYears(cursor, 1));
    };
    const goToday = () => setCursor(new Date());

    useEffect(() => {
        const onKey = (e) => {
            const k = e.key.toLowerCase();
            if (k === 'd') setView('day');
            if (k === 'w') setView('week');
            if (k === 'm') setView('month');
            if (k === 'y') setView('year');
            if (k === 'arrowleft') goPrev();
            if (k === 'arrowright') goNext();
            if (k === 't') goToday();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cursor, view]);

    const getRange = useCallback(() => {
        if (view === 'day') {
            const s = startOfDay(cursor);
            return { start: s, end: addDays(s, 1) };
        }
        if (view === 'week') {
            const s = startOfDay(addDays(cursor, -((cursor.getDay() + 6) % 7)));
            return { start: s, end: addDays(s, 7) };
        }
        if (view === 'month') {
            const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
            const startWeekIdx = (first.getDay() + 6) % 7;
            const start = addDays(first, -startWeekIdx);
            return {
                start: startOfDay(start),
                end: startOfDay(addDays(start, 42)),
            };
        }
        const yStart = new Date(cursor.getFullYear(), 0, 1);
        const yEnd = new Date(cursor.getFullYear() + 1, 0, 1);
        return { start: yStart, end: yEnd };
    }, [cursor, view]);

    const refetch = useCallback(() => {
        const { start, end } = getRange();
        // IMPORTANT: usar UTC puro nos parâmetros
        const qs = `?start=${ymdUTC(start)}&end=${ymdUTC(end)}`;
        setLoading(true);
        fetch(`/api/server/db/invoice/getInvoices${qs}`)
            .then((r) => r.json())
            .then((data) =>
                setEvents(Array.isArray(data?.events) ? data.events : [])
            )
            .catch(() => setEvents([]))
            .finally(() => setLoading(false));
    }, [getRange]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const counts = useMemo(() => {
        const base = { all: 0, invoice: 0, future: 0, overdue: 0 };
        for (const ev of events) {
            base.all++;
            if (ev?.type === 'invoice') base.invoice++;
            if (ev?.type === 'future' || ev?.isFuture) base.future++;
            if (ev?.meta?.status === 'OVERDUE') base.overdue++;
        }
        return base;
    }, [events]);

    const filteredEvents = useMemo(() => {
        // 1) filter
        let list = events;

        if (filter === 'invoice')
            list = events.filter((e) => e.type === 'invoice');
        else if (filter === 'future')
            list = events.filter((e) => e.type === 'future' || e.isFuture);
        else if (filter === 'overdue')
            list = events.filter((e) => e?.meta?.status === 'OVERDUE');

        // 2) dedupe (only invoices)
        const seen = new Set();
        const out = [];

        for (const ev of list) {
            if (ev?.type !== 'invoice') {
                out.push(ev);
                continue;
            }

            const key = eventDayKey(ev);
            if (seen.has(key)) continue;

            seen.add(key);
            out.push(ev);
        }

        return out;
    }, [events, filter]);

    // ===== indexação por dia (UTC) =====
    const eventsByDay = useMemo(() => {
        const map = new Map();
        const push = (key, ev) => {
            const arr = map.get(key) ?? [];
            arr.push(ev);
            map.set(key, arr);
        };
        filteredEvents.forEach((ev) => {
            // eventos de fatura são allDay de 1 dia: usar a própria string ISO (UTC)
            const key =
                typeof ev.start === 'string'
                    ? ev.start.slice(0, 10)
                    : ymdUTC(new Date(ev.start));
            push(key, ev);
            // se algum dia tiver multi-dia, expandir aqui se necessário
        });
        return map;
    }, [filteredEvents]);

    /* ===== renders ===== */
    const MonthGrid = () => {
        const weeks = getMonthMatrix(cursor);
        const now = new Date();
        const weekdays = Array.from({ length: 7 }).map((_, i) =>
            dayLabel(addDays(new Date(2023, 0, 2), i))
        );
        const MAX_IN_CELL = 4;

        return (
            <div className={styles.monthView}>
                <div className={`${styles.grid} ${styles.gridHeader}`}>
                    {weekdays.map((w) => (
                        <div
                            key={w}
                            className={`${styles.cell} ${styles.headerCell}`}
                        >
                            {w}
                        </div>
                    ))}
                </div>

                {weeks.map((days, wi) => (
                    <div key={wi} className={styles.grid}>
                        {days.map((d, di) => {
                            const other = d.getMonth() !== cursor.getMonth();
                            const list = eventsByDay.get(ymdUTC(d)) ?? [];
                            const visible = list.slice(0, MAX_IN_CELL);
                            const hidden = list.length - visible.length;

                            return (
                                <div
                                    key={di}
                                    className={`${styles.cell} ${
                                        styles.dayCell
                                    } ${other ? styles.muted : ''}`}
                                >
                                    <div
                                        className={`${styles.date} ${
                                            isSameDay(d, now)
                                                ? styles.today
                                                : ''
                                        }`}
                                    >
                                        {d.getDate()}
                                    </div>
                                    <div className={styles.events}>
                                        {visible.map((ev) => (
                                            <div
                                                key={ev.id + d.toDateString()}
                                                className={`${styles.event} ${styles.clickable}`}
                                                title={ev.title}
                                                onClick={() => openDayModal(d)}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) =>
                                                    e.key === 'Enter' &&
                                                    openDayModal(d)
                                                }
                                            >
                                                <span
                                                    className={styles.dot}
                                                    style={{
                                                        background:
                                                            ev.color ??
                                                            'var(--primary-color)',
                                                    }}
                                                />
                                                <span
                                                    className={styles.evtTitle}
                                                >
                                                    {ev.title}
                                                </span>
                                            </div>
                                        ))}
                                        {hidden > 0 && (
                                            <button
                                                type="button"
                                                className={styles.moreBtn}
                                                onClick={() => openDayModal(d)}
                                            >
                                                +{hidden} mais
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    };

    const DaysGrid = ({ count }) => {
        const start = addDays(cursor, -((cursor.getDay() + 6) % 7));
        const days = Array.from({ length: count }).map((_, i) =>
            addDays(start, i)
        );

        return (
            <>
                <div className={`${styles.grid} ${styles.gridHeader}`}>
                    {days.map((d) => (
                        <div
                            key={d.toDateString()}
                            className={`${styles.cell} ${styles.headerCell}`}
                        >
                            <div className={styles.big}>{d.getDate()}</div>
                            <div className={styles.sub}>
                                {new Intl.DateTimeFormat('pt-BR', {
                                    weekday: 'short',
                                }).format(d)}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.grid}>
                    {days.map((d) => {
                        const list = eventsByDay.get(ymdUTC(d)) ?? [];
                        return (
                            <div
                                key={d.toDateString()}
                                className={`${styles.cell} ${styles.dayCell} ${styles.tall}`}
                            >
                                <div className={styles.events}>
                                    {list.map((ev) => (
                                        <div
                                            key={ev.id}
                                            className={`${styles.event} ${styles.pill} ${styles.clickable}`}
                                            onClick={() => openDayModal(d)}
                                        >
                                            <span
                                                className={styles.dot}
                                                style={{
                                                    background:
                                                        ev.color ??
                                                        'var(--primary-color)',
                                                }}
                                            />
                                            <span className={styles.evtTitle}>
                                                {ev.title}
                                            </span>
                                        </div>
                                    ))}
                                    {list.length === 0 && (
                                        <div className={styles.empty}>
                                            {loading
                                                ? 'Carregando...'
                                                : 'Sem eventos'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    const YearGrid = () => {
        const months = Array.from({ length: 12 }).map(
            (_, m) => new Date(cursor.getFullYear(), m, 1)
        );
        return (
            <div className={styles.yearView}>
                {months.map((m) => {
                    const weeks = getMonthMatrix(m);
                    const label = new Intl.DateTimeFormat('pt-BR', {
                        month: 'long',
                    }).format(m);
                    return (
                        <div key={m.getMonth()} className={styles.miniMonth}>
                            <div className={styles.miniTitle}>{label}</div>
                            <div className={styles.miniGrid}>
                                {weeks.flat().map((d, i) => {
                                    const inMonth =
                                        d.getMonth() === m.getMonth();
                                    const has =
                                        (eventsByDay.get(ymdUTC(d)) ?? [])
                                            .length > 0;
                                    return (
                                        <div
                                            key={i}
                                            className={`${styles.miniCell} ${
                                                inMonth ? '' : styles.muted
                                            } ${has ? styles.has : ''}`}
                                        >
                                            {d.getDate()}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const modalTitle = useMemo(() => {
        if (!dayModal.date) return '';
        return new Intl.DateTimeFormat('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(dayModal.date);
    }, [dayModal.date]);

    /* ===== actions ===== */
    const markPaid = async (invoiceId) => {
        setBusy(true);
        closeDayModal();
        try {
            const res = await fetch('/api/server/db/invoice/markPaid', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ invoiceId }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                toast.error(err?.error || 'Falha ao atualizar cobrança');
            } else {
                toast.success('Cobrança marcada como paga ✅');
            }
        } catch {
            toast.error('Falha ao atualizar cobrança');
        } finally {
            await refetch();
            setBusy(false);
        }
    };

    const cancelFutureForCompany = async (companyId) => {
        if (
            !confirm(
                'Tem certeza? Isso irá cancelar TODAS as mensalidades pendentes (incluindo as do mês atual) e desativar a recorrência desta empresa.'
            )
        )
            return;
        setBusy(true);
        closeDayModal();
        try {
            const res = await fetch(
                '/api/server/db/invoice/cancelFutureMonthlyFees',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ companyId }),
                }
            );
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                toast.error(
                    err?.error || 'Falha ao cancelar próximas mensalidades'
                );
            } else {
                toast.success('Próximas mensalidades canceladas ✅');
            }
        } catch {
            toast.error('Falha ao cancelar próximas mensalidades');
        } finally {
            await refetch();
            setBusy(false);
        }
    };

    const buildWaLink = (raw) => {
        if (!raw) return null;
        const digits = String(raw).replace(/\D/g, '');
        if (!digits) return null;
        return `https://wa.me/${digits}`;
    };

    const normalizeUrl = (u) => {
        if (!u) return null;
        let s = String(u).trim();
        if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
        try {
            // valida URL
            new URL(s);
            return s;
        } catch {
            return null;
        }
    };

    console.log(events, 'events');

    return (
        <div>
            <Seo title="Calendário" />
            <Pageheader
                title="CALENDÁRIO"
                heading="Calendário"
                active="Calendário"
            />

            <Row className="row-sm">
                <Col xl={12} lg={12} md={12} style={{ width: '100%' }}>
                    <Card className={styles.card}>
                        <Card.Body className="p-2">
                            <div className={styles.toolbar}>
                                <div className={styles.left}>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={goToday}
                                    >
                                        Hoje
                                    </Button>
                                    <div className={styles.nav}>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={goPrev}
                                        >
                                            <i className="fa fa-chevron-left" />
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={goNext}
                                        >
                                            <i className="fa fa-chevron-right" />
                                        </Button>
                                    </div>
                                    <div className={styles.title}>{title}</div>
                                </div>

                                <div className={styles.filters}>
                                    <ButtonGroup className={styles.filterGroup}>
                                        <Button
                                            size="sm"
                                            variant={
                                                filter === 'all'
                                                    ? 'primary'
                                                    : 'secondary'
                                            }
                                            onClick={() => setFilter('all')}
                                            className={styles.filterBtn}
                                        >
                                            Todos{' '}
                                            <span className={styles.countPill}>
                                                {counts.all}
                                            </span>
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant={
                                                filter === 'invoice'
                                                    ? 'primary'
                                                    : 'secondary'
                                            }
                                            onClick={() => setFilter('invoice')}
                                            className={styles.filterBtn}
                                        >
                                            Mensalidades{' '}
                                            <span className={styles.countPill}>
                                                {counts.invoice}
                                            </span>
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant={
                                                filter === 'future'
                                                    ? 'primary'
                                                    : 'secondary'
                                            }
                                            onClick={() => setFilter('future')}
                                            className={styles.filterBtn}
                                        >
                                            Futuros{' '}
                                            <span className={styles.countPill}>
                                                {counts.future}
                                            </span>
                                        </Button>
                                    </ButtonGroup>
                                </div>
                                <div className={styles.right}>
                                    <ButtonGroup className="me-2">
                                        <Button
                                            size="sm"
                                            variant="outline-success"
                                            onClick={() => window.open('/api/invoice/export?format=csv', '_blank')}
                                            title="Exportar faturas em CSV via Template Method"
                                        >
                                            <i className="fe fe-download me-1" /> Exportar CSV
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline-primary"
                                            onClick={() => window.open('/api/invoice/export?format=json', '_blank')}
                                            title="Exportar faturas em JSON via Template Method"
                                        >
                                            <i className="fe fe-file-text me-1" /> JSON
                                        </Button>
                                    </ButtonGroup>
                                    <ButtonGroup>
                                        <Button
                                            size="sm"
                                            variant={
                                                view === 'day'
                                                    ? 'primary'
                                                    : 'secondary'
                                            }
                                            onClick={() => setView('day')}
                                        >
                                            Dia
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={
                                                view === 'week'
                                                    ? 'primary'
                                                    : 'secondary'
                                            }
                                            onClick={() => setView('week')}
                                        >
                                            Semana
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={
                                                view === 'month'
                                                    ? 'primary'
                                                    : 'secondary'
                                            }
                                            onClick={() => setView('month')}
                                        >
                                            Mês
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={
                                                view === 'year'
                                                    ? 'primary'
                                                    : 'secondary'
                                            }
                                            onClick={() => setView('year')}
                                        >
                                            Ano
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </Card.Body>

                        <Card.Body className="pt-0">
                            {view === 'month' && <MonthGrid />}
                            {view === 'week' && <DaysGrid count={7} />}
                            {view === 'day' && <DaysGrid count={1} />}
                            {view === 'year' && <YearGrid />}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* ===== modal ===== */}
            <Modal
                show={dayModal.show}
                onHide={closeDayModal}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalTitle}
                        {loading && (
                            <span
                                className="ms-2 text-muted"
                                style={{ fontSize: 12 }}
                            >
                                atualizando…
                            </span>
                        )}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dayModal.events.length === 0 ? (
                        <div className={styles.empty}>Sem eventos</div>
                    ) : (
                        <div className={styles.dayList}>
                            {dayModal.events.map((ev) => {
                                const st = statusBadge(ev?.meta?.status);
                                const due = new Date(ev.start);
                                const amount =
                                    ev?.meta?.amountCents != null
                                        ? formatBRL(ev.meta.amountCents)
                                        : null;
                                const period =
                                    ev?.meta?.periodMonth &&
                                    ev?.meta?.periodYear
                                        ? `(${String(
                                              ev.meta.periodMonth
                                          ).padStart(2, '0')}/${
                                              ev.meta.periodYear
                                          })`
                                        : '';
                                const company = ev?.meta?.company ?? {};
                                const site = normalizeUrl(
                                    company.website || company.site || null
                                );

                                const wa = buildWaLink(
                                    company.whatsapp || company.phone
                                );

                                return (
                                    <div
                                        key={ev.id}
                                        className={styles.eventCard}
                                    >
                                        <div className={styles.eventStripe} />
                                        <div className={styles.eventHeader}>
                                            <div className={styles.eventTitle}>
                                                {company.name || 'Empresa'}
                                                {period && (
                                                    <span className="ms-2 text-muted">
                                                        {period}
                                                    </span>
                                                )}
                                            </div>
                                            <Badge pill style={st.style}>
                                                {st.text}
                                            </Badge>

                                            <div className="d-flex align-items-center gap-2 ms-auto">
                                                {site && (
                                                    <a
                                                        href={site}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`btn btn-sm d-inline-flex ${styles.visitBtn}`}
                                                    >
                                                        <i className="fa-solid fa-arrow-up-right-from-square me-2" />
                                                        Visitar site
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className={styles.eventRow}>
                                            <i className="fa-regular fa-receipt me-2" />
                                            <strong>{amount}</strong>
                                            <span className="mx-2">•</span>
                                            <span>
                                                Venc.:{' '}
                                                {due.toLocaleDateString(
                                                    'pt-BR'
                                                )}
                                            </span>
                                        </div>

                                        {(company.email ||
                                            company.phone ||
                                            company.whatsapp) && (
                                            <div className={styles.eventRow}>
                                                <i className="fa-regular fa-envelope me-2" />
                                                {company.email && (
                                                    <span className="me-3">
                                                        {company.email}
                                                    </span>
                                                )}
                                                {(company.phone ||
                                                    company.whatsapp) && (
                                                    <span>
                                                        {company.phone ||
                                                            company.whatsapp}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        <div className={styles.actionBar}>
                                            {wa && (
                                                <a
                                                    href={wa}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`btn btn-success btn-sm ${styles.wappBtn}`}
                                                >
                                                    <i className="fa-brands fa-whatsapp fab me-2" />{' '}
                                                    WhatsApp
                                                </a>
                                            )}
                                            <div className="ms-auto d-flex gap-2">
                                                {ev?.meta?.invoiceId &&
                                                    ev?.meta?.status !==
                                                        'PAID' && (
                                                        <OverlayTrigger
                                                            overlay={
                                                                <Tooltip>
                                                                    Marcar
                                                                    apenas esta
                                                                    como paga
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <Button
                                                                size="sm"
                                                                variant="primary"
                                                                onClick={() =>
                                                                    markPaid(
                                                                        ev.meta
                                                                            .invoiceId
                                                                    )
                                                                }
                                                            >
                                                                <i className="fa-regular fa-circle-check me-2" />{' '}
                                                                Marcar como pago
                                                            </Button>
                                                        </OverlayTrigger>
                                                    )}
                                                {company?.id && (
                                                    <OverlayTrigger
                                                        overlay={
                                                            <Tooltip>
                                                                Cancelar todas
                                                                as próximas
                                                                mensalidades e
                                                                desativar
                                                                recorrência
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant="outline-danger"
                                                            onClick={() =>
                                                                cancelFutureForCompany(
                                                                    company.id
                                                                )
                                                            }
                                                        >
                                                            <i className="fa-regular fa-ban me-2" />{' '}
                                                            Cancelar próximas
                                                        </Button>
                                                    </OverlayTrigger>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Modal.Body>
            </Modal>

            {/* Overlay de loading global */}
            {busy && (
                <div
                    className={styles.loadingOverlay}
                    role="status"
                    aria-live="polite"
                >
                    <div className={styles.loadingCard}>
                        <div
                            className="spinner-border"
                            role="status"
                            aria-hidden="true"
                        />
                        <div className="mt-2 fw-semibold">Atualizando…</div>
                        <div className="text-muted" style={{ fontSize: 12 }}>
                            Só um instante.
                        </div>
                    </div>
                </div>
            )}

            {/* Toasts */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export async function getServerSideProps() {
    const today = new Date();
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    const startWeekIdx = (first.getDay() + 6) % 7;
    const start = new Date(first);
    start.setDate(first.getDate() - startWeekIdx);
    const end = new Date(start);
    end.setDate(start.getDate() + 42);

    const { getInvoices } = await import(
        '@/pages/api/server/db/invoice/getInvoices'
    );

    try {
        const events = await getInvoices({
            // IMPORTANT: mandar como YYYY-MM-DD em UTC
            start: ymdUTC(start),
            end: ymdUTC(end),
        });
        const safe = events.map((e) => ({
            ...e,
            start: new Date(e.start).toISOString(),
            end: e.end ? new Date(e.end).toISOString() : null,
            meta: {
                ...e.meta,
                paidAt: e.meta?.paidAt
                    ? new Date(e.meta.paidAt).toISOString()
                    : null,
            },
        }));
        return {
            props: {
                initialEvents: safe,
                initialCursorISO: today.toISOString(),
            },
        };
    } catch (e) {
        console.error('[SSR calendar]', e);
        return {
            props: { initialEvents: [], initialCursorISO: today.toISOString() },
        };
    }
}

CalendarPage.layout = 'Contentlayout';
