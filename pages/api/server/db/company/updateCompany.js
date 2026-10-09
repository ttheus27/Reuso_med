// pages/api/server/db/company/updateCompany.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';
import { prisma } from '../prisma';

/* ================= helpers ================= */

function isoDateToUTC(iso) {
    if (!iso) return null;
    const [y, m, d] = String(iso).split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(Date.UTC(y, m - 1, d));
}

function getDayFromISO(iso) {
    if (!iso) return null;
    const dd = Number(String(iso).split('-')[2]);
    return Number.isFinite(dd) ? dd : null;
}

function daysInMonthUTC(year, month0) {
    return new Date(Date.UTC(year, month0 + 1, 0)).getUTCDate();
}

function normalizeWebsite(u) {
    const raw = String(u ?? '').trim();
    if (!raw) return null;
    const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    try {
        const url = new URL(withProto);
        return url.href.replace(/\/$/, '');
    } catch {
        return raw;
    }
}

function addMonths(year, month0, add) {
    const d = new Date(Date.UTC(year, month0, 1));
    d.setUTCMonth(d.getUTCMonth() + add);
    return { year: d.getUTCFullYear(), month0: d.getUTCMonth() }; // month0 0..11
}

/* ================ handler =================== */

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const session = await getServerSession(req, res, authOptions);
        if (!session?.user?.id) {
            return res.status(401).json({ error: 'Não autenticado' });
        }

        const companyId = Number(req.query.id);
        if (!companyId) return res.status(400).json({ error: 'id inválido' });

        const {
            name,
            responsible,
            email,
            phone,
            whatsapp,
            address,
            city,
            state,
            zipCode,
            cnpj,
            notes,
            sellerId,
            csId,
            hasMonthlyFee,
            website,
            monthlyFeeAmountCents,
            monthlyFeeDueDate, // "YYYY-MM-DD"
            dueDay, // opcional (número)
            contractUrl,
            contractFilename,
        } = req.body || {};

        // Atualiza campos básicos e relações opcionais
        const updateData = {
            name,
            responsible,
            email,
            phone,
            website:
                website != null && website !== ''
                    ? normalizeWebsite(website)
                    : null,
            whatsapp,
            address,
            city,
            state,
            zipCode,
            cnpj,
            notes,
            contractUrl: contractUrl || null,
            contractFilename: contractFilename || null,
            contractUploadedAt: contractUrl ? new Date() : null,
            ...(sellerId !== undefined
                ? sellerId
                    ? { seller: { connect: { id: Number(sellerId) } } }
                    : { seller: { disconnect: true } }
                : {}),
            ...(csId !== undefined
                ? csId
                    ? { cs: { connect: { id: Number(csId) } } }
                    : { cs: { disconnect: true } }
                : {}),
        };

        await prisma.company.update({
            where: { id: companyId },
            data: updateData,
        });

        // Mensalidade ativa mais recente (se houver)
        const existing = await prisma.monthlyFee.findFirst({
            where: { companyId, isActive: true },
            orderBy: { id: 'desc' },
            select: { id: true },
        });

        // Normalizações
        const hasFee = !!hasMonthlyFee && Number(monthlyFeeAmountCents) > 0;
        const amountNormalized = Number(monthlyFeeAmountCents || 0);

        const computedDueDay =
            typeof dueDay === 'number' && Number.isFinite(dueDay)
                ? dueDay
                : getDayFromISO(monthlyFeeDueDate);

        const computedDueDate = monthlyFeeDueDate
            ? isoDateToUTC(monthlyFeeDueDate)
            : null;

        let activeMonthlyFeeId = existing?.id ?? null;

        if (hasFee) {
            if (computedDueDay == null) {
                return res.status(400).json({
                    error: 'Informe a data de vencimento (YYYY-MM-DD).',
                });
            }

            // Upsert da MonthlyFee ativa
            if (existing) {
                await prisma.monthlyFee.update({
                    where: { id: existing.id },
                    data: {
                        amountCents: amountNormalized,
                        dueDay: computedDueDay,
                        ...(computedDueDate
                            ? { dueDate: computedDueDate }
                            : {}),
                        isActive: true,
                    },
                });
                activeMonthlyFeeId = existing.id;
            } else {
                const created = await prisma.monthlyFee.create({
                    data: {
                        companyId,
                        amountCents: amountNormalized,
                        dueDay: computedDueDay,
                        dueDate: computedDueDate ?? null,
                        isActive: true,
                    },
                    select: { id: true },
                });
                activeMonthlyFeeId = created.id;
            }

            // ====== SINCRONIZA TODAS AS INVOICES NÃO PAGAS ======
            const nowUTC = new Date();
            nowUTC.setUTCHours(0, 0, 0, 0);

            const pendents = await prisma.invoice.findMany({
                where: {
                    companyId,
                    status: { in: ['PENDING', 'OVERDUE'] },
                },
                select: { id: true, periodYear: true, periodMonth: true },
            });

            if (pendents.length) {
                await Promise.all(
                    pendents.map((inv) => {
                        const year = inv.periodYear;
                        const month0 = inv.periodMonth - 1; // 0..11
                        const maxDay = daysInMonthUTC(year, month0);
                        const day = Math.min(computedDueDay, maxDay);
                        const newDueDate = new Date(
                            Date.UTC(year, month0, day)
                        );
                        const newStatus =
                            newDueDate.getTime() < nowUTC.getTime()
                                ? 'OVERDUE'
                                : 'PENDING';

                        return prisma.invoice.update({
                            where: { id: inv.id },
                            data: {
                                dueDay: day,
                                dueDate: newDueDate,
                                amountCents: amountNormalized,
                                status: newStatus,
                                monthlyFeeId: activeMonthlyFeeId,
                            },
                        });
                    })
                );
            }
            // ====== /SINCRONIZA ======

            // ====== CRIA AS PRÓXIMAS 10 INVOICES (se não existirem) ======
            // Âncora:
            // - se veio monthlyFeeDueDate: usa o mês/ano dessa data
            // - senão: usa o mês/ano atuais (UTC)
            const anchor = computedDueDate ?? nowUTC;
            const startYear = anchor.getUTCFullYear();
            const startMonth0 = anchor.getUTCMonth(); // 0..11

            const invoicesToCreate = [];
            for (let i = 0; i < 10; i++) {
                const { year, month0 } = addMonths(startYear, startMonth0, i);
                const maxDay = daysInMonthUTC(year, month0);
                const day = Math.min(computedDueDay, maxDay);
                const dueDate = new Date(Date.UTC(year, month0, day));
                const status =
                    dueDate.getTime() < nowUTC.getTime()
                        ? 'OVERDUE'
                        : 'PENDING';

                invoicesToCreate.push({
                    companyId,
                    monthlyFeeId: activeMonthlyFeeId,
                    amountCents: amountNormalized,
                    dueDay: day,
                    dueDate,
                    periodYear: year,
                    periodMonth: month0 + 1, // 1..12
                    status,
                });
            }

            if (invoicesToCreate.length) {
                await prisma.invoice.createMany({
                    data: invoicesToCreate,
                    skipDuplicates: true, // respeita @@unique([companyId, periodYear, periodMonth])
                });
            }
            // ====== /CRIA ======
        } else if (existing) {
            // Desativa mensalidade quando o toggle é desligado
            await prisma.monthlyFee.update({
                where: { id: existing.id },
                data: { isActive: false },
            });
            // (intencionalmente não mexe nas invoices)
        }

        // Retorna empresa com a última mensalidade ativa
        const company = await prisma.company.findUnique({
            where: { id: companyId },
            include: {
                seller: { select: { id: true, name: true, email: true } },
                cs: { select: { id: true, name: true, email: true } },
                monthlyFees: {
                    where: { isActive: true },
                    orderBy: { id: 'desc' },
                    take: 1,
                },
            },
        });

        return res.status(200).json({ company });
    } catch (e) {
        console.error('updateCompany error:', e);
        return res
            .status(500)
            .json({ error: e?.message || 'Erro ao atualizar empresa' });
    }
}
