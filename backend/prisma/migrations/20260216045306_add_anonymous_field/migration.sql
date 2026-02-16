/*
  Warnings:

  - You are about to drop the column `donorId` on the `donations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "donations" DROP CONSTRAINT "donations_donorId_fkey";

-- DropIndex
DROP INDEX "donations_donorId_idx";

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "donorId",
ADD COLUMN     "donor_id" TEXT,
ADD COLUMN     "isAnonymous" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "donations_donor_id_idx" ON "donations"("donor_id");

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
