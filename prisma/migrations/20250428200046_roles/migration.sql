-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('SUBSCRIBER', 'ADMIN', 'MANAGER', 'SUPPORT', 'EDITOR') NOT NULL DEFAULT 'SUBSCRIBER';

-- CreateTable
CREATE TABLE `UserPermission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `viewFinancial` BOOLEAN NOT NULL DEFAULT false,
    `editUsers` BOOLEAN NOT NULL DEFAULT false,
    `manageProducts` BOOLEAN NOT NULL DEFAULT false,
    `viewOrders` BOOLEAN NOT NULL DEFAULT false,
    `manageOrders` BOOLEAN NOT NULL DEFAULT false,
    `viewDashboard` BOOLEAN NOT NULL DEFAULT false,
    `viewReports` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `UserPermission_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserPermission` ADD CONSTRAINT `UserPermission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
