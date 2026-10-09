import { addMonths, startOfMonth } from 'date-fns';
import { prisma } from '../prisma';

const fmtMonthPT = (d) =>
    d
        .toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' })
        .replace('.', '');

export async function getMonthlyTrends({ start, end } = {}) {
    // Se não fornecer período, usar últimos 12 meses
    if (!start || !end) {
        const now = new Date();
        const months = 12;
        const buckets = [];
        for (let i = months - 1; i >= 0; i--) {
            const mStart = addMonths(startOfMonth(now), -i);
            const mEnd = addMonths(mStart, 1); // ✅ start of next month
            buckets.push({ mStart, mEnd, label: fmtMonthPT(mStart) });
        }
        return await processBuckets(buckets);
    }

    // Usar período fornecido
    const buckets = [];
    const current = new Date(start);
    const endDate = new Date(end);

    let cursor = startOfMonth(new Date(start));
    const endCursor = startOfMonth(new Date(end));

    while (cursor <= endCursor) {
        const mStart = startOfMonth(cursor);
        const mEnd = addMonths(mStart, 1);
        buckets.push({ mStart, mEnd, label: fmtMonthPT(mStart) });
        cursor = addMonths(cursor, 1);
    }

    return await processBuckets(buckets);
}

const formatBRL = (cents) =>
    (cents / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

async function processBuckets(buckets) {
    const out = [];

    for (const b of buckets) {
        const y = b.mStart.getFullYear();
        const m = b.mStart.getMonth() + 1; // 1..12

        const result = await prisma.$queryRaw`
        SELECT 
          COALESCE(SUM(amountCents), 0) AS totalCents,
          COUNT(*) AS count
        FROM Invoice
        WHERE 
          status = 'PAID'
          AND isFuture = 0
          AND periodYear = ${y}
          AND periodMonth = ${m}
      `;

        const row = result[0] || { totalCents: 0, count: 0 };

        const totalCents = Number(row.totalCents || 0);
        const count = Number(row.count || 0);

        out.push({
            month: b.label,
            totalCents,
            recurringCents: totalCents, // keep your chart compatible
            totalBRL: formatBRL(totalCents),
            count,
        });
    }

    return out;
}
