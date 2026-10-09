import { prisma } from "../prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const now = new Date();
    const year = now.getFullYear();
    const month1 = now.getMonth() + 1; // 1..12

    const invoices = await prisma.invoice.findMany({
      where: { periodYear: year, periodMonth: month1 },
      select: {
        amountCents: true,
        status: true,
        dueDate: true,
        companyId: true,
      },
    });

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );

    let totalCents = 0;
    let paidCents = 0;
    let pendingToEndOfMonthCents = 0;
    let overdueInMonthCents = 0;
    const overdueCompanyIds = new Set();

    for (const inv of invoices) {
      const amount = inv.amountCents || 0;
      totalCents += amount;
      if (inv.status === "PAID") {
        paidCents += amount;
      } else if (inv.status === "PENDING" || inv.status === "OVERDUE") {
        if (inv.dueDate < startOfToday) {
          overdueInMonthCents += amount;
          if (inv.companyId) overdueCompanyIds.add(inv.companyId);
        } else {
          pendingToEndOfMonthCents += amount;
        }
      }
    }

    return res.status(200).json({
      monthTotalCents: totalCents,
      monthTotal: totalCents / 100,
      monthPaidCents: paidCents,
      monthPaid: paidCents / 100,
      monthPendingToEndCents: pendingToEndOfMonthCents,
      monthPendingToEnd: pendingToEndOfMonthCents / 100,
      monthOverdueCents: overdueInMonthCents,
      monthOverdue: overdueInMonthCents / 100,
      overdueClientsCount: overdueCompanyIds.size,
    });
  } catch (error) {
    console.error("Error fetching current month invoices summary:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
