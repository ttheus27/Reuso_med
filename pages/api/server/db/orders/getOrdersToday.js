import prisma from '../prisma';

export const getOrdersToday = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const ordersToday = await prisma.order.count({
        where: {
            createdAt: {
                gte: today,
                lt: tomorrow,
            },
        },
    });

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const ordersYesterday = await prisma.order.count({
        where: {
            createdAt: {
                gte: yesterday,
                lt: today,
            },
        },
    });

    return {
        totalOrdersToday: ordersToday,
        totalOrdersYesterday: ordersYesterday,
    };
};
