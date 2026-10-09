// pages/api/server/db/companies/getAllCompanies.js
import { prisma } from '../prisma';

export async function getAllCompanies() {
    return prisma.company.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            seller: { select: { id: true, name: true, email: true } },
            cs: { select: { id: true, name: true, email: true } },
            owner: { select: { id: true, name: true, email: true } },
            monthlyFees: {
                where: { isActive: true },
                orderBy: { id: 'desc' },
                take: 1,
                select: { amountCents: true, dueDay: true, isActive: true },
            },
        },
    });
}

export default async function handler(req, res) {
    if (req.method !== 'GET')
        return res.status(405).json({ error: 'Method not allowed' });
    try {
        const companies = await getAllCompanies();
        res.status(200).json(companies);
    } catch (e) {
        console.error('getAllCompanies error:', e);
        res.status(500).json({ error: 'Erro ao buscar empresas' });
    }
}
