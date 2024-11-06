-- AlterTable
ALTER TABLE "Settings" ALTER COLUMN "notifications" SET DEFAULT '{"email":false,"push":false,"budget":false,"weekly":false,"monthly":false}',
ALTER COLUMN "export" SET DEFAULT '{"format":"csv","frequency":"monthly"}',
ALTER COLUMN "privacy" SET DEFAULT '{"showProfile":false,"showStats":false,"showBudget":false}';
