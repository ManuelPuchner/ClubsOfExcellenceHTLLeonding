/*
  Warnings:

  - You are about to drop the column `answers` on the `QandA` table. All the data in the column will be lost.
  - Added the required column `answer` to the `QandA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QandA" DROP COLUMN "answers",
ADD COLUMN     "answer" TEXT NOT NULL;
