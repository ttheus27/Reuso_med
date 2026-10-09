import companyRepository from "../../../repositories/companyRepository";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { query } = req.query;
      const companies = await companyRepository.findAll({ search: query, take: 10 });
      return res.status(200).json(companies);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
      return res.status(500).json({ error: "Erro ao buscar empresas" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}

