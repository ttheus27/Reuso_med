import prisma from '../prisma';

export async function getOrders() {
    try {
        const orders = await prisma.$queryRawUnsafe(`
            SELECT
                o.id AS orderId,
                o.createdAt,
                o.quantity,
                o.totalPrice,
                o.status,
                o.accountEmail,
                o.accountPassword,
                o.description,

                u.id AS userId,
                u.name AS userName,
                u.email AS userEmail,

                p.id AS productId,
                p.title AS productTitle,
                p.price AS productPrice,

                s.email AS stockEmail,
                s.password AS stockPassword,
                s.description AS stockDescription,

                vv.name AS variantValueName,
                v.name AS variantName

            FROM \`Order\` o
            LEFT JOIN \`User\` u ON o.userId = u.id
            LEFT JOIN \`Product\` p ON o.productId = p.id
            LEFT JOIN \`Stock\` s ON o.stockId = s.id
            LEFT JOIN \`VariantValue\` vv ON s.variantValueId = vv.id
            LEFT JOIN \`Variant\` v ON vv.variantId = v.id

            ORDER BY o.createdAt DESC
        `);

        return { orders };
    } catch (error) {
        console.error('Erro ao buscar pedidos via SQL:', error);
        return { orders: [] };
    }
}
