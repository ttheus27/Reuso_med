// /api/server/db/finance/getTotalMonthlyFees.js
import { prisma } from '../prisma';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // 1..12

        // 🔹 Somar invoices de mensalidade do mês atual
        const invoices = await prisma.invoice.findMany({
            where: {
                periodYear: year,
                periodMonth: month,
                status: {
                    in: ['PENDING', 'PAID', 'OVERDUE'], // ignora CANCELED
                },
                // OPCIONAL: se quiser garantir que vem de mensalidade ativa:
                monthlyFee: {
                    isActive: true,
                },
            },
            include: {
                company: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                monthlyFee: {
                    select: {
                        id: true,
                        amountCents: true,
                    },
                },
            },
        });

        console.log('Invoices do mês atual:', invoices);

        const totalMonthlyFeesCents = invoices.reduce(
            (sum, inv) => sum + (inv.amountCents || 0),
            0
        );

        return res.status(200).json({
            periodYear: year,
            periodMonth: month,
            totalMonthlyFeesCents,
            totalMonthlyFees: totalMonthlyFeesCents / 100,
        });
    } catch (error) {
        console.error('Error fetching total monthly fees (invoices):', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
