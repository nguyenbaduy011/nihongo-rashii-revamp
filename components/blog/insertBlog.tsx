"use server";
import { db } from "@/drizzle/db";
import { blogs } from "@/drizzle/schema/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function insertBlog(values: any, data: any) {
const session = await auth.api.getSession({
  headers: headers(),
});

  await db.insert(blogs).values({ ...values, content: data, userID: session?.user.id});
}
