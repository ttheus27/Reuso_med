/**
 * Entidade de Domínio: Payment (Pagamento / Transação Financeira)
 * Encapsula formas de liquidação, cálculo de taxas de gateway e status da transação.
 */
export class Payment {
  #id;
  #userId;
  #companyId;
  #monthlyFeeId;
  #saleId;
  #amountCents;
  #method; // 'PIX', 'BOLETO', 'CREDIT_CARD'
  #status; // 'PENDING', 'PAID', 'REFUNDED'
  #type; // 'MENSALIDADE', 'VENDA'
  #createdAt;

  constructor({
    id = null,
    userId = null,
    companyId = null,
    monthlyFeeId = null,
    saleId = null,
    amountCents,
    method = "PIX",
    status = "PENDING",
    type = "VENDA",
    createdAt = new Date(),
  }) {
    if (typeof amountCents !== "number" || amountCents <= 0) {
      throw new Error("amountCents deve ser um valor numérico positivo.");
    }

    this.#id = id;
    this.#userId = userId;
    this.#companyId = companyId;
    this.#monthlyFeeId = monthlyFeeId;
    this.#saleId = saleId;
    this.#amountCents = amountCents;
    this.#method = method.toUpperCase();
    this.#status = status.toUpperCase();
    this.#type = type.toUpperCase();
    this.#createdAt = createdAt;
  }

  get id() { return this.#id; }
  get userId() { return this.#userId; }
  get companyId() { return this.#companyId; }
  get monthlyFeeId() { return this.#monthlyFeeId; }
  get saleId() { return this.#saleId; }
  get amountCents() { return this.#amountCents; }
  get method() { return this.#method; }
  get status() { return this.#status; }
  get type() { return this.#type; }
  get createdAt() { return this.#createdAt; }

  isLiquidated() {
    return this.#status === "PAID";
  }

  calculateGatewayFeeCents() {
    switch (this.#method) {
      case "PIX":
        return 0; // PIX sem taxa
      case "BOLETO":
        return 250; // R$ 2,50 fixos por boleto
      case "CREDIT_CARD":
        return Math.round(this.#amountCents * 0.035); // 3.5%
      default:
        return 0;
    }
  }

  getNetRevenueCents() {
    return Math.max(0, this.#amountCents - this.calculateGatewayFeeCents());
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
      amountCents: this.#amountCents,
      formattedAmount: this.getFormattedAmount(),
      method: this.#method,
      status: this.#status,
      type: this.#type,
      feeCents: this.calculateGatewayFeeCents(),
      netRevenueCents: this.getNetRevenueCents(),
      isLiquidated: this.isLiquidated(),
      createdAt: this.#createdAt,
    };
  }
}
