-- AlterTable
ALTER TABLE `users` ADD COLUMN `refresh_token` TEXT NULL AFTER `username`;
