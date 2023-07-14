-- CreateTable
CREATE TABLE "airports" (
    "id" SERIAL NOT NULL,
    "lat" TEXT NOT NULL,
    "lon" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "tz" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "airports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "airports_name_city_idx" ON "airports"("name", "city");
