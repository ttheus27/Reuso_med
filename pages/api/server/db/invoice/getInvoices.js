// pages/api/server/db/invoice/getInvoices.js
import { prisma } from '../prisma';

/**
 * getInvoices
 * - Reutilizável no SSR (import) e no handler HTTP (rota GET).
 * - Retorna "events" prontos para o calendário, com datas serializadas (ISO string).
 * - Aceita whereExtra para filtros adicionais (ex.: { company: { ownerId: 123 } }).
 *
 * @param {{ start: string|Date, end: string|Date, whereExtra?: object }} params
 * @returns {Promise<Array>}
 */
export async function getInvoices({ start, end, whereExtra = {} }) {
    const startDate = new Date(start);
    const endDate = new Date(end); // exclusivo

    const invoices = await prisma.invoice.findMany({
        where: {
            dueDate: { gte: startDate, lt: endDate },
            // Excluir faturas canceladas do calendário
            status: { not: 'CANCELED' },
            ...whereExtra, // exemplo: { company: { ownerId: userId } }
        },
        include: {
            company: {
                select: {
                    id: true,
                    name: true,
                    whatsapp: true,
                    phone: true,
                    email: true,
                    website: true,
                },
            },
            monthlyFee: { select: { id: true } },
        },
        orderBy: [{ dueDate: 'asc' }],
    });

    // mapeia p/ eventos do calendário
    return invoices.map((inv) => {
        const statusColor =
            {
                PENDING: 'rgb(var(--warning-rgb))',
                PAID: 'rgb(var(--success-rgb))',
                OVERDUE: 'rgb(var(--danger-rgb))',
                CANCELED: 'var(--gray-5)',
            }[inv.status] || 'var(--primary-color)';

        const month = String(inv.periodMonth).padStart(2, '0');
        const title = `${formatBRL(inv.amountCents)} — ${
            inv.company?.name ?? 'Empresa'
        } (${month}/${inv.periodYear})`;

        return {
            id: `inv-${inv.id}`,
            type: inv.isFuture ? 'future' : 'invoice',
            title,
            start: new Date(inv.dueDate).toISOString(),
            isFuture: !!inv.isFuture,
            end: null,
            allDay: true,
            color: statusColor,
            meta: {
                invoiceId: inv.id,
                status: inv.status,
                amountCents: inv.amountCents,
                periodMonth: inv.periodMonth,
                periodYear: inv.periodYear,
                dueDay: inv.dueDay,
                isFuture: !!inv.isFuture,
                paidAt: inv.paidAt ? new Date(inv.paidAt).toISOString() : null, // string
                monthlyFeeId: inv.monthlyFeeId ?? inv.monthlyFee?.id ?? null,
                company: {
                    id: inv.company?.id ?? null,
                    name: inv.company?.name ?? null,
                    whatsapp: inv.company?.whatsapp ?? null,
                    phone: inv.company?.phone ?? null,
                    email: inv.company?.email ?? null,
                    website: inv.company?.website ?? null,
                },
            },
        };
    });
}

function formatBRL(cents) {
    const v = (cents ?? 0) / 100;
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/**
 * Rota GET:
 * /api/server/db/invoice/getInvoices?start=YYYY-MM-DD&end=YYYY-MM-DD
 * Opcional: filterOwnerId=123 (filtra por owner da empresa)
 */
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { start, end, filterOwnerId } = req.query;
    if (!start || !end) {
        return res.status(400).json({ error: 'Missing start or end' });
    }

    // whereExtra via query (opcional)
    const whereExtra = {};
    if (filterOwnerId) {
        whereExtra.company = { ownerId: Number(filterOwnerId) || 0 };
    }

    try {
        const events = await getInvoices({ start, end, whereExtra });
        res.status(200).json({ events });
    } catch (e) {
        console.error('[getInvoices]', e);
        res.status(500).json({ error: 'Internal error' });
    }
}
