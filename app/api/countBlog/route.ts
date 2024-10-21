import { NextResponse } from "next/server";
import { getBlogCount } from "@/lib/action/countlBlogAction";

// Xử lý phương thức GET
export async function GET() {
  try {
    const count = await getBlogCount();
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blog count", error },
      { status: 500 }
    );
  }
}
