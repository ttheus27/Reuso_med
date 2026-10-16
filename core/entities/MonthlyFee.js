/**
 * Entidade de Domínio: MonthlyFee (Mensalidade Recorrente)
 * Modela os contratos recorrentes entre empresas e o sistema para projeções futuras.
 */
export class MonthlyFee {
  #id;
  #companyId;
  #amountCents;
  #dueDay;
  #dueDate;
  #isActive;
  #createdAt;

  constructor({
    id = null,
    companyId,
    amountCents,
    dueDay,
    dueDate = null,
    isActive = true,
    createdAt = new Date(),
  }) {
    if (!companyId) throw new Error("companyId é obrigatório para MonthlyFee.");
    if (!amountCents || amountCents <= 0) {
      throw new Error("amountCents deve ser positivo.");
    }
    if (dueDay < 1 || dueDay > 31) {
      throw new Error("dueDay deve ser um dia válido (1 a 31).");
    }

    this.#id = id;
    this.#companyId = companyId;
    this.#amountCents = amountCents;
    this.#dueDay = dueDay;
    this.#dueDate = dueDate ? new Date(dueDate) : null;
    this.#isActive = Boolean(isActive);
    this.#createdAt = createdAt;
  }

  get id() { return this.#id; }
  get companyId() { return this.#companyId; }
  get amountCents() { return this.#amountCents; }
  get dueDay() { return this.#dueDay; }
  get dueDate() { return this.#dueDate; }
  get isActive() { return this.#isActive; }
  get createdAt() { return this.#createdAt; }

  deactivate() {
    this.#isActive = false;
  }

  activate() {
    this.#isActive = true;
  }

  generateNextDueDate(targetYear, targetMonth) {
    return new Date(Date.UTC(targetYear, targetMonth - 1, this.#dueDay));
  }

  getFormattedAmount() {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.#amountCents / 100);
  }

  toJSON() {
    return {
      id: this.#id,
      companyId: this.#companyId,
      amountCents: this.#amountCents,
      formattedAmount: this.getFormattedAmount(),
      dueDay: this.#dueDay,
      dueDate: this.#dueDate?.toISOString() || null,
      isActive: this.#isActive,
      createdAt: this.#createdAt,
    };
  }
}
