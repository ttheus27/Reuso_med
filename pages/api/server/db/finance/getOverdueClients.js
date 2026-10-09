// /api/server/db/finance/getOverdueClients.ts
import { prisma } from '../prisma';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const today = new Date();
        const startOfToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            0,
            0,
            0,
            0
        );

        const year = today.getFullYear();
        const month1 = today.getMonth() + 1; // 1..12

        // 🔍 Busca faturas vencidas do mês corrente
        const overdueInvoices = await prisma.invoice.findMany({
            where: {
                status: { in: ['PENDING', 'OVERDUE'] },
                periodYear: year,
                periodMonth: month1,
                dueDate: { lt: startOfToday },
            },
            select: {
                amountCents: true,
                dueDay: true, // 👈 adiciona aqui
                dueDate: true, // 👈 (opcional, se quiser mostrar data também)
                company: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        website: true,
                        whatsapp: true,
                        phone: true,
                        contractUrl: true,
                        contractUploadedAt: true,
                    },
                },
            },
        });

        // Agrupamento por empresa
        const clientsMap = new Map();
        let totalOverdueCents = 0;

        for (const inv of overdueInvoices) {
            const amount = inv.amountCents || 0;
            totalOverdueCents += amount;

            const c = inv.company;
            if (!c?.id) continue;

            const existing = clientsMap.get(c.id) ?? {
                id: c.id,
                name: c.name || '',
                email: c.email ?? null,
                website: c.website ?? null,
                whatsapp: c.whatsapp ?? null,
                phone: c.phone ?? null,
                contractUrl: c.contractUrl ?? null,
                contractStatus: c.contractUrl ? 'ACTIVE' : 'PENDING',
                totalOverdueCents: 0,
                invoiceCount: 0,
                dueDay: null, // 👈 inicializa
                dueDate: null,
            };

            existing.totalOverdueCents += amount;
            existing.invoiceCount += 1;

            // mantém o maior dueDay / dueDate (mais recente)
            if (!existing.dueDay || inv.dueDay > existing.dueDay) {
                existing.dueDay = inv.dueDay;
                existing.dueDate = inv.dueDate;
            }

            // Atualiza campos complementares
            if (!existing.contractUrl && c.contractUrl) {
                existing.contractUrl = c.contractUrl;
                existing.contractStatus = 'ACTIVE';
            }
            if (!existing.website && c.website) existing.website = c.website;
            if (!existing.whatsapp && c.whatsapp)
                existing.whatsapp = c.whatsapp;
            if (!existing.phone && c.phone) existing.phone = c.phone;
            if (!existing.email && c.email) existing.email = c.email;

            clientsMap.set(c.id, existing);
        }

        const clients = Array.from(clientsMap.values())
            .map((c) => ({
                ...c,
                totalOverdue: c.totalOverdueCents / 100,
            }))
            .sort((a, b) => b.totalOverdueCents - a.totalOverdueCents);

        return res.status(200).json({
            overdueAmountCents: totalOverdueCents,
            overdueAmount: totalOverdueCents / 100,
            overdueClientsCount: clients.length,
            clients,
        });
    } catch (error) {
        console.error('Error fetching overdue clients:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
