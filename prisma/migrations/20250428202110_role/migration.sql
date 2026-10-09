/*
  Warnings:

  - The values [MANAGER,SUPPORT] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `UserPermission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserPermission` DROP FOREIGN KEY `UserPermission_userId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('SUBSCRIBER', 'EDITOR', 'ADMIN') NOT NULL DEFAULT 'SUBSCRIBER';

-- DropTable
DROP TABLE `UserPermission`;
