import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';
import { prisma } from '../prisma';

export function clampDay(day, year, month1to12) {
    const last = new Date(Date.UTC(year, month1to12, 0)).getUTCDate();
    return Math.max(1, Math.min(day, last));
}

export function toUTCDate(year, month1to12, day) {
    return new Date(
        Date.UTC(year, month1to12 - 1, clampDay(day, year, month1to12))
    );
}

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });

    // (Opcional) proteja por role/admin
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.id)
        return res.status(401).json({ error: 'Não autenticado' });

    const now = new Date();
    const year = Number(req.query.year ?? now.getUTCFullYear());
    const month = Number(req.query.month ?? now.getUTCMonth() + 1); // 1..12

    try {
        const fees = await prisma.monthlyFee.findMany({
            where: { isActive: true },
            select: {
                id: true,
                companyId: true,
                amountCents: true,
                dueDay: true,
            },
        });

        let created = 0,
            updated = 0;
        for (const f of fees) {
            const dueDay = clampDay(f.dueDay, year, month);
            const dueDate = toUTCDate(year, month, dueDay);

            const invoice = await prisma.invoice.upsert({
                where: {
                    companyId_periodYear_periodMonth: {
                        companyId: f.companyId,
                        periodYear: year,
                        periodMonth: month,
                    },
                },
                update: {
                    amountCents: f.amountCents,
                    dueDay,
                    dueDate,
                    monthlyFeeId: f.id,
                    // mantém status; não pisa em PAID/CANCELED
                },
                create: {
                    companyId: f.companyId,
                    monthlyFeeId: f.id,
                    amountCents: f.amountCents,
                    dueDay,
                    dueDate,
                    periodYear: year,
                    periodMonth: month,
                    status: 'PENDING',
                },
            });

            if (invoice.createdAt.getTime() === invoice.updatedAt.getTime())
                created++;
            else updated++;
        }

        return res.status(200).json({
            ok: true,
            year,
            month,
            created,
            updated,
            total: fees.length,
        });
    } catch (e) {
        console.error('generateMonthlyInvoices error:', e);
        return res.status(500).json({ error: 'Falha ao gerar faturas do mês' });
    }
}
