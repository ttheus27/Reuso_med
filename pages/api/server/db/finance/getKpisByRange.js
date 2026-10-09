import { prisma } from "../prisma";

// type: "all" | "recurring" | "new"
const sum = (arr, sel = (x) => x) => arr.reduce((a, b) => a + sel(b), 0);

export async function getKpisByRange({ start, end, type = "all" }) {
  // Pagamentos pagos no período
  const whereBase = { status: "PAID", createdAt: { gte: start, lte: end } };

  let where = whereBase;
  if (type === "recurring") where = { ...whereBase, type: "MENSALIDADE" };
  if (type === "new") where = { ...whereBase, type: "VENDA" };

  const paid = await prisma.payment.findMany({
    where,
    select: {
      amountCents: true,
      type: true,
      saleId: true,
      monthlyFeeId: true,
      companyId: true,
    },
  });

  // Para tipo "all", calcular ambos
  if (type === "all") {
    const recurringCents = sum(
      paid.filter((p) => p.type === "MENSALIDADE"),
      (p) => p.amountCents
    );
    const newSalesCents = sum(
      paid.filter((p) => p.type === "VENDA"),
      (p) => p.amountCents
    );
    return {
      totalCents: recurringCents + newSalesCents,
      recurringCents,
      newSalesCents,
      newClientsCount: await prisma.company.count({
        where: { createdAt: { gte: start, lte: end } },
      }),
    };
  }

  // Para tipos específicos, já filtrados na query
  const totalCents = sum(paid, (p) => p.amountCents);
  const recurringCents = type === "recurring" ? totalCents : 0;
  const newSalesCents = type === "new" ? totalCents : 0;

  // Novos clientes (companies criadas no período) - sempre calcular independente do tipo
  const newClientsCount = await prisma.company.count({
    where: { createdAt: { gte: start, lte: end } },
  });

  return { totalCents, recurringCents, newSalesCents, newClientsCount };
}
