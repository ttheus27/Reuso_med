// pages/admin/companies/components/CompanyDrawer.jsx
import { Button, Offcanvas } from 'react-bootstrap';
import { toWaLink } from '../utils/whatsapp';
import styles from './companyDrawer.module.scss';

const getInitials = (name = '') =>
    String(name || '')
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() || '')
        .join('');

const formatPhoneBR = (v) => {
    if (!v) return '';
    const d = String(v).replace(/\D/g, '');
    if (d.length <= 10)
        return d.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3').trim();
    return d.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3').trim();
};

const formatBRLFromCents = (cents) =>
    (Number(cents || 0) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

const formatDateBR = (dateLike) => {
    if (!dateLike) return '—';
    const d = new Date(dateLike);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const formatCNPJ = (cnpj) =>
    String(cnpj || '')
        .replace(/\D/g, '')
        .replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2}).*/,
            (_, a, b, c, d, e) => `${a}.${b}.${c}/${d}${e ? '-' + e : ''}`
        ) || '—';

const formatCEP = (cep) =>
    String(cep || '')
        .replace(/\D/g, '')
        .replace(/^(\d{5})(\d{0,3}).*/, (_, a, b) => (b ? `${a}-${b}` : a)) ||
    '—';

// calcula um "próximo vencimento" usando apenas o dueDay (1..31)
function getNextDueDate(dueDay) {
    const day = Number(dueDay);
    if (!day || day < 1 || day > 31) return null;

    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();

    // data deste mês (clamp no último dia do mês)
    const lastDayThisMonth = new Date(y, m + 1, 0).getDate();
    const safeDayThis = Math.min(day, lastDayThisMonth);
    const thisMonthDate = new Date(y, m, safeDayThis);

    // se já passou, joga para o próximo mês
    if (now > new Date(y, m, day)) {
        const nextM = m + 1;
        const lastDayNext = new Date(y, nextM + 1, 0).getDate();
        const safeDayNext = Math.min(day, lastDayNext);
        return new Date(y, nextM, safeDayNext);
    }
    return thisMonthDate;
}

const normalizeUrl = (u) => {
    if (!u) return null;
    let s = String(u).trim();
    if (!s) return null;
    if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
    try {
        new URL(s);
        return s;
    } catch {
        return null;
    }
};

export default function CompanyDrawer({
    show,
    onHide,
    company,
    onEdit,
    onDelete,
}) {
    if (!company) return null;

    const phone = company.phone || '';
    const waPhone = company.whatsapp || company.phone || '';
    const waLink = waPhone
        ? toWaLink(waPhone, `Olá ${company.responsible || company.name}!`)
        : '#';

    const rawWebsite = company.website || company.site || '';
    const site = normalizeUrl(rawWebsite);

    const mf =
        Array.isArray(company.monthlyFees) && company.monthlyFees[0]
            ? company.monthlyFees[0]
            : null;
    const hasMF = !!mf;

    const nextDue = hasMF && mf.dueDay ? getNextDueDate(mf.dueDay) : null;

    const displayDomain = (url) => {
        if (!url) return '';

        try {
            const { hostname } = new URL(url);
            return hostname.replace(/\/$/, '');
        } catch {
            return url;
        }
    };

    return (
        <Offcanvas
            show={show}
            onHide={onHide}
            placement="end"
            backdrop
            scroll={false}
            className={styles.drawer}
        >
            <Offcanvas.Header closeButton className={styles.header}>
                <div className={styles.headerWrap}>
                    <div className={styles.avatar}>
                        {getInitials(company.name)}
                    </div>
                    <div className={styles.titleBlock}>
                        <div className={styles.name}>{company.name}</div>
                        <div className={styles.meta}>
                            {company.responsible && (
                                <span>Resp.: {company.responsible}</span>
                            )}
                            {company.seller?.name && (
                                <span>• Vend.: {company.seller.name}</span>
                            )}
                            {company.cs?.name && (
                                <span>• CS: {company.cs.name}</span>
                            )}
                        </div>
                    </div>
                </div>
            </Offcanvas.Header>

            <Offcanvas.Body className={styles.body}>
                <section className={styles.section}>
                    <h6 className={styles.sectionTitle}>
                        <i className="fa-regular fa-id-card" /> Contatos
                    </h6>

                    <div className={styles.kv}>
                        <span className={styles.k}>E-mail</span>
                        <span className={styles.v}>
                            {company.email ? (
                                <a
                                    href={`mailto:${company.email}`}
                                    className={styles.linkMuted}
                                >
                                    {company.email}
                                </a>
                            ) : (
                                '—'
                            )}
                        </span>
                    </div>

                    <div className={styles.kv}>
                        <span className={styles.k}>Telefone</span>
                        <span className={styles.v}>
                            {formatPhoneBR(phone) || '—'}
                        </span>
                    </div>

                    <div className={styles.kv}>
                        <span className={styles.k}>WhatsApp</span>
                        <span className={styles.v}>
                            {formatPhoneBR(waPhone) || '—'}
                        </span>
                    </div>

                    <div className={styles.kv}>
                        <span className={styles.k}>Website</span>
                        <span className={styles.v}>
                            {site ? (
                                <a
                                    href={site}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.websiteLink}
                                >
                                    {displayDomain(site)}
                                    <i className="fa-solid fa-arrow-up-right-from-square ms-1" />
                                </a>
                            ) : (
                                '—'
                            )}
                        </span>
                    </div>

                    {waPhone && (
                        <a
                            href={waLink}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.whatsBtn}
                        >
                            <i className="fa-brands fa-whatsapp" /> WhatsApp
                        </a>
                    )}
                </section>

                {/* Dados extras */}
                <section className={styles.section}>
                    <h6 className={styles.sectionTitle}>
                        <i className="fa-regular fa-id-card" /> Dados
                    </h6>

                    <div className={styles.kv}>
                        <span className={styles.k}>CNPJ</span>
                        <span className={styles.v}>
                            {formatCNPJ(company.cnpj)}
                        </span>
                    </div>

                    <div className={styles.kv}>
                        <span className={styles.k}>Criado por:</span>
                        <span className={styles.v}>
                            {company.owner?.name || '—'}
                        </span>
                    </div>

                    <div className={styles.kv}>
                        <span className={styles.k}>Criado em:</span>
                        <span className={styles.v}>
                            {formatDateBR(company.createdAt)}
                        </span>
                    </div>

                    <div className={styles.kv}>
                        <span className={styles.k}>Vendedor</span>
                        <span className={styles.v}>
                            {company.seller?.name || '—'}
                        </span>
                    </div>

                    <div className={styles.kv}>
                        <span className={styles.k}>Customer Success</span>
                        <span className={styles.v}>
                            {company.cs?.name || '—'}
                        </span>
                    </div>
                </section>

                {/* Endereço */}
                {(company.address ||
                    company.city ||
                    company.state ||
                    company.zipCode) && (
                    <section className={styles.section}>
                        <h6 className={styles.sectionTitle}>
                            <i className="fa-regular fa-map" /> Endereço
                        </h6>
                        <div className={styles.address}>
                            {[company.address, company.city, company.state]
                                .filter(Boolean)
                                .join(' • ') || '—'}
                            {company.zipCode
                                ? ` • CEP ${formatCEP(company.zipCode)}`
                                : ''}
                        </div>
                    </section>
                )}

                {/* Mensalidade */}
                <section className={styles.section}>
                    <h6 className={styles.sectionTitle}>
                        <i className="fa-solid fa-sack-dollar" /> Mensalidade
                    </h6>

                    {hasMF ? (
                        <div className={styles.mfCard}>
                            <div className={styles.mfAmount}>
                                {formatBRLFromCents(mf.amountCents)}
                                <span className={styles.mfChip}>
                                    {mf.isActive === false
                                        ? 'Inativa'
                                        : 'Ativa'}
                                </span>
                            </div>

                            <div className={styles.mfMeta}>
                                Dia de vencimento:&nbsp;
                                <strong>{mf.dueDay}</strong>
                            </div>

                            <div className={styles.mfMeta}>
                                Próximo vencimento:&nbsp;
                                <strong>
                                    {nextDue ? formatDateBR(nextDue) : '—'}
                                </strong>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.empty}>Sem mensalidade</div>
                    )}
                </section>

                {/* Contrato */}
                <section className={styles.section}>
                    <h6 className={styles.sectionTitle}>
                        <i className="fa-regular fa-file-lines" /> Contrato
                    </h6>

                    {company.contractUrl ? (
                        <a
                            href={company.contractUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.contractBadge}
                            title={company.contractFilename || 'Abrir contrato'}
                        >
                            <i className="fe fe-file-text" />
                            <span>
                                {company.contractFilename || 'Abrir contrato'}
                            </span>
                        </a>
                    ) : (
                        <div className={styles.empty}>Sem contrato</div>
                    )}
                </section>

                {/* Footer fixo de ações */}
                <div className={styles.footer}>
                    <Button
                        variant="outline-secondary"
                        className={styles.actionBtn}
                        onClick={() => onEdit?.(company)}
                    >
                        <i className="fa-regular fa-pen-to-square" /> Editar
                    </Button>
                    <Button
                        variant="outline-danger"
                        className={styles.actionBtn}
                        onClick={() => onDelete?.(company)}
                    >
                        <i className="fa-regular fa-trash-can" /> Excluir
                    </Button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
