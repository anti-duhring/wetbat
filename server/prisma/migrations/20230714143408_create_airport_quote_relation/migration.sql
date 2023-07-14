/*
  Warnings:

  - You are about to drop the column `departure_location` on the `quotes` table. All the data in the column will be lost.
  - You are about to drop the column `destination_location` on the `quotes` table. All the data in the column will be lost.
  - Added the required column `departureLocationId` to the `quotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationLocationId` to the `quotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quotes" DROP COLUMN "departure_location",
DROP COLUMN "destination_location",
ADD COLUMN     "departureLocationId" INTEGER NOT NULL,
ADD COLUMN     "destinationLocationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_departureLocationId_fkey" FOREIGN KEY ("departureLocationId") REFERENCES "airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_destinationLocationId_fkey" FOREIGN KEY ("destinationLocationId") REFERENCES "airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
