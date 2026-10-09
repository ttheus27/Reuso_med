// pages/api/server/db/company/createCompany.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';
import { prisma } from '../prisma';

// "YYYY-MM-DD" -> Date UTC (00:00Z)
function isoDateToUTC(iso) {
    if (!iso) return null;
    const [y, m, d] = String(iso).split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(Date.UTC(y, m - 1, d));
}

function daysInMonthUTC(year, month0) {
    // month0: 0..11
    // último dia = dia 0 do próximo mês
    return new Date(Date.UTC(year, month0 + 1, 0)).getUTCDate();
}

function normalizeWebsite(raw) {
    if (!raw) return null;
    let s = String(raw).trim();
    if (!s) return null;
    s = s.replace(/\/+$/, ''); // remove "/" final
    if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
    try {
        const u = new URL(s);
        return u.href; // formato padronizado
    } catch {
        return null; // URL inválida → não salva
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });

    try {
        const session = await getServerSession(req, res, authOptions);
        const ownerId = session?.user?.id ? Number(session.user.id) : null;
        if (!ownerId) {
            return res
                .status(401)
                .json({ error: 'Usuário não autenticado para definir owner' });
        }

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
            monthlyFeeAmountCents,
            monthlyFeeDueDate, // "YYYY-MM-DD"
            dueDay, // opcional; se não vier, extraímos do monthlyFeeDueDate
            contractUrl,
            contractFilename,
            website,
        } = req.body || {};

        const normalizedWebsite = normalizeWebsite(website);

        // calcula dueDay se não vier pronto
        const computedDueDay =
            typeof dueDay === 'number' && Number.isFinite(dueDay)
                ? dueDay
                : (() => {
                      if (!monthlyFeeDueDate) return null;
                      const dd = Number(
                          String(monthlyFeeDueDate).split('-')[2]
                      );
                      return Number.isFinite(dd) ? dd : null;
                  })();

        // dueDate base (para a mensalidade) em UTC
        const computedDueDate = monthlyFeeDueDate
            ? isoDateToUTC(monthlyFeeDueDate)
            : null;

        // validações de mensalidade (quando marcada)
        if (hasMonthlyFee && Number(monthlyFeeAmountCents) > 0) {
            if (computedDueDay == null) {
                return res.status(400).json({
                    error: 'Informe a data de vencimento (YYYY-MM-DD).',
                });
            }
        }

        // Criamos a empresa (com monthlyFee, se houver)
        const company = await prisma.company.create({
            data: {
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
                website: normalizedWebsite,

                ...(sellerId
                    ? { seller: { connect: { id: Number(sellerId) } } }
                    : {}),
                ...(csId ? { cs: { connect: { id: Number(csId) } } } : {}),
                owner: { connect: { id: ownerId } },

                contractUrl: contractUrl || null,
                contractFilename: contractFilename || null,
                contractUploadedAt: contractUrl ? new Date() : null,

                ...(hasMonthlyFee && Number(monthlyFeeAmountCents) > 0
                    ? {
                          monthlyFees: {
                              create: [
                                  {
                                      amountCents: Number(
                                          monthlyFeeAmountCents || 0
                                      ),
                                      dueDay: computedDueDay, // obrigatório
                                      dueDate: computedDueDate, // base para ancorar o mês
                                      isActive: true,
                                  },
                              ],
                          },
                      }
                    : {}),
            },
            include: {
                monthlyFees: true,
                seller: { select: { id: true, name: true, email: true } },
                cs: { select: { id: true, name: true, email: true } },
            },
        });

        // Se tiver monthly fee, geramos invoices recorrentes
        let createdInvoices = 0;
        if (
            hasMonthlyFee &&
            Number(monthlyFeeAmountCents) > 0 &&
            company?.monthlyFees?.length
        ) {
            const mf = company.monthlyFees[0];
            const amountCents = Number(mf.amountCents);
            const dueDayFinal = Number(mf.dueDay);

            // âncora: usa monthlyFee.dueDate se houver; senão hoje
            const anchor = mf.dueDate ? new Date(mf.dueDate) : new Date();

            // começamos do 1º dia do mês da âncora
            const startYear = anchor.getUTCFullYear();
            const startMonth0 = anchor.getUTCMonth();

            const monthsToGenerate = 12; // gere 12 meses (ajuste à sua regra)
            const nowUTC = new Date(); // para decidir OVERDUE/PENDING

            const data = [];
            for (let i = 0; i < monthsToGenerate; i++) {
                const ym = new Date(Date.UTC(startYear, startMonth0 + i, 1));
                const year = ym.getUTCFullYear();
                const month0 = ym.getUTCMonth(); // 0..11
                const month1 = month0 + 1; // 1..12

                // ajusta dueDay caso o mês tenha menos dias (ex.: 30/31/fev)
                const maxDay = daysInMonthUTC(year, month0);
                const day = Math.min(dueDayFinal, maxDay);

                const dueDate = new Date(Date.UTC(year, month0, day)); // 00:00Z
                const status =
                    dueDate.getTime() < nowUTC.setUTCHours(0, 0, 0, 0)
                        ? 'OVERDUE'
                        : 'PENDING';

                data.push({
                    companyId: company.id,
                    monthlyFeeId: mf.id,
                    amountCents,
                    dueDay: day,
                    dueDate,
                    periodYear: year,
                    periodMonth: month1,
                    status, // PENDING ou OVERDUE
                });
            }

            const result = await prisma.invoice.createMany({
                data,
                skipDuplicates: true,
            });
            createdInvoices = result.count ?? 0;
        }

        return res.status(200).json({
            company,
            invoicesGenerated: createdInvoices,
            message:
                createdInvoices > 0
                    ? `Empresa criada e ${createdInvoices} fatura(s) geradas.`
                    : 'Empresa criada.',
        });
    } catch (e) {
        console.error('createCompany error:', e);
        return res
            .status(500)
            .json({ error: e?.message || 'Erro ao criar empresa' });
    }
}
