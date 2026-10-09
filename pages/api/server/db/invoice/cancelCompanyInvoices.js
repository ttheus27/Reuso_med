// pages/api/server/db/invoice/cancelCompanyInvoices.js
import { prisma } from '../prisma';

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { companyId } = req.body || {};
        if (!companyId)
            return res.status(400).json({ error: 'Missing companyId' });

        // ATENÇÃO: isso DELETA todas as invoices da empresa.
        const result = await prisma.invoice.deleteMany({
            where: { companyId: Number(companyId) },
        });

        return res.status(200).json({ ok: true, deleted: result.count });
    } catch (e) {
        console.error('[cancelCompanyInvoices] ', e);
        return res.status(500).json({ error: 'Internal error' });
    }
}
