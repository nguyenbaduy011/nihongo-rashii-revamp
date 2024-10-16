import { db } from "@/drizzle/db";
import { blogs } from "@/drizzle/schema/schema";
import { user } from "@/drizzle/schema/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { JSONContent } from "@tiptap/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface BlogContent {
  type: string;
  content: JSONContent[];
}

export default async function BlogPage({
  params,
}: {
  params: { blog_number: number };
}) {
  const blog_page = await db.query.blogs.findFirst({
    where: eq(blogs.id, params.blog_number),
  });

  if (!blog_page) {
    redirect("/");
  } 

const user_infor = blog_page.userID
  ? await db.query.user.findFirst({
      where: eq(user.id, blog_page.userID),
    })
  : null;

  const blogDate = blog_page.date ? blog_page.date.toLocaleDateString() : "N/A";

  const blogContent: BlogContent = JSON.parse(
    JSON.stringify(blog_page.content)
  );
const formattedContent =
  blogContent.content
    ?.map((item) => {
      if (item.type === "codeBlock" && item.content) {
        return item.content
          .map((codeItem) => {
            return `<pre><code>${codeItem.text}</code></pre>`;
          })
          .join("");
      } else if (item.type === "paragraph" && item.content) {
        return item.content
          .map((textBlock) => {
            const text = textBlock.text || "";
            const marks = textBlock.marks || [];

            let formattedText = text;
            marks.forEach((mark) => {
              if (mark.type === "bold") {
                formattedText = `<strong>${formattedText}</strong>`;
              } else if (mark.type === "italic") {
                formattedText = `<em>${formattedText}</em>`;
              } else if (mark.type === "code") {
                formattedText = `<code>${formattedText}</code>`;
              }
            });

            return formattedText;
          })
          .join("");
      } else {
        return "";
      }
    })
    .join("<br/>") || "";
  return (
    <main>
      <section className="bg-primary-foreground py-40 px-20 gap-16">
        <div className="px-44">
          <div className="space-y-6">
            <h2 className="font-medium tracking-tight text-6xl/tight">
              {blog_page.title}
            </h2>

            <p className=" tracking-tight text-2xl text-gray-600 ">
              {blog_page.description}
            </p>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={`${user_infor?.image}`}
                  alt="@shadcn"
                  className=""
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="space-x-2 ">
                <span>{blogDate}</span>
                <span>·</span>
                <span>5 min read</span>
              </div>
            </div>
            <img
              src="https://pbs.twimg.com/profile_images/1571353371310804995/5EuNttEl_400x400.png"
              className="w-full h-96"
            />
          </div>
        </div>
      </section>
      <section className="py-40 px-20">
        <div className="px-44 w-full break-words">
          <p dangerouslySetInnerHTML={{ __html: formattedContent }} />
        </div>
      </section>
    </main>
  );
}
