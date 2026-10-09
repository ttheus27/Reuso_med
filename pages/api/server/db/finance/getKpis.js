import { prisma } from '../prisma';
import {
    last7DaysRange,
    monthRange,
    prev7DaysRange,
    todayRange,
    yesterdayRange,
} from './_helpers';

// soma segura em JS
const sum = (arr, sel = (x) => x) => arr.reduce((a, b) => a + sel(b), 0);

export async function getKpis() {
    // Hoje e ontem
    const { start: tStart, end: tEnd } = todayRange();
    const { start: yStart, end: yEnd } = yesterdayRange();

    // Pagamentos PAID hoje
    const paidToday = await prisma.payment.findMany({
        where: { status: 'PAID', createdAt: { gte: tStart, lte: tEnd } },
        select: { amountCents: true, saleId: true, monthlyFeeId: true },
    });
    const paidYesterday = await prisma.payment.findMany({
        where: { status: 'PAID', createdAt: { gte: yStart, lte: yEnd } },
        select: { amountCents: true, saleId: true, monthlyFeeId: true },
    });

    const newSalesTodayCount = paidToday.filter((p) => p.saleId).length;
    const newSalesYesterdayCount = paidYesterday.filter((p) => p.saleId).length;

    const newSalesAmountToday = sum(
        paidToday.filter((p) => p.saleId),
        (p) => p.amountCents
    );
    const newSalesAmountYesterday = sum(
        paidYesterday.filter((p) => p.saleId),
        (p) => p.amountCents
    );

    const recurringAmountToday = sum(
        paidToday.filter((p) => p.monthlyFeeId),
        (p) => p.amountCents
    );
    const recurringAmountYesterday = sum(
        paidYesterday.filter((p) => p.monthlyFeeId),
        (p) => p.amountCents
    );

    const totalAmountToday = newSalesAmountToday + recurringAmountToday;
    const totalAmountYesterday =
        newSalesAmountYesterday + recurringAmountYesterday;

    // Semana atual x anterior (pagamentos PAID)
    const { start: wStart, end: wEnd } = last7DaysRange();
    const { start: pwStart, end: pwEnd } = prev7DaysRange();

    const paidWeek = await prisma.payment.findMany({
        where: { status: 'PAID', createdAt: { gte: wStart, lte: wEnd } },
        select: { amountCents: true, saleId: true },
    });
    const paidPrevWeek = await prisma.payment.findMany({
        where: { status: 'PAID', createdAt: { gte: pwStart, lte: pwEnd } },
        select: { amountCents: true, saleId: true },
    });

    const ordersLastWeek = paidWeek.filter((p) => p.saleId).length;
    const ordersPrevWeek = paidPrevWeek.filter((p) => p.saleId).length;

    const revenueLastWeek = sum(paidWeek, (p) => p.amountCents);
    const revenuePrevWeek = sum(paidPrevWeek, (p) => p.amountCents);

    // MRR “contratado” = soma das mensalidades ativas (valor nominal)
    const activeFees = await prisma.monthlyFee.findMany({
        where: { isActive: true },
        select: { amountCents: true },
    });
    const mrrContracted = sum(activeFees, (f) => f.amountCents);

    // Inadimplência do mês atual: mensalidades com vencimento <= hoje e sem pagamento PAID no mês
    const { start: mStart, end: mEnd } = monthRange();
    const today = new Date();

    // todas as mensalidades ativas (considerando dueDay do mês)
    const candidates = await prisma.monthlyFee.findMany({
        where: { isActive: true },
        select: {
            id: true,
            amountCents: true,
            dueDay: true,
            companyId: true,
            company: { select: { name: true } },
        },
    });

    const overdueIds = [];
    for (const fee of candidates) {
        const dueDate = new Date(mStart);
        // dueDay: 1..31 – clamp simples
        const day = Math.max(1, Math.min(28, fee.dueDay || 1));
        dueDate.setDate(day);

        if (dueDate <= today) {
            const paidThisMonth = await prisma.payment.count({
                where: {
                    status: 'PAID',
                    monthlyFeeId: fee.id,
                    createdAt: { gte: mStart, lte: mEnd },
                },
            });
            if (paidThisMonth === 0) overdueIds.push(fee.id);
        }
    }

    const overdueCount = overdueIds.length;

    return {
        // hoje
        newSalesTodayCount,
        newSalesYesterdayCount,
        newSalesAmountToday,
        newSalesAmountYesterday,
        recurringAmountToday,
        recurringAmountYesterday,
        totalAmountToday,
        totalAmountYesterday,

        // semana
        ordersLastWeek,
        ordersPrevWeek,
        revenueLastWeek,
        revenuePrevWeek,

        // mrr & inadimplência
        mrrContracted,
        overdueCount,
    };
}
