/*
  Warnings:

  - You are about to drop the column `urlClubname` on the `Club` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Club_urlClubname_key";

-- AlterTable
ALTER TABLE "Club" DROP COLUMN "urlClubname";
