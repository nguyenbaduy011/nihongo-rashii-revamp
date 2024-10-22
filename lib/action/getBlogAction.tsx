"use server";

import { db } from "@/drizzle/db";
import { blogs } from "@/drizzle/schema/schema";
import { count, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getBlog() {
  const session = await auth.api.getSession({
    headers: headers(), 
  });

  if (!session?.session.userId) return 0;

  const result = await db
    .select()
    .from(blogs)
    .where(eq(blogs.userID, session.session.userId));

  return result;
}
