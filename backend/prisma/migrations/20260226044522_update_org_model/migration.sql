/*
  Warnings:

  - You are about to drop the `organization_members` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "organization_members" DROP CONSTRAINT "organization_members_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_members" DROP CONSTRAINT "organization_members_user_id_fkey";

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "description" TEXT,
ADD COLUMN     "donation_alert" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "donation_alert_email" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "monthly_summary" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "weekly_summary" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "organization_members";
