import { DateTime } from 'luxon';
import { prisma } from '../prisma';

export async function getSalesAmountToday() {
    const zone = 'America/Sao_Paulo';

    // Data e hora atual em São Paulo
    const now = DateTime.now().setZone(zone);

    const todayStart = now.startOf('day').toUTC().toJSDate();
    const todayEnd = now.endOf('day').toUTC().toJSDate();

    const yesterday = now.minus({ days: 1 });
    const yesterdayStart = yesterday.startOf('day').toUTC().toJSDate();
    const yesterdayEnd = yesterday.endOf('day').toUTC().toJSDate();

    const paymentsToday = await prisma.$queryRaw`
        SELECT SUM(\`amount\`) as \`totalSalesAmountToday\`
        FROM \`Payment\`
        WHERE \`createdAt\` >= ${todayStart}
        AND \`createdAt\` <= ${todayEnd}
        AND \`status\` = 'APPROVED';
    `;

    const paymentsYesterday = await prisma.$queryRaw`
        SELECT SUM(\`amount\`) as \`totalSalesAmountYesterday\`
        FROM \`Payment\`
        WHERE \`createdAt\` >= ${yesterdayStart}
        AND \`createdAt\` <= ${yesterdayEnd}
        AND \`status\` = 'APPROVED';
    `;

    const totalSalesAmountToday = paymentsToday[0]?.totalSalesAmountToday || 0;
    const totalSalesAmountYesterday =
        paymentsYesterday[0]?.totalSalesAmountYesterday || 0;

    return {
        totalSalesAmountToday,
        totalSalesAmountYesterday,
    };
}
