import prisma from "../patterns/singleton/DatabaseConnection";

/**
 * Repositório de Acesso a Dados para Pagamentos
 */
class PaymentRepository {
  async findAll({ companyId, status, method, skip = 0, take = 50 } = {}) {
    const where = {};
    if (companyId) where.companyId = Number(companyId);
    if (status) where.status = status;
    if (method) where.method = method;

    return await prisma.payment.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: {
        company: { select: { id: true, name: true } },
        User: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findById(id) {
    return await prisma.payment.findUnique({
      where: { id: Number(id) },
      include: { company: true, monthlyFee: true, sale: true },
    });
  }

  async create(data) {
    return await prisma.payment.create({
      data: {
        amountCents: Number(data.amountCents),
        method: data.method || "PIX",
        status: data.status || "PENDING",
        companyId: data.companyId ? Number(data.companyId) : null,
        monthlyFeeId: data.monthlyFeeId ? Number(data.monthlyFeeId) : null,
        userId: data.userId ? Number(data.userId) : null,
        saleId: data.saleId ? Number(data.saleId) : null,
        type: data.type || "MENSALIDADE",
      },
    });
  }

  async update(id, data) {
    return await prisma.payment.update({
      where: { id: Number(id) },
      data,
    });
  }
}

export default new PaymentRepository();
