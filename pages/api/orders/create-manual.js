import paymentService from "../../../services/paymentService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { companyId, amount, status, paymentMethod, paymentType } = req.body;

      if (!companyId || amount === undefined || amount === null) {
        return res.status(400).json({ error: "Empresa e valor são obrigatórios" });
      }

      const numericCompanyId = Number(companyId);
      const numericAmount = Number(amount);

      if (isNaN(numericAmount) || numericAmount <= 0) {
        return res.status(400).json({ error: "O valor informado deve ser maior que zero." });
      }

      const amountCents = Math.round(numericAmount * 100);

      // Limite de segurança de 32 bits (Int max: 2.147.483.647)
      if (amountCents > 2147483647) {
        return res.status(400).json({
          error: "O valor informado excede o limite máximo suportado (R$ 20.000.000,00)."
        });
      }

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

