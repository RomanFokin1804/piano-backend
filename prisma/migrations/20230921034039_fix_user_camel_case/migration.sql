/*
  Warnings:

  - You are about to drop the column `typeId` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `exercises` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `exercises` DROP FOREIGN KEY `exercises_typeId_fkey`;

-- DropForeignKey
ALTER TABLE `exercises` DROP FOREIGN KEY `exercises_userId_fkey`;

-- AlterTable
ALTER TABLE `exercises` DROP COLUMN `typeId`,
    DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER NOT NULL AFTER `id`,
    ADD COLUMN `type_id` INTEGER NOT NULL AFTER `user_id`;

-- AddForeignKey
ALTER TABLE `exercises` ADD CONSTRAINT `exercises_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercises` ADD CONSTRAINT `exercises_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `exercises_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
