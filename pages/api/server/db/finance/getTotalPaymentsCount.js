import { prisma } from "../prisma";

export async function getTotalPaymentsCount() {
  try {
    const count = await prisma.payment.count({
      where: {
        status: "PAID",
      },
    });
    return count;
  } catch (error) {
    console.error("Erro ao contar pagamentos:", error);
    return 0;
  }
}
