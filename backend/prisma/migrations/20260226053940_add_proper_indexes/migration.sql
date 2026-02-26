/*
  Warnings:

  - You are about to drop the column `fundraiser_id` on the `campaigns` table. All the data in the column will be lost.
  - You are about to alter the column `goal_amount` on the `campaigns` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to alter the column `raised_amount` on the `campaigns` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to drop the column `isAnonymous` on the `donations` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `donations` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to drop the column `fund_raiser_id` on the `payment_logs` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `payment_logs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to alter the column `store_amount` on the `payment_logs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to alter the column `currency_amount` on the `payment_logs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to alter the column `currency_rate` on the `payment_logs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,4)`.
  - You are about to drop the column `fund_raiser_id` on the `payment_providers` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `plans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to drop the column `user_id` on the `subscriptions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organization_id]` on the table `subscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `created_by_id` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Made the column `organization_id` on table `campaigns` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updated_at` to the `donations` table without a default value. This is not possible if the table is not empty.
  - Made the column `primary_color` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `secondary_color` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `organization_id` to the `payment_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `payment_providers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "CampaignStatus" ADD VALUE 'CLOSED';

-- DropForeignKey
ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_fundraiser_id_fkey";

-- DropForeignKey
ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "payment_logs" DROP CONSTRAINT "payment_logs_fund_raiser_id_fkey";

-- DropForeignKey
ALTER TABLE "payment_providers" DROP CONSTRAINT "payment_providers_fund_raiser_id_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_user_id_fkey";

-- DropIndex
DROP INDEX "notifications_read_idx";

-- DropIndex
DROP INDEX "notifications_user_id_idx";

-- DropIndex
DROP INDEX "payment_providers_id_fund_raiser_id_key";

-- DropIndex
DROP INDEX "subscriptions_user_id_key";

-- AlterTable
ALTER TABLE "campaigns" DROP COLUMN "fundraiser_id",
ADD COLUMN     "created_by_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "goal_amount" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "raised_amount" SET DEFAULT 0,
ALTER COLUMN "raised_amount" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "organization_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "isAnonymous",
ADD COLUMN     "is_anonymous" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "primary_color" SET NOT NULL,
ALTER COLUMN "secondary_color" SET NOT NULL;

-- AlterTable
ALTER TABLE "payment_logs" DROP COLUMN "fund_raiser_id",
ADD COLUMN     "organization_id" TEXT NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "store_amount" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "currency_amount" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "currency_rate" SET DATA TYPE DECIMAL(10,4);

-- AlterTable
ALTER TABLE "payment_providers" DROP COLUMN "fund_raiser_id",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "plans" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "user_id",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "OrgMemberRole";

-- CreateIndex
CREATE INDEX "campaigns_organization_id_idx" ON "campaigns"("organization_id");

-- CreateIndex
CREATE INDEX "campaigns_status_idx" ON "campaigns"("status");

-- CreateIndex
CREATE INDEX "campaigns_organization_id_status_idx" ON "campaigns"("organization_id", "status");

-- CreateIndex
CREATE INDEX "campaigns_created_at_idx" ON "campaigns"("created_at");

-- CreateIndex
CREATE INDEX "donations_status_idx" ON "donations"("status");

-- CreateIndex
CREATE INDEX "donations_created_at_idx" ON "donations"("created_at");

-- CreateIndex
CREATE INDEX "donations_campaign_id_status_idx" ON "donations"("campaign_id", "status");

-- CreateIndex
CREATE INDEX "notifications_user_id_read_idx" ON "notifications"("user_id", "read");

-- CreateIndex
CREATE INDEX "notifications_created_at_idx" ON "notifications"("created_at");

-- CreateIndex
CREATE INDEX "organizations_owner_id_idx" ON "organizations"("owner_id");

-- CreateIndex
CREATE INDEX "organizations_slug_idx" ON "organizations"("slug");

-- CreateIndex
CREATE INDEX "organizations_is_active_idx" ON "organizations"("is_active");

-- CreateIndex
CREATE INDEX "payment_logs_organization_id_idx" ON "payment_logs"("organization_id");

-- CreateIndex
CREATE INDEX "payment_logs_transaction_id_idx" ON "payment_logs"("transaction_id");

-- CreateIndex
CREATE INDEX "payment_providers_organization_id_idx" ON "payment_providers"("organization_id");

-- CreateIndex
CREATE INDEX "payment_providers_organization_id_is_active_idx" ON "payment_providers"("organization_id", "is_active");

-- CreateIndex
CREATE INDEX "plans_is_active_idx" ON "plans"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_organization_id_key" ON "subscriptions"("organization_id");

-- CreateIndex
CREATE INDEX "subscriptions_status_idx" ON "subscriptions"("status");

-- CreateIndex
CREATE INDEX "subscriptions_plan_id_idx" ON "subscriptions"("plan_id");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_providers" ADD CONSTRAINT "payment_providers_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_logs" ADD CONSTRAINT "payment_logs_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
