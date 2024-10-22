"use server";

import { db } from "@/drizzle/db"; // Import cơ sở dữ liệu
import { blogs } from "@/drizzle/schema/schema"; // Import schema cho bảng blogs
import { count, eq } from "drizzle-orm"; // Import các hàm của Drizzle ORM
import { headers } from "next/headers"; // Import headers
import { auth } from "@/lib/auth"; // Import auth

// Hàm lấy số lượng bài viết
export async function getBlogCount() {
  const session = await auth.api.getSession({
    headers: headers(), // Lấy session
  });

  if (!session?.session.userId) return 0; // Nếu không có userId, trả về 0

  // Truy vấn đếm số lượng blog của người dùng
  const result = await db
    .select({ count: count() })
    .from(blogs)
    .where(eq(blogs.userID, session.session.userId));

  const blogCount = result[0]?.count ?? 0; // Lấy giá trị đếm

  return blogCount; // Trả về số lượng blog
}
