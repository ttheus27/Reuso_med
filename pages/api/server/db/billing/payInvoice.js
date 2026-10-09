// pages/api/server/billing/payInvoice.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';
import { prisma } from '../prisma';

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.id)
        return res.status(401).json({ error: 'Não autenticado' });

    const { id } = req.body || {};
    if (!id) return res.status(400).json({ error: 'invoice id requerido' });

    try {
        const invoice = await prisma.invoice.update({
            where: { id: Number(id) },
            data: { status: 'PAID', paidAt: new Date() },
        });
        return res.status(200).json({ ok: true, invoice });
    } catch (e) {
        console.error('payInvoice error:', e);
        return res.status(500).json({ error: 'Falha ao quitar fatura' });
    }
}
