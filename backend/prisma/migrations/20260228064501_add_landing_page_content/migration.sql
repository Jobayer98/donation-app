-- CreateEnum
CREATE TYPE "PlanInterval" AS ENUM ('MONTH', 'YEAR');

-- AlterTable
ALTER TABLE "plans" ALTER COLUMN "interval" DROP DEFAULT;

-- CreateTable
CREATE TABLE "landing_page_contents" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "hero_title" TEXT,
    "hero_subtitle" TEXT,
    "hero_image_url" TEXT,
    "featured_campaign_id" TEXT,
    "show_active_campaigns" BOOLEAN NOT NULL DEFAULT true,
    "active_campaigns_title" TEXT NOT NULL DEFAULT 'Active Campaigns',
    "footer_text" TEXT,
    "footer_links" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_page_contents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "landing_page_contents_organization_id_key" ON "landing_page_contents"("organization_id");

-- CreateIndex
CREATE INDEX "landing_page_contents_organization_id_idx" ON "landing_page_contents"("organization_id");

-- AddForeignKey
ALTER TABLE "landing_page_contents" ADD CONSTRAINT "landing_page_contents_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
