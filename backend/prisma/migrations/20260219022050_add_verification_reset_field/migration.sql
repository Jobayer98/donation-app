/*
  Warnings:

  - A unique constraint covering the columns `[id,fund_raiser_id]` on the table `payment_providers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "reset_token" TEXT,
ADD COLUMN     "reset_token_expiry" TIMESTAMP(3),
ADD COLUMN     "verification_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "payment_providers_id_fund_raiser_id_key" ON "payment_providers"("id", "fund_raiser_id");
