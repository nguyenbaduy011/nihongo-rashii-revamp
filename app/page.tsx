import AddBlog from "@/components/blogRichText/addBlog";
import { db } from "@/drizzle/db";
import Link from "next/link";

export default async function Home() {
  const latestBlogs = await db.query.blogs.findMany({
    limit: 5,
    orderBy: (blogs, { desc }) => [desc(blogs.createdAt)],
  });

  const blogDate = latestBlogs.map((blog) => {
    return blog.createdAt
      ? new Date(blog.createdAt).toLocaleDateString()
      : "N/A";
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
        <div className="px-20">
          <Link href="/N5">
            <img
              className="w-full rounded-xl border"
              src="/N5.svg"
              alt="N5 image"
            />
            <div className="mt-6">
              <div className="font-medium text-2xl/7 tracking-tight">N5</div>
              <div className="text-2xl/ tracking-tight">
                Ngữ pháp cơ bản cho người mới bắt đầu học tiếng Nhật, tập trung
                vào các cấu trúc câu đơn giản và giao tiếp hàng ngày.
              </div>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <Link href="/N4">
              <img
                className="w-full rounded-xl border"
                src="/N4.svg"
                alt="N4 image"
              />
              <div className="mt-6">
                <div className="font-medium text-2xl/7 tracking-tight">N4</div>
                <div className="text-2xl/ tracking-tight">
                  Ngữ pháp trung cấp thấp, mở rộng vốn từ và mẫu câu để hiểu
                  được các chủ đề quen thuộc trong cuộc sống hàng ngày.
                </div>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/N3">
              <img
                className="w-full rounded-xl border"
                src="/N3.svg"
                alt="N3 image"
              />
              <div className="mt-6">
                <div className="font-medium text-2xl/7 tracking-tight">N3</div>
                <div className="text-2xl/ tracking-tight">
                  Ngữ pháp trung cấp, giúp hiểu và sử dụng ngôn ngữ trong các
                  tình huống hàng ngày và trong công việc đơn giản.
                </div>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/N2">
              <img
                className="w-full rounded-xl border"
                src="/N2.svg"
                alt="N2 image"
              />
              <div className="mt-6">
                <div className="font-medium text-2xl/7 tracking-tight">N2</div>
                <div className="text-2xl/ tracking-tight">
                  Ngữ pháp trung cấp cao, yêu cầu sự thành thạo trong các ngữ
                  cảnh học thuật và công việc, với sự hiểu biết sâu hơn về các
                  cấu trúc phức tạp.
                </div>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/N1">
              <img
                className="w-full rounded-xl border"
                src="/N1.svg"
                alt="N1 image"
              />
              <div className="mt-6">
                <div className="font-medium text-2xl/7 tracking-tight">N1</div>
                <div className="text-2xl/ tracking-tight">
                  Ngữ pháp chuyên sâu dành cho những ai muốn thông thạo ngôn ngữ
                  Nhật Bản ở mức độ cao nhất, phù hợp cho các tình huống học
                  thuật và chuyên nghiệp.
                </div>
              </div>
            </Link>
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
