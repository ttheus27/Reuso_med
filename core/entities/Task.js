/**
 * Entidade de Domínio: Task (Tarefa Operacional / Time Tracker)
 * Encapsula o ciclo de vida de tarefas, prioridades e cálculo de tempo trabalhado.
 */
export class Task {
  #id;
  #title;
  #description;
  #companyId;
  #assigneeId;
  #status; // 'ABERTA', 'EM_ANDAMENTO', 'PAUSADA', 'CONCLUIDA'
  #priority; // 'ALTA', 'MEDIA', 'BAIXA'
  #dueDate;
  #startedAt;
  #lastResumeAt;
  #pausedAt;
  #finishedAt;
  #totalTimeWorked; // em milissegundos
  #createdAt;

  constructor({
    id = null,
    title,
    description = null,
    companyId,
    assigneeId = null,
    status = "ABERTA",
    priority = "MEDIA",
    dueDate = null,
    startedAt = null,
    lastResumeAt = null,
    pausedAt = null,
    finishedAt = null,
    totalTimeWorked = 0,
    createdAt = new Date(),
  }) {
    if (!title || title.trim().length === 0) {
      throw new Error("Título da tarefa é obrigatório.");
    }
    if (!companyId) {
      throw new Error("companyId é obrigatório para Task.");
    }

    this.#id = id;
    this.#title = title.trim();
    this.#description = description;
    this.#companyId = companyId;
    this.#assigneeId = assigneeId;
    this.#status = status;
    this.#priority = priority.toUpperCase();
    this.#dueDate = dueDate ? new Date(dueDate) : null;
    this.#startedAt = startedAt ? new Date(startedAt) : null;
    this.#lastResumeAt = lastResumeAt ? new Date(lastResumeAt) : null;
    this.#pausedAt = pausedAt ? new Date(pausedAt) : null;
    this.#finishedAt = finishedAt ? new Date(finishedAt) : null;
    this.#totalTimeWorked = totalTimeWorked;
    this.#createdAt = createdAt;
  }

  get id() { return this.#id; }
  get title() { return this.#title; }
  get description() { return this.#description; }
  get companyId() { return this.#companyId; }
  get assigneeId() { return this.#assigneeId; }
  get status() { return this.#status; }
  get priority() { return this.#priority; }
  get dueDate() { return this.#dueDate; }
  get startedAt() { return this.#startedAt; }
  get lastResumeAt() { return this.#lastResumeAt; }
  get pausedAt() { return this.#pausedAt; }
  get finishedAt() { return this.#finishedAt; }
  get totalTimeWorked() { return this.#totalTimeWorked; }
  get createdAt() { return this.#createdAt; }

  start() {
    const now = new Date();
    if (!this.#startedAt) this.#startedAt = now;
    this.#lastResumeAt = now;
    this.#pausedAt = null;
    this.#status = "EM_ANDAMENTO";
  }

  pause() {
    if (this.#status === "EM_ANDAMENTO" && this.#lastResumeAt) {
      const now = new Date();
      const elapsed = now.getTime() - this.#lastResumeAt.getTime();
      this.#totalTimeWorked += elapsed;
      this.#pausedAt = now;
      this.#lastResumeAt = null;
    }
    this.#status = "ABERTA";
  }

  complete() {
    if (this.#status === "EM_ANDAMENTO" && this.#lastResumeAt) {
      const now = new Date();
      const elapsed = now.getTime() - this.#lastResumeAt.getTime();
      this.#totalTimeWorked += elapsed;
      this.#lastResumeAt = null;
      this.#pausedAt = null;
    }
    this.#finishedAt = new Date();
    this.#status = "CONCLUIDA";
  }

  getFormattedTimeWorked() {
    const totalSec = Math.floor(this.#totalTimeWorked / 1000);
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  isUrgent() {
    return this.#priority === "ALTA" && this.#status !== "CONCLUIDA";
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      companyId: this.#companyId,
      assigneeId: this.#assigneeId,
      status: this.#status,
      priority: this.#priority,
      isUrgent: this.isUrgent(),
      dueDate: this.#dueDate?.toISOString() || null,
      totalTimeWorked: this.#totalTimeWorked,
      formattedTime: this.getFormattedTimeWorked(),
      startedAt: this.#startedAt?.toISOString() || null,
      finishedAt: this.#finishedAt?.toISOString() || null,
      createdAt: this.#createdAt,
    };
  }
}
