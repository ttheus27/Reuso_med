import paymentService from "../../../services/paymentService";

/**
 * Endpoint de API: Processamento e Liquidação de Pagamento
 * Utiliza o padrão STRATEGY (PaymentStrategy: Pix, Boleto, Cartão)
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Método ${req.method} não permitido` });
  }

  try {
    const { amountCents, method, companyId, invoiceId, monthlyFeeId, userId, installments, cardBrand } = req.body;

    if (!amountCents || !method) {
      return res.status(400).json({ error: "Campos 'amountCents' e 'method' são obrigatórios." });
    }

    const result = await paymentService.processAndRecordPayment({
      amountCents: Number(amountCents),
      method,
      companyId: companyId ? Number(companyId) : null,
      invoiceId: invoiceId ? Number(invoiceId) : null,
      monthlyFeeId: monthlyFeeId ? Number(monthlyFeeId) : null,
      userId: userId ? Number(userId) : null,
      installments,
      cardBrand,
    });

    return res.status(200).json({
      message: "Pagamento processado com sucesso.",
      data: result,
    });
  } catch (error) {
    console.error("Erro no processamento de pagamento:", error);
    return res.status(400).json({ error: error.message || "Erro ao processar pagamento" });
  }
}
