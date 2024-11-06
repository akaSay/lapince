/*
  Warnings:

  - Added the required column `export` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `privacy` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'EUR',
ADD COLUMN     "export" JSONB NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'fr',
ADD COLUMN     "privacy" JSONB NOT NULL,
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'dark';
