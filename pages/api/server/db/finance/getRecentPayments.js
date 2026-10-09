import { prisma } from "../prisma";

export async function getRecentPayments(limit = 10, opts = {}) {
  const { start, end, type = "all", status } = opts || {};
  const where = {
    ...(start && end ? { createdAt: { gte: start, lte: end } } : {}),
    ...(status ? { status } : {}),
    ...(type === "recurring" ? { monthlyFeeId: { not: null } } : {}),
    ...(type === "new" ? { saleId: { not: null } } : {}),
  };

  return prisma.payment
    .findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        amountCents: true,
        method: true,
        status: true,
        type: true,
        createdAt: true,
        saleId: true,
        monthlyFeeId: true,
        sale: {
          select: {
            user: { select: { name: true, email: true, id: true } },
            description: true,
          },
        },
        monthlyFee: {
          select: {
            company: { select: { name: true, id: true } },
          },
        },
        company: {
          select: { name: true, id: true, email: true, responsible: true },
        },
      },
    })
    .then((rows) =>
      rows.map((r) => ({
        paymentId: r.id,
        id: r.id,
        amount: r.amountCents / 100,
        status: r.status,
        paymentMethod: r.method,
        paymentType: r.type,
        date: r.createdAt.toISOString(),
        type: r.saleId
          ? "NEW"
          : r.monthlyFeeId
          ? "RECURRING"
          : r.companyId
          ? "MANUAL"
          : "OTHER",
        name:
          r.company?.name ||
          r.monthlyFee?.company?.name ||
          r.sale?.user?.name ||
          "—",
        email: r.company?.email || r.sale?.user?.email || null,
        userId: r.sale?.user?.id || null,
        companyId: r.company?.id || null,
        responsible: r.company?.responsible || null,
        cpf: r.sale?.user?.cpf || null,
      }))
    );
}
