// /pages/api/server/db/variants/getAllVariants.js
import { prisma } from "../prisma";

export const getAllVariants = async () => {
  const variants = await prisma.$queryRaw`
        SELECT * FROM Variant;
    `;

  return variants.map((variant) => ({
    id: variant.id,
    name: variant.name,
  }));
};
