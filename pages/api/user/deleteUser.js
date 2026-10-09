import { prisma } from "@/pages/api/server/db/prisma";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "ID do usuário é obrigatório" });
      }

      const deletedUser = await prisma.user.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json({
        message: "Usuário deletado com sucesso",
        deletedUser,
      });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      res.status(500).json({ error: "Erro ao deletar o usuário" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
