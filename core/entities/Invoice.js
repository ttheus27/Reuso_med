/**
 * Entidade de Domínio: Invoice (Cobrança / Fatura)
 * Controla valores em centavos, datas de vencimento, estados de pagamento e mora.
 */
export class Invoice {
  #id;
  #companyId;
  #monthlyFeeId;
  #amountCents;
  #dueDay;
  #dueDate;
  #periodYear;
  #periodMonth;
  #status; // 'PENDING', 'PAID', 'OVERDUE', 'CANCELED'
  #paidAt;
  #isFuture;
  #createdAt;

  constructor({
    id = null,
    companyId,
    monthlyFeeId = null,
    amountCents,
    dueDay,
    dueDate,
    periodYear,
    periodMonth,
    status = "PENDING",
    paidAt = null,
    isFuture = false,
    createdAt = new Date(),
  }) {
    if (!companyId) throw new Error("companyId é obrigatório para Invoice.");
    if (typeof amountCents !== "number" || amountCents <= 0) {
      throw new Error("amountCents deve ser um número positivo.");
    }

    this.#id = id;
    this.#companyId = companyId;
    this.#monthlyFeeId = monthlyFeeId;
    this.#amountCents = amountCents;
    this.#dueDay = dueDay;
    this.#dueDate = new Date(dueDate);
    this.#periodYear = periodYear;
    this.#periodMonth = periodMonth;
    this.#status = status;
    this.#paidAt = paidAt ? new Date(paidAt) : null;
    this.#isFuture = Boolean(isFuture);
    this.#createdAt = createdAt;
  }

  get id() { return this.#id; }
  get companyId() { return this.#companyId; }
  get monthlyFeeId() { return this.#monthlyFeeId; }
  get amountCents() { return this.#amountCents; }
  get dueDay() { return this.#dueDay; }
  get dueDate() { return this.#dueDate; }
  get periodYear() { return this.#periodYear; }
  get periodMonth() { return this.#periodMonth; }
  get status() { return this.#status; }
  get paidAt() { return this.#paidAt; }
  get isFuture() { return this.#isFuture; }
  get createdAt() { return this.#createdAt; }

  isOverdue() {
    if (this.#status === "PAID" || this.#status === "CANCELED") return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.#dueDate < today;
  }

  calculateDaysLate() {
    if (!this.isOverdue()) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = today.getTime() - this.#dueDate.getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  }

  markAsPaid(date = new Date()) {
    if (this.#status === "CANCELED") {
      throw new Error("Fatura cancelada não pode ser liquidada.");
    }
    this.#status = "PAID";
    this.#paidAt = date;
  }

  cancel() {
    if (this.#status === "PAID") {
      throw new Error("Fatura já liquidada não pode ser cancelada diretamente.");
    }
    this.#status = "CANCELED";
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
      monthlyFeeId: this.#monthlyFeeId,
      amountCents: this.#amountCents,
      formattedAmount: this.getFormattedAmount(),
      dueDay: this.#dueDay,
      dueDate: this.#dueDate.toISOString(),
      periodYear: this.#periodYear,
      periodMonth: this.#periodMonth,
      status: this.#status,
      isOverdue: this.isOverdue(),
      daysLate: this.calculateDaysLate(),
      paidAt: this.#paidAt?.toISOString() || null,
      isFuture: this.#isFuture,
      createdAt: this.#createdAt,
    };
  }
}
