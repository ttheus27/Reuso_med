import { prisma } from '../prisma';

export const getAllCoupons = async () => {
    const coupons = await prisma.$queryRaw`
        SELECT 
            c.id AS \`couponId\`,
            c.code,
            c.discount,
            c.discountType,
            c.maxUses,
            c.startAmount,
            c.availableAmount,
            c.isActive,
            c.createdAt,
            c.updatedAt,
            c.productId,
            p.title AS \`productTitle\`,
            COALESCE(SUM(pay.productQuantity), 0) AS \`totalQuantitySold\`,
            COALESCE(SUM(pay.amount), 0) AS \`totalSalesAmount\`
        FROM \`Coupon\` c
        LEFT JOIN \`Product\` p ON c.\`productId\` = p.id
        LEFT JOIN \`Payment\` pay ON pay.\`couponCode\` = c.code AND pay.\`status\` = 'APPROVED'
        GROUP BY c.id
        ORDER BY c.\`createdAt\` DESC
    `;

    return coupons.map((coupon) => ({
        id: coupon.couponId,
        code: coupon.code,
        discount: coupon.discount,
        discountType: coupon.discountType,
        maxUses: coupon.maxUses,
        startAmount: coupon.startAmount,
        availableAmount: coupon.availableAmount,
        isActive: coupon.isActive,
        createdAt: coupon.createdAt.toISOString(),
        updatedAt: coupon.updatedAt.toISOString(),
        product: coupon.productId
            ? {
                  id: coupon.productId,
                  title: coupon.productTitle,
              }
            : null,
        totalQuantitySold: parseInt(coupon.totalQuantitySold || 0, 10),
        totalSalesAmount: parseFloat(coupon.totalSalesAmount || 0),
    }));
};
