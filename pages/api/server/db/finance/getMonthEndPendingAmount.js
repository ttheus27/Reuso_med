import { prisma } from "../prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const today = new Date();
    const year = today.getFullYear();
    const month1 = today.getMonth() + 1;

    // Calcular o último dia do mês atual
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    // Buscar invoices pendentes que vencem até o fim do mês atual
    const monthEndPendingInvoices = await prisma.invoice.findMany({
      where: {
        status: "PENDING",
        periodYear: year,
        periodMonth: month1,
        dueDate: { gte: today, lte: lastDayOfMonth },
      },
      select: {
        amountCents: true,
      },
    });

    // Somar o valor total pendente até o fim do mês
    const totalMonthEndPendingCents = monthEndPendingInvoices.reduce(
      (sum, inv) => sum + (inv.amountCents || 0),
      0
    );

    return res.status(200).json({
      monthEndPendingAmountCents: totalMonthEndPendingCents,
      monthEndPendingAmount: totalMonthEndPendingCents / 100,
    });
  } catch (error) {
    console.error("Error fetching month-end pending amount:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
