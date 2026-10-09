-- AlterTable
ALTER TABLE `Stock` ADD COLUMN `variantValueId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_variantValueId_fkey` FOREIGN KEY (`variantValueId`) REFERENCES `VariantValue`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
