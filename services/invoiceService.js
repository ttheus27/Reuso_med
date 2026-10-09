import invoiceRepository from "../repositories/invoiceRepository";
import {
  InvoiceCalculatorContext,
  StandardInterestStrategy,
  VipInterestStrategy,
  GracePeriodInterestStrategy,
} from "../patterns/strategy/interestStrategies";
import { SpedyInvoiceImporter } from "../patterns/template-method/InvoiceImporterTemplate";

/**
 * Camada de Serviço para Faturas / Invoices
 * Encapsula regras de negócio, cálculos de juros/multas e fluxos de importação.
 */
class InvoiceService {
  constructor() {
    this.calculatorContext = new InvoiceCalculatorContext();
  }

  async listInvoices(filters) {
    const invoices = await invoiceRepository.findAll(filters);

    // Enriquece faturas vencidas com o cálculo da estratégia de juros
    const today = new Date();
    return invoices.map((inv) => {
      let daysLate = 0;
      let finalAmountCents = inv.amountCents;

      if (inv.status === "PENDING" && new Date(inv.dueDate) < today) {
        const diffMs = today.getTime() - new Date(inv.dueDate).getTime();
        daysLate = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        finalAmountCents = this.calculatorContext.getFinalAmount(inv.amountCents, daysLate);
      }

      return {
        ...inv,
        daysLate,
        finalAmountCents,
      };
    });
  }

  async calculateLateFee(amountCents, daysLate, clientType = "STANDARD") {
    let strategy;
    switch (clientType.toUpperCase()) {
      case "VIP":
      case "PARCEIRO":
        strategy = new VipInterestStrategy();
        break;
      case "ISENTO":
      case "GRACE":
        strategy = new GracePeriodInterestStrategy();
        break;
      default:
        strategy = new StandardInterestStrategy();
        break;
    }

    this.calculatorContext.setStrategy(strategy);
    return this.calculatorContext.getFinalAmount(amountCents, daysLate);
  }

  async importBatch(rawPayload) {
    const importer = new SpedyInvoiceImporter();
    return await importer.processImport(rawPayload, invoiceRepository);
  }

  async createInvoice(data) {
    return await invoiceRepository.create(data);
  }

  async getInvoiceById(id) {
    return await invoiceRepository.findById(id);
  }
}

export default new InvoiceService();
