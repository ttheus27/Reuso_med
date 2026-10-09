import paymentService from "../../../services/paymentService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { companyId, amount, status, paymentMethod, paymentType } = req.body;

      if (!companyId || !amount) {
        return res.status(400).json({ error: "Empresa e valor são obrigatórios" });
      }

      const numericCompanyId = Number(companyId);
      const numericAmount = Number(amount);
      const amountCents = Math.round(numericAmount * 100);

      const result = await paymentService.processAndRecordPayment({
        companyId: numericCompanyId,
        amountCents,
        method: paymentMethod || "PIX",
        status: status || "PENDING",
        type: paymentType || "VENDA",
      });

      return res.status(201).json({
        success: true,
        message: "Pagamento criado com sucesso",
        payment: result.payment,
        transaction: result.transaction,
      });
    } catch (error) {
      console.error("Erro ao criar pagamento manual:", error);
      return res.status(500).json({
        error: "Erro ao criar pagamento manual",
        details: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}

