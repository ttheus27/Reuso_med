import { DateTime } from 'luxon';
import { prisma } from '../prisma';

export async function getSalesAmountLastWeek() {
    const zone = 'America/Sao_Paulo';

    const now = DateTime.now().setZone(zone);

    const lastWeekStart = now
        .minus({ days: 7 })
        .startOf('day')
        .toUTC()
        .toJSDate();
    const lastWeekEnd = now.minus({ days: 1 }).endOf('day').toUTC().toJSDate();

    // Semana retrasada: pega o início e fim da semana baseada na semana anterior
    const startOfPreviousWeek = now
        .minus({ weeks: 2 })
        .startOf('week')
        .toUTC()
        .toJSDate();
    const endOfPreviousWeek = now
        .minus({ weeks: 2 })
        .endOf('week')
        .toUTC()
        .toJSDate();

    const paymentsLastWeek = await prisma.$queryRaw`
        SELECT SUM(\`amount\`) as \`totalSalesAmountLastWeek\`
        FROM \`Payment\`
        WHERE \`createdAt\` >= ${lastWeekStart}
        AND \`createdAt\` <= ${lastWeekEnd}
        AND \`status\` = 'APPROVED';
    `;

    const totalSalesAmountLastWeek =
        paymentsLastWeek[0]?.totalSalesAmountLastWeek || 0;

    const paymentsWeekBeforeLast = await prisma.$queryRaw`
        SELECT SUM(\`amount\`) as \`totalSalesAmountWeekBeforeLast\`
        FROM \`Payment\`
        WHERE \`createdAt\` >= ${startOfPreviousWeek}
        AND \`createdAt\` <= ${endOfPreviousWeek}
        AND \`status\` = 'APPROVED';
    `;

    const totalSalesAmountWeekBeforeLast =
        paymentsWeekBeforeLast[0]?.totalSalesAmountWeekBeforeLast || 0;

    return {
        totalSalesAmountLastWeek,
        totalSalesAmountWeekBeforeLast,
    };
}
