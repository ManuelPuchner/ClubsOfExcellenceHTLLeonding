/*
  Warnings:

  - You are about to drop the column `isNewUser` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isStudent` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'NEW_USER';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isNewUser",
DROP COLUMN "isStudent";
