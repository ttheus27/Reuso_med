-- AlterTable
ALTER TABLE `Order` ADD COLUMN `stockId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `Stock`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
