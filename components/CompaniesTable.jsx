// pages/admin/companies/components/CompaniesTable.jsx
import {
    Card,
    Form,
    OverlayTrigger,
    Pagination,
    Tooltip,
} from 'react-bootstrap';
import { toWaLink } from '../utils/whatsapp';
import styles from './styles.module.scss';

// helpers locais
const getInitials = (name = '') =>
    name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() || '')
        .join('');

const formatPhoneBR = (v) => {
    if (!v) return '—';
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

export default function CompaniesTable({
    searchTerm,
    setSearchTerm,
    currentItems,
    currentPage,
    setCurrentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    totalResults,
    onEdit,
    onDelete,
    openDrawer, // << novo
}) {
    return (
        <Card className="shadow-sm">
            <Card.Body className="p-3">
                <div className={styles.tableHeader}>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por nome, e-mail ou telefone…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <div className={styles.headerRight} />
                </div>

                <div className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.nameCol}>Nome</th>
                                <th className={styles.emailCol}>E-mail</th>
                                <th className={styles.phoneCol}>Telefone</th>
                                <th
                                    className={`${styles.center} ${styles.docCol}`}
                                >
                                    Documento
                                </th>
                                <th
                                    className={`${styles.center} ${styles.mensalCol}`}
                                >
                                    Possui Mensalidade
                                </th>
                                <th
                                    className={`${styles.center} ${styles.whatsCol}`}
                                >
                                    WhatsApp
                                </th>
                                <th
                                    className={`${styles.right} ${styles.actionsCol}`}
                                >
                                    Ações
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className={styles.empty}>
                                        Sem empresas
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((c) => {
                                    const phoneOnly = c.phone || '';
                                    const waPhone = c.whatsapp || c.phone || '';
                                    const waLink = waPhone
                                        ? toWaLink(
                                              waPhone,
                                              `Olá ${c.responsible || c.name}!`
                                          )
                                        : '#';

                                    const mf =
                                        Array.isArray(c.monthlyFees) &&
                                        c.monthlyFees[0]
                                            ? c.monthlyFees[0]
                                            : null;
                                    const hasMF = !!mf;
                                    const mfText = hasMF
                                        ? `${formatBRLFromCents(
                                              mf.amountCents
                                          )} • dia ${mf.dueDay}`
                                        : 'Sem mensalidade';

                                    return (
                                        <tr
                                            key={c.id}
                                            className={styles.rowClickable} // << cursor pointer (ver SCSS abaixo)
                                            onClick={() =>
                                                openDrawer && openDrawer(c)
                                            } // << abre drawer
                                        >
                                            <td>
                                                <div
                                                    className={styles.nameCell}
                                                >
                                                    <div
                                                        className={
                                                            styles.avatar
                                                        }
                                                    >
                                                        {getInitials(c.name)}
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.nameBlock
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.name
                                                            }
                                                        >
                                                            {c.name}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.metaLine
                                                            }
                                                        >
                                                            <span>
                                                                Resp.:{' '}
                                                                {c.responsible ||
                                                                    '—'}
                                                            </span>
                                                            {c.seller?.name && (
                                                                <span>
                                                                    {' '}
                                                                    • Vend.:{' '}
                                                                    {
                                                                        c.seller
                                                                            .name
                                                                    }
                                                                </span>
                                                            )}
                                                            {c.cs?.name && (
                                                                <span>
                                                                    {' '}
                                                                    • CS:{' '}
                                                                    {c.cs.name}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                {c.email ? (
                                                    <a
                                                        href={`mailto:${c.email}`}
                                                        className={
                                                            styles.linkMuted
                                                        }
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        } // << não abrir drawer
                                                    >
                                                        {c.email}
                                                    </a>
                                                ) : (
                                                    '—'
                                                )}
                                            </td>

                                            <td>{formatPhoneBR(phoneOnly)}</td>

                                            {/* Documento */}
                                            <td
                                                className={`${styles.center} ${styles.docCell}`}
                                            >
                                                {c.contractUrl ? (
                                                    <a
                                                        href={c.contractUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className={
                                                            styles.contractBadge
                                                        }
                                                        title={
                                                            c.contractFilename ||
                                                            'Abrir contrato'
                                                        }
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        } // << não abrir drawer
                                                    >
                                                        <i className="fe fe-file-text me-1" />
                                                        {c.contractFilename ||
                                                            'Contrato'}
                                                    </a>
                                                ) : (
                                                    <span
                                                        className={
                                                            styles.contractBadgeMuted
                                                        }
                                                    >
                                                        <i className="fe fe-file-text me-1" />
                                                        Sem contrato
                                                    </span>
                                                )}
                                            </td>

                                            {/* Mensalidade */}
                                            <td
                                                className={`${styles.center} ${styles.mensalCol}`}
                                            >
                                                {hasMF ? (
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip>
                                                                {mfText}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.mensalIcon
                                                            }
                                                            title={mfText}
                                                        >
                                                            <i className="fa-solid fa-sack-dollar" />
                                                        </span>
                                                    </OverlayTrigger>
                                                ) : (
                                                    <span
                                                        className={
                                                            styles.mensalIconMuted
                                                        }
                                                        title="Sem mensalidade"
                                                    >
                                                        <i className="fa-regular fa-circle-xmark" />
                                                    </span>
                                                )}
                                            </td>

                                            {/* WhatsApp */}
                                            <td className={styles.center}>
                                                {waPhone ? (
                                                    <a
                                                        href={waLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className={
                                                            styles.whatsBtn
                                                        }
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        } // << não abrir drawer
                                                    >
                                                        <i
                                                            className="fa-brands fa-whatsapp"
                                                            aria-hidden="true"
                                                        />
                                                        <span>WhatsApp</span>
                                                    </a>
                                                ) : (
                                                    <span
                                                        className={styles.muted}
                                                    >
                                                        —
                                                    </span>
                                                )}
                                            </td>

                                            {/* Ações */}
                                            <td
                                                className={`${styles.right} ${styles.actionsCell}`}
                                            >
                                                <div
                                                    className={
                                                        styles.rowActions
                                                    }
                                                >
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onEdit(c);
                                                        }} // << não abrir drawer
                                                        title="Editar"
                                                    >
                                                        <i className="fas fa-edit" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={styles.paginationBar}>
                    <Pagination className="mb-0">
                        <Pagination.Item
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </Pagination.Item>
                        {[...Array(totalPages)].map((_, idx) => (
                            <Pagination.Item
                                key={idx + 1}
                                active={currentPage === idx + 1}
                                onClick={() => setCurrentPage(idx + 1)}
                            >
                                {idx + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Item
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Próximo
                        </Pagination.Item>
                    </Pagination>
                    <div className={styles.counter}>
                        Mostrando {indexOfFirstItem + 1}–
                        {Math.min(indexOfLastItem, totalResults)} de{' '}
                        {totalResults}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
