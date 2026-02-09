/*
  Warnings:

  - You are about to drop the column `verification_statusa` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "verification_statusa",
ADD COLUMN     "verification_status" BOOLEAN NOT NULL DEFAULT false;
