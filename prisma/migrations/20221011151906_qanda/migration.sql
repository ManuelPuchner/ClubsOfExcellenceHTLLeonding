/*
  Warnings:

  - You are about to drop the column `qanda` on the `Club` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Club" DROP COLUMN "qanda";

-- CreateTable
CREATE TABLE "QandA" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answers" TEXT NOT NULL,

    CONSTRAINT "QandA_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QandA" ADD CONSTRAINT "QandA_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
