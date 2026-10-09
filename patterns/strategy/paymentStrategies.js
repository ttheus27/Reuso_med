/**
 * Padrão GoF: STRATEGY (Exemplo 2)
 * Estratégias intercambiáveis para liquidação e conciliação de pagamentos (PIX, Boleto, Cartão).
 */

export class PaymentStrategy {
  async process(paymentData) {
    throw new Error("process() deve ser implementado.");
  }
}

/**
 * Estratégia 1: PIX (Instantâneo, taxa zero ou fixa baixa)
 */
export class PixPaymentStrategy extends PaymentStrategy {
  async process(paymentData) {
    return {
      method: "PIX",
      status: "PAID",
      transactionId: `PIX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      feeCents: 0,
      liquidatedImmediately: true,
      paidAt: new Date(),
      details: {
        qrCodeText: `00020126580014BR.GOV.BCB.PIX0136${paymentData.companyId || "GENERIC"}5204000053039865405${paymentData.amountCents}5802BR5913DASHBOARD6009SAOPAULO62070503***6304`,
      },
    };
  }
}

/**
 * Estratégia 2: Boleto Bancário (Compensação em 1 a 3 dias úteis)
 */
export class BoletoPaymentStrategy extends PaymentStrategy {
  async process(paymentData) {
    return {
      method: "BOLETO",
      status: "PENDING",
      transactionId: `BOL-${Date.now()}`,
      feeCents: 250, // R$ 2,50 de taxa de emissão bancária
      liquidatedImmediately: false,
      paidAt: null,
      details: {
        barcode: "34191.79001 01043.510047 91020.150008 8 9800000010000",
        dueDays: 3,
      },
    };
  }
}

/**
 * Estratégia 3: Cartão de Crédito (Taxa percentual, liquidação imediata)
 */
export class CreditCardPaymentStrategy extends PaymentStrategy {
  async process(paymentData) {
    const feeCents = Math.round(paymentData.amountCents * 0.035); // 3.5% operadora
    return {
      method: "CREDIT_CARD",
      status: "PAID",
      transactionId: `CC-${Date.now()}`,
      authorizationCode: `AUTH-${Math.floor(100000 + Math.random() * 900000)}`,
      feeCents,
      liquidatedImmediately: true,
      paidAt: new Date(),
      details: {
        installments: paymentData.installments || 1,
        brand: paymentData.cardBrand || "MASTERCARD",
      },
    };
  }
}

/**
 * Contexto: Processador de Pagamentos
 */
export class PaymentProcessingContext {
  constructor(strategy = new PixPaymentStrategy()) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  async execute(paymentData) {
    if (!paymentData || !paymentData.amountCents) {
      throw new Error("Dados de pagamento inválidos: amountCents obrigatório.");
    }
    return await this.strategy.process(paymentData);
  }
}
