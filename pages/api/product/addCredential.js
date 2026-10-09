import { prisma } from "@/pages/api/server/db/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { productId, description, variantValueId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "ID do produto é obrigatório" });
    }

    // Verificar se o produto existe e se tem variantes
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
      include: {
        productVariantValues: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Se o produto tem variantes, o variantValueId é obrigatório
    if (product.productVariantValues.length > 0 && !variantValueId) {
      return res.status(400).json({
        error: "Seleção de variante é obrigatória para este produto",
      });
    }

    // Dados básicos para criação da credencial
    const stockData = {
      productId: parseInt(productId),
      description: description || "",
      isUsed: false,
    };

    // Se houver variantValueId, adicionar ao stockData
    if (variantValueId) {
      // Verificar se o variantValueId é válido para este produto
      const validVariant = await prisma.productVariantValue.findFirst({
        where: {
          productId: parseInt(productId),
          variantValueId: parseInt(variantValueId),
        },
      });

      if (!validVariant) {
        return res.status(400).json({
          error: "Variante inválida para este produto",
        });
      }

      stockData.variantValueId = parseInt(variantValueId);
    }

    // Adiciona a nova credencial ao estoque do produto
    const stock = await prisma.stock.create({
      data: stockData,
    });

    return res.status(201).json({ success: true, stock });
  } catch (error) {
    console.error("Erro ao adicionar credencial:", error);
    return res.status(500).json({ error: "Erro ao adicionar credencial" });
  }
}
