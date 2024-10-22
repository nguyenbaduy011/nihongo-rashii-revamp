// "use client";

// import { JSX, SVGProps, useState } from "react";
// import { Content, HTMLContent, JSONContent } from "@tiptap/react";
// import { MinimalTiptapEditor } from "@/components/minimal-tiptap";

// import { Button } from "@/components/ui/button";

// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { insertBlog } from "@/components/blog/insertBlog";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// const formSchema = z.object({
//   title: z.string().min(10).max(255),
//   description: z.string().min(10).max(255),
//   content: z.string().min(10),
// });

// export default function CreateBlog() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       content: "",
//     },
//   });
//   // { type: "text", content: [] }
//   const [content, setContent] = useState<Content>("");

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     console.log(values.content);

//     await insertBlog(values);
//   };

//   return (
//     <TooltipProvider>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="px-60 py-5 space-y-3"
//         >
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Tiêu đề</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Nhập tiêu đề" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Mô tả</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Nhập mô tả" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Mô tả</FormLabel>
//                 <FormControl>
//                   <MinimalTiptapEditor
//                     {...field}
//                     className="w-full mt-2 max-h-60 overflow-y-auto"
//                     editorContentClassName="p-5"
//                     output="html"
//                     placeholder="Type your description here..."
//                     autofocus={true}
//                     editable={true}
//                     immediatelyRender={false}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="flex justify-between">
//             <Button type="submit">Tạo blog</Button>
//             {/* <Dialog>
//               <DialogTrigger>
//                 <Button className="bg-secondary text-primary hover:text-secondary">
//                   Thêm ảnh
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <Card>
//                   <CardContent className="p-6 space-y-4">
//                     <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
//                       <FileIcon className="w-12 h-12" />
//                       <span className="text-sm font-medium text-gray-500">
//                         Drag and drop a file or click to browse
//                       </span>
//                       <span className="text-xs text-gray-500">
//                         PDF, image, video, or audio
//                       </span>
//                     </div>
//                     <div className="space-y-2 text-sm">
//                       <Label htmlFor="file" className="text-sm font-medium">
//                         File
//                       </Label>
//                       <Input
//                         id="file"
//                         type="file"
//                         placeholder="File"
//                         accept="image/*"
//                       />
//                     </div>
//                   </CardContent>
//                   <CardFooter>
//                     <Button>Tải lên</Button>
//                   </CardFooter>
//                 </Card>
//               </DialogContent>
//             </Dialog> */}
//           </div>
//         </form>
//       </Form>
//     </TooltipProvider>
//   );
// }

// function FileIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
//       <path d="M14 2v4a2 2 0 0 0 2 2h4" />
//     </svg>
//   );
// }

"use client";

import addBlog from "@/components/blogRichText/addBlog";

export default function createBlog(){
  return addBlog();
}