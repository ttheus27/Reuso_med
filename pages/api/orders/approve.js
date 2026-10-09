import { prisma } from "../server/db/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { paymentId } = req.body;

      if (!paymentId) {
        return res.status(400).json({ error: "ID do pagamento é obrigatório" });
      }

      const payment = await prisma.payment.findUnique({
        where: {
          id: parseInt(paymentId),
        },
      });

      if (!payment) {
        return res.status(404).json({ error: "Pagamento não encontrado" });
      }

      if (payment.status === "PAID") {
        return res.status(200).json({
          success: true,
          message: "Pagamento já está pago",
        });
      }

      const updatedPayment = await prisma.payment.update({
        where: {
          id: parseInt(paymentId),
        },
        data: {
          status: "PAID",
        },
      });

      return res.status(200).json({
        success: true,
        message: "Pagamento aprovado com sucesso",
        payment: updatedPayment,
      });
    } catch (error) {
      console.error("Erro ao aprovar pagamento:", error);
      return res.status(500).json({
        error: "Erro ao aprovar pagamento",
        details: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
