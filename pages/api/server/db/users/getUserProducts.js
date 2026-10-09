import { PaymentStatus } from '@prisma/client';
import { prisma } from '../prisma';

export const getUserProducts = async (userId) => {
    // Fetch payments with the related product included
    const userPayments = await prisma.payment.findMany({
        where: { userId: userId, status: PaymentStatus.APPROVED },
        include: {
            product: true,
        },
    });

    const productsWithLicenses = userPayments.map((payment) => ({
        product: payment.product,
        license: payment.license,
    }));
    return productsWithLicenses;
};
