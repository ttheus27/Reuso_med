import { prisma } from "@/pages/api/server/db/prisma";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const { id, name, email, role, phoneNumber, balance, password, cpf } =
      req.body;

    const updateData = {
      name,
      email,
      role,
      phoneNumber,
      balance: parseFloat(balance),
      cpf,
    };

    // If password is provided, hash it
    if (password) {
      updateData.password = await hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    delete updatedUser.password;

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      message: "Erro ao atualizar usuário",
      error: error.message,
    });
  }
}
