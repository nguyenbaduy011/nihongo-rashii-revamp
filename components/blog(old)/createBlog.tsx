"use client";

import { useEffect, useState } from "react";
import { Content, HTMLContent, JSONContent } from "@tiptap/react";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertBlog } from "./insertBlog";
import { TooltipProvider } from "@/components/ui/tooltip";

const formSchema = z.object({
  title: z.string().min(10).max(255),
  description: z.string().min(10).max(255),
});

export function CreateBlog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",i
    },
  });

  const [content, setContent] = useState<Content>("");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(content);
    const data = JSON.parse(JSON.stringify(content));

    await insertBlog(values, data);
  };

  return (
    <TooltipProvider>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="tracking-tight text-lg/5 bg-black hover:bg-white hover:text-black"
            asChild
          >
            <Link href="/">Tạo Blog</Link>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tiêu đề" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập mô tả" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel>Nội dung</FormLabel>
              <MinimalTiptapEditor
                onChange={setContent}
                value={content}
                className="w-full mt-2"
                editorContentClassName="p-5"
                output="json"
                placeholder="Type your description here..."
                autofocus={true}
                editable={true}
                editorClassName="focus:outline-none"
              />

              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
