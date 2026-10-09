import { prisma } from '../prisma';
import { monthsBack } from './_helpers';

const sum = (arr, sel = (x) => x) => arr.reduce((a, b) => a + sel(b), 0);
const fmtMonthPT = (d) =>
    d
        .toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' })
        .replace('.', '');

export async function getMonthlySalesData({ months = 6 } = {}) {
    const buckets = monthsBack(months);
    const result = [];

    for (const b of buckets) {
        const payments = await prisma.payment.findMany({
            where: { status: 'PAID', createdAt: { gte: b.start, lte: b.end } },
            select: { amountCents: true, saleId: true, monthlyFeeId: true },
        });

        const totalRevenue = sum(payments, (p) => p.amountCents);
        const newSalesRevenue = sum(
            payments.filter((p) => p.saleId),
            (p) => p.amountCents
        );
        const recurringRevenue = sum(
            payments.filter((p) => p.monthlyFeeId),
            (p) => p.amountCents
        );
        const totalOrders = payments.filter((p) => p.saleId).length;

        result.push({
            month: fmtMonthPT(b.date), // ex.: "set 25"
            totalRevenue,
            recurringRevenue,
            newSalesRevenue,
            totalOrders,
        });
    }

    return result;
}
