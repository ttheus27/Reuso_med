import taskRepository from "../repositories/taskRepository";
import {
  StartTaskWorkflow,
  PauseTaskWorkflow,
  CompleteTaskWorkflow,
} from "../patterns/template-method/TaskWorkflowTemplate";
import {
  TaskSorterContext,
  DueDatePriorityStrategy,
  IdleTimePriorityStrategy,
  SeverityPriorityStrategy,
} from "../patterns/strategy/taskPriorityStrategies";

/**
 * Camada de Serviço para Tarefas
 * Coordena os workflows de ciclo de vida e a estratégia de ordenação.
 */
class TaskService {
  constructor() {
    this.sorterContext = new TaskSorterContext();
  }

  async listTasks(filters, sortStrategyType = "DUE_DATE") {
    const tasks = await taskRepository.findAll(filters);

    switch (sortStrategyType?.toUpperCase()) {
      case "IDLE_TIME":
      case "ESPERA":
        this.sorterContext.setStrategy(new IdleTimePriorityStrategy());
        break;
      case "SEVERITY":
      case "PRIORIDADE":
        this.sorterContext.setStrategy(new SeverityPriorityStrategy());
        break;
      case "DUE_DATE":
      default:
        this.sorterContext.setStrategy(new DueDatePriorityStrategy());
        break;
    }

    return this.sorterContext.sort(tasks);
  }

  async createTask(data) {
    return await taskRepository.create(data);
  }

  async transitionStatus(taskId, targetStatus, user) {
    const task = await taskRepository.findById(taskId);
    if (!task) {
      throw new Error(`Tarefa com ID #${taskId} não encontrada.`);
    }

    let workflow;
    switch (targetStatus?.toUpperCase()) {
      case "EM_ANDAMENTO":
      case "INICIAR":
        workflow = new StartTaskWorkflow();
        break;
      case "PAUSADA":
      case "PAUSAR":
        workflow = new PauseTaskWorkflow();
        break;
      case "CONCLUIDA":
      case "FINALIZAR":
        workflow = new CompleteTaskWorkflow();
        break;
      default:
        throw new Error(`Transição para status '${targetStatus}' não suportada.`);
    }

    return await workflow.executeTransition(task, user, taskRepository);
  }
}

export default new TaskService();
