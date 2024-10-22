ALTER TABLE "blogs" DROP CONSTRAINT "blogs_userID_user_id_fk";
--> statement-breakpoint
ALTER TABLE "blogs" DROP COLUMN IF EXISTS "userID";--> statement-breakpoint
ALTER TABLE "blogs" DROP COLUMN IF EXISTS "image";--> statement-breakpoint
ALTER TABLE "blogs" DROP COLUMN IF EXISTS "date";