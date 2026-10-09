import prisma from "../patterns/singleton/DatabaseConnection";

/**
 * Repositório de Acesso a Dados para Faturas / Invoices
 * Encapsula todas as queries e mutações diretas do Prisma.
 */
class InvoiceRepository {
  async findAll({ status, companyId, isFuture, skip = 0, take = 50 } = {}) {
    const where = {};
    if (status) where.status = status;
    if (companyId) where.companyId = Number(companyId);
    if (typeof isFuture === "boolean") where.isFuture = isFuture;

    return await prisma.invoice.findMany({
      where,
      skip,
      take,
      orderBy: { dueDate: "asc" },
      include: {
        company: {
          select: { id: true, name: true, responsible: true, email: true },
        },
      },
    });
  }

  async findById(id) {
    return await prisma.invoice.findUnique({
      where: { id: Number(id) },
      include: {
        company: true,
        monthlyFee: true,
      },
    });
  }

  async create(data) {
    return await prisma.invoice.create({
      data: {
        companyId: Number(data.companyId),
        monthlyFeeId: data.monthlyFeeId ? Number(data.monthlyFeeId) : null,
        amountCents: Number(data.amountCents),
        dueDay: Number(data.dueDay || new Date(data.dueDate).getDate()),
        dueDate: new Date(data.dueDate),
        periodYear: Number(data.periodYear || new Date(data.dueDate).getFullYear()),
        periodMonth: Number(data.periodMonth || new Date(data.dueDate).getMonth() + 1),
        status: data.status || "PENDING",
        isFuture: data.isFuture || false,
      },
    });
  }

  async createBatch(records) {
    const formatted = records.map((r) => ({
      companyId: Number(r.companyId),
      amountCents: Number(r.amountCents),
      dueDay: Number(r.dueDay || new Date(r.dueDate).getDate()),
      dueDate: new Date(r.dueDate),
      periodYear: Number(r.periodYear || new Date(r.dueDate).getFullYear()),
      periodMonth: Number(r.periodMonth || new Date(r.dueDate).getMonth() + 1),
      status: r.status || "PENDING",
      isFuture: r.isFuture || false,
    }));

    return await prisma.invoice.createMany({
      data: formatted,
    });
  }

  async update(id, data) {
    return await prisma.invoice.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id) {
    return await prisma.invoice.delete({
      where: { id: Number(id) },
    });
  }
}

export default new InvoiceRepository();
