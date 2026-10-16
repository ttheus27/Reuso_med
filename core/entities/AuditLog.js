/**
 * Entidade de Domínio: AuditLog (Registro de Auditoria de Operações)
 * Armazena trilha imutável de ações executadas no sistema (transições de tarefas, faturas e pagamentos).
 */
export class AuditLog {
  #id;
  #entity; // 'TASK', 'INVOICE', 'PAYMENT', 'COMPANY'
  #entityId;
  #action; // 'CREATE', 'UPDATE', 'TRANSITION', 'PAY', 'CANCEL'
  #performedBy;
  #details;
  #timestamp;

  constructor({
    id = null,
    entity,
    entityId,
    action,
    performedBy = "SYSTEM",
    details = {},
    timestamp = new Date(),
  }) {
    if (!entity || !action) {
      throw new Error("Entidade e Ação são obrigatórias para registro de auditoria.");
    }

    this.#id = id || `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    this.#entity = entity.toUpperCase();
    this.#entityId = entityId;
    this.#action = action.toUpperCase();
    this.#performedBy = performedBy;
    this.#details = details;
    this.#timestamp = timestamp instanceof Date ? timestamp : new Date(timestamp);
  }

  get id() { return this.#id; }
  get entity() { return this.#entity; }
  get entityId() { return this.#entityId; }
  get action() { return this.#action; }
  get performedBy() { return this.#performedBy; }
  get details() { return this.#details; }
  get timestamp() { return this.#timestamp; }

  isRecent(maxMinutes = 60) {
    const diffMs = Date.now() - this.#timestamp.getTime();
    return diffMs <= maxMinutes * 60 * 1000;
  }

  formatLogEntry() {
    return `[${this.#timestamp.toISOString()}] [${this.#entity} #${this.#entityId}] ${this.#action} realizado por ${this.#performedBy}`;
  }

  toJSON() {
    return {
      id: this.#id,
      entity: this.#entity,
      entityId: this.#entityId,
      action: this.#action,
      performedBy: this.#performedBy,
      details: this.#details,
      timestamp: this.#timestamp.toISOString(),
      formatted: this.formatLogEntry(),
    };
  }
}
