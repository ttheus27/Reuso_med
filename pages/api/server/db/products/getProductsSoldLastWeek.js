import { Decimal } from '@prisma/client/runtime/library';
import { DateTime } from 'luxon';
import { prisma } from '../prisma';

export async function getProductsSoldLastWeek() {
    const zone = 'America/Sao_Paulo';
    const now = DateTime.now().setZone(zone);

    const lastWeekStart = now
        .minus({ days: 7 })
        .startOf('day')
        .toUTC()
        .toJSDate();
    const lastWeekEnd = now.minus({ days: 1 }).endOf('day').toUTC().toJSDate();

    const twoWeeksAgo = now.minus({ weeks: 2 });
    const weekBeforeLastStart = twoWeeksAgo.startOf('week').toUTC().toJSDate();
    const weekBeforeLastEnd = twoWeeksAgo.endOf('week').toUTC().toJSDate();

    const paymentsLastWeek = await prisma.$queryRaw`
        SELECT COUNT(*) as \`totalProductsSoldLastWeek\`
        FROM \`Payment\`
        WHERE \`createdAt\` >= ${lastWeekStart}
        AND \`createdAt\` <= ${lastWeekEnd}
        AND \`status\` = 'APPROVED';
    `;

    const paymentsWeekBeforeLast = await prisma.$queryRaw`
        SELECT COUNT(*) as \`totalProductsSoldWeekBeforeLast\`
        FROM \`Payment\`
        WHERE \`createdAt\` >= ${weekBeforeLastStart}
        AND \`createdAt\` <= ${weekBeforeLastEnd}
        AND \`status\` = 'APPROVED';
    `;

    const totalProductsSoldLastWeek =
        paymentsLastWeek[0]?.totalProductsSoldLastWeek instanceof Decimal
            ? paymentsLastWeek[0].totalProductsSoldLastWeek.toNumber()
            : Number(paymentsLastWeek[0]?.totalProductsSoldLastWeek || 0);

    const totalProductsSoldWeekBeforeLast =
        paymentsWeekBeforeLast[0]?.totalProductsSoldWeekBeforeLast instanceof
        Decimal
            ? paymentsWeekBeforeLast[0].totalProductsSoldWeekBeforeLast.toNumber()
            : Number(
                  paymentsWeekBeforeLast[0]?.totalProductsSoldWeekBeforeLast ||
                      0
              );

    return {
        totalProductsSoldLastWeek,
        totalProductsSoldWeekBeforeLast,
    };
}
