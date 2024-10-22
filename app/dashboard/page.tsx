"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2, PlusCircle } from "lucide-react";
import { client } from "@/lib/auth-client";
import { SelectBlogType } from "@/drizzle/schema/schema";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { deleteBlog } from "@/lib/action/deleteBlogAction";
import EditBlog from "@/components/blogRichText/editBlog";

export default function ProfileDashboard() {
  const data = client.useSession();
  const user = data.data?.user;

  //useState lấy số blogs
  const [blogPosts, setBlogPosts] = useState<SelectBlogType[]>([]);

  //useState lấy số lượng blog
  const [blogCount, setBlogCount] = useState(0);

  const handleDeleteBlog = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bài đăng này không?")) {
      return;
    }
    try {
      await deleteBlog(id); // Gọi server action
      toast({
        title: "Xóa thành công",
        description: "Bài đăng đã được xóa.",
      });

      // Cập nhật danh sách bài đăng và blogCount sau khi xóa
      setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      setBlogCount((prevCount) => prevCount - 1); // Giảm số lượng blog
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi xóa bài đăng.",
      });
    }
  };

  //lấy số lượng blog
  useEffect(() => {
    const fetchBlogCount = async () => {
      try {
        const response = await fetch("/api/countBlog");
        if (!response.ok) {
          throw new Error("Lỗi khi lấy số lượng bài đăng");
        }

        const result = await response.json();
        setBlogCount(result.count);
      } catch (error) {
        console.error(error);
        setBlogCount(0);
      }
    };
    fetchBlogCount();
  }, []);

  //Lấy danh sách blog tuong ứng với người dùng của session hiện tại
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/getBlog");
        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu bài đăng");
        }
        const result = await response.json();
        setBlogPosts(Array.isArray(result.blogPosts) ? result.blogPosts : []);
      } catch (error) {
        console.error(error);
        setBlogPosts([]);
      }
    }
    fetchBlogs();
  }, []);

  const blogDate = blogPosts.map((blog) => {
    return blog.createdAt
      ? new Date(blog.createdAt).toLocaleDateString()
      : "N/A";
  });

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Trang cá nhân</CardTitle>
          <CardDescription>Quản lý hồ sơ và bài đăng của bạn</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.image} alt={user?.name} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
            <p className="text-sm mt-1">Số blog: {blogCount}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blog của bạn</CardTitle>
          <CardDescription>Quản lý và tạo thêm blog mới</CardDescription>
        </CardHeader>
        <CardContent>
          {blogCount === 0 ? (
            <div className="text-center text-muted-foreground">
              Bạn chưa có blog nào.
            </div>
          ) : (
            <ul className="space-y-4">
              {blogPosts.slice(0, blogCount).map((blog, index) => (
                <li
                  key={blog.id}
                  className="border rounded-lg p-4 flex justify-between items-start"
                >
                  <div>
                    <Link href={`/blogs/${blog.slug}?id=${blog.id}`}>
                      <h3 className="font-semibold text-lg">{blog.title}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1 overflow-hidden text-ellipsis whitespace-nowrap max-w-screen-sm">
                      {blog.description}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {blogDate[index]}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <EditBlog blog={blog} />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteBlog(blog.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter>
          <Link href="/blogs/createBlog">
            <Button className="ml-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Tạo blog mới
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
