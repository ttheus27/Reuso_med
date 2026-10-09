import prisma from "../patterns/singleton/DatabaseConnection";

/**
 * Repositório de Acesso a Dados para Empresas / Clientes
 */
class CompanyRepository {
  async findAll({ search, ownerId, skip = 0, take = 50 } = {}) {
    const where = {};
    if (ownerId) where.ownerId = Number(ownerId);
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { responsible: { contains: search } },
        { email: { contains: search } },
        { cnpj: { contains: search } },
      ];
    }

    return await prisma.company.findMany({
      where,
      skip,
      take,
      orderBy: { name: "asc" },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        _count: { select: { invoices: true, tasks: true, payments: true } },
      },
    });
  }

  async findById(id) {
    return await prisma.company.findUnique({
      where: { id: Number(id) },
      include: {
        invoices: { orderBy: { dueDate: "desc" }, take: 10 },
        tasks: { orderBy: { createdAt: "desc" }, take: 10 },
        payments: { orderBy: { createdAt: "desc" }, take: 10 },
        monthlyFees: true,
      },
    });
  }

  async create(data) {
    return await prisma.company.create({
      data: {
        name: data.name,
        responsible: data.responsible || null,
        email: data.email || null,
        phone: data.phone || null,
        whatsapp: data.whatsapp || null,
        address: data.address || null,
        city: data.city || null,
        state: data.state || null,
        zipCode: data.zipCode || null,
        cnpj: data.cnpj || null,
        notes: data.notes || null,
        ownerId: Number(data.ownerId),
      },
    });
  }

  async update(id, data) {
    return await prisma.company.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id) {
    return await prisma.company.delete({
      where: { id: Number(id) },
    });
  }
}

export default new CompanyRepository();
