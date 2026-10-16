/**
 * Padrão GoF: TEMPLATE METHOD (Exemplo 2)
 * Fluxo padronizado para mudanças de status e ciclo de vida de tarefas no sistema.
 */
export class TaskWorkflowTemplate {
  /**
   * Template Method
   * Executa a transição de estado garantindo autenticação, cálculo de timestamps,
   * persistência e pós-processamento / auditoria.
   */
  async executeTransition(task, user, repository) {
    this.validatePermissions(task, user);
    const updateData = this.calculateTimestamps(task);
    const savedTask = await this.persistTransition(task.id, updateData, repository);
    await this.afterTransition(savedTask);
    return savedTask;
  }

  validatePermissions(task, user) {
    if (!user || !user.id) {
      throw new Error("Permissão negada: Usuário não autenticado.");
    }
  }

  // Métodos primitivos que devem ser implementados pelas subclasses
  calculateTimestamps(task) {
    throw new Error("O método calculateTimestamps() deve ser implementado.");
  }

  async persistTransition(taskId, data, repository) {
    if (!repository || typeof repository.updateTask !== "function") {
      throw new Error("Repositório de tarefas inválido para persistência.");
    }
    return await repository.updateTask(taskId, data);
  }

  // Hook opcional para logs, envio de notificações ou webhooks
  async afterTransition(task) {}
}

/**
 * Subclasse Concreta: Transição para 'EM_ANDAMENTO'
 */
export class StartTaskWorkflow extends TaskWorkflowTemplate {
  calculateTimestamps(task) {
    const now = new Date();
    return {
      status: "EM_ANDAMENTO",
      startedAt: task.startedAt || now,
      lastResumeAt: now,
      pausedAt: null,
    };
  }

  async afterTransition(task) {
    // Exemplo: Log de início da tarefa
    console.log(`[TaskWorkflow] Tarefa #${task.id} iniciada em ${new Date().toISOString()}`);
  }
}

/**
 * Subclasse Concreta: Transição para 'PAUSADA' / 'ABERTA'
 */
export class PauseTaskWorkflow extends TaskWorkflowTemplate {
  calculateTimestamps(task) {
    const now = new Date();
    let diff = 0;
    if (task.lastResumeAt) {
      diff = now.getTime() - new Date(task.lastResumeAt).getTime();
    }
    const currentTotal = task.totalTimeWorked || 0;
    const newTotalMs = currentTotal + diff;

    return {
      status: "ABERTA",
      pausedAt: now,
      lastResumeAt: null,
      totalTimeWorked: newTotalMs,
    };
  }

  async afterTransition(task) {
    console.log(`[TaskWorkflow] Tarefa #${task.id} pausada. Tempo acumulado: ${task.totalTimeWorked}ms`);
  }
}

/**
 * Subclasse Concreta: Transição para 'CONCLUIDA'
 */
export class CompleteTaskWorkflow extends TaskWorkflowTemplate {
  calculateTimestamps(task) {
    const now = new Date();
    let diff = 0;
    if (task.status === "EM_ANDAMENTO" && task.lastResumeAt) {
      diff = now.getTime() - new Date(task.lastResumeAt).getTime();
    }
    const currentTotal = task.totalTimeWorked || 0;
    const newTotalMs = currentTotal + diff;

    return {
      status: "CONCLUIDA",
      finishedAt: now,
      lastResumeAt: null,
      pausedAt: null,
      totalTimeWorked: newTotalMs,
    };
  }

  async afterTransition(task) {
    console.log(`[TaskWorkflow] Tarefa #${task.id} concluída com sucesso.`);
  }
}

/**
 * Factory Method para instanciar o Workflow adequado
 */
export function getWorkflowForTransition(targetStatus, currentStatus) {
  const target = String(targetStatus || "").toUpperCase();
  const current = String(currentStatus || "").toUpperCase();

  if (target === "EM_ANDAMENTO") return new StartTaskWorkflow();
  if ((target === "ABERTA" || target === "PAUSADA") && current === "EM_ANDAMENTO") {
    return new PauseTaskWorkflow();
  }
  if (target === "CONCLUIDA") return new CompleteTaskWorkflow();
  return null;
}
