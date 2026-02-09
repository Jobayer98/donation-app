/*
  Warnings:

  - You are about to drop the column `campaignId` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `donations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transaction_id]` on the table `donations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `campaign_id` to the `donations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_campaignId_fkey";

-- DropIndex
DROP INDEX "donations_campaignId_idx";

-- DropIndex
DROP INDEX "donations_transactionId_key";

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "campaignId",
DROP COLUMN "createdAt",
DROP COLUMN "transactionId",
ADD COLUMN     "campaign_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transaction_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "donations_transaction_id_key" ON "donations"("transaction_id");

-- CreateIndex
CREATE INDEX "donations_campaign_id_idx" ON "donations"("campaign_id");

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
