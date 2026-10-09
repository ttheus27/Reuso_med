import { prisma } from "../prisma";

export const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      variants: true,
      productVariantValues: {
        include: {
          variantValue: true,
        },
      },
      stock: {
        orderBy: {
          id: "desc",
        },
      },
    },
  });
};
