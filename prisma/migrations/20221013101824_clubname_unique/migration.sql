/*
  Warnings:

  - A unique constraint covering the columns `[clubname]` on the table `Club` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Club_clubname_key" ON "Club"("clubname");
