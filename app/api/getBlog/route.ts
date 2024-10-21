import { NextResponse } from "next/server";
import { getBlog } from "@/lib/action/getBlogAction";

// Xử lý phương thức GET
export async function GET() {
  try {
    const blogPosts = await getBlog(); // Giả sử getBlog trả về danh sách blog
    return NextResponse.json({blogPosts}); // Trả về dữ liệu blog dưới dạng JSON
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blog posts", error },
      { status: 500 }
    );
  }
}
