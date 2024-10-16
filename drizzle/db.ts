import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as auth from "@/drizzle/schema/auth";
import * as schema from "@/drizzle/schema/schema"

config({ path: ".env.local" }); // or .env.local

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema: { ...auth, ...schema }});
