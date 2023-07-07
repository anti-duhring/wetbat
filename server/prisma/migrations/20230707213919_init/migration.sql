-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('PENDING', 'INPROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "quotes" (
    "id" TEXT NOT NULL,
    "departure_location" TEXT NOT NULL,
    "destination_location" TEXT NOT NULL,
    "departure_date" TIMESTAMP(3) NOT NULL,
    "destination_date" TIMESTAMP(3) NOT NULL,
    "travellers_amount" INTEGER NOT NULL DEFAULT 1,
    "transportation" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "QuoteStatus" NOT NULL DEFAULT 'PENDING',
    "contact" TEXT NOT NULL,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contacts_phone_key" ON "contacts"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");
