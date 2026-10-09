// pages/api/server/db/invoice/cancelFutureMonthlyFees.js
import { prisma } from "../prisma";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { companyId } = req.body || {};
    if (!companyId) return res.status(400).json({ error: "Missing companyId" });

    // 1) Cancelar TODAS as invoices pendentes/atrasadas (não pagas) desta empresa
    // Isso inclui as do mês atual e as futuras
    const cancelInvoices = await prisma.invoice.updateMany({
      where: {
        companyId: Number(companyId),
        status: { in: ["PENDING", "OVERDUE"] },
        // Removido o filtro dueDate >= startOfToday para cancelar também as do mês atual
      },
      data: { status: "CANCELED" },
    });

    // 2) Desativar mensalidades recorrentes futuras desta empresa
    const deactivateFees = await prisma.monthlyFee.updateMany({
      where: { companyId: Number(companyId), isActive: true },
      data: { isActive: false },
    });

    return res.status(200).json({
      ok: true,
      canceledInvoices: cancelInvoices.count,
      deactivatedMonthlyFees: deactivateFees.count,
    });
  } catch (e) {
    console.error("[cancelFutureMonthlyFees] ", e);
    return res.status(500).json({ error: "Internal error" });
  }
}
