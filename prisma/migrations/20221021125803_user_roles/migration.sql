/*
  Warnings:

  - You are about to drop the column `isAdministrator` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'TEACHER', 'ADMINISTRATOR');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdministrator",
ADD COLUMN     "role" "UserRole";
