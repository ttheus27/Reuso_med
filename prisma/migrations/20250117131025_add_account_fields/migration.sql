-- AlterTable
ALTER TABLE `Product` ADD COLUMN `accountEmail` TEXT NULL,
    ADD COLUMN `accountPassword` TEXT NULL;

-- CreateIndex
CREATE INDEX `Product_status_idx` ON `Product`(`status`);
