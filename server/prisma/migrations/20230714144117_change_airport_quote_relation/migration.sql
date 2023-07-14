/*
  Warnings:

  - You are about to drop the column `departureLocationId` on the `quotes` table. All the data in the column will be lost.
  - You are about to drop the column `destinationLocationId` on the `quotes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `airports` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departureLocationName` to the `quotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationLocationName` to the `quotes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_departureLocationId_fkey";

-- DropForeignKey
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_destinationLocationId_fkey";

-- AlterTable
ALTER TABLE "quotes" DROP COLUMN "departureLocationId",
DROP COLUMN "destinationLocationId",
ADD COLUMN     "departureLocationName" TEXT NOT NULL,
ADD COLUMN     "destinationLocationName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "airports_name_key" ON "airports"("name");

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_departureLocationName_fkey" FOREIGN KEY ("departureLocationName") REFERENCES "airports"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_destinationLocationName_fkey" FOREIGN KEY ("destinationLocationName") REFERENCES "airports"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
