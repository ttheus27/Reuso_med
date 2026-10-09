import { prisma } from "../server/db/prisma";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId, suspended } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { suspended },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error toggling user suspend status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
