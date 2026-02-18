/*
  Warnings:

  - Added the required column `provider` to the `donations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "donations" ADD COLUMN     "provider" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "payment_providers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "config" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fund_raiser_id" TEXT NOT NULL,

    CONSTRAINT "payment_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_logs" (
    "id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "val_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "store_amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "bank_tran_id" TEXT NOT NULL,
    "card_type" TEXT NOT NULL,
    "card_no" TEXT NOT NULL,
    "card_issuer" TEXT NOT NULL,
    "card_brand" TEXT NOT NULL,
    "card_issuer_country" TEXT NOT NULL,
    "card_issuer_country_code" TEXT NOT NULL,
    "currency_type" TEXT NOT NULL,
    "currency_amount" DECIMAL(65,30) NOT NULL,
    "currency_rate" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fund_raiser_id" TEXT NOT NULL,

    CONSTRAINT "payment_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_logs_transaction_id_key" ON "payment_logs"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_logs_val_id_key" ON "payment_logs"("val_id");

-- AddForeignKey
ALTER TABLE "payment_providers" ADD CONSTRAINT "payment_providers_fund_raiser_id_fkey" FOREIGN KEY ("fund_raiser_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_logs" ADD CONSTRAINT "payment_logs_fund_raiser_id_fkey" FOREIGN KEY ("fund_raiser_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
