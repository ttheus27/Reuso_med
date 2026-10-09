import taskService from "../../../services/taskService";

/**
 * Endpoint de API: Transição de Status de Tarefas
 * Utiliza o padrão TEMPLATE METHOD (TaskWorkflowTemplate) e STRATEGY (TaskPriorityStrategy)
 */
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { taskId, targetStatus, user } = req.body;

      if (!taskId || !targetStatus) {
        return res.status(400).json({ error: "Campos 'taskId' e 'targetStatus' são obrigatórios." });
      }

      // Usuário simulado ou autenticado da sessão
      const currentUser = user || { id: 1, name: "Operador" };

      const updatedTask = await taskService.transitionStatus(taskId, targetStatus, currentUser);
      return res.status(200).json({
        message: `Status da tarefa alterado para ${targetStatus} com sucesso.`,
        task: updatedTask,
      });
    } catch (error) {
      console.error("Erro na transição de status da tarefa:", error);
      return res.status(400).json({ error: error.message || "Erro ao processar transição" });
    }
  }

  if (req.method === "GET") {
    try {
      const { sort = "DUE_DATE", status, priority, companyId } = req.query;
      const tasks = await taskService.listTasks({ status, priority, companyId }, sort);
      return res.status(200).json(tasks);
    } catch (error) {
      console.error("Erro ao listar tarefas:", error);
      return res.status(500).json({ error: "Erro interno ao listar tarefas" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Método ${req.method} não permitido` });
}
