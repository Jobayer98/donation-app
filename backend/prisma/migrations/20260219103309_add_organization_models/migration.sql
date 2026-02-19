/*
  Warnings:

  - The values [ENTERPRISE] on the enum `PlanType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlanType_new" AS ENUM ('FREE', 'PRO');
ALTER TABLE "plans" ALTER COLUMN "type" TYPE "PlanType_new" USING ("type"::text::"PlanType_new");
ALTER TYPE "PlanType" RENAME TO "PlanType_old";
ALTER TYPE "PlanType_new" RENAME TO "PlanType";
DROP TYPE "public"."PlanType_old";
COMMIT;
