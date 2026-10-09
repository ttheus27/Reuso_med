import paymentRepository from "../repositories/paymentRepository";
import invoiceRepository from "../repositories/invoiceRepository";
import {
  PaymentProcessingContext,
  PixPaymentStrategy,
  BoletoPaymentStrategy,
  CreditCardPaymentStrategy,
} from "../patterns/strategy/paymentStrategies";

/**
 * Camada de Serviço para Liquidação e Gestão de Pagamentos
 */
class PaymentService {
  constructor() {
    this.processingContext = new PaymentProcessingContext();
  }

  getStrategyForMethod(method) {
    switch (method?.toUpperCase()) {
      case "BOLETO":
        return new BoletoPaymentStrategy();
      case "CREDIT_CARD":
      case "CARTAO":
        return new CreditCardPaymentStrategy();
      case "PIX":
      default:
        return new PixPaymentStrategy();
    }
  }

  async processAndRecordPayment(paymentInput) {
    const strategy = this.getStrategyForMethod(paymentInput.method);
    this.processingContext.setStrategy(strategy);

    // Executa a estratégia de pagamento
    const transactionResult = await this.processingContext.execute(paymentInput);

    // Persiste o pagamento no banco
    const createdPayment = await paymentRepository.create({
      amountCents: paymentInput.amountCents,
      method: transactionResult.method,
      status: transactionResult.status,
      companyId: paymentInput.companyId,
      monthlyFeeId: paymentInput.monthlyFeeId,
      userId: paymentInput.userId,
      saleId: paymentInput.saleId,
      type: paymentInput.type || "MENSALIDADE",
    });

    // Se houver uma fatura associada e o pagamento for liquidado imediatamente, marca a fatura como paga
    if (paymentInput.invoiceId && transactionResult.status === "PAID") {
      await invoiceRepository.update(paymentInput.invoiceId, {
        status: "PAID",
        paidAt: new Date(),
      });
    }

    return {
      payment: createdPayment,
      transaction: transactionResult,
    };
  }

  async listPayments(filters) {
    return await paymentRepository.findAll(filters);
  }
}

export default new PaymentService();
