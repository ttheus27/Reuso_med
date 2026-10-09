// pages/api/server/db/company/search.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';
import { prisma } from '../prisma';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const session = await getServerSession(req, res, authOptions);
        const userId = session?.user?.id ? Number(session.user.id) : null;

        if (!userId) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }

        const { q = '' } = req.query || {};
        const term = String(q || '').trim();

        if (term.length < 2) {
            return res.status(200).json({ companies: [] });
        }

        const isNumericId = /^\d+$/.test(term);
        const idFilter = isNumericId ? Number(term) : null;

        const orFilters = [
            { name: { contains: term } },
            { email: { contains: term } },
            { website: { contains: term } },
            { cnpj: { contains: term } },
            { responsible: { contains: term } },
        ];

        if (idFilter) {
            orFilters.push({ id: idFilter });
        }

        const companies = await prisma.company.findMany({
            where: {
                name: {
                    contains: term,
                    // mode: 'insensitive',
                },
            },
            take: 20,
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                email: true,
                website: true,
                whatsapp: true,
                phone: true,
            },
        });

        return res.status(200).json({ companies });
    } catch (e) {
        console.error('company/search error:', e);
        return res
            .status(500)
            .json({ error: e?.message || 'Erro ao buscar empresas' });
    }
}
