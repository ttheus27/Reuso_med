import { endOfMonth, startOfMonth } from 'date-fns';
import { prisma } from '../prisma';

const sum = (arr, sel = (x) => x) => arr.reduce((a, b) => a + sel(b), 0);

export async function getMonthToDateKpis() {
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());

    const paid = await prisma.payment.findMany({
        where: { status: 'PAID', createdAt: { gte: start, lte: end } },
        select: { amountCents: true, saleId: true, monthlyFeeId: true },
    });

    const recurringCents = sum(
        paid.filter((p) => p.monthlyFeeId),
        (p) => p.amountCents
    );
    const newSalesCents = sum(
        paid.filter((p) => p.saleId),
        (p) => p.amountCents
    );
    const totalCents = recurringCents + newSalesCents;

    const newClientsCount = await prisma.company.count({
        where: { createdAt: { gte: start, lte: end } },
    });

    return {
        totalCents,
        recurringCents,
        newSalesCents,
        newClientsCount,
    };
}
