import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Tiêu đề không được dưới 10 chữ." })
    .max(255),
  description: z
    .string()
    .min(10, { message: "Mô tả không được dưới 10 chữ." })
    .max(255),
  content: z
    .string()
    .trim()
    .min(1, { message: "Không được để trống nội dung." }),
  id: z.string().optional(),
});

export type PostValues = z.infer<typeof blogSchema>;
