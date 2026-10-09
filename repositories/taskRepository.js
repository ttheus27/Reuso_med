import prisma from "../patterns/singleton/DatabaseConnection";

/**
 * Repositório de Acesso a Dados para Tarefas
 */
class TaskRepository {
  async findAll({ companyId, status, priority, assigneeId, skip = 0, take = 100 } = {}) {
    const where = {};
    if (companyId) where.companyId = Number(companyId);
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assigneeId) where.assigneeId = Number(assigneeId);

    return await prisma.task.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: {
        company: { select: { id: true, name: true } },
        assignee: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findById(id) {
    return await prisma.task.findUnique({
      where: { id: Number(id) },
      include: {
        company: true,
        assignee: true,
      },
    });
  }

  async create(data) {
    return await prisma.task.create({
      data: {
        title: data.title,
        description: data.description || null,
        companyId: Number(data.companyId),
        assigneeId: data.assigneeId ? Number(data.assigneeId) : null,
        status: data.status || "ABERTA",
        priority: data.priority || "MEDIA",
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });
  }

  async updateTask(id, data) {
    return await prisma.task.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id) {
    return await prisma.task.delete({
      where: { id: Number(id) },
    });
  }
}

export default new TaskRepository();
