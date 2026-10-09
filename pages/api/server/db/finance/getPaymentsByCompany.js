import { prisma } from '../prisma';

export default async function handler(req, res) {
    try {
        const grouped = await prisma.payment.groupBy({
            by: ['companyId'],
            where: {
                status: 'PAID',
                companyId: { not: null },
                // opcional: type: 'MENSALIDADE'
            },
            _sum: { amountCents: true },
            _count: { _all: true },
            _max: { createdAt: true }, // "último pagamento"
        });

        const companyIds = grouped.map((g) => g.companyId).filter(Boolean);
        const companies = await prisma.company.findMany({
            where: { id: { in: companyIds } },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                whatsapp: true,
                website: true,
            },
        });
        const cmap = new Map(companies.map((c) => [c.id, c]));

        const rows = grouped
            .map((g) => {
                const c = cmap.get(g.companyId);
                if (!c) return null;
                return {
                    id: c.id,
                    name: c.name,
                    email: c.email,
                    phone: c.phone,
                    whatsapp: c.whatsapp,
                    website: c.website,
                    paidCount: g._count?._all || 0,
                    totalPaid: (g._sum?.amountCents || 0) / 100, // centavos -> reais
                    lastPaidAt: g._max?.createdAt || null,
                };
            })
            .filter(Boolean)
            .sort((a, b) => (b.totalPaid || 0) - (a.totalPaid || 0));

        const totalAmountPaid = rows.reduce(
            (acc, r) => acc + (r.totalPaid || 0),
            0
        );
        res.status(200).json({
            companies: rows,
            totalAmountPaid,
            companiesCount: rows.length,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch payments by company' });
    }
}
