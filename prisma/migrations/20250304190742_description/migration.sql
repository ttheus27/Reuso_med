-- AlterTable
ALTER TABLE `Order` ADD COLUMN `description` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `description` LONGTEXT NOT NULL;
