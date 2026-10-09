import { prisma } from "../prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { start, end } = req.query;

    // Buscar invoices pendentes no período
    const pendingInvoices = await prisma.invoice.findMany({
      where: {
        status: "PENDING",
        dueDate: {
          gte: start ? new Date(start) : undefined,
          lte: end ? new Date(end) : undefined,
        },
      },
      select: {
        amountCents: true,
      },
    });

    // Somar o valor total pendente
    const totalPendingCents = pendingInvoices.reduce(
      (sum, inv) => sum + (inv.amountCents || 0),
      0
    );

    return res.status(200).json({
      pendingAmountCents: totalPendingCents,
      pendingAmount: totalPendingCents / 100,
    });
  } catch (error) {
    console.error("Error fetching pending amount:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
