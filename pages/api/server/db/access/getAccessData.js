import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import localeData from 'dayjs/plugin/localeData';
import { prisma } from '../prisma';

dayjs.extend(localeData);
dayjs.locale('pt-br');

export async function getAccessData() {
    const last7DaysStart = dayjs().startOf('day').subtract(6, 'days').toDate();

    const accessData = await prisma.$queryRaw`
        SELECT \`deviceType\`, \`city\`, \`browser\`, DATE(\`createdAt\`) as \`day\`, COUNT(id) as \`count\`
        FROM \`AccessLog\`
        WHERE \`createdAt\` >= ${last7DaysStart}
        GROUP BY \`deviceType\`, \`city\`, \`browser\`, \`day\`
        ORDER BY \`day\` ASC;
    `;

    const shortWeekdays = {
        'segunda-feira': 'Segunda',
        'terça-feira': 'Terça',
        'quarta-feira': 'Quarta',
        'quinta-feira': 'Quinta',
        'sexta-feira': 'Sexta',
        sábado: 'Sábado',
        domingo: 'Domingo',
    };

    const last7Days = [...Array(7)].map(
        (_, i) =>
            shortWeekdays[
                dayjs()
                    .startOf('day')
                    .subtract(6 - i, 'days')
                    .format('dddd')
            ]
    );

    const mobileCounts = Array(7).fill(0);
    const desktopCounts = Array(7).fill(0);
    const browserCounts = {};
    const cityCounts = {};

    let totalAccesses = 0;

    accessData.forEach((access) => {
        const formattedCreatedAt = dayjs(access.day).format('dddd');
        const index = last7Days.indexOf(shortWeekdays[formattedCreatedAt]);

        const count = Number(access.count);
        if (index !== -1) {
            if (access.deviceType === 'MOBILE') {
                mobileCounts[index] += count;
            } else if (access.deviceType === 'DESKTOP') {
                desktopCounts[index] += count;
            }

            const browserName =
                access.browser === 'Unknown' ? 'Outros' : access.browser;

            if (!browserCounts[browserName]) {
                browserCounts[browserName] = 0;
            }
            browserCounts[browserName] += count;

            if (!cityCounts[access.city]) {
                cityCounts[access.city] = 0;
            }
            cityCounts[access.city] += count;

            totalAccesses += count;
        }
    });

    const totalMobileAccesses = mobileCounts.reduce(
        (acc, count) => acc + count,
        0
    );
    const totalDesktopAccesses = desktopCounts.reduce(
        (acc, count) => acc + count,
        0
    );

    const cityStats = Object.keys(cityCounts).map((city) => {
        const cityAccessCount = cityCounts[city];
        const percentage = ((cityAccessCount / totalAccesses) * 100).toFixed(2);
        return {
            city,
            accessCount: cityAccessCount,
            percentage,
        };
    });

    const top10Cities = cityStats
        .sort((a, b) => b.accessCount - a.accessCount)
        .slice(0, 9);

    return {
        mobile: mobileCounts,
        desktop: desktopCounts,
        browser: browserCounts,
        dates: last7Days,
        totalMobileAccesses,
        totalDesktopAccesses,
        totalAccesses,
        cityStats,
        top10Cities,
    };
}
