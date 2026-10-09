import { prisma } from "../prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const today = new Date();

    // Início do mês (00:00:00.000) e fim do mês (23:59:59.999)
    const firstDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
      0,
      0,
      0,
      0
    );
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    // Buscar pagamentos de mensalidades (recorrentes) pagos no mês atual
    const recurringPayments = await prisma.payment.findMany({
      where: {
        status: "PAID",
        type: "MENSALIDADE", // Apenas pagamentos de mensalidades
        createdAt: {
          gte: firstDayOfMonth, // A partir do primeiro dia do mês
          lte: lastDayOfMonth, // Até o último dia do mês
        },
      },
      select: {
        amountCents: true,
        createdAt: true,
        company: {
          select: {
            name: true,
          },
        },
      },
    });

    // Somar o valor total das mensalidades recebidas no mês
    const totalRecurringCents = recurringPayments.reduce(
      (sum, payment) => sum + (payment.amountCents || 0),
      0
    );

    return res.status(200).json({
      recurringAmountCents: totalRecurringCents,
      recurringAmount: totalRecurringCents / 100,
    });
  } catch (error) {
    console.error("Error fetching current month recurring amount:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
