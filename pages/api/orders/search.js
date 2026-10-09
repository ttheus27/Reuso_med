import { prisma } from '../server/db/prisma';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { q: searchQuery } = req.query;

        if (!searchQuery) {
            return res
                .status(400)
                .json({ message: 'Search query is required' });
        }

        // Search in orders with related data
        const orders = await prisma.order.findMany({
            where: {
                OR: [
                    { id: { equals: parseInt(searchQuery) || 0 } },
                    {
                        user: {
                            name: {
                                contains: searchQuery,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        user: {
                            email: {
                                contains: searchQuery,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        product: {
                            title: {
                                contains: searchQuery,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        description: {
                            contains: searchQuery,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                product: {
                    select: {
                        title: true,
                    },
                },
                stock: {
                    include: {
                        variantValue: {
                            include: {
                                variant: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 10, // Limit results to 10 items
        });

        // Get total count for pagination
        const total = await prisma.order.count({
            where: {
                OR: [
                    { id: { equals: parseInt(searchQuery) || 0 } },
                    {
                        user: {
                            name: {
                                contains: searchQuery,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        user: {
                            email: {
                                contains: searchQuery,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        product: {
                            title: {
                                contains: searchQuery,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        description: {
                            contains: searchQuery,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });

        return res.status(200).json({
            orders,
            pagination: {
                currentPage: 1,
                totalPages: Math.ceil(total / 10),
                total,
            },
        });
    } catch (error) {
        console.error('Search error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
