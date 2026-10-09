import { prisma } from "../prisma";

export async function getTotalApprovedPayments() {
  try {
    const result = await prisma.payment.aggregate({
      _sum: {
        amountCents: true,
      },
      where: {
        status: "PAID",
      },
    });

    const totalCents = result._sum.amountCents || 0;
    return totalCents / 100;
  } catch (error) {
    console.error("Erro ao obter total de pagamentos aprovados:", error);
    return 0;
  }
}
