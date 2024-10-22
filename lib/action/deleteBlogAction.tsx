"use server";

import { db } from "@/drizzle/db";
import { blogs } from "@/drizzle/schema/schema"; // Import schema tương ứng
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteBlog(id: number) {
  // Thực hiện hành động xóa
  await db.delete(blogs).where(eq(blogs.id, id));

  // Revalidate path sau khi xóa để làm mới lại dữ liệu
  revalidatePath("/dashboard");
}