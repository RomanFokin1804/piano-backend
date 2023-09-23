/*
  Warnings:

  - You are about to drop the column `exercise` on the `exercises` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `exercises` DROP COLUMN `exercise`;

-- CreateTable
CREATE TABLE `notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exercise_id` INTEGER NOT NULL,
    `note` VARCHAR(15) NOT NULL,
    `time` FLOAT NOT NULL,
    `result` VARCHAR(15) NULL,
    `status` ENUM('NO_ANSWER', 'SUCCESS', 'FAIL') NOT NULL DEFAULT 'NO_ANSWER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_exercise_id_fkey` FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
