// pages/api/server/db/finance/getFutureInvoices.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';
import { prisma } from '../prisma';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const session = await getServerSession(req, res, authOptions);
        const ownerId = session?.user?.id ? Number(session.user.id) : null;

        if (!ownerId) {
            return res
                .status(401)
                .json({ message: 'Usuário não autenticado.' });
        }

        const invoices = await prisma.invoice.findMany({
            where: {
                isFuture: true,
            },
            include: {
                company: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        website: true,
                        whatsapp: true,
                        phone: true,
                    },
                },
            },
            orderBy: [
                { dueDate: 'asc' },
                { company: { name: 'asc' } },
                { id: 'asc' },
            ],
        });

        const totalAmountCents = invoices.reduce(
            (acc, inv) => acc + (inv.amountCents || 0),
            0
        );

        return res.status(200).json({
            invoices,
            invoicesCount: invoices.length,
            totalAmountCents,
        });
    } catch (e) {
        console.error('getFutureInvoices error:', e);
        return res.status(500).json({
            message: e?.message || 'Erro interno ao buscar pagamentos futuros.',
        });
    }
}
