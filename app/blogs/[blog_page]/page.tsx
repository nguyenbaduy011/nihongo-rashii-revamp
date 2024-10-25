import { db } from "@/drizzle/db";
import { blogs } from "@/drizzle/schema/schema";
import { user } from "@/drizzle/schema/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser";


interface blogProps {
  searchParams: {
    id: string;
  };
}
export default async function BlogPage({searchParams}: blogProps) {

  const blogPageId = parseInt(searchParams.id, 10);

  if(isNaN(blogPageId)){
    console.error("Invalid Blog ID:", searchParams.id)
    redirect("/")
    return;
  }

  let blog_page;
  try {
    blog_page = await db.query.blogs.findFirst({
      where: eq(blogs.id, blogPageId),
    });
  } catch (error) {
    console.error("Error fetching blog page:", error);
    redirect("/");
  }

  if (!blog_page) {
    return (
      <div>
        <h1>Blog not found</h1>
        <p>The blog you are looking for does not exist.</p>
      </div>
    );
  }

  const user_infor = blog_page?.userID
    ? await db.query.user.findFirst({
        where: eq(user.id, blog_page?.userID),
      })
    : null;

  const blogDate = blog_page?.createdAt
    ? blog_page?.createdAt.toLocaleDateString()
    : "N/A";

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const { name, children } = domNode;

        if (name === "ul") {
          return (
            <ul className="list-disc ml-5">
              {domToReact(children as DOMNode[], options)}
            </ul>
          );
        }

        if (name === "ol") {
          return (
            <ol className="list-decimal ml-5">
              {domToReact(children as DOMNode[], options)}
            </ol>
          );
        }

        if (name === "p") {
          return (
            <p className="mb-4">{domToReact(children as DOMNode[], options)}</p>
          );
        }
      }
    },
  };

  return (
    <main>
      <section className="bg-primary-foreground py-40 px-20 gap-16">
        <div className="px-44">
          <div className="space-y-6">
            <h2 className="font-medium tracking-tight text-6xl/tight">
              {parse(blog_page!.title, options)}
            </h2>

            <p className=" tracking-tight text-2xl text-gray-600 ">
              {parse(blog_page!.description, options)}
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
              src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary-800x450.webp"
              className="w-full h-96"
            />
          </div>
        </div>
      </section>
      <section className="py-40 px-20">
        <div className="px-44 w-full break-words">
          {parse(blog_page!.content, options)}
        </div>
      </section>
    </main>
  );
}
