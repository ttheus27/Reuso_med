import { getProductById } from "../server/db/products/getProductById";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID do produto é obrigatório" });
    }

    const product = await getProductById(parseInt(id, 10));

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return res.status(500).json({ error: "Erro ao buscar produto" });
  }
}
