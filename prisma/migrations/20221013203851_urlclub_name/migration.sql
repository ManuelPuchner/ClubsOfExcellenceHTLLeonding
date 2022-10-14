/*
  Warnings:

  - A unique constraint covering the columns `[clubname,urlClubname]` on the table `Club` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `urlClubname` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Club_clubname_key";

-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "urlClubname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Club_clubname_urlClubname_key" ON "Club"("clubname", "urlClubname");
