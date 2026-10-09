import { prisma } from '../prisma';

export async function getRecentPayments() {
    const recentPayments = await prisma.$queryRaw`
        SELECT p.id as \`productId\`, p.status, p.amount, p.\`paymentMethod\`, p.\`createdAt\`, u.id as \`userId\`, u.name
        FROM \`Payment\` p
        JOIN \`User\` u ON p.\`userId\` = u.id
        WHERE p.status IN ('APPROVED', 'PENDING')
        ORDER BY p.\`createdAt\` DESC        
    `;

    return recentPayments.map((payment) => ({
        name: payment.name,
        userId: payment.userId,
        status: payment.status,
        amount: payment.amount,
        productId: payment.productId,
        paymentMethod: payment.paymentMethod,
        date: payment.createdAt.toISOString(),
    }));
}
