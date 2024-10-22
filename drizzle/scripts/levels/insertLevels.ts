import { Levels } from "@/drizzle/seeds/levels_seeds/levels";

import { db } from "@/drizzle/db";
import { levels } from "@/drizzle/schema/schema";

export async function InsertLevels() {
  try {
    const insertedLevels = await Promise.all(
      Levels.map(async (level) => {
        return await db.insert(levels).values({
          id: level.id,
          levelName: level.levelName,
          content: level.content,
        });
      }),
    );
    return insertedLevels;
  } catch (error) {
    console.error("Error inserting levels:", error);
    throw error;
  }
}
