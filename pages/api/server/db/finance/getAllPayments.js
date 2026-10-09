import { prisma } from '../prisma';

export async function getTotalApprovedPayments() {
    try {
        const result = await prisma.payment.aggregate({
            _sum: {
                amountCents: true,
            },
            where: {
                status: 'PAID',
            },
        });

        return (result._sum.amountCents ?? 0) / 100;
    } catch (error) {
        console.error('Erro ao obter total faturado:', error);
        return 0;
    }
}
