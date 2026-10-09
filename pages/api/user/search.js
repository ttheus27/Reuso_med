import userRepository from "../../../repositories/userRepository";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { query } = req.query;
      const users = await userRepository.search(query, 10);
      return res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}

