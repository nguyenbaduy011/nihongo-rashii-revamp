"use server"

import { db } from "@/drizzle/db";
import { blogs, InsertBlogType } from "@/drizzle/schema/schema";
import { auth } from "@/lib/auth";
import { toSlug } from "@/lib/utils";
import { blogSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";


export async function createBlog(formData: FormData) {
  // Parse form data using the schema
  const values = Object.fromEntries(formData.entries());
  const { title, description, content } = blogSchema.parse(values);
  const session = await auth.api.getSession({
    headers: headers(),
  });

  // Generate slug from the title
  const slug = toSlug(title);

  const newProg: InsertBlogType = {
    title,
    description,
    content,
    slug,
    userID: session?.user.id
  };

  await db.insert(blogs).values(newProg);
}

export async function editBlog(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { id, title, description, content } = blogSchema.parse(values);

  await db
    .update(blogs)
    .set({ title, description, content })
    .where(eq(blogs.id, Number(id)));
  
}
