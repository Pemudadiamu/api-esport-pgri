/*
  Warnings:

  - You are about to drop the column `createdAt` on the `teams` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `teams` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `teams` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `teams` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `teams` DROP FOREIGN KEY `teams_user_id_fkey`;

-- AlterTable
ALTER TABLE `teams` DROP COLUMN `createdAt`,
    DROP COLUMN `role`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `user_id`;

-- CreateTable
CREATE TABLE `TeamMember` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teamId` INTEGER NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `role` ENUM('gold', 'exp', 'mid', 'jungle', 'roam') NOT NULL,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
