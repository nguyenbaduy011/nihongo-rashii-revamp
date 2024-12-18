CREATE TABLE IF NOT EXISTS "grammarExamples" (
	"id" text PRIMARY KEY NOT NULL,
	"grammarID" text NOT NULL,
	"vietnameseRead" text NOT NULL,
	"japaneseRead" text NOT NULL,
	"romajiRead" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grammarHomophone" (
	"id" text PRIMARY KEY NOT NULL,
	"grammarId" text NOT NULL,
	"homophoneGrammarId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grammarSynophone" (
	"id" text PRIMARY KEY NOT NULL,
	"grammarId" text NOT NULL,
	"synonymGrammarId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grammars" (
	"id" text PRIMARY KEY NOT NULL,
	"romajiRead" text NOT NULL,
	"japaneseRead" text NOT NULL,
	"level" text NOT NULL,
	"explain" text NOT NULL,
	"meaning" text NOT NULL,
	"usingWay" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "levels" (
	"id" text PRIMARY KEY NOT NULL,
	"levelName" text NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grammarExamples" ADD CONSTRAINT "grammarExamples_grammarID_grammars_id_fk" FOREIGN KEY ("grammarID") REFERENCES "public"."grammars"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grammarHomophone" ADD CONSTRAINT "grammarHomophone_grammarId_grammars_id_fk" FOREIGN KEY ("grammarId") REFERENCES "public"."grammars"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grammarHomophone" ADD CONSTRAINT "grammarHomophone_homophoneGrammarId_grammars_id_fk" FOREIGN KEY ("homophoneGrammarId") REFERENCES "public"."grammars"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grammarSynophone" ADD CONSTRAINT "grammarSynophone_grammarId_grammars_id_fk" FOREIGN KEY ("grammarId") REFERENCES "public"."grammars"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grammarSynophone" ADD CONSTRAINT "grammarSynophone_synonymGrammarId_grammars_id_fk" FOREIGN KEY ("synonymGrammarId") REFERENCES "public"."grammars"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grammars" ADD CONSTRAINT "grammars_level_levels_id_fk" FOREIGN KEY ("level") REFERENCES "public"."levels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
