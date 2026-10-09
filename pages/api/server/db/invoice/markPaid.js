// pages/api/server/db/invoice/markPaid.js
import { prisma } from "../prisma";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { invoiceId } = req.body || {};
    if (!invoiceId) return res.status(400).json({ error: "Missing invoiceId" });

    // Usar transação para atualizar a invoice e criar o pagamento
    const result = await prisma.$transaction(async (tx) => {
      // Atualizar a invoice
      const inv = await tx.invoice.update({
        where: { id: Number(invoiceId) },
        data: { status: "PAID", paidAt: new Date() },
        include: { company: { select: { id: true, name: true } } },
      });

      // Criar pagamento com tipo MENSALIDADE
      const payment = await tx.payment.create({
        data: {
          companyId: inv.company.id,
          amountCents: inv.amountCents,
          method: "PIX", // Método padrão para pagamentos de mensalidade
          status: "PAID",
          type: "MENSALIDADE",
        },
      });

      return { invoice: inv, payment };
    });

    return res
      .status(200)
      .json({ ok: true, invoice: result.invoice, payment: result.payment });
  } catch (e) {
    console.error("[markPaid] ", e);
    return res.status(500).json({ error: "Internal error" });
  }
}
