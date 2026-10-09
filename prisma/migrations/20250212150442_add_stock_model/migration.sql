/*
  Warnings:

  - You are about to drop the column `accountEmail` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `accountPassword` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `accountEmail`,
    DROP COLUMN `accountPassword`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `suspended` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `isUsed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
