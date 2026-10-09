import { prisma } from '../prisma';

export const getAllCategories = async () => {
    const categories = await prisma.$queryRaw`
    SELECT 
      c.id AS \`categoryId\`, 
      c.name AS \`categoryName\`,
      p.id AS \`productId\`,
      p.title AS \`productTitle\`,
      p.price AS \`productPrice\`,
      p.quantity AS \`productQuantity\`,
      p.status AS \`productStatus\`
    FROM \`Category\` c
    LEFT JOIN \`Product\` p ON c.id = p.\`categoryId\`
    ORDER BY c.\`name\` ASC
  `;

    const categoryMap = {};
    categories.forEach((entry) => {
        if (!categoryMap[entry.categoryId]) {
            categoryMap[entry.categoryId] = {
                id: entry.categoryId,
                name: entry.categoryName,
                products: [],
            };
        }

        if (entry.productId) {
            categoryMap[entry.categoryId].products.push({
                id: entry.productId,
                title: entry.productTitle,
                price: entry.productPrice,
                quantity: entry.productQuantity,
                status: entry.productStatus,
            });
        }
    });

    return Object.values(categoryMap);
};
