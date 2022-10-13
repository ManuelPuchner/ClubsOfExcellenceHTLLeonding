-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerificationToken" TEXT,
ADD COLUMN     "isStudent" BOOLEAN NOT NULL DEFAULT false;
