ALTER TABLE "blogs" ADD COLUMN "userID" text;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "date" timestamp DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blogs" ADD CONSTRAINT "blogs_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
