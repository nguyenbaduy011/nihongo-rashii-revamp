ALTER TABLE "blogs" RENAME COLUMN "date" TO "created_at";--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "slug" varchar(250) NOT NULL;