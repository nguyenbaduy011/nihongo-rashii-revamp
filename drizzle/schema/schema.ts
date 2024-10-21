import { pgTable, text, timestamp, serial, varchar } from "drizzle-orm/pg-core";
import { user } from "@/drizzle/schema/auth";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  userID: text("userID").references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  image: text("image"),
  description: text("description").notNull(),
  content: text("content").notNull(),
  slug: varchar("slug", { length: 250 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type InsertBlogType = typeof blogs.$inferInsert;
export type SelectBlogType = typeof blogs.$inferSelect;

// export const levels = pgTable("levels", {
//   id: text("id").notNull().primaryKey(),
//   levelName: text("levelName").notNull(),
//   content: text("content").notNull(),
// });

// export const grammars = pgTable("grammars", {
//   id: text("id").notNull().primaryKey(),
//   romajiRead: text("romajiRead").notNull(),
//   japaneseRead: text("japaneseRead").notNull(),
//   level: text("level")
//     .notNull()
//     .references(() => levels.id, { onDelete: "cascade" }),
//   explain: text("explain").notNull(),
//   meaning: text("meaning").notNull(),
//   usingWay: text("usingWay").notNull(),
// });

// export const grammarExamples = pgTable("grammarExamples", {
//   id: text("id").notNull().primaryKey(),
//   grammarID: text("grammarID")
//     .notNull()
//     .references(() => grammars.id, { onDelete: "cascade" }),
//   vietnameseRead: text("vietnameseRead").notNull(),
//   japaneseRead: text("japaneseRead").notNull(),
//   romajiRead: text("romajiRead").notNull(),
// });

// export const grammarHomophone = pgTable("grammarHomophone", {});

// export const grammarSynophone = pgTable("grammarHomophone", {});
