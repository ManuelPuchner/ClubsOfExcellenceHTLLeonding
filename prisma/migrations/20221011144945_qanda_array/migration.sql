/*
  Warnings:

  - The `qanda` column on the `Club` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Club" DROP COLUMN "qanda",
ADD COLUMN     "qanda" JSONB[];
