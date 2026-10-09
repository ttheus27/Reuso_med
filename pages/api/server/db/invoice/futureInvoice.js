import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';
import { prisma } from '../prisma';

function isoDateToUTC(iso) {
    if (!iso) return null;
    const [y, m, d] = String(iso).split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(Date.UTC(y, m - 1, d, 0, 0, 0, 0));
}

function computeStatus(dueDate) {
    if (!dueDate) return 'PENDING';
    const today = new Date();
    const todayUTC = new Date(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate(),
        0,
        0,
        0,
        0
    );
    return dueDate.getTime() < todayUTC.getTime() ? 'OVERDUE' : 'PENDING';
}

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res
                .status(401)
                .json({ message: 'Usuário não autenticado.' });
        }

        if (!['POST', 'PUT', 'DELETE'].includes(req.method)) {
            return res.status(405).json({ message: 'Method not allowed' });
        }

        if (req.method === 'POST') {
            const { companyId, amountCents, dueDate } = req.body || {};

            if (!companyId) {
                return res
                    .status(400)
                    .json({ message: 'companyId é obrigatório.' });
            }
            if (!amountCents || Number(amountCents) <= 0) {
                return res.status(400).json({
                    message: 'amountCents deve ser maior que zero.',
                });
            }
            if (!dueDate) {
                return res
                    .status(400)
                    .json({ message: 'dueDate é obrigatório.' });
            }

            const company = await prisma.company.findUnique({
                where: { id: Number(companyId) },
                select: { id: true },
            });

            if (!company) {
                return res
                    .status(404)
                    .json({ message: 'Empresa não encontrada.' });
            }

            const due = isoDateToUTC(dueDate);
            if (!due) {
                return res.status(400).json({
                    message: 'dueDate inválido. Use o formato YYYY-MM-DD.',
                });
            }

            const year = due.getUTCFullYear();
            const month1 = due.getUTCMonth() + 1;
            const day = due.getUTCDate();
            const status = computeStatus(due);

            const invoice = await prisma.invoice.create({
                data: {
                    companyId: company.id,
                    monthlyFeeId: null,
                    amountCents: Number(amountCents),
                    dueDay: day,
                    dueDate: due,
                    periodYear: year,
                    periodMonth: month1,
                    status,
                    isFuture: true,
                },
            });

            return res.status(200).json({
                message: 'Pagamento futuro criado com sucesso.',
                invoice,
            });
        }

        if (req.method === 'PUT') {
            const { id, companyId, amountCents, dueDate } = req.body || {};

            if (!id) {
                return res
                    .status(400)
                    .json({ message: 'id é obrigatório para edição.' });
            }
            if (!companyId) {
                return res
                    .status(400)
                    .json({ message: 'companyId é obrigatório.' });
            }
            if (!amountCents || Number(amountCents) <= 0) {
                return res.status(400).json({
                    message: 'amountCents deve ser maior que zero.',
                });
            }
            if (!dueDate) {
                return res
                    .status(400)
                    .json({ message: 'dueDate é obrigatório.' });
            }

            const existing = await prisma.invoice.findUnique({
                where: { id: Number(id) },
            });

            if (!existing || !existing.isFuture) {
                return res.status(404).json({
                    message: 'Pagamento futuro não encontrado.',
                });
            }

            if (existing.monthlyFeeId) {
                return res.status(400).json({
                    message:
                        'Esta fatura está vinculada a mensalidade e não pode ser editada por este endpoint.',
                });
            }

            const due = isoDateToUTC(dueDate);
            if (!due) {
                return res.status(400).json({
                    message: 'dueDate inválido. Use o formato YYYY-MM-DD.',
                });
            }

            const year = due.getUTCFullYear();
            const month1 = due.getUTCMonth() + 1;
            const day = due.getUTCDate();

            const status =
                existing.status === 'PAID' || existing.status === 'CANCELED'
                    ? existing.status
                    : computeStatus(due);

            const invoice = await prisma.invoice.update({
                where: { id: existing.id },
                data: {
                    companyId: Number(companyId),
                    amountCents: Number(amountCents),
                    dueDay: day,
                    dueDate: due,
                    periodYear: year,
                    periodMonth: month1,
                    status,
                    isFuture: true,
                },
            });

            return res.status(200).json({
                message: 'Pagamento futuro atualizado com sucesso.',
                invoice,
            });
        }

        if (req.method === 'DELETE') {
            const { id } = req.body || {};
            if (!id) {
                return res
                    .status(400)
                    .json({ message: 'id é obrigatório para exclusão.' });
            }

            // deleteMany para garantir que só apaga invoices únicas
            const result = await prisma.invoice.deleteMany({
                where: {
                    id: Number(id),
                    monthlyFeeId: null,
                },
            });

            if (result.count === 0) {
                return res.status(404).json({
                    message:
                        'Pagamento futuro não encontrado ou não é uma invoice única.',
                });
            }

            return res.status(200).json({
                message: 'Pagamento futuro excluído com sucesso.',
            });
        }
    } catch (e) {
        console.error('futureInvoice error:', e);
        return res.status(500).json({
            message:
                e?.message || 'Erro interno ao processar pagamento futuro.',
        });
    }
}
