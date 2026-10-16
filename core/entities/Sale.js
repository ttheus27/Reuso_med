/**
 * Entidade de Domínio: Sale (Venda Avulsa / Entrada Comercial)
 * Modela os lançamentos manuais de produtos/serviços e apuração de comissões.
 */
export class Sale {
  #id;
  #userId;
  #description;
  #amountCents;
  #createdAt;

  constructor({
    id = null,
    userId,
    description,
    amountCents,
    createdAt = new Date(),
  }) {
    if (!userId) throw new Error("userId é obrigatório para Sale.");
    if (!description || description.trim().length === 0) {
      throw new Error("Descrição é obrigatória.");
    }
    if (typeof amountCents !== "number" || amountCents <= 0) {
      throw new Error("amountCents deve ser um valor numérico positivo.");
    }

    this.#id = id;
    this.#userId = userId;
    this.#description = description.trim();
    this.#amountCents = amountCents;
    this.#createdAt = createdAt;
  }

  get id() { return this.#id; }
  get userId() { return this.#userId; }
  get description() { return this.#description; }
  get amountCents() { return this.#amountCents; }
  get createdAt() { return this.#createdAt; }

  calculateCommissionCents(percent = 0.1) {
    return Math.round(this.#amountCents * percent);
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
      userId: this.#userId,
      description: this.#description,
      amountCents: this.#amountCents,
      formattedAmount: this.getFormattedAmount(),
      commission10Pct: this.calculateCommissionCents(0.1),
      createdAt: this.#createdAt,
    };
  }
}
