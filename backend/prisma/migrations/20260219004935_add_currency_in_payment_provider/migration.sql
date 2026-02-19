-- AlterTable
ALTER TABLE "payment_providers" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'BDT';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'DONOR';
