import AddBlog from "@/components/blogRichText/addBlog";
import { db } from "@/drizzle/db";
import Link from "next/link";

export default async function Home() {
  const latestBlogs = await db.query.blogs.findMany({
    limit: 5,
    orderBy: (blogs, { desc }) => [desc(blogs.createdAt)],
  });

  const blogDate = latestBlogs.map((blog) => {
    return blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "N/A";
  });

  return (
    <main>
      <section className="bg-primary-foreground pt-40 pb-48 px-20 ">
        <h1 className="font-medium text-8xl tracking-tighter w-2/3 mx-auto">
          ようこそ
          <br /> 日本語らしい！
        </h1>
      </section>
      <section className=" py-40 px-20">
        <p className="text-3xl/10 tracking-tight w-2/3 mx-auto text-gray-600">
          Chào mừng bạn đến với Nihongo Rashii – một nền tảng học tiếng Nhật
          giúp bạn "ra dáng tiếng Nhật" từ những bước đầu tiên.
          <br />
          <br />
          Hãy cùng khám phá Nihongo Rashii để nâng cao trình độ và phát triển kỹ
          năng ngôn ngữ của bạn!
        </p>
      </section>

      <section className="py-40 px-20 space-y-20">
        <div className="border-t-2 border-black">
          <h2 className="font-medium tracking-tight text-6xl/tight mt-7">
            Ngữ pháp
          </h2>
        </div>
        <div>
          <img className="w-full aspect-video rounded-xl border" />
          <div className="mt-6">
            <div className="font-medium text-2xl/7 tracking-tight">
              Grid title
            </div>
            <div className="text-2xl/ tracking-tight">Grid description</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <img className="w-full aspect-video rounded-xl border" />
            <div className="mt-6">
              <div className="font-medium text-2xl/7 tracking-tight">
                Grid title
              </div>
              <div className="text-2xl/ tracking-tight">Grid description</div>
            </div>
          </div>
          <div>
            <img className="w-full aspect-video rounded-xl border" />
            <div className="mt-6">
              <div className="font-medium text-2xl/7 tracking-tight">
                Grid title
              </div>
              <div className="text-2xl/ tracking-tight">Grid description</div>
            </div>
          </div>
          <div>
            <img className="w-full aspect-video rounded-xl border" />
            <div className="mt-6">
              <div className="font-medium text-2xl/7 tracking-tight">
                Grid title
              </div>
              <div className="text-2xl/ tracking-tight">Grid description</div>
            </div>
          </div>
          <div>
            <img className="w-full aspect-video rounded-xl border" />
            <div className="mt-6">
              <div className="font-medium text-2xl/7 tracking-tight">
                Grid title
              </div>
              <div className="text-2xl/ tracking-tight">Grid description</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-40 px-20 flex gap-16">
        <div className="border-black border-t-2 w-2/3">
          <h2 className="font-medium tracking-tight text-6xl/tight mt-7">
            Blog
          </h2>
        </div>

        <div className="space-y-12 w-full">
          {!latestBlogs[0] ? (
            <div>Chưa có blog</div>
          ) : (
            <div>
              {latestBlogs.slice(0, 5).map((blog, index) => (
                <div key={blog.id} className="pb-12 border-b-2">
                  <h3 className="tracking-tighter font-medium text-3xl/snug">
                    <Link href={`/blogs/${blog.slug}?id=${blog.id}`}>
                      {blog.title} 
                    </Link>
                  </h3>
                  <div className="space-x-2 mt-4">
                    <span>{blogDate[index]}</span>
                    <span>·</span>
                    <span>5 min read</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
