// /pages/api/server/db/products/getAllProducts.js

import { prisma } from "../prisma";

export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      stock: true,
      productVariantValues: {
        include: {
          variantValue: {
            include: {
              variant: true,
            },
          },
        },
      },
    },
    orderBy: { title: "asc" },
  });

  console.log(
    "Fetched products from Prisma:",
    JSON.stringify(products, null, 2)
  );

  return products.map((product) => {
    // Log product data
    console.log("Processing product:", product);

    // Buscar o variantId relacionado ao produto
    const variantId =
      product.productVariantValues.length > 0
        ? product.productVariantValues[0]?.variantValue?.variant?.id
        : null;

    // Preparar os valores da variante
    const variantValues = product.productVariantValues.map((pvv) => ({
      id: pvv.variantValue.id,
      name: pvv.variantValue.name,
      price: pvv.price,
      stock: pvv.stock,
    }));

    // Log para debugging
    console.log("VariantId for product:", product.id, "=>", variantId);
    console.log("VariantValues for product:", product.id, "=>", variantValues);

    // Retornar o objeto do produto processado
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      status: product.status,
      img: product.img,
      category: {
        id: product.category?.id,
        name: product.category?.name,
      },
      variantId,
      variantValues,
      stock: product.stock || [],
      accountEmail: product.accountEmail || "",
      accountPassword: product.accountPassword || "",
    };
  });
};
