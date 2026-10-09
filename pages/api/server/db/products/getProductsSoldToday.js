import { Decimal } from '@prisma/client/runtime/library';
import { DateTime } from 'luxon';
import { prisma } from '../prisma';

export async function getProductsSoldToday() {
    const zone = 'America/Sao_Paulo';

    const now = DateTime.now().setZone(zone);

    const todayStart = now.startOf('day').toUTC().toJSDate();
    const todayEnd = now.endOf('day').toUTC().toJSDate();

    const paymentsToday = await prisma.$queryRaw`
        SELECT COUNT(*) as \`totalProductsSold\`
        FROM \`Payment\` p
        WHERE p.\`createdAt\` >= ${todayStart}
        AND p.\`createdAt\` <= ${todayEnd}
        AND p.\`status\` = 'APPROVED';
    `;

    const totalProductsSoldToday =
        paymentsToday[0]?.totalProductsSold instanceof Decimal
            ? paymentsToday[0].totalProductsSold.toNumber()
            : Number(paymentsToday[0]?.totalProductsSold || 0);

    const yesterday = now.minus({ days: 1 });

    const yesterdayStart = yesterday.startOf('day').toUTC().toJSDate();
    const yesterdayEnd = yesterday.endOf('day').toUTC().toJSDate();

    const paymentsYesterday = await prisma.$queryRaw`
    SELECT COUNT(*) as totalProductsSold
    FROM Payment
    WHERE createdAt >= ${yesterdayStart}
    AND createdAt <= ${yesterdayEnd}
    AND status = 'APPROVED';
`;

    const totalProductsSoldYesterday =
        paymentsYesterday[0]?.totalProductsSold instanceof Decimal
            ? paymentsYesterday[0].totalProductsSold.toNumber()
            : Number(paymentsYesterday[0]?.totalProductsSold || 0);

    return {
        totalProductsSoldToday,
        totalProductsSoldYesterday,
    };
}
