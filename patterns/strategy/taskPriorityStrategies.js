/**
 * Padrão GoF: STRATEGY (Exemplo 3)
 * Estratégias intercambiáveis para ordenação, filtragem e priorização da fila de tarefas.
 */

export class TaskPriorityStrategy {
  sort(tasks) {
    throw new Error("sort() deve ser implementado.");
  }
}

/**
 * Estratégia 1: Prioridade por Data de Vencimento (Deadlines mais urgentes primeiro)
 */
export class DueDatePriorityStrategy extends TaskPriorityStrategy {
  sort(tasks) {
    return [...tasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }
}

/**
 * Estratégia 2: Prioridade por Tempo de Espera (Gargalos: tarefas abertas há mais tempo)
 */
export class IdleTimePriorityStrategy extends TaskPriorityStrategy {
  sort(tasks) {
    return [...tasks].sort((a, b) => {
      const waitA = Date.now() - new Date(a.createdAt).getTime();
      const waitB = Date.now() - new Date(b.createdAt).getTime();
      return waitB - waitA; // Mais antigas primeiro
    });
  }
}

/**
 * Estratégia 3: Prioridade por Gravidade Declarada (ALTA > MEDIA > BAIXA)
 */
export class SeverityPriorityStrategy extends TaskPriorityStrategy {
  sort(tasks) {
    const weights = { ALTA: 3, MEDIA: 2, BAIXA: 1 };
    return [...tasks].sort((a, b) => {
      const pA = weights[a.priority?.toUpperCase()] || 0;
      const pB = weights[b.priority?.toUpperCase()] || 0;
      return pB - pA;
    });
  }
}

/**
 * Contexto: Ordenador de Tarefas
 */
export class TaskSorterContext {
  constructor(strategy = new DueDatePriorityStrategy()) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  sort(tasks) {
    if (!Array.isArray(tasks)) return [];
    return this.strategy.sort(tasks);
  }
}
