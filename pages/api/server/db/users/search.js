// pages/api/server/db/users/search.js
import { prisma } from '../prisma';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const q = String(req.query.q || '').trim();

        if (!q) {
            return res.status(200).json({ users: [] });
        }

        const term = q.toLowerCase();

        // Como tua versão do Prisma não aceita "mode: 'insensitive'",
        // fazemos o lower-case "na mão" usando filtros OR simples.
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: term,
                        },
                    },
                    {
                        email: {
                            contains: term,
                        },
                    },
                ],
            },
            take: 20,
            orderBy: {
                name: 'asc',
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return res.status(200).json({ users });
    } catch (err) {
        console.error('user/search error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
