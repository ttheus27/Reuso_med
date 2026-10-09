// pages/api/server/billing/markOverdue.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';
import { prisma } from '../prisma';

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.id)
        return res.status(401).json({ error: 'Não autenticado' });

    try {
        const now = new Date();
        const { count } = await prisma.invoice.updateMany({
            where: { status: 'PENDING', dueDate: { lt: now } },
            data: { status: 'OVERDUE' },
        });
        return res.status(200).json({ ok: true, updated: count });
    } catch (e) {
        console.error('markOverdue error:', e);
        return res.status(500).json({ error: 'Falha ao marcar vencidas' });
    }
}
