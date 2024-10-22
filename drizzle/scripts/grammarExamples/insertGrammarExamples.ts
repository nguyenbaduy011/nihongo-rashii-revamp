import { N5GrammarExamples } from "@/drizzle/seeds/grammarExamples_seeds/n5GrammarExamples";
import { db } from "@/drizzle/db";
import { grammarExamples } from "@/drizzle/schema/schema";

export async function InsertN5GrammarExamples() {
  try {
    const insertedExamples = await Promise.all(
      N5GrammarExamples.map(async (example) => {
        return await db.insert(grammarExamples).values({
          id: example.id,
          grammarID: example.grammarID,
          vietnameseRead: example.vietnameseRead,
          japaneseRead: example.japaneseRead,
          romajiRead: example.romajiRead,
        });
      }),
    );
    return insertedExamples;
  } catch (error) {
    console.error("Error inserting N5 grammar examples:", error);
    throw error;
  }
}
