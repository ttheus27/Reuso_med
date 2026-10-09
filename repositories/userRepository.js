import prisma from "../patterns/singleton/DatabaseConnection";

/**
 * Repositório de Acesso a Dados para Usuários
 */
class UserRepository {
  async findById(id) {
    return await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phoneNumber: true,
        cpf: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async search(query, limit = 10) {
    if (!query || query.length < 2) return [];

    return await prisma.user.findMany({
      where: {
        OR: [{ name: { contains: query } }, { email: { contains: query } }],
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        role: true,
      },
      take: Number(limit),
    });
  }

  async findAll({ role, skip = 0, take = 50 } = {}) {
    const where = {};
    if (role) where.role = role;

    return await prisma.user.findMany({
      where,
      skip,
      take,
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phoneNumber: true,
        cpf: true,
      },
    });
  }
}

export default new UserRepository();
