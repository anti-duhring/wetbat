/*
  Warnings:

  - You are about to drop the column `contactEmail` on the `quotes` table. All the data in the column will be lost.
  - Added the required column `contact_email` to the `quotes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_contactEmail_fkey";

-- AlterTable
ALTER TABLE "quotes" DROP COLUMN "contactEmail",
ADD COLUMN     "contact_email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_contact_email_fkey" FOREIGN KEY ("contact_email") REFERENCES "contacts"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
