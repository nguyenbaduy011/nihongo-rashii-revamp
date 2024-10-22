"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import LoadingButton from "@/components/ui/loadingButton";
import { blogSchema, PostValues } from "@/lib/validations";
import { createBlog } from "@/lib/action/addBlogAction";
import RichTextEditor from "./richTextEditor";
import { useRouter } from "next/navigation";

export default function addBlog() {
  const form = useForm<PostValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: PostValues) {
    const formData = new FormData();
    

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createBlog(formData);
      toast({
        title: "Tạo blog thành công",
        description:
          "Blog của bạn đã được tạo.",
      });
      router.push("/dashboard");
      
    } catch (error) {
      toast({
        title: "Lỗi khi tạo blog",
        description:
          "Đã có lỗi xảy ra khi tạo blog. Vui lòng kiểm tra lại thông tin và thử lại.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6 p-4 max-w-4xl mx-auto"
        style={{ minHeight: `calc(100vh - 60px)` }}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormLabel className="text-3xl">Tạo blog</FormLabel>
        <div className="whitespace-normal">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <RichTextEditor onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <LoadingButton type="submit" loading={isSubmitting}>
          Tạo
        </LoadingButton>
        
      </form>
    </Form>
  );
}
