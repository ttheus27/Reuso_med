import { prisma } from "../prisma";

export const getAllCategories = async () => {
  const categories = await prisma.$queryRaw`
        SELECT * FROM Category ORDER BY \`order\` ASC, id ASC;
    `;

  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    order: category.order || 0,
  }));
};
