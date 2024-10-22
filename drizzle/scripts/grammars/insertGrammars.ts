import { N5Grammars } from "@/drizzle/seeds/grammars_seeds/n5Grammars";
import { N4Grammars } from "@/drizzle/seeds/grammars_seeds/n4Grammars";
import { N3Grammars } from "@/drizzle/seeds/grammars_seeds/n3Grammars";
import { N2Grammars } from "@/drizzle/seeds/grammars_seeds/n2Grammars";
import { N1Grammars } from "@/drizzle/seeds/grammars_seeds/n1Grammars";

import { db } from "@/drizzle/db";
import { grammars } from "@/drizzle/schema/schema";

export async function InsertN5Grammars() {
  try {
    const insertedGrammars = await Promise.all(
      N5Grammars.map(async (grammar) => {
        return await db.insert(grammars).values({
          id: grammar.id,
          romajiRead: grammar.romajiRead,
          japaneseRead: grammar.japaneseRead,
          level: grammar.level,
          explain: grammar.explain,
          meaning: grammar.meaning,
          usingWay: grammar.usingWay,
        });
      }),
    );
    return insertedGrammars;
  } catch (error) {
    console.error("Error inserting N5 grammar examples:", error);
    throw error;
  }
}
