"use server";

import { db } from "@/drizzle/db";
import { blogs } from "@/drizzle/schema/schema"; // Import schema tương ứng
import { eq } from "drizzle-orm";

export async function deleteBlog(id: number) {
  await db.delete(blogs).where(eq(blogs.id, id));
}