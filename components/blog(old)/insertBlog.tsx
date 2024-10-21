// "use server";
// import { db } from "@/drizzle/db";
// import { blogs } from "@/drizzle/schema/schema";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// export async function insertBlog(values: any,) {
// const session = await auth.api.getSession({
//   headers: headers(),
// });

//   await db.insert(blogs).values({ ...values, userID: session?.user.id});
// }
