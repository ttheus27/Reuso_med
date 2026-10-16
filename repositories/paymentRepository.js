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
    const status = data.status || "PENDING";
    const createData = {
      amountCents: Number(data.amountCents),
      method: data.method || "PIX",
      status,
      type: data.type || "MENSALIDADE",
    };

    if (data.companyId) {
      createData.company = { connect: { id: Number(data.companyId) } };
    }
    if (data.monthlyFeeId) {
      createData.monthlyFee = { connect: { id: Number(data.monthlyFeeId) } };
    }
    if (data.userId) {
      createData.User = { connect: { id: Number(data.userId) } };
    }
    if (data.saleId) {
      createData.sale = { connect: { id: Number(data.saleId) } };
    }

    return await prisma.payment.create({
      data: createData,
      include: {
        company: { select: { id: true, name: true } },
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
