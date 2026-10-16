// /api/server/db/finance/getOverdueClients.ts
import { prisma } from '../prisma';
import {
    InvoiceCalculatorContext,
    StandardInterestStrategy,
    VipInterestStrategy,
} from '../../../../../patterns/strategy/interestStrategies';

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

        // 🔍 Instancia contextos da Strategy de Juros
        const standardContext = new InvoiceCalculatorContext(new StandardInterestStrategy());
        const vipContext = new InvoiceCalculatorContext(new VipInterestStrategy());

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
                dueDay: true,
                dueDate: true,
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
                        notes: true,
                    },
                },
            },
        });

        // Agrupamento por empresa com cálculo via Strategy
        const clientsMap = new Map();
        let totalOverdueCents = 0;
        let totalWithInterestCents = 0;

        for (const inv of overdueInvoices) {
            const amount = inv.amountCents || 0;
            totalOverdueCents += amount;

            const c = inv.company;
            if (!c?.id) continue;

            const isVip = Boolean(
                c.notes &&
                (c.notes.toLowerCase().includes('vip') ||
                 c.notes.toLowerCase().includes('parceiro') ||
                 c.notes.toLowerCase().includes('premium'))
            );

            // Dias de atraso
            const diffMs = Math.max(0, startOfToday.getTime() - new Date(inv.dueDate).getTime());
            const daysLate = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            // Aplicação Polimórfica do Padrão STRATEGY
            const calculator = isVip ? vipContext : standardContext;
            const amountWithInterest = calculator.getFinalAmount(amount, daysLate);
            totalWithInterestCents += amountWithInterest;

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
                totalWithInterestCents: 0,
                invoiceCount: 0,
                isVip,
                appliedStrategy: isVip
                    ? 'VIP (Sem multa, juros 0.015%/dia)'
                    : 'Padrão (Multa 2% + juros 0.033%/dia)',
                daysLate: 0,
                dueDay: null,
                dueDate: null,
            };

            existing.totalOverdueCents += amount;
            existing.totalWithInterestCents += amountWithInterest;
            existing.invoiceCount += 1;
            existing.daysLate = Math.max(existing.daysLate, daysLate);

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
                totalWithInterest: c.totalWithInterestCents / 100,
                interestAdded: (c.totalWithInterestCents - c.totalOverdueCents) / 100,
            }))
            .sort((a, b) => b.totalOverdueCents - a.totalOverdueCents);

        return res.status(200).json({
            overdueAmountCents: totalOverdueCents,
            overdueAmount: totalOverdueCents / 100,
            overdueWithInterestAmount: totalWithInterestCents / 100,
            totalInterestAdded: (totalWithInterestCents - totalOverdueCents) / 100,
            overdueClientsCount: clients.length,
            clients,
        });
    } catch (error) {
        console.error('Error fetching overdue clients:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
