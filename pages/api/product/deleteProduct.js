// /pages/api/product/deleteProduct.js
import { prisma } from "@/pages/api/server/db/prisma";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID do produto é obrigatório" });
    }

    try {
      const productId = parseInt(id, 10);

      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: {
          productVariantValues: true,
          variants: {
            include: {
              values: true,
            },
          },
          paymentProducts: true, // Check related payment records
        },
      });

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      // If there are payment products linked, return an error
      if (product.paymentProducts.length > 0) {
        return res.status(400).json({
          error: "Erro ao deletar porque esse produto já tem pagamento",
        });
      }

      await prisma.$transaction(async (tx) => {
        // Delete related ProductVariantValues
        if (product.productVariantValues.length > 0) {
          const productVariantValueIds = product.productVariantValues.map(
            (pv) => pv.id
          );
          await tx.productVariantValue.deleteMany({
            where: { id: { in: productVariantValueIds } },
          });
        }

        // Delete VariantValues
        for (const variant of product.variants) {
          if (variant.values.length > 0) {
            const variantValueIds = variant.values.map((v) => v.id);
            await tx.variantValue.deleteMany({
              where: { id: { in: variantValueIds } },
            });
          }
        }

        // Delete Variants
        if (product.variants.length > 0) {
          const variantIds = product.variants.map((v) => v.id);
          await tx.variant.deleteMany({
            where: { id: { in: variantIds } },
          });
        }

        // Finally, delete the product
        await tx.product.delete({
          where: { id: productId },
        });
      });

      return res.status(200).json({
        message: "Produto deletado com sucesso",
      });
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      res.status(500).json({ error: "Erro ao deletar o produto" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
