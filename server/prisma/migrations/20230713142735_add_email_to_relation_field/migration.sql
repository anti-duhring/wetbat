/*
  Warnings:

  - You are about to drop the column `contactId` on the `quotes` table. All the data in the column will be lost.
  - Added the required column `contactEmail` to the `quotes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_contactId_fkey";

-- AlterTable
ALTER TABLE "quotes" DROP COLUMN "contactId",
ADD COLUMN     "contactEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_contactEmail_fkey" FOREIGN KEY ("contactEmail") REFERENCES "contacts"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
