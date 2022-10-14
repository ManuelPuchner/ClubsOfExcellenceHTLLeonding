/*
  Warnings:

  - A unique constraint covering the columns `[clubname]` on the table `Club` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[urlClubname]` on the table `Club` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Club_clubname_urlClubname_key";

-- CreateIndex
CREATE UNIQUE INDEX "Club_clubname_key" ON "Club"("clubname");

-- CreateIndex
CREATE UNIQUE INDEX "Club_urlClubname_key" ON "Club"("urlClubname");
