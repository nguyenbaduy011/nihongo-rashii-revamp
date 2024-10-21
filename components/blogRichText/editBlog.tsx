"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiEdit3 } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { InsertBlogType } from "@/drizzle/schema/schema";
import { blogSchema, PostValues } from "@/lib/validations";
import RichTextEditor from "./richTextEditor";
import LoadingButton from "@/components/ui/loadingButton";
import { editBlog } from "../../lib/action/addBlogAction";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { Dialog, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogContent} from "../ui/dialog";

export default function EditBlog({ blog }: { blog: InsertBlogType }) {
  const form = useForm<PostValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog.title,
      description: blog.description,
      content: blog.content,
      id: String(blog.id),
    },
  });

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
      await editBlog(formData);
      toast({
        title: "Thành công",
        description: "Sửa bài đăng thành công",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Sửa bài đăng không thành công",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Sửa bài đăng</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-6 p-2"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <RichTextEditor
                      onChange={field.onChange}
                      initialContent={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <LoadingButton
                  type="submit"
                  className="w-full"
                  loading={isSubmitting}
                >
                  Sửa
                </LoadingButton>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
